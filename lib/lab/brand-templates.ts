import { escapeXml as x } from "@/lib/kit/download"
import { mix, readableOn, scale } from "./color"

/**
 * Marketplace & social templates, generated as standalone SVG strings so the
 * same markup drives the preview, the SVG download and the PNG export.
 */

export type IconStyle = "monogram" | "cards" | "shield" | "zap" | "chip" | "diamond" | "rocket" | "store" | "flame"

export type Brand = {
  name: string
  tagline: string
  handle: string
  cta: string
  promo: string
  promoLabel: string
  product: string
  price: string
  oldPrice: string
  logo: string | null
  iconStyle?: IconStyle
  primary: string
  secondary: string
  accent: string
  dark: string
  light: string
  radius: "sharp" | "soft" | "round"
  font: "sans" | "serif" | "rounded"
  theme: "light" | "dark"
  background: "gradient" | "solid" | "duotone"
  pattern: "dots" | "grid" | "diagonal" | "none"
}

export type TemplateGroup = "marketplace" | "social" | "print" | "digital"
export type Template = { id: string; group: TemplateGroup; w: number; h: number; render: (b: Brand) => string }

const FONTS = {
  sans: "Inter, 'Segoe UI', Helvetica, Arial, sans-serif",
  serif: "Georgia, 'Times New Roman', serif",
  rounded: "'Trebuchet MS', 'Segoe UI', Verdana, sans-serif",
}

function r(b: Brand, size: number) {
  return b.radius === "sharp" ? size * 0.02 : b.radius === "soft" ? size * 0.06 : size * 0.14
}

function initials(name: string) {
  return (
    name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase())
      .join("") || "B"
  )
}

function renderIconGlyph(icon: IconStyle, cx: number, cy: number, size: number, fg: string, accent: string) {
  const s = size * 0.55
  switch (icon) {
    case "cards":
      return `
        <g transform="translate(${cx}, ${cy})">
          <rect x="${-s * 0.4}" y="${-s * 0.45}" width="${s * 0.8}" height="${s * 0.55}" rx="${s * 0.08}" fill="${accent}" transform="rotate(-12)" opacity="0.9"/>
          <rect x="${-s * 0.45}" y="${-s * 0.2}" width="${s * 0.9}" height="${s * 0.58}" rx="${s * 0.09}" fill="${fg}"/>
          <rect x="${-s * 0.45}" y="${-s * 0.05}" width="${s * 0.9}" height="${s * 0.12}" fill="${accent}" opacity="0.8"/>
          <circle cx="${-s * 0.22}" cy="${s * 0.22}" r="${s * 0.07}" fill="${accent}"/>
          <circle cx="${-s * 0.1}" cy="${s * 0.22}" r="${s * 0.07}" fill="${fg}" opacity="0.6"/>
        </g>`
    case "shield":
      return `
        <g transform="translate(${cx}, ${cy})">
          <path d="M0 ${-s * 0.45} C${s * 0.4} ${-s * 0.45}, ${s * 0.45} ${-s * 0.2}, ${s * 0.45} 0 C${s * 0.45} ${s * 0.3}, ${s * 0.2} ${s * 0.48}, 0 ${s * 0.55} C${-s * 0.2} ${s * 0.48}, ${-s * 0.45} ${s * 0.3}, ${-s * 0.45} 0 C${-s * 0.45} ${-s * 0.2}, ${-s * 0.4} ${-s * 0.45}, 0 ${-s * 0.45} Z" fill="${fg}"/>
          <path d="M${-s * 0.18} 0 L${-s * 0.04} ${s * 0.14} L${s * 0.2} ${-s * 0.15}" fill="none" stroke="${accent}" stroke-width="${s * 0.09}" stroke-linecap="round" stroke-linejoin="round"/>
        </g>`
    case "zap":
      return `
        <g transform="translate(${cx}, ${cy})">
          <polygon points="${-s * 0.1},${-s * 0.48} ${s * 0.35},${-s * 0.48} ${0},${-s * 0.05} ${s * 0.38},${-s * 0.05} ${-s * 0.35},${s * 0.48} ${-s * 0.02},${s * 0.1} ${-s * 0.38},${s * 0.1}" fill="${accent}" stroke="${fg}" stroke-width="${s * 0.04}" stroke-linejoin="round"/>
        </g>`
    case "chip":
      return `
        <g transform="translate(${cx}, ${cy})">
          <rect x="${-s * 0.32}" y="${-s * 0.32}" width="${s * 0.64}" height="${s * 0.64}" rx="${s * 0.08}" fill="${fg}"/>
          <rect x="${-s * 0.18}" y="${-s * 0.18}" width="${s * 0.36}" height="${s * 0.36}" rx="${s * 0.04}" fill="${accent}"/>
          <line x1="${-s * 0.48}" y1="${-s * 0.16}" x2="${-s * 0.32}" y2="${-s * 0.16}" stroke="${accent}" stroke-width="${s * 0.05}" stroke-linecap="round"/>
          <line x1="${-s * 0.48}" y1="${s * 0.16}" x2="${-s * 0.32}" y2="${s * 0.16}" stroke="${accent}" stroke-width="${s * 0.05}" stroke-linecap="round"/>
          <line x1="${s * 0.32}" y1="${-s * 0.16}" x2="${s * 0.48}" y2="${-s * 0.16}" stroke="${accent}" stroke-width="${s * 0.05}" stroke-linecap="round"/>
          <line x1="${s * 0.32}" y1="${s * 0.16}" x2="${s * 0.48}" y2="${s * 0.16}" stroke="${accent}" stroke-width="${s * 0.05}" stroke-linecap="round"/>
          <line x1="${-s * 0.16}" y1="${-s * 0.48}" x2="${-s * 0.16}" y2="${-s * 0.32}" stroke="${accent}" stroke-width="${s * 0.05}" stroke-linecap="round"/>
          <line x1="${s * 0.16}" y1="${-s * 0.48}" x2="${s * 0.16}" y2="${-s * 0.32}" stroke="${accent}" stroke-width="${s * 0.05}" stroke-linecap="round"/>
          <line x1="${-s * 0.16}" y1="${s * 0.32}" x2="${-s * 0.16}" y2="${s * 0.48}" stroke="${accent}" stroke-width="${s * 0.05}" stroke-linecap="round"/>
          <line x1="${s * 0.16}" y1="${s * 0.32}" x2="${s * 0.16}" y2="${s * 0.48}" stroke="${accent}" stroke-width="${s * 0.05}" stroke-linecap="round"/>
        </g>`
    case "diamond":
      return `
        <g transform="translate(${cx}, ${cy})">
          <polygon points="0,${-s * 0.45} ${s * 0.45},${-s * 0.12} ${s * 0.32},${s * 0.42} ${-s * 0.32},${s * 0.42} ${-s * 0.45},${-s * 0.12}" fill="${fg}"/>
          <polygon points="0,${-s * 0.45} ${s * 0.18},${-s * 0.12} 0,${s * 0.42} ${-s * 0.18},${-s * 0.12}" fill="${accent}" opacity="0.85"/>
          <line x1="${-s * 0.45}" y1="${-s * 0.12}" x2="${s * 0.45}" y2="${-s * 0.12}" stroke="#ffffff" stroke-width="${s * 0.03}" opacity="0.6"/>
        </g>`
    case "rocket":
      return `
        <g transform="translate(${cx}, ${cy})">
          <path d="M0 ${-s * 0.48} C${s * 0.22} ${-s * 0.3}, ${s * 0.26} ${s * 0.1}, ${s * 0.18} ${s * 0.32} L${-s * 0.18} ${s * 0.32} C${-s * 0.26} ${s * 0.1}, ${-s * 0.22} ${-s * 0.3}, 0 ${-s * 0.48} Z" fill="${fg}"/>
          <circle cx="0" cy="${-s * 0.12}" r="${s * 0.1}" fill="${accent}"/>
          <path d="M${-s * 0.16} ${s * 0.15} L${-s * 0.4} ${s * 0.36} L${-s * 0.16} ${s * 0.32} Z" fill="${accent}"/>
          <path d="M${s * 0.16} ${s * 0.15} L${s * 0.4} ${s * 0.36} L${s * 0.16} ${s * 0.32} Z" fill="${accent}"/>
          <polygon points="${-s * 0.08},${s * 0.34} ${s * 0.08},${s * 0.34} 0,${s * 0.52}" fill="#f5a524"/>
        </g>`
    case "store":
      return `
        <g transform="translate(${cx}, ${cy})">
          <path d="M${-s * 0.4} ${-s * 0.15} L${-s * 0.32} ${-s * 0.42} L${s * 0.32} ${-s * 0.42} L${s * 0.4} ${-s * 0.15} Z" fill="${accent}"/>
          <rect x="${-s * 0.35}" y="${-s * 0.15}" width="${s * 0.7}" height="${s * 0.55}" rx="${s * 0.04}" fill="${fg}"/>
          <rect x="${-s * 0.12}" y="${s * 0.05}" width="${s * 0.24}" height="${s * 0.35}" fill="${accent}" opacity="0.9"/>
          <rect x="${-s * 0.28}" y="${-s * 0.06}" width="${s * 0.12}" height="${s * 0.16}" rx="${s * 0.02}" fill="#ffffff" opacity="0.6"/>
          <rect x="${s * 0.16}" y="${-s * 0.06}" width="${s * 0.12}" height="${s * 0.16}" rx="${s * 0.02}" fill="#ffffff" opacity="0.6"/>
        </g>`
    case "flame":
      return `
        <g transform="translate(${cx}, ${cy})">
          <path d="M0 ${-s * 0.48} C${s * 0.32} ${-s * 0.15}, ${s * 0.42} ${s * 0.15}, ${s * 0.32} ${s * 0.35} C${s * 0.18} ${s * 0.52}, ${-s * 0.18} ${s * 0.52}, ${-s * 0.32} ${s * 0.35} C${-s * 0.45} ${s * 0.12}, ${-s * 0.28} ${-s * 0.1}, ${-s * 0.12} ${-s * 0.22} C${-s * 0.05} ${-s * 0.32}, ${-s * 0.08} ${-s * 0.42}, 0 ${-s * 0.48} Z" fill="${accent}"/>
          <path d="M0 ${-s * 0.15} C${s * 0.16} 0, ${s * 0.2} ${s * 0.18}, ${s * 0.14} ${s * 0.3} C${s * 0.08} ${s * 0.4}, ${-s * 0.08} ${s * 0.4}, ${-s * 0.14} ${s * 0.3} C${-s * 0.2} ${s * 0.18}, ${-s * 0.12} ${-s * 0.02}, 0 ${-s * 0.15} Z" fill="${fg}"/>
        </g>`
    default:
      return ""
  }
}

