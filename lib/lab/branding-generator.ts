/**
 * Moteur de branding & génération d'identité visuelle sur HTML5 Canvas.
 * 
 * Implémente la géométrie mathématique de l'icône SOSIDE PAY (grille 1024x1024,
 * superellipse de Lamé Apple |x|^n + |y|^n = 1 avec n=5.0), les logos horizontaux,
 * verticaux, emblèmes, icônes adaptatives et l'ensemble des supports publicitaires
 * (flyers commerciaux, brochures d'entreprise, cartes de visite, bannières réseaux sociaux).
 * 
 * Fonctionne directement dans le navigateur sans dépendance serveur.
 */

import type { Brand } from "./brand-templates"

export interface BrandInfo {
  name: string
  tagline: string
  category: string
  website: string
  email: string
  phone: string
  slogan: string
  promoBadge: string
  features: [string, string, string]
  metric1: { value: string; label: string }
  metric2: { value: string; label: string }
  metric3: { value: string; label: string }
}

export interface BrandCharter {
  // Couleurs principales
  primary: string        // ex: "#0B3D91"
  primaryLight: string   // ex: "#347CEC"
  secondary: string      // ex: "#A8C8FF"
  accent: string         // ex: "#FFCC00"
  dark: string           // ex: "#0F172A"
  light: string          // ex: "#F8FAFC"
  cardStripe: string     // ex: "#CDDDF7"
  // Typographie & style
  fontFamily: "sans" | "serif" | "mono"
  superellipseN: number  // défaut 5.0 (Apple squircle)
  glossOpacity: number   // 0.2
  shadowOpacity: number  // 0.35
  iconStyle: "cards" | "shield" | "zap" | "chip" | "diamond" | "rocket" | "store" | "flame" | "custom"
  customSvgPath?: string
  customLogoImage?: HTMLImageElement | null
}

export const DEFAULT_BRAND_INFO: BrandInfo = {
  name: "SOSIDE",
  tagline: "PAY",
  category: "Paiements Mobiles & FinTech Sécurisée",
  website: "soside.pay",
  email: "contact@soside.pay",
  phone: "+243 990 000 000",
  slogan: "La vitesse et la sécurité de vos transactions au quotidien.",
  promoBadge: "NOUVEAU",
  features: [
    "Transactions instantanées sans contact NFC",
    "Sécurité biométrique & chiffrement matériel",
    "Compatible toutes cartes bancaires & mobile money",
  ],
  metric1: { value: "< 1s", label: "Vitesse d'exécution" },
  metric2: { value: "99.99%", label: "Disponibilité garantie" },
  metric3: { value: "0% Frais", label: "Sur les micro-paiements" },
}

export const DEFAULT_BRAND_CHARTER: BrandCharter = {
  primary: "#0B3D91",
  primaryLight: "#347CEC",
  secondary: "#A8C8FF",
  accent: "#FFCC00",
  dark: "#081630",
  light: "#FFFFFF",
  cardStripe: "#CDDDF7",
  fontFamily: "sans",
  superellipseN: 5.0,
  glossOpacity: 0.22,
  shadowOpacity: 0.35,
  iconStyle: "cards",
  customSvgPath: undefined,
  customLogoImage: null,
}

export const CHARTER_PRESETS: { name: string; charter: Partial<BrandCharter> }[] = [
  {
    name: "SOSIDE Royal & Or",
    charter: {
      primary: "#0B3D91",
      primaryLight: "#347CEC",
      secondary: "#A8C8FF",
      accent: "#FFCC00",
      dark: "#081630",
      light: "#FFFFFF",
      cardStripe: "#CDDDF7",
    },
  },
  {
    name: "Émeraude Kivu",
    charter: {
      primary: "#047857",
      primaryLight: "#10B981",
      secondary: "#A7F3D0",
      accent: "#F59E0B",
      dark: "#022C22",
      light: "#FFFFFF",
      cardStripe: "#D1FAE5",
    },
  },
  {
    name: "Cyber Violet & Néon",
    charter: {
      primary: "#4C1D95",
      primaryLight: "#7C3AED",
      secondary: "#DDD6FE",
      accent: "#06B6D4",
      dark: "#0F0728",
      light: "#FFFFFF",
      cardStripe: "#E9D5FF",
    },
  },
  {
    name: "Obsidienne & Carbone",
    charter: {
      primary: "#0F172A",
      primaryLight: "#334155",
      secondary: "#94A3B8",
      accent: "#38BDF8",
      dark: "#020617",
      light: "#FFFFFF",
      cardStripe: "#CBD5E1",
    },
  },
  {
    name: "Sunset Corail & Rubis",
    charter: {
      primary: "#9F1239",
      primaryLight: "#E11D48",
      secondary: "#FECDD3",
      accent: "#FBBF24",
      dark: "#1C040C",
      light: "#FFFFFF",
      cardStripe: "#FFE4E6",
    },
  },
]

// ---------------------------------------------------------------------------
// 1. Mathématiques de la Superellipse Apple (Lamé curve |x|^n + |y|^n = 1)
// ---------------------------------------------------------------------------

/**
 * Trace le contour d'une superellipse Apple continue dans le contexte Canvas.
 */
export function traceSquircle(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  r: number,
  n: number = 5.0,
  steps: number = 180
) {
  ctx.beginPath()
  for (let i = 0; i <= steps; i++) {
    const theta = (i * 2 * Math.PI) / steps
    const cosT = Math.cos(theta)
    const sinT = Math.sin(theta)
    const x = cx + r * Math.sign(cosT) * Math.pow(Math.abs(cosT), 2 / n)
    const y = cy + r * Math.sign(sinT) * Math.pow(Math.abs(sinT), 2 / n)
    if (i === 0) {
      ctx.moveTo(x, y)
    } else {
      ctx.lineTo(x, y)
    }
  }
  ctx.closePath()
}

/**
 * Rectangle à coins arrondis pour Canvas.
 */
export function traceRoundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  radius: number
) {
  ctx.beginPath()
  ctx.roundRect ? ctx.roundRect(x, y, w, h, radius) : ctx.rect(x, y, w, h)
  ctx.closePath()
}

/**
 * Rectangle orienté selon un angle donné.
 */
export function traceRotatedRoundRect(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  w: number,
  h: number,
  radius: number,
  angleRad: number
) {
  ctx.save()
  ctx.translate(cx, cy)
  ctx.rotate(angleRad)
  ctx.beginPath()
  if (ctx.roundRect) {
    ctx.roundRect(-w / 2, -h / 2, w, h, radius)
  } else {
    ctx.rect(-w / 2, -h / 2, w, h)
  }
  ctx.closePath()
  ctx.restore()
}

// ---------------------------------------------------------------------------
// 2. Dessin des glyphes d'icône (Cartes bancaires SOSIDE ou symboles)
// ---------------------------------------------------------------------------

