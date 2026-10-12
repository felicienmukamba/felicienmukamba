"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { ArrowUpRight, Award, Calendar, CheckCircle2, ChevronRight, ExternalLink, FileText, Globe, Layers, MapPin, Sparkles, Tag, Users, Wrench } from "lucide-react"
import { CopyButton } from "@/components/kit/controls"
import { PORTAL_TRAININGS, type TrainingRecord } from "@/lib/portal/directory"
import { cn } from "@/lib/utils"

export function TrainingsView({ compact = false }: { compact?: boolean }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const categories = useMemo(() => {
    return [
      { id: "all", label: "Toutes les formations" },
      { id: "humanitarian", label: "Humanitaire & MEAL" },
      { id: "management", label: "Gestion de projet & Agile" },
      { id: "data", label: "Data & UI/UX" },
      { id: "tech", label: "Ingénierie & Code" },
    ]
  }, [])

  const filtered = useMemo(() => {
    return PORTAL_TRAININGS.filter((t) => {
      if (selectedCategory === "all") return true
      return t.category === selectedCategory
    })
  }, [selectedCategory])

  const ermTraining = PORTAL_TRAININGS.find((t) => t.id === "erm-ocha-reach-2026")!

  return (
    <div className="space-y-8">
      {/* Spotlight: OCHA & REACH ERM Training */}
      <section className="relative overflow-hidden rounded-3xl border border-accent/40 bg-gradient-to-br from-accent/10 via-surface to-background p-6 md:p-8 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/20 px-3 py-1 font-mono text-[11px] font-semibold text-accent">
                <Sparkles className="size-3" aria-hidden /> Session d'excellence certifiée
              </span>
              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-400">
                OCHA & REACH Initiative
              </span>
              <span className="rounded-full border border-line bg-surface-2 px-2.5 py-0.5 text-[11px] font-medium text-subtle-foreground">
                Bukavu, RDC
              </span>
            </div>

            <h2 className="text-xl font-bold tracking-tight text-foreground md:text-2xl">
              {ermTraining.title}
            </h2>

            <p className="text-[14px] leading-relaxed text-muted-foreground">
              {ermTraining.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-1 font-mono text-[12px] text-subtle-foreground">
              <span className="flex items-center gap-1.5">
                <Calendar className="size-3.5 text-accent" aria-hidden /> {ermTraining.date}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="size-3.5 text-accent" aria-hidden /> {ermTraining.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="size-3.5 text-accent" aria-hidden /> Facilitateurs OCHA & REACH
              </span>
            </div>
          </div>

          <div className="flex shrink-0 flex-col gap-2.5 sm:flex-row lg:flex-col">
            {ermTraining.url && (
              <a
                href={ermTraining.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-[13px] font-medium text-accent-foreground shadow transition hover:opacity-95"
              >
                <span>Voir le post officiel</span>
                <ExternalLink className="size-3.5" aria-hidden />
              </a>
            )}
            <CopyButton
              text={`${ermTraining.title} — ${ermTraining.provider} & ${ermTraining.partner} (${ermTraining.date}, ${ermTraining.location})`}
              label="Copier la mention CV"
              copiedLabel="Mention copiée !"
              size="md"
            />
          </div>
        </div>

        {/* Deep dive pillars */}
        <div className="mt-7 grid gap-4 border-t border-line/60 pt-6 md:grid-cols-3">
          <div className="rounded-2xl border border-line bg-surface/70 p-4">
            <div className="flex items-center gap-2 text-[13.5px] font-semibold text-foreground">
              <span className="grid size-6 place-items-center rounded-lg bg-blue-500/15 text-[11px] font-bold text-blue-400">1</span>
              <span>Compréhension & Outils</span>
            </div>
            <p className="mt-2 text-[12.5px] leading-relaxed text-muted-foreground">
              Analyse du contexte humanitaire, révision des outils ERM, appropriation de l'outil <strong>Ehtools</strong> et maîtrise du nouveau package d'évaluation rapide.
            </p>
          </div>

          <div className="rounded-2xl border border-line bg-surface/70 p-4">
            <div className="flex items-center gap-2 text-[13.5px] font-semibold text-foreground">
              <span className="grid size-6 place-items-center rounded-lg bg-emerald-500/15 text-[11px] font-bold text-emerald-400">2</span>
              <span>Transversalité & Inclusion</span>
            </div>
            <p className="mt-2 text-[12.5px] leading-relaxed text-muted-foreground">
              Intégration renforcée des indicateurs <strong>PSEA</strong> (Protection contre l'exploitation et les abus sexuels), <strong>AAP</strong> (Redevabilité & Engagement communautaire), Genre et Handicap.
            </p>
          </div>

          <div className="rounded-2xl border border-line bg-surface/70 p-4">
            <div className="flex items-center gap-2 text-[13.5px] font-semibold text-foreground">
              <span className="grid size-6 place-items-center rounded-lg bg-purple-500/15 text-[11px] font-bold text-purple-400">3</span>
              <span>Pratique de terrain & Analyse</span>
            </div>
            <p className="mt-2 text-[12.5px] leading-relaxed text-muted-foreground">
              Maîtrise des techniques d'<strong>échantillonnage statistique</strong>, enquêtes de terrain, simulation pratique et rapportage rapide de données fiables et structurées.
            </p>
          </div>
        </div>

        {/* Tools tag cloud */}
        <div className="mt-5 flex flex-wrap items-center gap-1.5">
          <span className="text-[11.5px] font-medium text-subtle-foreground mr-1">Outils & concepts clés :</span>
          {ermTraining.tools.map((tool) => (
            <span
              key={tool}
              className="rounded-lg border border-line bg-surface px-2.5 py-1 font-mono text-[11px] font-medium text-foreground"
            >
              {tool}
            </span>
          ))}
        </div>
      </section>

      {/* Filter tabs */}
      <div className="flex flex-wrap items-center gap-1.5">
        {categories.map((c) => {
          const active = selectedCategory === c.id
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => setSelectedCategory(c.id)}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-[12.5px] font-medium transition-colors",
                active
                  ? "bg-foreground text-background shadow-sm"
                  : "border border-line bg-surface hover:bg-surface-2 text-muted-foreground hover:text-foreground",
              )}
            >
              {c.label}
            </button>
          )
        })}
      </div>

      {/* Grid of other trainings */}
      <div className={cn("grid gap-4", compact ? "sm:grid-cols-2" : "md:grid-cols-2")}>
        {filtered.map((item) => (
          <article
            key={item.id}
            className={cn(
              "card flex flex-col justify-between rounded-2xl p-6 transition-colors hover:border-line-strong",
              item.highlight && "border-accent/40 bg-accent-soft/30",
            )}
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <span className="rounded-full border border-line bg-surface-2 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                  {item.categoryLabel}
                </span>
                <span className="font-mono text-[11.5px] text-subtle-foreground">{item.date}</span>
              </div>

              <h3 className="mt-3 text-[16px] font-semibold tracking-tight text-foreground">{item.title}</h3>
              <p className="mt-1 text-[13px] font-medium text-accent">
                {item.provider} {item.partner ? `· ${item.partner}` : ""}
              </p>

              <p className="mt-2.5 text-[13px] leading-relaxed text-muted-foreground">{item.description}</p>

              {item.modules.length > 0 && (
                <ul className="mt-4 space-y-1.5 border-t border-line pt-3 text-[12px] text-subtle-foreground">
                  {item.modules.map((m, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-accent" aria-hidden />
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="mt-5 flex items-center justify-between gap-2 border-t border-line pt-4">
              <div className="flex flex-wrap gap-1">
                {item.tools.slice(0, 3).map((t) => (
                  <span key={t} className="rounded-md bg-surface-2 px-1.5 py-0.5 font-mono text-[10.5px] text-subtle-foreground">
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-1.5">
                {item.url && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-line text-muted-foreground hover:text-foreground hover:border-line-strong"
                    title="Lien officiel"
                  >
                    <ExternalLink className="size-3.5" aria-hidden />
                  </a>
                )}
                <CopyButton
                  text={`${item.title} — ${item.provider} (${item.date})`}
                  label="Copier"
                  copiedLabel="Copié"
                  size="sm"
                />
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
