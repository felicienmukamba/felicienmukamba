"use client"

import { useMemo, useState } from "react"
import { Plus, Shuffle, Trash2 } from "lucide-react"
import { Button, CodeBlock, ColorField, Panel, Segmented, Select, Slider, TabBar, ToggleRow } from "@/components/kit/controls"
import { contrast, fixContrast, harmony, hexToRgb, readableOn, scale, wcag, type Harmony } from "@/lib/lab/color"
import type { LabStrings } from "@/lib/lab/i18n"
import { cn } from "@/lib/utils"

type Tab = "palette" | "contrast" | "shadow" | "gradient" | "type" | "glass"
type Vision = "normal" | "protanopia" | "deuteranopia" | "tritanopia" | "achromatopsia"

/** Colour-vision deficiency simulation matrices (sRGB approximations). */
const VISION_MATRICES: Record<Exclude<Vision, "normal">, string> = {
  protanopia: "0.567 0.433 0 0 0  0.558 0.442 0 0 0  0 0.242 0.758 0 0  0 0 0 1 0",
  deuteranopia: "0.625 0.375 0 0 0  0.7 0.3 0 0 0  0 0.3 0.7 0 0  0 0 0 1 0",
  tritanopia: "0.95 0.05 0 0 0  0 0.433 0.567 0 0  0 0.475 0.525 0 0  0 0 0 1 0",
  achromatopsia: "0.299 0.587 0.114 0 0  0.299 0.587 0.114 0 0  0.299 0.587 0.114 0 0  0 0 0 1 0",
}

function VisionFilters() {
  return (
    <svg aria-hidden className="absolute size-0">
      {Object.entries(VISION_MATRICES).map(([id, values]) => (
        <filter key={id} id={`vision-${id}`}>
          <feColorMatrix type="matrix" values={values} />
        </filter>
      ))}
    </svg>
  )
}

const visionStyle = (v: Vision) => (v === "normal" ? undefined : { filter: `url(#vision-${v})` })

function VisionSelect({ t, value, onChange }: { t: LabStrings; value: Vision; onChange: (v: Vision) => void }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[12px] font-medium text-muted-foreground">{t.design.vision}</span>
      <Select value={value} onChange={(v) => onChange(v as Vision)} options={(Object.keys(t.design.visions) as Vision[]).map((v) => ({ value: v, label: t.design.visions[v] }))} />
    </label>
  )
}

export function DesignTools({ t }: { t: LabStrings }) {
  const [tab, setTab] = useState<Tab>("palette")
  return (
    <div className="space-y-6">
      <VisionFilters />
      <div className="max-w-3xl">
        <TabBar
          label="Design"
          value={tab}
          onChange={setTab}
          tabs={[
            ...(["palette", "contrast", "shadow", "gradient"] as const).map((v) => ({ value: v, label: t.design.tabs[v] })),
            ...(["type", "glass"] as const).map((v) => ({ value: v, label: t.design.extraTabs[v] })),
          ]}
        />
      </div>
      {tab === "palette" && <PaletteTool t={t} />}
      {tab === "contrast" && <ContrastTool t={t} />}
      {tab === "shadow" && <ShadowTool t={t} />}
      {tab === "gradient" && <GradientTool t={t} />}
      {tab === "type" && <TypeScaleTool t={t} />}
      {tab === "glass" && <GlassTool t={t} />}
    </div>
  )
}

function CopySwatch({ hex, label, className }: { hex: string; label?: string; className?: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      type="button"
      title={hex}
      onClick={async () => {
        await navigator.clipboard.writeText(hex)
        setCopied(true)
        setTimeout(() => setCopied(false), 1100)
      }}
      className={cn("flex flex-col justify-end p-2 text-left transition-transform hover:-translate-y-0.5", className)}
      style={{ backgroundColor: hex, color: readableOn(hex) }}
    >
      {label && <span className="text-[11px] font-semibold">{label}</span>}
      <span className="font-mono text-[10px] uppercase opacity-85">{copied ? "✓" : hex}</span>
    </button>
  )
}

