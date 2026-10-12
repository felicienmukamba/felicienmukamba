export type ApplicationStatus = "draft" | "applied" | "interview" | "offer" | "rejected"

export type ApplicationEntry = {
  id: string
  roleTitle: string
  company: string
  sector: "tech" | "ngo"
  location: string
  status: ApplicationStatus
  dateApplied?: string
  cvProfileId: string
  offerUrl?: string
  referencesProvided?: string[]
  notes?: string
  updatedAt: number
}

export const STATUS_META: Record<
  ApplicationStatus,
  { label: string; badgeClass: string; dotClass: string }
> = {
  draft: {
    label: "À postuler (Brouillon)",
    badgeClass: "border-line bg-surface-2 text-muted-foreground",
    dotClass: "bg-subtle-foreground",
  },
  applied: {
    label: "Candidature envoyée",
    badgeClass: "border-blue-500/30 bg-blue-500/10 text-blue-400",
    dotClass: "bg-blue-400",
  },
  interview: {
    label: "Entretien en cours",
    badgeClass: "border-amber-500/30 bg-amber-500/10 text-amber-400",
    dotClass: "bg-amber-400",
  },
  offer: {
    label: "Offre reçue",
    badgeClass: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
    dotClass: "bg-emerald-400",
  },
  rejected: {
    label: "Sans suite",
    badgeClass: "border-rose-500/30 bg-rose-500/10 text-rose-400",
    dotClass: "bg-rose-400",
  },
}

export const INITIAL_APPLICATIONS: ApplicationEntry[] = [
  {
    id: "app-ocha-imo",
    roleTitle: "Information Management Officer (IMO)",
    company: "OCHA RDC / REACH Initiative",
    sector: "ngo",
    location: "Bukavu / Goma",
    status: "interview",
    dateApplied: "2026-08-10",
    cvProfileId: "ngo-meal",
    referencesProvided: ["Bivunga Missy (GEVAPOM)", "Papa Ibucwa (TRAFFED)"],
    notes: "Entretien technique sur la maîtrise de l'outil Ehtools, le package ERM et les dashboards Power BI.",
    updatedAt: Date.now(),
  },
  {
    id: "app-fullstack-fintech",
    roleTitle: "Senior Fullstack Engineer (Java / Spring Boot / Next.js)",
    company: "FinTech Scale-up",
    sector: "tech",
    location: "Télétravail / Kigali / Kinshasa",
    status: "applied",
    dateApplied: "2026-08-18",
    cvProfileId: "bigtech-swe",
    referencesProvided: ["MUHINDO Dieudonné (Aumsoft)", "Prof. Mbilizi (ISP)"],
    notes: "Candidature avec mise en avant des plateformes PGCC (chiffrement AES-256) et Maago (offline-first).",
    updatedAt: Date.now(),
  },
  {
    id: "app-unicef-peace",
    roleTitle: "Peacebuilding & Community Engagement Officer",
    company: "UNICEF RDC",
    sector: "ngo",
    location: "Sud-Kivu, Bukavu",
    status: "draft",
    cvProfileId: "peace-comm",
    referencesProvided: ["Papa Ibucwa (A Rocha / TRAFFED)"],
    notes: "Mise en avant du titre de Jeune Ambassadeur de la Paix UNICEF et des actions de dialogue communautaire.",
    updatedAt: Date.now(),
  },
]
