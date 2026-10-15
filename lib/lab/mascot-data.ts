/**
 * Définitions et compilateur de prompts pour le Générateur de Mascottes (Mascot Generator).
 */

export type MascotStyle = "3d" | "minimalist" | "sketch" | "cyberpunk" | "chibi" | "retro-badge"

export type MascotArchetype = "robot" | "leopard" | "falcon" | "fox" | "owl" | "bear" | "dragon"

export type MascotTrait = "innovative" | "energetic" | "fearless" | "zen" | "playful" | "protective"

export type MascotPalette = "soside" | "emerald" | "purple" | "crimson" | "monochrome"

export type MascotBackground = "studio-gradient" | "circular-badge" | "dark-grid" | "clean-paper"

export interface MascotConfig {
  name: string
  style: MascotStyle
  archetype: MascotArchetype
  traits: MascotTrait[]
  palette: MascotPalette
  background: MascotBackground
  accessories: string[]
  customNotes?: string
}

export interface MascotShowcase {
  id: string
  title: string
  style: MascotStyle
  archetype: MascotArchetype
  traits: MascotTrait[]
  palette: MascotPalette
  imageSrc: string
  prompt: string
  backstory: string
}

export const MASCOT_STYLES: { id: MascotStyle; name: string; nameEn: string; desc: string; icon: string }[] = [
  {
    id: "3d",
    name: "Rendu 3D Pixar / Clay",
    nameEn: "3D Pixar / Clay Render",
    desc: "Volumes lisses, textures céramiques & métalliques, éclairage de studio doux.",
    icon: "Cube",
  },
  {
    id: "minimalist",
    name: "Minimaliste & Vectoriel",
    nameEn: "Minimalist & Flat Vector",
    desc: "Formes géométriques pures, aplats de couleurs, lignes précises, style logo de marque.",
    icon: "Shapes",
  },
  {
    id: "sketch",
    name: "Croquis & Encre d'Art",
    nameEn: "Sketch & Ink Watercolor",
    desc: "Trait de crayon dynamique, hachures manuelles et rehauts d'aquarelle texturée.",
    icon: "PenTool",
  },
  {
    id: "cyberpunk",
    name: "Cyberpunk & Néon",
    nameEn: "Cyberpunk & Neon Glow",
    desc: "Circuits luminescents, visière HUD holographique, armure technologique sombre.",
    icon: "Zap",
  },
  {
    id: "chibi",
    name: "Chibi Kawaii Japonais",
    nameEn: "Chibi Anime Kawaii",
    desc: "Grands yeux expressifs, proportions mignonnes, poses dynamiques et attachantes.",
    icon: "Sparkles",
  },
  {
    id: "retro-badge",
    name: "Badge Rétro & Vintage",
    nameEn: "Retro Vintage Badge",
    desc: "Emblème circulaire typographique des années 70-80, grain d'impression vintage.",
    icon: "Award",
  },
]

export const MASCOT_ARCHETYPES: { id: MascotArchetype; name: string; nameEn: string; symbol: string }[] = [
  { id: "robot", name: "Robot IA & Bot Tech", nameEn: "Tech Robot & AI Bot", symbol: "🤖" },
  { id: "leopard", name: "Léopard du Kivu", nameEn: "Kivu Panther & Leopard", symbol: "🐆" },
  { id: "falcon", name: "Faucon Visionnaire", nameEn: "Visionary Falcon & Eagle", symbol: "🦅" },
  { id: "fox", name: "Renard Cybernétique", nameEn: "Cyber Fox", symbol: "🦊" },
  { id: "owl", name: "Chouette Ingénieur", nameEn: "Engineer Owl", symbol: "🦉" },
  { id: "bear", name: "Ours Gardien Sécurité", nameEn: "Guardian Bear", symbol: "🐻" },
  { id: "dragon", name: "Dragon d'Innovation", nameEn: "Innovation Dragon", symbol: "🐉" },
]

