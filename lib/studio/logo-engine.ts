import { escapeXml as x, mulberry32 } from "@/lib/kit/download"
import { contrast, hexToOklch, mix, oklchToHex, readableOn } from "@/lib/lab/color"
import { fontStack, getFont, nearestWeight, type FontRequest, type StudioFont } from "./fonts"
import { getMark } from "./marks"
import { recolorMarkup } from "./svg-import"

/**
 * Logo engine: one editable `LogoConfig` → a tight, standalone SVG.
 * Colours are stored as palette *roles* so swapping the brand palette restyles
 * every element coherently.
 */

export type Palette = { primary: string; secondary: string; accent: string; ink: string; paper: string }
export type ColorRole = keyof Palette | "white"
export type IconRef =
  | { type: "mark"; id: string }
  | { type: "lucide"; name: string; markup: string }
  | { type: "upload"; name: string; markup: string; viewBox: [number, number, number, number]; recolor: boolean }

export type Layout = "horizontal" | "stacked" | "wordmark" | "emblem"
export type Container = "none" | "circle" | "squircle" | "rounded" | "square" | "hexagon" | "shield" | "diamond" | "blob"
export type ContainerStyle = "solid" | "gradient" | "outline" | "soft"
export type TextCase = "none" | "upper" | "lower" | "title"
export type Decoration = "none" | "dot" | "underline" | "divider"

export type LogoConfig = {
  name: string
  tagline: string
  showTagline: boolean
  icon: IconRef
  symbol: "icon" | "initials"
  initials: string
  layout: Layout
  container: Container
  containerStyle: ContainerStyle
  symbolScale: number
  iconScale: number
  rotate: number
  strokeWidth: number
  gap: number
  font: string
  weight: number
  tracking: number
  textCase: TextCase
  taglineFont: string
  taglineWeight: number
  taglineTracking: number
  taglineCase: TextCase
  taglineScale: number
  decoration: Decoration
  palette: Palette
  roles: { symbol: ColorRole; container: ColorRole; name: ColorRole; tagline: ColorRole; accent: ColorRole; background: ColorRole | "transparent" }
}

export type Version = "color" | "dark" | "mono" | "white"
export type Part = "full" | "symbol" | "text"
export type Measure = (text: string, font: StudioFont, weight: number, size: number, tracking: number) => number
export type RenderOptions = { measure: Measure; part?: Part; version?: Version; background?: boolean; fontCss?: string; idPrefix?: string; height?: number }
export type RenderedLogo = { svg: string; w: number; h: number }

export const PALETTES: ({ name: string } & Palette)[] = [
  { name: "Kivu", primary: "#0f7a5c", secondary: "#0b3b5b", accent: "#f5a524", ink: "#0f172a", paper: "#f8fafc" },
  { name: "Congo", primary: "#007fff", secondary: "#0047ab", accent: "#f7d618", ink: "#0b1530", paper: "#f5f8ff" },
  { name: "Royal", primary: "#5a4bd6", secondary: "#2b2170", accent: "#22d3ee", ink: "#111027", paper: "#f6f5ff" },
  { name: "Sunset", primary: "#e4572e", secondary: "#a4243b", accent: "#ffc914", ink: "#1f1300", paper: "#fff8f0" },
  { name: "Ocean", primary: "#0e7490", secondary: "#164e63", accent: "#fb923c", ink: "#082f3a", paper: "#f0fbff" },
  { name: "Mint", primary: "#10b981", secondary: "#047857", accent: "#f472b6", ink: "#052e22", paper: "#f0fdf8" },
  { name: "Coffee", primary: "#6f4e37", secondary: "#3b2a20", accent: "#e8b04b", ink: "#1c140f", paper: "#fbf6ef" },
  { name: "Noir", primary: "#111827", secondary: "#374151", accent: "#ef4444", ink: "#030712", paper: "#f9fafb" },
  { name: "Gold", primary: "#b8860b", secondary: "#1a1a1a", accent: "#f5deb3", ink: "#141210", paper: "#fffdf7" },
  { name: "Berry", primary: "#be185d", secondary: "#701a75", accent: "#fbbf24", ink: "#1e0a16", paper: "#fff5fa" },
  { name: "Forest", primary: "#166534", secondary: "#14532d", accent: "#a3e635", ink: "#0a1f12", paper: "#f6fdf4" },
  { name: "Sky", primary: "#0284c7", secondary: "#1e3a8a", accent: "#38bdf8", ink: "#0c1a2e", paper: "#f4faff" },
  { name: "Coral", primary: "#f43f5e", secondary: "#9f1239", accent: "#fde047", ink: "#1f0a0f", paper: "#fff6f7" },
  { name: "Lagoon", primary: "#14b8a6", secondary: "#0f766e", accent: "#6366f1", ink: "#062421", paper: "#f2fdfb" },
  { name: "Terra", primary: "#c2410c", secondary: "#7c2d12", accent: "#facc15", ink: "#1c0d05", paper: "#fff8f2" },
  { name: "Mono", primary: "#18181b", secondary: "#52525b", accent: "#a1a1aa", ink: "#09090b", paper: "#fafafa" },
]

