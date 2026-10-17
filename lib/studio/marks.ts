/**
 * Original filled logo marks drawn in a 100×100 box. `c1` is the main ink,
 * `c2` the accent, so each mark follows the brand palette.
 */

export type Mark = { id: string; label: { fr: string; en: string }; render: (c1: string, c2: string) => string }

const round = `stroke-linecap="round" stroke-linejoin="round"`

export const MARKS: Mark[] = [
  {
    id: "orbit",
    label: { fr: "Orbite", en: "Orbit" },
    render: (c1, c2) =>
      `<circle cx="50" cy="50" r="21" fill="${c1}"/><circle cx="50" cy="50" r="38" fill="none" stroke="${c2}" stroke-width="8" stroke-dasharray="165 75" ${round} transform="rotate(-35 50 50)"/>`,
  },
  {
    id: "hexa",
    label: { fr: "Hexagone", en: "Hexagon" },
    render: (c1, c2) => `<polygon points="50,6 88,28 88,72 50,94 12,72 12,28" fill="${c1}"/><polygon points="50,31 66,40.5 66,59.5 50,69 34,59.5 34,40.5" fill="${c2}"/>`,
  },
  {
    id: "spark",
    label: { fr: "Étincelle", en: "Spark" },
    render: (c1, c2) => `<path d="M46 6C49 34 60 45 90 48C60 51 49 62 46 92C43 62 32 51 4 48C32 45 43 34 46 6Z" fill="${c1}"/><path d="M80 8C81 16 84 19 92 20C84 21 81 24 80 32C79 24 76 21 68 20C76 19 79 16 80 8Z" fill="${c2}"/>`,
  },
  {
    id: "waves",
    label: { fr: "Vagues", en: "Waves" },
    render: (c1, c2) =>
      [30, 52, 74].map((y, i) => `<path d="M8 ${y}Q29 ${y - 16} 50 ${y}T92 ${y}" fill="none" stroke="${i === 1 ? c2 : c1}" stroke-width="10" ${round}/>`).join(""),
  },
  {
    id: "leaf",
    label: { fr: "Feuille", en: "Leaf" },
    render: (c1, c2) => `<path d="M88 12C44 10 12 36 12 76V88H24C64 88 90 58 88 12Z" fill="${c1}"/><path d="M22 78L64 36" fill="none" stroke="${c2}" stroke-width="6" ${round}/>`,
  },
  {
    id: "peaks",
    label: { fr: "Sommets", en: "Peaks" },
    render: (c1, c2) => `<polygon points="4,86 38,24 72,86" fill="${c1}"/><polygon points="42,86 66,46 94,86" fill="${c2}"/><circle cx="78" cy="22" r="9" fill="${c2}"/>`,
  },
  {
    id: "bolt",
    label: { fr: "Éclair", en: "Bolt" },
    render: (c1, c2) => `<circle cx="50" cy="50" r="44" fill="none" stroke="${c2}" stroke-width="6"/><path d="M56 14L26 54H48L42 86L74 44H52Z" fill="${c1}" ${round}/>`,
  },
  {
    id: "blocks",
    label: { fr: "Blocs", en: "Blocks" },
    render: (c1, c2) => `<rect x="8" y="8" width="38" height="38" rx="10" fill="${c1}"/><rect x="54" y="8" width="38" height="38" rx="10" fill="${c1}"/><rect x="8" y="54" width="38" height="38" rx="10" fill="${c1}"/><circle cx="73" cy="73" r="19" fill="${c2}"/>`,
  },
  {
    id: "link",
    label: { fr: "Lien", en: "Link" },
    render: (c1, c2) => `<circle cx="37" cy="50" r="25" fill="none" stroke="${c1}" stroke-width="10"/><circle cx="63" cy="50" r="25" fill="none" stroke="${c2}" stroke-width="10"/>`,
  },
  {
    id: "chevrons",
    label: { fr: "Chevrons", en: "Chevrons" },
    render: (c1, c2) => `<path d="M14 56L50 24L86 56" fill="none" stroke="${c1}" stroke-width="12" ${round}/><path d="M14 80L50 48L86 80" fill="none" stroke="${c2}" stroke-width="12" ${round}/>`,
  },
  {
    id: "drop",
    label: { fr: "Goutte", en: "Drop" },
    render: (c1, c2) => `<path d="M50 6C50 6 16 44 16 63A34 34 0 0 0 84 63C84 44 50 6 50 6Z" fill="${c1}"/><path d="M32 64A18 18 0 0 0 50 82" fill="none" stroke="${c2}" stroke-width="6" ${round}/>`,
  },
  {
    id: "crown",
    label: { fr: "Couronne", en: "Crown" },
    render: (c1, c2) => `<path d="M10 76L15 28L35 50L50 16L65 50L85 28L90 76Z" fill="${c1}" ${round}/><rect x="10" y="81" width="80" height="10" rx="4" fill="${c2}"/>`,
  },
  {
    id: "gem",
    label: { fr: "Gemme", en: "Gem" },
    render: (c1, c2) =>
      `<polygon points="28,14 72,14 94,40 50,92 6,40" fill="${c1}"/><polygon points="28,14 72,14 62,40 38,40" fill="${c2}"/><polygon points="38,40 62,40 50,92" fill="#ffffff" fill-opacity="0.22"/>`,
  },
  {
    id: "shield",
    label: { fr: "Bouclier", en: "Shield" },
    render: (c1, c2) => `<path d="M50 6L88 20V48C88 72 70 88 50 96C30 88 12 72 12 48V20Z" fill="${c1}"/><path d="M32 50L45 63L70 36" fill="none" stroke="${c2}" stroke-width="9" ${round}/>`,
  },
  {
    id: "cards",
    label: { fr: "Cartes", en: "Cards" },
    render: (c1, c2) =>
      `<rect x="18" y="12" width="64" height="42" rx="8" fill="${c2}" transform="rotate(-12 50 33)"/><rect x="10" y="38" width="80" height="50" rx="9" fill="${c1}"/><rect x="10" y="50" width="80" height="9" fill="${c2}"/><circle cx="26" cy="76" r="5" fill="${c2}"/>`,
  },
  {
    id: "petals",
    label: { fr: "Pétales", en: "Petals" },
    render: (c1, c2) =>
      `${[
        [50, 28],
        [72, 50],
        [50, 72],
        [28, 50],
      ]
        .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="22" fill="${c1}" fill-opacity="0.82"/>`)
        .join("")}<circle cx="50" cy="50" r="10" fill="${c2}"/>`,
  },
  {
    id: "stack",
    label: { fr: "Couches", en: "Layers" },
    render: (c1, c2) =>
      `<path d="M50 10L90 30L50 50L10 30Z" fill="${c1}" ${round}/><path d="M10 50L50 70L90 50" fill="none" stroke="${c2}" stroke-width="8" ${round}/><path d="M10 68L50 88L90 68" fill="none" stroke="${c1}" stroke-width="8" ${round}/>`,
  },
  {
    id: "bars",
    label: { fr: "Croissance", en: "Growth" },
    render: (c1, c2) =>
      [
        [8, 60],
        [30, 44],
        [52, 28],
        [74, 10],
      ]
        .map(([x, y], i) => `<rect x="${x}" y="${y}" width="18" height="${90 - y}" rx="5" fill="${i === 3 ? c2 : c1}"/>`)
        .join(""),
  },
  {
    id: "sun",
    label: { fr: "Soleil", en: "Sun" },
    render: (c1, c2) =>
      `<circle cx="50" cy="50" r="19" fill="${c2}"/>${Array.from({ length: 8 }, (_, i) => {
        const a = (i * Math.PI) / 4
        const p = (r: number) => `${(50 + Math.cos(a) * r).toFixed(1)} ${(50 + Math.sin(a) * r).toFixed(1)}`
        return `<path d="M${p(30)}L${p(44)}" stroke="${c1}" stroke-width="8" ${round}/>`
      }).join("")}`,
  },
  {
    id: "planet",
    label: { fr: "Planète", en: "Planet" },
    render: (c1, c2) => `<circle cx="50" cy="50" r="27" fill="${c1}"/><ellipse cx="50" cy="50" rx="46" ry="13" fill="none" stroke="${c2}" stroke-width="6" transform="rotate(-22 50 50)"/>`,
  },
  {
    id: "pin",
    label: { fr: "Lieu", en: "Pin" },
    render: (c1, c2) => `<path d="M50 94C50 94 18 60 18 40A32 32 0 0 1 82 40C82 60 50 94 50 94Z" fill="${c1}"/><circle cx="50" cy="40" r="12" fill="${c2}"/>`,
  },
  {
    id: "bubble",
    label: { fr: "Bulle", en: "Bubble" },
    render: (c1, c2) =>
      `<path d="M16 14H84A10 10 0 0 1 94 24V64A10 10 0 0 1 84 74H46L24 92V74H16A10 10 0 0 1 6 64V24A10 10 0 0 1 16 14Z" fill="${c1}"/>${[30, 50, 70].map((x) => `<circle cx="${x}" cy="44" r="6" fill="${c2}"/>`).join("")}`,
  },
  {
    id: "house",
    label: { fr: "Maison", en: "Home" },
    render: (c1, c2) => `<path d="M50 8L94 46H82V90H18V46H6Z" fill="${c1}" ${round}/><rect x="40" y="58" width="20" height="32" rx="3" fill="${c2}"/>`,
  },
  {
    id: "heart",
    label: { fr: "Cœur", en: "Heart" },
    render: (c1, c2) => `<path d="M50 88C22 68 8 52 8 33A21 21 0 0 1 50 24A21 21 0 0 1 92 33C92 52 78 68 50 88Z" fill="${c1}"/><circle cx="30" cy="34" r="6" fill="${c2}"/>`,
  },
  {
    id: "target",
    label: { fr: "Cible", en: "Target" },
    render: (c1, c2) => `<circle cx="50" cy="50" r="40" fill="none" stroke="${c1}" stroke-width="10"/><circle cx="50" cy="50" r="17" fill="${c2}"/>`,
  },
  {
    id: "play",
    label: { fr: "Lecture", en: "Play" },
    render: (c1, c2) => `<path d="M26 14L84 50L26 86Z" fill="${c1}" stroke="${c1}" stroke-width="8" ${round}/><circle cx="40" cy="50" r="9" fill="${c2}"/>`,
  },
]

export function getMark(id: string) {
  return MARKS.find((m) => m.id === id) ?? MARKS[0]
}
