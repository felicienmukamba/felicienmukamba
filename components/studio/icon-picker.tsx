"use client"

import { useEffect, useMemo, useState, type ComponentType, type MouseEvent } from "react"
import {
  Activity, Anchor, Aperture, Apple, Atom, Award, Baby, BadgeCheck, Banknote, Beer, Bell, Bike, Bird, BookOpen, Bot, Boxes, Brain, Briefcase, Brush, Building2,
  CakeSlice, Calculator, Camera, Car, ChefHat, Cherry, Cloud, Code, Coffee, Coins, Compass, Cpu, CreditCard, Croissant, Cross, Crown, Database, Droplet, Dumbbell,
  Feather, Film, Fingerprint, Flame, FlaskConical, Flower2, Fuel, Gem, Gift, Globe, GraduationCap, Handshake, Headphones, Heart, HeartPulse, Home, Hospital, Hotel,
  IceCreamCone, Landmark, Languages, Layers, Leaf, Library, Lightbulb, Loader2, Lock, Mail, MapPin, Megaphone, MessageCircle, Mic, Microscope, Moon, Mountain, Music,
  Network, Package, Palette, PenLine, PenTool, Percent, Phone, PiggyBank, Pill, Pizza, Plane, Puzzle, QrCode, Radio, Receipt, Rocket, Satellite, Scale, School,
  Search, Send, Share2, Shield, Ship, Shirt, ShoppingBag, ShoppingCart, Smartphone, Smile, Snowflake, Soup, Sparkles, Sprout, Star, Stethoscope, Store, Sun, Syringe,
  Tag, Target, Tent, Terminal, Train, Trees, TrendingUp, Trophy, Truck, Users, Utensils, Video, Wallet, Watch, Waves, Wifi, Wine,
} from "lucide-react"
import { MARKS } from "@/lib/studio/marks"
import { cn } from "@/lib/utils"

type Icon = ComponentType<{ className?: string; strokeWidth?: number }>

export const ICON_CATEGORIES: { id: string; label: { fr: string; en: string }; icons: Record<string, Icon> }[] = [
  { id: "tech", label: { fr: "Tech", en: "Tech" }, icons: { Cpu, Code, Terminal, Database, Cloud, Wifi, Smartphone, Bot, Rocket, Globe, Layers, Boxes, Network, Shield, Lock, Fingerprint, QrCode, Satellite } },
  { id: "business", label: { fr: "Finance", en: "Finance" }, icons: { Briefcase, CreditCard, Wallet, Banknote, PiggyBank, TrendingUp, Landmark, Scale, Target, Award, BadgeCheck, Building2, Coins, Calculator } },
  { id: "commerce", label: { fr: "Commerce", en: "Retail" }, icons: { ShoppingBag, ShoppingCart, Store, Tag, Gift, Package, Truck, Receipt, Percent, Shirt, Gem, Watch } },
  { id: "food", label: { fr: "Food", en: "Food" }, icons: { Coffee, Utensils, Pizza, Croissant, Wine, CakeSlice, ChefHat, Apple, Beer, Soup, Cherry, IceCreamCone } },
  { id: "health", label: { fr: "Santé", en: "Health" }, icons: { Heart, HeartPulse, Stethoscope, Activity, Pill, Cross, Smile, Baby, Dumbbell, Brain, Syringe, Hospital } },
  { id: "nature", label: { fr: "Nature", en: "Nature" }, icons: { Leaf, Trees, Sun, Moon, Mountain, Waves, Flower2, Sprout, Droplet, Flame, Snowflake, Bird } },
  { id: "creative", label: { fr: "Créatif", en: "Creative" }, icons: { Palette, PenTool, Camera, Music, Film, Brush, Feather, Sparkles, Star, Crown, Aperture, Mic } },
  { id: "travel", label: { fr: "Voyage", en: "Travel" }, icons: { Plane, Car, Bike, Ship, MapPin, Compass, Home, Hotel, Tent, Train, Fuel, Anchor } },
  { id: "education", label: { fr: "Éducation", en: "Education" }, icons: { GraduationCap, BookOpen, Lightbulb, Atom, FlaskConical, Puzzle, Trophy, School, Library, PenLine, Microscope, Languages } },
  { id: "social", label: { fr: "Contact", en: "Contact" }, icons: { MessageCircle, Mail, Phone, Send, Users, Handshake, Megaphone, Radio, Share2, Bell, Headphones, Video } },
]

export type PickedIcon = { name: string; markup: string }

