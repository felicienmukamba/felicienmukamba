import { mulberry32 } from "@/lib/kit/download"
import { mix } from "./color"

/** Procedural SVG generators. Every output is a standalone, dependency-free SVG string. */

const round = (n: number) => Math.round(n * 10) / 10

/** Closed Catmull-Rom spline through the points, as cubic Béziers. */
function smoothClosed(points: [number, number][]) {
  const n = points.length
  let d = `M${round(points[0][0])},${round(points[0][1])}`
  for (let i = 0; i < n; i++) {
    const p0 = points[(i - 1 + n) % n]
    const p1 = points[i]
    const p2 = points[(i + 1) % n]
    const p3 = points[(i + 2) % n]
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6]
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6]
    d += ` C${round(c1[0])},${round(c1[1])} ${round(c2[0])},${round(c2[1])} ${round(p2[0])},${round(p2[1])}`
  }
  return `${d} Z`
}

/** Open spline through points (for wave tops). */
function smoothOpen(points: [number, number][]) {
  let d = `M${round(points[0][0])},${round(points[0][1])}`
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)]
    const p1 = points[i]
    const p2 = points[i + 1]
    const p3 = points[Math.min(points.length - 1, i + 2)]
    d += ` C${round(p1[0] + (p2[0] - p0[0]) / 6)},${round(p1[1] + (p2[1] - p0[1]) / 6)} ${round(p2[0] - (p3[0] - p1[0]) / 6)},${round(p2[1] - (p3[1] - p1[1]) / 6)} ${round(p2[0])},${round(p2[1])}`
  }
  return d
}

export type BlobOptions = {
  seed: number
  points: number
  randomness: number
  size: number
  colorA: string
  colorB: string
  gradient: boolean
  outline?: boolean
  /** Morphs between two shapes with SMIL — plays anywhere an SVG plays, no JavaScript. */
  animate?: boolean
}

function blobPath(seed: number, points: number, randomness: number, size: number) {
  const rand = mulberry32(seed)
  const c = size / 2
  const radius = size * 0.36
  const pts: [number, number][] = Array.from({ length: points }, (_, i) => {
    const angle = (i / points) * Math.PI * 2
    const r = radius * (1 - (randomness / 100) * 0.55 + rand() * (randomness / 100) * 0.55)
    return [c + Math.cos(angle) * r, c + Math.sin(angle) * r]
  })
  return smoothClosed(pts)
}

export function blob(o: BlobOptions) {
  const d1 = blobPath(o.seed, o.points, o.randomness, o.size)
  const fill = o.gradient ? "url(#blob-g)" : o.colorA
  const defs = o.gradient ? `<defs><linearGradient id="blob-g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${o.colorA}"/><stop offset="1" stop-color="${o.colorB}"/></linearGradient></defs>` : ""
  const paint = o.outline ? `fill="none" stroke="${fill}" stroke-width="${o.size / 60}" stroke-linejoin="round"` : `fill="${fill}"`
  const anim = o.animate
    ? `<animate attributeName="d" dur="8s" repeatCount="indefinite" calcMode="spline" keySplines="0.45 0 0.55 1;0.45 0 0.55 1" values="${d1};${blobPath(o.seed + 1, o.points, o.randomness, o.size)};${d1}"/>`
    : ""
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${o.size} ${o.size}" width="${o.size}" height="${o.size}">${defs}<path d="${d1}" ${paint}>${anim}</path></svg>`
}

export type WaveOptions = { seed: number; width: number; height: number; layers: number; amplitude: number; frequency: number; colorA: string; colorB: string; flip: boolean }

