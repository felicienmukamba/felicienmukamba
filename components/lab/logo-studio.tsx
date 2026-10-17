"use client"

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowRight, Check, Clapperboard, Download, FileArchive, ImagePlus, Loader2, Palette as PaletteIcon, Redo2, RefreshCw, RotateCcw, Shapes, Sparkles, Type, Undo2, Wand2,
} from "lucide-react"
import { Button, ColorField, Field, Panel, Segmented, Select, Slider, TextInput, ToggleRow } from "@/components/kit/controls"
import { IconPicker } from "@/components/studio/icon-picker"
import { downloadBlob, downloadText, slugify, svgDataUrl, svgToImage } from "@/lib/kit/download"
import { zip, type ZipEntry } from "@/lib/kit/zip"
import { templates, type Brand, type TemplateGroup } from "@/lib/lab/brand-templates"
import { contrast, extractPalette, wcag } from "@/lib/lab/color"
import type { LabStrings } from "@/lib/lab/i18n"
import { FONT_CATEGORIES, FONT_PAIRINGS, STUDIO_FONTS, ensureStudioFonts, fontEmbedCss, fontStack, getFont, loadFaces, measureText, nearestWeight, type FontCategory } from "@/lib/studio/fonts"
import {
  DEFAULT_LOGO, PALETTES, applyCase, containerPath, generateProposals, harmonizePalette, logoFontRequests, renderLogo,
  type ColorRole, type Container, type ContainerStyle, type Decoration, type Layout, type LogoConfig, type Palette, type Part, type TextCase, type Version,
} from "@/lib/studio/logo-engine"
import { importFiles } from "@/lib/studio/svg-import"
import { useHistory } from "@/lib/studio/use-history"
import { cn } from "@/lib/utils"

export const LOGO_STORAGE_KEY = "soside.logo-studio.v1"
export const LOGO_EXPORT_KEY = "soside.logo-studio.export"

type Lang = "fr" | "en"
type Step = "brand" | "symbol" | "type" | "colors"
type Tab = "proposals" | "editor" | "versions" | "collateral"

const STR = {
  fr: {
    steps: { brand: "Marque", symbol: "Symbole", type: "Typo", colors: "Couleurs" },
    tabs: { proposals: "Propositions", editor: "Éditeur", versions: "Déclinaisons & export", collateral: "Supports marketing" },
    name: "Nom de la marque",
    tagline: "Slogan",
    initials: "Initiales (optionnel)",
    sector: "Secteur d'activité",
    sectorHint: "Un secteur pré-règle typographie, couleurs et symbole. Tout reste modifiable.",
    generate: "Générer les logos",
    next: "Étape suivante",
    symbolKind: "Type de symbole",
    icon: "Icône",
    initialsKind: "Initiales",
    upload: "Importer votre symbole (SVG, PNG)",
    recolor: "Recolorer avec la charte",
    applyTo: "Appliquer la police au",
    nameFont: "Nom",
    taglineFont: "Slogan",
    pairings: "Associations recommandées",
    palettes: "Palettes prêtes",
    charter: "Ma charte graphique",
    harmonize: "Harmoniser depuis le primaire",
    extract: "Extraire d'une image",
    roles: { primary: "Primaire", secondary: "Secondaire", accent: "Accent", ink: "Encre", paper: "Fond", white: "Blanc", transparent: "Transparent" },
    contrast: "Lisibilité du nom sur le fond",
    proposalsHint: "Propositions composées à partir de votre marque, de votre symbole, de votre typo et de votre charte. Cliquez pour personnaliser.",
    more: "Autres propositions",
    customize: "Personnaliser",
    undo: "Annuler",
    redo: "Rétablir",
    reset: "Réinitialiser",
    layout: "Disposition",
    layouts: { horizontal: "Horizontal", stacked: "Empilé", wordmark: "Texte seul", emblem: "Emblème" },
    container: "Forme du conteneur",
    containerStyle: "Style",
    styles: { solid: "Plein", gradient: "Dégradé", outline: "Contour", soft: "Doux" },
    symbolSize: "Taille du symbole",
    iconSize: "Taille de l'icône",
    rotate: "Rotation",
    stroke: "Épaisseur du trait",
    gap: "Espacement",
    text: "Texte",
    font: "Police",
    weight: "Graisse",
    tracking: "Interlettrage",
    case: "Casse",
    cases: { none: "Aa", upper: "AA", lower: "aa", title: "Ab" },
    showTagline: "Afficher le slogan",
    taglineSize: "Taille du slogan",
    decoration: "Détail graphique",
    decorations: { none: "Aucun", dot: "Point", underline: "Souligné", divider: "Séparateur" },
    colors: "Couleurs des éléments",
    elements: { symbol: "Symbole", container: "Conteneur", name: "Nom", tagline: "Slogan", accent: "Accent", background: "Fond" },
    preview: { light: "Clair", dark: "Sombre", brand: "Couleur", grid: "Damier" },
    versions: { color: "Couleur", dark: "Sur fond sombre", mono: "Monochrome", white: "Blanc (réserve)" },
    parts: { full: "Logo complet", symbol: "Symbole seul" },
    mockups: "Mises en situation",
    card: "Carte de visite",
    appIcon: "Icône d'application",
    avatar: "Avatar réseaux sociaux",
    website: "En-tête de site",
    pack: "Télécharger le pack complet (.zip)",
    packHint: "SVG + PNG de toutes les déclinaisons, favicons (16→512 px), palette CSS/JSON et polices utilisées.",
    packing: "Préparation du pack…",
    scale: "Résolution PNG",
    animate: "Animer dans le Motion Studio",
    collateralHint: "Flyers, brochures, posts et bannières générés avec votre logo, votre typographie et vos couleurs.",
    copy: "Textes des supports",
    handle: "Site / réseaux",
    cta: "Appel à l'action",
    promoLabel: "Étiquette promo",
    promo: "Promo",
    product: "Produit / offre",
    price: "Prix",
    oldPrice: "Ancien prix",
    groups: { all: "Tout", social: "Réseaux sociaux", print: "Flyers & brochures", digital: "Digital", marketplace: "Boutique" } as Record<TemplateGroup | "all", string>,
    downloadAll: "Tout télécharger",
    preparing: "Préparation des polices…",
    categories: { geometric: "Géométrique", sans: "Sans-serif", display: "Display", serif: "Serif", rounded: "Arrondie", script: "Manuscrite", mono: "Mono" } as Record<FontCategory, string>,
  },
  en: {
    steps: { brand: "Brand", symbol: "Symbol", type: "Type", colors: "Colours" },
    tabs: { proposals: "Proposals", editor: "Editor", versions: "Versions & export", collateral: "Marketing assets" },
    name: "Brand name",
    tagline: "Tagline",
    initials: "Initials (optional)",
    sector: "Industry",
    sectorHint: "An industry presets typography, colours and symbol. Everything stays editable.",
    generate: "Generate logos",
    next: "Next step",
    symbolKind: "Symbol type",
    icon: "Icon",
    initialsKind: "Initials",
    upload: "Upload your symbol (SVG, PNG)",
    recolor: "Recolour with the palette",
    applyTo: "Apply font to",
    nameFont: "Name",
    taglineFont: "Tagline",
    pairings: "Recommended pairings",
    palettes: "Ready-made palettes",
    charter: "My brand colours",
    harmonize: "Harmonise from primary",
    extract: "Extract from an image",
    roles: { primary: "Primary", secondary: "Secondary", accent: "Accent", ink: "Ink", paper: "Paper", white: "White", transparent: "Transparent" },
    contrast: "Name legibility on background",
    proposalsHint: "Proposals composed from your brand, symbol, typography and palette. Click one to customise it.",
    more: "More proposals",
    customize: "Customise",
    undo: "Undo",
    redo: "Redo",
    reset: "Reset",
    layout: "Layout",
    layouts: { horizontal: "Horizontal", stacked: "Stacked", wordmark: "Wordmark", emblem: "Emblem" },
    container: "Container shape",
    containerStyle: "Style",
    styles: { solid: "Solid", gradient: "Gradient", outline: "Outline", soft: "Soft" },
    symbolSize: "Symbol size",
    iconSize: "Icon size",
    rotate: "Rotation",
    stroke: "Stroke width",
    gap: "Spacing",
    text: "Text",
    font: "Font",
    weight: "Weight",
    tracking: "Letter spacing",
    case: "Case",
    cases: { none: "Aa", upper: "AA", lower: "aa", title: "Ab" },
    showTagline: "Show tagline",
    taglineSize: "Tagline size",
    decoration: "Graphic detail",
    decorations: { none: "None", dot: "Dot", underline: "Underline", divider: "Divider" },
    colors: "Element colours",
    elements: { symbol: "Symbol", container: "Container", name: "Name", tagline: "Tagline", accent: "Accent", background: "Background" },
    preview: { light: "Light", dark: "Dark", brand: "Brand", grid: "Grid" },
    versions: { color: "Colour", dark: "On dark", mono: "Monochrome", white: "White (reversed)" },
    parts: { full: "Full logo", symbol: "Symbol only" },
    mockups: "Mockups",
    card: "Business card",
    appIcon: "App icon",
    avatar: "Social avatar",
    website: "Website header",
    pack: "Download the full pack (.zip)",
    packHint: "SVG + PNG of every version, favicons (16→512 px), CSS/JSON palette and the fonts used.",
    packing: "Preparing the pack…",
    scale: "PNG resolution",
    animate: "Animate in Motion Studio",
    collateralHint: "Flyers, brochures, posts and banners generated with your logo, typography and colours.",
    copy: "Asset copy",
    handle: "Website / social",
    cta: "Call to action",
    promoLabel: "Promo label",
    promo: "Promo",
    product: "Product / offer",
    price: "Price",
    oldPrice: "Old price",
    groups: { all: "All", social: "Social media", print: "Flyers & brochures", digital: "Digital", marketplace: "Shop" } as Record<TemplateGroup | "all", string>,
    downloadAll: "Download all",
    preparing: "Preparing fonts…",
    categories: { geometric: "Geometric", sans: "Sans-serif", display: "Display", serif: "Serif", rounded: "Rounded", script: "Script", mono: "Mono" } as Record<FontCategory, string>,
  },
}
type S = (typeof STR)["fr"]

