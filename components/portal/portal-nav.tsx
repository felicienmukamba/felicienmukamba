"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const links = [
  { href: "/portal", label: "Tableau de bord" },
  { href: "/portal/cv", label: "Studio CV" },
  { href: "/fr/lab", label: "Lab" },
]

export function PortalNav() {
  const pathname = usePathname()
  return (
    <nav aria-label="Portail" className="hidden md:block">
      <ul className="flex items-center gap-1">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              aria-current={pathname === l.href ? "page" : undefined}
              className={cn(
                "rounded-full px-3 py-1.5 text-[13px] transition-colors",
                pathname === l.href ? "bg-surface-2 text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
