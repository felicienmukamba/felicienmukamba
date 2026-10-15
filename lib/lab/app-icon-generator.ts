/**
 * Moteur de génération de l'identité SOSIDE PAY et d'icônes d'applications en TypeScript.
 * 
 * Basé sur l'algorithme original de branding/generate.py (grille 1024x1024) :
 * - Géométrie superellipse continue Apple (|x|^n + |y|^n = 1 avec n configurable, défaut 5.0)
 * - Dégradé vertical avec reflet spéculaire 55% et ombres portées douces
 * - Glyphes vectoriels : Cartes de paiement Wallet (cartes empilées, puce dorée, bandes gaufrées),
 *   mascottes technologiques (Robot IA, Léopard du Kivu, Faucon FinTech, Shield-Bot, Fusée),
 *   et combinateur multi-icônes (cartes + bouclier, éclairs, cadenas, etc.) ou vecteur SVG importé.
 * - Logos horizontaux (clair et sombre) avec typographie soignée et interlettrage.
 * - Spécifications de plateformes : iOS (plein cadre), Android adaptatif (safe-zone 66/108,
 *   fond, premier plan, monochrome Android 13+), macOS Big Sur (824/1024 avec ombre),
 *   Web Favicon & icônes PWA maskable.
 */

export type ShapeKind = "poly" | "ellipse" | "circle" | "line" | "rrect"

export type Shape =
  | { kind: "poly"; points: [number, number][]; radius: number; fill: string; stroke?: string }
  | { kind: "ellipse"; rect: [number, number, number, number]; fill: string }
  | { kind: "circle"; center: [number, number]; radius: number; fill: string }
  | { kind: "line"; points: [number, number][]; strokeWidth: number; stroke: string }
  | { kind: "rrect"; rect: [number, number, number, number]; radius: number; fill: string }

export type MascotKind = "none" | "robot" | "leopard" | "falcon" | "shield-bot" | "rocket"

export type PrimaryGlyphType = "wallet-cards" | "mascot" | "icon" | "custom-svg"

export type CombinedIconBadge = "none" | "shield" | "zap" | "lock" | "check" | "sparkles" | "globe" | "nfc"

export interface AppIconTheme {
  wordmark: string
  tagline: string
  filePrefix: string
  // Palette de l'icône
  blueTop: string       // ex: "#347CEC"
  blueBottom: string    // ex: "#0B3D91"
  shadowColor: string   // ex: "#031642"
  accentYellow: string  // ex: "#FFCC00" puce
  cardWhite: string     // ex: "#FFFFFF"
  cardBack: string      // ex: "#A8C8FF"
  stripeColor: string   // ex: "#CDDDF7"
  // Typographie & logo horizontal
  brandAccentLight: string // ex: "#0B3D91"
  brandAccentDark: string  // ex: "#4C8DFF"
  inkLight: string         // ex: "#1D1D1F"
  inkDark: string          // ex: "#F5F5F7"
  // Paramètres géométriques
  superellipseN: number    // 5.0 Apple
  glossOpacity: number     // 0.20
  shadowOpacity: number    // 0.35
  glyphScale: number       // 1.06
  dx: number               // -28
  dy: number               // 32
  // Glyphes & mascottes
  primaryType: PrimaryGlyphType
  mascot: MascotKind
  iconName: string
  badge: CombinedIconBadge
  customSvgPath?: string
}

export const SIZE = 1024
export const LOGO_W = 880
export const ADAPTIVE_SCALE = 0.64
export const MAC_SCALE = 824 / 1024

export const DEFAULT_THEME: AppIconTheme = {
  wordmark: "SOSIDE",
  tagline: "PAY",
  filePrefix: "soside-pay",
  blueTop: "#347CEC",
  blueBottom: "#0B3D91",
  shadowColor: "#031642",
  accentYellow: "#FFCC00",
  cardWhite: "#FFFFFF",
  cardBack: "#A8C8FF",
  stripeColor: "#CDDDF7",
  brandAccentLight: "#0B3D91",
  brandAccentDark: "#4C8DFF",
  inkLight: "#1D1D1F",
  inkDark: "#F5F5F7",
  superellipseN: 5.0,
  glossOpacity: 0.2,
  shadowOpacity: 0.35,
  glyphScale: 1.06,
  dx: -28,
  dy: 32,
  primaryType: "wallet-cards",
  mascot: "robot",
  iconName: "CreditCard",
  badge: "nfc",
}

