import { ArrowUpRight, Check } from "lucide-react"
import { Reveal } from "@/components/motion"
import { Section, SectionHeading, Tag } from "@/components/ui-kit"
import type { Dictionary } from "@/lib/dictionaries"
import { experience } from "@/lib/site"

export function Experience({ t }: { t: Dictionary }) {
  return (
    <Section id="experience" labelledBy="experience-title">
      <div className="grid gap-14 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            id="experience-title"
            index="03"
            kicker={t.experience.kicker}
            title={t.experience.title}
            accent={t.experience.titleAccent}
          />
        </div>

        <div className="relative">
          <span aria-hidden className="absolute bottom-2 left-[5px] top-2 w-px bg-gradient-to-b from-accent via-line-strong to-transparent" />
          <ol>
          {experience.map((job, i) => {
            const item = t.experience.items[job.id]
            return (
              <li key={job.id} className="relative pb-14 pl-10 last:pb-0">
                <span
                  aria-hidden
                  className="absolute left-0 top-1.5 grid size-[11px] place-items-center rounded-full border border-accent bg-background"
                >
                  {i === 0 && <span className="size-[5px] rounded-full bg-accent" />}
                </span>
                <Reveal delay={0.05}>
                  <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-subtle-foreground">
                    {item.period} · {item.location}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold tracking-[-0.02em] md:text-2xl">{item.role}</h3>
                  <p className="mt-1 text-[15px] text-accent">
                    {job.url ? (
                      <a
                        href={job.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-1 underline-offset-4 hover:underline"
                      >
                        {job.company}
                        <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                        <span className="sr-only">({t.a11y.newTab})</span>
                      </a>
                    ) : (
                      job.company
                    )}
                  </p>
                  <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground md:text-base">{item.description}</p>
                  <ul className="mt-5 space-y-3">
                    {item.achievements.map((a) => (
                      <li key={a} className="flex gap-3 text-[15px] leading-relaxed">
                        <Check className="mt-1 size-4 shrink-0 text-success" aria-hidden />
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                  {job.tech && (
                    <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Stack">
                      {job.tech.map((tech) => (
                        <Tag key={tech}>{tech}</Tag>
                      ))}
                    </ul>
                  )}
                </Reveal>
              </li>
            )
          })}
          </ol>
        </div>
      </div>
    </Section>
  )
}
