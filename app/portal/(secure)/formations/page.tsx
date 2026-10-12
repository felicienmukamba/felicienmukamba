import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Award, FileText, Sparkles } from "lucide-react"
import { TrainingsView } from "@/components/portal/trainings-view"
import { requireSession } from "@/lib/portal/auth"

export const metadata: Metadata = { title: "Formations & Certifications · Portail privé" }

export default async function FormationsPage() {
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
          <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-accent">Perfectionnement & Certifications</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-[-0.03em] md:text-4xl">
            Formations & Certifications Continues
          </h1>
          <p className="mt-2 max-w-2xl text-[14px] text-muted-foreground">
            Historique détaillé des formations humanitaires (OCHA, REACH Initiative), certifiantes (OpenClassrooms, Coursera, GDSC) et méthodologies acquises sur le terrain.
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
        <TrainingsView />
      </div>
    </main>
  )
}