export const MASCOT_TRAITS: { id: MascotTrait; name: string; nameEn: string; desc: string }[] = [
  {
    id: "innovative",
    name: "Innovant & Analytique",
    nameEn: "Innovative & Analytical",
    desc: "Regard vif, lunettes HUD holographiques, esprit logique et visionnaire.",
  },
  {
    id: "energetic",
    name: "Énergique & Bienveillant",
    nameEn: "Energetic & Friendly",
    desc: "Grand sourire chaleureux, posture accueillante, bras ouverts ou pouce levé.",
  },
  {
    id: "fearless",
    name: "Audacieux & Protecteur",
    nameEn: "Bold & Fearless",
    desc: "Cape de héros, posture assurée, regard déterminé face aux défis techniques.",
  },
  {
    id: "zen",
    name: "Calme & Maîtrisé",
    nameEn: "Calm & Zen",
    desc: "Expression sereine, posture équilibrée, orbes de données flottantes en harmonie.",
  },
  {
    id: "playful",
    name: "Espiègle & Agile",
    nameEn: "Playful & Mischievous",
    desc: "Clin d'œil malicieux, inclinaison dynamique, tenant un jeton numérique ou un éclair.",
  },
  {
    id: "protective",
    name: "Gardien Cryptographique",
    nameEn: "Cryptographic Guardian",
    desc: "Plastron renforcé, posture vigilante, symbole de cadenas ou bouclier impénétrable.",
  },
]

export const MASCOT_PALETTES: { id: MascotPalette; name: string; colors: [string, string, string] }[] = [
  { id: "soside", name: "SOSIDE Royal & Or", colors: ["#0B3D91", "#347CEC", "#FFCC00"] },
  { id: "emerald", name: "Émeraude du Kivu", colors: ["#047857", "#10B981", "#F59E0B"] },
  { id: "purple", name: "Obsidienne & Violet", colors: ["#4C1D95", "#8B5CF6", "#FDE047"] },
  { id: "crimson", name: "Crimson & Corail", colors: ["#9F1239", "#F43F5E", "#FDE047"] },
  { id: "monochrome", name: "Onyx & Platine", colors: ["#0F172A", "#64748B", "#F8FAFC"] },
]

export const DEFAULT_MASCOT_CONFIG: MascotConfig = {
  name: "Sparky",
  style: "3d",
  archetype: "robot",
  traits: ["innovative", "energetic"],
  palette: "soside",
  background: "studio-gradient",
  accessories: ["Puce EMV dorée", "Écran LED interactif"],
}

/**
 * Galerie des 8 avatars de mascottes haute fidélité générés par l'outil image_generation
 */
