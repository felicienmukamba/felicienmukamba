/**
 * Language-independent facts about the site and its owner.
 * Everything that needs translating lives in `lib/dictionaries`.
 */

function resolveSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "")
  if (process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL)
    return `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  return "http://localhost:3000"
}

export const site = {
  url: resolveSiteUrl(),
  name: "Félicien Mukamba",
  fullName: "Félicien Mukamba Kazindja",
  initials: "FM",
  email: "felicienmukamba.cd@gmail.com",
  phone: "+243 995 209 133",
  phoneHref: "+243995209133",
  city: "Bukavu",
  region: "South Kivu",
  country: "DR Congo",
  countryCode: "CD",
  timezone: "Africa/Lubumbashi",
  portrait: "/images/felicien-portrait.jpg",
  avatar: "/images/felicien-avatar.jpg",
  social: {
    github: "https://github.com/felicienmukamba",
    linkedin: "https://www.linkedin.com/in/felicien-mukamba-5b49ab252/",
    x: "https://x.com/felicienmukamb",
  },
  twitterHandle: "@felicienmukamb",
} as const

export type ProjectId = "hms" | "maago" | "ums" | "pgcc" | "silikivu" | "mazingira" | "citizen"

export type ShotKind = "landing" | "dashboard" | "pos" | "login"

export type Screenshot = {
  src: string
  kind: ShotKind
  /** Shown in the fake browser bar: a domain, or the app name for desktop software. */
  url: string
}

export type ProjectMeta = {
  id: ProjectId
  /** Company the product was built at, when known. */
  org?: string
  /** Omitted for Aumsoft products: their stack is not disclosed. */
  tech?: string[]
  /** Real product screenshots. Projects without any get a drawn cover. */
  screenshots?: Screenshot[]
  cover: "identity" | "saas" | "city" | "records"
  links: { live?: string; code?: string; video?: string }
  stats?: { value: string; key: string }[]
  featured: boolean
  /** Products Félicien led end to end (PM, design system, architecture, data model). */
  led?: boolean
}

export const projects: ProjectMeta[] = [
  {
    id: "hms",
    led: true,
    org: "Aumsoft Technology",
    screenshots: [{ src: "/images/projects/hms.jpg", kind: "landing", url: "hms.aumsoft.net" }],
    cover: "saas",
    links: { live: "https://hms.aumsoft.net/" },
    stats: [
      { value: "HL7 / FHIR", key: "interop" },
      { value: "AES-256", key: "encryption" },
      { value: "ABAC", key: "access" },
    ],
    featured: true,
  },
  {
    id: "maago",
    led: true,
    org: "Aumsoft Technology",
    screenshots: [
      { src: "/images/projects/maago.jpg", kind: "landing", url: "maago.aumsoft.net" },
      { src: "/images/projects/maago-dashboard.jpg", kind: "dashboard", url: "maago.aumsoft.net/products" },
      { src: "/images/projects/maago-pos.jpg", kind: "pos", url: "Maago POS — Windows" },
    ],
    cover: "saas",
    links: { live: "https://maago.aumsoft.net/marketplace-bientot" },
    stats: [
      { value: "3", key: "currencies" },
      { value: "3", key: "wallets" },
    ],
    featured: true,
  },
  {
    id: "ums",
    org: "Aumsoft Technology",
    screenshots: [{ src: "/images/projects/ums.jpg", kind: "landing", url: "umsaap.com" }],
    cover: "saas",
    links: { live: "https://umsaap.com" },
    stats: [
      { value: "5+", key: "institutions" },
      { value: "100%", key: "isolation" },
      { value: "50+", key: "modules" },
    ],
    featured: true,
  },
  {
    id: "pgcc",
    tech: ["Spring Boot", "Next.js", "PostgreSQL", "Biometrics", "AES-256-GCM"],
    cover: "identity",
    links: { video: "https://www.youtube.com/watch?v=zPOI5yNTQFs" },
    stats: [
      { value: "10K+", key: "users" },
      { value: "<200ms", key: "latency" },
      { value: "99.9%", key: "uptime" },
    ],
    featured: true,
  },
  {
    id: "silikivu",
    led: true,
    org: "Aumsoft Technology",
    screenshots: [
      { src: "/images/projects/silikivu.jpg", kind: "landing", url: "silikivu.aumsoft.net" },
      { src: "/images/projects/silikivu-login.jpg", kind: "login", url: "silikivu.aumsoft.net/login" },
    ],
    cover: "saas",
    links: { live: "https://silikivu.aumsoft.net/" },
    featured: false,
  },
  {
    id: "mazingira",
    tech: ["Next.js", "Python", "Data Science", "PostgreSQL", "Geolocation"],
    cover: "city",
    links: {},
    stats: [{ value: "+40%", key: "efficiency" }],
    featured: false,
  },
  {
    id: "citizen",
    tech: ["Angular", "TypeScript", "RxJS", "Material UI"],
    cover: "records",
    links: { code: "https://github.com/felicienmukamba/citizen-frontend-with-angular" },
    featured: false,
  },
]

export type ExperienceId = "soside" | "aumsoft" | "gevapom" | "gdsc"

export const experience: { id: ExperienceId; company: string; url?: string; tech?: string[] }[] = [
  {
    id: "soside",
    company: "SOSIDE COMPANY SAS",
    tech: ["Next.js", "Spring Boot", "LLM Agents", "Docker", "Rust"],
  },
  {
    id: "aumsoft",
    company: "Aumsoft Technology",
    url: "https://aumsoft.net",
  },
  {
    id: "gevapom",
    company: "GEVAPOM ASBL",
    tech: ["Python", "PostgreSQL", "Power BI", "Excel"],
  },
  {
    id: "gdsc",
    company: "Google Developer Student Clubs",
    url: "https://developers.google.com/community/gdsc",
    tech: ["Flutter", "Firebase", "Angular", "Google Cloud"],
  },
]

/** Scrolling marquee under the hero. */
export const stack = [
  "TypeScript",
  "Next.js",
  "React",
  "Spring Boot",
  "Laravel",
  "Java",
  "Python",
  "PostgreSQL",
  "pgvector",
  "Docker",
  "Claude API",
  "OpenAI API",
  "LangGraph",
  "MCP",
  "Angular",
  "Flutter",
  "Rust",
]
