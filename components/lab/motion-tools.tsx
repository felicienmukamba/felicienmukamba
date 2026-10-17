"use client"

import { useCallback, useEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent } from "react"
import { Play } from "lucide-react"
import { Button, CodeBlock, Panel, Segmented, Select, Slider, TabBar, ToggleRow } from "@/components/kit/controls"
import { fill, type LabStrings } from "@/lib/lab/i18n"
import { EASINGS, EFFECTS, SPRING_PRESETS, bezierCss, fmt, framerVariants, keyframesCss, scaleFrames, simulateSpring, springToLinear, type Bezier, type Direction, type EffectId, type SpringPreset } from "@/lib/lab/motion"
import { cn } from "@/lib/utils"
import { MotionStudio } from "@/components/lab/motion-studio"

import { ArrowDownToLine, Check, Copy, CreditCard, Sparkles, Waves } from "lucide-react"
import { DEFAULT_MOTION_CONFIG, generateAnimatedCardSvg, generateCssMotionCode, generateFlutterCode, generateFramerMotionCode, type MotionConfig, type MotionMode } from "@/lib/lab/card-motion"
import { downloadText } from "@/lib/kit/download"

type Tab = "studio" | "easing" | "spring" | "keyframes" | "cards"

export function MotionTools({ t, lang = "fr" }: { t: LabStrings; lang?: "fr" | "en" }) {
  const [tab, setTab] = useState<Tab>("studio")
  const labels: Record<Tab, string> = { studio: lang === "fr" ? "Studio motion" : "Motion studio", ...t.motion.tabs }
  return (
    <div className="space-y-6">
      <div className="max-w-3xl">
        <TabBar label="Motion" value={tab} onChange={setTab} tabs={(["studio", "easing", "spring", "keyframes", "cards"] as const).map((v) => ({ value: v, label: labels[v] }))} />
      </div>
      {tab === "studio" && <MotionStudio lang={lang} />}
      {tab === "easing" && <EasingEditor t={t} />}
      {tab === "spring" && <SpringTool t={t} />}
      {tab === "keyframes" && <KeyframesTool t={t} />}
      {tab === "cards" && <CardMotionTool t={t} />}
    </div>
  )
}

/** Moves a dot across its track with the given timing function, on demand. */
function useTrack(easing: string, duration: number) {
  const ref = useRef<HTMLSpanElement>(null)
  const play = useCallback(() => {
    const el = ref.current
    if (!el) return
    const distance = (el.parentElement?.clientWidth ?? 300) - el.clientWidth
    el.animate([{ transform: "translateX(0)" }, { transform: `translateX(${distance}px)` }], { duration, easing, fill: "forwards" })
  }, [easing, duration])
  useEffect(() => play(), [play])
  return { ref, play }
}

function Track({ label, trackRef, color = "var(--accent)" }: { label: string; trackRef: React.RefObject<HTMLSpanElement | null>; color?: string }) {
  return (
    <div>
      <p className="mb-1.5 font-mono text-[11px] text-subtle-foreground">{label}</p>
      <div className="relative h-10 rounded-full border border-line bg-surface-2/60 p-1">
        <span ref={trackRef} className="block size-8 rounded-full shadow-lg" style={{ backgroundColor: color }} />
      </div>
    </div>
  )
}

/** Graph geometry: a square unit box with head-room for overshooting curves. */
const UNIT = 220
const PAD = 30
const Y_MIN = -0.35
const Y_MAX = 1.35
const VIEW_W = UNIT + PAD * 2
const VIEW_H = (Y_MAX - Y_MIN) * UNIT + PAD * 2
const toX = (v: number) => PAD + v * UNIT
const toY = (v: number) => PAD + (Y_MAX - v) * UNIT

