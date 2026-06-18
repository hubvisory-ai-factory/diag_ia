#!/usr/bin/env node
// Diag IA — publish a client folder as a Pull Request, no GitHub setup required.
//
// Usage:
//   node scripts/submit.mjs clients/<slug> ["commit message"]
//
// Reads every file in the folder, sends them to the submission endpoint, and
// prints the URL of the opened Pull Request. The endpoint commits the files as
// the diag-ia-bot GitHub App — so the consultant needs no GitHub account,
// invite, token, fork, gh, or SSH key.
//
// Secret (one shared value for all consultants), resolved in this order:
//   1. DIAG_IA_SECRET environment variable
//   2. ~/.config/diag_ia/secret  (file containing just the secret)
//
// Endpoint override (rarely needed): DIAG_IA_SUBMIT_URL

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { homedir } from 'node:os';

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

const folderArg = process.argv[2];
const message = process.argv[3];
if (!folderArg) {
  die('Usage: node scripts/submit.mjs clients/<slug> ["commit message"]');
}

const folder = folderArg.replace(/[/\\]+$/, '');
let st;
try {
  st = statSync(folder);
} catch {
  die(`Folder not found: ${folder}`);
}
if (!st.isDirectory()) die(`Not a folder: ${folder}`);

const slug = folder.split(/[/\\]/).pop();
if (!/^[a-z0-9][a-z0-9-]*$/.test(slug)) {
  die(`Folder name "${slug}" is not a valid slug (lowercase kebab-case).`);
}

const absFiles = walk(folder);
if (!absFiles.length) die(`No files found in ${folder}`);

const files = absFiles.map((abs) => {
  const rel = relative(folder, abs).split(sep).join('/'); // force posix paths
  const ext = rel.includes('.') ? '.' + rel.split('.').pop().toLowerCase() : '';
  const isText = TEXT_EXT.has(ext);
  const buf = readFileSync(abs);
  return {
    path: `clients/${slug}/${rel}`,
    encoding: isText ? 'utf-8' : 'base64',
    content: isText ? buf.toString('utf-8') : buf.toString('base64'),
  };
});

console.log(`→ Submitting ${files.length} file(s) for client "${slug}"…`);

const res = await fetch(ENDPOINT, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    secret: getSecret(),
    slug,
    files,
    message: message || `add(client): ${slug}`,
    title: message || `add(client): ${slug}`,
  }),
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
