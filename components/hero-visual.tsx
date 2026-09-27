"use client"

import dynamic from "next/dynamic"
import Image from "next/image"
import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { MapPin } from "lucide-react"
import { site } from "@/lib/site"
import { easeOutExpo } from "@/components/motion"

const AgentNetwork = dynamic(() => import("@/components/agent-network"), { ssr: false })

function RoleTicker({ roles, label }: { roles: string[]; label: string }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const id = setInterval(() => setIndex((i) => (i + 1) % roles.length), 2600)
    return () => clearInterval(id)
  }, [roles.length])

  return (
    <p className="flex items-center gap-2 text-[13px]">
      <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-subtle-foreground">{label}</span>
      <span className="relative inline-flex h-5 min-w-40 overflow-hidden font-medium">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={roles[index]}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.5, ease: easeOutExpo }}
            className="absolute inset-0 whitespace-nowrap"
          >
            {roles[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </p>
  )
}

export function HeroVisual({
  alt,
  roles,
  rolesLabel,
  location,
  chips,
}: {
  alt: string
  roles: string[]
  rolesLabel: string
  location: string
  chips: { founder: string; gdsc: string }
}) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[34rem]">
      <div className="absolute inset-[-8%] rounded-full bg-[radial-gradient(closest-side,var(--accent-soft),transparent)]" />
      <AgentNetwork />

      <div className="absolute inset-[19%] animate-[rise_1.2s_var(--ease-out-expo)_0.35s_both]">
        <div className="card relative h-full overflow-hidden rounded-[2rem] p-1.5">
          <div className="relative h-full overflow-hidden rounded-[1.6rem]">
            <Image
              src={site.portrait}
              alt={alt}
              fill
              priority
              sizes="(min-width: 1024px) 22rem, 60vw"
              className="object-cover object-[50%_20%]"
            />
            <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4 text-white">
              <p className="flex items-center gap-1.5 text-[12px] text-white/80">
                <MapPin className="size-3.5" aria-hidden />
                {location}
              </p>
            </div>
          </div>
        </div>

        <div className="card absolute -left-[14%] top-[14%] rounded-full px-3.5 py-2 text-[12px] font-medium shadow-lg animate-[float_7s_ease-in-out_infinite]">
          {chips.founder}
        </div>
        <div className="card absolute -right-[12%] top-[52%] rounded-full px-3.5 py-2 text-[12px] font-medium shadow-lg animate-[float_8s_ease-in-out_-3s_infinite]">
          {chips.gdsc}
        </div>
        <div className="card absolute -bottom-[9%] left-1/2 -translate-x-1/2 rounded-full px-4 py-2 shadow-lg">
          <RoleTicker roles={roles} label={rolesLabel} />
        </div>
      </div>
    </div>
  )
}
