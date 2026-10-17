/**
 * Curated Google Fonts for the studios. Previews load the stylesheet once;
 * exports embed the font files as data URLs so SVG/PNG/video render the same
 * typography outside the page.
 */

export type FontCategory = "sans" | "geometric" | "serif" | "display" | "rounded" | "script" | "mono"

export type StudioFont = { id: string; family: string; category: FontCategory; weights: number[]; fallback: string; cap: number }

const SANS = "'Segoe UI', Helvetica, Arial, sans-serif"
const SERIF = "Georgia, 'Times New Roman', serif"

export const STUDIO_FONTS: StudioFont[] = [
  { id: "montserrat", family: "Montserrat", category: "geometric", weights: [400, 500, 600, 700, 800, 900], fallback: SANS, cap: 0.7 },
  { id: "poppins", family: "Poppins", category: "geometric", weights: [300, 400, 500, 600, 700, 800], fallback: SANS, cap: 0.7 },
  { id: "outfit", family: "Outfit", category: "geometric", weights: [300, 400, 500, 600, 700, 800], fallback: SANS, cap: 0.7 },
  { id: "sora", family: "Sora", category: "geometric", weights: [300, 400, 500, 600, 700, 800], fallback: SANS, cap: 0.72 },
  { id: "lexend", family: "Lexend", category: "geometric", weights: [300, 400, 500, 600, 700, 800], fallback: SANS, cap: 0.72 },
  { id: "unbounded", family: "Unbounded", category: "geometric", weights: [400, 500, 600, 700, 800, 900], fallback: SANS, cap: 0.74 },
  { id: "inter", family: "Inter", category: "sans", weights: [300, 400, 500, 600, 700, 800, 900], fallback: SANS, cap: 0.73 },
  { id: "manrope", family: "Manrope", category: "sans", weights: [300, 400, 500, 600, 700, 800], fallback: SANS, cap: 0.72 },
  { id: "plus-jakarta", family: "Plus Jakarta Sans", category: "sans", weights: [300, 400, 500, 600, 700, 800], fallback: SANS, cap: 0.71 },
  { id: "dm-sans", family: "DM Sans", category: "sans", weights: [400, 500, 600, 700, 800], fallback: SANS, cap: 0.7 },
  { id: "space-grotesk", family: "Space Grotesk", category: "sans", weights: [300, 400, 500, 600, 700], fallback: SANS, cap: 0.7 },
  { id: "syne", family: "Syne", category: "display", weights: [400, 500, 600, 700, 800], fallback: SANS, cap: 0.7 },
  { id: "bebas", family: "Bebas Neue", category: "display", weights: [400], fallback: "Impact, " + SANS, cap: 0.7 },
  { id: "archivo-black", family: "Archivo Black", category: "display", weights: [400], fallback: SANS, cap: 0.72 },
  { id: "orbitron", family: "Orbitron", category: "display", weights: [400, 500, 600, 700, 800, 900], fallback: SANS, cap: 0.72 },
  { id: "righteous", family: "Righteous", category: "display", weights: [400], fallback: SANS, cap: 0.7 },
  { id: "playfair", family: "Playfair Display", category: "serif", weights: [400, 500, 600, 700, 800, 900], fallback: SERIF, cap: 0.71 },
  { id: "dm-serif", family: "DM Serif Display", category: "serif", weights: [400], fallback: SERIF, cap: 0.7 },
  { id: "fraunces", family: "Fraunces", category: "serif", weights: [300, 400, 500, 600, 700, 800, 900], fallback: SERIF, cap: 0.7 },
  { id: "cormorant", family: "Cormorant Garamond", category: "serif", weights: [300, 400, 500, 600, 700], fallback: SERIF, cap: 0.63 },
  { id: "libre-baskerville", family: "Libre Baskerville", category: "serif", weights: [400, 700], fallback: SERIF, cap: 0.7 },
  { id: "nunito", family: "Nunito", category: "rounded", weights: [300, 400, 500, 600, 700, 800, 900], fallback: SANS, cap: 0.7 },
  { id: "quicksand", family: "Quicksand", category: "rounded", weights: [300, 400, 500, 600, 700], fallback: SANS, cap: 0.7 },
  { id: "comfortaa", family: "Comfortaa", category: "rounded", weights: [300, 400, 500, 600, 700], fallback: SANS, cap: 0.75 },
  { id: "pacifico", family: "Pacifico", category: "script", weights: [400], fallback: "cursive", cap: 0.78 },
  { id: "satisfy", family: "Satisfy", category: "script", weights: [400], fallback: "cursive", cap: 0.72 },
  { id: "space-mono", family: "Space Mono", category: "mono", weights: [400, 700], fallback: "monospace", cap: 0.7 },
  { id: "jetbrains", family: "JetBrains Mono", category: "mono", weights: [300, 400, 500, 600, 700, 800], fallback: "monospace", cap: 0.73 },
]

export const FONT_CATEGORIES: FontCategory[] = ["geometric", "sans", "display", "serif", "rounded", "script", "mono"]

