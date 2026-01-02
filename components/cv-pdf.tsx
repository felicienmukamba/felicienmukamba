"use client"

import { Document, Page, Text, View, StyleSheet, Link } from "@react-pdf/renderer"

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: "Helvetica",
    backgroundColor: "#ffffff",
    color: "#1a1a2e",
  },
  header: {
    marginBottom: 25,
    paddingBottom: 20,
    borderBottom: "2pt solid #0f172a",
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 4,
    letterSpacing: 1,
  },
  title: {
    fontSize: 12,
    color: "#475569",
    marginBottom: 12,
    fontWeight: "normal",
  },
  contactRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 20,
    fontSize: 9,
    color: "#64748b",
    marginTop: 8,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    marginTop: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 12,
    textTransform: "uppercase",
    letterSpacing: 2,
    borderBottom: "1pt solid #e2e8f0",
    paddingBottom: 6,
  },
  experienceItem: {
    marginBottom: 16,
    paddingLeft: 12,
    borderLeft: "2pt solid #3b82f6",
  },
  jobTitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#1e293b",
  },
  company: {
    fontSize: 10,
    color: "#3b82f6",
    marginTop: 2,
  },
  period: {
    fontSize: 9,
    color: "#94a3b8",
    marginTop: 2,
    marginBottom: 6,
  },
  description: {
    fontSize: 9,
    color: "#475569",
    lineHeight: 1.6,
  },
  achievementsList: {
    marginTop: 6,
    paddingLeft: 10,
  },
  achievementItem: {
    fontSize: 9,
    color: "#475569",
    marginBottom: 3,
    lineHeight: 1.5,
  },
  skillsSection: {
    marginTop: 20,
  },
  skillsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 8,
  },
  skillCategory: {
    marginBottom: 12,
  },
  skillCategoryTitle: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#334155",
    marginBottom: 6,
  },
  skillBadge: {
    backgroundColor: "#f1f5f9",
    color: "#334155",
    padding: "4pt 10pt",
    borderRadius: 12,
    fontSize: 8,
    marginRight: 4,
    marginBottom: 4,
  },
  projectItem: {
    marginBottom: 14,
    paddingLeft: 12,
    borderLeft: "2pt solid #10b981",
  },
  projectTitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#1e293b",
  },
  projectDescription: {
    fontSize: 9,
    color: "#475569",
    marginTop: 4,
    lineHeight: 1.5,
  },
  techStack: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
    marginTop: 6,
  },
  techBadge: {
    backgroundColor: "#ecfdf5",
    color: "#059669",
    padding: "2pt 6pt",
    borderRadius: 8,
    fontSize: 7,
  },
  educationItem: {
    marginBottom: 12,
  },
  degree: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#1e293b",
  },
  school: {
    fontSize: 10,
    color: "#3b82f6",
    marginTop: 2,
  },
  twoColumn: {
    flexDirection: "row",
    gap: 30,
  },
  leftColumn: {
    width: "65%",
  },
  rightColumn: {
    width: "35%",
  },
  link: {
    color: "#3b82f6",
    textDecoration: "none",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: "center",
    fontSize: 8,
    color: "#94a3b8",
    borderTop: "1pt solid #e2e8f0",
    paddingTop: 10,
  },
})

interface CVPDFProps {
  language: "fr" | "en" | "ln"
}

