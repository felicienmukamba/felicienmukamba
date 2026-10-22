import { getDictionary } from "@/lib/dictionaries"
import { localeMeta, type Locale } from "@/lib/i18n"
import { site } from "@/lib/site"

const faqsByLang: Record<Locale, Array<{ question: string; answer: string }>> = {
  fr: [
    {
      question: "Quels services sont proposés par Félicien Mukamba et SOSIDE à Bukavu ?",
      answer:
        "Félicien Mukamba et SOSIDE proposent le diagnostic digital & IA en 60 à 120 minutes, l'automatisation express de processus métier (suppression des ressaisies manuelles sur Excel/WhatsApp), la conception de systèmes métiers et plateformes web sur mesure avec mode hors-ligne et Mobile Money (M-Pesa, Orange, Airtel), l'ingénierie d'agents IA et RAG sécurisé, des solutions sectorielles clés en main (PME, ONG, Écoles GEVAPOM, Cliniques HMS) ainsi que des contrats de maintenance avec SLA écrit.",
    },
    {
      question: "Les prix et tarifs sont-ils négociables ?",
      answer:
        "Oui, tous nos tarifs sont 100 % négociables et établis sur devis personnalisé. Nous n'appliquons aucune grille tarifaire rigide : chaque prestation est ajustée selon le périmètre exact de votre projet, la taille de votre organisation (PME locale, ONG financée, établissement d'enseignement, clinique de santé) et vos capacités de trésorerie.",
    },
    {
      question: "Travaillez-vous uniquement à Bukavu ou également partout en RDC et à distance ?",
      answer:
        "Bien qu'implantés à Bukavu (Sud-Kivu, RDC), nous intervenons sur l'ensemble du territoire de la République Démocratique du Congo (Goma, Kinshasa, Lubumbashi) ainsi qu'à distance pour des clients de l'espace francophone et à l'international.",
    },
    {
      question: "Comment vos logiciels fonctionnent-ils lors des coupures d'électricité ou d'internet en RDC ?",
      answer:
        "Nos applications critiques (notamment la caisse enregistreuse et gestion commerciale Maago) sont développées selon une architecture Offline-First. Elles continuent de fonctionner localement sans aucune connexion internet. Dès le retour du réseau, toutes les données sont automatiquement synchronisées sur le serveur sécurisé.",
    },
    {
      question: "Quelles sont les garanties en matière de sécurité et de confidentialité pour l'intelligence artificielle ?",
      answer:
        "Chaque assistant IA et agent autonome opère dans un périmètre strictement contrôlé avec des garde-fous rigoureux : chiffrement de bout en bout, cloisonnement absolu des bases documentaires internes (aucune fuite vers les modèles publics), journalisation complète des requêtes et validation humaine obligatoire pour les décisions sensibles.",
    },
  ],
  en: [
    {
      question: "What services are offered by Félicien Mukamba and SOSIDE in Bukavu?",
      answer:
        "Félicien Mukamba and SOSIDE provide 60-to-120 minute Digital & AI Diagnostic audits, express workflow automation eliminating repetitive manual entry across spreadsheets and WhatsApp, end-to-end custom web platforms with offline-first support and Mobile Money (M-Pesa, Orange Money, Airtel Money), production RAG and autonomous AI agents with safety guardrails, field-proven sectoral packages for SMEs, NGOs, schools, and healthcare clinics, and maintenance agreements with guaranteed SLAs.",
    },
    {
      question: "Are your prices and quotes negotiable?",
      answer:
        "Yes, all pricing is 100% negotiable and custom-quoted. We do not impose rigid price tables: every contract is tailored to your exact scope, organizational size (SME, humanitarian NGO, academic institution, healthcare facility), and cash flow schedule.",
    },
    {
      question: "Do you only operate in Bukavu or also across DR Congo and remotely?",
      answer:
        "While headquarters are based in Bukavu (South Kivu, DR Congo), we work throughout the entire Democratic Republic of Congo (Goma, Kinshasa, Lubumbashi) and remotely with international clients across the French- and English-speaking world.",
    },
    {
      question: "How do your applications handle power and internet outages in DR Congo?",
      answer:
        "Our mission-critical platforms (such as the Maago Point-of-Sale and commercial management system) are built offline-first. They continue recording transactions without active internet connectivity. Once connection is restored, all data automatically syncs with the secure cloud server.",
    },
    {
      question: "What safety and data privacy guarantees do you provide for AI deployments?",
      answer:
        "Every AI assistant and autonomous agent is deployed with rigorous enterprise guardrails: end-to-end encryption, strict sandboxing of private organizational files (no leakage into public foundation models), comprehensive audit logging, and mandatory human-in-the-loop approvals for sensitive operational steps.",
    },
  ],
  ln: [
    {
      question: "Misala nini Félicien Mukamba mpe SOSIDE basalaka na Bukavu ?",
      answer:
        "Félicien Mukamba mpe SOSIDE basalaka diagnostic digital & IA na miniti 60 tii 120, kobongisa misala na mbangu mpo na kolongola kosala misala na maboko, kotonga ba logiciels mpe ba sites web sur mesure oyo esalaka ata réseau ezali te (offline) elongo na Mobile Money (M-Pesa, Orange, Airtel), kotia ba agents IA na bokengi, ba solutions mpo na ba PME, ba ONG, ba kelasi mpe ba lopitalo, elongo na kobatela ba systèmes mikolo nionso.",
    },
    {
      question: "Talos ya misala ezali ya koyokana ?",
      answer:
        "Iyo, talos nionso ezali 100% ya koyokana na motindo ya budget na yo. Talo ya kofungama ezali te : tobongisaka mosala mpe talo na kotala bamposa na yo, monene ya structure na yo (PME, ONG, kelasi, lopitalo) mpe mbongo oyo ozali na yango.",
    },
    {
      question: "Bosalaka kaka na Bukavu to mpe na bisika nionso na RDC mpe na mosika ?",
      answer:
        "Ata toza na Bukavu (Sud-Kivu, RDC), tosalaka na bituka nionso ya République Démocratique du Congo (Goma, Kinshasa, Lubumbashi) mpe na mosika (à distance) mpo na ba clients ya mokili mobimba.",
    },
    {
      question: "Ndenge nini ba logiciels na bino esalaka soki kura to internet ekati na RDC ?",
      answer:
        "Ba logiciels na biso (na ndakisa caisse mpe boteki Maago) esalaka na méthode Offline-First. Okoki kokoba koteka ata internet ezali te. Tango réseau ekozonga, ba données nionso ekokende mbala moko na serveur na bokengi.",
    },
    {
      question: "Bokengi mpe sekele ya ba données ezali ndenge nini mpo na IA ?",
      answer:
        "Mosala nyonso ya IA ezali na mibeko ya bokengi makasi : mikanda na bino ekobima libanda te, ba données ezali na sekele mpe moto nde azali na bokonzi ya suka liboso ya kokata makambo ya ntina.",
    },
  ],
}

