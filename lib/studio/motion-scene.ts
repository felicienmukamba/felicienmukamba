import { escapeXml as x } from "@/lib/kit/download"
import { EASINGS, type Bezier } from "@/lib/lab/motion"
import { fontStack, getFont, nearestWeight, type FontRequest } from "./fonts"
import { recolorMarkup, withPathLength } from "./svg-import"

/**
 * Motion studio scene model: layers with keyframed transforms, sampled the
 * same way for the live preview, the animated-SVG export and video capture.
 */

export type Prop = "x" | "y" | "scale" | "rotate" | "opacity" | "draw"
export const PROPS: Prop[] = ["x", "y", "scale", "rotate", "opacity", "draw"]

export type Keyframe = { id: string; t: number; v: number; ease: string }

export type ShapeId = "rect" | "circle" | "triangle" | "star" | "ring" | "hexagon" | "blob" | "arrow" | "line" | "heart"

export type LayerContent =
  | { kind: "svg"; markup: string; viewBox: [number, number, number, number]; recolor: boolean }
  | { kind: "icon"; name: string; markup: string }
  | { kind: "shape"; shape: ShapeId }
  | { kind: "text"; text: string; font: string; weight: number; size: number; tracking: number }

export type Layer = {
  id: string
  name: string
  content: LayerContent
  w: number
  h: number
  color: string
  strokeWidth: number
  visible: boolean
  locked: boolean
  base: Record<Prop, number>
  tracks: Partial<Record<Prop, Keyframe[]>>
}

export type Scene = { w: number; h: number; duration: number; background: string; transparent: boolean; loop: boolean; layers: Layer[] }

export const FORMATS = [
  { id: "square", w: 1080, h: 1080, label: "1:1" },
  { id: "portrait", w: 1080, h: 1350, label: "4:5" },
  { id: "story", w: 1080, h: 1920, label: "9:16" },
  { id: "landscape", w: 1920, h: 1080, label: "16:9" },
] as const

export const EASE_OPTIONS = ["linear", "hold", ...EASINGS.map((e) => e.name)]

export const uid = () => Math.random().toString(36).slice(2, 10)

export function defaultBase(scene: Pick<Scene, "w" | "h">): Record<Prop, number> {
  return { x: scene.w / 2, y: scene.h / 2, scale: 1, rotate: 0, opacity: 1, draw: 1 }
}

/* ───────────── Easing ───────────── */

function bezierFn([x1, y1, x2, y2]: Bezier) {
  const cx = 3 * x1
  const bx = 3 * (x2 - x1) - cx
  const ax = 1 - cx - bx
  const cy = 3 * y1
  const by = 3 * (y2 - y1) - cy
  const ay = 1 - cy - by
  const sx = (t: number) => ((ax * t + bx) * t + cx) * t
  const sy = (t: number) => ((ay * t + by) * t + cy) * t
  const dx = (t: number) => (3 * ax * t + 2 * bx) * t + cx
  return (p: number) => {
    let t = p
    for (let i = 0; i < 8; i++) {
      const err = sx(t) - p
      const d = dx(t)
      if (Math.abs(err) < 1e-5 || Math.abs(d) < 1e-6) break
      t -= err / d
    }
    t = Math.min(1, Math.max(0, t))
    return sy(t)
  }
}

const easeCache = new Map<string, (p: number) => number>()
export function easeFn(name: string): (p: number) => number {
  if (name === "linear") return (p) => p
  if (name === "hold") return () => 0
  let fn = easeCache.get(name)
  if (!fn) {
    fn = bezierFn(EASINGS.find((e) => e.name === name)?.value ?? EASINGS[3].value)
    easeCache.set(name, fn)
  }
  return fn
}

/* ───────────── Sampling ───────────── */

export function valueAt(layer: Layer, prop: Prop, t: number): number {
  const keys = layer.tracks[prop]
  if (!keys?.length) return layer.base[prop]
  if (t <= keys[0].t) return keys[0].v
  const last = keys[keys.length - 1]
  if (t >= last.t) return last.v
  for (let i = 0; i < keys.length - 1; i++) {
    const a = keys[i]
    const b = keys[i + 1]
    if (t >= a.t && t <= b.t) {
      const p = b.t === a.t ? 1 : (t - a.t) / (b.t - a.t)
      return a.v + (b.v - a.v) * easeFn(a.ease)(p)
    }
  }
  return last.v
}

export type Sample = Record<Prop, number>
export function sample(layer: Layer, t: number): Sample {
  return { x: valueAt(layer, "x", t), y: valueAt(layer, "y", t), scale: valueAt(layer, "scale", t), rotate: valueAt(layer, "rotate", t), opacity: valueAt(layer, "opacity", t), draw: valueAt(layer, "draw", t) }
}

