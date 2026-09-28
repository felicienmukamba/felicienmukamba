import type { CvDensity, CvTemplate, SectionId, SkillKey } from "@/lib/cv/types"
import type { Locale } from "@/lib/i18n"
import type { ExperienceId, ProjectId } from "@/lib/site"

/**
 * CV profiles for the private CV studio — plain data, hard-coded on purpose.
 * Each profile reorders, filters and rewrites the portfolio content for one kind of
 * employer. Text is given in English and French; Lingala falls back to French.
 * Everything stays editable in the studio after a profile is applied.
 */

export type Localized = { en: string; fr: string; ln?: string }

export type CvProfile = {
  id: string
  audience: "company" | "ngo" | "general"
  /** Studio label (French: the studio is for Félicien). */
  name: string
  target: string
  description: string
  lang: Locale
  template: CvTemplate
  density: CvDensity
  accent: string
  showPhoto: boolean
  headline?: Localized
  summary?: Localized
  /** Visible sections, in order. Unlisted sections are hidden. */
  sections?: SectionId[]
  /** Experiences to show, in order, with optional rewrites. Unlisted ones are hidden. */
  experience?: { id: ExperienceId; role?: Localized; bullets?: Localized[] }[]
  projects?: ProjectId[]
  skills?: SkillKey[]
  /** Replaces a skill category's items (comma-separated). */
  skillItems?: Partial<Record<SkillKey, Localized>>
}

