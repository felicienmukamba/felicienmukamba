"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Download, Loader2 } from "lucide-react"
import dynamic from "next/dynamic"

// Dynamic import of PDF components with no SSR
const PDFDownloadLink = dynamic(() => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink), { ssr: false })

interface PDFDownloadButtonProps {
  language: "fr" | "en" | "ln"
  label: string
}

export function PDFDownloadButton({ language, label }: PDFDownloadButtonProps) {
  const [isClient, setIsClient] = useState(false)
  const [CVPDFComponent, setCVPDFComponent] = useState<React.ComponentType<{ language: string }> | null>(null)

  useEffect(() => {
    setIsClient(true)
    // Dynamically import the CVPDF component
    import("@/components/cv-pdf").then((mod) => {
      setCVPDFComponent(() => mod.CVPDF)
    })
  }, [])

  if (!isClient || !CVPDFComponent) {
    return (
      <Button variant="outline" className="gap-2 bg-transparent" disabled>
        <Loader2 className="h-4 w-4 animate-spin" />
        {label}
      </Button>
    )
  }

  return (
    <PDFDownloadLink
      document={<CVPDFComponent language={language} />}
      fileName={`CV-Felicien-Mukamba-${language.toUpperCase()}.pdf`}
    >
      {({ loading }: { loading: boolean }) => (
        <Button variant="outline" className="gap-2 bg-transparent" disabled={loading}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
          {loading ? "..." : label}
        </Button>
      )}
    </PDFDownloadLink>
  )
}
