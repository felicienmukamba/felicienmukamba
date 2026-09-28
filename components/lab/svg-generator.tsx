"use client"

import { useMemo, useState } from "react"
import { Shuffle } from "lucide-react"
import { Button, CodeBlock, ColorField, CopyButton, Panel, Select, Slider, ToggleRow } from "@/components/kit/controls"
import type { LabStrings } from "@/lib/lab/i18n"
import { bauhaus, blob, contours, mesh, pattern, patternTile, waves, type PatternType } from "@/lib/lab/svg-gen"
import { downloadBlob, downloadText, svgDataUrl, svgToPng } from "@/lib/kit/download"

type Tab = "blob" | "waves" | "pattern" | "mesh" | "bauhaus" | "contours"

const PALETTES = [
  ["#6d5dfc", "#22d3ee", "#f472b6", "#fbbf24"],
  ["#0f7a5c", "#34d399", "#0b3b5b", "#f5a524"],
  ["#ef4444", "#f97316", "#facc15", "#7c3aed"],
  ["#0ea5e9", "#6366f1", "#a855f7", "#ec4899"],
  ["#e63946", "#f1faee", "#a8dadc", "#1d3557"],
  ["#264653", "#2a9d8f", "#e9c46a", "#e76f51"],
]

const CANVASES = [
  { id: "hd", label: "1920 × 1080", w: 1920, h: 1080 },
  { id: "hero", label: "1440 × 480", w: 1440, h: 480 },
  { id: "og", label: "1200 × 630", w: 1200, h: 630 },
  { id: "square", label: "1080 × 1080", w: 1080, h: 1080 },
  { id: "story", label: "1080 × 1920", w: 1080, h: 1920 },
]