const SECTORS: { id: string; label: { fr: string; en: string }; font: string; tagline: string; palette: string; mark: string }[] = [
  { id: "tech", label: { fr: "Tech & SaaS", en: "Tech & SaaS" }, font: "sora", tagline: "inter", palette: "Royal", mark: "orbit" },
  { id: "finance", label: { fr: "Finance", en: "Finance" }, font: "montserrat", tagline: "inter", palette: "Congo", mark: "cards" },
  { id: "food", label: { fr: "Restauration", en: "Food" }, font: "fraunces", tagline: "dm-sans", palette: "Terra", mark: "leaf" },
  { id: "health", label: { fr: "Santé", en: "Health" }, font: "nunito", tagline: "inter", palette: "Lagoon", mark: "heart" },
  { id: "fashion", label: { fr: "Mode & luxe", en: "Fashion" }, font: "playfair", tagline: "montserrat", palette: "Gold", mark: "gem" },
  { id: "education", label: { fr: "Éducation", en: "Education" }, font: "lexend", tagline: "inter", palette: "Sky", mark: "chevrons" },
  { id: "realestate", label: { fr: "Immobilier", en: "Real estate" }, font: "manrope", tagline: "inter", palette: "Forest", mark: "house" },
  { id: "creative", label: { fr: "Créatif & média", en: "Creative" }, font: "syne", tagline: "space-grotesk", palette: "Berry", mark: "spark" },
  { id: "energy", label: { fr: "Énergie", en: "Energy" }, font: "unbounded", tagline: "manrope", palette: "Sunset", mark: "bolt" },
  { id: "travel", label: { fr: "Voyage", en: "Travel" }, font: "outfit", tagline: "dm-sans", palette: "Ocean", mark: "pin" },
]

const CONTAINERS: Container[] = ["none", "circle", "squircle", "rounded", "square", "hexagon", "shield", "diamond", "blob"]
const ROLES: ColorRole[] = ["primary", "secondary", "accent", "ink", "paper", "white"]
const VERSIONS: Version[] = ["color", "dark", "mono", "white"]

/** Inline SVG scaled to its box (fonts from the page apply, unlike `<img>`). */
export function LogoView({ svg, className }: { svg: string; className?: string }) {
  const fluid = useMemo(() => svg.replace(/^<svg([^>]*?) width="[\d.]+" height="[\d.]+"/, '<svg$1 width="100%" height="100%"'), [svg])
  return <div className={cn("[&>svg]:block", className)} dangerouslySetInnerHTML={{ __html: fluid }} />
}

function versionBg(cfg: LogoConfig, v: Version) {
  return v === "dark" ? cfg.palette.ink : v === "mono" ? "#ffffff" : v === "white" ? cfg.palette.primary : cfg.palette.paper
}

async function buildSvg(cfg: LogoConfig, part: Part, version: Version, height = 400, background = false) {
  const fontCss = await fontEmbedCss(logoFontRequests(cfg))
  return renderLogo(cfg, { measure: measureText, part, version, fontCss, height, background, idPrefix: `x${part}${version}` })
}

function useFontsVersion(cfg: LogoConfig) {
  const [version, setVersion] = useState(0)
  useEffect(() => {
    ensureStudioFonts()
    const bump = () => setVersion((v) => v + 1)
    document.fonts?.addEventListener("loadingdone", bump)
    return () => document.fonts?.removeEventListener("loadingdone", bump)
  }, [])
  useEffect(() => {
    let alive = true
    loadFaces([
      { font: getFont(cfg.font), weight: cfg.weight },
      { font: getFont(cfg.font), weight: 700 },
      { font: getFont(cfg.taglineFont), weight: cfg.taglineWeight },
    ]).then(() => alive && setVersion((v) => v + 1))
    return () => {
      alive = false
    }
  }, [cfg.font, cfg.weight, cfg.taglineFont, cfg.taglineWeight])
  return version
}