export const THEME_PRESETS: { name: string; theme: Partial<AppIconTheme> }[] = [
  {
    name: "SOSIDE Pay Classic",
    theme: {
      blueTop: "#347CEC",
      blueBottom: "#0B3D91",
      shadowColor: "#031642",
      accentYellow: "#FFCC00",
      cardBack: "#A8C8FF",
      cardWhite: "#FFFFFF",
      stripeColor: "#CDDDF7",
      brandAccentLight: "#0B3D91",
      brandAccentDark: "#4C8DFF",
    },
  },
  {
    name: "Kivu Emerald",
    theme: {
      blueTop: "#10B981",
      blueBottom: "#047857",
      shadowColor: "#022C22",
      accentYellow: "#F59E0B",
      cardBack: "#A7F3D0",
      cardWhite: "#FFFFFF",
      stripeColor: "#D1FAE5",
      brandAccentLight: "#047857",
      brandAccentDark: "#34D399",
    },
  },
  {
    name: "Obsidian Purple",
    theme: {
      blueTop: "#8B5CF6",
      blueBottom: "#4C1D95",
      shadowColor: "#1E1035",
      accentYellow: "#FBBF24",
      cardBack: "#DDD6FE",
      cardWhite: "#FFFFFF",
      stripeColor: "#EDE9FE",
      brandAccentLight: "#5B21B6",
      brandAccentDark: "#A78BFA",
    },
  },
  {
    name: "Crimson Express",
    theme: {
      blueTop: "#F43F5E",
      blueBottom: "#9F1239",
      shadowColor: "#3D0315",
      accentYellow: "#FDE047",
      cardBack: "#FECDD3",
      cardWhite: "#FFFFFF",
      stripeColor: "#FFE4E6",
      brandAccentLight: "#9F1239",
      brandAccentDark: "#FB7185",
    },
  },
  {
    name: "Cyber Gold",
    theme: {
      blueTop: "#F59E0B",
      blueBottom: "#B45309",
      shadowColor: "#451A03",
      accentYellow: "#FBBF24",
      cardBack: "#FDE68A",
      cardWhite: "#FFFFFF",
      stripeColor: "#FEF3C7",
      brandAccentLight: "#B45309",
      brandAccentDark: "#FBBF24",
    },
  },
  {
    name: "Midnight Stealth",
    theme: {
      blueTop: "#334155",
      blueBottom: "#0F172A",
      shadowColor: "#020617",
      accentYellow: "#38BDF8",
      cardBack: "#94A3B8",
      cardWhite: "#F8FAFC",
      stripeColor: "#CBD5E1",
      brandAccentLight: "#0F172A",
      brandAccentDark: "#94A3B8",
    },
  },
]

/**
 * Calcule les points du contour superellipse |x|^n + |y|^n = 1 (Coins continus Apple).
 */
export function squircle(
  size: number = SIZE,
  n: number = 5.0,
  steps: number = 360,
  inset: number = 0,
  offset: number = 0,
): [number, number][] {
  const a = size / 2 - inset
  const c = size / 2 + offset
  const pts: [number, number][] = []
  for (let i = 0; i < steps; i++) {
    const t = (2 * Math.PI * i) / steps
    const ct = Math.cos(t)
    const st = Math.sin(t)
    const signX = ct < 0 ? -1 : 1
    const signY = st < 0 ? -1 : 1
    const x = a * signX * Math.pow(Math.abs(ct), 2 / n)
    const y = a * signY * Math.pow(Math.abs(st), 2 / n)
    pts.push([c + x, c + y])
  }
  return pts
}

/**
 * Rectangle tourné centré en (cx, cy) avec largeur w, hauteur h et angle deg.
 */
export function rotatedRect(
  cx: number,
  cy: number,
  w: number,
  h: number,
  deg: number,
): [number, number][] {
  const t = (deg * Math.PI) / 180
  const c = Math.cos(t)
  const s = Math.sin(t)
  const corners: [number, number][] = [
    [-w / 2, -h / 2],
    [w / 2, -h / 2],
    [w / 2, h / 2],
    [-w / 2, h / 2],
  ]
  return corners.map(([x, y]) => [cx + x * c - y * s, cy + x * s + y * c])
}

