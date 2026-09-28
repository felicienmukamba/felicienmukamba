import type { Locale } from "@/lib/i18n"

/**
 * A fully resolved CV. Everything the PDF shows lives here, so the public
 * download and the private CV studio render through the same code.
 */

export type CvTemplate = "modern" | "classic" | "sidebar"
export type CvDensity = "comfortable" | "compact"

export type SectionId =
  | "summary"
  | "experience"
  | "projects"
  | "skills"
  | "education"
  | "certifications"
  | "languages"
  | "references"

export const SECTION_IDS: SectionId[] = [
  "summary",
  "experience",
  "projects",
  "skills",
  "education",
  "certifications",
  "languages",
  "references",
]

export type SkillKey = "ai" | "agents" | "architecture" | "product" | "languages" | "data" | "security"

/** Order of `skills.categories` in the dictionaries. */
export const SKILL_KEYS: SkillKey[] = ["ai", "agents", "architecture", "product", "languages", "data", "security"]

export type Toggleable = { key: string; visible: boolean }

export type CvBullet = { text: string; visible: boolean }

export type CvExperience = Toggleable & {
  role: string
  company: string
  period: string
  location: string
  bullets: CvBullet[]
}

export type CvProject = Toggleable & { title: string; subtitle: string; text: string; tech: string }

export type CvSkill = Toggleable & { name: string; items: string }

export type CvEducation = Toggleable & { degree: string; school: string; period: string }

export type CvCertification = Toggleable & { name: string; meta: string }

export type CvLanguage = Toggleable & { name: string; level: string }

export type CvReference = Toggleable & { name: string; role: string; contact: string }

export type CvDoc = {
  version: 1
  lang: Locale
  template: CvTemplate
  density: CvDensity
  accent: string
  showPhoto: boolean
  header: {
    name: string
    headline: string
    email: string
    phone: string
    location: string
    showPhone: boolean
    showLinks: boolean
    showWebsite: boolean
  }
  summary: string
  sections: { id: SectionId; visible: boolean }[]
  labels: Record<SectionId, string>
  experience: CvExperience[]
  projects: CvProject[]
  skills: CvSkill[]
  education: CvEducation[]
  certifications: CvCertification[]
  languages: CvLanguage[]
  references: CvReference[]
  /** Shown under the references section when no reference is listed. */
  referencesNote: string
}
