import { Document, Font, Link, Page, StyleSheet, Text, View, pdf } from "@react-pdf/renderer"
import { getDictionary } from "@/lib/dictionaries"
import type { Locale } from "@/lib/i18n"
import { experience, projects, site } from "@/lib/site"

// Never split words across lines: hyphenated skill names read badly and confuse ATS parsers.
Font.registerHyphenationCallback((word) => [word])

const ink = "#14131f"
const body = "#3f3d52"
const muted = "#6f6c85"
const rule = "#e4e2ee"
const accent = "#5a4bd6"

const s = StyleSheet.create({
  page: { paddingTop: 40, paddingBottom: 40, paddingHorizontal: 44, fontSize: 9.5, fontFamily: "Helvetica", color: body, lineHeight: 1.45 },
  name: { fontSize: 24, fontFamily: "Helvetica-Bold", color: ink, letterSpacing: -0.4, lineHeight: 1.2 },
  headline: { fontSize: 11, color: accent, marginTop: 6, lineHeight: 1.3 },
  contact: { flexDirection: "row", flexWrap: "wrap", marginTop: 10, color: muted, fontSize: 8.5 },
  contactItem: { marginRight: 12, marginBottom: 2 },
  link: { color: muted, textDecoration: "none" },
  divider: { height: 1, backgroundColor: rule, marginVertical: 16 },
  columns: { flexDirection: "row" },
  main: { width: "63%", paddingRight: 20 },
  side: { width: "37%", paddingLeft: 20, borderLeft: `1pt solid ${rule}` },
  sectionTitle: { fontSize: 8, fontFamily: "Helvetica-Bold", color: accent, letterSpacing: 1.6, textTransform: "uppercase", marginBottom: 8 },
  section: { marginBottom: 16 },
  itemTitle: { fontSize: 10.5, fontFamily: "Helvetica-Bold", color: ink },
  itemMeta: { fontSize: 8.5, color: muted, marginTop: 1, marginBottom: 4 },
  item: { marginBottom: 11 },
  bullet: { flexDirection: "row", marginBottom: 2.5 },
  bulletDot: { width: 9, color: accent },
  bulletText: { flex: 1 },
  tech: { fontSize: 8, color: muted, marginTop: 3 },
  skillName: { fontSize: 9, fontFamily: "Helvetica-Bold", color: ink, marginBottom: 2 },
  skillItems: { fontSize: 8.5, marginBottom: 8 },
})

function Bullet({ children }: { children: string }) {
  return (
    <View style={s.bullet} wrap={false}>
      <Text style={s.bulletDot}>•</Text>
      <Text style={s.bulletText}>{children}</Text>
    </View>
  )
}

function CvDocument({ lang }: { lang: Locale }) {
  const t = getDictionary(lang)
  // Rendered in the browser: the current origin is always the right public URL.
  const origin = typeof window === "undefined" ? site.url : window.location.origin
  const siteHost = origin.replace(/^https?:\/\//, "")

  return (
    <Document title={`${site.name} — CV`} author={site.name} subject={t.cv.headline} language={lang}>
      <Page size="A4" style={s.page}>
        <View>
          <Text style={s.name}>{site.fullName}</Text>
          <Text style={s.headline}>{t.cv.headline}</Text>
          <View style={s.contact}>
            <Link src={`mailto:${site.email}`} style={[s.link, s.contactItem]}>
              {site.email}
            </Link>
            <Text style={s.contactItem}>{site.phone}</Text>
            <Text style={s.contactItem}>
              {site.city}, {site.country}
            </Text>
            <Link src={site.social.github} style={[s.link, s.contactItem]}>
              github.com/felicienmukamba
            </Link>
            <Link src={site.social.linkedin} style={[s.link, s.contactItem]}>
              linkedin.com/in/felicien-mukamba
            </Link>
            <Link src={`${origin}/${lang}`} style={[s.link, s.contactItem]}>
              {siteHost}
            </Link>
          </View>
        </View>

        <View style={s.divider} />

        <View style={s.section}>
          <Text style={s.sectionTitle} minPresenceAhead={70}>{t.cv.profileTitle}</Text>
          <Text>{t.cv.profile}</Text>
        </View>

        <View style={s.columns}>
          <View style={s.main}>
            <View style={s.section}>
              <Text style={s.sectionTitle} minPresenceAhead={70}>{t.cv.experienceTitle}</Text>
              {experience.map((job) => {
                const item = t.experience.items[job.id]
                return (
                  <View key={job.id} style={s.item}>
                    <Text style={s.itemTitle}>{item.role}</Text>
                    <Text style={s.itemMeta}>
                      {job.company} · {item.period} · {item.location}
                    </Text>
                    {item.achievements.map((a) => (
                      <Bullet key={a}>{a}</Bullet>
                    ))}
                  </View>
                )
              })}
            </View>

            <View style={s.section}>
              {projects
                .filter((p) => p.featured)
                .map((p, i) => {
                  const item = t.projects.items[p.id]
                  return (
                    <View key={p.id} style={s.item} wrap={false}>
                      {/* Kept inside the first item so the heading never ends a page alone. */}
                      {i === 0 && <Text style={s.sectionTitle}>{t.cv.projectsTitle}</Text>}
                      <Text style={s.itemTitle}>{item.title}</Text>
                      <Text style={s.itemMeta}>{item.subtitle}</Text>
                      <Text>{item.impact}</Text>
                      <Text style={s.tech}>{p.tech.join(" · ")}</Text>
                    </View>
                  )
                })}
            </View>
          </View>

          <View style={s.side}>
            <View style={s.section}>
              <Text style={s.sectionTitle} minPresenceAhead={70}>{t.cv.skillsTitle}</Text>
              {t.skills.categories.map((c) => (
                <View key={c.name} wrap={false}>
                  <Text style={s.skillName}>{c.name}</Text>
                  <Text style={s.skillItems}>{c.items.join(", ")}</Text>
                </View>
              ))}
            </View>

            <View style={s.section}>
              <Text style={s.sectionTitle} minPresenceAhead={70}>{t.cv.educationTitle}</Text>
              {t.education.items.map((e) => (
                <View key={e.degree} style={{ marginBottom: 7 }} wrap={false}>
                  <Text style={s.skillName}>{e.degree}</Text>
                  <Text style={{ fontSize: 8.5 }}>{e.school}</Text>
                  <Text style={{ fontSize: 8, color: muted }}>{e.period}</Text>
                </View>
              ))}
            </View>

            <View style={s.section}>
              <Text style={s.sectionTitle} minPresenceAhead={70}>{t.cv.certificationsTitle}</Text>
              {t.education.certifications.map((c) => (
                <View key={c.name} style={{ marginBottom: 5 }} wrap={false}>
                  <Text style={{ fontSize: 8.5, color: ink }}>{c.name}</Text>
                  <Text style={{ fontSize: 8, color: muted }}>
                    {c.provider} · {c.year}
                  </Text>
                </View>
              ))}
            </View>

            <View style={s.section}>
              <Text style={s.sectionTitle} minPresenceAhead={70}>{t.cv.languagesTitle}</Text>
              {t.education.languages.map((l) => (
                <Text key={l.name} style={{ fontSize: 8.5, marginBottom: 2 }}>
                  <Text style={{ color: ink }}>{l.name}</Text> — {l.level}
                </Text>
              ))}
            </View>

            <Text style={{ fontSize: 8, color: muted }}>{t.cv.references}</Text>
          </View>
        </View>

      </Page>
    </Document>
  )
}

export async function renderCv(lang: Locale): Promise<Blob> {
  return pdf(<CvDocument lang={lang} />).toBlob()
}
