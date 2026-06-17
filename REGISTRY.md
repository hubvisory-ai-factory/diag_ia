# Registry

Tracks available templates and client reports. Read this first when creating a new client.

## Templates

### base (default)
Full AI maturity audit. All sections: dashboard, methodology, governance, data health,
process mapping, metier spaces, risks, roadmap, glossary, partner space. All chart types
(radar, heatmap, bars, scatter, gauge).
Path: `_template/`

## Clients

### clovis (réel — équipe Plateforme)
- **Template**: dérivé de `exemple` (ex-base)
- **Date**: T2 2026
- **Sector**: Location & gestion de flottes PL/VUL
- **Source données**: 3 bases Notion liées (Cas d'usage P2, Solutions N1/N2/N3, Irritants) — voir mémoire projet
- **Structural changes**:
  - Solutions grid → **Catalogue des solutions identifiées** : filtre par Produit, **Score VOTAC** (total /25 + détail des 5 composantes V/O/T/IA/Facilité), modale objectif+description
  - Vues métiers : suppression Top 3 / Quick wins → liste de tous les cas d'usage, **modale cas d'usage** (Grand thème · Irritants embarqués · Problème métier · Solutions associées par produit)
  - Radar passé à **5 axes**, série unique (maturité équipe Plateforme), titre dédié
  - **Sections retirées** : Shadow IA, Maturité par métier (heatmap), Métriques d'utilisation (fréq/adoption), Scatter outils vs confiance, Gouvernance approfondie, Loupe sur la Data, Cartographie des processus
  - Nouvelle section **Construction & déploiement : principes directeurs** (placeholder « À construire »)
  - Feuille de route en placeholder « À déterminer » ; Registre de risques conservé (données à compléter)
- **TODO restants**: nb répondants, valeurs radar à confirmer, données risques, 4-5 principes directeurs, membres équipe Hubvisory, liens solutions CU-12/CU-14, métier CU-13
- **New components**: catalogue par produit + 2 modales (rendu inline dans index.html)

### exemple (template d'exemple — masqué)
- **Template**: base
- **Rôle**: ancienne page démo "Clovis", conservée comme template implémenté de référence. **Non listée sur la landing** (masquée du déploiement). Données fictives auto-descriptives.