/** The logo inside a box, an icon glyph, or a monogram when no logo was uploaded. */
function logo(b: Brand, cx: number, cy: number, size: number, opts: { plate?: boolean; plateColor?: string } = {}) {
  const half = size / 2
  const plate = opts.plate
    ? `<rect x="${cx - half}" y="${cy - half}" width="${size}" height="${size}" rx="${r(b, size) * 2.2}" fill="${opts.plateColor ?? "#ffffff"}"/>`
    : ""
  if (b.logo) {
    const pad = opts.plate ? size * 0.16 : 0
    return `${plate}<image href="${b.logo}" x="${cx - half + pad}" y="${cy - half + pad}" width="${size - pad * 2}" height="${size - pad * 2}" preserveAspectRatio="xMidYMid meet"/>`
  }
  const bg = opts.plate ? opts.plateColor ?? "#ffffff" : b.primary
  const fg = opts.plate ? b.primary : readableOn(b.primary)
  const plateBg = `<rect x="${cx - half}" y="${cy - half}" width="${size}" height="${size}" rx="${r(b, size) * 2.2}" fill="${bg}"/>`

  if (b.iconStyle && b.iconStyle !== "monogram") {
    return `${plate}${plateBg}${renderIconGlyph(b.iconStyle, cx, cy, size, fg, b.accent)}`
  }

  return `${plate}${plateBg}<text x="${cx}" y="${cy}" dy="0.35em" text-anchor="middle" font-family="${FONTS[b.font]}" font-weight="800" font-size="${size * 0.42}" fill="${fg}">${x(initials(b.name))}</text>`
}

/** Brand fill (`url(#g)`): smooth gradient, flat colour or hard two-tone split. */
function fillDefs(b: Brand) {
  if (b.background === "solid") return `<linearGradient id="g"><stop offset="0" stop-color="${b.primary}"/><stop offset="1" stop-color="${b.primary}"/></linearGradient>`
  if (b.background === "duotone")
    return `<linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0.5" stop-color="${b.primary}"/><stop offset="0.5" stop-color="${b.secondary}"/></linearGradient>`
  return `<linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${b.primary}"/><stop offset="1" stop-color="${b.secondary}"/></linearGradient>`
}

/** Texture laid over brand fills (`url(#dots)`). */
function patternDefs(b: Brand) {
  const tile = {
    dots: `<circle cx="2" cy="2" r="2" fill="#ffffff" fill-opacity="0.16"/>`,
    grid: `<path d="M28 0H0V28" fill="none" stroke="#ffffff" stroke-opacity="0.12" stroke-width="1.5"/>`,
    diagonal: `<path d="M-2 2L2 -2M0 28L28 0M26 30L30 26" stroke="#ffffff" stroke-opacity="0.12" stroke-width="2"/>`,
    none: "",
  }[b.pattern]
  return `<pattern id="dots" width="28" height="28" patternUnits="userSpaceOnUse">${tile}</pattern>`
}

function svg(w: number, h: number, b: Brand, body: string, defs = "") {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" font-family="${FONTS[b.font]}"><defs>${fillDefs(b)}${patternDefs(b)}${defs}</defs>${body}</svg>`
}

/** Greedy line wrapping (SVG has no automatic text wrap). */
function wrap(text: string, maxChars: number, maxLines = 4) {
  const lines: string[] = []
  for (const word of text.split(/\s+/)) {
    const last = lines[lines.length - 1]
    if (last && (last + " " + word).length <= maxChars) lines[lines.length - 1] = `${last} ${word}`
    else lines.push(word)
  }
  return lines.slice(0, maxLines)
}