function EasingEditor({ t }: { t: LabStrings }) {
  const m = t.motion
  const [bezier, setBezier] = useState<Bezier>([0.16, 1, 0.3, 1])
  const [duration, setDuration] = useState(900)
  const svg = useRef<SVGSVGElement>(null)
  const dragging = useRef<0 | 1 | null>(null)
  const css = bezierCss(bezier)
  const main = useTrack(css, duration)
  const linear = useTrack("linear", duration)

  const onMove = (e: ReactPointerEvent) => {
    if (dragging.current === null || !svg.current) return
    const rect = svg.current.getBoundingClientRect()
    const px = ((e.clientX - rect.left) * VIEW_W) / rect.width
    const py = ((e.clientY - rect.top) * VIEW_H) / rect.height
    const x = Math.min(1, Math.max(0, (px - PAD) / UNIT))
    const y = Math.min(Y_MAX, Math.max(Y_MIN, Y_MAX - (py - PAD) / UNIT))
    setBezier((b) => (dragging.current === 0 ? [x, y, b[2], b[3]] : [b[0], b[1], x, y]))
  }

  const p0 = [toX(0), toY(0)]
  const p3 = [toX(1), toY(1)]
  const h1 = [toX(bezier[0]), toY(bezier[1])]
  const h2 = [toX(bezier[2]), toY(bezier[3])]

  const outputs = `/* CSS */\ntransition-timing-function: ${css};\n\n/* Tailwind */\nease-[${css.replace(/ /g, "")}]\n\n/* Framer Motion */\ntransition={{ duration: ${duration / 1000}, ease: [${bezier.map(fmt).join(", ")}] }}\n\n/* GSAP (CustomEase) */\nCustomEase.create("custom", "${bezier.map(fmt).join(",")}")`

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,420px)_1fr]">
      <Panel>
        <svg
          ref={svg}
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          className="mx-auto w-full max-w-[320px] touch-none select-none"
          onPointerMove={onMove}
          onPointerUp={() => (dragging.current = null)}
          onPointerLeave={() => (dragging.current = null)}
        >
          <rect x={PAD} y={toY(1)} width={UNIT} height={UNIT} fill="var(--surface-2)" rx="6" />
          <line x1={p0[0]} y1={p0[1]} x2={p3[0]} y2={p3[1]} stroke="var(--line-strong)" strokeDasharray="4 6" />
          <line x1={p0[0]} y1={p0[1]} x2={h1[0]} y2={h1[1]} stroke="var(--accent-2)" strokeWidth="2" />
          <line x1={p3[0]} y1={p3[1]} x2={h2[0]} y2={h2[1]} stroke="var(--accent-2)" strokeWidth="2" />
          <path d={`M${p0} C${h1} ${h2} ${p3}`} fill="none" stroke="var(--accent)" strokeWidth="4" strokeLinecap="round" />
          {[h1, h2].map((h, i) => (
            <circle
              key={i}
              cx={h[0]}
              cy={h[1]}
              r="11"
              fill="var(--background)"
              stroke="var(--accent-2)"
              strokeWidth="3"
              className="cursor-grab active:cursor-grabbing"
              onPointerDown={(e) => {
                ;(e.target as Element).setPointerCapture(e.pointerId)
                dragging.current = i as 0 | 1
              }}
            />
          ))}
        </svg>
        <p className="text-center font-mono text-[12px]">{css}</p>
        <p className="text-center text-[11px] text-subtle-foreground">{m.drag}</p>
      </Panel>

      <div className="min-w-0 space-y-4">
        <Panel title={m.presets}>
          <div className="flex flex-wrap gap-1.5">
            {EASINGS.map((e) => (
              <button
                key={e.name}
                type="button"
                onClick={() => setBezier(e.value)}
                className={cn("rounded-full border px-3 py-1 font-mono text-[11px]", bezier.join() === e.value.join() ? "border-accent bg-accent-soft text-accent" : "border-line hover:border-line-strong")}
              >
                {e.name}
              </button>
            ))}
          </div>
          <Slider label={m.duration} value={duration} min={150} max={3000} step={50} onChange={setDuration} format={(v) => `${v} ms`} />
          <Track label={css} trackRef={main.ref} />
          <Track label={m.linear} trackRef={linear.ref} color="var(--line-strong)" />
          <Button
            variant="primary"
            onClick={() => {
              main.play()
              linear.play()
            }}
          >
            <Play className="size-4" aria-hidden /> {m.replay}
          </Button>
        </Panel>
        <CodeBlock code={outputs} copyLabel={t.common.copy} copiedLabel={t.common.copied} />
      </div>
    </div>
  )
}

