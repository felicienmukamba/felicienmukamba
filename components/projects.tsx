import { ExternalLink, Github } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Projects() {
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
    <section id="projects" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-balance">
            Mes <span className="text-primary">Projets</span>
          </h2>
          <p className="text-xl text-muted-foreground text-balance">Découvrez quelques-uns de mes projets récents</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="bg-card border-border overflow-hidden group hover:border-primary/50 transition-all"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-60" />
              </div>
              <CardContent className="p-6 space-y-4">
                <h3 className="text-2xl font-bold text-balance">{project.title}</h3>
                <p className="text-muted-foreground text-pretty">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3 pt-2">
                  <Button asChild variant="default" size="sm" className="gap-2">
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4" />
                      Code
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="sm" className="gap-2 bg-transparent">
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

        <div className="text-center mt-12">
          <Button asChild variant="outline" size="lg" className="gap-2 bg-transparent">
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