export function drawBrandGlyph(
  ctx: CanvasRenderingContext2D,
  charter: BrandCharter,
  cx: number,
  cy: number,
  scale: number = 1
) {
  ctx.save()
  ctx.translate(cx, cy)
  ctx.scale(scale, scale)

  switch (charter.iconStyle) {
    case "cards": {
      // 1. Carte arrière inclinée (-14 degrés)
      ctx.save()
      ctx.translate(32, -32)
      ctx.rotate((-14 * Math.PI) / 180)
      ctx.fillStyle = charter.secondary
      ctx.shadowColor = "rgba(0, 0, 0, 0.28)"
      ctx.shadowBlur = 24
      ctx.shadowOffsetY = 12
      traceRoundRect(ctx, -260, -170, 520, 340, 36)
      ctx.fill()
      ctx.restore()

      // 2. Carte avant blanche, droite avec ombre douce
      ctx.save()
      ctx.fillStyle = charter.light
      ctx.shadowColor = "rgba(3, 22, 66, 0.32)"
      ctx.shadowBlur = 32
      ctx.shadowOffsetY = 16
      traceRoundRect(ctx, -260, -170, 520, 340, 36)
      ctx.fill()
      ctx.restore()

      // 3. Puce jaune dorée EMV
      ctx.fillStyle = charter.accent
      traceRoundRect(ctx, -200, -50, 92, 116, 16)
      ctx.fill()

      // Lignes de contact de la puce
      ctx.strokeStyle = "rgba(0, 0, 0, 0.15)"
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.moveTo(-154, -50)
      ctx.lineTo(-154, 66)
      ctx.moveTo(-200, 8)
      ctx.lineTo(-108, 8)
      ctx.stroke()

      // 4. Bandes de numéro de carte (4 groupes arrondis)
      ctx.fillStyle = charter.cardStripe
      const stripeY = -8
      const stripeW = 56
      const stripeH = 16
      const startX = -60
      const gap = 84
      for (let i = 0; i < 4; i++) {
        traceRoundRect(ctx, startX + i * gap, stripeY, stripeW, stripeH, 8)
        ctx.fill()
      }
      break
    }

    case "shield": {
      ctx.save()
      ctx.shadowColor = "rgba(0,0,0,0.35)"
      ctx.shadowBlur = 28
      ctx.shadowOffsetY = 14
      ctx.fillStyle = charter.light
      ctx.beginPath()
      ctx.moveTo(0, -220)
      ctx.bezierCurveTo(140, -220, 220, -160, 220, -30)
      ctx.bezierCurveTo(220, 140, 110, 230, 0, 270)
      ctx.bezierCurveTo(-110, 230, -220, 140, -220, -30)
      ctx.bezierCurveTo(-220, -160, -140, -220, 0, -220)
      ctx.closePath()
      ctx.fill()

      // Cœur du bouclier
      ctx.fillStyle = charter.accent
      ctx.beginPath()
      ctx.moveTo(0, -160)
      ctx.bezierCurveTo(90, -160, 150, -110, 150, -20)
      ctx.bezierCurveTo(150, 90, 80, 160, 0, 190)
      ctx.bezierCurveTo(-80, 160, -150, 90, -150, -20)
      ctx.bezierCurveTo(-150, -110, -90, -160, 0, -160)
      ctx.closePath()
      ctx.fill()
      ctx.restore()
      break
    }

    case "zap": {
      ctx.save()
      ctx.shadowColor = "rgba(0,0,0,0.35)"
      ctx.shadowBlur = 30
      ctx.shadowOffsetY = 15
      ctx.fillStyle = charter.accent
      ctx.beginPath()
      ctx.moveTo(30, -240)
      ctx.lineTo(-180, 30)
      ctx.lineTo(-10, 30)
      ctx.lineTo(-40, 240)
      ctx.lineTo(180, -30)
      ctx.lineTo(10, -30)
      ctx.closePath()
      ctx.fill()
      ctx.restore()
      break
    }

    case "chip": {
      ctx.save()
      ctx.shadowColor = "rgba(0,0,0,0.3)"
      ctx.shadowBlur = 26
      ctx.shadowOffsetY = 12
      ctx.fillStyle = charter.light
      traceRoundRect(ctx, -180, -180, 360, 360, 48)
      ctx.fill()

      ctx.fillStyle = charter.accent
      traceRoundRect(ctx, -110, -110, 220, 220, 28)
      ctx.fill()

      // Broches
      ctx.fillStyle = charter.secondary
      for (let i = -120; i <= 120; i += 60) {
        traceRoundRect(ctx, i - 12, -220, 24, 40, 6)
        ctx.fill()
        traceRoundRect(ctx, i - 12, 180, 24, 40, 6)
        ctx.fill()
        traceRoundRect(ctx, -220, i - 12, 40, 24, 6)
        ctx.fill()
        traceRoundRect(ctx, 180, i - 12, 40, 24, 6)
        ctx.fill()
      }
      ctx.restore()
      break
    }

    case "diamond": {
      ctx.save()
      ctx.shadowColor = "rgba(0,0,0,0.35)"
      ctx.shadowBlur = 30
      ctx.shadowOffsetY = 16
      ctx.fillStyle = charter.accent
      ctx.beginPath()
      ctx.moveTo(0, -220)
      ctx.lineTo(210, 0)
      ctx.lineTo(0, 220)
      ctx.lineTo(-210, 0)
      ctx.closePath()
      ctx.fill()

      ctx.fillStyle = charter.light
      ctx.beginPath()
      ctx.moveTo(0, -150)
      ctx.lineTo(140, 0)
      ctx.lineTo(0, 150)
      ctx.lineTo(-140, 0)
      ctx.closePath()
      ctx.fill()
      ctx.restore()
      break
    }

    case "rocket": {
      ctx.save()
      ctx.shadowColor = "rgba(0,0,0,0.35)"
      ctx.shadowBlur = 30
      ctx.shadowOffsetY = 15
      ctx.fillStyle = charter.light
      ctx.beginPath()
      ctx.moveTo(0, -230)
      ctx.bezierCurveTo(120, -140, 120, 80, 50, 180)
      ctx.lineTo(-50, 180)
      ctx.bezierCurveTo(-120, 80, -120, -140, 0, -230)
      ctx.closePath()
      ctx.fill()

      // Hublot
      ctx.fillStyle = charter.accent
      ctx.beginPath()
      ctx.arc(0, -30, 48, 0, Math.PI * 2)
      ctx.fill()

      // Ailerons
      ctx.fillStyle = charter.secondary
      ctx.beginPath()
      ctx.moveTo(-50, 120)
      ctx.lineTo(-140, 190)
      ctx.lineTo(-50, 180)
      ctx.closePath()
      ctx.fill()
      ctx.beginPath()
      ctx.moveTo(50, 120)
      ctx.lineTo(140, 190)
      ctx.lineTo(50, 180)
      ctx.closePath()
      ctx.fill()
      ctx.restore()
      break
    }

    case "store": {
      ctx.save()
      // Store roof awning
      ctx.fillStyle = charter.accent
      ctx.beginPath()
      ctx.moveTo(-160, -60)
      ctx.lineTo(-120, -160)
      ctx.lineTo(120, -160)
      ctx.lineTo(160, -60)
      ctx.closePath()
      ctx.fill()

      // Store building base
      ctx.fillStyle = charter.light
      traceRoundRect(ctx, -140, -60, 280, 220, 16)
      ctx.fill()

      // Door & window
      ctx.fillStyle = charter.primary
      traceRoundRect(ctx, -45, 10, 90, 150, 8)
      ctx.fill()
      ctx.fillStyle = charter.accent
      traceRoundRect(ctx, -115, -20, 50, 60, 6)
      traceRoundRect(ctx, 65, -20, 50, 60, 6)
      ctx.fill()
      ctx.restore()
      break
    }

    case "flame": {
      ctx.save()
      ctx.fillStyle = charter.accent
      ctx.beginPath()
      ctx.moveTo(0, -190)
      ctx.bezierCurveTo(120, -60, 160, 60, 120, 140)
      ctx.bezierCurveTo(70, 210, -70, 210, -120, 140)
      ctx.bezierCurveTo(-180, 50, -110, -40, -50, -90)
      ctx.bezierCurveTo(-20, -130, -30, -165, 0, -190)
      ctx.closePath()
      ctx.fill()

      // Inner flame
      ctx.fillStyle = charter.light
      ctx.beginPath()
      ctx.moveTo(0, -60)
      ctx.bezierCurveTo(60, 0, 80, 70, 50, 120)
      ctx.bezierCurveTo(30, 160, -30, 160, -50, 120)
      ctx.bezierCurveTo(-75, 70, -40, 10, 0, -60)
      ctx.closePath()
      ctx.fill()
      ctx.restore()
      break
    }

    case "custom": {
      if (charter.customLogoImage && charter.customLogoImage.complete) {
        const iw = charter.customLogoImage.naturalWidth || 400
        const ih = charter.customLogoImage.naturalHeight || 400
        const maxDim = 460
        const scaleFactor = Math.min(maxDim / iw, maxDim / ih)
        const dw = iw * scaleFactor
        const dh = ih * scaleFactor
        ctx.drawImage(charter.customLogoImage, -dw / 2, -dh / 2, dw, dh)
      } else {
        // Fallback initiale
        ctx.fillStyle = charter.light
        ctx.font = "bold 260px sans-serif"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText("S", 0, 10)
      }
      break
    }
  }

  ctx.restore()
}

// ---------------------------------------------------------------------------
// 3. Rendu de l'icône d'application principale (1024x1024)
// ---------------------------------------------------------------------------

export function drawAppIconCanvas(
  canvas: HTMLCanvasElement,
  charter: BrandCharter,
  size: number = 1024
) {
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext("2d")
  if (!ctx) return

  ctx.clearRect(0, 0, size, size)
  const scale = size / 1024
  ctx.save()
  ctx.scale(scale, scale)

  // 1. Ombre portée douce de la superellipse
  ctx.save()
  ctx.shadowColor = "rgba(3, 22, 66, 0.45)"
  ctx.shadowBlur = 48
  ctx.shadowOffsetY = 24
  traceSquircle(ctx, 512, 512, 496, charter.superellipseN)
  ctx.fillStyle = charter.primary
  ctx.fill()
  ctx.restore()

  // 2. Fond dégradé vertical Apple (Light blue to Deep brand blue)
  ctx.save()
  traceSquircle(ctx, 512, 512, 496, charter.superellipseN)
  ctx.clip()

  const bgGrad = ctx.createLinearGradient(512, 16, 512, 1008)
  bgGrad.addColorStop(0, charter.primaryLight)
  bgGrad.addColorStop(1, charter.primary)
  ctx.fillStyle = bgGrad
  ctx.fillRect(0, 0, 1024, 1024)

  // Reflet spéculaire elliptique supérieur (gloss Apple)
  const gloss = ctx.createLinearGradient(512, 16, 512, 560)
  gloss.addColorStop(0, `rgba(255, 255, 255, ${charter.glossOpacity})`)
  gloss.addColorStop(1, "rgba(255, 255, 255, 0.0)")
  ctx.fillStyle = gloss
  ctx.beginPath()
  ctx.ellipse(512, 180, 480, 240, 0, 0, Math.PI * 2)
  ctx.fill()

  // 3. Dessin du glyphe centré (avec léger décalage optique dx=-28, dy=+32)
  drawBrandGlyph(ctx, charter, 512 - 28, 512 + 32, 1.06)

  ctx.restore()
  ctx.restore()
}

