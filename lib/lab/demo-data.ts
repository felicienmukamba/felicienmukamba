import { mulberry32 } from "@/lib/kit/download"

/** Realistic, seeded catalogue data to demo a marketplace or a POS without real stock. */

export type Currency = "USD" | "CDF" | "EUR"
export type DataLang = "fr" | "en"

type Category = { id: string; label: Record<DataLang, string>; items: Record<DataLang, string[]>; qualifiers: Record<DataLang, string[]>; price: [number, number] }

export const CATEGORIES: Category[] = [
  {
    id: "phones",
    label: { fr: "Téléphones & accessoires", en: "Phones & accessories" },
    items: { fr: ["Smartphone", "Écouteurs sans fil", "Chargeur rapide", "Power bank", "Coque renforcée", "Câble USB-C"], en: ["Smartphone", "Wireless earbuds", "Fast charger", "Power bank", "Rugged case", "USB-C cable"] },
    qualifiers: { fr: ["Pro", "Lite", "128 Go", "20 000 mAh", "65 W", "Édition noire"], en: ["Pro", "Lite", "128 GB", "20,000 mAh", "65 W", "Black edition"] },
    price: [4, 420],
  },
  {
    id: "food",
    label: { fr: "Alimentation", en: "Groceries" },
    items: { fr: ["Riz parfumé", "Huile de palme", "Farine de manioc", "Café du Kivu", "Miel naturel", "Haricots rouges"], en: ["Fragrant rice", "Palm oil", "Cassava flour", "Kivu coffee", "Natural honey", "Red beans"] },
    qualifiers: { fr: ["5 kg", "1 L", "25 kg", "250 g", "500 g", "10 kg"], en: ["5 kg", "1 L", "25 kg", "250 g", "500 g", "10 kg"] },
    price: [1.5, 45],
  },
  {
    id: "fashion",
    label: { fr: "Mode", en: "Fashion" },
    items: { fr: ["Chemise en pagne", "Robe wax", "Sneakers", "Sac à main", "Montre", "Casquette"], en: ["Wax print shirt", "Wax dress", "Sneakers", "Handbag", "Watch", "Cap"] },
    qualifiers: { fr: ["Taille M", "Collection 2026", "Cuir", "Unisexe", "Coton", "Édition limitée"], en: ["Size M", "2026 collection", "Leather", "Unisex", "Cotton", "Limited edition"] },
    price: [6, 150],
  },
  {
    id: "home",
    label: { fr: "Maison", en: "Home" },
    items: { fr: ["Lampe solaire", "Filtre à eau", "Ventilateur", "Marmite inox", "Matelas", "Chaise de bureau"], en: ["Solar lamp", "Water filter", "Fan", "Stainless pot", "Mattress", "Office chair"] },
    qualifiers: { fr: ["LED", "20 L", "Rechargeable", "8 L", "2 places", "Ergonomique"], en: ["LED", "20 L", "Rechargeable", "8 L", "Double", "Ergonomic"] },
    price: [8, 260],
  },
  {
    id: "beauty",
    label: { fr: "Beauté & santé", en: "Beauty & health" },
    items: { fr: ["Beurre de karité", "Savon noir", "Huile de coco", "Crème solaire", "Parfum", "Brosse à dents"], en: ["Shea butter", "Black soap", "Coconut oil", "Sunscreen", "Perfume", "Toothbrush"] },
    qualifiers: { fr: ["Bio", "250 ml", "Artisanal", "SPF 50", "100 ml", "Lot de 4"], en: ["Organic", "250 ml", "Handmade", "SPF 50", "100 ml", "Pack of 4"] },
    price: [2, 80],
  },
  {
    id: "tech",
    label: { fr: "Informatique", en: "Computers" },
    items: { fr: ["Ordinateur portable", "Routeur 4G", "Imprimante", "Clé USB", "Souris sans fil", "Onduleur"], en: ["Laptop", "4G router", "Printer", "USB drive", "Wireless mouse", "UPS"] },
    qualifiers: { fr: ["16 Go RAM", "Industriel", "Laser", "64 Go", "Silencieuse", "1500 VA"], en: ["16 GB RAM", "Industrial", "Laser", "64 GB", "Silent", "1500 VA"] },
    price: [6, 1400],
  },
]

export type DemoProduct = {
  id: number
  sku: string
  name: string
  category: string
  price: number
  currency: Currency
  price_cdf: number
  stock: number
  status: "in_stock" | "low_stock" | "out_of_stock"
  rating: number
  reviews: number
  shop: string
  color: string
  created_at: string
}

const EUR_PER_USD = 0.92

export function generateProducts(opts: {
  count: number
  seed: number
  lang: DataLang
  currency: Currency
  cdfRate: number
  categories: string[]
  shop: string
  palette: string[]
}): DemoProduct[] {
  const rand = mulberry32(opts.seed)
  const pickFrom = <T,>(list: T[]) => list[Math.floor(rand() * list.length)]
  const cats = CATEGORIES.filter((c) => opts.categories.includes(c.id))
  const pool = cats.length ? cats : CATEGORIES
  const start = Date.UTC(2026, 0, 1)

  return Array.from({ length: opts.count }, (_, i) => {
    const cat = pickFrom(pool)
    const usd = Math.round((cat.price[0] + (cat.price[1] - cat.price[0]) * rand() ** 2.2) * 100) / 100
    const stock = rand() < 0.08 ? 0 : Math.floor(rand() * 180)
    const price = opts.currency === "USD" ? usd : opts.currency === "EUR" ? Math.round(usd * EUR_PER_USD * 100) / 100 : Math.round(usd * opts.cdfRate)
    return {
      id: i + 1,
      sku: `${cat.id.slice(0, 3).toUpperCase()}-${String(1000 + Math.floor(rand() * 9000))}`,
      name: `${pickFrom(cat.items[opts.lang])} ${pickFrom(cat.qualifiers[opts.lang])}`,
      category: cat.label[opts.lang],
      price,
      currency: opts.currency,
      price_cdf: Math.round(usd * opts.cdfRate),
      stock,
      status: stock === 0 ? "out_of_stock" : stock < 10 ? "low_stock" : "in_stock",
      rating: Math.round((3.6 + rand() * 1.4) * 10) / 10,
      reviews: Math.floor(rand() ** 2 * 400),
      shop: opts.shop,
      color: opts.palette.length ? pickFrom(opts.palette) : "#5a4bd6",
      created_at: new Date(start + Math.floor(rand() * 260) * 86_400_000).toISOString().slice(0, 10),
    }
  })
}

export function toCsv(rows: DemoProduct[]): string {
  if (!rows.length) return ""
  const keys = Object.keys(rows[0]) as (keyof DemoProduct)[]
  const cell = (v: unknown) => {
    const s = String(v)
    return /[",\n;]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
  }
  return [keys.join(","), ...rows.map((r) => keys.map((k) => cell(r[k])).join(","))].join("\n")
}

/** Ready-to-run INSERT statements (PostgreSQL / MySQL compatible). */
export function toSql(rows: DemoProduct[], table = "products"): string {
  if (!rows.length) return ""
  const keys = Object.keys(rows[0]) as (keyof DemoProduct)[]
  const value = (v: unknown) => (typeof v === "number" ? String(v) : `'${String(v).replace(/'/g, "''")}'`)
  const values = rows.map((r) => `  (${keys.map((k) => value(r[k])).join(", ")})`).join(",\n")
  return `INSERT INTO ${table} (${keys.join(", ")}) VALUES\n${values};\n`
}