export const isAnimated = (layer: Layer) => PROPS.some((p) => (layer.tracks[p]?.length ?? 0) > 0)
export const usesDraw = (layer: Layer) => (layer.tracks.draw?.length ?? 0) > 0 || layer.base.draw < 1

const n = (v: number, d = 2) => Number(v.toFixed(d))

export function transformAttr(s: Sample) {
  return `translate(${n(s.x)} ${n(s.y)}) rotate(${n(s.rotate)}) scale(${n(s.scale, 4)})`
}

/* ───────────── Keyframe editing ───────────── */

export function keyAt(layer: Layer, prop: Prop, t: number, tolerance = 20) {
  return layer.tracks[prop]?.find((k) => Math.abs(k.t - t) <= tolerance)
}

/** Writes a value at time `t`: updates/creates a keyframe when the property is animated, otherwise the base value. */
export function writeValue(layer: Layer, prop: Prop, t: number, v: number, forceKey = false): Layer {
  const keys = layer.tracks[prop]
  if (!keys?.length && !forceKey) return { ...layer, base: { ...layer.base, [prop]: v } }
  const existing = keyAt(layer, prop, t)
  const next = existing ? (keys ?? []).map((k) => (k === existing ? { ...k, v } : k)) : [...(keys ?? []), { id: uid(), t: Math.round(t), v, ease: "out-expo" }].sort((a, b) => a.t - b.t)
  return { ...layer, tracks: { ...layer.tracks, [prop]: next } }
}

export function toggleKey(layer: Layer, prop: Prop, t: number): Layer {
  const existing = keyAt(layer, prop, t)
  if (existing) {
    const rest = (layer.tracks[prop] ?? []).filter((k) => k !== existing)
    return { ...layer, base: rest.length ? layer.base : { ...layer.base, [prop]: existing.v }, tracks: { ...layer.tracks, [prop]: rest } }
  }
  return writeValue(layer, prop, t, valueAt(layer, prop, t), true)
}

export function clearTracks(layer: Layer): Layer {
  const s = sample(layer, 0)
  return { ...layer, base: { ...layer.base, ...s, opacity: Math.max(s.opacity, 0.05) }, tracks: {} }
}

/* ───────────── Presets ───────────── */

export type PresetId = "fadeIn" | "popIn" | "slideLeft" | "slideRight" | "slideUp" | "slideDown" | "zoomOut" | "spin" | "drawOn" | "float" | "pulse" | "wiggle" | "bounceIn" | "fadeOut"

export const PRESETS: { id: PresetId; label: { fr: string; en: string } }[] = [
  { id: "fadeIn", label: { fr: "Fondu", en: "Fade in" } },
  { id: "popIn", label: { fr: "Pop", en: "Pop" } },
  { id: "bounceIn", label: { fr: "Rebond", en: "Bounce" } },
  { id: "slideLeft", label: { fr: "← Glisser", en: "← Slide" } },
  { id: "slideRight", label: { fr: "Glisser →", en: "Slide →" } },
  { id: "slideUp", label: { fr: "↑ Monter", en: "↑ Rise" } },
  { id: "slideDown", label: { fr: "↓ Tomber", en: "↓ Drop" } },
  { id: "zoomOut", label: { fr: "Zoom", en: "Zoom" } },
  { id: "spin", label: { fr: "Rotation", en: "Spin" } },
  { id: "drawOn", label: { fr: "Tracé", en: "Draw on" } },
  { id: "float", label: { fr: "Flotter ∞", en: "Float ∞" } },
  { id: "pulse", label: { fr: "Pulsation ∞", en: "Pulse ∞" } },
  { id: "wiggle", label: { fr: "Secousse", en: "Wiggle" } },
  { id: "fadeOut", label: { fr: "Sortie", en: "Fade out" } },
]

