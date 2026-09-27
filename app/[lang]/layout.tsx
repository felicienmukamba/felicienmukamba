import type { Metadata, Viewport } from "next"
import { notFound } from "next/navigation"
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "next-themes"
import { MotionProvider } from "@/components/motion"
import { JsonLd } from "@/components/json-ld"
import { getDictionary } from "@/lib/dictionaries"
import { isLocale, localeMeta, locales } from "@/lib/i18n"
import { site } from "@/lib/site"
import "../globals.css"

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" })
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" })
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
})

export const dynamicParams = false

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0c0c12" },
    { media: "(prefers-color-scheme: light)", color: "#fbfbfd" },
  ],
  colorScheme: "dark light",
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params
  if (!isLocale(lang)) return {}
  const t = getDictionary(lang)

  return {
    metadataBase: new URL(site.url),
    title: { default: t.meta.title, template: `%s — ${site.name}` },
    description: t.meta.description,
    keywords: t.meta.keywords,
    applicationName: site.name,
    authors: [{ name: site.name, url: site.url }],
    creator: site.name,
    alternates: {
      canonical: `/${lang}`,
      languages: {
        ...Object.fromEntries(locales.map((l) => [localeMeta[l].bcp47, `/${l}`])),
        "x-default": "/en",
      },
    },
    openGraph: {
      type: "profile",
      firstName: "Félicien",
      lastName: "Mukamba",
      username: "felicienmukamba",
      url: `/${lang}`,
      siteName: site.name,
      title: t.meta.title,
      description: t.meta.description,
      locale: localeMeta[lang].og,
      alternateLocale: locales.filter((l) => l !== lang).map((l) => localeMeta[l].og),
    },
    twitter: {
      card: "summary_large_image",
      title: t.meta.title,
      description: t.meta.description,
      creator: site.twitterHandle,
    },
    robots: { index: true, follow: true, googleBot: { "max-image-preview": "large", "max-snippet": -1 } },
    formatDetection: { telephone: false },
    category: "technology",
  }
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const t = getDictionary(lang)

  return (
    <html
      lang={localeMeta[lang].bcp47}
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
      suppressHydrationWarning
    >
      <body>
        <noscript>
          {/* Scroll reveals start hidden; without JS, show everything. */}
          <style>{"[data-reveal]{opacity:1!important;transform:none!important}"}</style>
        </noscript>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-foreground focus:px-4 focus:py-2 focus:text-background"
        >
          {t.a11y.skip}
        </a>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <MotionProvider>{children}</MotionProvider>
        </ThemeProvider>
        <JsonLd lang={lang} />
        {process.env.VERCEL && <Analytics />}
      </body>
    </html>
  )
}
