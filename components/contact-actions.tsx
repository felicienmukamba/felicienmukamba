"use client"

import { useEffect, useState } from "react"
import { Check, Copy } from "lucide-react"
import { site } from "@/lib/site"

export function CopyEmailButton({ copy, copied }: { copy: string; copied: string }) {
  const [done, setDone] = useState(false)

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(site.email)
      setDone(true)
      setTimeout(() => setDone(false), 2000)
    } catch {
      window.location.href = `mailto:${site.email}`
    }
  }

  return (
    <button
      type="button"
      onClick={onCopy}
      className="inline-flex h-12 items-center gap-2 rounded-full border border-line-strong px-5 text-[15px] font-medium transition-colors hover:bg-surface-2"
    >
      {done ? <Check className="size-4 text-success" aria-hidden /> : <Copy className="size-4" aria-hidden />}
      <span aria-live="polite">{done ? copied : copy}</span>
    </button>
  )
}

export function LocalTime({ label, lang }: { label: string; lang: string }) {
  const [time, setTime] = useState<string | null>(null)

  useEffect(() => {
    const format = new Intl.DateTimeFormat(lang === "ln" ? "fr" : lang, {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: site.timezone,
    })
    const tick = () => setTime(format.format(new Date()))
    tick()
    const id = setInterval(tick, 15_000)
    return () => clearInterval(id)
  }, [lang])

  return (
    <p className="flex items-center gap-2 text-[13px] text-muted-foreground">
      <span className="relative grid size-2 place-items-center" aria-hidden>
        <span className="absolute size-2 animate-pulse-ring rounded-full bg-success" />
        <span className="size-2 rounded-full bg-success" />
      </span>
      {label}
      <time className="font-mono tabular-nums text-foreground">{time ?? "--:--"}</time>
    </p>
  )
}
