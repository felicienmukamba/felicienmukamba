import type { Dictionary } from "@/lib/dictionaries"

/** The slice of the dictionary the (client) site header needs. */
export function headerLabels(t: Dictionary) {
  return {
    nav: t.nav,
    openMenu: t.a11y.openMenu,
    closeMenu: t.a11y.closeMenu,
    toggleTheme: t.a11y.toggleTheme,
    language: t.a11y.language,
    primaryNav: t.a11y.primaryNav,
    cv: { download: t.cv.download, generating: t.cv.generating, error: t.cv.error },
  }
}