function translateShape(shape: Shape, dx: number, dy: number): Shape {
  switch (shape.kind) {
    case "poly":
      return { ...shape, points: shape.points.map(([x, y]) => [x + dx, y + dy]) }
    case "line":
      return { ...shape, points: shape.points.map(([x, y]) => [x + dx, y + dy]) }
    case "circle":
      return { ...shape, center: [shape.center[0] + dx, shape.center[1] + dy] }
    case "ellipse":
      return {
        ...shape,
        rect: [shape.rect[0] + dx, shape.rect[1] + dy, shape.rect[2] + dx, shape.rect[3] + dy],
      }
    case "rrect":
      return {
        ...shape,
        rect: [shape.rect[0] + dx, shape.rect[1] + dy, shape.rect[2] + dx, shape.rect[3] + dy],
      }
  }
}

function scaleShape(
  shape: Shape,
  factor: number,
  cx: number = SIZE / 2,
  cy: number = SIZE / 2,
): Shape {
  const scalePt = (x: number, y: number): [number, number] => [
    cx + (x - cx) * factor,
    cy + (y - cy) * factor,
  ]
  switch (shape.kind) {
    case "poly":
      return {
        ...shape,
        points: shape.points.map(([x, y]) => scalePt(x, y)),
        radius: shape.radius * factor,
      }
    case "line":
      return {
        ...shape,
        points: shape.points.map(([x, y]) => scalePt(x, y)),
        strokeWidth: shape.strokeWidth * factor,
      }
    case "circle":
      return {
        ...shape,
        center: scalePt(shape.center[0], shape.center[1]),
        radius: shape.radius * factor,
      }
    case "ellipse": {
      const [p1x, p1y] = scalePt(shape.rect[0], shape.rect[1])
      const [p2x, p2y] = scalePt(shape.rect[2], shape.rect[3])
      return { ...shape, rect: [p1x, p1y, p2x, p2y] }
    }
    case "rrect": {
      const [p1x, p1y] = scalePt(shape.rect[0], shape.rect[1])
      const [p2x, p2y] = scalePt(shape.rect[2], shape.rect[3])
      return {
        ...shape,
        rect: [p1x, p1y, p2x, p2y],
        radius: shape.radius * factor,
      }
    }
  }
}

/**
 * Glyphe original SOSIDE PAY : Deux cartes bancaires empilées.
 */
export function walletCardsGlyph(theme: AppIconTheme): Shape[] {
  const r = 40
  const shapes: Shape[] = [
    // Carte arrière inclinée à -12 degrés
    {
      kind: "poly",
      points: rotatedRect(560, 430, 540 - 2 * r, 336 - 2 * r, -12),
      radius: r,
      fill: theme.cardBack,
    },
    // Carte avant blanche
    {
      kind: "rrect",
      rect: [224, 404, 784, 748],
      radius: 44,
      fill: theme.cardWhite,
    },
    // Puce dorée / puce EMV
    {
      kind: "rrect",
      rect: [290, 476, 392, 552],
      radius: 18,
      fill: theme.accentYellow,
    },
    // Numéro de carte (lignes stylisées)
    {
      kind: "line",
      points: [
        [306, 650],
        [402, 650],
      ],
      strokeWidth: 26,
      stroke: theme.stripeColor,
    },
    {
      kind: "line",
      points: [
        [446, 650],
        [542, 650],
      ],
      strokeWidth: 26,
      stroke: theme.stripeColor,
    },
    {
      kind: "line",
      points: [
        [586, 650],
        [682, 650],
      ],
      strokeWidth: 26,
      stroke: theme.stripeColor,
    },
  ]

  return shapes.map((s) =>
    scaleShape(translateShape(s, theme.dx, theme.dy), theme.glyphScale),
  )
}

/**
 * Mascottes géométriques (Robot IA, Léopard du Kivu, Faucon, Shield-Bot, Fusée)
 */
