import Link from "next/link"
import { ArrowUpRight, Building2, FileText, HeartHandshake, Layers, Palette, Shapes, Sparkles, Waves } from "lucide-react"
import { requireSession } from "@/lib/portal/auth"
import { cvProfiles } from "@/lib/portal/profiles"

const tools = [
  { href: "/fr/lab/brand-kit", label: "Brand kit & marketplace", description: "Logo + couleurs → charte, visuels boutique, données de démo.", Icon: Palette },
  { href: "/fr/lab/svg", label: "Générateur SVG", description: "Blobs, vagues, motifs et dégradés maillés.", Icon: Shapes },
  { href: "/fr/lab/motion", label: "Motion design", description: "Courbes d'easing, ressorts, keyframes.", Icon: Waves },
  { href: "/fr/lab/design", label: "Outils design", description: "Palettes, contraste, ombres, dégradés.", Icon: Layers },
]

export default async function PortalHome() {
  const session = await requireSession()
  const groups = [
    { title: "Entreprises", Icon: Building2, items: cvProfiles.filter((p) => p.audience !== "ngo") },
    { title: "ONG", Icon: HeartHandshake, items: cvProfiles.filter((p) => p.audience === "ngo") },
  ]

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
      <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-subtle-foreground">Portail privé</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] md:text-5xl">
        Bonjour {session.user.charAt(0).toUpperCase() + session.user.slice(1)}.
      </h1>
      <p className="mt-3 max-w-xl text-muted-foreground">Choisissez un profil pour générer un CV adapté au poste, puis personnalisez chaque détail dans le studio.</p>

      <section className="mt-10 grid gap-5 md:grid-cols-2">
        {groups.map(({ title, Icon, items }) => (
          <div key={title} className="card rounded-3xl p-6">
            <h2 className="flex items-center gap-2 text-[15px] font-semibold">
              <Icon className="size-4 text-accent" aria-hidden /> CV — {title}
            </h2>
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
      </section>

      <Link
        href="/portal/cv"
        className="mt-5 flex items-center gap-4 rounded-3xl border border-accent/30 bg-accent-soft p-6 transition-colors hover:border-accent/60"
      >
        <FileText className="size-6 shrink-0 text-accent" aria-hidden />
        <span className="flex-1">
          <span className="block text-[15px] font-semibold">Ouvrir le studio CV</span>
          <span className="block text-[13px] text-muted-foreground">Reprend votre dernier brouillon : mise en page, contenu, analyse d'offre, versions.</span>
        </span>
        <Sparkles className="size-5 text-accent" aria-hidden />
      </Link>

      <section className="mt-12">
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
