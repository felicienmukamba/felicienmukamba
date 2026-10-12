"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { ArrowUpRight, BarChart3, Check, Copy, Cpu, FileText, FolderKanban, Heart, Layers, Sparkles, UserCheck, Wrench, Zap } from "lucide-react"
import { CopyButton } from "@/components/kit/controls"
import { KEY_ASSETS, TARGET_CATEGORIES, type TargetCategory, type TargetRole } from "@/lib/portal/roles"
import { cn } from "@/lib/utils"

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  BarChart3,
  Cpu,
  Zap,
  Heart,
  FolderKanban,
}

export function TargetRolesView({ compact = false }: { compact?: boolean }) {
  const [activeCategoryId, setActiveCategoryId] = useState<string>("meal")

  const activeCategory = useMemo(() => {
    return TARGET_CATEGORIES.find((c) => c.id === activeCategoryId) ?? TARGET_CATEGORIES[0]
  }, [activeCategoryId])

  return (
    <div className="space-y-8">
      {/* Key Assets / Value Proposition Banner */}
      <section className="relative overflow-hidden rounded-3xl border border-accent/30 bg-gradient-to-br from-accent/15 via-surface to-background p-6 md:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/20 px-3 py-1 font-mono text-[11px] font-semibold text-accent">
              <Sparkles className="size-3" aria-hidden /> Vos Atouts Majeurs à Valoriser
            </span>
            <h2 className="mt-3 text-xl font-bold tracking-tight text-foreground md:text-2xl">
              Proposition de Valeur Unique pour Bailleurs & ONG
            </h2>
            <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
              Arguments clés à faire valoir dans vos lettres de motivation, formulaires de recrutement international et entretiens d'embauche.
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

      {/* Category Switcher Tabs */}
      <div>
        <p className="mb-3 text-[12.5px] font-semibold uppercase tracking-wider text-subtle-foreground">
          5 Domaines & Profils Visés
        </p>
        <div className="flex flex-wrap gap-2">
          {TARGET_CATEGORIES.map((cat) => {
            const Icon = ICONS[cat.iconName] || Layers
            const active = activeCategoryId === cat.id
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategoryId(cat.id)}
                className={cn(
                  "flex items-center gap-2 rounded-2xl px-4 py-2.5 text-[13px] font-medium transition-all",
                  active
                    ? "bg-accent text-accent-foreground shadow"
                    : "border border-line bg-surface hover:bg-surface-2 text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon className="size-4" aria-hidden />
                <span>{cat.badge}</span>
                <span
                  className={cn(
                    "ml-1 rounded-full px-1.5 py-0.2 font-mono text-[11px]",
                    active ? "bg-accent-foreground/20 text-accent-foreground" : "bg-surface-2 text-subtle-foreground",
                  )}
                >
                  {cat.roles.length}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Category description & roles list */}
      <div className="space-y-4">
        <div className="rounded-2xl border border-line bg-surface p-5">
          <h3 className="text-[17px] font-bold text-foreground">{activeCategory.title}</h3>
          <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">{activeCategory.description}</p>
        </div>

        <div className="grid gap-5 lg:grid-cols-1">
          {activeCategory.roles.map((role) => (
            <RoleCard key={role.id} role={role} />
          ))}
        </div>
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

  return (
    <article className="card rounded-2xl p-6 transition-colors hover:border-line-strong">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] font-medium text-accent">Poste cible</span>
            <span className="text-subtle-foreground">·</span>
            <span className="text-[12px] text-muted-foreground">{role.titleEn}</span>
          </div>
          <h4 className="text-[17px] font-bold tracking-tight text-foreground">{role.title}</h4>
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
