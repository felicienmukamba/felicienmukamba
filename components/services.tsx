import { Building2, GraduationCap, ShoppingCart, Hospital, Users, Smartphone } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function Services() {
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
    <section id="services" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        {/* SOSIDE Products */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <img src="/images/flyer-20products.png" alt="SOSIDE Logo" className="h-16 mx-auto mb-4" />
            </div>
            <h2 className="text-4xl font-bold mb-4 text-balance">
              Solutions <span className="text-primary">Logicielles</span>
            </h2>
            <p className="text-xl text-muted-foreground text-balance">SOSIDE - Solutions Logicielles Sur Mesure</p>
            <p className="text-muted-foreground">Innovation & Biométrie au service de votre gestion</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <Card key={index} className="bg-card border-border hover:border-primary/50 transition-all group">
                <CardContent className="p-6 space-y-4">
                  <div
                    className={`w-16 h-16 rounded-lg bg-gradient-to-br ${product.color} flex items-center justify-center text-white group-hover:scale-110 transition-transform`}
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
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-balance">
              Formations <span className="text-primary">Expert Digital</span>
            </h2>
            <p className="text-xl text-muted-foreground text-balance">
              Formations sur mesure pour transformer votre carrière
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {trainings.map((training, index) => (
              <Card
                key={index}
                className="bg-card border-border hover:border-primary/50 transition-all hover:scale-105"
              >
                <CardContent className="p-4">
                  <p className="font-semibold text-center text-balance">{training}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <img
              src="/images/2025-10-13-09-12-img-5743.jpeg"
              alt="Formation en cours"
              className="w-full max-w-2xl mx-auto rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
