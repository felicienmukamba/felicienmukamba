export const translations = {
  fr: {
    // Header
    greeting: "Bonjour, je suis",
    name: "Félicien Mukamba",
    fullName: "FÉLICIEN MUKAMBA KAZINDJA",
    role: "Staff Software Engineer & Architecte Système",
    tagline: "Je conçois des architectures logicielles distribuées et des plateformes de souveraineté numérique. J'allie ingénierie système de précision et design minimaliste pour bâtir des écosystèmes scalables à fort impact.",
    description: "Fullstack Software Engineer et fondateur de SOSIDE COMPANY SAS, je dirige la création de solutions logicielles complexes, de l'idéation au déploiement en production. Mon approche repose sur une ingénierie axée sur les données et la résolution de problèmes critiques à grande échelle.",

    // Navigation
    nav: {
      about: "À propos",
      experience: "Expérience",
      projects: "Projets",
      education: "Formation",
      contact: "Contact",
    },

    // About
    about: {
      title: "À propos",
      p1: "En tant que Fullstack Software Engineer et fondateur de SOSIDE COMPANY SAS, je dirige la création de solutions logicielles complexes, de l'idéation au déploiement en production. Mon approche repose sur une ingénierie axée sur les données et la résolution de problèmes critiques à grande échelle.",
      p2: "J'architecte des systèmes hautement disponibles et sécurisés, qu'il s'agisse d'infrastructures d'identité numérique (PGCC) ou de plateformes SaaS multi-tenant. Mon expertise couvre un spectre large, allant de l'écosystème React/Node.js et Spring Boot, jusqu'à la conteneurisation Docker, les pratiques DevOps et l'orchestration d'intelligence artificielle.",
      p3: "Obsédé par la performance et la qualité du code, j'explore continuellement des technologies de pointe comme Rust pour les composants critiques. Mon objectif : transformer la complexité technique en interfaces fluides, minimalistes et extrêmement résilientes.",
      highlightedCompanies: ["SOSIDE COMPANY SAS", "Aumsoft Technology", "Google Developers"],
    },

    // Experience
    experience: {
      title: "Parcours Professionnel",
      items: [
        {
          period: "2024 — Présent",
          title: "Fondateur & Lead Software Engineer",
          company: "SOSIDE COMPANY SAS",
          companyUrl: "#",
          location: "Bukavu",
          description: "Direction technique et stratégique de l'entreprise. Pilotage de la transformation digitale et intégration de solutions IA pour des clients institutionnels.",
          technologies: ["Next.js", "Spring Boot", "Rust", "Docker", "AI Orchestration"],
          achievements: [
            "J'ai orchestré la livraison de 3 plateformes B2B majeures, mesuré par un taux d'adoption de 100% chez nos clients initiaux, en dirigeant une équipe technique agile et en standardisant nos pipelines CI/CD.",
            "J'ai réduit le time-to-market de nos solutions de 40%, mesuré par la diminution des cycles de release, en implémentant une architecture microservices conteneurisée sous Docker."
          ],
        },
        {
          period: "Déc 2024 — Présent",
          title: "Senior Fullstack Engineer",
          company: "Aumsoft Technology",
          companyUrl: "https://aumsoft.net",
          location: "Bukavu",
          description:
            "Développement de solutions web et mobile complètes pour des clients variés. Conception d'architectures scalables et sécurisées.",
          technologies: ["Next.js", "React", "Flutter", "Spring Boot", "PostgreSQL"],
          achievements: [
            "J'ai conçu l'architecture de systèmes d'information multi-universitaires, mesuré par la gestion fluide de plus de 10 000 dossiers étudiants simultanés, en déployant un backend Spring Boot réactif et des bases de données PostgreSQL optimisées."
          ],
        },
        {
          period: "2024",
          title: "Data Manager & IT Support",
          company: "GEVAPOM ASBL",
          companyUrl: "#",
          location: "Bukavu",
          description:
            "Gestion des données et support informatique pour une ONG œuvrant dans le secteur éducatif. Transformation numérique de 8 établissements scolaires.",
          technologies: ["Python", "Excel", "PostgreSQL", "Power BI"],
          achievements: [
            "J'ai digitalisé 100% des processus administratifs scolaires, mesuré par une réduction de 60% du temps administratif, en concevant des outils de suivi automatisés et en formant plus de 50 enseignants."
          ],
        },
        {
          period: "2023",
          title: "Community Leader (GDSC Lead)",
          company: "Google Developer Student Clubs",
          companyUrl: "https://developers.google.com/community/gdsc",
          location: "Bukavu",
          description:
            "Leadership de la plus grande communauté tech de l'Est du Congo. Organisation du DevFest KIVU 2023.",
          technologies: ["Flutter", "Firebase", "Angular", "Google Cloud"],
          achievements: [
            "J'ai fédéré l'écosystème tech local, mesuré par la participation de plus de 200 développeurs au DevFest KIVU 2023, en coordonnant plus de 20 sessions de formation technique."
          ],
        },
      ],
    },

    // Projects
    projects: {
      title: "Projets Phares",
      labels: {
        challenge: "Le Défi",
        architecture: "L'Architecture",
        impact: "L'Impact",
      },
      viewAll: "Voir tous les projets",
      viewProject: "Voir le projet",
      watchDemo: "Voir la démo",
      testApp: "Tester l'application",
      items: [
        {
          title: "PGCC — Portail de Gestion des Citoyens Congolais",
          description: "Plateforme d'identité numérique et de services publics sécurisés.",
          challenge: "Concevoir un système d'identité numérique centralisé capable de gérer de manière hautement sécurisée et fluide des millions de données citoyennes sensibles, tout en garantissant une résilience totale face aux tentatives d'interception de données.",
          architecture: "Architecture découplée et distribuée basée sur un backend Spring Boot rigoureux et un frontend ultra-rapide sous Next.js. Intégration de pipelines de validation de données biométriques et stockage relationnel optimisé sous PostgreSQL.",
          impact: "J'ai sécurisé et centralisé l'infrastructure d'identité numérique citoyenne, mesuré par un temps de réponse système inférieur à 200ms et un niveau de conformité cryptographique maximal, en implémentant un chiffrement de bout en bout via l'algorithme AES-256-GCM, un protocole de hachage renforcé pour les données biométriques, et une architecture d'API REST hautement disponible.",
          image: "/digital-identity-platform-dashboard-dark-theme.jpg",
          technologies: ["Spring Boot", "Next.js", "PostgreSQL", "Biometrics", "AES-256"],
          link: "#",
          videoDemo: "https://www.youtube.com/watch?v=zPOI5yNTQFs",
          featured: true,
          stats: { users: "10K+", uptime: "99.9%", security: "AES-256" },
        },
        {
          title: "UMS — University Management System",
          description: "Plateforme SaaS multi-tenant de gestion académique à grande échelle.",
          challenge: "Bâtir une solution de gestion universitaire unique capable d'héberger des dizaines d'institutions indépendantes (SaaS) sur une infrastructure partagée, tout en garantissant une isolation stricte des données, une flexibilité de configuration par entité et une tolérance aux pannes lors des pics de charge académiques.",
          architecture: "Architecture multi-locataire (Multi-tenant) développée avec Spring Boot et Angular. Implémentation d'une stratégie d'isolation des données au niveau de la base de données (Tenant-per-schema). Conteneurisation, gestion des environnements et orchestration globale gérées intégralement via Docker.",
          impact: "J'ai déployé une plateforme SaaS d'administration académique mutualisée et multi-universitaire, mesuré par une isolation des données étanche à 100 % entre les institutions et une réduction drastique des coûts opérationnels d'infrastructure, en concevant un système de routage dynamique des requêtes par identifiant de tenant, en optimisant les pools de connexions PostgreSQL et en standardisant l'infrastructure via des conteneurs isolés Docker.",
          image: "/citizen-data-management-angular-application.jpg",
          technologies: ["Spring Boot", "Angular", "Docker", "PostgreSQL"],
          link: "https://ums-v1.aumsoft.net/",
          liveDemo: true,
          credentials: { email: "academic@unikin.cd", password: "password" },
          featured: true,
          stats: { institutions: "5+", isolation: "100%", modules: "50+" },
        },
        {
          title: "Mazingira Safi",
          description: "Système de logistique d'assainissement urbain et suivi environnemental data-driven.",
          challenge: "Optimiser la logistique d'assainissement urbain et le suivi environnemental à l'échelle d'une ville grâce à une approche orientée données.",
          architecture: "Application fullstack intégrant la géolocalisation en temps réel, l'analyse de données (Data Science) pour la prédiction des flux, et un tableau de bord analytique minimaliste.",
          impact: "J'ai fluidifié la chaîne logistique de traitement des déchets urbains, mesuré par l'amélioration de l'efficacité des tournées de collecte, en développant des algorithmes d'optimisation de routes et des interfaces de suivi en temps réel.",
          image: "/school-management-system-interface-modern.jpg",
          technologies: ["Next.js", "Python", "Data Science", "PostgreSQL"],
          link: "#",
          featured: true,
          stats: { coverage: "City-wide", efficiency: "+40%" },
        },
        {
          title: "Citizen Management Angular",
          description:
            "Application Angular moderne pour la gestion des données citoyennes avec interface intuitive et système de recherche avancé.",
          image: "/hr-management-system-dashboard.jpg",
          technologies: ["Angular", "TypeScript", "RxJS", "Material UI"],
          link: "https://github.com/felicienmukamba/citizen-frontend-with-angular",
          featured: false,
        },
      ],
    },

    // Education
    education: {
      title: "Formation Académique",
      items: [
        {
          degree: "Licence en Informatique de Gestion (L1-L2)",
          school: "Institut Supérieur Pédagogique de Bukavu",
          period: "2023 — 2025",
          description: "Spécialisation en développement logiciel et systèmes d'information",
        },
        {
          degree: "Graduat en Informatique de Gestion (G1-G3)",
          school: "Institut Supérieur Pédagogique de Bukavu",
          period: "2020 — 2023",
          description: "Fondamentaux de la programmation et gestion des bases de données",
        },
        {
          degree: "Diplôme d'État",
          school: "Institut Kele / Kamituga",
          period: "2014 — 2020",
          description: "Études secondaires",
        },
      ],
      certifications: {
        title: "Formations & Certifications",
        items: [
          {
            name: "Gestion de Projet (Agile, UML, GitHub, Merise)",
            provider: "OpenClassrooms",
            year: "2024",
          },
          {
            name: "Leadership & Community Management",
            provider: "Google Developer Student Clubs",
            year: "2023",
          },
          {
            name: "Analyse des données, UI/UX Design",
            provider: "Coursera",
            year: "2023",
          },
          {
            name: "Programmation (Angular, React, JavaScript, Python, Django)",
            provider: "OpenClassrooms",
            year: "2022",
          },
        ],
      },
    },

    // Skills
    skills: {
      title: "Compétences Techniques",
      categories: [
        {
          name: "Architecture & DevOps",
          items: ["System Architecture", "Distributed Systems", "Microservices", "Docker", "DevOps"],
        },
        {
          name: "Langages & Frameworks",
          items: ["Next.js", "React", "Spring Boot", "Java", "Python", "Rust (Learning)"],
        },
        {
          name: "Data & IA",
          items: ["PostgreSQL", "AI Orchestration", "Data Science"],
        },
        {
          name: "Sécurité",
          items: ["AES-256", "Biometrics", "OAuth 2.0", "JWT"],
        },
      ],
    },

    // Contact
    contact: {
      title: "Contact",
      subtitle: "Discutons de votre projet",
      description:
        "Je suis disponible immédiatement pour des opportunités d'emploi, des collaborations ou des démonstrations techniques de mes travaux.",
      cta: "Me contacter",
      email: "felicienmukamba.cd@gmail.com",
      phone: "+243 995 209 133",
      location: "RD Congo, Sud-Kivu, Bukavu, Q. Nyalukembe, Av. Fizi 1",
    },

    // References
    references: {
      title: "Références",
      items: [
        {
          name: "MBILIZI MWISIMBWA Déogratias",
          role: "Chef de Département Informatique",
          company: "ISP Bukavu",
          email: "mbilizidembi@gmail.com",
          phone: "+243 994 405 683",
        },
        {
          name: "Bivunga Missy",
          role: "Coordinateur National",
          company: "GEVAPOM ASBL",
          email: "bivungamissy@gmail.com",
          phone: "+243 997 758 001",
        },
        {
          name: "Dieumerci MUHINDO",
          role: "Manager",
          company: "Aumsoft Technology",
          email: "dieumercimuhindo@aumsoft.net",
          phone: "+243 895 490 957",
        },
      ],
    },

    // Footer
    footer: {
      designed: "Conçu et développé par",
      built: "Construit avec Next.js, Tailwind CSS et Three.js",
    },

    // Actions
    downloadCV: "Télécharger CV",
    viewResume: "Voir le CV complet",

    // Personal traits
    traits: {
      title: "Qualités Personnelles",
      items: [
        "Leadership & Créativité",
        "Sens de l'écoute & Communication",
        "Intégrité et transparence",
        "Inclusion et respect de la diversité",
        "Gestion et partage des connaissances",
        "Travail sous pression et rigueur",
      ],
    },
  },

  en: {
    // Header
    greeting: "Hi, I'm",
    name: "Félicien Mukamba",
    fullName: "FÉLICIEN MUKAMBA KAZINDJA",
    role: "Staff Software Engineer & Systems Architect",
    tagline: "I design distributed software architectures and digital sovereignty platforms. I combine precision systems engineering and minimalist design to build high-impact scalable ecosystems.",
    description: "Fullstack Software Engineer and founder of SOSIDE COMPANY SAS, I lead the creation of complex software solutions, from ideation to production deployment. My approach relies on data-driven engineering and solving critical problems at scale.",

    // Navigation
    nav: {
      about: "About",
      experience: "Experience",
      projects: "Projects",
      education: "Education",
      contact: "Contact",
    },

    // About
    about: {
      title: "About",
      p1: "As a Fullstack Software Engineer and founder of SOSIDE COMPANY SAS, I lead the creation of complex software solutions, from ideation to production deployment. My approach relies on data-driven engineering and solving critical problems at scale.",
      p2: "I architect highly available and secure systems, whether digital identity infrastructures (PGCC) or multi-tenant SaaS platforms. My expertise covers a broad spectrum, from the React/Node.js and Spring Boot ecosystem, to Docker containerization, DevOps practices, and artificial intelligence orchestration.",
      p3: "Obsessed with performance and code quality, I continuously explore cutting-edge technologies like Rust for critical components. My goal: transform technical complexity into fluid, minimalist, and highly resilient interfaces.",
      highlightedCompanies: ["SOSIDE COMPANY SAS", "Aumsoft Technology", "Google Developers"],
    },

    // Experience
    experience: {
      title: "Professional Experience",
      items: [
        {
          period: "2024 — Present",
          title: "Founder & Lead Software Engineer",
          company: "SOSIDE COMPANY SAS",
          companyUrl: "#",
          location: "Bukavu",
          description: "Technical and strategic leadership of the company. Piloting digital transformation and integrating AI solutions for institutional clients.",
          technologies: ["Next.js", "Spring Boot", "Rust", "Docker", "AI Orchestration"],
          achievements: [
            "I orchestrated the delivery of 3 major B2B platforms, measured by a 100% adoption rate among our initial clients, by leading an agile technical team and standardizing our CI/CD pipelines.",
            "I reduced the time-to-market of our solutions by 40%, measured by the decrease in release cycles, by implementing a containerized microservices architecture with Docker."
          ],
        },
        {
          period: "Dec 2024 — Present",
          title: "Senior Fullstack Engineer",
          company: "Aumsoft Technology",
          companyUrl: "https://aumsoft.net",
          location: "Bukavu",
          description:
            "Development of complete web and mobile solutions for various clients. Design of scalable and secure architectures.",
          technologies: ["Next.js", "React", "Flutter", "Spring Boot", "PostgreSQL"],
          achievements: [
            "I architected multi-university information systems, measured by the seamless management of over 10,000 simultaneous student records, by deploying a reactive Spring Boot backend and optimized PostgreSQL databases."
          ],
        },
        {
          period: "2024",
          title: "Data Manager & IT Support",
          company: "GEVAPOM ASBL",
          companyUrl: "#",
          location: "Bukavu",
          description:
            "Data management and IT support for an NGO in the education sector. Digital transformation of 8 educational institutions.",
          technologies: ["Python", "Excel", "PostgreSQL", "Power BI"],
          achievements: [
            "I digitized 100% of school administrative processes, measured by a 60% reduction in administrative time, by designing automated tracking tools and training over 50 teachers."
          ],
        },
        {
          period: "2023",
          title: "Community Leader (GDSC Lead)",
          company: "Google Developer Student Clubs",
          companyUrl: "https://developers.google.com/community/gdsc",
          location: "Bukavu",
          description:
            "Leading the largest tech community in Eastern Congo. Organized DevFest KIVU 2023.",
          technologies: ["Flutter", "Firebase", "Angular", "Google Cloud"],
          achievements: [
            "I united the local tech ecosystem, measured by the participation of over 200 developers at DevFest KIVU 2023, by coordinating more than 20 technical training sessions."
          ],
        },
      ],
    },

    // Projects
    projects: {
      title: "Featured Projects",
      labels: {
        challenge: "The Challenge",
        architecture: "The Architecture",
        impact: "The Impact",
      },
      viewAll: "View all projects",
      viewProject: "View project",
      watchDemo: "Watch demo",
      testApp: "Test application",
      items: [
        {
          title: "PGCC — Congolese Citizens Management Portal",
          description: "Digital identity platform and secure public services.",
          challenge: "Design a centralized digital identity system capable of highly secure and fluid management of millions of sensitive citizen records, while guaranteeing total resilience against data interception attempts.",
          architecture: "Decoupled and distributed architecture based on a rigorous Spring Boot backend and an ultra-fast Next.js frontend. Integration of biometric data validation pipelines and optimized relational storage under PostgreSQL.",
          impact: "I secured and centralized the citizen digital identity infrastructure, measured by a system response time of less than 200ms and maximal cryptographic compliance, by implementing end-to-end encryption via the AES-256-GCM algorithm, a hardened hashing protocol for biometric data, and a highly available REST API architecture.",
          image: "/digital-identity-platform-dashboard-dark-theme.jpg",
          technologies: ["Spring Boot", "Next.js", "PostgreSQL", "Biometrics", "AES-256"],
          link: "#",
          videoDemo: "https://www.youtube.com/watch?v=zPOI5yNTQFs",
          featured: true,
          stats: { users: "10K+", uptime: "99.9%", security: "AES-256" },
        },
        {
          title: "UMS — University Management System",
          description: "Large-scale multi-tenant academic management SaaS platform.",
          challenge: "Build a single university management solution capable of hosting dozens of independent institutions (SaaS) on a shared infrastructure, while guaranteeing strict data isolation, entity configuration flexibility, and fault tolerance during academic peak loads.",
          architecture: "Multi-tenant architecture developed with Spring Boot and Angular. Implementation of a database-level data isolation strategy (Tenant-per-schema). Containerization, environment management, and global orchestration fully managed via Docker.",
          impact: "I deployed a mutualized and multi-university academic administration SaaS platform, measured by 100% airtight data isolation between institutions and a drastic reduction in operational infrastructure costs, by designing a dynamic request routing system by tenant identifier, optimizing PostgreSQL connection pools, and standardizing the infrastructure via isolated Docker containers.",
          image: "/citizen-data-management-angular-application.jpg",
          technologies: ["Spring Boot", "Angular", "Docker", "PostgreSQL"],
          link: "https://ums-v1.aumsoft.net/",
          liveDemo: true,
          credentials: { email: "academic@unikin.cd", password: "password" },
          featured: true,
          stats: { institutions: "5+", isolation: "100%", modules: "50+" },
        },
        {
          title: "Mazingira Safi",
          description: "Urban sanitation logistics and data-driven environmental monitoring system.",
          challenge: "Optimize urban sanitation logistics and environmental monitoring at a city scale through a data-driven approach.",
          architecture: "Fullstack application integrating real-time geolocation, data analytics (Data Science) for flow prediction, and a minimalist analytical dashboard.",
          impact: "I streamlined the urban waste treatment supply chain, measured by improved collection route efficiency, by developing route optimization algorithms and real-time tracking interfaces.",
          image: "/school-management-system-interface-modern.jpg",
          technologies: ["Next.js", "Python", "Data Science", "PostgreSQL"],
          link: "#",
          featured: true,
          stats: { coverage: "City-wide", efficiency: "+40%" },
        },
        {
          title: "Citizen Management Angular",
          description:
            "Modern Angular application for citizen data management with intuitive interface and advanced search system.",
          image: "/hr-management-system-dashboard.jpg",
          technologies: ["Angular", "TypeScript", "RxJS", "Material UI"],
          link: "https://github.com/felicienmukamba/citizen-frontend-with-angular",
          featured: false,
        },
      ],
    },

    // Education
    education: {
      title: "Academic Background",
      items: [
        {
          degree: "Bachelor's in Computer Management (L1-L2)",
          school: "Institut Supérieur Pédagogique de Bukavu",
          period: "2023 — 2025",
          description: "Specialization in software development and information systems",
        },
        {
          degree: "Associate Degree in Computer Management (G1-G3)",
          school: "Institut Supérieur Pédagogique de Bukavu",
          period: "2020 — 2023",
          description: "Programming fundamentals and database management",
        },
        {
          degree: "High School Diploma",
          school: "Institut Kele / Kamituga",
          period: "2014 — 2020",
          description: "Secondary education",
        },
      ],
      certifications: {
        title: "Training & Certifications",
        items: [
          {
            name: "Project Management (Agile, UML, GitHub, Merise)",
            provider: "OpenClassrooms",
            year: "2024",
          },
          {
            name: "Leadership & Community Management",
            provider: "Google Developer Student Clubs",
            year: "2023",
          },
          {
            name: "Data Analysis, UI/UX Design",
            provider: "Coursera",
            year: "2023",
          },
          {
            name: "Programming (Angular, React, JavaScript, Python, Django)",
            provider: "OpenClassrooms",
            year: "2022",
          },
        ],
      },
    },

    // Skills
    skills: {
      title: "Technical Skills",
      categories: [
        {
          name: "Architecture & DevOps",
          items: ["System Architecture", "Distributed Systems", "Microservices", "Docker", "DevOps"],
        },
        {
          name: "Languages & Frameworks",
          items: ["Next.js", "React", "Spring Boot", "Java", "Python", "Rust (Learning)"],
        },
        {
          name: "Data & AI",
          items: ["PostgreSQL", "AI Orchestration", "Data Science"],
        },
        {
          name: "Security",
          items: ["AES-256", "Biometrics", "OAuth 2.0", "JWT"],
        },
      ],
    },

    // Contact
    contact: {
      title: "Contact",
      subtitle: "Let's discuss your project",
      description:
        "I am immediately available for job opportunities, collaborations, or technical demonstrations of my work.",
      cta: "Get in touch",
      email: "felicienmukamba.cd@gmail.com",
      phone: "+243 995 209 133",
      location: "DR Congo, South Kivu, Bukavu, Q. Nyalukembe, Av. Fizi 1",
    },

    // References
    references: {
      title: "References",
      items: [
        {
          name: "MBILIZI MWISIMBWA Déogratias",
          role: "Head of IT Department",
          company: "ISP Bukavu",
          email: "mbilizidembi@gmail.com",
          phone: "+243 994 405 683",
        },
        {
          name: "Bivunga Missy",
          role: "National Coordinator",
          company: "GEVAPOM ASBL",
          email: "bivungamissy@gmail.com",
          phone: "+243 997 758 001",
        },
        {
          name: "Dieumerci MUHINDO",
          role: "Manager",
          company: "Aumsoft Technology",
          email: "dieumercimuhindo@aumsoft.net",
          phone: "+243 895 490 957",
        },
      ],
    },

    // Footer
    footer: {
      designed: "Designed and built by",
      built: "Built with Next.js, Tailwind CSS and Three.js",
    },

    // Actions
    downloadCV: "Download CV",
    viewResume: "View full resume",

    // Personal traits
    traits: {
      title: "Personal Qualities",
      items: [
        "Leadership & Creativity",
        "Listening & Communication skills",
        "Integrity and transparency",
        "Inclusion and respect for diversity",
        "Knowledge management and sharing",
        "Work under pressure and rigor",
      ],
    },
  },

  ln: {
    // Header
    greeting: "Mbote, nazali",
    name: "Félicien Mukamba",
    fullName: "FÉLICIEN MUKAMBA KAZINDJA",
    role: "Staff Software Engineer & Architecte Système",
    tagline: "Nasalaka ba architectures ya logiciel distribuées mpe ba plateformes ya souveraineté numérique. Nasangisaka ingénierie système ya précision mpe design minimaliste mpo na kotonga ba écosystèmes scalables ya impact makasi.",
    description: "Fullstack Software Engineer mpe mokeli ya SOSIDE COMPANY SAS, nakambaka bokeli ya ba solutions logicielles complexes, kobanda na makanisi tii na production. Lolenge na ngai etalelaka ingénierie oyo esimbami na données mpe kosilisa mikakatano minene.",

    // Navigation
    nav: {
      about: "Mpo na ngai",
      experience: "Misala",
      projects: "Ba Projets",
      education: "Boyekoli",
      contact: "Kosolola",
    },

    // About
    about: {
      title: "Mpo na ngai",
      p1: "Bila Fullstack Software Engineer mpe mokeli ya SOSIDE COMPANY SAS, nakambaka bokeli ya ba solutions logicielles complexes, kobanda na makanisi tii na production. Lolenge na ngai etalelaka ingénierie oyo esimbami na données mpe kosilisa mikakatano minene.",
      p2: "Nasalaka architectures ya ba systèmes hautement disponibles mpe sécurisés, ezala ba infrastructures ya identité numérique (PGCC) to ba plateformes SaaS multi-tenant. Mayele na ngai eza na écosystème React/Node.js mpe Spring Boot, tii na conteneurisation Docker, ba pratiques DevOps mpe orchestration ya intelligence artificielle.",
      p3: "Nalukaka ntango nyonso performance mpe qualité ya code, nalukaka ba technologies ya sika lokola Rust mpo na ba composants critiques. Mokano na ngai : kobongola complexité technique na ba interfaces ya pète, minimalistes mpe oyo ekoki kotelema makasi.",
      highlightedCompanies: ["SOSIDE COMPANY SAS", "Aumsoft Technology", "Google Developers"],
    },

    // Experience
    experience: {
      title: "Misala",
      items: [
        {
          period: "2024 — Lelo",
          title: "Mokeli & Lead Software Engineer",
          company: "SOSIDE COMPANY SAS",
          companyUrl: "#",
          location: "Bukavu",
          description: "Bokambi technique mpe stratégique ya entreprise. Pilotage ya transformation digitale mpe intégration ya ba solutions IA mpo na ba clients institutionnels.",
          technologies: ["Next.js", "Spring Boot", "Rust", "Docker", "AI Orchestration"],
          achievements: [
            "Nakambaki botindiki ya ba plateformes B2B minene 3, oyo emekami na taux ya adoption ya 100% na ba clients na biso ya yambo, na kokamba équipe technique agile mpe na kostandardiser ba pipelines CI/CD na biso.",
            "Nakitisi time-to-market ya ba solutions na biso na 40%, oyo emekami na bokitisi ya ba cycles ya release, na kotia architecture microservices oyo eza conteneurisée na Docker."
          ],
        },
        {
          period: "Déc 2024 — Lelo",
          title: "Senior Fullstack Engineer",
          company: "Aumsoft Technology",
          companyUrl: "https://aumsoft.net",
          location: "Bukavu",
          description: "Kosala ba solutions web mpe mobile mobimba mpo na ba clients ndenge na ndenge. Conception ya ba architectures scalables mpe sécurisées.",
          technologies: ["Next.js", "React", "Flutter", "Spring Boot", "PostgreSQL"],
          achievements: [
            "Nasalaki architecture ya ba systèmes d'information multi-universitaires, oyo emekami na gestion malamu ya ba dossiers étudiants koleka 10 000 na mbala moko, na kotiya backend Spring Boot oyo esalaka malamu mpe ba bases ya données PostgreSQL optimisées."
          ],
        },
        {
          period: "2024",
          title: "Data Manager & IT Support",
          company: "GEVAPOM ASBL",
          companyUrl: "#",
          location: "Bukavu",
          description: "Gestion ya données mpe support informatique mpo na ONG oyo esalaka na secteur éducatif. Transformation numérique ya ba établissements scolaires 8.",
          technologies: ["Python", "Excel", "PostgreSQL", "Power BI"],
          achievements: [
            "Nadigitalisaki 100% ya ba processus administratifs scolaires, oyo emekami na bokitisi ya 60% ya tango ya administration, na kosala ba outils ya suivi automatisés mpe ko formés ba enseignants koleka 50."
          ],
        },
        {
          period: "2023",
          title: "Community Leader (GDSC Lead)",
          company: "Google Developer Student Clubs",
          companyUrl: "https://developers.google.com/community/gdsc",
          location: "Bukavu",
          description: "Kokamba communauté tech ya monene na Est ya Congo. Organisation ya DevFest KIVU 2023.",
          technologies: ["Flutter", "Firebase", "Angular", "Google Cloud"],
          achievements: [
            "Nasangisaki écosystème tech local, oyo emekami na participation ya ba développeurs koleka 200 na DevFest KIVU 2023, na kocoordonner ba sessions ya formation technique koleka 20."
          ],
        },
      ],
    },

    // Projects
    projects: {
      title: "Ba Projets Minene",
      labels: {
        challenge: "Mokakatano",
        architecture: "Architecture",
        impact: "Impact",
      },
      viewAll: "Tala ba projets nyonso",
      viewProject: "Tala projet",
      watchDemo: "Tala démo",
      testApp: "Meka application",
      items: [
        {
          title: "PGCC — Portail ya Gestion ya Batu ya Congo",
          description: "Plateforme ya identité numérique mpe ba services publics sécurisés.",
          challenge: "Kosala système ya identité numérique centralisé oyo ekoki kosimba na sécurité ya makasi mpe malamu ebele ya ba données sensibles ya ba citoyens, nzoka nde kobatela yango makasi mpo epekisa milende ya koyiba données.",
          architecture: "Architecture découplée mpe distribuée esimbami na backend Spring Boot ya makasi mpe frontend ya mbangu makasi na Next.js. Intégration ya ba pipelines ya validation ya données biométriques mpe stockage relationnel optimisé na PostgreSQL.",
          impact: "Nasecurisaki mpe nacentralisaki infrastructure ya identité numérique ya ba citoyens, oyo emekami na temps ya réponse ya système na se ya 200ms mpe niveau ya conformité cryptographique ya likolo, na kotiya chiffrement ya bout en bout na algorithme AES-256-GCM, protocole ya hachage ya makasi mpo na ba données biométriques, mpe architecture ya API REST hautement disponible.",
          image: "/digital-identity-platform-dashboard-dark-theme.jpg",
          technologies: ["Spring Boot", "Next.js", "PostgreSQL", "Biometrics", "AES-256"],
          link: "#",
          videoDemo: "https://www.youtube.com/watch?v=zPOI5yNTQFs",
          featured: true,
          stats: { users: "10K+", uptime: "99.9%", security: "AES-256" },
        },
        {
          title: "UMS — University Management System",
          description: "Plateforme SaaS multi-tenant ya gestion académique na grande échelle.",
          challenge: "Kotonga solution moko ya gestion universitaire oyo ekoki kosimba ba institutions ebele indépendantes (SaaS) na infrastructure moko, nzoka nde kobatela isolement ya makasi ya données, flexibilité ya configuration par entité, mpe tolérance na ba pannes na tango ya charge académique makasi.",
          architecture: "Architecture multi-locataire (Multi-tenant) esalemi na Spring Boot mpe Angular. Implémentation ya stratégie ya isolement ya données na niveau ya base de données (Tenant-per-schema). Conteneurisation, gestion ya ba environnements mpe orchestration globale oyo ekambami mobimba na Docker.",
          impact: "Natiyaki plateforme SaaS ya administration académique mutualisée mpe multi-universitaire, oyo emekami na isolement ya données etanche na 100 % kati na ba institutions mpe bokitisi makasi ya ba coûts opérationnels ya infrastructure, na kosala système ya routage dynamique ya ba requêtes par identifiant ya tenant, na kooptimiser ba pools ya connexions PostgreSQL mpe na kostandardiser infrastructure na nzela ya ba conteneurs isolés Docker.",
          image: "/citizen-data-management-angular-application.jpg",
          technologies: ["Spring Boot", "Angular", "Docker", "PostgreSQL"],
          link: "https://ums-v1.aumsoft.net/",
          liveDemo: true,
          credentials: { email: "academic@unikin.cd", password: "password" },
          featured: true,
          stats: { institutions: "5+", isolation: "100%", modules: "50+" },
        },
        {
          title: "Mazingira Safi",
          description: "Système ya logistique ya assainissement urbain mpe suivi environnemental data-driven.",
          challenge: "Kooptimiser logistique ya assainissement urbain mpe suivi environnemental na niveau ya engumba moko na nzela ya approche oyo etalelaka données.",
          architecture: "Application fullstack esangisi géolocalisation na temps réel, analyse ya données (Data Science) mpo na prédiction ya ba flux, mpe tableau de bord analytique minimaliste.",
          impact: "Nasalaki ete chaîne logistique ya traitement ya ba déchets urbains etambola malamu, oyo emekami na bokeli ya ba algorithmes ya optimisation ya nzela mpe ba interfaces ya suivi na temps réel.",
          image: "/school-management-system-interface-modern.jpg",
          technologies: ["Next.js", "Python", "Data Science", "PostgreSQL"],
          link: "#",
          featured: true,
          stats: { coverage: "City-wide", efficiency: "+40%" },
        },
        {
          title: "Citizen Management Angular",
          description: "Application Angular ya sika mpo na gestion ya données ya batu.",
          image: "/hr-management-system-dashboard.jpg",
          technologies: ["Angular", "TypeScript", "RxJS", "Material UI"],
          link: "https://github.com/felicienmukamba/citizen-frontend-with-angular",
          featured: false,
        },
      ],
    },

    // Education
    education: {
      title: "Boyekoli",
      items: [
        {
          degree: "Licence na Informatique ya Gestion (L1-L2)",
          school: "Institut Supérieur Pédagogique ya Bukavu",
          period: "2023 — 2025",
          description: "Spécialisation na développement logiciel",
        },
        {
          degree: "Graduat na Informatique ya Gestion (G1-G3)",
          school: "Institut Supérieur Pédagogique ya Bukavu",
          period: "2020 — 2023",
          description: "Fondamentaux ya programmation",
        },
        {
          degree: "Diplôme d'État",
          school: "Institut Kele / Kamituga",
          period: "2014 — 2020",
          description: "Boyekoli secondaire",
        },
      ],
      certifications: {
        title: "Ba Formations & Certifications",
        items: [
          {
            name: "Gestion ya Projet (Agile, UML, GitHub, Merise)",
            provider: "OpenClassrooms",
            year: "2024",
          },
          {
            name: "Leadership & Community Management",
            provider: "Google Developer Student Clubs",
            year: "2023",
          },
          {
            name: "Analyse ya données, UI/UX Design",
            provider: "Coursera",
            year: "2023",
          },
          {
            name: "Programmation (Angular, React, JavaScript, Python, Django)",
            provider: "OpenClassrooms",
            year: "2022",
          },
        ],
      },
    },

    // Skills
    skills: {
      title: "Mayele ya Technique",
      categories: [
        {
          name: "Architecture & DevOps",
          items: ["System Architecture", "Distributed Systems", "Microservices", "Docker", "DevOps"],
        },
        {
          name: "Minoko & Frameworks",
          items: ["Next.js", "React", "Spring Boot", "Java", "Python", "Rust (Learning)"],
        },
        {
          name: "Data & IA",
          items: ["PostgreSQL", "AI Orchestration", "Data Science"],
        },
        {
          name: "Sécurité",
          items: ["AES-256", "Biometrics", "OAuth 2.0", "JWT"],
        },
      ],
    },

    // Contact
    contact: {
      title: "Kosolola",
      subtitle: "Tosolola mpo na projet na yo",
      description:
        "Nazali disponible mbala moko mpo na ba opportunités ya mosala, ba collaborations to ba démonstrations techniques ya misala na ngai.",
      cta: "Benga ngai",
      email: "felicienmukamba.cd@gmail.com",
      phone: "+243 995 209 133",
      location: "RD Congo, Sud-Kivu, Bukavu, Q. Nyalukembe, Av. Fizi 1",
    },

    // References
    references: {
      title: "Ba Références",
      items: [
        {
          name: "MBILIZI MWISIMBWA Déogratias",
          role: "Mokambi ya Département Informatique",
          company: "ISP Bukavu",
          email: "mbilizidembi@gmail.com",
          phone: "+243 994 405 683",
        },
        {
          name: "Bivunga Missy",
          role: "Coordinateur National",
          company: "GEVAPOM ASBL",
          email: "bivungamissy@gmail.com",
          phone: "+243 997 758 001",
        },
        {
          name: "Dieumerci MUHINDO",
          role: "Manager",
          company: "Aumsoft Technology",
          email: "dieumercimuhindo@aumsoft.net",
          phone: "+243 895 490 957",
        },
      ],
    },

    // Footer
    footer: {
      designed: "Esalami na",
      built: "Etongami na Next.js, Tailwind CSS mpe Three.js",
    },

    // Actions
    downloadCV: "Kokitisa CV",
    viewResume: "Tala CV mobimba",

    // Personal traits
    traits: {
      title: "Bizaleli ya moto",
      items: [
        "Leadership & Créativité",
        "Koyoka mpe Kosolola malamu",
        "Intégrité mpe transparence",
        "Inclusion mpe respect ya diversité",
        "Gestion mpe partage ya mayele",
        "Kosala na pression mpe rigueur",
      ],
    },
  },
}
