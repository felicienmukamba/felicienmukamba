import { cvToText } from "./text"
import type { CvDoc } from "./types"

/**
 * Job-description matching, fully local: finds the terms an offer insists on and
 * checks which ones the current CV already contains — the same rough test an ATS runs.
 */

const STOPWORDS = new Set(
  (
    "the and for with you your our are will have has this that from into their they them who what when where which about " +
    "would should could must can not all any each more most other some such than too very also able using use work working " +
    "team teams role roles job years year experience experienced strong good great new including within across based well " +
    "les des une pour avec dans sur par vous nous est sont être avoir aux ces cette ses leur leurs qui que quoi dont plus " +
    "moins tout tous toute toutes comme mais donc car afin ainsi entre chez sans sous vers votre vos notre nos elle ils " +
    "poste profil candidat candidate mission missions ans année années expérience travail équipe équipes capacité bonne " +
    "bonnes connaissance connaissances maîtrise requis souhaité souhaitée atout niveau minimum etc mise place recherchons recherche nos notre sein afin"
  ).split(" "),
)

/** Multi-word terms that must be matched as a whole. */
const PHRASES = [
  "machine learning",
  "deep learning",
  "project management",
  "gestion de projet",
  "data science",
  "data analysis",
  "analyse de données",
  "suivi-évaluation",
  "suivi et évaluation",
  "monitoring and evaluation",
  "power bi",
  "spring boot",
  "next.js",
  "react native",
  "ci/cd",
  "design system",
  "system design",
  "distributed systems",
  "systèmes distribués",
  "mobile money",
  "change management",
  "renforcement des capacités",
  "capacity building",
  "base de données",
  "prompt engineering",
  "large language models",
  "tableaux de bord",
  "tableau de bord",
  "protection des données",
  "data protection",
  "transformation digitale",
  "transformation numérique",
  "digital transformation",
  "systèmes d'information",
  "information management",
  "gestion de l'information",
  "kobo toolbox",
]

function normalize(text: string) {
  return text.toLowerCase().normalize("NFKC").replace(/’/g, "'")
}

export type MatchResult = { score: number; matched: string[]; missing: string[] }

export function extractKeywords(offer: string, limit = 28): string[] {
  const text = normalize(offer)
  const found = new Map<string, number>()

  for (const phrase of PHRASES) {
    const count = text.split(phrase).length - 1
    if (count) found.set(phrase, count * 3)
  }

  const words = text.replace(/\b[a-z]'/g, " ").match(/[a-zà-ÿ0-9+#./-]{3,}/g) ?? []
  for (const raw of words) {
    const word = raw.replace(/^[./-]+|[./-]+$/g, "")
    if (word.length < 3 || STOPWORDS.has(word) || /^\d+$/.test(word)) continue
    if (PHRASES.some((p) => p.includes(word) && found.has(p))) continue
    found.set(word, (found.get(word) ?? 0) + 1)
  }

  return [...found.entries()]
    .sort((a, b) => b[1] - a[1] || b[0].length - a[0].length)
    .slice(0, limit)
    .map(([word]) => word)
}

export function matchOffer(doc: CvDoc, offer: string): MatchResult {
  const keywords = extractKeywords(offer)
  const cv = normalize(cvToText(doc))
  const matched = keywords.filter((k) => cv.includes(k))
  const missing = keywords.filter((k) => !cv.includes(k))
  return { score: keywords.length ? Math.round((matched.length / keywords.length) * 100) : 0, matched, missing }
}
