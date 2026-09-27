export const en = {
  meta: {
    title: "Félicien Mukamba — Software Engineer & AI Engineer",
    description:
      "Félicien Mukamba is a software engineer, AI engineer and founder of SOSIDE, building secure distributed platforms and production AI agents from Bukavu, DR Congo.",
    keywords: [
      "Félicien Mukamba",
      "Software Engineer",
      "AI Engineer",
      "AI Agent Manager",
      "Full-stack developer",
      "LLM",
      "RAG",
      "Multi-agent systems",
      "Spring Boot",
      "Next.js",
      "SOSIDE",
      "Bukavu",
      "DR Congo",
    ],
    ogAlt: "Félicien Mukamba — Software Engineer & AI Engineer",
  },

  a11y: {
    skip: "Skip to content",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    toggleTheme: "Switch between light and dark theme",
    language: "Language",
    primaryNav: "Primary",
    newTab: "opens in a new tab",
  },

  nav: {
    about: "About",
    ai: "AI",
    experience: "Experience",
    projects: "Work",
    skills: "Skills",
    contact: "Contact",
  },

  hero: {
    available: "Available for new opportunities",
    eyebrow: "Software & AI Engineer · Project Manager · Founder of SOSIDE",
    headlineStart: "I build secure platforms",
    headlineAccent: "and the AI agents",
    headlineEnd: "that run on them.",
    intro:
      "Full-stack engineer based in Bukavu, DR Congo. I design distributed systems for digital identity, healthcare, education and commerce — and bring LLMs and autonomous agents into production, with the guardrails they need.",
    ctaPrimary: "Start a conversation",
    ctaWork: "See my work",
    rolesLabel: "Now",
    roles: ["AI Engineer", "Project Manager", "AI Agent Manager", "Software Engineer", "Systems Architect", "Founder"],
    location: "Bukavu, DR Congo",
    chips: { founder: "Founder · SOSIDE", gdsc: "GDSC Lead 2023" },
    scroll: "Scroll",
  },

  metrics: [
    { value: "3", label: "B2B platforms shipped as founder" },
    { value: "10K+", label: "student records handled concurrently" },
    { value: "−40%", label: "time-to-market with containerized microservices" },
    { value: "200+", label: "developers gathered at DevFest KIVU" },
  ],

  about: {
    kicker: "About",
    title: "Engineering that",
    titleAccent: "earns trust.",
    paragraphs: [
      "I'm the founder of SOSIDE COMPANY SAS and a senior full-stack engineer at Aumsoft Technology. I take complex products from the first whiteboard sketch to production — and stay accountable for how they behave afterwards.",
      "My work sits where reliability matters most: citizen identity (PGCC), hospital operations (HMS Elite), multi-tenant SaaS for universities (UMS) and commerce with an offline-first point of sale (Maago). I work across Laravel, Spring Boot, React, Next.js, Flutter, PostgreSQL and Docker, with a growing focus on Rust for performance-critical components.",
      "Today I'm doubling down on AI engineering: shipping LLM features that hold up in production, and managing teams of AI agents with the same rigor I bring to distributed systems — clear roles, observability and human oversight.",
    ],
    facts: [
      { label: "Based in", value: "Bukavu, DR Congo · UTC+2" },
      { label: "Languages", value: "French, English, Swahili, Lingala" },
      { label: "Focus", value: "Distributed systems · AI agents" },
      { label: "Now", value: "Founder @ SOSIDE · Project manager & engineer @ Aumsoft" },
    ],
  },

  ai: {
    kicker: "AI Engineering",
    title: "From prompts to",
    titleAccent: "production agents.",
    intro:
      "Two complementary roles. As an AI Engineer, I build the LLM-powered features. As an AI Agent Manager, I run the agents that do real work — defining what they may do, measuring how well they do it, and keeping humans in control.",
    roles: [
      {
        badge: "AI Engineer",
        title: "Ship LLM features that hold up in production.",
        points: [
          "Retrieval-augmented generation over private data: embeddings, pgvector, hybrid search and reranking.",
          "Tool use and function calling wired into existing Spring Boot and Next.js backends.",
          "Structured outputs, versioned prompts and streaming interfaces that feel instant.",
          "Evaluation harnesses — golden datasets, LLM-as-judge and regression tests in CI.",
        ],
      },
      {
        badge: "AI Agent Manager",
        title: "Run AI agents like a high-performing team.",
        points: [
          "Define each agent's role, tools and permissions on a least-privilege basis.",
          "Orchestrate multi-agent workflows with clear hand-offs and human approval gates.",
          "Track quality, latency and cost per task with tracing and dashboards.",
          "Guardrails and incident response: prompt-injection defenses, PII redaction, audit logs.",
        ],
      },
    ],
    pipeline: {
      title: "How I run an agent workflow",
      request: "Request",
      orchestrator: "Orchestrator",
      agents: ["Research", "Build", "Review"],
      human: "Human approval",
      ship: "Production",
      caption:
        "Every agent has a scope, every step is traced, and nothing reaches production without a human sign-off.",
    },
  },

  experience: {
    kicker: "Experience",
    title: "Where I've",
    titleAccent: "made an impact.",
    items: {
      soside: {
        role: "Founder & Lead Software Engineer",
        period: "2024 — Present",
        location: "Bukavu",
        description:
          "Technical and strategic leadership of a software company serving institutional clients — from architecture to delivery, now including AI integration.",
        achievements: [
          "Delivered 3 major B2B platforms with 100% adoption among launch clients by leading an agile team and standardizing CI/CD pipelines.",
          "Cut time-to-market by 40% — measured by shorter release cycles — by moving products to a containerized microservices architecture on Docker.",
          "Leading the integration of AI solutions for institutional clients: LLM assistants and agent workflows with evaluation and human review built in.",
        ],
      },
      aumsoft: {
        role: "Project Manager · Software & AI Engineer",
        period: "Dec 2024 — Present",
        location: "Bukavu",
        description:
          "I lead products from brief to production: planning and delivery, the design system, the system architecture and the database models.",
        achievements: [
          "Led HMS Elite (hospital operations), Maago (marketplace and offline POS) and Sili Kivu Hub (community platform) end to end — owning the design system, system architecture and database modeling for each.",
          "Architected multi-university information systems handling 10,000+ concurrent student records with a reactive Spring Boot backend and tuned PostgreSQL.",
        ],
      },
      gevapom: {
        role: "Data Manager & IT Support",
        period: "2024",
        location: "Bukavu",
        description:
          "Data management and IT support for an education NGO — led the digital transformation of 8 schools.",
        achievements: [
          "Digitized 100% of school administrative processes, cutting administrative time by 60% with automated tracking tools.",
          "Trained 50+ teachers to adopt the new digital workflows.",
        ],
      },
      gdsc: {
        role: "Community Lead (GDSC Lead)",
        period: "2023",
        location: "Bukavu",
        description:
          "Led one of the largest developer communities in Eastern Congo and organized DevFest KIVU 2023.",
        achievements: [
          "Brought 200+ developers together at DevFest KIVU 2023 and coordinated 20+ technical training sessions.",
        ],
      },
    },
  },

  projects: {
    kicker: "Selected work",
    title: "Case studies in",
    titleAccent: "critical systems.",
    intro: "Platforms where security, scale and clarity are non-negotiable.",
    labels: { challenge: "Challenge", architecture: "Architecture", impact: "Impact" },
    statLabels: {
      interop: "Interoperability",
      encryption: "Encryption",
      access: "Access control",
      currencies: "Currencies",
      wallets: "Mobile-money wallets",
      institutions: "Institutions",
      isolation: "Data isolation",
      modules: "Modules",
      users: "Users",
      latency: "Response time",
      uptime: "Uptime",
      efficiency: "Route efficiency",
      coverage: "Coverage",
    } as Record<string, string>,
    shotLabels: { landing: "Website", dashboard: "Back-office", pos: "Desktop POS", login: "Sign-in" },
    gallery: "Screenshots",
    roleLabel: "My role",
    role: "Project manager · Software & AI engineer — design system, system architecture and database modeling.",
    live: "Visit live site",
    code: "View code",
    video: "Watch demo",
    confidential: "Client project · code confidential",
    more: "More on GitHub",
    items: {
      hms: {
        title: "HMS Elite",
        subtitle: "Hospital operating system",
        challenge:
          "Give clinics and hospitals one secure system for the whole patient journey — admission, consultations, lab, billing and staff — while staying interoperable with existing medical software and the national ANICNS ecosystem.",
        architecture:
          "Laravel with Inertia and React, real-time updates over Laravel Reverb, multi-tenant isolation with attribute-based access control, and HL7 / FHIR and REST bridges to records, lab (LIS) and billing systems.",
        impact:
          "Care teams work from one unified patient record and executives from live dashboards, on a platform with AES-256 encryption at rest, TLS 1.3 in transit and an immutable audit trail of every action.",
      },
      maago: {
        title: "Maago",
        subtitle: "Marketplace, back-office and offline point of sale",
        challenge:
          "Bring local shops in DR Congo online — and give merchants tools that keep selling through network outages, across several currencies and with mobile money.",
        architecture:
          "A Laravel, Inertia and React platform for the marketplace and merchant back-office, with real-time events over Laravel Echo, plus a Flutter desktop POS that works offline and syncs when the network returns.",
        impact:
          "Merchants track stock per shop and branch, issue VAT receipts and credit sales, and price in USD, CDF or EUR at their own rate; buyers pay with M-Pesa, Orange Money or Airtel Money. The POS is live; the marketplace opens soon.",
      },
      silikivu: {
        title: "Sili Kivu Hub",
        subtitle: "Community management platform",
        challenge: "Give organizations one place to run their community: members, roles, discussions, events and shared resources.",
        architecture: "Laravel, Inertia and React with role-based access for members, admins, guests and co-ops.",
        impact: "A branded community hub an organization can launch end to end — from sign-up to events.",
      },
      ums: {
        title: "UMS — University Management System",
        subtitle: "Multi-tenant SaaS for academic administration",
        challenge:
          "Host many independent universities on one shared platform — with strict data isolation, per-institution configuration and resilience during enrolment and exam peaks.",
        architecture:
          "Spring Boot and Angular on a tenant-per-schema PostgreSQL model. Requests are routed dynamically by tenant ID, and every environment is containerized with Docker.",
        impact:
          "100% data isolation between institutions and a sharp drop in infrastructure costs, thanks to dynamic tenant routing, tuned connection pools and standardized containers.",
      },
      pgcc: {
        title: "PGCC — Congolese Citizen Management Portal",
        subtitle: "Digital identity and secure public services",
        challenge:
          "Design a centralized digital identity system that manages sensitive citizen records — biometrics included — securely, fluidly and with resilience against interception.",
        architecture:
          "A decoupled Spring Boot backend and a fast Next.js frontend, with biometric validation pipelines and optimized relational storage in PostgreSQL.",
        impact:
          "Sub-200 ms responses and strong cryptographic compliance through end-to-end AES-256-GCM encryption, hardened hashing for biometric data and a highly available REST API.",
      },
      mazingira: {
        title: "Mazingira Safi",
        subtitle: "Data-driven urban sanitation logistics",
        challenge:
          "Make waste collection and environmental monitoring more efficient across an entire city — using data instead of guesswork.",
        architecture:
          "A full-stack app combining real-time geolocation, predictive analysis of waste flows and a minimalist analytics dashboard.",
        impact:
          "More efficient collection rounds, driven by route-optimization algorithms and real-time tracking interfaces.",
      },
      citizen: {
        title: "Citizen Management",
        subtitle: "Angular front-end for citizen records",
        challenge: "Give administrators a fast way to search and manage large citizen datasets.",
        architecture: "Angular with RxJS state streams and Material UI components.",
        impact: "An open-source reference front-end for citizen data management.",
      },
    },
  },

  skills: {
    kicker: "Skills",
    title: "A toolkit for",
    titleAccent: "the full lifecycle.",
    categories: [
      {
        name: "AI Engineering",
        description: "LLM features that are measurable and safe.",
        items: [
          "Claude & OpenAI APIs",
          "RAG",
          "Embeddings & pgvector",
          "Prompt engineering",
          "Structured outputs",
          "Evals & LLM-as-judge",
          "Vercel AI SDK",
          "LangChain / LangGraph",
        ],
        highlight: true,
      },
      {
        name: "AI Agent Management",
        description: "Agents with clear scopes, oversight and metrics.",
        items: [
          "Multi-agent orchestration",
          "Tool use & function calling",
          "Model Context Protocol (MCP)",
          "Human-in-the-loop",
          "Guardrails & red-teaming",
          "Tracing & observability",
          "Cost & latency governance",
        ],
        highlight: true,
      },
      {
        name: "Architecture & DevOps",
        description: "Systems designed to scale and to last.",
        items: ["System architecture", "Database modeling", "Distributed systems", "Microservices", "Multi-tenant SaaS", "Real-time (WebSockets)", "Offline-first sync", "HL7 / FHIR", "Docker", "CI/CD"],
        highlight: false,
      },
      {
        name: "Product & Design",
        description: "From brief to shipped product.",
        items: ["Project management (Agile / Scrum)", "Design systems", "UI/UX design", "Data modeling (UML, Merise)", "Technical leadership"],
        highlight: false,
      },
      {
        name: "Languages & Frameworks",
        description: "The right tool for each layer.",
        items: ["TypeScript", "PHP", "Java", "Python", "Laravel", "Inertia.js", "React", "Next.js", "Angular", "Spring Boot", "Flutter", "Rust (learning)"],
        highlight: false,
      },
      {
        name: "Data",
        description: "From storage to insight.",
        items: ["PostgreSQL", "Data science", "Power BI", "Firebase"],
        highlight: false,
      },
      {
        name: "Security",
        description: "Protection by design.",
        items: ["AES-256-GCM", "Biometrics", "OAuth 2.0", "JWT"],
        highlight: false,
      },
    ],
  },

  education: {
    kicker: "Education",
    title: "Always",
    titleAccent: "learning.",
    items: [
      {
        degree: "Licence in Management Computing (L1–L2)",
        school: "Institut Supérieur Pédagogique de Bukavu",
        period: "2023 — 2025",
        description: "Specialization in software development and information systems.",
      },
      {
        degree: "Graduat in Management Computing (G1–G3)",
        school: "Institut Supérieur Pédagogique de Bukavu",
        period: "2020 — 2023",
        description: "Programming fundamentals and database management.",
      },
      {
        degree: "State Diploma (High School)",
        school: "Institut Kele, Kamituga",
        period: "2014 — 2020",
        description: "Secondary education.",
      },
    ],
    certificationsTitle: "Training & certifications",
    certifications: [
      { name: "Project management — Agile, UML, GitHub, Merise", provider: "OpenClassrooms", year: "2024" },
      { name: "Leadership & community management", provider: "Google Developer Student Clubs", year: "2023" },
      { name: "Data analysis, UI/UX design", provider: "Coursera", year: "2023" },
      { name: "Programming — Angular, React, JavaScript, Python, Django", provider: "OpenClassrooms", year: "2022" },
    ],
    languagesTitle: "Languages",
    languages: [
      { name: "French", level: "Native" },
      { name: "Swahili", level: "Native" },
      { name: "Lingala", level: "Fluent" },
      { name: "English", level: "Professional" },
    ],
    communityCaption: "Hands-on training session in Bukavu",
  },

  contact: {
    kicker: "Contact",
    title: "Let's build",
    titleAccent: "what's next.",
    description:
      "Open to full-time roles, freelance missions and technical collaborations — especially where distributed systems meet AI.",
    cta: "Send an email",
    copy: "Copy email",
    copied: "Copied!",
    emailLabel: "Email",
    phoneLabel: "Phone",
    localTime: "Local time in Bukavu",
  },

  footer: {
    designed: "Designed & engineered by",
    built: "Built with Next.js, TypeScript, Tailwind CSS, Framer Motion & Three.js",
    backToTop: "Back to top",
  },

  cv: {
    download: "Download CV",
    generating: "Preparing…",
    error: "Couldn't generate the PDF. Please try again.",
    headline: "Software & AI Engineer · Project Manager · AI Agent Manager",
    profileTitle: "Profile",
    profile:
      "Founder of SOSIDE COMPANY SAS, and project manager and software & AI engineer at Aumsoft Technology, where I own design systems, system architecture and database modeling. I design secure distributed platforms — digital identity (PGCC), hospital software (HMS Elite), university SaaS (UMS), commerce and offline POS (Maago) — and bring LLM features and AI agents into production with evaluation, guardrails and human oversight. Laravel, Spring Boot, React, Next.js, Flutter, PostgreSQL, Docker.",
    experienceTitle: "Experience",
    projectsTitle: "Selected projects",
    skillsTitle: "Skills",
    educationTitle: "Education",
    certificationsTitle: "Certifications",
    languagesTitle: "Languages",
    references: "References available on request.",
  },

  notFound: {
    title: "This page drifted out of orbit.",
    body: "The link may be broken or the page may have moved.",
    back: "Back to home",
  },
}

export type Dictionary = typeof en