// ---------------------------------------------------------------------------
// 4. Logo horizontal (880x320) clair & sombre
// ---------------------------------------------------------------------------

export function drawHorizontalLogoCanvas(
  canvas: HTMLCanvasElement,
  brand: BrandInfo,
  charter: BrandCharter,
  darkMode: boolean = false
) {
  const w = 880
  const h = 320
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext("2d")
  if (!ctx) return

  ctx.clearRect(0, 0, w, h)

  // Arrière-plan
  ctx.fillStyle = darkMode ? charter.dark : "#FFFFFF"
  ctx.fillRect(0, 0, w, h)

  // Miniature de l'icône à gauche (200x200 centré à x=160, y=160)
  ctx.save()
  const iconSize = 200
  const ix = 160
  const iy = 160
  traceSquircle(ctx, ix, iy, iconSize / 2, charter.superellipseN)
  ctx.clip()

  const bgGrad = ctx.createLinearGradient(ix, iy - iconSize / 2, ix, iy + iconSize / 2)
  bgGrad.addColorStop(0, charter.primaryLight)
  bgGrad.addColorStop(1, charter.primary)
  ctx.fillStyle = bgGrad
  ctx.fillRect(ix - iconSize / 2, iy - iconSize / 2, iconSize, iconSize)

  drawBrandGlyph(ctx, charter, ix - 6, iy + 6, 0.22)
  ctx.restore()

  // Typographie à droite
  const tx = 310
  const textColor = darkMode ? charter.light : charter.dark
  const accentColor = darkMode ? charter.primaryLight : charter.primary

  ctx.fillStyle = textColor
  ctx.font = `bold 82px ${charter.fontFamily === "serif" ? "Georgia, serif" : charter.fontFamily === "mono" ? "monospace" : "system-ui, sans-serif"}`
  ctx.textAlign = "left"
  ctx.textBaseline = "middle"
  ctx.fillText(brand.name, tx, 136)

  // Tagline ou mot d'accent
  if (brand.tagline) {
    const nameWidth = ctx.measureText(brand.name).width
    ctx.fillStyle = accentColor
    ctx.fillText(brand.tagline, tx + nameWidth + 18, 136)
  }

  // Sous-titre ou catégorie
  ctx.fillStyle = darkMode ? "rgba(255, 255, 255, 0.65)" : "rgba(15, 23, 42, 0.65)"
  ctx.font = `500 24px system-ui, sans-serif`
  ctx.letterSpacing = "2px"
  ctx.fillText(brand.category.toUpperCase(), tx, 196)
}

// ---------------------------------------------------------------------------
// 5. Flyer Publicitaire A5 / Portrait (1200x1600)
// ---------------------------------------------------------------------------

export function drawFlyerCanvas(
  canvas: HTMLCanvasElement,
  brand: BrandInfo,
  charter: BrandCharter
) {
  const w = 1200
  const h = 1600
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext("2d")
  if (!ctx) return

  // Fond dégradé sombre immersif
  const bg = ctx.createLinearGradient(0, 0, w, h)
  bg.addColorStop(0, charter.dark)
  bg.addColorStop(1, "#030816")
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, w, h)

  // Cercles lumineux d'arrière-plan (lueurs néon)
  const g1 = ctx.createRadialGradient(200, 200, 20, 200, 200, 600)
  g1.addColorStop(0, `${charter.primaryLight}33`)
  g1.addColorStop(1, "transparent")
  ctx.fillStyle = g1
  ctx.fillRect(0, 0, w, h)

  const g2 = ctx.createRadialGradient(1000, 800, 40, 1000, 800, 500)
  g2.addColorStop(0, `${charter.accent}22`)
  g2.addColorStop(1, "transparent")
  ctx.fillStyle = g2
  ctx.fillRect(0, 0, w, h)

  // En-tête : Badge et Logo
  ctx.fillStyle = charter.accent
  traceRoundRect(ctx, 80, 80, 140, 36, 18)
  ctx.fill()
  ctx.fillStyle = charter.dark
  ctx.font = "bold 15px system-ui, sans-serif"
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"
  ctx.fillText(brand.promoBadge || "OFFRE EXCLUSIVE", 150, 98)

  // Nom de marque en haut
  ctx.fillStyle = "#FFFFFF"
  ctx.font = "bold 38px system-ui, sans-serif"
  ctx.textAlign = "left"
  ctx.fillText(brand.name, 250, 98)

  if (brand.tagline) {
    const nw = ctx.measureText(brand.name).width
    ctx.fillStyle = charter.primaryLight
    ctx.fillText(brand.tagline, 250 + nw + 10, 98)
  }

  // Slogan / Grand Titre Accrocheur
  ctx.fillStyle = "#FFFFFF"
  ctx.font = "bold 64px system-ui, sans-serif"
  ctx.fillText("L'expérience de paiement", 80, 220)
  const gradTitle = ctx.createLinearGradient(80, 290, 600, 290)
  gradTitle.addColorStop(0, charter.primaryLight)
  gradTitle.addColorStop(1, charter.accent)
  ctx.fillStyle = gradTitle
  ctx.fillText("réinventée & instantanée.", 80, 295)

  // Sous-titre
  ctx.fillStyle = "rgba(255, 255, 255, 0.75)"
  ctx.font = "26px system-ui, sans-serif"
  ctx.fillText(brand.slogan, 80, 360)

  // Visuel Central : Grande icône / Carte en relief (Squircle 480x480 à x=360, y=440)
  ctx.save()
  const iconW = 460
  const iconX = (w - iconW) / 2
  const iconY = 430
  ctx.shadowColor = `${charter.primary}88`
  ctx.shadowBlur = 60
  ctx.shadowOffsetY = 30
  traceSquircle(ctx, iconX + iconW / 2, iconY + iconW / 2, iconW / 2, charter.superellipseN)
  ctx.clip()

  const cardGrad = ctx.createLinearGradient(iconX, iconY, iconX, iconY + iconW)
  cardGrad.addColorStop(0, charter.primaryLight)
  cardGrad.addColorStop(1, charter.primary)
  ctx.fillStyle = cardGrad
  ctx.fillRect(iconX, iconY, iconW, iconW)

  drawBrandGlyph(ctx, charter, iconX + iconW / 2 - 12, iconY + iconW / 2 + 16, 0.52)
  ctx.restore()

  // 3 Piliers / Cartes Fonctionnalités
  const cardY = 960
  const cardHeight = 120
  const cardGap = 24

  brand.features.forEach((feat, idx) => {
    const cy = cardY + idx * (cardHeight + cardGap)
    // Fond carte translucide
    ctx.fillStyle = "rgba(255, 255, 255, 0.06)"
    ctx.strokeStyle = "rgba(255, 255, 255, 0.12)"
    ctx.lineWidth = 1.5
    traceRoundRect(ctx, 80, cy, w - 160, cardHeight, 24)
    ctx.fill()
    ctx.stroke()

    // Pastille avec numéro
    ctx.fillStyle = charter.primaryLight
    ctx.beginPath()
    ctx.arc(140, cy + cardHeight / 2, 28, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = "#FFFFFF"
    ctx.font = "bold 22px system-ui, sans-serif"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(`${idx + 1}`, 140, cy + cardHeight / 2)

    // Texte de la fonctionnalité
    ctx.fillStyle = "#FFFFFF"
    ctx.font = "bold 24px system-ui, sans-serif"
    ctx.textAlign = "left"
    ctx.fillText(feat, 190, cy + cardHeight / 2)
  })

  // Bandeau inférieur : Bouton d'action CTA + Coordonnées
  const footY = 1420
  ctx.fillStyle = charter.accent
  traceRoundRect(ctx, 80, footY, 400, 70, 35)
  ctx.fill()
  ctx.fillStyle = charter.dark
  ctx.font = "bold 24px system-ui, sans-serif"
  ctx.textAlign = "center"
  ctx.fillText("Découvrir l'Application →", 280, footY + 36)

  // Contacts
  ctx.fillStyle = "rgba(255, 255, 255, 0.9)"
  ctx.font = "20px system-ui, sans-serif"
  ctx.textAlign = "right"
  ctx.fillText(brand.website, w - 80, footY + 22)
  ctx.fillStyle = "rgba(255, 255, 255, 0.6)"
  ctx.font = "18px system-ui, sans-serif"
  ctx.fillText(`${brand.phone} · ${brand.email}`, w - 80, footY + 54)
}

// ---------------------------------------------------------------------------
// 6. Brochure Dépliant d'Entreprise A4 (1400x1000)
// ---------------------------------------------------------------------------

