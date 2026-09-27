import type { ReactNode } from "react"
import { Reveal } from "@/components/motion"
import { cn } from "@/lib/utils"

export function SectionHeading({
  id,
  index,
  kicker,
  title,
  accent,
  intro,
  className,
}: {
  id: string
  index: string
  kicker: string
  title: string
  accent: string
  intro?: string
  className?: string
}) {
  return (
    <Reveal className={className}>
      <p className="flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.16em] text-subtle-foreground">
        <span className="text-accent">{index}</span>
        <span aria-hidden className="h-px w-8 bg-line-strong" />
        {kicker}
      </p>
      <h2
        id={id}
        className="mt-5 text-[clamp(2.1rem,4.8vw,3.9rem)] font-semibold leading-[1.02] tracking-[-0.04em]"
      >
        {title}{" "}
        <span className="font-serif text-[1.06em] font-normal italic tracking-[-0.015em] text-gradient">{accent}</span>
      </h2>
      {intro && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">{intro}</p>}
    </Reveal>
  )
}

export function Section({
  id,
  labelledBy,
  className,
  children,
}: {
  id: string
  labelledBy: string
  className?: string
  children: ReactNode
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn("container-page py-24 md:py-32", className)}>
      {children}
    </section>
  )
}

export function Tag({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "accent" }) {
  return (
    <li
      className={cn(
        "rounded-full border px-2.5 py-1 font-mono text-[11px] leading-none tracking-wide",
        tone === "accent"
          ? "border-accent/30 bg-accent-soft text-accent"
          : "border-line bg-surface-2/60 text-muted-foreground",
      )}
    >
      {children}
    </li>
  )
}

export function Marquee({ items }: { items: readonly string[] }) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-12 pr-12">
      {items.map((item) => (
        <li key={item} className="whitespace-nowrap text-lg font-medium tracking-tight text-subtle-foreground md:text-xl">
          {item}
        </li>
      ))}
    </ul>
  )

  return (
    <div className="mask-fade-x group flex overflow-hidden py-2">
      <div className="flex animate-marquee group-hover:[animation-play-state:paused]">
        {row(false)}
        {row(true)}
      </div>
    </div>
  )
}
