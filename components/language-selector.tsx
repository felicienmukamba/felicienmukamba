"use client"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export type Language = "fr" | "en" | "ln"

interface LanguageSelectorProps {
  currentLanguage: Language
  onLanguageChange: (lang: Language) => void
}

export function LanguageSelector({ currentLanguage, onLanguageChange }: LanguageSelectorProps) {
  const languages = {
    fr: "Français",
    en: "English",
    ln: "Lingala",
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{languages[currentLanguage]}</span>
          <span className="sm:hidden">{currentLanguage.toUpperCase()}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onLanguageChange("fr")}>🇫🇷 Français</DropdownMenuItem>
        <DropdownMenuItem onClick={() => onLanguageChange("en")}>🇬🇧 English</DropdownMenuItem>
        <DropdownMenuItem onClick={() => onLanguageChange("ln")}>🇨🇩 Lingala</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
