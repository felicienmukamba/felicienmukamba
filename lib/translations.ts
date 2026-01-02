export const translations = {
  fr: {
    // Header
    greeting: "Bonjour, je suis",
    name: "Félicien Mukamba",
    fullName: "FÉLICIEN MUKAMBA KAZINDJA",
    role: "Ingénieur Logiciel Full-Stack & Spécialiste en Identité Numérique",
    tagline: "Je conçois des solutions numériques souveraines pour l'Afrique.",
    description:
      "Développeur Fullstack (Bac+5) spécialisé en Informatique de Gestion, expert dans la conception d'architectures logicielles sécurisées pour le secteur public. Créateur du PGCC, une solution d'identité numérique intégrant la biométrie et le chiffrement AES-256.",

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
      p1: "Développeur Fullstack de niveau Bac+5, spécialisé en Informatique de Gestion et expert dans la conception d'architectures logicielles sécurisées pour le secteur public. Fort d'une maîtrise avancée de l'écosystème Java/Spring Boot et des frameworks modernes (Next.js 14, React).",
      p2: "J'ai conçu et déployé le PGCC (Portail de Gestion des Citoyens Congolais), une solution intégrant la biométrie et le chiffrement de données (AES-256-GCM). Mon expertise couvre le développement de solutions souveraines, l'ingénierie de l'identité numérique, et la création d'API de vérification KYC.",
      p3: "Orienté vers la souveraineté numérique et la dématérialisation des services de l'État, j'allie rigueur méthodologique (Agile/UML) et vision stratégique pour transformer les processus administratifs en leviers de croissance économique. Ancien leader GDSC, je combine excellence technique et capacité à piloter des projets d'innovation technologique à fort impact national.",
      highlightedCompanies: ["Aumsoft Technology", "GEVAPOM ASBL", "DGDA Bukavu", "Google Developers"],
    },

    // Experience
    experience: {
      title: "Parcours Professionnel",
      items: [
        {
          period: "Déc 2024 — Présent",
          title: "Développeur Fullstack Web & Mobile",
          company: "Aumsoft Technology",
          companyUrl: "https://aumsoft.net",
          location: "Bukavu",
          description:
            "Développement de solutions web et mobile complètes pour des clients variés. Conception d'architectures scalables et sécurisées.",
          technologies: ["Next.js", "React", "Flutter", "Spring Boot", "PostgreSQL"],
          achievements: [
            "Développement d'applications multi-universitaires",
            "Intégration de systèmes de paiement",
            "Déploiement d'architectures microservices",
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
            "Réduction de 60% du temps administratif",
            "Digitalisation complète des processus",
            "Formation de 50+ enseignants aux outils numériques",
          ],
        },
        {
          period: "2023",
          title: "Stage Professionnel",
          company: "Direction Provinciale DGDA Bukavu",
          companyUrl: "#",
          location: "Bukavu",
          description:
            "Stage en administration des douanes et accises. Découverte des processus administratifs et de la gestion des données fiscales.",
          technologies: ["Excel", "Access", "SQL"],
          achievements: [
            "Analyse des flux de données douanières",
            "Optimisation des processus de reporting",
            "Apprentissage des normes administratives",
          ],
        },
        {
          period: "2023",
          title: "Community Leader (GDSC Lead)",
          company: "Google Developer Student Clubs - ISP Bukavu",
          companyUrl: "https://developers.google.com/community/gdsc",
          location: "Bukavu",
          description:
            "Leadership de la plus grande communauté tech de l'Est du Congo. Organisation du DevFest KIVU 2023 avec 200+ participants.",
          technologies: ["Flutter", "Firebase", "Angular", "Google Cloud"],
          achievements: [
            "DevFest KIVU 2023 — 200+ participants",
            "20+ sessions de formation",
            "Communauté de 300+ développeurs",
            "Mentorat de 50+ étudiants",
          ],
        },
      ],
    },

    // Projects
    projects: {
      title: "Projets Réalisés",
      viewAll: "Voir tous les projets",
      viewProject: "Voir le projet",
      watchDemo: "Voir la démo",
      testApp: "Tester l'application",
      items: [
        {
          title: "PGCC — Portail de Gestion des Citoyens Congolais",
          description:
            "BigData et Système de gestion intégré des informations citoyennes (état civil, sanitaire, sécuritaire, identité) avec reconnaissance biométrique faciale et empreintes digitales. Solution conçue pour la souveraineté numérique de la RDC.",
          image: "/digital-identity-platform-dashboard-dark-theme.jpg",
          technologies: ["Spring Boot", "Next.js 14", "PostgreSQL", "Biometrics", "AES-256-GCM"],
          link: "#",
          videoDemo: "https://www.youtube.com/watch?v=zPOI5yNTQFs",
          featured: true,
          stats: { users: "10K+", uptime: "99.9%", security: "AES-256" },
        },
        {
          title: "Application de Gestion Scolaire",
          description:
            "Système complet de gestion des inscriptions, délibérations et production de bulletins scolaires. Implémenté et déployé dans plusieurs écoles avec formation des utilisateurs.",
          image: "/school-management-system-interface-modern.jpg",
          technologies: ["Django", "Python", "PostgreSQL", "Bootstrap"],
          link: "https://github.com/felicienmukamba/drcschool",
          videoDemo: "https://www.youtube.com/watch?v=wI4-VEPmgwA",
          featured: true,
          stats: { schools: "8", students: "2K+", teachers: "50+" },
        },
        {
          title: "UMS — Gestion Académique Multi-Universitaires",
          description:
            "Application de gestion académique complète: inscriptions, dossiers étudiants, suivi académique, gestion LMD, programmes, matières et production de cartes étudiantes.",
          image: "/citizen-data-management-angular-application.jpg",
          technologies: ["Angular", "TypeScript", "Spring Boot", "PostgreSQL"],
          link: "https://ums-v1.aumsoft.net/",
          liveDemo: true,
          credentials: { email: "academic@unikin.cd", password: "password" },
          featured: true,
          stats: { universities: "5+", students: "10K+", modules: "50+" },
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
        {
          title: "Système de Gestion RH",
          description:
            "Système de gestion des ressources humaines avec suivi des employés, gestion des congés et génération de rapports.",
          image: "/hr-management-system-dashboard.jpg",
          technologies: ["Python", "Django", "SQLite", "Chart.js"],
          link: "https://github.com/felicienmukamba/gestion_rh",
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
          name: "Langages",
          items: ["Python", "JavaScript", "TypeScript", "Java", "PHP", "Dart"],
        },
        {
          name: "Frameworks",
          items: ["Spring Boot", "React", "Next.js", "Angular", "Django", "Flutter"],
        },
        {
          name: "Base de données",
          items: ["PostgreSQL", "MongoDB", "MySQL", "Firebase"],
        },
        {
          name: "Outils",
          items: ["Docker", "Git", "Figma", "Adobe XD", "Power BI"],
        },
        {
          name: "Sécurité",
          items: ["Biométrie", "AES-256", "OAuth 2.0", "JWT"],
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
    role: "Full-Stack Software Engineer & Digital Identity Specialist",
    tagline: "I build sovereign digital solutions for Africa.",
    description:
      "Full-Stack Developer (Master's level) specialized in Computer Management, expert in designing secure software architectures for the public sector. Creator of PGCC, a digital identity solution integrating biometrics and AES-256 encryption.",

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
      p1: "Full-Stack Developer at Master's level, specialized in Computer Management and expert in designing secure software architectures for the public sector. With advanced mastery of the Java/Spring Boot ecosystem and modern frameworks (Next.js 14, React).",
      p2: "I designed and deployed PGCC (Congolese Citizens Management Portal), a solution integrating biometrics and data encryption (AES-256-GCM). My expertise covers sovereign solution development, digital identity engineering, and KYC verification API creation.",
      p3: "Focused on digital sovereignty and state service digitalization, I combine methodological rigor (Agile/UML) with strategic vision to transform administrative processes into economic growth levers. Former GDSC leader, I combine technical excellence with the ability to lead high-impact technology innovation projects.",
      highlightedCompanies: ["Aumsoft Technology", "GEVAPOM ASBL", "DGDA Bukavu", "Google Developers"],
    },

    // Experience
    experience: {
      title: "Professional Experience",
      items: [
        {
          period: "Dec 2024 — Present",
          title: "Full-Stack Web & Mobile Developer",
          company: "Aumsoft Technology",
          companyUrl: "https://aumsoft.net",
          location: "Bukavu",
          description:
            "Development of complete web and mobile solutions for various clients. Design of scalable and secure architectures.",
          technologies: ["Next.js", "React", "Flutter", "Spring Boot", "PostgreSQL"],
          achievements: [
            "Multi-university application development",
            "Payment system integration",
            "Microservices architecture deployment",
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
            "60% reduction in administrative time",
            "Complete process digitalization",
            "Training of 50+ teachers on digital tools",
          ],
        },
        {
          period: "2023",
          title: "Professional Internship",
          company: "DGDA Provincial Direction Bukavu",
          companyUrl: "#",
          location: "Bukavu",
          description:
            "Customs and excise administration internship. Discovery of administrative processes and tax data management.",
          technologies: ["Excel", "Access", "SQL"],
          achievements: [
            "Customs data flow analysis",
            "Reporting process optimization",
            "Learning administrative standards",
          ],
        },
        {
          period: "2023",
          title: "Community Leader (GDSC Lead)",
          company: "Google Developer Student Clubs - ISP Bukavu",
          companyUrl: "https://developers.google.com/community/gdsc",
          location: "Bukavu",
          description:
            "Leading the largest tech community in Eastern Congo. Organized DevFest KIVU 2023 with 200+ participants.",
          technologies: ["Flutter", "Firebase", "Angular", "Google Cloud"],
          achievements: [
            "DevFest KIVU 2023 — 200+ attendees",
            "20+ training sessions",
            "Community of 300+ developers",
            "Mentored 50+ students",
          ],
        },
      ],
    },

    // Projects
    projects: {
      title: "Completed Projects",
      viewAll: "View all projects",
      viewProject: "View project",
      watchDemo: "Watch demo",
      testApp: "Test application",
      items: [
        {
          title: "PGCC — Congolese Citizens Management Portal",
          description:
            "BigData and integrated citizen information management system (civil status, health, security, identity) with facial and fingerprint biometric recognition. Solution designed for DRC's digital sovereignty.",
          image: "/digital-identity-platform-dashboard-dark-theme.jpg",
          technologies: ["Spring Boot", "Next.js 14", "PostgreSQL", "Biometrics", "AES-256-GCM"],
          link: "#",
          videoDemo: "https://www.youtube.com/watch?v=zPOI5yNTQFs",
          featured: true,
          stats: { users: "10K+", uptime: "99.9%", security: "AES-256" },
        },
        {
          title: "School Management Application",
          description:
            "Complete system for enrollment management, deliberations and report card production. Implemented and deployed in several schools with user training.",
          image: "/school-management-system-interface-modern.jpg",
          technologies: ["Django", "Python", "PostgreSQL", "Bootstrap"],
          link: "https://github.com/felicienmukamba/drcschool",
          videoDemo: "https://www.youtube.com/watch?v=wI4-VEPmgwA",
          featured: true,
          stats: { schools: "8", students: "2K+", teachers: "50+" },
        },
        {
          title: "UMS — Multi-University Academic Management",
          description:
            "Complete academic management application: enrollments, student files, academic tracking, LMD management, programs, courses and student card production.",
          image: "/citizen-data-management-angular-application.jpg",
          technologies: ["Angular", "TypeScript", "Spring Boot", "PostgreSQL"],
          link: "https://ums-v1.aumsoft.net/",
          liveDemo: true,
          credentials: { email: "academic@unikin.cd", password: "password" },
          featured: true,
          stats: { universities: "5+", students: "10K+", modules: "50+" },
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
        {
          title: "HR Management System",
          description:
            "Human resources management system with employee tracking, leave management and report generation.",
          image: "/hr-management-system-dashboard.jpg",
          technologies: ["Python", "Django", "SQLite", "Chart.js"],
          link: "https://github.com/felicienmukamba/gestion_rh",
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
          name: "Languages",
          items: ["Python", "JavaScript", "TypeScript", "Java", "PHP", "Dart"],
        },
        {
          name: "Frameworks",
          items: ["Spring Boot", "React", "Next.js", "Angular", "Django", "Flutter"],
        },
        {
          name: "Databases",
          items: ["PostgreSQL", "MongoDB", "MySQL", "Firebase"],
        },
        {
          name: "Tools",
          items: ["Docker", "Git", "Figma", "Adobe XD", "Power BI"],
        },
        {
          name: "Security",
          items: ["Biometrics", "AES-256", "OAuth 2.0", "JWT"],
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
    role: "Ingénieur ya Logiciel Full-Stack & Spécialiste ya Identité Numérique",
    tagline: "Nasalaka ba solutions numériques souveraines mpo na Afrika.",
    description:
      "Développeur Fullstack (Bac+5) na mayele mingi ya kosala ba architectures ya logiciel oyo ebatelami mpo na secteur public. Mosali ya PGCC, solution ya identité numérique na biométrie mpe chiffrement AES-256.",

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
      p1: "Développeur Fullstack ya niveau Bac+5, spécialisé na Informatique ya Gestion mpe expert na kosala ba architectures ya logiciel oyo ebatelami mpo na secteur public. Na mayele mingi ya écosystème Java/Spring Boot mpe ba frameworks ya sika (Next.js 14, React).",
      p2: "Nasalaki mpe natiyaki PGCC (Portail ya Gestion ya Batu ya Congo), solution oyo ezali na biométrie mpe chiffrement ya données (AES-256-GCM). Mayele na ngai ezali na développement ya solutions souveraines, ingénierie ya identité numérique.",
      p3: "Nazali kotala souveraineté numérique mpe dématérialisation ya ba services ya État, nakangisi rigueur méthodologique (Agile/UML) mpe vision stratégique mpo na kobongola ba processus administratifs na ba leviers ya croissance économique.",
      highlightedCompanies: ["Aumsoft Technology", "GEVAPOM ASBL", "DGDA Bukavu", "Google Developers"],
    },

    // Experience
    experience: {
      title: "Misala",
      items: [
        {
          period: "Déc 2024 — Lelo",
          title: "Développeur Fullstack Web & Mobile",
          company: "Aumsoft Technology",
          companyUrl: "https://aumsoft.net",
          location: "Bukavu",
          description: "Kosala ba solutions web mpe mobile mpo na ba clients ndenge na ndenge.",
          technologies: ["Next.js", "React", "Flutter", "Spring Boot", "PostgreSQL"],
          achievements: [
            "Développement ya ba applications multi-universitaires",
            "Intégration ya ba systèmes ya paiement",
            "Déploiement ya architectures microservices",
          ],
        },
        {
          period: "2024",
          title: "Data Manager & IT Support",
          company: "GEVAPOM ASBL",
          companyUrl: "#",
          location: "Bukavu",
          description: "Gestion ya données mpe support informatique mpo na ONG oyo esalaka na secteur éducatif.",
          technologies: ["Python", "Excel", "PostgreSQL", "Power BI"],
          achievements: [
            "Kokitisa 60% ya tango ya administration",
            "Digitalisation mobimba ya ba processus",
            "Formation ya ba enseignants 50+",
          ],
        },
        {
          period: "2023",
          title: "Stage Professionnel",
          company: "Direction Provinciale DGDA Bukavu",
          companyUrl: "#",
          location: "Bukavu",
          description: "Stage na administration ya douanes mpe accises.",
          technologies: ["Excel", "Access", "SQL"],
          achievements: ["Analyse ya flux ya données douanières", "Optimisation ya ba processus ya reporting"],
        },
        {
          period: "2023",
          title: "Community Leader (GDSC Lead)",
          company: "Google Developer Student Clubs - ISP Bukavu",
          companyUrl: "https://developers.google.com/community/gdsc",
          location: "Bukavu",
          description: "Kokamba communauté tech ya monene na Est ya Congo. Organisation ya DevFest KIVU 2023.",
          technologies: ["Flutter", "Firebase", "Angular", "Google Cloud"],
          achievements: [
            "DevFest KIVU 2023 — batu 200+",
            "Ba sessions 20+ ya formation",
            "Communauté ya développeurs 300+",
          ],
        },
      ],
    },

    // Projects
    projects: {
      title: "Ba Projets oyo nasalaki",
      viewAll: "Tala ba projets nyonso",
      viewProject: "Tala projet",
      watchDemo: "Tala démo",
      testApp: "Meka application",
      items: [
        {
          title: "PGCC — Portail ya Gestion ya Batu ya Congo",
          description:
            "BigData mpe Système ya gestion intégré ya ba informations citoyennes na reconnaissance biométrique faciale mpe empreintes digitales.",
          image: "/digital-identity-platform-dashboard-dark-theme.jpg",
          technologies: ["Spring Boot", "Next.js 14", "PostgreSQL", "Biometrics", "AES-256-GCM"],
          link: "#",
          videoDemo: "https://www.youtube.com/watch?v=zPOI5yNTQFs",
          featured: true,
          stats: { users: "10K+", uptime: "99.9%", security: "AES-256" },
        },
        {
          title: "Application ya Gestion Scolaire",
          description:
            "Système complet ya gestion ya inscriptions, délibérations mpe production ya bulletins scolaires.",
          image: "/school-management-system-interface-modern.jpg",
          technologies: ["Django", "Python", "PostgreSQL", "Bootstrap"],
          link: "https://github.com/felicienmukamba/drcschool",
          videoDemo: "https://www.youtube.com/watch?v=wI4-VEPmgwA",
          featured: true,
          stats: { schools: "8", students: "2K+", teachers: "50+" },
        },
        {
          title: "UMS — Gestion Académique Multi-Universitaires",
          description:
            "Application ya gestion académique complète: inscriptions, dossiers étudiants, suivi académique.",
          image: "/citizen-data-management-angular-application.jpg",
          technologies: ["Angular", "TypeScript", "Spring Boot", "PostgreSQL"],
          link: "https://ums-v1.aumsoft.net/",
          liveDemo: true,
          credentials: { email: "academic@unikin.cd", password: "password" },
          featured: true,
          stats: { universities: "5+", students: "10K+", modules: "50+" },
        },
        {
          title: "Citizen Management Angular",
          description: "Application Angular ya sika mpo na gestion ya données ya batu.",
          image: "/hr-management-system-dashboard.jpg",
          technologies: ["Angular", "TypeScript", "RxJS", "Material UI"],
          link: "https://github.com/felicienmukamba/citizen-frontend-with-angular",
          featured: false,
        },
        {
          title: "Système ya Gestion RH",
          description: "Système ya gestion ya ba ressources humaines.",
          image: "/hr-management-system-dashboard.jpg",
          technologies: ["Python", "Django", "SQLite", "Chart.js"],
          link: "https://github.com/felicienmukamba/gestion_rh",
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
          name: "Minoko",
          items: ["Python", "JavaScript", "TypeScript", "Java", "PHP", "Dart"],
        },
        {
          name: "Frameworks",
          items: ["Spring Boot", "React", "Next.js", "Angular", "Django", "Flutter"],
        },
        {
          name: "Base ya données",
          items: ["PostgreSQL", "MongoDB", "MySQL", "Firebase"],
        },
        {
          name: "Ba Outils",
          items: ["Docker", "Git", "Figma", "Adobe XD", "Power BI"],
        },
        {
          name: "Sécurité",
          items: ["Biométrie", "AES-256", "OAuth 2.0", "JWT"],
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