function PaletteTool({ t }: { t: LabStrings }) {
  const d = t.design
  const [base, setBase] = useState("#5a4bd6")
  const [kind, setKind] = useState<Harmony>("analogous")
  const [vision, setVision] = useState<Vision>("normal")
  const [format, setFormat] = useState<"css" | "scss" | "tailwind" | "json">("css")
  const colors = useMemo(() => harmony(base, kind), [base, kind])
  const ramp = useMemo(() => scale(base), [base])
  const code = useMemo(() => {
    const entries = [...colors.map((c, i) => [`palette-${i + 1}`, c]), ...ramp.map((s) => [`brand-${s.step}`, s.hex])]
    switch (format) {
      case "scss":
        return entries.map(([k, v]) => `$${k}: ${v};`).join("\n")
      case "tailwind":
        return `@theme {\n${entries.map(([k, v]) => `  --color-${k}: ${v};`).join("\n")}\n}`
      case "json":
        return JSON.stringify({ palette: colors, brand: Object.fromEntries(ramp.map((s) => [s.step, s.hex])) }, null, 2)
      default:
        return `:root {\n${entries.map(([k, v]) => `  --${k}: ${v};`).join("\n")}\n}`
    }
  }, [colors, ramp, format])

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      <Panel>
        <ColorField label={d.base} value={base} onChange={setBase} />
        <div>
          <span className="mb-1.5 block text-[12px] font-medium text-muted-foreground">{d.harmony}</span>
          <div className="grid grid-cols-2 gap-1.5">
            {(Object.keys(d.harmonies) as Harmony[]).map((h) => (
              <button
                key={h}
                type="button"
                onClick={() => setKind(h)}
                aria-pressed={kind === h}
                className={cn("rounded-lg border px-2 py-2 text-[12px]", kind === h ? "border-accent bg-accent-soft" : "border-line text-muted-foreground hover:text-foreground")}
              >
                {d.harmonies[h]}
              </button>
            ))}
          </div>
        </div>
        <Button onClick={() => setBase(`#${Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0")}`)}>
          <Shuffle className="size-4" aria-hidden /> {t.common.randomize}
        </Button>
        <VisionSelect t={t} value={vision} onChange={setVision} />
      </Panel>
      <div className="min-w-0 space-y-4">
        <div className="flex h-48 overflow-hidden rounded-2xl border border-line" style={visionStyle(vision)}>
          {colors.map((c) => (
            <CopySwatch key={c} hex={c} className="flex-1" />
          ))}
        </div>
        <Panel title={d.scale}>
          <div className="grid grid-cols-11 overflow-hidden rounded-xl" style={visionStyle(vision)}>
            {ramp.map((s) => (
              <CopySwatch key={s.step} hex={s.hex} label={String(s.step)} className="h-20" />
            ))}
          </div>
          <p className="text-[11px] text-subtle-foreground">{d.clickToCopy}</p>
        </Panel>
        <Segmented
          label="Format"
          value={format}
          onChange={setFormat}
          options={[
            { value: "css", label: "CSS" },
            { value: "scss", label: "SCSS" },
            { value: "tailwind", label: "Tailwind" },
            { value: "json", label: "JSON" },
          ]}
        />
        <CodeBlock code={code} copyLabel={t.common.copy} copiedLabel={t.common.copied} />
      </div>
    </div>
  )
}

