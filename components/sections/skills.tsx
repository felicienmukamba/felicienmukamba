import { BrainCircuit, Code2, Database, Layers, Network, PenTool, ShieldCheck } from "lucide-react"
import { Reveal, Spotlight } from "@/components/motion"
import { Section, SectionHeading, Tag } from "@/components/ui-kit"
import type { Dictionary } from "@/lib/dictionaries"
import { cn } from "@/lib/utils"

const icons = [BrainCircuit, Network, Layers, PenTool, Code2, Database, ShieldCheck]

/** Bento on a 12-column grid: two wide AI cards, a row of three, then a row of two. */
function span(i: number, highlight: boolean) {
  if (highlight) return "lg:col-span-6"
  return i < 5 ? "lg:col-span-4" : "lg:col-span-6"
}

export function Skills({ t }: { t: Dictionary }) {
  return (
    <Section id="skills" labelledBy="skills-title">
      <SectionHeading id="skills-title" index="05" kicker={t.skills.kicker} title={t.skills.title} accent={t.skills.titleAccent} />

      <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-12">
        {t.skills.categories.map((category, i) => {
          const Icon = icons[i]
          return (
            <Reveal
              key={category.name}
              delay={(i % 2) * 0.08}
              className={span(i, category.highlight)}
            >
              <Spotlight
                className={cn(
                  "card h-full rounded-3xl p-7",
                  category.highlight && "bg-[linear-gradient(160deg,var(--accent-soft),transparent_55%)]",
                )}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "grid size-10 place-items-center rounded-xl border",
                      category.highlight ? "border-accent/30 bg-accent-soft text-accent" : "border-line bg-surface-2 text-muted-foreground",
                    )}
                  >
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="text-lg font-semibold tracking-[-0.02em]">{category.name}</h3>
                </div>
                <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">{category.description}</p>
                <ul className="mt-6 flex flex-wrap gap-1.5">
                  {category.items.map((skill) => (
                    <Tag key={skill} tone={category.highlight ? "accent" : "neutral"}>
                      {skill}
                    </Tag>
                  ))}
                </ul>
              </Spotlight>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