export function waves(o: WaveOptions) {
  const rand = mulberry32(o.seed)
  const paths: string[] = []
  for (let layer = 0; layer < o.layers; layer++) {
    const t = o.layers === 1 ? 1 : layer / (o.layers - 1)
    const baseY = o.height * (0.25 + 0.6 * t)
    const count = o.frequency + 1
    const pts: [number, number][] = Array.from({ length: count + 1 }, (_, i) => [
      (i / count) * o.width,
      baseY + (rand() - 0.5) * 2 * o.amplitude * (1 - t * 0.35),
    ])
    const top = smoothOpen(pts)
    paths.push(`<path d="${top} L${o.width},${o.height} L0,${o.height} Z" fill="${mix(o.colorA, o.colorB, t)}"/>`)
  }
  const transform = o.flip ? ` transform="scale(1,-1) translate(0,-${o.height})"` : ""
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${o.width} ${o.height}" width="${o.width}" height="${o.height}" preserveAspectRatio="none"><g${transform}>${paths.join("")}</g></svg>`
}

export type PatternType = "dots" | "grid" | "lines" | "zigzag" | "crosses" | "checks"
export type PatternOptions = { type: PatternType; spacing: number; stroke: number; background: string; foreground: string; opacity?: number; rotation?: number }

/** The repeating tile on its own (used for the CSS background export). */
export function patternTile(o: PatternOptions) {
  const s = o.spacing
  const w = o.stroke
  const fg = o.foreground
  const op = o.opacity ?? 1
  let body = ""
  switch (o.type) {
    case "dots":
      body = `<circle cx="${s / 2}" cy="${s / 2}" r="${w}" fill="${fg}"/>`
      break
    case "grid":
      body = `<path d="M${s} 0H0V${s}" fill="none" stroke="${fg}" stroke-width="${w}"/>`
      break
    case "lines":
      body = `<path d="M-1 1L1 -1M0 ${s}L${s} 0M${s - 1} ${s + 1}L${s + 1} ${s - 1}" stroke="${fg}" stroke-width="${w}"/>`
      break
    case "zigzag":
      body = `<path d="M0 ${s * 0.7}L${s / 2} ${s * 0.3}L${s} ${s * 0.7}" fill="none" stroke="${fg}" stroke-width="${w}" stroke-linejoin="round"/>`
      break
    case "crosses":
      body = `<path d="M${s / 2} ${s * 0.3}V${s * 0.7}M${s * 0.3} ${s / 2}H${s * 0.7}" stroke="${fg}" stroke-width="${w}" stroke-linecap="round"/>`
      break
    case "checks":
      body = `<rect width="${s / 2}" height="${s / 2}" fill="${fg}"/><rect x="${s / 2}" y="${s / 2}" width="${s / 2}" height="${s / 2}" fill="${fg}"/>`
      break
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 ${s} ${s}"><rect width="${s}" height="${s}" fill="${o.background}"/><g opacity="${op}">${body}</g></svg>`
}

export function pattern(o: PatternOptions, width = 800, height = 500) {
  const tile = patternTile(o).replace(/^<svg[^>]*>|<\/svg>$/g, "")
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}"><defs><pattern id="p" width="${o.spacing}" height="${o.spacing}" patternUnits="userSpaceOnUse" patternTransform="rotate(${o.rotation ?? 0})">${tile}</pattern></defs><rect width="100%" height="100%" fill="url(#p)"/></svg>`
}

export type MeshOptions = { seed: number; width: number; height: number; points: number; blur: number; colors: string[]; background: string; grain: boolean }

export function mesh(o: MeshOptions) {
  const rand = mulberry32(o.seed)
  const blobs = Array.from({ length: o.points }, (_, i) => {
    const r = Math.min(o.width, o.height) * (0.25 + rand() * 0.35)
    return `<circle cx="${round(rand() * o.width)}" cy="${round(rand() * o.height)}" r="${round(r)}" fill="${o.colors[i % o.colors.length]}" fill-opacity="${round(0.6 + rand() * 0.4)}"/>`
  }).join("")
  const grain = o.grain
    ? `<filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter><rect width="100%" height="100%" filter="url(#grain)" opacity="0.18" style="mix-blend-mode:overlay"/>`
    : ""
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${o.width} ${o.height}" width="${o.width}" height="${o.height}"><defs><filter id="blur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="${o.blur}"/></filter></defs><rect width="100%" height="100%" fill="${o.background}"/><g filter="url(#blur)">${blobs}</g>${grain}</svg>`
}

export type BauhausOptions = { seed: number; width: number; height: number; cols: number; colors: string[]; background: string }

/** Grid of flat geometric tiles in the Bauhaus / Swiss poster tradition. */
export function bauhaus(o: BauhausOptions) {
  const rand = mulberry32(o.seed)
  const cell = o.width / o.cols
  const rows = Math.ceil(o.height / cell)
  const pick = () => o.colors[Math.floor(rand() * o.colors.length)]
  const tiles: string[] = []
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < o.cols; col++) {
      const x0 = round(col * cell)
      const y0 = round(row * cell)
      const c = round(cell)
      const rot = Math.floor(rand() * 4) * 90
      const cx = x0 + c / 2
      const cy = y0 + c / 2
      let bg = pick()
      let fg = pick()
      if (fg === bg) fg = o.colors[(o.colors.indexOf(bg) + 1) % o.colors.length]
      const shapes = [
        `<path d="M${x0} ${y0}H${x0 + c}A${c} ${c} 0 0 1 ${x0} ${y0 + c}Z" fill="${fg}"/>`,
        `<circle cx="${cx}" cy="${cy}" r="${round(c * 0.38)}" fill="${fg}"/>`,
        `<path d="M${x0} ${y0 + c}H${x0 + c}A${c / 2} ${c / 2} 0 0 0 ${x0} ${y0 + c}Z" fill="${fg}"/>`,
        `<path d="M${x0} ${y0}L${x0 + c} ${y0 + c}H${x0}Z" fill="${fg}"/>`,
        `<rect x="${round(x0 + c * 0.25)}" y="${round(y0 + c * 0.25)}" width="${round(c / 2)}" height="${round(c / 2)}" fill="${fg}"/>`,
        `<circle cx="${cx}" cy="${cy}" r="${round(c * 0.38)}" fill="none" stroke="${fg}" stroke-width="${round(c * 0.1)}"/>`,
      ]
      if (rand() < 0.12) bg = o.background
      tiles.push(`<g transform="rotate(${rot} ${cx} ${cy})"><rect x="${x0}" y="${y0}" width="${c}" height="${c}" fill="${bg}"/>${shapes[Math.floor(rand() * shapes.length)]}</g>`)
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${o.width} ${o.height}" width="${o.width}" height="${o.height}"><rect width="100%" height="100%" fill="${o.background}"/>${tiles.join("")}</svg>`
}

export type ContourOptions = { seed: number; width: number; height: number; lines: number; peaks: number; stroke: number; color: string; background: string }

/** Topographic map: nested, softly distorted rings around a few summits. */
export function contours(o: ContourOptions) {
  const rand = mulberry32(o.seed)
  const maxR = Math.hypot(o.width, o.height) * 0.3
  const rings: string[] = []
  for (let p = 0; p < o.peaks; p++) {
    const cx = rand() * o.width
    const cy = rand() * o.height
    const phase = rand() * Math.PI * 2
    const wobble = 0.12 + rand() * 0.18
    for (let i = 1; i <= o.lines; i++) {
      const radius = (i / o.lines) * maxR * (0.55 + rand() * 0.1)
      const n = 36
      const pts: [number, number][] = Array.from({ length: n }, (_, k) => {
        const a = (k / n) * Math.PI * 2
        const r = radius * (1 + wobble * Math.sin(3 * a + phase + i * 0.35) + wobble * 0.5 * Math.cos(5 * a - phase))
        return [cx + Math.cos(a) * r, cy + Math.sin(a) * r * 0.8]
      })
      rings.push(`<path d="${smoothClosed(pts)}" opacity="${round(1 - (i / o.lines) * 0.55)}"/>`)
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${o.width} ${o.height}" width="${o.width}" height="${o.height}"><rect width="100%" height="100%" fill="${o.background}"/><g fill="none" stroke="${o.color}" stroke-width="${o.stroke}">${rings.join("")}</g></svg>`
}
