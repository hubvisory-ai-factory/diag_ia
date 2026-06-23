// Diag IA — client-page submission endpoint (GitHub App backend)
//
// A consultant's Claude Code session POSTs a built client folder here. This
// function authenticates as the "diag-ia-bot" GitHub App, creates a branch,
// commits the files, and opens a Pull Request — so consultants never need a
// GitHub account, an org invite, a token, gh/brew, SSH, or a fork.
//
// Zero npm dependencies: uses only Node built-ins (crypto) + global fetch.
// Nothing to build — drops straight into the existing static Vercel project.
//
// Required Vercel environment variables (see BACKEND_SETUP.md):
//   GH_APP_ID            App ID of the GitHub App
//   GH_APP_PRIVATE_KEY   App private key PEM (literal newlines OR \n-escaped)
//   SUBMIT_SECRET        Shared secret consultants put in DIAG_IA_SECRET
// Optional:
//   GH_REPO              owner/repo (default: hubvisory-ai-factory/diag_ia)
//   GH_BASE_BRANCH       PR base branch (default: staging)
//   STAGING_HOST         hostname for preview URLs (default: staging.diag-ia.hubvisory.app)
//   PROD_HOST            production hostname (default: diag-ia.hubvisory.app)

const crypto = require('crypto');

const GH_API = 'https://api.github.com';
const SLUG_RE = /^[a-z0-9][a-z0-9-]*$/;
const MAX_FILES = 200;
// Vercel rejects request bodies larger than ~4.5 MB before this function even runs,
// so cap below that. The only realistic way to hit it is several MB of images in one
// submission — text (HTML/JS/components/skills) is tiny. If a client genuinely needs
// heavy imagery, switch the transport to chunked upload (see BACKEND_SETUP.md).
const MAX_TOTAL_BYTES = 4 * 1024 * 1024; // 4 MB across all files

// Path policy: a submission may write anywhere EXCEPT these dangerous areas. Everything
// is PR-gated (a human merges), so the denylist only blocks paths that could do harm
// before review — workflow injection, the endpoint itself, and deploy/routing config.
const DENIED_PREFIXES = ['.github/', 'api/', '.git/'];
const DENIED_EXACT = new Set([
  'vercel.json',
  'package.json',
  'package-lock.json',
  'pnpm-lock.yaml',
  'yarn.lock',
  '.gitignore',
  '.vercelignore',
]);

function httpError(status, message) {
  const e = new Error(message);
  e.status = status;
  return e;
}

