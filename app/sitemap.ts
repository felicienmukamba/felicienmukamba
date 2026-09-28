import type { MetadataRoute } from "next"
import { localeMeta, locales } from "@/lib/i18n"
import { labTools } from "@/lib/lab/tools"
import { site } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/lab", ...labTools.map((tool) => `/lab/${tool}`)]

  return paths.flatMap((path) => {
    const languages = Object.fromEntries(locales.map((l) => [localeMeta[l].bcp47, `${site.url}/${l}${path}`]))
    return locales.map((lang) => ({
      url: `${site.url}/${lang}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: path === "" ? (lang === "en" ? 1 : 0.9) : 0.6,
      alternates: { languages },
    }))
  })
}