function textBlock(lines: string[], x0: number, y0: number, size: number, lineHeight: number, attrs: string) {
  return `<text x="${x0}" y="${y0}" font-size="${size}" ${attrs}>${lines.map((l, i) => `<tspan x="${x0}" dy="${i === 0 ? 0 : size * lineHeight}">${x(l)}</tspan>`).join("")}</text>`
}

function pill(b: Brand, x0: number, y0: number, label: string, size: number, fill = b.accent) {
  const w = label.length * size * 0.62 + size * 2.2
  const h = size * 2.4
  return `<rect x="${x0}" y="${y0}" width="${w}" height="${h}" rx="${h / 2}" fill="${fill}"/><text x="${x0 + w / 2}" y="${y0 + h / 2}" dy="0.35em" text-anchor="middle" font-size="${size}" font-weight="700" fill="${readableOn(fill)}">${x(label)}</text>`
}

/** Stylised product shot: a soft blob with a highlight, tinted with the brand colours. */
function productShape(b: Brand, cx: number, cy: number, s: number) {
  const tint = scale(b.primary)
  return `<ellipse cx="${cx}" cy="${cy + s * 0.62}" rx="${s * 0.62}" ry="${s * 0.1}" fill="#000" fill-opacity="0.12"/><rect x="${cx - s * 0.42}" y="${cy - s * 0.55}" width="${s * 0.84}" height="${s * 1.1}" rx="${s * 0.18}" fill="${tint[4].hex}"/><rect x="${cx - s * 0.42}" y="${cy - s * 0.55}" width="${s * 0.84}" height="${s * 0.34}" rx="${s * 0.18}" fill="${tint[6].hex}"/><rect x="${cx - s * 0.26}" y="${cy - s * 0.02}" width="${s * 0.52}" height="${s * 0.3}" rx="${s * 0.05}" fill="#ffffff" fill-opacity="0.85"/><circle cx="${cx + s * 0.22}" cy="${cy - s * 0.3}" r="${s * 0.08}" fill="#ffffff" fill-opacity="0.5"/>`
}

