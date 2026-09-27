import type { ReactNode } from "react"
import { ScreenshotGallery } from "@/components/screenshot-gallery"
import type { ProjectMeta, ShotKind } from "@/lib/site"

/**
 * Covers are drawn rather than faked: a real screenshot when one exists,
 * otherwise an abstract illustration of what the system does.
 */

const lilac = "#b3a8ff"
const cyan = "#7fe7ff"

function Chip({ children, className }: { children: ReactNode; className: string }) {
  return (
    <span
      className={`absolute rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 font-mono text-[11px] text-white/85 backdrop-blur-md ${className}`}
    >
      {children}
    </span>
  )
}

const fillClass = "lg:aspect-auto lg:h-full lg:min-h-[22rem]"

function Frame({ from, to, fill, children }: { from: string; to: string; fill?: boolean; children: ReactNode }) {
  return (
    <div className={`relative aspect-[16/10] overflow-hidden rounded-[1.4rem] ${fill ? fillClass : ""}`} style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}>
      {children}
    </div>
  )
}

function IdentityCover({ fill }: { fill?: boolean }) {
  const rings = Array.from({ length: 11 }, (_, k) => k)
  return (
    <Frame from="#17132e" to="#0a1422" fill={fill}>
      <svg viewBox="0 0 640 400" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full" aria-hidden>
        <defs>
          <radialGradient id="pgcc-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#6b5cff" stopOpacity="0.45" />
            <stop offset="1" stopColor="#6b5cff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="320" cy="200" r="220" fill="url(#pgcc-glow)" />
        {rings.map((k) => (
          <circle
            key={k}
            cx="320"
            cy="200"
            r={40 + k * 13}
            fill="none"
            stroke={k % 3 === 0 ? cyan : lilac}
            strokeOpacity={0.62 - k * 0.045}
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeDasharray={`${((k * 37) % 70) + 24} ${((k * 23) % 16) + 7}`}
            transform={`rotate(${k * 29} 320 200)`}
          />
        ))}
        <path
          d="M320 170 l28 11 v22 c0 19 -12 31 -28 38 c-16 -7 -28 -19 -28 -38 v-22 z"
          fill="#120f24"
          stroke={cyan}
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path d="M309 206 l8 8 l15 -17" fill="none" stroke={cyan} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <Chip className="left-5 top-5">AES-256-GCM</Chip>
      <Chip className="bottom-5 right-5">
        <span className="mr-1.5 inline-block size-1.5 rounded-full bg-emerald-400 align-middle" />
        biometric.verify() · &lt;200 ms
      </Chip>
    </Frame>
  )
}

function CityCover({ fill }: { fill?: boolean }) {
  const route: [number, number][] = [
    [70, 330],
    [150, 305],
    [195, 238],
    [285, 222],
    [335, 158],
    [435, 146],
    [478, 96],
    [572, 82],
  ]
  const d = route.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join(" ")
  return (
    <Frame from="#0b1a22" to="#12122b" fill={fill}>
      <svg viewBox="0 0 640 400" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full" aria-hidden>
        <defs>
          <filter id="maz-blur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>
        <g transform="rotate(-10 320 200)" stroke="#ffffff" strokeOpacity="0.07">
          {Array.from({ length: 22 }, (_, i) => (
            <line key={`v${i}`} x1={-120 + i * 44} y1="-120" x2={-120 + i * 44} y2="520" />
          ))}
          {Array.from({ length: 16 }, (_, i) => (
            <line key={`h${i}`} x1="-120" y1={-120 + i * 44} x2="760" y2={-120 + i * 44} />
          ))}
        </g>
        <path d="M-20 120 C 120 160, 220 60, 360 110 S 560 210, 680 170" fill="none" stroke={cyan} strokeOpacity="0.08" strokeWidth="26" />
        <path d={d} fill="none" stroke={cyan} strokeWidth="6" strokeOpacity="0.5" filter="url(#maz-blur)" />
        <path d={d} fill="none" stroke={cyan} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        {route.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i === 4 ? 8 : 5} fill="#0e1524" stroke={i === 4 ? cyan : lilac} strokeWidth="2" />
        ))}
        <circle cx="335" cy="158" r="18" fill="none" stroke={cyan} strokeOpacity="0.35" />
      </svg>
      <Chip className="left-5 top-5">route.optimize()</Chip>
      <Chip className="bottom-5 right-5">+40% efficiency</Chip>
    </Frame>
  )
}

function RecordsCover({ fill }: { fill?: boolean }) {
  const rows = [150, 118, 170, 132, 158, 124]
  return (
    <Frame from="#141230" to="#0c1a24" fill={fill}>
      <svg viewBox="0 0 640 400" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full" aria-hidden>
        <rect x="60" y="46" width="520" height="308" rx="16" fill="#ffffff" fillOpacity="0.035" stroke="#ffffff" strokeOpacity="0.1" />
        <rect x="84" y="70" width="300" height="32" rx="10" fill="#ffffff" fillOpacity="0.05" stroke="#ffffff" strokeOpacity="0.1" />
        <circle cx="102" cy="86" r="6" fill="none" stroke={lilac} strokeWidth="1.6" />
        <line x1="106.5" y1="90.5" x2="111" y2="95" stroke={lilac} strokeWidth="1.6" strokeLinecap="round" />
        <rect x="122" y="82" width="110" height="8" rx="4" fill="#ffffff" fillOpacity="0.18" />
        {rows.map((w, i) => {
          const y = 124 + i * 36
          const active = i === 1
          return (
            <g key={i}>
              {active && <rect x="72" y={y - 6} width="496" height="32" rx="9" fill="#6b5cff" fillOpacity="0.18" />}
              <circle cx="100" cy={y + 10} r="9" fill={active ? lilac : "#ffffff"} fillOpacity={active ? 0.9 : 0.14} />
              <rect x="120" y={y + 5} width={w} height="9" rx="4.5" fill="#ffffff" fillOpacity={active ? 0.55 : 0.22} />
              <rect x="330" y={y + 5} width="84" height="9" rx="4.5" fill="#ffffff" fillOpacity="0.12" />
              <rect x="468" y={y + 2} width="64" height="16" rx="8" fill={i % 3 === 0 ? cyan : lilac} fillOpacity="0.28" />
            </g>
          )
        })}
      </svg>
      <Chip className="bottom-5 right-5">Angular · RxJS</Chip>
    </Frame>
  )
}

/** `fill` stretches the cover to the height of its row on large screens. */
export function ProjectCover({
  project,
  alt,
  fill,
  shotLabels,
  galleryLabel,
}: {
  project: ProjectMeta
  alt: string
  fill?: boolean
  shotLabels: Record<ShotKind, string>
  galleryLabel: string
}) {
  if (project.screenshots?.length) {
    return (
      <div className={fill ? "lg:my-auto" : undefined}>
        <ScreenshotGallery
          alt={alt}
          groupLabel={galleryLabel}
          shots={project.screenshots.map((shot) => ({ src: shot.src, url: shot.url, label: shotLabels[shot.kind] }))}
        />
      </div>
    )
  }

  switch (project.cover) {
    case "identity":
      return <IdentityCover fill={fill} />
    case "city":
      return <CityCover fill={fill} />
    default:
      return <RecordsCover fill={fill} />
  }
}
