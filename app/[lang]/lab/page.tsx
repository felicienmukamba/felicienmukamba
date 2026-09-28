import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ToolCard } from "@/components/lab/tool-card"
import { Reveal } from "@/components/motion"
import { Footer } from "@/components/sections/footer"
import { SiteHeader } from "@/components/site-header"
import { getDictionary } from "@/lib/dictionaries"
import { headerLabels } from "@/lib/header-labels"
import { isLocale, localeMeta, locales } from "@/lib/i18n"
import { labTools } from "@/lib/lab/tools"

export async function generateMetadata({ params }: PageProps<"/[lang]/lab">): Promise<Metadata> {
  const { lang } = await params
  if (!isLocale(lang)) return {}
  const t = getDictionary(lang)
  return {
    title: `${t.lab.kicker} — ${t.lab.title} ${t.lab.titleAccent}`,
    description: t.lab.intro,
    alternates: {
      canonical: `/${lang}/lab`,
      languages: Object.fromEntries(locales.map((l) => [localeMeta[l].bcp47, `/${l}/lab`])),
    },
  }
}

export default async function LabIndex({ params }: PageProps<"/[lang]/lab">) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const t = getDictionary(lang)

  return (
    <>
      <SiteHeader lang={lang} labels={headerLabels(t)} path="/lab" />
      <main id="main" className="relative overflow-hidden pb-24 pt-32 md:pt-40">
        <div aria-hidden className="bg-grid pointer-events-none absolute inset-0 -z-10" />
        <div className="container-page">
          <Reveal>
            <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-accent">{t.lab.kicker}</p>
            <h1 className="mt-5 max-w-4xl text-[clamp(2.6rem,6.5vw,5.5rem)] font-semibold leading-[0.98] tracking-[-0.05em]">
              {t.lab.title} <span className="font-serif font-normal italic tracking-[-0.02em] text-gradient">{t.lab.titleAccent}</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">{t.lab.intro}</p>
          </Reveal>
          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {labTools.map((id, i) => (
              <Reveal key={id} delay={i * 0.06} className="h-full">
                <ToolCard id={id} href={`/${lang}/lab/${id}`} name={t.lab.tools[id].name} description={t.lab.tools[id].description} cta={t.lab.openTool} />
              </Reveal>
            ))}
          </div>
        </div>
      </main>
      <Footer t={t} />
    </>
  )
}
