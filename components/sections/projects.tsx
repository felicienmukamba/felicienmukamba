import { ArrowUpRight, Github, Lock, Play, UserRound } from "lucide-react"
import { Reveal, Spotlight } from "@/components/motion"
import { ProjectCover } from "@/components/project-cover"
import { Section, SectionHeading, Tag } from "@/components/ui-kit"
import type { Dictionary } from "@/lib/dictionaries"
import { projects, site, type ProjectMeta } from "@/lib/site"
import { cn } from "@/lib/utils"

function ProjectLinks({ project, t }: { project: ProjectMeta; t: Dictionary }) {
  const links = [
    project.links.live && { href: project.links.live, label: t.projects.live, Icon: ArrowUpRight, primary: true },
    project.links.video && { href: project.links.video, label: t.projects.video, Icon: Play, primary: !project.links.live },
    project.links.code && { href: project.links.code, label: t.projects.code, Icon: Github, primary: false },
  ].filter(Boolean) as { href: string; label: string; Icon: typeof ArrowUpRight; primary: boolean }[]

  if (links.length === 0) {
    return (
      <p className="inline-flex items-center gap-2 text-[13px] text-subtle-foreground">
        <Lock className="size-3.5" aria-hidden />
        {t.projects.confidential}
      </p>
    )
  }

  return (
    <div className="flex flex-wrap gap-2">
      {links.map(({ href, label, Icon, primary }) => (
        <a
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "group inline-flex h-10 items-center gap-2 rounded-full px-4 text-[14px] font-medium transition-all duration-300",
            primary
              ? "bg-foreground text-background hover:scale-[1.03]"
              : "border border-line-strong hover:bg-surface-2",
          )}
        >
          <Icon className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
          {label}
          <span className="sr-only">({t.a11y.newTab})</span>
        </a>
      ))}
    </div>
  )
}

function MyRole({ t }: { t: Dictionary }) {
  return (
    <p className="mt-4 flex items-start gap-2.5 rounded-2xl border border-line bg-surface-2/60 px-3.5 py-2.5 text-[13px] leading-snug">
      <UserRound className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
      <span>
        <span className="font-medium">{t.projects.roleLabel}</span>
        <span className="text-muted-foreground"> — {t.projects.role}</span>
      </span>
    </p>
  )
}

function FeaturedProject({ project, index, t }: { project: ProjectMeta; index: number; t: Dictionary }) {
  const item = t.projects.items[project.id]
  const reversed = index % 2 === 1
  const blocks = [
    { label: t.projects.labels.challenge, text: item.challenge },
    { label: t.projects.labels.architecture, text: item.architecture },
  ]

  return (
    <Reveal>
      <Spotlight className="card rounded-[2rem] p-3 md:p-4">
        <article aria-labelledby={`project-${project.id}`} className="grid gap-6 lg:grid-cols-2 lg:gap-10">
          <div className={cn("lg:flex lg:flex-col lg:self-stretch", reversed && "lg:order-2")}>
            <ProjectCover
              project={project}
              alt={`${item.title} — ${item.subtitle}`}
              shotLabels={t.projects.shotLabels}
              galleryLabel={t.projects.gallery}
              fill
            />
          </div>

          <div className="px-3 pb-4 lg:self-center lg:px-2 lg:py-6">
            <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-subtle-foreground">
              0{index + 1}
              {project.org && ` · ${project.org}`}
            </p>
            <h3 id={`project-${project.id}`} className="mt-3 text-2xl font-semibold leading-tight tracking-[-0.03em] md:text-[2rem]">
              {item.title}
            </h3>
            <p className="mt-1.5 text-[15px] text-accent">{item.subtitle}</p>
            {project.led && <MyRole t={t} />}

            <dl className="mt-6 space-y-4">
              {blocks.map((block) => (
                <div key={block.label}>
                  <dt className="text-[13px] font-medium">{block.label}</dt>
                  <dd className="mt-1 text-[15px] leading-relaxed text-muted-foreground">{block.text}</dd>
                </div>
              ))}
              <div className="rounded-2xl border border-accent/25 bg-accent-soft p-4">
                <dt className="text-[13px] font-medium text-accent">{t.projects.labels.impact}</dt>
                <dd className="mt-1 text-[15px] leading-relaxed">{item.impact}</dd>
              </div>
            </dl>

            {project.stats && (
              <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-4">
                {project.stats.map((stat) => (
                  <div key={stat.key} className="flex flex-col-reverse">
                    <dt className="text-[12px] text-subtle-foreground">{t.projects.statLabels[stat.key]}</dt>
                    <dd className="text-2xl font-semibold tracking-tight tabular-nums">{stat.value}</dd>
                  </div>
                ))}
              </dl>
            )}

            <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Stack">
              {project.tech.map((tech) => (
                <Tag key={tech} tone="accent">
                  {tech}
                </Tag>
              ))}
            </ul>

            <div className="mt-7">
              <ProjectLinks project={project} t={t} />
            </div>
          </div>
        </article>
      </Spotlight>
    </Reveal>
  )
}

