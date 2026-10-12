"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { ArrowUpRight, Building2, Check, Copy, ExternalLink, FileText, Filter, GraduationCap, HeartHandshake, Landmark, Mail, Phone, Search, Sparkles, UserCheck } from "lucide-react"
import { Button, CopyButton } from "@/components/kit/controls"
import { PORTAL_REFERENCES, type ReferenceCategory, type ReferencePerson } from "@/lib/portal/directory"
import { cn } from "@/lib/utils"

const CATEGORY_TABS: { value: ReferenceCategory; label: string; Icon: React.ComponentType<{ className?: string }> }[] = [
  { value: "all", label: "Toutes", Icon: UserCheck },
  { value: "ngo", label: "ONG & Humanitaire", Icon: HeartHandshake },
  { value: "tech", label: "Entreprises & Tech", Icon: Building2 },
  { value: "academic", label: "Académique & Éducation", Icon: GraduationCap },
  { value: "gov", label: "Administration Publique", Icon: Landmark },
]

export function ReferencesManager({ compact = false }: { compact?: boolean }) {
  const [selectedCategory, setSelectedCategory] = useState<ReferenceCategory>("all")
  const [search, setSearch] = useState("")

  const filtered = useMemo(() => {
    return PORTAL_REFERENCES.filter((r) => {
      const matchCategory = selectedCategory === "all" || r.category === selectedCategory
      const query = search.trim().toLowerCase()
      const matchSearch =
        !query ||
        r.name.toLowerCase().includes(query) ||
        r.role.toLowerCase().includes(query) ||
        r.organization.toLowerCase().includes(query) ||
        r.location.toLowerCase().includes(query) ||
        r.tags.some((t) => t.toLowerCase().includes(query))
      return matchCategory && matchSearch
    })
  }, [selectedCategory, search])

  const fullBlockText = useMemo(() => {
    return filtered
      .map(
        (r, i) =>
          `${i + 1}. ${r.name}\n   ${r.role} — ${r.organization}\n   Lieu : ${r.location}\n   Contact : ${[...r.phones, ...(r.emails ?? [])].join(" / ")}\n   Contexte : ${r.relationship}`,
      )
      .join("\n\n")
  }, [filtered])

  return (
    <div className="space-y-6">
      {/* Header controls & filter bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-1.5">
          {CATEGORY_TABS.map(({ value, label, Icon }) => {
            const count = value === "all" ? PORTAL_REFERENCES.length : PORTAL_REFERENCES.filter((r) => r.category === value).length
            const active = selectedCategory === value
            return (
              <button
                key={value}
                type="button"
                onClick={() => setSelectedCategory(value)}
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12.5px] font-medium transition-colors",
                  active
                    ? "bg-accent text-accent-foreground shadow-sm"
                    : "border border-line bg-surface hover:bg-surface-2 text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon className="size-3.5" aria-hidden />
                <span>{label}</span>
                <span className={cn("ml-0.5 rounded-full px-1.5 py-0.2 font-mono text-[10px]", active ? "bg-accent-foreground/20 text-accent-foreground" : "bg-line text-subtle-foreground")}>
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        <div className="flex items-center gap-2">
          <div className="relative min-w-[200px] flex-1 sm:w-60">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-subtle-foreground" aria-hidden />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher nom, poste, ONG…"
              className="w-full rounded-full border border-line-strong bg-background py-1.5 pl-8 pr-3 text-[12.5px] outline-none transition-colors placeholder:text-subtle-foreground focus:border-accent"
            />
          </div>
          <CopyButton
            text={fullBlockText}
            label={compact ? "Copier" : "Copier la sélection"}
            copiedLabel="Copié !"
            size="sm"
          />
        </div>
      </div>

      {/* Grid of reference persons */}
      <div className={cn("grid gap-4", compact ? "sm:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3")}>
        {filtered.map((person) => (
          <ReferenceCard key={person.id} person={person} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="card rounded-2xl p-8 text-center">
          <p className="text-[14px] text-muted-foreground">Aucune référence ne correspond à votre filtre.</p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory("all")
              setSearch("")
            }}
            className="mt-3 text-[12.5px] font-medium text-accent hover:underline"
          >
            Réinitialiser les filtres
          </button>
        </div>
      )}

      {/* Footer tips and link to CV studio */}
      <div className="flex flex-col gap-3 rounded-2xl border border-line bg-surface-2/60 p-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[12px] text-muted-foreground">
          Ces coordonnées sont intégrées dans le moteur du CV. Vous pouvez les cocher et les ordonner directement dans chaque profil.
        </p>
        <Link
          href="/portal/cv"
          className="inline-flex shrink-0 items-center gap-1.5 text-[12.5px] font-semibold text-accent hover:underline"
        >
          <FileText className="size-3.5" aria-hidden /> Ouvrir dans le Studio CV <ArrowUpRight className="size-3" aria-hidden />
        </Link>
      </div>
    </div>
  )
}

