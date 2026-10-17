"use client"

import { useCallback, useRef, useState } from "react"

/**
 * Undoable state. Updates sharing a `key` within a short window (a slider drag,
 * a canvas drag) collapse into a single undo step.
 */
export function useHistory<T>(initial: T) {
  const [state, setState] = useState({ past: [] as T[], present: initial, future: [] as T[] })
  const last = useRef<{ key: string; at: number } | null>(null)

  const set = useCallback((updater: T | ((prev: T) => T), key?: string) => {
    const now = Date.now()
    const merge = !!key && last.current?.key === key && now - last.current.at < 900
    last.current = key ? { key, at: now } : null
    setState((s) => {
      const next = typeof updater === "function" ? (updater as (prev: T) => T)(s.present) : updater
      if (Object.is(next, s.present)) return s
      return { past: merge ? s.past : [...s.past.slice(-100), s.present], present: next, future: [] }
    })
  }, [])

  /** Replaces the value without recording history (initial load, imports). */
  const reset = useCallback((value: T) => setState({ past: [], present: value, future: [] }), [])

  const undo = useCallback(() => {
    last.current = null
    setState((s) => (s.past.length ? { past: s.past.slice(0, -1), present: s.past[s.past.length - 1], future: [s.present, ...s.future] } : s))
  }, [])

  const redo = useCallback(() => {
    last.current = null
    setState((s) => (s.future.length ? { past: [...s.past, s.present], present: s.future[0], future: s.future.slice(1) } : s))
  }, [])

  return { value: state.present, set, reset, undo, redo, canUndo: state.past.length > 0, canRedo: state.future.length > 0 }
}
