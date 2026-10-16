"use client"

import { useEffect, useId, useMemo, useRef, useState } from "react"
import {
  ArrowDownToLine,
  Check,
  Code,
  Compass,
  Copy,
  Cpu,
  CreditCard,
  Download,
  ExternalLink,
  Eye,
  FileText,
  Flame,
  Gem,
  Layers,
  Layout,
  Megaphone,
  Palette,
  Play,
  Printer,
  Rocket,
  RotateCw,
  Share2,
  Shield,
  Sliders,
  Sparkles,
  Smartphone,
  Store,
  Tv,
  Upload,
  Waves,
  Zap,
} from "lucide-react"
import {
  DEFAULT_THEME,
  SIZE,
  THEME_PRESETS,
  generateAdaptiveBackgroundSvg,
  generateAdaptiveForegroundSvg,
  generateAdaptiveXml,
  generateIosContentsJson,
  generateLogoSvg,
  generateMacOsSvg,
  generateMarkSvg,
  squircle,
  type AppIconTheme,
  type CombinedIconBadge,
  type MascotKind,
  type PrimaryGlyphType,
} from "@/lib/lab/app-icon-generator"
import {
  DEFAULT_BRAND_INFO,
  type BrandCharter,
  type BrandInfo,
  downloadCanvas,
  drawBillboardCanvas,
  drawBrochureCanvas,
  drawBusinessCardCanvas,
  drawFlyerCanvas,
  drawLogoEmblemCanvas,
  drawRollupBannerCanvas,
  drawSocialPostCanvas,
  drawStoryCanvas,
  drawTrifoldBrochureCanvas,
} from "@/lib/lab/branding-generator"
import {
  DEFAULT_MOTION_CONFIG,
  generateAnimatedCardSvg,
  generateCssMotionCode,
  generateFlutterCode,
  generateFramerMotionCode,
  type MotionConfig,
  type MotionMode,
} from "@/lib/lab/card-motion"
import { downloadText, slugify } from "@/lib/kit/download"
import { Button, CodeBlock, ColorField, Field, Panel, Segmented, Slider, TabBar, TextInput } from "@/components/kit/controls"
import { type LabStrings } from "@/lib/lab/i18n"
import { cn } from "@/lib/utils"

type MainTab = "studio" | "collateral" | "platforms" | "motion" | "code"

