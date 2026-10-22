import { Plus } from "lucide-react"
import { Reveal } from "@/components/motion"
import { Section, SectionHeading } from "@/components/ui-kit"
import type { Dictionary } from "@/lib/dictionaries"

/** Objection handling before the contact form; also published as FAQPage structured data. */
export function Faq({ t }: { t: Dictionary }) {
  const { faq } = t
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.items.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })),
  }

  return (
    <Section id="faq" labelledBy="faq-title" className="pb-0 md:pb-0">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <SectionHeading id="faq-title" index="09" kicker={faq.kicker} title={faq.title} accent={faq.titleAccent} intro={faq.intro} />
        <Reveal>
          <ul className="divide-y divide-line overflow-hidden rounded-3xl border border-line bg-surface">
            {faq.items.map((item, i) => (
              <li key={item.q}>
                <details className="group" open={i === 0}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-[15.5px] font-medium tracking-[-0.01em] transition-colors hover:bg-surface-2/60 md:px-6 md:py-5 [&::-webkit-details-marker]:hidden">
                    {item.q}
                    <Plus className="size-4 shrink-0 text-muted-foreground transition-transform duration-300 group-open:rotate-45" aria-hidden />
                  </summary>
                  <p className="px-5 pb-5 text-[14.5px] leading-relaxed text-muted-foreground md:px-6">{item.a}</p>
                </details>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  )
}