function b64url(input) {
  return Buffer.from(input)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

function safeEqual(a, b) {
  const ab = Buffer.from(String(a || ''));
  const bb = Buffer.from(String(b || ''));
  if (ab.length !== bb.length) return false;
  return crypto.timingSafeEqual(ab, bb);
}

// Build a short-lived JWT to authenticate AS the GitHub App.
function appJWT(appId, privateKey) {
  const now = Math.floor(Date.now() / 1000);
  const header = b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const payload = b64url(
    JSON.stringify({ iat: now - 60, exp: now + 540, iss: String(appId) })
  );
  const signingInput = `${header}.${payload}`;
  const sig = crypto.createSign('RSA-SHA256').update(signingInput).sign(privateKey);
  return `${signingInput}.${b64url(sig)}`;
}

async function gh(token, method, path, body) {
  const res = await fetch(`${GH_API}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'diag-ia-submit',
      ...(body ? { 'Content-Type': 'application/json' } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let data;
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { raw: text };
  }
  if (!res.ok) {
    throw httpError(
      res.status >= 500 ? 502 : res.status,
      `GitHub ${method} ${path} -> ${res.status}: ${data.message || text}`
    );
  }
  return data;
}

// Exchange the App JWT for an installation token scoped to the repo.
async function installationToken(appId, privateKey, owner, repo) {
  const jwt = appJWT(appId, privateKey);
  const inst = await gh(jwt, 'GET', `/repos/${owner}/${repo}/installation`);
  const tok = await gh(jwt, 'POST', `/app/installations/${inst.id}/access_tokens`, {});
  return tok.token;
}

function isDenied(path) {
  if (DENIED_EXACT.has(path)) return true;
  return DENIED_PREFIXES.some((p) => path === p.slice(0, -1) || path.startsWith(p));
}

function validate(slug, files) {
  if (!SLUG_RE.test(String(slug || ''))) {
    throw httpError(400, `invalid slug "${slug}" (lowercase kebab-case only)`);
  }
  if (!Array.isArray(files) || files.length === 0) {
    throw httpError(400, 'no files provided');
  }
  if (files.length > MAX_FILES) {
    throw httpError(400, `too many files (${files.length} > ${MAX_FILES})`);
  }
  let total = 0;
  for (const f of files) {
    if (!f || typeof f.path !== 'string' || typeof f.content !== 'string') {
      throw httpError(400, 'each file needs string path + content');
    }
    if (f.path.includes('..') || f.path.startsWith('/')) {
      throw httpError(400, `illegal path: ${f.path}`);
    }
    // Denylist (not allowlist): a submission may write anywhere — client folders,
    // components/, _template/, .claude/skills/, docs — EXCEPT areas that could do harm
    // before a human reviews the PR (CI workflows, this endpoint, deploy/routing config).
    if (isDenied(f.path)) {
      throw httpError(
        400,
        `path not allowed: ${f.path} (cannot modify .github/, api/, or deploy config via the backend — a maintainer must do that with a normal Git PR)`
      );
    }
    total += Buffer.byteLength(f.content, 'utf-8');
  }
  if (total > MAX_TOTAL_BYTES) {
    const mb = (total / 1024 / 1024).toFixed(1);
    throw httpError(
      413,
      `payload too large: ${mb} MB exceeds the ~4 MB limit for a single submission. ` +
        `This is almost always large images/assets. Compress or resize them, or split ` +
        `the submission — text files (HTML/JS/components) are never the problem.`
    );
  }
}

async function commitFiles(token, owner, repo, base, branch, files, message) {
  const ref = await gh(token, 'GET', `/repos/${owner}/${repo}/git/ref/heads/${base}`);
  const baseSha = ref.object.sha;
  const baseCommit = await gh(token, 'GET', `/repos/${owner}/${repo}/git/commits/${baseSha}`);

  const tree = [];
  for (const f of files) {
    const blob = await gh(token, 'POST', `/repos/${owner}/${repo}/git/blobs`, {
      content:
        f.encoding === 'base64'
          ? f.content
          : Buffer.from(f.content, 'utf-8').toString('base64'),
      encoding: 'base64',
    });
    tree.push({ path: f.path, mode: '100644', type: 'blob', sha: blob.sha });
  }

  const newTree = await gh(token, 'POST', `/repos/${owner}/${repo}/git/trees`, {
    base_tree: baseCommit.tree.sha,
    tree,
  });
  const commit = await gh(token, 'POST', `/repos/${owner}/${repo}/git/commits`, {
    message,
    tree: newTree.sha,
    parents: [baseSha],
  });

  // Create the branch ref; on name collision, suffix and retry.
  let finalBranch = branch;
  for (let attempt = 0; ; attempt++) {
    try {
      await gh(token, 'POST', `/repos/${owner}/${repo}/git/refs`, {
        ref: `refs/heads/${finalBranch}`,
        sha: commit.sha,
      });
      return finalBranch;
    } catch (e) {
      if (e.status === 422 && attempt < 8) {
        finalBranch = `${branch}-${attempt + 2}`;
        continue;
      }
      throw e;
    }
  }
}

module.exports = async (req, res) => {
  try {
    if (req.method !== 'POST') {
      throw httpError(405, 'POST only');
    }

    const { GH_APP_ID, GH_APP_PRIVATE_KEY, SUBMIT_SECRET } = process.env;
    const REPO = process.env.GH_REPO || 'hubvisory-ai-factory/diag_ia';
    const BASE = process.env.GH_BASE_BRANCH || 'staging';
    const STAGING_HOST = process.env.STAGING_HOST || 'staging.diag-ia.hubvisory.app';
    const PROD_HOST = process.env.PROD_HOST || 'diag-ia.hubvisory.app';
    if (!GH_APP_ID || !GH_APP_PRIVATE_KEY || !SUBMIT_SECRET) {
      throw httpError(500, 'server not configured (missing GH_APP_* / SUBMIT_SECRET)');
    }

    // Vercel parses JSON bodies automatically; fall back to manual parse.
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch {
        throw httpError(400, 'invalid JSON body');
      }
    }
    body = body || {};

    if (!safeEqual(body.secret, SUBMIT_SECRET)) {
      throw httpError(401, 'bad or missing secret');
    }

    const slug = body.slug;
    const files = body.files;
    validate(slug, files);

    const [owner, repo] = REPO.split('/');
    const privateKey = GH_APP_PRIVATE_KEY.replace(/\\n/g, '\n');
    const token = await installationToken(GH_APP_ID, privateKey, owner, repo);

    const branch = body.branch || `client/${slug}`;
    const message = body.message || `add(client): ${slug}`;
    const finalBranch = await commitFiles(token, owner, repo, BASE, branch, files, message);

    const attribution = body.author ? `\n\n— Submitted by ${body.author}` : '';
    const prBody =
      (body.prBody || `Automated submission for client \`${slug}\` via Claude Code.`) +
      attribution;

    const pr = await gh(token, 'POST', `/repos/${owner}/${repo}/pulls`, {
      title: body.title || message,
      head: finalBranch,
      base: BASE,
      body: prBody,
    });

    const stagingUrl = `https://${STAGING_HOST}/${slug}`;
    const prodUrl = `https://${PROD_HOST}/${slug}`;

    return res.status(200).json({
      ok: true,
      prUrl: pr.html_url,
      branch: finalBranch,
      stagingUrl,
      prodUrl,
    });
  } catch (e) {
    const status = e.status && e.status >= 400 && e.status < 600 ? e.status : 500;
    return res.status(status).json({ ok: false, error: String(e.message || e) });
  }
};