export function CVPDF({ language }: CVPDFProps) {
  const content = {
    fr: {
      name: "FÉLICIEN MUKAMBA",
      subtitle: "Kazindja",
      title: "Ingénieur Logiciel Full-Stack",
      contact: {
        email: "felicienmukamba.cd@gmail.com",
        phone: "+243 995 209 133",
        location: "Bukavu, RDC",
        github: "github.com/felicienmukamba",
        linkedin: "linkedin.com/in/felicien-mukamba",
      },
      profile: {
        title: "Profil",
        text: "Développeur Full-Stack (Bac+5) spécialisé dans la conception d'architectures logicielles sécurisées pour le secteur public. Expert Java/Spring Boot et frameworks modernes (Next.js, React). Créateur du PGCC, solution d'identité numérique intégrant biométrie et chiffrement AES-256. Passionné par la souveraineté numérique africaine.",
      },
      experience: {
        title: "Expériences",
        items: [
          {
            title: "Informaticien & Chef de Projets",
            company: "GEVAPOM ASBL",
            period: "Janvier 2024 - Présent",
            description:
              "Direction de la transformation numérique de 8 établissements scolaires. Conception et déploiement de systèmes de gestion intégrés.",
            achievements: [
              "Réduction de 60% du temps administratif",
              "Digitalisation complète des processus éducatifs",
              "Formation de 50+ enseignants aux outils numériques",
              "Gestion de budgets et planification stratégique",
            ],
          },
          {
            title: "GDSC Lead",
            company: "Google Developer Student Clubs - ISP Bukavu",
            period: "Septembre 2023 - Juin 2024",
            description:
              "Leadership de la plus grande communauté tech de l'Est du Congo. Organisation d'événements majeurs et formations.",
            achievements: [
              "Organisation DevFest KIVU 2023 (200+ participants)",
              "Animation de 20+ ateliers de développement",
              "Création d'une communauté de 300+ développeurs",
              "Mentorat de 50+ étudiants en programmation",
            ],
          },
          {
            title: "Développeur Full-Stack Freelance",
            company: "Projets Indépendants",
            period: "2023",
            description: "Développement de solutions sur mesure pour clients locaux et internationaux.",
            achievements: [
              "5+ projets livrés avec succès",
              "Applications utilisées par 1000+ utilisateurs",
              "Satisfaction client à 100%",
            ],
          },
        ],
      },
      skills: {
        title: "Compétences",
        categories: [
          { name: "Frontend", items: ["React", "Next.js 14", "Angular", "TypeScript", "Tailwind CSS"] },
          { name: "Backend", items: ["Spring Boot", "Django", "Node.js", "Python", "Java"] },
          { name: "Mobile", items: ["Flutter", "Dart", "React Native"] },
          { name: "Base de données", items: ["PostgreSQL", "MongoDB", "Firebase", "MySQL"] },
          { name: "DevOps & Cloud", items: ["Docker", "Git", "AWS", "Vercel", "Linux"] },
          { name: "Sécurité", items: ["Biométrie", "AES-256", "OAuth 2.0", "JWT"] },
        ],
      },
      projects: {
        title: "Projets Phares",
        items: [
          {
            name: "PGCC - Portail des Citoyens Congolais",
            description:
              "Plateforme nationale d'identité numérique avec biométrie, chiffrement AES-256 et architecture microservices.",
            tech: ["Spring Boot", "Next.js", "PostgreSQL", "Biometrics"],
          },
          {
            name: "DRC School",
            description: "Système complet de gestion scolaire: suivi élèves, notes, communication parents-enseignants.",
            tech: ["Django", "Python", "PostgreSQL", "Bootstrap"],
          },
          {
            name: "Citizen Management",
            description: "Application Angular de gestion citoyenne avec recherche avancée et tableaux de bord.",
            tech: ["Angular", "TypeScript", "RxJS", "Material UI"],
          },
        ],
      },
      education: {
        title: "Formation",
        items: [
          {
            degree: "Licence en Informatique de Gestion",
            school: "Institut Supérieur Pédagogique de Bukavu (ISP)",
            period: "2020 - 2025",
          },
        ],
      },
      certifications: {
        title: "Certifications",
        items: [
          "Google Developer Student Clubs Lead 2023-2024",
          "DevFest KIVU 2023 Organizer",
          "Google Cloud Fundamentals",
        ],
      },
      languages: {
        title: "Langues",
        items: ["Français (Natif)", "Anglais (Professionnel)", "Swahili (Natif)", "Lingala (Courant)"],
      },
    },
    en: {
      name: "FÉLICIEN MUKAMBA",
      subtitle: "Kazindja",
      title: "Full-Stack Software Engineer",
      contact: {
        email: "felicienmukamba.cd@gmail.com",
        phone: "+243 995 209 133",
        location: "Bukavu, DRC",
        github: "github.com/felicienmukamba",
        linkedin: "linkedin.com/in/felicien-mukamba",
      },
      profile: {
        title: "Profile",
        text: "Full-Stack Developer (Bachelor's degree) specialized in designing secure software architectures for the public sector. Expert in Java/Spring Boot and modern frameworks (Next.js, React). Creator of PGCC, a digital identity solution integrating biometrics and AES-256 encryption. Passionate about African digital sovereignty.",
      },
      experience: {
        title: "Experience",
        items: [
          {
            title: "IT Specialist & Project Manager",
            company: "GEVAPOM ASBL",
            period: "January 2024 - Present",
            description:
              "Leading digital transformation of 8 educational institutions. Designing and deploying integrated management systems.",
            achievements: [
              "60% reduction in administrative time",
              "Complete digitalization of educational processes",
              "Training of 50+ teachers on digital tools",
              "Budget management and strategic planning",
            ],
          },
          {
            title: "GDSC Lead",
            company: "Google Developer Student Clubs - ISP Bukavu",
            period: "September 2023 - June 2024",
            description:
              "Leading the largest tech community in Eastern Congo. Organizing major events and training sessions.",
            achievements: [
              "Organized DevFest KIVU 2023 (200+ attendees)",
              "Facilitated 20+ development workshops",
              "Built a community of 300+ developers",
              "Mentored 50+ students in programming",
            ],
          },
          {
            title: "Freelance Full-Stack Developer",
            company: "Independent Projects",
            period: "2023",
            description: "Developing custom solutions for local and international clients.",
            achievements: [
              "5+ projects successfully delivered",
              "Applications used by 1000+ users",
              "100% client satisfaction",
            ],
          },
        ],
      },
      skills: {
        title: "Skills",
        categories: [
          { name: "Frontend", items: ["React", "Next.js 14", "Angular", "TypeScript", "Tailwind CSS"] },
          { name: "Backend", items: ["Spring Boot", "Django", "Node.js", "Python", "Java"] },
          { name: "Mobile", items: ["Flutter", "Dart", "React Native"] },
          { name: "Database", items: ["PostgreSQL", "MongoDB", "Firebase", "MySQL"] },
          { name: "DevOps & Cloud", items: ["Docker", "Git", "AWS", "Vercel", "Linux"] },
          { name: "Security", items: ["Biometrics", "AES-256", "OAuth 2.0", "JWT"] },
        ],
      },
      projects: {
        title: "Featured Projects",
        items: [
          {
            name: "PGCC - Congolese Citizens Portal",
            description:
              "National digital identity platform with biometrics, AES-256 encryption and microservices architecture.",
            tech: ["Spring Boot", "Next.js", "PostgreSQL", "Biometrics"],
          },
          {
            name: "DRC School",
            description: "Complete school management system: student tracking, grades, parent-teacher communication.",
            tech: ["Django", "Python", "PostgreSQL", "Bootstrap"],
          },
          {
            name: "Citizen Management",
            description: "Angular application for citizen data management with advanced search and dashboards.",
            tech: ["Angular", "TypeScript", "RxJS", "Material UI"],
          },
        ],
      },
      education: {
        title: "Education",
        items: [
          {
            degree: "Bachelor's in Computer Management",
            school: "Institut Supérieur Pédagogique de Bukavu (ISP)",
            period: "2020 - 2025",
          },
        ],
      },
      certifications: {
        title: "Certifications",
        items: [
          "Google Developer Student Clubs Lead 2023-2024",
          "DevFest KIVU 2023 Organizer",
          "Google Cloud Fundamentals",
        ],
      },
      languages: {
        title: "Languages",
        items: ["French (Native)", "English (Professional)", "Swahili (Native)", "Lingala (Fluent)"],
      },
    },
    ln: {
      name: "FÉLICIEN MUKAMBA",
      subtitle: "Kazindja",
      title: "Ingénieur ya Logiciel Full-Stack",
      contact: {
        email: "felicienmukamba.cd@gmail.com",
        phone: "+243 995 209 133",
        location: "Bukavu, RDC",
        github: "github.com/felicienmukamba",
        linkedin: "linkedin.com/in/felicien-mukamba",
      },
      profile: {
        title: "Profile",
        text: "Développeur Full-Stack (Bac+5) na mayele mingi ya kosala ba architectures ya logiciel oyo ebatelami mpo na secteur public. Expert ya Java/Spring Boot mpe ba frameworks ya sika. Mosali ya PGCC, solution ya identité numérique na biométrie mpe chiffrement AES-256.",
      },
      experience: {
        title: "Misala",
        items: [
          {
            title: "Informaticien & Mokambi ya Projets",
            company: "GEVAPOM ASBL",
            period: "Janvier 2024 - Lelo",
            description: "Kokamba transformation numérique ya ba écoles 8. Kosala mpe kotia ba systèmes ya gestion.",
            achievements: [
              "Kokitisa 60% ya tango ya administration",
              "Digitalisation mobimba ya ba processus",
              "Formation ya ba enseignants 50+",
            ],
          },
          {
            title: "GDSC Lead",
            company: "Google Developer Student Clubs - ISP Bukavu",
            period: "Septembre 2023 - Juin 2024",
            description: "Kokamba communauté tech ya monene na Est ya Congo.",
            achievements: [
              "Organisation DevFest KIVU 2023 (batu 200+)",
              "Ba ateliers 20+ ya développement",
              "Communauté ya développeurs 300+",
            ],
          },
          {
            title: "Développeur Full-Stack Freelance",
            company: "Ba Projets Independant",
            period: "2023",
            description: "Kosala ba solutions mpo na ba clients.",
            achievements: ["Projets 5+ esili", "Ba applications oyo batu 1000+ bazali kosalela"],
          },
        ],
      },
      skills: {
        title: "Mayele",
        categories: [
          { name: "Frontend", items: ["React", "Next.js 14", "Angular", "TypeScript", "Tailwind CSS"] },
          { name: "Backend", items: ["Spring Boot", "Django", "Node.js", "Python", "Java"] },
          { name: "Mobile", items: ["Flutter", "Dart", "React Native"] },
          { name: "Base ya données", items: ["PostgreSQL", "MongoDB", "Firebase", "MySQL"] },
          { name: "DevOps & Cloud", items: ["Docker", "Git", "AWS", "Vercel", "Linux"] },
          { name: "Sécurité", items: ["Biométrie", "AES-256", "OAuth 2.0", "JWT"] },
        ],
      },
      projects: {
        title: "Ba Projets ya Minene",
        items: [
          {
            name: "PGCC - Portail ya Batu ya Congo",
            description: "Plateforme nationale ya identité numérique na biométrie mpe chiffrement AES-256.",
            tech: ["Spring Boot", "Next.js", "PostgreSQL", "Biometrics"],
          },
          {
            name: "DRC School",
            description: "Système complet ya gestion ya école.",
            tech: ["Django", "Python", "PostgreSQL", "Bootstrap"],
          },
          {
            name: "Citizen Management",
            description: "Application Angular ya gestion ya batu.",
            tech: ["Angular", "TypeScript", "RxJS", "Material UI"],
          },
        ],
      },
      education: {
        title: "Boyekoli",
        items: [
          {
            degree: "Licence na Informatique ya Gestion",
            school: "Institut Supérieur Pédagogique ya Bukavu (ISP)",
            period: "2020 - 2025",
          },
        ],
      },
      certifications: {
        title: "Ba Certifications",
        items: [
          "Google Developer Student Clubs Lead 2023-2024",
          "DevFest KIVU 2023 Organizer",
          "Google Cloud Fundamentals",
        ],
      },
      languages: {
        title: "Minoko",
        items: ["Français (Mama)", "Anglais (Mosala)", "Swahili (Mama)", "Lingala (Malamu)"],
      },
    },
  }

  const data = content[language]

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{data.name}</Text>
          <Text style={{ fontSize: 14, color: "#64748b", marginBottom: 4 }}>{data.subtitle}</Text>
          <Text style={styles.title}>{data.title}</Text>
          <View style={styles.contactRow}>
            <Text>{data.contact.email}</Text>
            <Text>|</Text>
            <Text>{data.contact.phone}</Text>
            <Text>|</Text>
            <Text>{data.contact.location}</Text>
          </View>
          <View style={[styles.contactRow, { marginTop: 4 }]}>
            <Link src={`https://${data.contact.github}`} style={styles.link}>
              <Text>{data.contact.github}</Text>
            </Link>
            <Text>|</Text>
            <Link src={`https://${data.contact.linkedin}`} style={styles.link}>
              <Text>{data.contact.linkedin}</Text>
            </Link>
          </View>
        </View>

        {/* Profile */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{data.profile.title}</Text>
          <Text style={styles.description}>{data.profile.text}</Text>
        </View>

        <View style={styles.twoColumn}>
          {/* Left Column */}
          <View style={styles.leftColumn}>
            {/* Experience */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{data.experience.title}</Text>
              {data.experience.items.map((exp, index) => (
                <View key={index} style={styles.experienceItem}>
                  <Text style={styles.jobTitle}>{exp.title}</Text>
                  <Text style={styles.company}>{exp.company}</Text>
                  <Text style={styles.period}>{exp.period}</Text>
                  <Text style={styles.description}>{exp.description}</Text>
                  <View style={styles.achievementsList}>
                    {exp.achievements.map((achievement, i) => (
                      <Text key={i} style={styles.achievementItem}>
                        • {achievement}
                      </Text>
                    ))}
                  </View>
                </View>
              ))}
            </View>

            {/* Projects */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{data.projects.title}</Text>
              {data.projects.items.map((project, index) => (
                <View key={index} style={styles.projectItem}>
                  <Text style={styles.projectTitle}>{project.name}</Text>
                  <Text style={styles.projectDescription}>{project.description}</Text>
                  <View style={styles.techStack}>
                    {project.tech.map((tech, i) => (
                      <Text key={i} style={styles.techBadge}>
                        {tech}
                      </Text>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Right Column */}
          <View style={styles.rightColumn}>
            {/* Skills */}
            <View style={styles.skillsSection}>
              <Text style={styles.sectionTitle}>{data.skills.title}</Text>
              {data.skills.categories.map((category, index) => (
                <View key={index} style={styles.skillCategory}>
                  <Text style={styles.skillCategoryTitle}>{category.name}</Text>
                  <View style={styles.skillsGrid}>
                    {category.items.map((skill, i) => (
                      <Text key={i} style={styles.skillBadge}>
                        {skill}
                      </Text>
                    ))}
                  </View>
                </View>
              ))}
            </View>

            {/* Education */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{data.education.title}</Text>
              {data.education.items.map((edu, index) => (
                <View key={index} style={styles.educationItem}>
                  <Text style={styles.degree}>{edu.degree}</Text>
                  <Text style={styles.school}>{edu.school}</Text>
                  <Text style={styles.period}>{edu.period}</Text>
                </View>
              ))}
            </View>

            {/* Certifications */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{data.certifications.title}</Text>
              {data.certifications.items.map((cert, index) => (
                <Text key={index} style={[styles.description, { marginBottom: 4 }]}>
                  • {cert}
                </Text>
              ))}
            </View>

            {/* Languages */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{data.languages.title}</Text>
              {data.languages.items.map((lang, index) => (
                <Text key={index} style={[styles.description, { marginBottom: 2 }]}>
                  • {lang}
                </Text>
              ))}
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>
            {data.contact.github} | {data.contact.linkedin}
          </Text>
        </View>
      </Page>
    </Document>
  )
}