/** Derives secondary / accent / neutrals from a primary colour (OKLCH, so lightness stays even). */
export function harmonizePalette(primary: string): Palette {
  const lch = hexToOklch(primary)
  return {
    primary,
    secondary: oklchToHex({ l: Math.max(0.24, lch.l - 0.2), c: lch.c * 0.9, h: (lch.h + 25) % 360 }),
    accent: oklchToHex({ l: 0.8, c: Math.max(0.12, lch.c), h: (lch.h + 180) % 360 }),
    ink: oklchToHex({ l: 0.2, c: Math.min(lch.c, 0.04), h: lch.h }),
    paper: oklchToHex({ l: 0.985, c: 0.008, h: lch.h }),
  }
}

export const DEFAULT_LOGO: LogoConfig = {
  name: "Soside",
  tagline: "Tech & Solutions",
  showTagline: true,
  icon: { type: "mark", id: "orbit" },
  symbol: "icon",
  initials: "",
  layout: "horizontal",
  container: "squircle",
  containerStyle: "gradient",
  symbolScale: 1,
  iconScale: 1,
  rotate: 0,
  strokeWidth: 2,
  gap: 1,
  font: "sora",
  weight: 700,
  tracking: -0.02,
  textCase: "none",
  taglineFont: "inter",
  taglineWeight: 500,
  taglineTracking: 0.18,
  taglineCase: "upper",
  taglineScale: 0.3,
  decoration: "none",
  palette: { ...PALETTES[2] },
  roles: { symbol: "white", container: "primary", name: "ink", tagline: "secondary", accent: "accent", background: "paper" },
}

export function applyCase(text: string, mode: TextCase) {
  if (mode === "upper") return text.toUpperCase()
  if (mode === "lower") return text.toLowerCase()
  if (mode === "title") return text.replace(/\S+/g, (w) => w[0].toUpperCase() + w.slice(1).toLowerCase())
  return text
}

export function autoInitials(name: string) {
  const words = name.trim().split(/\s+/).filter(Boolean)
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase()
  return (words[0]?.slice(0, 1) ?? "B").toUpperCase()
}

type Colors = { symbol: string; accent: string; container: string; name: string; tagline: string; background: string | null; paper: string }

