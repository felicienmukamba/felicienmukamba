import type { MetadataRoute } from "next"
import { site } from "@/lib/site"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — Software Engineer & AI Engineer`,
    short_name: site.name,
    description: "Software engineer, AI engineer and founder of SOSIDE, based in Bukavu, DR Congo.",
    start_url: "/",
    display: "standalone",
    background_color: "#0c0c12",
    theme_color: "#0c0c12",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  }
}
