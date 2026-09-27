"use client"

import { MotionConfig, motion, type HTMLMotionProps } from "framer-motion"
import { useRef, type PointerEvent, type ReactNode } from "react"
import { cn } from "@/lib/utils"

export const easeOutExpo = [0.16, 1, 0.3, 1] as const

/** Honors the OS "reduce motion" setting for every framer-motion animation. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}

type RevealProps = HTMLMotionProps<"div"> & { delay?: number; y?: number }

/** Fades and lifts its content the first time it scrolls into view. */
export function Reveal({ delay = 0, y = 28, className, children, ...rest }: RevealProps) {
  return (
    <motion.div
      data-reveal
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.9, ease: easeOutExpo, delay }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

/** Card surface with a soft highlight that follows the pointer. */
export function Spotlight({ className, children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el || event.pointerType !== "mouse") return
    const rect = el.getBoundingClientRect()
    el.style.setProperty("--spot-x", `${event.clientX - rect.left}px`)
    el.style.setProperty("--spot-y", `${event.clientY - rect.top}px`)
    el.style.setProperty("--spot-opacity", "1")
  }

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={() => ref.current?.style.setProperty("--spot-opacity", "0")}
      className={cn("spotlight", className)}
    >
      {children}
    </div>
  )
}