export function Projects({ t }: { t: Dictionary }) {
  const featured = projects.filter((p) => p.featured)
  const others = projects.filter((p) => !p.featured)

  return (
    <Section id="projects" labelledBy="projects-title">
      <SectionHeading
        id="projects-title"
        index="04"
        kicker={t.projects.kicker}
        title={t.projects.title}
        accent={t.projects.titleAccent}
        intro={t.projects.intro}
      />

      <div className="mt-14 space-y-6">
        {featured.map((project, i) => (
          <FeaturedProject key={project.id} project={project} index={i} t={t} />
        ))}
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {others.map((project) => {
          const item = t.projects.items[project.id]
          return (
            <Reveal key={project.id}>
              <Spotlight className="card h-full rounded-[2rem] p-3 md:p-4">
                <article aria-labelledby={`project-${project.id}`} className="flex h-full flex-col gap-5">
                  <ProjectCover
                    project={project}
                    alt={`${item.title} — ${item.subtitle}`}
                    shotLabels={t.projects.shotLabels}
                    galleryLabel={t.projects.gallery}
                  />
                  <div className="flex flex-1 flex-col px-3 pb-3">
                    <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-subtle-foreground">{item.subtitle}</p>
                    <h3 id={`project-${project.id}`} className="mt-2 text-xl font-semibold tracking-[-0.02em]">
                      {item.title}
                    </h3>
                    {project.led && <MyRole t={t} />}
                    <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{item.challenge}</p>
                    <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Stack">
                      {project.tech.map((tech) => (
                        <Tag key={tech}>{tech}</Tag>
                      ))}
                    </ul>
                    <div className="mt-auto pt-5">
                      <ProjectLinks project={project} t={t} />
                    </div>
                  </div>
                </article>
              </Spotlight>
            </Reveal>
          )
        })}

        <Reveal delay={0.1}>
          <a
            href={site.social.github}
            target="_blank"
            rel="noopener noreferrer me"
            className="group flex h-full min-h-48 flex-col justify-between rounded-[2rem] border border-dashed border-line-strong p-8 transition-colors hover:border-accent/50 hover:bg-accent-soft"
          >
            <Github className="size-7 text-muted-foreground transition-colors group-hover:text-accent" aria-hidden />
            <span className="flex items-end justify-between gap-4">
              <span>
                <span className="block text-xl font-semibold tracking-tight">{t.projects.more}</span>
                <span className="mt-1 block font-mono text-[13px] text-subtle-foreground">github.com/felicienmukamba</span>
              </span>
              <ArrowUpRight className="size-6 shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden />
            </span>
            <span className="sr-only">({t.a11y.newTab})</span>
          </a>
        </Reveal>
      </div>
    </Section>
  )
}
