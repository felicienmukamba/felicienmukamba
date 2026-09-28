"use client"

import { useMemo, useRef, useState } from "react"
import { Download, ImagePlus, RefreshCw, Wand2, X } from "lucide-react"
import { Button, CodeBlock, ColorField, Field, Panel, Segmented, Slider, TabBar, TextInput, Toggle } from "@/components/kit/controls"
import { contrast, extractPalette, hexToOklch, oklchToHex, readableOn, scale, wcag } from "@/lib/lab/color"
import { brandSheet, templates, type Brand, type TemplateGroup } from "@/lib/lab/brand-templates"
import { CATEGORIES, generateProducts, toCsv, toSql, type Currency, type DataLang } from "@/lib/lab/demo-data"
import { fill, type LabStrings } from "@/lib/lab/i18n"
import { downloadBlob, downloadText, slugify, svgDataUrl, svgToImage, type RasterFormat } from "@/lib/kit/download"
import { cn } from "@/lib/utils"

type Tab = "identity" | "assets" | "data"

type ExportOptions = { format: RasterFormat; scale: number }

async function exportRaster(svg: string, w: number, h: number, name: string, { format, scale }: ExportOptions) {
  const ext = format === "jpeg" ? "jpg" : format
  downloadBlob(await svgToImage(svg, w, h, scale, format), `${name}.${ext}`)
}

/** Curated starting points; the Congo palette follows the national flag. */
const PALETTES: { name: string; primary: string; secondary: string; accent: string; dark: string; light: string }[] = [
  { name: "Kivu", primary: "#0f7a5c", secondary: "#0b3b5b", accent: "#f5a524", dark: "#0f172a", light: "#f8fafc" },
  { name: "Congo", primary: "#007fff", secondary: "#0047ab", accent: "#f7d618", dark: "#0b1530", light: "#f5f8ff" },
  { name: "Sunset", primary: "#e4572e", secondary: "#a4243b", accent: "#ffc914", dark: "#1f1300", light: "#fff8f0" },
  { name: "Royal", primary: "#5a4bd6", secondary: "#2b2170", accent: "#22d3ee", dark: "#111027", light: "#f6f5ff" },
  { name: "Coffee", primary: "#6f4e37", secondary: "#3b2a20", accent: "#e8b04b", dark: "#1c140f", light: "#fbf6ef" },
  { name: "Mint", primary: "#10b981", secondary: "#047857", accent: "#f472b6", dark: "#052e22", light: "#f0fdf8" },
  { name: "Ocean", primary: "#0e7490", secondary: "#164e63", accent: "#fb923c", dark: "#082f3a", light: "#f0fbff" },
  { name: "Noir", primary: "#111827", secondary: "#374151", accent: "#ef4444", dark: "#030712", light: "#f9fafb" },
]

function Swatch({ hex, label, big }: { hex: string; label?: string; big?: boolean }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      type="button"
      onClick={async () => {
        await navigator.clipboard.writeText(hex)
        setCopied(true)
        setTimeout(() => setCopied(false), 1200)
      }}
      title={hex}
      className={cn("group relative flex flex-col justify-end rounded-xl p-2 text-left transition-transform hover:-translate-y-0.5", big ? "h-24" : "h-14")}
      style={{ backgroundColor: hex, color: readableOn(hex) }}
    >
      {label && <span className="text-[11px] font-semibold">{label}</span>}
      <span className="font-mono text-[10px] uppercase opacity-80">{copied ? "✓" : hex}</span>
    </button>
  )
}