export function mascotGlyph(kind: MascotKind, theme: AppIconTheme): Shape[] {
  const shapes: Shape[] = []
  const white = theme.cardWhite
  const yellow = theme.accentYellow
  const secondary = theme.cardBack

  if (kind === "robot") {
    // Tête robotique
    shapes.push({ kind: "rrect", rect: [312, 360, 712, 720], radius: 64, fill: white })
    // Oreilles écouteurs / transducteurs
    shapes.push({ kind: "rrect", rect: [260, 480, 312, 600], radius: 24, fill: secondary })
    shapes.push({ kind: "rrect", rect: [712, 480, 764, 600], radius: 24, fill: secondary })
    // Antenne
    shapes.push({ kind: "line", points: [[512, 360], [512, 280]], strokeWidth: 24, stroke: white })
    shapes.push({ kind: "circle", center: [512, 260], radius: 36, fill: yellow })
    // Écran visière sombre / yeux expressifs
    shapes.push({ kind: "rrect", rect: [360, 430, 664, 570], radius: 36, fill: theme.shadowColor })
    // Yeux LED ronds
    shapes.push({ kind: "circle", center: [430, 500], radius: 32, fill: yellow })
    shapes.push({ kind: "circle", center: [594, 500], radius: 32, fill: yellow })
    // Reflet yeux
    shapes.push({ kind: "circle", center: [440, 492], radius: 10, fill: white })
    shapes.push({ kind: "circle", center: [604, 492], radius: 10, fill: white })
    // Sourire robotique ou badge puce
    shapes.push({ kind: "line", points: [[440, 640], [584, 640]], strokeWidth: 18, stroke: secondary })
  } else if (kind === "leopard") {
    // Tête léopard / félin stylisée
    shapes.push({ kind: "poly", points: [[512, 740], [330, 480], [400, 330], [512, 420], [624, 330], [694, 480]], radius: 36, fill: white })
    // Oreilles internes
    shapes.push({ kind: "poly", points: [[380, 350], [420, 390], [350, 440]], radius: 16, fill: secondary })
    shapes.push({ kind: "poly", points: [[644, 350], [604, 390], [674, 440]], radius: 16, fill: secondary })
    // Yeux félin émeraude / or
    shapes.push({ kind: "ellipse", rect: [410, 490, 470, 540], fill: yellow })
    shapes.push({ kind: "ellipse", rect: [554, 490, 614, 540], fill: yellow })
    // Pupilles
    shapes.push({ kind: "ellipse", rect: [435, 495, 445, 535], fill: theme.shadowColor })
    shapes.push({ kind: "ellipse", rect: [579, 495, 589, 535], fill: theme.shadowColor })
    // Truffe et babines
    shapes.push({ kind: "poly", points: [[512, 620], [480, 580], [544, 580]], radius: 12, fill: theme.shadowColor })
    shapes.push({ kind: "line", points: [[512, 620], [512, 650]], strokeWidth: 14, stroke: theme.shadowColor })
    shapes.push({ kind: "line", points: [[470, 670], [512, 650], [554, 670]], strokeWidth: 14, stroke: theme.shadowColor })
  } else if (kind === "falcon") {
    // Silhouette de rapace / faucon de vitesse
    shapes.push({ kind: "poly", points: [[512, 280], [680, 440], [740, 680], [512, 750], [284, 680], [344, 440]], radius: 40, fill: white })
    // Ailes en creux
    shapes.push({ kind: "poly", points: [[512, 380], [640, 500], [580, 660], [512, 610], [444, 660], [384, 500]], radius: 24, fill: secondary })
    // Bec doré
    shapes.push({ kind: "poly", points: [[512, 610], [470, 520], [554, 520]], radius: 16, fill: yellow })
    // Yeux perçants
    shapes.push({ kind: "circle", center: [450, 470], radius: 22, fill: theme.shadowColor })
    shapes.push({ kind: "circle", center: [574, 470], radius: 22, fill: theme.shadowColor })
    shapes.push({ kind: "circle", center: [454, 466], radius: 7, fill: white })
    shapes.push({ kind: "circle", center: [578, 466], radius: 7, fill: white })
  } else if (kind === "shield-bot") {
    // Grand bouclier cyber
    shapes.push({ kind: "poly", points: [[512, 760], [720, 580], [720, 360], [512, 300], [304, 360], [304, 580]], radius: 44, fill: white })
    // Bouclier intérieur
    shapes.push({ kind: "poly", points: [[512, 700], [660, 550], [660, 400], [512, 355], [364, 400], [364, 550]], radius: 30, fill: secondary })
    // Éclair central ou cœur cyber
    shapes.push({ kind: "poly", points: [[520, 380], [440, 520], [504, 520], [480, 650], [580, 490], [516, 490]], radius: 14, fill: yellow })
  } else if (kind === "rocket") {
    // Corps de la fusée
    shapes.push({ kind: "poly", points: [[512, 260], [620, 460], [600, 660], [424, 660], [404, 460]], radius: 36, fill: white })
    // Ailerons latéraux
    shapes.push({ kind: "poly", points: [[404, 560], [320, 680], [420, 680]], radius: 20, fill: secondary })
    shapes.push({ kind: "poly", points: [[620, 560], [704, 680], [604, 680]], radius: 20, fill: secondary })
    // Hublot
    shapes.push({ kind: "circle", center: [512, 450], radius: 64, fill: theme.shadowColor })
    shapes.push({ kind: "circle", center: [512, 450], radius: 48, fill: secondary })
    shapes.push({ kind: "circle", center: [512, 450], radius: 36, fill: yellow })
    // Tuyère et flamme
    shapes.push({ kind: "rrect", rect: [462, 660, 562, 700], radius: 14, fill: secondary })
    shapes.push({ kind: "poly", points: [[512, 790], [460, 700], [564, 700]], radius: 18, fill: yellow })
  }

  return shapes.map((s) => scaleShape(s, theme.glyphScale))
}

