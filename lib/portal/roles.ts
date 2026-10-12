export type TargetRole = {
  id: string
  title: string
  titleEn: string
  category: "meal" | "t4d" | "emergency" | "peace" | "management"
  missions: string
  keyTools: string[]
  recommendedProfileId: string
  pitch: string
}

export type TargetCategory = {
  id: "meal" | "t4d" | "emergency" | "peace" | "management"
  title: string
  badge: string
  iconName: string
  description: string
  roles: TargetRole[]
}

export const TARGET_CATEGORIES: TargetCategory[] = [
  {
    id: "meal",
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
        category: "meal",
        missions:
          "Conception des bases de données relationnelles, création de tableaux de bord interactifs (Power BI), cartographie des besoins et gestion globale du flux d'informations humanitaires pour les clusters ou les programmes.",
        keyTools: ["KoboToolbox", "Power BI", "PostgreSQL", "Python", "Excel avancé", "Cartographie"],
        recommendedProfileId: "ngo-data",
        pitch:
          "Ingénieur logiciel et data manager doté d'une double compétence rare : je structure des bases de données robustes et je conçois des tableaux de bord interactifs permettant aux coordinateurs de suivre en temps réel les indicateurs d'impact.",
      },
      {
        id: "meal-officer",
        title: "Chargé / Officier de Suivi, Évaluation, Redevabilité et Apprentissage (MEAL / SE&A Officer)",
        titleEn: "MEAL / M&E Officer",
        category: "meal",
        missions:
          "Élaboration des outils de collecte terrain, suivi rigoureux des indicateurs de projets, analyse des données qualitatives et quantitatives, et mise en œuvre des mécanismes de redevabilité (AAP/PSEA).",
        keyTools: ["Ehtools", "Indicateurs PSEA / AAP", "KoboCollect", "Plans MEAL", "Théorie du changement"],
        recommendedProfileId: "ngo-data",
        pitch:
          "Formé au nouveau package ERM par OCHA et REACH Initiative, j'intègre rigoureusement la redevabilité (AAP) et la protection (PSEA) dans les outils de suivi-évaluation, tout en automatisant le reporting terrain pour réduire les délais de décision.",
      },
      {
        id: "humanitarian-data-analyst",
        title: "Analyste de Données Humanitaires (Data Analyst / Data Manager)",
        titleEn: "Humanitarian Data Analyst",
        category: "meal",
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
        category: "t4d",
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
        category: "t4d",
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
        category: "t4d",
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
        category: "emergency",
        missions:
          "Conduite d'évaluations d'urgence sur le terrain lors de crises, maîtrise des techniques d'échantillonnage statistique, collectes de données avec l'outil Ehtools et rédaction de rapports rapides d'alerte.",
        keyTools: ["Package ERM OCHA", "Ehtools", "Échantillonnage statistique", "Rapports d'alerte", "KoboCollect"],
        recommendedProfileId: "ngo-data",
        pitch:
          "Formé sur le tout nouveau package ERM par OCHA et REACH Initiative (août 2026), je maîtrise la méthodologie standardisée d'évaluation d'urgence, l'outil Ehtools et l'analyse multisectorielle pour orienter l'aide d'urgence.",
      },
      {
        id: "field-rapid-officer",
        title: "Officier / Chargé de Terrain (Field Officer / Rapid Response Officer)",
        titleEn: "Field Officer / Rapid Response Officer",
        category: "emergency",
        missions:
          "Déploiement rapide dans les zones touchées par des chocs (déplacements, catastrophes) pour évaluer les besoins prioritaires des populations affectées et coordonner les premières réponses.",
        keyTools: ["Déploiement terrain", "Coordination humanitaire", "Sécurité terrain", "Enquêtes ménages"],
        recommendedProfileId: "ngo-it",
        pitch:
          "Doté d'une excellente connaissance du terrain à l'Est de la RDC et d'une maîtrise des protocoles humanitaires, j'agis vite avec rigueur méthodologique pour transformer les constats de terrain en données exploitables pour les clusters.",
      },
    ],
  },
  {
    id: "peace",
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
        category: "peace",
        missions:
          "Animation des réseaux sociaux, création de supports visuels de haute qualité (infographies, bulletins), rédaction d'articles d'impact et valorisation des succès auprès des partenaires et bailleurs.",
        keyTools: ["UI/UX & Design", "Photoshop / Figma", "Rédaction de récits d'impact", "Réseaux sociaux", "Vidéo"],
        recommendedProfileId: "ngo-it",
        pitch:
          "Lead GDSC et concepteur de design systems : je traduis des données et activités de projet complexes en récits visuels engageants qui captivent les bailleurs de fonds et mobilisent l'opinion.",
      },
      {
        id: "peacebuilding-officer",
        title: "Officier de Consolidation de la Paix et Médiation (Peacebuilding Officer)",
        titleEn: "Peacebuilding & Mediation Officer",
        category: "peace",
        missions:
          "Facilitation du dialogue communautaire, gestion de conflits locaux, sensibilisation des jeunes et mise en œuvre des programmes de cohésion sociale et de consolidation de la paix.",
        keyTools: ["Médiation", "Jeune Ambassadeur UNICEF", "Dialogue communautaire", "Sensibilisation jeunes"],
        recommendedProfileId: "ngo-it",
        pitch:
          "Certifié Jeune Ambassadeur de la Paix par l'UNICEF, je possède les compétences relationnelles et la légitimité pour animer des espaces de dialogue inclusifs et transformer les tensions en opportunités de développement collaboratif.",
      },
      {
        id: "advocacy-officer",
        title: "Chargé de Mobilisation Communautaire / Plaidoyer (Advocacy & Community Engagement Officer)",
        titleEn: "Advocacy & Community Engagement Officer",
        category: "peace",
        missions:
          "Sensibilisation des communautés, mobilisation des parties prenantes locales, animation d'ateliers participatifs et accompagnement de l'engagement citoyen.",
        keyTools: ["Mobilisation citoyenne", "Ateliers participatifs", "Plaidoyer institutionnel", "AAP"],
        recommendedProfileId: "ngo-it",
        pitch:
          "Ayant mobilisé plus de 200 développeurs et acteurs locaux lors du DevFest KIVU 2023 et animé des dizaines de sessions communautaires, je sais créer l'adhésion et fédérer autour des causes d'intérêt public.",
      },
    ],
  },
  {
    id: "management",
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
        category: "management",
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
        category: "management",
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
    title: "Profil Hybride Rare : Ingénierie Logicielle & Standards Humanitaires",
    description:
      "Vous maîtrisez à la fois l'ingénierie informatique de pointe (Next.js, Spring Boot, architecture cloud, microservices, bases de données) ET les standards humanitaires de référence sur le terrain (KoboToolbox, Package ERM OCHA/REACH, outil Ehtools, PSEA, AAP, transversalité Genre/Handicap). C'est le profil le plus recherché par les grandes ONG et agences internationales.",
    badge: "Avantage Concurrentiel #1",
  },
  {
    title: "Capacité d'Adaptation & Leadership Éprouvé",
    description:
      "Expérience entrepreneuriale et managériale concrète (Fondateur de SOSIDE COMPANY SAS, Lead Google Developer Student Clubs Bukavu, Chef de projet chez Aumsoft et Data Manager chez GEVAPOM ASBL) couplée à un engagement citoyen certifié par l'UNICEF (Jeune Ambassadeur de la Paix) et OCHA.",
    badge: "Leadership & Impact",
  },
  {
    title: "Ancrage Terrain Kivu & RDC avec Réseau de Références Solide",
    description:
      "Parfaite maîtrise des réalités du Sud-Kivu et de l'Est de la RDC (connectivité intermittente, multi-devises, contextes de crise), appuyée par 7 personnes de référence vérifiées dans les institutions publiques, universitaires et humanitaires.",
    badge: "Ancrage Local & Réseau",
  },
]
