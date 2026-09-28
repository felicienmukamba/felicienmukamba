/**
 * Colour maths for the lab tools: hex ⇄ sRGB ⇄ OKLCH, WCAG contrast,
 * perceptual scales and harmonies. OKLCH keeps steps visually even.
 */

export type Rgb = { r: number; g: number; b: number }
export type Oklch = { l: number; c: number; h: number }

export function hexToRgb(hex: string): Rgb {
  const clean = hex.replace("#", "")
  const full = clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean.padEnd(6, "0").slice(0, 6)
  const n = parseInt(full, 16)
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 }
}

export function rgbToHex({ r, g, b }: Rgb): string {
  const to = (v: number) => Math.round(Math.min(255, Math.max(0, v))).toString(16).padStart(2, "0")
  return `#${to(r)}${to(g)}${to(b)}`
}

const toLinear = (c: number) => {
  const v = c / 255
  return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4
}
const fromLinear = (v: number) => 255 * (v <= 0.0031308 ? 12.92 * v : 1.055 * v ** (1 / 2.4) - 0.055)

export function hexToOklch(hex: string): Oklch {
  const { r, g, b } = hexToRgb(hex)
  const lr = toLinear(r)
  const lg = toLinear(g)
  const lb = toLinear(b)
  const l_ = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb)
  const m_ = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb)
  const s_ = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb)
  const L = 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_
  const A = 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_
  const B = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_
  const c = Math.sqrt(A * A + B * B)
  const h = ((Math.atan2(B, A) * 180) / Math.PI + 360) % 360
  return { l: L, c, h }
}

function oklchToLinear({ l, c, h }: Oklch) {
  const a = c * Math.cos((h * Math.PI) / 180)
  const b = c * Math.sin((h * Math.PI) / 180)
  const l_ = (l + 0.3963377774 * a + 0.2158037573 * b) ** 3
  const m_ = (l - 0.1055613458 * a - 0.0638541728 * b) ** 3
  const s_ = (l - 0.0894841775 * a - 1.291485548 * b) ** 3
  return {
    r: 4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_,
    g: -1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_,
    b: -0.0041960863 * l_ - 0.7034186147 * m_ + 1.707614701 * s_,
  }
}

const inGamut = (v: { r: number; g: number; b: number }) => [v.r, v.g, v.b].every((x) => x >= -0.0001 && x <= 1.0001)

/** Converts to hex, reducing chroma until the colour fits in sRGB. */
export function oklchToHex(color: Oklch): string {
  let c = color.c
  let lin = oklchToLinear({ ...color, c })
  while (!inGamut(lin) && c > 0) {
    c = Math.max(0, c - 0.005)
    lin = oklchToLinear({ ...color, c })
  }
  return rgbToHex({ r: fromLinear(Math.min(1, Math.max(0, lin.r))), g: fromLinear(Math.min(1, Math.max(0, lin.g))), b: fromLinear(Math.min(1, Math.max(0, lin.b))) })
}

export function luminance(hex: string) {
  const { r, g, b } = hexToRgb(hex)
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b)
}

export function contrast(a: string, b: string) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}

export function wcag(ratio: number) {
  return { aa: ratio >= 4.5, aaLarge: ratio >= 3, aaa: ratio >= 7, aaaLarge: ratio >= 4.5 }
}

/** Black or white, whichever reads better on `bg`. */
export function readableOn(bg: string) {
  return contrast(bg, "#ffffff") >= contrast(bg, "#0b0b12") ? "#ffffff" : "#0b0b12"
}

export const SCALE_STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const
const SCALE_L = [0.97, 0.935, 0.87, 0.79, 0.7, 0.62, 0.54, 0.46, 0.38, 0.3, 0.22]

/** Tailwind-style 50–950 scale that keeps the base hue and eases chroma at the ends. */
export function scale(hex: string): { step: number; hex: string }[] {
  const base = hexToOklch(hex)
  return SCALE_STEPS.map((step, i) => {
    const l = SCALE_L[i]
    const edge = Math.abs(l - 0.62) / 0.4
    return { step, hex: oklchToHex({ l, c: base.c * (1 - 0.55 * edge ** 1.6), h: base.h }) }
  })
}

