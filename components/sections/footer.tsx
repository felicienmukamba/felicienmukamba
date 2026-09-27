import { ArrowUp } from "lucide-react"
import type { Dictionary } from "@/lib/dictionaries"
import { site } from "@/lib/site"

export function Footer({ t }: { t: Dictionary }) {
  return (
    <footer className="border-t border-line">
      <div className="container-page flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <span className="grid size-8 place-items-center rounded-[10px] bg-foreground font-mono text-[13px] font-semibold text-background">
            {site.initials}
          </span>
          <div className="text-[13px] leading-snug">
            <p>
              {t.footer.designed} <span className="font-medium">{site.name}</span>
            </p>
            <p className="text-subtle-foreground">
              © {new Date().getFullYear()} · {t.footer.built}
            </p>
          </div>
        </div>
        <a
          href="#main"
          className="group inline-flex items-center gap-2 self-start text-[13px] text-muted-foreground transition-colors hover:text-foreground md:self-auto"
        >
          {t.footer.backToTop}
          <ArrowUp className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5" aria-hidden />
        </a>
      </div>
    </footer>
  )
}
