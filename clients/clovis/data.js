const CLIENT_DATA = {
  branding: {
    slug: "clovis",
    clientName: "Clovis",
    clientFullName: "Clovis",
    sector: "Location & gestion de flottes Poids Lourds / VUL",
    missionCode: "CLV-IA-2026",
    missionTitle: "Audit de maturité IA",
    missionSubtitle: "Cap flotte connectée 2027",
    auditor: "Cabinet Conseil IA",
    period: "T2 2026",
    primaryColor: "#003366",
    secondaryColor: "#E30613",
    logoUrl: "",
    neutrals: {
      ink: "#0f172a",
      muted: "#475569",
      mutedSoft: "#94a3b8",
      border: "#e2e8f0",
      surface: "#ffffff",
      bg: "#f6f8fb",
      bgAlt: "#eef2f8"
    },
    fonts: {
      body: "'Inter', system-ui, sans-serif",
      display: "'DM Serif Display', serif",
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Inter:wght@400;500;600;700&display=swap"
    }
  },
  methodologie: {
    introTitle: "Guide méthodologique",
    introSubtitle: "Comment lire l'audit : typologies de cas d'usage & échelle de complexité",
    typologiesExplications: [
      { id: "analyse_doc", nom: "Analyse documentaire", icon: "file-search", couleur: "primary", definition: "Lecture, extraction et croisement d'informations à partir de documents (contrats, rapports, factures, PDF scannés).", exemple: "Extraire automatiquement les clauses de pénalité dans 200 contrats de location longue durée chez Clovis." },
      { id: "synthese", nom: "Synthèse", icon: "layers", couleur: "primary", definition: "Condenser des données ou textes longs en informations clés actionnables (bullet points, tableau, brief).", exemple: "Générer un briefing client 5 lignes à partir de l'historique CRM, sinistres et facturation avant un RDV commercial." },
      { id: "redaction", nom: "Rédaction", icon: "edit-3", couleur: "primary", definition: "Production de contenu écrit personnalisé (emails, comptes-rendus, devis, supports CODIR) à partir d'instructions.", exemple: "Drafter un mail commercial personnalisé pour chaque chargé client en s'appuyant sur l'historique du compte." },
      { id: "nettoyage_data", nom: "Nettoyage de données", icon: "filter", couleur: "accent", definition: "Normaliser, dédupliquer et structurer des données issues de saisies libres ou multi-sources.", exemple: "Harmoniser les motifs de panne saisis librement dans Zadig en référentiel contrôlé (15 catégories)." },
      { id: "recherche", nom: "Recherche", icon: "search", couleur: "primary", definition: "Trouver une information précise dans une base documentaire interne ou une masse de données métier (RAG).", exemple: "Interroger en langage naturel le catalogue fournisseurs pour identifier la pièce compatible avec un modèle de poids lourd." },
      { id: "automatisation", nom: "Automatisation", icon: "zap", couleur: "accent", definition: "Enchaîner plusieurs actions de bout en bout sans intervention humaine (agent IA), entre plusieurs systèmes.", exemple: "Agent qui détecte un RDV atelier non confirmé, envoie une relance, attend la réponse puis met à jour l'ERP." }
    ],
    complexiteCriteres: [
      { id: "faible", niveau: "Faible complexité", sousTitre: "Quick Win — déployable en < 6 mois", couleur: "green", icon: "zap", characteristiques: ["IA sur étagère (ChatGPT, Copilot, Claude)", "Aucun développement requis", "Pas de sujet RGPD critique", "Gain de temps immédiat et mesurable"], exemples: ["Synthèse de réunion", "Aide à la rédaction d'emails", "Reformulation"], delai: "0 - 3 mois", investissement: "Faible" },
      { id: "moyenne", niveau: "Complexité moyenne", sousTitre: "Projet métier — configuration & no-code", couleur: "amber", icon: "settings", characteristiques: ["Configuration / outils no-code (Make, Zapier, n8n)", "Assistants personnalisés (GPTs, prompts métier)", "Données internes non critiques", "Implication du métier dans le paramétrage"], exemples: ["Synthèse historique client (CRM)", "Génération de devis paramétrique", "Assistants GPTs métier"], delai: "3 - 9 mois", investissement: "Modéré" },
      { id: "forte", niveau: "Forte valeur ajoutée", sousTitre: "Projet stratégique — sur-mesure", couleur: "red", icon: "trending-up", characteristiques: ["Développement sur-mesure", "Intégration d'API & architecture RAG", "Sécurité des données pilotée par la DSI", "Gouvernance et MLOps en production"], exemples: ["Maintenance prédictive flotte", "Jumeau numérique véhicules", "Plateforme RAG interne"], delai: "9 - 24 mois", investissement: "Élevé" }
    ]
  },
  hubvisoryContext: {
    tagline: "Cabinet de conseil expert en stratégie, produit et industrialisation de l'IA.",
    description: "Nous accompagnons les organisations de la vision stratégique au déploiement opérationnel de leurs solutions IA, en garantissant l'adoption par les équipes et la maîtrise des risques.",
    expertises: [
      { titre: "Gouvernance IA", description: "Cadre, charte, comité, conformité." },
      { titre: "Acculturation", description: "Formation et conduite du changement." },
      { titre: "MVP IA & RAG", description: "Prototypage et industrialisation." }
    ],
    contact: { email: "contact@hubvisory.com", website: "https://hubvisory.com", linkedin: "https://www.linkedin.com/company/hubvisory" },
    ctaText: "Discuter de votre feuille de route IA",
    ctaSubject: "Contact Audit IA"
  },
  hubvisoryTeam: {
    title: "Votre Équipe Projet Hubvisory",
    description: "Nous restons à votre entière disposition pour débriefer ces résultats et lancer les ateliers de cadrage de la Phase 2 (Feuille de route & Spécifications).",
    members: [
      { name: "Pierre-Alban KEMPF", role: "Consultant IA / Product Manager", email: "pierre-alban.kempf@hubvisory.com", initials: "PA" },
      { name: "Benoit ROSIER", role: "Consultant IA / Product Manager", email: "benoit.rosier@hubvisory.com", initials: "BR" }
    ],
    ctaText: "Contacter l'équipe projet",
    ctaSubject: "Audit IA Clovis - Suite de la mission"
  },
  quickWinsGeneriques: [
    { id: "qwg-01", titre: "Aide à la rédaction d'e-mails", typologie: "Génération de Contenu & Rédaction", complexite: "Faible complexité (Quick Win)", gainMin: 25, icon: "mail", impact: "fort" },
    { id: "qwg-02", titre: "Synthèse de rapports & documents", typologie: "Synthèse & Prise de Décision", complexite: "Faible complexité (Quick Win)", gainMin: 35, icon: "file-text", impact: "fort" },
    { id: "qwg-03", titre: "Reformulation & correction de textes", typologie: "Génération de Contenu & Rédaction", complexite: "Faible complexité (Quick Win)", gainMin: 10, icon: "check-circle", impact: "moyen" },
    { id: "qwg-04", titre: "Synthèse de réunions & CR", typologie: "Synthèse & Prise de Décision", complexite: "Faible complexité (Quick Win)", gainMin: 30, icon: "users", impact: "fort" },
    { id: "qwg-05", titre: "Brainstorming & idéation", typologie: "Génération de Contenu & Rédaction", complexite: "Faible complexité (Quick Win)", gainMin: 20, icon: "lightbulb", impact: "moyen" },
    { id: "qwg-06", titre: "Traduction multilingue", typologie: "Génération de Contenu & Rédaction", complexite: "Faible complexité (Quick Win)", gainMin: 15, icon: "shuffle", impact: "moyen" },
    { id: "qwg-07", titre: "Synthèse de rapports d'anomalies", typologie: "Synthèse & Prise de Décision", complexite: "Complexité Moyenne (Projet Métier)", gainMin: 40, icon: "alert-circle", impact: "fort" },
    { id: "qwg-08", titre: "Recherche documentaire interne", typologie: "Recherche & Base de Connaissances", complexite: "Complexité Moyenne (Projet Métier)", gainMin: 25, icon: "search", impact: "fort" },
    { id: "qwg-09", titre: "Génération de slides / supports", typologie: "Génération de Contenu & Rédaction", complexite: "Faible complexité (Quick Win)", gainMin: 45, icon: "layers", impact: "fort" },
    { id: "qwg-10", titre: "Extraction de données (OCR / PDF)", typologie: "Analyse & Extraction Documentaire", complexite: "Complexité Moyenne (Projet Métier)", gainMin: 30, icon: "database", impact: "fort" },
    { id: "qwg-11", titre: "Préparation d'entretiens / RDV", typologie: "Synthèse & Prise de Décision", complexite: "Faible complexité (Quick Win)", gainMin: 20, icon: "calendar", impact: "moyen" },
    { id: "qwg-12", titre: "Veille sectorielle automatisée", typologie: "Recherche & Base de Connaissances", complexite: "Complexité Moyenne (Projet Métier)", gainMin: 30, icon: "trending-up", impact: "moyen" },
    { id: "qwg-13", titre: "Génération de tableaux & matrices", typologie: "Nettoyage & Structuration de Données", complexite: "Faible complexité (Quick Win)", gainMin: 20, icon: "bar-chart-3", impact: "moyen" },
    { id: "qwg-14", titre: "Assistant Excel / formules", typologie: "Nettoyage & Structuration de Données", complexite: "Faible complexité (Quick Win)", gainMin: 15, icon: "tool", impact: "moyen" },
    { id: "qwg-15", titre: "Note de cadrage / brief projet", typologie: "Génération de Contenu & Rédaction", complexite: "Complexité Moyenne (Projet Métier)", gainMin: 35, icon: "clipboard", impact: "moyen" },
    { id: "qwg-16", titre: "Onboarding & FAQ collaborateurs", typologie: "Recherche & Base de Connaissances", complexite: "Complexité Moyenne (Projet Métier)", gainMin: 25, icon: "graduation-cap", impact: "moyen" }
  ],
  dataGovernance: {
    sources: [
      { nom: "Télématique véhicules", type: "Capteurs IoT", volume: "élevé", qualite: 4, icon: "truck" },
      { nom: "CRM", type: "Base relationnelle", volume: "moyen", qualite: 3, icon: "headset" },
      { nom: "ERP", type: "Base relationnelle", volume: "élevé", qualite: 4, icon: "database" },
      { nom: "Saisie libre Zadig", type: "Champs libres", volume: "moyen", qualite: 2, icon: "file-text" },
      { nom: "Documents fournisseurs", type: "PDF / scans", volume: "moyen", qualite: 2, icon: "clipboard" }
    ],
    scoreExploitation: 2.6,
    scoreLabel: "Données disponibles mais sous-exploitées",
    axesAmelioration: [
      { titre: "Standardisation des saisies", description: "Harmoniser les champs libres Zadig en référentiels contrôlés (catégories, statuts, motifs).", effort: "moyen" },
      { titre: "Centralisation des sources", description: "Lac de données unique (CRM + ERP + télématique) pour autoriser les croisements et le scoring.", effort: "fort" },
      { titre: "Contrats de qualité (data contracts)", description: "Règles de complétude et de fraîcheur par flux, avec alerting en cas de dérive.", effort: "moyen" }
    ]
  },
  gouvernanceApprofondie: {
    risquesOperationnels: [
      { titre: "Fuite de données vers LLM publics", impact: "Critique", description: "Données contractuelles ou personnelles soumises à des chats publics." },
      { titre: "Shadow IT (outils non référencés)", impact: "Élevé", description: "8/23 outils détectés hors du référentiel DSI." },
      { titre: "Hallucinations sur réponses clients", impact: "Élevé", description: "Pas de relecture systématique des sorties IA." },
      { titre: "Perte de traçabilité décisionnelle", impact: "Moyen", description: "Aucun log d'usage centralisé sur les prompts métier." }
    ],
    enjeuxOrganisationnels: [
      { titre: "Conduite du changement", impact: "Élevé", description: "Forte hétérogénéité de maturité IA entre pôles." },
      { titre: "Restructuration des rôles", impact: "Moyen", description: "Tâches de saisie progressivement automatisées : repositionnement à anticiper." },
      { titre: "Nouvelle fonction : Référent IA métier", impact: "Moyen", description: "À créer dans chaque pôle pour porter charte + cas d'usage." },
      { titre: "Pilotage du comité IA", impact: "Élevé", description: "Comité IA en préfiguration, gouvernance à formaliser." }
    ],
    besoinsFormation: [
      { titre: "Acculturation IA générative", niveau: "Tous", duree: "1/2 j", description: "Bases, vocabulaire, risques, opportunités." },
      { titre: "Prompt engineering métier", niveau: "Référents", duree: "1 j", description: "Maîtrise des patterns de prompts par cas d'usage." },
      { titre: "RGPD & IA", niveau: "Managers", duree: "1/2 j", description: "Données sensibles, conformité, registre des traitements." },
      { titre: "Outils & catalogue interne", niveau: "Tous", duree: "2 h", description: "Tour d'horizon des outils IA validés DSI." },
      { titre: "MLOps & RAG", niveau: "Tech", duree: "2 j", description: "Mise en production de pipelines IA internes." }
    ]
  },
  processMapping: {
    actuel: {
      titre: "Processus actuel",
      sousTitre: "Siloté · manuel · saisie libre",
      etapes: [
        { libelle: "Saisie manuelle Zadig", outil: "Zadig", type: "saisie" },
        { libelle: "Export Excel hebdomadaire", outil: "Excel", type: "saisie" },
        { libelle: "Consolidation manuelle", outil: "Excel · Mail", type: "manuel" },
        { libelle: "Analyse au cas par cas", outil: "Gestionnaire Parc", type: "manuel" },
        { libelle: "Décision sans contexte global", outil: "Mail · Téléphone", type: "decision" }
      ],
      irritants: ["Données non croisées", "Délai 24-72 h", "Erreurs de saisie", "Pas de mémoire"]
    },
    cible: {
      titre: "Processus cible IA",
      sousTitre: "Intégré · automatisé · gouverné",
      etapes: [
        { libelle: "Ingestion temps réel multi-sources", outil: "API · Connecteurs", type: "api" },
        { libelle: "Couche Data normalisée", outil: "Lac de données", type: "data" },
        { libelle: "Enrichissement IA (RAG, scoring)", outil: "LLM interne", type: "ia" },
        { libelle: "Recommandations contextualisées", outil: "Copilote métier", type: "ia" },
        { libelle: "Décision assistée + traçabilité", outil: "Workflow gouverné", type: "decision" }
      ],
      benefices: ["Décision < 1 h", "Traçabilité 100 %", "Croisement multi-sources", "Apprentissage continu"]
    }
  },
  perimetre: [
    { id: "gestionnaire_parc", nom: "Gestionnaire de Parc", effectif: 2, icon: "truck", frequenceUsage: { quotidien: 40, hebdomadaire: 35, occasionnel: 20, jamais: 5 }, dureeAdoption: { moinsDe3Mois: 35, de3a12Mois: 50, plusDe12Mois: 15 } },
    { id: "assistant_gestionnaire", nom: "Assistant Gestionnaire de Parc", effectif: 2, icon: "clipboard", frequenceUsage: { quotidien: 30, hebdomadaire: 40, occasionnel: 25, jamais: 5 }, dureeAdoption: { moinsDe3Mois: 50, de3a12Mois: 40, plusDe12Mois: 10 } },
    { id: "charge_client", nom: "Chargé Client", effectif: 2, icon: "headset", frequenceUsage: { quotidien: 55, hebdomadaire: 30, occasionnel: 10, jamais: 5 }, dureeAdoption: { moinsDe3Mois: 20, de3a12Mois: 55, plusDe12Mois: 25 } },
    { id: "architecte_solution", nom: "Architecte Solution", effectif: 1, icon: "git-merge", frequenceUsage: { quotidien: 70, hebdomadaire: 20, occasionnel: 10, jamais: 0 }, dureeAdoption: { moinsDe3Mois: 10, de3a12Mois: 40, plusDe12Mois: 50 } },
    { id: "resp_plateforme", nom: "Resp. Plateforme de Gestion de Parc", effectif: 1, icon: "server", frequenceUsage: { quotidien: 65, hebdomadaire: 25, occasionnel: 10, jamais: 0 }, dureeAdoption: { moinsDe3Mois: 15, de3a12Mois: 35, plusDe12Mois: 50 } },
    { id: "direction", nom: "Direction Générale / Opérationnelle", effectif: 2, icon: "briefcase", frequenceUsage: { quotidien: 25, hebdomadaire: 35, occasionnel: 25, jamais: 15 }, dureeAdoption: { moinsDe3Mois: 45, de3a12Mois: 45, plusDe12Mois: 10 } }
  ],
  globalMetrics: {
    maturiteGlobale: 2.4,
    confianceGlobale: 3.1,
    shadowIaOffRoad: 6,
    totalRepondants: 10,
    casUsageRecenses: 16,
    quickWinsCount: 9,
    benchmarkDelta: "+0.4 vs benchmark transport",
    scoreBenchmarkHubvisory: 2.7,
    weightingParams: { usageThreshold: 4, quickWinRatioMin: 0.6, penaltyPerMetier: 0.15, penaltyMax: 0.5 }
  },
  axesRadar: [
    { axe: "Shadow IA", scoreActuel: 1.8, scoreCible: 4, description: "Maîtrise des usages non gouvernés" },
    { axe: "Gouvernance", scoreActuel: 1.6, scoreCible: 4, description: "Cadre, comité IA, validation" },
    { axe: "Stack", scoreActuel: 2.4, scoreCible: 4, description: "Outillage référencé et intégré" },
    { axe: "Formation", scoreActuel: 2, scoreCible: 3.5, description: "Montée en compétence des équipes" },
    { axe: "Adoption", scoreActuel: 2.8, scoreCible: 4, description: "Diffusion réelle dans les métiers" },
    { axe: "Cas d'usage", scoreActuel: 3.2, scoreCible: 4.5, description: "Identification et priorisation" }
  ],
  heatmapMatrix: [
    { idMetier: "gestionnaire_parc", usage: 3, confiance: 4 },
    { idMetier: "assistant_gestionnaire", usage: 4, confiance: 3 },
    { idMetier: "charge_client", usage: 4, confiance: 4 },
    { idMetier: "architecte_solution", usage: 5, confiance: 4 },
    { idMetier: "resp_plateforme", usage: 4, confiance: 5 },
    { idMetier: "direction", usage: 3, confiance: 3 }
  ],
  frequencyUsage: [
    { bucket: "Plusieurs/jour", pct: 20 },
    { bucket: "1x/jour", pct: 30 },
    { bucket: "1x/semaine", pct: 20 },
    { bucket: "Mensuel", pct: 20 },
    { bucket: "Jamais", pct: 10 }
  ],
  adoptionDuree: [
    { bucket: "< 3 mois", pct: 30 },
    { bucket: "3-12 mois", pct: 50 },
    { bucket: "> 12 mois", pct: 20 }
  ],
  stackByMetier: [
    { idMetier: "gestionnaire_parc", outils: 3, confiance: 70 },
    { idMetier: "assistant_gestionnaire", outils: 2, confiance: 60 },
    { idMetier: "charge_client", outils: 5, confiance: 75 },
    { idMetier: "architecte_solution", outils: 8, confiance: 80 },
    { idMetier: "resp_plateforme", outils: 9, confiance: 85 },
    { idMetier: "direction", outils: 4, confiance: 55 }
  ],
  useCasesList: [
    { id: "uc-01", idMetier: "gestionnaire_parc", nomTache: "Analyse rapports carburant & consommation", outilsActuels: ["Excel", "PDF fournisseurs"], irritantCategorie: "Tâches répétitives", descriptionCasIA: "Extraction automatisée des rapports mensuels et détection d'écarts par véhicule.", minutesGagnees: 45, typeTache: "Synthese", gains: ["Productivite", "Qualite"], isQuickWin: true },
    { id: "uc-02", idMetier: "gestionnaire_parc", nomTache: "Détection anomalies maintenance", outilsActuels: ["GMAO", "Tableurs"], irritantCategorie: "Données dispersées", descriptionCasIA: "Signalement proactif d'usures atypiques à partir des codes erreur télématique.", minutesGagnees: 60, typeTache: "Data", gains: ["Qualite"], isQuickWin: false },
    { id: "uc-03", idMetier: "gestionnaire_parc", nomTache: "Rédaction CR comités flotte", outilsActuels: ["Word", "PowerPoint"], irritantCategorie: "Temps de rédaction", descriptionCasIA: "Génération de comptes-rendus structurés depuis notes vocales et data export.", minutesGagnees: 30, typeTache: "Redaction", gains: ["Productivite", "Confort"], isQuickWin: true },
    { id: "uc-04", idMetier: "assistant_gestionnaire", nomTache: "Suivi RDV ateliers", outilsActuels: ["Outlook", "Excel"], irritantCategorie: "Coordination", descriptionCasIA: "Agent IA qui relance et confirme les RDV via mail/SMS.", minutesGagnees: 25, typeTache: "Synthese", gains: ["Productivite"], isQuickWin: true },
    { id: "uc-05", idMetier: "assistant_gestionnaire", nomTache: "Génération bons de commande", outilsActuels: ["ERP", "Word"], irritantCategorie: "Saisie manuelle", descriptionCasIA: "Pré-remplissage des bons depuis devis fournisseur scanné (OCR + LLM).", minutesGagnees: 20, typeTache: "Redaction", gains: ["Productivite"], isQuickWin: true },
    { id: "uc-06", idMetier: "assistant_gestionnaire", nomTache: "Recherche pièces référencées", outilsActuels: ["Catalogue PDF", "Google"], irritantCategorie: "Recherche dispersée", descriptionCasIA: "Moteur RAG sur catalogues fournisseurs internes.", minutesGagnees: 15, typeTache: "Recherche", gains: ["Confort", "Qualite"], isQuickWin: false },
    { id: "uc-07", idMetier: "charge_client", nomTache: "Rédaction emails commerciaux personnalisés", outilsActuels: ["Outlook", "CRM"], irritantCategorie: "Personnalisation chronophage", descriptionCasIA: "Drafts personnalisés à partir de l'historique CRM client.", minutesGagnees: 35, typeTache: "Redaction", gains: ["Productivite", "Qualite"], isQuickWin: true },
    { id: "uc-08", idMetier: "charge_client", nomTache: "Synthèse historique client avant RDV", outilsActuels: ["CRM", "Tickets SAV"], irritantCategorie: "Données silotées", descriptionCasIA: "Briefing IA agrégeant CRM, contrats, sinistres et facturation.", minutesGagnees: 20, typeTache: "Synthese", gains: ["Qualite", "Confort"], isQuickWin: true },
    { id: "uc-09", idMetier: "charge_client", nomTache: "Génération devis types", outilsActuels: ["Excel", "ERP"], irritantCategorie: "Calculs récurrents", descriptionCasIA: "Assistant de devis paramétrique conforme à la grille tarifaire.", minutesGagnees: 40, typeTache: "Data", gains: ["Productivite"], isQuickWin: false },
    { id: "uc-10", idMetier: "architecte_solution", nomTache: "Cartographie process AS-IS", outilsActuels: ["Visio", "Confluence"], irritantCategorie: "Documentation", descriptionCasIA: "Génération de diagrammes process à partir d'entretiens transcrits.", minutesGagnees: 90, typeTache: "Synthese", gains: ["Productivite"], isQuickWin: false },
    { id: "uc-11", idMetier: "architecte_solution", nomTache: "Documentation technique", outilsActuels: ["Confluence", "Word"], irritantCategorie: "Rédaction technique", descriptionCasIA: "Génération de specs structurées à partir de bullet points.", minutesGagnees: 60, typeTache: "Redaction", gains: ["Qualite"], isQuickWin: true },
    { id: "uc-12", idMetier: "resp_plateforme", nomTache: "Analyse logs et incidents", outilsActuels: ["Kibana", "Datadog"], irritantCategorie: "Volume de logs", descriptionCasIA: "Clustering automatique des incidents et résumé hebdomadaire.", minutesGagnees: 50, typeTache: "Data", gains: ["Qualite", "Productivite"], isQuickWin: true },
    { id: "uc-13", idMetier: "resp_plateforme", nomTache: "Génération scripts SQL ad-hoc", outilsActuels: ["DBeaver", "SSMS"], irritantCategorie: "Requêtes répétitives", descriptionCasIA: "Copilote SQL contextualisé sur le schéma de la plateforme.", minutesGagnees: 35, typeTache: "Data", gains: ["Productivite"], isQuickWin: false },
    { id: "uc-14", idMetier: "direction", nomTache: "Synthèse hebdo indicateurs", outilsActuels: ["PowerBI", "Excel"], irritantCategorie: "Lecture de dashboards", descriptionCasIA: "Bullet-points executive depuis exports PowerBI.", minutesGagnees: 45, typeTache: "Synthese", gains: ["Productivite", "Confort"], isQuickWin: true },
    { id: "uc-15", idMetier: "direction", nomTache: "Préparation supports CODIR", outilsActuels: ["PowerPoint"], irritantCategorie: "Mise en forme", descriptionCasIA: "Génération de slides à partir d'une trame et de données chiffrées.", minutesGagnees: 75, typeTache: "Redaction", gains: ["Confort"], isQuickWin: false },
    { id: "uc-16", idMetier: "direction", nomTache: "Veille concurrence", outilsActuels: ["Google", "Newsletters"], irritantCategorie: "Information éparse", descriptionCasIA: "Agent de veille hebdo filtré et résumé.", minutesGagnees: 30, typeTache: "Recherche", gains: ["Qualite"], isQuickWin: true }
  ],
  risques: [
    { libelle: "Données sensibles partagées avec LLM publics", niveau: "Rouge", note: "Contrats, RH, données clients" },
    { libelle: "Outils non conformes RGPD", niveau: "Rouge", note: "8/23 outils détectés" },
    { libelle: "Over-trust sur sorties IA non vérifiées", niveau: "Orange", note: "Aucun process de relecture" },
    { libelle: "Absence de validation humaine systématique", niveau: "Orange", note: "Surtout sur emails clients" },
    { libelle: "Pas de référentiel d'usages partagé", niveau: "Orange", note: "Pratiques individuelles" },
    { libelle: "Gouvernance IA émergente", niveau: "Vert", note: "Comité en préfiguration" }
  ],
  roadmap: [
    { horizon: "0-6 mois", titre: "Fondations & Quick-wins", items: ["Référentiel d'outils IA validés", "Charte IA v1", "6 quick-wins déployés"], impact: "Moyen", complexite: "Faible", type: "Quick-wins" },
    { horizon: "6-12 mois", titre: "Industrialisation", items: ["Plateforme RAG interne", "Plan de formation par métier", "MLOps fondations"], impact: "Fort", complexite: "Moyenne", type: "Structurel" },
    { horizon: "12-24 mois", titre: "Flotte intelligente", items: ["Maintenance prédictive en prod", "Jumeau numérique flotte", "Charte IA v2"], impact: "Très fort", complexite: "Élevée", type: "Vision" }
  ],
  glossaire: [
    { terme: "LLM", definition: "Large Language Model — modèle de langage capable de comprendre et générer du texte (GPT, Claude, Mistral)." },
    { terme: "Prompt", definition: "Instruction donnée à un modèle IA pour obtenir une réponse. Qualité du prompt = qualité du résultat." },
    { terme: "Agent", definition: "Système IA capable d'enchaîner des actions de façon autonome pour accomplir une tâche complexe." },
    { terme: "RAG", definition: "Retrieval-Augmented Generation — un LLM connecté à une base documentaire interne pour répondre sur ses données." },
    { terme: "Hallucination", definition: "Réponse IA factuellement incorrecte présentée comme vraie. Risque principal du LLM." },
    { terme: "Shadow IA", definition: "Usage d'outils IA hors du contrôle de la DSI, source de risques data et conformité." },
    { terme: "Quick-win", definition: "Cas d'usage à fort ROI et faible complexité, livrable en moins de 6 mois." },
    { terme: "MLOps", definition: "Industrialisation du cycle de vie des modèles IA (build, deploy, monitor)." },
    { terme: "Jumeau numérique", definition: "Réplique virtuelle d'un actif physique alimentée en temps réel par ses capteurs." },
    { terme: "Fine-tuning", definition: "Spécialisation d'un modèle pré-entraîné sur un domaine ou une entreprise." },
    { terme: "Token", definition: "Unité élémentaire (fragment de mot) traitée par un LLM. La facturation se fait au token." },
    { terme: "Embedding", definition: "Représentation vectorielle d'un texte, utilisée pour la recherche sémantique." }
  ],
  ui: {
    sections: { dashboard: "Dashboard global", metiers: "Espaces métier", charte: "Charte & Risques", roadmap: "Feuille de route", glossaire: "Glossaire IA" },
    blocks: {
      perimetreTitle: "Périmètre de la mission",
      radarTitle: "Positionnement organisationnel",
      radarSubtitle: "Score actuel vs cible 2027 — 6 axes",
      heatmapTitle: "Maturité par métier",
      heatmapSubtitle: "Usage & Confiance par rôle audité",
      radarLegendActuel: "Score actuel — audit",
      radarLegendCible: "Cible sur les 6 prochains mois avec Hubvisory",
      radarTooltipActuel: "Aujourd'hui",
      radarTooltipCible: "Cible 6 mois · Hubvisory",
      metricsTitle: "Métriques quantitatives & usage",
      shadowTitle: "Shadow IA global",
      maturityTitle: "Maturité IA — auto-déclarée",
      confidenceTitle: "Confiance × Diversité de la stack",
      frequenceTitle: "Fréquence d'utilisation",
      adoptionTitle: "Durée d'adoption",
      metricsUsageEyebrow: "Métriques d'utilisation",
      metricsUsageTitle: "Fréquence & adoption — vue granulaire",
      metricsUsageSubtitle: "Bascule global ↔ métier pour comparer les pratiques",
      metricsTabGlobal: "Au global",
      freqBuckets: { quotidien: "Quotidien", hebdomadaire: "Hebdomadaire", occasionnel: "Occasionnel", jamais: "Jamais" },
      adoptionBuckets: { moinsDe3Mois: "< 3 mois", de3a12Mois: "3-12 mois", plusDe12Mois: "> 12 mois" },
      risquesTitle: "Principes directeurs — Charte IA",
      roadmapTitle: "Feuille de route IA (12-24 mois)",
      glossaireTitle: "Glossaire IA",
      casUsageTitle: "Cas d'usage recensés",
      casUsageCta: "Explorer les espaces métier",
      ucTableTitle: "Tous les cas d'usage du métier",
      ucTableSubtitle: "Triés par priorité (ROI × complexité) — cliquer pour voir le détail",
      ucColTask: "Cas d'usage",
      ucColTypo: "Typologie",
      ucColComplex: "Complexité",
      ucColROI: "ROI / Gain",
      ucColAction: "",
      ucModalEyebrow: "Détail du cas d'usage",
      ucModalDescLabel: "Opportunité IA",
      ucModalIrritant: "Irritant identifié",
      ucModalTools: "Outils actuels",
      ucModalGains: "Gains attendus",
      ucModalMinutes: "Temps gagné estimé",
      ucModalClose: "Fermer",
      quickWinsTitle: "Quick Wins",
      topUseCasesTitle: "Top 3 cas d'usage à plus fort ROI",
      quickWinsGeneriquesTitle: "Quick wins transverses",
      quickWinsGeneriquesSubtitle: "16 cas d'usage immédiatement activables, toutes équipes confondues",
      gouvernanceTitle: "Gouvernance IA globale",
      gouvernanceSubtitle: "Risques, organisation, formation — vision 360°",
      dataHealthTitle: "Loupe sur la Data",
      dataHealthSubtitle: "Sources et qualité des données mobilisables",
      processMappingTitle: "Cartographie des processus",
      processMappingSubtitle: "De l'existant siloté vers un parcours IA intégré",
      methodoTitle: "Guide méthodologique : Typologies & Complexité",
      methodoSubtitle: "Comprendre les critères d'évaluation de l'audit IA",
      methodoTabTypo: "Décoder les typologies",
      methodoTabComplex: "Comprendre la complexité & ROI",
      scoreMethodoNote: "Le score prend en compte la complexité des solutions IA adoptées, et non pas uniquement le volume d'utilisation.",
      scoreBenchmarkLabel: "Moyenne marché (Hubvisory)",
      scoreClientLabel: "Score pondéré client",
      scoreImbalanceWarn: "Usage élevé mais complexité basse",
      scoreImbalanceHint: "Métiers à recentrer sur des cas d'usage à plus forte valeur",
      backToDashboard: "← Retour au Dashboard Global"
    }
  },
  solutionsTransverses: [
    { id: "sol-01", titre: "Analyse rapports carburant & consommation", icon: "file-search", minutesGagnees: 45, typologies: ["Synthèse"], complexite: "quickwin" },
    { id: "sol-02", titre: "Détection anomalies maintenance", icon: "alert-triangle", minutesGagnees: 60, typologies: ["Data structurée"], complexite: "projet_metier" },
    { id: "sol-03", titre: "Rédaction CR comités flotte", icon: "edit-3", minutesGagnees: 30, typologies: ["Rédaction"], complexite: "quickwin" },
    { id: "sol-04", titre: "Suivi RDV ateliers & relances", icon: "calendar", minutesGagnees: 25, typologies: ["Synthèse"], complexite: "quickwin" },
    { id: "sol-05", titre: "Génération bons de commande (OCR)", icon: "clipboard", minutesGagnees: 20, typologies: ["Rédaction"], complexite: "quickwin" },
    { id: "sol-06", titre: "Recherche pièces référencées (RAG)", icon: "search", minutesGagnees: 15, typologies: ["Recherche / RAG"], complexite: "projet_metier" },
    { id: "sol-07", titre: "Rédaction emails commerciaux personnalisés", icon: "mail", minutesGagnees: 35, typologies: ["Rédaction"], complexite: "quickwin" },
    { id: "sol-08", titre: "Synthèse historique client avant RDV", icon: "layers", minutesGagnees: 20, typologies: ["Synthèse"], complexite: "quickwin" },
    { id: "sol-09", titre: "Génération devis types paramétrique", icon: "file-text", minutesGagnees: 40, typologies: ["Data structurée"], complexite: "projet_metier" },
    { id: "sol-10", titre: "Cartographie process AS-IS automatisée", icon: "map", minutesGagnees: 90, typologies: ["Synthèse"], complexite: "projet_metier" },
    { id: "sol-11", titre: "Documentation technique structurée", icon: "book-open", minutesGagnees: 60, typologies: ["Rédaction"], complexite: "quickwin" },
    { id: "sol-12", titre: "Analyse logs & clustering incidents", icon: "terminal", minutesGagnees: 50, typologies: ["Data structurée"], complexite: "quickwin" },
    { id: "sol-13", titre: "Génération scripts SQL ad-hoc", icon: "database", minutesGagnees: 35, typologies: ["Data structurée"], complexite: "projet_metier" },
    { id: "sol-14", titre: "Synthèse hebdo indicateurs PowerBI", icon: "bar-chart-3", minutesGagnees: 45, typologies: ["Synthèse"], complexite: "quickwin" },
    { id: "sol-15", titre: "Préparation supports CODIR", icon: "layers", minutesGagnees: 75, typologies: ["Rédaction"], complexite: "projet_metier" },
    { id: "sol-16", titre: "Veille concurrence automatisée", icon: "search", minutesGagnees: 30, typologies: ["Recherche / RAG"], complexite: "quickwin" }
  ],
  computedColors: {
    heat: ["#dc2626", "#f97316", "#f59e0b", "#84cc16", "#10b981"],
    riskMap: { Rouge: "#dc2626", Orange: "#f59e0b", Vert: "#10b981" }
  }
};
