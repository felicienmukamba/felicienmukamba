"use client"

import Image from "next/image"
import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { easeOutExpo } from "@/components/motion"
import { cn } from "@/lib/utils"

export type GalleryShot = { src: string; url: string; label: string }

/** Real product screenshots in a browser frame, with a thumbnail switcher when there is more than one. */
export function ScreenshotGallery({ shots, alt, groupLabel }: { shots: GalleryShot[]; alt: string; groupLabel: string }) {
  const [index, setIndex] = useState(0)
  const shot = shots[index]

  return (
    <div className="flex flex-col gap-3">
      <div className="overflow-hidden rounded-[1.4rem] border border-line bg-surface-2">
        <div className="flex h-9 shrink-0 items-center gap-3 border-b border-line px-4">
          <span aria-hidden className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-[#ff5f57]" />
            <span className="size-2.5 rounded-full bg-[#febc2e]" />
            <span className="size-2.5 rounded-full bg-[#28c840]" />
          </span>
          <span className="mx-auto truncate rounded-md bg-background/70 px-6 py-0.5 font-mono text-[11px] text-muted-foreground">
            {shot.url}
          </span>
          <span className="w-10" aria-hidden />
        </div>
        <div className="relative aspect-[16/10]">
          <AnimatePresence initial={false} mode="popLayout">
            <motion.div
              key={shot.src}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: easeOutExpo }}
              className="absolute inset-0"
            >
              <Image
                src={shot.src}
                alt={`${alt} — ${shot.label}`}
                fill
                sizes="(min-width: 1024px) 38rem, 100vw"
                className="object-cover object-left-top"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {shots.length > 1 && (
        <div role="group" aria-label={groupLabel} className="flex flex-wrap gap-2">
          {shots.map((s, i) => (
            <button
              key={s.src}
              type="button"
              onClick={() => setIndex(i)}
              aria-pressed={i === index}
              className={cn(
                "group flex items-center gap-2 rounded-full border py-1 pl-1 pr-3 text-[12px] transition-colors",
                i === index
                  ? "border-accent/40 bg-accent-soft text-foreground"
                  : "border-line text-muted-foreground hover:border-line-strong hover:text-foreground",
              )}
            >
              <span className="relative size-7 overflow-hidden rounded-full border border-line">
                <Image src={s.src} alt="" fill sizes="28px" className="object-cover object-left-top" />
              </span>
              {s.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