/** Lays a preset's keyframes over [t0, t0 + d], replacing keys already in that window. */
export function applyPreset(layer: Layer, id: PresetId, t0: number, d: number, scene: Pick<Scene, "w" | "h" | "duration">): Layer {
  const b = sample(layer, t0)
  const end = Math.min(scene.duration, t0 + d)
  const span = end - t0
  const at = (f: number) => Math.round(t0 + span * f)
  const k = (t: number, v: number, ease = "out-expo"): Keyframe => ({ id: uid(), t, v, ease })
  const dist = Math.max(scene.w, scene.h) * 0.25
  const plan: Partial<Record<Prop, Keyframe[]>> = {}
  switch (id) {
    case "fadeIn":
      plan.opacity = [k(at(0), 0, "ease-in-out"), k(at(1), 1)]
      break
    case "fadeOut":
      plan.opacity = [k(at(0), b.opacity, "ease-in-out"), k(at(1), 0)]
      break
    case "popIn":
      plan.scale = [k(at(0), 0, "out-back"), k(at(1), b.scale)]
      plan.opacity = [k(at(0), 0, "linear"), k(at(0.3), 1)]
      break
    case "bounceIn":
      plan.y = [k(at(0), b.y - dist * 1.6, "in-expo"), k(at(0.45), b.y, "out-quart"), k(at(0.65), b.y - dist * 0.25, "in-out-sine"), k(at(0.82), b.y, "out-quart"), k(at(0.92), b.y - dist * 0.06, "in-out-sine"), k(at(1), b.y)]
      plan.opacity = [k(at(0), 0, "linear"), k(at(0.15), 1)]
      break
    case "slideLeft":
    case "slideRight":
      plan.x = [k(at(0), b.x + (id === "slideLeft" ? -dist : dist)), k(at(1), b.x)]
      plan.opacity = [k(at(0), 0, "linear"), k(at(0.5), 1)]
      break
    case "slideUp":
    case "slideDown":
      plan.y = [k(at(0), b.y + (id === "slideUp" ? dist : -dist)), k(at(1), b.y)]
      plan.opacity = [k(at(0), 0, "linear"), k(at(0.5), 1)]
      break
    case "zoomOut":
      plan.scale = [k(at(0), b.scale * 1.8), k(at(1), b.scale)]
      plan.opacity = [k(at(0), 0, "linear"), k(at(0.4), 1)]
      break
    case "spin":
      plan.rotate = [k(at(0), b.rotate - 360, "in-out-quint"), k(at(1), b.rotate)]
      break
    case "drawOn":
      plan.draw = [k(at(0), 0, "in-out-sine"), k(at(1), 1)]
      break
    case "float": {
      const cycles = Math.max(1, Math.round(span / 1600))
      plan.y = Array.from({ length: cycles * 2 + 1 }, (_, i) => k(at(i / (cycles * 2)), i % 2 ? b.y - 24 : b.y, "in-out-sine"))
      break
    }
    case "pulse": {
      const beats = Math.max(1, Math.round(span / 900))
      plan.scale = Array.from({ length: beats * 2 + 1 }, (_, i) => k(at(i / (beats * 2)), i % 2 ? b.scale * 1.08 : b.scale, "in-out-sine"))
      break
    }
    case "wiggle":
      plan.rotate = [0, -8, 7, -5, 3, 0].map((v, i, arr) => k(at(i / (arr.length - 1)), b.rotate + v, "in-out-sine"))
      break
  }
  const tracks = { ...layer.tracks }
  for (const [prop, keys] of Object.entries(plan) as [Prop, Keyframe[]][]) {
    const kept = (tracks[prop] ?? []).filter((kf) => kf.t < t0 - 10 || kf.t > end + 10)
    tracks[prop] = [...kept, ...keys].sort((a, c) => a.t - c.t)
  }
  return { ...layer, tracks }
}

/* ───────────── Rendering ───────────── */

const SHAPES: Record<ShapeId, { markup: (c: string, sw: number) => string; stroke?: boolean }> = {
  rect: { markup: (c) => `<rect x="0" y="0" width="100" height="100" rx="14" fill="${c}"/>` },
  circle: { markup: (c) => `<circle cx="50" cy="50" r="50" fill="${c}"/>` },
  triangle: { markup: (c) => `<path d="M50 4L97 92H3Z" fill="${c}" stroke="${c}" stroke-width="6" stroke-linejoin="round"/>` },
  star: {
    markup: (c) =>
      `<polygon points="${Array.from({ length: 10 }, (_, i) => {
        const a = (i * Math.PI) / 5 - Math.PI / 2
        const r = i % 2 ? 21 : 50
        return `${(50 + Math.cos(a) * r).toFixed(1)},${(52 + Math.sin(a) * r).toFixed(1)}`
      }).join(" ")}" fill="${c}"/>`,
  },
  ring: { markup: (c, sw) => `<circle cx="50" cy="50" r="${50 - sw * 2.5}" fill="none" stroke="${c}" stroke-width="${sw * 5}"/>`, stroke: true },
  hexagon: { markup: (c) => `<polygon points="50,0 93.3,25 93.3,75 50,100 6.7,75 6.7,25" fill="${c}"/>` },
  blob: { markup: (c) => `<path d="M54 2C80 4 98 24 96 52C94 78 74 98 48 96C22 94 2 76 4 48C6 22 26 0 54 2Z" fill="${c}"/>` },
  arrow: { markup: (c, sw) => `<path d="M8 50H88M60 20L90 50L60 80" fill="none" stroke="${c}" stroke-width="${sw * 5}" stroke-linecap="round" stroke-linejoin="round"/>`, stroke: true },
  line: { markup: (c, sw) => `<path d="M4 50H96" fill="none" stroke="${c}" stroke-width="${sw * 5}" stroke-linecap="round"/>`, stroke: true },
  heart: { markup: (c) => `<path d="M50 92C20 70 4 54 4 34A22 22 0 0 1 50 24A22 22 0 0 1 96 34C96 54 80 70 50 92Z" fill="${c}"/>` },
}