export function drawBrochureCanvas(
  canvas: HTMLCanvasElement,
  brand: BrandInfo,
  charter: BrandCharter
) {
  const w = 1400
  const h = 1000
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext("2d")
  if (!ctx) return

  // Fond clair professionnel
  ctx.fillStyle = "#F8FAFC"
  ctx.fillRect(0, 0, w, h)

  // Volet gauche (380px de large) en couleur de marque
  const leftW = 440
  const leftGrad = ctx.createLinearGradient(0, 0, leftW, h)
  leftGrad.addColorStop(0, charter.primary)
  leftGrad.addColorStop(1, charter.dark)
  ctx.fillStyle = leftGrad
  ctx.fillRect(0, 0, leftW, h)

  // Logo sur le volet gauche
  ctx.save()
  const miniIconSize = 120
  traceSquircle(ctx, 120, 140, miniIconSize / 2, charter.superellipseN)
  ctx.clip()
  const ig = ctx.createLinearGradient(60, 80, 180, 200)
  ig.addColorStop(0, charter.primaryLight)
  ig.addColorStop(1, charter.primary)
  ctx.fillStyle = ig
  ctx.fillRect(60, 80, miniIconSize, miniIconSize)
  drawBrandGlyph(ctx, charter, 120 - 4, 140 + 4, 0.13)
  ctx.restore()

  ctx.fillStyle = "#FFFFFF"
  ctx.font = "bold 36px system-ui, sans-serif"
  ctx.textAlign = "left"
  ctx.textBaseline = "middle"
  ctx.fillText(brand.name, 200, 140)

  // Mission & Pitch volet gauche
  ctx.fillStyle = "rgba(255, 255, 255, 0.9)"
  ctx.font = "bold 24px system-ui, sans-serif"
  ctx.fillText("Brochure Corporate", 60, 260)

  ctx.fillStyle = "rgba(255, 255, 255, 0.7)"
  ctx.font = "17px system-ui, sans-serif"
  const lines = [
    brand.category,
    "",
    brand.slogan,
    "",
    "Une architecture moderne conçue pour",
    "accélérer l'inclusion financière et",
    "sécuriser chaque flux commercial.",
  ]
  lines.forEach((l, i) => ctx.fillText(l, 60, 310 + i * 26))

  // Coordonnées en bas du volet gauche
  ctx.fillStyle = charter.accent
  ctx.font = "bold 18px system-ui, sans-serif"
  ctx.fillText("CONTACT & SUPPORT", 60, 820)
  ctx.fillStyle = "#FFFFFF"
  ctx.font = "16px system-ui, sans-serif"
  ctx.fillText(brand.website, 60, 856)
  ctx.fillText(brand.email, 60, 886)
  ctx.fillText(brand.phone, 60, 916)

  // Panneau de droite : Contenu corporate principal
  const rightX = leftW + 60

  // Titre de la brochure
  ctx.fillStyle = charter.dark
  ctx.font = "bold 44px system-ui, sans-serif"
  ctx.textAlign = "left"
  ctx.fillText("Excellence Technologique & Sécurité", rightX, 120)

  ctx.fillStyle = "rgba(15, 23, 42, 0.6)"
  ctx.font = "20px system-ui, sans-serif"
  ctx.fillText("Solutions intelligentes développées pour les entreprises modernes.", rightX, 168)

  // 3 Chiffres clés / Métriques en encadrés
  const metrics = [brand.metric1, brand.metric2, brand.metric3]
  const metricCardW = 240
  metrics.forEach((m, i) => {
    const mx = rightX + i * (metricCardW + 24)
    ctx.fillStyle = "#FFFFFF"
    ctx.strokeStyle = "rgba(15, 23, 42, 0.1)"
    ctx.lineWidth = 1.5
    traceRoundRect(ctx, mx, 220, metricCardW, 140, 20)
    ctx.fill()
    ctx.stroke()

    ctx.fillStyle = charter.primaryLight
    ctx.font = "bold 38px system-ui, sans-serif"
    ctx.textAlign = "center"
    ctx.fillText(m.value, mx + metricCardW / 2, 275)

    ctx.fillStyle = "rgba(15, 23, 42, 0.7)"
    ctx.font = "15px system-ui, sans-serif"
    ctx.fillText(m.label, mx + metricCardW / 2, 320)
  })

  // Section Piliers d'intervention
  ctx.fillStyle = charter.dark
  ctx.font = "bold 26px system-ui, sans-serif"
  ctx.textAlign = "left"
  ctx.fillText("Piliers de Performance & Avantages Clés", rightX, 430)

  brand.features.forEach((feat, i) => {
    const fy = 480 + i * 80
    ctx.fillStyle = "#FFFFFF"
    ctx.strokeStyle = "rgba(15, 23, 42, 0.08)"
    traceRoundRect(ctx, rightX, fy, 780, 64, 16)
    ctx.fill()
    ctx.stroke()

    // Puce dorée
    ctx.fillStyle = charter.accent
    ctx.beginPath()
    ctx.arc(rightX + 36, fy + 32, 12, 0, Math.PI * 2)
    ctx.fill()

    ctx.fillStyle = charter.dark
    ctx.font = "600 18px system-ui, sans-serif"
    ctx.fillText(feat, rightX + 68, fy + 32)
  })

  // Charte des couleurs en bas à droite
  ctx.fillStyle = charter.dark
  ctx.font = "bold 20px system-ui, sans-serif"
  ctx.fillText("Palette Officielle de la Marque", rightX, 770)

  const swatches = [
    { label: "Primaire", c: charter.primary },
    { label: "Lumière", c: charter.primaryLight },
    { label: "Accent", c: charter.accent },
    { label: "Secondaire", c: charter.secondary },
    { label: "Contraste", c: charter.dark },
  ]

  swatches.forEach((sw, i) => {
    const sx = rightX + i * 150
    ctx.fillStyle = sw.c
    traceRoundRect(ctx, sx, 810, 130, 60, 12)
    ctx.fill()
    ctx.fillStyle = "#FFFFFF"
    ctx.font = "bold 13px system-ui, sans-serif"
    ctx.fillText(sw.label, sx + 12, 836)
    ctx.font = "11px monospace"
    ctx.fillText(sw.c, sx + 12, 856)
  })
}

// ---------------------------------------------------------------------------
// 7. Carte de Visite (1050x600) Recto & Verso
// ---------------------------------------------------------------------------

export function drawBusinessCardCanvas(
  canvas: HTMLCanvasElement,
  brand: BrandInfo,
  charter: BrandCharter,
  side: "front" | "back" = "front"
) {
  const w = 1050
  const h = 600
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext("2d")
  if (!ctx) return

  if (side === "front") {
    // RECTO : Minimaliste sombre & logo
    const bg = ctx.createLinearGradient(0, 0, w, h)
    bg.addColorStop(0, charter.dark)
    bg.addColorStop(1, "#030A18")
    ctx.fillStyle = bg
    ctx.fillRect(0, 0, w, h)

    // Icône centrale
    ctx.save()
    const iconSize = 160
    traceSquircle(ctx, w / 2, h / 2 - 40, iconSize / 2, charter.superellipseN)
    ctx.clip()
    const ig = ctx.createLinearGradient(w / 2 - 80, h / 2 - 120, w / 2 + 80, h / 2 + 40)
    ig.addColorStop(0, charter.primaryLight)
    ig.addColorStop(1, charter.primary)
    ctx.fillStyle = ig
    ctx.fillRect(w / 2 - iconSize / 2, h / 2 - 40 - iconSize / 2, iconSize, iconSize)
    drawBrandGlyph(ctx, charter, w / 2 - 5, h / 2 - 40 + 5, 0.17)
    ctx.restore()

    ctx.fillStyle = "#FFFFFF"
    ctx.font = "bold 44px system-ui, sans-serif"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(brand.name, w / 2, h / 2 + 90)

    if (brand.tagline) {
      ctx.fillStyle = charter.primaryLight
      ctx.font = "300 36px system-ui, sans-serif"
      ctx.fillText(brand.tagline, w / 2, h / 2 + 138)
    }

    ctx.fillStyle = charter.accent
    ctx.font = "14px system-ui, sans-serif"
    ctx.letterSpacing = "4px"
    ctx.fillText(brand.category.toUpperCase(), w / 2, h / 2 + 186)
  } else {
    // VERSO : Coordonnées professionnelles
    ctx.fillStyle = "#FFFFFF"
    ctx.fillRect(0, 0, w, h)

    // Bande de couleur sur la gauche
    const bar = ctx.createLinearGradient(0, 0, 24, h)
    bar.addColorStop(0, charter.primaryLight)
    bar.addColorStop(1, charter.primary)
    ctx.fillStyle = bar
    ctx.fillRect(0, 0, 24, h)

    // Nom de marque en haut à gauche
    ctx.fillStyle = charter.primary
    ctx.font = "bold 32px system-ui, sans-serif"
    ctx.textAlign = "left"
    ctx.textBaseline = "middle"
    ctx.fillText(brand.name, 70, 70)

    // Nom du contact
    ctx.fillStyle = charter.dark
    ctx.font = "bold 38px system-ui, sans-serif"
    ctx.fillText("Félicien Mukamba", 70, 200)

    ctx.fillStyle = charter.primaryLight
    ctx.font = "500 20px system-ui, sans-serif"
    ctx.fillText("Lead Architect & Fullstack Systems Engineer", 70, 245)

    // Ligne de séparation
    ctx.strokeStyle = "rgba(15, 23, 42, 0.1)"
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(70, 285)
    ctx.lineTo(w - 70, 285)
    ctx.stroke()

    // Informations de contact
    const contactInfo = [
      { label: "Web", val: brand.website },
      { label: "Email", val: brand.email },
      { label: "Tél", val: brand.phone },
    ]

    contactInfo.forEach((ci, idx) => {
      const cy = 340 + idx * 56
      ctx.fillStyle = "rgba(15, 23, 42, 0.45)"
      ctx.font = "bold 14px system-ui, sans-serif"
      ctx.fillText(ci.label.toUpperCase(), 70, cy)

      ctx.fillStyle = charter.dark
      ctx.font = "500 20px system-ui, sans-serif"
      ctx.fillText(ci.val, 150, cy)
    })

    // QR Code simulé en bas à droite
    const qrSize = 130
    const qrX = w - qrSize - 70
    const qrY = h - qrSize - 70
    ctx.strokeStyle = charter.primary
    ctx.lineWidth = 2
    traceRoundRect(ctx, qrX, qrY, qrSize, qrSize, 12)
    ctx.stroke()

    ctx.fillStyle = charter.dark
    ctx.font = "12px monospace"
    ctx.textAlign = "center"
    ctx.fillText("SCAN NFC / QR", qrX + qrSize / 2, qrY + qrSize / 2)
  }
}

