import { Card, CardContent } from "@/components/ui/card"

export default function Skills() {
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
      category: "Outils & Autres",
      skills: ["Git", "Docker", "PostgreSQL", "MongoDB", "Firebase", "CI/CD"],
      color: "from-orange-500 to-red-500",
    },
  ]

  return (
    <section id="skills" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-balance">
            Compétences <span className="text-primary">Techniques</span>
          </h2>
          <p className="text-xl text-muted-foreground text-balance">
            Technologies et outils que je maîtrise pour créer des solutions innovantes
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((category, index) => (
            <Card key={index} className="bg-card border-border hover:border-primary/50 transition-all group">
              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold mb-2">{category.category}</h3>
                  <div className={`h-1 w-20 bg-gradient-to-r ${category.color} rounded-full`} />
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
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
