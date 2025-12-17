"use client"

import { useEffect, useRef } from "react"
import { Building2, GraduationCap, ShoppingCart, Hospital, Users, Smartphone } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { gsap } from "@/lib/gsap-config"

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const productsHeaderRef = useRef<HTMLDivElement>(null)
  const productsGridRef = useRef<HTMLDivElement>(null)
  const trainingsHeaderRef = useRef<HTMLDivElement>(null)
  const trainingsGridRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate products header
      if (productsHeaderRef.current) {
        gsap.from(productsHeaderRef.current.children, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          stagger: 0.15,
          scrollTrigger: {
            trigger: productsHeaderRef.current,
            start: "top 80%",
          },
        })
      }

      // Animate products grid cards
      if (productsGridRef.current) {
        gsap.from(productsGridRef.current.children, {
          opacity: 0,
          y: 50,
          scale: 0.9,
          duration: 0.8,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: productsGridRef.current,
            start: "top 75%",
          },
        })
      }

      // Animate trainings header
      if (trainingsHeaderRef.current) {
        gsap.from(trainingsHeaderRef.current.children, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          stagger: 0.15,
          scrollTrigger: {
            trigger: trainingsHeaderRef.current,
            start: "top 80%",
          },
        })
      }

      // Animate training cards
      if (trainingsGridRef.current) {
        gsap.from(trainingsGridRef.current.children, {
          opacity: 0,
          scale: 0.8,
          duration: 0.6,
          stagger: 0.08,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: trainingsGridRef.current,
            start: "top 75%",
          },
        })
      }

      // Animate image
      if (imageRef.current) {
        gsap.from(imageRef.current, {
          opacity: 0,
          scale: 0.95,
          y: 30,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 80%",
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const products = [
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: "Gestion Scolaire",
      description: "Progiciel de gestion sur mesure avec la reconnaissance biométrique",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Building2 className="w-8 h-8" />,
      title: "Gestion Universitaire",
      description: "Progiciel de gestion sur mesure avec la reconnaissance biométrique",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <ShoppingCart className="w-8 h-8" />,
      title: "Gestion Supermarché",
      description: "Progiciel de gestion sur mesure pour les points de vente",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "E-Commerce",
      description: "Progiciel de gestion sur mesure de vente en ligne multi-vendeurs",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: <Hospital className="w-8 h-8" />,
      title: "Gestion Hospitaliaire",
      description: "Progiciel de gestion sur mesure avec la reconnaissance biométrique",
      color: "from-red-500 to-pink-500",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Gestion des Citoyens",
      description: "Progiciel national de gestion intégré avec la reconnaissance biométrique",
      color: "from-cyan-500 to-blue-500",
    },
  ]

  const trainings = [
    "Développeur Web Full Stack",
    "Développeur Full Stack Mobile",
    "Expert DevOps",
    "Data & Engineer",
    "Business Analyst",
    "Export Marketing Digital",
    "Expert Graphisme",
  ]

  return (
    <section ref={sectionRef} id="services" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        {/* SOSIDE Products */}
        <div className="mb-20">
          <div ref={productsHeaderRef} className="text-center mb-12">
            <div className="inline-block mb-4">
              <img src="/images/flyer-20products.png" alt="SOSIDE Logo" className="h-16 mx-auto mb-4" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance tracking-tight">
              Solutions <span className="text-primary">Logicielles</span>
            </h2>
            <p className="text-xl text-muted-foreground text-balance">SOSIDE - Solutions Logicielles Sur Mesure</p>
            <p className="text-muted-foreground">Innovation & Biométrie au service de votre gestion</p>
          </div>

          <div ref={productsGridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <Card
                key={index}
                className="bg-card border-border hover:border-primary/50 apple-transition hover:scale-105 apple-shadow group"
              >
                <CardContent className="p-6 space-y-4">
                  <div
                    className={`w-16 h-16 rounded-lg bg-gradient-to-br ${product.color} flex items-center justify-center text-white apple-transition group-hover:scale-110 group-hover:rotate-6`}
                  >
                    {product.icon}
                  </div>
                  <h3 className="text-xl font-bold text-balance">{product.title}</h3>
                  <p className="text-muted-foreground text-pretty">{product.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Training Programs */}
        <div>
          <div ref={trainingsHeaderRef} className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance tracking-tight">
              Formations <span className="text-primary">Expert Digital</span>
            </h2>
            <p className="text-xl text-muted-foreground text-balance">
              Formations sur mesure pour transformer votre carrière
            </p>
          </div>

          <div ref={trainingsGridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {trainings.map((training, index) => (
              <Card
                key={index}
                className="bg-card border-border hover:border-primary/50 apple-transition hover:scale-105 apple-shadow"
              >
                <CardContent className="p-4">
                  <p className="font-semibold text-center text-balance">{training}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div ref={imageRef} className="mt-12 text-center">
            <img
              src="/images/2025-10-13-09-12-img-5743.jpeg"
              alt="Formation en cours"
              className="w-full max-w-2xl mx-auto rounded-lg apple-shadow-lg apple-transition hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