function ReferenceCard({ person }: { person: ReferencePerson }) {
  const [copiedLine, setCopiedLine] = useState(false)

  const copyCvLine = async () => {
    await navigator.clipboard.writeText(person.cvLine)
    setCopiedLine(true)
    setTimeout(() => setCopiedLine(false), 1600)
  }

  const categoryBadgeColors = {
    tech: "border-blue-500/30 bg-blue-500/10 text-blue-400",
    ngo: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
    academic: "border-purple-500/30 bg-purple-500/10 text-purple-400",
    gov: "border-amber-500/30 bg-amber-500/10 text-amber-400",
  }[person.category]

  return (
    <article className="card group relative flex flex-col justify-between rounded-2xl p-5 transition-colors hover:border-line-strong">
      <div>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span
              className={cn(
                "grid size-10 shrink-0 place-items-center rounded-xl font-mono text-[13px] font-bold",
                person.category === "tech" && "bg-blue-500/15 text-blue-400",
                person.category === "ngo" && "bg-emerald-500/15 text-emerald-400",
                person.category === "academic" && "bg-purple-500/15 text-purple-400",
                person.category === "gov" && "bg-amber-500/15 text-amber-400",
              )}
            >
              {person.name
                .split(" ")
                .filter(Boolean)
                .slice(0, 2)
                .map((w) => w[0].toUpperCase())
                .join("")}
            </span>
            <div className="min-w-0">
              <h3 className="truncate text-[15px] font-semibold tracking-tight text-foreground">{person.name}</h3>
              <p className="truncate text-[12.5px] font-medium text-muted-foreground">{person.organization}</p>
            </div>
          </div>
          <span className={cn("shrink-0 rounded-full border px-2 py-0.5 text-[10.5px] font-medium", categoryBadgeColors)}>
            {person.categoryLabel}
          </span>
        </div>

        <p className="mt-3 text-[13px] leading-snug text-foreground/90 font-medium">
          {person.role}
        </p>

        <p className="mt-2 text-[12px] leading-relaxed text-subtle-foreground">
          {person.relationship}
        </p>

        {/* Tags */}
        <div className="mt-3 flex flex-wrap gap-1">
          {person.tags.map((tag) => (
            <span key={tag} className="rounded-md bg-surface-2 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-5 space-y-3 border-t border-line pt-4">
        {/* Contact direct buttons */}
        <div className="flex flex-col gap-1.5">
          {person.phones.map((phone) => (
            <div key={phone} className="flex items-center justify-between gap-2 text-[12px]">
              <a
                href={`tel:${phone.replace(/\s+/g, "")}`}
                className="inline-flex items-center gap-1.5 font-mono text-muted-foreground hover:text-accent hover:underline"
                title="Appeler"
              >
                <Phone className="size-3 text-accent" aria-hidden />
                <span>{phone}</span>
              </a>
              <CopyButton text={phone} label="Copier" copiedLabel="Copié" size="sm" />
            </div>
          ))}

          {person.emails?.map((email) => (
            <div key={email} className="flex items-center justify-between gap-2 text-[12px]">
              <a
                href={`mailto:${email}`}
                className="inline-flex min-w-0 items-center gap-1.5 truncate font-mono text-muted-foreground hover:text-accent hover:underline"
                title="Envoyer un e-mail"
              >
                <Mail className="size-3 shrink-0 text-accent" aria-hidden />
                <span className="truncate">{email}</span>
              </a>
              <CopyButton text={email} label="Copier" copiedLabel="Copié" size="sm" />
            </div>
          ))}
        </div>

        {/* One-click copy line for CV / cover letter */}
        <button
          type="button"
          onClick={copyCvLine}
          className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-line bg-surface px-3 py-1.5 text-[11.5px] font-medium text-muted-foreground transition-colors hover:border-line-strong hover:bg-surface-2 hover:text-foreground"
        >
          {copiedLine ? <Check className="size-3.5 text-success" aria-hidden /> : <Copy className="size-3.5" aria-hidden />}
          <span>{copiedLine ? "Ligne CV copiée !" : "Copier la référence complète"}</span>
        </button>
      </div>
    </article>
  )
}