export const SHAPE_IDS = Object.keys(SHAPES) as ShapeId[]

export function shapePreview(id: ShapeId) {
  return SHAPES[id].markup("currentColor", 2)
}

/** Layer artwork centred on 0,0 at its natural `w × h` size. */
export function layerInner(layer: Layer): string {
  const { w, h, content: c } = layer
  const drawable = usesDraw(layer)
  const box = `x="${n(-w / 2)}" y="${n(-h / 2)}" width="${n(w)}" height="${n(h)}"`
  switch (c.kind) {
    case "shape": {
      const markup = SHAPES[c.shape].markup(layer.color, layer.strokeWidth)
      return `<svg ${box} viewBox="0 0 100 100" preserveAspectRatio="none" overflow="visible">${drawable ? withPathLength(markup) : markup}</svg>`
    }
    case "icon":
      return `<svg ${box} viewBox="0 0 24 24" fill="none" stroke="${layer.color}" stroke-width="${layer.strokeWidth}" stroke-linecap="round" stroke-linejoin="round" overflow="visible">${drawable ? withPathLength(c.markup) : c.markup}</svg>`
    case "svg": {
      let markup = c.recolor ? recolorMarkup(c.markup) : c.markup
      if (drawable) markup = withPathLength(markup)
      return `<svg ${box} viewBox="${c.viewBox.join(" ")}" preserveAspectRatio="xMidYMid meet" overflow="visible"${c.recolor ? ` color="${layer.color}" fill="currentColor"` : ""}>${markup}</svg>`
    }
    case "text": {
      const font = getFont(c.font)
      return `<text x="0" y="0" text-anchor="middle" dominant-baseline="central" font-family="${x(fontStack(font)).replace(/&apos;/g, "'")}" font-weight="${nearestWeight(font, c.weight)}" font-size="${c.size}" letter-spacing="${n(c.tracking * c.size)}" fill="${layer.color}">${x(c.text)}</text>`
    }
  }
}

function drawStyle(draw: number) {
  return `stroke-dasharray:1 1;stroke-dashoffset:${n(1 - draw, 4)}`
}

/** One frame as a standalone SVG (video export and PNG snapshots). */
export function renderFrameSvg(scene: Scene, t: number, fontCss = "", inners?: Map<string, string>): string {
  const body = scene.layers
    .filter((l) => l.visible)
    .map((l) => {
      const s = sample(l, t)
      if (s.opacity <= 0.001) return ""
      const inner = inners?.get(l.id) ?? layerInner(l)
      return `<g transform="${transformAttr(s)}" opacity="${n(s.opacity, 3)}"${usesDraw(l) ? ` style="${drawStyle(s.draw)}"` : ""}>${inner}</g>`
    })
    .join("")
  const bg = scene.transparent ? "" : `<rect width="${scene.w}" height="${scene.h}" fill="${scene.background}"/>`
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${scene.w}" height="${scene.h}" viewBox="0 0 ${scene.w} ${scene.h}">${fontCss ? `<defs><style>${fontCss}</style></defs>` : ""}${bg}${body}</svg>`
}

