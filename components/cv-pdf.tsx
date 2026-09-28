import { Document, Font, Image, Link, Page, StyleSheet, Text, View, pdf } from "@react-pdf/renderer"
import type { ReactNode } from "react"
import { buildBaseCv } from "@/lib/cv/base"
import type { CvDoc, SectionId } from "@/lib/cv/types"
import type { Locale } from "@/lib/i18n"
import { site } from "@/lib/site"

// Never split words across lines: hyphenated skill names read badly and confuse ATS parsers.
Font.registerHyphenationCallback((word) => [word])

const ink = "#14131f"
const body = "#3f3d52"
const muted = "#6f6c85"
const rule = "#e4e2ee"

/** Sections that sit in the narrow column of the two-column layouts. */
const SIDE_SECTIONS: SectionId[] = ["skills", "education", "certifications", "languages", "references"]
const SIDEBAR_SECTIONS: SectionId[] = ["skills", "languages", "certifications", "references"]

function makeStyles(doc: CvDoc) {
  const k = doc.density === "compact" ? 0.92 : 1
  const accent = doc.accent
  return StyleSheet.create({
    page: {
      paddingTop: 40 * k,
      paddingBottom: 40 * k,
      paddingHorizontal: 44 * k,
      fontSize: 9.5 * k,
      fontFamily: "Helvetica",
      color: body,
      lineHeight: 1.45,
    },
    sidebarPage: { paddingTop: 36 * k, paddingBottom: 36 * k, fontSize: 9.5 * k, fontFamily: "Helvetica", color: body, lineHeight: 1.45 },
    name: { fontSize: 24 * k, fontFamily: "Helvetica-Bold", color: ink, letterSpacing: -0.4, lineHeight: 1.2 },
    headline: { fontSize: 11 * k, color: accent, marginTop: 6, lineHeight: 1.3 },
    contact: { flexDirection: "row", flexWrap: "wrap", marginTop: 10, color: muted, fontSize: 8.5 * k },
    contactItem: { marginRight: 12, marginBottom: 2 },
    link: { color: muted, textDecoration: "none" },
    divider: { height: 1, backgroundColor: rule, marginVertical: 16 * k },
    columns: { flexDirection: "row" },
    main: { width: "63%", paddingRight: 20 },
    side: { width: "37%", paddingLeft: 20, borderLeft: `1pt solid ${rule}` },
    sectionTitle: {
      fontSize: 8 * k,
      fontFamily: "Helvetica-Bold",
      color: accent,
      letterSpacing: 1.6,
      textTransform: "uppercase",
      marginBottom: 8 * k,
    },
    classicTitle: {
      fontSize: 9 * k,
      fontFamily: "Helvetica-Bold",
      color: accent,
      letterSpacing: 1.2,
      textTransform: "uppercase",
      paddingBottom: 4,
      marginBottom: 8 * k,
      borderBottom: `1pt solid ${rule}`,
    },
    section: { marginBottom: 16 * k },
    itemTitle: { fontSize: 10.5 * k, fontFamily: "Helvetica-Bold", color: ink },
    itemMeta: { fontSize: 8.5 * k, color: muted, marginTop: 1, marginBottom: 4 },
    item: { marginBottom: 11 * k },
    bullet: { flexDirection: "row", marginBottom: 2.5 },
    bulletDot: { width: 9, color: accent },
    bulletText: { flex: 1 },
    tech: { fontSize: 8 * k, color: muted, marginTop: 3 },
    small: { fontSize: 8.5 * k },
    smallMuted: { fontSize: 8 * k, color: muted },
    strong: { fontSize: 9 * k, fontFamily: "Helvetica-Bold", color: ink, marginBottom: 2 },
    photo: { width: 64, height: 64, borderRadius: 14, objectFit: "cover" },
    // Sidebar template
    sidebarBg: { position: "absolute", top: 0, bottom: 0, left: 0, width: "33%", backgroundColor: accent },
    sidebar: { width: "33%", paddingHorizontal: 22 * k, color: "#ffffff" },
    sidebarMain: { width: "67%", paddingHorizontal: 30 * k },
    sidebarTitle: {
      fontSize: 8 * k,
      fontFamily: "Helvetica-Bold",
      color: "#ffffff",
      letterSpacing: 1.6,
      textTransform: "uppercase",
      marginBottom: 7 * k,
      opacity: 0.8,
    },
    sidebarPhoto: { width: 96, height: 96, borderRadius: 48, objectFit: "cover", marginBottom: 18, alignSelf: "center" },
    onAccent: { color: "#ffffff" },
    onAccentSoft: { color: "#ffffff", opacity: 0.78 },
  })
}