function resolveColors(cfg: LogoConfig, version: Version): Colors {
  const p = cfg.palette
  const role = (r: ColorRole) => (r === "white" ? "#ffffff" : p[r])
  let c: Colors = {
    symbol: role(cfg.roles.symbol),
    accent: role(cfg.roles.accent),
    container: role(cfg.roles.container),
    name: role(cfg.roles.name),
    tagline: role(cfg.roles.tagline),
    background: cfg.roles.background === "transparent" ? null : role(cfg.roles.background),
    paper: p.paper,
  }
  if (version === "dark") {
    const lift = (hex: string) => (contrast(hex, p.ink) < 3 ? (contrast(p.paper, p.ink) > 4 ? p.paper : "#ffffff") : hex)
    c = { ...c, background: p.ink, paper: p.ink, name: lift(c.name), tagline: lift(c.tagline), container: contrast(c.container, p.ink) < 1.6 ? p.paper : c.container }
    if (cfg.containerStyle === "outline" || cfg.containerStyle === "soft" || cfg.container === "none") c.symbol = lift(c.symbol)
  } else if (version === "mono") {
    c = { symbol: p.paper, accent: p.ink, container: p.ink, name: p.ink, tagline: p.ink, background: "#ffffff", paper: "#ffffff" }
    if (cfg.containerStyle === "outline" || cfg.containerStyle === "soft" || cfg.container === "none") c.symbol = p.ink
  } else if (version === "white") {
    c = { symbol: p.primary, accent: "#ffffff", container: "#ffffff", name: "#ffffff", tagline: "#ffffff", background: p.primary, paper: p.primary }
    if (cfg.containerStyle === "outline" || cfg.containerStyle === "soft" || cfg.container === "none") c.symbol = "#ffffff"
  }
  return c
}

/** Unit-square container shapes centred on 0,0 (drawn with `scale(size)`). */
export function containerPath(kind: Container): string {
  switch (kind) {
    case "circle":
      return `<circle r="0.5"/>`
    case "rounded":
      return `<rect x="-0.5" y="-0.5" width="1" height="1" rx="0.24"/>`
    case "square":
      return `<rect x="-0.5" y="-0.5" width="1" height="1" rx="0.06"/>`
    case "hexagon":
      return `<polygon points="${Array.from({ length: 6 }, (_, i) => {
        const a = ((i * 60 - 90) * Math.PI) / 180
        return `${(Math.cos(a) * 0.52).toFixed(4)},${(Math.sin(a) * 0.52).toFixed(4)}`
      }).join(" ")}"/>`
    case "shield":
      return `<path d="M0 -0.5L0.44 -0.36V0.02C0.44 0.28 0.24 0.44 0 0.52C-0.24 0.44 -0.44 0.28 -0.44 0.02V-0.36Z"/>`
    case "diamond":
      return `<rect x="-0.4" y="-0.4" width="0.8" height="0.8" rx="0.12" transform="rotate(45)"/>`
    case "blob":
      return `<path d="M0.04 -0.48C0.32 -0.5 0.5 -0.26 0.48 0.04C0.46 0.3 0.24 0.5 -0.04 0.48C-0.32 0.46 -0.5 0.24 -0.48 -0.04C-0.46 -0.3 -0.26 -0.46 0.04 -0.48Z"/>`
    case "squircle": {
      const pts = Array.from({ length: 72 }, (_, i) => {
        const t = (i / 72) * Math.PI * 2
        const c = Math.cos(t)
        const s = Math.sin(t)
        return `${(Math.sign(c) * Math.abs(c) ** 0.4 * 0.5).toFixed(4)},${(Math.sign(s) * Math.abs(s) ** 0.4 * 0.5).toFixed(4)}`
      })
      return `<polygon points="${pts.join(" ")}"/>`
    }
    default:
      return ""
  }
}

type Box = { x0: number; y0: number; x1: number; y1: number }
const grow = (b: Box, x0: number, y0: number, x1: number, y1: number): Box => ({ x0: Math.min(b.x0, x0), y0: Math.min(b.y0, y0), x1: Math.max(b.x1, x1), y1: Math.max(b.y1, y1) })

const F = 100 // name font size: every dimension is relative to it

