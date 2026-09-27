import { ArrowRight, Github, Linkedin } from "lucide-react"
import { Fragment, type CSSProperties } from "react"
import { CvDownloadButton } from "@/components/cv-download-button"
import { HeroVisual } from "@/components/hero-visual"
import { XIcon } from "@/components/icons"
import type { Dictionary } from "@/lib/dictionaries"
import type { Locale } from "@/lib/i18n"
import { site } from "@/lib/site"

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties
const rise = "animate-[rise_1s_var(--ease-out-expo)_var(--d)_both]"

function Words({ text, start, className }: { text: string; start: number; className?: string }) {
  return text.split(" ").map((word, i) => (
    <Fragment key={`${word}-${i}`}>
      <span className="inline-block overflow-hidden pb-[0.12em] align-bottom">
        <span
          className={`inline-block animate-[word_1s_var(--ease-out-expo)_var(--d)_both] ${className ?? ""}`}
          style={delay(start + i * 55)}
        >
          {word}
        </span>
      </span>{" "}
    </Fragment>
  ))
}

export function Hero({ lang, t }: { lang: Locale; t: Dictionary }) {
  const socials = [
    { href: site.social.github, label: "GitHub", Icon: Github },
    { href: site.social.linkedin, label: "LinkedIn", Icon: Linkedin },
    { href: site.social.x, label: "X", Icon: XIcon },
  ]
  const startWords = t.hero.headlineStart.split(" ").length
  const accentWords = t.hero.headlineAccent.split(" ").length

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden pt-28 md:pt-32">
      <div aria-hidden className="bg-grid pointer-events-none absolute inset-0 -z-10" />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[40rem] w-[70rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,var(--accent-soft),transparent)] blur-2xl"
      />

      <div className="container-page grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
        <div>
          <p
            className={`inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/70 py-1.5 pl-2.5 pr-3.5 text-[13px] text-muted-foreground backdrop-blur ${rise}`}
            style={delay(0)}
          >
            <span className="relative grid size-2 place-items-center">
              <span className="absolute size-2 animate-pulse-ring rounded-full bg-success" />
              <span className="size-2 rounded-full bg-success" />
            </span>
            {t.hero.available}
          </p>

          <p
            className={`mt-8 font-mono text-[12px] uppercase tracking-[0.16em] text-subtle-foreground ${rise}`}
            style={delay(80)}
          >
            {t.hero.eyebrow}
          </p>

          <h1
            id="hero-title"
            className="mt-4 text-[clamp(2.5rem,5.4vw,4.6rem)] font-semibold leading-[0.98] tracking-[-0.045em]"
          >
            <span className="sr-only">{site.name} — </span>
            <Words text={t.hero.headlineStart} start={150} />
            <br className="hidden sm:block" />
            <Words
              text={t.hero.headlineAccent}
              start={150 + startWords * 55}
              className="font-serif text-[1.08em] font-normal italic tracking-[-0.02em] text-gradient"
            />
            <Words text={t.hero.headlineEnd} start={150 + (startWords + accentWords) * 55} />
          </h1>

          <p
            className={`mt-7 max-w-xl text-[17px] leading-relaxed text-muted-foreground md:text-lg ${rise}`}
            style={delay(700)}
          >
            {t.hero.intro}
          </p>

          <div className={`mt-9 flex flex-wrap items-center gap-3 ${rise}`} style={delay(820)}>
            <a
              href="#contact"
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-foreground px-6 text-[15px] font-medium text-background transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
            >
              {t.hero.ctaPrimary}
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
            </a>
            <CvDownloadButton lang={lang} labels={{ download: t.cv.download, generating: t.cv.generating, error: t.cv.error }} />
          </div>

          <ul className={`mt-9 flex items-center gap-1 ${rise}`} style={delay(920)}>
            {socials.map(({ href, label, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer me"
                  aria-label={`${label} (${t.a11y.newTab})`}
                  className="grid size-10 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground"
                >
                  <Icon className="size-[18px]" aria-hidden />
                </a>
              </li>
            ))}
            <li aria-hidden className="mx-2 h-4 w-px bg-line-strong" />
            <li>
              <a
                href={`mailto:${site.email}`}
                className="text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
              >
                {site.email}
              </a>
            </li>
          </ul>
        </div>

        <HeroVisual
          alt={`${site.name}, ${t.hero.eyebrow}`}
          roles={t.hero.roles}
          rolesLabel={t.hero.rolesLabel}
          location={t.hero.location}
          chips={t.hero.chips}
        />
      </div>

      <div className="container-page mt-20 md:mt-24">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
          {t.metrics.map((metric, i) => (
            <div
              key={metric.label}
              className={`flex flex-col-reverse justify-end gap-2 bg-background p-5 md:p-7 ${rise}`}
              style={delay(1000 + i * 90)}
            >
              <dt className="text-[13px] leading-snug text-muted-foreground">{metric.label}</dt>
              <dd className="text-3xl font-semibold tracking-tight tabular-nums md:text-4xl">{metric.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
