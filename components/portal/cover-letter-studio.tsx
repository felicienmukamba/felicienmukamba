"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { ArrowUpRight, Building2, Check, Copy, Download, FileText, HeartHandshake, Layers, MessageSquare, Printer, RotateCcw, Send, Sparkles, UserCheck } from "lucide-react"
import { Button, CopyButton, Field, Panel, TextInput } from "@/components/kit/controls"
import { downloadText } from "@/lib/kit/download"
import { PORTAL_REFERENCES } from "@/lib/portal/directory"
import { ACHIEVEMENTS_OPTIONS, generateCoverLetter, generateShortPitch, type LetterConfig, type LetterTone } from "@/lib/portal/letters"
import { TARGET_CATEGORIES } from "@/lib/portal/roles"
import { cn } from "@/lib/utils"

export function CoverLetterStudio({ initialRoleId }: { initialRoleId?: string }) {
  const allRoles = useMemo(() => TARGET_CATEGORIES.flatMap((c) => c.roles), [])
  const defaultRole = allRoles.find((r) => r.id === initialRoleId) ?? allRoles[0]

  const [sector, setSector] = useState<"tech" | "ngo">(defaultRole.sector)
  const [selectedRoleId, setSelectedRoleId] = useState<string>(defaultRole.id)
  const [customRoleTitle, setCustomRoleTitle] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [location, setLocation] = useState("Bukavu / Télétravail")
  const [lang, setLang] = useState<"fr" | "en">("fr")
  const [tone, setTone] = useState<LetterTone>("institutionnel")
  const [tab, setTab] = useState<"letter" | "pitch">("letter")

  const [selectedAchievements, setSelectedAchievements] = useState<string[]>([
    "erm-ocha",
    "gevapom-schools",
    "soside-platforms",
    "pgcc-biometrics",
  ])

  const [selectedReferences, setSelectedReferences] = useState<string[]>([
    "ref-muhindo",
    "ref-bivunga",
    "ref-mbilizi",
  ])

  // Get current role
  const currentRole = allRoles.find((r) => r.id === selectedRoleId) ?? allRoles[0]
  const effectiveTitle = customRoleTitle.trim() || (lang === "en" ? currentRole.titleEn : currentRole.title)

  // Filter roles by chosen sector
  const rolesInSector = useMemo(() => {
    return allRoles.filter((r) => r.sector === sector)
  }, [allRoles, sector])

  const config: LetterConfig = useMemo(
    () => ({
      roleTitle: effectiveTitle,
      roleEn: currentRole.titleEn,
      sector,
      companyName,
      location,
      lang,
      tone,
      selectedAchievements,
      selectedReferences,
    }),
    [effectiveTitle, currentRole, sector, companyName, location, lang, tone, selectedAchievements, selectedReferences],
  )

  const letterContent = useMemo(() => generateCoverLetter(config), [config])
  const pitchContent = useMemo(() => generateShortPitch(config), [config])

  const toggleAchievement = (id: string) => {
    setSelectedAchievements((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const toggleReference = (id: string) => {
    setSelectedReferences((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const handleDownload = () => {
    const filename = `lettre-motivation-${effectiveTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.txt`
    downloadText(filename, letterContent)
  }

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      {/* Configuration Column */}
      <div className="space-y-6 lg:col-span-5">
        <Panel title="1. Paramètres de la Candidature">
          {/* Sector choice */}
          <div>
            <label className="text-[12px] font-semibold text-muted-foreground block mb-1.5">Secteur d'activité</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  setSector("tech")
                  const firstTech = allRoles.find((r) => r.sector === "tech")
                  if (firstTech) setSelectedRoleId(firstTech.id)
                }}
                className={cn(
                  "flex items-center justify-center gap-1.5 rounded-xl border p-2.5 text-[12.5px] font-medium transition-colors",
                  sector === "tech"
                    ? "border-blue-500/50 bg-blue-500/15 text-blue-400 font-semibold"
                    : "border-line bg-surface text-muted-foreground hover:bg-surface-2 hover:text-foreground",
                )}
              >
                <Building2 className="size-4" aria-hidden /> Entreprise Tech
              </button>

              <button
                type="button"
                onClick={() => {
                  setSector("ngo")
                  const firstNgo = allRoles.find((r) => r.sector === "ngo")
                  if (firstNgo) setSelectedRoleId(firstNgo.id)
                }}
                className={cn(
                  "flex items-center justify-center gap-1.5 rounded-xl border p-2.5 text-[12.5px] font-medium transition-colors",
                  sector === "ngo"
                    ? "border-emerald-500/50 bg-emerald-500/15 text-emerald-400 font-semibold"
                    : "border-line bg-surface text-muted-foreground hover:bg-surface-2 hover:text-foreground",
                )}
              >
                <HeartHandshake className="size-4" aria-hidden /> ONG & Humanitaire
              </button>
            </div>
          </div>

          {/* Target Role Selector */}
          <div>
            <label className="text-[12px] font-semibold text-muted-foreground block mb-1.5">Poste cible ({rolesInSector.length} disponibles)</label>
            <select
              value={selectedRoleId}
              onChange={(e) => setSelectedRoleId(e.target.value)}
              className="w-full rounded-xl border border-line-strong bg-background p-2.5 text-[13px] outline-none focus:border-accent"
            >
              {rolesInSector.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.title}
                </option>
              ))}
            </select>
          </div>

          {/* Custom title override if needed */}
          <Field label="Titre personnalisé (facultatif)" hint="Remplace l'intitulé si l'offre a un titre spécifique">
            <TextInput
              placeholder="Ex. : Senior IMO Specialist, Lead Fullstack..."
              value={customRoleTitle}
              onChange={(e) => setCustomRoleTitle(e.target.value)}
            />
          </Field>

          {/* Organization Name & Location */}
          <div className="grid grid-cols-2 gap-3">
            <Field label="Organisation / Entreprise">
              <TextInput
                placeholder="Ex. : OCHA, UNICEF, Aumsoft..."
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </Field>

            <Field label="Ville / Lieu">
              <TextInput
                placeholder="Ex. : Bukavu, Kinshasa, Remote..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </Field>
          </div>

          {/* Language & Tone */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div>
              <label className="text-[12px] font-semibold text-muted-foreground block mb-1.5">Langue</label>
              <div className="flex rounded-xl border border-line p-1">
                <button
                  type="button"
                  onClick={() => setLang("fr")}
                  className={cn("flex-1 rounded-lg py-1 text-[12px] font-medium transition-colors", lang === "fr" ? "bg-accent text-accent-foreground font-semibold" : "text-muted-foreground")}
                >
                  Français
                </button>
                <button
                  type="button"
                  onClick={() => setLang("en")}
                  className={cn("flex-1 rounded-lg py-1 text-[12px] font-medium transition-colors", lang === "en" ? "bg-accent text-accent-foreground font-semibold" : "text-muted-foreground")}
                >
                  English
                </button>
              </div>
            </div>

            <div>
              <label className="text-[12px] font-semibold text-muted-foreground block mb-1.5">Tonalité</label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value as LetterTone)}
                className="w-full rounded-xl border border-line-strong bg-background p-1.5 text-[12px] outline-none focus:border-accent"
              >
                <option value="institutionnel">Institutionnel (ONU, Bailleurs)</option>
                <option value="startup">Dynamique (Startups, Agiles)</option>
                <option value="technique">Rigoureux (ESN, DSI)</option>
              </select>
            </div>
          </div>
        </Panel>

        {/* Achievements to highlight */}
        <Panel title="2. Réalisations à mettre en avant">
          <p className="text-[11.5px] text-subtle-foreground mb-2">Cochez les accomplissements clés à insérer sous forme de puces percutantes :</p>
          <div className="space-y-2">
            {ACHIEVEMENTS_OPTIONS.map((item) => {
              const active = selectedAchievements.includes(item.id)
              return (
                <label
                  key={item.id}
                  className={cn(
                    "flex items-start gap-2.5 rounded-xl border p-2.5 text-[12px] cursor-pointer transition-colors",
                    active ? "border-accent/40 bg-accent/5 text-foreground" : "border-line bg-surface text-muted-foreground hover:bg-surface-2",
                  )}
                >
                  <input
                    type="checkbox"
                    checked={active}
                    onChange={() => toggleAchievement(item.id)}
                    className="mt-0.5 rounded accent-accent"
                  />
                  <span>{item.label}</span>
                </label>
              )
            })}
          </div>
        </Panel>

        {/* References to cite */}
        <Panel title="3. Références professionnelles à citer">
          <p className="text-[11.5px] text-subtle-foreground mb-2">Sélectionnez les répondants mentionnés en fin de lettre :</p>
          <div className="space-y-2">
            {PORTAL_REFERENCES.map((r) => {
              const active = selectedReferences.includes(r.id)
              return (
                <label
                  key={r.id}
                  className={cn(
                    "flex items-center justify-between rounded-xl border p-2 text-[12px] cursor-pointer transition-colors",
                    active ? "border-emerald-500/40 bg-emerald-500/5 text-foreground" : "border-line bg-surface text-muted-foreground hover:bg-surface-2",
                  )}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={active}
                      onChange={() => toggleReference(r.id)}
                      className="rounded accent-emerald-500"
                    />
                    <span className="font-medium">{r.name}</span>
                    <span className="text-[11px] text-subtle-foreground">({r.organization})</span>
                  </div>
                  <span className="font-mono text-[10px] text-subtle-foreground">{r.phones[0]}</span>
                </label>
              )
            })}
          </div>
        </Panel>
      </div>

      {/* Output / Document Column */}
      <div className="space-y-4 lg:col-span-7">
        {/* Output Controls & Tab bar */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center rounded-2xl border border-line bg-surface p-1">
            <button
              type="button"
              onClick={() => setTab("letter")}
              className={cn(
                "flex items-center gap-1.5 rounded-xl px-4 py-1.5 text-[12.5px] font-semibold transition-colors",
                tab === "letter" ? "bg-accent text-accent-foreground shadow-sm" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <FileText className="size-3.5" aria-hidden /> Lettre Complète
            </button>
            <button
              type="button"
              onClick={() => setTab("pitch")}
              className={cn(
                "flex items-center gap-1.5 rounded-xl px-4 py-1.5 text-[12.5px] font-semibold transition-colors",
                tab === "pitch" ? "bg-accent text-accent-foreground shadow-sm" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <MessageSquare className="size-3.5" aria-hidden /> Pitch Court (LinkedIn / E-mail)
            </button>
          </div>

          <div className="flex items-center gap-2">
            <CopyButton
              text={tab === "letter" ? letterContent : pitchContent}
              label="Copier le texte"
              copiedLabel="Texte copié !"
              size="md"
            />
            {tab === "letter" && (
              <Button size="md" onClick={handleDownload}>
                <Download className="size-3.5" aria-hidden /> Télécharger (.txt)
              </Button>
            )}
          </div>
        </div>

        {/* Document Frame */}
        <div className="card rounded-3xl p-6 sm:p-8 bg-surface border border-line shadow-sm relative">
          <div className="flex items-center justify-between border-b border-line pb-4 mb-6">
            <div className="flex items-center gap-2.5">
              <span className="grid size-8 place-items-center rounded-xl bg-foreground font-mono text-[12px] font-bold text-background">
                FM
              </span>
              <div>
                <p className="text-[13px] font-bold text-foreground">Félicien Mukamba Kazindja</p>
                <p className="text-[11px] text-muted-foreground">Candidature : {effectiveTitle}</p>
              </div>
            </div>

            <Link
              href={`/portal/cv?profile=${currentRole.recommendedProfileId}`}
              className="inline-flex items-center gap-1 text-[12px] font-medium text-accent hover:underline"
            >
              <span>Voir le CV associé</span>
              <ArrowUpRight className="size-3" aria-hidden />
            </Link>
          </div>

          {/* Formatted Text Content */}
          <pre className="whitespace-pre-wrap font-sans text-[13.5px] leading-relaxed text-foreground select-text selection:bg-accent/30">
            {tab === "letter" ? letterContent : pitchContent}
          </pre>
        </div>
      </div>
    </div>
  )
}
