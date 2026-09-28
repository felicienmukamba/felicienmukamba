import Link from "next/link"
import { ArrowUpRight, Layers, Palette, Shapes, Waves } from "lucide-react"
import { Spotlight } from "@/components/motion"
import type { LabToolId } from "@/lib/lab/tools"

const icons = { "brand-kit": Palette, svg: Shapes, motion: Waves, design: Layers }

/** Mini preview drawn in CSS so the cards stay lightweight. */
function Preview({ id }: { id: LabToolId }) {
  switch (id) {
    case "brand-kit":
      return (
        <div className="flex h-full items-center justify-center gap-2">
          {["#0f7a5c", "#0b3b5b", "#f5a524", "#f8fafc"].map((c, i) => (
            <span key={c} className="h-16 w-10 rounded-lg shadow-md transition-transform duration-500 group-hover:-translate-y-1" style={{ backgroundColor: c, transitionDelay: `${i * 50}ms` }} />
          ))}
        </div>
      )
    case "svg":
      return (
        <svg viewBox="0 0 200 100" className="h-full w-full">
          <path d="M0 70 C 40 40, 70 90, 110 60 S 170 40, 200 55 V100 H0 Z" fill="var(--accent)" opacity="0.35" />
          <path d="M0 80 C 50 60, 80 100, 130 75 S 180 65, 200 72 V100 H0 Z" fill="var(--accent-2)" opacity="0.6" />
          <circle cx="150" cy="30" r="18" fill="var(--accent)" className="origin-center transition-transform duration-700 group-hover:scale-110" />
        </svg>
      )
    case "motion":
      return (
        <svg viewBox="0 0 200 100" className="h-full w-full">
          <path d="M20 85 C 60 85, 70 15, 180 15" fill="none" stroke="var(--accent)" strokeWidth="4" strokeLinecap="round" />
          <circle cx="20" cy="85" r="5" fill="var(--accent-2)" />
          <circle cx="180" cy="15" r="5" fill="var(--accent-2)" />
        </svg>
      )
    case "design":
      return (
        <div className="flex h-full items-center justify-center">
          <div className="grid w-40 grid-cols-6 overflow-hidden rounded-lg shadow-md">
            {["#f1efff", "#d9d4ff", "#b3a8ff", "#8b80ff", "#5a4bd6", "#2e2575"].map((c) => (
              <span key={c} className="h-12" style={{ backgroundColor: c }} />
            ))}
          </div>
        </div>
      )
  }
}

export function ToolCard({ id, href, name, description, cta }: { id: LabToolId; href: string; name: string; description: string; cta: string }) {
  const Icon = icons[id]
  return (
    <Spotlight className="card h-full rounded-3xl">
      <Link href={href} className="group flex h-full flex-col p-2">
        <div className="h-36 overflow-hidden rounded-[1.4rem] bg-surface-2 p-4">
          <Preview id={id} />
        </div>
        <div className="flex flex-1 flex-col px-4 pb-4 pt-5">
          <Icon className="size-5 text-accent" aria-hidden />
          <h3 className="mt-3 text-lg font-semibold tracking-[-0.02em]">{name}</h3>
          <p className="mt-1.5 flex-1 text-[14px] leading-relaxed text-muted-foreground">{description}</p>
          <span className="mt-4 inline-flex items-center gap-1 text-[13px] font-medium text-accent">
            {cta}
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
          </span>
        </div>
      </Link>
    </Spotlight>
  )
}