type Styles = ReturnType<typeof makeStyles>
type Tone = "light" | "accent"

function origin() {
  return typeof window === "undefined" ? site.url : window.location.origin
}

function Bullet({ s, children }: { s: Styles; children: string }) {
  return (
    <View style={s.bullet} wrap={false}>
      <Text style={s.bulletDot}>•</Text>
      <Text style={s.bulletText}>{children}</Text>
    </View>
  )
}

/** Keeps a heading glued to its first entry so it never ends a page alone. */
function Block({ title, items, s }: { title: ReactNode; items: ReactNode[]; s: Styles }) {
  if (items.length === 0) return null
  const [first, ...rest] = items
  return (
    <View style={s.section}>
      <View wrap={false}>
        {title}
        {first}
      </View>
      {rest}
    </View>
  )
}

function Section({ id, doc, s, layout, tone = "light" }: { id: SectionId; doc: CvDoc; s: Styles; layout: "main" | "side" | "single"; tone?: Tone }) {
  const onAccent = tone === "accent"
  const titleStyle = onAccent ? s.sidebarTitle : doc.template === "classic" ? s.classicTitle : s.sectionTitle
  const strong = onAccent ? [s.strong, s.onAccent] : [s.strong]
  const soft = onAccent ? [s.small, s.onAccentSoft] : [s.small]
  const faint = onAccent ? [s.smallMuted, s.onAccentSoft] : [s.smallMuted]
  const title = <Text style={titleStyle}>{doc.labels[id]}</Text>

  switch (id) {
    case "summary":
      return doc.summary.trim() ? <Block s={s} title={title} items={[<Text key="summary">{doc.summary}</Text>]} /> : null

    case "experience":
      return (
        <Block
          s={s}
          title={title}
          items={doc.experience
            .filter((e) => e.visible)
            .map((e) => (
              <View key={e.key} style={s.item}>
                <Text style={s.itemTitle}>{e.role}</Text>
                <Text style={s.itemMeta}>{[e.company, e.period, e.location].filter(Boolean).join(" · ")}</Text>
                {e.bullets
                  .filter((b) => b.visible && b.text.trim())
                  .map((b, i) => (
                    <Bullet key={i} s={s}>
                      {b.text}
                    </Bullet>
                  ))}
              </View>
            ))}
        />
      )

    case "projects":
      return (
        <Block
          s={s}
          title={title}
          items={doc.projects
            .filter((p) => p.visible)
            .map((p) => (
              <View key={p.key} style={s.item} wrap={false}>
                <Text style={s.itemTitle}>{p.title}</Text>
                {p.subtitle ? <Text style={s.itemMeta}>{p.subtitle}</Text> : null}
                {p.text ? <Text>{p.text}</Text> : null}
                {p.tech ? <Text style={s.tech}>{p.tech}</Text> : null}
              </View>
            ))}
        />
      )

    case "skills":
      return (
        <Block
          s={s}
          title={title}
          items={doc.skills
            .filter((c) => c.visible && c.items.trim())
            .map((c) =>
              layout === "single" ? (
                <Text key={c.key} style={{ marginBottom: 3 }}>
                  <Text style={{ fontFamily: "Helvetica-Bold", color: ink }}>{c.name}: </Text>
                  {c.items}
                </Text>
              ) : (
                <View key={c.key} style={{ marginBottom: 7 }} wrap={false}>
                  <Text style={strong}>{c.name}</Text>
                  <Text style={soft}>{c.items}</Text>
                </View>
              ),
            )}
        />
      )

    case "education":
      return (
        <Block
          s={s}
          title={title}
          items={doc.education
            .filter((e) => e.visible)
            .map((e) =>
              layout === "single" ? (
                <View key={e.key} style={{ marginBottom: 5 }} wrap={false}>
                  <Text style={s.strong}>{e.degree}</Text>
                  <Text style={s.smallMuted}>
                    {e.school} · {e.period}
                  </Text>
                </View>
              ) : (
                <View key={e.key} style={{ marginBottom: 7 }} wrap={false}>
                  <Text style={strong}>{e.degree}</Text>
                  <Text style={soft}>{e.school}</Text>
                  <Text style={faint}>{e.period}</Text>
                </View>
              ),
            )}
        />
      )

    case "certifications":
      return (
        <Block
          s={s}
          title={title}
          items={doc.certifications
            .filter((c) => c.visible)
            .map((c) => (
              <View key={c.key} style={{ marginBottom: 5 }} wrap={false}>
                <Text style={onAccent ? [s.small, s.onAccent] : [s.small, { color: ink }]}>{c.name}</Text>
                <Text style={faint}>{c.meta}</Text>
              </View>
            ))}
        />
      )

    case "languages":
      return (
        <Block
          s={s}
          title={title}
          items={doc.languages
            .filter((l) => l.visible)
            .map((l) => (
              <Text key={l.key} style={[...soft, { marginBottom: 2 }]}>
                <Text style={onAccent ? s.onAccent : { color: ink }}>{l.name}</Text> — {l.level}
              </Text>
            ))}
        />
      )

    case "references": {
      const refs = doc.references.filter((r) => r.visible && r.name.trim())
      if (refs.length === 0) return <Block s={s} title={title} items={[<Text key="note" style={faint}>{doc.referencesNote}</Text>]} />
      return (
        <Block
          s={s}
          title={title}
          items={refs.map((r) => (
            <View key={r.key} style={{ marginBottom: 6 }} wrap={false}>
              <Text style={strong}>{r.name}</Text>
              {r.role ? <Text style={soft}>{r.role}</Text> : null}
              {r.contact ? <Text style={faint}>{r.contact}</Text> : null}
            </View>
          ))}
        />
      )
    }
  }
}

