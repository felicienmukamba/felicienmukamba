"use client"

import { useEffect, useRef } from "react"
import { Mail, Phone, MapPin, Send } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { gsap } from "@/lib/gsap-config"

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const contactInfoRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)

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

      // Animate contact info
      if (contactInfoRef.current) {
        gsap.from(contactInfoRef.current, {
          opacity: 0,
          x: -50,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: contactInfoRef.current,
            start: "top 75%",
          },
        })
      }

      // Animate form
      if (formRef.current) {
        gsap.from(formRef.current, {
          opacity: 0,
          x: 50,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 75%",
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Email",
      value: "felicienmukamba.cd@gmail.com",
      href: "mailto:felicienmukamba.cd@gmail.com",
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: "Téléphone",
      value: "+243 995 209 133",
      href: "tel:+243995209133",
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: "Localisation",
      value: "Bukavu, RDC 🇨🇩",
      href: null,
    },
  ]

  return (
    <section ref={sectionRef} id="contact" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div ref={headerRef} className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance tracking-tight">
            Contactez<span className="text-primary">-Moi</span>
          </h2>
          <p className="text-xl text-muted-foreground text-balance">
            N'hésitez pas à me contacter pour discuter de vos projets
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div ref={contactInfoRef} className="space-y-6">
            <Card className="bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 border-primary/20 apple-shadow-lg">
              <CardContent className="p-6 space-y-6">
                <h3 className="text-2xl font-bold">Informations de Contact</h3>
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary flex-shrink-0 apple-transition hover:scale-110">
                      {info.icon}
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{info.label}</p>
                      {info.href ? (
                        <a href={info.href} className="font-medium hover:text-primary apple-transition">
                          {info.value}
                        </a>
                      ) : (
                        <p className="font-medium">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-card border-border apple-shadow">
              <CardContent className="p-6">
                <p className="text-muted-foreground italic text-pretty leading-relaxed">
                  "Réservez une démonstration de nos solutions logicielles ou inscrivez-vous à nos formations pour
                  devenir un expert digital."
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div ref={formRef}>
            <Card className="bg-card border-border apple-shadow-lg">
              <CardContent className="p-6">
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Nom
                    </label>
                    <Input
                      id="name"
                      placeholder="Votre nom"
                      className="bg-background border-border apple-transition focus:scale-[1.02]"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="votre@email.com"
                      className="bg-background border-border apple-transition focus:scale-[1.02]"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Votre message..."
                      rows={5}
                      className="bg-background border-border resize-none apple-transition focus:scale-[1.02]"
                    />
                  </div>
                  <Button type="submit" className="w-full gap-2 apple-shadow apple-transition hover:scale-105">
                    <Send className="w-4 h-4" />
                    Envoyer le Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 pt-8 border-t border-border">
        <div className="container mx-auto max-w-6xl text-center">
          <p className="text-muted-foreground">© 2025 Felicien Mukamba. Tous droits réservés.</p>
          <p className="text-sm text-muted-foreground mt-2">Construit avec ❤️ en République Démocratique du Congo 🇨🇩</p>
        </div>
      </footer>
    </section>
  )
}

