"use client"

import { useState } from "react"
import { ArrowDown, LoaderCircle } from "lucide-react"
import type { Locale } from "@/lib/i18n"
import { cn } from "@/lib/utils"

export type CvLabels = { download: string; generating: string; error: string }

const loadCv = () => import("@/components/cv-pdf")

/**
 * Builds the PDF on demand. @react-pdf is ~500 kB, so it is only fetched
 * when the visitor shows intent (hover/focus) or clicks.
 */
export function CvDownloadButton({
  lang,
  labels,
  variant = "default",
}: {
  lang: Locale
  labels: CvLabels
  variant?: "default" | "compact"
}) {
  const [state, setState] = useState<"idle" | "loading" | "error">("idle")

  async function download() {
    if (state === "loading") return
    setState("loading")
    try {
      const { renderCv } = await loadCv()
      const blob = await renderCv(lang)
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `Felicien-Mukamba-CV-${lang.toUpperCase()}.pdf`
      document.body.appendChild(link)
      link.click()
      link.remove()
      setTimeout(() => URL.revokeObjectURL(url), 10_000)
      setState("idle")
    } catch (error) {
      console.error(error)
      setState("error")
      setTimeout(() => setState("idle"), 4000)
    }
  }

  const label = state === "loading" ? labels.generating : state === "error" ? labels.error : labels.download

  return (
    <button
      type="button"
      onClick={download}
      onPointerEnter={() => void loadCv()}
      onFocus={() => void loadCv()}
      aria-busy={state === "loading"}
      className={cn(
        "group inline-flex items-center justify-center gap-2 rounded-full border border-line-strong font-medium transition-colors hover:border-foreground/40 hover:bg-surface-2 disabled:opacity-60",
        variant === "compact" ? "h-9 px-3.5 text-[13px]" : "h-12 px-6 text-[15px]",
        state === "error" && "border-destructive/50 text-destructive",
      )}
    >
      {state === "loading" ? (
        <LoaderCircle className="size-4 animate-spin" aria-hidden />
      ) : (
        <ArrowDown className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" aria-hidden />
      )}
      {variant === "compact" && state === "idle" ? (
        <span>
          CV<span className="sr-only"> — {labels.download}</span>
        </span>
      ) : (
        <span aria-live="polite">{label}</span>
      )}
    </button>
  )
}