function SpringTool({ t }: { t: LabStrings }) {
  const m = t.motion
  const [stiffness, setStiffness] = useState(170)
  const [damping, setDamping] = useState(14)
  const [mass, setMass] = useState(1)
  const spring = useMemo(() => simulateSpring(stiffness, damping, mass), [stiffness, damping, mass])
  const easing = springToLinear(spring.samples)
  const track = useTrack(easing, spring.duration)

  const max = Math.max(1.05, ...spring.samples)
  const min = Math.min(0, ...spring.samples)
  const path = spring.samples
    .map((v, i) => `${i ? "L" : "M"}${(i / (spring.samples.length - 1)) * 400},${200 - ((v - min) / (max - min)) * 180 - 10}`)
    .join(" ")
  const targetY = 200 - ((1 - min) / (max - min)) * 180 - 10

  const outputs = `/* Framer Motion */\ntransition={{ type: "spring", stiffness: ${stiffness}, damping: ${damping}, mass: ${mass} }}\n\n/* CSS (no JavaScript) */\ntransition: transform ${spring.duration}ms ${easing};`

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,420px)_1fr]">
      <Panel>
        <div className="grid grid-cols-3 gap-1.5">
          {(Object.keys(SPRING_PRESETS) as SpringPreset[]).map((id) => {
            const [k, d, ms] = SPRING_PRESETS[id]
            const active = stiffness === k && damping === d && mass === ms
            return (
              <button
                key={id}
                type="button"
                aria-pressed={active}
                onClick={() => {
                  setStiffness(k)
                  setDamping(d)
                  setMass(ms)
                }}
                className={cn("rounded-lg border px-2 py-1.5 text-[12px]", active ? "border-accent bg-accent-soft" : "border-line text-muted-foreground hover:text-foreground")}
              >
                {m.springPresets[id]}
              </button>
            )
          })}
        </div>
        <Slider label={m.stiffness} value={stiffness} min={20} max={600} onChange={setStiffness} />
        <Slider label={m.damping} value={damping} min={1} max={140} onChange={setDamping} />
        <Slider label={m.mass} value={mass} min={0.2} max={5} step={0.1} onChange={setMass} />
        <svg viewBox="0 0 400 200" className="w-full rounded-xl border border-line bg-surface-2/60">
          <line x1="0" x2="400" y1={targetY} y2={targetY} stroke="var(--line-strong)" strokeDasharray="4 6" />
          <path d={path} fill="none" stroke="var(--accent)" strokeWidth="3" strokeLinejoin="round" />
        </svg>
        <p className="font-mono text-[12px] text-muted-foreground">{fill(m.settle, { ms: spring.duration })}</p>
      </Panel>
      <div className="min-w-0 space-y-4">
        <Panel>
          <Track label={`spring(${stiffness}, ${damping}, ${mass})`} trackRef={track.ref} />
          <Button variant="primary" onClick={track.play}>
            <Play className="size-4" aria-hidden /> {m.replay}
          </Button>
        </Panel>
        <CodeBlock code={outputs} copyLabel={t.common.copy} copiedLabel={t.common.copied} />
      </div>
    </div>
  )
}