// ---------------------------------------------------------------------------
// 8. Post Réseaux Sociaux Carré (1080x1080)
// ---------------------------------------------------------------------------

export function drawSocialPostCanvas(
  canvas: HTMLCanvasElement,
  brand: BrandInfo,
  charter: BrandCharter
) {
  const s = 1080
  canvas.width = s
  canvas.height = s
  const ctx = canvas.getContext("2d")
  if (!ctx) return

  // Fond dégradé
  const bg = ctx.createLinearGradient(0, 0, s, s)
  bg.addColorStop(0, charter.dark)
  bg.addColorStop(1, "#030A1C")
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, s, s)

  // Halo lumineux
  const halo = ctx.createRadialGradient(540, 500, 30, 540, 500, 480)
  halo.addColorStop(0, `${charter.primaryLight}44`)
  halo.addColorStop(1, "transparent")
  ctx.fillStyle = halo
  ctx.fillRect(0, 0, s, s)

  // Badge en haut
  ctx.fillStyle = charter.accent
  traceRoundRect(ctx, 80, 80, 160, 42, 21)
  ctx.fill()
  ctx.fillStyle = charter.dark
  ctx.font = "bold 16px system-ui, sans-serif"
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"
  ctx.fillText(brand.promoBadge || "ANNONCE", 160, 101)

  // Logo en haut à droite
  ctx.fillStyle = "#FFFFFF"
  ctx.font = "bold 28px system-ui, sans-serif"
  ctx.textAlign = "right"
  ctx.fillText(brand.name, s - 80, 101)

  // Titre principal
  ctx.fillStyle = "#FFFFFF"
  ctx.font = "bold 56px system-ui, sans-serif"
  ctx.textAlign = "center"
  ctx.fillText("Passez à la vitesse supérieure", 540, 260)
  ctx.fillStyle = charter.primaryLight
  ctx.fillText("avec vos transactions.", 540, 330)

  // Carte en icône centrale
  ctx.save()
  const iconW = 340
  const iconX = (s - iconW) / 2
  const iconY = 410
  ctx.shadowColor = `${charter.primary}99`
  ctx.shadowBlur = 50
  ctx.shadowOffsetY = 24
  traceSquircle(ctx, 540, iconY + iconW / 2, iconW / 2, charter.superellipseN)
  ctx.clip()

  const cardGrad = ctx.createLinearGradient(iconX, iconY, iconX, iconY + iconW)
  cardGrad.addColorStop(0, charter.primaryLight)
  cardGrad.addColorStop(1, charter.primary)
  ctx.fillStyle = cardGrad
  ctx.fillRect(iconX, iconY, iconW, iconW)

  drawBrandGlyph(ctx, charter, 540 - 8, iconY + iconW / 2 + 10, 0.38)
  ctx.restore()

  // Slogan
  ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
  ctx.font = "24px system-ui, sans-serif"
  ctx.textAlign = "center"
  ctx.fillText(brand.slogan, 540, 840)

  // Bouton CTA
  ctx.fillStyle = charter.accent
  traceRoundRect(ctx, 360, 910, 360, 68, 34)
  ctx.fill()
  ctx.fillStyle = charter.dark
  ctx.font = "bold 22px system-ui, sans-serif"
  ctx.fillText("Rejoindre le réseau →", 540, 944)
}

// ---------------------------------------------------------------------------
// 9. Export & Utilitaires multi-formats
// ---------------------------------------------------------------------------

export async function canvasToBlob(
  canvas: HTMLCanvasElement,
  format: "png" | "jpeg" | "webp" = "png",
  quality: number = 0.95
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob)
        else reject(new Error("Canvas export failed"))
      },
      `image/${format}`,
      quality
    )
  })
}

export function downloadCanvas(
  canvas: HTMLCanvasElement,
  filename: string,
  format: "png" | "jpeg" | "webp" = "png"
) {
  const ext = format === "jpeg" ? "jpg" : format
  const link = document.createElement("a")
  link.download = `${filename}.${ext}`
  link.href = canvas.toDataURL(`image/${format}`, 0.95)
  link.click()
}

// ---------------------------------------------------------------------------
// 10. Dépliant 3 Volets (Tri-Fold Marketing Brochure 2100x1000)
// ---------------------------------------------------------------------------

