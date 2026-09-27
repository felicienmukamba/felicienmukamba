import type { Dictionary } from "./en"

export const ln: Dictionary = {
  meta: {
    title: "Félicien Mukamba — Software Engineer & AI Engineer",
    description:
      "Félicien Mukamba, software engineer, AI engineer mpe mokeli ya SOSIDE, atongaka ba plateformes distribuées sécurisées mpe ba agents IA na production, kobanda na Bukavu, RDC.",
    keywords: [
      "Félicien Mukamba",
      "Software Engineer",
      "AI Engineer",
      "AI Agent Manager",
      "Développeur full-stack",
      "LLM",
      "Spring Boot",
      "Next.js",
      "SOSIDE",
      "Bukavu",
      "RDC",
    ],
    ogAlt: "Félicien Mukamba — Software Engineer & AI Engineer",
  },

  a11y: {
    skip: "Kende na makambo ya ntina",
    openMenu: "Fungola menu",
    closeMenu: "Kanga menu",
    toggleTheme: "Bongola thème (pole to molili)",
    language: "Monoko",
    primaryNav: "Navigation ya liboso",
    newTab: "ekofungwama na onglet ya sika",
  },

  nav: {
    about: "Mpo na ngai",
    ai: "IA",
    experience: "Misala",
    projects: "Ba projets",
    skills: "Mayele",
    contact: "Kosolola",
  },

  hero: {
    available: "Nazali disponible mpo na misala ya sika",
    eyebrow: "Software & AI Engineer · Mokambi ya projet · Mokeli ya SOSIDE",
    headlineStart: "Natongaka ba plateformes ya makasi",
    headlineAccent: "mpe ba agents IA",
    headlineEnd: "oyo ekambaka yango.",
    intro:
      "Ingénieur full-stack na Bukavu, RDC. Nasalaka ba systèmes distribués mpo na identité numérique, santé, boyekoli mpe mombongo — mpe natiaka ba LLM na ba agents autonomes na production, na ba garde-fous oyo esengeli.",
    ctaPrimary: "Tobanda kosolola",
    ctaWork: "Tala misala na ngai",
    rolesLabel: "Lelo",
    roles: ["AI Engineer", "Mokambi ya projet", "AI Agent Manager", "Software Engineer", "Architecte Système", "Mokeli"],
    location: "Bukavu, RD Congo",
    chips: { founder: "Mokeli · SOSIDE", gdsc: "GDSC Lead 2023" },
    scroll: "Kita",
  },

  metrics: [
    { value: "3", label: "ba plateformes B2B natindaki lokola mokeli" },
    { value: "10K+", label: "ba dossiers ya bayekoli na mbala moko" },
    { value: "−40%", label: "ya time-to-market na ba microservices" },
    { value: "200+", label: "ba développeurs na DevFest KIVU" },
  ],

  about: {
    kicker: "Mpo na ngai",
    title: "Ingénierie oyo",
    titleAccent: "epesaka confiance.",
    paragraphs: [
      "Nazali mokeli ya SOSIDE COMPANY SAS mpe ingénieur full-stack senior na Aumsoft Technology. Nakambaka ba produits ya makasi kobanda na likanisi ya liboso tii na production — mpe nazalaka responsable ya ndenge esalaka sima.",
      "Mosala na ngai ezali esika fiabilité eleki ntina: identité ya ba citoyens (PGCC), kokamba ba lopitalo (HMS Elite), SaaS multi-tenant mpo na ba universités (UMS) mpe mombongo na caisse oyo esalaka sans internet (Maago). Nasalaka na Laravel, Spring Boot, React, Next.js, Flutter, PostgreSQL mpe Docker, mpe nazali koyekola Rust mpo na ba composants critiques.",
      "Lelo, natii makasi na ingénierie IA: kotinda ba fonctionnalités LLM oyo etelemaka malamu na production, mpe kokamba ba équipes ya ba agents IA na rigueur moko lokola ba systèmes distribués — ba rôles polele, observabilité mpe bokengeli ya bato.",
    ],
    facts: [
      { label: "Esika", value: "Bukavu, RD Congo · UTC+2" },
      { label: "Minoko", value: "Français, anglais, swahili, lingala" },
      { label: "Focus", value: "Systèmes distribués · ba agents IA" },
      { label: "Lelo", value: "Mokeli @ SOSIDE · Mokambi ya projet & ingénieur @ Aumsoft" },
    ],
  },

  ai: {
    kicker: "Ingénierie IA",
    title: "Kobanda na prompt tii na",
    titleAccent: "ba agents na production.",
    intro:
      "Ba rôles mibale oyo esangani. Lokola AI Engineer, natongaka ba fonctionnalités oyo esalemi na ba LLM. Lokola AI Agent Manager, nakambaka ba agents oyo esalaka mosala ya solo — nalakisaka nini bakoki kosala, namekaka ndenge basalaka, mpe bato batikalaka bakambi.",
    roles: [
      {
        badge: "AI Engineer",
        title: "Ba fonctionnalités LLM oyo etelemaka na production.",
        points: [
          "RAG na ba données privées: embeddings, pgvector, recherche hybride mpe reranking.",
          "Tool use mpe function calling oyo ekangami na ba backends Spring Boot mpe Next.js.",
          "Sorties structurées, ba prompts versionnés mpe ba interfaces na streaming ya mbangu.",
          "Ba évaluations — ba datasets ya référence, LLM-as-judge mpe ba tests ya régression na CI.",
        ],
      },
      {
        badge: "AI Agent Manager",
        title: "Kokamba ba agents IA lokola équipe ya makasi.",
        points: [
          "Kolakisa rôle, ba outils mpe ba permissions ya agent moko na moko (moindre privilège).",
          "Kokamba ba workflows multi-agents na ba hand-offs polele mpe ba validations ya bato.",
          "Kolanda qualité, latence mpe coût ya tâche moko na moko na tracing mpe ba dashboards.",
          "Ba garde-fous mpe gestion ya ba incidents: kobatela na prompt injection, kobomba ba données personnelles, ba logs ya audit.",
        ],
      },
    ],
    pipeline: {
      title: "Ndenge nakambaka workflow ya ba agents",
      request: "Demande",
      orchestrator: "Orchestrateur",
      agents: ["Boluki", "Build", "Botali"],
      human: "Validation ya moto",
      ship: "Production",
      caption:
        "Agent moko na moko azali na périmètre na ye, étape nyonso ekomami, mpe eloko moko te ekomaka na production soki moto andimi te.",
    },
  },

  experience: {
    kicker: "Misala",
    title: "Esika na",
    titleAccent: "salaki bokeseni.",
    items: {
      soside: {
        role: "Mokeli & Lead Software Engineer",
        period: "2024 — Lelo",
        location: "Bukavu",
        description:
          "Bokambi technique mpe stratégique ya entreprise ya logiciel mpo na ba clients institutionnels — kobanda na architecture tii na livraison, elongo na IA.",
        achievements: [
          "Natindaki ba plateformes B2B minene 3 na adoption ya 100% epai ya ba clients ya liboso, na kokamba équipe agile mpe na kostandardiser ba pipelines CI/CD.",
          "Nakitisaki time-to-market na 40% na nzela ya architecture microservices conteneurisée na Docker.",
          "Nakambaka intégration ya ba solutions IA mpo na ba clients institutionnels: ba assistants LLM mpe ba workflows ya ba agents na évaluation mpe botali ya bato.",
        ],
      },
      aumsoft: {
        role: "Mokambi ya projet · Software & AI Engineer",
        period: "Déc 2024 — Lelo",
        location: "Bukavu",
        description:
          "Nakambaka ba produits kobanda na cahier des charges tii na production: bokambi, design system, architecture système mpe modélisation ya ba bases de données.",
        achievements: [
          "Nakambaki HMS Elite (lopitalo), Maago (marketplace mpe caisse) mpe Sili Kivu Hub (communauté) mobimba — design system, architecture système mpe modélisation ya ba bases de données.",
          "Nasalaki architecture ya ba systèmes d'information multi-universitaires oyo esimbaka ba dossiers ya bayekoli koleka 10 000 na mbala moko, na backend Spring Boot réactif mpe PostgreSQL optimisé.",
        ],
      },
      gevapom: {
        role: "Data Manager & IT Support",
        period: "2024",
        location: "Bukavu",
        description:
          "Gestion ya ba données mpe support informatique mpo na ONG ya boyekoli — nakambaki transformation numérique ya ba écoles 8.",
        achievements: [
          "Nadigitalisaki 100% ya ba processus administratifs ya ba écoles, mpe nakitisaki tango ya administration na 60% na ba outils ya suivi automatisés.",
          "Nateyaki ba enseignants koleka 50 na ba outils ya sika.",
        ],
      },
      gdsc: {
        role: "Community Lead (GDSC Lead)",
        period: "2023",
        location: "Bukavu",
        description:
          "Nakambaki moko ya ba communautés ya ba développeurs ya minene na Est ya Congo mpe nabongisaki DevFest KIVU 2023.",
        achievements: [
          "Nasangisaki ba développeurs koleka 200 na DevFest KIVU 2023 mpe nakambaki ba sessions ya formation koleka 20.",
        ],
      },
    },
  },

  projects: {
    kicker: "Misala eponami",
    title: "Ba études de cas na",
    titleAccent: "ba systèmes critiques.",
    intro: "Ba plateformes esika sécurité, bonene mpe polele ezali ntina mingi.",
    labels: { challenge: "Mokakatano", architecture: "Architecture", impact: "Impact" },
    statLabels: {
      interop: "Interopérabilité",
      encryption: "Chiffrement",
      access: "Contrôle ya accès",
      currencies: "Ba devises",
      wallets: "Ba portefeuilles mobile money",
      institutions: "Ba institutions",
      isolation: "Isolation ya données",
      modules: "Ba modules",
      users: "Basaleli",
      latency: "Temps ya réponse",
      uptime: "Disponibilité",
      efficiency: "Efficacité ya ba tournées",
      coverage: "Couverture",
    },
    shotLabels: { landing: "Site", dashboard: "Back-office", pos: "Caisse desktop", login: "Kokota" },
    gallery: "Ba captures",
    roleLabel: "Rôle na ngai",
    role: "Mokambi ya projet · Software & AI engineer — design system, architecture système mpe modélisation ya ba bases de données.",
    live: "Tala site",
    code: "Tala code",
    video: "Tala démo",
    confidential: "Projet ya client · code ya sekele",
    more: "Mingi na GitHub",
    items: {
      hms: {
        title: "HMS Elite",
        subtitle: "Système ya kokamba ba lopitalo",
        challenge:
          "Kopesa ba cliniques mpe ba lopitalo système moko ya sécurité mpo na nzela mobimba ya mobeli — admission, consultations, laboratoire, facturation mpe basali — oyo esalaka elongo na ba logiciels médicaux mpe écosystème ANICNS.",
        architecture:
          "Laravel na Inertia mpe React, ba mises à jour na temps réel na Laravel Reverb, isolation multi-tenant na contrôle ya accès (ABAC), mpe ba passerelles HL7 / FHIR mpe REST.",
        impact:
          "Ba soignants basalaka na dossier moko ya mobeli mpe bakambi na ba tableaux de bord na temps réel, na chiffrement AES-256, TLS 1.3 mpe traçabilité ya likambo nyonso.",
      },
      maago: {
        title: "Maago",
        subtitle: "Marketplace, back-office mpe caisse oyo esalaka sans internet",
        challenge:
          "Kotia ba boutiques ya RDC na internet — mpe kopesa ba commerçants ba outils oyo ekobi koteka ata réseau ekati, na ba devises ebele mpe mobile money.",
        architecture:
          "Plateforme Laravel, Inertia mpe React mpo na marketplace mpe back-office, na ba événements temps réel na Laravel Echo, mpe caisse desktop Flutter oyo esalaka sans internet mpe e-synchroniser soki réseau ezongi.",
        impact:
          "Ba commerçants balandaka stock na boutique moko na moko, babimisaka ba tickets na TVA mpe ba ventes à crédit, na USD, CDF to EUR; ba clients bafutaka na M-Pesa, Orange Money to Airtel Money. Caisse ezali kosala; marketplace ekofungwama noki.",
      },
      silikivu: {
        title: "Sili Kivu Hub",
        subtitle: "Plateforme ya kokamba ba communautés",
        challenge: "Kopesa ba organisations esika moko ya kokamba communauté na bango: ba membres, ba rôles, masolo, ba événements mpe ba ressources.",
        architecture: "Laravel, Inertia mpe React na ba rôles ya accès mpo na ba membres, ba admins, ba invités mpe ba coopératives.",
        impact: "Hub communautaire na elilingi ya organisation, kobanda na inscription tii na ba événements.",
      },
      ums: {
        title: "UMS — University Management System",
        subtitle: "SaaS multi-tenant mpo na gestion académique",
        challenge:
          "Kosimba ba universités ebele indépendantes na plateforme moko — na isolation makasi ya ba données, configuration mpo na institution moko na moko, mpe bokasi na tango ya ba inscriptions mpe ba examens.",
        architecture:
          "Spring Boot mpe Angular na modèle PostgreSQL « schéma moko mpo na tenant moko ». Ba requêtes etambolaka na identifiant ya tenant, mpe environnement nyonso ezali na Docker.",
        impact:
          "Isolation ya ba données 100% kati na ba institutions mpe bokitisi makasi ya ba coûts ya infrastructure, na routage dynamique, ba pools ya connexions optimisés mpe ba conteneurs standardisés.",
      },
      pgcc: {
        title: "PGCC — Portail ya Gestion ya ba Citoyens Congolais",
        subtitle: "Identité numérique mpe ba services publics sécurisés",
        challenge:
          "Kosala système ya identité numérique centralisé oyo esimbaka ba données sensibles ya ba citoyens — biométrie mpe — na sécurité, na pete mpe na kobatela na ba interceptions.",
        architecture:
          "Backend Spring Boot découplé mpe frontend Next.js ya mbangu, na ba pipelines ya validation biométrique mpe stockage optimisé na PostgreSQL.",
        impact:
          "Ba réponses na se ya 200 ms mpe conformité cryptographique ya likolo na chiffrement AES-256-GCM, hachage makasi ya ba données biométriques mpe API REST oyo ezalaka tango nyonso.",
      },
      mazingira: {
        title: "Mazingira Safi",
        subtitle: "Logistique ya bopeto ya engumba na nzela ya ba données",
        challenge:
          "Kosala ete bolongoli bosoto mpe bolandi ya environnement etambola malamu na engumba mobimba — na ba données, kasi na makanisi te.",
        architecture:
          "Application full-stack oyo esangisi géolocalisation na temps réel, analyse prédictive ya ba flux mpe tableau de bord minimaliste.",
        impact:
          "Ba tournées ya bolongoli bosoto oyo etambolaka malamu na ba algorithmes ya optimisation ya nzela mpe ba interfaces ya suivi na temps réel.",
      },
      citizen: {
        title: "Citizen Management",
        subtitle: "Front-end Angular mpo na ba données ya ba citoyens",
        challenge: "Kopesa ba administrateurs nzela ya mbangu ya koluka mpe kokamba ba données ebele ya ba citoyens.",
        architecture: "Angular na ba flux RxJS mpe ba composants Material UI.",
        impact: "Front-end open source ya référence mpo na gestion ya ba données ya ba citoyens.",
      },
    },
  },

  skills: {
    kicker: "Mayele",
    title: "Ba outils mpo na",
    titleAccent: "cycle mobimba.",
    categories: [
      {
        name: "AI Engineering",
        description: "Ba fonctionnalités LLM oyo ekoki komekama mpe ya sécurité.",
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
        description: "Ba agents na périmètre, bokengeli mpe ba métriques.",
        items: [
          "Orchestration multi-agents",
          "Tool use & function calling",
          "Model Context Protocol (MCP)",
          "Human-in-the-loop",
          "Garde-fous & red-teaming",
          "Tracing & observabilité",
          "Bokambi ya coûts mpe latence",
        ],
        highlight: true,
      },
      {
        name: "Architecture & DevOps",
        description: "Ba systèmes oyo etongami mpo na koumela.",
        items: ["Architecture système", "Modélisation ya ba bases de données", "Systèmes distribués", "Microservices", "SaaS multi-tenant", "Temps réel (WebSockets)", "Synchronisation hors ligne", "HL7 / FHIR", "Docker", "CI/CD"],
        highlight: false,
      },
      {
        name: "Produit & Design",
        description: "Kobanda na cahier des charges tii na produit.",
        items: ["Gestion ya projet (Agile / Scrum)", "Design systems", "UI/UX design", "Modélisation (UML, Merise)", "Leadership technique"],
        highlight: false,
      },
      {
        name: "Minoko & Frameworks",
        description: "Esaleli ya malamu mpo na couche moko na moko.",
        items: ["TypeScript", "PHP", "Java", "Python", "Laravel", "Inertia.js", "React", "Next.js", "Angular", "Spring Boot", "Flutter", "Rust (koyekola)"],
        highlight: false,
      },
      {
        name: "Ba données",
        description: "Kobanda na stockage tii na mikano.",
        items: ["PostgreSQL", "Data science", "Power BI", "Firebase"],
        highlight: false,
      },
      {
        name: "Sécurité",
        description: "Kobatela kobanda na conception.",
        items: ["AES-256-GCM", "Biométrie", "OAuth 2.0", "JWT"],
        highlight: false,
      },
    ],
  },

  education: {
    kicker: "Boyekoli",
    title: "Tango nyonso",
    titleAccent: "koyekola.",
    items: [
      {
        degree: "Licence na Informatique ya Gestion (L1–L2)",
        school: "Institut Supérieur Pédagogique ya Bukavu",
        period: "2023 — 2025",
        description: "Spécialisation na développement logiciel mpe ba systèmes d'information.",
      },
      {
        degree: "Graduat na Informatique ya Gestion (G1–G3)",
        school: "Institut Supérieur Pédagogique ya Bukavu",
        period: "2020 — 2023",
        description: "Ba fondamentaux ya programmation mpe ba bases ya données.",
      },
      {
        degree: "Diplôme d'État",
        school: "Institut Kele, Kamituga",
        period: "2014 — 2020",
        description: "Boyekoli ya secondaire.",
      },
    ],
    certificationsTitle: "Ba formations & certifications",
    certifications: [
      { name: "Gestion ya projet — Agile, UML, GitHub, Merise", provider: "OpenClassrooms", year: "2024" },
      { name: "Leadership & community management", provider: "Google Developer Student Clubs", year: "2023" },
      { name: "Analyse ya données, UI/UX design", provider: "Coursera", year: "2023" },
      { name: "Programmation — Angular, React, JavaScript, Python, Django", provider: "OpenClassrooms", year: "2022" },
    ],
    languagesTitle: "Minoko",
    languages: [
      { name: "Français", level: "Monoko ya mama" },
      { name: "Swahili", level: "Monoko ya mama" },
      { name: "Lingala", level: "Malamu mingi" },
      { name: "Anglais", level: "Ya mosala" },
    ],
    communityCaption: "Session ya formation na Bukavu",
  },

  contact: {
    kicker: "Kosolola",
    title: "Totonga",
    titleAccent: "oyo ekoya.",
    description:
      "Nazali disponible mpo na misala ya temps plein, ba missions freelance mpe ba collaborations techniques — mingi mingi esika ba systèmes distribués ekutanaka na IA.",
    cta: "Tinda e-mail",
    copy: "Kopia e-mail",
    copied: "Ekopiami!",
    emailLabel: "E-mail",
    phoneLabel: "Telefone",
    localTime: "Ngonga na Bukavu",
  },

  footer: {
    designed: "Esalemi mpe etongami na",
    built: "Etongami na Next.js, TypeScript, Tailwind CSS, Framer Motion & Three.js",
    backToTop: "Zonga likolo",
  },

  cv: {
    download: "Kokitisa CV",
    generating: "Ezali kobongisama…",
    error: "PDF ekoki kosalema te. Meka lisusu.",
    headline: "Software & AI Engineer · Mokambi ya projet · AI Agent Manager",
    profileTitle: "Profil",
    profile:
      "Mokeli ya SOSIDE COMPANY SAS, mokambi ya projet mpe software & AI engineer na Aumsoft Technology, esika nasalaka design system, architecture système mpe modélisation ya ba bases de données. Natongaka ba plateformes distribuées sécurisées — identité numérique (PGCC), logiciel ya lopitalo (HMS Elite), SaaS universitaire (UMS), mombongo mpe caisse (Maago) — mpe natiaka ba fonctionnalités LLM na ba agents IA na production na évaluation, ba garde-fous mpe bokengeli ya bato. Laravel, Spring Boot, React, Next.js, Flutter, PostgreSQL, Docker.",
    experienceTitle: "Misala",
    projectsTitle: "Ba projets minene",
    skillsTitle: "Mayele",
    educationTitle: "Boyekoli",
    certificationsTitle: "Ba certifications",
    languagesTitle: "Minoko",
    references: "Ba références ezali soki osengi.",
  },

  notFound: {
    title: "Lokasa oyo ebungi.",
    body: "Lien ekoki kozala ebukani to lokasa ebongwani esika.",
    back: "Zonga na ebandeli",
  },
}