export const templates: Template[] = [
  {
    id: "banner",
    group: "marketplace",
    w: 1500,
    h: 500,
    render: (b) =>
      svg(
        1500,
        500,
        b,
        `<rect width="1500" height="500" fill="url(#g)"/><rect width="1500" height="500" fill="url(#dots)"/>
<circle cx="1330" cy="80" r="260" fill="${b.accent}" fill-opacity="0.35"/><circle cx="1180" cy="520" r="200" fill="#ffffff" fill-opacity="0.08"/>
${logo(b, 190, 250, 200, { plate: true })}
<text x="340" y="215" font-size="84" font-weight="800" fill="${readableOn(b.primary)}" letter-spacing="-2">${x(b.name)}</text>
<text x="344" y="275" font-size="32" fill="${readableOn(b.primary)}" fill-opacity="0.85">${x(b.tagline)}</text>
${pill(b, 344, 318, b.cta, 26)}
<text x="1450" y="460" text-anchor="end" font-size="24" fill="${readableOn(b.secondary)}" fill-opacity="0.8">${x(b.handle)}</text>`,
      ),
  },
  {
    id: "avatar",
    group: "marketplace",
    w: 512,
    h: 512,
    render: (b) => svg(512, 512, b, `<rect width="512" height="512" fill="url(#g)"/>${logo(b, 256, 256, 300, { plate: true })}`),
  },
  {
    id: "product",
    group: "marketplace",
    w: 800,
    h: 1000,
    render: (b) => {
      const dark = b.theme === "dark"
      const bg = dark ? b.dark : "#ffffff"
      const ink = dark ? "#ffffff" : b.dark
      const soft = mix(b.primary, bg, 0.85)
      return svg(
        800,
        1000,
        b,
        `<rect width="800" height="1000" rx="${r(b, 800)}" fill="${bg}"/>
<rect x="40" y="40" width="720" height="560" rx="${r(b, 720)}" fill="${soft}"/>
${productShape(b, 400, 300, 300)}
${pill(b, 72, 72, b.promoLabel, 22)}
${logo(b, 700, 100, 72, { plate: true })}
<text x="56" y="668" font-size="26" fill="${ink}" fill-opacity="0.6">${x(b.name)}</text>
<text x="56" y="720" font-size="46" font-weight="800" fill="${ink}" letter-spacing="-1">${x(b.product)}</text>
<text x="56" y="772" font-size="26" fill="#f5a524">★★★★★</text><text x="220" y="772" font-size="24" fill="${ink}" fill-opacity="0.55">4,9 (128)</text>
<text x="56" y="850" font-size="58" font-weight="800" fill="${b.primary === bg ? b.secondary : b.primary}">${x(b.price)}</text>
<text x="${56 + b.price.length * 34}" y="850" font-size="30" fill="${ink}" fill-opacity="0.45" text-decoration="line-through">${x(b.oldPrice)}</text>
<rect x="40" y="890" width="720" height="76" rx="${Math.min(38, r(b, 720))}" fill="${b.primary}"/>
<text x="400" y="928" dy="0.35em" text-anchor="middle" font-size="30" font-weight="700" fill="${readableOn(b.primary)}">${x(b.cta)}</text>`,
      )
    },
  },
  {
    id: "promo",
    group: "marketplace",
    w: 1200,
    h: 628,
    render: (b) =>
      svg(
        1200,
        628,
        b,
        `<rect width="1200" height="628" fill="${b.dark}"/><rect x="600" width="600" height="628" fill="url(#g)"/><rect x="600" width="600" height="628" fill="url(#dots)"/>
${productShape(b, 900, 300, 300)}
${logo(b, 110, 100, 90)}
<text x="70" y="250" font-size="30" font-weight="700" fill="${b.accent}" letter-spacing="4">${x(b.promoLabel.toUpperCase())}</text>
<text x="64" y="400" font-size="170" font-weight="800" fill="#ffffff" letter-spacing="-6">${x(b.promo)}</text>
<text x="70" y="460" font-size="30" fill="#ffffff" fill-opacity="0.75">${x(b.tagline)}</text>
${pill(b, 70, 500, b.cta, 26)}`,
      ),
  },
  {
    id: "post",
    group: "social",
    w: 1080,
    h: 1080,
    render: (b) =>
      svg(
        1080,
        1080,
        b,
        `<rect width="1080" height="1080" fill="url(#g)"/><rect width="1080" height="1080" fill="url(#dots)"/>
<circle cx="900" cy="180" r="240" fill="${b.accent}" fill-opacity="0.45"/>
${logo(b, 150, 150, 130, { plate: true })}
${textBlock(wrap(b.tagline, 17), 90, 470, 96, 1.05, `font-weight="800" letter-spacing="-3" fill="${readableOn(b.primary)}"`)}
${pill(b, 90, 870, b.cta, 32, "#ffffff")}
<text x="990" y="1000" text-anchor="end" font-size="30" fill="${readableOn(b.secondary)}" fill-opacity="0.85">${x(b.handle)}</text>`,
      ),
  },
  {
    id: "story",
    group: "social",
    w: 1080,
    h: 1920,
    render: (b) =>
      svg(
        1080,
        1920,
        b,
        `<rect width="1080" height="1920" fill="url(#g)"/><rect width="1080" height="1920" fill="url(#dots)"/>
${logo(b, 540, 230, 170, { plate: true })}
<text x="540" y="400" text-anchor="middle" font-size="54" font-weight="800" fill="${readableOn(b.primary)}">${x(b.name)}</text>
<circle cx="540" cy="900" r="330" fill="#ffffff" fill-opacity="0.14"/>
${productShape(b, 540, 880, 420)}
<circle cx="820" cy="640" r="130" fill="${b.accent}"/><text x="820" y="640" dy="0.35em" text-anchor="middle" font-size="70" font-weight="800" fill="${readableOn(b.accent)}">${x(b.promo)}</text>
<text x="540" y="1420" text-anchor="middle" font-size="64" font-weight="800" fill="${readableOn(b.primary)}">${x(b.product)}</text>
<text x="540" y="1500" text-anchor="middle" font-size="36" fill="${readableOn(b.primary)}" fill-opacity="0.8">${x(b.tagline)}</text>
<rect x="240" y="1640" width="600" height="110" rx="55" fill="#ffffff"/><text x="540" y="1695" dy="0.35em" text-anchor="middle" font-size="40" font-weight="800" fill="${b.primary}">${x(b.cta)} ↑</text>`,
      ),
  },
  {
    id: "sticker",
    group: "marketplace",
    w: 600,
    h: 600,
    render: (b) => {
      const points = Array.from({ length: 48 }, (_, i) => {
        const a = (i / 48) * Math.PI * 2
        const rr = i % 2 ? 268 : 290
        return `${300 + Math.cos(a) * rr},${300 + Math.sin(a) * rr}`
      }).join(" ")
      return svg(
        600,
        600,
        b,
        `<polygon points="${points}" fill="${b.accent}"/><circle cx="300" cy="300" r="222" fill="none" stroke="#ffffff" stroke-opacity="0.7" stroke-width="6" stroke-dasharray="4 14" stroke-linecap="round"/>
<text x="300" y="245" text-anchor="middle" font-size="40" font-weight="700" fill="${readableOn(b.accent)}">${x(b.promoLabel)}</text>
<text x="300" y="360" text-anchor="middle" font-size="150" font-weight="800" letter-spacing="-5" fill="${readableOn(b.accent)}">${x(b.promo)}</text>`,
      )
    },
  },
  {
    id: "icon",
    group: "digital",
    w: 1024,
    h: 1024,
    render: (b) => svg(1024, 1024, b, `<rect width="1024" height="1024" rx="230" fill="url(#g)"/>${logo(b, 512, 512, 600)}`),
  },
  {
    id: "email",
    group: "digital",
    w: 1200,
    h: 300,
    render: (b) =>
      svg(
        1200,
        300,
        b,
        `<rect width="1200" height="300" fill="url(#g)"/><rect width="1200" height="300" fill="url(#dots)"/>${logo(b, 110, 150, 120, { plate: true })}
<text x="200" y="140" font-size="52" font-weight="800" fill="${readableOn(b.primary)}">${x(b.name)}</text><text x="202" y="190" font-size="26" fill="${readableOn(b.primary)}" fill-opacity="0.8">${x(b.tagline)}</text>
${pill(b, 900, 118, b.cta, 22)}`,
      ),
  },
  {
    id: "card",
    group: "print",
    w: 1050,
    h: 600,
    render: (b) =>
      svg(
        1050,
        600,
        b,
        `<rect width="1050" height="600" rx="${r(b, 1050)}" fill="${b.dark}"/><rect x="700" width="350" height="600" fill="url(#g)"/>
${logo(b, 875, 300, 190, { plate: true })}
<text x="80" y="250" font-size="64" font-weight="800" fill="#ffffff" letter-spacing="-1">${x(b.name)}</text>
<text x="82" y="305" font-size="28" fill="#ffffff" fill-opacity="0.7">${x(b.tagline)}</text>
<rect x="82" y="360" width="80" height="6" rx="3" fill="${b.accent}"/>
<text x="82" y="450" font-size="28" fill="#ffffff" fill-opacity="0.85">${x(b.handle)}</text>`,
      ),
  },
  {
    id: "listing",
    group: "marketplace",
    w: 1000,
    h: 1000,
    // Marketplaces (Jumia, Amazon, Shopify…) expect the product on a pure white background.
    render: (b) =>
      svg(
        1000,
        1000,
        b,
        `<rect width="1000" height="1000" fill="#ffffff"/>${productShape(b, 500, 470, 520)}${logo(b, 900, 100, 90)}
<circle cx="170" cy="170" r="92" fill="${b.accent}"/><text x="170" y="170" dy="0.35em" text-anchor="middle" font-size="54" font-weight="800" fill="${readableOn(b.accent)}">${x(b.promo)}</text>`,
      ),
  },
  {
    id: "portrait",
    group: "social",
    w: 1080,
    h: 1350,
    render: (b) =>
      svg(
        1080,
        1350,
        b,
        `<rect width="1080" height="1350" fill="url(#g)"/><rect width="1080" height="1350" fill="url(#dots)"/>
${logo(b, 140, 140, 120, { plate: true })}
<text x="990" y="150" text-anchor="end" font-size="34" font-weight="700" fill="${readableOn(b.primary)}">${x(b.name)}</text>
<rect x="90" y="260" width="900" height="640" rx="${r(b, 900)}" fill="#ffffff" fill-opacity="0.14"/>
${productShape(b, 540, 560, 440)}
${pill(b, 120, 290, b.promoLabel, 28)}
${textBlock(wrap(b.product, 22, 2), 90, 1010, 76, 1.05, `font-weight="800" letter-spacing="-2" fill="${readableOn(b.primary)}"`)}
<text x="90" y="1210" font-size="64" font-weight="800" fill="${readableOn(b.primary)}">${x(b.price)}</text>
${pill(b, 700, 1160, b.cta, 30, "#ffffff")}`,
      ),
  },
  {
    id: "cover",
    group: "social",
    w: 1640,
    h: 624,
    render: (b) =>
      svg(
        1640,
        624,
        b,
        `<rect width="1640" height="624" fill="url(#g)"/><rect width="1640" height="624" fill="url(#dots)"/>
<circle cx="1420" cy="120" r="300" fill="${b.accent}" fill-opacity="0.3"/>
${productShape(b, 1320, 330, 330)}
<text x="120" y="270" font-size="96" font-weight="800" letter-spacing="-3" fill="${readableOn(b.primary)}">${x(b.name)}</text>
<text x="124" y="340" font-size="38" fill="${readableOn(b.primary)}" fill-opacity="0.85">${x(b.tagline)}</text>
${pill(b, 124, 390, b.cta, 30)}
<text x="124" y="560" font-size="28" fill="${readableOn(b.primary)}" fill-opacity="0.75">${x(b.handle)}</text>`,
      ),
  },
  {
    id: "flyer",
    group: "print",
    w: 1240,
    h: 1754,
    // A5 at 150 dpi, ready for a local print shop.
    render: (b) =>
      svg(
        1240,
        1754,
        b,
        `<rect width="1240" height="1754" fill="${b.light}"/>
<rect width="1240" height="820" fill="url(#g)"/><rect width="1240" height="820" fill="url(#dots)"/>
${logo(b, 160, 160, 150, { plate: true })}
<text x="270" y="150" font-size="60" font-weight="800" fill="${readableOn(b.primary)}">${x(b.name)}</text>
<text x="272" y="200" font-size="30" fill="${readableOn(b.primary)}" fill-opacity="0.85">${x(b.tagline)}</text>
${productShape(b, 620, 560, 420)}
<circle cx="980" cy="400" r="150" fill="${b.accent}"/><text x="980" y="370" text-anchor="middle" font-size="36" font-weight="700" fill="${readableOn(b.accent)}">${x(b.promoLabel)}</text><text x="980" y="455" text-anchor="middle" font-size="96" font-weight="800" fill="${readableOn(b.accent)}">${x(b.promo)}</text>
${textBlock(wrap(b.product, 24, 2), 100, 980, 84, 1.05, `font-weight="800" letter-spacing="-2" fill="${b.dark}"`)}
<text x="100" y="1210" font-size="80" font-weight="800" fill="${b.primary}">${x(b.price)}</text>
<text x="${110 + b.price.length * 46}" y="1210" font-size="44" fill="${b.dark}" fill-opacity="0.45" text-decoration="line-through">${x(b.oldPrice)}</text>
<rect x="100" y="1300" width="1040" height="130" rx="${Math.min(65, r(b, 1040))}" fill="${b.primary}"/><text x="620" y="1365" dy="0.35em" text-anchor="middle" font-size="46" font-weight="800" fill="${readableOn(b.primary)}">${x(b.cta)}</text>
<text x="620" y="1580" text-anchor="middle" font-size="36" fill="${b.dark}" fill-opacity="0.7">${x(b.handle)}</text>`,
      ),
  },
  {
    id: "brochureBifold",
    group: "print",
    w: 1600,
    h: 1000,
    render: (b) =>
      svg(
        1600,
        1000,
        b,
        `<rect width="1600" height="1000" fill="${b.light}"/>
<rect width="560" height="1000" fill="url(#g)"/><rect width="560" height="1000" fill="url(#dots)"/>
${logo(b, 140, 140, 130, { plate: true })}
<text x="230" y="135" font-size="48" font-weight="800" fill="${readableOn(b.primary)}">${x(b.name)}</text>
<text x="232" y="175" font-size="24" fill="${readableOn(b.primary)}" fill-opacity="0.85">${x(b.tagline)}</text>

<rect x="60" y="270" width="440" height="42" rx="21" fill="${b.accent}"/>
<text x="280" y="296" text-anchor="middle" font-size="18" font-weight="800" fill="${readableOn(b.accent)}">RAPPORT CORPORATE &amp; OFFRE</text>

<text x="60" y="380" font-size="38" font-weight="800" fill="${readableOn(b.primary)}">L'Excellence</text>
<text x="60" y="425" font-size="38" font-weight="800" fill="${b.accent}">au Service du Futur</text>
<text x="60" y="480" font-size="20" fill="${readableOn(b.primary)}" fill-opacity="0.8">Solutions innovantes et robustes conçues</text>
<text x="60" y="510" font-size="20" fill="${readableOn(b.primary)}" fill-opacity="0.8">pour accélérer votre transformation.</text>

<rect x="60" y="570" width="440" height="170" rx="${r(b, 440)}" fill="#ffffff" fill-opacity="0.12"/>
<text x="90" y="620" font-size="24" font-weight="700" fill="${readableOn(b.primary)}">Produit phare</text>
<text x="90" y="660" font-size="32" font-weight="800" fill="${b.accent}">${x(b.product)}</text>
<text x="90" y="700" font-size="26" font-weight="700" fill="${readableOn(b.primary)}">${x(b.price)}</text>

<line x1="60" y1="810" x2="500" y2="810" stroke="#ffffff" stroke-opacity="0.25" stroke-width="1.5"/>
<text x="60" y="860" font-size="22" font-weight="700" fill="${b.accent}">${x(b.handle)}</text>
<text x="60" y="900" font-size="18" fill="${readableOn(b.primary)}" fill-opacity="0.75">Contact direct : contact@${x(b.name.toLowerCase().replace(/\s+/g, ""))}.com</text>

<text x="640" y="110" font-size="44" font-weight="800" fill="${b.dark}">Performance &amp; Solutions Clés</text>
<text x="640" y="150" font-size="22" fill="${b.dark}" fill-opacity="0.6">Une infrastructure de nouvelle génération taillée pour le succès.</text>

<rect x="640" y="200" width="280" height="140" rx="${r(b, 280)}" fill="#ffffff" stroke="${b.primary}" stroke-opacity="0.2" stroke-width="1.5"/>
<text x="780" y="260" text-anchor="middle" font-size="44" font-weight="800" fill="${b.primary}">&lt; 1s</text>
<text x="780" y="300" text-anchor="middle" font-size="18" font-weight="600" fill="${b.dark}" fill-opacity="0.7">Vitesse d'Exécution</text>

<rect x="950" y="200" width="280" height="140" rx="${r(b, 280)}" fill="#ffffff" stroke="${b.primary}" stroke-opacity="0.2" stroke-width="1.5"/>
<text x="1090" y="260" text-anchor="middle" font-size="44" font-weight="800" fill="${b.secondary}">99.9%</text>
<text x="1090" y="300" text-anchor="middle" font-size="18" font-weight="600" fill="${b.dark}" fill-opacity="0.7">Disponibilité Cloud</text>

<rect x="1260" y="200" width="280" height="140" rx="${r(b, 280)}" fill="#ffffff" stroke="${b.primary}" stroke-opacity="0.2" stroke-width="1.5"/>
<text x="1400" y="260" text-anchor="middle" font-size="44" font-weight="800" fill="${b.accent}">0%</text>
<text x="1400" y="300" text-anchor="middle" font-size="18" font-weight="600" fill="${b.dark}" fill-opacity="0.7">Frais Cachés</text>

<rect x="640" y="380" width="900" height="90" rx="${r(b, 900)}" fill="#ffffff" stroke="${b.dark}" stroke-opacity="0.08"/>
<circle cx="690" cy="425" r="22" fill="${b.primary}"/><text x="690" y="432" text-anchor="middle" font-size="18" font-weight="800" fill="${readableOn(b.primary)}">01</text>
<text x="735" y="433" font-size="22" font-weight="700" fill="${b.dark}">Sécurité matérielle et chiffrement de bout en bout</text>

<rect x="640" y="490" width="900" height="90" rx="${r(b, 900)}" fill="#ffffff" stroke="${b.dark}" stroke-opacity="0.08"/>
<circle cx="690" cy="535" r="22" fill="${b.secondary}"/><text x="690" y="542" text-anchor="middle" font-size="18" font-weight="800" fill="${readableOn(b.secondary)}">02</text>
<text x="735" y="543" font-size="22" font-weight="700" fill="${b.dark}">Synchronisation multi-plateforme en temps réel</text>

<rect x="640" y="600" width="900" height="90" rx="${r(b, 900)}" fill="#ffffff" stroke="${b.dark}" stroke-opacity="0.08"/>
<circle cx="690" cy="645" r="22" fill="${b.accent}"/><text x="690" y="652" text-anchor="middle" font-size="18" font-weight="800" fill="${readableOn(b.accent)}">03</text>
<text x="735" y="653" font-size="22" font-weight="700" fill="${b.dark}">Support d'excellence et accompagnement dédié 24/7</text>

<rect x="640" y="730" width="900" height="190" rx="${r(b, 900)}" fill="${b.dark}"/>
<text x="700" y="805" font-size="34" font-weight="800" fill="#ffffff">Rejoignez l'écosystème ${x(b.name)}</text>
<text x="700" y="850" font-size="22" fill="#ffffff" fill-opacity="0.75">Profitez de ${x(b.promo)} avec le code spécial "${x(b.promoLabel)}"</text>
<rect x="1220" y="780" width="280" height="80" rx="${Math.min(40, r(b, 280))}" fill="${b.accent}"/>
<text x="1360" y="828" text-anchor="middle" font-size="24" font-weight="800" fill="${readableOn(b.accent)}">${x(b.cta)} →</text>`,
      ),
  },
  {
    id: "brochureTrifold",
    group: "print",
    w: 2100,
    h: 1000,
    render: (b) =>
      svg(
        2100,
        1000,
        b,
        `<rect width="2100" height="1000" fill="${b.light}"/>
<line x1="700" y1="0" x2="700" y2="1000" stroke="${b.dark}" stroke-opacity="0.12" stroke-dasharray="8 8" stroke-width="2"/>
<line x1="1400" y1="0" x2="1400" y2="1000" stroke="${b.dark}" stroke-opacity="0.12" stroke-dasharray="8 8" stroke-width="2"/>

<!-- Volet 1 (Gauche) -->
<rect width="700" height="240" fill="url(#g)"/><rect width="700" height="240" fill="url(#dots)"/>
${logo(b, 120, 120, 110, { plate: true })}
<text x="200" y="115" font-size="40" font-weight="800" fill="${readableOn(b.primary)}">${x(b.name)}</text>
<text x="202" y="155" font-size="22" fill="${readableOn(b.primary)}" fill-opacity="0.85">${x(b.tagline)}</text>

<text x="60" y="320" font-size="32" font-weight="800" fill="${b.dark}">Notre Mission</text>
<text x="60" y="370" font-size="20" fill="${b.dark}" fill-opacity="0.75">Développer des solutions d'exception</text>
<text x="60" y="402" font-size="20" fill="${b.dark}" fill-opacity="0.75">qui allient performance, esthétique</text>
<text x="60" y="434" font-size="20" fill="${b.dark}" fill-opacity="0.75">et fiabilité industrielle au quotidien.</text>

<rect x="60" y="500" width="580" height="180" rx="${r(b, 580)}" fill="#ffffff" stroke="${b.dark}" stroke-opacity="0.08"/>
<circle cx="120" cy="560" r="32" fill="${b.accent}"/>
<text x="120" y="568" text-anchor="middle" font-size="26" font-weight="800" fill="${readableOn(b.accent)}">★</text>
<text x="180" y="555" font-size="24" font-weight="700" fill="${b.dark}">Confiance &amp; Qualité</text>
<text x="180" y="590" font-size="18" fill="${b.dark}" fill-opacity="0.65">Adopté par plus de 50 000 utilisateurs</text>
<text x="180" y="620" font-size="18" fill="${b.dark}" fill-opacity="0.65">dans toute la région et à l'international.</text>

<rect x="60" y="730" width="580" height="190" rx="${r(b, 580)}" fill="${b.dark}"/>
<text x="100" y="790" font-size="24" font-weight="700" fill="${b.accent}">Garantie Sérénité</text>
<text x="100" y="830" font-size="18" fill="#ffffff" fill-opacity="0.8">Support premium 7j/7 et mises à jour continues incluses.</text>
<text x="100" y="875" font-size="22" font-weight="800" fill="#ffffff">${x(b.handle)}</text>

<!-- Volet 2 (Centre) -->
<rect x="700" y="0" width="700" height="1000" fill="#ffffff"/>
<rect x="760" y="60" width="180" height="38" rx="19" fill="${b.primary}"/>
<text x="850" y="84" text-anchor="middle" font-size="16" font-weight="800" fill="${readableOn(b.primary)}">${x(b.promoLabel.toUpperCase())}</text>

<text x="760" y="150" font-size="42" font-weight="800" fill="${b.dark}">L'Offre Vedette</text>
<text x="760" y="195" font-size="28" font-weight="700" fill="${b.primary}">${x(b.product)}</text>

<rect x="760" y="230" width="580" height="320" rx="${r(b, 580)}" fill="url(#g)"/><rect x="760" y="230" width="580" height="320" fill="url(#dots)"/>
${productShape(b, 1050, 390, 260)}
<circle cx="1250" cy="300" r="60" fill="${b.accent}"/>
<text x="1250" y="295" text-anchor="middle" font-size="18" font-weight="700" fill="${readableOn(b.accent)}">PROMO</text>
<text x="1250" y="325" text-anchor="middle" font-size="34" font-weight="800" fill="${readableOn(b.accent)}">${x(b.promo)}</text>

<text x="760" y="610" font-size="52" font-weight="800" fill="${b.primary}">${x(b.price)}</text>
<text x="${770 + b.price.length * 30}" y="610" font-size="32" fill="${b.dark}" fill-opacity="0.45" text-decoration="line-through">${x(b.oldPrice)}</text>

<line x1="760" y1="660" x2="1340" y2="660" stroke="${b.dark}" stroke-opacity="0.1" stroke-width="1.5"/>

<text x="760" y="720" font-size="22" font-weight="700" fill="${b.dark}">✓ Interface intuitive &amp; moderne</text>
<text x="760" y="765" font-size="22" font-weight="700" fill="${b.dark}">✓ Déploiement instantané sans friction</text>
<text x="760" y="810" font-size="22" font-weight="700" fill="${b.dark}">✓ Zéro frais sur vos premiers essais</text>

<rect x="760" y="860" width="580" height="80" rx="${Math.min(40, r(b, 580))}" fill="${b.primary}"/>
<text x="1050" y="908" text-anchor="middle" font-size="26" font-weight="800" fill="${readableOn(b.primary)}">${x(b.cta)} maintenant</text>

<!-- Volet 3 (Droite) -->
<rect x="1400" width="700" height="1000" fill="${b.dark}"/>
<circle cx="1950" cy="150" r="280" fill="${b.primary}" fill-opacity="0.25"/>

${logo(b, 1500, 120, 120, { plate: true })}
<text x="1460" y="260" font-size="44" font-weight="800" fill="#ffffff">Passez à l'action</text>
<text x="1460" y="305" font-size="24" fill="${b.accent}">avec ${x(b.name)}</text>

<text x="1460" y="370" font-size="20" fill="#ffffff" fill-opacity="0.8">Contactez nos conseillers ou scannez</text>
<text x="1460" y="402" font-size="20" fill="#ffffff" fill-opacity="0.8">pour tester immédiatement l'outil.</text>

<rect x="1460" y="460" width="220" height="220" rx="${r(b, 220)}" fill="#ffffff"/>
<rect x="1485" y="485" width="60" height="60" fill="${b.dark}"/>
<rect x="1595" y="485" width="60" height="60" fill="${b.dark}"/>
<rect x="1485" y="595" width="60" height="60" fill="${b.dark}"/>
<rect x="1575" y="575" width="80" height="80" fill="${b.primary}"/>
<text x="1570" y="720" text-anchor="middle" font-size="16" font-weight="700" fill="#ffffff" fill-opacity="0.7">SCANNER POUR TESTER</text>

<line x1="1460" y1="760" x2="2000" y2="760" stroke="#ffffff" stroke-opacity="0.15" stroke-width="1.5"/>

<text x="1460" y="810" font-size="24" font-weight="700" fill="${b.accent}">Site &amp; Réseaux</text>
<text x="1460" y="850" font-size="20" fill="#ffffff">${x(b.handle)}</text>
<text x="1460" y="885" font-size="18" fill="#ffffff" fill-opacity="0.7">Discuter avec un expert : +243 990 000 000</text>

<rect x="1460" y="915" width="540" height="55" rx="27" fill="${b.accent}"/>
<text x="1730" y="949" text-anchor="middle" font-size="20" font-weight="800" fill="${readableOn(b.accent)}">${x(b.cta)} →</text>`,
      ),
  },
  {
    id: "flyerModern",
    group: "print",
    w: 1240,
    h: 1754,
    render: (b) =>
      svg(
        1240,
        1754,
        b,
        `<rect width="1240" height="1754" fill="${b.dark}"/>
<circle cx="200" cy="200" r="450" fill="${b.primary}" fill-opacity="0.35"/>
<circle cx="1040" cy="900" r="500" fill="${b.accent}" fill-opacity="0.22"/>

${logo(b, 160, 140, 140, { plate: true })}
<rect x="270" y="90" width="200" height="40" rx="20" fill="${b.accent}"/>
<text x="370" y="115" text-anchor="middle" font-size="18" font-weight="800" fill="${readableOn(b.accent)}">${x(b.promoLabel.toUpperCase())}</text>
<text x="270" y="180" font-size="52" font-weight="800" fill="#ffffff">${x(b.name)}</text>

<text x="100" y="320" font-size="74" font-weight="800" fill="#ffffff" letter-spacing="-2">RÉINVENTEZ</text>
<text x="100" y="400" font-size="74" font-weight="800" fill="${b.accent}" letter-spacing="-2">VOS RÉSULTATS.</text>
<text x="100" y="460" font-size="28" fill="#ffffff" fill-opacity="0.8">${x(b.tagline)}</text>

<rect x="100" y="520" width="1040" height="480" rx="${r(b, 1040)}" fill="url(#g)" stroke="#ffffff" stroke-opacity="0.15" stroke-width="2"/>
<rect x="100" y="520" width="1040" height="480" fill="url(#dots)"/>
${productShape(b, 620, 750, 420)}
<circle cx="1020" cy="620" r="100" fill="${b.accent}"/>
<text x="1020" y="605" text-anchor="middle" font-size="24" font-weight="800" fill="${readableOn(b.accent)}">ÉCONOMISEZ</text>
<text x="1020" y="650" text-anchor="middle" font-size="52" font-weight="800" fill="${readableOn(b.accent)}">${x(b.promo)}</text>

<rect x="100" y="1040" width="1040" height="110" rx="${r(b, 1040)}" fill="#ffffff" fill-opacity="0.06" stroke="#ffffff" stroke-opacity="0.12"/>
<circle cx="170" cy="1095" r="30" fill="${b.primary}"/><text x="170" y="1104" text-anchor="middle" font-size="22" font-weight="800" fill="${readableOn(b.primary)}">1</text>
<text x="230" y="1102" font-size="28" font-weight="700" fill="#ffffff">Technologie propriétaire haute vitesse</text>

<rect x="100" y="1170" width="1040" height="110" rx="${r(b, 1040)}" fill="#ffffff" fill-opacity="0.06" stroke="#ffffff" stroke-opacity="0.12"/>
<circle cx="170" cy="1225" r="30" fill="${b.secondary}"/><text x="170" y="1234" text-anchor="middle" font-size="22" font-weight="800" fill="${readableOn(b.secondary)}">2</text>
<text x="230" y="1232" font-size="28" font-weight="700" fill="#ffffff">Architecture ultra sécurisée et certifiée</text>

<rect x="100" y="1300" width="1040" height="110" rx="${r(b, 1040)}" fill="#ffffff" fill-opacity="0.06" stroke="#ffffff" stroke-opacity="0.12"/>
<circle cx="170" cy="1355" r="30" fill="${b.accent}"/><text x="170" y="1364" text-anchor="middle" font-size="22" font-weight="800" fill="${readableOn(b.accent)}">3</text>
<text x="230" y="1362" font-size="28" font-weight="700" fill="#ffffff">Déploiement immédiat en moins de 5 minutes</text>

<text x="100" y="1480" font-size="64" font-weight="800" fill="${b.accent}">${x(b.price)}</text>
<text x="${120 + b.price.length * 36}" y="1480" font-size="38" fill="#ffffff" fill-opacity="0.45" text-decoration="line-through">${x(b.oldPrice)}</text>

<rect x="100" y="1530" width="1040" height="120" rx="${Math.min(60, r(b, 1040))}" fill="${b.accent}"/>
<text x="620" y="1600" text-anchor="middle" font-size="40" font-weight="800" fill="${readableOn(b.accent)}">${x(b.cta)} →</text>
<text x="620" y="1700" text-anchor="middle" font-size="26" fill="#ffffff" fill-opacity="0.7">${x(b.handle)}</text>`,
      ),
  },
  {
    id: "rollup",
    group: "print",
    w: 900,
    h: 2000,
    render: (b) =>
      svg(
        900,
        2000,
        b,
        `<rect width="900" height="2000" fill="${b.dark}"/>
<circle cx="450" cy="300" r="400" fill="${b.primary}" fill-opacity="0.4"/>
<circle cx="450" cy="1200" r="500" fill="${b.accent}" fill-opacity="0.2"/>

${logo(b, 450, 220, 220, { plate: true })}
<text x="450" y="380" text-anchor="middle" font-size="64" font-weight="800" fill="#ffffff" letter-spacing="-2">${x(b.name)}</text>
<text x="450" y="440" text-anchor="middle" font-size="32" fill="${b.accent}" font-weight="700">${x(b.tagline)}</text>

<line x1="150" y1="500" x2="750" y2="500" stroke="#ffffff" stroke-opacity="0.2" stroke-width="2"/>

<text x="450" y="600" text-anchor="middle" font-size="52" font-weight="800" fill="#ffffff">INNOVEZ SANS LIMITE</text>
<text x="450" y="660" text-anchor="middle" font-size="30" fill="#ffffff" fill-opacity="0.8">La plateforme de référence</text>

<rect x="120" y="730" width="660" height="500" rx="${r(b, 660)}" fill="url(#g)" stroke="#ffffff" stroke-opacity="0.15" stroke-width="2"/>
<rect x="120" y="730" width="660" height="500" fill="url(#dots)"/>
${productShape(b, 450, 980, 420)}

<rect x="250" y="1280" width="400" height="60" rx="30" fill="${b.accent}"/>
<text x="450" y="1320" text-anchor="middle" font-size="28" font-weight="800" fill="${readableOn(b.accent)}">${x(b.promo)} DE REMISE</text>

<text x="450" y="1430" text-anchor="middle" font-size="36" font-weight="700" fill="#ffffff">✓ Démonstration en direct au stand</text>
<text x="450" y="1500" text-anchor="middle" font-size="36" font-weight="700" fill="#ffffff">✓ Compatible mobile, cloud &amp; API</text>
<text x="450" y="1570" text-anchor="middle" font-size="36" font-weight="700" fill="#ffffff">✓ Mise en place en moins de 24h</text>

<rect x="150" y="1670" width="600" height="110" rx="55" fill="${b.accent}"/>
<text x="450" y="1735" text-anchor="middle" font-size="36" font-weight="800" fill="${readableOn(b.accent)}">${x(b.cta)} ICI</text>

<text x="450" y="1850" text-anchor="middle" font-size="38" font-weight="800" fill="#ffffff">${x(b.handle)}</text>
<text x="450" y="1910" text-anchor="middle" font-size="24" fill="#ffffff" fill-opacity="0.6">Scannez le code au stand ou visitez notre site</text>`,
      ),
  },
  {
    id: "billboard",
    group: "marketplace",
    w: 1920,
    h: 800,
    render: (b) =>
      svg(
        1920,
        800,
        b,
        `<rect width="1920" height="800" fill="${b.dark}"/>
<rect x="1100" width="820" height="800" fill="url(#g)"/><rect x="1100" width="820" height="800" fill="url(#dots)"/>
<circle cx="1600" cy="200" r="380" fill="${b.accent}" fill-opacity="0.3"/>

${logo(b, 180, 160, 160, { plate: true })}
<text x="300" y="155" font-size="64" font-weight="800" fill="#ffffff">${x(b.name)}</text>
<text x="302" y="210" font-size="32" fill="${b.accent}" font-weight="700">${x(b.tagline)}</text>

<text x="100" y="360" font-size="96" font-weight="800" fill="#ffffff" letter-spacing="-3">CHANGEZ DE</text>
<text x="100" y="460" font-size="96" font-weight="800" fill="${b.accent}" letter-spacing="-3">DIMENSION.</text>

<text x="100" y="550" font-size="34" fill="#ffffff" fill-opacity="0.85">${x(b.product)} à seulement <tspan font-weight="800" fill="#ffffff">${x(b.price)}</tspan></text>

<rect x="100" y="620" width="460" height="100" rx="50" fill="${b.accent}"/>
<text x="330" y="682" text-anchor="middle" font-size="36" font-weight="800" fill="${readableOn(b.accent)}">${x(b.cta)} MAINTENANT →</text>
<text x="610" y="685" font-size="36" font-weight="700" fill="#ffffff">${x(b.handle)}</text>

${productShape(b, 1510, 430, 480)}
<rect x="1160" y="100" width="240" height="60" rx="30" fill="${b.accent}"/>
<text x="1280" y="140" text-anchor="middle" font-size="28" font-weight="800" fill="${readableOn(b.accent)}">${x(b.promo)} FLASH</text>`,
      ),
  },
  {
    id: "logoHorizontal",
    group: "digital",
    w: 1200,
    h: 400,
    render: (b) => {
      const dark = b.theme === "dark"
      const bg = dark ? b.dark : "#ffffff"
      const fg = dark ? "#ffffff" : b.dark
      return svg(
        1200,
        400,
        b,
        `<rect width="1200" height="400" rx="${r(b, 400)}" fill="${bg}"/>
${logo(b, 200, 200, 220, { plate: true })}
<text x="360" y="195" font-size="110" font-weight="800" fill="${fg}" letter-spacing="-3">${x(b.name)}</text>
<text x="${380 + b.name.length * 56}" y="195" font-size="110" font-weight="300" fill="${b.primary}">${x(b.tagline)}</text>
<text x="365" y="270" font-size="28" font-weight="700" fill="${b.accent}" letter-spacing="4">${x(b.promoLabel.toUpperCase())} · SOLUTIONS OFFICIELLES</text>`,
      )
    },
  },
  {
    id: "logoEmblem",
    group: "digital",
    w: 1000,
    h: 1000,
    render: (b) =>
      svg(
        1000,
        1000,
        b,
        `<rect width="1000" height="1000" rx="230" fill="url(#g)"/>
<rect width="1000" height="1000" rx="230" fill="url(#dots)"/>
<circle cx="500" cy="460" r="320" fill="#ffffff" fill-opacity="0.12"/>
<circle cx="500" cy="460" r="310" fill="none" stroke="${b.accent}" stroke-width="4" stroke-dasharray="8 12"/>
${logo(b, 500, 460, 420, { plate: true })}
<text x="500" y="810" text-anchor="middle" font-size="78" font-weight="800" fill="${readableOn(b.primary)}" letter-spacing="-2">${x(b.name)}</text>
<text x="500" y="870" text-anchor="middle" font-size="32" font-weight="600" fill="${b.accent}">${x(b.tagline)}</text>
<text x="500" y="920" text-anchor="middle" font-size="22" fill="${readableOn(b.primary)}" fill-opacity="0.7">${x(b.handle)}</text>`,
      ),
  },
]