export function drawTrifoldBrochureCanvas(
  canvas: HTMLCanvasElement,
  brand: BrandInfo,
  charter: BrandCharter
) {
  const w = 2100
  const h = 1000
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext("2d")
  if (!ctx) return

  // Fond clair
  ctx.fillStyle = charter.light || "#FFFFFF"
  ctx.fillRect(0, 0, w, h)

  // Volet 1 (Gauche: 0-700) : Présentation & Vision
  const g1 = ctx.createLinearGradient(0, 0, 700, 240)
  g1.addColorStop(0, charter.primary)
  g1.addColorStop(1, charter.dark)
  ctx.fillStyle = g1
  ctx.fillRect(0, 0, 700, 240)

  // Mini icône volet 1
  ctx.save()
  const mini1 = 110
  traceSquircle(ctx, 110, 120, mini1 / 2, charter.superellipseN)
  ctx.clip()
  const ig1 = ctx.createLinearGradient(55, 65, 165, 175)
  ig1.addColorStop(0, charter.primaryLight)
  ig1.addColorStop(1, charter.primary)
  ctx.fillStyle = ig1
  ctx.fillRect(55, 65, mini1, mini1)
  drawBrandGlyph(ctx, charter, 107, 123, 0.12)
  ctx.restore()

  ctx.fillStyle = "#FFFFFF"
  ctx.font = "bold 38px system-ui, sans-serif"
  ctx.textAlign = "left"
  ctx.textBaseline = "middle"
  ctx.fillText(brand.name, 190, 105)
  ctx.fillStyle = charter.accent
  ctx.font = "20px system-ui, sans-serif"
  ctx.fillText(brand.tagline, 190, 145)

  ctx.fillStyle = charter.dark
  ctx.font = "bold 30px system-ui, sans-serif"
  ctx.fillText("Notre Engagement", 60, 310)

  ctx.fillStyle = "rgba(15, 23, 42, 0.75)"
  ctx.font = "19px system-ui, sans-serif"
  const missionLines = [
    brand.category,
    "",
    brand.slogan,
    "",
    "Une technologie de pointe alliant",
    "sécurité industrielle et simplicité",
    "pour chaque utilisateur et commerce.",
  ]
  missionLines.forEach((l, i) => ctx.fillText(l, 60, 360 + i * 26))

  // Carte confiance
  ctx.fillStyle = "#FFFFFF"
  ctx.strokeStyle = "rgba(15, 23, 42, 0.1)"
  ctx.lineWidth = 1.5
  traceRoundRect(ctx, 60, 560, 580, 160, 20)
  ctx.fill()
  ctx.stroke()

  ctx.fillStyle = charter.accent
  ctx.beginPath()
  ctx.arc(115, 640, 28, 0, Math.PI * 2)
  ctx.fill()
  ctx.fillStyle = charter.dark
  ctx.font = "bold 24px system-ui, sans-serif"
  ctx.textAlign = "center"
  ctx.fillText("★", 115, 648)

  ctx.textAlign = "left"
  ctx.fillStyle = charter.dark
  ctx.font = "bold 22px system-ui, sans-serif"
  ctx.fillText("Fiabilité & Disponibilité Maximale", 165, 625)
  ctx.fillStyle = "rgba(15, 23, 42, 0.65)"
  ctx.font = "16px system-ui, sans-serif"
  ctx.fillText("Transactions sécurisées en temps réel 24h/24.", 165, 658)

  // Bandeau bas volet 1
  ctx.fillStyle = charter.dark
  traceRoundRect(ctx, 60, 750, 580, 190, 20)
  ctx.fill()
  ctx.fillStyle = charter.accent
  ctx.font = "bold 20px system-ui, sans-serif"
  ctx.fillText("GARANTIE & CERTIFICATION", 90, 805)
  ctx.fillStyle = "#FFFFFF"
  ctx.font = "16px system-ui, sans-serif"
  ctx.fillText("Conforme aux normes internationales de sécurité bancaire.", 90, 840)
  ctx.fillStyle = charter.primaryLight
  ctx.font = "bold 18px monospace"
  ctx.fillText(brand.website, 90, 890)

  // Lignes de pliure
  ctx.setLineDash([8, 8])
  ctx.strokeStyle = "rgba(15, 23, 42, 0.18)"
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(700, 0)
  ctx.lineTo(700, h)
  ctx.moveTo(1400, 0)
  ctx.lineTo(1400, h)
  ctx.stroke()
  ctx.setLineDash([])

  // Volet 2 (Centre: 700-1400) : Offres & Piliers
  ctx.fillStyle = charter.primary
  traceRoundRect(ctx, 760, 60, 180, 36, 18)
  ctx.fill()
  ctx.fillStyle = "#FFFFFF"
  ctx.font = "bold 15px system-ui, sans-serif"
  ctx.textAlign = "center"
  ctx.fillText(brand.promoBadge || "OFFRE SPECIALE", 850, 83)

  ctx.textAlign = "left"
  ctx.fillStyle = charter.dark
  ctx.font = "bold 40px system-ui, sans-serif"
  ctx.fillText("L'Écosystème " + brand.name, 760, 145)

  // Visuel produit central
  ctx.save()
  const cW = 580
  const cH = 280
  traceRoundRect(ctx, 760, 180, cW, cH, 24)
  ctx.clip()
  const cGrad = ctx.createLinearGradient(760, 180, 760 + cW, 180 + cH)
  cGrad.addColorStop(0, charter.primary)
  cGrad.addColorStop(1, charter.dark)
  ctx.fillStyle = cGrad
  ctx.fillRect(760, 180, cW, cH)
  drawBrandGlyph(ctx, charter, 760 + cW / 2 - 10, 180 + cH / 2 + 10, 0.36)
  ctx.restore()

  // 3 Puces clés
  brand.features.forEach((feat, i) => {
    const fy = 500 + i * 70
    ctx.fillStyle = "#FFFFFF"
    ctx.strokeStyle = "rgba(15, 23, 42, 0.08)"
    traceRoundRect(ctx, 760, fy, 580, 56, 14)
    ctx.fill()
    ctx.stroke()

    ctx.fillStyle = charter.primaryLight
    ctx.beginPath()
    ctx.arc(795, fy + 28, 14, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = "#FFFFFF"
    ctx.font = "bold 14px system-ui, sans-serif"
    ctx.textAlign = "center"
    ctx.fillText("✓", 795, fy + 33)

    ctx.textAlign = "left"
    ctx.fillStyle = charter.dark
    ctx.font = "600 17px system-ui, sans-serif"
    ctx.fillText(feat, 825, fy + 34)
  })

  // Prix & CTA Volet 2
  ctx.fillStyle = charter.primary
  ctx.font = "bold 44px system-ui, sans-serif"
  ctx.fillText(brand.metric3.value || "0% Frais", 760, 765)
  ctx.fillStyle = "rgba(15, 23, 42, 0.6)"
  ctx.font = "16px system-ui, sans-serif"
  ctx.fillText(brand.metric3.label || "Sur toutes vos micro-transactions", 760, 800)

  ctx.fillStyle = charter.primary
  traceRoundRect(ctx, 760, 840, 580, 76, 38)
  ctx.fill()
  ctx.fillStyle = "#FFFFFF"
  ctx.font = "bold 22px system-ui, sans-serif"
  ctx.textAlign = "center"
  ctx.fillText("Activer Votre Compte Pro →", 1050, 885)

  // Volet 3 (Droite: 1400-2100) : Contact & QR Code
  const g3 = ctx.createLinearGradient(1400, 0, 2100, h)
  g3.addColorStop(0, charter.dark)
  g3.addColorStop(1, "#030B1C")
  ctx.fillStyle = g3
  ctx.fillRect(1400, 0, 700, h)

  ctx.textAlign = "left"
  ctx.fillStyle = "#FFFFFF"
  ctx.font = "bold 40px system-ui, sans-serif"
  ctx.fillText("Connectez votre entreprise", 1460, 110)
  ctx.fillStyle = charter.primaryLight
  ctx.font = "24px system-ui, sans-serif"
  ctx.fillText("Discutez dès aujourd'hui avec nos équipes.", 1460, 155)

  // QR Code Mockup
  const qrX = 1460
  const qrY = 220
  const qrS = 220
  ctx.fillStyle = "#FFFFFF"
  traceRoundRect(ctx, qrX, qrY, qrS, qrS, 20)
  ctx.fill()
  ctx.fillStyle = charter.dark
  ctx.fillRect(qrX + 25, qrY + 25, 55, 55)
  ctx.fillRect(qrX + qrS - 80, qrY + 25, 55, 55)
  ctx.fillRect(qrX + 25, qrY + qrS - 80, 55, 55)
  ctx.fillStyle = charter.primary
  ctx.fillRect(qrX + 105, qrY + 105, 75, 75)

  ctx.fillStyle = "rgba(255, 255, 255, 0.85)"
  ctx.font = "bold 15px monospace"
  ctx.fillText("SCANNEZ LE QR POUR DÉMARRER", qrX, 480)

  // Coordonnées
  const contacts = [
    { label: "Site Officiel", val: brand.website },
    { label: "Email Support", val: brand.email },
    { label: "Ligne Directe", val: brand.phone },
  ]
  contacts.forEach((c, idx) => {
    const cy = 540 + idx * 75
    ctx.fillStyle = charter.accent
    ctx.font = "bold 15px system-ui, sans-serif"
    ctx.fillText(c.label.toUpperCase(), qrX, cy)
    ctx.fillStyle = "#FFFFFF"
    ctx.font = "500 22px system-ui, sans-serif"
    ctx.fillText(c.val, qrX, cy + 30)
  })

  // CTA final bas
  ctx.fillStyle = charter.accent
  traceRoundRect(ctx, qrX, 820, 540, 70, 35)
  ctx.fill()
  ctx.fillStyle = charter.dark
  ctx.font = "bold 22px system-ui, sans-serif"
  ctx.textAlign = "center"
  ctx.fillText("Rejoindre le Réseau " + brand.name + " →", qrX + 270, 862)
}

// ---------------------------------------------------------------------------
// 11. Kakémono / Roll-Up Banner Stand (900x2000)
// ---------------------------------------------------------------------------

export function drawRollupBannerCanvas(
  canvas: HTMLCanvasElement,
  brand: BrandInfo,
  charter: BrandCharter
) {
  const w = 900
  const h = 2000
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext("2d")
  if (!ctx) return

  // Fond dégradé sombre
  const bg = ctx.createLinearGradient(0, 0, w, h)
  bg.addColorStop(0, charter.dark)
  bg.addColorStop(1, "#020712")
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, w, h)

  // Lueurs salon
  const lueur1 = ctx.createRadialGradient(450, 300, 30, 450, 300, 450)
  lueur1.addColorStop(0, `${charter.primaryLight}44`)
  lueur1.addColorStop(1, "transparent")
  ctx.fillStyle = lueur1
  ctx.fillRect(0, 0, w, h)

  // Emblème haut du roll-up
  ctx.save()
  const iconS = 220
  traceSquircle(ctx, 450, 220, iconS / 2, charter.superellipseN)
  ctx.clip()
  const ig = ctx.createLinearGradient(340, 110, 560, 330)
  ig.addColorStop(0, charter.primaryLight)
  ig.addColorStop(1, charter.primary)
  ctx.fillStyle = ig
  ctx.fillRect(340, 110, iconS, iconS)
  drawBrandGlyph(ctx, charter, 444, 226, 0.24)
  ctx.restore()

  // Nom de marque
  ctx.fillStyle = "#FFFFFF"
  ctx.font = "bold 64px system-ui, sans-serif"
  ctx.textAlign = "center"
  ctx.fillText(brand.name, 450, 380)

  ctx.fillStyle = charter.accent
  ctx.font = "bold 28px system-ui, sans-serif"
  ctx.fillText(brand.tagline, 450, 430)

  // Grand Titre d'Accroche
  ctx.fillStyle = "#FFFFFF"
  ctx.font = "bold 56px system-ui, sans-serif"
  ctx.fillText("INNOVEZ SANS LIMITE", 450, 580)
  ctx.fillStyle = "rgba(255, 255, 255, 0.75)"
  ctx.font = "28px system-ui, sans-serif"
  ctx.fillText(brand.slogan, 450, 640)

  // Grande carte visuelle
  ctx.save()
  const cW = 660
  const cH = 480
  const cX = (w - cW) / 2
  const cY = 720
  traceSquircle(ctx, 450, cY + cH / 2, cW / 2, charter.superellipseN)
  ctx.clip()
  const cGrad = ctx.createLinearGradient(cX, cY, cX + cW, cY + cH)
  cGrad.addColorStop(0, charter.primaryLight)
  cGrad.addColorStop(1, charter.primary)
  ctx.fillStyle = cGrad
  ctx.fillRect(cX, cY, cW, cH)
  drawBrandGlyph(ctx, charter, 438, cY + cH / 2 + 16, 0.52)
  ctx.restore()

  // Badge promo
  ctx.fillStyle = charter.accent
  traceRoundRect(ctx, 250, 1260, 400, 64, 32)
  ctx.fill()
  ctx.fillStyle = charter.dark
  ctx.font = "bold 26px system-ui, sans-serif"
  ctx.fillText(brand.promoBadge || "DÉMONSTRATION EN DIRECT", 450, 1300)

  // 3 Points forts
  const points = [
    "Démonstration en direct au stand",
    "Compatible mobile, cloud & API",
    "Mise en place en moins de 24h",
  ]
  points.forEach((p, idx) => {
    const py = 1420 + idx * 75
    ctx.fillStyle = "#FFFFFF"
    ctx.font = "bold 32px system-ui, sans-serif"
    ctx.fillText(`✓ ${p}`, 450, py)
  })

  // Bouton CTA Bas
  ctx.fillStyle = charter.accent
  traceRoundRect(ctx, 150, 1680, 600, 100, 50)
  ctx.fill()
  ctx.fillStyle = charter.dark
  ctx.font = "bold 34px system-ui, sans-serif"
  ctx.fillText("Tester Immédiatement →", 450, 1740)

  ctx.fillStyle = "#FFFFFF"
  ctx.font = "bold 32px monospace"
  ctx.fillText(brand.website, 450, 1850)
  ctx.fillStyle = "rgba(255, 255, 255, 0.6)"
  ctx.font = "22px system-ui, sans-serif"
  ctx.fillText(`${brand.phone} · ${brand.email}`, 450, 1900)
}