function ContactLine({ doc, s, tone = "light" }: { doc: CvDoc; s: Styles; tone?: Tone }) {
  const h = doc.header
  const host = origin().replace(/^https?:\/\//, "")
  const color = tone === "accent" ? s.onAccent : s.link
  const items: ReactNode[] = [
    <Link key="email" src={`mailto:${h.email}`} style={[color, s.contactItem]}>
      {h.email}
    </Link>,
  ]
  if (h.showPhone && h.phone) items.push(<Text key="phone" style={s.contactItem}>{h.phone}</Text>)
  if (h.location) items.push(<Text key="loc" style={s.contactItem}>{h.location}</Text>)
  if (h.showLinks) {
    items.push(
      <Link key="gh" src={site.social.github} style={[color, s.contactItem]}>
        github.com/felicienmukamba
      </Link>,
      <Link key="li" src={site.social.linkedin} style={[color, s.contactItem]}>
        linkedin.com/in/felicien-mukamba
      </Link>,
    )
  }
  if (h.showWebsite)
    items.push(
      <Link key="web" src={`${origin()}/${doc.lang}`} style={[color, s.contactItem]}>
        {host}
      </Link>,
    )
  return <>{items}</>
}

function visibleSections(doc: CvDoc, only?: SectionId[], exclude?: SectionId[]) {
  return doc.sections
    .filter((sec) => sec.visible)
    .map((sec) => sec.id)
    .filter((id) => (!only || only.includes(id)) && (!exclude || !exclude.includes(id)))
}

function Header({ doc, s }: { doc: CvDoc; s: Styles }) {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
      <View style={{ flex: 1, paddingRight: doc.showPhoto ? 16 : 0 }}>
        <Text style={s.name}>{doc.header.name}</Text>
        <Text style={s.headline}>{doc.header.headline}</Text>
        <View style={s.contact}>
          <ContactLine doc={doc} s={s} />
        </View>
      </View>
      {doc.showPhoto && <Image src={`${origin()}${site.avatar}`} style={s.photo} />}
    </View>
  )
}