export function SvgGenerator({ t }: { t: LabStrings }) {
  const s = t.svg
  const [tab, setTab] = useState<Tab>("blob")
  const [seed, setSeed] = useState(12)
  const [canvas, setCanvas] = useState("hero")
  const [colorA, setColorA] = useState("#6d5dfc")
  const [colorB, setColorB] = useState("#22d3ee")
  const [background, setBackground] = useState("#0f0f1a")
  const [palette, setPalette] = useState(0)
  // Blob
  const [points, setPoints] = useState(7)
  const [randomness, setRandomness] = useState(55)
  const [gradient, setGradient] = useState(true)
  const [outline, setOutline] = useState(false)
  const [animate, setAnimate] = useState(false)
  // Waves
  const [layers, setLayers] = useState(4)
  const [amplitude, setAmplitude] = useState(60)
  const [frequency, setFrequency] = useState(5)
  const [flip, setFlip] = useState(false)
  // Pattern
  const [type, setType] = useState<PatternType>("dots")
  const [spacing, setSpacing] = useState(24)
  const [stroke, setStroke] = useState(2)
  const [opacity, setOpacity] = useState(100)
  const [rotation, setRotation] = useState(0)
  // Mesh
  const [spots, setSpots] = useState(5)
  const [blur, setBlur] = useState(90)
  const [grain, setGrain] = useState(true)
  // Bauhaus
  const [cols, setCols] = useState(8)
  // Contours
  const [lines, setLines] = useState(14)
  const [peaks, setPeaks] = useState(3)

  const size = CANVASES.find((c) => c.id === canvas) ?? CANVASES[1]
  const colors = PALETTES[palette]
  const usesCanvas = tab !== "blob"
  const usesPalette = tab === "mesh" || tab === "bauhaus"

  const { svg, w, h } = useMemo(() => {
    const { w, h } = size
    switch (tab) {
      case "blob":
        return { svg: blob({ seed, points, randomness, size: 600, colorA, colorB, gradient, outline, animate }), w: 600, h: 600 }
      case "waves":
        return { svg: waves({ seed, width: w, height: h, layers, amplitude, frequency, colorA, colorB, flip }), w, h }
      case "pattern":
        return { svg: pattern({ type, spacing, stroke, background, foreground: colorA, opacity: opacity / 100, rotation }, w, h), w, h }
      case "mesh":
        return { svg: mesh({ seed, width: w, height: h, points: spots, blur, colors, background, grain }), w, h }
      case "bauhaus":
        return { svg: bauhaus({ seed, width: w, height: h, cols, colors, background }), w, h }
      case "contours":
        return { svg: contours({ seed, width: w, height: h, lines, peaks, stroke, color: colorA, background }), w, h }
    }
  }, [tab, size, seed, points, randomness, colorA, colorB, gradient, outline, animate, layers, amplitude, frequency, flip, type, spacing, stroke, background, opacity, rotation, spots, blur, colors, grain, cols, lines, peaks])

  const css = useMemo(
    () => `background-color: ${background};\nbackground-image: url("${svgDataUrl(patternTile({ type, spacing, stroke, background, foreground: colorA, opacity: opacity / 100 }))}");`,
    [type, spacing, stroke, background, colorA, opacity],
  )

  const randomize = () => {
    setSeed(Math.floor(Math.random() * 1e6))
    if (usesPalette) setPalette(Math.floor(Math.random() * PALETTES.length))
  }

  const tabs: { value: Tab; label: string }[] = [
    ...(["blob", "waves", "pattern", "mesh"] as const).map((v) => ({ value: v, label: s.tabs[v] })),
    ...(["bauhaus", "contours"] as const).map((v) => ({ value: v, label: s.extraTabs[v] })),
  ]

  return (
    <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-1 rounded-xl border border-line p-1" role="tablist" aria-label="SVG">
          {tabs.map((tb) => (
            <button
              key={tb.value}
              type="button"
              role="tab"
              aria-selected={tab === tb.value}
              onClick={() => setTab(tb.value)}
              className={`rounded-lg px-2 py-2 text-[12.5px] font-medium transition-colors ${tab === tb.value ? "bg-surface-2 text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              {tb.label}
            </button>
          ))}
        </div>
        <Panel>
          {usesCanvas && (
            <label className="block">
              <span className="mb-1.5 block text-[12px] font-medium text-muted-foreground">{s.canvas}</span>
              <Select value={canvas} onChange={setCanvas} options={CANVASES.map((c) => ({ value: c.id, label: c.label }))} />
            </label>
          )}
          {tab === "blob" && (
            <>
              <Slider label={s.complexity} value={points} min={3} max={14} onChange={setPoints} />
              <Slider label={s.randomness} value={randomness} min={0} max={100} onChange={setRandomness} format={(v) => `${v}%`} />
              <ToggleRow label={s.gradient} checked={gradient} onChange={setGradient} />
              <ToggleRow label={s.outline} checked={outline} onChange={setOutline} />
              <ToggleRow label={s.animate} checked={animate} onChange={setAnimate} />
            </>
          )}
          {tab === "waves" && (
            <>
              <Slider label={s.layers} value={layers} min={1} max={8} onChange={setLayers} />
              <Slider label={s.amplitude} value={amplitude} min={0} max={200} onChange={setAmplitude} />
              <Slider label={s.frequency} value={frequency} min={1} max={16} onChange={setFrequency} />
              <ToggleRow label={s.flip} checked={flip} onChange={setFlip} />
            </>
          )}
          {tab === "pattern" && (
            <>
              <div className="grid grid-cols-3 gap-1.5">
                {(Object.keys(s.patternTypes) as PatternType[]).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setType(p)}
                    aria-pressed={type === p}
                    className={`overflow-hidden rounded-lg border text-[11px] ${type === p ? "border-accent" : "border-line"}`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={svgDataUrl(pattern({ type: p, spacing: 12, stroke: 1.5, background, foreground: colorA }, 120, 60))} alt="" className="h-10 w-full object-cover" />
                    <span className="block py-1">{s.patternTypes[p]}</span>
                  </button>
                ))}
              </div>
              <Slider label={s.spacing} value={spacing} min={8} max={80} onChange={setSpacing} />
              <Slider label={s.stroke} value={stroke} min={0.5} max={10} step={0.5} onChange={setStroke} />
              <Slider label={s.opacity} value={opacity} min={5} max={100} onChange={setOpacity} format={(v) => `${v}%`} />
              <Slider label={s.rotation} value={rotation} min={0} max={180} step={5} onChange={setRotation} format={(v) => `${v}°`} />
            </>
          )}
          {tab === "mesh" && (
            <>
              <Slider label={s.points} value={spots} min={2} max={10} onChange={setSpots} />
              <Slider label={s.blur} value={blur} min={20} max={240} onChange={setBlur} />
              <ToggleRow label={s.grain} checked={grain} onChange={setGrain} />
            </>
          )}
          {tab === "bauhaus" && <Slider label={s.cells} value={cols} min={2} max={20} onChange={setCols} />}
          {tab === "contours" && (
            <>
              <Slider label={s.lines} value={lines} min={4} max={40} onChange={setLines} />
              <Slider label={s.points} value={peaks} min={1} max={8} onChange={setPeaks} />
              <Slider label={s.stroke} value={stroke} min={0.5} max={6} step={0.5} onChange={setStroke} />
            </>
          )}

          {usesPalette && (
            <div className="grid grid-cols-3 gap-2">
              {PALETTES.map((p, i) => (
                <button key={i} type="button" onClick={() => setPalette(i)} aria-pressed={palette === i} aria-label={`Palette ${i + 1}`} className={`flex h-8 overflow-hidden rounded-lg border-2 ${palette === i ? "border-foreground" : "border-transparent"}`}>
                  {p.map((c) => (
                    <span key={c} className="flex-1" style={{ backgroundColor: c }} />
                  ))}
                </button>
              ))}
            </div>
          )}
          {!usesPalette && (
            <div className="grid grid-cols-2 gap-3">
              <ColorField label={tab === "pattern" || tab === "contours" ? s.foreground : s.colorA} value={colorA} onChange={setColorA} />
              {(tab === "blob" || tab === "waves") && <ColorField label={s.colorB} value={colorB} onChange={setColorB} />}
            </div>
          )}
          {tab !== "blob" && tab !== "waves" && <ColorField label={s.background} value={background} onChange={setBackground} />}
          {tab !== "pattern" && (
            <Button onClick={randomize} className="w-full">
              <Shuffle className="size-4" aria-hidden /> {t.common.randomize}
            </Button>
          )}
        </Panel>
      </div>

      <div className="min-w-0 space-y-4">
        <div className="grid place-items-center overflow-hidden rounded-2xl border border-line bg-[repeating-conic-gradient(var(--surface-2)_0_25%,transparent_0_50%)] bg-[length:18px_18px] p-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={svgDataUrl(svg)} alt={tabs.find((x) => x.value === tab)?.label} className="max-h-[480px] w-auto max-w-full object-contain" style={{ aspectRatio: `${w} / ${h}` }} />
        </div>
        <div className="flex flex-wrap gap-2">
          <CopyButton size="md" text={svg} label={s.copySvg} copiedLabel={t.common.copied} />
          {tab === "pattern" && <CopyButton size="md" text={css} label={s.copyCss} copiedLabel={t.common.copied} />}
          <Button onClick={() => downloadText(svg, `${tab}-${seed}.svg`, "image/svg+xml")}>{t.common.download} SVG</Button>
          <Button onClick={async () => downloadBlob(await svgToPng(svg, w, h, w <= 1200 ? 2 : 1), `${tab}-${seed}.png`)}>{t.common.download} PNG</Button>
        </div>
        <Panel title={t.common.code}>
          <CodeBlock code={tab === "pattern" ? css : svg} copyLabel={t.common.copy} copiedLabel={t.common.copied} />
        </Panel>
      </div>
    </div>
  )
}