// ---------------------------------------------------------------------------
// 12. Panneau Publicitaire / Billboard 16:9 (1920x800)
// ---------------------------------------------------------------------------

export function drawBillboardCanvas(
  canvas: HTMLCanvasElement,
  brand: BrandInfo,
  charter: BrandCharter
) {
  const w = 1920
  const h = 800
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext("2d")
  if (!ctx) return

  // Fond immersif
  ctx.fillStyle = charter.dark
  ctx.fillRect(0, 0, w, h)

  // Côté droit dégradé
  const rightGrad = ctx.createLinearGradient(1100, 0, w, h)
  rightGrad.addColorStop(0, charter.primary)
  rightGrad.addColorStop(1, charter.dark)
  ctx.fillStyle = rightGrad
  ctx.fillRect(1100, 0, 820, h)

  // Logo haut gauche
  ctx.save()
  const iconS = 160
  traceSquircle(ctx, 180, 150, iconS / 2, charter.superellipseN)
  ctx.clip()
  const ig = ctx.createLinearGradient(100, 70, 260, 230)
  ig.addColorStop(0, charter.primaryLight)
  ig.addColorStop(1, charter.primary)
  ctx.fillStyle = ig
  ctx.fillRect(100, 70, iconS, iconS)
  drawBrandGlyph(ctx, charter, 174, 156, 0.18)
  ctx.restore()

  ctx.fillStyle = "#FFFFFF"
  ctx.font = "bold 64px system-ui, sans-serif"
  ctx.textAlign = "left"
  ctx.fillText(brand.name, 290, 140)
  ctx.fillStyle = charter.accent
  ctx.font = "bold 30px system-ui, sans-serif"
  ctx.fillText(brand.tagline, 290, 190)

  // Titre percutant
  ctx.fillStyle = "#FFFFFF"
  ctx.font = "bold 90px system-ui, sans-serif"
  ctx.fillText("CHANGEZ DE", 100, 360)
  ctx.fillStyle = charter.accent
  ctx.fillText("DIMENSION.", 100, 460)

  ctx.fillStyle = "rgba(255, 255, 255, 0.85)"
  ctx.font = "32px system-ui, sans-serif"
  ctx.fillText(brand.slogan, 100, 540)

  // CTA
  ctx.fillStyle = charter.accent
  traceRoundRect(ctx, 100, 610, 460, 96, 48)
  ctx.fill()
  ctx.fillStyle = charter.dark
  ctx.font = "bold 34px system-ui, sans-serif"
  ctx.textAlign = "center"
  ctx.fillText("DÉCOUVRIR L'OFFRE →", 330, 668)

  ctx.textAlign = "left"
  ctx.fillStyle = "#FFFFFF"
  ctx.font = "bold 34px monospace"
  ctx.fillText(brand.website, 600, 670)

  // Visuel Hero Droit
  ctx.save()
  const heroS = 480
  traceSquircle(ctx, 1500, 400, heroS / 2, charter.superellipseN)
  ctx.clip()
  const heroGrad = ctx.createLinearGradient(1260, 160, 1740, 640)
  heroGrad.addColorStop(0, charter.primaryLight)
  heroGrad.addColorStop(1, charter.primary)
  ctx.fillStyle = heroGrad
  ctx.fillRect(1260, 160, heroS, heroS)
  drawBrandGlyph(ctx, charter, 1488, 416, 0.54)
  ctx.restore()

  // Badge promo sur billboard
  ctx.fillStyle = charter.accent
  traceRoundRect(ctx, 1160, 100, 240, 60, 30)
  ctx.fill()
  ctx.fillStyle = charter.dark
  ctx.font = "bold 26px system-ui, sans-serif"
  ctx.textAlign = "center"
  ctx.fillText(brand.promoBadge || "OFFRE SPECIALE", 1280, 138)
}

// ---------------------------------------------------------------------------
// 13. Story / Reel Mobile 9:16 (1080x1920)
// ---------------------------------------------------------------------------

export function drawStoryCanvas(
  canvas: HTMLCanvasElement,
  brand: BrandInfo,
  charter: BrandCharter
) {
  const w = 1080
  const h = 1920
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext("2d")
  if (!ctx) return

  // Fond dégradé vertical
  const bg = ctx.createLinearGradient(0, 0, 0, h)
  bg.addColorStop(0, charter.dark)
  bg.addColorStop(1, "#020712")
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, w, h)

  // Logo haut
  ctx.save()
  const iconS = 180
  traceSquircle(ctx, 540, 220, iconS / 2, charter.superellipseN)
  ctx.clip()
  const ig = ctx.createLinearGradient(450, 130, 630, 310)
  ig.addColorStop(0, charter.primaryLight)
  ig.addColorStop(1, charter.primary)
  ctx.fillStyle = ig
  ctx.fillRect(450, 130, iconS, iconS)
  drawBrandGlyph(ctx, charter, 534, 226, 0.2)
  ctx.restore()

  ctx.fillStyle = "#FFFFFF"
  ctx.font = "bold 52px system-ui, sans-serif"
  ctx.textAlign = "center"
  ctx.fillText(brand.name, 540, 370)

  // Grand Titre Story
  ctx.fillStyle = "#FFFFFF"
  ctx.font = "bold 64px system-ui, sans-serif"
  ctx.fillText("LA VITESSE", 540, 520)
  ctx.fillStyle = charter.accent
  ctx.fillText("À PORTÉE DE MAIN.", 540, 595)

  // Carte centrale
  ctx.save()
  const cW = 600
  traceSquircle(ctx, 540, 960, cW / 2, charter.superellipseN)
  ctx.clip()
  const cGrad = ctx.createLinearGradient(240, 660, 840, 1260)
  cGrad.addColorStop(0, charter.primaryLight)
  cGrad.addColorStop(1, charter.primary)
  ctx.fillStyle = cGrad
  ctx.fillRect(240, 660, cW, cW)
  drawBrandGlyph(ctx, charter, 528, 976, 0.64)
  ctx.restore()

  // Badge
  ctx.fillStyle = charter.accent
  traceRoundRect(ctx, 360, 1340, 360, 60, 30)
  ctx.fill()
  ctx.fillStyle = charter.dark
  ctx.font = "bold 24px system-ui, sans-serif"
  ctx.fillText(brand.promoBadge || "NOUVEAUTÉ", 540, 1378)

  ctx.fillStyle = "rgba(255, 255, 255, 0.85)"
  ctx.font = "30px system-ui, sans-serif"
  ctx.fillText(brand.slogan, 540, 1470)

  // Swipe Up / CTA
  ctx.fillStyle = charter.primaryLight
  traceRoundRect(ctx, 240, 1640, 600, 96, 48)
  ctx.fill()
  ctx.fillStyle = "#FFFFFF"
  ctx.font = "bold 32px system-ui, sans-serif"
  ctx.fillText("Glisser vers le haut ↑", 540, 1700)

  ctx.fillStyle = "rgba(255, 255, 255, 0.6)"
  ctx.font = "24px monospace"
  ctx.fillText(brand.website, 540, 1790)
}

