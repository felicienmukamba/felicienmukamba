import type { Dictionary } from "./en"

export const fr: Dictionary = {
  meta: {
    title: "Félicien Mukamba — Ingénieur Logiciel & AI Engineer | Fondateur de SOSIDE (Bukavu, RDC)",
    description:
      "Ingénieur logiciel senior, AI Engineer et fondateur de SOSIDE à Bukavu, RDC. Plateformes web sur mesure, automatisation de processus, RAG et agents IA en production. Tarifs négociables et adaptés à votre budget.",
    keywords: [
      "Félicien Mukamba",
      "Ingénieur logiciel Bukavu",
      "AI Engineer RDC",
      "AI Agent Manager",
      "Développeur full-stack Bukavu",
      "SOSIDE Bukavu",
      "Automatisation processus Bukavu",
      "Logiciel sur mesure RDC",
      "Solutions informatiques Sud-Kivu",
      "Caisse hors-ligne Mobile Money RDC",
      "RAG et LLM en production",
      "Spring Boot Next.js Congo",
      "Développeur Goma Kinshasa",
      "Transformation digitale PME ONG RDC",
    ],
    ogAlt: "Félicien Mukamba — Ingénieur Logiciel & AI Engineer à Bukavu, RDC",
  },

  a11y: {
    skip: "Aller au contenu",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    toggleTheme: "Basculer entre thème clair et sombre",
    language: "Langue",
    primaryNav: "Navigation principale",
    newTab: "s'ouvre dans un nouvel onglet",
  },

  nav: {
    about: "À propos",
    ai: "IA",
    services: "Services",
    experience: "Parcours",
    projects: "Projets",
    skills: "Compétences",
    lab: "Lab",
    contact: "Contact",
  },

  hero: {
    available: "Disponible pour de nouveaux projets · Bukavu & à distance",
    eyebrow: "Ingénieur Logiciel & IA · Chef de projet · Fondateur de SOSIDE",
    headlineStart: "Je construis des plateformes sûres",
    headlineAccent: "et les agents IA",
    headlineEnd: "qui les font tourner.",
    intro:
      "J'aide PME, ONG, écoles et cliniques à remplacer Excel, papier et ressaisies par des logiciels fiables — qui tournent même sans réseau, gèrent le Mobile Money et intègrent l'IA avec des garde-fous. Ingénieur logiciel & IA à Bukavu, fondateur de SOSIDE.",
    ctaPrimary: "Démarrer un projet",
    ctaWork: "Voir mes réalisations",
    ctaWhatsapp: "Écrire sur WhatsApp",
    waMessage: "Bonjour Félicien, j'ai visité votre site et j'aimerais discuter d'un projet.",
    trust: ["Premier échange sans engagement", "Devis adapté à votre budget", "Hors-ligne & Mobile Money"],
    proofLabel: "Plateformes conçues et architecturées",
    recruiter: "Recruteur ou partenaire technique ?",
    rolesLabel: "Aujourd'hui",
    roles: ["AI Engineer", "Chef de projet", "AI Agent Manager", "Ingénieur Logiciel", "Architecte Système", "Fondateur"],
    location: "Bukavu, RD Congo",
    chips: { founder: "Fondateur · SOSIDE", gdsc: "GDSC Lead 2023" },
    scroll: "Défiler",
  },

  metrics: [
    { value: "3", label: "plateformes B2B livrées comme fondateur" },
    { value: "10K+", label: "dossiers étudiants gérés simultanément" },
    { value: "−40%", label: "de time-to-market grâce aux microservices" },
    { value: "200+", label: "développeurs réunis au DevFest KIVU" },
  ],

  about: {
    kicker: "À propos",
    title: "Une ingénierie qui",
    titleAccent: "inspire confiance.",
    paragraphs: [
      "Je suis le fondateur de SOSIDE COMPANY SAS et ingénieur full-stack senior chez Aumsoft Technology. Je mène des produits complexes du premier croquis au tableau blanc jusqu'à la production — et je reste responsable de leur comportement ensuite.",
      "Mon travail se situe là où la fiabilité compte le plus : identité citoyenne (PGCC), gestion hospitalière (HMS Elite), SaaS multi-tenant pour les universités (UMS) et commerce avec une caisse qui fonctionne hors ligne (Maago). Je travaille avec Spring Boot, React, Next.js, PostgreSQL et Docker, et j'explore Rust pour les composants critiques.",
      "Aujourd'hui, j'investis pleinement l'ingénierie IA : livrer des fonctionnalités LLM solides en production, et piloter des équipes d'agents IA avec la même rigueur que mes systèmes distribués — rôles clairs, observabilité et supervision humaine.",
    ],
    facts: [
      { label: "Basé à", value: "Bukavu, RD Congo · UTC+2" },
      { label: "Langues", value: "Français, anglais, swahili, lingala" },
      { label: "Focus", value: "Systèmes distribués · agents IA" },
      { label: "Actuellement", value: "Fondateur @ SOSIDE · Chef de projet & ingénieur @ Aumsoft" },
    ],
  },

  ai: {
    kicker: "Ingénierie IA",
    title: "Du prompt aux",
    titleAccent: "agents en production.",
    intro:
      "Deux rôles complémentaires. En tant qu'AI Engineer, je construis les fonctionnalités propulsées par les LLM. En tant qu'AI Agent Manager, je pilote les agents qui accomplissent un vrai travail — je définis ce qu'ils peuvent faire, je mesure leur performance et je garde l'humain aux commandes.",
    roles: [
      {
        badge: "AI Engineer",
        title: "Des fonctionnalités LLM qui tiennent en production.",
        points: [
          "RAG sur données privées : embeddings, pgvector, recherche hybride et reranking.",
          "Tool use et function calling branchés sur des backends Spring Boot et Next.js existants.",
          "Sorties structurées, prompts versionnés et interfaces en streaming instantanées.",
          "Bancs d'évaluation — jeux de référence, LLM-as-judge et tests de régression en CI.",
        ],
      },
      {
        badge: "AI Agent Manager",
        title: "Piloter des agents IA comme une équipe d'élite.",
        points: [
          "Définir le rôle, les outils et les permissions de chaque agent selon le moindre privilège.",
          "Orchestrer des workflows multi-agents avec passages de relais clairs et validations humaines.",
          "Suivre qualité, latence et coût par tâche grâce au tracing et aux tableaux de bord.",
          "Garde-fous et gestion d'incidents : défense contre l'injection de prompt, masquage des données personnelles, journaux d'audit.",
        ],
      },
    ],
    pipeline: {
      title: "Comment je pilote un workflow d'agents",
      request: "Demande",
      orchestrator: "Orchestrateur",
      agents: ["Recherche", "Build", "Revue"],
      human: "Validation humaine",
      ship: "Production",
      caption:
        "Chaque agent a un périmètre, chaque étape est tracée, et rien n'atteint la production sans validation humaine.",
    },
  },

  services: {
    kicker: "Services & Solutions SOSIDE",
    title: "Des solutions concrètes,",
    titleAccent: "pensées pour vos résultats.",
    intro:
      "Du diagnostic express au déploiement de systèmes métiers complets et d'assistants IA en production. Nous concevons des logiciels robustes, adaptés aux réalités du terrain et aux contraintes de connectivité en RDC.",
    negotiableNotice: {
      badge: "Devis clair, adapté à votre budget",
      title: "Vous investissez dans un résultat, pas dans une grille tarifaire.",
      description:
        "PME locale, ONG humanitaire, établissement scolaire, clinique ou grande structure : chaque projet est unique. Nous ne publions pas de grille tarifaire fixe car tous nos forfaits sont discutés et négociés selon votre périmètre, votre calendrier et votre trésorerie.",
      cta: "Discuter d'une proposition sur mesure",
    },
    filterAll: "Tous les services",
    filterCore: "Services principaux",
    filterSectors: "Solutions sectorielles",
    items: [
      {
        id: "diagnostic",
        category: "core",
        title: "Diagnostic Digital & Audit IA",
        badge: "Recommandé pour démarrer",
        pricingTag: "60–120 min",
        description:
          "En 60 à 120 minutes, nous cartographions vos processus métier, chiffrons le temps perdu et identifions 3 opportunités d'automatisation et d'IA à plus fort impact immédiat.",
        deliverables: [
          "Cartographie détaillée de vos flux de travail actuels",
          "Estimation chiffrée des heures et coûts récupérables",
          "Rapport d'audit de 3 à 7 pages avec recommandations",
          "Plan d'action priorisé à 30 jours (devis sans engagement)",
        ],
        tags: ["Audit 60–120 min", "Roadmap 30j", "Chiffrage ROI", "Process Mapping"],
        cta: "Demander un diagnostic",
        waPrompt: "Bonjour Félicien, je souhaite planifier un Diagnostic Digital & IA pour mon organisation et échanger sur vos disponibilités.",
        highlight: false,
      },
      {
        id: "automation",
        category: "core",
        title: "Automatisation Express de Workflows",
        badge: "Livraison rapide (7-10j)",
        pricingTag: "7–10 jours",
        description:
          "Élimination des ressaisies manuelles répétitives entre Excel, Google Sheets, WhatsApp, ERP et boîtes emails. Vos rapports et alertes critiques tournent désormais seuls.",
        deliverables: [
          "Génération et envoi automatiques de rapports périodiques",
          "Synchronisation instantanée des données entre outils sans ressaisie",
          "Alertes de stock et relances clients automatiques par WhatsApp / Email",
          "Recette rigoureuse et mise en production en moins de 10 jours",
        ],
        tags: ["Zéro ressaisie", "Rapports auto", "Alertes WhatsApp", "Workflows Ops"],
        cta: "Automatiser un processus",
        waPrompt: "Bonjour Félicien, j'ai des tâches manuelles répétitives à automatiser et souhaite obtenir une proposition adaptée à mon budget.",
        highlight: false,
      },
      {
        id: "software",
        category: "core",
        title: "Systèmes Métiers & Plateformes Web sur mesure",
        badge: "Spécialité & Haute fiabilité",
        pricingTag: "Sur mesure",
        description:
          "Conception complète de logiciels métiers et applications web taillés pour vos règles de gestion : RH, stocks, ventes, comptabilité, scolarité ou plateformes B2B.",
        deliverables: [
          "Fonctionnement hors-ligne (Offline-First) : continue de vendre sans réseau",
          "Multi-devises (USD, CDF, EUR) et Mobile Money (M-Pesa, Orange, Airtel)",
          "Architecture microservices sécurisée et base de données haute performance",
          "Interface moderne, ergonomique et formation complète de vos utilisateurs",
        ],
        tags: ["Spring Boot", "Next.js", "Caisse hors-ligne", "Mobile Money", "PostgreSQL"],
        cta: "Concevoir votre logiciel",
        waPrompt: "Bonjour Félicien, j'ai un projet de logiciel / plateforme web sur mesure et souhaite discuter d'un cahier des charges et d'un tarif négociable.",
        highlight: true,
      },
      {
        id: "ai",
        category: "core",
        title: "Ingénierie IA, RAG & Agents Autonomes",
        badge: "Technologie de pointe",
        pricingTag: "Sur devis",
        description:
          "Intégration d'assistants intelligents et d'agents autonomes branchés sur vos documents internes et vos bases de données, avec des garde-fous stricts et supervision humaine.",
        deliverables: [
          "RAG privé : recherche sémantique et questions-réponses sur vos données internes",
          "Agents autonomes avec appels d'outils (tool use) reliés à vos API métiers",
          "Garde-fous stricts : validation humaine, journalisation et masquage PII",
          "Confidentialité garantie : étanchéité totale de vos données d'entreprise",
        ],
        tags: ["RAG documentaire", "Agents IA", "Garde-fous éthiques", "LangGraph / LLM"],
        cta: "Intégrer l'IA dans vos outils",
        waPrompt: "Bonjour Félicien, je souhaite intégrer une solution IA / un agent autonome dans mes opérations et échanger sur la faisabilité.",
        highlight: false,
      },
      {
        id: "sectors",
        category: "sector",
        title: "Solutions Sectorielles Prêtes au Déploiement",
        badge: "PME · ONG · Écoles · Cliniques",
        pricingTag: "Prêt à déployer",
        description:
          "Des briques logicielles pré-conçues et éprouvées sur le terrain congolais pour répondre immédiatement aux exigences spécifiques de votre secteur d'activité.",
        deliverables: [
          "PME & Commerces : gestion des stocks avec seuils d'alerte, facturation sans ressaisie",
          "ONG & Bailleurs : suivi terrain par formulaires mobiles et rapports bailleurs automatisés",
          "Écoles (GEVAPOM) : frais scolaires, bulletins numériques et suivi des présences",
          "Cliniques & Santé (HMS) : dossier patient informatisé, rendez-vous et pharmacie",
        ],
        tags: ["PME & Boutiques", "ONG Humanitaires", "Écoles & Universités", "Santé & Cliniques"],
        cta: "Découvrir la solution adaptée",
        waPrompt: "Bonjour Félicien, je souhaite équiper mon organisation (PME / ONG / École / Santé) avec votre solution sectorielle.",
        highlight: false,
      },
      {
        id: "maintenance",
        category: "core",
        title: "Abonnement Maintenance, Supervision & Évolution",
        badge: "Tranquillité d'esprit",
        pricingTag: "Forfait flexible",
        description:
          "Après la livraison, nous veillons sur votre infrastructure logicielle : sauvegardes automatisées, supervision proactive des serveurs, correctifs et support technique réactif.",
        deliverables: [
          "Sauvegardes quotidiennes externalisées et plan de reprise d'activité",
          "Supervision continue (monitoring, alertes de disponibilité et de charge)",
          "Support prioritaire WhatsApp & e-mail avec engagement de service (SLA écrit)",
          "Mises à jour de sécurité et petites évolutions fonctionnelles incluses",
        ],
        tags: ["Supervision 24/7", "Sauvegardes cloud", "SLA garanti", "Support réactif"],
        cta: "Sécuriser votre système",
        waPrompt: "Bonjour Félicien, je souhaite mettre en place un contrat de maintenance et support pour mon système informatique.",
        highlight: false,
      },
    ],
    methodTitle: "Comment nous travaillons",
    methodSubtitle: "Une méthode en 4 temps avec engagement au résultat et clarté contractuelle.",
    methodSteps: [
      {
        number: "01",
        title: "Diagnostic & Périmètre",
        description:
          "Nous cartographions vos processus réels, chiffrons les gains potentiels et délimitons un périmètre précis.",
      },
      {
        number: "02",
        title: "Proposition & Négociation",
        description:
          "Un plan d'action opérationnel et un devis négocié selon vos capacités budgétaires, sans frais cachés.",
      },
      {
        number: "03",
        title: "Développement & Recette",
        description:
          "Livraison itérative, tests en conditions réelles avec vos équipes et formation complète avant mise en service.",
      },
      {
        number: "04",
        title: "Suivi & Garantie",
        description:
          "Maintenance proactive, sauvegardes et support continu encadrés par un accord de niveau de service (SLA).",
      },
    ],
    guardrail: {
      title: "L'IA et la technologie avec garde-fous",
      description:
        "Chaque assistant et automatisation a un périmètre d'action strictement borné. Nous prévoyons systématiquement la validation humaine quand une décision critique est en jeu, le chiffrement des données, la journalisation des actions et le respect strict du secret professionnel.",
    },
    ctaBanner: {
      title: "Parlons de votre projet ou du premier processus à automatiser.",
      description:
        "Décrivez-nous ce qui vous prend le plus de temps ou le système dont vous avez besoin. Tous les tarifs sont négociables et nous construisons une offre adaptée à votre situation.",
      waButton: "Discuter sur WhatsApp",
      emailButton: "Décrire mon projet",
      waMessage: "Bonjour Félicien, je souhaite échanger au sujet de vos services et obtenir une proposition personnalisée.",
    },
  },

  experience: {
    kicker: "Parcours",
    title: "Là où j'ai",
    titleAccent: "fait la différence.",
    items: {
      soside: {
        role: "Fondateur & Lead Software Engineer",
        period: "2024 — Aujourd'hui",
        location: "Bukavu",
        description:
          "Direction technique et stratégique d'une entreprise logicielle au service de clients institutionnels — de l'architecture à la livraison, IA comprise.",
        achievements: [
          "Livraison de 3 plateformes B2B majeures avec 100 % d'adoption chez les clients initiaux, en dirigeant une équipe agile et en standardisant les pipelines CI/CD.",
          "Time-to-market réduit de 40 % — mesuré par des cycles de release plus courts — grâce à une architecture microservices conteneurisée sous Docker.",
          "Pilotage de l'intégration de solutions IA pour des clients institutionnels : assistants LLM et workflows d'agents avec évaluation et revue humaine intégrées.",
        ],
      },
      aumsoft: {
        role: "Chef de projet · Ingénieur Logiciel & IA",
        period: "Déc. 2024 — Aujourd'hui",
        location: "Bukavu",
        description:
          "Je mène les produits du cahier des charges à la production : pilotage et livraison, design system, architecture système et modélisation des bases de données.",
        achievements: [
          "Direction de bout en bout de HMS Elite (gestion hospitalière), Maago (marketplace et caisse hors ligne) et Sili Kivu Hub (plateforme communautaire) — design system, architecture système et modélisation des bases de données pour chacun.",
          "Architecture de systèmes d'information multi-universitaires gérant plus de 10 000 dossiers étudiants simultanés, avec un backend réactif et une couche de données optimisée.",
        ],
      },
      gevapom: {
        role: "Data Manager & Support IT",
        period: "2024",
        location: "Bukavu",
        description:
          "Gestion des données et support informatique pour une ONG éducative — pilotage de la transformation numérique de 8 écoles.",
        achievements: [
          "Digitalisation de 100 % des processus administratifs scolaires, avec 60 % de temps administratif en moins grâce à des outils de suivi automatisés.",
          "Formation de plus de 50 enseignants aux nouveaux outils numériques.",
        ],
      },
      gdsc: {
        role: "Community Lead (GDSC Lead)",
        period: "2023",
        location: "Bukavu",
        description:
          "Animation de l'une des plus grandes communautés de développeurs de l'Est du Congo et organisation du DevFest KIVU 2023.",
        achievements: [
          "Plus de 200 développeurs réunis au DevFest KIVU 2023 et plus de 20 sessions de formation technique coordonnées.",
        ],
      },
    },
  },

  projects: {
    kicker: "Projets choisis",
    title: "Études de cas en",
    titleAccent: "systèmes critiques.",
    intro: "Des plateformes où la sécurité, la montée en charge et la clarté ne se négocient pas.",
    labels: { challenge: "Le défi", architecture: "L'architecture", impact: "L'impact" },
    statLabels: {
      interop: "Interopérabilité",
      encryption: "Chiffrement",
      access: "Contrôle d'accès",
      currencies: "Devises",
      wallets: "Portefeuilles mobile money",
      institutions: "Institutions",
      isolation: "Isolation des données",
      modules: "Modules",
      users: "Utilisateurs",
      latency: "Temps de réponse",
      uptime: "Disponibilité",
      efficiency: "Efficacité des tournées",
      coverage: "Couverture",
    },
    shotLabels: { landing: "Site", dashboard: "Back-office", pos: "Caisse desktop", login: "Connexion" },
    gallery: "Captures d'écran",
    roleLabel: "Mon rôle",
    role: "Chef de projet · Ingénieur logiciel & IA — design system, architecture système et modélisation des bases de données.",
    live: "Voir le site",
    code: "Voir le code",
    video: "Voir la démo",
    confidential: "Projet client · code confidentiel",
    more: "Plus sur GitHub",
    items: {
      hms: {
        title: "HMS Elite",
        subtitle: "Système d'exploitation hospitalier",
        challenge:
          "Offrir aux cliniques et hôpitaux un système unique et sécurisé pour tout le parcours patient — admission, consultations, laboratoire, facturation et personnel — interopérable avec les logiciels médicaux existants et l'écosystème national ANICNS.",
        architecture:
          "Une plateforme multi-tenant avec mises à jour en temps réel, contrôle d'accès par attributs (ABAC), et passerelles HL7 / FHIR et REST vers le dossier médical, le laboratoire (LIS) et la facturation.",
        impact:
          "Les soignants travaillent sur un dossier patient unifié et la direction sur des tableaux de bord en temps réel, avec chiffrement AES-256 au repos, TLS 1.3 en transit et une traçabilité immuable de chaque action.",
      },
      maago: {
        title: "Maago",
        subtitle: "Marketplace, back-office et caisse hors ligne",
        challenge:
          "Mettre en ligne les boutiques locales en RDC — et donner aux commerçants des outils qui continuent de vendre malgré les coupures réseau, en plusieurs devises et avec le mobile money.",
        architecture:
          "Une plateforme web pour la marketplace et le back-office marchand avec des événements en temps réel, et une caisse desktop qui fonctionne hors ligne et se synchronise au retour du réseau.",
        impact:
          "Les commerçants suivent le stock par boutique et par extension, émettent des tickets avec TVA et des ventes à crédit, et affichent leurs prix en USD, CDF ou EUR au taux qu'ils fixent ; les clients paient par M-Pesa, Orange Money ou Airtel Money. La caisse est en service ; la marketplace ouvre très bientôt.",
      },
      silikivu: {
        title: "Sili Kivu Hub",
        subtitle: "Plateforme de gestion de communautés",
        challenge: "Donner aux organisations un seul espace pour animer leur communauté : membres, rôles, discussions, événements et ressources partagées.",
        architecture: "Des rôles d'accès pour membres, administrateurs, invités et coopératives, avec des discussions en temps réel.",
        impact: "Un hub communautaire à l'image de l'organisation, de l'inscription jusqu'aux événements.",
      },
      ums: {
        title: "UMS — University Management System",
        subtitle: "SaaS multi-tenant de gestion académique",
        challenge:
          "Héberger de nombreuses universités indépendantes sur une même plateforme — avec une isolation stricte des données, une configuration par institution et une résilience lors des pics d'inscriptions et d'examens.",
        architecture:
          "Un modèle de données « un schéma par tenant » : les requêtes sont routées dynamiquement par identifiant de tenant, et chaque environnement est conteneurisé.",
        impact:
          "Isolation des données à 100 % entre institutions et forte baisse des coûts d'infrastructure, grâce au routage dynamique par tenant, à l'optimisation des pools de connexions et à des conteneurs standardisés.",
      },
      pgcc: {
        title: "PGCC — Portail de Gestion des Citoyens Congolais",
        subtitle: "Identité numérique et services publics sécurisés",
        challenge:
          "Concevoir un système d'identité numérique centralisé capable de gérer des données citoyennes sensibles — biométrie comprise — de façon sûre, fluide et résistante aux interceptions.",
        architecture:
          "Un backend Spring Boot découplé et un frontend Next.js rapide, avec des pipelines de validation biométrique et un stockage relationnel optimisé sous PostgreSQL.",
        impact:
          "Réponses sous 200 ms et conformité cryptographique élevée grâce au chiffrement de bout en bout AES-256-GCM, à un hachage renforcé des données biométriques et à une API REST hautement disponible.",
      },
      mazingira: {
        title: "Mazingira Safi",
        subtitle: "Logistique d'assainissement urbain pilotée par la donnée",
        challenge:
          "Rendre la collecte des déchets et le suivi environnemental plus efficaces à l'échelle d'une ville — avec des données plutôt que des suppositions.",
        architecture:
          "Une application full-stack combinant géolocalisation en temps réel, analyse prédictive des flux de déchets et tableau de bord analytique minimaliste.",
        impact:
          "Des tournées de collecte plus efficaces grâce à des algorithmes d'optimisation d'itinéraires et à des interfaces de suivi en temps réel.",
      },
      citizen: {
        title: "Citizen Management",
        subtitle: "Front-end Angular de gestion des citoyens",
        challenge: "Offrir aux administrateurs un moyen rapide de rechercher et gérer de grands volumes de données citoyennes.",
        architecture: "Angular avec des flux d'état RxJS et des composants Material UI.",
        impact: "Un front-end open source de référence pour la gestion de données citoyennes.",
      },
    },
  },

  skills: {
    kicker: "Compétences",
    title: "Une boîte à outils pour",
    titleAccent: "tout le cycle de vie.",
    categories: [
      {
        name: "AI Engineering",
        description: "Des fonctionnalités LLM mesurables et sûres.",
        items: [
          "API Claude & OpenAI",
          "RAG",
          "Embeddings & pgvector",
          "Prompt engineering",
          "Sorties structurées",
          "Évals & LLM-as-judge",
          "Vercel AI SDK",
          "LangChain / LangGraph",
        ],
        highlight: true,
      },
      {
        name: "AI Agent Management",
        description: "Des agents avec périmètre, supervision et métriques.",
        items: [
          "Orchestration multi-agents",
          "Tool use & function calling",
          "Model Context Protocol (MCP)",
          "Human-in-the-loop",
          "Garde-fous & red-teaming",
          "Tracing & observabilité",
          "Maîtrise des coûts et de la latence",
        ],
        highlight: true,
      },
      {
        name: "Architecture & DevOps",
        description: "Des systèmes conçus pour durer et grandir.",
        items: ["Architecture système", "Modélisation de bases de données", "Systèmes distribués", "Microservices", "SaaS multi-tenant", "Temps réel (WebSockets)", "Synchronisation hors ligne", "HL7 / FHIR", "Docker", "CI/CD"],
        highlight: false,
      },
      {
        name: "Produit & Design",
        description: "Du cahier des charges au produit livré.",
        items: ["Gestion de projet (Agile / Scrum)", "Design systems", "UI/UX design", "Modélisation (UML, Merise)", "Leadership technique"],
        highlight: false,
      },
      {
        name: "Langages & Frameworks",
        description: "Le bon outil pour chaque couche.",
        items: ["TypeScript", "PHP", "Java", "Python", "Laravel", "Inertia.js", "React", "Next.js", "Angular", "Spring Boot", "Flutter", "Rust (en apprentissage)"],
        highlight: false,
      },
      {
        name: "Données",
        description: "Du stockage à la décision.",
        items: ["PostgreSQL", "Data science", "Power BI", "Firebase"],
        highlight: false,
      },
      {
        name: "Sécurité",
        description: "La protection dès la conception.",
        items: ["AES-256-GCM", "Biométrie", "OAuth 2.0", "JWT"],
        highlight: false,
      },
    ],
  },

  education: {
    kicker: "Formation",
    title: "Toujours",
    titleAccent: "en apprentissage.",
    items: [
      {
        degree: "Licence en Informatique de Gestion (L1–L2)",
        school: "Institut Supérieur Pédagogique de Bukavu",
        period: "2023 — 2025",
        description: "Spécialisation en développement logiciel et systèmes d'information.",
      },
      {
        degree: "Graduat en Informatique de Gestion (G1–G3)",
        school: "Institut Supérieur Pédagogique de Bukavu",
        period: "2020 — 2023",
        description: "Fondamentaux de la programmation et gestion des bases de données.",
      },
      {
        degree: "Diplôme d'État",
        school: "Institut Kele, Kamituga",
        period: "2014 — 2020",
        description: "Études secondaires.",
      },
    ],
    certificationsTitle: "Formations & certifications",
    certifications: [
      {
        name: "Package ERM (Évaluation Rapide Multisectorielle) — Ehtools, PSEA, AAP, Échantillonnage & Analyse",
        provider: "OCHA & REACH Initiative",
        year: "2026",
      },
      { name: "Gestion de projet — Agile, UML, GitHub, Merise", provider: "OpenClassrooms", year: "2024" },
      { name: "Jeune Ambassadeur de la Paix — Consolidation de la paix & médiation", provider: "UNICEF", year: "2023" },
      { name: "Leadership & community management", provider: "Google Developer Student Clubs", year: "2023" },
      { name: "Analyse de données, UI/UX design", provider: "Coursera", year: "2023" },
      { name: "Programmation — Angular, React, JavaScript, Python, Django", provider: "OpenClassrooms", year: "2022" },
    ],
    languagesTitle: "Langues",
    languages: [
      { name: "Français", level: "Langue maternelle" },
      { name: "Swahili", level: "Langue maternelle" },
      { name: "Lingala", level: "Courant" },
      { name: "Anglais", level: "Professionnel" },
    ],
    communityCaption: "Session de formation pratique à Bukavu",
  },

  lab: {
    kicker: "Lab",
    title: "Des outils",
    titleAccent: "pour créer plus vite.",
    intro:
      "Des outils gratuits issus de mon propre workflow — kits de marque pour marketplaces, générateur SVG, outils de motion et de design. Tout fonctionne dans votre navigateur.",
    open: "Ouvrir le Lab",
    openTool: "Ouvrir l'outil",
    back: "Tous les outils",
    tools: {
      "logo-generator": {
        name: "Générateur de Logos & Publicités",
        description: "Nom, symbole, typographie, charte graphique : le studio compose des logos professionnels, entièrement modifiables, puis décline flyers, brochures et posts réseaux sociaux. Pack ZIP complet.",
      },
      "brand-kit": {
        name: "Brand kit & marketplace",
        description: "Déposez un logo et vos couleurs : charte graphique, visuels de boutique, posts sociaux et données de catalogue de démo.",
      },
      "app-icon": {
        name: "Générateur d'icônes & logos d'application",
        description: "Moteur SOSIDE PAY en TypeScript : superellipse Apple continue, cartes bancaires, mascottes, multi-icônes, exports iOS / Android adaptatif / macOS / Web et motion design.",
      },
      mascot: {
        name: "Générateur de Mascottes",
        description: "Créez des mascottes et avatars de marque : styles variés (3D Pixar, Minimaliste, Croquis, Cyberpunk, Kawaii), traits de personnalité, compilation d'invites d'IA et export haute résolution.",
      },
      svg: {
        name: "Générateur SVG",
        description: "Blobs, vagues en couches, motifs répétables et dégradés maillés avec grain — export SVG, PNG ou CSS.",
      },
      motion: {
        name: "Motion Studio",
        description: "Un vrai studio de motion design dans le navigateur : importez et combinez vos vecteurs, animez-les sur une timeline à keyframes, exportez en vidéo MP4/WebM ou SVG animé.",
      },
      design: {
        name: "Outils design",
        description: "Palettes perceptuelles, contraste WCAG avec correction automatique, ombres en couches et dégradés.",
      },
    },
  },

  faq: {
    kicker: "Questions fréquentes",
    title: "Les réponses",
    titleAccent: "avant de vous engager.",
    intro: "Ce que les dirigeants me demandent le plus souvent avant de lancer un projet.",
    items: [
      {
        q: "Combien coûte un projet ?",
        a: "Cela dépend du périmètre : un diagnostic, une automatisation ciblée et une plateforme complète n'ont pas le même coût. Après un premier échange sans engagement, vous recevez un devis détaillé, adapté à votre budget, sans frais cachés.",
      },
      {
        q: "En combien de temps est-ce livré ?",
        a: "Une automatisation ciblée se livre en 7 à 10 jours. Une plateforme sur mesure se construit par étapes : vous testez une première version tôt, puis les modules s'ajoutent jalon après jalon.",
      },
      {
        q: "Et si la connexion internet coupe ?",
        a: "Les logiciels sont conçus « offline-first » : ventes, saisies et caisse continuent sans réseau et se synchronisent automatiquement au retour de la connexion.",
      },
      {
        q: "Mes données restent-elles confidentielles ?",
        a: "Oui. Données chiffrées, accès journalisés, et des assistants IA qui n'accèdent qu'à ce que vous autorisez, avec validation humaine pour toute décision critique — dans le respect strict du secret professionnel.",
      },
      {
        q: "Que se passe-t-il après la livraison ?",
        a: "Vos équipes sont formées, puis vous choisissez un suivi : sauvegardes quotidiennes, supervision, correctifs de sécurité et support WhatsApp & e-mail encadré par un SLA écrit.",
      },
      {
        q: "Travaillez-vous en dehors de Bukavu ?",
        a: "Oui. J'accompagne des organisations à Goma, Kinshasa, Lubumbashi et dans tout l'espace francophone, à distance, avec des déplacements possibles selon le projet.",
      },
      {
        q: "Je ne suis pas technicien : est-ce un problème ?",
        a: "Pas du tout. Vous décrivez vos difficultés avec vos mots ; je les traduis en solution, je chiffre les gains et j'explique chaque choix sans jargon.",
      },
    ],
  },

  brief: {
    title: "Décrivez votre projet",
    subtitle: "4 questions, 30 secondes. Votre message est prêt à partir sur WhatsApp ou par e-mail.",
    name: "Votre nom",
    org: "Organisation (facultatif)",
    need: "De quoi avez-vous besoin ?",
    needs: ["Logiciel / plateforme sur mesure", "Automatiser un processus", "Assistant IA / RAG", "Solution école, clinique, ONG ou commerce", "Diagnostic digital", "Maintenance & support", "Autre"],
    budget: "Budget indicatif (facultatif)",
    budgets: ["À discuter", "< 500 $", "500 – 2 000 $", "2 000 – 10 000 $", "> 10 000 $"],
    timeline: "Délai souhaité",
    timelines: ["Urgent", "Sous 1 mois", "1 à 3 mois", "Flexible"],
    message: "Votre besoin en quelques mots",
    placeholder: "Ex. : nous gérons les frais scolaires sur Excel et voulons des reçus et un suivi automatiques…",
    send: "Envoyer sur WhatsApp",
    sendEmail: "Par e-mail",
    note: "Rien n'est enregistré sur ce site : le message s'ouvre dans votre WhatsApp ou votre messagerie.",
    greeting: "Bonjour Félicien, je vous contacte depuis votre site.",
    fields: {
      name: "Nom",
      org: "Organisation",
      need: "Besoin",
      budget: "Budget",
      timeline: "Délai",
      details: "Détails",
    },
    emailSubject: "Nouveau projet",
    floating: "WhatsApp",
    required: "Choisissez au moins un besoin",
  },

  contact: {
    kicker: "Contact",
    title: "Parlons de",
    titleAccent: "votre projet.",
    description:
      "Décrivez votre besoin en 30 secondes : le message arrive directement sur mon WhatsApp. Recruteurs et partenaires techniques : l'e-mail et le CV sont juste en dessous.",
    cta: "Envoyer un e-mail",
    copy: "Copier l'e-mail",
    copied: "Copié !",
    emailLabel: "E-mail",
    phoneLabel: "Téléphone",
    localTime: "Heure locale à Bukavu",
  },

  footer: {
    designed: "Conçu et développé par",
    built: "Construit avec Next.js, TypeScript, Tailwind CSS, Framer Motion & Three.js",
    backToTop: "Retour en haut",
  },

  cv: {
    download: "Télécharger le CV",
    generating: "Préparation…",
    error: "Impossible de générer le PDF. Veuillez réessayer.",
    headline: "Ingénieur Logiciel & IA · Chef de projet · AI Agent Manager",
    profileTitle: "Profil",
    profile:
      "Fondateur de SOSIDE COMPANY SAS, chef de projet et ingénieur logiciel & IA chez Aumsoft Technology, où je conçois les design systems, l'architecture système et la modélisation des bases de données. Je conçois des plateformes distribuées sécurisées — identité numérique (PGCC), logiciel hospitalier (HMS Elite), SaaS universitaire (UMS), commerce et caisse hors ligne (Maago) — et je mets en production des fonctionnalités LLM et des agents IA avec évaluation, garde-fous et supervision humaine. Spring Boot, React, Next.js, PostgreSQL, Docker.",
    experienceTitle: "Expérience",
    projectsTitle: "Projets phares",
    skillsTitle: "Compétences",
    educationTitle: "Formation",
    certificationsTitle: "Certifications",
    languagesTitle: "Langues",
    referencesTitle: "Références",
    references: "Références disponibles sur demande.",
  },

  notFound: {
    title: "Cette page s'est perdue en orbite.",
    body: "Le lien est peut-être cassé ou la page a été déplacée.",
    back: "Retour à l'accueil",
  },
}
