const CLIENT_DATA = {
  branding: {
    slug: "",
    clientName: "Nom du Client",
    clientFullName: "Nom du Client SAS",
    sector: "Secteur d'activité",
    missionCode: "CLI-IA-2026",
    missionTitle: "Audit de maturité IA",
    missionSubtitle: "Sous-titre de la mission",
    auditor: "Cabinet Conseil IA",
    period: "T1 2026",
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
    introSubtitle: "Comment lire l'audit",
    typologiesExplications: [
      { id: "type_a", nom: "Typologie A", icon: "file-search", couleur: "primary", definition: "Description de la première typologie de cas d'usage.", exemple: "Exemple concret d'application de cette typologie." },
      { id: "type_b", nom: "Typologie B", icon: "layers", couleur: "primary", definition: "Description de la deuxième typologie.", exemple: "Exemple concret." },
      { id: "type_c", nom: "Typologie C", icon: "zap", couleur: "accent", definition: "Description de la troisième typologie.", exemple: "Exemple concret." }
    ],
    complexiteCriteres: [
      { id: "faible", niveau: "Faible", description: "Mise en place rapide", caracteristiques: ["Outil existant", "Pas d'intégration SI"], exemples: ["Résumé automatique", "Tri de mails"], delaiMoyen: "< 1 mois", investissement: "< 5k€" },
      { id: "moyenne", niveau: "Moyenne", description: "Intégration nécessaire", caracteristiques: ["API à connecter", "Formation requise"], exemples: ["Workflow automatisé", "Dashboard prédictif"], delaiMoyen: "1-3 mois", investissement: "5-20k€" },
      { id: "forte", niveau: "Forte", description: "Projet structurant", caracteristiques: ["Données à préparer", "Modèle sur mesure"], exemples: ["Prédiction de pannes", "Moteur de recommandation"], delaiMoyen: "3-12 mois", investissement: "> 20k€" }
    ]
  },
  hubvisoryContext: {
    firmName: "Hubvisory",
    firmBaseline: "Cabinet de conseil expert en stratégie, produit et industrialisation de l'IA",
    teamIntro: "L'équipe mobilisée pour cet audit",
    contactEmail: "contact@hubvisory.com"
  },
  hubvisoryTeam: { members: [] },
  quickWinsGeneriques: [
    { id: "qw1", titre: "Quick win générique n°1", description: "Description du premier quick win transverse.", icon: "zap", tags: ["Productivité", "Transverse"] },
    { id: "qw2", titre: "Quick win générique n°2", description: "Description du deuxième quick win.", icon: "clock", tags: ["Qualité"] },
    { id: "qw3", titre: "Quick win générique n°3", description: "Description du troisième quick win.", icon: "check-circle", tags: ["Confort"] }
  ],
  dataGovernance: {
    sources: [
      { nom: "Source A", type: "CRM", qualite: 4, description: "Base de données clients principale" },
      { nom: "Source B", type: "ERP", qualite: 3, description: "Gestion des opérations" },
      { nom: "Source C", type: "Excel", qualite: 2, description: "Fichiers de reporting manuels" }
    ],
    scoreExploitation: 3.2,
    axesAmelioration: [
      { titre: "Centralisation des données", description: "Réduire les silos entre services", priorite: "Haute" },
      { titre: "Automatisation des collectes", description: "Éliminer les saisies manuelles", priorite: "Moyenne" }
    ]
  },
  gouvernanceApprofondie: {
    risquesOperationnels: [
      { titre: "Risque opérationnel n°1", description: "Description du risque identifié", impact: "Élevé" },
      { titre: "Risque opérationnel n°2", description: "Description du deuxième risque", impact: "Modéré" }
    ],
    enjeuxOrganisationnels: [
      { titre: "Défi organisationnel n°1", description: "Description du défi identifié", impact: "Critique" },
      { titre: "Défi organisationnel n°2", description: "Deuxième défi", impact: "Élevé" }
    ],
    besoinsFormation: [
      { titre: "Besoin de formation n°1", description: "Description du besoin", niveau: "Managers" },
      { titre: "Besoin de formation n°2", description: "Deuxième besoin", niveau: "Opérationnels" }
    ]
  },
  processMapping: {
    actuel: {
      titre: "Processus actuel",
      etapes: [
        { libelle: "Étape 1", outil: "Collecte manuelle", type: "manuel" },
        { libelle: "Étape 2", outil: "Traitement dans Excel", type: "saisie" },
        { libelle: "Étape 3", outil: "Validation hiérarchique", type: "decision" }
      ]
    },
    cible: {
      titre: "Processus cible",
      etapes: [
        { libelle: "Étape 1", outil: "Ingestion automatique", type: "api" },
        { libelle: "Étape 2", outil: "Traitement IA", type: "ia" },
        { libelle: "Étape 3", outil: "Validation assistée", type: "decision" }
      ]
    }
  },
  perimetre: [
    { id: "departement_a", nom: "Département A", effectif: 5, icon: "briefcase",
      frequenceUsage: { quotidien: 40, hebdomadaire: 30, mensuel: 20, jamais: 10 },
      dureeAdoption: { moins6mois: 40, de6a12mois: 40, plus12mois: 20 }
    },
    { id: "departement_b", nom: "Département B", effectif: 3, icon: "users",
      frequenceUsage: { quotidien: 50, hebdomadaire: 25, mensuel: 15, jamais: 10 },
      dureeAdoption: { moins6mois: 30, de6a12mois: 50, plus12mois: 20 }
    },
    { id: "departement_c", nom: "Département C", effectif: 8, icon: "settings",
      frequenceUsage: { quotidien: 30, hebdomadaire: 35, mensuel: 25, jamais: 10 },
      dureeAdoption: { moins6mois: 50, de6a12mois: 30, plus12mois: 20 }
    }
  ],
  globalMetrics: {
    maturiteGlobale: 2.5,
    confianceGlobale: 3.0,
    shadowIaOffRoad: 15,
    totalRepondants: 16,
    casUsageRecenses: 12,
    quickWinsCount: 5,
    benchmarkDelta: "+0.3 vs benchmark secteur"
  },
  axesRadar: [
    { axe: "Stratégie IA", scoreActuel: 2.0, scoreCible: 4.0, description: "Vision et feuille de route IA" },
    { axe: "Données", scoreActuel: 2.5, scoreCible: 4.5, description: "Qualité et accessibilité des données" },
    { axe: "Compétences", scoreActuel: 1.8, scoreCible: 3.5, description: "Compétences IA des équipes" },
    { axe: "Technologie", scoreActuel: 3.0, scoreCible: 4.0, description: "Infrastructure et outils" },
    { axe: "Gouvernance", scoreActuel: 1.5, scoreCible: 4.0, description: "Cadre éthique et réglementaire" },
    { axe: "Culture", scoreActuel: 2.2, scoreCible: 3.8, description: "Appétence et adoption" }
  ],
  heatmapMatrix: [
    { idMetier: "departement_a", metier: "Département A", usage: 3, confiance: 4 },
    { idMetier: "departement_b", metier: "Département B", usage: 2, confiance: 3 },
    { idMetier: "departement_c", metier: "Département C", usage: 4, confiance: 2 }
  ],
  frequencyUsage: [
    { bucket: "Quotidien", pct: 42 },
    { bucket: "Hebdomadaire", pct: 31 },
    { bucket: "Mensuel", pct: 18 },
    { bucket: "Jamais", pct: 9 }
  ],
  adoptionDuree: [
    { bucket: "< 6 mois", pct: 38 },
    { bucket: "6-12 mois", pct: 45 },
    { bucket: "> 12 mois", pct: 17 }
  ],
  stackByMetier: [
    { idMetier: "departement_a", outils: 4, confiance: 72 },
    { idMetier: "departement_b", outils: 7, confiance: 55 },
    { idMetier: "departement_c", outils: 3, confiance: 80 }
  ],
  useCasesList: [
    { id: "uc1", idMetier: "departement_a", titre: "Cas d'usage n°1", description: "Description du premier cas d'usage identifié.", typologies: ["type_a"], complexite: 2, priorite: "Court terme", minutesGagnees: 45, gains: ["Productivite"], votes: 4, isQuickWin: true },
    { id: "uc2", idMetier: "departement_a", titre: "Cas d'usage n°2", description: "Description du deuxième cas d'usage.", typologies: ["type_b", "type_c"], complexite: 3, priorite: "Moyen terme", minutesGagnees: 30, gains: ["Qualite"], votes: 3, isQuickWin: false },
    { id: "uc3", idMetier: "departement_b", titre: "Cas d'usage n°3", description: "Description du troisième cas d'usage.", typologies: ["type_a"], complexite: 1, priorite: "Court terme", minutesGagnees: 60, gains: ["Productivite", "Confort"], votes: 5, isQuickWin: true },
    { id: "uc4", idMetier: "departement_b", titre: "Cas d'usage n°4", description: "Quatrième cas d'usage.", typologies: ["type_c"], complexite: 4, priorite: "Long terme", minutesGagnees: 20, gains: ["Qualite"], votes: 2, isQuickWin: false },
    { id: "uc5", idMetier: "departement_c", titre: "Cas d'usage n°5", description: "Cinquième cas d'usage.", typologies: ["type_b"], complexite: 2, priorite: "Court terme", minutesGagnees: 50, gains: ["Productivite"], votes: 4, isQuickWin: true },
    { id: "uc6", idMetier: "departement_c", titre: "Cas d'usage n°6", description: "Sixième cas d'usage identifié.", typologies: ["type_a", "type_b"], complexite: 3, priorite: "Moyen terme", minutesGagnees: 35, gains: ["Confort"], votes: 3, isQuickWin: false }
  ],
  risques: [
    { id: "r1", libelle: "Risque identifié n°1", note: "Détail du risque et de son contexte", niveau: "Rouge" },
    { id: "r2", libelle: "Risque identifié n°2", note: "Détail du deuxième risque", niveau: "Orange" },
    { id: "r3", libelle: "Risque identifié n°3", note: "Détail du troisième risque", niveau: "Vert" },
    { id: "r4", libelle: "Risque identifié n°4", note: "Détail du quatrième risque", niveau: "Orange" }
  ],
  roadmap: [
    { type: "Quick-wins", horizon: "0-3 mois", titre: "Gains rapides", items: ["Action rapide n°1", "Action rapide n°2", "Action rapide n°3"], impact: "Fort", complexite: "Faible" },
    { type: "Structurel", horizon: "3-12 mois", titre: "Transformation structurelle", items: ["Action structurelle n°1", "Action structurelle n°2"], impact: "Très fort", complexite: "Moyenne" },
    { type: "Strategique", horizon: "12+ mois", titre: "Vision long terme", items: ["Action stratégique n°1", "Action stratégique n°2"], impact: "Transformant", complexite: "Élevée" }
  ],
  glossaire: [
    { terme: "Intelligence Artificielle", definition: "Ensemble de théories et techniques visant à simuler l'intelligence humaine par une machine." },
    { terme: "Machine Learning", definition: "Sous-domaine de l'IA permettant aux machines d'apprendre à partir de données sans être explicitement programmées." },
    { terme: "Shadow IA", definition: "Usage d'outils IA par les collaborateurs hors du cadre gouverné par la DSI." },
    { terme: "Quick Win", definition: "Action à fort impact et faible complexité déployable rapidement." },
    { terme: "LLM", definition: "Large Language Model — modèle de langage de grande taille entraîné sur de vastes corpus de texte." }
  ],
  ui: {
    showAdmin: false,
    locale: "fr-FR",
    blocks: {
      perimetreTitle: "Périmètre de l'audit",
      maturityTitle: "Maturité IA globale",
      shadowTitle: "Shadow IA détectée",
      radarTitle: "Positionnement multi-axes",
      radarSubtitle: "Vue d'ensemble",
      radarLegendActuel: "Score actuel",
      radarLegendCible: "Cible 2027",
      heatmapTitle: "Cartographie par métier",
      heatmapSubtitle: "Maturité croisée",
      frequenceTitle: "Fréquence d'utilisation IA",
      adoptionTitle: "Durée d'adoption",
      metricsUsageEyebrow: "Métriques d'utilisation",
      metricsUsageTitle: "Fréquence & adoption — vue granulaire",
      metricsUsageSubtitle: "Bascule global ↔ métier pour comparer les pratiques",
      metricsTabGlobal: "Au global",
      freqBuckets: { quotidien: "Quotidien", hebdomadaire: "Hebdomadaire", mensuel: "Mensuel", jamais: "Jamais" },
      adoptionBuckets: { moins6mois: "< 6 mois", de6a12mois: "6-12 mois", plus12mois: "> 12 mois" },
      casUsageTitle: "Cas d'usage identifiés",
      casUsageCta: "Explorer les espaces métier",
      risquesTitle: "Inventaire des risques",
      roadmapTitle: "Feuille de route",
      glossaireTitle: "Glossaire IA",
      promptsTitle: "Banque de prompts personnalisés"
    }
  },
  computedColors: {
    heat: ["#dc2626", "#f97316", "#f59e0b", "#84cc16", "#10b981"],
    riskMap: { Rouge: "#dc2626", Orange: "#f59e0b", Vert: "#10b981" }
  },
  promptsBanque: {
    departement_a: "Tu es [rôle] chez {{client}}. À partir de [source de données], [action attendue]. Format de sortie : [format]. Contraintes : [contraintes].\n\nDonnées :\n{{coller les données}}",
    departement_b: "Tu es [rôle] chez {{client}}. Rédige [type de document] pour [destinataire] en t'appuyant sur [contexte]. Ton : [ton attendu]. Max [nombre] lignes.\n\nContexte :\n{{coller le contexte}}",
    departement_c: "Tu es [rôle] chez {{client}}. Analyse [données source] et produis [livrable]. Critères : [critères d'évaluation].\n\nDonnées :\n{{coller les données}}"
  }
};
