import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Compass, FileText, Sparkles } from "lucide-react"
import { TargetRolesView } from "@/components/portal/target-roles-view"
import { requireSession } from "@/lib/portal/auth"

export const metadata: Metadata = { title: "Profils & Postes Visés · Portail privé" }

export default async function PostesPage() {
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
          <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-accent">Stratégie de Carrière & Recrutement</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-[-0.03em] md:text-4xl">
            Profils & Postes Visés
          </h1>
          <p className="mt-2 max-w-2xl text-[14px] text-muted-foreground">
            Cartographie complète de vos 5 domaines d'intervention, postes cibles (IM/MEAL, ICT/T4D, ERM Urgence, Paix & Communication, Gestion de Projet), pitchs prêts à l'emploi et CVs associés.
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
        <TargetRolesView />
      </div>
    </main>
  )
}