function KeyframesTool({ t }: { t: LabStrings }) {
  const m = t.motion
  const [effect, setEffect] = useState<EffectId>("fadeUp")
  const [easing, setEasing] = useState("out-expo")
  const [duration, setDuration] = useState(700)
  const [delay, setDelay] = useState(0)
  const [stagger, setStagger] = useState(80)
  const [items, setItems] = useState(6)
  const [loop, setLoop] = useState(false)
  const [intensity, setIntensity] = useState(1)
  const [direction, setDirection] = useState<Direction>("normal")
  const [format, setFormat] = useState<"css" | "framer">("css")
  const grid = useRef<HTMLDivElement>(null)
  const css = bezierCss(EASINGS.find((e) => e.name === easing)?.value ?? EASINGS[0].value)
  const frames = useMemo(() => scaleFrames(EFFECTS[effect], intensity), [effect, intensity])

  const play = useCallback(() => {
    grid.current?.querySelectorAll<HTMLElement>("[data-item]").forEach((el, i) => {
      el.getAnimations().forEach((a) => a.cancel())
      el.animate(frames as Keyframe[], { duration, delay: delay + i * stagger, easing: css, fill: "both", iterations: loop ? Infinity : 1, direction })
    })
  }, [frames, duration, delay, stagger, css, loop, direction])

  useEffect(() => play(), [play, items])

  const code = format === "css" ? keyframesCss(effect, frames, css, duration, delay, stagger, loop, direction) : framerVariants(frames, css, duration, stagger, loop, direction)

  return (
    <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
      <Panel>
        <div className="grid grid-cols-3 gap-1.5">
          {(Object.keys(EFFECTS) as EffectId[]).map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setEffect(id)}
              aria-pressed={effect === id}
              className={cn("rounded-lg border px-2 py-2 text-[11.5px] leading-tight", effect === id ? "border-accent bg-accent-soft text-foreground" : "border-line text-muted-foreground hover:text-foreground")}
            >
              {m.effects[id]}
            </button>
          ))}
        </div>
        <label className="block">
          <span className="mb-1.5 block text-[12px] font-medium text-muted-foreground">{m.easing}</span>
          <Select value={easing} onChange={setEasing} options={EASINGS.map((e) => ({ value: e.name, label: e.name }))} />
        </label>
        <Slider label={m.duration} value={duration} min={100} max={3000} step={50} onChange={setDuration} format={(v) => `${v} ms`} />
        <Slider label={m.delay} value={delay} min={0} max={1500} step={50} onChange={setDelay} format={(v) => `${v} ms`} />
        <Slider label={m.stagger} value={stagger} min={0} max={400} step={10} onChange={setStagger} format={(v) => `${v} ms`} />
        <Slider label={m.items} value={items} min={1} max={12} onChange={setItems} />
        <Slider label={m.intensity} value={intensity} min={0.25} max={2.5} step={0.05} onChange={setIntensity} format={(v) => `${Math.round(v * 100)}%`} />
        <ToggleRow label={m.loop} checked={loop} onChange={setLoop} />
        <div>
          <span className="mb-1.5 block text-[12px] font-medium text-muted-foreground">{m.direction}</span>
          <Segmented label={m.direction} value={direction} onChange={setDirection} options={(["normal", "alternate", "reverse"] as const).map((v) => ({ value: v, label: m.directions[v] }))} />
        </div>
      </Panel>
      <div className="min-w-0 space-y-4">
        <Panel>
          <div ref={grid} className="grid grid-cols-3 gap-3 sm:grid-cols-4">
            {Array.from({ length: items }, (_, i) => (
              <div key={i} data-item className="aspect-[4/3] rounded-xl bg-[linear-gradient(135deg,var(--accent),var(--accent-2))] shadow-lg" />
            ))}
          </div>
          <Button variant="primary" onClick={play}>
            <Play className="size-4" aria-hidden /> {m.replay}
          </Button>
        </Panel>
        <Segmented
          label="Format"
          value={format}
          onChange={setFormat}
          options={[
            { value: "css", label: "CSS" },
            { value: "framer", label: "Framer Motion" },
          ]}
        />
        <CodeBlock code={code} copyLabel={t.common.copy} copiedLabel={t.common.copied} />
      </div>
    </div>
  )
}

