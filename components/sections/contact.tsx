import { ArrowUpRight, Github, Linkedin, Mail, Phone } from "lucide-react"
import { CopyEmailButton, LocalTime } from "@/components/contact-actions"
import { XIcon } from "@/components/icons"
import { Reveal } from "@/components/motion"
import type { Dictionary } from "@/lib/dictionaries"
import type { Locale } from "@/lib/i18n"
import { site } from "@/lib/site"

export function Contact({ lang, t }: { lang: Locale; t: Dictionary }) {
  const socials = [
    { href: site.social.linkedin, label: "LinkedIn", handle: "felicien-mukamba", Icon: Linkedin },
    { href: site.social.github, label: "GitHub", handle: "felicienmukamba", Icon: Github },
    { href: site.social.x, label: "X", handle: "@felicienmukamb", Icon: XIcon },
  ]

  return (
    <section id="contact" aria-labelledby="contact-title" className="container-page py-24 md:py-32">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2.5rem] border border-line bg-surface px-6 py-16 text-center md:px-16 md:py-24">
          <div aria-hidden className="bg-grid absolute inset-0 opacity-70" />
          <div
            aria-hidden
            className="absolute left-1/2 top-0 h-80 w-[42rem] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[radial-gradient(closest-side,var(--accent-soft),transparent)] blur-2xl"
          />

          <div className="relative">
            <p className="flex items-center justify-center gap-3 font-mono text-[12px] uppercase tracking-[0.16em] text-subtle-foreground">
              <span className="text-accent">07</span>
              <span aria-hidden className="h-px w-8 bg-line-strong" />
              {t.contact.kicker}
            </p>
            <h2
              id="contact-title"
              className="mx-auto mt-6 max-w-4xl text-[clamp(2.6rem,7.5vw,6rem)] font-semibold leading-[0.95] tracking-[-0.05em]"
            >
              {t.contact.title}{" "}
              <span className="font-serif font-normal italic tracking-[-0.02em] text-gradient">{t.contact.titleAccent}</span>
            </h2>
            <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">{t.contact.description}</p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <a
                href={`mailto:${site.email}`}
                className="group inline-flex h-12 items-center gap-2 rounded-full bg-foreground px-6 text-[15px] font-medium text-background transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
              >
                <Mail className="size-4" aria-hidden />
                {t.contact.cta}
              </a>
              <CopyEmailButton copy={t.contact.copy} copied={t.contact.copied} />
            </div>

            <dl className="mx-auto mt-12 grid max-w-2xl gap-3 text-left sm:grid-cols-2">
              <div className="rounded-2xl border border-line bg-background/60 p-4 backdrop-blur">
                <dt className="flex items-center gap-2 text-[12px] text-subtle-foreground">
                  <Mail className="size-3.5" aria-hidden />
                  {t.contact.emailLabel}
                </dt>
                <dd className="mt-1 truncate text-[15px] font-medium">
                  <a href={`mailto:${site.email}`} className="underline-offset-4 hover:underline">
                    {site.email}
                  </a>
                </dd>
              </div>
              <div className="rounded-2xl border border-line bg-background/60 p-4 backdrop-blur">
                <dt className="flex items-center gap-2 text-[12px] text-subtle-foreground">
                  <Phone className="size-3.5" aria-hidden />
                  {t.contact.phoneLabel}
                </dt>
                <dd className="mt-1 text-[15px] font-medium">
                  <a href={`tel:${site.phoneHref}`} className="underline-offset-4 hover:underline">
                    {site.phone}
                  </a>
                </dd>
              </div>
            </dl>

            <ul className="mx-auto mt-3 grid max-w-2xl gap-3 sm:grid-cols-3">
              {socials.map(({ href, label, handle, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer me"
                    className="group flex items-center gap-3 rounded-2xl border border-line bg-background/60 p-4 text-left backdrop-blur transition-colors hover:border-accent/40"
                  >
                    <Icon className="size-5 shrink-0 text-muted-foreground transition-colors group-hover:text-accent" aria-hidden />
                    <span className="min-w-0 flex-1">
                      <span className="block text-[14px] font-medium">{label}</span>
                      <span className="block truncate font-mono text-[11px] text-subtle-foreground">{handle}</span>
                    </span>
                    <ArrowUpRight className="size-4 shrink-0 text-subtle-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                    <span className="sr-only">({t.a11y.newTab})</span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex justify-center">
              <LocalTime label={t.contact.localTime} lang={lang} />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
