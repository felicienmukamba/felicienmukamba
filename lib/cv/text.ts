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

export type LinkedInFormattedResult = {
  about: string
  experienceSummaries: string
  skillsBlock: string
  fullLinkedInText: string
  positions: {
    role: string
    company: string
    period: string
    location: string
    formattedText: string
  }[]
}

/**
 * Parses CV data into formatted, high-impact text blocks optimized for:
 * 1. LinkedIn 'About' section (summary, core competencies, accomplishments, contact)
 * 2. LinkedIn Work Experience summaries (concise roles, key impact metrics, bullet points)
 */
export function parseCvForLinkedIn(doc: CvDoc): LinkedInFormattedResult {
  const isFrench = doc.lang === "fr" || doc.lang === "ln"
  const h = doc.header

  // 1. Format LinkedIn "About" Section
  const aboutLines: string[] = []

  // Hook / Headline
  if (h.headline) {
    aboutLines.push(`👋 ${h.name} | ${h.headline}`)
    aboutLines.push("")
  }

  // Elevator Pitch / Summary Body
  if (doc.summary) {
    aboutLines.push(doc.summary.trim())
    aboutLines.push("")
  }

  // Key Expertise Areas
  const visibleSkills = doc.skills.filter((s) => s.visible && s.name && s.items)
  if (visibleSkills.length > 0) {
    aboutLines.push(isFrench ? "🎯 Domaines d'expertise & technologies clés :" : "🎯 Core Expertise & Key Technologies:")
    for (const skill of visibleSkills) {
      aboutLines.push(`▸ ${skill.name} : ${skill.items}`)
    }
    aboutLines.push("")
  }

  // Top Accomplishments & Projects
  const visibleProjects = doc.projects.filter((p) => p.visible)
  if (visibleProjects.length > 0) {
    aboutLines.push(isFrench ? "🚀 Réalisations marquantes & projets phares :" : "🚀 Key Achievements & Featured Projects:")
    for (const project of visibleProjects.slice(0, 3)) {
      const subtitle = project.subtitle ? ` (${project.subtitle})` : ""
      aboutLines.push(`• ${project.title}${subtitle} : ${project.text}`)
    }
    aboutLines.push("")
  }

  // Languages & Certifications
  const visibleLangs = doc.languages.filter((l) => l.visible)
  const visibleCerts = doc.certifications.filter((c) => c.visible)
  if (visibleLangs.length > 0 || visibleCerts.length > 0) {
    const creds: string[] = []
    if (visibleLangs.length > 0) {
      creds.push(`🗣️ ${visibleLangs.map((l) => `${l.name} (${l.level})`).join(" · ")}`)
    }
    if (visibleCerts.length > 0) {
      creds.push(`📜 ${visibleCerts.map((c) => c.name).join(" · ")}`)
    }
    aboutLines.push(creds.join("\n"))
    aboutLines.push("")
  }

  // Call to Action / Contact Info
  aboutLines.push(isFrench ? "📬 Échangeons ensemble :" : "📬 Let's Connect:")
  const contactParts: string[] = []
  if (h.email) contactParts.push(`✉️ ${h.email}`)
  if (h.showPhone && h.phone) contactParts.push(`📞 ${h.phone}`)
  if (h.location) contactParts.push(`📍 ${h.location}`)
  contactParts.push("🔗 felicienmukamba.cd")
  aboutLines.push(contactParts.join(" | "))

  const about = aboutLines.join("\n").replace(/\n{3,}/g, "\n\n").trim()

  // 2. Format Work Experience Summaries
  const positions: {
    role: string
    company: string
    period: string
    location: string
    formattedText: string
  }[] = []

  const visibleExp = doc.experience.filter((e) => e.visible)
  for (const exp of visibleExp) {
    const lines: string[] = []
    lines.push(`💼 ${exp.role} | ${exp.company}`)
    const meta = [exp.period, exp.location].filter(Boolean).join(" · ")
    if (meta) lines.push(`📅 ${meta}`)
    lines.push("")

    const visibleBullets = exp.bullets.filter((b) => b.visible && b.text.trim())
    for (const b of visibleBullets) {
      lines.push(`• ${b.text.trim()}`)
    }

    const formattedText = lines.join("\n").trim()
    positions.push({
      role: exp.role,
      company: exp.company,
      period: exp.period,
      location: exp.location,
      formattedText,
    })
  }

  const experienceSummaries = positions
    .map((p) => p.formattedText)
    .join("\n\n" + "─".repeat(36) + "\n\n")

  // 3. Skills Block
  const skillsBlock = visibleSkills.map((s) => `• ${s.name}: ${s.items}`).join("\n")

  // 4. Combined Full LinkedIn Export
  const fullLinkedInText = [
    "════════════════════════════════════════════════════════",
    isFrench ? "SECTION « INFOS » (ABOUT LINKEDIN)" : "LINKEDIN 'ABOUT' SECTION",
    "════════════════════════════════════════════════════════",
    about,
    "",
    "════════════════════════════════════════════════════════",
    isFrench ? "EXPÉRIENCES PROFESSIONNELLES (WORK EXPERIENCE)" : "WORK EXPERIENCE SUMMARIES",
    "════════════════════════════════════════════════════════",
    experienceSummaries,
  ].join("\n").trim()

  return {
    about,
    experienceSummaries,
    skillsBlock,
    fullLinkedInText,
    positions,
  }
}
