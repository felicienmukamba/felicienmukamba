import type { Dictionary } from "./en"

export const fr: Dictionary = {
  meta: {
    title: "Félicien Mukamba — Ingénieur Logiciel & AI Engineer",
    description:
      "Félicien Mukamba, ingénieur logiciel, AI Engineer et fondateur de SOSIDE, conçoit des plateformes distribuées sécurisées et des agents IA en production depuis Bukavu, RDC.",
    keywords: [
      "Félicien Mukamba",
      "Ingénieur logiciel",
      "AI Engineer",
      "AI Agent Manager",
      "Développeur full-stack",
      "LLM",
      "RAG",
      "Systèmes multi-agents",
      "Spring Boot",
      "Next.js",
      "SOSIDE",
      "Bukavu",
      "RDC",
    ],
    ogAlt: "Félicien Mukamba — Ingénieur Logiciel & AI Engineer",
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
    experience: "Parcours",
    projects: "Projets",
    skills: "Compétences",
    lab: "Lab",
    contact: "Contact",
  },

  hero: {
    available: "Disponible pour de nouvelles opportunités",
    eyebrow: "Ingénieur Logiciel & IA · Chef de projet · Fondateur de SOSIDE",
    headlineStart: "Je construis des plateformes sûres",
    headlineAccent: "et les agents IA",
    headlineEnd: "qui les font tourner.",
    intro:
      "Ingénieur full-stack basé à Bukavu, en RDC. Je conçois des systèmes distribués pour l'identité numérique, la santé, l'éducation et le commerce — et je mets les LLM et les agents autonomes en production, avec les garde-fous qu'ils exigent.",
    ctaPrimary: "Démarrer une conversation",
    ctaWork: "Voir mes projets",
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
      { name: "Gestion de projet — Agile, UML, GitHub, Merise", provider: "OpenClassrooms", year: "2024" },
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
      "brand-kit": {
        name: "Brand kit & marketplace",
        description: "Déposez un logo et vos couleurs : charte graphique, visuels de boutique, posts sociaux et données de catalogue de démo.",
      },
      svg: {
        name: "Générateur SVG",
        description: "Blobs, vagues en couches, motifs répétables et dégradés maillés avec grain — export SVG, PNG ou CSS.",
      },
      motion: {
        name: "Boîte à outils motion",
        description: "Dessinez des courbes d'easing, réglez des ressorts, orchestrez des keyframes — copiez le CSS ou le Framer Motion.",
      },
      design: {
        name: "Outils design",
        description: "Palettes perceptuelles, contraste WCAG avec correction automatique, ombres en couches et dégradés.",
      },
    },
  },

  contact: {
    kicker: "Contact",
    title: "Construisons",
    titleAccent: "la suite.",
    description:
      "Ouvert aux postes à temps plein, missions freelance et collaborations techniques — en particulier là où les systèmes distribués rencontrent l'IA.",
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