export const SHOWCASE_MASCOTS: MascotShowcase[] = [
  {
    id: "showcase-robot-3d",
    title: "Spark Bot · Assistant FinTech",
    style: "3d",
    archetype: "robot",
    traits: ["innovative", "energetic"],
    palette: "soside",
    imageSrc: "/images/mascots/mascot-3d-robot.jpg",
    prompt:
      "A cute friendly 3D Pixar-style tech robot mascot avatar with expressive glowing cyan LED eyes, polished white ceramic body with golden accents, holding a glowing digital coin, soft studio lighting, vibrant gradient background, 1:1 aspect ratio, 3D render, high quality, avatar profile.",
    backstory:
      "Mascotte officielle de l'écosystème SOSIDE PAY. Conçu pour guider les commerçants et utilisateurs à travers les transactions sécurisées avec le sourire.",
  },
  {
    id: "showcase-fox-minimalist",
    title: "Geo Fox · Minimaliste & Origami",
    style: "minimalist",
    archetype: "fox",
    traits: ["innovative", "playful"],
    palette: "soside",
    imageSrc: "/images/mascots/mascot-minimalist-fox.jpg",
    prompt:
      "Minimalist vector mascot avatar of a clever geometric origami fox, clean elegant lines, flat bold colors with teal and coral tones, friendly approachable expression, centered on clean dark background, modern tech logo avatar style.",
    backstory:
      "Lignes vectorielles pures et géométrie d'origami. Représente l'ingéniosité algorithmique, la finesse et l'agilité dans le développement logiciel.",
  },
  {
    id: "showcase-rabbit-3d",
    title: "Nexus Bunny · 3D Cyber Gamer",
    style: "3d",
    archetype: "robot",
    traits: ["energetic", "playful"],
    palette: "soside",
    imageSrc: "/images/mascots/mascot-3d-rabbit.jpg",
    prompt:
      "3D Pixar-style render of an energetic cute cyber-rabbit mascot avatar wearing glowing holographic goggles and neon headphones, soft studio lighting, playful cheerful personality, glossy smooth 3D textures, vibrant centered portrait avatar.",
    backstory:
      "Rendu 3D Pixar avec casque audio néon et lunettes holographiques. Apporte une énergie contagieuse et bienveillante aux applications mobiles.",
  },
  {
    id: "showcase-owl-sketch",
    title: "Archimède · Chouette Ingénieur Steampunk",
    style: "sketch",
    archetype: "owl",
    traits: ["innovative", "zen"],
    palette: "monochrome",
    imageSrc: "/images/mascots/mascot-sketch-owl.jpg",
    prompt:
      "Artistic hand-drawn ink and watercolor sketch of a wise steampunk owl mascot avatar with vintage brass monocle and tiny glowing blueprint scroll, calm analytical personality, delicate crosshatch detailing, clean textured background.",
    backstory:
      "Gravure et croquis aquarellé à la main. Le monocle en laiton et le plan holographique symbolisent l'architecture système rigoureuse et la sagesse technique.",
  },
  {
    id: "showcase-leopard-cyber",
    title: "Apex Panther · Cyber Armor",
    style: "cyberpunk",
    archetype: "leopard",
    traits: ["fearless", "protective"],
    palette: "soside",
    imageSrc: "/images/mascots/mascot-cyber-leopard.jpg",
    prompt:
      "Futuristic cyber leopard mascot avatar badge, sleek carbon-fiber armor with glowing cyan and electric gold circuits, bold confident expression, high-tech esports brand emblem, premium vector avatar.",
    backstory:
      "Panthère cybernétique en fibre de carbone et circuits dorés luminescents. Conçue pour les applications nécessitant une image forte de performance et de résilience.",
  },
  {
    id: "showcase-leopard-minimalist",
    title: "Kivu Panther · Agilité & Puissance",
    style: "minimalist",
    archetype: "leopard",
    traits: ["fearless", "innovative"],
    palette: "soside",
    imageSrc: "/images/mascots/mascot-minimalist-leopard.jpg",
    prompt:
      "A minimalist sleek geometric leopard mascot avatar, elegant flat vector art, stylized African panther with emerald green eyes and golden geometric spots, navy blue background, modern tech company logo mark, clean lines, centered, 1:1 aspect ratio.",
    backstory:
      "Inspiré de la faune légendaire des hautes terres du Kivu. Incarne la rapidité fulgurante d'exécution et la robustesse des systèmes distribués.",
  },
  {
    id: "showcase-falcon-sketch",
    title: "Aero Falcon · Vision Haute Altitude",
    style: "sketch",
    archetype: "falcon",
    traits: ["innovative", "fearless"],
    palette: "soside",
    imageSrc: "/images/mascots/mascot-sketch-falcon.jpg",
    prompt:
      "A hand-drawn artistic pencil sketch and ink watercolor mascot avatar of a visionary falcon, dynamic feathers, energetic cross-hatching and subtle blue watercolor wash accents, white paper texture background, 1:1 aspect ratio.",
    backstory:
      "Dessiné à l'encre et rehaussé d'aquarelle bleu cobalt. Symbole de la vue d'ensemble architecturale et des pipelines de déploiement continu.",
  },
  {
    id: "showcase-fox-cyberpunk",
    title: "Neon Kitsune · Cybersécurité",
    style: "cyberpunk",
    archetype: "fox",
    traits: ["playful", "protective"],
    palette: "purple",
    imageSrc: "/images/mascots/mascot-cyber-fox.jpg",
    prompt:
      "A cool futuristic cyberpunk cyber-fox mascot avatar, wearing high-tech neon goggles, sleek cybernetic armor with glowing purple and turquoise circuitry, confident energetic grin, dark futuristic backdrop, 1:1 aspect ratio.",
    backstory:
      "Gardien des protocoles de chiffrement et des clés privées. Traque les anomalies réseau et protège les transactions contre la fraude.",
  },
]