/**
 * Badge combiné qui s'ajoute en surimpression ou en coin (ex: bouclier, éclair, cadenas, NFC wave)
 */
export function badgeShapes(badge: CombinedIconBadge, theme: AppIconTheme): Shape[] {
  if (badge === "none") return []
  const yellow = theme.accentYellow
  const white = theme.cardWhite

  const bx = 710
  const by = 350
  const shapes: Shape[] = []

  // Fond rond du badge
  shapes.push({ kind: "circle", center: [bx, by], radius: 100, fill: theme.blueBottom })
  shapes.push({ kind: "circle", center: [bx, by], radius: 88, fill: white })

  if (badge === "shield") {
    shapes.push({ kind: "poly", points: [[bx, by + 50], [bx + 40, by + 10], [bx + 40, by - 40], [bx, by - 55], [bx - 40, by - 40], [bx - 40, by + 10]], radius: 12, fill: yellow })
  } else if (badge === "zap") {
    shapes.push({ kind: "poly", points: [[bx + 5, by - 45], [bx - 30, by], [bx, by], [bx - 8, by + 45], [bx + 30, by - 5], [bx + 2, by - 5]], radius: 8, fill: yellow })
  } else if (badge === "lock") {
    shapes.push({ kind: "rrect", rect: [bx - 36, by - 10, bx + 36, by + 45], radius: 12, fill: yellow })
    shapes.push({ kind: "line", points: [[bx - 20, by - 10], [bx - 20, by - 36], [bx + 20, by - 36], [bx + 20, by - 10]], strokeWidth: 12, stroke: yellow })
  } else if (badge === "check") {
    shapes.push({ kind: "line", points: [[bx - 32, by], [bx - 10, by + 24], [bx + 34, by - 26]], strokeWidth: 18, stroke: yellow })
  } else if (badge === "sparkles") {
    shapes.push({ kind: "poly", points: [[bx, by - 45], [bx + 12, by - 12], [bx + 45, by], [bx + 12, by + 12], [bx, by + 45], [bx - 12, by + 12], [bx - 45, by], [bx - 12, by - 12]], radius: 6, fill: yellow })
  } else if (badge === "nfc") {
    shapes.push({ kind: "line", points: [[bx - 26, by + 24], [bx + 20, by - 24]], strokeWidth: 10, stroke: yellow })
    // arcs stylisés
    shapes.push({ kind: "ellipse", rect: [bx - 40, by - 40, bx + 40, by + 40], fill: "none" })
    shapes.push({ kind: "circle", center: [bx, by], radius: 24, fill: yellow })
  }

  return shapes
}