export const cvProfiles: CvProfile[] = [
  {
    id: "complete",
    audience: "general",
    name: "Profil complet",
    target: "Portfolio, candidature spontanée",
    description: "Le CV public du portfolio, sans filtre : toutes les expériences, tous les projets phares.",
    lang: "en",
    template: "modern",
    density: "comfortable",
    accent: "#5a4bd6",
    showPhoto: false,
  },

  // ─── Companies ───────────────────────────────────────────────────────────
  {
    id: "bigtech-swe",
    audience: "company",
    name: "Big Tech — Software Engineer",
    target: "Google · Microsoft · Apple · Meta · Amazon",
    description: "Une colonne, lisible par les ATS, sans photo. Met en avant l'impact mesurable, l'architecture et la montée en charge.",
    lang: "en",
    template: "classic",
    density: "comfortable",
    accent: "#1d4ed8",
    showPhoto: false,
    headline: {
      en: "Software Engineer — Distributed Systems, Data Modeling & Applied AI",
      fr: "Ingénieur logiciel — Systèmes distribués, modélisation de données & IA appliquée",
    },
    summary: {
      en: "Software engineer and founder who ships secure, multi-tenant platforms used by universities, hospitals and public institutions. I own system architecture and data models end to end, lead delivery with small teams, and bring LLM features into production with evaluation and guardrails. Measured results: 10,000+ concurrent records handled, 40% faster time-to-market, 3 B2B platforms delivered with full client adoption.",
      fr: "Ingénieur logiciel et fondateur, je livre des plateformes multi-tenant sécurisées utilisées par des universités, des hôpitaux et des institutions publiques. Je porte l'architecture système et les modèles de données de bout en bout, je pilote la livraison avec de petites équipes et je mets des fonctionnalités LLM en production avec évaluation et garde-fous. Résultats mesurés : plus de 10 000 dossiers gérés simultanément, time-to-market réduit de 40 %, 3 plateformes B2B livrées et adoptées.",
    },
    sections: ["summary", "experience", "projects", "skills", "education", "languages"],
    experience: [{ id: "aumsoft" }, { id: "soside" }, { id: "gdsc" }, { id: "gevapom" }],
    projects: ["ums", "pgcc", "hms", "maago"],
    skills: ["languages", "architecture", "ai", "agents", "data", "security"],
  },
  {
    id: "ai-engineer",
    audience: "company",
    name: "AI Engineer / AI Agent Manager",
    target: "Labs IA, scale-ups, équipes produit IA",
    description: "Met l'IA en premier : LLM en production, agents, évaluations, garde-fous — adossés à un solide socle systèmes.",
    lang: "en",
    template: "modern",
    density: "comfortable",
    accent: "#5a4bd6",
    showPhoto: false,
    headline: {
      en: "AI Engineer · AI Agent Manager — LLM products, agents & evaluation",
      fr: "AI Engineer · AI Agent Manager — Produits LLM, agents & évaluation",
    },
    summary: {
      en: "AI engineer with a distributed-systems background. I build LLM features that hold up in production — retrieval over private data, tool use wired into existing backends, structured outputs — and I manage AI agents like a team: clear scopes and permissions, traced runs, quality and cost metrics, and human approval before anything ships. Founder of SOSIDE, where I lead AI integration for institutional clients.",
      fr: "AI engineer issu des systèmes distribués. Je construis des fonctionnalités LLM solides en production — recherche sur données privées, tool use branché sur les backends existants, sorties structurées — et je pilote les agents IA comme une équipe : périmètres et permissions clairs, exécutions tracées, métriques de qualité et de coût, validation humaine avant toute mise en production. Fondateur de SOSIDE, où je mène l'intégration de l'IA pour des clients institutionnels.",
    },
    sections: ["summary", "skills", "experience", "projects", "education", "certifications", "languages"],
    experience: [
      {
        id: "soside",
        bullets: [
          {
            en: "Leading the integration of AI solutions for institutional clients: LLM assistants and agent workflows with evaluation and human review built in.",
            fr: "Pilotage de l'intégration de solutions IA pour des clients institutionnels : assistants LLM et workflows d'agents avec évaluation et revue humaine intégrées.",
          },
          {
            en: "Delivered 3 major B2B platforms with 100% adoption among launch clients by leading an agile team and standardizing CI/CD pipelines.",
            fr: "Livraison de 3 plateformes B2B majeures avec 100 % d'adoption chez les clients initiaux, en dirigeant une équipe agile et en standardisant les pipelines CI/CD.",
          },
          {
            en: "Cut time-to-market by 40% by moving products to a containerized microservices architecture.",
            fr: "Time-to-market réduit de 40 % grâce à une architecture microservices conteneurisée.",
          },
        ],
      },
      { id: "aumsoft" },
      { id: "gdsc" },
    ],
    projects: ["hms", "maago", "pgcc", "ums"],
    skills: ["ai", "agents", "architecture", "languages", "data", "security"],
  },
  {
    id: "project-manager",
    audience: "company",
    name: "Chef de projet technique / Tech Lead",
    target: "ESN, éditeurs de logiciels, DSI",
    description: "Met en avant le pilotage : cadrage, planning, équipes agiles, design system, architecture et livraison.",
    lang: "fr",
    template: "modern",
    density: "comfortable",
    accent: "#0f766e",
    showPhoto: false,
    headline: {
      en: "Technical Project Manager · Tech Lead — from brief to production",
      fr: "Chef de projet technique · Tech Lead — du cahier des charges à la production",
    },
    summary: {
      en: "Technical project manager who still designs and builds. I scope products with stakeholders, plan and run agile delivery, and personally own the design system, system architecture and database modeling. I have led hospital, commerce and community platforms end to end, delivered 3 B2B platforms with full client adoption, and cut time-to-market by 40%.",
      fr: "Chef de projet technique qui conçoit et développe encore. Je cadre les produits avec les parties prenantes, planifie et pilote la livraison en agile, et porte moi-même le design system, l'architecture système et la modélisation des bases de données. J'ai mené de bout en bout des plateformes hospitalière, de commerce et communautaire, livré 3 plateformes B2B adoptées à 100 % et réduit le time-to-market de 40 %.",
    },
    sections: ["summary", "experience", "projects", "skills", "certifications", "education", "languages"],
    experience: [
      { id: "aumsoft" },
      { id: "soside" },
      {
        id: "gdsc",
        bullets: [
          {
            en: "Organized DevFest KIVU 2023 end to end — 200+ developers, 20+ technical sessions, speakers, partners and logistics.",
            fr: "Organisation complète du DevFest KIVU 2023 — plus de 200 développeurs, plus de 20 sessions techniques, intervenants, partenaires et logistique.",
          },
        ],
      },
      { id: "gevapom" },
    ],
    projects: ["hms", "maago", "ums", "silikivu"],
    skills: ["product", "architecture", "ai", "languages", "data"],
  },
  {
    id: "startup-fullstack",
    audience: "company",
    name: "Startup — Full-stack Engineer",
    target: "Startups, scale-ups, équipes produit",
    description: "Profil « builder » : livrer vite et bien, du design system au déploiement, web, mobile et desktop hors ligne.",
    lang: "en",
    template: "modern",
    density: "compact",
    accent: "#e4572e",
    showPhoto: false,
    headline: {
      en: "Product-minded Full-stack Engineer — web, mobile & offline-first",
      fr: "Ingénieur full-stack orienté produit — web, mobile & hors ligne",
    },
    summary: {
      en: "Full-stack engineer who ships whole products: design system, architecture, data model, front-end, back-end and deployment. I have built marketplace and point-of-sale software that keeps working offline, hospital and university SaaS, and AI features — and I like owning a product from first sketch to real users.",
      fr: "Ingénieur full-stack qui livre des produits entiers : design system, architecture, modèle de données, front-end, back-end et déploiement. J'ai construit une marketplace et une caisse qui fonctionne hors ligne, des SaaS hospitalier et universitaire, et des fonctionnalités IA — et j'aime porter un produit du premier croquis jusqu'aux vrais utilisateurs.",
    },
    sections: ["summary", "projects", "experience", "skills", "education", "languages"],
    experience: [{ id: "soside" }, { id: "aumsoft" }, { id: "gdsc" }],
    projects: ["maago", "hms", "ums", "silikivu"],
    skills: ["languages", "architecture", "product", "data", "ai"],
  },

  // ─── NGOs ────────────────────────────────────────────────────────────────
  {
    id: "ngo-it",
    audience: "ngo",
    name: "ONG — Responsable SI & transformation digitale",
    target: "ONG internationales, agences onusiennes, ASBL",
    description: "Colonne colorée avec photo (usage courant en ONG). Met en avant l'impact terrain, le renforcement des capacités et les contraintes locales.",
    lang: "fr",
    template: "sidebar",
    density: "comfortable",
    accent: "#0e7490",
    showPhoto: true,
    headline: {
      en: "IT & Digital Transformation Manager",
      fr: "Responsable Systèmes d'Information & Transformation Digitale",
    },
    summary: {
      en: "IT professional and digital project manager supporting organizations through their digital transformation: needs assessment, tool design, team training and adoption follow-up. I digitized the processes of 8 schools for an education NGO, trained 50+ teachers and brought together 200+ developers in Kivu. I build secure, simple systems that fit field realities — unstable connectivity, several currencies, mobile money.",
      fr: "Informaticien de gestion et chef de projet digital, j'accompagne les organisations dans leur transformation numérique : diagnostic des besoins, conception des outils, formation des équipes et suivi de l'adoption. J'ai digitalisé les processus de 8 établissements scolaires pour une ONG éducative, formé plus de 50 enseignants et fédéré plus de 200 développeurs au Kivu. Je conçois des systèmes sécurisés et simples, adaptés aux réalités du terrain : connexion instable, multi-devises, mobile money.",
    },
    sections: ["summary", "experience", "projects", "education", "skills", "languages", "certifications", "references"],
    experience: [
      {
        id: "gevapom",
        role: { en: "Data Manager & IT Support", fr: "Data Manager & Support informatique" },
        bullets: [
          {
            en: "Led the digital transformation of 8 schools: needs assessment, tool selection, rollout and change management.",
            fr: "Pilotage de la transformation numérique de 8 établissements scolaires : diagnostic, choix des outils, déploiement et accompagnement au changement.",
          },
          {
            en: "Digitized 100% of administrative processes, cutting administrative time by 60% with automated tracking tools.",
            fr: "Digitalisation de 100 % des processus administratifs, avec 60 % de temps administratif en moins grâce à des outils de suivi automatisés.",
          },
          {
            en: "Capacity building: trained 50+ teachers to use the new digital tools.",
            fr: "Renforcement des capacités : formation de plus de 50 enseignants aux outils numériques.",
          },
        ],
      },
      { id: "aumsoft" },
      { id: "soside" },
      {
        id: "gdsc",
        bullets: [
          {
            en: "Mobilized the local tech community: 200+ developers at DevFest KIVU 2023 and 20+ free training sessions.",
            fr: "Mobilisation de la communauté tech locale : plus de 200 développeurs au DevFest KIVU 2023 et plus de 20 sessions de formation gratuites.",
          },
        ],
      },
    ],
    projects: ["maago", "hms", "ums", "mazingira"],
    skills: ["product", "data", "architecture", "security", "ai"],
  },
  {
    id: "ngo-data",
    audience: "ngo",
    name: "ONG — Data Manager / Suivi-évaluation",
    target: "Programmes humanitaires et de développement (MEAL, gestion de l'information)",
    description: "Oriente tout vers la donnée : collecte, bases de données, tableaux de bord, qualité et protection des données.",
    lang: "fr",
    template: "sidebar",
    density: "comfortable",
    accent: "#15803d",
    showPhoto: true,
    headline: {
      en: "Data Manager — Monitoring, Evaluation & Information Management",
      fr: "Data Manager — Suivi-évaluation & Gestion de l'information",
    },
    summary: {
      en: "Data manager and developer who turns field data into reliable information for program management: database design, data collection tools, dashboards and automated reporting. Experience with an education NGO (8 schools, 50+ teachers trained) and with large-scale systems (10,000+ student records). Committed to data quality, confidentiality and protection.",
      fr: "Data manager et développeur, je transforme les données de terrain en informations fiables pour le pilotage des programmes : conception de bases de données, outils de collecte, tableaux de bord et automatisation des rapports. Expérience en ONG éducative (8 écoles, plus de 50 enseignants formés) et sur des systèmes à grande échelle (plus de 10 000 dossiers étudiants). Attaché à la qualité, à la confidentialité et à la protection des données.",
    },
    sections: ["summary", "experience", "skills", "projects", "education", "languages", "certifications", "references"],
    experience: [
      {
        id: "gevapom",
        bullets: [
          {
            en: "Designed automated tracking tools and dashboards covering 8 schools.",
            fr: "Conception d'outils de suivi automatisés et de tableaux de bord couvrant 8 établissements scolaires.",
          },
          {
            en: "Cut administrative time by 60% by fully digitizing data collection and reporting processes.",
            fr: "Réduction de 60 % du temps administratif grâce à la digitalisation complète de la collecte et du reporting.",
          },
          {
            en: "Trained 50+ teachers in data entry and in using the new tools.",
            fr: "Formation de plus de 50 enseignants à la saisie des données et à l'utilisation des nouveaux outils.",
          },
        ],
      },
      { id: "aumsoft" },
      { id: "soside" },
    ],
    projects: ["mazingira", "ums", "hms", "pgcc"],
    skills: ["data", "product", "security", "architecture", "ai"],
    skillItems: {
      data: {
        en: "PostgreSQL, Database design, Power BI, Advanced Excel, Python (data analysis), Dashboards, Data quality",
        fr: "PostgreSQL, Modélisation de bases de données, Power BI, Excel avancé, Python (analyse de données), Tableaux de bord, Qualité des données",
      },
    },
  },
]