function ModernTemplate({ doc, s }: { doc: CvDoc; s: Styles }) {
  const top = visibleSections(doc, ["summary"])
  const main = visibleSections(doc, undefined, [...SIDE_SECTIONS, "summary"])
  const side = visibleSections(doc, SIDE_SECTIONS)
  return (
    <Page size="A4" style={s.page}>
      <Header doc={doc} s={s} />
      <View style={s.divider} />
      {top.map((id) => (
        <Section key={id} id={id} doc={doc} s={s} layout="single" />
      ))}
      <View style={s.columns}>
        <View style={side.length ? s.main : { width: "100%" }}>
          {main.map((id) => (
            <Section key={id} id={id} doc={doc} s={s} layout="main" />
          ))}
        </View>
        {side.length > 0 && (
          <View style={s.side}>
            {side.map((id) => (
              <Section key={id} id={id} doc={doc} s={s} layout="side" />
            ))}
          </View>
        )}
      </View>
    </Page>
  )
}

function ClassicTemplate({ doc, s }: { doc: CvDoc; s: Styles }) {
  return (
    <Page size="A4" style={s.page}>
      <Header doc={doc} s={s} />
      <View style={{ height: 16 }} />
      {visibleSections(doc).map((id) => (
        <Section key={id} id={id} doc={doc} s={s} layout="single" />
      ))}
    </Page>
  )
}

function SidebarTemplate({ doc, s }: { doc: CvDoc; s: Styles }) {
  const side = visibleSections(doc, SIDEBAR_SECTIONS)
  const main = visibleSections(doc, undefined, SIDEBAR_SECTIONS)
  return (
    <Page size="A4" style={s.sidebarPage}>
      <View style={s.sidebarBg} fixed />
      <View style={s.columns}>
        <View style={s.sidebar}>
          {doc.showPhoto && <Image src={`${origin()}${site.avatar}`} style={s.sidebarPhoto} />}
          <View style={s.section}>
            <View style={[s.contact, { flexDirection: "column", marginTop: 0 }, s.onAccentSoft]}>
              <ContactLine doc={doc} s={s} tone="accent" />
            </View>
          </View>
          {side.map((id) => (
            <Section key={id} id={id} doc={doc} s={s} layout="side" tone="accent" />
          ))}
        </View>
        <View style={s.sidebarMain}>
          <Text style={s.name}>{doc.header.name}</Text>
          <Text style={s.headline}>{doc.header.headline}</Text>
          <View style={s.divider} />
          {main.map((id) => (
            <Section key={id} id={id} doc={doc} s={s} layout="main" />
          ))}
        </View>
      </View>
    </Page>
  )
}

export function CvDocument({ doc }: { doc: CvDoc }) {
  const s = makeStyles(doc)
  const Template = doc.template === "classic" ? ClassicTemplate : doc.template === "sidebar" ? SidebarTemplate : ModernTemplate
  return (
    <Document title={`${doc.header.name} — CV`} author={doc.header.name} subject={doc.header.headline} language={doc.lang}>
      <Template doc={doc} s={s} />
    </Document>
  )
}

export async function renderCvDoc(doc: CvDoc): Promise<Blob> {
  return pdf(<CvDocument doc={doc} />).toBlob()
}

export async function renderCv(lang: Locale): Promise<Blob> {
  return renderCvDoc(buildBaseCv(lang))
}
