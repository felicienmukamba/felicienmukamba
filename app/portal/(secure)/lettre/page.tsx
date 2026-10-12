import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, FileText, Sparkles } from "lucide-react"
import { CoverLetterStudio } from "@/components/portal/cover-letter-studio"
import { requireSession } from "@/lib/portal/auth"

export const metadata: Metadata = { title: "Lettres de Motivation & Pitchs · Portail privé" }

export default async function CoverLetterPage({
  searchParams,
}: {
  searchParams: Promise<{ role?: string }>
}) {
  await requireSession()
  const { role } = await searchParams
  const roleId = typeof role === "string" ? role : undefined

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
          <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-accent">Studio de Rédaction & Candidatures</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-[-0.03em] md:text-4xl">
            Lettres de Motivation & Pitchs
          </h1>
          <p className="mt-2 max-w-2xl text-[14px] text-muted-foreground">
            Générez en temps réel des lettres de motivation sur-mesure et des pitchs courts pour vos candidatures en entreprises Tech ou en ONG, avec vos réalisations chiffrées et vos répondants de référence.
          </p>
        </div>

        <Link
          href="/portal/postes"
          className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-line bg-surface px-4 py-2.5 text-[13px] font-semibold text-foreground hover:bg-surface-2 transition"
        >
          <span>Voir les 25 postes cibles</span>
        </Link>
      </div>

      <div className="mt-10">
        <CoverLetterStudio initialRoleId={roleId} />
      </div>
    </main>
  )
}
