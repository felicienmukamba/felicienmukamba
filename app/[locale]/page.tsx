import Hero from "@/components/hero"
import About from "@/components/about"
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import Services from "@/components/services"
import Contact from "@/components/contact"
import Navigation from "@/components/navigation"
import { AnimatedBackground } from "@/components/animated-background"
import { StatsSection } from "@/components/stats-counter"
import { WaveDivider, GradientDivider } from "@/components/section-dividers"

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <AnimatedBackground />
      <Navigation />
      <Hero />

      <WaveDivider variant="bottom" />

      <About />

      <section className="py-12 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <StatsSection />
        </div>
      </section>

      <GradientDivider />

      <Skills />

      <WaveDivider variant="top" />

      <Projects />

      <GradientDivider />

      <Services />

      <WaveDivider variant="bottom" />

      <Contact />
    </main>
  )
}
