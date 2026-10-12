export type ReferenceCategory = "all" | "tech" | "ngo" | "academic" | "gov"

export type ReferencePerson = {
  id: string
  name: string
  role: string
  organization: string
  location: string
  phones: string[]
  emails?: string[]
  category: "tech" | "ngo" | "academic" | "gov"
  categoryLabel: string
  relationship: string
  /** One-line summary formatted for CVs / letters of recommendation */
  cvLine: string
  cvContact: string
  tags: string[]
}

export type TrainingRecord = {
  id: string
  title: string
  provider: string
  partner?: string
  date: string
  location: string
  category: "humanitarian" | "management" | "data" | "tech"
  categoryLabel: string
  description: string
  modules: string[]
  tools: string[]
  url?: string
  highlight?: boolean
}

export const PORTAL_REFERENCES: ReferencePerson[] = [
  {
    id: "ref-muhindo",
    name: "MUHINDO Dieudonné",
    role: "Manager",
    organization: "Aumsoft Technologie Bukavu",
    location: "Bukavu, Sud-Kivu, RDC",
    phones: ["+250 787 405 542", "+243 895 490 957"],
    emails: ["bkvcd@aumsoft.co.za"],
    category: "tech",
    categoryLabel: "Entreprise & Tech",
    relationship: "Manager direct chez Aumsoft Technology — supervision des plateformes HMS Elite, Maago, UMS, Silikivu.",
    cvLine: "MUHINDO Dieudonné — Manager, Aumsoft Technologie Bukavu (+250 787 405 542 / +243 895 490 957 · bkvcd@aumsoft.co.za)",
    cvContact: "+250 787 405 542 / +243 895 490 957 · bkvcd@aumsoft.co.za",
    tags: ["Aumsoft", "Ingénierie logicielle", "SaaS", "Management technique"],
  },
  {
    id: "ref-bivunga",
    name: "Bivunga Missy",
    role: "Coordinateur",
    organization: "GEVAPOM ASBL",
    location: "Bukavu, Sud-Kivu, RDC",
    phones: ["+243 997 758 001"],
    emails: ["bivungamissy@gmail.com"],
    category: "ngo",
    categoryLabel: "ONG & Humanitaire",
    relationship: "Coordinateur au GEVAPOM ASBL — encadrement du projet de digitalisation de 8 écoles et formation de 50+ enseignants (Data Manager).",
    cvLine: "Bivunga Missy — Coordinateur, GEVAPOM ASBL Bukavu (+243 997 758 001 · bivungamissy@gmail.com)",
    cvContact: "+243 997 758 001 · bivungamissy@gmail.com",
    tags: ["GEVAPOM", "Éducation", "Data Management", "Digitalisation scolaire"],
  },
  {
    id: "ref-ibucwa",
    name: "Papa Ibucwa Jean-Pierre",
    role: "Coordinateur TRAFFED & A Rocha RDC · Community Manager & Analyste de données",
    organization: "TRAFFED RDC & A Rocha RDC",
    location: "Sud-Kivu, RDC",
    phones: ["+243 992 959 897"],
    category: "ngo",
    categoryLabel: "ONG & Humanitaire",
    relationship: "Coordinateur chez TRAFFED RDC et A Rocha RDC — expert Community Management, communication stratégique et analyse de données de projet.",
    cvLine: "Papa Ibucwa Jean-Pierre — Coordinateur TRAFFED & A Rocha RDC, Analyste de données (+243 992 959 897)",
    cvContact: "+243 992 959 897",
    tags: ["TRAFFED", "A Rocha", "Conservation", "Analyse de données", "Communication"],
  },
  {
    id: "ref-mbilizi",
    name: "Professeur Mbilizi Dembi",
    role: "Chef du département de l’informatique",
    organization: "Institut Supérieur Pédagogique de Bukavu (ISP/Bukavu)",
    location: "Bukavu, Sud-Kivu, RDC",
    phones: ["+243 994 405 683"],
    emails: ["mbilizidembi@gmail.com"],
    category: "academic",
    categoryLabel: "Enseignement Supérieur",
    relationship: "Chef du département d'Informatique de Gestion à l'ISP/Bukavu — référent académique durant le Graduat (G1–G3) et la Licence (L1–L2).",
    cvLine: "Professeur Mbilizi Dembi — Chef du département de l'informatique, ISP/Bukavu (+243 994 405 683 · mbilizidembi@gmail.com)",
    cvContact: "+243 994 405 683 · mbilizidembi@gmail.com",
    tags: ["ISP Bukavu", "Informatique de gestion", "Académique", "Algorithmique & BDD"],
  },
  {
    id: "ref-raymond",
    name: "Raymond Kubali",
    role: "Secrétaire informaticien",
    organization: "Mairie de Kamituga",
    location: "Kamituga, Sud-Kivu, RDC",
    phones: ["+243 975 959 796"],
    category: "gov",
    categoryLabel: "Administration Publique",
    relationship: "Secrétaire informaticien à la Mairie de Kamituga — référence institutionnelle territoriale et administrative locale.",
    cvLine: "Raymond Kubali — Secrétaire informaticien, Mairie de Kamituga (+243 975 959 796)",
    cvContact: "+243 975 959 796",
    tags: ["Kamituga", "Administration", "Services publics", "Secrétariat informatique"],
  },
  {
    id: "ref-dede",
    name: "Dédé",
    role: "Informaticien",
    organization: "DGDA Bukavu (Direction Générale des Douanes et Accises)",
    location: "Bukavu, Sud-Kivu, RDC",
    phones: ["+243 997 217 858"],
    category: "gov",
    categoryLabel: "Administration Publique",
    relationship: "Informaticien à la Direction Générale des Douanes et Accises (DGDA) Bukavu — référence en systèmes d'information étatiques et douaniers.",
    cvLine: "Dédé — Informaticien, DGDA Bukavu (+243 997 217 858)",
    cvContact: "+243 997 217 858",
    tags: ["DGDA", "Douanes", "Administration publique", "Systèmes d'information"],
  },
  {
    id: "ref-lukungukilwa",
    name: "Lukungukilwa Kyambo",
    role: "Préfet des études",
    organization: "Institut Tuungane de Kele",
    location: "Kamituga, Sud-Kivu, RDC",
    phones: ["+243 997 734 134"],
    category: "academic",
    categoryLabel: "Éducation & Direction",
    relationship: "Préfet de l'Institut Tuungane de Kele — établissement secondaire d'excellence où Félicien a obtenu son Diplôme d'État.",
    cvLine: "Lukungukilwa Kyambo — Préfet, Institut Tuungane de Kele (+243 997 734 134)",
    cvContact: "+243 997 734 134",
    tags: ["Institut Kele", "Kamituga", "Direction scolaire", "Diplôme d'État"],
  },
]

