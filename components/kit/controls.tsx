"use client"

import { useId, useState, type ButtonHTMLAttributes, type InputHTMLAttributes, type ReactNode, type TextareaHTMLAttributes } from "react"
import { Check, Copy } from "lucide-react"
import { cn } from "@/lib/utils"

/** Small form controls shared by the CV studio and the lab tools. */

export function Panel({ title, actions, children, className }: { title?: ReactNode; actions?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={cn("rounded-2xl border border-line bg-surface", className)}>
      {(title || actions) && (
        <header className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
          {title && <h3 className="text-[13px] font-semibold tracking-tight">{title}</h3>}
          {actions}
        </header>
      )}
      <div className="space-y-4 p-4">{children}</div>
    </section>
  )
}

export function Field({ label, hint, children, inline }: { label: ReactNode; hint?: ReactNode; children: ReactNode; inline?: boolean }) {
  return (
    <label className={cn("block", inline && "flex items-center justify-between gap-3")}>
      <span className="mb-1.5 block text-[12px] font-medium text-muted-foreground">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-[11px] text-subtle-foreground">{hint}</span>}
    </label>
  )
}

const inputClass =
  "w-full rounded-lg border border-line-strong bg-background px-3 py-2 text-[13px] outline-none transition-colors placeholder:text-subtle-foreground focus:border-accent"

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn(inputClass, props.className)} />
}

export function TextArea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea rows={3} {...props} className={cn(inputClass, "resize-y leading-relaxed", props.className)} />
}

export function Select({ value, onChange, options, className, ...rest }: { value: string; onChange: (v: string) => void; options: { value: string; label: string; group?: string }[]; className?: string } & Omit<InputHTMLAttributes<HTMLSelectElement>, "onChange" | "value">) {
  const groups = [...new Set(options.map((o) => o.group ?? ""))]
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} className={cn(inputClass, "pr-8", className)} {...rest}>
      {groups.map((g) =>
        g ? (
          <optgroup key={g} label={g}>
            {options.filter((o) => o.group === g).map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </optgroup>
        ) : (
          options.filter((o) => !o.group).map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))
        ),
      )}
    </select>
  )
}

export function Toggle({ checked, onChange, label, size = "md" }: { checked: boolean; onChange: (v: boolean) => void; label: string; size?: "sm" | "md" }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      title={label}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative shrink-0 rounded-full transition-colors",
        size === "sm" ? "h-4 w-7" : "h-5 w-9",
        checked ? "bg-accent" : "bg-line-strong",
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 rounded-full bg-white shadow transition-transform",
          size === "sm" ? "left-0.5 size-3" : "left-0.5 size-4",
          checked && (size === "sm" ? "translate-x-3" : "translate-x-4"),
        )}
      />
    </button>
  )
}

export function ToggleRow({ checked, onChange, label, description }: { checked: boolean; onChange: (v: boolean) => void; label: string; description?: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div>
        <p className="text-[13px]">{label}</p>
        {description && <p className="text-[11px] text-subtle-foreground">{description}</p>}
      </div>
      <Toggle checked={checked} onChange={onChange} label={label} />
    </div>
  )
}

export function Segmented<T extends string>({ value, onChange, options, label }: { value: T; onChange: (v: T) => void; options: { value: T; label: ReactNode }[]; label: string }) {
  return (
    <div role="radiogroup" aria-label={label} className="flex rounded-lg border border-line-strong p-0.5">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="radio"
          aria-checked={o.value === value}
          onClick={() => onChange(o.value)}
          className={cn(
            "flex-1 whitespace-nowrap rounded-md px-2.5 py-1.5 text-[12px] font-medium transition-colors",
            o.value === value ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

export function Slider({ label, value, min, max, step = 1, onChange, format }: { label: string; value: number; min: number; max: number; step?: number; onChange: (v: number) => void; format?: (v: number) => string }) {
  const id = useId()
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <label htmlFor={id} className="text-[12px] font-medium text-muted-foreground">
          {label}
        </label>
        <span className="font-mono text-[11px] tabular-nums text-foreground">{format ? format(value) : value}</span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[var(--accent)]"
      />
    </div>
  )
}

export function ColorField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const [draft, setDraft] = useState(value)
  const [prev, setPrev] = useState(value)
  if (value !== prev) {
    setPrev(value)
    setDraft(value)
  }
  return (
    <div>
      <span className="mb-1.5 block text-[12px] font-medium text-muted-foreground">{label}</span>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label={label}
          className="size-9 shrink-0 cursor-pointer rounded-lg border border-line-strong bg-transparent p-0.5"
        />
        <input
          value={draft}
          onChange={(e) => {
            setDraft(e.target.value)
            if (/^#[0-9a-f]{6}$/i.test(e.target.value)) onChange(e.target.value.toLowerCase())
          }}
          spellCheck={false}
          className={cn(inputClass, "font-mono uppercase")}
        />
      </div>
    </div>
  )
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "ghost"; size?: "sm" | "md" }

export function Button({ variant = "secondary", size = "md", className, ...props }: ButtonProps) {
  return (
    <button
      type="button"
      {...props}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all disabled:pointer-events-none disabled:opacity-50",
        size === "sm" ? "h-8 px-3 text-[12px]" : "h-10 px-4 text-[13px]",
        variant === "primary" && "bg-foreground text-background hover:opacity-90",
        variant === "secondary" && "border border-line-strong hover:bg-surface-2",
        variant === "ghost" && "text-muted-foreground hover:bg-surface-2 hover:text-foreground",
        className,
      )}
    />
  )
}

export function CopyButton({ text, label = "Copy", copiedLabel = "Copied", size = "sm" }: { text: string | (() => string); label?: string; copiedLabel?: string; size?: "sm" | "md" }) {
  const [done, setDone] = useState(false)
  return (
    <Button
      size={size}
      onClick={async () => {
        await navigator.clipboard.writeText(typeof text === "function" ? text() : text)
        setDone(true)
        setTimeout(() => setDone(false), 1600)
      }}
    >
      {done ? <Check className="size-3.5 text-success" aria-hidden /> : <Copy className="size-3.5" aria-hidden />}
      <span aria-live="polite">{done ? copiedLabel : label}</span>
    </Button>
  )
}

export function CodeBlock({ code, copyLabel, copiedLabel }: { code: string; copyLabel?: string; copiedLabel?: string }) {
  return (
    <div className="relative">
      <pre className="max-h-64 overflow-auto rounded-xl border border-line bg-background p-3 pr-24 font-mono text-[11.5px] leading-relaxed text-muted-foreground">
        <code>{code}</code>
      </pre>
      <div className="absolute right-2 top-2">
        <CopyButton text={code} label={copyLabel} copiedLabel={copiedLabel} />
      </div>
    </div>
  )
}

export function TabBar<T extends string>({ value, onChange, tabs, label }: { value: T; onChange: (v: T) => void; tabs: { value: T; label: ReactNode }[]; label: string }) {
  return (
    <div role="tablist" aria-label={label} className="flex gap-1 overflow-x-auto rounded-xl border border-line p-1">
      {tabs.map((t) => (
        <button
          key={t.value}
          type="button"
          role="tab"
          aria-selected={t.value === value}
          onClick={() => onChange(t.value)}
          className={cn(
            "flex-1 whitespace-nowrap rounded-lg px-3 py-2 text-[13px] font-medium transition-colors",
            t.value === value ? "bg-surface-2 text-foreground" : "text-muted-foreground hover:text-foreground",
          )}
        >
          {t.label}
        </button>
      ))}
    </div>
  )
}
