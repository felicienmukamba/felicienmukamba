import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Felicien Mukamba - Ingénieur Logiciel & Développeur Web",
  description:
    "Portfolio de Felicien Mukamba, ingénieur logiciel passionné par le développement web. Spécialiste en Angular, React, Spring Boot, Django, Python, Next.js et Flutter. Basé en RDC 🇨🇩",
  generator: "v0.app",
  keywords: [
    "Felicien Mukamba",
    "Développeur Web",
    "Ingénieur Logiciel",
    "RDC",
    "Congo",
    "Angular",
    "React",
    "Next.js",
    "Flutter",
    "SOSIDE",
  ],
  authors: [{ name: "Felicien Mukamba", url: "https://github.com/felicienmukamba" }],
  openGraph: {
    title: "Felicien Mukamba - Ingénieur Logiciel",
    description: "Ingénieur logiciel passionné par le développement web depuis la RDC 🇨🇩",
    type: "website",
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className="dark">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
