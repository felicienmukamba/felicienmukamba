/** Motion maths: easing presets, spring simulation and keyframe recipes. */

export type Bezier = [number, number, number, number]

export const EASINGS: { name: string; value: Bezier }[] = [
  { name: "ease", value: [0.25, 0.1, 0.25, 1] },
  { name: "ease-in-out", value: [0.42, 0, 0.58, 1] },
  { name: "out-quart", value: [0.25, 1, 0.5, 1] },
  { name: "out-expo", value: [0.16, 1, 0.3, 1] },
  { name: "in-out-quint", value: [0.83, 0, 0.17, 1] },
  { name: "in-expo", value: [0.7, 0, 0.84, 0] },
  { name: "out-back", value: [0.34, 1.56, 0.64, 1] },
  { name: "in-out-back", value: [0.68, -0.6, 0.32, 1.6] },
  { name: "apple", value: [0.28, 0.11, 0.32, 1] },
  { name: "material", value: [0.2, 0, 0, 1] },
  { name: "in-out-sine", value: [0.37, 0, 0.63, 1] },
  { name: "out-circ", value: [0, 0.55, 0.45, 1] },
  { name: "anticipate", value: [0.36, 0, 0.66, -0.56] },
]

/** Classic react-spring presets, as stiffness / damping / mass. */
export const SPRING_PRESETS = {
  gentle: [120, 14, 1],
  wobbly: [180, 12, 1],
  stiff: [210, 20, 1],
  slow: [280, 60, 1],
  snappy: [400, 28, 0.8],
  molasses: [280, 120, 1],
} as const
export type SpringPreset = keyof typeof SPRING_PRESETS

export const fmt = (n: number) => String(Math.round(n * 1000) / 1000)
export const bezierCss = (b: Bezier) => `cubic-bezier(${b.map(fmt).join(", ")})`

export type SpringResult = { samples: number[]; duration: number }

/** Integrates a damped spring from 0 to 1 and returns evenly spaced samples. */
export function simulateSpring(stiffness: number, damping: number, mass: number): SpringResult {
  const dt = 1 / 240
  let x = 0
  let v = 0
  const raw: number[] = []
  let time = 0
  let still = 0
  while (time < 4) {
    const force = -stiffness * (x - 1) - damping * v
    v += (force / mass) * dt
    x += v * dt
    raw.push(x)
    time += dt
    still = Math.abs(x - 1) < 0.001 && Math.abs(v) < 0.01 ? still + 1 : 0
    if (still > 24) break
  }
  const duration = Math.round(time * 1000)
  const count = 48
  const samples = Array.from({ length: count + 1 }, (_, i) => raw[Math.min(raw.length - 1, Math.round((i / count) * (raw.length - 1)))])
  samples[samples.length - 1] = 1
  return { samples, duration }
}

/** CSS `linear()` easing that reproduces the spring (supported by all evergreen browsers). */
export function springToLinear(samples: number[]) {
  return `linear(${samples.map((s) => fmt(s)).join(", ")})`
}

export type Frame = { offset: number; opacity?: number; transform?: string; filter?: string }
export type EffectId = "fadeUp" | "scaleIn" | "blurIn" | "slideLeft" | "rotateIn" | "flip" | "bounce" | "pulse" | "shake" | "zoomOut" | "slideUp" | "heartbeat" | "float" | "wiggle"

export const EFFECTS: Record<EffectId, Frame[]> = {
  fadeUp: [
    { offset: 0, opacity: 0, transform: "translateY(24px)" },
    { offset: 1, opacity: 1, transform: "translateY(0)" },
  ],
  scaleIn: [
    { offset: 0, opacity: 0, transform: "scale(0.85)" },
    { offset: 1, opacity: 1, transform: "scale(1)" },
  ],
  blurIn: [
    { offset: 0, opacity: 0, filter: "blur(12px)" },
    { offset: 1, opacity: 1, filter: "blur(0px)" },
  ],
  slideLeft: [
    { offset: 0, opacity: 0, transform: "translateX(-48px)" },
    { offset: 1, opacity: 1, transform: "translateX(0)" },
  ],
  rotateIn: [
    { offset: 0, opacity: 0, transform: "rotate(-12deg) scale(0.9)" },
    { offset: 1, opacity: 1, transform: "rotate(0deg) scale(1)" },
  ],
  flip: [
    { offset: 0, opacity: 0, transform: "perspective(600px) rotateX(-80deg)" },
    { offset: 1, opacity: 1, transform: "perspective(600px) rotateX(0deg)" },
  ],
  bounce: [
    { offset: 0, transform: "translateY(0)" },
    { offset: 0.3, transform: "translateY(-28px)" },
    { offset: 0.5, transform: "translateY(0)" },
    { offset: 0.65, transform: "translateY(-10px)" },
    { offset: 0.8, transform: "translateY(0)" },
    { offset: 1, transform: "translateY(0)" },
  ],
  pulse: [
    { offset: 0, transform: "scale(1)" },
    { offset: 0.5, transform: "scale(1.08)" },
    { offset: 1, transform: "scale(1)" },
  ],
  shake: [
    { offset: 0, transform: "translateX(0)" },
    { offset: 0.2, transform: "translateX(-8px)" },
    { offset: 0.4, transform: "translateX(8px)" },
    { offset: 0.6, transform: "translateX(-6px)" },
    { offset: 0.8, transform: "translateX(6px)" },
    { offset: 1, transform: "translateX(0)" },
  ],
  zoomOut: [
    { offset: 0, opacity: 0, transform: "scale(1.25)" },
    { offset: 1, opacity: 1, transform: "scale(1)" },
  ],
  slideUp: [
    { offset: 0, opacity: 0, transform: "translateY(100%)" },
    { offset: 1, opacity: 1, transform: "translateY(0)" },
  ],
  heartbeat: [
    { offset: 0, transform: "scale(1)" },
    { offset: 0.14, transform: "scale(1.15)" },
    { offset: 0.28, transform: "scale(1)" },
    { offset: 0.42, transform: "scale(1.15)" },
    { offset: 0.7, transform: "scale(1)" },
    { offset: 1, transform: "scale(1)" },
  ],
  float: [
    { offset: 0, transform: "translateY(0)" },
    { offset: 0.5, transform: "translateY(-12px)" },
    { offset: 1, transform: "translateY(0)" },
  ],
  wiggle: [
    { offset: 0, transform: "rotate(0deg)" },
    { offset: 0.25, transform: "rotate(-6deg)" },
    { offset: 0.5, transform: "rotate(6deg)" },
    { offset: 0.75, transform: "rotate(-3deg)" },
    { offset: 1, transform: "rotate(0deg)" },
  ],
}

