import { notFound } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { About } from "@/components/sections/about"
import { AiSection } from "@/components/sections/ai"
import { Contact } from "@/components/sections/contact"
import { Education } from "@/components/sections/education"
import { Experience } from "@/components/sections/experience"
import { Footer } from "@/components/sections/footer"
import { Hero } from "@/components/sections/hero"
import { LabTeaser } from "@/components/sections/lab"
import { Projects } from "@/components/sections/projects"
import { Skills } from "@/components/sections/skills"
import { Marquee } from "@/components/ui-kit"
import { getDictionary } from "@/lib/dictionaries"
import { headerLabels } from "@/lib/header-labels"
import { isLocale } from "@/lib/i18n"
import { stack } from "@/lib/site"

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const t = getDictionary(lang)

  return (
    <>
      <SiteHeader lang={lang} labels={headerLabels(t)} />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero lang={lang} t={t} />
        <div className="container-page mt-16 md:mt-20">
          <Marquee items={stack} />
        </div>
        <About t={t} />
        <AiSection t={t} />
        <Experience t={t} />
        <Projects t={t} />
        <Skills t={t} />
        <Education t={t} />
        <LabTeaser lang={lang} t={t} />
        <Contact lang={lang} t={t} />
      </main>
      <Footer t={t} />
    </>
  )
}
