import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ShieldCheck } from "lucide-react"
import { BrandKit } from "@/components/lab/brand-kit"
import { DesignTools } from "@/components/lab/design-tools"
import { MotionTools } from "@/components/lab/motion-tools"
import { SvgGenerator } from "@/components/lab/svg-generator"
import { Footer } from "@/components/sections/footer"
import { SiteHeader } from "@/components/site-header"
import { getDictionary } from "@/lib/dictionaries"
import { headerLabels } from "@/lib/header-labels"
import { isLocale, localeMeta, locales } from "@/lib/i18n"
import { getLabStrings } from "@/lib/lab/i18n"
import { isLabTool, labTools } from "@/lib/lab/tools"

export const dynamicParams = false

export function generateStaticParams() {
  return labTools.map((tool) => ({ tool }))
}

export async function generateMetadata({ params }: PageProps<"/[lang]/lab/[tool]">): Promise<Metadata> {
  const { lang, tool } = await params
  if (!isLocale(lang) || !isLabTool(tool)) return {}
  const info = getDictionary(lang).lab.tools[tool]
  return {
    title: info.name,
    description: info.description,
    alternates: {
      canonical: `/${lang}/lab/${tool}`,
      languages: Object.fromEntries(locales.map((l) => [localeMeta[l].bcp47, `/${l}/lab/${tool}`])),
    },
  }
}

export default async function LabToolPage({ params }: PageProps<"/[lang]/lab/[tool]">) {
  const { lang, tool } = await params
  if (!isLocale(lang) || !isLabTool(tool)) notFound()
  const t = getDictionary(lang)
  const strings = getLabStrings(lang)
  const info = t.lab.tools[tool]

  return (
    <>
      <SiteHeader lang={lang} labels={headerLabels(t)} path={`/lab/${tool}`} />
      <main id="main" className="container-page pb-24 pt-28 md:pt-32">
        <Link href={`/${lang}/lab`} className="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4" aria-hidden /> {t.lab.back}
        </Link>
        <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-[clamp(2rem,4.5vw,3.4rem)] font-semibold leading-[1.02] tracking-[-0.04em]">{info.name}</h1>
            <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-muted-foreground">{info.description}</p>
          </div>
          <p className="flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-[12px] text-muted-foreground">
            <ShieldCheck className="size-3.5 text-success" aria-hidden /> {strings.common.localOnly}
          </p>
        </div>
        <div className="mt-10">
          {tool === "brand-kit" && <BrandKit t={strings} lang={lang === "en" ? "en" : "fr"} />}
          {tool === "svg" && <SvgGenerator t={strings} />}
          {tool === "motion" && <MotionTools t={strings} />}
          {tool === "design" && <DesignTools t={strings} />}
        </div>
      </main>
      <Footer t={t} />
    </>
  )
}
