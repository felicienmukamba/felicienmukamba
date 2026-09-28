import type { Metadata } from "next"
import { LoginForm } from "@/components/portal/login-form"
import { configuredHash } from "@/lib/portal/password"
import { getSessionSecret } from "@/lib/portal/session"

export const metadata: Metadata = { title: "Connexion" }
export const dynamic = "force-dynamic"

export default async function LoginPage({ searchParams }: PageProps<"/portal/login">) {
  const { next } = await searchParams
  const ready = Boolean(configuredHash()) && Boolean(getSessionSecret())

  return (
    <main className="relative grid min-h-dvh place-items-center overflow-hidden px-5 py-16">
      <div aria-hidden className="bg-grid pointer-events-none absolute inset-0" />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-96 w-[48rem] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[radial-gradient(closest-side,var(--accent-soft),transparent)] blur-2xl"
      />
      <div className="relative w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <span className="grid size-11 place-items-center rounded-xl bg-foreground font-mono text-sm font-semibold text-background">FM</span>
          <h1 className="mt-5 text-2xl font-semibold tracking-[-0.03em]">Portail privé</h1>
          <p className="mt-1.5 text-[14px] text-muted-foreground">Studio CV et outils personnels.</p>
        </div>

        <div className="card rounded-3xl p-6">
          {ready ? (
            <LoginForm next={typeof next === "string" ? next : "/portal"} />
          ) : (
            <div className="space-y-3 text-[13px] leading-relaxed">
              <p className="font-medium">Le portail n'est pas encore configuré.</p>
              <ol className="list-decimal space-y-1.5 pl-4 text-muted-foreground">
                <li>
                  Définissez votre mot de passe : <code className="font-mono text-foreground">npm run portal:password</code>
                </li>
                <li>
                  En production, ajoutez la variable <code className="font-mono text-foreground">PORTAL_SECRET</code> (32 caractères aléatoires minimum).
                </li>
              </ol>
            </div>
          )}
        </div>
        <p className="mt-6 text-center">
          <a href="/" className="text-[12px] text-subtle-foreground hover:text-foreground">
            ← Retour au portfolio
          </a>
        </p>
      </div>
    </main>
  )
}
