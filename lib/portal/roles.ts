export type SectorId = "all" | "tech" | "ngo"

export type TargetRole = {
  id: string
  title: string
  titleEn: string
  sector: "tech" | "ngo"
  category: string
  categoryTitle: string
  missions: string
  keyTools: string[]
  recommendedProfileId: string
  pitch: string
}

export type TargetCategory = {
  id: string
  sector: "tech" | "ngo"
  title: string
  badge: string
  iconName: string
  description: string
  roles: TargetRole[]
}

export const PLATFORM_KEYWORDS = {
  tech: [
    "Senior Fullstack Engineer (Java / Spring Boot / Next.js)",
    "Backend Developer (Java / Python / PostgreSQL)",
    "Lead Software Engineer / Tech Lead",
    "DevOps / Cloud Engineer (Docker / CI/CD)",
    "Solutions / Software Architect",
    "Technical Product Manager (TPM / Agile)",
    "AI Solutions Integration Engineer",
    "Developer Advocate / DevRel",
  ],
  ngo: [
    "Information Management Officer (IMO)",
    "MEAL / M&E Officer (Suivi-Évaluation)",
    "Humanitarian Data Analyst / Data Manager",
    "ERM Assessor / Rapid Response (OCHA/REACH)",
    "ICT / T4D Officer (Tech for Development)",
    "Communications & Media Officer",
    "Peacebuilding & Mediation Officer (UNICEF)",
    "Project Officer / Associate Program Manager",
  ],
}