/** One-page brand sheet: logo, palette with codes and type sample. */
export function brandSheet(b: Brand, labels: { palette: string; typography: string }) {
  const colors = [
    ["Primary", b.primary],
    ["Secondary", b.secondary],
    ["Accent", b.accent],
    ["Dark", b.dark],
    ["Light", b.light],
  ]
  const swatches = colors
    .map(
      ([name, hex], i) =>
        `<rect x="${80 + i * 290}" y="470" width="260" height="200" rx="${r(b, 260)}" fill="${hex}" stroke="#00000014"/><text x="${100 + i * 290}" y="640" font-size="26" font-weight="700" fill="${readableOn(hex)}">${name}</text><text x="${80 + i * 290}" y="712" font-family="monospace" font-size="24" fill="#333">${hex.toUpperCase()}</text>`,
    )
    .join("")
  const ramp = scale(b.primary)
    .map((s, i) => `<rect x="${80 + i * 131}" y="760" width="131" height="60" fill="${s.hex}"/><text x="${145 + i * 131}" y="848" text-anchor="middle" font-family="monospace" font-size="18" fill="#555">${s.step}</text>`)
    .join("")
  return svg(
    1600,
    1000,
    b,
    `<rect width="1600" height="1000" fill="#ffffff"/><rect width="1600" height="380" fill="url(#g)"/>
${logo(b, 200, 190, 220, { plate: true })}
<text x="360" y="185" font-size="90" font-weight="800" fill="${readableOn(b.primary)}" letter-spacing="-3">${x(b.name)}</text>
<text x="364" y="250" font-size="34" fill="${readableOn(b.primary)}" fill-opacity="0.85">${x(b.tagline)}</text>
<text x="80" y="440" font-size="22" font-weight="700" fill="#888" letter-spacing="4">${x(labels.palette.toUpperCase())}</text>
${swatches}${ramp}
<text x="80" y="920" font-size="22" font-weight="700" fill="#888" letter-spacing="4">${x(labels.typography.toUpperCase())}</text>
<text x="420" y="925" font-size="46" font-weight="800" fill="${b.dark}">Aa Bb Cc 123 — ${x(b.name)}</text>`,
  )
}
