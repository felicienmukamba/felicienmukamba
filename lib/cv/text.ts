import type { CvDoc, SectionId } from "./types"

function sectionText(doc: CvDoc, id: SectionId): string[] {
  switch (id) {
    case "summary":
      return [doc.summary]
    case "experience":
      return doc.experience
        .filter((e) => e.visible)
        .flatMap((e) => [
          `${e.role} — ${[e.company, e.period, e.location].filter(Boolean).join(" · ")}`,
          ...e.bullets.filter((b) => b.visible).map((b) => `• ${b.text}`),
          "",
        ])
    case "projects":
      return doc.projects
        .filter((p) => p.visible)
        .flatMap((p) => [`${p.title} — ${p.subtitle}`, p.text, p.tech, ""].filter((l) => l !== undefined))
    case "skills":
      return doc.skills.filter((s) => s.visible).map((s) => `${s.name}: ${s.items}`)
    case "education":
      return doc.education.filter((e) => e.visible).map((e) => `${e.degree} — ${e.school} (${e.period})`)
    case "certifications":
      return doc.certifications.filter((c) => c.visible).map((c) => `${c.name} — ${c.meta}`)
    case "languages":
      return doc.languages.filter((l) => l.visible).map((l) => `${l.name} — ${l.level}`)
    case "references": {
      const refs = doc.references.filter((r) => r.visible && r.name)
      return refs.length ? refs.map((r) => [r.name, r.role, r.contact].filter(Boolean).join(" — ")) : [doc.referencesNote]
    }
  }
}

/** Plain-text version for online application forms that only accept pasted text. */
export function cvToText(doc: CvDoc): string {
  const h = doc.header
  const lines = [h.name, h.headline, [h.email, h.showPhone ? h.phone : "", h.location].filter(Boolean).join(" · "), ""]
  for (const section of doc.sections.filter((s) => s.visible)) {
    const body = sectionText(doc, section.id).filter((l) => l !== "")
    if (!body.length) continue
    lines.push(doc.labels[section.id].toUpperCase(), ...body, "")
  }
  return lines.join("\n").replace(/\n{3,}/g, "\n\n").trim()
}
