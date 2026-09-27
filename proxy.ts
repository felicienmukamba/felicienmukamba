import { NextResponse, type NextRequest } from "next/server"
import { defaultLocale, isLocale, localeCookie, locales, type Locale } from "@/lib/i18n"

/** Picks the best supported locale from the saved choice, then Accept-Language. */
function preferredLocale(request: NextRequest): Locale {
  const saved = request.cookies.get(localeCookie)?.value
  if (saved && isLocale(saved)) return saved

  const header = request.headers.get("accept-language") ?? ""
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=")
      return { lang: tag.toLowerCase().split("-")[0], q: q ? Number(q) : 1 }
    })
    .sort((a, b) => b.q - a.q)

  return ranked.find((entry) => isLocale(entry.lang))?.lang as Locale | undefined ?? defaultLocale
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const hasLocale = locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))
  if (hasLocale) return

  const url = request.nextUrl.clone()
  url.pathname = `/${preferredLocale(request)}${pathname === "/" ? "" : pathname}`
  const response = NextResponse.redirect(url, 307)
  response.headers.set("Vary", "Accept-Language, Cookie")
  return response
}

export const config = {
  // Only bare paths: skip Next internals, API routes and any file with an extension.
  matcher: ["/((?!_next|api|.*\\..*).*)"],
}
