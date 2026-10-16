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
  iconStyle: "cards" | "shield" | "zap" | "chip" | "diamond" | "rocket" | "custom"
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
