import { getDictionary } from "@/lib/dictionaries"
import { localeMeta, type Locale } from "@/lib/i18n"
import { site } from "@/lib/site"

/** Person + ProfilePage structured data so search engines can build a knowledge panel. */
export function JsonLd({ lang }: { lang: Locale }) {
  const t = getDictionary(lang)
  const pageUrl = `${site.url}/${lang}`
  const personId = `${site.url}/#person`

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: site.name,
        alternateName: site.fullName,
        givenName: "Félicien",
        familyName: "Mukamba",
        url: site.url,
        image: `${site.url}${site.avatar}`,
        email: `mailto:${site.email}`,
        jobTitle: ["Software Engineer", "AI Engineer", "Project Manager", "AI Agent Manager"],
        description: t.meta.description,
        worksFor: [
          { "@type": "Organization", name: "SOSIDE COMPANY SAS" },
          { "@type": "Organization", name: "Aumsoft Technology", url: "https://aumsoft.net" },
        ],
        alumniOf: { "@type": "CollegeOrUniversity", name: "Institut Supérieur Pédagogique de Bukavu" },
        address: {
          "@type": "PostalAddress",
          addressLocality: site.city,
          addressRegion: site.region,
          addressCountry: site.countryCode,
        },
        knowsLanguage: ["fr", "en", "sw", "ln"],
        knowsAbout: [
          "Software Engineering",
          "AI Engineering",
          "AI Agents",
          "Large Language Models",
          "Retrieval-Augmented Generation",
          "Distributed Systems",
          "Multi-tenant SaaS",
          "Spring Boot",
          "Next.js",
          "PostgreSQL",
          "Docker",
          "Digital Identity",
        ],
        sameAs: Object.values(site.social),
      },
      {
        "@type": "ProfilePage",
        "@id": `${pageUrl}#page`,
        url: pageUrl,
        name: t.meta.title,
        inLanguage: localeMeta[lang].bcp47,
        mainEntity: { "@id": personId },
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  )
}
