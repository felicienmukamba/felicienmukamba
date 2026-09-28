import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { ToolCard } from "@/components/lab/tool-card"
import { Reveal } from "@/components/motion"
import { Section, SectionHeading } from "@/components/ui-kit"
import type { Dictionary } from "@/lib/dictionaries"
import type { Locale } from "@/lib/i18n"
import { labTools } from "@/lib/lab/tools"

export function LabTeaser({ lang, t }: { lang: Locale; t: Dictionary }) {
  return (
    <Section id="lab" labelledBy="lab-title">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading id="lab-title" index="07" kicker={t.lab.kicker} title={t.lab.title} accent={t.lab.titleAccent} intro={t.lab.intro} />
        <Reveal>
          <Link href={`/${lang}/lab`} className="group inline-flex h-11 items-center gap-2 rounded-full border border-line-strong px-5 text-[14px] font-medium transition-colors hover:bg-surface-2">
            {t.lab.open}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>
        </Reveal>
      </div>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {labTools.map((id, i) => (
          <Reveal key={id} delay={i * 0.06} className="h-full">
            <ToolCard id={id} href={`/${lang}/lab/${id}`} name={t.lab.tools[id].name} description={t.lab.tools[id].description} cta={t.lab.openTool} />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
