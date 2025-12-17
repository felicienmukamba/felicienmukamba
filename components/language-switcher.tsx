"use client"

import { Languages } from "lucide-react"
import { useLocale } from "next-intl"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function LanguageSwitcher() {
    const locale = useLocale()
    const router = useRouter()
    const pathname = usePathname()

    const switchLocale = (newLocale: string) => {
        // Remove current locale from pathname if it exists
        const pathnameWithoutLocale = pathname.replace(/^\/(en|fr)/, '')
        const newPath = newLocale === 'fr' ? pathnameWithoutLocale || '/' : `/${newLocale}${pathnameWithoutLocale || '/'}`
        router.push(newPath)
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="w-9 h-9 apple-transition hover:scale-110">
                    <Languages className="h-5 w-5" />
                    <span className="sr-only">Switch language</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="glass-light dark:glass-dark">
                <DropdownMenuItem
                    onClick={() => switchLocale('fr')}
                    className={`cursor-pointer apple-transition ${locale === 'fr' ? 'bg-primary/10' : ''}`}
                >
                    🇫🇷 Français
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => switchLocale('en')}
                    className={`cursor-pointer apple-transition ${locale === 'en' ? 'bg-primary/10' : ''}`}
                >
                    🇬🇧 English
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