function CardMotionTool({ t }: { t: LabStrings }) {
  const [config, setConfig] = useState<MotionConfig>(DEFAULT_MOTION_CONFIG)
  const [isFlipped, setIsFlipped] = useState(false)
  const [format, setFormat] = useState<"framer" | "flutter" | "css">("framer")

  const animatedSvg = useMemo(() => generateAnimatedCardSvg("SOSIDE"), [])
  const code = useMemo(() => {
    if (format === "framer") return generateFramerMotionCode(config, "SOSIDE")
    if (format === "flutter") return generateFlutterCode(config, "SOSIDE")
    return generateCssMotionCode(config)
  }, [config, format])

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,420px)_1fr]">
      <Panel className="space-y-4">
        <div>
          <span className="mb-1.5 block text-[12px] font-medium text-muted-foreground">Mode d'animation</span>
          <Segmented
            label="Mode"
            value={config.mode}
            onChange={(v) => setConfig({ ...config, mode: v as MotionMode })}
            options={[
              { value: "flip-3d", label: "Flip 3D" },
              { value: "tap-nfc", label: "NFC Tap" },
              { value: "parallax-float", label: "Parallaxe" },
            ]}
          />
        </div>

        <Slider
          label="Raideur du ressort (Stiffness)"
          value={config.springStiffness}
          min={100}
          max={500}
          step={10}
          onChange={(v) => setConfig({ ...config, springStiffness: v })}
        />

        <Slider
          label="Amortissement (Damping)"
          value={config.springDamping}
          min={10}
          max={50}
          step={2}
          onChange={(v) => setConfig({ ...config, springDamping: v })}
        />

        <Slider
          label="Perspective 3D (px)"
          value={config.perspective}
          min={600}
          max={2000}
          step={50}
          onChange={(v) => setConfig({ ...config, perspective: v })}
          format={(v) => `${v}px`}
        />

        <div className="pt-2 border-t border-line">
          <Button
            variant="secondary"
            size="sm"
            className="w-full"
            onClick={() => downloadText(animatedSvg, "soside-animated-card.svg", "image/svg+xml")}
          >
            <ArrowDownToLine className="size-3.5" /> Télécharger SVG Animé (SMIL)
          </Button>
        </div>
      </Panel>

      <div className="min-w-0 space-y-4">
        <Panel className="flex flex-col items-center justify-center p-8 min-h-[300px] bg-gradient-to-b from-surface to-surface-2/40 overflow-hidden relative">
          {config.mode === "flip-3d" && (
            <div
              style={{ perspective: config.perspective }}
              className="w-72 h-44 cursor-pointer select-none"
              onClick={() => setIsFlipped(!isFlipped)}
            >
              <div
                className={cn(
                  "relative w-full h-full rounded-2xl shadow-2xl transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  isFlipped && "[transform:rotateY(180deg)]"
                )}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Recto */}
                <div
                  className="absolute inset-0 rounded-2xl p-5 text-white flex flex-col justify-between overflow-hidden shadow-xl"
                  style={{
                    backfaceVisibility: "hidden",
                    background: "linear-gradient(135deg, #347CEC 0%, #0B3D91 100%)",
                  }}
                >
                  <div className="flex justify-between items-start">
                    <span className="font-bold tracking-widest text-sm">SOSIDE PAY</span>
                    <div className="w-8 h-6 rounded bg-amber-400 border border-amber-300" />
                  </div>
                  <div className="font-mono text-base tracking-widest">4289 •••• •••• 9901</div>
                  <div className="flex justify-between text-[11px] text-blue-200">
                    <span>SECOURS & TECH</span>
                    <span>12/29</span>
                  </div>
                </div>

                {/* Verso */}
                <div
                  className="absolute inset-0 rounded-2xl bg-slate-900 text-white flex flex-col justify-between overflow-hidden shadow-xl [transform:rotateY(180deg)]"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <div className="w-full h-9 bg-black mt-4" />
                  <div className="px-5 flex items-center justify-end">
                    <div className="h-7 w-24 bg-white/90 rounded text-slate-900 text-right pr-2 font-mono text-xs font-bold flex items-center justify-end">
                      CVV 842
                    </div>
                  </div>
                  <div className="px-5 pb-4 text-[9px] text-slate-400 font-mono">
                    SOSIDE PAY • Cliquez pour retourner
                  </div>
                </div>
              </div>
            </div>
          )}

          {config.mode === "tap-nfc" && (
            <div className="relative flex flex-col items-center justify-center p-6">
              <div className="absolute size-40 rounded-full border border-blue-400/40 animate-ping opacity-60" />
              <div className="z-10 w-64 h-40 rounded-2xl p-5 text-white shadow-2xl flex flex-col justify-between bg-gradient-to-br from-blue-600 to-indigo-950 animate-bounce">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-xs tracking-widest">SOSIDE</span>
                  <span className="text-[10px] bg-emerald-400/20 text-emerald-300 px-2 py-0.5 rounded-full font-mono">
                    NFC
                  </span>
                </div>
                <div className="font-mono text-sm tracking-widest text-center">•••• 4289</div>
                <div className="text-[10px] text-blue-200 text-center">Approchez du lecteur</div>
              </div>
            </div>
          )}

          {config.mode === "parallax-float" && (
            <div className="relative w-64 h-40 flex items-center justify-center">
              <div className="absolute w-56 h-36 rounded-xl bg-blue-400/60 shadow-lg [transform:rotate(-12deg)_translate(-8px,-8px)]" />
              <div className="relative z-10 w-56 h-36 rounded-xl bg-white shadow-2xl p-4 flex flex-col justify-between text-slate-900 border border-slate-100">
                <div className="flex justify-between items-start">
                  <span className="font-bold text-xs text-blue-900">SOSIDE</span>
                  <div className="w-6 h-4 rounded bg-amber-400" />
                </div>
                <div className="font-mono text-xs">4289 •••• •••• 9901</div>
                <div className="h-1 w-12 rounded bg-slate-200" />
              </div>
            </div>
          )}
        </Panel>

        <Segmented
          label="Langage de code"
          value={format}
          onChange={(v) => setFormat(v as any)}
          options={[
            { value: "framer", label: "Framer Motion" },
            { value: "flutter", label: "Flutter (Dart)" },
            { value: "css", label: "CSS Keyframes" },
          ]}
        />

        <CodeBlock code={code} copyLabel={t.common.copy} copiedLabel={t.common.copied} />
      </div>
    </div>
  )
}

