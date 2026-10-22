"use client"

import { useState } from "react"
import { Mail, MessageCircle } from "lucide-react"
import type { Dictionary } from "@/lib/dictionaries"
import { site } from "@/lib/site"
import { cn } from "@/lib/utils"
import { whatsappUrl } from "@/lib/whatsapp"

type Brief = Dictionary["brief"]

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: string }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "rounded-full border px-3.5 py-1.5 text-[13px] transition-colors",
        active ? "border-foreground bg-foreground text-background" : "border-line-strong bg-background/60 text-muted-foreground hover:border-foreground/40 hover:text-foreground",
      )}
    >
      {children}
    </button>
  )
}

const inputClass =
  "w-full rounded-xl border border-line-strong bg-background/70 px-3.5 py-2.5 text-[14px] outline-none transition-colors placeholder:text-subtle-foreground focus:border-accent"

/**
 * Lead qualification without a backend: the answers become a ready-to-send
 * WhatsApp or e-mail message, so the first exchange already has the context.
 */
export function ProjectBrief({ b }: { b: Brief }) {
  const [name, setName] = useState("")
  const [org, setOrg] = useState("")
  const [needs, setNeeds] = useState<string[]>([])
  const [budget, setBudget] = useState(b.budgets[0])
  const [timeline, setTimeline] = useState("")
  const [details, setDetails] = useState("")
  const [touched, setTouched] = useState(false)

  const fields: [string, string][] = [
    [b.fields.name, name.trim()],
    [b.fields.org, org.trim()],
    [b.fields.need, needs.join(", ")],
    [b.fields.budget, budget],
    [b.fields.timeline, timeline],
  ]
  const message = [b.greeting, "", ...fields.filter(([, v]) => v).map(([k, v]) => `• ${k}: ${v}`), ...(details.trim() ? ["", `${b.fields.details}:`, details.trim()] : [])].join("\n")

  const valid = needs.length > 0
  const guard = (e: React.MouseEvent) => {
    setTouched(true)
    if (!valid) e.preventDefault()
  }

  return (
    <div id="brief" className="mx-auto mt-12 max-w-3xl scroll-mt-28 rounded-[1.75rem] border border-line bg-background/70 p-5 text-left shadow-[var(--shadow-card)] backdrop-blur md:p-8">
      <h3 className="text-xl font-semibold tracking-[-0.02em] md:text-2xl">{b.title}</h3>
      <p className="mt-1.5 text-[14px] text-muted-foreground">{b.subtitle}</p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-[12.5px] font-medium text-muted-foreground">{b.name}</span>
          <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" className={inputClass} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[12.5px] font-medium text-muted-foreground">{b.org}</span>
          <input value={org} onChange={(e) => setOrg(e.target.value)} autoComplete="organization" className={inputClass} />
        </label>
      </div>

      <fieldset className="mt-5">
        <legend className="mb-2 text-[12.5px] font-medium text-muted-foreground">
          {b.need} <span className="text-accent">*</span>
        </legend>
        <div className="flex flex-wrap gap-2">
          {b.needs.map((n) => (
            <Chip key={n} active={needs.includes(n)} onClick={() => setNeeds((prev) => (prev.includes(n) ? prev.filter((x) => x !== n) : [...prev, n]))}>
              {n}
            </Chip>
          ))}
        </div>
        {touched && !valid && <p className="mt-2 text-[12.5px] text-destructive">{b.required}</p>}
      </fieldset>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <fieldset>
          <legend className="mb-2 text-[12.5px] font-medium text-muted-foreground">{b.budget}</legend>
          <div className="flex flex-wrap gap-2">
            {b.budgets.map((x) => (
              <Chip key={x} active={budget === x} onClick={() => setBudget(x)}>
                {x}
              </Chip>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend className="mb-2 text-[12.5px] font-medium text-muted-foreground">{b.timeline}</legend>
          <div className="flex flex-wrap gap-2">
            {b.timelines.map((x) => (
              <Chip key={x} active={timeline === x} onClick={() => setTimeline((cur) => (cur === x ? "" : x))}>
                {x}
              </Chip>
            ))}
          </div>
        </fieldset>
      </div>

      <label className="mt-5 block">
        <span className="mb-1.5 block text-[12.5px] font-medium text-muted-foreground">{b.message}</span>
        <textarea value={details} onChange={(e) => setDetails(e.target.value)} rows={3} placeholder={b.placeholder} className={cn(inputClass, "resize-y leading-relaxed")} />
      </label>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <a
          href={whatsappUrl(message)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={guard}
          aria-disabled={!valid}
          className={cn(
            "inline-flex h-12 items-center gap-2 rounded-full bg-[#25D366] px-6 text-[15px] font-semibold text-[#062e16] transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]",
            !valid && "opacity-60",
          )}
        >
          <MessageCircle className="size-4" aria-hidden />
          {b.send}
        </a>
        <a
          href={`mailto:${site.email}?subject=${encodeURIComponent(`${b.emailSubject}${org ? ` — ${org}` : name ? ` — ${name}` : ""}`)}&body=${encodeURIComponent(message)}`}
          onClick={guard}
          aria-disabled={!valid}
          className={cn("inline-flex h-12 items-center gap-2 rounded-full border border-line-strong px-5 text-[14px] font-medium transition-colors hover:bg-surface-2", !valid && "opacity-60")}
        >
          <Mail className="size-4" aria-hidden />
          {b.sendEmail}
        </a>
      </div>
      <p className="mt-3 text-[12px] text-subtle-foreground">{b.note}</p>
    </div>
  )
}
