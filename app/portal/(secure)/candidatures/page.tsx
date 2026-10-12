import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ArrowUpRight, Compass, FileText, Plus, Sparkles } from "lucide-react"
import { ApplicationsTracker } from "@/components/portal/applications-tracker"
import { requireSession } from "@/lib/portal/auth"

export const metadata: Metadata = { title: "Suivi des Candidatures · Portail privé" }

export default async function ApplicationsPage({
  searchParams,
}: {
  searchParams: Promise<{ role?: string }>
}) {
  await requireSession()
  const { role } = await searchParams

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
      <div className="flex items-center gap-2">
        <Link
          href="/portal"
          className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" aria-hidden /> Tableau de bord
        </Link>
      </div>

      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-accent">Pipeline de Recrutement</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-[-0.03em] md:text-4xl">
            Suivi des Candidatures
          </h1>
          <p className="mt-2 max-w-2xl text-[14px] text-muted-foreground">
            Suivez l'avancement de vos démarches de recrutement (Tech & ONG) : du brouillon à l'offre finale, avec rattachement du CV optimisé, de la lettre de motivation et des répondants de référence.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/portal/postes"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-line bg-surface px-3.5 py-2 text-[12.5px] font-semibold text-foreground hover:bg-surface-2 transition"
          >
            <Compass className="size-3.5" /> 25 Postes Cibles
          </Link>
          <Link
            href="/portal/lettre"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-accent/30 bg-accent-soft px-3.5 py-2 text-[12.5px] font-semibold text-accent hover:bg-accent hover:text-accent-foreground transition"
          >
            <FileText className="size-3.5" /> Studio Lettres
          </Link>
        </div>
      </div>

      <div className="mt-10">
        <ApplicationsTracker initialRoleTitle={role} />
      </div>
    </main>
  )
}