export function renderLogo(cfg: LogoConfig, opts: RenderOptions): RenderedLogo {
  const { measure, part = "full", version = "color" } = opts
  const pid = opts.idPrefix ?? "lg"
  const col = resolveColors(cfg, version)
  const nameFont = getFont(cfg.font)
  const tagFont = getFont(cfg.taglineFont)
  const nameWeight = nearestWeight(nameFont, cfg.weight)
  const tagWeight = nearestWeight(tagFont, cfg.taglineWeight)
  const name = applyCase(cfg.name.trim() || "Brand", cfg.textCase)
  const tagline = applyCase(cfg.tagline.trim(), cfg.taglineCase)
  const showTag = cfg.showTagline && !!tagline && cfg.layout !== "emblem"
  const tagSize = F * cfg.taglineScale
  const capN = F * nameFont.cap
  const capT = tagSize * tagFont.cap
  const defs: string[] = []
  let body = ""
  let box: Box = { x0: Infinity, y0: Infinity, x1: -Infinity, y1: -Infinity }

  const widthOf = (text: string, font: StudioFont, weight: number, size: number, tracking: number) =>
    Math.max(0, measure(text, font, weight, size, tracking) - tracking * size) // drop the trailing letter-space

  const nameW = widthOf(name, nameFont, nameWeight, F, cfg.tracking)
  const tagW = showTag ? widthOf(tagline, tagFont, tagWeight, tagSize, cfg.taglineTracking) : 0

  const textEl = (text: string, xPos: number, baseline: number, anchor: "start" | "middle", font: StudioFont, weight: number, size: number, tracking: number, fill: string, extra = "") =>
    `<text x="${(anchor === "middle" ? xPos + (tracking * size) / 2 : xPos).toFixed(2)}" y="${baseline.toFixed(2)}" text-anchor="${anchor}" font-family="${x(fontStack(font)).replace(/&apos;/g, "'")}" font-weight="${weight}" font-size="${size.toFixed(2)}" letter-spacing="${(tracking * size).toFixed(2)}" fill="${fill}"${extra}>${x(text)}</text>`

  /** Symbol (container + glyph) centred on cx, cy, `s` wide. */
  const symbol = (cx: number, cy: number, s: number) => {
    const hasBox = cfg.container !== "none"
    const style = cfg.containerStyle
    let out = ""
    let surface = col.background ?? col.paper
    if (hasBox) {
      const shape = containerPath(cfg.container)
      if (style === "gradient") {
        defs.push(
          `<linearGradient id="${pid}-grad" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${mix(col.container, "#ffffff", 0.12)}"/><stop offset="1" stop-color="${version === "color" ? mix(col.container, cfg.palette.secondary, 0.65) : col.container}"/></linearGradient>`,
        )
      }
      const paint =
        style === "solid"
          ? `fill="${col.container}"`
          : style === "gradient"
            ? `fill="url(#${pid}-grad)"`
            : style === "soft"
              ? `fill="${mix(col.container, col.paper, 0.84)}"`
              : `fill="none" stroke="${col.container}" stroke-width="0.055"`
      out += `<g transform="translate(${cx.toFixed(2)} ${cy.toFixed(2)}) scale(${s.toFixed(2)})" ${paint}>${shape}</g>`
      surface = style === "solid" || style === "gradient" ? col.container : style === "soft" ? mix(col.container, col.paper, 0.84) : surface
    }
    // Keep the glyph legible whatever the user picked.
    let glyph = col.symbol
    if (contrast(glyph, surface) < 1.8) glyph = hasBox && (style === "solid" || style === "gradient") ? readableOn(surface) : contrast(col.container, surface) >= 1.8 ? col.container : readableOn(surface)
    const accent = contrast(col.accent, surface) < 1.4 ? mix(glyph, surface, 0.35) : col.accent
    const g = hasBox ? s * 0.6 * cfg.iconScale : s * cfg.iconScale
    out += bareGlyph(cfg, glyph, accent, cx, cy, g, nameFont, nameWeight)
    return out
  }

  const decoration = (xEnd: number, baseline: number, xStart: number) => {
    if (cfg.decoration === "dot") {
      const r = F * 0.09
      box = grow(box, xEnd, baseline - 2 * r, xEnd + F * 0.08 + 2 * r, baseline)
      return `<circle cx="${(xEnd + F * 0.08 + r).toFixed(2)}" cy="${(baseline - r).toFixed(2)}" r="${r.toFixed(2)}" fill="${col.accent}"/>`
    }
    if (cfg.decoration === "underline") {
      const y = baseline + F * 0.16
      box = grow(box, xStart, y, xEnd, y + F * 0.07)
      return `<rect x="${xStart.toFixed(2)}" y="${y.toFixed(2)}" width="${Math.max(F * 0.6, (xEnd - xStart) * 0.32).toFixed(2)}" height="${(F * 0.07).toFixed(2)}" rx="${(F * 0.035).toFixed(2)}" fill="${col.accent}"/>`
    }
    return ""
  }

  if (cfg.layout === "emblem") {
    const R = F * 2.1 * cfg.symbolScale
    const cx = R
    const cy = R
    const style = cfg.containerStyle
    const filled = cfg.container !== "none" && (style === "solid" || style === "gradient")
    const ringColor = filled ? readableOn(col.container) : col.container
    if (style === "gradient")
      defs.push(`<linearGradient id="${pid}-grad" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${mix(col.container, "#ffffff", 0.12)}"/><stop offset="1" stop-color="${version === "color" ? mix(col.container, cfg.palette.secondary, 0.65) : col.container}"/></linearGradient>`)
    const fillPaint = filled ? (style === "gradient" ? `url(#${pid}-grad)` : col.container) : style === "soft" ? mix(col.container, col.paper, 0.86) : "none"
    const textColor = filled ? readableOn(col.container) : col.name
    body += `<circle cx="${cx}" cy="${cy}" r="${R * 0.98}" fill="${fillPaint}" ${filled || style === "soft" ? "" : `stroke="${col.container}" stroke-width="${R * 0.04}"`}/>`
    body += `<circle cx="${cx}" cy="${cy}" r="${R * 0.66}" fill="none" stroke="${ringColor}" stroke-opacity="0.55" stroke-width="${R * 0.012}"/>`
    // Name on the top arc, tagline (or handle) on the bottom arc.
    const upper = applyCase(cfg.name.trim() || "Brand", cfg.textCase === "none" ? "upper" : cfg.textCase)
    let size = R * 0.2
    const arc = Math.PI * R * 0.76 * 0.8
    const w = widthOf(upper, nameFont, nameWeight, size, Math.max(0.08, cfg.tracking))
    if (w > arc) size *= arc / w
    const rt = R * 0.76
    defs.push(`<path id="${pid}-top" d="M${cx - rt} ${cy}A${rt} ${rt} 0 0 1 ${cx + rt} ${cy}"/>`)
    body += `<text font-family="${x(fontStack(nameFont)).replace(/&apos;/g, "'")}" font-weight="${nameWeight}" font-size="${size.toFixed(2)}" letter-spacing="${(Math.max(0.08, cfg.tracking) * size).toFixed(2)}" fill="${textColor}" text-anchor="middle"><textPath href="#${pid}-top" startOffset="50%">${x(upper)}</textPath></text>`
    if (cfg.showTagline && tagline) {
      const ts = Math.min(R * 0.11, size * 0.7)
      const rb = R * 0.76 + ts * tagFont.cap
      defs.push(`<path id="${pid}-bot" d="M${cx - rb} ${cy}A${rb} ${rb} 0 0 0 ${cx + rb} ${cy}"/>`)
      body += `<text font-family="${x(fontStack(tagFont)).replace(/&apos;/g, "'")}" font-weight="${tagWeight}" font-size="${ts.toFixed(2)}" letter-spacing="${(Math.max(0.12, cfg.taglineTracking) * ts).toFixed(2)}" fill="${textColor}" fill-opacity="0.85" text-anchor="middle"><textPath href="#${pid}-bot" startOffset="50%">${x(tagline)}</textPath></text>`
    }
    for (const side of [-1, 1]) body += `<circle cx="${cx + side * R * 0.82}" cy="${cy}" r="${R * 0.035}" fill="${filled ? readableOn(col.container) : col.accent}"/>`
    // The inner symbol sits bare inside the seal.
    const surface = filled ? col.container : style === "soft" ? mix(col.container, col.paper, 0.86) : col.background ?? col.paper
    const glyph = contrast(col.symbol, surface) < 1.8 ? (filled ? readableOn(surface) : col.container) : col.symbol
    const accent = contrast(col.accent, surface) < 1.4 || col.accent === glyph ? mix(glyph, surface, 0.35) : col.accent
    body += bareGlyph(cfg, glyph, accent, cx, cy, R * 0.62 * cfg.iconScale, nameFont, nameWeight)
    box = { x0: 0, y0: 0, x1: 2 * R, y1: 2 * R }
  } else if (part === "symbol") {
    const s = F * 1.6
    body += symbol(s / 2, s / 2, s)
    box = { x0: 0, y0: 0, x1: s, y1: s }
  } else {
    const drawSymbol = part === "full" && cfg.layout !== "wordmark"
    const nameEl = (xPos: number, baseline: number, anchor: "start" | "middle") => textEl(name, xPos, baseline, anchor, nameFont, nameWeight, F, cfg.tracking, col.name)
    const tagEl = (xPos: number, baseline: number, anchor: "start" | "middle") => textEl(tagline, xPos, baseline, anchor, tagFont, tagWeight, tagSize, cfg.taglineTracking, col.tagline)
    const underline = cfg.decoration === "underline" ? F * 0.22 : 0
    const tagGap = F * 0.3 + underline
    const blockH = showTag ? capN + tagGap + capT : capN

    if (cfg.layout === "stacked" && drawSymbol) {
      const S = F * 1.7 * cfg.symbolScale
      const width = Math.max(S, nameW, tagW)
      const cx = width / 2
      body += symbol(cx, S / 2, S)
      box = grow(box, cx - S / 2, 0, cx + S / 2, S)
      const nameBase = S + F * 0.42 * cfg.gap + capN
      body += nameEl(cx, nameBase, "middle")
      box = grow(box, cx - nameW / 2, nameBase - capN, cx + nameW / 2, nameBase + F * 0.12)
      body += decoration(cx + nameW / 2, nameBase, cx - nameW / 2)
      if (showTag) {
        const tb = nameBase + tagGap + capT
        body += tagEl(cx, tb, "middle")
        box = grow(box, cx - tagW / 2, tb - capT, cx + tagW / 2, tb + tagSize * 0.2)
      }
    } else if (cfg.layout === "stacked") {
      // Text-only part of a stacked logo: centred block.
      const width = Math.max(nameW, tagW)
      const cx = width / 2
      body += nameEl(cx, capN, "middle")
      box = grow(box, 0, 0, width, capN + F * 0.12)
      body += decoration(cx + nameW / 2, capN, cx - nameW / 2)
      if (showTag) {
        const tb = capN + tagGap + capT
        body += tagEl(cx, tb, "middle")
        box = grow(box, cx - tagW / 2, tb - capT, cx + tagW / 2, tb + tagSize * 0.2)
      }
    } else {
      const S = drawSymbol ? F * 1.35 * cfg.symbolScale : 0
      const height = Math.max(S, blockH)
      const gapX = drawSymbol ? F * 0.42 * cfg.gap : 0
      let textX = S + gapX
      if (drawSymbol) {
        body += symbol(S / 2, height / 2, S)
        box = grow(box, 0, height / 2 - S / 2, S, height / 2 + S / 2)
        if (cfg.decoration === "divider") {
          const dx = S + gapX
          body += `<rect x="${dx.toFixed(2)}" y="${(height / 2 - S * 0.36).toFixed(2)}" width="${(F * 0.045).toFixed(2)}" height="${(S * 0.72).toFixed(2)}" rx="${(F * 0.02).toFixed(2)}" fill="${col.accent}"/>`
          textX = dx + F * 0.045 + gapX
        }
      }
      const nameBase = height / 2 - blockH / 2 + capN
      body += nameEl(textX, nameBase, "start")
      box = grow(box, textX, nameBase - capN, textX + nameW, nameBase + F * 0.12)
      body += decoration(textX + nameW, nameBase, textX)
      if (showTag) {
        const tb = nameBase + tagGap + capT
        body += tagEl(textX, tb, "start")
        box = grow(box, textX, tb - capT, textX + tagW, tb + tagSize * 0.2)
      }
    }
  }

  const pad = F * 0.3
  const vx = box.x0 - pad
  const vy = box.y0 - pad
  const vw = box.x1 - box.x0 + pad * 2
  const vh = box.y1 - box.y0 + pad * 2
  const outH = opts.height ?? 400
  const outW = Math.round((vw / vh) * outH)
  const bg = opts.background && col.background ? `<rect x="${vx}" y="${vy}" width="${vw}" height="${vh}" fill="${col.background}"/>` : ""
  const style = opts.fontCss ? `<style>${opts.fontCss}</style>` : ""
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${outW}" height="${outH}" viewBox="${vx.toFixed(2)} ${vy.toFixed(2)} ${vw.toFixed(2)} ${vh.toFixed(2)}">${style || defs.length ? `<defs>${style}${defs.join("")}</defs>` : ""}${bg}${body}</svg>`
  return { svg, w: outW, h: outH }
}