function ContrastTool({ t }: { t: LabStrings }) {
  const d = t.design
  const [fg, setFg] = useState("#8b80ff")
  const [bg, setBg] = useState("#ffffff")
  const [vision, setVision] = useState<Vision>("normal")
  const ratio = contrast(fg, bg)
  const w = wcag(ratio)
  const badges = [
    { label: `${d.normal} AA`, ok: w.aa },
    { label: `${d.normal} AAA`, ok: w.aaa },
    { label: `${d.large} AA`, ok: w.aaLarge },
    { label: `${d.large} AAA`, ok: w.aaaLarge },
  ]

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      <Panel>
        <ColorField label={d.foreground} value={fg} onChange={setFg} />
        <ColorField label={d.background} value={bg} onChange={setBg} />
        <Button
          onClick={() => {
            const a = fg
            setFg(bg)
            setBg(a)
          }}
        >
          ⇄
        </Button>
        <Button variant="primary" disabled={w.aa} onClick={() => setFg(fixContrast(fg, bg, 4.5))}>
          {d.fix}
        </Button>
        <VisionSelect t={t} value={vision} onChange={setVision} />
      </Panel>
      <div className="min-w-0 space-y-4">
        <div className="rounded-2xl border border-line p-8" style={{ backgroundColor: bg, color: fg, ...visionStyle(vision) }}>
          <p className="text-4xl font-semibold tracking-tight">{ratio.toFixed(2)} : 1</p>
          <p className="mt-4 text-2xl font-semibold">{d.sample}</p>
          <p className="mt-2 text-[15px]">{d.sample}</p>
          <p className="mt-2 text-[12px]">{d.sample}</p>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {badges.map((b) => (
            <div key={b.label} className={cn("rounded-xl border p-3 text-center", b.ok ? "border-success/30 bg-success/10" : "border-destructive/30 bg-destructive/10")}>
              <p className="text-lg font-semibold">{b.ok ? "✓" : "✕"}</p>
              <p className="text-[11px] text-muted-foreground">{b.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ShadowTool({ t }: { t: LabStrings }) {
  const d = t.design
  const [layers, setLayers] = useState(5)
  const [offset, setOffset] = useState(24)
  const [blur, setBlur] = useState(48)
  const [opacity, setOpacity] = useState(18)
  const [color, setColor] = useState("#1e1b4b")
  const [surface, setSurface] = useState("#eef0f6")

  /** Layered shadows with eased distances look far softer than one big blur. */
  const shadow = useMemo(() => {
    const { r, g, b } = hexToRgb(color)
    return Array.from({ length: layers }, (_, i) => {
      const k = ((i + 1) / layers) ** 2
      return `0 ${Math.round(offset * k * 10) / 10}px ${Math.round(blur * k * 10) / 10}px rgba(${r}, ${g}, ${b}, ${Math.round((opacity / 100 / layers) * 1.6 * 1000) / 1000})`
    }).join(",\n  ")
  }, [layers, offset, blur, opacity, color])

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      <Panel>
        <Slider label={d.layers} value={layers} min={1} max={8} onChange={setLayers} />
        <Slider label={d.offset} value={offset} min={0} max={80} onChange={setOffset} format={(v) => `${v}px`} />
        <Slider label={d.blur} value={blur} min={0} max={160} onChange={setBlur} format={(v) => `${v}px`} />
        <Slider label={d.opacity} value={opacity} min={2} max={80} onChange={setOpacity} format={(v) => `${v}%`} />
        <ColorField label={d.color} value={color} onChange={setColor} />
        <ColorField label={d.surface} value={surface} onChange={setSurface} />
      </Panel>
      <div className="min-w-0 space-y-4">
        <div className="grid h-80 place-items-center rounded-2xl border border-line" style={{ backgroundColor: surface }}>
          <div className="size-44 rounded-3xl bg-white" style={{ boxShadow: shadow.replace(/,\n {2}/g, ", ") }} />
        </div>
        <CodeBlock code={`box-shadow:\n  ${shadow};`} copyLabel={t.common.copy} copiedLabel={t.common.copied} />
      </div>
    </div>
  )
}

function GradientTool({ t }: { t: LabStrings }) {
  const d = t.design
  const [type, setType] = useState<"linear" | "radial" | "conic">("linear")
  const [angle, setAngle] = useState(135)
  const [stops, setStops] = useState(["#6d5dfc", "#22d3ee", "#f472b6"])

  const value =
    type === "linear"
      ? `linear-gradient(${angle}deg, ${stops.join(", ")})`
      : type === "radial"
        ? `radial-gradient(circle at 30% 20%, ${stops.join(", ")})`
        : `conic-gradient(from ${angle}deg at 50% 50%, ${stops.join(", ")}, ${stops[0]})`

  const random = () => {
    const hue = Math.random() * 360
    setStops(stops.map((_, i) => `hsl(${Math.round((hue + i * 55) % 360)} 85% 60%)`).map(hslToHex))
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      <Panel>
        <Segmented label={d.type} value={type} onChange={setType} options={(["linear", "radial", "conic"] as const).map((v) => ({ value: v, label: d.types[v] }))} />
        {type !== "radial" && <Slider label={d.angle} value={angle} min={0} max={360} onChange={setAngle} format={(v) => `${v}°`} />}
        <div className="space-y-3">
          <span className="block text-[12px] font-medium text-muted-foreground">{d.stops}</span>
          {stops.map((s, i) => (
            <div key={i} className="flex items-end gap-2">
              <div className="flex-1">
                <ColorField label={`#${i + 1}`} value={s} onChange={(v) => setStops(stops.map((x, j) => (j === i ? v : x)))} />
              </div>
              <button type="button" aria-label="Remove" disabled={stops.length <= 2} onClick={() => setStops(stops.filter((_, j) => j !== i))} className="mb-1 grid size-8 place-items-center rounded-md text-muted-foreground hover:text-destructive disabled:opacity-30">
                <Trash2 className="size-4" />
              </button>
            </div>
          ))}
          <div className="flex gap-2">
            <Button size="sm" disabled={stops.length >= 6} onClick={() => setStops([...stops, "#fbbf24"])}>
              <Plus className="size-3.5" aria-hidden /> {d.addStop}
            </Button>
            <Button size="sm" onClick={random}>
              <Shuffle className="size-3.5" aria-hidden /> {t.common.randomize}
            </Button>
          </div>
        </div>
      </Panel>
      <div className="min-w-0 space-y-4">
        <div className="h-80 rounded-2xl border border-line" style={{ background: value }} />
        <CodeBlock code={`background: ${value};`} copyLabel={t.common.copy} copiedLabel={t.common.copied} />
      </div>
    </div>
  )
}

function hslToHex(hsl: string) {
  const [h, s, l] = hsl.match(/[\d.]+/g)!.map(Number)
  const a = (s / 100) * Math.min(l / 100, 1 - l / 100)
  const f = (n: number) => {
    const k = (n + h / 30) % 12
    const c = l / 100 - a * Math.max(-1, Math.min(k - 3, 9 - k, 1))
    return Math.round(c * 255)
      .toString(16)
      .padStart(2, "0")
  }
  return `#${f(0)}${f(8)}${f(4)}`
}

const RATIOS = [
  { value: "1.125", label: "1.125 — Major second" },
  { value: "1.2", label: "1.2 — Minor third" },
  { value: "1.25", label: "1.25 — Major third" },
  { value: "1.333", label: "1.333 — Perfect fourth" },
  { value: "1.414", label: "1.414 — Augmented fourth" },
  { value: "1.5", label: "1.5 — Perfect fifth" },
  { value: "1.618", label: "1.618 — Golden ratio" },
]

const round3 = (n: number) => Math.round(n * 1000) / 1000

/** Modular type scale; in fluid mode each step interpolates between a mobile and a desktop scale (Utopia-style). */
function TypeScaleTool({ t }: { t: LabStrings }) {
  const d = t.design
  const [base, setBase] = useState(18)
  const [ratio, setRatio] = useState("1.25")
  const [steps, setSteps] = useState(6)
  const [fluid, setFluid] = useState(true)
  const [minVw, setMinVw] = useState(360)
  const [maxVw, setMaxVw] = useState(1440)

  const scaleSteps = useMemo(() => {
    const r = Number(ratio)
    const minBase = base * 0.875
    const minRatio = 1 + (r - 1) * 0.8
    return Array.from({ length: steps + 2 }, (_, i) => {
      const step = i - 2
      const max = base * r ** step
      const min = minBase * minRatio ** step
      const slope = (max - min) / (maxVw - minVw)
      const intercept = min - slope * minVw
      const clamp = `clamp(${round3(min / 16)}rem, ${round3(intercept / 16)}rem + ${round3(slope * 100)}vw, ${round3(max / 16)}rem)`
      return { step, min, max, value: fluid ? clamp : `${round3(max / 16)}rem` }
    }).reverse()
  }, [base, ratio, steps, fluid, minVw, maxVw])

  const code = `:root {\n${scaleSteps.map((s) => `  --step-${s.step < 0 ? `-${Math.abs(s.step)}` : s.step}: ${s.value};`).join("\n")}\n}`

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      <Panel>
        <Slider label={d.baseSize} value={base} min={12} max={24} onChange={setBase} format={(v) => `${v}px`} />
        <label className="block">
          <span className="mb-1.5 block text-[12px] font-medium text-muted-foreground">{d.scaleRatio}</span>
          <Select value={ratio} onChange={setRatio} options={RATIOS} />
        </label>
        <Slider label={d.steps} value={steps} min={3} max={9} onChange={setSteps} />
        <ToggleRow label={d.fluid} checked={fluid} onChange={setFluid} />
        {fluid && (
          <>
            <Slider label={d.minWidth} value={minVw} min={320} max={768} step={8} onChange={setMinVw} format={(v) => `${v}px`} />
            <Slider label={d.maxWidth} value={maxVw} min={1024} max={1920} step={16} onChange={setMaxVw} format={(v) => `${v}px`} />
          </>
        )}
      </Panel>
      <div className="min-w-0 space-y-4">
        <Panel title={d.preview}>
          <ul className="space-y-3 overflow-hidden">
            {scaleSteps.map((s) => (
              <li key={s.step} className="flex items-baseline gap-4">
                <span className="w-24 shrink-0 font-mono text-[11px] text-subtle-foreground">
                  {s.step} · {Math.round(s.max)}px
                </span>
                <span className="truncate font-semibold tracking-tight" style={{ fontSize: s.value }}>
                  {d.sample}
                </span>
              </li>
            ))}
          </ul>
        </Panel>
        <CodeBlock code={code} copyLabel={t.common.copy} copiedLabel={t.common.copied} />
      </div>
    </div>
  )
}

function GlassTool({ t }: { t: LabStrings }) {
  const d = t.design
  const [blur, setBlur] = useState(18)
  const [transparency, setTransparency] = useState(18)
  const [saturation, setSaturation] = useState(160)
  const [border, setBorder] = useState(24)
  const [tint, setTint] = useState("#ffffff")
  const { r, g, b } = hexToRgb(tint)

  const css = [
    `background: rgba(${r}, ${g}, ${b}, ${transparency / 100});`,
    `backdrop-filter: blur(${blur}px) saturate(${saturation}%);`,
    `-webkit-backdrop-filter: blur(${blur}px) saturate(${saturation}%);`,
    `border: 1px solid rgba(255, 255, 255, ${border / 100});`,
    `box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);`,
  ].join("\n")

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      <Panel>
        <Slider label={d.blur} value={blur} min={0} max={48} onChange={setBlur} format={(v) => `${v}px`} />
        <Slider label={d.transparency} value={transparency} min={0} max={80} onChange={setTransparency} format={(v) => `${v}%`} />
        <Slider label={d.saturation} value={saturation} min={100} max={250} step={5} onChange={setSaturation} format={(v) => `${v}%`} />
        <Slider label={d.border} value={border} min={0} max={80} onChange={setBorder} format={(v) => `${v}%`} />
        <ColorField label={d.tint} value={tint} onChange={setTint} />
      </Panel>
      <div className="min-w-0 space-y-4">
        <div className="relative grid h-96 place-items-center overflow-hidden rounded-2xl border border-line bg-[#0f0f1a]">
          <div className="absolute left-[15%] top-[12%] size-48 rounded-full bg-[#6d5dfc]" />
          <div className="absolute bottom-[8%] right-[18%] size-56 rounded-full bg-[#22d3ee]" />
          <div className="absolute bottom-[20%] left-[40%] size-32 rounded-full bg-[#f472b6]" />
          <div
            className="relative w-72 rounded-3xl p-6 text-white"
            style={{
              background: `rgba(${r}, ${g}, ${b}, ${transparency / 100})`,
              backdropFilter: `blur(${blur}px) saturate(${saturation}%)`,
              WebkitBackdropFilter: `blur(${blur}px) saturate(${saturation}%)`,
              border: `1px solid rgba(255,255,255,${border / 100})`,
              boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
            }}
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] opacity-80">Glass</p>
            <p className="mt-3 text-2xl font-semibold tracking-tight">Félicien Mukamba</p>
            <p className="mt-1 text-[13px] opacity-80">Software & AI Engineer</p>
          </div>
        </div>
        <CodeBlock code={css} copyLabel={t.common.copy} copiedLabel={t.common.copied} />
      </div>
    </div>
  )
}
