"use client"

import { useEffect, useRef } from "react"
import { ExternalLink, Github } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { gsap } from "@/lib/gsap-config"

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

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

      // Animate project cards with stagger
      if (cardsRef.current) {
        gsap.from(cardsRef.current.children, {
          opacity: 0,
          y: 60,
          scale: 0.95,
          duration: 1,
          stagger: 0.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 75%",
          },
        })
      }

      // Animate CTA button
      if (ctaRef.current) {
        gsap.from(ctaRef.current, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 90%",
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const projects = [
    {
      title: "Système de Gestion Citoyens",
      description:
        "Application complète pour la gestion de l'identité, de la santé et de la sécurité des citoyens en RDC",
      tags: ["Angular", "Spring Boot", "PostgreSQL"],
      image: "/citizen-management-system-dashboard.jpg",
      github: "https://github.com/felicienmukamba/citizen-frontend-with-angular",
    },
    {
      title: "Application Mobile Citoyens",
      description: "Version mobile du système de gestion citoyens développée avec Flutter",
      tags: ["Flutter", "Dart", "Firebase"],
      image: "/mobile-app-citizen-management.jpg",
      github: "https://github.com/felicienmukamba/citizen-with-flutter",
    },
    {
      title: "Reconnaissance Faciale",
      description: "Application de reconnaissance faciale utilisant l'IA pour l'authentification biométrique",
      tags: ["Python", "TensorFlow", "OpenCV"],
      image: "/facial-recognition-app.jpg",
      github: "https://github.com/felicienmukamba/easy_facial_recognition",
    },
    {
      title: "YOLO Flutter App",
      description:
        "Application Flutter intégrant les modèles YOLO d'Ultralytics pour la détection d'objets en temps réel",
      tags: ["Flutter", "YOLO", "Computer Vision"],
      image: "/object-detection-mobile-app.jpg",
      github: "https://github.com/felicienmukamba/yolo-flutter-app",
    },
  ]

  return (
    <section ref={sectionRef} id="projects" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div ref={headerRef} className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance tracking-tight">
            Mes <span className="text-primary">Projets</span>
          </h2>
          <p className="text-xl text-muted-foreground text-balance">Découvrez quelques-uns de mes projets récents</p>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="bg-card border-border overflow-hidden group hover:border-primary/50 apple-transition hover:scale-105 apple-shadow"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover apple-transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-60" />
              </div>
              <CardContent className="p-6 space-y-4">
                <h3 className="text-2xl font-bold text-balance">{project.title}</h3>
                <p className="text-muted-foreground text-pretty leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium apple-transition hover:bg-primary hover:text-primary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3 pt-2">
                  <Button asChild variant="default" size="sm" className="gap-2 apple-transition hover:scale-105">
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4" />
                      Code
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="gap-2 bg-transparent apple-transition hover:scale-105"
                  >
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4" />
                      Détails
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div ref={ctaRef} className="text-center mt-12">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="gap-2 bg-transparent apple-transition hover:scale-105 apple-shadow"
          >
            <a href="https://github.com/felicienmukamba" target="_blank" rel="noopener noreferrer">
              <Github className="w-5 h-5" />
              Voir tous mes projets sur GitHub
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}

