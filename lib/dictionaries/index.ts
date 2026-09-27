import type { Locale } from "@/lib/i18n"
import { en, type Dictionary } from "./en"
import { fr } from "./fr"
import { ln } from "./ln"

export type { Dictionary }

const dictionaries: Record<Locale, Dictionary> = { en, fr, ln }

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale]
}
