"use client"

import { useEffect, useRef } from "react"
import { Code2, Lightbulb, Sparkles, MessageCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { gsap, ScrollTrigger } from "@/lib/gsap-config"

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const quoteRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate header
      if (headerRef.current) {
        gsap.from(headerRef.current.children, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
          },
        })
      }

      // Animate cards with stagger
      if (cardsRef.current) {
        gsap.from(cardsRef.current.children, {
          opacity: 0,
          y: 50,
          duration: 0.8,
          stagger: 0.15,
          ease: "power4.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 75%",
          },
        })
      }

      // Animate quote
      if (quoteRef.current) {
        gsap.from(quoteRef.current, {
          opacity: 0,
          scale: 0.95,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: quoteRef.current,
            start: "top 80%",
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const highlights = [
    {
      icon: <Code2 className="w-6 h-6" />,
      title: "Innovation",
      description: "Je me concentre sur la création d'applications web innovantes et conviviales",
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Apprentissage Continu",
      description: "J'apprends et explore continuellement de nouvelles technologies web",
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Code Propre",
      description: "Passionné par la transformation d'idées en réalité grâce à un code propre et efficace",
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "UX/UI",
      description: "J'aime créer des expériences utilisateur agréables et intuitives",
    },
  ]

  return (
    <section ref={sectionRef} id="about" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div ref={headerRef} className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance tracking-tight">
            À Propos de <span className="text-primary">Moi</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Ingénieur logiciel passionné par l'innovation et le développement d'applications web de qualité
          </p>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {highlights.map((item, index) => (
            <Card
              key={index}
              className="bg-card border-border hover:border-primary/50 apple-transition hover:scale-105 apple-shadow"
            >
              <CardContent className="p-6 space-y-3">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary apple-transition group-hover:scale-110">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-muted-foreground text-pretty">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div ref={quoteRef}>
          <Card className="bg-gradient-to-br from-card via-card to-primary/5 border-primary/20 apple-shadow-lg">
            <CardContent className="p-8 md:p-12">
              <blockquote className="text-center space-y-4">
                <p className="text-2xl md:text-3xl font-medium text-balance italic">
                  "Le seul moyen de faire du bon travail est d'aimer ce que vous faites."
                </p>
                <footer className="text-muted-foreground text-lg">— Steve Jobs</footer>
              </blockquote>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

