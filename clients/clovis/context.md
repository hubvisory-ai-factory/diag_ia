# Clovis — contexte de mission

Brief, sources et journal de frictions de l'engagement. Sert de référence pendant le
build et de matière au post-mortem (cf. CLAUDE.md → « Continuous Improvement »).
Modèle réutilisable pour les prochains clients.

## Identité
- Client : **Clovis** — location & gestion de flottes PL/VUL
- Périmètre : **équipe Plateforme** · Code mission : CLV-IA-2026 · Période : T2 2026
- Branding : navy `#003366` / rouge `#E30613`, logo dans `assets/`

## Sources
- **Restitution P2 (PDF)** — *source de vérité* pour les chiffres, le scoring et le wording.
  (Fichier confidentiel conservé en local hors-repo, cf. `_sources/`, non commité.)
- **Notion** (3 bases liées, workspace hubvisory) :
  - Cas d'usage — P2 : `collection://bab083e3-74f4-4555-9244-7fb7d9f1fb6a` (CU-1..CU-14)
  - Solutions N1/N2/N3 : `collection://9c8d110f-6713-4619-922d-c6dc074b515b`
  - Irritants : `collection://f93ba40d-ad15-406a-b9b3-d2dc70ddf19c`
- **Transcript d'appel + recap Slack** décrivant la page voulue (ce qui reste / change / part).

## Structure retenue
Dashboard : Périmètre · **Catalogue des solutions identifiées** (par produit, Score VOTAC,
modale objectif/description/prérequis) · **Radar 5 axes** (équipe Plateforme, série unique) ·
Registre de risques (placeholder) · Principes directeurs (placeholder) · Feuille de route
(« À déterminer ») · Glossaire · Espace partenaire.
Onglets métiers : tous les cas d'usage + modale (grand thème · irritants · problème · solutions par produit).
Retirés : Shadow IA, heatmap, métriques d'usage, scatter, gouvernance approfondie, data health, process mapping, quick wins transverses.

## Scoring VOTAC
**Produit** de 5 critères notés 1–5 : Valeur métier × Occurence × Temps consommé × Potentiel IA × Facilité de mise en œuvre (score /3125). Dédup des solutions Notion : ne garder que `statut = "A valider"`.

## Frictions rencontrées (matière post-mortem)
- **VOTAC pris pour une somme au départ** — un champ Notion coïncidait avec la somme ; le PDF a tranché (produit). → documenté dans le skill (Phase 2 : pinner le scoring, sum vs product).
- **Template ≠ livrable** — `_template` décrivait un « audit maturité » générique (typologies, heatmap, shadow IA…) très loin du catalogue VOTAC réel ; gros rework moteur. → skill clarifié : template = simple exemple.
- **Notion ↔ PDF divergences** sur les composantes VOTAC (SN5.1, SN5.2, SN11.3, **SN7.2** ratée au 1er diff) ; un total corrompu (`4.6`). → revérif exhaustive contre les 6 tables du PDF ; PDF = source de vérité.
- **Commande preview cassée** — `npx serve -o clients/<slug>` (serve@14 sans `-o`, et `<base href>` absolu casse le sous-dossier). → corrigé partout : servir la racine, ouvrir `/clients/<slug>/`.
- **Texte Notion = markdown/puces/retours ligne** (+ artefact « Sonnet 4.6 Medium ») rendu brut dans la modale. → `formatRichText` ajouté au moteur et au `_template`.
- **Ids solutions dupliqués** (SN10.x ×3) → désambiguïsés `-CU4/-CU8/-CU9`.

## TODO restants (données réelles à fournir)
Valeurs radar à confirmer (provisoire 4/2/2/3/2) · nb répondants · registre de risques ·
4-5 principes directeurs · membres équipe Hubvisory · liens solutions CU-12/CU-14 · métier CU-13.
