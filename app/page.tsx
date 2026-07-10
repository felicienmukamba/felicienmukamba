"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useSpring, useTransform } from "framer-motion"
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  MapPin,
  ExternalLink,
  GraduationCap,
  Award,
  Sun,
  Moon,
  Play,
  Users,
  Phone,
  ArrowUpRight,
  Menu,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { translations } from "@/lib/translations"
import dynamic from "next/dynamic"
import { PDFDownloadButton } from "@/components/pdf-download-button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const Scene3D = dynamic(() => import("@/components/3d-scene").then((mod) => mod.Scene3D), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-background" />,
})

type Language = "fr" | "en" | "ln"

const FLAG_MAP: Record<Language, { emoji: string; label: string }> = {
  fr: { emoji: "🇫🇷", label: "Français" },
  en: { emoji: "🇬🇧", label: "English" },
  ln: { emoji: "🇨🇩", label: "Lingála" },
}

export default function Portfolio() {
  const [language, setLanguage] = useState<Language>("fr")
  const [activeSection, setActiveSection] = useState("about")
  const [mounted, setMounted] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const t = translations[language]

  // Scroll animations
  const { scrollYProgress } = useScroll()
  const opacity = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  // Parallax effects
  const yPhoto = useTransform(scrollYProgress, [0, 1], [0, 600])
  const opacityPhoto = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const yText = useTransform(scrollYProgress, [0, 1], [0, 200])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["about", "experience", "projects", "education", "contact"]
      const scrollPosition = window.scrollY + 200

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-background text-foreground grain relative">
      {/* ═══ Progress Bar ═══ */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent via-[var(--accent-violet)] to-[var(--accent-teal)] z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* ═══ Background Grid ═══ */}
      <div className="fixed inset-0 z-0 bg-grid bg-grid-fade pointer-events-none" />

      {/* ═══ 3D Background ═══ */}
      <div className="fixed inset-0 z-[1]">
        <Scene3D />
      </div>

      {/* ═══ Massive Background Typography ═══ */}
      <div className="fixed inset-0 z-[2] pointer-events-none overflow-hidden select-none flex flex-col justify-between py-24">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="ml-[5vw]"
        >
          <span className="hero-massive font-sans block">SOFT</span>
          <span className="hero-massive font-sans block">WARE</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-right mr-[5vw]"
        >
          <span className="hero-massive font-sans block">ENGI</span>
          <span className="hero-massive font-sans block">NEER</span>
        </motion.div>
      </div>

      {/* ═══ Top Navbar (Fixed, Glass) ═══ */}
      <header className="fixed top-0 left-0 right-0 z-40 px-4 md:px-8 py-4 glass border-b border-border/10 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-lg font-black tracking-tighter text-foreground">FM.</span>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:block ml-8">
            <ul className="flex items-center gap-6">
              {Object.entries(t.nav).map(([key, value]) => (
                <li key={key}>
                  <a
                    href={`#${key}`}
                    className={`text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${activeSection === key ? "text-accent" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    {value}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          {/* Theme & Language Desktop */}
          <div className="hidden md:flex items-center gap-2 mr-4">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full hover:bg-secondary/50 text-muted-foreground transition-colors"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <div className="h-4 w-px bg-border/40 mx-1" />
            <div className="flex items-center gap-1">
              {(["fr", "en", "ln"] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-2 py-1 rounded-full text-base transition-all duration-200 ${language === lang ? "scale-110 drop-shadow-md" : "opacity-50 hover:opacity-100 hover:scale-105"}`}
                  title={FLAG_MAP[lang].label}
                >
                  {FLAG_MAP[lang].emoji}
                </button>
              ))}
            </div>
            <div className="h-4 w-px bg-border/40 mx-2" />
            <PDFDownloadButton language={language} label={t.downloadCV} />
          </div>

          {/* Theme & Language Mobile */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full bg-secondary/50 hover:bg-secondary transition-colors"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <div className="flex items-center gap-0.5">
              {(["fr", "en", "ln"] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-1.5 py-1 rounded-full text-base transition-all ${language === lang ? "scale-125 drop-shadow-md" : "opacity-60"}`}
                >
                  {FLAG_MAP[lang].emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Drawer Trigger (Mobile) */}
          <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
            <DrawerTrigger asChild>
              <button className="md:hidden p-2 rounded-full bg-secondary/50 hover:bg-secondary transition-colors">
                <Menu className="h-4 w-4" />
              </button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle className="text-lg font-bold">{t.name}</DrawerTitle>
                <p className="text-sm text-muted-foreground">{t.role}</p>
              </DrawerHeader>
              <nav className="px-4 pb-8">
                <ul className="space-y-1">
                  {Object.entries(t.nav).map(([key, value]) => (
                    <li key={key}>
                      <DrawerClose asChild>
                        <a
                          href={`#${key}`}
                          className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all text-sm font-medium ${activeSection === key ? "bg-accent/10 text-accent" : "text-muted-foreground hover:bg-secondary/50"}`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${activeSection === key ? "bg-accent" : "bg-muted-foreground/40"}`}
                          />
                          <span className="uppercase tracking-widest text-xs">{value}</span>
                        </a>
                      </DrawerClose>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-6 border-t border-border/20">
                  <PDFDownloadButton language={language} label={t.downloadCV} />
                </div>
              </nav>
            </DrawerContent>
          </Drawer>
        </div>
      </header>

      {/* ═══ Main Content (Single Column) ═══ */}
      <main className="relative z-10 w-full pt-32 pb-24">
        
        {/* ── Hero Section with Parallax Photo ── */}
        <section className="min-h-[85vh] flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
          <motion.div style={{ y: yPhoto, opacity: opacityPhoto }} className="relative z-10 mb-8 pointer-events-none">
            {/* Parallax Photo */}
            <div className="w-48 h-48 md:w-56 md:h-56 rounded-[3rem] overflow-hidden border-4 border-background/50 shadow-2xl relative premium-border glow-accent">
              <img 
                src="/images/felicien-profile.jpg" 
                alt={t.name} 
                className="w-full h-full object-cover scale-110"
              />
              <div className="absolute inset-0 rounded-[3rem] shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]" />
            </div>
          </motion.div>

          <motion.div 
            style={{ y: yText }}
            initial="hidden" 
            animate="visible" 
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } }
            }}
            className="z-20 max-w-3xl mx-auto p-8 md:p-12 rounded-[3rem] bg-background/60 backdrop-blur-2xl border border-border/10 shadow-2xl premium-border"
          >
            <motion.p variants={itemVariants} className="text-accent font-mono text-sm mb-4 tracking-wider uppercase">{t.greeting}</motion.p>
            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-black tracking-tighter text-foreground leading-[0.9] mb-4">
              {t.name}
            </motion.h1>
            <motion.h2 variants={itemVariants} className="text-xl md:text-2xl font-medium tracking-tight text-foreground/80 mb-6">
              {t.role}
            </motion.h2>
            <motion.p variants={itemVariants} className="leading-relaxed text-muted-foreground text-base md:text-lg mx-auto max-w-xl">
              {t.tagline}
            </motion.p>

            <motion.div variants={itemVariants} className="flex items-center justify-center gap-6 mt-8">
              <a href="https://github.com/felicienmukamba" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-secondary/50 hover:bg-accent hover:text-white transition-all">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://www.linkedin.com/in/felicien-mukamba-5b49ab252/" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-secondary/50 hover:bg-accent hover:text-white transition-all">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://x.com/felicienmukamb" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-secondary/50 hover:bg-accent hover:text-white transition-all">
                <Twitter className="h-5 w-5" />
              </a>
            </motion.div>
          </motion.div>
        </section>

        <div className="max-w-5xl mx-auto px-6 mt-24 space-y-32">
          
          {/* ── About Section ── */}
          <section id="about" className="scroll-mt-32">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
              className="p-8 md:p-12 rounded-[3rem] bg-secondary/10 backdrop-blur-xl premium-border shadow-2xl"
            >
              <h2 className="text-sm font-bold uppercase tracking-widest text-accent mb-8 flex items-center justify-center">
                <span className="w-12 h-px bg-accent/40 mr-4"></span>
                {t.about.title}
                <span className="w-12 h-px bg-accent/40 ml-4"></span>
              </h2>
              
              <div className="space-y-6 text-foreground/80 leading-relaxed text-base md:text-lg max-w-3xl mx-auto text-center">
                <p>{t.about.p1}</p>
                <p>{t.about.p2}</p>
                <p>{t.about.p3}</p>
              </div>
            </motion.div>
          </section>

          {/* ── Experience Section ── */}
          <section id="experience" className="scroll-mt-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-sm font-bold uppercase tracking-widest text-foreground mb-12 flex items-center">
                <span className="text-accent mr-3">01.</span> {t.experience.title}
                <span className="flex-1 h-px bg-border/40 ml-6"></span>
              </h2>

              <div className="space-y-6">
                {t.experience.items.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ delay: index * 0.1, duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                    className="group relative p-8 rounded-[3rem] bg-secondary/10 backdrop-blur-sm premium-border hover-lift transition-all"
                  >
                    <div className="md:flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold leading-snug text-foreground group-hover:text-accent transition-colors duration-300">
                          {exp.title}
                        </h3>
                        <p className="text-muted-foreground font-medium mt-1">{exp.company}</p>
                      </div>
                      <span className="inline-block mt-2 md:mt-0 text-xs font-bold uppercase tracking-widest text-accent bg-accent/10 px-4 py-1.5 rounded-full">
                        {exp.period}
                      </span>
                    </div>
                    
                    <p className="text-sm leading-relaxed text-muted-foreground max-w-3xl mb-6">{exp.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="inline-flex items-center px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-full bg-background border border-border/20 text-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* ═══ Projects Section — CAROUSEL ═══ */}
          <section id="projects" className="scroll-mt-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-sm font-bold uppercase tracking-widest text-foreground mb-12 flex items-center">
                <span className="text-accent mr-3">02.</span> {t.projects.title}
                <span className="flex-1 h-px bg-border/40 ml-6"></span>
              </h2>

              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-4 md:-ml-6">
                  {t.projects.items.map((project, index) => (
                    <CarouselItem key={index} className="pl-4 md:pl-6 md:basis-1/2 lg:basis-1/2">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.96 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="group relative h-full rounded-[3rem] overflow-hidden bg-card/50 backdrop-blur-sm hover-lift premium-border flex flex-col"
                      >
                        {/* Project Image */}
                        <div className="relative aspect-[16/9] overflow-hidden bg-secondary/10 shrink-0">
                          <img
                            src={project.image || "/placeholder.svg"}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          />
                          {project.featured && (
                            <div className="absolute top-4 left-4">
                              <span className="inline-flex items-center px-3 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-full bg-accent text-white shadow-lg glow-accent">
                                Featured
                              </span>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-card/20 to-transparent" />
                        </div>

                        {/* Project Content */}
                        <div className="p-6 md:p-8 -mt-12 relative z-10 flex-1 flex flex-col">
                          <h3 className="text-2xl font-bold text-foreground mb-3">
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 hover:text-accent transition-colors"
                            >
                              {project.title}
                              {project.link !== "#" && <ExternalLink className="h-5 w-5 opacity-60" />}
                            </a>
                          </h3>

                          {project.description && (
                            <p className="text-sm leading-relaxed text-muted-foreground mb-6 flex-1">{project.description}</p>
                          )}

                          {/* Stats */}
                          {project.featured && project.stats && (
                            <div className="mb-6 flex gap-6 bg-secondary/20 p-4 rounded-2xl premium-border border-border/5">
                              {Object.entries(project.stats).map(([key, value]) => (
                                <div key={key} className="text-center flex-1">
                                  <p className="text-xl font-black text-accent">{String(value)}</p>
                                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mt-1">{key}</p>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Technologies */}
                          <div className="flex flex-wrap gap-2 mt-auto">
                            {project.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="inline-flex items-center px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full bg-accent/10 text-accent border border-accent/20"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    </CarouselItem>
                  ))}
                </CarouselContent>

                {/* Carousel Controls */}
                <div className="flex items-center justify-between mt-8">
                  <div className="flex items-center gap-2">
                    <CarouselPrevious className="static translate-y-0 h-12 w-12 rounded-full border-border/20 bg-secondary/20 hover:bg-accent hover:text-white hover:border-accent transition-all premium-border" />
                    <CarouselNext className="static translate-y-0 h-12 w-12 rounded-full border-border/20 bg-secondary/20 hover:bg-accent hover:text-white hover:border-accent transition-all premium-border" />
                  </div>
                  <a
                    href="https://github.com/felicienmukamba"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center font-bold text-sm text-foreground hover:text-accent transition-colors bg-secondary/20 px-6 py-3 rounded-full premium-border"
                  >
                    {t.projects.viewAll}
                    <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </div>
              </Carousel>
            </motion.div>
          </section>

          {/* ── Education & Skills Grid ── */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Education */}
            <section id="education" className="scroll-mt-32">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-sm font-bold uppercase tracking-widest text-foreground mb-8 flex items-center">
                  <span className="text-accent mr-3">03.</span> {t.education.title}
                </h2>

                <div className="space-y-6">
                  {t.education.items.map((edu, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="p-6 rounded-[2rem] bg-secondary/10 backdrop-blur-sm premium-border hover-lift"
                    >
                      <span className="text-[10px] font-bold uppercase tracking-widest text-accent mb-2 block">{edu.period}</span>
                      <h3 className="font-bold text-foreground flex items-center gap-2 mb-1">
                        <GraduationCap className="h-4 w-4 text-accent shrink-0" />
                        {edu.degree}
                      </h3>
                      <p className="text-sm text-muted-foreground">{edu.school}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </section>

            {/* Skills */}
            <section className="scroll-mt-32">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-sm font-bold uppercase tracking-widest text-foreground mb-8 flex items-center">
                  <span className="text-accent mr-3">04.</span> {t.skills.title}
                </h2>

                <div className="space-y-6">
                  {t.skills.categories.map((category, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="p-6 rounded-[2rem] bg-secondary/10 backdrop-blur-sm premium-border hover-lift"
                    >
                      <h3 className="font-bold text-sm text-foreground mb-4">{category.name}</h3>
                      <div className="flex flex-wrap gap-2">
                        {category.items.map((skill) => (
                          <span
                            key={skill}
                            className="inline-flex items-center px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-full bg-background border border-border/20 text-foreground"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </section>
          </div>

          {/* ── Contact Section ── */}
          <section id="contact" className="scroll-mt-32">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="p-12 md:p-16 rounded-[3rem] bg-secondary/10 backdrop-blur-xl premium-border text-center max-w-4xl mx-auto shadow-2xl">
                <h2 className="text-sm font-bold uppercase tracking-widest text-accent mb-6">
                  {t.contact.title}
                </h2>
                <h3 className="text-3xl md:text-5xl font-black text-foreground mb-6 leading-tight">{t.contact.subtitle}</h3>
                <p className="text-muted-foreground leading-relaxed mb-10 max-w-2xl mx-auto text-lg">
                  {t.contact.description}
                </p>

                <div className="flex flex-wrap justify-center gap-6 mb-12">
                  <a href={`mailto:${t.contact.email}`} className="flex items-center gap-2 text-foreground font-medium hover:text-accent transition-colors bg-background/50 px-6 py-3 rounded-full premium-border">
                    <Mail className="h-4 w-4" />
                    {t.contact.email}
                  </a>
                  <a href={`tel:${t.contact.phone}`} className="flex items-center gap-2 text-foreground font-medium hover:text-accent transition-colors bg-background/50 px-6 py-3 rounded-full premium-border">
                    <Phone className="h-4 w-4" />
                    {t.contact.phone}
                  </a>
                </div>

                <Button className="h-14 px-8 text-base font-bold gap-3 bg-accent hover:bg-accent/90 text-white rounded-full glow-accent hover:scale-105 transition-all" asChild>
                  <a href={`mailto:${t.contact.email}`}>
                    <Mail className="h-5 w-5" />
                    {t.contact.cta}
                  </a>
                </Button>
              </div>
            </motion.div>
          </section>

          {/* ── Footer ── */}
          <footer className="pt-12 pb-6 text-center text-sm text-muted-foreground flex flex-col items-center">
            <span className="text-xl font-black tracking-tighter text-foreground mb-4 opacity-50">FM.</span>
            <p>
              {t.footer.designed} <span className="font-bold text-foreground">{t.name}</span>
            </p>
            <p className="mt-2 text-xs">{t.footer.built}</p>
          </footer>
        </div>
      </main>
    </div>
  )
}
