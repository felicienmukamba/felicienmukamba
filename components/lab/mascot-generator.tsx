"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import {
  ArrowDownToLine,
  ArrowRight,
  Check,
  Copy,
  Download,
  ExternalLink,
  Layers,
  Palette,
  RefreshCw,
  Sliders,
  Smartphone,
  Sparkles,
  Wand2,
} from "lucide-react"
import {
  DEFAULT_MASCOT_CONFIG,
  MASCOT_ARCHETYPES,
  MASCOT_PALETTES,
  MASCOT_STYLES,
  MASCOT_TRAITS,
  SHOWCASE_MASCOTS,
  compileMascotPrompt,
  type MascotArchetype,
  type MascotBackground,
  type MascotConfig,
  type MascotPalette,
  type MascotShowcase,
  type MascotStyle,
  type MascotTrait,
} from "@/lib/lab/mascot-data"
import { Button, CodeBlock, Field, Panel, Segmented, TextInput } from "@/components/kit/controls"
import { type LabStrings } from "@/lib/lab/i18n"
import { cn } from "@/lib/utils"

export function MascotGenerator({ t, lang }: { t: LabStrings; lang: "en" | "fr" }) {
  const isFr = lang === "fr"
  const [config, setConfig] = useState<MascotConfig>(DEFAULT_MASCOT_CONFIG)
  const [selectedShowcase, setSelectedShowcase] = useState<MascotShowcase>(SHOWCASE_MASCOTS[0])
  const [avatarFrame, setAvatarFrame] = useState<"rounded" | "circle" | "squircle">("squircle")
  const [customTraitInput, setCustomTraitInput] = useState("")
  const [copied, setCopied] = useState(false)

  // Prompt compilé en temps réel
  const compiledPrompt = useMemo(() => compileMascotPrompt(config), [config])

  const copyPrompt = () => {
    navigator.clipboard.writeText(compiledPrompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 1600)
  }

  const toggleTrait = (trait: MascotTrait) => {
    setConfig((prev) => {
      const exists = prev.traits.includes(trait)
      if (exists) {
        if (prev.traits.length === 1) return prev // garder au moins un trait
        return { ...prev, traits: prev.traits.filter((t) => t !== trait) }
      }
      return { ...prev, traits: [...prev.traits, trait] }
    })
  }

  // Trouve l'image de showcase la plus proche ou correspondante
  const activeShowcase = useMemo(() => {
    const match = SHOWCASE_MASCOTS.find((s) => s.style === config.style && s.archetype === config.archetype)
    return match || selectedShowcase
  }, [config.style, config.archetype, selectedShowcase])

  const handleApplyToShowcase = (showcase: MascotShowcase) => {
    setSelectedShowcase(showcase)
    setConfig((prev) => ({
      ...prev,
      style: showcase.style,
      archetype: showcase.archetype,
      traits: showcase.traits,
      palette: showcase.palette,
    }))
  }

  const handleDownloadImage = (src: string, filename: string) => {
    const a = document.createElement("a")
    a.href = src
    a.download = filename
    a.click()
  }

  return (
    <div className="space-y-10">
      {/* En-tête avec passerelle vers App Icon Studio */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-line pb-5">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-wider text-accent font-semibold">
            {isFr ? "Studio de Mascottes IA" : "AI Mascot Avatar Studio"}
          </span>
          <h2 className="mt-1 text-2xl font-bold tracking-tight">
            {isFr ? "Générateur d'Avatars & Mascottes de Marque" : "Brand Mascot & Avatar Generator"}
          </h2>
          <p className="mt-1 text-[13px] text-muted-foreground">
            {isFr
              ? "Composez l'identité de votre mascotte : styles graphiques (3D Pixar, Minimaliste, Croquis, Cyberpunk), traits de personnalité et invites haute précision pour les modèles d'images."
              : "Design your brand mascot: choose artistic styles (3D Pixar, Minimalist, Sketch, Cyberpunk), personality traits and high-precision image prompts."}
          </p>
        </div>

        <Link
          href={`/${lang}/lab/app-icon`}
          className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface px-4 py-2 text-xs font-semibold hover:bg-surface-2 transition shrink-0"
        >
          <Smartphone className="size-3.5 text-accent" />
          <span>{isFr ? "Appliquer dans App Icon Studio" : "Open in App Icon Studio"}</span>
          <ArrowRight className="size-3" />
        </Link>
      </div>

      {/* Galerie des Mascottes Générées */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-accent" />
            <span className="text-sm font-semibold">
              {isFr ? "Mascottes Haute Fidélité Pré-générées" : "Pre-rendered High-Fidelity Mascots"}
            </span>
          </div>
          <span className="text-[11px] text-muted-foreground">
            {isFr ? "Cliquez sur une mascotte pour charger ses paramètres" : "Click any mascot to load its style"}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {SHOWCASE_MASCOTS.map((m) => {
            const isCurrent = activeShowcase.id === m.id
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => handleApplyToShowcase(m)}
                className={cn(
                  "group relative flex flex-col overflow-hidden rounded-2xl border text-left transition-all hover:scale-[1.02]",
                  isCurrent
                    ? "border-accent ring-2 ring-accent/30 bg-accent-soft/30 shadow-lg"
                    : "border-line bg-surface hover:border-line-strong"
                )}
              >
                <div className="aspect-square w-full overflow-hidden relative bg-black/5">
                  <img
                    src={m.imageSrc}
                    alt={m.title}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-2 right-2 rounded-full bg-black/70 backdrop-blur px-2 py-0.5 font-mono text-[9px] text-white uppercase tracking-wider">
                    {m.style}
                  </div>
                </div>
                <div className="p-3">
                  <p className="font-semibold text-[13px] leading-tight text-foreground truncate">{m.title}</p>
                  <p className="mt-1 text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">
                    {m.backstory}
                  </p>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Interface principale : Panneau de configuration & Aperçu interactif */}
      <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
        {/* Colonne Gauche : Paramètres de Style, Archétype et Personnalité */}
        <div className="space-y-6">
          {/* 1. Style Artistique */}
          <Panel className="p-5 space-y-4">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Palette className="size-4 text-accent" />
              <span>{isFr ? "1. Style Graphique & Artistique" : "1. Artistic Style"}</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {MASCOT_STYLES.map((st) => (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => setConfig({ ...config, style: st.id })}
                  className={cn(
                    "rounded-xl border p-3 text-left transition text-xs",
                    config.style === st.id
                      ? "border-accent bg-accent-soft text-accent font-semibold ring-1 ring-accent"
                      : "border-line bg-surface hover:bg-surface-2 text-foreground"
                  )}
                >
                  <span className="font-semibold block text-[13px]">{isFr ? st.name : st.nameEn}</span>
                  <span className="text-[11px] text-muted-foreground line-clamp-2 mt-1 leading-normal font-normal">
                    {st.desc}
                  </span>
                </button>
              ))}
            </div>
          </Panel>

          {/* 2. Archétype / Sujet de la Mascotte */}
          <Panel className="p-5 space-y-4">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Sliders className="size-4 text-accent" />
              <span>{isFr ? "2. Archétype du Sujet" : "2. Mascot Archetype"}</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {MASCOT_ARCHETYPES.map((ar) => (
                <button
                  key={ar.id}
                  type="button"
                  onClick={() => setConfig({ ...config, archetype: ar.id })}
                  className={cn(
                    "rounded-xl border p-2.5 flex items-center gap-2.5 transition text-xs text-left",
                    config.archetype === ar.id
                      ? "border-accent bg-accent-soft text-accent font-semibold"
                      : "border-line bg-surface hover:bg-surface-2"
                  )}
                >
                  <span className="text-xl">{ar.symbol}</span>
                  <div className="min-w-0">
                    <span className="block font-medium truncate">{isFr ? ar.name : ar.nameEn}</span>
                  </div>
                </button>
              ))}
            </div>
          </Panel>

          {/* 3. Traits de Personnalité */}
          <Panel className="p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold flex items-center gap-2">
                <Wand2 className="size-4 text-accent" />
                {isFr ? "3. Traits de Personnalité (Multi-sélection)" : "3. Personality Traits"}
              </span>
              <span className="text-[11px] text-muted-foreground font-mono">
                {config.traits.length} {isFr ? "sélectionné(s)" : "selected"}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {MASCOT_TRAITS.map((tr) => {
                const isSelected = config.traits.includes(tr.id)
                return (
                  <button
                    key={tr.id}
                    type="button"
                    onClick={() => toggleTrait(tr.id)}
                    className={cn(
                      "rounded-xl border p-2.5 text-left transition text-xs flex flex-col justify-between",
                      isSelected
                        ? "border-accent bg-accent-soft text-accent font-semibold"
                        : "border-line bg-surface hover:bg-surface-2 text-foreground"
                    )}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="font-semibold">{isFr ? tr.name : tr.nameEn}</span>
                      {isSelected && <Check className="size-3.5 text-accent shrink-0" />}
                    </div>
                    <span className="text-[10px] text-muted-foreground mt-1 line-clamp-2 leading-relaxed font-normal">
                      {tr.desc}
                    </span>
                  </button>
                )
              })}
            </div>
          </Panel>

          {/* 4. Palette de Couleurs & Arrière-plan */}
          <Panel className="p-5 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold block mb-2 text-foreground">
                  {isFr ? "Palette de la Marque" : "Brand Palette"}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {MASCOT_PALETTES.map((pal) => (
                    <button
                      key={pal.id}
                      type="button"
                      onClick={() => setConfig({ ...config, palette: pal.id })}
                      className={cn(
                        "rounded-xl border p-2 text-left text-xs transition",
                        config.palette === pal.id ? "border-accent bg-accent-soft" : "border-line bg-surface hover:bg-surface-2"
                      )}
                    >
                      <div className="flex items-center gap-1 mb-1">
                        {pal.colors.map((c) => (
                          <span key={c} className="size-3 rounded-full" style={{ backgroundColor: c }} />
                        ))}
                      </div>
                      <span className="text-[11px] font-medium block truncate">{pal.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold block mb-2 text-foreground">
                  {isFr ? "Type d'Arrière-plan" : "Background Style"}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "studio-gradient", label: "Studio Dégradé" },
                    { id: "circular-badge", label: "Badge Rond" },
                    { id: "dark-grid", label: "Grille Cyber" },
                    { id: "clean-paper", label: "Papier Dessin" },
                  ].map((bg) => (
                    <button
                      key={bg.id}
                      type="button"
                      onClick={() => setConfig({ ...config, background: bg.id as MascotBackground })}
                      className={cn(
                        "rounded-xl border p-2 text-center text-[11px] font-medium transition",
                        config.background === bg.id
                          ? "border-accent bg-accent-soft text-accent font-semibold"
                          : "border-line bg-surface hover:bg-surface-2 text-muted-foreground"
                      )}
                    >
                      {bg.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Panel>
        </div>

        {/* Colonne Droite : Visualiseur d'Avatar & Compilateur de Prompt */}
        <div className="space-y-6">
          {/* Cadre d'aperçu de l'avatar */}
          <Panel className="p-6 flex flex-col items-center justify-center text-center bg-gradient-to-b from-surface to-surface-2/60">
            <div className="flex items-center justify-between w-full mb-4">
              <span className="text-xs font-semibold text-muted-foreground">
                {isFr ? "Aperçu de l'Avatar" : "Avatar Preview"}
              </span>
              <div className="flex items-center gap-1 bg-surface-2 rounded-lg p-0.5 border border-line">
                {(["squircle", "circle", "rounded"] as const).map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setAvatarFrame(f)}
                    className={cn(
                      "px-2 py-0.5 text-[10px] rounded font-mono uppercase transition",
                      avatarFrame === f ? "bg-accent text-accent-foreground font-bold shadow" : "text-muted-foreground"
                    )}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Avatar Display */}
            <div
              className={cn(
                "relative size-56 overflow-hidden shadow-2xl border-2 border-accent/30 transition-all duration-500 hover:scale-[1.03]",
                avatarFrame === "circle" && "rounded-full",
                avatarFrame === "rounded" && "rounded-3xl",
                avatarFrame === "squircle" && "rounded-[28%]"
              )}
            >
              <img
                src={activeShowcase.imageSrc}
                alt={activeShowcase.title}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="mt-4">
              <p className="font-semibold text-sm text-foreground">{activeShowcase.title}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{activeShowcase.backstory}</p>
            </div>

            <div className="mt-5 flex items-center gap-2 w-full">
              <Button
                className="flex-1"
                size="sm"
                onClick={() => handleDownloadImage(activeShowcase.imageSrc, `${activeShowcase.id}.jpg`)}
              >
                <ArrowDownToLine className="size-3.5" />
                <span>{isFr ? "Télécharger l'Avatar" : "Download Avatar"}</span>
              </Button>
              <Link
                href={`/${lang}/lab/app-icon`}
                className="inline-flex h-8 items-center justify-center gap-1.5 rounded-full border border-line-strong px-3 text-[12px] font-medium hover:bg-surface-2 transition"
              >
                <Smartphone className="size-3.5 text-accent" />
                <span>Logo Studio</span>
              </Link>
            </div>
          </Panel>

          {/* Prompt Compilé Haute Définition */}
          <Panel className="p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wand2 className="size-4 text-accent" />
                <span className="font-semibold text-sm">
                  {isFr ? "Invite d'Image Compilée" : "Compiled Image Prompt"}
                </span>
              </div>
              <button
                type="button"
                onClick={copyPrompt}
                className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:underline"
              >
                {copied ? <Check className="size-3 text-success" /> : <Copy className="size-3" />}
                <span>{copied ? (isFr ? "Copié !" : "Copied!") : isFr ? "Copier l'invite" : "Copy Prompt"}</span>
              </button>
            </div>

            <p className="text-[11px] text-muted-foreground">
              {isFr
                ? "Ce prompt combine automatiquement la géométrie, l'éclairage de studio, les détails matériels et les traits choisis."
                : "This prompt automatically blends geometry, studio lighting, material shaders and selected personality traits."}
            </p>

            <div className="max-h-[220px] overflow-auto rounded-xl">
              <CodeBlock code={compiledPrompt} />
            </div>
          </Panel>
        </div>
      </div>
    </div>
  )
}
