#!/usr/bin/env node
/*
 * validate-data.js — lint a client's data.js before preview/commit/deploy.
 *
 * Usage:
 *   node scripts/validate-data.js                      # all clients/<slug>/data.js
 *   node scripts/validate-data.js clients/clovis/data.js
 *
 * Catches the kinds of issues that slip through into the rendered page:
 *  - Malformed markdown in free text: a line with an odd number of "**"
 *    (an unbalanced/orphan bold or heading marker) renders a literal "**".
 *  - Stray artifacts left in extracted text (e.g. a trailing model name).
 *  - Structural inconsistencies: unknown/duplicate ids, VOTAC total != product.
 *
 * Exit code 1 if any ERROR is found (warnings don't fail). Wire it into the
 * verification step (see CLAUDE.md / add-client skill).
 */
const fs = require('fs');
const path = require('path');

// Match leaked LLM run tags (e.g. "Sonnet 4.6 Medium"), not legitimate model
// mentions in prose (e.g. a glossary line "...GPT, Claude, Mistral...").
const ARTIFACT_RE = /\b(Sonnet|Opus|Haiku)\s+[\d.]+|\bGPT-\d|\b(Low|Medium|High|XHigh)\s*$/;

function loadData(file) {
  const src = fs.readFileSync(file, 'utf8');
  return new Function(src + '\n;return CLIENT_DATA;')();
}

// Collect every string leaf with its dotted path.
function walk(node, p, out) {
  if (typeof node === 'string') { out.push([p, node]); return; }
  if (Array.isArray(node)) { node.forEach((v, i) => walk(v, `${p}[${i}]`, out)); return; }
  if (node && typeof node === 'object') { for (const k of Object.keys(node)) walk(node[k], p ? `${p}.${k}` : k, out); }
}

function checkText(strings, errors, warnings) {
  for (const [p, val] of strings) {
    val.split(/\r?\n/).forEach((line, i) => {
      const stars = (line.match(/\*\*/g) || []).length;
      if (stars % 2 !== 0) {
        errors.push(`Markdown déséquilibré (** orphelin) — ${p} (ligne ${i + 1}): "${line.trim().slice(0, 80)}"`);
      }
    });
    if (ARTIFACT_RE.test(val)) {
      warnings.push(`Artefact suspect (nom de modèle / "Medium") — ${p}: "${val.trim().slice(-60)}"`);
    }
    if (/\bTODO\b/.test(val)) {
      warnings.push(`TODO restant — ${p}`);
    }
  }
}

function checkStructure(d, errors) {
  const sols = d.catalogueSolutions || [];
  const prodIds = new Set((d.produits || []).map(p => p.id));
  const metierIds = new Set((d.perimetre || []).map(m => m.id));
  const seen = new Set();
  for (const s of sols) {
    if (seen.has(s.id)) errors.push(`Id solution dupliqué: "${s.id}"`);
    seen.add(s.id);
    if (s.produitId && !prodIds.has(s.produitId)) errors.push(`produitId inconnu "${s.produitId}" (solution ${s.id})`);
    const v = s.votac || {};
    const comps = ['valeur', 'occurrence', 'temps', 'ia', 'facilite'];
    if (comps.every(k => v[k] != null)) {
      const prod = comps.reduce((a, k) => a * v[k], 1);
      if (v.total != null && v.total !== prod) errors.push(`VOTAC total != produit (solution ${s.id}): total=${v.total}, produit=${prod}`);
    }
  }
  for (const uc of (d.useCasesList || [])) {
    for (const m of (uc.idMetiers || [])) {
      if (!metierIds.has(m)) errors.push(`idMetier inconnu "${m}" (cas d'usage ${uc.id})`);
    }
  }
}

function validate(file) {
  const errors = [], warnings = [];
  let d;
  try { d = loadData(file); }
  catch (e) { return { file, errors: [`Échec de chargement/parse: ${e.message}`], warnings: [] }; }
  const strings = []; walk(d, '', strings);
  checkText(strings, errors, warnings);
  checkStructure(d, errors);
  return { file, errors, warnings };
}

const args = process.argv.slice(2);
let files = args.length ? args : fs.readdirSync('clients')
  .map(s => path.join('clients', s, 'data.js'))
  .filter(f => fs.existsSync(f));

let failed = false;
for (const f of files) {
  const { errors, warnings } = validate(f);
  const tag = errors.length ? '❌' : (warnings.length ? '⚠️ ' : '✅');
  console.log(`\n${tag} ${f}`);
  errors.forEach(e => console.log(`   ERROR  ${e}`));
  warnings.forEach(w => console.log(`   warn   ${w}`));
  if (errors.length) failed = true;
}
console.log('');
process.exit(failed ? 1 : 0);
