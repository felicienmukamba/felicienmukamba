"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { gsap } from "@/lib/gsap-config"

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

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

      // Animate skill cards with stagger
      if (cardsRef.current) {
        gsap.from(cardsRef.current.children, {
          opacity: 0,
          y: 50,
          scale: 0.95,
          duration: 0.8,
          stagger: 0.15,
          ease: "power4.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 75%",
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const skillCategories = [
    {
      category: "Frontend",
      skills: ["Angular", "React", "Next.js", "HTML5", "CSS3", "Tailwind CSS", "Bootstrap"],
      color: "from-blue-500 to-cyan-500",
    },
    {
      category: "Backend",
      skills: ["Spring Boot", "Django", "Python", "Node.js", "RESTful APIs"],
      color: "from-green-500 to-emerald-500",
    },
    {
      category: "Mobile",
      skills: ["Flutter", "Android", "iOS", "React Native"],
      color: "from-purple-500 to-pink-500",
    },
    {
      category: "DevOps",
      skills: ["Git", "Docker", "CI/CD"],
      color: "from-orange-500 to-red-500",
    },
    {
      category: "Bases de données",
      skills: ["PostgreSQL", "MongoDB", "Firebase"],
      color: "from-yellow-500 to-amber-500",
    },
    {
      category: "Autres",
      skills: ["Figma", "Postman", "VS Code", "Agile/Scrum"],
      color: "from-indigo-500 to-violet-500",
    },
  ]

  return (
    <section ref={sectionRef} id="skills" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div ref={headerRef} className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance tracking-tight">
            Compétences <span className="text-primary">Techniques</span>
          </h2>
          <p className="text-xl text-muted-foreground text-balance">
            Technologies et outils que je maîtrise pour créer des solutions innovantes
          </p>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((category, index) => (
            <Card
              key={index}
              className="bg-card border-border hover:border-primary/50 apple-transition hover:scale-105 apple-shadow group"
            >
              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold mb-2">{category.category}</h3>
                  <div className={`h-1 w-20 bg-gradient-to-r ${category.color} rounded-full apple-transition group-hover:w-32`} />
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-medium hover:bg-primary hover:text-primary-foreground apple-transition cursor-default hover:scale-110"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
