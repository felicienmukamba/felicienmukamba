"use client"

import { useActionState } from "react"
import { ArrowRight, LoaderCircle } from "lucide-react"
import { login, type LoginState } from "@/lib/portal/actions"

export function LoginForm({ next }: { next: string }) {
  const [state, action, pending] = useActionState<LoginState, FormData>(login, undefined)

  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="next" value={next} />
      <label className="block">
        <span className="mb-1.5 block text-[12px] font-medium text-muted-foreground">Identifiant</span>
        <input
          name="username"
          defaultValue={state?.username}
          autoComplete="username"
          required
          autoFocus={!state?.username}
          className="w-full rounded-xl border border-line-strong bg-background px-3.5 py-2.5 text-[14px] outline-none focus:border-accent"
        />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-[12px] font-medium text-muted-foreground">Mot de passe</span>
        <input
          name="password"
          type="password"
          autoFocus={Boolean(state?.username)}
          autoComplete="current-password"
          required
          className="w-full rounded-xl border border-line-strong bg-background px-3.5 py-2.5 text-[14px] outline-none focus:border-accent"
        />
      </label>
      {state?.error && (
        <p role="alert" className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-[13px]">
          {state.error}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-foreground text-[14px] font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {pending ? <LoaderCircle className="size-4 animate-spin" aria-hidden /> : <ArrowRight className="size-4" aria-hidden />}
        Se connecter
      </button>
    </form>
  )
}
