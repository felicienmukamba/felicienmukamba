"use client"

import { memo, useCallback, useEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import {
  AlignCenterHorizontal, AlignCenterVertical, ArrowDown, ArrowUp, ChevronDown, ChevronRight, Clapperboard, Copy, Diamond, Download, Eye, EyeOff, FileJson, FolderOpen, Image as ImageIcon,
  Loader2, Lock, Pause, Play, Plus, Redo2, Shapes, SkipBack, Sparkles, Trash2, Type, Undo2, Unlock, Upload, Wand2, X,
} from "lucide-react"
import { Button, ColorField, Field, Segmented, Select, Slider, TextArea, TextInput, ToggleRow } from "@/components/kit/controls"
import { LOGO_EXPORT_KEY } from "@/components/lab/logo-studio"
import { IconPicker } from "@/components/studio/icon-picker"
import { downloadBlob, downloadText, svgToImage } from "@/lib/kit/download"
import { STUDIO_FONTS, ensureStudioFonts, fontEmbedCss, getFont, measureText, nearestWeight } from "@/lib/studio/fonts"
import { getMark } from "@/lib/studio/marks"
import {
  EASE_OPTIONS, FORMATS, PRESETS, PROPS, SHAPE_IDS, animatedSvg, applyPreset, clearTracks, defaultBase, keyAt, layerInner, recordVideo, renderFrameSvg, sample, sceneFontRequests,
  shapePreview, toggleKey, transformAttr, uid, usesDraw, valueAt, videoMime, writeValue,
  type Keyframe, type Layer, type LayerContent, type PresetId, type Prop, type Sample, type Scene, type ShapeId,
} from "@/lib/studio/motion-scene"
import { importFiles, sanitizeSvg, type ImportedVector } from "@/lib/studio/svg-import"
import { useHistory } from "@/lib/studio/use-history"
import { cn } from "@/lib/utils"

type Lang = "fr" | "en"
type AssetTab = "import" | "shapes" | "icons" | "text" | "scene"
type KeySel = { layerId: string; prop: Prop; keyId: string } | null

const STORAGE_KEY = "soside.motion-studio.v1"

const STR = {
  fr: {
    assets: { import: "Importer", shapes: "Formes", icons: "Icônes", text: "Texte", scene: "Scène" },
    drop: "Glissez vos SVG / PNG ici",
    dropHint: "Plusieurs fichiers acceptés. Chaque vecteur devient un calque animable.",
    browse: "Parcourir",
    paste: "Coller du code SVG",
    addPasted: "Ajouter le SVG",
    invalid: "SVG invalide",
    logoTitle: "Logo du Logo Studio",
    logoHint: "Importe le symbole et le texte en calques séparés, déjà animés.",
    importLogo: "Importer & animer le logo",
    addText: "Ajouter le texte",
    textPresets: { title: "Titre", subtitle: "Sous-titre", badge: "Badge" },
    format: "Format",
    background: "Fond",
    transparent: "Fond transparent",
    duration: "Durée",
    loop: "Boucle",
    layers: "Calques",
    empty: "Aucun calque. Ajoutez des formes, icônes, textes ou importez vos vecteurs.",
    select: "Sélectionnez un calque pour l'animer.",
    transform: "Transformation",
    props: { x: "Position X", y: "Position Y", scale: "Échelle", rotate: "Rotation", opacity: "Opacité", draw: "Tracé" },
    keyHint: "◆ ajoute une keyframe à la tête de lecture. Une propriété animée enregistre automatiquement vos modifications.",
    presets: "Animations prêtes",
    presetDuration: "Durée de l'effet",
    presetHint: "Appliquées à partir de la tête de lecture.",
    clear: "Effacer l'animation",
    appearance: "Apparence",
    color: "Couleur",
    stroke: "Épaisseur",
    recolor: "Recolorer",
    text: "Texte",
    font: "Police",
    weight: "Graisse",
    size: "Taille",
    tracking: "Interlettrage",
    keyframe: "Keyframe",
    time: "Temps",
    value: "Valeur",
    ease: "Courbe",
    delete: "Supprimer",
    duplicate: "Dupliquer",
    forward: "Avancer",
    backward: "Reculer",
    centerH: "Centrer horizontalement",
    centerV: "Centrer verticalement",
    export: "Exporter",
    video: "Vidéo",
    svg: "SVG animé",
    png: "Image PNG",
    project: "Projet",
    open: "Ouvrir",
    recording: "Enregistrement vidéo…",
    noVideo: "L'enregistrement vidéo n'est pas pris en charge par ce navigateur.",
    play: "Lecture (Espace)",
    pause: "Pause (Espace)",
    rewind: "Début",
    shortcuts: "Espace : lecture · Suppr : supprimer · Ctrl+D : dupliquer · Flèches : déplacer · Ctrl+Z : annuler",
  },
  en: {
    assets: { import: "Import", shapes: "Shapes", icons: "Icons", text: "Text", scene: "Scene" },
    drop: "Drop your SVG / PNG files here",
    dropHint: "Multiple files accepted. Each vector becomes an animatable layer.",
    browse: "Browse",
    paste: "Paste SVG code",
    addPasted: "Add SVG",
    invalid: "Invalid SVG",
    logoTitle: "Logo from Logo Studio",
    logoHint: "Imports the symbol and the wordmark as separate, pre-animated layers.",
    importLogo: "Import & animate the logo",
    addText: "Add text",
    textPresets: { title: "Title", subtitle: "Subtitle", badge: "Badge" },
    format: "Format",
    background: "Background",
    transparent: "Transparent background",
    duration: "Duration",
    loop: "Loop",
    layers: "Layers",
    empty: "No layers yet. Add shapes, icons, text or import your vectors.",
    select: "Select a layer to animate it.",
    transform: "Transform",
    props: { x: "Position X", y: "Position Y", scale: "Scale", rotate: "Rotation", opacity: "Opacity", draw: "Draw" },
    keyHint: "◆ adds a keyframe at the playhead. Once a property is animated, your edits are keyed automatically.",
    presets: "Animation presets",
    presetDuration: "Effect duration",
    presetHint: "Applied from the playhead.",
    clear: "Clear animation",
    appearance: "Appearance",
    color: "Colour",
    stroke: "Stroke",
    recolor: "Recolour",
    text: "Text",
    font: "Font",
    weight: "Weight",
    size: "Size",
    tracking: "Letter spacing",
    keyframe: "Keyframe",
    time: "Time",
    value: "Value",
    ease: "Easing",
    delete: "Delete",
    duplicate: "Duplicate",
    forward: "Bring forward",
    backward: "Send backward",
    centerH: "Centre horizontally",
    centerV: "Centre vertically",
    export: "Export",
    video: "Video",
    svg: "Animated SVG",
    png: "PNG frame",
    project: "Project",
    open: "Open",
    recording: "Recording video…",
    noVideo: "Video recording is not supported by this browser.",
    play: "Play (Space)",
    pause: "Pause (Space)",
    rewind: "Start",
    shortcuts: "Space: play · Del: delete · Ctrl+D: duplicate · Arrows: nudge · Ctrl+Z: undo",
  },
}
type S = (typeof STR)["fr"]

function makeLayer(scene: Pick<Scene, "w" | "h">, content: LayerContent, name: string, w: number, h: number, color = "#ffffff"): Layer {
  return { id: uid(), name, content, w, h, color, strokeWidth: 2, visible: true, locked: false, base: defaultBase(scene), tracks: {} }
}

function textLayerSize(c: Extract<LayerContent, { kind: "text" }>) {
  const font = getFont(c.font)
  return { w: Math.max(20, measureText(c.text || " ", font, c.weight, c.size, c.tracking)), h: c.size * 1.25 }
}

function fitBox(vw: number, vh: number, max: number) {
  const k = max / Math.max(vw, vh)
  return { w: vw * k, h: vh * k }
}

function vectorLayer(scene: Pick<Scene, "w" | "h">, v: ImportedVector, max = Math.min(scene.w, scene.h) * 0.42): Layer {
  const { w, h } = fitBox(v.viewBox[2], v.viewBox[3], max)
  return makeLayer(scene, { kind: "svg", markup: v.markup, viewBox: v.viewBox, recolor: false }, v.name, w, h)
}

function starterScene(lang: Lang): Scene {
  const sc = { w: 1080, h: 1080 }
  let ring = makeLayer(sc, { kind: "shape", shape: "ring" }, "Ring", 520, 520, "#7c6cf0")
  ring.strokeWidth = 1.4
  ring = applyPreset(applyPreset(ring, "drawOn", 0, 1400, { ...sc, duration: 4000 }), "spin", 0, 1400, { ...sc, duration: 4000 })
  ring.base.y = 430
  const mark = getMark("orbit")
  let symbol = makeLayer(sc, { kind: "svg", markup: mark.render("#ffffff", "#f5a524"), viewBox: [0, 0, 100, 100], recolor: false }, "Symbol", 300, 300)
  symbol.base.y = 430
  symbol = applyPreset(symbol, "popIn", 300, 900, { ...sc, duration: 4000 })
  const titleContent = { kind: "text" as const, text: lang === "fr" ? "Votre marque" : "Your brand", font: "sora", weight: 700, size: 104, tracking: -0.02 }
  let title = makeLayer(sc, titleContent, "Title", textLayerSize(titleContent).w, textLayerSize(titleContent).h)
  title.base.y = 800
  title = applyPreset(title, "slideUp", 800, 900, { ...sc, duration: 4000 })
  const subContent = { kind: "text" as const, text: "MOTION STUDIO", font: "inter", weight: 600, size: 34, tracking: 0.3 }
  let sub = makeLayer(sc, subContent, "Subtitle", textLayerSize(subContent).w, textLayerSize(subContent).h, "#a5b4fc")
  sub.base.y = 890
  sub = applyPreset(sub, "fadeIn", 1300, 800, { ...sc, duration: 4000 })
  return { w: 1080, h: 1080, duration: 4000, background: "#0f172a", transparent: false, loop: true, layers: [ring, symbol, title, sub] }
}

const fmtTime = (ms: number) => {
  const s = Math.max(0, ms) / 1000
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${(s % 60).toFixed(2).padStart(5, "0")}`
}

/* ───────────────────────── Root ───────────────────────── */

export function MotionStudio({ lang }: { lang: Lang }) {
  const s = STR[lang]
  const router = useRouter()
  const history = useHistory<Scene>(starterScene(lang))
  const scene = history.value
  const [time, setTime] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [keySel, setKeySel] = useState<KeySel>(null)
  const [assetTab, setAssetTab] = useState<AssetTab>("import")
  const [exporting, setExporting] = useState<{ kind: string; progress: number } | null>(null)
  const [hasLogo, setHasLogo] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const timeRef = useRef(0)
  timeRef.current = time

  const selected = scene.layers.find((l) => l.id === selectedId) ?? null

  const update = useCallback((fn: (sc: Scene) => Scene, key?: string) => history.set(fn, key), [history])
  const updateLayer = useCallback((id: string, fn: (l: Layer) => Layer, key?: string) => update((sc) => ({ ...sc, layers: sc.layers.map((l) => (l.id === id ? fn(l) : l)) }), key), [update])
  const writeProps = useCallback(
    (id: string, values: Partial<Sample>, key?: string) => updateLayer(id, (l) => (Object.entries(values) as [Prop, number][]).reduce((acc, [p, v]) => writeValue(acc, p, timeRef.current, v), l), key),
    [updateLayer],
  )
  const addLayers = useCallback(
    (layers: Layer[]) => {
      if (!layers.length) return
      update((sc) => ({ ...sc, layers: [...sc.layers, ...layers] }))
      setSelectedId(layers[layers.length - 1].id)
    },
    [update],
  )

  const importLogo = useCallback(() => {
    try {
      const data = JSON.parse(localStorage.getItem(LOGO_EXPORT_KEY) ?? "null") as null | {
        name: string
        layout: string
        palette: { primary: string; ink: string; paper: string; accent: string }
        symbol: { svg: string }
        text: { svg: string }
        full: { svg: string }
      }
      if (!data) return
      const W = 1920
      const H = 1080
      const sc = { w: W, h: H, duration: 4500 }
      const layers: Layer[] = []
      if (data.layout === "horizontal" || data.layout === "stacked") {
        const sym = sanitizeSvg(data.symbol.svg, "Symbol")
        const txt = sanitizeSvg(data.text.svg, data.name)
        if (!sym || !txt) return
        const stacked = data.layout === "stacked"
        // Both parts share the logo's internal units, so one factor keeps their proportions.
        const k = stacked ? (H * 0.62) / (sym.viewBox[3] * 0.85 + txt.viewBox[3]) : (W * 0.62) / (sym.viewBox[2] * 0.85 + txt.viewBox[2])
        let a = makeLayer(sc, { kind: "svg", markup: sym.markup, viewBox: sym.viewBox, recolor: false }, "Symbol", sym.viewBox[2] * k * 0.85, sym.viewBox[3] * k * 0.85)
        let b = makeLayer(sc, { kind: "svg", markup: txt.markup, viewBox: txt.viewBox, recolor: false }, data.name, txt.viewBox[2] * k, txt.viewBox[3] * k)
        if (stacked) {
          const total = a.h + b.h
          a.base.y = H / 2 - total / 2 + a.h / 2
          b.base.y = H / 2 + total / 2 - b.h / 2
        } else {
          const total = a.w + b.w
          a.base.x = W / 2 - total / 2 + a.w / 2
          b.base.x = W / 2 + total / 2 - b.w / 2
        }
        a = applyPreset(applyPreset(a, "popIn", 200, 900, sc), "spin", 200, 1100, sc)
        b = applyPreset(b, stacked ? "slideUp" : "slideRight", 800, 1000, sc)
        layers.push(a, b)
      } else {
        const full = sanitizeSvg(data.full.svg, data.name)
        if (!full) return
        let l = vectorLayer(sc, full, Math.min(W, H) * 0.7)
        l = applyPreset(l, data.layout === "emblem" ? "zoomOut" : "slideUp", 200, 1200, sc)
        layers.push(l)
      }
      const underline = makeLayer(sc, { kind: "shape", shape: "line" }, "Accent", W * 0.3, 40, data.palette.accent)
      underline.strokeWidth = 3
      underline.base.y = Math.min(H - 60, Math.max(...layers.map((l) => l.base.y + l.h / 2)) + 50)
      layers.push(applyPreset(underline, "drawOn", 1500, 900, sc))
      history.reset({ w: W, h: H, duration: 4500, background: data.palette.paper, transparent: false, loop: true, layers })
      setSelectedId(layers[0].id)
      setTime(0)
      setPlaying(true)
    } catch {}
  }, [history])

  // Restore the last session, or import a logo handed over by the Logo Studio.
  useEffect(() => {
    ensureStudioFonts()
    setHasLogo(!!localStorage.getItem(LOGO_EXPORT_KEY))
    if (new URLSearchParams(window.location.search).get("import") === "logo") {
      importLogo()
      router.replace(`/${lang}/lab/motion`, { scroll: false })
    } else {
      try {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved) history.reset(JSON.parse(saved))
        // First visit: open on a finished frame of the demo rather than an empty frame 0.
        else setTime(2400)
      } catch {}
    }
    setLoaded(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!loaded) return
    const id = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(scene))
      } catch {}
    }, 500)
    return () => clearTimeout(id)
  }, [scene, loaded])

  // Playback clock.
  useEffect(() => {
    if (!playing) return
    let raf = 0
    let last = performance.now()
    const tick = (now: number) => {
      const dt = now - last
      last = now
      setTime((t) => {
        const next = t + dt
        if (next >= scene.duration) {
          if (scene.loop) return next % scene.duration
          setPlaying(false)
          return scene.duration
        }
        return next
      })
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [playing, scene.duration, scene.loop])

  const togglePlay = useCallback(() => {
    setPlaying((p) => {
      if (!p && timeRef.current >= scene.duration - 1) setTime(0)
      return !p
    })
  }, [scene.duration])

  const removeSelection = useCallback(() => {
    if (keySel) {
      updateLayer(keySel.layerId, (l) => {
        const rest = (l.tracks[keySel.prop] ?? []).filter((k) => k.id !== keySel.keyId)
        const removed = l.tracks[keySel.prop]?.find((k) => k.id === keySel.keyId)
        return { ...l, base: !rest.length && removed ? { ...l.base, [keySel.prop]: removed.v } : l.base, tracks: { ...l.tracks, [keySel.prop]: rest } }
      })
      setKeySel(null)
    } else if (selectedId) {
      update((sc) => ({ ...sc, layers: sc.layers.filter((l) => l.id !== selectedId) }))
      setSelectedId(null)
    }
  }, [keySel, selectedId, update, updateLayer])

  const duplicate = useCallback(() => {
    if (!selected) return
    const copy: Layer = { ...JSON.parse(JSON.stringify(selected)), id: uid(), name: `${selected.name} copy` }
    copy.base.x += 40
    copy.base.y += 40
    for (const p of ["x", "y"] as const) copy.tracks[p] = copy.tracks[p]?.map((k) => ({ ...k, id: uid(), v: k.v + 40 }))
    update((sc) => {
      const i = sc.layers.findIndex((l) => l.id === selected.id)
      const layers = [...sc.layers]
      layers.splice(i + 1, 0, copy)
      return { ...sc, layers }
    })
    setSelectedId(copy.id)
  }, [selected, update])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      if (target.closest("input, textarea, select, [contenteditable]")) return
      const mod = e.ctrlKey || e.metaKey
      if (e.code === "Space") {
        e.preventDefault()
        togglePlay()
      } else if (mod && e.key.toLowerCase() === "z") {
        e.preventDefault()
        if (e.shiftKey) history.redo()
        else history.undo()
      } else if (mod && e.key.toLowerCase() === "y") {
        e.preventDefault()
        history.redo()
      } else if (mod && e.key.toLowerCase() === "d") {
        e.preventDefault()
        duplicate()
      } else if (e.key === "Delete" || e.key === "Backspace") {
        e.preventDefault()
        removeSelection()
      } else if (selected && !selected.locked && e.key.startsWith("Arrow")) {
        e.preventDefault()
        const step = e.shiftKey ? 10 : 1
        const cur = sample(selected, timeRef.current)
        const dx = e.key === "ArrowLeft" ? -step : e.key === "ArrowRight" ? step : 0
        const dy = e.key === "ArrowUp" ? -step : e.key === "ArrowDown" ? step : 0
        writeProps(selected.id, { x: cur.x + dx, y: cur.y + dy }, `nudge-${selected.id}`)
      } else if (e.key === "Escape") {
        setSelectedId(null)
        setKeySel(null)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [togglePlay, history, duplicate, removeSelection, selected, writeProps])

  async function runExport(kind: "video" | "svg" | "png" | "json") {
    const name = "motion-studio"
    if (kind === "json") return downloadText(JSON.stringify(scene, null, 2), `${name}.json`, "application/json")
    setPlaying(false)
    setExporting({ kind, progress: 0 })
    try {
      const fontCss = await fontEmbedCss(sceneFontRequests(scene))
      if (kind === "svg") downloadText(animatedSvg(scene, fontCss), `${name}.svg`, "image/svg+xml")
      else if (kind === "png") downloadBlob(await svgToImage(renderFrameSvg(scene, time, fontCss), scene.w, scene.h, 1), `${name}-${Math.round(time)}ms.png`)
      else {
        const { blob, ext } = await recordVideo(scene, fontCss, (p) => setExporting({ kind, progress: p }))
        downloadBlob(blob, `${name}.${ext}`)
      }
    } catch (err) {
      console.error(err)
      if (kind === "video") alert(s.noVideo)
    } finally {
      setExporting(null)
    }
  }

  const projectInput = useRef<HTMLInputElement>(null)

  // Text layers are measured with real fonts, which only exist in the browser.
  if (!loaded) return <div className="h-[clamp(480px,70vh,820px)] animate-pulse rounded-2xl border border-line bg-surface-2/60" aria-hidden />

  return (
    <div className="space-y-3">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-line bg-surface px-3 py-2">
        <div className="flex items-center gap-1">
          <Button size="sm" variant="ghost" onClick={history.undo} disabled={!history.canUndo} title="Ctrl+Z">
            <Undo2 className="size-4" aria-hidden />
          </Button>
          <Button size="sm" variant="ghost" onClick={history.redo} disabled={!history.canRedo} title="Ctrl+Shift+Z">
            <Redo2 className="size-4" aria-hidden />
          </Button>
          <span className="mx-1 h-5 w-px bg-line" />
          <Button size="sm" variant="ghost" onClick={() => setTime(0)} title={s.rewind}>
            <SkipBack className="size-4" aria-hidden />
          </Button>
          <Button size="sm" variant="primary" onClick={togglePlay} title={playing ? s.pause : s.play} className="w-10 px-0">
            {playing ? <Pause className="size-4" aria-hidden /> : <Play className="size-4" aria-hidden />}
          </Button>
          <span className="ml-2 font-mono text-[12px] tabular-nums text-muted-foreground">
            <span className="text-foreground">{fmtTime(time)}</span> / {fmtTime(scene.duration)}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-1">
          <span className="mr-1 text-[11px] font-medium uppercase tracking-wider text-subtle-foreground">{s.export}</span>
          <Button size="sm" variant="primary" onClick={() => runExport("video")} disabled={!!exporting || !videoMime()}>
            <Clapperboard className="size-3.5" aria-hidden /> {s.video}
          </Button>
          <Button size="sm" onClick={() => runExport("svg")} disabled={!!exporting}>
            <Sparkles className="size-3.5" aria-hidden /> {s.svg}
          </Button>
          <Button size="sm" onClick={() => runExport("png")} disabled={!!exporting}>
            <ImageIcon className="size-3.5" aria-hidden /> PNG
          </Button>
          <Button size="sm" variant="ghost" onClick={() => runExport("json")} title={s.project}>
            <FileJson className="size-3.5" aria-hidden /> {s.project}
          </Button>
          <Button size="sm" variant="ghost" onClick={() => projectInput.current?.click()} title={s.open}>
            <FolderOpen className="size-3.5" aria-hidden />
          </Button>
          <input
            ref={projectInput}
            type="file"
            accept="application/json,.json"
            hidden
            onChange={async (e) => {
              const f = e.target.files?.[0]
              if (!f) return
              try {
                const data = JSON.parse(await f.text()) as Scene
                if (Array.isArray(data.layers) && data.w && data.h) {
                  history.reset(data)
                  setSelectedId(null)
                  setTime(0)
                }
              } catch {}
              e.target.value = ""
            }}
          />
        </div>
      </div>

      <div className="grid gap-3 lg:grid-cols-[260px_minmax(0,1fr)] xl:grid-cols-[270px_minmax(0,1fr)_300px]">
        <AssetsPanel
          s={s}
          lang={lang}
          tab={assetTab}
          setTab={setAssetTab}
          scene={scene}
          hasLogo={hasLogo}
          onImportLogo={importLogo}
          addLayers={addLayers}
          updateScene={(p, key) => update((sc) => ({ ...sc, ...p }), key)}
        />

        <div className="min-w-0 space-y-3">
          <Stage
            scene={scene}
            time={time}
            selectedId={selectedId}
            onSelect={(id) => {
              setSelectedId(id)
              setKeySel(null)
            }}
            onWrite={writeProps}
          />
          {exporting && (
            <div className="flex items-center gap-3 rounded-xl border border-accent/40 bg-accent-soft px-3 py-2 text-[12px]">
              <Loader2 className="size-4 animate-spin text-accent" aria-hidden />
              <span className="font-medium">{exporting.kind === "video" ? s.recording : "…"}</span>
              <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-line">
                <span className="block h-full bg-accent transition-[width]" style={{ width: `${Math.round(exporting.progress * 100)}%` }} />
              </span>
              <span className="font-mono tabular-nums">{Math.round(exporting.progress * 100)}%</span>
            </div>
          )}
        </div>

        <div className="lg:col-span-2 xl:col-span-1">
          <Inspector
            s={s}
            lang={lang}
            scene={scene}
            layer={selected}
            time={time}
            keySel={keySel}
            setKeySel={setKeySel}
            updateLayer={updateLayer}
            writeProps={writeProps}
            onDuplicate={duplicate}
            onDelete={removeSelection}
            onMove={(dir) =>
              selected &&
              update((sc) => {
                const i = sc.layers.findIndex((l) => l.id === selected.id)
                const j = Math.min(sc.layers.length - 1, Math.max(0, i + dir))
                if (i === j) return sc
                const layers = [...sc.layers]
                ;[layers[i], layers[j]] = [layers[j], layers[i]]
                return { ...sc, layers }
              })
            }
          />
        </div>
      </div>

      <Timeline
        s={s}
        scene={scene}
        time={time}
        setTime={(t) => {
          setPlaying(false)
          setTime(t)
        }}
        selectedId={selectedId}
        onSelect={(id) => {
          setSelectedId(id)
          setKeySel(null)
        }}
        keySel={keySel}
        setKeySel={setKeySel}
        updateLayer={updateLayer}
      />
      <p className="text-center text-[11px] text-subtle-foreground">{s.shortcuts}</p>
    </div>
  )
}

/* ───────────────────────── Assets ───────────────────────── */

function AssetsPanel({
  s, lang, tab, setTab, scene, hasLogo, onImportLogo, addLayers, updateScene,
}: {
  s: S
  lang: Lang
  tab: AssetTab
  setTab: (t: AssetTab) => void
  scene: Scene
  hasLogo: boolean
  onImportLogo: () => void
  addLayers: (layers: Layer[]) => void
  updateScene: (p: Partial<Scene>, key?: string) => void
}) {
  const file = useRef<HTMLInputElement>(null)
  const [over, setOver] = useState(false)
  const [code, setCode] = useState("")
  const [error, setError] = useState(false)
  const [text, setText] = useState(lang === "fr" ? "Nouveau texte" : "New text")
  const [font, setFont] = useState("sora")
  const accent = "#7c6cf0"

  const fromFiles = async (files: FileList | File[]) => {
    const vectors = await importFiles(files)
    addLayers(vectors.map((v, i) => {
      const l = vectorLayer(scene, v)
      l.base.x += i * 30
      l.base.y += i * 30
      return l
    }))
  }

  const addText = (content: Extract<LayerContent, { kind: "text" }>, color = "#ffffff") => {
    const { w, h } = textLayerSize(content)
    addLayers([makeLayer(scene, content, content.text.slice(0, 24), w, h, color)])
  }

  const tabs: { id: AssetTab; icon: ReactNode }[] = [
    { id: "import", icon: <Upload className="size-3.5" aria-hidden /> },
    { id: "shapes", icon: <Shapes className="size-3.5" aria-hidden /> },
    { id: "icons", icon: <Sparkles className="size-3.5" aria-hidden /> },
    { id: "text", icon: <Type className="size-3.5" aria-hidden /> },
    { id: "scene", icon: <Wand2 className="size-3.5" aria-hidden /> },
  ]

  return (
    <section className="rounded-2xl border border-line bg-surface lg:row-span-1">
      <div className="grid grid-cols-5 gap-0.5 border-b border-line p-1">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            title={s.assets[t.id]}
            className={cn("flex flex-col items-center gap-0.5 rounded-lg px-1 py-1.5 text-[10px] font-medium", tab === t.id ? "bg-surface-2 text-foreground" : "text-muted-foreground hover:text-foreground")}
          >
            {t.icon}
            {s.assets[t.id]}
          </button>
        ))}
      </div>
      <div className="max-h-[560px] space-y-3 overflow-y-auto p-3">
        {tab === "import" && (
          <>
            {hasLogo && (
              <div className="rounded-xl border border-accent/40 bg-accent-soft p-3">
                <p className="text-[12px] font-semibold">{s.logoTitle}</p>
                <p className="mt-0.5 text-[11px] text-muted-foreground">{s.logoHint}</p>
                <Button size="sm" variant="primary" className="mt-2 w-full" onClick={onImportLogo}>
                  <Wand2 className="size-3.5" aria-hidden /> {s.importLogo}
                </Button>
              </div>
            )}
            <div
              onDragOver={(e) => {
                e.preventDefault()
                setOver(true)
              }}
              onDragLeave={() => setOver(false)}
              onDrop={(e) => {
                e.preventDefault()
                setOver(false)
                if (e.dataTransfer.files.length) fromFiles(e.dataTransfer.files)
              }}
              className={cn("rounded-xl border-2 border-dashed p-4 text-center transition-colors", over ? "border-accent bg-accent-soft" : "border-line-strong")}
            >
              <Upload className="mx-auto size-5 text-muted-foreground" aria-hidden />
              <p className="mt-1.5 text-[12px] font-medium">{s.drop}</p>
              <p className="mt-0.5 text-[10.5px] text-subtle-foreground">{s.dropHint}</p>
              <Button size="sm" className="mt-2" onClick={() => file.current?.click()}>
                {s.browse}
              </Button>
              <input
                ref={file}
                type="file"
                multiple
                hidden
                accept="image/svg+xml,.svg,image/png,image/jpeg,image/webp"
                onChange={(e) => {
                  if (e.target.files) fromFiles(e.target.files)
                  e.target.value = ""
                }}
              />
            </div>
            <Field label={s.paste}>
              <TextArea
                rows={4}
                value={code}
                onChange={(e) => {
                  setCode(e.target.value)
                  setError(false)
                }}
                placeholder="<svg viewBox=…>…</svg>"
                className="font-mono text-[11px]"
              />
            </Field>
            <Button
              size="sm"
              className="w-full"
              disabled={!code.trim()}
              onClick={() => {
                const v = sanitizeSvg(code.trim(), "SVG")
                if (!v) return setError(true)
                addLayers([vectorLayer(scene, v)])
                setCode("")
              }}
            >
              <Plus className="size-3.5" aria-hidden /> {s.addPasted}
            </Button>
            {error && <p className="text-[11px] text-destructive">{s.invalid}</p>}
          </>
        )}

        {tab === "shapes" && (
          <div className="grid grid-cols-4 gap-1.5">
            {SHAPE_IDS.map((id) => (
              <button
                key={id}
                type="button"
                title={id}
                onClick={() => {
                  const size = Math.min(scene.w, scene.h) * 0.28
                  const l = makeLayer(scene, { kind: "shape", shape: id }, id, size, id === "line" || id === "arrow" ? size * 0.4 : size, accent)
                  addLayers([l])
                }}
                className="grid aspect-square place-items-center rounded-lg border border-line p-2.5 text-accent hover:border-accent"
              >
                <svg viewBox="-4 -4 108 108" className="size-full" dangerouslySetInnerHTML={{ __html: shapePreview(id as ShapeId) }} />
              </button>
            ))}
          </div>
        )}

        {tab === "icons" && (
          <IconPicker
            lang={lang}
            markColors={["currentColor", accent]}
            onPickMark={(id) => {
              const size = Math.min(scene.w, scene.h) * 0.3
              addLayers([makeLayer(scene, { kind: "svg", markup: getMark(id).render("#ffffff", "#f5a524"), viewBox: [0, 0, 100, 100], recolor: false }, id, size, size)])
            }}
            onPickIcon={(icon) => {
              const size = Math.min(scene.w, scene.h) * 0.3
              addLayers([makeLayer(scene, { kind: "icon", name: icon.name, markup: icon.markup }, icon.name, size, size)])
            }}
          />
        )}

        {tab === "text" && (
          <>
            <Field label={s.text}>
              <TextInput value={text} onChange={(e) => setText(e.target.value)} />
            </Field>
            <Field label={s.font}>
              <Select value={font} onChange={setFont} options={STUDIO_FONTS.map((f) => ({ value: f.id, label: f.family }))} />
            </Field>
            <Button size="sm" variant="primary" className="w-full" onClick={() => addText({ kind: "text", text, font, weight: 700, size: 96, tracking: -0.01 })}>
              <Plus className="size-3.5" aria-hidden /> {s.addText}
            </Button>
            <div className="grid grid-cols-3 gap-1.5 border-t border-line pt-3">
              <Button size="sm" variant="ghost" onClick={() => addText({ kind: "text", text: text, font, weight: 800, size: 140, tracking: -0.03 })}>
                {s.textPresets.title}
              </Button>
              <Button size="sm" variant="ghost" onClick={() => addText({ kind: "text", text: text.toUpperCase(), font: "inter", weight: 600, size: 40, tracking: 0.25 }, "#a5b4fc")}>
                {s.textPresets.subtitle}
              </Button>
              <Button size="sm" variant="ghost" onClick={() => addText({ kind: "text", text: "-30%", font: "unbounded", weight: 900, size: 120, tracking: -0.02 }, "#f5a524")}>
                {s.textPresets.badge}
              </Button>
            </div>
          </>
        )}

        {tab === "scene" && (
          <>
            <Field label={s.format}>
              <div className="grid grid-cols-4 gap-1">
                {FORMATS.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => updateScene({ w: f.w, h: f.h })}
                    className={cn("rounded-lg border py-2 text-[11px] font-medium", scene.w === f.w && scene.h === f.h ? "border-accent bg-accent-soft" : "border-line text-muted-foreground hover:text-foreground")}
                  >
                    <span className="mx-auto mb-1 block border border-current" style={{ width: (f.w / Math.max(f.w, f.h)) * 18, height: (f.h / Math.max(f.w, f.h)) * 18 }} />
                    {f.label}
                  </button>
                ))}
              </div>
            </Field>
            <ColorField label={s.background} value={scene.background} onChange={(v) => updateScene({ background: v }, "bg")} />
            <ToggleRow label={s.transparent} checked={scene.transparent} onChange={(v) => updateScene({ transparent: v })} />
            <Slider label={s.duration} value={scene.duration} min={1000} max={20000} step={250} onChange={(v) => updateScene({ duration: v }, "duration")} format={(v) => `${(v / 1000).toFixed(2)} s`} />
            <ToggleRow label={s.loop} checked={scene.loop} onChange={(v) => updateScene({ loop: v })} />
          </>
        )}
      </div>
    </section>
  )
}

/* ───────────────────────── Stage ───────────────────────── */

const LayerNode = memo(function LayerNode({ layer, t, onPointerDown }: { layer: Layer; t: number; onPointerDown: (e: ReactPointerEvent, layer: Layer) => void }) {
  const drawable = usesDraw(layer)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const inner = useMemo(() => layerInner(layer), [layer.content, layer.w, layer.h, layer.color, layer.strokeWidth, drawable])
  if (!layer.visible) return null
  const sm = sample(layer, t)
  return (
    <g
      transform={transformAttr(sm)}
      opacity={sm.opacity}
      style={drawable ? { strokeDasharray: "1 1", strokeDashoffset: 1 - sm.draw } : undefined}
      onPointerDown={(e) => onPointerDown(e, layer)}
      className={layer.locked ? "pointer-events-none" : "cursor-move"}
    >
      <rect x={-layer.w / 2} y={-layer.h / 2} width={layer.w} height={layer.h} fill="transparent" />
      <g dangerouslySetInnerHTML={{ __html: inner }} />
    </g>
  )
})

type Drag = { mode: "move" | "scale" | "rotate"; id: string; px: number; py: number; s0: Sample; d0: number; a0: number }

function Stage({ scene, time, selectedId, onSelect, onWrite }: { scene: Scene; time: number; selectedId: string | null; onSelect: (id: string | null) => void; onWrite: (id: string, v: Partial<Sample>, key?: string) => void }) {
  const svgRef = useRef<SVGSVGElement>(null)
  const drag = useRef<Drag | null>(null)
  const [unit, setUnit] = useState(1)

  useEffect(() => {
    const el = svgRef.current
    if (!el) return
    const ro = new ResizeObserver(() => setUnit(1 / (el.getScreenCTM()?.a || 1)))
    ro.observe(el)
    return () => ro.disconnect()
  }, [scene.w, scene.h])

  const toSvg = (e: { clientX: number; clientY: number }) => {
    const ctm = svgRef.current?.getScreenCTM()
    if (!ctm) return { x: 0, y: 0 }
    const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(ctm.inverse())
    return { x: p.x, y: p.y }
  }

  const start = (e: ReactPointerEvent, layer: Layer, mode: Drag["mode"]) => {
    e.stopPropagation()
    onSelect(layer.id)
    if (layer.locked) return
    svgRef.current?.setPointerCapture(e.pointerId)
    const p = toSvg(e)
    const s0 = sample(layer, time)
    drag.current = { mode, id: layer.id, px: p.x, py: p.y, s0, d0: Math.hypot(p.x - s0.x, p.y - s0.y) || 1, a0: Math.atan2(p.y - s0.y, p.x - s0.x) }
  }

  const onMove = (e: ReactPointerEvent) => {
    const d = drag.current
    if (!d) return
    const p = toSvg(e)
    if (d.mode === "move") {
      let nx = d.s0.x + p.x - d.px
      let ny = d.s0.y + p.y - d.py
      // Snap to the artboard centre lines.
      const snap = 8 * unit
      if (Math.abs(nx - scene.w / 2) < snap) nx = scene.w / 2
      if (Math.abs(ny - scene.h / 2) < snap) ny = scene.h / 2
      onWrite(d.id, { x: nx, y: ny }, `drag-${d.id}`)
    } else if (d.mode === "scale") {
      onWrite(d.id, { scale: Math.max(0.02, (d.s0.scale * Math.hypot(p.x - d.s0.x, p.y - d.s0.y)) / d.d0) }, `drag-${d.id}`)
    } else {
      let deg = d.s0.rotate + ((Math.atan2(p.y - d.s0.y, p.x - d.s0.x) - d.a0) * 180) / Math.PI
      if (e.shiftKey) deg = Math.round(deg / 15) * 15
      onWrite(d.id, { rotate: Math.round(deg * 10) / 10 }, `drag-${d.id}`)
    }
  }

  const sel = scene.layers.find((l) => l.id === selectedId && l.visible)
  const ss = sel ? sample(sel, time) : null
  const centred = drag.current?.mode === "move" && ss ? { h: Math.abs(ss.x - scene.w / 2) < 0.5, v: Math.abs(ss.y - scene.h / 2) < 0.5 } : { h: false, v: false }
  const hw = sel && ss ? (sel.w * ss.scale) / 2 : 0
  const hh = sel && ss ? (sel.h * ss.scale) / 2 : 0
  const handle = 6 * unit

  return (
    <div
      className="relative h-[clamp(320px,52vh,600px)] overflow-hidden rounded-2xl border border-line"
      style={{ backgroundImage: "repeating-conic-gradient(var(--surface-2) 0 25%, var(--surface) 0 50%)", backgroundSize: "18px 18px" }}
    >
      <svg
        ref={svgRef}
        viewBox={`0 0 ${scene.w} ${scene.h}`}
        width="100%"
        height="100%"
        className="touch-none select-none"
        onPointerMove={onMove}
        onPointerUp={() => (drag.current = null)}
        onPointerCancel={() => (drag.current = null)}
        onPointerDown={() => onSelect(null)}
      >
        {!scene.transparent && <rect width={scene.w} height={scene.h} fill={scene.background} />}
        {scene.layers.map((l) => (
          <LayerNode key={l.id} layer={l} t={time} onPointerDown={(e, layer) => start(e, layer, "move")} />
        ))}
        {/* Dim the pasteboard outside the artboard. */}
        <path
          d={`M${-scene.w * 4} ${-scene.h * 4}H${scene.w * 5}V${scene.h * 5}H${-scene.w * 4}Z M0 0V${scene.h}H${scene.w}V0Z`}
          fillRule="evenodd"
          fill="var(--background)"
          fillOpacity="0.72"
          pointerEvents="none"
        />
        <rect width={scene.w} height={scene.h} fill="none" stroke="var(--line-strong)" strokeWidth={unit} pointerEvents="none" />
        {centred.h && <line x1={scene.w / 2} x2={scene.w / 2} y1={0} y2={scene.h} stroke="#f43f5e" strokeWidth={unit} pointerEvents="none" />}
        {centred.v && <line y1={scene.h / 2} y2={scene.h / 2} x1={0} x2={scene.w} stroke="#f43f5e" strokeWidth={unit} pointerEvents="none" />}
        {sel && ss && !sel.locked && (
          <g transform={`translate(${ss.x} ${ss.y}) rotate(${ss.rotate})`}>
            <rect x={-hw} y={-hh} width={hw * 2} height={hh * 2} fill="none" stroke="var(--accent)" strokeWidth={1.5 * unit} pointerEvents="none" />
            <line x1={0} y1={-hh} x2={0} y2={-hh - 28 * unit} stroke="var(--accent)" strokeWidth={1.5 * unit} pointerEvents="none" />
            <circle cx={0} cy={-hh - 28 * unit} r={handle} fill="var(--background)" stroke="var(--accent)" strokeWidth={1.5 * unit} className="cursor-grab" onPointerDown={(e) => start(e, sel, "rotate")} />
            {[
              [-1, -1],
              [1, -1],
              [1, 1],
              [-1, 1],
            ].map(([sx, sy]) => (
              <rect
                key={`${sx}${sy}`}
                x={sx * hw - handle}
                y={sy * hh - handle}
                width={handle * 2}
                height={handle * 2}
                fill="var(--background)"
                stroke="var(--accent)"
                strokeWidth={1.5 * unit}
                className={sx === sy ? "cursor-nwse-resize" : "cursor-nesw-resize"}
                onPointerDown={(e) => start(e, sel, "scale")}
              />
            ))}
          </g>
        )}
      </svg>
      <span className="pointer-events-none absolute bottom-2 left-3 rounded-md bg-background/80 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
        {scene.w}×{scene.h}
      </span>
    </div>
  )
}

/* ───────────────────────── Inspector ───────────────────────── */

const PROP_META: Record<Prop, { min: number; max: number; step: number; fmt: (v: number) => string; toUi?: (v: number) => number; fromUi?: (v: number) => number }> = {
  x: { min: -2000, max: 4000, step: 1, fmt: (v) => `${Math.round(v)}` },
  y: { min: -2000, max: 4000, step: 1, fmt: (v) => `${Math.round(v)}` },
  scale: { min: 0, max: 500, step: 1, fmt: (v) => `${Math.round(v * 100)}%`, toUi: (v) => Math.round(v * 100), fromUi: (v) => v / 100 },
  rotate: { min: -720, max: 720, step: 1, fmt: (v) => `${Math.round(v)}°` },
  opacity: { min: 0, max: 100, step: 1, fmt: (v) => `${Math.round(v * 100)}%`, toUi: (v) => Math.round(v * 100), fromUi: (v) => v / 100 },
  draw: { min: 0, max: 100, step: 1, fmt: (v) => `${Math.round(v * 100)}%`, toUi: (v) => Math.round(v * 100), fromUi: (v) => v / 100 },
}

/** Number field whose label can be dragged horizontally to scrub the value. */
function ScrubField({ label, value, onChange, min, max, step }: { label: string; value: number; onChange: (v: number) => void; min: number; max: number; step: number }) {
  const start = useRef<{ x: number; v: number } | null>(null)
  const clamp = (v: number) => Math.min(max, Math.max(min, v))
  return (
    <div className="flex min-w-0 flex-1 items-center gap-2">
      <span
        className="w-20 shrink-0 cursor-ew-resize select-none truncate text-[11.5px] text-muted-foreground"
        onPointerDown={(e) => {
          ;(e.target as Element).setPointerCapture(e.pointerId)
          start.current = { x: e.clientX, v: value }
        }}
        onPointerMove={(e) => start.current && onChange(clamp(Math.round((start.current.v + (e.clientX - start.current.x) * step) / step) * step))}
        onPointerUp={() => (start.current = null)}
      >
        {label}
      </span>
      <input
        type="number"
        value={Math.round(value * 100) / 100}
        step={step}
        onChange={(e) => e.target.value !== "" && onChange(clamp(Number(e.target.value)))}
        className="w-full min-w-0 rounded-md border border-line-strong bg-background px-2 py-1 font-mono text-[11.5px] tabular-nums outline-none focus:border-accent"
      />
    </div>
  )
}

function Inspector({
  s, lang, scene, layer, time, keySel, setKeySel, updateLayer, writeProps, onDuplicate, onDelete, onMove,
}: {
  s: S
  lang: Lang
  scene: Scene
  layer: Layer | null
  time: number
  keySel: KeySel
  setKeySel: (k: KeySel) => void
  updateLayer: (id: string, fn: (l: Layer) => Layer, key?: string) => void
  writeProps: (id: string, v: Partial<Sample>, key?: string) => void
  onDuplicate: () => void
  onDelete: () => void
  onMove: (dir: number) => void
}) {
  const [presetDur, setPresetDur] = useState(900)
  if (!layer) {
    return (
      <section className="grid h-full min-h-40 place-items-center rounded-2xl border border-dashed border-line-strong p-6 text-center text-[12.5px] text-muted-foreground">
        {scene.layers.length ? s.select : s.empty}
      </section>
    )
  }
  const sm = sample(layer, time)
  const c = layer.content
  const kf = keySel && keySel.layerId === layer.id ? layer.tracks[keySel.prop]?.find((k) => k.id === keySel.keyId) : undefined
  const editKey = (patch: Partial<Keyframe>) =>
    keySel &&
    updateLayer(
      layer.id,
      (l) => ({ ...l, tracks: { ...l.tracks, [keySel.prop]: (l.tracks[keySel.prop] ?? []).map((k) => (k.id === keySel.keyId ? { ...k, ...patch } : k)).sort((a, b) => a.t - b.t) } }),
      `kf-${keySel.keyId}`,
    )
  const setContent = (patch: Partial<LayerContent>) =>
    updateLayer(
      layer.id,
      (l) => {
        const content = { ...l.content, ...patch } as LayerContent
        return content.kind === "text" ? { ...l, content, ...textLayerSize(content), name: content.text.slice(0, 24) || l.name } : { ...l, content }
      },
      "content",
    )

  return (
    <section className="space-y-4 rounded-2xl border border-line bg-surface p-3 xl:max-h-[calc(52vh+60px)] xl:overflow-y-auto">
      <div className="flex items-center gap-2">
        <TextInput value={layer.name} onChange={(e) => updateLayer(layer.id, (l) => ({ ...l, name: e.target.value }), "name")} className="h-8 py-1 text-[12.5px] font-medium" />
        <Button size="sm" variant="ghost" className="px-2" title={s.duplicate} onClick={onDuplicate}>
          <Copy className="size-3.5" aria-hidden />
        </Button>
        <Button size="sm" variant="ghost" className="px-2 hover:text-destructive" title={s.delete} onClick={onDelete}>
          <Trash2 className="size-3.5" aria-hidden />
        </Button>
      </div>
      <div className="flex gap-1">
        <Button size="sm" variant="ghost" className="flex-1 px-1" title={s.forward} onClick={() => onMove(1)}>
          <ArrowUp className="size-3.5" aria-hidden />
        </Button>
        <Button size="sm" variant="ghost" className="flex-1 px-1" title={s.backward} onClick={() => onMove(-1)}>
          <ArrowDown className="size-3.5" aria-hidden />
        </Button>
        <Button size="sm" variant="ghost" className="flex-1 px-1" title={s.centerH} onClick={() => writeProps(layer.id, { x: scene.w / 2 })}>
          <AlignCenterHorizontal className="size-3.5" aria-hidden />
        </Button>
        <Button size="sm" variant="ghost" className="flex-1 px-1" title={s.centerV} onClick={() => writeProps(layer.id, { y: scene.h / 2 })}>
          <AlignCenterVertical className="size-3.5" aria-hidden />
        </Button>
      </div>

      {kf && keySel && (
        <div className="space-y-2 rounded-xl border border-accent/40 bg-accent-soft p-2.5">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-[11.5px] font-semibold">
              <Diamond className="size-3 fill-accent text-accent" aria-hidden /> {s.keyframe} · {s.props[keySel.prop]}
            </span>
            <button type="button" onClick={() => setKeySel(null)} className="text-muted-foreground hover:text-foreground" aria-label="Close">
              <X className="size-3.5" aria-hidden />
            </button>
          </div>
          <ScrubField label={`${s.time} (ms)`} value={kf.t} min={0} max={scene.duration} step={10} onChange={(v) => editKey({ t: Math.round(v) })} />
          <ScrubField
            label={s.value}
            value={PROP_META[keySel.prop].toUi?.(kf.v) ?? kf.v}
            min={PROP_META[keySel.prop].min}
            max={PROP_META[keySel.prop].max}
            step={PROP_META[keySel.prop].step}
            onChange={(v) => editKey({ v: PROP_META[keySel.prop].fromUi?.(v) ?? v })}
          />
          <div className="flex items-center gap-2">
            <span className="w-20 shrink-0 text-[11.5px] text-muted-foreground">{s.ease}</span>
            <Select value={kf.ease} onChange={(v) => editKey({ ease: v })} options={EASE_OPTIONS.map((e) => ({ value: e, label: e }))} className="h-8 py-1 text-[11.5px]" />
          </div>
        </div>
      )}

      <div className="space-y-2">
        <h4 className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-subtle-foreground">{s.transform}</h4>
        {PROPS.filter((p) => p !== "draw" || c.kind !== "text").map((p) => {
          const meta = PROP_META[p]
          const animated = (layer.tracks[p]?.length ?? 0) > 0
          const onKey = !!keyAt(layer, p, time)
          return (
            <div key={p} className="flex items-center gap-1.5">
              <ScrubField label={s.props[p]} value={meta.toUi?.(sm[p]) ?? sm[p]} min={meta.min} max={meta.max} step={meta.step} onChange={(v) => writeProps(layer.id, { [p]: meta.fromUi?.(v) ?? v }, `prop-${p}`)} />
              <button
                type="button"
                title="Keyframe"
                onClick={() => updateLayer(layer.id, (l) => toggleKey(l, p, time))}
                className={cn("grid size-7 shrink-0 place-items-center rounded-md border", onKey ? "border-accent bg-accent text-accent-foreground" : animated ? "border-accent text-accent" : "border-line text-subtle-foreground hover:text-foreground")}
              >
                <Diamond className={cn("size-3", onKey && "fill-current")} aria-hidden />
              </button>
            </div>
          )
        })}
        <p className="text-[10.5px] leading-relaxed text-subtle-foreground">{s.keyHint}</p>
      </div>

      <div className="space-y-2 border-t border-line pt-3">
        <h4 className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-subtle-foreground">{s.presets}</h4>
        <div className="grid grid-cols-3 gap-1">
          {PRESETS.filter((p) => p.id !== "drawOn" || c.kind !== "text").map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => updateLayer(layer.id, (l) => applyPreset(l, p.id as PresetId, time, presetDur, scene))}
              className="rounded-md border border-line px-1 py-1.5 text-[11px] text-muted-foreground transition-colors hover:border-accent hover:text-foreground"
            >
              {p.label[lang]}
            </button>
          ))}
        </div>
        <Slider label={s.presetDuration} value={presetDur} min={200} max={4000} step={50} onChange={setPresetDur} format={(v) => `${v} ms`} />
        <p className="text-[10.5px] text-subtle-foreground">{s.presetHint}</p>
        <Button size="sm" variant="ghost" className="w-full" onClick={() => updateLayer(layer.id, clearTracks)}>
          <X className="size-3.5" aria-hidden /> {s.clear}
        </Button>
      </div>

      <div className="space-y-3 border-t border-line pt-3">
        <h4 className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-subtle-foreground">{s.appearance}</h4>
        {c.kind === "text" && (
          <>
            <TextInput value={c.text} onChange={(e) => setContent({ text: e.target.value })} />
            <Select value={c.font} onChange={(v) => setContent({ font: v, weight: nearestWeight(getFont(v), c.weight) })} options={STUDIO_FONTS.map((f) => ({ value: f.id, label: f.family }))} />
            <div className="grid grid-cols-2 gap-2">
              <Select value={String(c.weight)} onChange={(v) => setContent({ weight: Number(v) })} options={getFont(c.font).weights.map((w) => ({ value: String(w), label: `${s.weight} ${w}` }))} />
              <ScrubField label={s.size} value={c.size} min={8} max={600} step={1} onChange={(v) => setContent({ size: v })} />
            </div>
            <Slider label={s.tracking} value={c.tracking} min={-0.1} max={0.6} step={0.01} onChange={(v) => setContent({ tracking: v })} format={(v) => `${v.toFixed(2)}em`} />
          </>
        )}
        {c.kind === "svg" && <ToggleRow label={s.recolor} checked={c.recolor} onChange={(v) => setContent({ recolor: v })} />}
        {(c.kind !== "svg" || c.recolor) && <ColorField label={s.color} value={layer.color} onChange={(v) => updateLayer(layer.id, (l) => ({ ...l, color: v }), "color")} />}
        {(c.kind === "icon" || (c.kind === "shape" && ["ring", "arrow", "line"].includes(c.shape))) && (
          <Slider label={s.stroke} value={layer.strokeWidth} min={0.5} max={6} step={0.1} onChange={(v) => updateLayer(layer.id, (l) => ({ ...l, strokeWidth: v }), "stroke")} format={(v) => v.toFixed(1)} />
        )}
      </div>
    </section>
  )
}

/* ───────────────────────── Timeline ───────────────────────── */

const LABEL_W = 210

function Timeline({
  s, scene, time, setTime, selectedId, onSelect, keySel, setKeySel, updateLayer,
}: {
  s: S
  scene: Scene
  time: number
  setTime: (t: number) => void
  selectedId: string | null
  onSelect: (id: string) => void
  keySel: KeySel
  setKeySel: (k: KeySel) => void
  updateLayer: (id: string, fn: (l: Layer) => Layer, key?: string) => void
}) {
  const lanes = useRef<HTMLDivElement>(null)
  const [expanded, setExpanded] = useState<Set<string>>(new Set())
  const kfDrag = useRef<{ layerId: string; prop: Prop; keyId: string } | null>(null)
  const scrubbing = useRef(false)
  const pct = (t: number) => `${(t / scene.duration) * 100}%`

  const timeFrom = (clientX: number, snap = true) => {
    const rect = lanes.current?.getBoundingClientRect()
    if (!rect) return 0
    const t = Math.min(scene.duration, Math.max(0, ((clientX - rect.left) / rect.width) * scene.duration))
    return snap ? Math.round(t / 10) * 10 : t
  }

  const ticks = useMemo(() => {
    const step = scene.duration > 10000 ? 1000 : 500
    return Array.from({ length: Math.floor(scene.duration / step) + 1 }, (_, i) => i * step)
  }, [scene.duration])

  const ordered = [...scene.layers].reverse()

  const diamond = (layer: Layer, prop: Prop, k: Keyframe, small = false) => {
    const active = keySel?.keyId === k.id
    return (
      <button
        key={k.id}
        type="button"
        title={`${s.props[prop]} · ${fmtTime(k.t)} · ${k.ease}`}
        onPointerDown={(e) => {
          e.stopPropagation()
          ;(e.target as Element).setPointerCapture(e.pointerId)
          kfDrag.current = { layerId: layer.id, prop, keyId: k.id }
          onSelect(layer.id)
          setKeySel({ layerId: layer.id, prop, keyId: k.id })
          setTime(k.t)
        }}
        onPointerMove={(e) => {
          const d = kfDrag.current
          if (!d || d.keyId !== k.id) return
          const t = timeFrom(e.clientX)
          updateLayer(d.layerId, (l) => ({ ...l, tracks: { ...l.tracks, [d.prop]: (l.tracks[d.prop] ?? []).map((kk) => (kk.id === d.keyId ? { ...kk, t } : kk)).sort((a, b) => a.t - b.t) } }), `kfmove-${k.id}`)
          setTime(t)
        }}
        onPointerUp={() => (kfDrag.current = null)}
        className={cn("absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45 border transition-colors", small ? "size-2" : "size-2.5", active ? "border-foreground bg-foreground" : "border-accent bg-accent hover:scale-125")}
        style={{ left: pct(k.t) }}
      />
    )
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-line bg-surface">
      <div className="relative">
        {/* Ruler */}
        <div className="flex border-b border-line">
          <div className="flex shrink-0 items-center px-3 text-[11px] font-semibold uppercase tracking-wider text-subtle-foreground" style={{ width: LABEL_W }}>
            {s.layers}
          </div>
          <div
            ref={lanes}
            className="relative h-7 flex-1 cursor-ew-resize touch-none select-none"
            onPointerDown={(e) => {
              ;(e.target as Element).setPointerCapture(e.pointerId)
              scrubbing.current = true
              setTime(timeFrom(e.clientX, false))
            }}
            onPointerMove={(e) => scrubbing.current && setTime(timeFrom(e.clientX, false))}
            onPointerUp={() => (scrubbing.current = false)}
          >
            {ticks.map((t) => (
              <span key={t} className="absolute bottom-0 h-2 border-l border-line-strong" style={{ left: pct(t) }}>
                {t % 1000 === 0 && <span className="absolute -top-4 left-1 font-mono text-[9.5px] text-subtle-foreground">{t / 1000}s</span>}
              </span>
            ))}
          </div>
        </div>

        <div className="max-h-[260px] overflow-y-auto">
          {!ordered.length && <p className="px-3 py-6 text-center text-[12px] text-muted-foreground">{s.empty}</p>}
          {ordered.map((layer) => {
            const isOpen = expanded.has(layer.id)
            const props = PROPS.filter((p) => (layer.tracks[p]?.length ?? 0) > 0)
            const all = props.flatMap((p) => (layer.tracks[p] ?? []).map((k) => ({ p, k })))
            const unique = all.filter((x, i) => all.findIndex((y) => Math.abs(y.k.t - x.k.t) < 5) === i)
            return (
              <div key={layer.id} className="border-b border-line last:border-0">
                <div className={cn("flex h-8", selectedId === layer.id && "bg-accent-soft")}>
                  <div className="flex shrink-0 items-center gap-1 px-1.5" style={{ width: LABEL_W }}>
                    <button
                      type="button"
                      onClick={() => setExpanded((prev) => {
                        const next = new Set(prev)
                        if (next.has(layer.id)) next.delete(layer.id)
                        else next.add(layer.id)
                        return next
                      })}
                      className={cn("grid size-5 place-items-center text-muted-foreground", !props.length && "invisible")}
                      aria-label="Expand"
                    >
                      {isOpen ? <ChevronDown className="size-3.5" aria-hidden /> : <ChevronRight className="size-3.5" aria-hidden />}
                    </button>
                    <button type="button" className="grid size-5 place-items-center text-muted-foreground hover:text-foreground" onClick={() => updateLayer(layer.id, (l) => ({ ...l, visible: !l.visible }))} aria-label="Visibility">
                      {layer.visible ? <Eye className="size-3.5" aria-hidden /> : <EyeOff className="size-3.5" aria-hidden />}
                    </button>
                    <button type="button" className="grid size-5 place-items-center text-muted-foreground hover:text-foreground" onClick={() => updateLayer(layer.id, (l) => ({ ...l, locked: !l.locked }))} aria-label="Lock">
                      {layer.locked ? <Lock className="size-3.5" aria-hidden /> : <Unlock className="size-3.5 opacity-40" aria-hidden />}
                    </button>
                    <button type="button" onClick={() => onSelect(layer.id)} className={cn("min-w-0 flex-1 truncate text-left text-[12px]", selectedId === layer.id ? "font-semibold" : "text-muted-foreground")}>
                      {layer.name}
                    </button>
                  </div>
                  <div className="relative flex-1" onPointerDown={() => onSelect(layer.id)}>
                    <span className="absolute inset-x-0 top-1/2 h-4 -translate-y-1/2 rounded bg-surface-2" />
                    {unique.map(({ p, k }) => diamond(layer, p, k))}
                  </div>
                </div>
                {isOpen &&
                  props.map((p) => (
                    <div key={p} className="flex h-6 bg-background/40">
                      <div className="shrink-0 truncate pl-12 pr-2 text-[11px] leading-6 text-subtle-foreground" style={{ width: LABEL_W }}>
                        {s.props[p]} <span className="font-mono">{PROP_META[p].fmt(valueAt(layer, p, time))}</span>
                      </div>
                      <div className="relative flex-1">
                        <span className="absolute inset-x-0 top-1/2 h-px bg-line" />
                        {(layer.tracks[p] ?? []).map((k) => diamond(layer, p, k, true))}
                      </div>
                    </div>
                  ))}
              </div>
            )
          })}
        </div>

        {/* Playhead */}
        <div className="pointer-events-none absolute inset-y-0" style={{ left: LABEL_W, right: 0 }}>
          <div className="absolute inset-y-0 w-px bg-[#f43f5e]" style={{ left: pct(time) }}>
            <span className="absolute -left-[5px] top-0 size-[11px] rotate-45 rounded-[2px] bg-[#f43f5e]" />
          </div>
        </div>
      </div>
    </section>
  )
}
