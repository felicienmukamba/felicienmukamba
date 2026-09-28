"use client"

import { useState, type ReactNode } from "react"
import { ArrowDown, ArrowUp, ChevronDown, Trash2 } from "lucide-react"
import { Toggle } from "@/components/kit/controls"
import type { Toggleable } from "@/lib/cv/types"
import { cn } from "@/lib/utils"

/** Reorderable, toggleable list with an expandable editor per item. */
export function ItemList<T extends Toggleable>({
  items,
  onChange,
  title,
  editor,
  removable,
}: {
  items: T[]
  onChange: (items: T[]) => void
  title: (item: T) => ReactNode
  editor?: (item: T, update: (patch: Partial<T>) => void) => ReactNode
  removable?: boolean
}) {
  const [open, setOpen] = useState<string | null>(null)

  const update = (index: number, patch: Partial<T>) => onChange(items.map((it, i) => (i === index ? { ...it, ...patch } : it)))
  const move = (index: number, delta: number) => {
    const next = [...items]
    const [item] = next.splice(index, 1)
    next.splice(index + delta, 0, item)
    onChange(next)
  }

  return (
    <ul className="divide-y divide-line overflow-hidden rounded-xl border border-line">
      {items.map((item, i) => {
        const expanded = open === item.key
        return (
          <li key={item.key} className={cn("bg-background/40", !item.visible && "opacity-55")}>
            <div className="flex items-center gap-2 px-3 py-2">
              <Toggle size="sm" checked={item.visible} onChange={(v) => update(i, { visible: v } as Partial<T>)} label="Afficher" />
              <button
                type="button"
                onClick={() => editor && setOpen(expanded ? null : item.key)}
                className="min-w-0 flex-1 truncate text-left text-[13px]"
                aria-expanded={editor ? expanded : undefined}
              >
                {title(item)}
              </button>
              <div className="flex shrink-0 items-center">
                <button type="button" aria-label="Monter" disabled={i === 0} onClick={() => move(i, -1)} className="grid size-7 place-items-center rounded-md text-muted-foreground hover:bg-surface-2 disabled:opacity-30">
                  <ArrowUp className="size-3.5" />
                </button>
                <button type="button" aria-label="Descendre" disabled={i === items.length - 1} onClick={() => move(i, 1)} className="grid size-7 place-items-center rounded-md text-muted-foreground hover:bg-surface-2 disabled:opacity-30">
                  <ArrowDown className="size-3.5" />
                </button>
                {removable && (
                  <button type="button" aria-label="Supprimer" onClick={() => onChange(items.filter((_, j) => j !== i))} className="grid size-7 place-items-center rounded-md text-muted-foreground hover:bg-surface-2 hover:text-destructive">
                    <Trash2 className="size-3.5" />
                  </button>
                )}
                {editor && (
                  <button type="button" aria-label="Modifier" onClick={() => setOpen(expanded ? null : item.key)} className="grid size-7 place-items-center rounded-md text-muted-foreground hover:bg-surface-2">
                    <ChevronDown className={cn("size-3.5 transition-transform", expanded && "rotate-180")} />
                  </button>
                )}
              </div>
            </div>
            {editor && expanded && <div className="space-y-3 border-t border-line bg-surface-2/40 p-3">{editor(item, (patch) => update(i, patch))}</div>}
          </li>
        )
      })}
    </ul>
  )
}
