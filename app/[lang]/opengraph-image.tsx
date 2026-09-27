import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { ImageResponse } from "next/og"
import { getDictionary } from "@/lib/dictionaries"
import { isLocale } from "@/lib/i18n"
import { site } from "@/lib/site"

export const alt = "Félicien Mukamba — Software Engineer & AI Engineer"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function OpengraphImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const t = getDictionary(isLocale(lang) ? lang : "en")
  const avatar = await readFile(join(process.cwd(), "public", site.avatar))
  const avatarSrc = `data:image/jpeg;base64,${avatar.toString("base64")}`
  const host = site.url.replace(/^https?:\/\//, "")

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0c0c12",
          backgroundImage:
            "radial-gradient(circle at 85% 10%, rgba(107,92,255,0.45), transparent 45%), radial-gradient(circle at 10% 100%, rgba(127,231,255,0.18), transparent 40%)",
          color: "#f5f5f8",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={avatarSrc}
            width={120}
            height={120}
            style={{ borderRadius: 32, border: "2px solid rgba(255,255,255,0.15)", objectFit: "cover" }}
            alt=""
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 46, fontWeight: 700, letterSpacing: -1.5 }}>{site.name}</div>
            <div style={{ fontSize: 24, color: "#b3a8ff", marginTop: 6 }}>{t.hero.eyebrow}</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", fontSize: 68, fontWeight: 700, letterSpacing: -2.5, lineHeight: 1.05 }}>
          <span>{t.hero.headlineStart}</span>
          <span style={{ color: "#b3a8ff" }}>
            {t.hero.headlineAccent} {t.hero.headlineEnd}
          </span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 22, color: "#a1a1b5" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 12, height: 12, borderRadius: 12, background: "#4ade80" }} />
            {t.hero.available}
          </div>
          <div>{host}</div>
        </div>
      </div>
    ),
    size,
  )
}