/**
 * Renvoie l'ensemble des formes composant le glyphe actif
 */
export function getActiveGlyphShapes(theme: AppIconTheme): Shape[] {
  let base: Shape[] = []
  if (theme.primaryType === "wallet-cards") {
    base = walletCardsGlyph(theme)
  } else if (theme.primaryType === "mascot") {
    base = mascotGlyph(theme.mascot, theme)
  } else {
    // Par défaut, wallet cards
    base = walletCardsGlyph(theme)
  }

  if (theme.badge !== "none") {
    base = [...base, ...badgeShapes(theme.badge, theme)]
  }

  return base
}

// ----------------------------------------------------------------------------- SVG RENDERER

function shapeToSvg(shape: Shape): string {
  switch (shape.kind) {
    case "poly": {
      const pts = shape.points.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ")
      const stroke = shape.radius
        ? ` stroke="${shape.fill}" stroke-width="${(2 * shape.radius).toFixed(1)}" stroke-linejoin="round"`
        : ""
      return `<polygon points="${pts}" fill="${shape.fill}"${stroke}/>`
    }
    case "ellipse": {
      const [x1, y1, x2, y2] = shape.rect
      const cx = (x1 + x2) / 2
      const cy = (y1 + y2) / 2
      const rx = (x2 - x1) / 2
      const ry = (y2 - y1) / 2
      return `<ellipse cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" rx="${rx.toFixed(1)}" ry="${ry.toFixed(1)}" fill="${shape.fill}"/>`
    }
    case "circle":
      return `<circle cx="${shape.center[0].toFixed(1)}" cy="${shape.center[1].toFixed(1)}" r="${shape.radius.toFixed(1)}" fill="${shape.fill}"/>`
    case "line": {
      const pts = shape.points.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ")
      return `<polyline points="${pts}" fill="none" stroke="${shape.stroke}" stroke-width="${shape.strokeWidth.toFixed(1)}" stroke-linecap="round" stroke-linejoin="round"/>`
    }
    case "rrect": {
      const [x1, y1, x2, y2] = shape.rect
      const w = x2 - x1
      const h = y2 - y1
      return `<rect x="${x1.toFixed(1)}" y="${y1.toFixed(1)}" width="${w.toFixed(1)}" height="${h.toFixed(1)}" rx="${shape.radius.toFixed(1)}" fill="${shape.fill}"/>`
    }
  }
}

/**
 * Corps SVG commun du carré superellipse.
 */
export function markSvgBody(
  theme: AppIconTheme,
  prefix: string = "sp",
  customShapes?: Shape[],
): string {
  const pts = squircle(SIZE, theme.superellipseN, 240)
  const path = "M" + pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" L") + " Z"
  const shapes = customShapes || getActiveGlyphShapes(theme)

  const defs = [
    `<defs>`,
    `<linearGradient id="${prefix}-bg" x1="0" y1="0" x2="0.3" y2="1">`,
    `<stop offset="0" stop-color="${theme.blueTop}"/>`,
    `<stop offset="1" stop-color="${theme.blueBottom}"/>`,
    `</linearGradient>`,
    `<linearGradient id="${prefix}-gloss" x1="0" y1="0" x2="0" y2="1">`,
    `<stop offset="0" stop-color="#FFFFFF" stop-opacity="${theme.glossOpacity.toFixed(2)}"/>`,
    `<stop offset="0.55" stop-color="#FFFFFF" stop-opacity="0"/>`,
    `</linearGradient>`,
    `<filter id="${prefix}-shadow" x="-20%" y="-20%" width="140%" height="140%">`,
    `<feDropShadow dx="0" dy="14" stdDeviation="16" flood-color="${theme.shadowColor}" flood-opacity="${theme.shadowOpacity.toFixed(2)}"/>`,
    `</filter>`,
    `<clipPath id="${prefix}-clip"><path d="${path}"/></clipPath>`,
    `</defs>`,
  ].join("")

  const body = [
    defs,
    `<path d="${path}" fill="url(#${prefix}-bg)"/>`,
    `<rect width="${SIZE}" height="${SIZE}" fill="url(#${prefix}-gloss)" clip-path="url(#${prefix}-clip)"/>`,
    `<g filter="url(#${prefix}-shadow)" clip-path="url(#${prefix}-clip)">`,
    shapes.map(shapeToSvg).join(""),
    theme.customSvgPath
      ? `<g transform="translate(256, 256) scale(0.5)"><path d="${theme.customSvgPath}" fill="${theme.cardWhite}"/></g>`
      : "",
    `</g>`,
  ].join("")

  return body
}