export const PORTAL_TRAININGS: TrainingRecord[] = [
  {
    id: "erm-ocha-reach-2026",
    title: "Formation au nouveau package ERM (Évaluation Rapide Multisectorielle)",
    provider: "OCHA (Nations Unies)",
    partner: "REACH Initiative / IMPACT Initiatives",
    date: "04 — 06 août 2026",
    location: "Hôtel Horizon, Bukavu, Sud-Kivu, RDC",
    category: "humanitarian",
    categoryLabel: "Humanitaire & MEAL",
    description:
      "Session intensive de 3 jours consacrée à la maîtrise opérationnelle du nouveau package d'Évaluation Rapide Multisectorielle (ERM) pour les acteurs humanitaires du Sud-Kivu.",
    modules: [
      "Compréhension & Outils : Analyse approfondie du contexte humanitaire, révision des outils méthodologiques ERM, appropriation complète de l'outil Ehtools et prise en main du nouveau package d'évaluation rapide.",
      "Transversalité & Inclusion : Intégration systématique et renforcée des indicateurs PSEA (Protection contre l'exploitation et les abus sexuels), de l'AAP (Redevabilité envers les populations affectées & Engagement communautaire), ainsi que des dimensions Genre et Handicap.",
      "Pratique de terrain & Analyse : Maîtrise avancée des techniques d'échantillonnage statistique, conduite d'enquêtes de terrain, simulation pratique et utilisation avancée des outils d'analyse et de rapportage pour produire des données fiables, structurées et rapides.",
    ],
    tools: ["Ehtools", "ERM Package", "KoboToolbox", "PSEA Indicators", "AAP / Community Engagement", "Échantillonnage statistique"],
    url: "https://lnkd.in/p/d_rngw3m",
    highlight: true,
  },
  {
    id: "openclassrooms-pm-2024",
    title: "Gestion de projet — Agile, UML, GitHub, Merise",
    provider: "OpenClassrooms",
    date: "2024",
    location: "En ligne",
    category: "management",
    categoryLabel: "Gestion de projet & Méthodes",
    description: "Cadrage, planification et pilotage de projets logiciels avec méthodes agiles (Scrum, Kanban), modélisation Merise et UML, CI/CD et gestion collaborative Git/GitHub.",
    modules: [
      "Gestion de projet agile & rituels Scrum",
      "Conception et modélisation des bases de données avec Merise (MCD, MLD, MPD)",
      "Diagrammes d'architecture et de cas d'usage UML",
      "Collaboration et intégration continue avec GitHub",
    ],
    tools: ["Scrum", "UML", "Merise", "GitHub", "Jira"],
  },
  {
    id: "gdsc-lead-2023",
    title: "Leadership & Community Management Tech",
    provider: "Google Developer Student Clubs",
    date: "2023",
    location: "Bukavu, RDC",
    category: "management",
    categoryLabel: "Leadership & Événementiel",
    description: "Coordination et mobilisation de la communauté tech du Kivu. Organisation générale du DevFest KIVU 2023 (plus de 200 développeurs, 20+ sessions techniques et ateliers).",
    modules: [
      "Mobilisation communautaire et partenariats technologiques",
      "Organisation d'événements à grande échelle (DevFest)",
      "Mentorat et animation d'ateliers de développement",
    ],
    tools: ["Community Building", "Public Speaking", "Event Management", "Google Cloud"],
  },
  {
    id: "coursera-data-uiux-2023",
    title: "Analyse de données & Design d'interfaces UI/UX",
    provider: "Coursera",
    date: "2023",
    location: "En ligne",
    category: "data",
    categoryLabel: "Data Science & UI/UX",
    description: "Collecte, nettoyage et visualisation de données avec Python et SQL, couplés aux principes ergonomiques de conception d'interfaces centrées sur l'utilisateur.",
    modules: [
      "Exploration et visualisation de données tabulaires",
      "Conception de dashboards interactifs",
      "Ergonomie, accessibilité WCAG et prototypage d'interfaces",
    ],
    tools: ["Python", "Pandas", "SQL", "Figma", "UI/UX Design"],
  },
  {
    id: "unicef-peace-2023",
    title: "Jeune Ambassadeur de la Paix — Consolidation de la paix, médiation & plaidoyer",
    provider: "UNICEF",
    date: "2023",
    location: "Bukavu / Sud-Kivu, RDC",
    category: "humanitarian",
    categoryLabel: "Consolidation de la Paix & Plaidoyer",
    description: "Certification honorifique et opérationnelle d'ambassadeur de la paix : animation du dialogue communautaire, médiation des conflits, sensibilisation citoyenne et engagement des jeunes.",
    modules: [
      "Facilitation du dialogue communautaire et médiation locale",
      "Techniques de plaidoyer et communication d'influence",
      "Mobilisation des jeunes et promotion de la cohésion sociale",
    ],
    tools: ["Médiation", "Dialogue communautaire", "Plaidoyer citoyen", "Engagement des jeunes"],
  },
  {
    id: "openclassrooms-dev-2022",
    title: "Développement d'applications — Angular, React, JavaScript, Python, Django",
    provider: "OpenClassrooms",
    date: "2022",
    location: "En ligne",
    category: "tech",
    categoryLabel: "Développement Web & Logiciel",
    description: "Architecture front-end moderne (Angular, React) et back-end RESTful (Python/Django) avec persistance relationnelle.",
    modules: [
      "Applications Single Page (SPA) avec Angular et React",
      "Développement d'API REST sécurisées avec Django",
      "Gestion d'état et optimisation des performances",
    ],
    tools: ["Angular", "React", "Python", "Django", "JavaScript", "PostgreSQL"],
  },
]