/** The symbol glyph (icon, mark, upload or initials) centred on cx, cy, `g` wide. */
function bareGlyph(cfg: LogoConfig, glyph: string, accent: string, cx: number, cy: number, g: number, nameFont: StudioFont, nameWeight: number) {
  const at = `x="${(cx - g / 2).toFixed(2)}" y="${(cy - g / 2).toFixed(2)}" width="${g.toFixed(2)}" height="${g.toFixed(2)}"`
  let inner: string
  if (cfg.symbol === "initials") {
    const letters = applyCase(cfg.initials.trim() || autoInitials(cfg.name), cfg.textCase === "lower" ? "lower" : "upper").slice(0, 3)
    const size = g * (letters.length === 1 ? 0.95 : letters.length === 2 ? 0.7 : 0.52)
    inner = `<text x="${cx.toFixed(2)}" y="${(cy + (size * nameFont.cap) / 2).toFixed(2)}" text-anchor="middle" font-family="${x(fontStack(nameFont)).replace(/&apos;/g, "'")}" font-weight="${Math.max(nameWeight, nearestWeight(nameFont, 700))}" font-size="${size.toFixed(2)}" letter-spacing="${(-0.02 * size).toFixed(2)}" fill="${glyph}">${x(letters)}</text>`
  } else if (cfg.icon.type === "mark") {
    inner = `<svg ${at} viewBox="0 0 100 100" overflow="visible">${getMark(cfg.icon.id).render(glyph, accent)}</svg>`
  } else if (cfg.icon.type === "lucide") {
    inner = `<svg ${at} viewBox="0 0 24 24" fill="none" stroke="${glyph}" stroke-width="${cfg.strokeWidth}" stroke-linecap="round" stroke-linejoin="round" overflow="visible">${cfg.icon.markup}</svg>`
  } else {
    const recolor = cfg.icon.recolor
    inner = `<svg ${at} viewBox="${cfg.icon.viewBox.join(" ")}" preserveAspectRatio="xMidYMid meet"${recolor ? ` color="${glyph}" fill="currentColor"` : ""}>${recolor ? recolorMarkup(cfg.icon.markup) : cfg.icon.markup}</svg>`
  }
  return cfg.rotate ? `<g transform="rotate(${cfg.rotate} ${cx.toFixed(2)} ${cy.toFixed(2)})">${inner}</g>` : inner
}

