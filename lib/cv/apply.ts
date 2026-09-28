import type { Locale } from "@/lib/i18n"
import type { CvProfile, Localized } from "@/lib/portal/profiles"
import { buildBaseCv } from "./base"
import { SECTION_IDS, type CvDoc, type Toggleable } from "./types"

function pick(text: Localized, lang: Locale): string {
  return text[lang] ?? text.fr ?? text.en
}

/** Puts listed keys first (in that order, visible) and hides everything else. */
function arrange<T extends Toggleable>(items: T[], keys: string[] | undefined): T[] {
  if (!keys) return items
  const listed = keys.map((k) => items.find((i) => i.key === k)).filter((i): i is T => Boolean(i))
  const rest = items.filter((i) => !keys.includes(i.key))
  return [...listed.map((i) => ({ ...i, visible: true })), ...rest.map((i) => ({ ...i, visible: false }))]
}

export function applyProfile(profile: CvProfile, lang: Locale): CvDoc {
  const doc = buildBaseCv(lang)

  doc.template = profile.template
  doc.density = profile.density
  doc.accent = profile.accent
  doc.showPhoto = profile.showPhoto
  if (profile.headline) doc.header.headline = pick(profile.headline, lang)
  if (profile.summary) doc.summary = pick(profile.summary, lang)

  if (profile.sections) {
    const listed = profile.sections
    doc.sections = [
      ...listed.map((id) => ({ id, visible: true })),
      ...SECTION_IDS.filter((id) => !listed.includes(id)).map((id) => ({ id, visible: false })),
    ]
  }

  if (profile.experience) {
    doc.experience = arrange(
      doc.experience,
      profile.experience.map((e) => e.id),
    ).map((job) => {
      const override = profile.experience?.find((e) => e.id === job.key)
      if (!override) return job
      return {
        ...job,
        role: override.role ? pick(override.role, lang) : job.role,
        bullets: override.bullets ? override.bullets.map((b) => ({ text: pick(b, lang), visible: true })) : job.bullets,
      }
    })
  }

  doc.projects = arrange(doc.projects, profile.projects)
  doc.skills = arrange(doc.skills, profile.skills).map((skill) => {
    const items = profile.skillItems?.[skill.key as keyof typeof profile.skillItems]
    return items ? { ...skill, items: pick(items, lang) } : skill
  })

  return doc
}
