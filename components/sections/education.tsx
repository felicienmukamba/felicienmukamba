import Image from "next/image"
import { Award, GraduationCap, Languages } from "lucide-react"
import { Reveal, Spotlight } from "@/components/motion"
import { Section, SectionHeading } from "@/components/ui-kit"
import type { Dictionary } from "@/lib/dictionaries"

export function Education({ t }: { t: Dictionary }) {
  return (
    <Section id="education" labelledBy="education-title">
      <SectionHeading
        id="education-title"
        index="06"
        kicker={t.education.kicker}
        title={t.education.title}
        accent={t.education.titleAccent}
      />

      <div className="mt-14 grid gap-5 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <Spotlight className="card h-full rounded-3xl p-7 md:p-9">
            <ol className="space-y-8">
              {t.education.items.map((item) => (
                <li key={item.degree} className="grid gap-2 sm:grid-cols-[8.5rem_1fr] sm:gap-6">
                  <p className="font-mono text-[12px] tracking-wide text-subtle-foreground sm:pt-1">{item.period}</p>
                  <div>
                    <h3 className="flex items-start gap-2 text-[17px] font-semibold tracking-[-0.015em]">
                      <GraduationCap className="mt-0.5 size-[18px] shrink-0 text-accent" aria-hidden />
                      {item.degree}
                    </h3>
                    <p className="mt-1 text-[15px]">{item.school}</p>
                    <p className="mt-1 text-[14px] text-muted-foreground">{item.description}</p>
                  </div>
                </li>
              ))}
            </ol>

            <h3 className="mt-12 flex items-center gap-2 border-t border-line pt-8 text-[15px] font-semibold">
              <Award className="size-[18px] text-accent" aria-hidden />
              {t.education.certificationsTitle}
            </h3>
            <ul className="mt-5 grid gap-4 sm:grid-cols-2">
              {t.education.certifications.map((cert) => (
                <li key={cert.name} className="rounded-2xl border border-line p-4">
                  <p className="text-[14px] font-medium leading-snug">{cert.name}</p>
                  <p className="mt-2 font-mono text-[11px] tracking-wide text-subtle-foreground">
                    {cert.provider} · {cert.year}
                  </p>
                </li>
              ))}
            </ul>
          </Spotlight>
        </Reveal>

        <div className="grid gap-5 lg:col-span-5">
          <Reveal delay={0.08}>
            <figure className="card overflow-hidden rounded-3xl p-2">
              <div className="relative aspect-[638/312] overflow-hidden rounded-[1.1rem]">
                <Image
                  src="/images/community-training.jpg"
                  alt={t.education.communityCaption}
                  fill
                  sizes="(min-width: 1024px) 30rem, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="px-3 pb-2 pt-3 text-[13px] text-muted-foreground">{t.education.communityCaption}</figcaption>
            </figure>
          </Reveal>

          <Reveal delay={0.16}>
            <Spotlight className="card rounded-3xl p-7">
              <h3 className="flex items-center gap-2 text-[15px] font-semibold">
                <Languages className="size-[18px] text-accent" aria-hidden />
                {t.education.languagesTitle}
              </h3>
              <dl className="mt-5 grid grid-cols-2 gap-4">
                {t.education.languages.map((l) => (
                  <div key={l.name}>
                    <dt className="text-[15px] font-medium">{l.name}</dt>
                    <dd className="text-[13px] text-muted-foreground">{l.level}</dd>
                  </div>
                ))}
              </dl>
            </Spotlight>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