/**
 * Icône d'application autonome SVG (1024x1024).
 */
export function generateMarkSvg(theme: AppIconTheme): string {
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SIZE} ${SIZE}" width="${SIZE}" height="${SIZE}" role="img" aria-label="${theme.wordmark} ${theme.tagline}">`,
    markSvgBody(theme, "sp_mark"),
    `</svg>`,
  ].join("\n")
}

/**
 * Logo horizontal (880x320) avec l'icône à gauche et le nom de marque à droite.
 */
export function generateLogoSvg(theme: AppIconTheme, dark: boolean = false): string {
  const word = dark ? theme.inkDark : theme.inkLight
  const accent = dark ? theme.brandAccentDark : theme.brandAccentLight
  const prefix = `lg_${dark ? "dark" : "light"}`
  const font = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${LOGO_W} 320" width="${LOGO_W}" height="320" role="img" aria-label="${theme.wordmark} ${theme.tagline}">`,
    `<g transform="translate(16 16) scale(0.28125)">`,
    markSvgBody(theme, prefix),
    `</g>`,
    `<text x="352" y="176" font-family="${font}" font-size="132" font-weight="700" letter-spacing="1" fill="${word}">${theme.wordmark}</text>`,
    `<text x="356" y="262" font-family="${font}" font-size="72" font-weight="500" letter-spacing="30" fill="${accent}">${theme.tagline}</text>`,
    `</svg>`,
  ].join("\n")
}

/**
 * Calque Android Adaptatif : Premier plan (zone sécurisée 66/108).
 */
export function generateAdaptiveForegroundSvg(theme: AppIconTheme, monochrome: boolean = false): string {
  const shapes = getActiveGlyphShapes(theme).map((s) => scaleShape(s, ADAPTIVE_SCALE))
  const prefix = monochrome ? "sp_af_mono" : "sp_af_color"

  let renderedShapes = ""
  if (monochrome) {
    // Tout en blanc pour le thème Android 13+
    const monoShapes: Shape[] = shapes.map((s): Shape => {
      if (s.kind === "line") {
        return { ...s, stroke: "#FFFFFF" }
      }
      if (s.kind === "poly") {
        return { ...s, fill: "#FFFFFF", stroke: s.radius ? "#FFFFFF" : undefined }
      }
      return { ...s, fill: "#FFFFFF" }
    })
    renderedShapes = monoShapes.map(shapeToSvg).join("")
  } else {
    renderedShapes = shapes.map(shapeToSvg).join("")
  }

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SIZE} ${SIZE}" width="${SIZE}" height="${SIZE}">`,
    `<defs>`,
    `<filter id="${prefix}-shadow" x="-20%" y="-20%" width="140%" height="140%">`,
    `<feDropShadow dx="0" dy="14" stdDeviation="16" flood-color="${theme.shadowColor}" flood-opacity="${theme.shadowOpacity.toFixed(2)}"/>`,
    `</filter>`,
    `</defs>`,
    `<g ${monochrome ? "" : `filter="url(#${prefix}-shadow)"`}>`,
    renderedShapes,
    `</g>`,
    `</svg>`,
  ].join("\n")
}

/**
 * Calque Android Adaptatif : Arrière-plan (dégradé complet sans coins).
 */
export function generateAdaptiveBackgroundSvg(theme: AppIconTheme): string {
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SIZE} ${SIZE}" width="${SIZE}" height="${SIZE}">`,
    `<defs>`,
    `<linearGradient id="sp_abg" x1="0" y1="0" x2="0.3" y2="1">`,
    `<stop offset="0" stop-color="${theme.blueTop}"/>`,
    `<stop offset="1" stop-color="${theme.blueBottom}"/>`,
    `</linearGradient>`,
    `</defs>`,
    `<rect width="${SIZE}" height="${SIZE}" fill="url(#sp_abg)"/>`,
    `</svg>`,
  ].join("\n")
}

