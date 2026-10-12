import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, FileText, Sparkles, UserCheck } from "lucide-react"
import { ReferencesManager } from "@/components/portal/references-manager"
import { requireSession } from "@/lib/portal/auth"

export const metadata: Metadata = { title: "Personnes de Références · Portail privé" }

export default async function ReferencesPage() {
  await requireSession()

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
          <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-accent">Carnet professionnel & vérifications</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-[-0.03em] md:text-4xl">
            Personnes de Références
          </h1>
          <p className="mt-2 max-w-2xl text-[14px] text-muted-foreground">
            Coordonnées vérifiées des référents académiques, institutionnels, techniques et humanitaires. Prêts à être activés sur vos CVs ou copiés pour vos dossiers de candidature.
          </p>
        </div>

        <Link
          href="/portal/cv"
          className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-[13px] font-semibold text-accent-foreground shadow transition hover:opacity-95"
        >
          <FileText className="size-4" aria-hidden /> Studio CV
        </Link>
      </div>

      <div className="mt-10">
        <ReferencesManager />
      </div>
    </main>
  )
}
