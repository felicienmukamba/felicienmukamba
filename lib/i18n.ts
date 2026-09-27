export const locales = ["en", "fr", "ln"] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = "en"

export const localeCookie = "NEXT_LOCALE"

export const localeMeta: Record<Locale, { label: string; short: string; og: string; bcp47: string }> = {
  en: { label: "English", short: "EN", og: "en_US", bcp47: "en" },
  fr: { label: "Français", short: "FR", og: "fr_FR", bcp47: "fr" },
  ln: { label: "Lingála", short: "LN", og: "ln_CD", bcp47: "ln" },
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}