export function AppIconStudio({ t, lang }: { t: LabStrings; lang: "en" | "fr" }) {
  const [theme, setTheme] = useState<AppIconTheme>(DEFAULT_THEME)
  const [brandInfo, setBrandInfo] = useState<BrandInfo>({
    ...DEFAULT_BRAND_INFO,
    name: DEFAULT_THEME.wordmark,
    tagline: DEFAULT_THEME.tagline,
  })
  const [mainTab, setMainTab] = useState<MainTab>("studio")
  const [activeCollateral, setActiveCollateral] = useState<
    "flyer" | "brochure" | "trifold" | "rollup" | "billboard" | "card" | "social" | "story" | "emblem"
  >("flyer")
  const [cardSide, setCardSide] = useState<"front" | "back">("front")
  const [exportFormat, setExportFormat] = useState<"png" | "jpeg" | "webp">("png")
  const [isGeneratingAll, setIsGeneratingAll] = useState(false)
  const [customLogoImg, setCustomLogoImg] = useState<HTMLImageElement | null>(null)
  const [motionConfig, setMotionConfig] = useState<MotionConfig>(DEFAULT_MOTION_CONFIG)
  const [isFlipped, setIsFlipped] = useState(false)
  const [activeCodeLang, setActiveCodeLang] = useState<"framer" | "flutter" | "css" | "svg">("framer")
  const [copied, setCopied] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)
  const collateralCanvasRef = useRef<HTMLCanvasElement>(null)

  const isFr = lang === "fr"

  // SVGs générés dynamiquement
  const markSvg = useMemo(() => generateMarkSvg(theme), [theme])
  const logoLightSvg = useMemo(() => generateLogoSvg(theme, false), [theme])
  const logoDarkSvg = useMemo(() => generateLogoSvg(theme, true), [theme])
  const adaptiveFgSvg = useMemo(() => generateAdaptiveForegroundSvg(theme, false), [theme])
  const adaptiveBgSvg = useMemo(() => generateAdaptiveBackgroundSvg(theme), [theme])
  const adaptiveMonoSvg = useMemo(() => generateAdaptiveForegroundSvg(theme, true), [theme])
  const macOsSvg = useMemo(() => generateMacOsSvg(theme), [theme])
  const animatedCardSvg = useMemo(() => generateAnimatedCardSvg(theme.wordmark), [theme.wordmark])

  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 1600)
  }

  const handleDownloadSvg = (content: string, filename: string) => {
    downloadText(content, filename, "image/svg+xml")
  }

  // Téléchargement raster (PNG) via rendu Canvas dans le navigateur
  const handleDownloadPng = (svgContent: string, filename: string, size: number = 1024) => {
    const canvas = document.createElement("canvas")
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const img = new Image()
    const svgBlob = new Blob([svgContent], { type: "image/svg+xml;charset=utf-8" })
    const url = URL.createObjectURL(svgBlob)

    img.onload = () => {
      ctx.drawImage(img, 0, 0, size, size)
      canvas.toBlob((blob) => {
        if (!blob) return
        const a = document.createElement("a")
        a.href = URL.createObjectURL(blob)
        a.download = filename
        a.click()
        URL.revokeObjectURL(url)
      }, "image/png")
    }
    img.src = url
  }

  const brandCharter: BrandCharter = useMemo(
    () => ({
      primary: theme.blueBottom,
      primaryLight: theme.blueTop,
      secondary: theme.cardBack,
      accent: theme.accentYellow,
      dark: theme.shadowColor || "#081630",
      light: theme.cardWhite,
      cardStripe: theme.stripeColor,
      fontFamily: "sans",
      superellipseN: theme.superellipseN,
      glossOpacity: theme.glossOpacity,
      shadowOpacity: theme.shadowOpacity,
      iconStyle: theme.primaryType === "custom-svg" ? "custom" : "cards",
      customLogoImage: customLogoImg,
    }),
    [theme, customLogoImg]
  )

  useEffect(() => {
    if (mainTab !== "collateral" || !collateralCanvasRef.current) return
    const canvas = collateralCanvasRef.current

    if (activeCollateral === "flyer") {
      drawFlyerCanvas(canvas, brandInfo, brandCharter)
    } else if (activeCollateral === "brochure") {
      drawBrochureCanvas(canvas, brandInfo, brandCharter)
    } else if (activeCollateral === "trifold") {
      drawTrifoldBrochureCanvas(canvas, brandInfo, brandCharter)
    } else if (activeCollateral === "rollup") {
      drawRollupBannerCanvas(canvas, brandInfo, brandCharter)
    } else if (activeCollateral === "billboard") {
      drawBillboardCanvas(canvas, brandInfo, brandCharter)
    } else if (activeCollateral === "card") {
      drawBusinessCardCanvas(canvas, brandInfo, brandCharter, cardSide)
    } else if (activeCollateral === "social") {
      drawSocialPostCanvas(canvas, brandInfo, brandCharter)
    } else if (activeCollateral === "story") {
      drawStoryCanvas(canvas, brandInfo, brandCharter)
    } else if (activeCollateral === "emblem") {
      drawLogoEmblemCanvas(canvas, brandInfo, brandCharter)
    }
  }, [mainTab, activeCollateral, cardSide, brandInfo, brandCharter])

  const handleDownloadCollateral = (format: "png" | "jpeg" | "webp" = exportFormat) => {
    if (!collateralCanvasRef.current) return
    const base = slugify(brandInfo.name || "brand")
    const filename = `${base}-${activeCollateral}${activeCollateral === "card" ? `-${cardSide}` : ""}`
    downloadCanvas(collateralCanvasRef.current, filename, format)
  }

  const handleDownloadAllCollateral = async () => {
    setIsGeneratingAll(true)
    const base = slugify(brandInfo.name || "brand")
    const targets = [
      { name: `${base}-flyer-a5`, draw: (c: HTMLCanvasElement) => drawFlyerCanvas(c, brandInfo, brandCharter) },
      { name: `${base}-brochure-corporate-a4`, draw: (c: HTMLCanvasElement) => drawBrochureCanvas(c, brandInfo, brandCharter) },
      { name: `${base}-brochure-trifold-3volets`, draw: (c: HTMLCanvasElement) => drawTrifoldBrochureCanvas(c, brandInfo, brandCharter) },
      { name: `${base}-rollup-banner-salon`, draw: (c: HTMLCanvasElement) => drawRollupBannerCanvas(c, brandInfo, brandCharter) },
      { name: `${base}-billboard-outdoor-16-9`, draw: (c: HTMLCanvasElement) => drawBillboardCanvas(c, brandInfo, brandCharter) },
      { name: `${base}-business-card-recto`, draw: (c: HTMLCanvasElement) => drawBusinessCardCanvas(c, brandInfo, brandCharter, "front") },
      { name: `${base}-business-card-verso`, draw: (c: HTMLCanvasElement) => drawBusinessCardCanvas(c, brandInfo, brandCharter, "back") },
      { name: `${base}-social-post-carre`, draw: (c: HTMLCanvasElement) => drawSocialPostCanvas(c, brandInfo, brandCharter) },
      { name: `${base}-social-story-vertical`, draw: (c: HTMLCanvasElement) => drawStoryCanvas(c, brandInfo, brandCharter) },
      { name: `${base}-logo-emblem-carre`, draw: (c: HTMLCanvasElement) => drawLogoEmblemCanvas(c, brandInfo, brandCharter) },
    ]

    for (const item of targets) {
      const c = document.createElement("canvas")
      item.draw(c)
      downloadCanvas(c, item.name, exportFormat)
      await new Promise((r) => setTimeout(r, 200))
    }
    setIsGeneratingAll(false)
  }

  const handleSvgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (event) => {
      const text = event.target?.result as string
      // Extraire le premier 'd' attribut de chemin SVG si disponible
      const match = text.match(/<path[^>]*d="([^"]+)"/i)
      if (match && match[1]) {
        setTheme((prev) => ({
          ...prev,
          primaryType: "custom-svg",
          customSvgPath: match[1],
        }))
      }
      const img = new Image()
      img.onload = () => {
        setCustomLogoImg(img)
      }
      img.src = text.startsWith("data:") ? text : `data:image/svg+xml;charset=utf-8,${encodeURIComponent(text)}`
    }
    reader.readAsText(file)
  }

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string
      const img = new Image()
      img.onload = () => {
        setCustomLogoImg(img)
        setTheme((prev) => ({ ...prev, primaryType: "custom-svg" }))
      }
      img.src = dataUrl
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="space-y-8">
      {/* Barre d'onglets principale */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-line pb-4">
        <TabBar
          label="App Icon Studio"
          value={mainTab}
          onChange={setMainTab}
          tabs={[
            { value: "studio", label: isFr ? "1. Logo & Identité" : "1. Logo & Identity" },
            { value: "collateral", label: isFr ? "2. Brochures, Flyers & Pubs" : "2. Brochures, Flyers & Ads" },
            { value: "platforms", label: isFr ? "3. Écosystème & Formats" : "3. Ecosystem & Formats" },
            { value: "motion", label: isFr ? "4. Motion Design Cartes" : "4. Card Motion Design" },
            { value: "code", label: isFr ? "5. Code & Manifestes" : "5. Code & Manifests" },
          ]}
        />
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => handleDownloadSvg(markSvg, `${theme.filePrefix}-mark.svg`)}
          >
            <ArrowDownToLine className="size-3.5" /> SVG (1024)
          </Button>
          <Button
            size="sm"
            onClick={() => handleDownloadPng(markSvg, `${theme.filePrefix}-mark-1024.png`, 1024)}
          >
            <ArrowDownToLine className="size-3.5" /> PNG (1024)
          </Button>
        </div>
      </div>

      {/* =========================================================================
          ONGLET 1 : STUDIO PRINCIPAL
         ========================================================================= */}
      {mainTab === "studio" && (
        <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
          {/* Zone de prévisualisation en direct */}
          <div className="space-y-6">
            <Panel className="flex flex-col items-center justify-center p-8 sm:p-12 min-h-[460px] bg-gradient-to-b from-surface to-surface-2/70 overflow-hidden relative">
              <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

              {/* L'icône de superellipse 1024 rendue de manière réactive */}
              <div className="relative group max-w-[280px] w-full aspect-square drop-shadow-2xl transition-transform duration-500 hover:scale-[1.03]">
                <div
                  className="w-full h-full"
                  dangerouslySetInnerHTML={{ __html: markSvg }}
                />
              </div>

              {/* Badges descriptifs */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
                <span className="rounded-full bg-accent-soft px-3 py-1 font-mono text-[11px] text-accent">
                  Superellipse Apple n={theme.superellipseN.toFixed(1)}
                </span>
                <span className="rounded-full bg-surface-2 border border-line px-3 py-1 font-mono text-[11px] text-muted-foreground">
                  Grille vectorielle 1024×1024
                </span>
                <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 font-mono text-[11px] text-emerald-400">
                  Reflet spéculaire 55%
                </span>
              </div>
            </Panel>

            {/* Aperçu du logo horizontal (Clair & Sombre) */}
            <div className="grid gap-4 sm:grid-cols-2">
              <Panel className="p-4 bg-white text-slate-900 border border-slate-200">
                <div className="flex items-center justify-between mb-3 text-[12px] font-medium text-slate-500">
                  <span>Logo Horizontal (Clair)</span>
                  <button
                    onClick={() => handleDownloadSvg(logoLightSvg, `${theme.filePrefix}-logo-light.svg`)}
                    className="hover:text-blue-600 transition"
                  >
                    <ArrowDownToLine className="size-3.5" />
                  </button>
                </div>
                <div
                  className="w-full aspect-[880/320]"
                  dangerouslySetInnerHTML={{ __html: logoLightSvg }}
                />
              </Panel>

              <Panel className="p-4 bg-[#0F172A] text-slate-100 border border-slate-800">
                <div className="flex items-center justify-between mb-3 text-[12px] font-medium text-slate-400">
                  <span>Logo Horizontal (Sombre)</span>
                  <button
                    onClick={() => handleDownloadSvg(logoDarkSvg, `${theme.filePrefix}-logo-dark.svg`)}
                    className="hover:text-blue-400 transition"
                  >
                    <ArrowDownToLine className="size-3.5" />
                  </button>
                </div>
                <div
                  className="w-full aspect-[880/320]"
                  dangerouslySetInnerHTML={{ __html: logoDarkSvg }}
                />
              </Panel>
            </div>
          </div>

          {/* Panneau de réglages & personnalisation */}
          <div className="space-y-6">
            <Panel className="p-5 space-y-5">
              <div className="flex items-center gap-2 font-semibold text-sm">
                <Sliders className="size-4 text-accent" />
                <span>{isFr ? "Identité & Typographie" : "Identity & Typography"}</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Field label={isFr ? "Nom (Wordmark)" : "Wordmark"}>
                  <TextInput
                    value={brandInfo.name}
                    onChange={(e) => {
                      const v = e.target.value
                      setTheme((prev) => ({ ...prev, wordmark: v }))
                      setBrandInfo((prev) => ({ ...prev, name: v }))
                    }}
                  />
                </Field>
                <Field label={isFr ? "Signature (Tagline)" : "Tagline"}>
                  <TextInput
                    value={brandInfo.tagline}
                    onChange={(e) => {
                      const v = e.target.value
                      setTheme((prev) => ({ ...prev, tagline: v }))
                      setBrandInfo((prev) => ({ ...prev, tagline: v }))
                    }}
                  />
                </Field>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Field label={isFr ? "Catégorie / Activité" : "Category / Domain"}>
                  <TextInput
                    value={brandInfo.category}
                    onChange={(e) => setBrandInfo((prev) => ({ ...prev, category: e.target.value }))}
                  />
                </Field>
                <Field label={isFr ? "Badge Publicitaire" : "Promo Badge"}>
                  <TextInput
                    value={brandInfo.promoBadge}
                    onChange={(e) => setBrandInfo((prev) => ({ ...prev, promoBadge: e.target.value }))}
                  />
                </Field>
              </div>

              <Field label={isFr ? "Slogan de la marque" : "Brand Slogan"}>
                <TextInput
                  value={brandInfo.slogan}
                  onChange={(e) => setBrandInfo((prev) => ({ ...prev, slogan: e.target.value }))}
                />
              </Field>

              <div className="grid grid-cols-3 gap-2">
                <Field label={isFr ? "Site Web" : "Website"}>
                  <TextInput
                    value={brandInfo.website}
                    onChange={(e) => setBrandInfo((prev) => ({ ...prev, website: e.target.value }))}
                  />
                </Field>
                <Field label={isFr ? "Email" : "Email"}>
                  <TextInput
                    value={brandInfo.email}
                    onChange={(e) => setBrandInfo((prev) => ({ ...prev, email: e.target.value }))}
                  />
                </Field>
                <Field label={isFr ? "Téléphone" : "Phone"}>
                  <TextInput
                    value={brandInfo.phone}
                    onChange={(e) => setBrandInfo((prev) => ({ ...prev, phone: e.target.value }))}
                  />
                </Field>
              </div>

              {/* Presets de couleurs */}
              <div>
                <label className="text-[12px] font-medium text-muted-foreground block mb-2">
                  {isFr ? "Charte Graphique & Palettes Prédéfinies" : "Graphic Charter & Color Palettes"}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {THEME_PRESETS.map((p) => (
                    <button
                      key={p.name}
                      type="button"
                      onClick={() => setTheme((prev) => ({ ...prev, ...p.theme }))}
                      className={cn(
                        "rounded-xl border p-2 text-left text-[11px] font-medium transition hover:border-accent",
                        theme.blueTop === p.theme.blueTop ? "border-accent bg-accent-soft" : "border-line bg-surface-2/40"
                      )}
                    >
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <span className="size-3 rounded-full" style={{ backgroundColor: p.theme.blueTop }} />
                        <span className="size-3 rounded-full" style={{ backgroundColor: p.theme.accentYellow }} />
                      </div>
                      <span className="truncate block">{p.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Sélecteurs de couleur fins */}
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-line">
                <ColorField
                  label={isFr ? "Dégradé Haut" : "Gradient Top"}
                  value={theme.blueTop}
                  onChange={(v) => setTheme({ ...theme, blueTop: v })}
                />
                <ColorField
                  label={isFr ? "Dégradé Bas" : "Gradient Bottom"}
                  value={theme.blueBottom}
                  onChange={(v) => setTheme({ ...theme, blueBottom: v })}
                />
                <ColorField
                  label={isFr ? "Puce / Accent" : "Chip / Accent"}
                  value={theme.accentYellow}
                  onChange={(v) => setTheme({ ...theme, accentYellow: v })}
                />
                <ColorField
                  label={isFr ? "Carte Arrière" : "Back Card"}
                  value={theme.cardBack}
                  onChange={(v) => setTheme({ ...theme, cardBack: v })}
                />
              </div>
            </Panel>

            {/* Glyphe, Mascotte & Combinateur */}
            <Panel className="p-5 space-y-5">
              <div className="flex items-center gap-2 font-semibold text-sm">
                <Sparkles className="size-4 text-accent" />
                <span>{isFr ? "Icônes, Symboles & Importation" : "Icons, Symbols & Import"}</span>
              </div>

              {/* Bibliothèque de symboles rapides */}
              <div className="space-y-2">
                <label className="text-[12px] font-medium text-muted-foreground block">
                  {isFr ? "Symboles vectoriels prédéfinis" : "Preset Vector Symbols"}
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { id: "cards", label: "Cartes Pay", icon: CreditCard, type: "wallet-cards" as PrimaryGlyphType },
                    { id: "shield", label: "Sécurité", icon: Shield, type: "wallet-cards" as PrimaryGlyphType },
                    { id: "zap", label: "Énergie", icon: Zap, type: "wallet-cards" as PrimaryGlyphType },
                    { id: "chip", label: "Puce IA", icon: Cpu, type: "wallet-cards" as PrimaryGlyphType },
                    { id: "diamond", label: "Luxe", icon: Gem, type: "wallet-cards" as PrimaryGlyphType },
                    { id: "rocket", label: "Fusée", icon: Rocket, type: "mascot" as PrimaryGlyphType },
                    { id: "store", label: "Boutique", icon: Store, type: "wallet-cards" as PrimaryGlyphType },
                    { id: "flame", label: "Impact", icon: Flame, type: "wallet-cards" as PrimaryGlyphType },
                  ].map((sym) => (
                    <button
                      key={sym.id}
                      type="button"
                      onClick={() => {
                        setTheme((prev) => ({
                          ...prev,
                          primaryType: sym.type,
                          mascot: sym.id === "rocket" ? "rocket" : prev.mascot,
                        }))
                      }}
                      className={cn(
                        "rounded-xl border p-2 flex flex-col items-center justify-center gap-1 text-[11px] transition hover:border-accent",
                        "border-line bg-surface hover:bg-surface-2"
                      )}
                    >
                      <sym.icon className="size-4 text-accent" />
                      <span className="truncate">{sym.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <Field label={isFr ? "Mode d'icône centrale" : "Center Icon Mode"}>
                <Segmented
                  label={isFr ? "Type de symbole" : "Symbol Type"}
                  value={theme.primaryType}
                  onChange={(v) => setTheme({ ...theme, primaryType: v as PrimaryGlyphType })}
                  options={[
                    { value: "wallet-cards", label: isFr ? "Cartes Wallet" : "Wallet Cards" },
                    { value: "mascot", label: isFr ? "Mascotte" : "Mascot" },
                    { value: "custom-svg", label: isFr ? "Import d'Icône" : "Custom Icon" },
                  ]}
                />
              </Field>

              {theme.primaryType === "custom-svg" && (
                <div className="space-y-3 p-3 rounded-xl border border-line bg-surface-2/40">
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="secondary"
                      className="flex-1 text-xs"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="size-3.5" /> {isFr ? "Importer SVG" : "Upload SVG"}
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      className="flex-1 text-xs"
                      onClick={() => imageInputRef.current?.click()}
                    >
                      <Upload className="size-3.5" /> {isFr ? "Importer PNG/JPG" : "Upload Image"}
                    </Button>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".svg"
                    onChange={handleSvgUpload}
                    className="hidden"
                  />
                  <input
                    ref={imageInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={handleImageFileChange}
                    className="hidden"
                  />
                  <p className="text-[11px] text-muted-foreground">
                    {isFr
                      ? "Votre icône ou logo sera automatiquement centré, stylisé et adapté à tous les formats."
                      : "Your icon or logo will be automatically centered, styled, and rendered across all formats."}
                  </p>
                </div>
              )}

              {theme.primaryType === "mascot" && (
                <Field label={isFr ? "Choix de la mascotte" : "Choose Mascot"}>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: "robot", name: "Robot IA FinTech", desc: "Expressif & Futuriste" },
                      { id: "leopard", name: "Léopard du Kivu", desc: "Agilité & Vitesse" },
                      { id: "falcon", name: "Faucon Paiement", desc: "Aérodynamisme" },
                      { id: "shield-bot", name: "Shield Gardien", desc: "Cybersécurité" },
                      { id: "rocket", name: "Fusée Express", desc: "Transactions instant" },
                    ].map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setTheme({ ...theme, mascot: m.id as MascotKind })}
                        className={cn(
                          "rounded-xl border p-2 text-left transition text-[11px]",
                          theme.mascot === m.id ? "border-accent bg-accent-soft font-semibold text-accent" : "border-line bg-surface hover:bg-surface-2"
                        )}
                      >
                        <p className="font-medium text-foreground">{m.name}</p>
                        <p className="text-[10px] text-muted-foreground">{m.desc}</p>
                      </button>
                    ))}
                  </div>
                </Field>
              )}

              {theme.primaryType === "custom-svg" && (
                <div className="space-y-3">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".svg"
                    onChange={handleSvgUpload}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    className="w-full"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="size-4" /> {isFr ? "Importer un fichier SVG" : "Upload SVG file"}
                  </Button>
                  <p className="text-[11px] text-muted-foreground">
                    {isFr
                      ? "Le contour de votre SVG sera automatiquement centré et drapé dans le superellipse."
                      : "Your SVG path will be automatically centered and styled inside the superellipse."}
                  </p>
                </div>
              )}

              {/* Combinateur d'icônes : Badge en coin */}
              <Field label={isFr ? "Badge d'icône combinée (Coin supérieur)" : "Combined Icon Badge"}>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { id: "none", label: "Aucun" },
                    { id: "nfc", label: "NFC Wave" },
                    { id: "shield", label: "Shield" },
                    { id: "zap", label: "Éclair" },
                    { id: "lock", label: "Cadenas" },
                    { id: "check", label: "Vérifié" },
                    { id: "sparkles", label: "IA/Spark" },
                  ].map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => setTheme({ ...theme, badge: b.id as CombinedIconBadge })}
                      className={cn(
                        "rounded-lg border px-2 py-1.5 text-center text-[11px] transition",
                        theme.badge === b.id ? "border-accent bg-accent-soft text-accent font-semibold" : "border-line bg-surface hover:bg-surface-2 text-muted-foreground"
                      )}
                    >
                      {b.label}
                    </button>
                  ))}
                </div>
              </Field>

              {/* Géométrie de l'icône */}
              <div className="space-y-3 pt-2 border-t border-line">
                <Slider
                  label={isFr ? "Courbure Superellipse (n)" : "Superellipse Curvature (n)"}
                  value={theme.superellipseN}
                  min={3.0}
                  max={6.0}
                  step={0.1}
                  onChange={(v) => setTheme({ ...theme, superellipseN: v })}
                />
                <Slider
                  label={isFr ? "Échelle du glyphe" : "Glyph Scale"}
                  value={theme.glyphScale}
                  min={0.8}
                  max={1.3}
                  step={0.02}
                  onChange={(v) => setTheme({ ...theme, glyphScale: v })}
                />
                <Slider
                  label={isFr ? "Intensité reflet gloss" : "Specular Gloss Opacity"}
                  value={theme.glossOpacity}
                  min={0}
                  max={0.5}
                  step={0.05}
                  onChange={(v) => setTheme({ ...theme, glossOpacity: v })}
                />
              </div>
            </Panel>
          </div>
        </div>
      )}

      {/* =========================================================================
          ONGLET 2 : BROCHURES, FLYERS & SUPPORTS PUBLICITAIRES
         ========================================================================= */}
      {mainTab === "collateral" && (
        <div className="space-y-8">
          {/* Barre supérieure : Sélecteur de support, sélecteur de format & boutons d'export */}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between rounded-2xl border border-line bg-surface p-4">
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: "flyer", label: isFr ? "Flyer Promo A5" : "Promo Flyer A5", icon: FileText, dims: "1200×1600" },
                { id: "brochure", label: isFr ? "Brochure A4 (2V)" : "Corporate A4 (2P)", icon: Layout, dims: "1400×1000" },
                { id: "trifold", label: isFr ? "Dépliant 3 Volets" : "Tri-Fold (3P)", icon: Printer, dims: "2100×1000" },
                { id: "rollup", label: isFr ? "Roll-Up Salon" : "Roll-Up Stand", icon: Sparkles, dims: "900×2000" },
                { id: "billboard", label: isFr ? "Panneau 16:9" : "Billboard 16:9", icon: Tv, dims: "1920×800" },
                { id: "card", label: isFr ? "Carte de Visite" : "Business Card", icon: CreditCard, dims: "880×520" },
                { id: "social", label: isFr ? "Post Réseaux (1:1)" : "Social Post (1:1)", icon: Share2, dims: "1080×1080" },
                { id: "story", label: isFr ? "Story (9:16)" : "Story (9:16)", icon: Smartphone, dims: "1080×1920" },
                { id: "emblem", label: isFr ? "Emblème Sceau" : "Emblem Seal", icon: Gem, dims: "1000×1000" },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveCollateral(item.id as any)}
                  className={cn(
                    "flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition",
                    activeCollateral === item.id
                      ? "bg-accent text-accent-foreground shadow-md ring-2 ring-accent/30"
                      : "bg-surface-2 text-muted-foreground hover:bg-surface-2/80 hover:text-foreground border border-line"
                  )}
                >
                  <item.icon className="size-3.5 shrink-0" />
                  <span>{item.label}</span>
                  <span className="font-mono text-[9px] opacity-70">({item.dims})</span>
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* Sélecteur de format d'export */}
              <div className="flex items-center rounded-xl bg-surface-2 p-1 border border-line">
                {(["png", "jpeg", "webp"] as const).map((fmt) => (
                  <button
                    key={fmt}
                    type="button"
                    onClick={() => setExportFormat(fmt)}
                    className={cn(
                      "px-2.5 py-1 text-[11px] rounded-lg font-mono uppercase font-bold transition",
                      exportFormat === fmt ? "bg-accent text-accent-foreground shadow" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {fmt}
                  </button>
                ))}
              </div>

              {activeCollateral === "card" && (
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => setCardSide((prev) => (prev === "front" ? "back" : "front"))}
                >
                  <RotateCw className="size-3.5" />
                  <span>{cardSide === "front" ? (isFr ? "Voir Verso" : "View Back") : (isFr ? "Voir Recto" : "View Front")}</span>
                </Button>
              )}

              <Button
                size="sm"
                onClick={() => handleDownloadCollateral()}
              >
                <Download className="size-3.5" />
                <span>{isFr ? `Télécharger (${exportFormat.toUpperCase()})` : `Download (${exportFormat.toUpperCase()})`}</span>
              </Button>

              <Button
                size="sm"
                variant="secondary"
                disabled={isGeneratingAll}
                onClick={handleDownloadAllCollateral}
              >
                <Layers className="size-3.5" />
                <span>{isGeneratingAll ? (isFr ? "Génération..." : "Generating...") : (isFr ? "Pack Complet (5 fichiers)" : "Full Pack (5 assets)")}</span>
              </Button>
            </div>
          </div>

          {/* Grille principale : Aperçu Canvas haute fidélité & Panneau d'édition des textes */}
          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
            {/* Visualiseur Canvas interactif */}
            <Panel className="flex flex-col items-center justify-center p-6 sm:p-10 bg-gradient-to-b from-surface to-surface-2/60 overflow-hidden relative min-h-[580px]">
              <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

              <div className="relative max-w-full flex items-center justify-center">
                <canvas
                  ref={collateralCanvasRef}
                  className="max-h-[640px] max-w-full rounded-2xl shadow-2xl border border-line object-contain transition-all duration-300"
                />
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1 font-mono">
                  <Check className="size-3.5 text-success" /> Rendu Canvas Ultra-HD
                </span>
                <span>•</span>
                <span className="font-mono">
                  {activeCollateral === "flyer" && "1200×1600 px (A5 Portrait)"}
                  {activeCollateral === "brochure" && "1400×1000 px (A4 Corporate)"}
                  {activeCollateral === "trifold" && "2100×1000 px (Dépliant 3 Volets)"}
                  {activeCollateral === "rollup" && "900×2000 px (Kakémono Salon)"}
                  {activeCollateral === "billboard" && "1920×800 px (Panneau 16:9)"}
                  {activeCollateral === "card" && `880×520 px (${cardSide === "front" ? "Recto" : "Verso"})`}
                  {activeCollateral === "social" && "1080×1080 px (Carré Réseaux)"}
                  {activeCollateral === "story" && "1080×1920 px (Story 9:16)"}
                  {activeCollateral === "emblem" && "1000×1000 px (Emblème Carré)"}
                </span>
                {activeCollateral === "card" && (
                  <button
                    type="button"
                    onClick={() => setCardSide((prev) => (prev === "front" ? "back" : "front"))}
                    className="ml-2 inline-flex items-center gap-1 font-semibold text-accent hover:underline"
                  >
                    <RotateCw className="size-3" />
                    <span>{cardSide === "front" ? (isFr ? "Afficher le Verso" : "Show Back") : (isFr ? "Afficher le Recto" : "Show Front")}</span>
                  </button>
                )}
              </div>
            </Panel>

            {/* Panneau d'édition rapide des informations publicitaires */}
            <div className="space-y-5">
              <Panel className="p-5 space-y-4">
                <div className="flex items-center gap-2 font-semibold text-sm">
                  <Megaphone className="size-4 text-accent" />
                  <span>{isFr ? "Textes & Messages Publicitaires" : "Ad Copy & Messages"}</span>
                </div>

                <Field label={isFr ? "Grand Titre Accrocheur (Flyer)" : "Headline"}>
                  <TextInput
                    value={brandInfo.slogan}
                    onChange={(e) => setBrandInfo({ ...brandInfo, slogan: e.target.value })}
                  />
                </Field>

                <div className="grid grid-cols-2 gap-2">
                  <Field label={isFr ? "Badge Promo" : "Promo Badge"}>
                    <TextInput
                      value={brandInfo.promoBadge}
                      onChange={(e) => setBrandInfo({ ...brandInfo, promoBadge: e.target.value })}
                    />
                  </Field>
                  <Field label={isFr ? "Catégorie" : "Category"}>
                    <TextInput
                      value={brandInfo.category}
                      onChange={(e) => setBrandInfo({ ...brandInfo, category: e.target.value })}
                    />
                  </Field>
                </div>

                <div className="space-y-2 pt-2 border-t border-line">
                  <label className="text-xs font-semibold text-foreground block">
                    {isFr ? "3 Piliers / Avantages Clés (Flyer & Brochure)" : "3 Key Features"}
                  </label>
                  {brandInfo.features.map((feat, i) => (
                    <TextInput
                      key={i}
                      value={feat}
                      onChange={(e) => {
                        const newFeats = [...brandInfo.features] as [string, string, string]
                        newFeats[i] = e.target.value
                        setBrandInfo({ ...brandInfo, features: newFeats })
                      }}
                      placeholder={`Avantage ${i + 1}`}
                    />
                  ))}
                </div>

                <div className="space-y-2 pt-2 border-t border-line">
                  <label className="text-xs font-semibold text-foreground block">
                    {isFr ? "Chiffres Clés (Brochure d'Entreprise)" : "Key Metrics"}
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <TextInput
                      value={brandInfo.metric1.value}
                      onChange={(e) => setBrandInfo({ ...brandInfo, metric1: { ...brandInfo.metric1, value: e.target.value } })}
                      placeholder="Valeur 1"
                    />
                    <TextInput
                      value={brandInfo.metric2.value}
                      onChange={(e) => setBrandInfo({ ...brandInfo, metric2: { ...brandInfo.metric2, value: e.target.value } })}
                      placeholder="Valeur 2"
                    />
                    <TextInput
                      value={brandInfo.metric3.value}
                      onChange={(e) => setBrandInfo({ ...brandInfo, metric3: { ...brandInfo.metric3, value: e.target.value } })}
                      placeholder="Valeur 3"
                    />
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-line">
                  <label className="text-xs font-semibold text-foreground block">
                    {isFr ? "Coordonnées de Contact" : "Contact details"}
                  </label>
                  <TextInput
                    value={brandInfo.website}
                    onChange={(e) => setBrandInfo({ ...brandInfo, website: e.target.value })}
                    placeholder="Site web (ex: soside.pay)"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <TextInput
                      value={brandInfo.email}
                      onChange={(e) => setBrandInfo({ ...brandInfo, email: e.target.value })}
                      placeholder="Email"
                    />
                    <TextInput
                      value={brandInfo.phone}
                      onChange={(e) => setBrandInfo({ ...brandInfo, phone: e.target.value })}
                      placeholder="Téléphone"
                    />
                  </div>
                </div>
              </Panel>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          ONGLET 3 : FORMATS & ÉCOSYSTÈMES (iOS, Android, macOS, Web)
         ========================================================================= */}
      {mainTab === "platforms" && (
        <div className="space-y-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* iOS */}
            <Panel className="p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Smartphone className="size-4 text-accent" />
                    <span className="font-semibold text-sm">Apple iOS</span>
                  </div>
                  <span className="font-mono text-[10px] text-muted-foreground">Plein cadre</span>
                </div>
                <p className="text-[12px] text-muted-foreground mb-4">
                  {isFr
                    ? "Carré plein 1024×1024. Le système iOS applique lui-même son masque d'arrondi dynamique."
                    : "Full-bleed 1024×1024. iOS applies its dynamic rounded mask automatically."}
                </p>
                <div className="mx-auto w-32 aspect-square rounded-[22%] overflow-hidden border border-line shadow-lg">
                  <div className="w-full h-full" dangerouslySetInnerHTML={{ __html: markSvg }} />
                </div>
              </div>
              <div className="mt-6 flex flex-col gap-2">
                <Button
                  size="sm"
                  onClick={() => handleDownloadPng(markSvg, `${theme.filePrefix}-ios-1024.png`, 1024)}
                >
                  <ArrowDownToLine className="size-3.5" /> App Store (1024)
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => downloadText(generateIosContentsJson(theme.filePrefix), "Contents.json", "application/json")}
                >
                  Xcode Contents.json
                </Button>
              </div>
            </Panel>

            {/* Android Adaptatif */}
            <Panel className="p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Layers className="size-4 text-emerald-400" />
                    <span className="font-semibold text-sm">Android Adaptatif</span>
                  </div>
                  <span className="font-mono text-[10px] text-emerald-400">v8.0+ & 13+</span>
                </div>
                <p className="text-[12px] text-muted-foreground mb-4">
                  {isFr
                    ? "Zone sécurisée 66/108 (calque avant, fond dégradé séparé, et icône monochrome Android 13)."
                    : "Safe-zone 66/108 (foreground layer, separate background gradient, monochrome icon for Android 13)."}
                </p>
                <div className="mx-auto w-32 aspect-square rounded-full overflow-hidden border-2 border-emerald-500/30 shadow-lg relative bg-surface">
                  <div className="absolute inset-0" dangerouslySetInnerHTML={{ __html: adaptiveBgSvg }} />
                  <div className="absolute inset-0" dangerouslySetInnerHTML={{ __html: adaptiveFgSvg }} />
                </div>
              </div>
              <div className="mt-6 flex flex-col gap-2">
                <Button
                  size="sm"
                  onClick={() => handleDownloadSvg(adaptiveFgSvg, `${theme.filePrefix}-android-foreground.svg`)}
                >
                  <ArrowDownToLine className="size-3.5" /> Calque Avant (SVG)
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => handleDownloadSvg(adaptiveMonoSvg, `${theme.filePrefix}-android-monochrome.svg`)}
                >
                  Android 13 Mono
                </Button>
              </div>
            </Panel>

            {/* macOS Big Sur */}
            <Panel className="p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Tv className="size-4 text-blue-400" />
                    <span className="font-semibold text-sm">macOS Big Sur+</span>
                  </div>
                  <span className="font-mono text-[10px] text-blue-400">Gabarit 824</span>
                </div>
                <p className="text-[12px] text-muted-foreground mb-4">
                  {isFr
                    ? "Superellipse réduite à 824/1024 centrée avec une ombre portée diffuse pour le Dock macOS."
                    : "Squircle scaled to 824/1024 with soft drop shadow for the macOS Dock."}
                </p>
                <div className="mx-auto w-32 aspect-square flex items-center justify-center">
                  <div className="w-full h-full" dangerouslySetInnerHTML={{ __html: macOsSvg }} />
                </div>
              </div>
              <div className="mt-6">
                <Button
                  size="sm"
                  className="w-full"
                  onClick={() => handleDownloadSvg(macOsSvg, `${theme.filePrefix}-macos.svg`)}
                >
                  <ArrowDownToLine className="size-3.5" /> macOS Icône (SVG)
                </Button>
              </div>
            </Panel>

            {/* Web & PWA */}
            <Panel className="p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="size-4 text-amber-400" />
                    <span className="font-semibold text-sm">Web & PWA</span>
                  </div>
                  <span className="font-mono text-[10px] text-amber-400">Favicon & PWA</span>
                </div>
                <p className="text-[12px] text-muted-foreground mb-4">
                  {isFr
                    ? "Favicon multi-tailles (16, 32, 64), icône Apple Touch (180px) et PWA Maskable (512px)."
                    : "Multi-size favicon (16, 32, 64), Apple Touch icon (180px) and PWA Maskable (512px)."}
                </p>
                <div className="flex items-center justify-center gap-3 py-4">
                  <div className="size-6 border border-line rounded" dangerouslySetInnerHTML={{ __html: markSvg }} />
                  <div className="size-8 border border-line rounded-lg" dangerouslySetInnerHTML={{ __html: markSvg }} />
                  <div className="size-12 border border-line rounded-xl" dangerouslySetInnerHTML={{ __html: markSvg }} />
                </div>
              </div>
              <div className="mt-6 flex flex-col gap-2">
                <Button
                  size="sm"
                  onClick={() => handleDownloadPng(markSvg, "apple-touch-icon.png", 180)}
                >
                  Apple Touch (180px)
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => handleDownloadPng(markSvg, "icon-512.png", 512)}
                >
                  PWA (512px)
                </Button>
              </div>
            </Panel>
          </div>
        </div>
      )}

      {/* =========================================================================
          ONGLET 3 : MOTION DESIGN POUSSÉ POUR CARTES
         ========================================================================= */}
      {mainTab === "motion" && (
        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
          {/* Scène interactive de Motion Design */}
          <div className="space-y-6">
            <Panel className="p-8 sm:p-14 flex flex-col items-center justify-center min-h-[460px] bg-gradient-to-b from-surface to-background relative overflow-hidden border border-line">
              <div className="absolute inset-0 bg-grid opacity-15 pointer-events-none" />

              {/* Mode 1: 3D Flip */}
              {motionConfig.mode === "flip-3d" && (
                <div
                  style={{ perspective: motionConfig.perspective }}
                  className="w-full max-w-[340px] aspect-[1.586] cursor-pointer select-none"
                  onClick={() => setIsFlipped(!isFlipped)}
                >
                  <div
                    className={cn(
                      "relative w-full h-full rounded-2xl shadow-2xl transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                      isFlipped && "[transform:rotateY(180deg)]"
                    )}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Face avant */}
                    <div
                      className="absolute inset-0 rounded-2xl p-6 text-white flex flex-col justify-between overflow-hidden border border-white/20 shadow-xl"
                      style={{
                        backfaceVisibility: "hidden",
                        background: `linear-gradient(135deg, ${theme.blueTop} 0%, ${theme.blueBottom} 100%)`,
                      }}
                    >
                      <div className="absolute top-0 right-0 w-44 h-44 bg-white/10 rounded-full blur-2xl pointer-events-none" />
                      <div className="flex justify-between items-start z-10">
                        <div>
                          <span className="font-bold tracking-widest text-lg drop-shadow">{theme.wordmark}</span>
                          <span className="text-xs font-mono ml-2 tracking-widest text-amber-300 drop-shadow">{theme.tagline}</span>
                        </div>
                        <div
                          className="w-10 h-8 rounded-md border border-amber-300/60 shadow"
                          style={{ backgroundColor: theme.accentYellow }}
                        />
                      </div>
                      <div className="font-mono text-xl tracking-[0.22em] text-white/95 drop-shadow">
                        4289 •••• •••• 9901
                      </div>
                      <div className="flex justify-between items-end text-xs text-white/80 font-mono">
                        <div>
                          <div className="text-[9px] uppercase tracking-wider text-white/60">Titulaire</div>
                          <div className="font-semibold uppercase tracking-wider">{theme.wordmark} CLIENT</div>
                        </div>
                        <div>
                          <div className="text-[9px] uppercase tracking-wider text-white/60">Expire</div>
                          <div className="font-semibold">12/29</div>
                        </div>
                      </div>
                    </div>

                    {/* Face arrière */}
                    <div
                      className="absolute inset-0 rounded-2xl bg-slate-900 text-white flex flex-col justify-between overflow-hidden border border-slate-700 shadow-xl [transform:rotateY(180deg)]"
                      style={{ backfaceVisibility: "hidden" }}
                    >
                      <div className="w-full h-11 bg-black mt-5" />
                      <div className="px-6 flex items-center justify-end gap-3">
                        <div className="h-8 flex-1 bg-white/90 rounded text-slate-900 text-right pr-3 font-mono text-sm font-bold flex items-center justify-end">
                          CVV: 842
                        </div>
                      </div>
                      <div className="px-6 pb-5 text-[10px] text-slate-400 font-mono">
                        Émise par {theme.wordmark} Systems. Sécurité cryptographique AES-256.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Mode 2: Tap-to-Pay NFC */}
              {motionConfig.mode === "tap-nfc" && (
                <div className="relative flex flex-col items-center justify-center p-6 w-full max-w-[340px]">
                  {/* Cercles d'ondes NFC concentriques */}
                  <div className="absolute size-48 rounded-full border border-accent/40 animate-ping opacity-60" />
                  <div className="absolute size-32 rounded-full border border-emerald-400/50 animate-pulse" />

                  {/* Carte en lévitation sans-contact */}
                  <div
                    className="z-10 w-full aspect-[1.586] rounded-2xl p-6 text-white shadow-2xl flex flex-col justify-between border border-white/20 animate-bounce duration-1000"
                    style={{
                      background: `linear-gradient(135deg, ${theme.blueTop} 0%, ${theme.blueBottom} 100%)`,
                    }}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-bold tracking-widest">{theme.wordmark}</span>
                      <span className="text-[11px] font-mono bg-emerald-400/20 text-emerald-300 border border-emerald-400/40 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Waves className="size-3 animate-pulse" /> SANS CONTACT
                      </span>
                    </div>
                    <div className="font-mono text-lg tracking-widest text-center">•••• 7719</div>
                    <div className="flex justify-between items-center text-xs text-white/70">
                      <span>Prêt pour le paiement</span>
                      <span className="text-amber-300 font-semibold">120.00 USD</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Mode 3: Parallaxe Flottant */}
              {motionConfig.mode === "parallax-float" && (
                <div className="relative w-full max-w-[340px] aspect-[1.4] flex items-center justify-center">
                  {/* Carte arrière décalée */}
                  <div
                    className="absolute w-72 aspect-[1.586] rounded-2xl shadow-lg border border-white/20 transition-transform duration-500 [transform:rotate(-12deg)_translateY(-14px)]"
                    style={{ backgroundColor: theme.cardBack }}
                  />
                  {/* Carte avant principale */}
                  <div
                    className="relative z-10 w-72 aspect-[1.586] rounded-2xl p-5 shadow-2xl bg-white border border-slate-200 text-slate-900 flex flex-col justify-between transition-transform duration-500 hover:scale-105"
                  >
                    <div className="flex justify-between items-start">
                      <span className="font-bold text-sm text-blue-900 tracking-wider">{theme.wordmark}</span>
                      <div className="w-8 h-6 rounded bg-amber-400 border border-amber-300" />
                    </div>
                    <div className="font-mono text-sm tracking-widest text-slate-800">4289 •••• •••• 9901</div>
                    <div className="flex gap-2">
                      <div className="h-1.5 w-10 rounded-full bg-slate-200" />
                      <div className="h-1.5 w-10 rounded-full bg-slate-200" />
                      <div className="h-1.5 w-10 rounded-full bg-slate-200" />
                    </div>
                  </div>
                </div>
              )}

              {/* Mode 4: Insertion TPE */}
              {motionConfig.mode === "pos-insert" && (
                <div className="w-full max-w-[320px] flex flex-col items-center">
                  <div className="w-full bg-slate-800 border border-slate-700 rounded-t-2xl p-4 shadow-xl text-center">
                    <span className="text-xs font-mono text-emerald-400">LECTEUR DE CARTE PRÊT</span>
                    <div className="w-full h-3 bg-black rounded-full mt-3 border border-slate-700" />
                  </div>
                  <div
                    className="w-[90%] aspect-[1.586] rounded-b-2xl p-4 text-white shadow-2xl -mt-1 transition-transform duration-700 hover:translate-y-6"
                    style={{
                      background: `linear-gradient(135deg, ${theme.blueTop} 0%, ${theme.blueBottom} 100%)`,
                    }}
                  >
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold tracking-widest">{theme.wordmark}</span>
                      <div className="w-7 h-5 rounded bg-amber-400" />
                    </div>
                    <div className="font-mono text-xs text-center mt-4">•••• 4289</div>
                  </div>
                </div>
              )}

              {/* Contrôles du mode de motion */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
                {[
                  { id: "flip-3d", label: isFr ? "Retournement 3D" : "3D Flip" },
                  { id: "tap-nfc", label: isFr ? "Sans Contact NFC" : "NFC Tap-to-Pay" },
                  { id: "parallax-float", label: isFr ? "Parallaxe 3D" : "Parallax Float" },
                  { id: "pos-insert", label: isFr ? "Insertion TPE/POS" : "POS Terminal" },
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setMotionConfig({ ...motionConfig, mode: m.id as MotionMode })}
                    className={cn(
                      "rounded-full border px-3 py-1 text-xs font-medium transition",
                      motionConfig.mode === m.id
                        ? "border-accent bg-accent text-accent-foreground font-semibold"
                        : "border-line bg-surface hover:bg-surface-2 text-muted-foreground"
                    )}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </Panel>

            {/* Téléchargement SVG Animé autonome */}
            <div className="card rounded-2xl p-5 border border-line bg-surface flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="font-semibold text-sm">
                  {isFr ? "Exporter en SVG Animé Autonome (SMIL)" : "Export Standalone Animated SVG (SMIL)"}
                </p>
                <p className="text-[12px] text-muted-foreground mt-0.5">
                  {isFr
                    ? "S'anime tout seul dans n'importe quel navigateur, GitHub README ou application web sans bibliothèque externe."
                    : "Animates natively in any web browser, GitHub README or HTML view without external libraries."}
                </p>
              </div>
              <Button
                onClick={() => handleDownloadSvg(animatedCardSvg, `${theme.filePrefix}-animated-card.svg`)}
                className="shrink-0"
              >
                <ArrowDownToLine className="size-4" /> {isFr ? "Télécharger SVG Animé" : "Download Animated SVG"}
              </Button>
            </div>
          </div>

          {/* Panneau latéral de code Motion */}
          <Panel className="p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm flex items-center gap-2">
                <Code className="size-4 text-accent" />
                {isFr ? "Code d'animation" : "Motion Code"}
              </span>
              <button
                onClick={() => {
                  const code =
                    activeCodeLang === "framer"
                      ? generateFramerMotionCode(motionConfig, theme.wordmark)
                      : activeCodeLang === "flutter"
                      ? generateFlutterCode(motionConfig, theme.wordmark)
                      : generateCssMotionCode(motionConfig)
                  copyText(code, "motion-code")
                }}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-accent hover:underline"
              >
                {copied === "motion-code" ? <Check className="size-3" /> : <Copy className="size-3" />}
                {copied === "motion-code" ? "Copié !" : "Copier"}
              </button>
            </div>

            <Segmented
              label="Format"
              value={activeCodeLang}
              onChange={(v) => setActiveCodeLang(v as any)}
              options={[
                { value: "framer", label: "Framer Motion" },
                { value: "flutter", label: "Flutter (Dart)" },
                { value: "css", label: "CSS Keyframes" },
              ]}
            />

            <div className="max-h-[380px] overflow-auto rounded-xl">
              <CodeBlock
                code={
                  activeCodeLang === "framer"
                    ? generateFramerMotionCode(motionConfig, theme.wordmark)
                    : activeCodeLang === "flutter"
                    ? generateFlutterCode(motionConfig, theme.wordmark)
                    : generateCssMotionCode(motionConfig)
                }
              />
            </div>
          </Panel>
        </div>
      )}

      {/* =========================================================================
          ONGLET 4 : CODE SOURCE & MANIFESTES (TypeScript & Configs)
         ========================================================================= */}
      {mainTab === "code" && (
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Fichier Android ic_launcher.xml */}
          <Panel className="p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm font-mono text-emerald-400">
                android/res/mipmap-anydpi-v26/ic_launcher.xml
              </span>
              <button
                onClick={() => copyText(generateAdaptiveXml(), "android-xml")}
                className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
              >
                {copied === "android-xml" ? <Check className="size-3 text-success" /> : <Copy className="size-3" />}
                {copied === "android-xml" ? "Copié" : "Copier"}
              </button>
            </div>
            <CodeBlock code={generateAdaptiveXml()} />
          </Panel>

          {/* Fichier iOS Contents.json */}
          <Panel className="p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm font-mono text-blue-400">
                ios/Runner/Assets.xcassets/AppIcon.appiconset/Contents.json
              </span>
              <button
                onClick={() => copyText(generateIosContentsJson(theme.filePrefix), "ios-json")}
                className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
              >
                {copied === "ios-json" ? <Check className="size-3 text-success" /> : <Copy className="size-3" />}
                {copied === "ios-json" ? "Copié" : "Copier"}
              </button>
            </div>
            <div className="max-h-[280px] overflow-auto">
              <CodeBlock code={generateIosContentsJson(theme.filePrefix)} />
            </div>
          </Panel>

          {/* Code TypeScript de génération du Squircle */}
          <Panel className="p-5 space-y-3 lg:col-span-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm">
                {isFr ? "Formule Superellipse continue en TypeScript" : "Apple Superellipse Formula in TypeScript"}
              </span>
              <button
                onClick={() =>
                  copyText(
                    `export function squircle(size = 1024, n = 5.0, steps = 360) {
  const a = size / 2;
  const c = size / 2;
  const pts = [];
  for (let i = 0; i < steps; i++) {
    const t = (2 * Math.PI * i) / steps;
    const ct = Math.cos(t), st = Math.sin(t);
    const x = a * Math.sign(ct) * Math.pow(Math.abs(ct), 2 / n);
    const y = a * Math.sign(st) * Math.pow(Math.abs(st), 2 / n);
    pts.push([c + x, c + y]);
  }
  return pts;
}`,
                    "ts-code"
                  )
                }
                className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
              >
                {copied === "ts-code" ? <Check className="size-3 text-success" /> : <Copy className="size-3" />}
                {copied === "ts-code" ? "Copié" : "Copier"}
              </button>
            </div>
            <CodeBlock
              code={`/**
 * Formule mathématique continue de superellipse (Piet Hein / Gabriel Lamé) :
 * |x/a|^n + |y/b|^n = 1 avec n = 5.0 (Standard des icônes Apple macOS/iOS)
 */
export function squircle(size: number = 1024, n: number = 5.0, steps: number = 360): [number, number][] {
  const a = size / 2;
  const c = size / 2;
  const pts: [number, number][] = [];
  for (let i = 0; i < steps; i++) {
    const t = (2 * Math.PI * i) / steps;
    const ct = Math.cos(t);
    const st = Math.sin(t);
    const signX = ct < 0 ? -1 : 1;
    const signY = st < 0 ? -1 : 1;
    const x = a * signX * Math.pow(Math.abs(ct), 2 / n);
    const y = a * signY * Math.pow(Math.abs(st), 2 / n);
    pts.push([c + x, c + y]);
  }
  return pts;
}`}
            />
          </Panel>
        </div>
      )}
    </div>
  )
}