export function LogoStudio({ lang, t }: { lang: Lang; t: LabStrings }) {
  const s = STR[lang]
  const history = useHistory<LogoConfig>(DEFAULT_LOGO)
  const cfg = history.value
  const set = history.set
  const [step, setStep] = useState<Step>("brand")
  const [tab, setTab] = useState<Tab>("proposals")
  const [seed, setSeed] = useState(1)
  const [loaded, setLoaded] = useState(false)
  const fontsVersion = useFontsVersion(cfg)
  // Re-measure text whenever a web font finishes loading.
  const measure = useMemo(() => {
    void fontsVersion
    return measureText
  }, [fontsVersion])

  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOGO_STORAGE_KEY)
      if (saved) history.reset({ ...DEFAULT_LOGO, ...JSON.parse(saved) })
    } catch {}
    setLoaded(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    if (!loaded) return
    const id = setTimeout(() => {
      try {
        localStorage.setItem(LOGO_STORAGE_KEY, JSON.stringify(cfg))
      } catch {}
    }, 300)
    return () => clearTimeout(id)
  }, [cfg, loaded])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      if (target.closest("input, textarea, select, [contenteditable]")) return
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") {
        e.preventDefault()
        if (e.shiftKey) history.redo()
        else history.undo()
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "y") {
        e.preventDefault()
        history.redo()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [history])

  const patch = useCallback((p: Partial<LogoConfig>, key?: string) => set((c) => ({ ...c, ...p }), key), [set])

  return (
    <div className="grid gap-6 lg:grid-cols-[380px_minmax(0,1fr)]">
      <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
        <nav className="grid grid-cols-4 gap-1 rounded-xl border border-line p-1" aria-label="Steps">
          {(Object.keys(s.steps) as Step[]).map((id, i) => (
            <button
              key={id}
              type="button"
              onClick={() => setStep(id)}
              aria-current={step === id}
              className={cn("rounded-lg px-1 py-2 text-[12px] font-medium transition-colors", step === id ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground")}
            >
              <span className="mr-1 opacity-60">{i + 1}</span>
              {s.steps[id]}
            </button>
          ))}
        </nav>

        {step === "brand" && <BrandStep cfg={cfg} patch={patch} s={s} lang={lang} />}
        {step === "symbol" && <SymbolStep cfg={cfg} patch={patch} s={s} lang={lang} />}
        {step === "type" && <TypeStep cfg={cfg} patch={patch} s={s} />}
        {step === "colors" && <ColorStep cfg={cfg} patch={patch} s={s} measure={measure} />}

        <div className="flex gap-2">
          {step !== "colors" && (
            <Button className="flex-1" onClick={() => setStep((["brand", "symbol", "type", "colors"] as Step[])[["brand", "symbol", "type", "colors"].indexOf(step) + 1])}>
              {s.next} <ArrowRight className="size-4" aria-hidden />
            </Button>
          )}
          <Button
            variant="primary"
            className="flex-1"
            onClick={() => {
              setSeed((v) => (tab === "proposals" ? v + 1 : v))
              setTab("proposals")
            }}
          >
            <Sparkles className="size-4" aria-hidden /> {s.generate}
          </Button>
        </div>
      </aside>

      <div className="min-w-0 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div role="tablist" className="flex gap-1 overflow-x-auto rounded-xl border border-line p-1">
            {(Object.keys(s.tabs) as Tab[]).map((id) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={tab === id}
                onClick={() => setTab(id)}
                className={cn("whitespace-nowrap rounded-lg px-3 py-2 text-[13px] font-medium transition-colors", tab === id ? "bg-surface-2 text-foreground" : "text-muted-foreground hover:text-foreground")}
              >
                {s.tabs[id]}
              </button>
            ))}
          </div>
          <div className="flex gap-1">
            <Button size="sm" variant="ghost" onClick={history.undo} disabled={!history.canUndo} title={`${s.undo} (Ctrl+Z)`}>
              <Undo2 className="size-4" aria-hidden />
            </Button>
            <Button size="sm" variant="ghost" onClick={history.redo} disabled={!history.canRedo} title={`${s.redo} (Ctrl+Shift+Z)`}>
              <Redo2 className="size-4" aria-hidden />
            </Button>
          </div>
        </div>

        {tab === "proposals" && (
          <Proposals
            cfg={cfg}
            seed={seed}
            measure={measure}
            s={s}
            onMore={() => setSeed((v) => v + 1)}
            onPick={(c) => {
              set(c)
              setTab("editor")
            }}
          />
        )}
        {tab === "editor" && <Editor cfg={cfg} patch={patch} measure={measure} s={s} onReset={() => set(DEFAULT_LOGO)} />}
        {tab === "versions" && <Versions cfg={cfg} measure={measure} s={s} lang={lang} />}
        {tab === "collateral" && <Collateral cfg={cfg} s={s} t={t} />}
      </div>
    </div>
  )
}

type Patch = (p: Partial<LogoConfig>, key?: string) => void
type MeasureFn = typeof measureText

/* ───────────────────────── Steps ───────────────────────── */

function BrandStep({ cfg, patch, s, lang }: { cfg: LogoConfig; patch: Patch; s: S; lang: Lang }) {
  return (
    <Panel>
      <Field label={s.name}>
        <TextInput value={cfg.name} maxLength={32} onChange={(e) => patch({ name: e.target.value }, "name")} />
      </Field>
      <Field label={s.tagline}>
        <TextInput value={cfg.tagline} maxLength={48} onChange={(e) => patch({ tagline: e.target.value }, "tagline")} />
      </Field>
      <Field label={s.initials}>
        <TextInput value={cfg.initials} maxLength={3} placeholder={cfg.name.slice(0, 1).toUpperCase()} onChange={(e) => patch({ initials: e.target.value }, "initials")} />
      </Field>
      <div>
        <p className="mb-1.5 text-[12px] font-medium text-muted-foreground">{s.sector}</p>
        <div className="flex flex-wrap gap-1.5">
          {SECTORS.map((sec) => (
            <button
              key={sec.id}
              type="button"
              onClick={() => {
                const pal = PALETTES.find((p) => p.name === sec.palette) ?? PALETTES[0]
                const { name: _n, ...palette } = pal
                void _n
                patch({ font: sec.font, taglineFont: sec.tagline, palette, icon: { type: "mark", id: sec.mark }, symbol: "icon" })
              }}
              className="rounded-full border border-line px-2.5 py-1 text-[11.5px] text-muted-foreground transition-colors hover:border-accent hover:text-foreground"
            >
              {sec.label[lang]}
            </button>
          ))}
        </div>
        <p className="mt-1.5 text-[11px] text-subtle-foreground">{s.sectorHint}</p>
      </div>
    </Panel>
  )
}

