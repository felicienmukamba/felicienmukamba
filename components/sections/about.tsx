import { Reveal, Spotlight } from "@/components/motion"
import { Section, SectionHeading } from "@/components/ui-kit"
import type { Dictionary } from "@/lib/dictionaries"

export function About({ t }: { t: Dictionary }) {
  return (
    <Section id="about" labelledBy="about-title">
      <div className="grid gap-14 lg:grid-cols-[1.35fr_1fr] lg:gap-20">
        <div>
          <SectionHeading id="about-title" index="01" kicker={t.about.kicker} title={t.about.title} accent={t.about.titleAccent} />
          <div className="mt-10 space-y-6 text-[17px] leading-[1.75] text-muted-foreground md:text-lg">
            {t.about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.08 * i}>
                <p className={i === 0 ? "text-foreground" : undefined}>{p}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.15} className="lg:pt-24">
          <Spotlight className="card rounded-3xl p-2">
            <dl className="divide-y divide-line">
              {t.about.facts.map((fact) => (
                <div key={fact.label} className="grid gap-1 px-5 py-5 sm:grid-cols-[7rem_1fr] sm:gap-4">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-subtle-foreground sm:pt-0.5">
                    {fact.label}
                  </dt>
                  <dd className="text-[15px] leading-snug">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Spotlight>
        </Reveal>
      </div>
    </Section>
  )
}
