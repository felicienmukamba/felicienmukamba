"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { motion, useScroll, useSpring } from "framer-motion"
import { Menu, Moon, Sun, X } from "lucide-react"
import { useTheme } from "next-themes"
import { Drawer, DrawerClose, DrawerContent, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { CvDownloadButton, type CvLabels } from "@/components/cv-download-button"
import { localeCookie, localeMeta, locales, type Locale } from "@/lib/i18n"
import { cn } from "@/lib/utils"

export type NavKey = "about" | "ai" | "experience" | "projects" | "skills" | "contact"

type HeaderLabels = {
  nav: Record<NavKey, string>
  openMenu: string
  closeMenu: string
  toggleTheme: string
  language: string
  primaryNav: string
  cv: CvLabels
}

const sections: NavKey[] = ["about", "ai", "experience", "projects", "skills", "contact"]

function rememberLocale(locale: Locale) {
  document.cookie = `${localeCookie}=${locale}; path=/; max-age=31536000; samesite=lax`
}

function useActiveSection() {
  const [active, setActive] = useState<NavKey | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id as NavKey)
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    )
    for (const id of sections) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    const onScroll = () => {
      if (window.scrollY < 200) setActive(null)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  return active
}

function ThemeToggle({ label }: { label: string }) {
  const { resolvedTheme, setTheme } = useTheme()
  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label={label}
      title={label}
      className="grid size-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground"
    >
      <Sun className="hidden size-[18px] dark:block" aria-hidden />
      <Moon className="size-[18px] dark:hidden" aria-hidden />
    </button>
  )
}

function LanguageSwitch({ lang, hash, label }: { lang: Locale; hash: string; label: string }) {
  return (
    <div role="group" aria-label={label} className="flex items-center rounded-full border border-line p-0.5">
      {locales.map((l) => (
        <Link
          key={l}
          href={`/${l}${hash}`}
          hrefLang={localeMeta[l].bcp47}
          lang={localeMeta[l].bcp47}
          onClick={() => rememberLocale(l)}
          aria-current={l === lang ? "true" : undefined}
          title={localeMeta[l].label}
          className={cn(
            "rounded-full px-2.5 py-1 font-mono text-[11px] font-medium tracking-wider transition-colors",
            l === lang ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground",
          )}
        >
          {localeMeta[l].short}
        </Link>
      ))}
    </div>
  )
}

export function SiteHeader({ lang, labels }: { lang: Locale; labels: HeaderLabels }) {
  const active = useActiveSection()
  const [scrolled, setScrolled] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 })
  const hash = active ? `#${active}` : ""

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px origin-left bg-gradient-to-r from-accent to-accent-2"
        style={{ scaleX: progress }}
      />
      <div
        className={cn(
          "border-b transition-[background-color,border-color,backdrop-filter] duration-500",
          scrolled ? "glass border-line" : "border-transparent",
        )}
      >
        <div className="container-page flex h-16 items-center justify-between gap-4">
          <Link href={`/${lang}`} className="group flex items-center gap-2.5" aria-label="Félicien Mukamba">
            <span className="grid size-8 place-items-center rounded-[10px] bg-foreground font-mono text-[13px] font-semibold tracking-tight text-background transition-transform duration-500 ease-out-expo group-hover:rotate-[-8deg]">
              FM
            </span>
            <span className="hidden text-sm font-medium tracking-tight sm:block">Félicien Mukamba</span>
          </Link>

          <nav aria-label={labels.primaryNav} className="hidden lg:block">
            <ul className="flex items-center gap-1 rounded-full border border-line bg-surface/60 p-1 backdrop-blur">
              {sections.map((key) => (
                <li key={key} className="relative">
                  {active === key && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-surface-2"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <a
                    href={`#${key}`}
                    aria-current={active === key ? "location" : undefined}
                    className={cn(
                      "relative block rounded-full px-3.5 py-1.5 text-[13px] transition-colors",
                      active === key ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {labels.nav[key]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <LanguageSwitch lang={lang} hash={hash} label={labels.language} />
            </div>
            <ThemeToggle label={labels.toggleTheme} />
            <div className="hidden md:block">
              <CvDownloadButton lang={lang} labels={labels.cv} variant="compact" />
            </div>

            <Drawer>
              <DrawerTrigger asChild>
                <button
                  type="button"
                  aria-label={labels.openMenu}
                  className="grid size-9 place-items-center rounded-full text-foreground transition-colors hover:bg-surface-2 lg:hidden"
                >
                  <Menu className="size-5" aria-hidden />
                </button>
              </DrawerTrigger>
              <DrawerContent
                aria-describedby={undefined}
                className="border-line bg-background data-[vaul-drawer-direction=bottom]:rounded-t-[1.75rem]"
              >
                <div className="flex items-center justify-between px-6 pt-4">
                  <DrawerTitle className="text-base font-medium">Félicien Mukamba</DrawerTitle>
                  <DrawerClose
                    aria-label={labels.closeMenu}
                    className="grid size-9 place-items-center rounded-full hover:bg-surface-2"
                  >
                    <X className="size-5" aria-hidden />
                  </DrawerClose>
                </div>
                <nav aria-label={labels.primaryNav} className="px-4 pb-4 pt-2">
                  <ul>
                    {sections.map((key, i) => (
                      <li key={key}>
                        <DrawerClose asChild>
                          <a
                            href={`#${key}`}
                            className={cn(
                              "flex items-baseline gap-4 rounded-xl px-3 py-3 text-2xl tracking-tight transition-colors",
                              active === key ? "text-foreground" : "text-muted-foreground",
                            )}
                          >
                            <span className="font-mono text-xs text-subtle-foreground">0{i + 1}</span>
                            {labels.nav[key]}
                          </a>
                        </DrawerClose>
                      </li>
                    ))}
                  </ul>
                </nav>
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-6 py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
                  <LanguageSwitch lang={lang} hash={hash} label={labels.language} />
                  <CvDownloadButton lang={lang} labels={labels.cv} variant="compact" />
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </div>
    </header>
  )
}
