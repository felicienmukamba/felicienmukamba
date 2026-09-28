import { getDictionary } from "@/lib/dictionaries"
import type { Locale } from "@/lib/i18n"
import { experience, projects, site } from "@/lib/site"
import { SECTION_IDS, SKILL_KEYS, type CvDoc } from "./types"

export const DEFAULT_ACCENT = "#5a4bd6"

/** The public CV: every section of the portfolio, in the portfolio's own words. */
export function buildBaseCv(lang: Locale): CvDoc {
  const t = getDictionary(lang)

  return {
    version: 1,
    lang,
    template: "modern",
    density: "comfortable",
    accent: DEFAULT_ACCENT,
    showPhoto: false,
    header: {
      name: site.fullName,
      headline: t.cv.headline,
      email: site.email,
      phone: site.phone,
      location: t.hero.location,
      showPhone: true,
      showLinks: true,
      showWebsite: true,
    },
    summary: t.cv.profile,
    sections: SECTION_IDS.map((id) => ({ id, visible: id !== "references" })),
    labels: {
      summary: t.cv.profileTitle,
      experience: t.cv.experienceTitle,
      projects: t.cv.projectsTitle,
      skills: t.cv.skillsTitle,
      education: t.cv.educationTitle,
      certifications: t.cv.certificationsTitle,
      languages: t.cv.languagesTitle,
      references: t.cv.referencesTitle,
    },
    experience: experience.map((job) => {
      const item = t.experience.items[job.id]
      return {
        key: job.id,
        visible: true,
        role: item.role,
        company: job.company,
        period: item.period,
        location: item.location,
        bullets: item.achievements.map((text) => ({ text, visible: true })),
      }
    }),
    projects: projects.map((p) => {
      const item = t.projects.items[p.id]
      return {
        key: p.id,
        visible: p.featured,
        title: item.title,
        subtitle: item.subtitle,
        text: item.impact,
        tech: p.tech?.join(" · ") ?? "",
      }
    }),
    skills: t.skills.categories.map((c, i) => ({
      key: SKILL_KEYS[i],
      visible: true,
      name: c.name,
      items: c.items.join(", "),
    })),
    education: t.education.items.map((e, i) => ({
      key: `edu-${i}`,
      visible: true,
      degree: e.degree,
      school: e.school,
      period: e.period,
    })),
    certifications: t.education.certifications.map((c, i) => ({
      key: `cert-${i}`,
      visible: true,
      name: c.name,
      meta: `${c.provider} · ${c.year}`,
    })),
    languages: t.education.languages.map((l, i) => ({ key: `lang-${i}`, visible: true, name: l.name, level: l.level })),
    references: [],
    referencesNote: t.cv.references,
  }
}