export function BrandKit({ t, lang }: { t: LabStrings; lang: DataLang }) {
  const s = t.brand
  const [tab, setTab] = useState<Tab>("assets")
  const [brand, setBrand] = useState<Brand>({
    ...s.defaults,
    logo: null,
    primary: "#0f7a5c",
    secondary: "#0b3b5b",
    accent: "#f5a524",
    dark: "#0f172a",
    light: "#f8fafc",
    radius: "soft",
    font: "sans",
    theme: "light",
    background: "gradient",
    pattern: "dots",
  })
  const [group, setGroup] = useState<TemplateGroup | "all">("all")
  const [exportOpts, setExportOpts] = useState<ExportOptions>({ format: "png", scale: 1 })
  const fileInput = useRef<HTMLInputElement>(null)
  const set = <K extends keyof Brand>(key: K, value: Brand[K]) => setBrand((b) => ({ ...b, [key]: value }))

  const rendered = useMemo(
    () => templates.filter((tpl) => group === "all" || tpl.group === group).map((tpl) => ({ ...tpl, svg: tpl.render(brand) })),
    [brand, group],
  )
  const sheet = useMemo(() => brandSheet(brand, { palette: s.palette, typography: s.typography }), [brand, s.palette, s.typography])
  const base = slugify(brand.name)

  function onLogo(file: File) {
    const reader = new FileReader()
    reader.onload = () => set("logo", String(reader.result))
    reader.readAsDataURL(file)
  }

  function extract() {
    if (!brand.logo) return
    const img = new Image()
    img.onload = () => {
      const colors = extractPalette(img, 3)
      if (!colors.length) return
      const primary = colors[0]
      const lch = hexToOklch(primary)
      setBrand((b) => ({
        ...b,
        primary,
        secondary: colors[1] ?? oklchToHex({ ...lch, l: Math.max(0.25, lch.l - 0.22), h: (lch.h + 20) % 360 }),
        accent: colors[2] ?? oklchToHex({ l: 0.78, c: 0.16, h: (lch.h + 180) % 360 }),
        dark: oklchToHex({ l: 0.2, c: Math.min(lch.c, 0.04), h: lch.h }),
        light: oklchToHex({ l: 0.98, c: 0.01, h: lch.h }),
      }))
    }
    img.src = brand.logo
  }

  function harmonize() {
    const lch = hexToOklch(brand.primary)
    setBrand((b) => ({
      ...b,
      secondary: oklchToHex({ l: Math.max(0.22, lch.l - 0.2), c: lch.c * 0.9, h: (lch.h + 25) % 360 }),
      accent: oklchToHex({ l: 0.8, c: Math.max(0.12, lch.c), h: (lch.h + 180) % 360 }),
      dark: oklchToHex({ l: 0.2, c: Math.min(lch.c, 0.04), h: lch.h }),
      light: oklchToHex({ l: 0.98, c: 0.01, h: lch.h }),
    }))
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
      <div className="space-y-4">
        <Panel title={s.brandPanel}>
          <Field label={s.name}>
            <TextInput value={brand.name} onChange={(e) => set("name", e.target.value)} />
          </Field>
          <Field label={s.tagline}>
            <TextInput value={brand.tagline} onChange={(e) => set("tagline", e.target.value)} />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label={s.handle}>
              <TextInput value={brand.handle} onChange={(e) => set("handle", e.target.value)} />
            </Field>
            <Field label={s.cta}>
              <TextInput value={brand.cta} onChange={(e) => set("cta", e.target.value)} />
            </Field>
            <Field label={s.promoLabel}>
              <TextInput value={brand.promoLabel} onChange={(e) => set("promoLabel", e.target.value)} />
            </Field>
            <Field label={s.promo}>
              <TextInput value={brand.promo} onChange={(e) => set("promo", e.target.value)} />
            </Field>
          </div>
          <Field label={s.product}>
            <TextInput value={brand.product} onChange={(e) => set("product", e.target.value)} />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label={s.price}>
              <TextInput value={brand.price} onChange={(e) => set("price", e.target.value)} />
            </Field>
            <Field label={s.oldPrice}>
              <TextInput value={brand.oldPrice} onChange={(e) => set("oldPrice", e.target.value)} />
            </Field>
          </div>
        </Panel>

        <Panel title={s.logo}>
          <div className="flex items-center gap-3">
            <div className="grid size-16 shrink-0 place-items-center overflow-hidden rounded-xl border border-line bg-[repeating-conic-gradient(var(--surface-2)_0_25%,transparent_0_50%)] bg-[length:12px_12px]">
              {brand.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={brand.logo} alt="" className="size-full object-contain p-1.5" />
              ) : (
                <ImagePlus className="size-5 text-subtle-foreground" aria-hidden />
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              <Button size="sm" onClick={() => fileInput.current?.click()}>
                <ImagePlus className="size-3.5" aria-hidden /> {s.upload}
              </Button>
              {brand.logo && (
                <Button size="sm" variant="ghost" onClick={() => set("logo", null)}>
                  <X className="size-3.5" aria-hidden /> {s.remove}
                </Button>
              )}
            </div>
          </div>
          {brand.logo && (
            <Button size="sm" variant="primary" onClick={extract} className="w-full">
              <Wand2 className="size-3.5" aria-hidden /> {s.extract}
            </Button>
          )}
          <p className="text-[11px] text-subtle-foreground">{s.logoHint}</p>
          <input ref={fileInput} type="file" accept="image/png,image/jpeg,image/svg+xml,image/webp" hidden onChange={(e) => e.target.files?.[0] && onLogo(e.target.files[0])} />
        </Panel>

        <Panel title={s.colors}>
          <div className="grid grid-cols-2 gap-3">
            <ColorField label={s.primary} value={brand.primary} onChange={(v) => set("primary", v)} />
            <ColorField label={s.secondary} value={brand.secondary} onChange={(v) => set("secondary", v)} />
            <ColorField label={s.accent} value={brand.accent} onChange={(v) => set("accent", v)} />
            <ColorField label={s.dark} value={brand.dark} onChange={(v) => set("dark", v)} />
          </div>
          <Button size="sm" onClick={harmonize} className="w-full">
            <Wand2 className="size-3.5" aria-hidden /> {s.harmonize}
          </Button>
          <div>
            <p className="mb-2 text-[12px] font-medium text-muted-foreground">{s.presets}</p>
            <div className="grid grid-cols-4 gap-1.5">
              {PALETTES.map((p) => (
                <button
                  key={p.name}
                  type="button"
                  title={p.name}
                  onClick={() => setBrand((b) => ({ ...b, primary: p.primary, secondary: p.secondary, accent: p.accent, dark: p.dark, light: p.light }))}
                  className="group overflow-hidden rounded-lg border border-line text-left hover:border-line-strong"
                >
                  <span className="flex h-6">
                    {[p.primary, p.secondary, p.accent].map((c) => (
                      <span key={c} className="flex-1" style={{ backgroundColor: c }} />
                    ))}
                  </span>
                  <span className="block px-1.5 py-1 text-[10px] text-muted-foreground group-hover:text-foreground">{p.name}</span>
                </button>
              ))}
            </div>
          </div>
        </Panel>

        <Panel title={s.style}>
          <Field label={s.radius}>
            <Segmented label={s.radius} value={brand.radius} onChange={(v) => set("radius", v)} options={(["sharp", "soft", "round"] as const).map((v) => ({ value: v, label: s.radiusOptions[v] }))} />
          </Field>
          <Field label={s.font}>
            <Segmented label={s.font} value={brand.font} onChange={(v) => set("font", v)} options={(["sans", "serif", "rounded"] as const).map((v) => ({ value: v, label: s.fontOptions[v] }))} />
          </Field>
          <Field label={s.background}>
            <Segmented label={s.background} value={brand.background} onChange={(v) => set("background", v)} options={(["gradient", "solid", "duotone"] as const).map((v) => ({ value: v, label: s.backgroundOptions[v] }))} />
          </Field>
          <Field label={s.pattern}>
            <Segmented label={s.pattern} value={brand.pattern} onChange={(v) => set("pattern", v)} options={(["dots", "grid", "diagonal", "none"] as const).map((v) => ({ value: v, label: s.patternOptions[v] }))} />
          </Field>
          <Field label={s.theme}>
            <Segmented label={s.theme} value={brand.theme} onChange={(v) => set("theme", v)} options={(["light", "dark"] as const).map((v) => ({ value: v, label: s.themeOptions[v] }))} />
          </Field>
        </Panel>
      </div>

      <div className="min-w-0 space-y-4">
        <TabBar label={s.brandPanel} value={tab} onChange={setTab} tabs={(["assets", "identity", "data"] as const).map((v) => ({ value: v, label: s.tabs[v] }))} />

        {tab === "assets" && (
          <>
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div className="flex flex-wrap gap-1.5">
                {(["all", "marketplace", "social", "print", "digital"] as const).map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGroup(g)}
                    aria-pressed={group === g}
                    className={cn("rounded-full border px-3 py-1.5 text-[12px]", group === g ? "border-accent bg-accent-soft text-foreground" : "border-line text-muted-foreground hover:text-foreground")}
                  >
                    {s.groups[g]}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap items-end gap-2">
                <Segmented
                  label={s.format}
                  value={exportOpts.format}
                  onChange={(format) => setExportOpts((o) => ({ ...o, format }))}
                  options={[
                    { value: "png", label: "PNG" },
                    { value: "jpeg", label: "JPG" },
                    { value: "webp", label: "WebP" },
                  ]}
                />
                <Segmented
                  label={s.scale}
                  value={String(exportOpts.scale)}
                  onChange={(v) => setExportOpts((o) => ({ ...o, scale: Number(v) }))}
                  options={["1", "2", "3"].map((v) => ({ value: v, label: `${v}×` }))}
                />
                <Button
                  variant="primary"
                  onClick={async () => {
                    for (const tpl of rendered) await exportRaster(tpl.svg, tpl.w, tpl.h, `${base}-${tpl.id}`, exportOpts)
                  }}
                >
                  <Download className="size-4" aria-hidden /> {s.downloadAll}
                </Button>
              </div>
            </div>
            <div className="columns-1 gap-4 md:columns-2 [&>*]:mb-4">
              {rendered.map((tpl) => (
                <figure key={tpl.id} className="card break-inside-avoid overflow-hidden rounded-2xl">
                  <div className="bg-[repeating-conic-gradient(var(--surface-2)_0_25%,transparent_0_50%)] bg-[length:16px_16px] p-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={svgDataUrl(tpl.svg)} alt={s.templates[tpl.id as keyof typeof s.templates]} className="mx-auto max-h-80 w-auto rounded-md shadow-lg" style={{ aspectRatio: `${tpl.w} / ${tpl.h}` }} />
                  </div>
                  <figcaption className="flex items-center justify-between gap-2 border-t border-line px-4 py-3">
                    <span>
                      <span className="block text-[13px] font-medium">{s.templates[tpl.id as keyof typeof s.templates]}</span>
                      <span className="font-mono text-[11px] text-subtle-foreground">
                        {tpl.w}×{tpl.h}
                      </span>
                    </span>
                    <span className="flex gap-1.5">
                      <Button size="sm" onClick={() => downloadText(tpl.svg, `${base}-${tpl.id}.svg`, "image/svg+xml")}>
                        {t.common.svg}
                      </Button>
                      <Button size="sm" onClick={() => exportRaster(tpl.svg, tpl.w, tpl.h, `${base}-${tpl.id}`, exportOpts)}>
                        {exportOpts.format === "jpeg" ? "JPG" : exportOpts.format.toUpperCase()}
                      </Button>
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </>
        )}

        {tab === "identity" && <Identity brand={brand} sheet={sheet} base={base} t={t} />}
        {tab === "data" && <DemoData brand={brand} t={t} initialLang={lang} />}
      </div>
    </div>
  )
}

function Identity({ brand, sheet, base, t }: { brand: Brand; sheet: string; base: string; t: LabStrings }) {
  const s = t.brand
  const [format, setFormat] = useState<"css" | "tailwind" | "json">("css")
  const colors = { primary: brand.primary, secondary: brand.secondary, accent: brand.accent }

  const tokens = useMemo(() => {
    const ramps = Object.fromEntries(Object.entries(colors).map(([k, v]) => [k, scale(v)]))
    if (format === "json")
      return JSON.stringify(
        {
          brand: brand.name,
          color: {
            ...Object.fromEntries(Object.entries(ramps).map(([k, r]) => [k, Object.fromEntries(r.map((x) => [x.step, x.hex]))])),
            dark: brand.dark,
            light: brand.light,
          },
          radius: brand.radius,
          font: brand.font,
        },
        null,
        2,
      )
    const lines = Object.entries(ramps).flatMap(([k, r]) => r.map((x) => `  --${format === "tailwind" ? "color-" : ""}${k}-${x.step}: ${x.hex};`))
    const extra = [`  --${format === "tailwind" ? "color-" : ""}dark: ${brand.dark};`, `  --${format === "tailwind" ? "color-" : ""}light: ${brand.light};`]
    return format === "tailwind" ? `@theme {\n${[...lines, ...extra].join("\n")}\n}` : `:root {\n${[...lines, ...extra].join("\n")}\n}`
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brand, format])

  const checks = [
    { label: s.contrastRows.onPrimary, fg: readableOn(brand.primary), bg: brand.primary },
    { label: s.contrastRows.primaryOnLight, fg: brand.primary, bg: brand.light },
    { label: s.contrastRows.accentOnDark, fg: brand.accent, bg: brand.dark },
    { label: s.contrastRows.bodyOnLight, fg: brand.dark, bg: brand.light },
  ]

  return (
    <>
      <Panel title={s.palette}>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
          <Swatch big hex={brand.primary} label={s.primary} />
          <Swatch big hex={brand.secondary} label={s.secondary} />
          <Swatch big hex={brand.accent} label={s.accent} />
          <Swatch big hex={brand.dark} label={s.dark} />
          <Swatch big hex={brand.light} label={s.light} />
        </div>
      </Panel>

      <Panel title={s.scales}>
        {Object.entries(colors).map(([k, v]) => (
          <div key={k}>
            <p className="mb-1.5 text-[12px] font-medium text-muted-foreground">{s[k as "primary"]}</p>
            <div className="grid grid-cols-11 gap-1">
              {scale(v).map((x) => (
                <div key={x.step}>
                  <Swatch hex={x.hex} />
                  <p className="mt-1 text-center font-mono text-[10px] text-subtle-foreground">{x.step}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </Panel>

      <Panel title={s.accessibility}>
        <ul className="divide-y divide-line">
          {checks.map((c) => {
            const ratio = contrast(c.fg, c.bg)
            const w = wcag(ratio)
            return (
              <li key={c.label} className="flex items-center gap-3 py-2">
                <span className="grid h-9 w-14 shrink-0 place-items-center rounded-lg text-[13px] font-semibold" style={{ backgroundColor: c.bg, color: c.fg }}>
                  Aa
                </span>
                <span className="flex-1 text-[13px]">{c.label}</span>
                <span className="font-mono text-[12px] tabular-nums">{ratio.toFixed(2)}:1</span>
                <span className={cn("rounded-full px-2 py-0.5 text-[11px] font-semibold", w.aa ? "bg-success/15 text-success" : w.aaLarge ? "bg-accent-soft text-accent" : "bg-destructive/15 text-destructive")}>
                  {w.aaa ? "AAA" : w.aa ? "AA" : w.aaLarge ? "AA large" : "✕"}
                </span>
              </li>
            )
          })}
        </ul>
      </Panel>

      <Panel
        title={s.tokens}
        actions={
          <Segmented
            label={s.tokens}
            value={format}
            onChange={setFormat}
            options={[
              { value: "css", label: "CSS" },
              { value: "tailwind", label: "Tailwind" },
              { value: "json", label: "JSON" },
            ]}
          />
        }
      >
        <CodeBlock code={tokens} copyLabel={t.common.copy} copiedLabel={t.common.copied} />
      </Panel>

      <Panel
        title={s.sheet}
        actions={
          <span className="flex gap-1.5">
            <Button size="sm" onClick={() => downloadText(sheet, `${base}-brand-sheet.svg`, "image/svg+xml")}>
              {t.common.svg}
            </Button>
            <Button size="sm" onClick={() => exportRaster(sheet, 1600, 1000, `${base}-brand-sheet`, { format: "png", scale: 1 })}>
              {t.common.png}
            </Button>
          </span>
        }
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={svgDataUrl(sheet)} alt={s.sheet} className="w-full rounded-lg border border-line" />
      </Panel>
    </>
  )
}

function DemoData({ brand, t, initialLang }: { brand: Brand; t: LabStrings; initialLang: DataLang }) {
  const d = t.brand.data
  const [count, setCount] = useState(40)
  const [currency, setCurrency] = useState<Currency>("USD")
  const [rate, setRate] = useState(2850)
  const [lang, setLang] = useState<DataLang>(initialLang)
  const [cats, setCats] = useState<string[]>(CATEGORIES.map((c) => c.id))
  const [seed, setSeed] = useState(7)
  const [table, setTable] = useState("products")

  const rows = useMemo(
    () => generateProducts({ count, seed, lang, currency, cdfRate: rate, categories: cats, shop: brand.name, palette: [brand.primary, brand.secondary, brand.accent] }),
    [count, seed, lang, currency, rate, cats, brand.name, brand.primary, brand.secondary, brand.accent],
  )
  const money = (v: number) => new Intl.NumberFormat(lang, { style: "currency", currency, maximumFractionDigits: currency === "CDF" ? 0 : 2 }).format(v)
  const base = `${slugify(brand.name)}-products`

  return (
    <>
      <Panel title={t.brand.tabs.data}>
        <div className="grid gap-4 sm:grid-cols-2">
          <Slider label={d.count} value={count} min={5} max={500} step={5} onChange={setCount} />
          <Slider label={d.rate} value={rate} min={1000} max={5000} step={50} onChange={setRate} />
          <Field label={d.currency}>
            <Segmented label={d.currency} value={currency} onChange={setCurrency} options={(["USD", "CDF", "EUR"] as const).map((c) => ({ value: c, label: c }))} />
          </Field>
          <Field label={d.language}>
            <Segmented
              label={d.language}
              value={lang}
              onChange={setLang}
              options={[
                { value: "fr", label: "FR" },
                { value: "en", label: "EN" },
              ]}
            />
          </Field>
        </div>
        <div>
          <p className="mb-2 text-[12px] font-medium text-muted-foreground">{d.categories}</p>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <label key={c.id} className="flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-[12px]">
                <Toggle size="sm" checked={cats.includes(c.id)} onChange={(v) => setCats((prev) => (v ? [...prev, c.id] : prev.filter((x) => x !== c.id)))} label={c.label[lang]} />
                {c.label[lang]}
              </label>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => setSeed(Math.floor(Math.random() * 1e6))}>
            <RefreshCw className="size-4" aria-hidden /> {d.regenerate}
          </Button>
          <Button onClick={() => downloadText(JSON.stringify(rows, null, 2), `${base}.json`, "application/json")}>{d.json}</Button>
          <Button onClick={() => downloadText(toCsv(rows), `${base}.csv`, "text/csv")}>{d.csv}</Button>
          <Button onClick={() => downloadText(toSql(rows, table), `${base}.sql`, "application/sql")}>{d.sql}</Button>
          <label className="flex items-center gap-2 text-[12px] text-muted-foreground">
            {d.table}
            <TextInput value={table} onChange={(e) => setTable(e.target.value.replace(/[^a-z0-9_]/gi, "") || "products")} className="h-9 w-32 py-1 font-mono" />
          </label>
        </div>
      </Panel>

      <Panel title={fill(d.showing, { n: Math.min(12, rows.length), total: rows.length })}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-[12.5px]">
            <thead className="text-[11px] uppercase tracking-wide text-subtle-foreground">
              <tr>
                <th className="py-2 pr-3 font-medium">{d.columns.name}</th>
                <th className="py-2 pr-3 font-medium">{d.columns.category}</th>
                <th className="py-2 pr-3 text-right font-medium">{d.columns.price}</th>
                <th className="py-2 pr-3 text-right font-medium">{d.columns.stock}</th>
                <th className="py-2 text-right font-medium">{d.columns.rating}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {rows.slice(0, 12).map((p) => (
                <tr key={p.id}>
                  <td className="py-2 pr-3">
                    <span className="mr-2 inline-block size-2.5 rounded-full align-middle" style={{ backgroundColor: p.color }} />
                    {p.name}
                    <span className="ml-2 font-mono text-[10px] text-subtle-foreground">{p.sku}</span>
                  </td>
                  <td className="py-2 pr-3 text-muted-foreground">{p.category}</td>
                  <td className="py-2 pr-3 text-right tabular-nums">{money(p.price)}</td>
                  <td className={cn("py-2 pr-3 text-right tabular-nums", p.status === "out_of_stock" && "text-destructive", p.status === "low_stock" && "text-accent")}>{p.stock}</td>
                  <td className="py-2 text-right tabular-nums">★ {p.rating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </>
  )
}