function SymbolStep({ cfg, patch, s, lang }: { cfg: LogoConfig; patch: Patch; s: S; lang: Lang }) {
  const file = useRef<HTMLInputElement>(null)
  const selected = cfg.icon.type === "mark" ? `mark:${cfg.icon.id}` : cfg.icon.type === "lucide" ? cfg.icon.name : undefined
  return (
    <Panel>
      <Field label={s.symbolKind}>
        <Segmented
          label={s.symbolKind}
          value={cfg.symbol}
          onChange={(v) => patch({ symbol: v })}
          options={[
            { value: "icon", label: s.icon },
            { value: "initials", label: s.initialsKind },
          ]}
        />
      </Field>
      <IconPicker
        lang={lang}
        selected={cfg.symbol === "icon" ? selected : undefined}
        markColors={[cfg.palette.primary, cfg.palette.accent]}
        onPickMark={(id) => patch({ icon: { type: "mark", id }, symbol: "icon" })}
        onPickIcon={(icon) => patch({ icon: { type: "lucide", name: icon.name, markup: icon.markup }, symbol: "icon" })}
      />
      <div className="border-t border-line pt-3">
        <Button size="sm" className="w-full" onClick={() => file.current?.click()}>
          <ImagePlus className="size-3.5" aria-hidden /> {s.upload}
        </Button>
        <input
          ref={file}
          type="file"
          hidden
          accept="image/svg+xml,.svg,image/png,image/jpeg,image/webp"
          onChange={async (e) => {
            const [v] = e.target.files ? await importFiles(e.target.files) : []
            if (v) patch({ icon: { type: "upload", name: v.name, markup: v.markup, viewBox: v.viewBox, recolor: !v.markup.startsWith("<image") }, symbol: "icon" })
            e.target.value = ""
          }}
        />
        {cfg.icon.type === "upload" && (
          <div className="mt-3">
            <ToggleRow label={s.recolor} checked={cfg.icon.recolor} onChange={(v) => cfg.icon.type === "upload" && patch({ icon: { ...cfg.icon, recolor: v } })} />
          </div>
        )}
      </div>
    </Panel>
  )
}

function TypeStep({ cfg, patch, s }: { cfg: LogoConfig; patch: Patch; s: S }) {
  const [target, setTarget] = useState<"name" | "tagline">("name")
  const [category, setCategory] = useState<FontCategory | "all">("all")
  const current = target === "name" ? cfg.font : cfg.taglineFont
  const sample = target === "name" ? cfg.name || "Brand" : cfg.tagline || "Tagline"
  return (
    <Panel>
      <div>
        <p className="mb-1.5 text-[12px] font-medium text-muted-foreground">{s.pairings}</p>
        <div className="flex flex-wrap gap-1.5">
          {FONT_PAIRINGS.map((p) => (
            <button
              key={p.name}
              type="button"
              onClick={() => patch({ font: p.font, taglineFont: p.tagline, weight: nearestWeight(getFont(p.font), cfg.weight) })}
              className={cn(
                "rounded-full border px-2.5 py-1 text-[11.5px] transition-colors",
                cfg.font === p.font && cfg.taglineFont === p.tagline ? "border-accent bg-accent-soft text-foreground" : "border-line text-muted-foreground hover:text-foreground",
              )}
              style={{ fontFamily: fontStack(getFont(p.font)) }}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>
      <Field label={s.applyTo}>
        <Segmented
          label={s.applyTo}
          value={target}
          onChange={setTarget}
          options={[
            { value: "name", label: s.nameFont },
            { value: "tagline", label: s.taglineFont },
          ]}
        />
      </Field>
      <div className="flex gap-1 overflow-x-auto pb-1">
        {(["all", ...FONT_CATEGORIES] as const).map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCategory(c)}
            className={cn("shrink-0 rounded-full border px-2.5 py-1 text-[11px]", category === c ? "border-accent bg-accent-soft text-foreground" : "border-line text-muted-foreground hover:text-foreground")}
          >
            {c === "all" ? "∗" : s.categories[c]}
          </button>
        ))}
      </div>
      <div className="max-h-[340px] space-y-1 overflow-y-auto pr-1">
        {STUDIO_FONTS.filter((f) => category === "all" || f.category === category).map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() =>
              target === "name" ? patch({ font: f.id, weight: nearestWeight(f, cfg.weight) }) : patch({ taglineFont: f.id, taglineWeight: nearestWeight(f, cfg.taglineWeight) })
            }
            className={cn(
              "flex w-full items-center justify-between gap-3 rounded-lg border px-3 py-2 text-left transition-colors",
              current === f.id ? "border-accent bg-accent-soft" : "border-line hover:border-line-strong",
            )}
          >
            <span className="truncate text-[19px] leading-tight" style={{ fontFamily: fontStack(f), fontWeight: nearestWeight(f, target === "name" ? cfg.weight : cfg.taglineWeight) }}>
              {sample}
            </span>
            <span className="shrink-0 text-right text-[10.5px] leading-tight text-subtle-foreground">
              {f.family}
              <br />
              {s.categories[f.category]}
            </span>
          </button>
        ))}
      </div>
    </Panel>
  )
}