/** Suggested headline / tagline pairings. */
export const FONT_PAIRINGS: { name: string; font: string; tagline: string }[] = [
  { name: "Tech", font: "sora", tagline: "inter" },
  { name: "Corporate", font: "montserrat", tagline: "inter" },
  { name: "Startup", font: "outfit", tagline: "dm-sans" },
  { name: "Luxe", font: "playfair", tagline: "montserrat" },
  { name: "Editorial", font: "fraunces", tagline: "manrope" },
  { name: "Impact", font: "bebas", tagline: "poppins" },
  { name: "Futur", font: "orbitron", tagline: "space-grotesk" },
  { name: "Doux", font: "nunito", tagline: "quicksand" },
  { name: "Artisan", font: "pacifico", tagline: "poppins" },
  { name: "Dev", font: "jetbrains", tagline: "space-grotesk" },
]

export function getFont(id: string): StudioFont {
  return STUDIO_FONTS.find((f) => f.id === id) ?? STUDIO_FONTS[0]
}

export function fontStack(font: StudioFont) {
  return `'${font.family}', ${font.fallback}`
}

export function nearestWeight(font: StudioFont, weight: number) {
  return font.weights.reduce((best, w) => (Math.abs(w - weight) < Math.abs(best - weight) ? w : best), font.weights[0])
}

function familyParam(font: StudioFont, weights: number[]) {
  const list = [...new Set(weights.map((w) => nearestWeight(font, w)))].sort((a, b) => a - b)
  return `family=${font.family.replace(/ /g, "+")}:wght@${list.join(";")}`
}

/** Injects one stylesheet with every studio font (files only download when a glyph is drawn). */
export function ensureStudioFonts() {
  if (typeof document === "undefined" || document.getElementById("studio-fonts")) return
  const link = document.createElement("link")
  link.id = "studio-fonts"
  link.rel = "stylesheet"
  link.href = `https://fonts.googleapis.com/css2?${STUDIO_FONTS.map((f) => familyParam(f, f.weights)).join("&")}&display=swap`
  document.head.appendChild(link)
}

/** Resolves once the given font faces are usable for canvas measurement. */
export async function loadFaces(specs: { font: StudioFont; weight: number }[]) {
  if (typeof document === "undefined" || !document.fonts) return
  await Promise.all(specs.map(({ font, weight }) => document.fonts.load(`${nearestWeight(font, weight)} 40px '${font.family}'`).catch(() => [])))
}

let measureCtx: CanvasRenderingContext2D | null = null

/** Text width in px (letter-spacing in em, applied after every glyph like SVG does). */
export function measureText(text: string, font: StudioFont, weight: number, size: number, tracking = 0) {
  if (typeof document === "undefined") return text.length * size * 0.6 + tracking * size * text.length
  measureCtx ??= document.createElement("canvas").getContext("2d")
  if (!measureCtx) return text.length * size * 0.6
  measureCtx.font = `${nearestWeight(font, weight)} ${size}px '${font.family}', ${font.fallback}`
  return measureCtx.measureText(text).width + tracking * size * text.length
}

const embedCache = new Map<string, Promise<string>>()

function toBase64(buffer: ArrayBuffer) {
  const bytes = new Uint8Array(buffer)
  let binary = ""
  for (let i = 0; i < bytes.length; i += 0x8000) binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000))
  return btoa(binary)
}

async function embedOne(font: StudioFont, weights: number[], text?: string) {
  let url = `https://fonts.googleapis.com/css2?${familyParam(font, weights)}&display=swap`
  if (text) url += `&text=${encodeURIComponent([...new Set(text)].join(""))}`
  const css = await (await fetch(url)).text()
  // Without a text subset Google returns one block per script: keep Latin only.
  const blocks = text ? css.match(/@font-face\s*{[^}]*}/g) ?? [] : css.split("/* ").filter((b) => /^latin(-ext)? \*\//.test(b)).map((b) => b.slice(b.indexOf("@font-face")))
  const out = await Promise.all(
    blocks.map(async (block) => {
      const match = block.match(/url\(([^)]+)\)\s*format\(['"]?(\w+)['"]?\)/)
      if (!match) return ""
      const buffer = await (await fetch(match[1])).arrayBuffer()
      const mime = match[2] === "woff2" ? "font/woff2" : match[2] === "woff" ? "font/woff" : "font/ttf"
      return block.replace(/src:[^;]+;/, `src: url(data:${mime};base64,${toBase64(buffer)}) format('${match[2]}');`)
    }),
  )
  return out.join("\n")
}

export type FontRequest = { font: StudioFont; weights: number[]; text?: string }

/** `@font-face` rules with the font files inlined. Fails soft (empty string) when offline. */
export async function fontEmbedCss(requests: FontRequest[]): Promise<string> {
  const merged = new Map<string, FontRequest>()
  for (const r of requests) {
    const prev = merged.get(r.font.id)
    merged.set(r.font.id, prev ? { font: r.font, weights: [...prev.weights, ...r.weights], text: prev.text !== undefined && r.text !== undefined ? prev.text + r.text : undefined } : r)
  }
  const css = await Promise.all(
    [...merged.values()].map((r) => {
      const key = `${r.font.id}|${[...new Set(r.weights)].sort().join(",")}|${r.text ? [...new Set(r.text)].sort().join("") : "*"}`
      if (!embedCache.has(key)) {
        embedCache.set(
          key,
          embedOne(r.font, r.weights, r.text).catch((err) => {
            console.warn("Font embedding failed", err)
            embedCache.delete(key)
            return ""
          }),
        )
      }
      return embedCache.get(key)!
    }),
  )
  return css.filter(Boolean).join("\n")
}
