"use client"

import { useEffect, useRef } from "react"
import { Github, Linkedin, Twitter, Mail, MapPin, Flag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { gsap } from "@/lib/gsap-config"
import { ParticleEffect } from "@/components/particle-effect"

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const socialRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate text content with stagger
      if (textRef.current) {
        gsap.from(textRef.current.children, {
          opacity: 0,
          y: 50,
          duration: 1,
          stagger: 0.2,
          ease: "power4.out",
          delay: 0.5,
        })
      }

      // Animate profile image
      if (imageRef.current) {
        gsap.from(imageRef.current, {
          opacity: 0,
          scale: 0.8,
          rotation: -10,
          duration: 1.2,
          ease: "power4.out",
          delay: 0.3,
        })
      }

      // Animate buttons
      if (buttonsRef.current) {
        gsap.from(buttonsRef.current.children, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          stagger: 0.15,
          ease: "power4.out",
          delay: 1.2,
        })
      }

      // Animate social icons
      if (socialRef.current) {
        gsap.from(socialRef.current.children, {
          opacity: 0,
          scale: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
          delay: 1.5,
        })
      }
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={heroRef} id="home" className="min-h-screen flex items-center justify-center px-4 pt-16">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div ref={textRef} className="space-y-6 text-center md:text-left">
            <div className="space-y-2">
              <p className="text-lg text-muted-foreground font-medium">Salut 👋, Je suis</p>
              <h1 className="text-5xl md:text-7xl font-bold text-balance tracking-tight">
                Felicien <span className="text-primary">Mukamba</span>
              </h1>
              <div className="flex items-center gap-2 justify-center md:justify-start text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>Bukavu, RDC</span>
                <Flag className="w-4 h-4 ml-2" />
                <span>🇨🇩</span>
              </div>
            </div>

            <p className="text-xl text-muted-foreground text-balance leading-relaxed">
              Un <span className="text-accent font-semibold">ingénieur logiciel</span> passionné par le développement
              web depuis la République Démocratique du Congo
            </p>

            <div ref={buttonsRef} className="flex gap-4 justify-center md:justify-start">
              <Button asChild size="lg" className="gap-2 apple-shadow apple-transition hover:scale-105">
                <a href="#contact">
                  <Mail className="w-4 h-4" />
                  Me Contacter
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="apple-transition hover:scale-105">
                <a href="#projects">Voir mes Projets</a>
              </Button>
            </div>

            {/* Social Links */}
            <div ref={socialRef} className="flex gap-4 justify-center md:justify-start pt-4">
              <Button asChild variant="ghost" size="icon" className="apple-transition hover:scale-110 hover:text-primary">
                <a
                  href="https://github.com/felicienmukamba"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
              </Button>
              <Button asChild variant="ghost" size="icon" className="apple-transition hover:scale-110 hover:text-primary">
                <a
                  href="https://www.linkedin.com/in/felicien-mukamba-5b49ab252/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </Button>
              <Button asChild variant="ghost" size="icon" className="apple-transition hover:scale-110 hover:text-primary">
                <a href="https://x.com/felicienmukamb" target="_blank" rel="noopener noreferrer" aria-label="Twitter/X">
                  <Twitter className="w-5 h-5" />
                </a>
              </Button>
              <Button asChild variant="ghost" size="icon" className="apple-transition hover:scale-110 hover:text-primary">
                <a href="mailto:felicienmukamba.cd@gmail.com" aria-label="Email">
                  <Mail className="w-5 h-5" />
                </a>
              </Button>
            </div>
          </div>

          {/* Profile Image */}
          <div className="relative">
            <div ref={imageRef} className="relative w-full aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-primary rounded-full blur-3xl opacity-20 gradient-animate" />
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-primary/20 apple-shadow-lg apple-transition hover:scale-105 hover:border-primary/40">
                <img
                  src="/images/pxl-20250118-113559064.jpg"
                  alt="Felicien Mukamba"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

