import Link from "next/link"
import { ArrowUpRight, Award, Building2, ChevronRight, Compass, FileText, FolderKanban, HeartHandshake, Layers, MessageSquare, Palette, Shapes, Sparkles, UserCheck, Waves, Zap } from "lucide-react"
import { ReferencesManager } from "@/components/portal/references-manager"
import { TargetRolesView } from "@/components/portal/target-roles-view"
import { TrainingsView } from "@/components/portal/trainings-view"
import { requireSession } from "@/lib/portal/auth"
import { PORTAL_REFERENCES } from "@/lib/portal/directory"
import { cvProfiles } from "@/lib/portal/profiles"
import { TARGET_CATEGORIES } from "@/lib/portal/roles"

const tools = [
  { href: "/fr/lab/brand-kit", label: "Brand kit & marketplace", description: "Logo + couleurs → charte, visuels boutique, données de démo.", Icon: Palette },
  { href: "/fr/lab/svg", label: "Générateur SVG", description: "Blobs, vagues, motifs et dégradés maillés.", Icon: Shapes },
  { href: "/fr/lab/motion", label: "Motion design", description: "Courbes d'easing, ressorts, keyframes.", Icon: Waves },
  { href: "/fr/lab/design", label: "Outils design", description: "Palettes, contraste, ombres, dégradés.", Icon: Layers },
]