/**
 * Scales an effect's distances, angles, blur and scale deltas by `k` (1 = as designed),
 * so one recipe works from a subtle hint to a bold entrance.
 */
export function scaleFrames(frames: Frame[], k: number): Frame[] {
  const scaleValue = (v: string) =>
    v
      .replace(/(-?\d*\.?\d+)(px|deg|%)/g, (_, n, unit) => `${Math.round(Number(n) * k * 100) / 100}${unit}`)
      .replace(/scale\((-?\d*\.?\d+)\)/g, (_, n) => `scale(${Math.round((1 + (Number(n) - 1) * k) * 1000) / 1000})`)
      .replace(/blur\((-?\d*\.?\d+)px\)/g, (_, n) => `blur(${Math.round(Number(n) * 100) / 100}px)`)
  return frames.map((f) => ({
    ...f,
    ...(f.transform ? { transform: scaleValue(f.transform) } : {}),
    ...(f.filter ? { filter: scaleValue(f.filter) } : {}),
  }))
}

export type Direction = "normal" | "alternate" | "reverse"

const kebab = (s: string) => s.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)

export function keyframesCss(id: EffectId, source: Frame[], easing: string, duration: number, delay: number, stagger: number, loop: boolean, direction: Direction = "normal") {
  const frames = source
    .map((f) => {
      const props = Object.entries(f)
        .filter(([k]) => k !== "offset")
        .map(([k, v]) => `${kebab(k)}: ${v};`)
        .join(" ")
      return `  ${Math.round(f.offset * 100)}% { ${props} }`
    })
    .join("\n")
  return `@keyframes ${kebab(id)} {\n${frames}\n}\n\n.${kebab(id)} {\n  animation: ${kebab(id)} ${duration}ms ${easing} ${delay}ms ${loop ? "infinite" : "1"} ${direction} both;\n}\n\n/* Stagger siblings */\n.${kebab(id)}:nth-child(n) { animation-delay: calc(${delay}ms + (var(--i, 0) * ${stagger}ms)); }`
}

export function framerVariants(frames: Frame[], easing: string, duration: number, stagger: number, loop: boolean, direction: Direction = "normal") {
  const first = frames[0]
  const last = frames[frames.length - 1]
  const ease = easing.startsWith("cubic-bezier") ? `[${easing.slice(13, -1)}]` : `"${easing}"`
  if (frames.length > 2) {
    const keys = Object.keys(first).filter((k) => k !== "offset")
    const values = keys.map((k) => `    ${k}: [${frames.map((f) => JSON.stringify(f[k as keyof Frame])).join(", ")}],`).join("\n")
    return `<motion.div\n  animate={{\n${values}\n  }}\n  transition={{ duration: ${duration / 1000}, times: [${frames.map((f) => f.offset).join(", ")}], ease: ${ease}${loop ? ", repeat: Infinity" : ""} }}\n/>`
  }
  const pick = (f: Frame) =>
    Object.entries(f)
      .filter(([k]) => k !== "offset")
      .map(([k, v]) => `${k}: ${JSON.stringify(v)}`)
      .join(", ")
  return `const container = {\n  hidden: {},\n  show: { transition: { staggerChildren: ${stagger / 1000} } },\n}\n\nconst item = {\n  hidden: { ${pick(first)} },\n  show: { ${pick(last)}, transition: { duration: ${duration / 1000}, ease: ${ease} } },\n}`
}