/**
 * Icône macOS Big Sur : squircle réduit au gabarit 824/1024 centré avec ombre portée réaliste.
 */
export function generateMacOsSvg(theme: AppIconTheme): string {
  const scale = MAC_SCALE
  const offset = ((1 - scale) * SIZE) / 2

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SIZE} ${SIZE}" width="${SIZE}" height="${SIZE}">`,
    `<defs>`,
    `<filter id="mac-drop-shadow" x="-20%" y="-10%" width="140%" height="140%">`,
    `<feDropShadow dx="0" dy="16" stdDeviation="22" flood-color="#000000" flood-opacity="0.35"/>`,
    `</filter>`,
    `</defs>`,
    `<g filter="url(#mac-drop-shadow)">`,
    `<g transform="translate(${offset.toFixed(1)}, ${(offset + 8).toFixed(1)}) scale(${scale.toFixed(4)})">`,
    markSvgBody(theme, "mac_mark"),
    `</g>`,
    `</g>`,
    `</svg>`,
  ].join("\n")
}

/**
 * Fichier Android Vector XML ic_launcher.xml
 */
export function generateAdaptiveXml(): string {
  return `<?xml version="1.0" encoding="utf-8"?>
<!-- Generated by SOSIDE PAY App Icon Studio (TypeScript Engine) -->
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
    <background android:drawable="@mipmap/ic_launcher_background" />
    <foreground android:drawable="@mipmap/ic_launcher_foreground" />
    <monochrome android:drawable="@mipmap/ic_launcher_monochrome" />
</adaptive-icon>`
}

/**
 * Manifeste Xcode iOS / macOS AppIcon Contents.json
 */
export function generateIosContentsJson(filenamePrefix: string = "app-icon"): string {
  return JSON.stringify(
    {
      images: [
        { size: "20x20", idiom: "iphone", filename: `${filenamePrefix}-20@2x.png`, scale: "2x" },
        { size: "20x20", idiom: "iphone", filename: `${filenamePrefix}-20@3x.png`, scale: "3x" },
        { size: "29x29", idiom: "iphone", filename: `${filenamePrefix}-29@2x.png`, scale: "2x" },
        { size: "29x29", idiom: "iphone", filename: `${filenamePrefix}-29@3x.png`, scale: "3x" },
        { size: "40x40", idiom: "iphone", filename: `${filenamePrefix}-40@2x.png`, scale: "2x" },
        { size: "40x40", idiom: "iphone", filename: `${filenamePrefix}-40@3x.png`, scale: "3x" },
        { size: "60x60", idiom: "iphone", filename: `${filenamePrefix}-60@2x.png`, scale: "2x" },
        { size: "60x60", idiom: "iphone", filename: `${filenamePrefix}-60@3x.png`, scale: "3x" },
        { size: "20x20", idiom: "ipad", filename: `${filenamePrefix}-ipad-20@1x.png`, scale: "1x" },
        { size: "20x20", idiom: "ipad", filename: `${filenamePrefix}-ipad-20@2x.png`, scale: "2x" },
        { size: "29x29", idiom: "ipad", filename: `${filenamePrefix}-ipad-29@1x.png`, scale: "1x" },
        { size: "29x29", idiom: "ipad", filename: `${filenamePrefix}-ipad-29@2x.png`, scale: "2x" },
        { size: "40x40", idiom: "ipad", filename: `${filenamePrefix}-ipad-40@1x.png`, scale: "1x" },
        { size: "40x40", idiom: "ipad", filename: `${filenamePrefix}-ipad-40@2x.png`, scale: "2x" },
        { size: "76x76", idiom: "ipad", filename: `${filenamePrefix}-ipad-76@1x.png`, scale: "1x" },
        { size: "76x76", idiom: "ipad", filename: `${filenamePrefix}-ipad-76@2x.png`, scale: "2x" },
        { size: "83.5x83.5", idiom: "ipad", filename: `${filenamePrefix}-ipad-83.5@2x.png`, scale: "2x" },
        { size: "1024x1024", idiom: "ios-marketing", filename: `${filenamePrefix}-1024.png`, scale: "1x" },
      ],
      info: { version: 1, author: "xcode" },
    },
    null,
    2,
  )
}
