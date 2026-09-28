import Link from "next/link"
import { LogOut } from "lucide-react"
import { PortalNav } from "@/components/portal/portal-nav"
import { logout } from "@/lib/portal/actions"
import { requireSession } from "@/lib/portal/auth"

export const dynamic = "force-dynamic"

export default async function SecureLayout({ children }: { children: React.ReactNode }) {
  const session = await requireSession()

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line bg-background/85 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-[1600px] items-center gap-4 px-4 md:px-6">
          <Link href="/portal" className="flex items-center gap-2.5">
            <span className="grid size-8 place-items-center rounded-[10px] bg-foreground font-mono text-[13px] font-semibold text-background">FM</span>
            <span className="text-sm font-medium">Portail</span>
          </Link>
          <PortalNav />
          <div className="ml-auto flex items-center gap-3">
            <span className="hidden text-[12px] text-muted-foreground sm:block">{session.user}</span>
            <form action={logout}>
              <button type="submit" className="flex h-8 items-center gap-1.5 rounded-full border border-line-strong px-3 text-[12px] hover:bg-surface-2">
                <LogOut className="size-3.5" aria-hidden /> Déconnexion
              </button>
            </form>
          </div>
        </div>
      </header>
      {children}
    </>
  )
}