/**
 * Rich Schema.org graph for modern search engines and AI generative engines (GEO):
 * - Person (Félicien Mukamba)
 * - ProfessionalService / Organization (SOSIDE COMPANY SAS)
 * - Service Offers Catalog
 * - FAQPage with verified localized QA
 * - ProfilePage
 * - WebSite
 */
export function JsonLd({ lang }: { lang: Locale }) {
  const t = getDictionary(lang)
  const pageUrl = `${site.url}/${lang}`
  const personId = `${site.url}/#person`
  const orgId = `${site.url}/#soside`
  const websiteId = `${site.url}/#website`
  const faqId = `${pageUrl}#faq`

  const faqs = faqsByLang[lang] ?? faqsByLang.en

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: site.name,
        alternateName: site.fullName,
        givenName: "Félicien",
        familyName: "Mukamba",
        url: site.url,
        image: `${site.url}${site.avatar}`,
        email: `mailto:${site.email}`,
        telephone: site.phoneHref,
        jobTitle: [
          "Founder of SOSIDE COMPANY SAS",
          "Software Engineer",
          "AI Engineer",
          "Project Manager",
          "AI Agent Manager",
        ],
        description: t.meta.description,
        founderOf: { "@id": orgId },
        worksFor: [
          { "@id": orgId },
          { "@type": "Organization", name: "Aumsoft Technology", url: "https://aumsoft.net" },
        ],
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: "Institut Supérieur Pédagogique de Bukavu",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Bukavu",
            addressRegion: "Sud-Kivu",
            addressCountry: "CD",
          },
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: site.city,
          addressRegion: site.region,
          addressCountry: site.countryCode,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: site.coordinates.latitude,
          longitude: site.coordinates.longitude,
        },
        knowsLanguage: ["fr", "en", "sw", "ln"],
        knowsAbout: [
          "Software Engineering",
          "AI Engineering",
          "AI Agent Management",
          "Large Language Models (LLM)",
          "Retrieval-Augmented Generation (RAG)",
          "Distributed Systems",
          "Offline-First Systems Architecture",
          "Mobile Money Integrations (M-Pesa, Orange, Airtel)",
          "Spring Boot",
          "Next.js",
          "React",
          "PostgreSQL",
          "pgvector",
          "Docker",
          "Digital Identity & Public Key Infrastructure",
          "Healthcare Interoperability (HL7 / FHIR)",
        ],
        sameAs: Object.values(site.social),
      },
      {
        "@type": "ProfessionalService",
        "@id": orgId,
        name: "SOSIDE COMPANY SAS",
        alternateName: "SOSIDE",
        slogan: "Solution Side with AI",
        url: "https://soside.vercel.app/",
        logo: `${site.url}/icon.png`,
        image: `${site.url}/logo.png`,
        email: site.email,
        telephone: site.phoneHref,
        priceRange: "Tarifs négociables / Sur devis",
        founder: { "@id": personId },
        address: {
          "@type": "PostalAddress",
          addressLocality: site.city,
          addressRegion: "Sud-Kivu",
          addressCountry: site.countryCode,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: site.coordinates.latitude,
          longitude: site.coordinates.longitude,
        },
        areaServed: site.areasServed.map((area) => ({
          "@type": "AdministrativeArea",
          name: area,
        })),
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Services SOSIDE & Félicien Mukamba",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Diagnostic Digital & Audit IA",
                description:
                  "Cartographie complète des processus, repérage des goulets d'étranglement, chiffrage des gains et plan d'action opérationnel à 30 jours.",
                provider: { "@id": orgId },
                areaServed: "République démocratique du Congo",
              },
              priceSpecification: {
                "@type": "PriceSpecification",
                description: "Sur devis · Prix négociable selon la taille de la structure",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Automatisation Express de Workflows (Ops)",
                description:
                  "Suppression des ressaisies manuelles répétitives, génération de rapports automatisés et alertes WhatsApp en 7 à 10 jours.",
                provider: { "@id": orgId },
                areaServed: "République démocratique du Congo",
              },
              priceSpecification: {
                "@type": "PriceSpecification",
                description: "Périmètre fermé · Prix négociable",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Systèmes Métiers & Plateformes Web sur mesure",
                description:
                  "Développement de logiciels de gestion RH, stocks, facturation, scolarité et caisse hors-ligne avec Mobile Money.",
                provider: { "@id": orgId },
                areaServed: "République démocratique du Congo",
              },
              priceSpecification: {
                "@type": "PriceSpecification",
                description: "Sur mesure · Prix négociable",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Ingénierie IA, RAG Documentaire & Agents Autonomes",
                description:
                  "Assistants IA sur bases de données privées et agents d'automatisation avec garde-fous stricts et validation humaine.",
                provider: { "@id": orgId },
                areaServed: "République démocratique du Congo",
              },
              priceSpecification: {
                "@type": "PriceSpecification",
                description: "Sur devis · Prix négociable",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Solutions Sectorielles PME, ONG, Écoles & Santé",
                description:
                  "Solutions prêtes à l'emploi : stocks & caisse PME, suivi bailleurs ONG, scolarité GEVAPOM, dossier patient HMS.",
                provider: { "@id": orgId },
                areaServed: "République démocratique du Congo",
              },
              priceSpecification: {
                "@type": "PriceSpecification",
                description: "Tarif adapté à votre structure · Négociable",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Maintenance, Supervision & Évolution continue",
                description:
                  "Sauvegardes quotidiennes, hébergement cloud, supervision continue et support technique avec SLA écrit.",
                provider: { "@id": orgId },
                areaServed: "République démocratique du Congo",
              },
              priceSpecification: {
                "@type": "PriceSpecification",
                description: "Forfait flexible · Prix négociable",
              },
            },
          ],
        },
      },
      {
        "@type": "FAQPage",
        "@id": faqId,
        name: `${site.name} — FAQ Services & Présence`,
        inLanguage: localeMeta[lang].bcp47,
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: site.url,
        name: `${site.name} — Ingénieur Logiciel & AI Engineer`,
        alternateName: "Félicien Mukamba Portfolio & SOSIDE",
        inLanguage: ["fr", "en", "ln"],
        description: t.meta.description,
        publisher: { "@id": personId },
      },
      {
        "@type": "ProfilePage",
        "@id": `${pageUrl}#page`,
        url: pageUrl,
        name: t.meta.title,
        inLanguage: localeMeta[lang].bcp47,
        isPartOf: { "@id": websiteId },
        mainEntity: { "@id": personId },
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  )
}
