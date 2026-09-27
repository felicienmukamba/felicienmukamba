import type { Metadata } from "next"
import { Geist } from "next/font/google"
import { en } from "@/lib/dictionaries/en"
import "./globals.css"

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })

export const metadata: Metadata = {
  title: "404 — Félicien Mukamba",
  robots: { index: false },
}

export default function GlobalNotFound() {
  return (
    <html lang="en" className={`dark ${geist.variable}`}>
      <body>
        <main className="grid min-h-dvh place-items-center px-6 text-center">
          <div>
            <p className="font-mono text-sm text-accent">404</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">{en.notFound.title}</h1>
            <p className="mt-4 text-muted-foreground">{en.notFound.body}</p>
            <a
              href="/"
              className="mt-8 inline-flex h-11 items-center rounded-full bg-foreground px-6 text-sm font-medium text-background"
            >
              {en.notFound.back}
            </a>
          </div>
        </main>
      </body>
    </html>
  )
}