export type Harmony = "complementary" | "analogous" | "triadic" | "split" | "tetradic" | "monochrome"

export function harmony(hex: string, kind: Harmony): string[] {
  const base = hexToOklch(hex)
  const rotate = (deg: number, dl = 0) => oklchToHex({ l: Math.min(0.95, Math.max(0.2, base.l + dl)), c: base.c, h: (base.h + deg + 360) % 360 })
  switch (kind) {
    case "complementary":
      return [hex, rotate(180), rotate(0, 0.2), rotate(180, -0.15), rotate(0, -0.2)]
    case "analogous":
      return [rotate(-40), rotate(-20), hex, rotate(20), rotate(40)]
    case "triadic":
      return [hex, rotate(120), rotate(240), rotate(0, 0.22), rotate(120, -0.15)]
    case "split":
      return [hex, rotate(150), rotate(210), rotate(0, 0.2), rotate(0, -0.2)]
    case "tetradic":
      return [hex, rotate(90), rotate(180), rotate(270), rotate(0, 0.2)]
    case "monochrome":
      return [rotate(0, 0.3), rotate(0, 0.15), hex, rotate(0, -0.12), rotate(0, -0.25)]
  }
}

export function mix(a: string, b: string, t: number) {
  const x = hexToRgb(a)
  const y = hexToRgb(b)
  return rgbToHex({ r: x.r + (y.r - x.r) * t, g: x.g + (y.g - x.g) * t, b: x.b + (y.b - x.b) * t })
}

/** Nudges lightness until `fg` reaches `target` contrast on `bg` (keeps hue and chroma). */
export function fixContrast(fg: string, bg: string, target = 4.5): string {
  const base = hexToOklch(fg)
  const darker = luminance(bg) > 0.4
  for (let i = 0; i <= 100; i++) {
    const l = darker ? base.l - i * 0.01 : base.l + i * 0.01
    if (l < 0 || l > 1) break
    const candidate = oklchToHex({ ...base, l })
    if (contrast(candidate, bg) >= target) return candidate
  }
  return darker ? "#000000" : "#ffffff"
}

/** Dominant, reasonably saturated colours of an image (for "extract from logo"). */
export function extractPalette(image: HTMLImageElement, count = 4): string[] {
  const size = 64
  const canvas = document.createElement("canvas")
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext("2d", { willReadFrequently: true })
  if (!ctx) return []
  ctx.drawImage(image, 0, 0, size, size)
  const { data } = ctx.getImageData(0, 0, size, size)
  const buckets = new Map<string, { n: number; r: number; g: number; b: number }>()
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] < 200) continue
    const [r, g, b] = [data[i], data[i + 1], data[i + 2]]
    const key = `${r >> 4}-${g >> 4}-${b >> 4}`
    const bucket = buckets.get(key) ?? { n: 0, r: 0, g: 0, b: 0 }
    bucket.n++
    bucket.r += r
    bucket.g += g
    bucket.b += b
    buckets.set(key, bucket)
  }
  const colors = [...buckets.values()]
    .map((b) => ({ hex: rgbToHex({ r: b.r / b.n, g: b.g / b.n, b: b.b / b.n }), n: b.n }))
    .map((c) => ({ ...c, lch: hexToOklch(c.hex) }))
    // Prefer brand colours over near-white/near-black backgrounds.
    .map((c) => ({ ...c, weight: c.n * (0.25 + c.lch.c * 6) * (c.lch.l > 0.95 || c.lch.l < 0.12 ? 0.15 : 1) }))
    .sort((a, b) => b.weight - a.weight)

  const picked: string[] = []
  for (const c of colors) {
    if (picked.every((p) => Math.abs(hexToOklch(p).h - c.lch.h) > 18 || Math.abs(hexToOklch(p).l - c.lch.l) > 0.18)) picked.push(c.hex)
    if (picked.length === count) break
  }
  return picked
}