function ColorStep({ cfg, patch, s, measure }: { cfg: LogoConfig; patch: Patch; s: S; measure: MeasureFn }) {
  const file = useRef<HTMLInputElement>(null)
  const setColor = (k: keyof Palette, v: string) => patch({ palette: { ...cfg.palette, [k]: v } }, `color-${k}`)
  const ratio = contrast(cfg.roles.name === "white" ? "#ffffff" : cfg.palette[cfg.roles.name], cfg.palette.paper)
  const w = wcag(ratio)
  void measure
  return (
    <Panel>
      <div>
        <p className="mb-2 text-[12px] font-medium text-muted-foreground">{s.palettes}</p>
        <div className="grid grid-cols-4 gap-1.5">
          {PALETTES.map(({ name, ...p }) => {
            const active = (Object.keys(p) as (keyof Palette)[]).every((k) => p[k] === cfg.palette[k])
            return (
              <button
                key={name}
                type="button"
                title={name}
                onClick={() => patch({ palette: p })}
                className={cn("overflow-hidden rounded-lg border text-left", active ? "border-accent ring-2 ring-accent/30" : "border-line hover:border-line-strong")}
              >
                <span className="flex h-6">
                  {[p.primary, p.secondary, p.accent, p.ink].map((c, i) => (
                    <span key={i} className="flex-1" style={{ backgroundColor: c }} />
                  ))}
                </span>
                <span className="block px-1.5 py-1 text-[10px] text-muted-foreground">{name}</span>
              </button>
            )
          })}
        </div>
      </div>
      <div className="border-t border-line pt-3">
        <p className="mb-2 text-[12px] font-medium text-muted-foreground">{s.charter}</p>
        <div className="grid grid-cols-2 gap-3">
          {(["primary", "secondary", "accent", "ink", "paper"] as const).map((k) => (
            <ColorField key={k} label={s.roles[k]} value={cfg.palette[k]} onChange={(v) => setColor(k, v)} />
          ))}
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <Button size="sm" onClick={() => patch({ palette: harmonizePalette(cfg.palette.primary) })}>
            <Wand2 className="size-3.5" aria-hidden /> {s.harmonize}
          </Button>
          <Button size="sm" onClick={() => file.current?.click()}>
            <PaletteIcon className="size-3.5" aria-hidden /> {s.extract}
          </Button>
        </div>
        <input
          ref={file}
          type="file"
          hidden
          accept="image/*"
          onChange={(e) => {
            const f = e.target.files?.[0]
            if (!f) return
            const url = URL.createObjectURL(f)
            const img = new Image()
            img.onload = () => {
              const colors = extractPalette(img, 3)
              URL.revokeObjectURL(url)
              if (!colors.length) return
              const base = harmonizePalette(colors[0])
              patch({ palette: { ...base, secondary: colors[1] ?? base.secondary, accent: colors[2] ?? base.accent } })
            }
            img.src = url
            e.target.value = ""
          }}
        />
      </div>
      <div className="flex items-center justify-between rounded-lg border border-line px-3 py-2">
        <span className="text-[12px] text-muted-foreground">{s.contrast}</span>
        <span className={cn("rounded-full px-2 py-0.5 font-mono text-[11px] font-semibold", w.aa ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive")}>
          {ratio.toFixed(1)}:1 {w.aaa ? "AAA" : w.aa ? "AA" : "✕"}
        </span>
      </div>
    </Panel>
  )
}

/* ───────────────────────── Proposals ───────────────────────── */

function Proposals({ cfg, seed, measure, s, onPick, onMore }: { cfg: LogoConfig; seed: number; measure: MeasureFn; s: S; onPick: (c: LogoConfig) => void; onMore: () => void }) {
  const items = useMemo(() => generateProposals(cfg, seed).map((c, i) => ({ cfg: c, svg: renderLogo(c, { measure, idPrefix: `p${seed}-${i}` }).svg })), [cfg, seed, measure])
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="max-w-xl text-[13px] text-muted-foreground">{s.proposalsHint}</p>
        <Button size="sm" onClick={onMore}>
          <RefreshCw className="size-3.5" aria-hidden /> {s.more}
        </Button>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((item, i) => (
          <button
            key={`${seed}-${i}`}
            type="button"
            onClick={() => onPick(item.cfg)}
            className="group relative overflow-hidden rounded-2xl border border-line text-left transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-[var(--shadow-card)]"
            style={{ backgroundColor: cfg.palette.paper }}
          >
            <LogoView svg={item.svg} className="h-44 p-6" />
            <span className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/55 to-transparent px-3 pb-2.5 pt-6 text-[11.5px] font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
              {s.layouts[item.cfg.layout]} · {item.cfg.container !== "none" && item.cfg.layout !== "wordmark" ? s.styles[item.cfg.containerStyle] : "—"}
              <span className="flex items-center gap-1">
                {s.customize} <ArrowRight className="size-3.5" aria-hidden />
              </span>
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

/* ───────────────────────── Editor ───────────────────────── */

function Section({ title, icon, children }: { title: string; icon?: ReactNode; children: ReactNode }) {
  return (
    <section className="space-y-3 border-b border-line pb-4 last:border-0 last:pb-0">
      <h4 className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-subtle-foreground">
        {icon}
        {title}
      </h4>
      {children}
    </section>
  )
}

function RolePicker({ label, value, onChange, cfg, s, allowTransparent }: { label: string; value: ColorRole | "transparent"; onChange: (v: ColorRole | "transparent") => void; cfg: LogoConfig; s: S; allowTransparent?: boolean }) {
  const opts: (ColorRole | "transparent")[] = allowTransparent ? [...ROLES, "transparent"] : ROLES
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-[12px] text-muted-foreground">{label}</span>
      <div className="flex gap-1">
        {opts.map((r) => (
          <button
            key={r}
            type="button"
            title={s.roles[r]}
            aria-label={s.roles[r]}
            aria-pressed={value === r}
            onClick={() => onChange(r)}
            className={cn("size-6 rounded-md border transition-transform hover:scale-110", value === r ? "border-foreground ring-2 ring-accent/40" : "border-line-strong")}
            style={
              r === "transparent"
                ? { backgroundImage: "repeating-conic-gradient(#ccc 0 25%, #fff 0 50%)", backgroundSize: "8px 8px" }
                : { backgroundColor: r === "white" ? "#ffffff" : cfg.palette[r] }
            }
          />
        ))}
      </div>
    </div>
  )
}

function Editor({ cfg, patch, measure, s, onReset }: { cfg: LogoConfig; patch: Patch; measure: MeasureFn; s: S; onReset: () => void }) {
  const [bg, setBg] = useState<"light" | "dark" | "brand" | "grid">("light")
  const version: Version = bg === "dark" ? "dark" : bg === "brand" ? "white" : "color"
  const rendered = useMemo(() => renderLogo(cfg, { measure, version, idPrefix: "ed" }), [cfg, measure, version])
  const nameFont = getFont(cfg.font)
  const tagFont = getFont(cfg.taglineFont)
  const fontOptions = STUDIO_FONTS.map((f) => ({ value: f.id, label: f.family, group: s.categories[f.category] }))
  const caseOptions = (Object.keys(s.cases) as TextCase[]).map((v) => ({ value: v, label: s.cases[v] }))
  const bgStyle =
    bg === "grid"
      ? { backgroundImage: "repeating-conic-gradient(var(--surface-2) 0 25%, transparent 0 50%)", backgroundSize: "20px 20px" }
      : { backgroundColor: bg === "dark" ? cfg.palette.ink : bg === "brand" ? cfg.palette.primary : cfg.palette.paper }

  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">
      <div className="space-y-3">
        <div className="relative overflow-hidden rounded-2xl border border-line" style={bgStyle}>
          <LogoView svg={rendered.svg} className="mx-auto h-[300px] max-w-[640px] p-10 sm:h-[380px]" />
          <div className="absolute right-3 top-3">
            <Segmented label="Background" value={bg} onChange={setBg} options={(Object.keys(s.preview) as (keyof S["preview"])[]).map((v) => ({ value: v, label: s.preview[v] }))} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {(["horizontal", "stacked", "wordmark", "emblem"] as Layout[]).map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => patch({ layout: l })}
              className={cn("overflow-hidden rounded-xl border transition-colors", cfg.layout === l ? "border-accent ring-2 ring-accent/30" : "border-line hover:border-line-strong")}
              style={{ backgroundColor: cfg.palette.paper }}
            >
              <LogoView svg={renderLogo({ ...cfg, layout: l }, { measure, idPrefix: `lay-${l}` }).svg} className="h-20 p-3" />
              <span className="block border-t border-line bg-surface px-2 py-1 text-[11px] font-medium">{s.layouts[l]}</span>
            </button>
          ))}
        </div>
      </div>

      <Panel
        title={s.layout}
        actions={
          <Button size="sm" variant="ghost" onClick={onReset}>
            <RotateCcw className="size-3.5" aria-hidden /> {s.reset}
          </Button>
        }
        className="xl:max-h-[calc(100vh-8rem)] xl:overflow-y-auto"
      >
        <Section title={s.steps.symbol} icon={<Shapes className="size-3.5" aria-hidden />}>
          <Segmented
            label={s.symbolKind}
            value={cfg.symbol}
            onChange={(v) => patch({ symbol: v })}
            options={[
              { value: "icon", label: s.icon },
              { value: "initials", label: s.initialsKind },
            ]}
          />
          <div>
            <p className="mb-1.5 text-[12px] font-medium text-muted-foreground">{s.container}</p>
            <div className="grid grid-cols-9 gap-1">
              {CONTAINERS.map((c) => (
                <button
                  key={c}
                  type="button"
                  title={c}
                  onClick={() => patch({ container: c })}
                  className={cn("grid aspect-square place-items-center rounded-md border p-1", cfg.container === c ? "border-accent bg-accent-soft text-accent" : "border-line text-muted-foreground hover:text-foreground")}
                >
                  {c === "none" ? (
                    <span className="text-[13px] leading-none">∅</span>
                  ) : (
                    <svg viewBox="-0.6 -0.6 1.2 1.2" className="size-full" fill="currentColor" dangerouslySetInnerHTML={{ __html: containerPath(c) }} />
                  )}
                </button>
              ))}
            </div>
          </div>
          {cfg.container !== "none" && (
            <Segmented label={s.containerStyle} value={cfg.containerStyle} onChange={(v: ContainerStyle) => patch({ containerStyle: v })} options={(Object.keys(s.styles) as ContainerStyle[]).map((v) => ({ value: v, label: s.styles[v] }))} />
          )}
          <Slider label={s.symbolSize} value={cfg.symbolScale} min={0.6} max={1.8} step={0.02} onChange={(v) => patch({ symbolScale: v }, "symbolScale")} format={(v) => `${Math.round(v * 100)}%`} />
          <Slider label={s.iconSize} value={cfg.iconScale} min={0.4} max={1.4} step={0.02} onChange={(v) => patch({ iconScale: v }, "iconScale")} format={(v) => `${Math.round(v * 100)}%`} />
          <Slider label={s.rotate} value={cfg.rotate} min={-180} max={180} step={1} onChange={(v) => patch({ rotate: v }, "rotate")} format={(v) => `${v}°`} />
          {cfg.icon.type === "lucide" && cfg.symbol === "icon" && (
            <Slider label={s.stroke} value={cfg.strokeWidth} min={0.75} max={3.5} step={0.05} onChange={(v) => patch({ strokeWidth: v }, "stroke")} format={(v) => v.toFixed(2)} />
          )}
          <Slider label={s.gap} value={cfg.gap} min={0.2} max={2} step={0.02} onChange={(v) => patch({ gap: v }, "gap")} format={(v) => `${Math.round(v * 100)}%`} />
        </Section>

        <Section title={s.text} icon={<Type className="size-3.5" aria-hidden />}>
          <Field label={s.font}>
            <Select value={cfg.font} onChange={(v) => patch({ font: v, weight: nearestWeight(getFont(v), cfg.weight) })} options={fontOptions} />
          </Field>
          <div className="grid grid-cols-2 gap-2">
            <Field label={s.weight}>
              <Select value={String(cfg.weight)} onChange={(v) => patch({ weight: Number(v) })} options={nameFont.weights.map((w) => ({ value: String(w), label: String(w) }))} />
            </Field>
            <Field label={s.case}>
              <Segmented label={s.case} value={cfg.textCase} onChange={(v: TextCase) => patch({ textCase: v })} options={caseOptions} />
            </Field>
          </div>
          <Slider label={s.tracking} value={cfg.tracking} min={-0.1} max={0.4} step={0.005} onChange={(v) => patch({ tracking: v }, "tracking")} format={(v) => v.toFixed(3) + "em"} />
          <ToggleRow label={s.showTagline} checked={cfg.showTagline} onChange={(v) => patch({ showTagline: v })} />
          {cfg.showTagline && (
            <>
              <Field label={`${s.font} · ${s.taglineFont}`}>
                <Select value={cfg.taglineFont} onChange={(v) => patch({ taglineFont: v, taglineWeight: nearestWeight(getFont(v), cfg.taglineWeight) })} options={fontOptions} />
              </Field>
              <div className="grid grid-cols-2 gap-2">
                <Field label={s.weight}>
                  <Select value={String(cfg.taglineWeight)} onChange={(v) => patch({ taglineWeight: Number(v) })} options={tagFont.weights.map((w) => ({ value: String(w), label: String(w) }))} />
                </Field>
                <Field label={s.case}>
                  <Segmented label={s.case} value={cfg.taglineCase} onChange={(v: TextCase) => patch({ taglineCase: v })} options={caseOptions} />
                </Field>
              </div>
              <Slider label={s.taglineSize} value={cfg.taglineScale} min={0.18} max={0.55} step={0.01} onChange={(v) => patch({ taglineScale: v }, "taglineScale")} format={(v) => `${Math.round(v * 100)}%`} />
              <Slider label={`${s.tracking} · ${s.taglineFont}`} value={cfg.taglineTracking} min={-0.05} max={0.6} step={0.01} onChange={(v) => patch({ taglineTracking: v }, "taglineTracking")} format={(v) => v.toFixed(2) + "em"} />
            </>
          )}
          <Field label={s.decoration}>
            <Segmented label={s.decoration} value={cfg.decoration} onChange={(v: Decoration) => patch({ decoration: v })} options={(Object.keys(s.decorations) as Decoration[]).map((v) => ({ value: v, label: s.decorations[v] }))} />
          </Field>
        </Section>

        <Section title={s.colors} icon={<PaletteIcon className="size-3.5" aria-hidden />}>
          {(["symbol", "container", "name", "tagline", "accent"] as const).map((el) => (
            <RolePicker key={el} label={s.elements[el]} value={cfg.roles[el]} cfg={cfg} s={s} onChange={(v) => patch({ roles: { ...cfg.roles, [el]: v as ColorRole } })} />
          ))}
          <RolePicker label={s.elements.background} value={cfg.roles.background} cfg={cfg} s={s} allowTransparent onChange={(v) => patch({ roles: { ...cfg.roles, background: v } })} />
        </Section>
      </Panel>
    </div>
  )
}

