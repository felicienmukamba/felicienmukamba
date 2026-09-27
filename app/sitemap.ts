import type { MetadataRoute } from "next"
import { localeMeta, locales } from "@/lib/i18n"
import { site } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(locales.map((l) => [localeMeta[l].bcp47, `${site.url}/${l}`]))

  return locales.map((lang) => ({
    url: `${site.url}/${lang}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: lang === "en" ? 1 : 0.9,
    alternates: { languages },
  }))
}