/**
 * Compile la configuration sélectionnée en un prompt optimisé pour l'outil de génération d'images
 */
export function compileMascotPrompt(config: MascotConfig): string {
  const styleDescriptions: Record<MascotStyle, string> = {
    "3d": "high-end 3D Pixar/Disney style character render, polished smooth surfaces, soft volumetric studio lighting, rich ambient occlusion, vibrant depth, tactile clay and metallic finish",
    minimalist: "minimalist flat geometric vector mascot logo mark, clean sharp vector lines, elegant negative space, iconic tech branding badge, balanced aesthetic",
    sketch: "hand-drawn artistic pencil sketch and dynamic ink drawing, fine cross-hatching, expressive watercolor wash highlights, textured fine art paper background",
    cyberpunk: "futuristic cyberpunk aesthetic, high-tech neon glowing circuitry, reflective cybernetic armor, dark dystopian backdrop with neon rim lighting",
    chibi: "cute Japanese chibi anime character, oversized expressive sparkling eyes, adorable kawaii proportions, playful tech accessories, cheerful color palette",
    "retro-badge": "vintage collegiate mascot emblem, retro 1970s screen-print texture, circular badge composition, distressed ink finish, classic athletic patch style",
  }

  const archetypeDescriptions: Record<MascotArchetype, string> = {
    robot: "a friendly cutting-edge AI robot mascot with expressive glowing LED screen eyes, antenna beacon, and smooth ceramic casing",
    leopard: "a majestic stylized African leopard panther mascot with emerald green eyes, geometric spots, and an agile sleek silhouette",
    falcon: "a visionary aerodynamic falcon eagle mascot with sharp observant eyes and dynamic feather wings spread",
    fox: "a clever high-tech cyber fox mascot with perked ears, bushy tail, and an energetic confident grin",
    owl: "a wise tech sage owl mascot wearing round spectacles, holding a glowing digital token or scroll",
    bear: "a strong protective guardian bear mascot with reinforced cybernetic chest armor and calm steadfast gaze",
    dragon: "a friendly modern tech dragon mascot with sleek crystalline scales and a gentle azure spark",
  }

  const traitsText = config.traits
    .map((t) => {
      const traitObj = MASCOT_TRAITS.find((x) => x.id === t)
      return traitObj ? traitObj.nameEn.toLowerCase() : t
    })
    .join(", ")

  const palette = MASCOT_PALETTES.find((p) => p.id === config.palette)
  const paletteText = palette ? `color theme featuring ${palette.colors.join(", ")}` : "balanced brand colors"

  const backgroundText =
    config.background === "studio-gradient"
      ? "clean soft studio gradient background with subtle rim light"
      : config.background === "circular-badge"
      ? "centered in a clean circular framed avatar badge"
      : config.background === "dark-grid"
      ? "subtle dark isometric cyberspace grid with glowing particles"
      : "clean white fine-grain art paper backdrop"

  const parts = [
    `An iconic mascot avatar of ${config.name ? `named "${config.name}", ` : ""}${archetypeDescriptions[config.archetype]}.`,
    `Rendered in ${styleDescriptions[config.style]}.`,
    `Personality traits: ${traitsText}.`,
    paletteText + ".",
    backgroundText + ".",
    config.accessories.length ? `Wearing or holding: ${config.accessories.join(", ")}.` : "",
    config.customNotes ? config.customNotes.trim() + "." : "",
    "Perfect for an app icon, profile avatar, or startup branding badge. 1:1 square aspect ratio, centered subject, masterpiece quality.",
  ]

  return parts.filter(Boolean).join(" ")
}
