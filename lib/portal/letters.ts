import { PORTAL_REFERENCES } from "./directory"
import { TARGET_CATEGORIES, type TargetRole } from "./roles"

export type LetterTone = "institutionnel" | "startup" | "technique"

export type LetterConfig = {
  roleTitle: string
  roleEn: string
  sector: "tech" | "ngo"
  companyName: string
  location: string
  lang: "fr" | "en"
  tone: LetterTone
  selectedAchievements: string[]
  selectedReferences: string[]
}

export const ACHIEVEMENTS_OPTIONS = [
  {
    id: "erm-ocha",
    label: "Certification Package ERM OCHA & REACH (Ehtools, PSEA, AAP, Échantillonnage)",
    category: "ngo",
  },
  {
    id: "gevapom-schools",
    label: "Digitalisation de 8 écoles (GEVAPOM ASBL, 50+ enseignants formés, -60% temps administratif)",
    category: "ngo",
  },
  {
    id: "unicef-peace",
    label: "Jeune Ambassadeur de la Paix UNICEF (Dialogue communautaire, médiation locale)",
    category: "ngo",
  },
  {
    id: "soside-platforms",
    label: "Fondateur SOSIDE COMPANY SAS (3 plateformes B2B livrées, adoption 100%, microservices)",
    category: "tech",
  },
  {
    id: "pgcc-biometrics",
    label: "Plateforme biométrique PGCC (Chiffrement AES-256-GCM, <200ms, 10 000+ dossiers)",
    category: "tech",
  },
  {
    id: "hms-ums",
    label: "Logiciel hospitalier HMS Elite & SaaS universitaire UMS (Multi-tenant, HL7/FHIR)",
    category: "tech",
  },
  {
    id: "maago-pos",
    label: "Caisse & Marketplace Maago (Offline-first, 3 devises, multi-wallets)",
    category: "tech",
  },
  {
    id: "gdsc-devfest",
    label: "Lead GDSC & DevFest KIVU 2023 (Organisation générale, 200+ développeurs, 20+ ateliers)",
    category: "both",
  },
]

export function generateCoverLetter(config: LetterConfig): string {
  const isEn = config.lang === "en"
  const isTech = config.sector === "tech"
  const org = config.companyName.trim() || (isTech ? "votre entreprise" : "votre organisation")
  const loc = config.location.trim() || (isEn ? "Bukavu / Remote" : "Bukavu / Télétravail")
  const today = new Date().toLocaleDateString(isEn ? "en-US" : "fr-FR", { year: "numeric", month: "long", day: "numeric" })

  const refs = PORTAL_REFERENCES.filter((r) => config.selectedReferences.includes(r.id))
  const refsText = refs.length > 0
    ? (isEn
        ? `I am pleased to provide references who can attest to my dedication and results: ${refs.map((r) => `${r.name} (${r.role}, ${r.organization})`).join(", ")}.`
        : `Je tiens à votre entière disposition les coordonnées de mes répondants de référence qui peuvent témoigner de la qualité de mes livrables : ${refs.map((r) => `${r.name} (${r.role}, ${r.organization})`).join(", ")}.`)
    : ""

  if (isEn) {
    return `Félicien Mukamba Kazindja
Software Engineer · Data & Information Management Specialist
Bukavu, South Kivu, DR Congo
Email: felicienmukamba.cd@gmail.com | Tel: +243 995 209 133
LinkedIn: linkedin.com/in/felicien-mukamba-5b49ab252/

${today}

To: The Hiring Team / Recruitment Committee
${org}
${loc}

Subject: Application for the position of ${config.roleTitle}

Dear Hiring Manager,

I am writing to express my strong motivation for the position of ${config.roleTitle} within ${org}. With a background in Management Computing (Higher Pedagogical Institute of Bukavu), extensive experience as a full-stack software engineer and founder of SOSIDE COMPANY SAS, coupled with proven field experience in humanitarian data management and monitoring, I offer a unique combination of high-level systems engineering and rigorous operational field execution.

${
  isTech
    ? `Having architected and deployed complex distributed platforms (including biometric identity verification under AES-256-GCM encryption, offline-first commerce solutions, and hospital SaaS with HL7/FHIR compliance), I design resilient backends (Java/Spring Boot, Python) and fluid, accessible user interfaces (Next.js, TypeScript). My engineering approach prioritizes data security, test coverage, and scalable architecture.`
    : `Trained on the new Multi-Sector Rapid Assessment (ERM) package by OCHA and REACH Initiative, I master the complete humanitarian information cycle: mobile data collection (KoboToolbox, Ehtools), statistical sampling, automated data quality controls (Python/Pandas, Power BI), and the strict mainstreaming of Accountability to Affected Populations (AAP) and PSEA mechanisms.`
}

Key contributions I bring to ${org} include:
${config.selectedAchievements
  .map((id) => ACHIEVEMENTS_OPTIONS.find((a) => a.id === id)?.label)
  .filter(Boolean)
  .map((label) => `• ${label}`)
  .join("\n")}

My leadership journey as Google Developer Student Clubs Lead (organizing DevFest Kivu for 200+ developers) and recognition as Youth Peace Ambassador by UNICEF have forged my ability to collaborate across multidisciplinary teams, facilitate dialogue, and deliver under tight deadlines in demanding environments.

${refsText}

I would welcome the opportunity to discuss how my technical expertise and problem-solving mindset align with ${org}'s strategic goals during an interview.

Thank you for your time and consideration.

Sincerely,

Félicien Mukamba Kazindja`
  }

  // Version Française
  const salutation = config.tone === "startup" ? "Madame, Monsieur," : "Madame, Monsieur les membres du comité de sélection,"
  const politesse = config.tone === "startup"
    ? "Dans l'attente d'échanger prochainement, je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées."
    : "Je vous prie d'agréer, Madame, Monsieur, l'expression de ma considération la plus distinguée."

  return `Félicien Mukamba Kazindja
Ingénieur Logiciel Full-stack · Spécialiste Données & Gestion de l'Information
Bukavu, Sud-Kivu, République Démocratique du Congo
E-mail : felicienmukamba.cd@gmail.com | Téléphone : +243 995 209 133
LinkedIn : linkedin.com/in/felicien-mukamba-5b49ab252/

Bukavu, le ${today}

À l'attention de l'équipe de recrutement
${org}
${loc}

Objet : Candidature au poste de ${config.roleTitle}

${salutation}

C'est avec un vif intérêt que je vous soumets ma candidature pour le poste de ${config.roleTitle} au sein de ${org}. Diplômé en Informatique de Gestion (Institut Supérieur Pédagogique de Bukavu), ingénieur full-stack et fondateur de SOSIDE COMPANY SAS, j'allie une maîtrise pointue de l'ingénierie des systèmes d'information à une solide expérience pratique des opérations de terrain et de la gestion de données en contexte complexe.

${
  isTech
    ? `Concepteur de plateformes distribuées sécurisées (identité biométrique PGCC sous chiffrement militaire AES-256-GCM, logiciel hospitalier HMS Elite, SaaS universitaire UMS et caisse offline-first Maago), je développe des backends robustes (Java/Spring Boot, Python/Django, PostgreSQL) et des interfaces web modernes et performantes (Next.js, React, Tailwind CSS). Mon travail est guidé par l'exigence de la maintenabilité, de la scalabilité et du respect des délais de livraison.`
    : `Certifié sur le nouveau package d'Évaluation Rapide Multisectorielle (ERM) conjointement facilité par OCHA et REACH Initiative, je maîtrise l'intégralité de la chaîne de gestion de l'information humanitaire : conception des outils de collecte (KoboToolbox, Ehtools), échantillonnage statistique, nettoyage automatisé (Python/Pandas, Excel avancé), création de tableaux de bord décisionnels (Power BI) et intégration stricte des indicateurs transversaux de redevabilité (AAP) et de protection (PSEA).`
}