// ---------------------------------------------------------------------------
// 14. Emblème de Marque Carré (1000x1000)
// ---------------------------------------------------------------------------

export function drawLogoEmblemCanvas(
  canvas: HTMLCanvasElement,
  brand: BrandInfo,
  charter: BrandCharter
) {
  const s = 1000
  canvas.width = s
  canvas.height = s
  const ctx = canvas.getContext("2d")
  if (!ctx) return

  // Fond dégradé
  const bg = ctx.createLinearGradient(0, 0, s, s)
  bg.addColorStop(0, charter.dark)
  bg.addColorStop(1, "#030A1C")
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, s, s)

  // Cercle doré décoratif
  ctx.strokeStyle = charter.accent
  ctx.lineWidth = 4
  ctx.setLineDash([8, 12])
  ctx.beginPath()
  ctx.arc(500, 460, 320, 0, Math.PI * 2)
  ctx.stroke()
  ctx.setLineDash([])

  // Grande superellipse centrale
  ctx.save()
  const iconS = 440
  traceSquircle(ctx, 500, 460, iconS / 2, charter.superellipseN)
  ctx.clip()
  const ig = ctx.createLinearGradient(280, 240, 720, 680)
  ig.addColorStop(0, charter.primaryLight)
  ig.addColorStop(1, charter.primary)
  ctx.fillStyle = ig
  ctx.fillRect(280, 240, iconS, iconS)
  drawBrandGlyph(ctx, charter, 488, 474, 0.48)
  ctx.restore()

  // Nom et typographie
  ctx.fillStyle = "#FFFFFF"
  ctx.font = "bold 76px system-ui, sans-serif"
  ctx.textAlign = "center"
  ctx.fillText(brand.name, 500, 810)

  ctx.fillStyle = charter.accent
  ctx.font = "bold 32px system-ui, sans-serif"
  ctx.fillText(brand.tagline, 500, 868)

  ctx.fillStyle = "rgba(255, 255, 255, 0.65)"
  ctx.font = "20px monospace"
  ctx.fillText(brand.website, 500, 920)
}

// ---------------------------------------------------------------------------
// 15. Adaptateur BrandKit & Registre du Moteur de Mise en Page Promotionnelle
// ---------------------------------------------------------------------------

export function fromBrandKit(b: Brand): { brandInfo: BrandInfo; brandCharter: BrandCharter } {
  const brandInfo: BrandInfo = {
    name: b.name || "SOSIDE",
    tagline: b.tagline || "PAY",
    category: b.promoLabel || "Paiements Mobiles & FinTech Sécurisée",
    website: b.handle ? (b.handle.startsWith("@") ? `${b.handle.slice(1)}.com` : b.handle) : "soside.pay",
    email: `contact@${(b.name || "soside").toLowerCase().replace(/[^a-z0-9]/g, "")}.com`,
    phone: "+243 990 000 000",
    slogan: b.tagline || "L'excellence et la vitesse au service de vos transactions.",
    promoBadge: b.promoLabel || "EXCLUSIF",
    features: [
      "Transactions instantanées et sécurisées sans friction",
      "Sécurité biométrique et chiffrement matériel de bout en bout",
      "Écosystème multi-plateforme ouvert et interopérable",
    ],
    metric1: { value: "< 1s", label: "Vitesse d'Exécution" },
    metric2: { value: "99.9%", label: "Disponibilité Cloud" },
    metric3: { value: b.promo || "0% Frais", label: "Sur vos opérations" },
  }

  const iconStyleMap: Record<string, BrandCharter["iconStyle"]> = {
    cards: "cards",
    shield: "shield",
    zap: "zap",
    chip: "chip",
    diamond: "diamond",
    rocket: "rocket",
    store: "store",
    flame: "flame",
  }

  const brandCharter: BrandCharter = {
    primary: b.primary,
    primaryLight: b.secondary,
    secondary: b.secondary,
    accent: b.accent,
    dark: b.dark,
    light: b.light,
    cardStripe: b.secondary,
    fontFamily: b.font === "serif" ? "serif" : "sans",
    superellipseN: b.radius === "sharp" ? 12 : b.radius === "round" ? 2.5 : 5.0,
    glossOpacity: 0.22,
    shadowOpacity: 0.35,
    iconStyle: b.iconStyle && iconStyleMap[b.iconStyle] ? iconStyleMap[b.iconStyle] : "cards",
    customSvgPath: undefined,
    customLogoImage: null,
  }

  return { brandInfo, brandCharter }
}

export interface PromotionalLayoutItem {
  id: string
  name: string
  category: "flyer" | "brochure" | "card" | "outdoor" | "social" | "logo"
  unit: "A4" | "A5" | "Rollup" | "Billboard" | "Square" | "Story" | "Card" | "Banner"
  w: number
  h: number
  renderCanvas: (canvas: HTMLCanvasElement, brand: BrandInfo, charter: BrandCharter) => void
  description: string
}

export const PROMOTIONAL_LAYOUT_ENGINE: PromotionalLayoutItem[] = [
  {
    id: "flyer-a5",
    name: "Flyer Commercial A5",
    category: "flyer",
    unit: "A5",
    w: 1200,
    h: 1600,
    renderCanvas: drawFlyerCanvas,
    description: "Format A5 haute définition avec en-tête, 3 piliers d'offres et pied de page d'action.",
  },
  {
    id: "brochure-corporate-a4",
    name: "Brochure Corporate A4 (2 volets)",
    category: "brochure",
    unit: "A4",
    w: 1400,
    h: 1000,
    renderCanvas: drawBrochureCanvas,
    description: "Brochure professionnelle double page : volet gauche exécutif et panneau droit de performance.",
  },
  {
    id: "brochure-trifold",
    name: "Dépliant Marketing 3 Volets (Tri-Fold)",
    category: "brochure",
    unit: "A4",
    w: 2100,
    h: 1000,
    renderCanvas: drawTrifoldBrochureCanvas,
    description: "Dépliant trois volets avec vision, offre vedette, témoignage de confiance et QR code.",
  },
  {
    id: "rollup-banner",
    name: "Kakémono / Roll-Up Salon (80x200cm)",
    category: "outdoor",
    unit: "Rollup",
    w: 900,
    h: 2000,
    renderCanvas: drawRollupBannerCanvas,
    description: "Bannière verticale pour foires, expositions et points de vente avec accroche haute visibilité.",
  },
  {
    id: "billboard-outdoor",
    name: "Panneau Publicitaire 16:9 (Billboard)",
    category: "outdoor",
    unit: "Billboard",
    w: 1920,
    h: 800,
    renderCanvas: drawBillboardCanvas,
    description: "Affichage grand format ultra-percutant pour campagnes urbaines et autoroutières.",
  },
  {
    id: "business-card-front",
    name: "Carte de Visite (Recto)",
    category: "card",
    unit: "Card",
    w: 880,
    h: 520,
    renderCanvas: (c, b, ch) => drawBusinessCardCanvas(c, b, ch, "front"),
    description: "Face avant épurée avec emblème continu et identité visuelle de marque.",
  },
  {
    id: "business-card-back",
    name: "Carte de Visite (Verso)",
    category: "card",
    unit: "Card",
    w: 880,
    h: 520,
    renderCanvas: (c, b, ch) => drawBusinessCardCanvas(c, b, ch, "back"),
    description: "Face arrière avec coordonnées professionnelles, titre et puce NFC / QR Code.",
  },
  {
    id: "social-post",
    name: "Post Réseaux Sociaux (1:1)",
    category: "social",
    unit: "Square",
    w: 1080,
    h: 1080,
    renderCanvas: drawSocialPostCanvas,
    description: "Post carré universel Instagram / LinkedIn avec lueur néon et bouton d'action.",
  },
  {
    id: "social-story",
    name: "Story & Reel Vertical (9:16)",
    category: "social",
    unit: "Story",
    w: 1080,
    h: 1920,
    renderCanvas: drawStoryCanvas,
    description: "Format mobile vertical 9:16 pour Instagram Story, TikTok et WhatsApp Status.",
  },
  {
    id: "logo-horizontal",
    name: "Logo Horizontal Complet",
    category: "logo",
    unit: "Banner",
    w: 880,
    h: 320,
    renderCanvas: (c, b, ch) => drawHorizontalLogoCanvas(c, b, ch, false),
    description: "Lockup typographique horizontal haute fidélité pour en-têtes et signatures.",
  },
  {
    id: "logo-emblem",
    name: "Emblème de Marque Sceau",
    category: "logo",
    unit: "Square",
    w: 1000,
    h: 1000,
    renderCanvas: drawLogoEmblemCanvas,
    description: "Emblème circulaire et squircle avec couronne dorée et signature de marque.",
  },
  {
    id: "app-icon-squircle",
    name: "Icône d'Application Apple Squircle",
    category: "logo",
    unit: "Square",
    w: 1024,
    h: 1024,
    renderCanvas: (c, _b, ch) => drawAppIconCanvas(c, ch, 1024),
    description: "Icône continue 1024x1024 superellipse de Lamé avec gloss et ombre Apple.",
  },
]