/** Self-playing SVG: each animated layer's transform is sampled at 30 fps into CSS keyframes. */
export function animatedSvg(scene: Scene, fontCss = ""): string {
  const fps = 30
  const steps = Math.max(2, Math.ceil((scene.duration / 1000) * fps))
  const css: string[] = []
  const body = scene.layers
    .filter((l) => l.visible)
    .map((l, i) => {
      const inner = layerInner(l)
      if (!isAnimated(l)) {
        const s = sample(l, 0)
        return `<g transform="${transformAttr(s)}" opacity="${n(s.opacity, 3)}"${usesDraw(l) ? ` style="${drawStyle(s.draw)}"` : ""}>${inner}</g>`
      }
      const frames: { p: number; tr: string; op: number; draw: number }[] = []
      for (let k = 0; k <= steps; k++) {
        const s = sample(l, (k / steps) * scene.duration)
        frames.push({ p: (k / steps) * 100, tr: `translate(${n(s.x)}px,${n(s.y)}px) rotate(${n(s.rotate)}deg) scale(${n(s.scale, 4)})`, op: n(s.opacity, 3), draw: n(1 - s.draw, 4) })
      }
      // Drop frames identical to both neighbours: same motion, much smaller file.
      const kept = frames.filter((f, k) => k === 0 || k === frames.length - 1 || !(f.tr === frames[k - 1].tr && f.op === frames[k - 1].op && f.draw === frames[k - 1].draw && f.tr === frames[k + 1].tr && f.op === frames[k + 1].op && f.draw === frames[k + 1].draw))
      const iter = scene.loop ? "infinite" : "1"
      css.push(`@keyframes m${i}{${kept.map((f) => `${n(f.p, 3)}%{transform:${f.tr};opacity:${f.op}}`).join("")}}`)
      css.push(`.m${i}{animation:m${i} ${scene.duration}ms linear ${iter} both}`)
      if (usesDraw(l)) {
        css.push(`@keyframes d${i}{${kept.map((f) => `${n(f.p, 3)}%{stroke-dashoffset:${f.draw}}`).join("")}}`)
        css.push(`.d${i}{stroke-dasharray:1 1;animation:d${i} ${scene.duration}ms linear ${iter} both}`)
        return `<g class="m${i}"><g class="d${i}">${inner}</g></g>`
      }
      return `<g class="m${i}">${inner}</g>`
    })
    .join("")
  const bg = scene.transparent ? "" : `<rect width="${scene.w}" height="${scene.h}" fill="${scene.background}"/>`
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${scene.w}" height="${scene.h}" viewBox="0 0 ${scene.w} ${scene.h}"><defs><style>${fontCss}${css.join("\n")}</style></defs>${bg}${body}</svg>`
}

export function sceneFontRequests(scene: Scene): FontRequest[] {
  return scene.layers.flatMap((l) => (l.content.kind === "text" ? [{ font: getFont(l.content.font), weights: [l.content.weight], text: l.content.text || " " }] : []))
}

/* ───────────── Video ───────────── */

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error("frame"))
    img.src = src
  })
}

const nextFrame = () => new Promise<number>((r) => requestAnimationFrame(r))

export function videoMime() {
  if (typeof MediaRecorder === "undefined") return null
  return ["video/mp4;codecs=avc1.42E01E", "video/mp4", "video/webm;codecs=vp9", "video/webm;codecs=vp8", "video/webm"].find((m) => MediaRecorder.isTypeSupported(m)) ?? null
}

/** Records the scene in real time from a canvas (frames are rasterised SVG). */
export async function recordVideo(scene: Scene, fontCss: string, onProgress: (p: number) => void, maxSide = 1920): Promise<{ blob: Blob; ext: string }> {
  const mime = videoMime()
  if (!mime) throw new Error("MediaRecorder unsupported")
  const k = Math.min(1, maxSide / Math.max(scene.w, scene.h))
  const canvas = document.createElement("canvas")
  canvas.width = Math.round(scene.w * k)
  canvas.height = Math.round(scene.h * k)
  const ctx = canvas.getContext("2d")!
  const inners = new Map(scene.layers.map((l) => [l.id, layerInner(l)]))
  const draw = async (t: number) => {
    const url = URL.createObjectURL(new Blob([renderFrameSvg(scene, t, fontCss, inners)], { type: "image/svg+xml" }))
    try {
      const img = await loadImage(url)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      if (!scene.transparent) {
        ctx.fillStyle = scene.background
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    } finally {
      URL.revokeObjectURL(url)
    }
  }
  await draw(0)
  const stream = canvas.captureStream(30)
  const rec = new MediaRecorder(stream, { mimeType: mime, videoBitsPerSecond: 10_000_000 })
  const chunks: Blob[] = []
  rec.ondataavailable = (e) => e.data.size && chunks.push(e.data)
  const stopped = new Promise<void>((r) => (rec.onstop = () => r()))
  rec.start(250)
  const start = performance.now()
  for (;;) {
    const t = performance.now() - start
    if (t >= scene.duration) break
    await draw(t)
    onProgress(t / scene.duration)
    await nextFrame()
  }
  await draw(scene.duration)
  await new Promise((r) => setTimeout(r, 120))
  rec.stop()
  await stopped
  onProgress(1)
  return { blob: new Blob(chunks, { type: mime.split(";")[0] }), ext: mime.startsWith("video/mp4") ? "mp4" : "webm" }
}
