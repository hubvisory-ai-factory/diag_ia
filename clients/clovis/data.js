const CLIENT_DATA = {
  branding: {
    slug: "clovis",
    clientName: "Clovis",
    clientFullName: "Clovis",
    sector: "Location & gestion de flottes Poids Lourds / VUL",
    missionCode: "CLV-IA-2026",
    missionTitle: "Audit de maturité IA",
    missionSubtitle: "Équipe Plateforme",
    period: "T2 2026",
    primaryColor: "#003366",
    secondaryColor: "#E30613",
    logoUrl: "assets/clovis_logo_white_backround.svg",
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
  perimetre: [
    { id: "gestionnaire_parc", nom: "Gestionnaire de Parc", icon: "truck" },
    { id: "assistante_gp", nom: "Assistante GP", icon: "clipboard" },
    { id: "charge_clientele", nom: "Chargé de Clientèle", icon: "headset" },
    { id: "resp_plateforme", nom: "Responsable Plateforme", icon: "server" },
    { id: "managers", nom: "Managers", icon: "briefcase" },
    { id: "organisation", nom: "Organisation (transverse)", icon: "git-merge" }
  ],
  globalMetrics: {
    solutionsRecensees: 28,
    casUsageRecenses: 14,
    produits: 6,
    maturiteGlobale: 2.6,
    totalRepondants: null /* TODO: nb de répondants — pill masquée tant que non renseigné */
  },
  // TODO confirmer valeurs radar (valeurs provisoires lues sur slide)
  axesRadar: [
    { axe: "Appétence au changement", scoreActuel: 4, description: "" },
    { axe: "Connaissance de l'IA", scoreActuel: 2, description: "" },
    { axe: "Autonomie d'usage", scoreActuel: 2, description: "" },
    { axe: "Usage actuel", scoreActuel: 3, description: "" },
    { axe: "Lecture & usage des données", scoreActuel: 2, description: "" }
  ],
  produits: [
    { id: "dashboard_pilotage", nom: "Dashboard pilotage", icon: "bar-chart-3", color: "#2563eb", description: "" },
    { id: "boite_mail", nom: "Boîte mail intelligente", icon: "mail", color: "#7c3aed", description: "" },
    { id: "assistant_plateforme", nom: "Assistant Plateforme", icon: "bot", color: "#0891b2", description: "" },
    { id: "agent_devis", nom: "Agent Devis", icon: "file-check", color: "#d97706", description: "" },
    { id: "agent_facture", nom: "Agent Facture", icon: "receipt", color: "#dc2626", description: "" },
    { id: "generation_docs", nom: "Génération automatisée de documents", icon: "file-text", color: "#059669", description: "" }
  ],
  catalogueSolutions: [
    { id: "SN1.1", fonctionnalite: "Analyste IA & créateur de dashboard", produitId: "dashboard_pilotage", objectif: `Permettre aux managers de construire et consulter leurs tableaux de bord en langage naturel, sans dépendance technique.`, description: `Une IA text-to-SQL connectée à l'ERP : le manager pose sa question en langage naturel, l'IA génère l'analyse et le visuel. Dashboards à la demande, sans intervention IT.`, votac: { valeur: 4, occurrence: 4, temps: 5, ia: 5, facilite: 3, total: 21 }, package: "P1", statut: "A valider", outils: ["VM", "Site"], casUsageLies: ["CU-1"] },
    { id: "SN1.2", fonctionnalite: "Détection & analyse des dérives", produitId: "dashboard_pilotage", objectif: `Alerter automatiquement les managers dès qu'un indicateur clé dévie de ses seuils, et en expliquer la cause, pour réagir sans attendre l'extraction mensuelle.`, description: `Un agent surveille les KPI en continu, détecte les dérives vs seuils, en identifie la cause (mode data analyst) et pousse l'alerte sur Teams ou le dashboard.`, votac: { valeur: 4, occurrence: 5, temps: 3, ia: 5, facilite: 2, total: 19 }, package: "P3", statut: "A valider", outils: ["VM", "Site"], casUsageLies: ["CU-1"] },
    { id: "SN1.3", fonctionnalite: "Prévision & anticipation des dérives", produitId: "dashboard_pilotage", objectif: `Doter les managers d'une capacité prédictive sur les données du parc pour anticiper les dérives avant qu'elles n'impactent les contrats.`, description: `Un agent IA de code exécute du Python (stats, forecasting) sur les données ERP pour projeter les indicateurs et anticiper les dérives de parc.`, votac: { valeur: 4, occurrence: 3, temps: 3, ia: 5, facilite: 1, total: 16 }, package: "P3", statut: "A valider", outils: ["VM", "Site", "Agent Coding"], casUsageLies: ["CU-1"] },
    { id: "SN2.1", fonctionnalite: "Tri & Qualification", produitId: "boite_mail", objectif: `Router chaque mail entrant vers le bon collaborateur sans intervention manuelle dans la boîte commune.`, description: `L'IA lit chaque mail entrant et applique les règles de routage (immatriculation, émetteur, objet). Le mail arrive directement dans la boîte du bon gestionnaire.`, votac: { valeur: 5, occurrence: 5, temps: 5, ia: 3, facilite: 5, total: 23 }, package: "P1", statut: "A valider", outils: ["N8N", "API Outlook"], casUsageLies: ["CU-2"] },
    { id: "SN2.2", fonctionnalite: "Résumé journalier", produitId: "boite_mail", objectif: `Offrir un résumé quotidien de l'activité mail pour reprendre la main sans relire chaque échange.`, description: `Chaque mail entrant est conservé dans une base de données ou récupéré via l'API Outlook. L'IA produit un résumé journalier consolidé de toute l'activité de la boîte.`, votac: { valeur: 3, occurrence: 5, temps: 4, ia: 5, facilite: 4, total: 21 }, package: "P1", statut: "A valider", outils: ["N8N", "API Outlook"], casUsageLies: ["CU-2"] },
    { id: "SN2.3", fonctionnalite: "Apprentissage continu", produitId: "boite_mail", objectif: `Améliorer en continu la pertinence du tri grâce aux corrections des collaborateurs.`, description: `Amélioration continue : lorsqu'un mail est trié manuellement, les règles sont automatiquement mises à jour.`, votac: { valeur: 3, occurrence: 3, temps: 3, ia: 5, facilite: 3, total: 17 }, package: "P2", statut: "A valider", outils: ["N8N"], casUsageLies: ["CU-2"] },
    { id: "SN3.1", fonctionnalite: "Rapports EBTS", produitId: "boite_mail", objectif: `Détecter les rapports EBTS entrants, les analyser et préparer le mail client prêt à valider.`, description: `Mail EBTS détecté → analyse du document en PJ → identification du destinataire (base immat × logistique) → brouillon Outlook pour validation humaine avant envoi.`, votac: { valeur: 3, occurrence: 5, temps: 5, ia: 5, facilite: 3, total: 21 }, package: "P2", statut: "A valider", outils: ["N8N", "API Outlook", "Excel"], casUsageLies: ["CU-3"] },
    { id: "SN10.1", fonctionnalite: "Déclencheur (CU-4 Planification ITM)", produitId: "boite_mail", objectif: `Automatiser l'extraction des données Zadig nécessaire à la planification du mois et fusion avec l'état de planification M-1.`, description: `L'agent réalise une extraction des données Zadig, effectue un tri pour identifier les données nécessaires à la construction de la planification.`, votac: { valeur: 5, occurrence: 3, temps: 5, ia: 5, facilite: 2, total: 20 }, package: "P2", statut: "A valider", outils: ["N8N", "Excel", "API ZADIG Lecture"], casUsageLies: ["CU-4"] },
    { id: "SN10.2", fonctionnalite: "Relance (CU-4 Planification ITM)", produitId: "boite_mail", objectif: `Automatiser les relances des visites du mois précédents nécessitant une actualisation.`, description: `Suite à l'analyse du fichier de planification croisé (M-1 et M), l'agent effectue les relances sur les visites non mises à jour du mois précédents.`, votac: { valeur: 5, occurrence: 3, temps: 5, ia: 5, facilite: 3, total: 21 }, package: "P2", statut: "A valider", outils: ["N8N", "API Outlook", "Base de données Immat X Contact"], casUsageLies: ["CU-4"] },
    { id: "SN10.3", fonctionnalite: "Analyse & Intégration ERP (CU-4 Planification ITM)", produitId: "boite_mail", objectif: `Automatiser la complétude et l'actualisation du fichier de planification ITM.`, description: `L'agent synthétise les retours des concessions suite aux relances par mail et intègre ces informations dans le fichier de planification croisé. Nécessite API Zadig écriture.`, votac: { valeur: 5, occurrence: 3, temps: 5, ia: 5, facilite: 2, total: 20 }, package: "P3", statut: "A valider", outils: ["N8N", "API Outlook", "Excel", "API ZADIG ECRITURE"], casUsageLies: ["CU-4"] },
    { id: "SN5.1", fonctionnalite: "Assistant équipe Plateforme (bot Teams + SharePoint)", produitId: "assistant_plateforme", objectif: `Permettre à chaque collaborateur d'interroger instantanément la base documentaire (serveur S, SharePoint) en langage naturel, sans solliciter un manager.`, description: `Un bot Teams / portail SharePoint répond aux questions des collaborateurs sur les procédures, contrats, barèmes. Accès au serveur S et SharePoint via recherche sémantique.`, votac: { valeur: 5, occurrence: 5, temps: 5, ia: 5, facilite: 4, total: 24 }, package: "P1", statut: "A valider", outils: ["VM", "Sharepoint", "Compte MS basic"], casUsageLies: ["CU-5"] },
    { id: "SN5.2", fonctionnalite: "Accès Force Réseau", produitId: "assistant_plateforme", objectif: `Permettre l'interrogation de la base Force Réseau (régiments, contacts terrain) sans navigation manuelle dans le site.`, description: `Extension de l'assistant permettant d'interroger la base Force Réseau (régiments, concessions, contacts) en langage naturel pour trouver un contact ou une information terrain rapidement.`, votac: { valeur: 4, occurrence: 4, temps: 3, ia: 5, facilite: 3, total: 19 }, package: "P2", statut: "A valider", outils: ["VM", "Site"], casUsageLies: ["CU-5"] },
    { id: "SN6.1", fonctionnalite: "Analyse de devis", produitId: "agent_devis", objectif: `Permettre aux gestionnaires de vérifier la conformité d'un devis (tarifs, références, contrat) via un portail dédié, sans recherche manuelle.`, description: `Site web sur lequel les collaborateurs uploadent le devis. L'IA analyse la cohérence avec le contrat et les barèmes. Output : texte listant les corrections à apporter, prêt à copier-coller.`, votac: { valeur: 5, occurrence: 5, temps: 5, ia: 5, facilite: 3, total: 23 }, package: "P2", statut: "A valider", outils: ["VM", "Outils de lecture de PDF"], casUsageLies: ["CU-6"] },
    { id: "SN6.2", fonctionnalite: "Mail de correction", produitId: "agent_devis", objectif: `Analyser les devis reçus par mail et générer un brouillon de mail de correction prêt à envoyer au garage, sans saisie manuelle.`, description: `Le portail liste les devis détectés dans la boîte mail. L'utilisateur lance l'analyse : l'outil rédige le mail de correction prêt à valider. Adhérence SN2.1 requise.`, votac: { valeur: 4, occurrence: 4, temps: 5, ia: 5, facilite: 2, total: 20 }, package: "P3", statut: "A valider", outils: ["VM", "Outils de lecture de PDF", "API Outlook"], casUsageLies: ["CU-6"] },
    { id: "SN7.1", fonctionnalite: "Renommage des factures", produitId: "agent_facture", objectif: `Renommer automatiquement chaque facture déposée sur SharePoint selon le critère d'identification ERP, pour accélérer le rapprochement documentaire.`, description: `L'agent détecte chaque nouveau document sur SharePoint, analyse le PDF, extrait le critère d'identification et renomme le fichier selon la convention ERP.`, votac: { valeur: 5, occurrence: 5, temps: 5, ia: 5, facilite: 4, total: 24 }, package: "P1", statut: "A valider", outils: ["N8N", "Sharepoint", "Outils de lecture de PDF"], casUsageLies: ["CU-7"] },
    { id: "SN7.2", fonctionnalite: "Upload GED (Zadig)", produitId: "agent_facture", objectif: `Renommer et uploader automatiquement les factures dans l'ERP après identification de la visite concernée, supprimant la séquence de clics manuels.`, description: `Une fois renommée, l'agent lit le nom de la facture, ouvre la visite correspondante dans Zadig via l'API en écriture, uploade le document et valide. Zéro intervention manuelle.`, votac: { valeur: 5, occurrence: 5, temps: 5, ia: 5, facilite: 3, total: 23 }, package: "P2", statut: "A valider", outils: ["N8N", "Sharepoint", "Outils de lecture de PDF", "API ZADIG ECRITURE"], casUsageLies: ["CU-7"] },
    { id: "SN8.1", fonctionnalite: "Dashboard pilotage IA", produitId: "dashboard_pilotage", objectif: `Rendre visible en temps réel l'activité des agents IA (tâches réalisées, validations en attente) pour garder le contrôle sur ce que l'IA fait.`, description: `Interface front listant les actions IA en back. Signale les validations en attente et notifie le collaborateur concerné, espace pour lancer une phase de relance.`, votac: { valeur: 5, occurrence: 5, temps: 3, ia: 4, facilite: 3, total: 20 }, package: "P1", statut: "A valider", outils: ["VM", "Site"], casUsageLies: ["CU-8"] },
    { id: "SN8.2", fonctionnalite: "Notifications Teams", produitId: "dashboard_pilotage", objectif: `Notifier proactivement les collaborateurs sur Teams lorsqu'une action est requise ou qu'une mise à jour importante est disponible.`, description: `En plus du dashboard de pilotage, le portail envoie des messages Teams pour alerter les collaborateurs sans qu'ils aient à consulter l'interface.`, votac: { valeur: 3, occurrence: 5, temps: 3, ia: 3, facilite: 3, total: 17 }, package: "P2", statut: "A valider", outils: ["VM", "Site", "Compte MS basic"], casUsageLies: ["CU-8"] },
    { id: "SN8.3", fonctionnalite: "Déclenchement actions IA", produitId: "dashboard_pilotage", objectif: `Permettre aux collaborateurs de déclencher des actions directement depuis le dashboard (relance, validation, MAJ) sans basculer sur un autre outil.`, description: `Intégration de boutons d'action dans le dashboard : relancer, valider un brouillon, mettre à jour un statut — tout sans quitter l'interface.`, votac: { valeur: 3, occurrence: 5, temps: 3, ia: 3, facilite: 2, total: 16 }, package: "P3", statut: "A valider", outils: ["VM", "Site"], casUsageLies: ["CU-8"] },
    { id: "SN10.1", fonctionnalite: "Déclencheur (CU-8 Reporting VT4)", produitId: "boite_mail", objectif: `Lancer automatiquement la création d'un fichier de suivi sur le marché VT4 à une fréquence définie.`, description: `A partir d'une source (Excel, Zadig, reporting), l'agent identifie les lignes nécessitant une relance et déclenche le processus. Source : Excel ou API Zadig Lecture selon le contexte.`, votac: { valeur: 5, occurrence: 4, temps: 5, ia: 5, facilite: 4, total: 4.6 }, package: "P1", statut: "A valider", outils: ["N8N", "Excel", "API ZADIG Lecture"], casUsageLies: ["CU-8"] },
    { id: "SN10.2", fonctionnalite: "Relance (CU-8 Reporting VT4)", produitId: "boite_mail", objectif: `Automatiser la phase de relance des lignes représentants des visites nécessitant une MAJ des informations de suivi.`, description: `L'agent interroge la matrice de contact pour identifier le destinataire selon le critère de la ligne. Il rédige le mail selon le ton défini puis l'envoie ou le place en brouillon.`, votac: { valeur: 5, occurrence: 4, temps: 5, ia: 5, facilite: 4, total: 23 }, package: "P1", statut: "A valider", outils: ["N8N", "API Outlook", "Base de données Immat X Contact"], casUsageLies: ["CU-8"] },
    { id: "SN10.3", fonctionnalite: "Analyse & Intégration ERP (CU-8 Reporting VT4)", produitId: "boite_mail", objectif: `Automatiser la complétude du fichier Excel et de l'ERP suite aux réponses aux relances.`, description: `L'agent synthétise les retours des concessions suite aux relances par mail et intègre ces justifications dans le fichier excel ainsi que dans l'ERP. Nécessite API Zadig écriture.`, votac: { valeur: 5, occurrence: 4, temps: 5, ia: 5, facilite: 2, total: 21 }, package: "P3", statut: "A valider", outils: ["N8N", "API Outlook", "Excel", "API ZADIG ECRITURE"], casUsageLies: ["CU-8"] },
    { id: "SN10.1", fonctionnalite: "Déclencheur (CU-9 Pénalités Arquus)", produitId: "boite_mail", objectif: `Identifier automatiquement les lignes nécessitant une relance à partir du fichier reçu par Arquus.`, description: `A partir d'un mail entrant (Arquus), une série de relances peut être générée pour obtenir les informations recherchées.`, votac: { valeur: 3, occurrence: 4, temps: 5, ia: 5, facilite: 5, total: 22 }, package: "P1", statut: "A valider", outils: ["N8N", "Excel", "API ZADIG Lecture"], casUsageLies: ["CU-9"] },
    { id: "SN10.2", fonctionnalite: "Relance (CU-9 Pénalités Arquus)", produitId: "boite_mail", objectif: `Automatiser la phase de relance des lignes représentants des visites en risque de pénalité.`, description: `L'agent Moteur de relance identifie les lignes de l'Excel nécessitant une justification et lance les relances nécessaires auprès des concessions concernées.`, votac: { valeur: 3, occurrence: 4, temps: 5, ia: 5, facilite: 4, total: 21 }, package: "P1", statut: "A valider", outils: ["N8N", "API Outlook", "Base de données Immat X Contact"], casUsageLies: ["CU-9"] },
    { id: "SN10.3", fonctionnalite: "Analyse & Intégration ERP (CU-9 Pénalités Arquus)", produitId: "boite_mail", objectif: `Automatiser la complétude du fichier de pénalités suite aux justifications des concessionnaires.`, description: `L'agent synthétise les retours des concessions suite aux relances et intègre les justifications dans le fichier excel exposé en comité pénalités Arquus. Nécessite API Zadig écriture.`, votac: { valeur: 3, occurrence: 4, temps: 5, ia: 5, facilite: 2, total: 19 }, package: "P3", statut: "A valider", outils: ["N8N", "API Outlook", "Excel", "API ZADIG ECRITURE"], casUsageLies: ["CU-9"] },
    { id: "SN10.3.1", fonctionnalite: "Relance si pas de réponse (ALL)", produitId: "boite_mail", objectif: `Relancer automatiquement si aucune réponse n'est reçue dans le délai imparti, sans intervention manuelle.`, description: `Si aucune réponse après X jours, l'agent déclenche une nouvelle relance avec un ton plus pressant. Le cycle est limité à N relances avant escalade vers un collaborateur.`, votac: { valeur: 3, occurrence: 4, temps: 3, ia: 5, facilite: 4, total: 19 }, package: "P1", statut: "A valider", outils: ["N8N", "API Outlook", "Base de données Immat X Contact"], casUsageLies: ["CU-10"] },
    { id: "SN11.3", fonctionnalite: "Traitement GLPI", produitId: "assistant_plateforme", objectif: `Automatiser la création de tickets GLPI à partir des signalements Teams, en s'assurant que toutes les informations requises sont collectées avant soumission.`, description: `Détection automatique des bugs Zadig remontés dans Teams par les managers. L'agent collecte les informations complètes et crée le ticket GLPI directement, sans intervention manuelle.`, votac: { valeur: 4, occurrence: 4, temps: 4, ia: 4, facilite: 3, total: 19 }, package: "P2", statut: "A valider", outils: ["VM", "Compte MS basic", "API GLPI"], casUsageLies: ["CU-11"] },
    { id: "SN13.1", fonctionnalite: "Dashboard impact collaborateur", produitId: "dashboard_pilotage", objectif: `Permettre à chaque collaborateur de visualiser l'impact de ses actions sur les KPIs de la Plateforme et de se situer par rapport à une période de référence.`, description: `Traduit les actions individuelles (relances envoyées, devis traités…) en impact sur les indicateurs clés. Comparaison par période.`, votac: { valeur: 3, occurrence: 3, temps: 3, ia: 5, facilite: 1, total: 15 }, package: "P3", statut: "A valider", outils: ["VM", "Site"], casUsageLies: ["CU-13"] }
  ],
  useCasesList: [
    { id: "CU-1", titre: "Pilotage temps réel & analyse autonome des déviances", idMetiers: ["resp_plateforme"], grandTheme: "Pilotage & reporting", grandThemeEmoji: "📊", problemeMetier: `Les managers détectent les déviances opérationnelles en fin de mois, lors des extractions manuelles de l'ERP. Entre les extractions, les problèmes s'accumulent ce qui a pour effet que les collaborateurs traitent le sujet une fois qu'il devient urgent. En ce qui concerne la rentabilité des marchés (et autres données), Florent reçoit chaque matin un tableau BI actualisé sur les dernières 24h mais ce tableau ne permet pas d'identifier rapidement la source d'une variation et par conséquent, ne permet pas la mise en place d'actions correctives rapides. Les déviances (rentabilité hors cible, catégorisation erronée, document manquant, visite à risque de pénalité) ne sont donc visibles qu'après qu'il soit trop tard pour agir sereinement.`, besoins: `Visibilité en temps réel : afficher au quotidien les indicateurs clés de la plateforme ; construction autonome par les managers (langage naturel). Détection et analyse des déviances : alerter automatiquement dès qu'un indicateur dérive de la cible ; identification de la source de variation d'un indicateur et proposition d'actions correctives. Prédictibilité : produire des projections sur les indicateurs clés ; signaler en amont les situations à risque avant qu'elles ne deviennent urgentes.`, irritants: [
        `Absence d'animation de la plateforme en temps réel — Données: 18 personnes sans indicateur temps réel · délai détection → diagnostic : plusieurs jours. Process à date: Aucun tableau de bord en temps réel aujourd'hui. Florent souhaitait des écrans affichant appels, CA, alertes mais n'a pas pu les mettre en place. Points de douleur: Dépendance aux individus, Pilotage réactif, Manque d'autonomie. Outils: Power BI, Genesys, Zadig / Locpro.`,
        `Interprétation des déviances de pilotage dans les tableaux de bord — Données: Plusieurs jours pour diagnostiquer les causes d'une déviance de données de performance. Process à date: Lecture des tableaux Power BI existants. En cas d'anomalie détectée, ticket à Mickaël pour créer une nouvelle vue ou extraction depuis Zadig. Analyse manuelle croisée des données. Délai entre détection et diagnostic : plusieurs jours. Points de douleur: Pilotage réactif, Dépendance aux individus, Manque d'autonomie, Qualité de données. Outils: Power BI, Zadig / Locpro.`,
        `Qualité des données hétérogène dans l'ERP — Données: 7/7 collaborateurs conscients de l'impact des données erronées. Process à date: Saisies hétérogènes par différents utilisateurs dans Zadig. Pas de contrôle à la saisie. Détection des erreurs lors des extractions mensuelles ou lors des contrôles clients. Points de douleur: Absence d'alerte, Qualité de données, Dépendance aux individus, Pilotage réactif. Métiers impactés: Responsable plateforme, Chargé de clientèle, Assistante GP. Outils: Zadig / Locpro, Excel.`
      ], chiffresCles: `18 personnes sans indicateur temps réel · délai détection→diagnostic plusieurs jours · dépendance à Mickaël`, metricsSucces: `détection des variations et mise en place d'actions correctives en moins de 48h`, solutionsRefs: [
        { fonctionnalite: "Analyste IA & créateur de dashboard", produitId: "dashboard_pilotage" },
        { fonctionnalite: "Détection & analyse des dérives", produitId: "dashboard_pilotage" },
        { fonctionnalite: "Prévision & anticipation des dérives", produitId: "dashboard_pilotage" }
      ], votac: { total: 12 } },
    { id: "CU-2", titre: "Tri & qualification de la boîte mail commune", idMetiers: ["gestionnaire_parc", "assistante_gp", "charge_clientele", "managers"], grandTheme: "Communication & flux entrants", grandThemeEmoji: "📧", problemeMetier: `L'ensemble de l'équipe Plateforme travaille sur une boite mail commune dans laquelle entre tous les emails, qu'importe l'objet ou le client. Chaque collaborateur doit, à plusieurs reprises dans la journée, effectuer un tri manuel de l'intégralité de la boite mail afin d'identifier ceux qui le concerne.`, besoins: `Tri et routage
• Classer automatiquement chaque email entrant par type (demande de RDV, retour de statut, document reçu, réclamation, relance)
• Router chaque email vers le collaborateur concerné selon des règles paramétrables
Priorisation et résumé
• Signaler les emails urgents ou à traitement prioritaire (risque de pénalité, document bloquant la facturation)
• Produire un résumé de l'activité entrante du jour par collaborateur (s'il le demande)`, irritants: [
        `Tri manuel des mails dans le néant — 3-4 fois/jour × 10 min = ~40 min/jour par gestionnaire. Sur 6 personnes concernées : ~4h de travail collectif quotidien perdu sur cette seule tâche. Process à date : Ouverture manuelle de la boîte commune plusieurs fois/jour. Lecture de chaque mail + PJ pour identification. Aucun critère automatique de tri. Métiers impactés : Gestionnaire de parc, Assistante GP, Chargé de clientèle. Outils : Outlook, Zadig / Locpro.`,
        `Prise en charge du tri des mails par les managers — Plus 1h/jour/collaborateur en moyenne (transverse) · côté CC : 45 min/jour par CC. Points de douleur : Chronophage, Dépendance aux individus, Absence d'alerte, Pilotage réactif. Process à date : Jérémie tague les mails de toute son équipe chaque soir de 17h à 18h. Philippe trie 1-2h/jour en parallèle de ses autres tâches. Métier impacté : Chargé de clientèle. Outils : Outlook, Zadig / Locpro.`
      ], chiffresCles: `Cité par 4–5 personas · 1–2h/jour (Philippe) · 3–4 passages/jour (Annouar)`, metricsSucces: `Baisse du 80% du temps dédié au tri des emails`, solutionsRefs: [
        { fonctionnalite: "Tri & Qualification", produitId: "boite_mail" },
        { fonctionnalite: "Résumé journalier", produitId: "boite_mail" },
        { fonctionnalite: "Apprentissage continu", produitId: "boite_mail" }
      ], votac: { total: 11 } },
    { id: "CU-3", titre: "Génération assistée des rapports EBTS & mails clients", idMetiers: ["gestionnaire_parc", "charge_clientele"], grandTheme: "Communication & flux entrants", grandThemeEmoji: "📧", problemeMetier: `Chaque matin, le Gestionnaire de Parc reçoit par mail les rapports de dépannages réalisés dans la nuit par l'entreprise (EBTS - sous traitant de Clovis pour les dépannages de nuit). Il doit les analyser (cause, ce que couvre le contrat etc) et faire une synthèse par mail à envoyer au client.`, besoins: `Fonction A — Analyse du rapport EBTS : Lire automatiquement chaque rapport EBTS reçu par mail en pièce jointe ; Extraire les informations clés (véhicule concerné, nature de la panne, intervention réalisée, pièces remplacées) ; Qualifier automatiquement ce que couvre le contrat client pour cette intervention. Fonction B — Génération du mail client : Générer le mail de synthèse structuré à destination du client à partir de l'analyse du rapport ; Soumettre le mail au GP pour validation avant envoi — aucun envoi automatique sans approbation.`, irritants: [
        `Rédaction et envoi des rapports de dépannage EBTS — Point de douleur : Chronophage. Process à date : Annouar reçoit les rapports BTS dans le néant, analyse chaque intervention (complète ou provisoire ? contrat ou hors contrat ?), puis rédige un rapport client standardisé par copier-coller en changeant les données spécifiques. Données : 10 à 15 rapports en pic le matin · ~800 dépannages/an sur le marché Intermarché. Outils concernés : Outlook, Zadig / Locpro, Genesys.`
      ], chiffresCles: `~800 dépannages/an · ~800 mails/an · pic 10–15 le matin · (mail client structuré à confirmer en base)`, metricsSucces: `100% des rapports sont traités automatiquement`, solutionsRefs: [
        { fonctionnalite: "Rapports EBTS", produitId: "boite_mail" }
      ], votac: { total: 11 } },
    { id: "CU-4", titre: "Automatisation de la planification", idMetiers: ["gestionnaire_parc"], grandTheme: "Planification & coordination", grandThemeEmoji: "📅", problemeMetier: `Clovis gère pour le compte d'Intermarché l'ensemble de la maintenance préventive réglementaire d'un parc de ~1 800 semi-remorques répartis sur des bases en France. Clovis est intermédiaire entre Intermarché (le client donneur d'ordre) et les ateliers Renault Trucks (les prestataires qui réalisent physiquement les entretiens).
Chaque véhicule du parc doit respecter un calendrier contractuel d'entretiens obligatoires, défini dans le contrat Intermarché :
• VP (Visite Préventive) — 3 fois/an
• VGP (Visite Générale Périodique) — 2 fois/an
• Mines (Contrôle technique) — 1 fois/an
• Vidange groupe — 1 fois/an

Le problème est de savoir ce qui reste vraiment à planifier parce que l'état réel du parc (ce qui a été fait, ce qui est en cours, ce qui est en retard) n'est pas fiable dans Zadig sans un travail manuel préalable de nettoyage et de confirmation.
Concrètement, le gestionnaire passe ses 2-3 jours à :
• Réconcilier les données Zadig avec la réalité terrain (via appels/mails)
• Arbitrer manuellement les cas ambigus (véhicule en mouvement entre bases, prestation partiellement faite, atelier indisponible)
• Reconstruire une vue cohérente du parc à partir de sources multiples et hétérogènes`, besoins: `Extraction et génération de la matrice
  • Extraire automatiquement depuis Zadig les véhicules à planifier pour M+1 (confirmer accès Zadig sur les véhicules ayant des échéances réglementaires à venir)
  • Fusionner avec le planning du mois précédent et highlight les véhicules non traités
  • Relance automatique des lignes concernant les véhicules non traités le mois précédent (lien avec CU relances automatiques)

Mise à jour des statuts
  • Consolider les réponses par véhicule
  • Mettre à jour le statut de planification

Confirmer le planning
  • Envoyer le planning au client
  • Effectuer les ajustements nécessaires en fonction de ses réponses`, irritants: [
        `Construction manuelle de la planification — Process à date : Étape 0 — Prérequis : nettoyage de la base (1ère quinzaine du mois). Avant même de commencer le planning du mois suivant, les gestionnaires et assistantes passent la 1ère quinzaine à relancer prestataires et client pour mettre à jour les statuts dans Zadig (visites réalisées non saisies, documents manquants, retards). Sans ce nettoyage, la base de données contient des statuts faux qui faussent le planning. Un système de push-mails automatiques existe dans Zadig pour ces relances, mais il est dysfonctionnel (doublons, manquements signalés). Étape 1 — Extraction de la matrice nationale (Philippe, ~1h) : extraction depuis Zadig de toutes les alertes réglementaires du parc (~1 700+ véhicules × 4 types d'entretiens), génération via un fichier Excel avec formules d'une matrice de propositions de dates en excluant week-ends et jours fériés. Étape 2 — Construction du planning par gestionnaire (Annouar × 3 GP, 2-3 jours) : filtrer manuellement les bases, fusionner avec le planning du mois précédent, traiter ligne par ligne chaque véhicule (statut réalisé → supprimer la ligne ; statut incertain/inconnu → appel ou mail au prestataire/client ; retard → reporter et signaler), affecter une date et un atelier Renault Trucks. Traitement ligne par ligne = principal goulot (150 à 200 lignes actives/mois par gestionnaire). Durée : 2 à 3 jours par gestionnaire, soit 6 à 9 jours/homme cumulés sur les 3 GP. Étape 3 — Envoi et validation (avant le 20 du mois). Données : 1700+ véhicules, 4 types de prestations. Extraction Zadig + traitement Excel ~1h pour Philippe. Fenêtre de 5 jours ouvrables pour finaliser. Outils : Zadig / Locpro, Excel, Outlook. Points de douleur : Chronophage, Tâche répétitive, Risque d'erreur.`,
        `Traitement ligne par ligne du planning — Process à date : Réception de la matrice, sélection manuelle des bases, fusion avec le planning précédent, traitement ligne par ligne pour qualifier le statut de chaque véhicule (fait, en retard, à reprogrammer). Données : 2–3 jours/mois · chaque ligne incertaine = minimum 1 appel ou 1 mail supplémentaire. Métiers impactés : Gestionnaire de parc, Assistante GP. Points de douleur : Chronophage, Absence d'alerte, Pilotage réactif.`,
        `Construction et suivi manuel du plan de maintenance (VT4) — Process à date : Chaque mois, l'AGP extrait depuis l'outil de reporting un fichier Excel brut contenant toutes les opérations de maintenance à venir pour son parc. Elle conserve uniquement les colonnes utiles (date d'échéance, opération, immatriculation, régiment), copie-colle manuellement les données dans son propre fichier Excel de suivi, puis recontacte chaque régiment un mois avant chaque échéance pour prévenir et planifier. Données : 10+ régiments à prévenir par cycle · 0 méthode commune entre les AGP. Métier impacté : Assistante GP. Outils : Excel, Zadig / Locpro. Points de douleur : Chronophage, Qualité de données, Dépendance aux individus.`
      ], chiffresCles: `2–3 jours/mois (Annouar) · à scinder éventuellement (planif vs coordination)`, metricsSucces: `• Moins de 10min pour valider la matrice de planification
  • Traitement ligne par ligne : 1/2 journée et baisse de 80% du temps consacré aux relances téléphoniques
  • 100% des planning sont terminés avant le 20 du mois`, solutionsRefs: [
        { fonctionnalite: "Déclencheur (CU-4 Planification ITM)", produitId: "boite_mail" },
        { fonctionnalite: "Relance (CU-4 Planification ITM)", produitId: "boite_mail" },
        { fonctionnalite: "Analyse & Intégration ERP (CU-4 Planification ITM)", produitId: "boite_mail" }
      ], votac: { total: 11 } },
    { id: "CU-5", titre: "Recherche documentaire intelligente (serveur S / SharePoint", idMetiers: ["gestionnaire_parc", "assistante_gp", "charge_clientele", "resp_plateforme"], grandTheme: "Gestion documentaire & saisie", grandThemeEmoji: "📁", problemeMetier: `Les collaborateurs de la Plateforme ont accès à de nombreux documents structurants (contrats, fiches tarifaires, documents techniques..) mais l'accessibilité n'est pas fluide d'un point de vue user, c'est de la recherche dans des sharepoint, des excel etc. De plus, certains collaborateurs sont présents dans l'équipe depuis de nombreuses années et ont donc des connaissances liées à leur expérience. Malheureusement, ces connaissances ne sont pas documentées et donc accessibles pour les autres membres de l'équipe.`, besoins: `• Obtenir des réponses en adéquation avec le contexte de l'équipe et du collaborateur
• Obtenir des réponses précises
• Assurer la montée en compétences des collaborateurs
• Avoir un process de mise à jour de l'outil clair (nouveaux contrats, nouvelles documentation..)
• L'assistant doit montée en compétences au fur et à mesure qu'il est utilisé

Assistant Plateforme permettant de centraliser et interroger la connaissance collective`, irritants: [
        `Recherche documentaire manuelle dans le serveur — Navigation manuelle dans l'arborescence du serveur. Ouverture de dossiers et de fichiers jusqu'à trouver le bon document. En cas d'échec, question orale au manager. (Données: 30 à 50% du temps journalier des managers ; Points de douleur: Pilotage réactif, Dépendance aux individus, Manque d'autonomie ; Outils: SharePoint / Serveur S)`,
        `Absence de suivi des documents manquants — Suivi mémoriel uniquement. Jérémie relance uniquement s'il y pense. Pas de système de rappel automatique à J+2 ou J+5 sans réponse. (Données: 500 visites en statut "réalisé / attente de documents" ; Points de douleur: Chronophage, Dépendance aux individus, Absence d'alerte ; Outils: Zadig / Locpro, Outlook)`,
        `Questions techniques mécaniques des assistantes aux GP — Dounia ou Ivona identifient un doute technique lors du traitement d'un rapport ou d'un devis. Elles interrompent le GP pour poser la question. Le GP répond et reprend son activité. (Données: Non chiffré en temps côté AGP ; Points de douleur: Dépendance aux individus, Manque d'autonomie ; Outils: Zadig / Locpro, Teams)`,
        `Sollicitations managers pour questions contractuelles — Un collaborateur ne trouve pas la réponse dans les documents disponibles (ou ne les consulte pas) et interrompt directement le manager. Réponse immédiate par le manager pour ne pas bloquer. (Données: 30-50% du temps des CC ; Points de douleur: Chronophage, Manque d'autonomie ; Outils: Outlook, Teams, SharePoint / Serveur S)`,
        `Expertise non partagée sur les fichiers de suivi — Jérémie génère seul le fichier chaque mardi avec des formules complexes. Aucune documentation du processus. Aucun doublon de compétence dans l'équipe. (Données: 1 seule personne maîtrise le fichier de suivi hebdomadaire VT4 : Jérémie. Marché à pénalités, suivi critique ; Points de douleur: Dépendance aux individus, Absence de documentation, Risque d'erreur ; Outils: Excel, Zadig / Locpro ; Statut: Hors restitution)`
      ], chiffresCles: `Serveur non interrogeable · accords pluriannuels introuvables rapidement`, metricsSucces: `Réduire les sollicitations des managers de 80%`, solutionsRefs: [
        { fonctionnalite: "Assistant équipe Plateforme (bot Teams + SharePoint)", produitId: "assistant_plateforme" },
        { fonctionnalite: "Accès Force Réseau", produitId: "assistant_plateforme" }
      ], votac: { total: 14 } },
    { id: "CU-6", titre: "Contrôle automatisé de cohérence des devis", idMetiers: ["charge_clientele", "gestionnaire_parc"], grandTheme: "Analyse & contrôle des devis", grandThemeEmoji: "📋", problemeMetier: `Les Gestionnaire de Parc reçoivent des devis à valider avant de générer le bon de commande pour officiellement lancer l'intervention du concessionnaire sur un véhicule. Pour cela, il réceptionne le devis dans leur boite mail, ils doivent ensuite contrôler ligne par ligne la cohérence des informations renseignées (prix, intervention, main d'oeuvre associée). En cas d'erreur, il faut retourner le devis avec les données à modifier (le GP barre les informations avec Adobe ou décrit les changements dans le corps du mail) à l'expéditeur afin qu'il fasse les modifications. Ces allers retours peuvent être nombreux.`, besoins: `**Lecture et Extraction du devis**
• Lire les devis reçus par mail
• Drag and drop du devis dans l'outil
• Extraire les données clés ligne par ligne

**Contrôle de cohérence**
• Croiser les données clés avec données contractuelles et financières qui lie Clovis avec le client
• Identifier et lister les écarts
• Automatisation de la rédaction des corrections à effectuer

**Demande de correction à la concession**
• Générer automatiquement le mail de retour à la concession listant les corrections à apporter
• Soumettre le mail au GP pour validation et suivre la relance`, irritants: [
        `Vérification ligne par ligne des prix de devis — Métier impacté : Gestionnaire de parc. Outils : Zadig / Locpro, Excel. Points de douleur : Chronophage, Qualité de données. Données : 60% du temps de travail d'un GP. Process à date : Devis PDF ouvert d'un côté, barème Excel Arcus de l'autre. Vérification manuelle ligne par ligne de chaque référence de pièce, chaque prix, chaque temps de main d'œuvre. (Dans la restitution)`,
        `Comparaison manuelle des devis modifiés — Métier impacté : Gestionnaire de parc. Outils : Outlook, Excel. Points de douleur : Chronophage, Tâche répétitive, Risque d'erreur. Données : Hugo a testé iLovePDF pour comparer deux versions d'un devis — résultat inutilisable. Cas fréquent : une concession rajoute 10-15 lignes dans un devis déjà validé, dispersées dans le document. Relecture complète obligatoire à chaque fois. Process à date : Relecture complète du nouveau devis sans outil de différenciation. Hugo a testé iLovePDF sans succès ('il surlignait tout'). (Hors restitution)`,
        `Vérification de conformité des rapports prestataires — Métier impacté : Assistante GP. Outils : Zadig / Locpro, Excel, Infinity by Ekolis. Points de douleur : Chronophage, Qualité de données. Données : 5 min si tout est correct · durée indéterminée si erreurs (dépend de la réactivité du prestataire). Process à date : Réception du rapport prestataire. Vérification point par point : bonne IMAT, kilométrage cohérent avec la dernière visite, date conforme, prestation correspondant au planning, tarifs conformes au contrat. Demande de modification si erreur. (Dans la restitution)`
      ], chiffresCles: `Contrôle vs barèmes contractuels Excel · impact financier`, metricsSucces: `Gain de temps de 70% pour les GP
Baisse des taux d'erreurs dans les devis de 50%`, solutionsRefs: [
        { fonctionnalite: "Analyse de devis", produitId: "agent_devis" },
        { fonctionnalite: "Mail de correction", produitId: "agent_devis" }
      ], votac: { total: 15 } },
    { id: "CU-7", titre: "Automatisation de la saisie documentaire (factures GED + PDF)", idMetiers: ["assistante_gp", "gestionnaire_parc"], grandTheme: "Gestion documentaire & saisie", grandThemeEmoji: "📁", problemeMetier: `Les factures arrivent scannées dans un dossier serveur (Sharepoint), sans renommage ni structure. Chaque collaborateur ouvre chaque fichier PDF manuellement pour y lire le numéro de visite, puis associe la facture à la bonne entrée dans Zadig.
Les concessions envoient souvent tous les documents d'une intervention dans un seul PDF (OPC, CSF, checklist, factures). Dounia doit identifier manuellement les pages de chaque document, les enregistrer séparément, puis les uploader un par un dans les catégories GED correspondantes dans Zadig.`, besoins: `• Lire un PDF de facture entrant (scan, qualité variable) et en extraire le numéro de visite ou tout identifiant permettant le rapprochement avec une entrée Zadig
• Renommer automatiquement le fichier selon une convention de nommage définie (à spécifier : format cible attendu)
• Associer le fichier renommé à la bonne visite dans la GED Zadig sans action humaine
• Gérer une file d'exception pour les cas non traités automatiquement : document illisible, numéro de visite absent ou non reconnu — ces cas doivent être présentés à un opérateur pour traitement manuel, sans être perdus
• Ne jamais associer une facture à un mauvais numéro de visite : en cas de doute, basculer en exception plutôt que de risquer une association incorrecte

Fonction B — Découpage intelligent des PDF multi-documents
• Détecter automatiquement les frontières entre documents au sein d'un PDF multi-pages (changement de type, d'en-tête, de mise en page)
• Découper le PDF en fichiers distincts correspondant à chaque document identifié
• Typer chaque fichier découpé selon les catégories documentaires connues de Zadig : OPC, CSF, checklist, facture, etc. (la liste exhaustive des catégories GED est à récupérer et intégrer comme référentiel)
• Uploader chaque fichier dans la catégorie GED correspondante dans Zadig
• Gérer une file d'exception pour les documents dont le type ne peut pas être déterminé avec suffisamment de confiance`, irritants: [
        `Intégration manuelle des factures dans la GED — Les factures arrivent scannées dans un dossier serveur, sans renommage. Chaque fichier est ouvert pour lire le numéro de visite, puis associé manuellement dans Zadig. Points de douleur : Chronophage, Qualité de données. Données : 2 min de traitement par facture · jusqu'à 300 factures de retard à gérer par collaborateur. Métiers impactés : Gestionnaire de parc, Assistante GP, Chargé de clientèle.`,
        `Découpage manuel des PDF multi-documents — Dounia ouvre le PDF, identifie les pages de chaque document, les enregistre séparément, puis les uploade un par un dans les bonnes catégories GED de Zadig. Point de douleur : Chronophage. Données : 20% des documents. Métier impacté : Assistante GP.`
      ], chiffresCles: `Tentative iLovePDF sans succès (Ivona)`, metricsSucces: `• Réduire de 90% le nombre de factures dans le Sharepoint en attente d'intégration`, solutionsRefs: [
        { fonctionnalite: "Renommage des factures", produitId: "agent_facture" },
        { fonctionnalite: "Upload GED (Zadig)", produitId: "agent_facture" }
      ], votac: { total: 12 } },
    { id: "CU-8", titre: "Reporting client automatisé", idMetiers: ["charge_clientele", "resp_plateforme"], grandTheme: "Pilotage & reporting", grandThemeEmoji: "📊", problemeMetier: `• Construction de fichier manuelle de reporting hebdomadaire: 
Ce fichier est produit par extraction manuelle depuis Zadig, puis retraité avec des formules Excel pour intégrer les commentaires des semaines précédentes. Un seul collaborateur est capable de construire ce planning. 
  • Retraitement individuel des données de reporting: 
Dans le reporting client (vitrine de l'ERP), chaque assistante exporte un fichier brut depuis l'outil puis le retravaille dans un second fichier excel personnel pour n'en garder que les colonnes utiles (IMAT, dates, régiment..). Elle réalise ses relances et commentaires associés dans ce fichier avant de les reporter dans l'ERP.`, besoins: `**Extraction automatique des données **
  •  Extraire automatiquement les données Zadig selon une fréquence définie, sans déclenchement manuel
  • Intégrer les données de la période précédente pour permettre la comparaison automatique

**Générer le reporting **
  •  Générer automatiquement le document de reporting dans le format attendu par le client VT4 — Excel ou PDF selon la préférence contractuelle (format cible à récupérer auprès de Jérémy ou du contrat)
  • La production du document n'est pas dépendante d'une seule personne 
  • Produire une synthèse narrative des points d'attention (véhicules à risque, indicateurs dégradés vs semaine précédente)`, irritants: [
        `Construction manuelle des reportings clients — Process à date: Extraction manuelle depuis Zadig. Construction du fichier hebdomadaire (véhicules en gestion, visites ouvertes/clôturées, top 10 des immobilisés, RNT) avec formules Excel. Mise en forme et envoi. Données: 1h de préparation pour quelques secondes de présentation / semaine côté VT4. Points de douleur: Chronophage, Qualité de données, Pilotage réactif. Métiers impactés: Chargé de clientèle, Responsable plateforme. Outils: Zadig / Locpro, Excel, Power BI. Dans la restitution.`,
        `Extraction et retraitement manuel des données de reporting — Process à date: Dounia exporte un fichier brut depuis l'outil de reporting, puis le retravaille dans un second fichier Excel personnel avec les colonnes utiles (dates, IMAT, régiment). Données: Chaque assistante maintient son propre fichier Excel. Export brut depuis l'outil de reporting + retraitement dans un second fichier personnel. Aucune méthode commune. Chaque nouvelle assistante recrée son propre système. Points de douleur: Chronophage, Qualité de données, Risque d'erreur. Métier impacté: Assistante GP. Outils: Zadig / Locpro, Excel. Hors restitution.`
      ], chiffresCles: `Dépend de la qualité des données ERP (angle mort)`, metricsSucces: ``, solutionsRefs: [
        { fonctionnalite: "Dashboard pilotage IA", produitId: "dashboard_pilotage" },
        { fonctionnalite: "Notifications Teams", produitId: "dashboard_pilotage" },
        { fonctionnalite: "Déclenchement actions IA", produitId: "dashboard_pilotage" },
        { fonctionnalite: "Déclencheur (CU-8 Reporting VT4)", produitId: "boite_mail" },
        { fonctionnalite: "Relance (CU-8 Reporting VT4)", produitId: "boite_mail" },
        { fonctionnalite: "Analyse & Intégration ERP (CU-8 Reporting VT4)", produitId: "boite_mail" }
      ], votac: { total: 11 } },
    { id: "CU-9", titre: "Gestion des pénalités & suivi réglementaire", idMetiers: ["resp_plateforme", "gestionnaire_parc"], grandTheme: "Pilotage & reporting", grandThemeEmoji: "📊", problemeMetier: `Le suivi réglementaire des visites en retard est entièrement manuel, sans alerte et sans anticipation. Ces manquements se répercutent en pénalités pour Clovis.

Gestion mensuelle des pénalités Arquus (Florent) : Chaque mois, Florent reçoit un fichier listant 40 à 50 visites en retard sur lesquelles Arquus (constructeur) peut facturer des pénalités. Son process actuel : ouvrir Outlook, envoyer le même mail individuellement à chacun des 40-50 garages concernés, attendre les réponses, synthétiser les justifications reçues, les présenter au comité de pénalité, puis renvoyer les décisions à chaque garage.

Gestion des retards : Les collaborateurs ont accès à un icône "cloche" dans l'ERP afin de consulter les visites en retard (= la visite est planifiée mais le véhicule n'est pas considéré comme entré ou sorti de cette visite). Les collaborateurs effectuent donc des relances pour connaître et mettre à jour le statut réel du véhicule → Lien avec la planification mensuelle côté intermarché.`, besoins: `Traitement du fichier Arquus :
- Ingérer automatiquement le fichier mensuel Arquus dès réception dans la boîte mail de Florent
- Identifier et structurer la liste des visites en retard avec leurs métadonnées (numéro de visite, garage, immatriculation…)

Envoi des demandes de justifications :
- Croiser automatiquement chaque visite avec les données Zadig pour qualifier le contexte du retard
- Générer un mail de demande de justification personnalisé pour chaque garage concerné (nom du garage, numéro de visite, immatriculation, nature du retard identifié)
- Envoyer les mails à l'aide d'une seule action de validation
- Suivre les réponses reçues par garage et associer automatiquement chaque réponse à la visite correspondante

Préparer le dossier comité :
- Relancer automatiquement les garages sans réponse après un délai prédéfini
- Générer le document de synthèse destiné au comité Arquus, regroupant toutes les justifications par visite dans le format attendu`, irritants: [
        `Gestion manuelle des pénalités Arquus — Grand thème : 📧 Communication & Gestion des flux entrants. Métier impacté : Responsable plateforme. Outils concernés : Outlook, Excel, Zadig / Locpro. Points de douleur : Pilotage réactif, Chronophage, Absence d'alerte. Données : 40–50 mails individuels/mois · 2,5 jours de travail/mois · montant des pénalités à estimer. Process à date : Réception d'un fichier de 40-50 visites en retard. Envoi du même mail individuellement à chaque garage. Attente et synthèse des réponses. Présentation au comité de pénalité. Renvoi des décisions à chaque garage.`,
        `Suivi des retards réglementaires et justification de prime — Grand thème : 📅 Planification & Coordination terrain. Métier impacté : Gestionnaire de parc. Outils concernés : Zadig / Locpro, Excel. Points de douleur : Chronophage, Qualité de données, Absence d'alerte. Données : 100% des retards doivent être justifiés · en moyenne 10% par GP en retard de justification. Process à date : Hugo consulte chaque matin le reporting pour voir l'état de son parc de 1029 véhicules. Il documente chaque retard avec une justification (concession indisponible, pièces manquantes, véhicule en OPEX...).`,
        `Relances réglementaires par mail — Grand thème : 📅 Planification & Coordination terrain. Métier impacté : Gestionnaire de parc, Assistante GP. Outils concernés : Zadig / Locpro, Outlook. Points de douleur : Chronophage, Pilotage réactif, Absence d'alerte. Données : > 500 visites en attente de documents. Process à date : Consultation de la cloche Zadig pour identifier les retards. Envoi manuel de mails de relance individuels à chaque concession ou client. Vérification manuelle des doublons générés par le système automatique.`
      ], chiffresCles: `50 000 €/an de pénalités · 2,5 jours/mois · 40–50 mails/mois`, metricsSucces: `• 100% des pénalités pour manque d'information sont évitées`, solutionsRefs: [
        { fonctionnalite: "Déclencheur (CU-9 Pénalités Arquus)", produitId: "boite_mail" },
        { fonctionnalite: "Relance (CU-9 Pénalités Arquus)", produitId: "boite_mail" },
        { fonctionnalite: "Analyse & Intégration ERP (CU-9 Pénalités Arquus)", produitId: "boite_mail" }
      ], votac: { total: 11 } },
    { id: "CU-10", titre: "Automatiser et suivre la relance", idMetiers: ["gestionnaire_parc", "assistante_gp", "charge_clientele", "resp_plateforme"], grandTheme: "Communication & flux entrants", grandThemeEmoji: "📧", problemeMetier: `Mettre fin aux relances oubliées et aux dossiers qui stagnent : l'IA suit chaque relance envoyée, relance automatiquement en cas de silence et escalade vers le manager si nécessaire — puis, dans un second temps, détecte elle-même quand une relance doit être déclenchée sans attendre l'action du collaborateur.`, besoins: `**Détection des visites à relancer**
• Détecter qu'une relance a été envoyée manuellement depuis Outlook et créer automatiquement une entrée de suivi associée à la visite concernée
**• Génération et envoi des relances**
• Générer un mail de rebond automatique si pas de réponse à J+3, soumis à validation en 1 clic avant envoi et process d'escalade si pas de réponse
• Tracer l'ensemble du fil de relance par visite dans un tableau de bord centralisé
• Surveiller en continu les statuts Zadig et détecter automatiquement les visites dont un document attendu n'est pas reçu après un délai paramétrable par type de visite et par client
**Suivi des réponses et escalade**
• Générer la première relance automatiquement et la soumettre au collaborateur pour validation en 1 clic avant envoi
• Adapter le contenu et le ton selon l'interlocuteur (concession vs régiment) et le niveau d'urgence (première relance vs rebond)
**Tableau de bord centralisé**
• Tableau de bord par collaborateur de l'état de ses relances (nombres, statut, sujet…)`, irritants: [
        `Relances réglementaires par mail — Process à date : Consultation de la cloche Zadig pour identifier les retards. Envoi manuel de mails de relance individuels à chaque concession ou client. Vérification manuelle des doublons générés par le système automatique. Données : > 500 visites en attente de documents. Points de douleur : Chronophage, Pilotage réactif, Absence d'alerte. Métiers : Gestionnaire de parc, Assistante GP. Outils : Zadig / Locpro, Outlook.`,
        `Relances téléphoniques hebdomadaires aux concessions — Process à date : Jérémie extrait la liste des visites en cours. Dounia appelle chaque concession pour connaître le statut (entré ? en attente de pièces ? terminé ?). Elle reporte manuellement les réponses dans un fichier Excel. Données : Jusqu'à 16h par mois / collaborateur. Points de douleur : Chronophage, Absence d'alerte, Dépendance aux individus. Métier : Assistante GP. Outils : Genesys, Excel, Zadig / Locpro.`,
        `Absence de suivi des documents manquants — Process à date : Suivi mémoriel uniquement. Jérémie relance uniquement s'il y pense. Pas de système de rappel automatique à J+2 ou J+5 sans réponse. Données : 500 visites en statut "réalisé / attente de documents". Points de douleur : Chronophage, Dépendance aux individus, Absence d'alerte. Métiers : Chargé de clientèle, Gestionnaire de parc. Outils : Zadig / Locpro, Outlook.`
      ], chiffresCles: `500 visites en attente de docs (Jérémy) · 40-50 mails de relance/mois Arcus (Florent, 2,5j/mois) · relances plan maintenance vers 10+ régiments (Dounia) · 0 système de suivi des non-réponses`, metricsSucces: `• Taux de relances déclenchées automatiquement vs manuellement · Délai moyen de réception des documents (avant / après)
• Nombre de visites en statut 'attente docs'
• Temps mensuel consacré aux relances
• Nombre de dossiers pénalisables non relancés`, solutionsRefs: [
        { fonctionnalite: "Relance si pas de réponse (ALL)", produitId: "boite_mail" }
      ], votac: { total: 13 } },
    { id: "CU-11", titre: "Automatiser le lien Plateforme - GLPI", idMetiers: ["organisation"], grandTheme: "Autonomie & management", grandThemeEmoji: "🤝", problemeMetier: `Lorsqu'un bug Zadig est détecté par un collaborateur, la remontée vers la DSI suit un circuit dégradé :
  • Remontée interne à l'équipe Plateforme: les collaborateurs signalent le problème dans une conversation TEAMS dédiées. Parfois/souvent, ces remontées sont incomplètes (manque des détails comme capture d'écran, champ impacté, déclenchement du bug…) ce qui nécessite une relance d'un manager pour obtenir les informations manquantes
  • Création d'un ticket GLPI : un manager crée des tickets GLPI pour signaler les bugs principaux à la DSI`, besoins: `•  Détecter un signalement de bug posté dans le canal Teams dédié et demander automatiquement les informations manquantes au collaborateur
  • Reformuler automatiquement le signalement en description structurée afin de l'insérer dans un ticket GLPI
  • Générer automatiquement le ticket GLPI formaté selon le template attendu
  • Soumettre le ticket après validation (clic) par un responsable côté Plateforme
  • Envoyer le ticket validé à GLPI sans action manuelle supplémentaire`, irritants: [
        `Rédaction et qualification des tickets DSI — Process à date : Lorsqu'un bug ou un dysfonctionnement Zadig est détecté, les collaborateurs remontent l'incident à Jérémie, qui doit retravailler la demande avant de créer le ticket GLPI : les remontées sont systématiquement incomplètes. Jérémie agit donc comme filtre et rédacteur par défaut. (Points de douleur : Chronophage, Dépendance aux individus ; Métier impacté : Chargé de clientèle ; Outils : Teams, Zadig / Locpro)`
      ], chiffresCles: ``, metricsSucces: ``, solutionsRefs: [
        { fonctionnalite: "Traitement GLPI", produitId: "assistant_plateforme" }
      ], votac: { total: 10 } },
    // TODO lien solutions
    { id: "CU-12", titre: "Simplifier la prise de rdv tri-partite", idMetiers: ["assistante_gp"], grandTheme: "Communication & flux entrants", grandThemeEmoji: "📧", problemeMetier: `Chaque prise de rendez-vous pour une intervention sur véhicule VT4 implique trois parties : le régiment (disponibilité du véhicule et du conducteur), la concession (créneau atelier disponible) et Clovis (coordination et ouverture de la visite dans Zadig). Aujourd'hui, cette coordination est entièrement manuelle et séquentielle, sans outil partagé.

Le process à date: recevoir la demande du militaire par mail, contacter la concession par mail pour obtenir une date de RDV, attendre la réponse, transmettre la date au régiment pour validation, attendre la confirmation du régiment, puis créer la visite dans Zadig en remplissant manuellement l'ensemble des champs (immatriculation, kilométrage, qualifications, travaux à effectuer, opérations de maintenance prévisionnelles). Chaque visite nécessite un minimum de 3 échanges, et souvent davantage car les régiments répondent avec des délais longs ("dispo dans un mois", "pas de dispo") ou ne répondent pas du tout, obligeant à relancer.`, besoins: `**Orchestration automatique des visites VT4

  • **Envoyer automatiquement les demandes de disponibilité à chaque régiment concerné (10+) sans envoi manuel un par un
  • Suivre les réponses reçues et relancer automatiquement les régiments sans réponse après un délai défini (adhérence autre cas d'usage)
  • Une fois la disponibilité régiment confirmée, envoyer automatiquement la demande de créneau à la concession correspondante
  • Consolider les réponses des concessions et mettre à jour la matrice sans ressaisie manuelle

**Pré-remplissage automatique des visites dans Zadig **

  • Une fois le RDV confirmé par les deux parties, pré-remplir automatiquement les champs de création de visite dans Zadig à partir des informations déjà disponibles : immatriculation, régiment, type d'intervention, date confirmée, concession, opérations de maintenance prévisionnelles associées
  • Soumettre à validation (et complément) à l'AGP avant enregistrement définitif`, irritants: [
        `Coordination des disponibilités régiments / concessions — Grand thème : 📅 Planification & Coordination terrain. Process à date : Dounia contacte chaque régiment par mail pour ses disponibilités, puis chaque concession pour valider le créneau. Relances multiples si pas de réponse. DOM-TOM contactés uniquement par mail (décalage horaire). Données : 10+ régiments à coordonner · minimum 3 échanges par visite. Métier impacté : Assistante GP. Outils concernés : Outlook, Zadig / Locpro. Points de douleur : Chronophage, Absence d'alerte.`
      ], chiffresCles: ``, metricsSucces: `• Réduction du nombre d'échanges par prise de RDV 
  • Réduire le temps de traitement par prise de RDV 
  • Réduire le délais de réponse des concessions et clients`, solutionsRefs: [], votac: { total: 13 } },
    // TODO confirmer métier
    { id: "CU-13", titre: "Pilotage activités des collaborateurs Plateforme", idMetiers: ["organisation"], grandTheme: "", grandThemeEmoji: "", problemeMetier: `Les collaborateurs de la plateforme n'ont aucune visibilité sur l'impact concret de leur travail au quotidien : les données existent dans Zadig et le BI, mais elles sont agrégées au niveau équipe ou marché, jamais restituées à l'échelle individuelle. Sans retour sur leur propre activité, les opérationnels peinent à se situer, à se fixer des repères et à maintenir leur engagement dans la durée.`, besoins: `**Consolidation et calcul des indicateurs individuels**
Croiser automatiquement les données Zadig et BI pour calculer les indicateurs clés par collaborateur : visites clôturées, CA généré sur son périmètre, RDV planifiés vs réalisés, taux de conformité réglementaire, documents traités
Actualiser les indicateurs à une fréquence définie (quotidienne ou hebdomadaire) sans action manuelle
Définir le périmètre de chaque collaborateur (bases, véhicules, marchés affectés) comme filtre de référence pour les calculs
**Tableau de bord N1 — Vue brute**
Afficher les indicateurs clés du jour et de la semaine en cours pour chaque collaborateur
Permettre une comparaison simple avec la période précédente (semaine N-1, mois N-1)
Rendre le tableau accessible sans formation : lecture immédiate, sans manipulation de données
**Tableau de bord N2 — Vue contextuelle**
Situer le collaborateur par rapport à son historique personnel (tendance sur le mois)
Signaler les indicateurs en décrochage ou en progression notable
Permettre un drill-down sur un indicateur pour en comprendre la composition (ex : quelles visites clôturées, sur quels véhicules)
**Tableau de bord N3 — Vue gamifiée**
Attribuer un score hebdomadaire ou mensuel par collaborateur à partir de ses indicateurs clés
Afficher une progression individuelle (niveau, streak, objectif atteint) et une comparaison anonymisée ou nominative avec l'équipe selon le choix du management
Mettre en avant les performances notables (top clôtures de la semaine, zéro retard réglementaire sur le mois) pour créer des moments de reconnaissance informels
**Angles morts à valider**
Les indicateurs individuels sont-ils calculables depuis Zadig tel qu'il est aujourd'hui, ou faut-il un travail de nettoyage/structuration de la donnée en amont ?
Le périmètre de chaque collaborateur est-il formalisé dans Zadig (affectation bases / véhicules) ou reconstruit manuellement aujourd'hui ?
Quel est le niveau d'appétence de l'équipe pour la comparaison entre pairs — à valider avec Florent avant de concevoir la couche N3 ?
Des ajustements sur les indicateurs ou le niveau de détail des besoins ?`, irritants: [], chiffresCles: ``, metricsSucces: ``, solutionsRefs: [
        { fonctionnalite: "Dashboard impact collaborateur", produitId: "dashboard_pilotage" }
      ], votac: { total: null } },
    // TODO lien solutions
    { id: "CU-14", titre: "Cadre IA : licences, sécurité, acculturation", idMetiers: ["organisation"], grandTheme: "Gouvernance & acculturation IA", grandThemeEmoji: "⚙️", problemeMetier: `C'est un prérequis organisationnel. Aujourd'hui, la plateforme CLovis présente trois manques structurels : • absence de cadre d'utilisation de l'IA • Absence de baseline documentée • Absence d'acculturation structurée`, besoins: `Support N1 à travers l'assistant → Escalade si pas de réponse`, irritants: [
        `Rédaction et qualification des tickets DSI — Lorsqu'un bug ou un dysfonctionnement Zadig est détecté, les collaborateurs remontent l'incident à Jérémie, qui doit retravailler la demande avant de créer le ticket GLPI : les remontées sont systématiquement incomplètes. Jérémie agit donc comme filtre et rédacteur par défaut. (Points de douleur : Chronophage, Dépendance aux individus ; Métier impacté : Chargé de clientèle ; Outils : Teams, Zadig / Locpro)`
      ], chiffresCles: `0 politique sécurité · 0 licence centralisée · prérequis, non scoré comme un CU à ROI · (irritant 'usages IA sans cadre' absent de la base — à créer)`, metricsSucces: ``, solutionsRefs: [], votac: { total: null } }
  ],
  risques: [],
  roadmap: [],
  principesDirecteurs: [],
  glossaire: [
    { terme: "LLM", definition: "Large Language Model — modèle de langage capable de comprendre et générer du texte (GPT, Claude, Mistral)." },
    { terme: "Prompt", definition: "Instruction donnée à un modèle IA pour obtenir une réponse. La qualité du prompt conditionne la qualité du résultat." },
    { terme: "Agent", definition: "Système IA capable d'enchaîner plusieurs actions de façon autonome pour accomplir une tâche de bout en bout." },
    { terme: "RAG", definition: "Retrieval-Augmented Generation — un LLM connecté à une base documentaire interne pour répondre à partir de vos propres données." },
    { terme: "OCR", definition: "Reconnaissance optique de caractères — extraction du texte contenu dans une image ou un PDF scanné (factures, devis)." },
    { terme: "N8N", definition: "Outil d'automatisation no-code/low-code permettant d'orchestrer des workflows entre applications (mails, ERP, IA)." },
    { terme: "Text-to-SQL", definition: "Génération automatique de requêtes SQL à partir d'une question posée en langage naturel." },
    { terme: "Scraping", definition: "Extraction automatisée d'informations depuis des pages web (ex. portail Force Réseau)." },
    { terme: "Fine-tuning", definition: "Spécialisation d'un modèle pré-entraîné sur un domaine ou les données d'une entreprise." },
    { terme: "GED", definition: "Gestion Électronique de Documents — système de classement et d'archivage numérique des documents (ex. Zadig)." },
    { terme: "ERP / Zadig", definition: "Progiciel de gestion intégré ; Zadig/Locpro est l'ERP métier utilisé pour la gestion de parc et la facturation." },
    { terme: "Power BI / Dashboard", definition: "Outil de visualisation de données et tableaux de bord de pilotage des indicateurs clés." },
    { terme: "VM / Hébergement", definition: "Machine virtuelle et infrastructure (On-Premise ou Azure Cloud) hébergeant les solutions IA." },
    { terme: "Hallucination", definition: "Réponse IA factuellement incorrecte présentée comme vraie. Principal risque des LLM." },
    { terme: "Quick Win", definition: "Cas d'usage à fort retour sur investissement et faible complexité, déployable rapidement." },
    { terme: "VOTAC", definition: "Grille de scoring d'un cas d'usage : Valeur métier, Occurrence, Temps consommé, potentiel IA (Atout), Complexité/Faisabilité." }
  ],
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
    description: "Nous restons à votre entière disposition pour débriefer ces résultats et lancer les ateliers de cadrage de la suite de la mission.",
    members: [
      { name: "TODO: membre 1", role: "TODO", email: "", initials: "?" }
    ],
    ctaText: "Contacter l'équipe projet",
    ctaSubject: "Audit IA Clovis - Suite de la mission"
  },
  ui: {
    sections: { dashboard: "Dashboard global", metiers: "Espaces métier", charte: "Charte & Risques", roadmap: "Feuille de route", glossaire: "Glossaire IA" },
    blocks: {
      perimetreTitle: "Périmètre de la mission",
      radarTitle: "Positionnement organisationnel",
      radarSubtitle: "Maturité IA — 5 axes (valeurs provisoires)",
      casUsageTitle: "Cas d'usage recensés",
      casUsageCta: "Explorer les espaces métier",
      ucModalEyebrow: "Détail du cas d'usage",
      ucModalDescLabel: "Besoins",
      ucModalIrritant: "Irritants identifiés",
      ucModalTools: "Outils actuels",
      ucModalGains: "Indicateurs de succès",
      ucModalClose: "Fermer",
      catalogueTitle: "Catalogue des solutions",
      catalogueSubtitle: "Solutions à valider — scoring VOTAC & packaging P1/P2/P3",
      risquesTitle: "Principes directeurs — Charte IA",
      roadmapTitle: "Feuille de route IA",
      glossaireTitle: "Glossaire IA",
      methodoTitle: "Guide méthodologique : Typologies & Complexité",
      methodoSubtitle: "Comprendre les critères d'évaluation de l'audit IA",
      backToDashboard: "← Retour au Dashboard Global"
    }
  },
  computedColors: {
    heat: ["#dc2626", "#f97316", "#f59e0b", "#84cc16", "#10b981"],
    riskMap: { Rouge: "#dc2626", Orange: "#f59e0b", Vert: "#10b981" }
  }
};
