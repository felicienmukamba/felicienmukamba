"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useSpring } from "framer-motion"
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  MapPin,
  ExternalLink,
  Building2,
  GraduationCap,
  Award,
  Sun,
  Moon,
  Play,
  Users,
  Phone,
  ArrowUpRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { translations } from "@/lib/translations"
import dynamic from "next/dynamic"
import { PDFDownloadButton } from "@/components/pdf-download-button"

const Scene3D = dynamic(() => import("@/components/3d-scene").then((mod) => mod.Scene3D), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-background" />,
})

type Language = "fr" | "en" | "ln"

export default function Portfolio() {
  const [language, setLanguage] = useState<Language>("fr")
  const [activeSection, setActiveSection] = useState("about")
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const t = translations[language]
  const { scrollYProgress } = useScroll()
  const opacity = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

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
    <div className="min-h-screen bg-background text-foreground">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-accent z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* 3D Background */}
      <div className="fixed inset-0 z-0">
        <Scene3D />
      </div>

      {/* Main Layout */}
      <div className="relative z-10 mx-auto min-h-screen max-w-screen-xl px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-0">
        <div className="lg:flex lg:justify-between lg:gap-4">
          {/* Left Column - Fixed */}
          <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
            <div>
              {/* Theme & Language Controls */}
              <div className="flex items-center gap-2 mb-8">
                <div className="flex items-center gap-1 p-1 rounded-full bg-secondary/50 backdrop-blur-sm">
                  <button
                    onClick={() => setTheme("light")}
                    className={`p-2 rounded-full transition-colors ${theme === "light" ? "bg-accent text-white" : "hover:bg-secondary"}`}
                  >
                    <Sun className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setTheme("dark")}
                    className={`p-2 rounded-full transition-colors ${theme === "dark" ? "bg-accent text-white" : "hover:bg-secondary"}`}
                  >
                    <Moon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setTheme("system")}
                    className={`p-2 rounded-full transition-colors ${theme === "system" ? "bg-accent text-white" : "hover:bg-secondary"}`}
                  >
                    <Building2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex items-center gap-1 p-1 rounded-full bg-secondary/50 backdrop-blur-sm">
                  {(["fr", "en", "ln"] as Language[]).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setLanguage(lang)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${language === lang ? "bg-accent text-white" : "hover:bg-secondary"}`}
                    >
                      {lang.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Hero */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <p className="text-accent font-mono text-sm mb-2">{t.greeting}</p>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-foreground">{t.name}</h1>
                <h2 className="mt-3 text-lg font-medium tracking-tight sm:text-xl text-foreground/90">{t.role}</h2>
                <p className="mt-4 max-w-xs leading-normal text-muted-foreground">{t.tagline}</p>
              </motion.div>

              {/* Navigation */}
              <nav className="nav hidden lg:block mt-16" aria-label="In-page jump links">
                <ul className="w-max">
                  {Object.entries(t.nav).map(([key, value]) => (
                    <li key={key}>
                      <a
                        href={`#${key}`}
                        className={`group flex items-center py-3 transition-all ${activeSection === key ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                      >
                        <span
                          className={`mr-4 h-px transition-all ${activeSection === key ? "w-16 bg-foreground" : "w-8 bg-muted-foreground group-hover:w-16 group-hover:bg-foreground"}`}
                        />
                        <span className="text-xs font-bold uppercase tracking-widest">{value}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Social Links & Download */}
            <div className="mt-8 lg:mt-0">
              <div className="flex items-center gap-4 mb-6">
                <a
                  href="https://github.com/felicienmukamba"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/felicien-mukamba-5b49ab252/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="https://x.com/felicienmukamb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="mailto:felicienmukamba.cd@gmail.com"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>

              <PDFDownloadButton language={language} label={t.downloadCV} />
            </div>
          </header>

          {/* Right Column - Scrollable */}
          <main className="pt-24 lg:w-1/2 lg:py-24">
            {/* About Section */}
            <section id="about" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-sm font-bold uppercase tracking-widest text-accent mb-8 lg:hidden">
                  {t.about.title}
                </h2>

                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">{t.about.p1}</p>
                  <p className="text-muted-foreground leading-relaxed">{t.about.p2}</p>
                  <p className="text-muted-foreground leading-relaxed">{t.about.p3}</p>
                </div>

                {/* Highlighted Companies */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {t.about.highlightedCompanies.map((company) => (
                    <motion.div
                      key={company}
                      className="text-xs font-medium uppercase tracking-widest bg-accent text-white p-1 rounded-full"
                      whileHover={{ scale: 1.1 }}
                    >
                      {company}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </section>

            {/* Experience Section */}
            <section id="experience" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-sm font-bold uppercase tracking-widest text-accent mb-8 lg:hidden">
                  {t.experience.title}
                </h2>

                <div className="space-y-12">
                  {t.experience.items.map((exp, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4"
                    >
                      <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition-all lg:block lg:group-hover:bg-secondary/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg" />

                      <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground sm:col-span-2">
                        {exp.period}
                      </header>

                      <div className="z-10 sm:col-span-6">
                        <h3 className="font-medium leading-snug">
                          <a
                            href={exp.companyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/link inline-flex items-baseline text-base font-medium leading-tight hover:text-accent focus-visible:text-accent text-foreground"
                          >
                            <span>
                              {exp.title} ·{" "}
                              <span className="inline-block">
                                {exp.company}
                                <motion.span className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 ml-1">
                                  <ArrowUpRight />
                                </motion.span>
                              </span>
                            </span>
                          </a>
                        </h3>
                        <p className="text-xs text-muted-foreground mt-1">{exp.location}</p>

                        <p className="mt-2 text-sm leading-normal text-muted-foreground">{exp.description}</p>

                        {exp.achievements && (
                          <ul className="mt-3 space-y-1">
                            {exp.achievements.map((achievement, i) => (
                              <motion.li
                                key={i}
                                className="text-sm text-muted-foreground flex items-start gap-2"
                                whileHover={{ scale: 1.1 }}
                              >
                                <span className="text-accent mt-1.5 text-xs">▹</span>
                                {achievement}
                              </motion.li>
                            ))}
                          </ul>
                        )}

                        <div className="mt-4 flex flex-wrap gap-2">
                          {exp.technologies.map((tech) => (
                            <motion.div
                              key={tech}
                              className="text-xs font-medium uppercase tracking-widest bg-accent text-white p-1 rounded-full"
                              whileHover={{ scale: 1.1 }}
                            >
                              {tech}
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-sm font-bold uppercase tracking-widest text-accent mb-8 lg:hidden">
                  {t.projects.title}
                </h2>

                <div className="space-y-12">
                  {t.projects.items.map((project, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="group relative"
                    >
                      <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition-all lg:block lg:group-hover:bg-secondary/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg" />

                      <div className="relative z-10 grid gap-4 sm:grid-cols-8 sm:gap-8 md:gap-4">
                        <div className="sm:col-span-3 sm:order-1 order-2">
                          <div className="relative aspect-video rounded-md overflow-hidden border border-border/50 bg-secondary/30">
                            <motion.img
                              src={project.image || "/placeholder.svg"}
                              alt={project.title}
                              className="object-cover transition-all duration-300 group-hover:scale-105"
                              whileHover={{ scale: 1.05 }}
                            />
                            {project.featured && (
                              <div className="absolute top-2 left-2">
                                <motion.div
                                  className="bg-accent text-white text-xs font-medium uppercase tracking-widest p-1 rounded-full"
                                  whileHover={{ scale: 1.1 }}
                                >
                                  Featured
                                </motion.div>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="sm:col-span-5 sm:order-2 order-1">
                          <h3 className="font-medium leading-snug">
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group/link inline-flex items-baseline text-base font-medium leading-tight hover:text-accent focus-visible:text-accent text-foreground"
                            >
                              <span>
                                {project.title}
                                {project.link !== "#" && (
                                  <motion.span
                                    className="h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 ml-2"
                                    whileHover={{ scale: 1.1 }}
                                  >
                                    <ExternalLink />
                                  </motion.span>
                                )}
                              </span>
                            </a>
                          </h3>

                          <p className="mt-2 text-sm leading-normal text-muted-foreground">{project.description}</p>

                          {/* Stats */}
                          {project.featured && project.stats && (
                            <div className="mt-3 flex gap-4">
                              {Object.entries(project.stats).map(([key, value]) => (
                                <motion.div key={key} className="text-center" whileHover={{ scale: 1.1 }}>
                                  <p className="text-sm font-bold text-accent">{String(value)}</p>
                                  <p className="text-xs text-muted-foreground capitalize">{key}</p>
                                </motion.div>
                              ))}
                            </div>
                          )}

                          {/* Action Buttons */}
                          <div className="mt-3 flex flex-wrap gap-2">
                            {project.videoDemo && (
                              <a
                                href={project.videoDemo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-xs text-accent hover:underline"
                              >
                                <motion.span
                                  className="h-3 w-3 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                                  whileHover={{ scale: 1.1 }}
                                >
                                  <Play />
                                </motion.span>
                                {t.projects.watchDemo}
                              </a>
                            )}
                            {project.liveDemo && project.credentials && (
                              <motion.span className="text-xs text-muted-foreground" whileHover={{ scale: 1.1 }}>
                                {t.projects.testApp}: {project.credentials.email} / {project.credentials.password}
                              </motion.span>
                            )}
                          </div>

                          {/* Technologies */}
                          <div className="mt-4 flex flex-wrap gap-2">
                            {project.technologies.map((tech) => (
                              <motion.div
                                key={tech}
                                className="text-xs font-medium uppercase tracking-widest bg-accent text-white p-1 rounded-full"
                                whileHover={{ scale: 1.1 }}
                              >
                                {tech}
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="mt-12"
                >
                  <a
                    href="https://github.com/felicienmukamba"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center font-medium text-foreground hover:text-accent transition-colors"
                  >
                    {t.projects.viewAll}
                    <motion.span
                      className="ml-1 h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                      whileHover={{ scale: 1.1 }}
                    >
                      <ArrowUpRight />
                    </motion.span>
                  </a>
                </motion.div>
              </motion.div>
            </section>

            {/* Education Section */}
            <section id="education" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-sm font-bold uppercase tracking-widest text-accent mb-8 lg:hidden">
                  {t.education.title}
                </h2>

                {/* Academic Education */}
                <div className="space-y-8 mb-12">
                  {t.education.items.map((edu, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4"
                    >
                      <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition-all lg:block lg:group-hover:bg-secondary/50" />

                      <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground sm:col-span-2">
                        {edu.period}
                      </header>

                      <div className="z-10 sm:col-span-6">
                        <h3 className="font-medium leading-snug flex items-center gap-2 text-foreground">
                          <motion.span
                            className="h-4 w-4 text-accent transition-transform group-hover:scale-1.1"
                            whileHover={{ scale: 1.1 }}
                          >
                            <GraduationCap />
                          </motion.span>
                          {edu.degree}
                        </h3>
                        <p className="text-sm text-accent mt-1">{edu.school}</p>
                        <p className="mt-2 text-sm text-muted-foreground">{edu.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Certifications */}
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-foreground mb-6 flex items-center gap-2">
                    <motion.span
                      className="h-4 w-4 text-accent transition-transform group-hover:scale-1.1"
                      whileHover={{ scale: 1.1 }}
                    >
                      <Award />
                    </motion.span>
                    {t.education.certifications.title}
                  </h3>
                  <div className="space-y-4">
                    {t.education.certifications.items.map((cert, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30 border border-border/50"
                      >
                        <motion.div
                          className="h-2 w-2 rounded-full bg-accent mt-2 transition-transform group-hover:scale-1.1"
                          whileHover={{ scale: 1.1 }}
                        ></motion.div>
                        <div>
                          <p className="font-medium text-sm text-foreground">{cert.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {cert.provider} · {cert.year}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </section>

            {/* Skills Section */}
            <section className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-sm font-bold uppercase tracking-widest text-accent mb-8">{t.skills.title}</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {t.skills.categories.map((category, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 rounded-lg bg-secondary/30 border border-border/50"
                    >
                      <h3 className="font-medium text-sm text-foreground mb-3">{category.name}</h3>
                      <div className="flex flex-wrap gap-2">
                        {category.items.map((skill) => (
                          <motion.div
                            key={skill}
                            className="text-xs font-medium uppercase tracking-widest bg-accent text-white p-1 rounded-full"
                            whileHover={{ scale: 1.1 }}
                          >
                            {skill}
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </section>

            {/* References Section */}
            <section className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-sm font-bold uppercase tracking-widest text-accent mb-8 flex items-center gap-2">
                  <motion.span
                    className="h-4 w-4 text-accent transition-transform group-hover:scale-1.1"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Users />
                  </motion.span>
                  {t.references.title}
                </h2>

                <div className="grid gap-4">
                  {t.references.items.map((ref, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 rounded-lg bg-secondary/30 border border-border/50"
                    >
                      <h3 className="font-medium text-foreground">{ref.name}</h3>
                      <p className="text-sm text-accent">{ref.role}</p>
                      <p className="text-xs text-muted-foreground">{ref.company}</p>
                      <div className="mt-2 flex flex-wrap gap-3 text-xs text-muted-foreground">
                        <a href={`mailto:${ref.email}`} className="hover:text-accent transition-colors">
                          {ref.email}
                        </a>
                        <span>{ref.phone}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="mb-16 scroll-mt-16 md:mb-24 lg:scroll-mt-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-sm font-bold uppercase tracking-widest text-accent mb-8 lg:hidden">
                  {t.contact.title}
                </h2>

                <div className="p-6 rounded-lg bg-secondary/30 border border-border/50">
                  <h3 className="text-xl font-bold text-foreground mb-2">{t.contact.subtitle}</h3>
                  <p className="text-muted-foreground mb-6">{t.contact.description}</p>

                  <div className="space-y-3">
                    <a
                      href={`mailto:${t.contact.email}`}
                      className="flex items-center gap-3 text-muted-foreground hover:text-accent transition-colors"
                    >
                      <motion.span
                        className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                        whileHover={{ scale: 1.1 }}
                      >
                        <Mail />
                      </motion.span>
                      {t.contact.email}
                    </a>
                    <a
                      href={`tel:${t.contact.phone}`}
                      className="flex items-center gap-3 text-muted-foreground hover:text-accent transition-colors"
                    >
                      <motion.span
                        className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                        whileHover={{ scale: 1.1 }}
                      >
                        <Phone />
                      </motion.span>
                      {t.contact.phone}
                    </a>
                    <div className="flex items-start gap-3 text-muted-foreground">
                      <motion.span
                        className="h-4 w-4 mt-0.5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                        whileHover={{ scale: 1.1 }}
                      >
                        <MapPin />
                      </motion.span>
                      {t.contact.location}
                    </div>
                  </div>

                  <Button className="mt-6 gap-2 bg-accent hover:bg-accent/90 text-white" asChild>
                    <a href={`mailto:${t.contact.email}`}>
                      <motion.span
                        className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                        whileHover={{ scale: 1.1 }}
                      >
                        <Mail />
                      </motion.span>
                      {t.contact.cta}
                    </a>
                  </Button>
                </div>
              </motion.div>
            </section>

            {/* Footer */}
            <footer className="pb-16 text-sm text-muted-foreground">
              <p>
                {t.footer.designed} <span className="font-medium text-foreground">{t.name}</span>
              </p>
              <p className="mt-1">{t.footer.built}</p>
            </footer>
          </main>
        </div>
      </div>
    </div>
  )
}