/** Fonts (and glyph subsets) a rendered logo needs, for `fontEmbedCss`. */
export function logoFontRequests(cfg: LogoConfig): FontRequest[] {
  const nameFont = getFont(cfg.font)
  const tagFont = getFont(cfg.taglineFont)
  const name = cfg.name || "Brand"
  const initials = cfg.initials || autoInitials(cfg.name)
  const nameText = [name, name.toUpperCase(), name.toLowerCase(), applyCase(name, "title"), initials, initials.toLowerCase()].join("")
  return [
    { font: nameFont, weights: [cfg.weight, 700], text: nameText },
    { font: tagFont, weights: [cfg.taglineWeight], text: [cfg.tagline, cfg.tagline.toUpperCase(), cfg.tagline.toLowerCase(), applyCase(cfg.tagline, "title")].join("") || "a" },
  ]
}

type Recipe = Partial<Omit<LogoConfig, "roles">> & { roles?: Partial<LogoConfig["roles"]> }

/** Proven compositions; the generator samples and lightly varies them. */
const RECIPES: Recipe[] = [
  { layout: "horizontal", container: "squircle", containerStyle: "gradient", roles: { symbol: "white", container: "primary", name: "ink", tagline: "secondary" } },
  { layout: "horizontal", container: "none", roles: { symbol: "primary", accent: "accent", name: "ink", tagline: "primary" }, symbolScale: 1.1 },
  { layout: "stacked", container: "circle", containerStyle: "solid", textCase: "upper", tracking: 0.12, roles: { symbol: "white", container: "primary", name: "ink", tagline: "secondary" } },
  { layout: "horizontal", container: "rounded", containerStyle: "solid", decoration: "dot", roles: { symbol: "white", container: "primary", name: "primary", accent: "accent", tagline: "ink" } },
  { layout: "emblem", container: "circle", containerStyle: "solid", textCase: "upper", roles: { symbol: "white", container: "primary", name: "ink" } },
  { layout: "wordmark", decoration: "dot", weight: 800, tracking: -0.04, roles: { name: "ink", accent: "accent", tagline: "secondary" } },
  { layout: "horizontal", symbol: "initials", container: "square", containerStyle: "solid", decoration: "divider", roles: { symbol: "white", container: "ink", name: "ink", accent: "primary", tagline: "secondary" } },
  { layout: "stacked", container: "hexagon", containerStyle: "outline", textCase: "upper", tracking: 0.2, weight: 600, roles: { symbol: "primary", container: "primary", name: "ink", tagline: "primary" } },
  { layout: "horizontal", container: "circle", containerStyle: "soft", roles: { symbol: "primary", container: "primary", name: "secondary", tagline: "primary" } },
  { layout: "emblem", container: "circle", containerStyle: "outline", textCase: "upper", roles: { symbol: "primary", container: "ink", name: "ink", accent: "primary" } },
  { layout: "stacked", container: "none", textCase: "lower", weight: 800, symbolScale: 1.2, roles: { symbol: "primary", accent: "accent", name: "ink", tagline: "secondary" } },
  { layout: "horizontal", container: "shield", containerStyle: "solid", decoration: "underline", roles: { symbol: "accent", container: "secondary", name: "secondary", accent: "accent", tagline: "ink" } },
  { layout: "horizontal", container: "blob", containerStyle: "gradient", textCase: "title", roles: { symbol: "white", container: "primary", name: "ink", tagline: "secondary" } },
  { layout: "stacked", symbol: "initials", container: "squircle", containerStyle: "gradient", textCase: "upper", tracking: 0.08, roles: { symbol: "white", container: "primary", name: "ink", tagline: "secondary" } },
  { layout: "horizontal", container: "diamond", containerStyle: "solid", roles: { symbol: "white", container: "accent", name: "ink", tagline: "primary" } },
  { layout: "wordmark", decoration: "underline", textCase: "upper", tracking: 0.06, weight: 800, roles: { name: "primary", accent: "accent", tagline: "ink" } },
  { layout: "horizontal", container: "none", textCase: "upper", tracking: 0.1, weight: 600, decoration: "divider", roles: { symbol: "primary", accent: "accent", name: "ink", tagline: "secondary" } },
  { layout: "stacked", container: "rounded", containerStyle: "soft", weight: 700, roles: { symbol: "primary", container: "primary", name: "ink", tagline: "secondary" } },
]

/** Twelve distinct proposals built from the user's brand, icon, fonts and palette. */
export function generateProposals(base: LogoConfig, seed: number, count = 12): LogoConfig[] {
  const rand = mulberry32(seed)
  const pool = RECIPES.map((r, i) => ({ r, k: i < 6 && seed === 1 ? -1 : rand() })).sort((a, b) => a.k - b.k)
  const nameFont = getFont(base.font)
  return pool.slice(0, count).map(({ r }) => {
    const jitter = seed === 1 ? 0 : rand()
    const weight = r.weight ?? (jitter > 0.66 ? 800 : jitter > 0.33 ? 700 : 600)
    return {
      ...base,
      decoration: "none",
      textCase: "none",
      tracking: -0.02,
      symbol: "icon",
      containerStyle: "solid",
      symbolScale: 1,
      iconScale: 1,
      rotate: 0,
      gap: 1,
      ...r,
      weight: nearestWeight(nameFont, weight),
      roles: { ...base.roles, background: "paper", ...r.roles },
    } as LogoConfig
  })
}