export default async function PortalHome() {
  const session = await requireSession()
  const groups = [
    { title: "Entreprises & Tech", Icon: Building2, items: cvProfiles.filter((p) => p.audience !== "ngo") },
    { title: "ONG & Développement", Icon: HeartHandshake, items: cvProfiles.filter((p) => p.audience === "ngo") },
  ]

  const totalRolesCount = TARGET_CATEGORIES.reduce((acc, cat) => acc + cat.roles.length, 0)

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14 space-y-14">
      {/* Welcome header & summary badges */}
      <div>
        <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-subtle-foreground">Portail privé</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] md:text-5xl">
          Bonjour {session.user.charAt(0).toUpperCase() + session.user.slice(1)}.
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Espace centralisé pour gérer vos candidatures : pipeline Kanban, 25 postes cibles, générateur de lettres de motivation, studio CV, références et formations certifiées.
        </p>

        {/* Quick stat cards */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          <Link
            href="/portal/candidatures"
            className="card flex flex-col justify-between rounded-2xl p-4 transition-colors hover:border-accent/40"
          >
            <div className="flex items-center justify-between">
              <span className="grid size-9 place-items-center rounded-xl bg-blue-500/15 text-blue-400">
                <FolderKanban className="size-4" aria-hidden />
              </span>
              <ChevronRight className="size-4 text-subtle-foreground" aria-hidden />
            </div>
            <div className="mt-3">
              <p className="text-[14px] font-semibold">Candidatures</p>
              <p className="text-[12px] text-muted-foreground">Pipeline & relances</p>
            </div>
          </Link>

          <Link
            href="/portal/postes"
            className="card flex flex-col justify-between rounded-2xl p-4 transition-colors hover:border-accent/40"
          >
            <div className="flex items-center justify-between">
              <span className="grid size-9 place-items-center rounded-xl bg-amber-500/15 text-amber-400">
                <Compass className="size-4" aria-hidden />
              </span>
              <ChevronRight className="size-4 text-subtle-foreground" aria-hidden />
            </div>
            <div className="mt-3">
              <p className="text-[14px] font-semibold">{totalRolesCount} Postes Cibles</p>
              <p className="text-[12px] text-muted-foreground">Tech & ONG</p>
            </div>
          </Link>

          <Link
            href="/portal/lettre"
            className="card flex flex-col justify-between rounded-2xl p-4 transition-colors hover:border-accent/40"
          >
            <div className="flex items-center justify-between">
              <span className="grid size-9 place-items-center rounded-xl bg-rose-500/15 text-rose-400">
                <MessageSquare className="size-4" aria-hidden />
              </span>
              <ChevronRight className="size-4 text-subtle-foreground" aria-hidden />
            </div>
            <div className="mt-3">
              <p className="text-[14px] font-semibold">Lettres & Pitchs</p>
              <p className="text-[12px] text-muted-foreground">Studio sur-mesure</p>
            </div>
          </Link>

          <Link
            href="/portal/cv"
            className="card flex flex-col justify-between rounded-2xl p-4 transition-colors hover:border-accent/40"
          >
            <div className="flex items-center justify-between">
              <span className="grid size-9 place-items-center rounded-xl bg-accent/15 text-accent">
                <FileText className="size-4" aria-hidden />
              </span>
              <ChevronRight className="size-4 text-subtle-foreground" aria-hidden />
            </div>
            <div className="mt-3">
              <p className="text-[14px] font-semibold">{cvProfiles.length} Profils CV</p>
              <p className="text-[12px] text-muted-foreground">Export PDF & ATS</p>
            </div>
          </Link>

          <Link
            href="/portal/references"
            className="card flex flex-col justify-between rounded-2xl p-4 transition-colors hover:border-accent/40"
          >
            <div className="flex items-center justify-between">
              <span className="grid size-9 place-items-center rounded-xl bg-emerald-500/15 text-emerald-400">
                <UserCheck className="size-4" aria-hidden />
              </span>
              <ChevronRight className="size-4 text-subtle-foreground" aria-hidden />
            </div>
            <div className="mt-3">
              <p className="text-[14px] font-semibold">{PORTAL_REFERENCES.length} Références</p>
              <p className="text-[12px] text-muted-foreground">Contacts vérifiés</p>
            </div>
          </Link>

          <Link
            href="/portal/formations"
            className="card flex flex-col justify-between rounded-2xl p-4 transition-colors hover:border-accent/40"
          >
            <div className="flex items-center justify-between">
              <span className="grid size-9 place-items-center rounded-xl bg-purple-500/15 text-purple-400">
                <Award className="size-4" aria-hidden />
              </span>
              <ChevronRight className="size-4 text-subtle-foreground" aria-hidden />
            </div>
            <div className="mt-3">
              <p className="text-[14px] font-semibold">Package ERM</p>
              <p className="text-[12px] text-muted-foreground">OCHA & REACH</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Postes Visés & Stratégie de Carrière */}
      <section id="postes">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Compass className="size-5 text-amber-400" aria-hidden />
              <h2 className="text-xl font-bold tracking-tight md:text-2xl">Profils & Postes Visés</h2>
            </div>
            <p className="mt-1 text-[13.5px] text-muted-foreground">
              Vos opportunités cibles : Entreprises Tech (Fullstack Senior, Architecte, Tech Lead, DevOps) et Secteur Humanitaire (IM/MEAL, T4D, ERM Urgence, Paix & Communication).
            </p>
          </div>
          <Link
            href="/portal/postes"
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-accent hover:underline"
          >
            Guide complet de candidature <ArrowUpRight className="size-3.5" aria-hidden />
          </Link>
        </div>

        <div className="mt-6">
          <TargetRolesView compact />
        </div>
      </section>

      {/* Pipeline de Candidatures & Outils de Recrutement */}
      <section className="grid gap-5 md:grid-cols-2">
        <div className="card rounded-3xl p-6 sm:p-7 border border-line bg-gradient-to-br from-blue-500/10 via-surface to-background flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid size-9 place-items-center rounded-xl bg-blue-500/20 text-blue-400">
                <FolderKanban className="size-4" aria-hidden />
              </span>
              <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-blue-400">
                Tableau de bord de suivi
              </span>
            </div>
            <h3 className="mt-4 text-xl font-bold tracking-tight text-foreground">
              Pipeline des Candidatures
            </h3>
            <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
              Suivez l'état d'avancement de vos démarches (Tech & ONG) en mode Kanban ou tableau : brouillons, candidatures transmises, entretiens techniques et offres reçues.
            </p>
          </div>

          <Link
            href="/portal/candidatures"
            className="mt-6 inline-flex items-center justify-between rounded-xl border border-blue-500/30 bg-blue-500/10 px-4 py-2.5 text-[13px] font-semibold text-blue-400 hover:bg-blue-500/20 transition-colors"
          >
            <span>Accéder au suivi des candidatures</span>
            <ArrowUpRight className="size-4" aria-hidden />
          </Link>
        </div>

        <div className="card rounded-3xl p-6 sm:p-7 border border-line bg-gradient-to-br from-rose-500/10 via-surface to-background flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid size-9 place-items-center rounded-xl bg-rose-500/20 text-rose-400">
                <MessageSquare className="size-4" aria-hidden />
              </span>
              <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-rose-400">
                Générateur Intelligent
              </span>
            </div>
            <h3 className="mt-4 text-xl font-bold tracking-tight text-foreground">
              Lettres de Motivation & Pitchs
            </h3>
            <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
              Générez instantanément des lettres de motivation personnalisées (FR/EN) et des pitchs d'accroche pour LinkedIn / RH, adaptées au poste visé et intégrant vos 7 références.
            </p>
          </div>

          <Link
            href="/portal/lettre"
            className="mt-6 inline-flex items-center justify-between rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-2.5 text-[13px] font-semibold text-rose-400 hover:bg-rose-500/20 transition-colors"
          >
            <span>Rédiger une lettre ou un pitch</span>
            <ArrowUpRight className="size-4" aria-hidden />
          </Link>
        </div>
      </section>

      {/* CV Profiles selection */}
      <section id="cv">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-tight md:text-2xl">Profils CV adaptés dans le Studio</h2>
            <p className="text-[13px] text-muted-foreground">Sélectionnez un profil préconfiguré avec les sections, mots-clés et références pertinentes.</p>
          </div>
          <Link
            href="/portal/cv"
            className="hidden items-center gap-1.5 text-[13px] font-semibold text-accent hover:underline sm:inline-flex"
          >
            Ouvrir le studio <ArrowUpRight className="size-3.5" aria-hidden />
          </Link>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {groups.map(({ title, Icon, items }) => (
            <div key={title} className="card rounded-3xl p-6">
              <h3 className="flex items-center gap-2 text-[15px] font-semibold">
                <Icon className="size-4 text-accent" aria-hidden /> CV — {title}
              </h3>
              <ul className="mt-4 divide-y divide-line">
                {items.map((p) => (
                  <li key={p.id}>
                    <Link href={`/portal/cv?profile=${p.id}`} className="group flex items-center gap-3 py-3">
                      <span className="size-2.5 shrink-0 rounded-full" style={{ backgroundColor: p.accent }} aria-hidden />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[14px] font-medium group-hover:text-accent">{p.name}</span>
                        <span className="block truncate text-[12px] text-muted-foreground">{p.target}</span>
                      </span>
                      <ArrowUpRight className="size-4 shrink-0 text-subtle-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Link
          href="/portal/cv"
          className="mt-5 flex items-center gap-4 rounded-3xl border border-accent/30 bg-accent-soft p-6 transition-colors hover:border-accent/60"
        >
          <FileText className="size-6 shrink-0 text-accent" aria-hidden />
          <span className="flex-1">
            <span className="block text-[15px] font-semibold">Ouvrir le studio CV</span>
            <span className="block text-[13px] text-muted-foreground">Personnalisez votre mise en page, contenu, références, analyse d'offre d'emploi et exportez votre PDF.</span>
          </span>
          <Sparkles className="size-5 text-accent" aria-hidden />
        </Link>
      </section>

      {/* Personnes de Références */}
      <section id="references">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <UserCheck className="size-5 text-emerald-400" aria-hidden />
              <h2 className="text-xl font-bold tracking-tight md:text-2xl">Personnes de Références</h2>
            </div>
            <p className="mt-1 text-[13.5px] text-muted-foreground">
              Coordonnées directes de vos répondants professionnels, académiques et institutionnels.
            </p>
          </div>
          <Link
            href="/portal/references"
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-accent hover:underline"
          >
            Voir le carnet complet <ArrowUpRight className="size-3.5" aria-hidden />
          </Link>
        </div>

        <div className="mt-6">
          <ReferencesManager compact />
        </div>
      </section>

      {/* Formations & Certifications */}
      <section id="formations">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Award className="size-5 text-purple-400" aria-hidden />
              <h2 className="text-xl font-bold tracking-tight md:text-2xl">Formations & Certifications</h2>
            </div>
            <p className="mt-1 text-[13.5px] text-muted-foreground">
              Dernière session : Package ERM conjoint OCHA & REACH Initiative (Bukavu), Jeune Ambassadeur UNICEF et certifications techniques.
            </p>
          </div>
          <Link
            href="/portal/formations"
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-accent hover:underline"
          >
            Tous les détails & modules <ArrowUpRight className="size-3.5" aria-hidden />
          </Link>
        </div>

        <div className="mt-6">
          <TrainingsView compact />
        </div>
      </section>

      {/* Lab Tools */}
      <section>
        <h2 className="text-[15px] font-semibold">Outils du Lab</h2>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map(({ href, label, description, Icon }) => (
            <li key={href}>
              <Link href={href} className="card flex h-full flex-col gap-3 rounded-2xl p-5 transition-colors hover:border-accent/40">
                <Icon className="size-5 text-accent" aria-hidden />
                <span className="text-[14px] font-medium">{label}</span>
                <span className="text-[12px] text-muted-foreground">{description}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
