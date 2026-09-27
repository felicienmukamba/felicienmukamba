import { BrainCircuit, Code2, Inbox, Network, Rocket, Search, ShieldCheck, UserCheck } from "lucide-react"
import type { ComponentType, SVGProps } from "react"
import { Reveal, Spotlight } from "@/components/motion"
import { Section, SectionHeading } from "@/components/ui-kit"
import type { Dictionary } from "@/lib/dictionaries"
import { cn } from "@/lib/utils"

type Icon = ComponentType<SVGProps<SVGSVGElement>>

function Connector({ className }: { className?: string }) {
  return (
    <li aria-hidden className={cn("flex items-center justify-center", className)}>
      <svg className="hidden h-2 w-full md:block" preserveAspectRatio="none" viewBox="0 0 100 2">
        <line x1="0" y1="1" x2="100" y2="1" stroke="var(--line-strong)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
        <line
          x1="0"
          y1="1"
          x2="100"
          y2="1"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeDasharray="4 8"
          vectorEffect="non-scaling-stroke"
          className="animate-dash"
        />
      </svg>
      <svg className="h-8 w-2 md:hidden" preserveAspectRatio="none" viewBox="0 0 2 100">
        <line x1="1" y1="0" x2="1" y2="100" stroke="var(--line-strong)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
        <line
          x1="1"
          y1="0"
          x2="1"
          y2="100"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeDasharray="4 8"
          vectorEffect="non-scaling-stroke"
          className="animate-dash"
        />
      </svg>
    </li>
  )
}

function Node({ icon: Icon, label, tone = "neutral" }: { icon: Icon; label: string; tone?: "neutral" | "accent" | "success" }) {
  return (
    <div
      className={cn(
        "relative flex items-center gap-2 whitespace-nowrap rounded-xl border px-3.5 py-2.5 text-[13px] font-medium",
        tone === "accent" && "border-accent/40 bg-accent-soft text-foreground",
        tone === "success" && "border-success/40 bg-success/10 text-foreground",
        tone === "neutral" && "border-line bg-surface-2 text-muted-foreground",
      )}
    >
      <Icon
        className={cn(
          "size-4 shrink-0",
          tone === "accent" && "text-accent",
          tone === "success" && "text-success",
        )}
        aria-hidden
      />
      {label}
    </div>
  )
}

export function AiSection({ t }: { t: Dictionary }) {
  const { pipeline } = t.ai
  const roleIcons: Icon[] = [BrainCircuit, Network]
  const agentIcons: Icon[] = [Search, Code2, ShieldCheck]

  return (
    <Section id="ai" labelledBy="ai-title">
      <SectionHeading
        id="ai-title"
        index="02"
        kicker={t.ai.kicker}
        title={t.ai.title}
        accent={t.ai.titleAccent}
        intro={t.ai.intro}
      />

      <div className="mt-14 grid gap-5 md:grid-cols-2">
        {t.ai.roles.map((role, i) => {
          const Icon = roleIcons[i]
          return (
            <Reveal key={role.badge} delay={i * 0.1} className="h-full">
              <Spotlight className="card h-full rounded-3xl p-7 md:p-9">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent-soft px-3 py-1 font-mono text-[12px] tracking-wide text-accent">
                    <Icon className="size-3.5" aria-hidden />
                    {role.badge}
                  </span>
                  <span className="font-mono text-[12px] text-subtle-foreground">0{i + 1}</span>
                </div>
                <h3 className="mt-6 text-2xl font-semibold leading-tight tracking-[-0.025em] md:text-[1.7rem]">{role.title}</h3>
                <ul className="mt-6 space-y-3.5">
                  {role.points.map((point) => (
                    <li key={point} className="flex gap-3 text-[15px] leading-relaxed text-muted-foreground">
                      <span aria-hidden className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-accent" />
                      {point}
                    </li>
                  ))}
                </ul>
              </Spotlight>
            </Reveal>
          )
        })}
      </div>

      <Reveal delay={0.1} className="mt-5">
        <figure className="card overflow-hidden rounded-3xl">
          <div className="flex items-center justify-between border-b border-line px-6 py-4 md:px-9">
            <h3 className="text-[15px] font-medium">{pipeline.title}</h3>
            <span aria-hidden className="flex gap-1.5">
              <span className="size-2 rounded-full bg-line-strong" />
              <span className="size-2 rounded-full bg-line-strong" />
              <span className="size-2 animate-pulse rounded-full bg-success" />
            </span>
          </div>

          <div className="relative px-6 py-10 md:px-9 md:py-14">
            <div aria-hidden className="bg-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
            <ol className="relative flex flex-col items-center md:flex-row md:items-center">
              <li>
                <Node icon={Inbox} label={pipeline.request} />
              </li>
              <Connector className="md:min-w-8 md:flex-1" />
              <li>
                <Node icon={Network} label={pipeline.orchestrator} tone="accent" />
              </li>
              <Connector className="md:min-w-8 md:flex-1" />
              <li>
                <ul className="flex flex-wrap justify-center gap-2 md:flex-col">
                  {pipeline.agents.map((agent, i) => (
                    <li key={agent}>
                      <Node icon={agentIcons[i]} label={agent} />
                    </li>
                  ))}
                </ul>
              </li>
              <Connector className="md:min-w-8 md:flex-1" />
              <li>
                <Node icon={UserCheck} label={pipeline.human} tone="success" />
              </li>
              <Connector className="md:min-w-8 md:flex-1" />
              <li>
                <Node icon={Rocket} label={pipeline.ship} />
              </li>
            </ol>
          </div>

          <figcaption className="border-t border-line px-6 py-5 text-[15px] leading-relaxed text-muted-foreground md:px-9">
            {pipeline.caption}
          </figcaption>
        </figure>
      </Reveal>
    </Section>
  )
}