/** Reads the rendered Lucide SVG children from the clicked button: no second renderer needed. */
function pickFrom(e: MouseEvent<HTMLButtonElement>, name: string): PickedIcon | null {
  const svg = e.currentTarget.querySelector("svg")
  return svg ? { name, markup: svg.innerHTML } : null
}

const T = {
  fr: { marks: "Symboles", search: "Rechercher parmi 1 500+ icônes…", loading: "Chargement du catalogue…", none: "Aucune icône trouvée", results: "résultats" },
  en: { marks: "Marks", search: "Search 1,500+ icons…", loading: "Loading catalogue…", none: "No icon found", results: "results" },
}

export function IconPicker({
  lang,
  selected,
  onPickIcon,
  onPickMark,
  showMarks = true,
  markColors = ["currentColor", "var(--accent)"],
}: {
  lang: "fr" | "en"
  selected?: string
  onPickIcon: (icon: PickedIcon) => void
  onPickMark?: (id: string) => void
  showMarks?: boolean
  markColors?: [string, string]
}) {
  const s = T[lang]
  const [category, setCategory] = useState(showMarks ? "marks" : ICON_CATEGORIES[0].id)
  const [query, setQuery] = useState("")
  const [all, setAll] = useState<Record<string, Icon> | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!query || all || loading) return
    setLoading(true)
    import("lucide-react").then((m) => {
      setAll(m.icons as unknown as Record<string, Icon>)
      setLoading(false)
    })
  }, [query, all, loading])

  const results = useMemo(() => {
    if (!query || !all) return []
    const q = query.toLowerCase().replace(/\s+/g, "")
    return Object.keys(all)
      .filter((n) => n.toLowerCase().includes(q))
      .slice(0, 96)
  }, [query, all])

  const iconButton = (name: string, Comp: Icon) => (
    <button
      key={name}
      type="button"
      title={name}
      onClick={(e) => {
        const picked = pickFrom(e, name)
        if (picked) onPickIcon(picked)
      }}
      className={cn(
        "grid aspect-square place-items-center rounded-lg border transition-colors",
        selected === name ? "border-accent bg-accent-soft text-accent" : "border-line text-muted-foreground hover:border-line-strong hover:text-foreground",
      )}
    >
      <Comp className="size-5" strokeWidth={2} />
    </button>
  )

  return (
    <div className="space-y-2.5">
      <div className="relative">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-subtle-foreground" aria-hidden />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={s.search}
          className="w-full rounded-lg border border-line-strong bg-background py-2 pl-8 pr-3 text-[12.5px] outline-none placeholder:text-subtle-foreground focus:border-accent"
        />
      </div>

      {query ? (
        <div>
          {loading || !all ? (
            <p className="flex items-center gap-2 py-6 text-[12px] text-muted-foreground">
              <Loader2 className="size-3.5 animate-spin" aria-hidden /> {s.loading}
            </p>
          ) : results.length ? (
            <>
              <p className="mb-1.5 text-[11px] text-subtle-foreground">
                {results.length} {s.results}
              </p>
              <div className="grid max-h-64 grid-cols-6 gap-1.5 overflow-y-auto pr-1">{results.map((n) => iconButton(n, all[n]))}</div>
            </>
          ) : (
            <p className="py-6 text-center text-[12px] text-muted-foreground">{s.none}</p>
          )}
        </div>
      ) : (
        <>
          <div className="flex gap-1 overflow-x-auto pb-1">
            {[...(showMarks ? [{ id: "marks", label: { fr: s.marks, en: s.marks } }] : []), ...ICON_CATEGORIES].map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setCategory(c.id)}
                className={cn(
                  "shrink-0 rounded-full border px-2.5 py-1 text-[11px] font-medium",
                  category === c.id ? "border-accent bg-accent-soft text-foreground" : "border-line text-muted-foreground hover:text-foreground",
                )}
              >
                {c.label[lang]}
              </button>
            ))}
          </div>
          {category === "marks" && onPickMark ? (
            <div className="grid grid-cols-6 gap-1.5">
              {MARKS.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  title={m.label[lang]}
                  onClick={() => onPickMark(m.id)}
                  className={cn(
                    "grid aspect-square place-items-center rounded-lg border p-1.5 transition-colors",
                    selected === `mark:${m.id}` ? "border-accent bg-accent-soft" : "border-line hover:border-line-strong",
                  )}
                >
                  <svg viewBox="0 0 100 100" className="size-full text-foreground" dangerouslySetInnerHTML={{ __html: m.render(markColors[0], markColors[1]) }} />
                </button>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-6 gap-1.5">
              {Object.entries(ICON_CATEGORIES.find((c) => c.id === category)?.icons ?? {}).map(([n, C]) => iconButton(n, C))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