export const TARGET_CATEGORIES: TargetCategory[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // SECTEUR TECH & ENTREPRISES (SSII/ESN, Startups, Scale-ups, Éditeurs, FinTech)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "tech-swe",
    sector: "tech",
    title: "1. Ingénierie Logicielle & Développement (Software Engineering)",
    badge: "Ingénierie Logicielle",
    iconName: "Code2",
    description:
      "Votre maîtrise d'une double pile technologique complète (Backend robuste Java/Python + Frontend moderne Next.js/React/Angular) vous donne accès à l'ensemble du cycle de développement web et mobile.",
    roles: [
      {
        id: "senior-fullstack",
        title: "Senior Fullstack Software Engineer / Développeur Fullstack Senior",
        titleEn: "Senior Fullstack Software Engineer",
        sector: "tech",
        category: "tech-swe",
        categoryTitle: "Ingénierie Logicielle & Développement",
        missions:
          "Conception et développement d'applications end-to-end complexes et résilientes, associant Java/Spring Boot ou Python/Django à Next.js, React ou Angular, avec modélisation BDD et CI/CD automatisé.",
        keyTools: ["Java / Spring Boot", "Next.js", "React", "TypeScript", "PostgreSQL", "Docker", "Tailwind CSS"],
        recommendedProfileId: "bigtech-swe",
        pitch:
          "Ingénieur full-stack et fondateur ayant livré 3 plateformes B2B majeures : je conçois des systèmes complets, du modèle de données au design system, en garantissant performance, maintenabilité et couverture de tests.",
      },
      {
        id: "backend-engineer",
        title: "Backend Engineer / Développeur Backend (Java / Spring Boot / Python)",
        titleEn: "Backend Software Engineer",
        sector: "tech",
        category: "tech-swe",
        categoryTitle: "Ingénierie Logicielle & Développement",
        missions:
          "Développement de microservices hautement disponibles, conception d'APIs RESTful sécurisées (OAuth 2.0, JWT), gestion de bases de données relationnelles massives (PostgreSQL, MongoDB) et optimisation de requêtes.",
        keyTools: ["Java / Spring Boot", "Python / Django", "PostgreSQL", "OAuth 2.0 / JWT", "Microservices", "REST API"],
        recommendedProfileId: "bigtech-swe",
        pitch:
          "Développeur backend expérimenté sur des architectures distribuées critiques : j'assure des latences sous les 200ms sur plus de 10 000 enregistrements simultanés, avec sécurisation par chiffrement et contrôle d'accès granulaire.",
      },
      {
        id: "frontend-engineer",
        title: "Frontend / Web Engineer (Next.js / React / Angular)",
        titleEn: "Frontend / Web Engineer",
        sector: "tech",
        category: "tech-swe",
        categoryTitle: "Ingénierie Logicielle & Développement",
        missions:
          "Création d'interfaces web réactives, ultra-rapides et accessibles (WCAG), intégration de design systems sur-mesure (Tailwind CSS, Material UI) et gestion d'état complexe.",
        keyTools: ["Next.js", "React", "TypeScript", "Angular", "Tailwind CSS", "UI/UX", "State Management"],
        recommendedProfileId: "startup-fullstack",
        pitch:
          "Spécialiste du front-end moderne : je conçois des interfaces fluides, esthétiques et riches en micro-animations qui maximisent l'engagement utilisateur et respectent les standards d'accessibilité les plus stricts.",
      },
      {
        id: "mobile-crossplatform",
        title: "Développeur d'Applications Mobiles Cross-Platform (Flutter / React Native)",
        titleEn: "Cross-Platform Mobile Engineer",
        sector: "tech",
        category: "tech-swe",
        categoryTitle: "Ingénierie Logicielle & Développement",
        missions:
          "Développement et publication d'applications mobiles Android et iOS performantes, synchronisation hors ligne (offline-first), géolocalisation et intégration d'APIs tierces.",
        keyTools: ["Flutter / Dart", "React Native", "Android", "iOS", "Offline-first", "Firebase"],
        recommendedProfileId: "startup-fullstack",
        pitch:
          "Développeur mobile maîtrisant le cycle mobile complet et les contraintes de fonctionnement hors-ligne, garantissant une expérience fluide sur smartphone même avec une connectivité réseau dégradée.",
      },
    ],
  },
  {
    id: "tech-arch-devops",
    sector: "tech",
    title: "2. Architecture, Cloud & DevOps",
    badge: "Architecture & DevOps",
    iconName: "Cpu",
    description:
      "Votre expérience dans le déploiement d'architectures microservices conteneurisées, de plateformes multi-tenant et d'infrastructures hautement disponibles vous positionne au cœur de la scalabilité technique.",
    roles: [
      {
        id: "software-architect",
        title: "Software / Solution Architect (Architecte Logiciel)",
        titleEn: "Software / Solution Architect",
        sector: "tech",
        category: "tech-arch-devops",
        categoryTitle: "Architecture, Cloud & DevOps",
        missions:
          "Conception de la structure technique de grands systèmes distribués, sélection des stacks technologiques, définition des normes d'architecture, de sécurité et garant de la scalabilité.",
        keyTools: ["Architecture distribuée", "Microservices", "Modélisation Merise / UML", "Haute disponibilité", "Pattern DDD"],
        recommendedProfileId: "bigtech-swe",
        pitch:
          "Architecte logiciel ayant conçu les architectures de référence pour plateformes hospitalières (HMS Elite), universitaires (UMS) et étatiques : j'aligne vision technique long terme et pragmatisme de livraison.",
      },
      {
        id: "devops-engineer",
        title: "DevOps / Cloud Engineer",
        titleEn: "DevOps / Cloud Engineer",
        sector: "tech",
        category: "tech-arch-devops",
        categoryTitle: "Architecture, Cloud & DevOps",
        missions:
          "Automatisation des pipelines CI/CD, conteneurisation avec Docker, orchestration de services, déploiement et supervision d'infrastructures sur Linux, Vercel et AWS.",
        keyTools: ["Docker", "CI/CD (GitHub Actions)", "Linux / Bash", "AWS / Cloud", "Monitoring", "Vercel"],
        recommendedProfileId: "bigtech-swe",
        pitch:
          "Praticien DevOps axé sur l'efficacité des équipes : j'ai réduit le time-to-market de 40% sur des plateformes SaaS en conteneurisant les microservices et en automatisant les chaînes de tests et déploiement continu.",
      },
      {
        id: "dba-tech",
        title: "Database Administrator / Architect (DBA)",
        titleEn: "Database Administrator & Data Architect",
        sector: "tech",
        category: "tech-arch-devops",
        categoryTitle: "Architecture, Cloud & DevOps",
        missions:
          "Modélisation conceptuelle et logique, optimisation fine des index et requêtes SQL, stratégies de sauvegarde, réplication et sécurisation des bases relationnelles et NoSQL (PostgreSQL, MySQL, MongoDB).",
        keyTools: ["PostgreSQL", "Merise (MCD/MLD)", "SQL tuning", "MongoDB", "MySQL", "Chiffrement AES-256"],
        recommendedProfileId: "bigtech-swe",
        pitch:
          "Modélisateur de bases de données aguerri : je conçois des schémas relationnels normalisés à l'épreuve de la montée en charge, garantissant une isolation totale des données multi-tenants et une intégrité transactionnelle absolue.",
      },
    ],
  },
  {
    id: "tech-mgmt",
    sector: "tech",
    title: "3. Management Tech, Produits & Direction",
    badge: "Management & Tech Lead",
    iconName: "FolderKanban",
    description:
      "Votre double casquette d'ingénieur et de fondateur (SOSIDE COMPANY SAS), alliée à la conduite de projets d'envergure, correspond aux postes de gouvernance et de leadership technique.",
    roles: [
      {
        id: "tech-lead",
        title: "Tech Lead / Lead Software Engineer",
        titleEn: "Tech Lead / Lead Engineer",
        sector: "tech",
        category: "tech-mgmt",
        categoryTitle: "Management Tech, Produits & Direction",
        missions:
          "Encadrement technique des équipes de développeurs, animation des revues de code, choix technologiques, déblocage des points durs et garant de la vélocité et de la qualité logicielle.",
        keyTools: ["Code Review", "Mentorat technique", "Architecture logicielle", "CI/CD", "Scrum", "Standards de code"],
        recommendedProfileId: "project-manager",
        pitch:
          "Tech Lead sachant encore coder : je montre la voie par l'exemple, j'élève le niveau technique de l'équipe par des revues de code exigeantes et bienveillantes, et je garantis des livraisons stables en production.",
      },
      {
        id: "tpm",
        title: "Technical Product Manager (TPM) / Chef de Projet IT",
        titleEn: "Technical Product Manager (TPM)",
        sector: "tech",
        category: "tech-mgmt",
        categoryTitle: "Management Tech, Produits & Direction",
        missions:
          "Passerelle entre les besoins métier et l'équipe d'ingénierie, rédaction des spécifications techniques détaillées, priorisation du backlog produit en méthodologies agiles (Scrum, Kanban).",
        keyTools: ["Agile / Scrum", "UML", "Merise", "Jira / Backlog", "Cahier des charges", "Roadmap produit"],
        recommendedProfileId: "project-manager",
        pitch:
          "Chef de projet technique bilingue métier et code : je traduis les enjeux stratégiques en user stories précises et actionnables, éliminant les malentendus et sécurisant les jalons de livraison.",
      },
      {
        id: "cto",
        title: "Engineering Manager / Directeur Technique (CTO)",
        titleEn: "Chief Technology Officer (CTO) / Engineering Manager",
        sector: "tech",
        category: "tech-mgmt",
        categoryTitle: "Management Tech, Produits & Direction",
        missions:
          "Direction stratégique technologique, alignement de la feuille de route produit sur les objectifs business, gouvernance technique, gestion budgétaire et recrutement des talents.",
        keyTools: ["Vision stratégique", "Gouvernance IT", "Recrutement tech", "Budgeting", "Roadmap R&D"],
        recommendedProfileId: "project-manager",
        pitch:
          "Fondateur d'entreprise technologique avec vision produit et rigueur d'ingénieur : je structure des équipes agiles autonomes, choisis des architectures pérennes et maximise le retour sur investissement technologique.",
      },
    ],
  },
  {
    id: "tech-security-ai",
    sector: "tech",
    title: "4. Cybersécurité, Identité Numérique & IA",
    badge: "Sécurité & IA",
    iconName: "ShieldCheck",
    description:
      "Vos réalisations sur la plateforme PGCC (biométrie, chiffrement AES-256) et l'intégration de solutions d'IA générative pour clients institutionnels vous ouvrent des niches spécialisées à forte valeur.",
    roles: [
      {
        id: "security-engineer",
        title: "Security / Cryptography Engineer",
        titleEn: "Security & Cryptography Engineer",
        sector: "tech",
        category: "tech-security-ai",
        categoryTitle: "Cybersécurité, Identité Numérique & IA",
        missions:
          "Implémentation des protocoles de chiffrement bout en bout (AES-256-GCM), sécurisation des flux de données sensibles, gestion de l'authentification forte (biométrie, OAuth 2.0, JWT, ABAC).",
        keyTools: ["AES-256-GCM", "Biométrie", "OAuth 2.0 / JWT", "ABAC / RBAC", "Audit de sécurité", "Spring Security"],
        recommendedProfileId: "bigtech-swe",
        pitch:
          "Concepteur de la plateforme PGCC d'identité biométrique sécurisée par chiffrement militaire AES-256-GCM : j'intègre la sécurité dès la phase de conception (Security by Design) sans dégrader l'expérience utilisateur.",
      },
      {
        id: "ai-solutions-engineer",
        title: "AI Solutions Integration Engineer / AI Agent Manager",
        titleEn: "AI Solutions Integration Engineer",
        sector: "tech",
        category: "tech-security-ai",
        categoryTitle: "Cybersécurité, Identité Numérique & IA",
        missions:
          "Intégration d'APIs et de modèles d'intelligence artificielle (LLM, RAG, tool use) dans les processus d'entreprise, orchestration d'agents autonomes, mise en place d'évaluations et de garde-fous de conformité.",
        keyTools: ["Claude API", "OpenAI API", "LangGraph", "MCP", "RAG", "Guardrails & Évaluation", "Python"],
        recommendedProfileId: "ai-engineer",
        pitch:
          "Ingénieur IA pragmatique : je ne livre pas de simples démos, je connecte des assistants LLM et des agents autonomes fiables aux backends existants avec traçabilité, métriques de coût et validation humaine obligatoire.",
      },
    ],
  },
  {
    id: "tech-devrel",
    sector: "tech",
    title: "5. Developer Relations & Community Management Tech",
    badge: "DevRel & Communauté",
    iconName: "Users",
    description:
      "En tant qu'ancien Lead Google Developer Student Clubs (GDSC) et organisateur général du DevFest KIVU, vous disposez d'une expertise reconnue dans la fédération des développeurs et la communication technique.",
    roles: [
      {
        id: "devrel",
        title: "Developer Advocate / Developer Relations (DevRel)",
        titleEn: "Developer Advocate / DevRel",
        sector: "tech",
        category: "tech-devrel",
        categoryTitle: "Developer Relations & Community Management Tech",
        missions:
          "Représentation technique de l'entreprise auprès des communautés de développeurs, rédaction de documentation technique, création de projets démo (open-source), animation de webinaires et promotion des APIs/outils.",
        keyTools: ["Documentation technique", "Live Coding", "Public Speaking", "Open Source", "API SDKs", "Tutoriels"],
        recommendedProfileId: "project-manager",
        pitch:
          "Lead communautaire aguerri : je sais rendre les technologies complexes attractives et compréhensibles, en créant du contenu technique de haute qualité qui suscite l'adoption des développeurs.",
      },
      {
        id: "tech-community-manager",
        title: "Community Manager / Formateur Tech",
        titleEn: "Tech Community Manager & Trainer",
        sector: "tech",
        category: "tech-devrel",
        categoryTitle: "Developer Relations & Community Management Tech",
        missions:
          "Animation de communautés techniques en ligne et en présentiel, organisation d'ateliers de formation pratique sur des stacks précises, accompagnement des développeurs juniors et partenariats.",
        keyTools: ["Animation de communauté", "Organisation DevFest", "Formation pratique", "Mentorat", "Discord/Slack"],
        recommendedProfileId: "project-manager",
        pitch:
          "Organisateur du DevFest KIVU 2023 (200+ participants, 20+ sessions) et formateur reconnu : je bâtis des écosystèmes d'apprentissage engagés et dynamiques autour des technologies.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTEUR HUMANITAIRE, ONG & DÉVELOPPEMENT (OCHA, REACH, UNICEF, Clusters)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "meal",
    sector: "ngo",
    title: "1. Gestion de l'Information, Données et Suivi-Évaluation (IM & MEAL)",
    badge: "IM & MEAL",
    iconName: "BarChart3",
    description:
      "Votre maîtrise de la collecte de données (KoboCollect, Google Forms), de l'analyse (Python, Pandas, R, Excel avancé, Power BI) et votre certification au package ERM OCHA/REACH font de vous un candidat idéal pour ces postes clés.",
    roles: [
      {
        id: "imo",
        title: "Information Management Officer (IMO) / Officier de gestion de l'information",
        titleEn: "Information Management Officer (IMO)",
        sector: "ngo",
        category: "meal",
        categoryTitle: "Gestion de l'Information & Suivi-Évaluation",
        missions:
          "Conception des bases de données relationnelles, création de tableaux de bord interactifs (Power BI), cartographie des besoins et gestion globale du flux d'informations humanitaires pour les clusters ou les programmes.",
        keyTools: ["KoboToolbox", "Power BI", "PostgreSQL", "Python", "Excel avancé", "Cartographie"],
        recommendedProfileId: "ngo-meal",
        pitch:
          "Ingénieur logiciel et data manager doté d'une double compétence rare : je structure des bases de données robustes et je conçois des tableaux de bord interactifs permettant aux coordinateurs de suivre en temps réel les indicateurs d'impact.",
      },
      {
        id: "meal-officer",
        title: "Chargé / Officier de Suivi, Évaluation, Redevabilité et Apprentissage (MEAL / SE&A Officer)",
        titleEn: "MEAL / M&E Officer",
        sector: "ngo",
        category: "meal",
        categoryTitle: "Gestion de l'Information & Suivi-Évaluation",
        missions:
          "Élaboration des outils de collecte terrain, suivi rigoureux des indicateurs de projets, analyse des données qualitatives et quantitatives, et mise en œuvre des mécanismes de redevabilité (AAP/PSEA).",
        keyTools: ["Ehtools", "Indicateurs PSEA / AAP", "KoboCollect", "Plans MEAL", "Théorie du changement"],
        recommendedProfileId: "ngo-meal",
        pitch:
          "Formé au nouveau package ERM par OCHA et REACH Initiative, j'intègre rigoureusement la redevabilité (AAP) et la protection (PSEA) dans les outils de suivi-évaluation, tout en automatisant le reporting terrain pour réduire les délais de décision.",
      },
      {
        id: "humanitarian-data-analyst",
        title: "Analyste de Données Humanitaires (Data Analyst / Data Manager)",
        titleEn: "Humanitarian Data Analyst",
        sector: "ngo",
        category: "meal",
        categoryTitle: "Gestion de l'Information & Suivi-Évaluation",
        missions:
          "Traitement, nettoyage, contrôle qualité et analyse quantitative/qualitative approfondie des données issues des enquêtes terrain (expérience réussie chez GEVAPOM ASBL et A Rocha RDC).",
        keyTools: ["Python (Pandas)", "SQL", "Excel avancé", "Power BI", "Data Cleaning", "Statistiques"],
        recommendedProfileId: "ngo-data",
        pitch:
          "Fort de mon expérience de Data Manager chez GEVAPOM ASBL (digitalisation de 8 écoles, 100% des processus administratifs automatisés) et chez A Rocha RDC, j'assure la fiabilité, la confidentialité et l'exploitation statistique des données de terrain les plus complexes.",
      },
    ],
  },
  {
    id: "t4d",
    sector: "ngo",
    title: "2. Technologies, Systèmes d'Information et « Tech for Development » (ICT / T4D)",
    badge: "ICT & T4D",
    iconName: "Cpu",
    description:
      "Grâce à vos compétences avancées en ingénierie logicielle (Spring Boot, Next.js, Django, PostgreSQL, Docker) et votre expérience de gestionnaire IT, vous répondez aux défis technologiques du secteur humanitaire.",
    roles: [
      {
        id: "ict-officer",
        title: "ICT Officer / Responsable des Technologies de l'Information",
        titleEn: "ICT Officer / IT Manager",
        sector: "ngo",
        category: "t4d",
        categoryTitle: "Tech for Development & Systèmes d'Information",
        missions:
          "Administration des systèmes informatiques, maintenance des infrastructures réseau locales, sécurisation des données sensibles et support technique pour les équipes terrain et sièges de l'ONG.",
        keyTools: ["Systèmes & Réseaux", "Sécurité des données", "Gestion de parc", "Support IT", "Backup cloud"],
        recommendedProfileId: "ngo-it",
        pitch:
          "Informaticien de gestion capable d'assurer la résilience technologique des bases humanitaires : je configure des systèmes simples et sécurisés, adaptés aux contraintes d'électricité et de connectivité intermittente du Kivu.",
      },
      {
        id: "t4d-dev",
        title: "Développeur de Solutions / Software Engineer pour ONG (T4D - Tech for Development)",
        titleEn: "T4D Software Engineer",
        sector: "ngo",
        category: "t4d",
        categoryTitle: "Tech for Development & Systèmes d'Information",
        missions:
          "Conception d'applications sur-mesure (web, mobile et desktop hors-ligne) pour la gestion des bénéficiaires, la distribution d'aide, l'enregistrement biométrique ou le suivi logistique.",
        keyTools: ["Next.js", "Flutter", "Spring Boot", "Offline-first", "Biométrie", "API REST"],
        recommendedProfileId: "ngo-it",
        pitch:
          "Développeur full-stack expérimenté dans la livraison de plateformes critiques (HMS Elite, PGCC biométrique, Maago hors ligne) : je conçois des outils logiciels taillés pour les opérations de terrain, utilisables sans connexion Internet.",
      },
      {
        id: "dba",
        title: "Database Administrator (DBA) / Administrateur de Bases de Données",
        titleEn: "Database Administrator (DBA)",
        sector: "ngo",
        category: "t4d",
        categoryTitle: "Tech for Development & Systèmes d'Information",
        missions:
          "Structuration, sécurisation (chiffrement AES-256), optimisation des requêtes et intégrité des bases de données institutionnelles de l'organisation.",
        keyTools: ["PostgreSQL", "Modélisation Merise / UML", "AES-256", "Sauvegardes automatisées", "SQL"],
        recommendedProfileId: "ngo-it",
        pitch:
          "Architecte de bases de données ayant géré plus de 10 000 dossiers simultanés : je garantis une modélisation sans faille, des temps de réponse inférieurs à 200ms et une protection stricte des données personnelles des bénéficiaires.",
      },
    ],
  },
  {
    id: "emergency",
    sector: "ngo",
    title: "3. Évaluation Rapide et Intervention d'Urgence (Humanitaire)",
    badge: "Urgence & ERM",
    iconName: "Zap",
    description:
      "Votre formation au Package ERM (facilitée par OCHA et REACH Initiative à Bukavu) vous ouvre directement les portes des équipes d'urgence et des mécanismes de réponse rapide.",
    roles: [
      {
        id: "erm-assessor",
        title: "Spécialiste / Enquêteur en Évaluation Rapide Multisectorielle (ERM Assessor)",
        titleEn: "Multi-Sector Rapid Assessment Specialist (ERM Assessor)",
        sector: "ngo",
        category: "emergency",
        categoryTitle: "Évaluation Rapide et Intervention d'Urgence",
        missions:
          "Conduite d'évaluations d'urgence sur le terrain lors de crises, maîtrise des techniques d'échantillonnage statistique, collectes de données avec l'outil Ehtools et rédaction de rapports rapides d'alerte.",
        keyTools: ["Package ERM OCHA", "Ehtools", "Échantillonnage statistique", "Rapports d'alerte", "KoboCollect"],
        recommendedProfileId: "ngo-emergency",
        pitch:
          "Formé sur le tout nouveau package ERM par OCHA et REACH Initiative (août 2026), je maîtrise la méthodologie standardisée d'évaluation d'urgence, l'outil Ehtools et l'analyse multisectorielle pour orienter l'aide d'urgence.",
      },
      {
        id: "field-rapid-officer",
        title: "Officier / Chargé de Terrain (Field Officer / Rapid Response Officer)",
        titleEn: "Field Officer / Rapid Response Officer",
        sector: "ngo",
        category: "emergency",
        categoryTitle: "Évaluation Rapide et Intervention d'Urgence",
        missions:
          "Déploiement rapide dans les zones touchées par des chocs (déplacements, catastrophes) pour évaluer les besoins prioritaires des populations affectées et coordonner les premières réponses.",
        keyTools: ["Déploiement terrain", "Coordination humanitaire", "Sécurité terrain", "Enquêtes ménages"],
        recommendedProfileId: "ngo-emergency",
        pitch:
          "Doté d'une excellente connaissance du terrain à l'Est de la RDC et d'une maîtrise des protocoles humanitaires, j'agis vite avec rigueur méthodologique pour transformer les constats de terrain en données exploitables pour les clusters.",
      },
    ],
  },
  {
    id: "peace",
    sector: "ngo",
    title: "4. Communication, Plaidoyer et Consolidation de la Paix",
    badge: "Paix & Communication",
    iconName: "Heart",
    description:
      "Votre certification UNICEF (Jeune Ambassadeur de la Paix) combinée à vos compétences visuelles (UI/UX, design graphique, vidéo) et votre expérience en community management vous qualifient pour ces rôles d'impact citoyen.",
    roles: [
      {
        id: "comm-officer",
        title: "Chargé de Communication et Médias",
        titleEn: "Communications & Media Officer",
        sector: "ngo",
        category: "peace",
        categoryTitle: "Communication, Plaidoyer & Paix",
        missions:
          "Animation des réseaux sociaux, création de supports visuels de haute qualité (infographies, bulletins), rédaction d'articles d'impact et valorisation des succès auprès des partenaires et bailleurs.",
        keyTools: ["UI/UX & Design", "Photoshop / Figma", "Rédaction de récits d'impact", "Réseaux sociaux", "Vidéo"],
        recommendedProfileId: "peace-comm",
        pitch:
          "Lead GDSC et concepteur de design systems : je traduis des données et activités de projet complexes en récits visuels engageants qui captivent les bailleurs de fonds et mobilisent l'opinion.",
      },
      {
        id: "peacebuilding-officer",
        title: "Officier de Consolidation de la Paix et Médiation (Peacebuilding Officer)",
        titleEn: "Peacebuilding & Mediation Officer",
        sector: "ngo",
        category: "peace",
        categoryTitle: "Communication, Plaidoyer & Paix",
        missions:
          "Facilitation du dialogue communautaire, gestion de conflits locaux, sensibilisation des jeunes et mise en œuvre des programmes de cohésion sociale et de consolidation de la paix.",
        keyTools: ["Médiation", "Jeune Ambassadeur UNICEF", "Dialogue communautaire", "Sensibilisation jeunes"],
        recommendedProfileId: "peace-comm",
        pitch:
          "Certifié Jeune Ambassadeur de la Paix par l'UNICEF, je possède les compétences relationnelles et la légitimité pour animer des espaces de dialogue inclusifs et transformer les tensions en opportunités de développement collaboratif.",
      },
      {
        id: "advocacy-officer",
        title: "Chargé de Mobilisation Communautaire / Plaidoyer (Advocacy & Community Engagement Officer)",
        titleEn: "Advocacy & Community Engagement Officer",
        sector: "ngo",
        category: "peace",
        categoryTitle: "Communication, Plaidoyer & Paix",
        missions:
          "Sensibilisation des communautés, mobilisation des parties prenantes locales, animation d'ateliers participatifs et accompagnement de l'engagement citoyen.",
        keyTools: ["Mobilisation citoyenne", "Ateliers participatifs", "Plaidoyer institutionnel", "AAP"],
        recommendedProfileId: "peace-comm",
        pitch:
          "Ayant mobilisé plus de 200 développeurs et acteurs locaux lors du DevFest KIVU 2023 et animé des dizaines de sessions communautaires, je sais créer l'adhésion et fédérer autour des causes d'intérêt public.",
      },
    ],
  },
  {
    id: "management",
    sector: "ngo",
    title: "5. Gestion et Coordination de Projets",
    badge: "Gestion de Projet",
    iconName: "FolderKanban",
    description:
      "Grâce à vos certifications en gestion de projet (Méthodes agiles, UML, Merise) et vos expériences de direction (Fondateur SOSIDE COMPANY, Lead GDSC, Chef de projet chez Aumsoft et GEVAPOM).",
    roles: [
      {
        id: "project-officer",
        title: "Chargé / Officier de Projet (Project Officer)",
        titleEn: "Project Officer",
        sector: "ngo",
        category: "management",
        categoryTitle: "Gestion et Coordination de Projets",
        missions:
          "Planification opérationnelle, exécution budgétaire, coordination des équipes de terrain, suivi des livrables et gestion des relations avec les parties prenantes.",
        keyTools: ["Méthodes Agiles / Scrum", "Planification Gantt", "Budgétisation", "Gestion des parties prenantes"],
        recommendedProfileId: "project-manager",
        pitch:
          "Fondateur de SAS et chef de projet technique : je combine rigueur de cadrage, leadership bienveillant et culture du résultat mesurable pour livrer les projets dans les délais impartis.",
      },
      {
        id: "program-manager-assistant",
        title: "Assistant / Associate Program Manager",
        titleEn: "Associate Program Manager",
        sector: "ngo",
        category: "management",
        categoryTitle: "Gestion et Coordination de Projets",
        missions:
          "Appui stratégique à la coordination générale des programmes multi-projets, rédaction des rapports d'avancement pour les bailleurs de fonds (USAID, UE, ONU, banques de développement).",
        keyTools: ["Reporting bailleurs", "Gestion multi-projets", "Coordination transversale", "Monitoring"],
        recommendedProfileId: "project-manager",
        pitch:
          "Capacité démontrée à piloter des équipes multidisciplinaires et à standardiser les processus pour maximiser l'impact global et la conformité contractuelle envers les bailleurs de fonds.",
      },
    ],
  },
]

export const KEY_ASSETS = [
  {
    title: "Double Profil d'Excellence : Tech & Humanitaire",
    description:
      "Ingénierie informatique de pointe (Next.js, Spring Boot, architectures distribuées, microservices, cloud, sécurité AES-256) combinée aux standards humanitaires reconnus (KoboToolbox, Package ERM OCHA/REACH, Ehtools, PSEA, AAP, transversalité Genre/Handicap).",
    badge: "Avantage Concurrentiel #1",
  },
  {
    title: "Capacité d'Adaptation & Leadership Éprouvé",
    description:
      "Expérience entrepreneuriale et managériale concrète (Fondateur de SOSIDE COMPANY SAS, Lead Google Developer Student Clubs Bukavu, Chef de projet chez Aumsoft et Data Manager chez GEVAPOM ASBL) couplée à un engagement citoyen certifié par l'UNICEF (Jeune Ambassadeur de la Paix) et OCHA.",
    badge: "Leadership & Impact",
  },
  {
    title: "Ancrage Régional & Réseau de Références Validé",
    description:
      "Parfaite maîtrise des contextes opérationnels de l'Est de la RDC et de la région des Grands Lacs, appuyée par 7 personnes de référence vérifiées dans les institutions publiques, universitaires, techniques et humanitaires.",
    badge: "Ancrage Local & Réseau",
  },
]
