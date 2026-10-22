"use client"

import { useState } from "react"
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  BrainCircuit,
  Building2,
  CheckCircle2,
  Compass,
  Headphones,
  Layers,
  Mail,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react"
import { Reveal, Spotlight } from "@/components/motion"
import { Section, SectionHeading, Tag } from "@/components/ui-kit"
import type { Dictionary } from "@/lib/dictionaries"
import type { Locale } from "@/lib/i18n"
import { site } from "@/lib/site"
import { cn } from "@/lib/utils"
import { whatsappUrl } from "@/lib/whatsapp"

const serviceIcons: Record<string, typeof Compass> = {
  diagnostic: Compass,
  automation: Zap,
  software: Layers,
  ai: BrainCircuit,
  sectors: Building2,
  maintenance: Headphones,
}

export function Services({ lang, t }: { lang: Locale; t: Dictionary }) {
  const [filter, setFilter] = useState<"all" | "core" | "sector">("all")
  const { services } = t

  const filteredItems = services.items.filter((item) => {
    if (filter === "all") return true
    return item.category === filter
  })

  return (
    <Section id="services" labelledBy="services-title">
      <SectionHeading
        id="services-title"
        index="01"
        kicker={services.kicker}
        title={services.title}
        accent={services.titleAccent}
        intro={services.intro}
      />

      {/* Negotiable pricing highlight banner */}
      <Reveal className="mt-10">
        <div className="relative overflow-hidden rounded-3xl border border-accent/40 bg-gradient-to-br from-accent-soft via-surface to-surface-2 p-6 md:p-8">
          <div aria-hidden className="bg-grid absolute inset-0 opacity-40" />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent-soft px-3.5 py-1 font-mono text-[12px] font-medium text-accent">
                <Sparkles className="size-3.5" aria-hidden />
                {services.negotiableNotice.badge}
              </div>
              <h3 className="text-xl font-semibold tracking-[-0.02em] md:text-2xl">
                {services.negotiableNotice.title}
              </h3>
              <p className="text-[15px] leading-relaxed text-muted-foreground md:text-[16px]">
                {services.negotiableNotice.description}
              </p>
            </div>
            <a
              href={whatsappUrl(services.ctaBanner.waMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-foreground px-6 text-[14px] font-medium text-background transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
            >
              <MessageSquare className="size-4" aria-hidden />
              {services.negotiableNotice.cta}
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
            </a>
          </div>
        </div>
      </Reveal>

      {/* Filter Tabs */}
      <div className="mt-12 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setFilter("all")}
          className={cn(
            "rounded-full px-4 py-2 font-mono text-[12px] font-medium tracking-wide transition-all",
            filter === "all"
              ? "bg-foreground text-background shadow-sm"
              : "border border-line bg-surface text-muted-foreground hover:bg-surface-2 hover:text-foreground",
          )}
        >
          {services.filterAll}
        </button>
        <button
          type="button"
          onClick={() => setFilter("core")}
          className={cn(
            "rounded-full px-4 py-2 font-mono text-[12px] font-medium tracking-wide transition-all",
            filter === "core"
              ? "bg-foreground text-background shadow-sm"
              : "border border-line bg-surface text-muted-foreground hover:bg-surface-2 hover:text-foreground",
          )}
        >
          {services.filterCore}
        </button>
        <button
          type="button"
          onClick={() => setFilter("sector")}
          className={cn(
            "rounded-full px-4 py-2 font-mono text-[12px] font-medium tracking-wide transition-all",
            filter === "sector"
              ? "bg-foreground text-background shadow-sm"
              : "border border-line bg-surface text-muted-foreground hover:bg-surface-2 hover:text-foreground",
          )}
        >
          {services.filterSectors}
        </button>
      </div>

      {/* Services Grid */}
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item, i) => {
          const Icon = serviceIcons[item.id] ?? Layers
          return (
            <Reveal key={item.id} delay={i * 0.06} className="h-full">
              <Spotlight
                className={cn(
                  "card flex h-full flex-col justify-between rounded-3xl p-7 transition-all duration-300",
                  item.highlight && "border-accent/40 bg-[linear-gradient(160deg,var(--accent-soft),transparent_65%)]",
                )}
              >
                <div>
                  {/* Top Bar: Icon + Pricing Badge (Negotiable) */}
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className={cn(
                        "grid size-11 place-items-center rounded-2xl border",
                        item.highlight
                          ? "border-accent/40 bg-accent text-accent-foreground"
                          : "border-line bg-surface-2 text-foreground",
                      )}
                    >
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <span className="rounded-full border border-line-strong bg-surface-2/80 px-3 py-1 font-mono text-[11px] font-medium text-muted-foreground">
                      {item.pricingTag}
                    </span>
                  </div>

                  {/* Badge & Title */}
                  <div className="mt-5">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-accent">
                      {item.badge}
                    </span>
                    <h3 className="mt-1.5 text-xl font-semibold leading-snug tracking-[-0.02em]">
                      {item.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="mt-3.5 text-[14.5px] leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>

                  {/* Deliverables */}
                  <ul className="mt-5 space-y-2.5 border-t border-line/80 pt-5">
                    {item.deliverables.map((d) => (
                      <li key={d} className="flex items-start gap-2.5 text-[13.5px] leading-snug text-muted-foreground">
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-5">
                  {/* Tags */}
                  <ul className="flex flex-wrap gap-1.5" aria-label="Tags">
                    {item.tags.map((tag) => (
                      <Tag key={tag} tone={item.highlight ? "accent" : "neutral"}>
                        {tag}
                      </Tag>
                    ))}
                  </ul>

                  {/* Action Link to WhatsApp with custom prompt */}
                  <div className="mt-5 border-t border-line pt-4">
                    <a
                      href={whatsappUrl(item.waPrompt)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "group flex w-full items-center justify-between rounded-2xl px-4 py-2.5 text-[13px] font-medium transition-colors",
                        item.highlight
                          ? "bg-foreground text-background hover:opacity-90"
                          : "border border-line bg-surface-2/60 text-foreground hover:bg-surface-2",
                      )}
                    >
                      <span>{item.cta}</span>
                      <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                    </a>
                  </div>
                </div>
              </Spotlight>
            </Reveal>
          )
        })}
      </div>

      {/* Methodology Section: How We Work */}
      <div className="mt-20">
        <Reveal>
          <div className="flex flex-col gap-2">
            <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">
              {services.methodTitle}
            </h3>
            <p className="max-w-2xl text-[16px] text-muted-foreground">
              {services.methodSubtitle}
            </p>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.methodSteps.map((step, i) => (
            <Reveal key={step.number} delay={i * 0.08} className="h-full">
              <Spotlight className="card h-full rounded-2xl p-6">
                <span className="font-mono text-sm font-semibold text-accent">
                  {step.number}
                </span>
                <h4 className="mt-3 text-lg font-semibold tracking-tight">
                  {step.title}
                </h4>
                <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </Spotlight>
            </Reveal>
          ))}
        </div>

        {/* Guardrail Box */}
        <Reveal delay={0.2} className="mt-6">
          <div className="flex items-start gap-4 rounded-2xl border border-line bg-surface-2/50 p-5 md:p-6">
            <ShieldCheck className="mt-1 size-6 shrink-0 text-accent" aria-hidden />
            <div>
              <h4 className="text-[15px] font-semibold text-foreground">
                {services.guardrail.title}
              </h4>
              <p className="mt-1 text-[14px] leading-relaxed text-muted-foreground">
                {services.guardrail.description}
              </p>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Final Action Callout */}
      <Reveal delay={0.25} className="mt-14">
        <div className="relative overflow-hidden rounded-[2rem] border border-line bg-surface p-8 text-center md:p-12">
          <div aria-hidden className="bg-grid absolute inset-0 opacity-50" />
          <div className="relative mx-auto max-w-2xl">
            <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">
              {services.ctaBanner.title}
            </h3>
            <p className="mt-3 text-[16px] leading-relaxed text-muted-foreground">
              {services.ctaBanner.description}
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <a
                href={whatsappUrl(services.ctaBanner.waMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-12 items-center gap-2 rounded-full bg-foreground px-6 text-[15px] font-medium text-background transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
              >
                <MessageSquare className="size-4" aria-hidden />
                {services.ctaBanner.waButton}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </a>
              <a
                href="#brief"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-line-strong bg-surface-2/60 px-6 text-[15px] font-medium text-foreground transition-colors hover:bg-surface-2"
              >
                <ArrowRight className="size-4" aria-hidden />
                {services.ctaBanner.emailButton}
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
