#!/usr/bin/env node
// Diag IA — publish changes as a Pull Request, no GitHub setup required.
//
// Usage:
//   node scripts/submit.mjs <client-folder> ["commit message"] [extra paths...]
//
// Examples:
//   node scripts/submit.mjs clients/acme "add(client): Acme"
//   node scripts/submit.mjs clients/acme "add(client): Acme" components/timeline.html
//   node scripts/submit.mjs clients/acme "feat: Acme + new component" components/ .claude/skills/add-client.md
//
// The first argument is the client folder (its name becomes the branch label
// `client/<slug>`). Any extra paths — files or folders — are included verbatim by
// their repo-relative path, so a consultant can also contribute a new component, a
// skill improvement, etc. in the same PR. All paths are sent relative to the repo
// root; the backend rejects dangerous paths (.github/, api/, deploy config).
//
// Files are read and sent in a single POST; the endpoint commits them as the
// diag-ia-bot GitHub App and opens a PR. No GitHub account, invite, token, fork,
// gh, or SSH needed.
//
// Secret (one shared value for all consultants), resolved in this order:
//   1. DIAG_IA_SECRET environment variable
//   2. ~/.config/diag_ia/secret  (file containing just the secret)
//
// Endpoint override (rarely needed): DIAG_IA_SUBMIT_URL

import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, relative, sep, resolve } from 'node:path';
import { homedir } from 'node:os';
import { execSync } from 'node:child_process';

const ENDPOINT =
  process.env.DIAG_IA_SUBMIT_URL || 'https://diag-ia.hubvisory.app/api/submit';

// Extensions committed as UTF-8 text; everything else is sent base64 (images…).
const TEXT_EXT = new Set([
  '.html', '.js', '.mjs', '.css', '.json', '.md', '.txt', '.svg', '.csv', '.xml',
]);
const SKIP = new Set(['_sources', '.DS_Store', '.git', 'node_modules']);

function die(msg) {
  console.error(`✖ ${msg}`);
  process.exit(1);
}

function getSecret() {
  if (process.env.DIAG_IA_SECRET) return process.env.DIAG_IA_SECRET.trim();
  try {
    return readFileSync(join(homedir(), '.config', 'diag_ia', 'secret'), 'utf-8').trim();
  } catch {
    die(
      'No submission secret found.\n' +
        '  Set it once with either:\n' +
        '    export DIAG_IA_SECRET="<the shared secret>"\n' +
        '  or save it to ~/.config/diag_ia/secret\n' +
        '  Ask the repo admin for the value.'
    );
  }
}

function repoRoot() {
  try {
    return execSync('git rev-parse --show-toplevel', { encoding: 'utf-8' }).trim();
  } catch {
    die('Could not find the repo root — run this from inside the diag_ia clone.');
  }
}

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    if (SKIP.has(name)) continue;
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

// ---- parse args: <client-folder> ["message"] [extra paths...] (message and paths
// can be in any order after the first arg; a token that exists on disk is a path) ----
const root = repoRoot();
const argv = process.argv.slice(2);
const folderArg = argv[0];
if (!folderArg) {
  die('Usage: node scripts/submit.mjs <client-folder> ["commit message"] [extra paths...]');
}

let message;
const extraPaths = [];
for (const tok of argv.slice(1)) {
  if (existsSync(tok)) extraPaths.push(tok);
  else if (message === undefined) message = tok;
  else die(`Unexpected argument (not a path): ${tok}`);
}

// Resolve & collect every absolute file path from the client folder + extras.
function collect(p) {
  const abs = resolve(p);
  if (!existsSync(abs)) die(`Path not found: ${p}`);
  return statSync(abs).isDirectory() ? walk(abs) : [abs];
}

const folder = folderArg.replace(/[/\\]+$/, '');
const slug = folder.split(/[/\\]/).pop();
if (!/^[a-z0-9][a-z0-9-]*$/.test(slug)) {
  die(`Client folder name "${slug}" is not a valid slug (lowercase kebab-case).`);
}
message = message || `add(client): ${slug}`;

const absFiles = [...collect(folder), ...extraPaths.flatMap(collect)];
// de-dupe (a folder + an overlapping extra path)
const seen = new Set();
const files = [];
for (const abs of absFiles) {
  const rel = relative(root, abs).split(sep).join('/'); // repo-relative, posix
  if (rel.startsWith('..')) die(`Path is outside the repo: ${abs}`);
  if (seen.has(rel)) continue;
  seen.add(rel);
  const ext = rel.includes('.') ? '.' + rel.split('.').pop().toLowerCase() : '';
  const isText = TEXT_EXT.has(ext);
  const buf = readFileSync(abs);
  files.push({
    path: rel,
    encoding: isText ? 'utf-8' : 'base64',
    content: isText ? buf.toString('utf-8') : buf.toString('base64'),
  });
}

if (!files.length) die(`No files found to submit.`);

const outside = files.filter((f) => !f.path.startsWith(`clients/${slug}/`)).length;
console.log(
  `→ Submitting ${files.length} file(s) for "${slug}"` +
    (outside ? ` (incl. ${outside} outside the client folder)` : '') +
    '…'
);

const res = await fetch(ENDPOINT, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ secret: getSecret(), slug, files, message, title: message }),
});

let data = {};
try {
  data = await res.json();
} catch {
  /* ignore */
}

if (!res.ok || !data.ok) {
  die(`Submit failed (HTTP ${res.status}): ${data.error || 'unknown error'}`);
}

console.log(`✓ Pull Request opened: ${data.prUrl}`);
console.log(`  branch: ${data.branch}`);
console.log('  Gaspard is notified automatically and will review & merge.');