/* ───────────────────────── Versions & export ───────────────────────── */

function Versions({ cfg, measure, s, lang }: { cfg: LogoConfig; measure: MeasureFn; s: S; lang: Lang }) {
  const router = useRouter()
  const [scale, setScale] = useState("2")
  const [busy, setBusy] = useState<string | null>(null)
  const base = slugify(cfg.name)
  const symbolSvg = useMemo(() => renderLogo(cfg, { measure, part: "symbol", idPrefix: "mk-s" }).svg, [cfg, measure])
  const fullSvg = useMemo(() => renderLogo(cfg, { measure, idPrefix: "mk-f" }).svg, [cfg, measure])
  const whiteSvg = useMemo(() => renderLogo(cfg, { measure, version: "white", idPrefix: "mk-w" }).svg, [cfg, measure])
  const nameFont = getFont(cfg.font)

  async function download(part: Part, version: Version, format: "svg" | "png") {
    const key = `${part}-${version}-${format}`
    setBusy(key)
    try {
      const out = await buildSvg(cfg, part, version, 400)
      if (format === "svg") downloadText(out.svg, `${base}-${part}-${version}.svg`, "image/svg+xml")
      else downloadBlob(await svgToImage(out.svg, out.w, out.h, Number(scale) * 2), `${base}-${part}-${version}@${scale}x.png`)
    } finally {
      setBusy(null)
    }
  }

  async function pack() {
    setBusy("pack")
    try {
      const entries: ZipEntry[] = []
      for (const version of VERSIONS) {
        for (const part of ["full", "symbol"] as Part[]) {
          const out = await buildSvg(cfg, part, version, 400)
          entries.push({ name: `logo/${version}/${base}-${part}-${version}.svg`, data: out.svg })
          entries.push({ name: `logo/${version}/${base}-${part}-${version}.png`, data: await svgToImage(out.svg, out.w, out.h, part === "full" ? 2 : 2.56) })
        }
      }
      const icon = await buildSvg(cfg, "symbol", "color", 512)
      for (const size of [16, 32, 48, 180, 192, 512]) {
        const label = size === 180 ? "apple-touch-icon" : size >= 192 ? `icon-${size}` : `favicon-${size}`
        entries.push({ name: `favicon/${label}.png`, data: await svgToImage(icon.svg, size, size, 1) })
      }
      const p = cfg.palette
      entries.push({ name: "brand/palette.json", data: JSON.stringify({ brand: cfg.name, colors: p, fonts: { name: nameFont.family, tagline: getFont(cfg.taglineFont).family } }, null, 2) })
      entries.push({ name: "brand/palette.css", data: `:root {\n${(Object.keys(p) as (keyof Palette)[]).map((k) => `  --brand-${k}: ${p[k]};`).join("\n")}\n  --brand-font: ${fontStack(nameFont)};\n  --brand-font-tagline: ${fontStack(getFont(cfg.taglineFont))};\n}\n` })
      entries.push({
        name: "brand/README.txt",
        data: `${cfg.name} — brand pack\n\nFonts (Google Fonts, free for commercial use):\n- ${nameFont.family}: https://fonts.google.com/specimen/${nameFont.family.replace(/ /g, "+")}\n- ${getFont(cfg.taglineFont).family}: https://fonts.google.com/specimen/${getFont(cfg.taglineFont).family.replace(/ /g, "+")}\n\nColours:\n${(Object.keys(p) as (keyof Palette)[]).map((k) => `- ${k}: ${p[k]}`).join("\n")}\n\nThe SVG files embed the fonts they use.\n`,
      })
      downloadBlob(await zip(entries), `${base}-brand-pack.zip`)
    } finally {
      setBusy(null)
    }
  }

  async function animate() {
    setBusy("animate")
    try {
      const [symbol, text, full] = await Promise.all([buildSvg(cfg, "symbol", "color", 400), buildSvg(cfg, "text", "color", 400), buildSvg(cfg, "full", "color", 400)])
      localStorage.setItem(LOGO_EXPORT_KEY, JSON.stringify({ name: cfg.name, layout: cfg.layout, palette: cfg.palette, symbol, text, full, at: Date.now() }))
      router.push(`/${lang}/lab/motion?import=logo`)
    } catch {
      setBusy(null)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3 rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/10 via-surface to-background p-4">
        <div className="max-w-md">
          <p className="text-[13px] font-semibold">{s.pack}</p>
          <p className="mt-1 text-[12px] text-muted-foreground">{s.packHint}</p>
        </div>
        <div className="flex flex-wrap items-end gap-2">
          <div>
            <span className="mb-1 block text-[11px] text-muted-foreground">{s.scale}</span>
            <Segmented label={s.scale} value={scale} onChange={setScale} options={["1", "2", "4"].map((v) => ({ value: v, label: `${v}×` }))} />
          </div>
          <Button onClick={animate} disabled={!!busy}>
            {busy === "animate" ? <Loader2 className="size-4 animate-spin" aria-hidden /> : <Clapperboard className="size-4" aria-hidden />} {s.animate}
          </Button>
          <Button variant="primary" onClick={pack} disabled={!!busy}>
            {busy === "pack" ? <Loader2 className="size-4 animate-spin" aria-hidden /> : <FileArchive className="size-4" aria-hidden />} {busy === "pack" ? s.packing : "ZIP"}
          </Button>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {VERSIONS.map((v) => (
          <figure key={v} className="overflow-hidden rounded-2xl border border-line">
            <div className="grid grid-cols-[1fr_auto]" style={{ backgroundColor: versionBg(cfg, v) }}>
              <LogoView svg={renderLogo(cfg, { measure, version: v, idPrefix: `v-${v}` }).svg} className="h-32 p-6" />
              <LogoView svg={renderLogo(cfg, { measure, version: v, part: "symbol", idPrefix: `vs-${v}` }).svg} className="h-32 w-28 border-l border-white/10 p-6" />
            </div>
            <figcaption className="flex flex-wrap items-center justify-between gap-2 border-t border-line bg-surface px-3 py-2.5">
              <span className="text-[12.5px] font-medium">{s.versions[v]}</span>
              <span className="flex flex-wrap gap-1">
                {(["full", "symbol"] as Part[]).map((part) =>
                  (["svg", "png"] as const).map((fmt) => (
                    <Button key={`${part}-${fmt}`} size="sm" variant="ghost" className="h-7 px-2 text-[11px]" disabled={!!busy} onClick={() => download(part, v, fmt)}>
                      {busy === `${part}-${v}-${fmt}` ? <Loader2 className="size-3 animate-spin" aria-hidden /> : <Download className="size-3" aria-hidden />}
                      {part === "symbol" ? "◆ " : ""}
                      {fmt.toUpperCase()}
                    </Button>
                  )),
                )}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>

      <Panel title={s.mockups}>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="mb-2 text-[11.5px] font-medium text-muted-foreground">{s.card}</p>
            <div className="grid grid-cols-2 gap-2">
              <div className="grid aspect-[1.75] place-items-center rounded-lg shadow-lg" style={{ backgroundColor: cfg.palette.paper }}>
                <LogoView svg={fullSvg} className="h-1/2 w-4/5" />
              </div>
              <div className="flex aspect-[1.75] flex-col justify-between rounded-lg p-3 shadow-lg" style={{ background: `linear-gradient(135deg, ${cfg.palette.primary}, ${cfg.palette.secondary})` }}>
                <LogoView svg={whiteSvg} className="h-6 w-24 [&>svg]:ml-0" />
                <div className="text-[8px] leading-relaxed text-white/85" style={{ fontFamily: fontStack(getFont(cfg.taglineFont)) }}>
                  <p className="text-[10px] font-semibold text-white">{lang === "fr" ? "Prénom Nom" : "First Last"}</p>
                  <p>CEO · {cfg.name}</p>
                  <p>+243 990 000 000 · hello@{slugify(cfg.name)}.com</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <p className="mb-2 text-[11.5px] font-medium text-muted-foreground">
              {s.appIcon} · {s.avatar}
            </p>
            <div className="flex items-end gap-4 rounded-lg bg-gradient-to-br from-slate-800 to-slate-950 p-4">
              {[64, 48, 36].map((size) => (
                <div key={size} className="flex flex-col items-center gap-1">
                  <div className="overflow-hidden rounded-[22%] bg-white shadow-lg" style={{ width: size, height: size }}>
                    <LogoView svg={symbolSvg} className="size-full" />
                  </div>
                  <span className="text-[9px] text-white/70">{cfg.name.slice(0, 10)}</span>
                </div>
              ))}
              <div className="ml-auto overflow-hidden rounded-full border-2 border-white/80 shadow-lg" style={{ width: 72, height: 72, backgroundColor: cfg.palette.paper }}>
                <LogoView svg={symbolSvg} className="size-full p-1" />
              </div>
            </div>
          </div>
          <div className="md:col-span-2">
            <p className="mb-2 text-[11.5px] font-medium text-muted-foreground">{s.website}</p>
            <div className="overflow-hidden rounded-lg border border-line shadow-sm">
              <div className="flex items-center gap-1.5 border-b border-line bg-surface-2 px-3 py-1.5">
                {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
                  <span key={c} className="size-2.5 rounded-full" style={{ backgroundColor: c }} />
                ))}
                <span className="ml-3 flex items-center gap-1.5 rounded-md bg-background px-2 py-0.5 text-[10px] text-muted-foreground">
                  <span className="size-3.5 overflow-hidden rounded-sm">
                    <LogoView svg={symbolSvg} className="size-full" />
                  </span>
                  {slugify(cfg.name)}.com
                </span>
              </div>
              <div className="flex items-center justify-between px-5 py-3" style={{ backgroundColor: cfg.palette.paper }}>
                <LogoView svg={fullSvg} className="h-9 w-40 [&>svg]:ml-0" />
                <div className="hidden gap-5 text-[12px] sm:flex" style={{ color: cfg.palette.ink, fontFamily: fontStack(getFont(cfg.taglineFont)) }}>
                  <span>{lang === "fr" ? "Accueil" : "Home"}</span>
                  <span>Services</span>
                  <span>Contact</span>
                </div>
                <span className="rounded-full px-3 py-1.5 text-[11px] font-semibold" style={{ backgroundColor: cfg.palette.primary, color: contrast("#ffffff", cfg.palette.primary) > 3 ? "#fff" : cfg.palette.ink }}>
                  {lang === "fr" ? "Commencer" : "Get started"}
                </span>
              </div>
              <div className="px-5 py-8" style={{ background: `linear-gradient(135deg, ${cfg.palette.primary}, ${cfg.palette.secondary})` }}>
                <p className="max-w-sm text-[22px] font-bold leading-tight text-white" style={{ fontFamily: fontStack(nameFont) }}>
                  {applyCase(cfg.tagline || cfg.name, "none")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Panel>
    </div>
  )
}

/* ───────────────────────── Marketing collateral ───────────────────────── */

function Collateral({ cfg, s, t }: { cfg: LogoConfig; s: S; t: LabStrings }) {
  const defaults = t.brand.defaults
  const [copy, setCopy] = useState({ handle: `@${slugify(cfg.name).replace(/-/g, "")}`, cta: defaults.cta, promo: defaults.promo, promoLabel: defaults.promoLabel, product: defaults.product, price: defaults.price, oldPrice: defaults.oldPrice })
  const [group, setGroup] = useState<TemplateGroup | "all">("social")
  const [assets, setAssets] = useState<{ logo: string; fontCss: string; key: string } | null>(null)
  const [scale, setScale] = useState("1")
  // Templates use one family for all copy: a display/script logo font would hurt body text, so fall back to the tagline font.
  const bodyFont = ["sans", "geometric"].includes(getFont(cfg.font).category) ? getFont(cfg.font) : getFont(cfg.taglineFont)
  const key = JSON.stringify([cfg, bodyFont.id])

  useEffect(() => {
    let alive = true
    const id = setTimeout(async () => {
      const [symbol, fontCss] = await Promise.all([buildSvg(cfg, "symbol", "color", 400), fontEmbedCss([{ font: bodyFont, weights: [400, 600, 700, 800] }])])
      if (alive) setAssets({ logo: svgDataUrl(symbol.svg), fontCss, key })
    }, 250)
    return () => {
      alive = false
      clearTimeout(id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  const brand = useMemo<Brand | null>(
    () =>
      assets
    ? {
        name: cfg.name,
        tagline: cfg.tagline,
        ...copy,
        logo: assets.logo,
        primary: cfg.palette.primary,
        secondary: cfg.palette.secondary,
        accent: cfg.palette.accent,
        dark: cfg.palette.ink,
        light: cfg.palette.paper,
        radius: cfg.container === "square" || cfg.container === "none" ? "soft" : "round",
        font: bodyFont.category === "serif" ? "serif" : "sans",
        theme: "light",
        background: "gradient",
        pattern: "dots",
        fontFamily: fontStack(bodyFont),
        fontCss: assets.fontCss,
      }
    : null,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [assets, copy],
  )

  const rendered = useMemo(() => (brand ? templates.filter((tpl) => group === "all" || tpl.group === group).map((tpl) => ({ ...tpl, svg: tpl.render(brand) })) : []), [brand, group])
  const base = slugify(cfg.name)
  const label = (id: string) => (t.brand.templates as Record<string, string>)[id] || id
  const field = (k: keyof typeof copy, l: string) => (
    <Field label={l}>
      <TextInput value={copy[k]} onChange={(e) => setCopy((c) => ({ ...c, [k]: e.target.value }))} />
    </Field>
  )

  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_280px]">
      <div className="min-w-0 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            {(["social", "print", "digital", "marketplace", "all"] as const).map((g) => (
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
          <div className="flex items-center gap-2">
            <Segmented label={s.scale} value={scale} onChange={setScale} options={["1", "2"].map((v) => ({ value: v, label: `${v}×` }))} />
            <Button
              size="sm"
              variant="primary"
              disabled={!rendered.length}
              onClick={async () => {
                const entries: ZipEntry[] = []
                for (const tpl of rendered) entries.push({ name: `${base}-${tpl.id}.png`, data: await svgToImage(tpl.svg, tpl.w, tpl.h, Number(scale)) })
                downloadBlob(await zip(entries), `${base}-${group}.zip`)
              }}
            >
              <Download className="size-3.5" aria-hidden /> {s.downloadAll}
            </Button>
          </div>
        </div>
        <p className="text-[12.5px] text-muted-foreground">{s.collateralHint}</p>
        {!brand ? (
          <p className="flex items-center gap-2 py-16 text-[13px] text-muted-foreground">
            <Loader2 className="size-4 animate-spin" aria-hidden /> {s.preparing}
          </p>
        ) : (
          <div className="columns-1 gap-3 md:columns-2 [&>*]:mb-3">
            {rendered.map((tpl) => (
              <figure key={tpl.id} className="break-inside-avoid overflow-hidden rounded-2xl border border-line">
                <div className="bg-[repeating-conic-gradient(var(--surface-2)_0_25%,transparent_0_50%)] bg-[length:16px_16px] p-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={svgDataUrl(tpl.svg)} alt={label(tpl.id)} className="mx-auto max-h-80 w-auto rounded-md shadow-lg" style={{ aspectRatio: `${tpl.w} / ${tpl.h}` }} />
                </div>
                <figcaption className="flex items-center justify-between gap-2 border-t border-line bg-surface px-3 py-2.5">
                  <span>
                    <span className="block text-[12.5px] font-medium">{label(tpl.id)}</span>
                    <span className="font-mono text-[10.5px] text-subtle-foreground">
                      {tpl.w}×{tpl.h}
                    </span>
                  </span>
                  <span className="flex gap-1">
                    <Button size="sm" variant="ghost" onClick={() => downloadText(tpl.svg, `${base}-${tpl.id}.svg`, "image/svg+xml")}>
                      SVG
                    </Button>
                    <Button size="sm" onClick={async () => downloadBlob(await svgToImage(tpl.svg, tpl.w, tpl.h, Number(scale)), `${base}-${tpl.id}.png`)}>
                      PNG
                    </Button>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>
      <Panel title={s.copy} className="xl:sticky xl:top-24 xl:self-start">
        {field("handle", s.handle)}
        {field("cta", s.cta)}
        <div className="grid grid-cols-2 gap-2">
          {field("promoLabel", s.promoLabel)}
          {field("promo", s.promo)}
        </div>
        {field("product", s.product)}
        <div className="grid grid-cols-2 gap-2">
          {field("price", s.price)}
          {field("oldPrice", s.oldPrice)}
        </div>
        <p className="flex items-center gap-1.5 text-[11px] text-subtle-foreground">
          <Check className="size-3.5 text-success" aria-hidden /> {bodyFont.family}
        </p>
      </Panel>
    </div>
  )
}
