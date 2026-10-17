/**
 * Turns user-supplied SVG into safe, self-contained markup: scripts and event
 * handlers are dropped, external references removed, and ids / class names
 * prefixed so several imported vectors can live in one document.
 */

export type ImportedVector = { name: string; markup: string; viewBox: [number, number, number, number] }

const DROP = new Set(["script", "foreignobject", "iframe", "object", "embed", "audio", "video", "animate", "set", "animatemotion", "animatetransform"])

let counter = 0

function parseViewBox(svg: Element): [number, number, number, number] {
  const vb = svg.getAttribute("viewBox")?.trim().split(/[\s,]+/).map(Number)
  if (vb && vb.length === 4 && vb.every(Number.isFinite) && vb[2] > 0 && vb[3] > 0) return vb as [number, number, number, number]
  const w = parseFloat(svg.getAttribute("width") ?? "")
  const h = parseFloat(svg.getAttribute("height") ?? "")
  return [0, 0, w > 0 ? w : 100, h > 0 ? h : 100]
}

function scrub(el: Element) {
  for (const child of [...el.children]) {
    if (DROP.has(child.tagName.toLowerCase())) child.remove()
    else scrub(child)
  }
  for (const attr of [...el.attributes]) {
    const name = attr.name.toLowerCase()
    const value = attr.value.trim().toLowerCase()
    if (name.startsWith("on")) el.removeAttribute(attr.name)
    else if ((name === "href" || name === "xlink:href") && !(value.startsWith("#") || value.startsWith("data:image/"))) el.removeAttribute(attr.name)
    else if (value.includes("javascript:")) el.removeAttribute(attr.name)
  }
  if (el.tagName.toLowerCase() === "style") {
    el.textContent = (el.textContent ?? "").replace(/@import[^;]+;/gi, "").replace(/url\(\s*['"]?(?!data:|#)[^)]*\)/gi, "none")
  }
}

export function sanitizeSvg(source: string, name = "vector"): ImportedVector | null {
  const doc = new DOMParser().parseFromString(source, "image/svg+xml")
  const svg = doc.documentElement
  if (!svg || svg.tagName.toLowerCase() !== "svg" || doc.querySelector("parsererror")) return null
  scrub(svg)

  const prefix = `v${(++counter).toString(36)}${Date.now().toString(36).slice(-3)}-`
  const ids = new Set<string>()
  const classes = new Set<string>()
  svg.querySelectorAll("[id]").forEach((el) => ids.add(el.id))
  svg.querySelectorAll("[class]").forEach((el) => (el.getAttribute("class") ?? "").split(/\s+/).filter(Boolean).forEach((c) => classes.add(c)))

  svg.querySelectorAll("[id]").forEach((el) => (el.id = prefix + el.id))
  svg.querySelectorAll("[class]").forEach((el) =>
    el.setAttribute(
      "class",
      (el.getAttribute("class") ?? "")
        .split(/\s+/)
        .filter(Boolean)
        .map((c) => prefix + c)
        .join(" "),
    ),
  )

  let markup = [...svg.childNodes].map((n) => new XMLSerializer().serializeToString(n)).join("")
  // XMLSerializer adds the SVG namespace to every top-level child; it is implied by the host <svg>.
  markup = markup.replace(/ xmlns="http:\/\/www\.w3\.org\/2000\/svg"/g, "")
  const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  for (const id of ids) {
    markup = markup
      .replace(new RegExp(`url\\(\\s*['"]?#${esc(id)}['"]?\\s*\\)`, "g"), `url(#${prefix}${id})`)
      .replace(new RegExp(`(href=")#${esc(id)}"`, "g"), `$1#${prefix}${id}"`)
      .replace(new RegExp(`#${esc(id)}(?=[\\s{,.:>+~\\[])`, "g"), `#${prefix}${id}`)
  }
  if (classes.size) {
    markup = markup.replace(/<style([^>]*)>([\s\S]*?)<\/style>/g, (_, attrs: string, css: string) => {
      let out = css
      for (const c of classes) out = out.replace(new RegExp(`\\.${esc(c)}(?![\\w-])`, "g"), `.${prefix}${c}`)
      return `<style${attrs}>${out}</style>`
    })
  }

  // Root-level paint attributes would be lost with the root element: keep them on a wrapper.
  const paint = ["fill", "stroke", "stroke-width", "stroke-linecap", "stroke-linejoin", "fill-rule", "clip-rule", "color", "opacity"]
    .map((a) => (svg.getAttribute(a) ? `${a}="${svg.getAttribute(a)}"` : ""))
    .filter(Boolean)
    .join(" ")
  if (paint) markup = `<g ${paint}>${markup}</g>`

  return { name, markup, viewBox: parseViewBox(svg) }
}

/** Repaints every non-`none` fill and stroke with `currentColor` (the host sets `color`). */
export function recolorMarkup(markup: string) {
  return markup
    .replace(/\b(fill|stroke)="(?!none|url)[^"]*"/g, '$1="currentColor"')
    .replace(/\b(fill|stroke)\s*:\s*(?!none|url)[^;"}]+/g, "$1:currentColor")
    .replace(/\bstop-color="[^"]*"/g, 'stop-color="currentColor"')
}

/** Adds `pathLength="1"` to drawable elements so a 0→1 dash offset traces them. */
export function withPathLength(markup: string) {
  return markup.replace(/<(path|circle|rect|line|polyline|polygon|ellipse)(?![^>]*pathLength)/g, '<$1 pathLength="1"')
}

/** Wraps a raster file as an `<image>` so it can be layered with vectors. */
export function rasterAsVector(dataUrl: string, width: number, height: number, name: string): ImportedVector {
  return { name, markup: `<image href="${dataUrl}" width="${width}" height="${height}" preserveAspectRatio="xMidYMid meet"/>`, viewBox: [0, 0, width, height] }
}

export function readFileAsText(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = () => reject(reader.error)
    reader.readAsText(file)
  })
}

export function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })
}

export function imageSize(src: string) {
  return new Promise<{ w: number; h: number }>((resolve) => {
    const img = new Image()
    img.onload = () => resolve({ w: img.naturalWidth || 512, h: img.naturalHeight || 512 })
    img.onerror = () => resolve({ w: 512, h: 512 })
    img.src = src
  })
}

/** Accepts SVG and raster files; returns one vector per readable file. */
export async function importFiles(files: FileList | File[]): Promise<ImportedVector[]> {
  const out: ImportedVector[] = []
  for (const file of [...files]) {
    const base = file.name.replace(/\.[^.]+$/, "")
    if (file.type === "image/svg+xml" || file.name.toLowerCase().endsWith(".svg")) {
      const v = sanitizeSvg(await readFileAsText(file), base)
      if (v) out.push(v)
    } else if (file.type.startsWith("image/")) {
      const url = await readFileAsDataUrl(file)
      const { w, h } = await imageSize(url)
      out.push(rasterAsVector(url, w, h, base))
    }
  }
  return out
}