Parmi les réalisations probantes que je souhaite mettre au service de vos équipes :
${config.selectedAchievements
  .map((id) => ACHIEVEMENTS_OPTIONS.find((a) => a.id === id)?.label)
  .filter(Boolean)
  .map((label) => `• ${label}`)
  .join("\n")}

Mon parcours de leadership en tant que Lead des Google Developer Student Clubs (pilotage du DevFest KIVU réunissant plus de 200 développeurs) ainsi que ma certification comme Jeune Ambassadeur de la Paix par l'UNICEF démontrent ma capacité à fédérer des équipes pluridisciplinaires, à animer des espaces de dialogue inclusifs et à obtenir des résultats concrets sous contrainte.

${refsText}

Convaincu que mes compétences et mon sens de l'engagement constituent un atout pour ${org}, je me tiens à votre disposition pour un entretien d'évaluation.

${politesse}

Félicien Mukamba Kazindja`
}

export function generateShortPitch(config: LetterConfig): string {
  const isEn = config.lang === "en"
  const isTech = config.sector === "tech"
  const org = config.companyName.trim() || (isTech ? "your company" : "your organization")

  if (isEn) {
    return isTech
      ? `Hello, I am Félicien Mukamba, a Fullstack Software Engineer and founder with extensive experience in Java/Spring Boot, Next.js, and distributed architectures (AES-256, microservices, offline-first). Having successfully shipped 3 major B2B SaaS platforms and led high-impact engineering teams, I am keen to bring my technical rigor and product mindset to ${org} as a ${config.roleTitle}. Available for an introductory call!`
      : `Hello, I am Félicien Mukamba, an Information Management and MEAL professional certified in the new OCHA/REACH ERM package and Youth Peace Ambassador with UNICEF. With a background in software engineering and humanitarian data management (KoboToolbox, Power BI, Python, AAP/PSEA), I turn field assessments into structured, reliable decision-making insights for ${org} as a ${config.roleTitle}. I would welcome the chance to connect!`
  }

  return isTech
    ? `Bonjour, je suis Félicien Mukamba, ingénieur logiciel full-stack et fondateur de SOSIDE COMPANY SAS, spécialisé en architectures distribuées, Java/Spring Boot, Next.js et sécurité (AES-256, biométrie). Ayant conçu et livré 3 plateformes B2B majeures adoptées à 100%, je souhaite apporter ma rigueur d'ingénieur et ma culture produit à ${org} au poste de ${config.roleTitle}. À votre entière disposition pour échanger !`
    : `Bonjour, je suis Félicien Mukamba, spécialiste en gestion de l'information (IMO) et suivi-évaluation (MEAL), certifié sur le package ERM OCHA/REACH et Jeune Ambassadeur de la Paix UNICEF. Alliant ingénierie logicielle et pratique terrain (KoboToolbox, Power BI, Python, Ehtools, AAP/PSEA), j'assure la fiabilité et l'impact des données pour ${org} au poste de ${config.roleTitle}. Au plaisir d'un premier échange !`
}
