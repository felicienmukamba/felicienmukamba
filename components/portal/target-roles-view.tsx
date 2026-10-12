"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { ArrowUpRight, BarChart3, Building2, Check, Code2, Copy, Cpu, FileText, Filter, FolderKanban, Heart, HeartHandshake, Layers, Search, ShieldCheck, Sparkles, UserCheck, Users, Wrench, Zap } from "lucide-react"
import { CopyButton } from "@/components/kit/controls"
import { KEY_ASSETS, PLATFORM_KEYWORDS, TARGET_CATEGORIES, type SectorId, type TargetCategory, type TargetRole } from "@/lib/portal/roles"
import { cn } from "@/lib/utils"

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Code2,
  Cpu,
  FolderKanban,
  ShieldCheck,
  Users,
  BarChart3,
  Zap,
  Heart,
}

export function TargetRolesView({ compact = false }: { compact?: boolean }) {
  const [selectedSector, setSelectedSector] = useState<SectorId>("all")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [search, setSearch] = useState("")

  const categoriesInSector = useMemo(() => {
    return TARGET_CATEGORIES.filter((c) => {
      if (selectedSector === "all") return true
      return c.sector === selectedSector
    })
  }, [selectedSector])

  const filteredRoles = useMemo(() => {
    const query = search.trim().toLowerCase()
    const allRoles = TARGET_CATEGORIES.flatMap((c) => c.roles)

    return allRoles.filter((r) => {
      const matchSector = selectedSector === "all" || r.sector === selectedSector
      const matchCategory = selectedCategory === "all" || r.category === selectedCategory
      const matchSearch =
        !query ||
        r.title.toLowerCase().includes(query) ||
        r.titleEn.toLowerCase().includes(query) ||
        r.missions.toLowerCase().includes(query) ||
        r.keyTools.some((t) => t.toLowerCase().includes(query)) ||
        r.categoryTitle.toLowerCase().includes(query)

      return matchSector && matchCategory && matchSearch
    })
  }, [selectedSector, selectedCategory, search])

  const activePlatformKeywords = useMemo(() => {
    if (selectedSector === "tech") return PLATFORM_KEYWORDS.tech
    if (selectedSector === "ngo") return PLATFORM_KEYWORDS.ngo
    return [...PLATFORM_KEYWORDS.tech, ...PLATFORM_KEYWORDS.ngo]
  }, [selectedSector])

  return (
    <div className="space-y-8">
      {/* Key Assets / Value Proposition Banner */}
      <section className="relative overflow-hidden rounded-3xl border border-accent/30 bg-gradient-to-br from-accent/15 via-surface to-background p-6 md:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/20 px-3 py-1 font-mono text-[11px] font-semibold text-accent">
              <Sparkles className="size-3" aria-hidden /> Positionnement Stratégique Haut Niveau
            </span>
            <h2 className="mt-3 text-xl font-bold tracking-tight text-foreground md:text-2xl">
              Entreprises Tech (Bac+5 / Fondateur) & Rôles Humanitaires
            </h2>
            <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
              Dans les entreprises Tech (SSII, Éditeurs, FinTech, Startups) comme dans les agences internationales (ONU, clusters, grandes ONG), votre profil hybride rare vous positionne sur des postes à très forte valeur ajoutée.
            </p>
          </div>

          <Link
            href="/portal/cv"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-[13px] font-medium text-accent-foreground shadow transition hover:opacity-95"
          >
            <FileText className="size-4" aria-hidden /> Ouvrir le Studio CV
          </Link>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {KEY_ASSETS.map((asset) => (
            <div key={asset.title} className="rounded-2xl border border-line bg-surface/80 p-4">
              <span className="font-mono text-[10.5px] font-semibold text-accent">{asset.badge}</span>
              <h3 className="mt-1 text-[14px] font-semibold tracking-tight text-foreground">{asset.title}</h3>
              <p className="mt-2 text-[12.5px] leading-relaxed text-muted-foreground">{asset.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sector Switcher & Search Bar */}
      <div className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Main Sector Switcher */}
          <div className="flex items-center rounded-2xl border border-line bg-surface p-1">
            <button
              type="button"
              onClick={() => {
                setSelectedSector("all")
                setSelectedCategory("all")
              }}
              className={cn(
                "flex items-center gap-2 rounded-xl px-4 py-2 text-[13px] font-semibold transition-colors",
                selectedSector === "all" ? "bg-accent text-accent-foreground shadow-sm" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <span>Tous les secteurs</span>
              <span className="rounded-full bg-accent-foreground/20 px-1.5 py-0.2 font-mono text-[11px]">
                {TARGET_CATEGORIES.flatMap((c) => c.roles).length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                setSelectedSector("tech")
                setSelectedCategory("all")
              }}
              className={cn(
                "flex items-center gap-2 rounded-xl px-4 py-2 text-[13px] font-semibold transition-colors",
                selectedSector === "tech" ? "bg-accent text-accent-foreground shadow-sm" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Building2 className="size-4" aria-hidden />
              <span>Entreprises Tech</span>
              <span className="rounded-full bg-accent-foreground/20 px-1.5 py-0.2 font-mono text-[11px]">
                {TARGET_CATEGORIES.filter((c) => c.sector === "tech").flatMap((c) => c.roles).length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                setSelectedSector("ngo")
                setSelectedCategory("all")
              }}
              className={cn(
                "flex items-center gap-2 rounded-xl px-4 py-2 text-[13px] font-semibold transition-colors",
                selectedSector === "ngo" ? "bg-accent text-accent-foreground shadow-sm" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <HeartHandshake className="size-4" aria-hidden />
              <span>ONG & Humanitaire</span>
              <span className="rounded-full bg-accent-foreground/20 px-1.5 py-0.2 font-mono text-[11px]">
                {TARGET_CATEGORIES.filter((c) => c.sector === "ngo").flatMap((c) => c.roles).length}
              </span>
            </button>
          </div>

          {/* Search bar */}
          <div className="relative min-w-[220px] sm:w-72">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-subtle-foreground" aria-hidden />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher poste, outil, langage…"
              className="w-full rounded-full border border-line-strong bg-background py-1.5 pl-8 pr-3 text-[12.5px] outline-none transition-colors placeholder:text-subtle-foreground focus:border-accent"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            className={cn(
              "rounded-full px-3 py-1 text-[12px] font-medium transition-colors",
              selectedCategory === "all"
                ? "bg-foreground text-background"
                : "border border-line bg-surface hover:bg-surface-2 text-muted-foreground hover:text-foreground",
            )}
          >
            Toutes les spécialités
          </button>
          {categoriesInSector.map((cat) => {
            const Icon = ICONS[cat.iconName] || Layers
            const active = selectedCategory === cat.id
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-3 py-1 text-[12px] font-medium transition-colors",
                  active
                    ? "bg-accent text-accent-foreground shadow-sm"
                    : "border border-line bg-surface hover:bg-surface-2 text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon className="size-3" aria-hidden />
                <span>{cat.badge}</span>
                <span className="font-mono text-[10px] opacity-75">({cat.roles.length})</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Recommended Platform Search Keywords (LinkedIn, Indeed, Welcome to the Jungle) */}
      <section className="rounded-2xl border border-line bg-surface/70 p-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-[14px] font-semibold text-foreground">
              Titres exacts recommandés pour vos alertes et profils (LinkedIn, Indeed, WTTJ)
            </h3>
            <p className="text-[12px] text-muted-foreground">
              Copiez ces intitulés précis pour vos alertes d'emploi et votre titre de profil LinkedIn.
            </p>
          </div>
          <CopyButton
            text={activePlatformKeywords.join("\n")}
            label="Copier la liste"
            copiedLabel="Liste copiée !"
            size="sm"
          />
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {activePlatformKeywords.map((kw) => (
            <span
              key={kw}
              className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-background px-3 py-1 font-mono text-[11.5px] font-medium text-foreground"
            >
              <span>{kw}</span>
              <CopyButton text={kw} label="Copier" copiedLabel="✓" size="sm" />
            </span>
          ))}
        </div>
      </section>

      {/* Roles List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-[13px] text-muted-foreground">
          <span>{filteredRoles.length} postes cibles trouvés</span>
          {(selectedSector !== "all" || selectedCategory !== "all" || search) && (
            <button
              type="button"
              onClick={() => {
                setSelectedSector("all")
                setSelectedCategory("all")
                setSearch("")
              }}
              className="text-accent hover:underline font-medium"
            >
              Réinitialiser tous les filtres
            </button>
          )}
        </div>

        <div className="grid gap-5">
          {filteredRoles.map((role) => (
            <RoleCard key={role.id} role={role} />
          ))}
        </div>

        {filteredRoles.length === 0 && (
          <div className="card rounded-2xl p-10 text-center">
            <p className="text-[15px] font-medium text-foreground">Aucun poste ne correspond à votre recherche.</p>
            <p className="mt-1 text-[13px] text-muted-foreground">Essayez d'autres mots-clés ou réinitialisez les filtres.</p>
            <button
              type="button"
              onClick={() => {
                setSelectedSector("all")
                setSelectedCategory("all")
                setSearch("")
              }}
              className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-accent px-4 py-2 text-[12.5px] font-semibold text-accent-foreground"
            >
              Voir tous les postes
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function RoleCard({ role }: { role: TargetRole }) {
  const [copiedPitch, setCopiedPitch] = useState(false)

  const copyPitch = async () => {
    await navigator.clipboard.writeText(role.pitch)
    setCopiedPitch(true)
    setTimeout(() => setCopiedPitch(false), 1600)
  }

  const isTech = role.sector === "tech"

  return (
    <article className="card rounded-2xl p-6 transition-colors hover:border-line-strong">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={cn(
                "rounded-md border px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-wider",
                isTech ? "border-blue-500/30 bg-blue-500/10 text-blue-400" : "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
              )}
            >
              {isTech ? "Entreprise Tech" : "ONG & Humanitaire"}
            </span>
            <span className="text-[11.5px] text-subtle-foreground">·</span>
            <span className="text-[11.5px] text-muted-foreground">{role.categoryTitle}</span>
            <span className="text-[11.5px] text-subtle-foreground">·</span>
            <span className="font-mono text-[11.5px] text-subtle-foreground">{role.titleEn}</span>
          </div>

          <h4 className="text-[17px] font-bold tracking-tight text-foreground pt-1">{role.title}</h4>
        </div>

        <Link
          href={`/portal/cv?profile=${role.recommendedProfileId}`}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-accent/40 bg-accent/10 px-3.5 py-2 text-[12.5px] font-medium text-accent hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          <FileText className="size-3.5" aria-hidden /> Générer ce CV adapté <ArrowUpRight className="size-3" aria-hidden />
        </Link>
      </div>

      <div className="mt-4 border-t border-line/70 pt-4">
        <p className="text-[13px] font-semibold text-foreground">Missions & Responsabilités types :</p>
        <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{role.missions}</p>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-1.5">
        <span className="text-[11.5px] font-medium text-subtle-foreground mr-1">Outils & expertises clés :</span>
        {role.keyTools.map((tool) => (
          <span
            key={tool}
            className="rounded-lg border border-line bg-surface-2 px-2.5 py-0.5 font-mono text-[11px] font-medium text-foreground"
          >
            {tool}
          </span>
        ))}
      </div>

      {/* Copyable pitch section */}
      <div className="mt-5 rounded-xl border border-line bg-surface/60 p-4">
        <div className="flex items-center justify-between gap-2">
          <p className="flex items-center gap-1.5 text-[12px] font-semibold text-foreground">
            <Sparkles className="size-3.5 text-accent" aria-hidden /> Pitch de candidature prêt à l'emploi (Lettre / Entretien) :
          </p>
          <button
            type="button"
            onClick={copyPitch}
            className="inline-flex items-center gap-1 rounded-lg border border-line bg-surface px-2.5 py-1 text-[11.5px] font-medium text-muted-foreground hover:bg-surface-2 hover:text-foreground"
          >
            {copiedPitch ? <Check className="size-3 text-success" aria-hidden /> : <Copy className="size-3" aria-hidden />}
            <span>{copiedPitch ? "Pitch copié !" : "Copier le pitch"}</span>
          </button>
        </div>
        <p className="mt-2 text-[12.5px] italic leading-relaxed text-muted-foreground">
          « {role.pitch} »
        </p>
      </div>
    </article>
  )
}
