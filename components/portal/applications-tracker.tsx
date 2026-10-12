"use client"

import { useEffect, useId, useMemo, useState } from "react"
import Link from "next/link"
import {
  AlertCircle,
  ArrowUpRight,
  Briefcase,
  Building2,
  Calendar,
  Check,
  ChevronRight,
  Clock,
  Download,
  Edit2,
  ExternalLink,
  FileText,
  Filter,
  HeartHandshake,
  MapPin,
  MessageSquare,
  Plus,
  RotateCcw,
  Search,
  Sparkles,
  Trash2,
  Upload,
  UserCheck,
  X,
} from "lucide-react"
import { Button, CopyButton, Field, Panel, TextInput } from "@/components/kit/controls"
import { downloadText } from "@/lib/kit/download"
import { PORTAL_REFERENCES } from "@/lib/portal/directory"
import { cvProfiles } from "@/lib/portal/profiles"
import { TARGET_CATEGORIES } from "@/lib/portal/roles"
import {
  INITIAL_APPLICATIONS,
  STATUS_META,
  type ApplicationEntry,
  type ApplicationStatus,
} from "@/lib/portal/tracker"
import { cn } from "@/lib/utils"

const STORAGE_KEY = "fm-portal:applications"

const ALL_ROLES = TARGET_CATEGORIES.flatMap((c) => c.roles)

export function ApplicationsTracker({ initialRoleTitle }: { initialRoleTitle?: string }) {
  const [applications, setApplications] = useState<ApplicationEntry[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Filters
  const [selectedSector, setSelectedSector] = useState<"all" | "tech" | "ngo">("all")
  const [selectedStatus, setSelectedStatus] = useState<"all" | ApplicationStatus>("all")
  const [search, setSearch] = useState("")
  const [viewMode, setViewMode] = useState<"kanban" | "table">("kanban")

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingApp, setEditingApp] = useState<ApplicationEntry | null>(null)

  // Form Fields
  const [formRoleTitle, setFormRoleTitle] = useState("")
  const [formCompany, setFormCompany] = useState("")
  const [formSector, setFormSector] = useState<"tech" | "ngo">("tech")
  const [formLocation, setFormLocation] = useState("Bukavu / Télétravail")
  const [formStatus, setFormStatus] = useState<ApplicationStatus>("draft")
  const [formDateApplied, setFormDateApplied] = useState("")
  const [formCvProfileId, setFormCvProfileId] = useState("bigtech-swe")
  const [formOfferUrl, setFormOfferUrl] = useState("")
  const [formReferences, setFormReferences] = useState<string[]>([])
  const [formNotes, setFormNotes] = useState("")

  // Load from LocalStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as ApplicationEntry[]
        setApplications(parsed)
      } else {
        setApplications(INITIAL_APPLICATIONS)
      }
    } catch {
      setApplications(INITIAL_APPLICATIONS)
    } finally {
      setIsLoaded(true)
    }
  }, [])

  // Persist to LocalStorage
  const saveApplications = (updated: ApplicationEntry[]) => {
    setApplications(updated)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    } catch (e) {
      console.error("Erreur sauvegarde candidatures:", e)
    }
  }

  // Pre-fill modal if initialRoleTitle is passed
  useEffect(() => {
    if (initialRoleTitle && isLoaded) {
      const matchRole = ALL_ROLES.find(
        (r) => r.title.toLowerCase().includes(initialRoleTitle.toLowerCase()) || r.titleEn.toLowerCase().includes(initialRoleTitle.toLowerCase()),
      )
      if (matchRole) {
        openNewModalWithRole(matchRole.title, matchRole.sector, matchRole.recommendedProfileId)
      }
    }
  }, [initialRoleTitle, isLoaded])

  const openNewModalWithRole = (title = "", sector: "tech" | "ngo" = "tech", profileId = "bigtech-swe") => {
    setEditingApp(null)
    setFormRoleTitle(title)
    setFormCompany("")
    setFormSector(sector)
    setFormLocation(sector === "ngo" ? "Bukavu / Goma" : "Télétravail / Bukavu")
    setFormStatus("draft")
    setFormDateApplied(new Date().toISOString().slice(0, 10))
    setFormCvProfileId(profileId)
    setFormOfferUrl("")
    setFormReferences([])
    setFormNotes("")
    setIsModalOpen(true)
  }

  const openEditModal = (app: ApplicationEntry) => {
    setEditingApp(app)
    setFormRoleTitle(app.roleTitle)
    setFormCompany(app.company)
    setFormSector(app.sector)
    setFormLocation(app.location)
    setFormStatus(app.status)
    setFormDateApplied(app.dateApplied || "")
    setFormCvProfileId(app.cvProfileId)
    setFormOfferUrl(app.offerUrl || "")
    setFormReferences(app.referencesProvided || [])
    setFormNotes(app.notes || "")
    setIsModalOpen(true)
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formRoleTitle.trim() || !formCompany.trim()) return

    if (editingApp) {
      // Update
      const updated = applications.map((item) =>
        item.id === editingApp.id
          ? {
              ...item,
              roleTitle: formRoleTitle.trim(),
              company: formCompany.trim(),
              sector: formSector,
              location: formLocation.trim(),
              status: formStatus,
              dateApplied: formDateApplied || undefined,
              cvProfileId: formCvProfileId,
              offerUrl: formOfferUrl.trim() || undefined,
              referencesProvided: formReferences,
              notes: formNotes.trim() || undefined,
              updatedAt: Date.now(),
            }
          : item,
      )
      saveApplications(updated)
    } else {
      // Create
      const newEntry: ApplicationEntry = {
        id: `app-${Date.now()}`,
        roleTitle: formRoleTitle.trim(),
        company: formCompany.trim(),
        sector: formSector,
        location: formLocation.trim(),
        status: formStatus,
        dateApplied: formDateApplied || undefined,
        cvProfileId: formCvProfileId,
        offerUrl: formOfferUrl.trim() || undefined,
        referencesProvided: formReferences,
        notes: formNotes.trim() || undefined,
        updatedAt: Date.now(),
      }
      saveApplications([newEntry, ...applications])
    }
    setIsModalOpen(false)
  }

  const handleDelete = (id: string) => {
    if (confirm("Supprimer cette candidature de votre suivi ?")) {
      const updated = applications.filter((a) => a.id !== id)
      saveApplications(updated)
    }
  }

  const handleStatusChange = (id: string, newStatus: ApplicationStatus) => {
    const updated = applications.map((a) =>
      a.id === id ? { ...a, status: newStatus, updatedAt: Date.now() } : a,
    )
    saveApplications(updated)
  }

  const handleResetToDefault = () => {
    if (confirm("Réinitialiser le suivi avec les candidatures de démonstration ?")) {
      saveApplications(INITIAL_APPLICATIONS)
    }
  }

  const handleExportJson = () => {
    const jsonStr = JSON.stringify(applications, null, 2)
    downloadText(`candidatures-felicien-mukamba-${new Date().toISOString().slice(0, 10)}.json`, jsonStr)
  }

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string)
        if (Array.isArray(parsed)) {
          saveApplications(parsed)
          alert(`${parsed.length} candidatures importées avec succès !`)
        }
      } catch {
        alert("Fichier JSON invalide.")
      }
    }
    reader.readAsText(file)
  }

  // Filtered List
  const filteredApps = useMemo(() => {
    const q = search.trim().toLowerCase()
    return applications.filter((app) => {
      const matchSector = selectedSector === "all" || app.sector === selectedSector
      const matchStatus = selectedStatus === "all" || app.status === selectedStatus
      const matchSearch =
        !q ||
        app.roleTitle.toLowerCase().includes(q) ||
        app.company.toLowerCase().includes(q) ||
        app.location.toLowerCase().includes(q) ||
        (app.notes && app.notes.toLowerCase().includes(q))
      return matchSector && matchStatus && matchSearch
    })
  }, [applications, selectedSector, selectedStatus, search])

  // Stats
  const stats = useMemo(() => {
    const total = applications.length
    const drafts = applications.filter((a) => a.status === "draft").length
    const inProgress = applications.filter((a) => a.status === "applied").length
    const interviews = applications.filter((a) => a.status === "interview").length
    const offers = applications.filter((a) => a.status === "offer").length
    return { total, drafts, inProgress, interviews, offers }
  }, [applications])

  const statuses: ApplicationStatus[] = ["draft", "applied", "interview", "offer", "rejected"]

  return (
    <div className="space-y-8">
      {/* Metrics Banner */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        <div className="card rounded-2xl p-4 border border-line bg-surface">
          <p className="text-[11.5px] font-medium text-muted-foreground">Total suivies</p>
          <p className="mt-1 text-2xl font-bold tracking-tight text-foreground">{stats.total}</p>
        </div>
        <div className="card rounded-2xl p-4 border border-line bg-surface">
          <p className="text-[11.5px] font-medium text-muted-foreground">À postuler</p>
          <p className="mt-1 text-2xl font-bold tracking-tight text-subtle-foreground">{stats.drafts}</p>
        </div>
        <div className="card rounded-2xl p-4 border border-line bg-surface">
          <p className="text-[11.5px] font-medium text-blue-400">Envoyées</p>
          <p className="mt-1 text-2xl font-bold tracking-tight text-blue-400">{stats.inProgress}</p>
        </div>
        <div className="card rounded-2xl p-4 border border-line bg-surface">
          <p className="text-[11.5px] font-medium text-amber-400">Entretiens en cours</p>
          <p className="mt-1 text-2xl font-bold tracking-tight text-amber-400">{stats.interviews}</p>
        </div>
        <div className="card rounded-2xl p-4 border border-line bg-surface col-span-2 sm:col-span-1">
          <p className="text-[11.5px] font-medium text-emerald-400">Offres reçues</p>
          <p className="mt-1 text-2xl font-bold tracking-tight text-emerald-400">{stats.offers}</p>
        </div>
      </div>

      {/* Control Toolbar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {/* Sector Filter */}
          <div className="flex rounded-xl border border-line bg-surface p-1">
            <button
              type="button"
              onClick={() => setSelectedSector("all")}
              className={cn(
                "rounded-lg px-3 py-1 text-[12px] font-medium transition-colors",
                selectedSector === "all" ? "bg-accent text-accent-foreground font-semibold" : "text-muted-foreground hover:text-foreground",
              )}
            >
              Tous
            </button>
            <button
              type="button"
              onClick={() => setSelectedSector("tech")}
              className={cn(
                "rounded-lg px-3 py-1 text-[12px] font-medium transition-colors",
                selectedSector === "tech" ? "bg-accent text-accent-foreground font-semibold" : "text-muted-foreground hover:text-foreground",
              )}
            >
              Tech
            </button>
            <button
              type="button"
              onClick={() => setSelectedSector("ngo")}
              className={cn(
                "rounded-lg px-3 py-1 text-[12px] font-medium transition-colors",
                selectedSector === "ngo" ? "bg-accent text-accent-foreground font-semibold" : "text-muted-foreground hover:text-foreground",
              )}
            >
              ONG
            </button>
          </div>

          {/* View Mode */}
          <div className="flex rounded-xl border border-line bg-surface p-1">
            <button
              type="button"
              onClick={() => setViewMode("kanban")}
              className={cn(
                "rounded-lg px-3 py-1 text-[12px] font-medium transition-colors",
                viewMode === "kanban" ? "bg-foreground text-background font-semibold" : "text-muted-foreground hover:text-foreground",
              )}
            >
              Kanban
            </button>
            <button
              type="button"
              onClick={() => setViewMode("table")}
              className={cn(
                "rounded-lg px-3 py-1 text-[12px] font-medium transition-colors",
                viewMode === "table" ? "bg-foreground text-background font-semibold" : "text-muted-foreground hover:text-foreground",
              )}
            >
              Tableau
            </button>
          </div>

          {/* Search */}
          <div className="relative min-w-[200px]">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-subtle-foreground" />
            <input
              type="text"
              placeholder="Poste, entreprise, ville..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-full border border-line bg-surface py-1 pl-8 pr-3 text-[12px] outline-none focus:border-accent"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Button size="md" onClick={() => openNewModalWithRole()}>
            <Plus className="size-4" aria-hidden /> Nouvelle candidature
          </Button>

          {/* Tools Menu */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleExportJson}
              title="Exporter les données (JSON)"
              className="rounded-xl border border-line bg-surface p-2 text-muted-foreground hover:bg-surface-2 hover:text-foreground"
            >
              <Download className="size-4" />
            </button>
            <label
              title="Importer un backup JSON"
              className="rounded-xl border border-line bg-surface p-2 text-muted-foreground hover:bg-surface-2 hover:text-foreground cursor-pointer"
            >
              <Upload className="size-4" />
              <input type="file" accept=".json" onChange={handleImportJson} className="hidden" />
            </label>
            <button
              type="button"
              onClick={handleResetToDefault}
              title="Réinitialiser"
              className="rounded-xl border border-line bg-surface p-2 text-muted-foreground hover:bg-surface-2 hover:text-foreground"
            >
              <RotateCcw className="size-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main View: Kanban */}
      {viewMode === "kanban" ? (
        <div className="grid gap-4 lg:grid-cols-5">
          {statuses.map((status) => {
            const meta = STATUS_META[status]
            const itemsInStatus = filteredApps.filter((a) => a.status === status)

            return (
              <div
                key={status}
                className="flex flex-col rounded-2xl border border-line bg-surface/50 p-3 min-h-[480px]"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between border-b border-line pb-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className={cn("size-2 rounded-full", meta.dotClass)} />
                    <h3 className="text-[12.5px] font-semibold text-foreground">{meta.label}</h3>
                  </div>
                  <span className="font-mono text-[11px] font-semibold rounded-full bg-surface-2 px-2 py-0.5 text-muted-foreground">
                    {itemsInStatus.length}
                  </span>
                </div>

                {/* Cards Container */}
                <div className="space-y-3 flex-1 overflow-y-auto">
                  {itemsInStatus.map((app) => (
                    <ApplicationCard
                      key={app.id}
                      app={app}
                      onEdit={() => openEditModal(app)}
                      onDelete={() => handleDelete(app.id)}
                      onStatusChange={(newStatus) => handleStatusChange(app.id, newStatus)}
                    />
                  ))}

                  {itemsInStatus.length === 0 && (
                    <div className="flex h-32 items-center justify-center rounded-xl border border-dashed border-line text-center p-3">
                      <p className="text-[11.5px] text-subtle-foreground">Aucune candidature</p>
                    </div>
                  )}
                </div>

                {/* Quick Add In Column */}
                <button
                  type="button"
                  onClick={() => {
                    openNewModalWithRole()
                    setFormStatus(status)
                  }}
                  className="mt-3 flex w-full items-center justify-center gap-1 rounded-xl border border-dashed border-line py-2 text-[11.5px] font-medium text-muted-foreground hover:border-accent hover:text-accent transition-colors"
                >
                  <Plus className="size-3" /> Ajouter ici
                </button>
              </div>
            )
          })}
        </div>
      ) : (
        /* Table View */
        <div className="card rounded-2xl overflow-hidden border border-line bg-surface">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[12.5px]">
              <thead className="border-b border-line bg-surface-2/60 font-medium text-muted-foreground">
                <tr>
                  <th className="py-3 px-4">Poste & Entreprise</th>
                  <th className="py-3 px-4">Secteur</th>
                  <th className="py-3 px-4">Statut</th>
                  <th className="py-3 px-4">Lieu</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Profil CV</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {filteredApps.map((app) => {
                  const meta = STATUS_META[app.status]
                  const isTech = app.sector === "tech"
                  return (
                    <tr key={app.id} className="hover:bg-surface-2/40 transition-colors">
                      <td className="py-3 px-4">
                        <p className="font-semibold text-foreground">{app.roleTitle}</p>
                        <p className="text-[11.5px] text-muted-foreground">{app.company}</p>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={cn(
                            "rounded-md border px-2 py-0.5 text-[10.5px] font-semibold",
                            isTech ? "border-blue-500/30 bg-blue-500/10 text-blue-400" : "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
                          )}
                        >
                          {isTech ? "Tech" : "ONG"}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <select
                          value={app.status}
                          onChange={(e) => handleStatusChange(app.id, e.target.value as ApplicationStatus)}
                          className={cn(
                            "rounded-lg border px-2 py-1 text-[11px] font-semibold outline-none",
                            meta.badgeClass,
                          )}
                        >
                          {statuses.map((s) => (
                            <option key={s} value={s}>
                              {STATUS_META[s].label}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">{app.location}</td>
                      <td className="py-3 px-4 font-mono text-[11.5px] text-muted-foreground">
                        {app.dateApplied || "—"}
                      </td>
                      <td className="py-3 px-4 font-mono text-[11px] text-accent">
                        {app.cvProfileId}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Link
                            href={`/portal/lettre?role=${app.roleTitle}`}
                            className="rounded-lg p-1.5 text-muted-foreground hover:bg-surface-2 hover:text-foreground"
                            title="Rédiger lettre"
                          >
                            <FileText className="size-3.5" />
                          </Link>
                          <Link
                            href={`/portal/cv?profile=${app.cvProfileId}`}
                            className="rounded-lg p-1.5 text-accent hover:bg-surface-2"
                            title="Ouvrir CV"
                          >
                            <Sparkles className="size-3.5" />
                          </Link>
                          <button
                            type="button"
                            onClick={() => openEditModal(app)}
                            className="rounded-lg p-1.5 text-muted-foreground hover:bg-surface-2 hover:text-foreground"
                            title="Modifier"
                          >
                            <Edit2 className="size-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(app.id)}
                            className="rounded-lg p-1.5 text-rose-400 hover:bg-surface-2"
                            title="Supprimer"
                          >
                            <Trash2 className="size-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal Add/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="card w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl border border-line bg-surface p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">
                  {editingApp ? "Modifier la candidature" : "Nouvelle candidature"}
                </h3>
                <p className="text-[12px] text-muted-foreground">
                  Suivi de votre pipeline de recrutement Tech et ONG
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="rounded-full p-2 text-muted-foreground hover:bg-surface-2 hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="mt-6 space-y-4">
              {/* Sector */}
              <div>
                <label className="text-[12px] font-semibold text-muted-foreground block mb-1">Secteur</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormSector("tech")}
                    className={cn(
                      "flex items-center justify-center gap-1.5 rounded-xl border p-2 text-[12px] font-semibold transition-colors",
                      formSector === "tech"
                        ? "border-blue-500/50 bg-blue-500/15 text-blue-400"
                        : "border-line bg-surface-2 text-muted-foreground",
                    )}
                  >
                    <Building2 className="size-3.5" /> Entreprise Tech
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormSector("ngo")}
                    className={cn(
                      "flex items-center justify-center gap-1.5 rounded-xl border p-2 text-[12px] font-semibold transition-colors",
                      formSector === "ngo"
                        ? "border-emerald-500/50 bg-emerald-500/15 text-emerald-400"
                        : "border-line bg-surface-2 text-muted-foreground",
                    )}
                  >
                    <HeartHandshake className="size-3.5" /> ONG & Humanitaire
                  </button>
                </div>
              </div>

              {/* Quick Template Picker */}
              <div>
                <label className="text-[12px] font-semibold text-muted-foreground block mb-1">
                  Pré-remplir depuis un poste cible
                </label>
                <select
                  onChange={(e) => {
                    const found = ALL_ROLES.find((r) => r.id === e.target.value)
                    if (found) {
                      setFormRoleTitle(found.title)
                      setFormSector(found.sector)
                      setFormCvProfileId(found.recommendedProfileId)
                    }
                  }}
                  defaultValue=""
                  className="w-full rounded-xl border border-line-strong bg-background p-2 text-[12px] outline-none"
                >
                  <option value="" disabled>
                    -- Choisir un modèle de poste ({ALL_ROLES.length}) --
                  </option>
                  {ALL_ROLES.map((r) => (
                    <option key={r.id} value={r.id}>
                      [{r.sector.toUpperCase()}] {r.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Title & Company */}
              <div className="grid grid-cols-2 gap-3">
                <Field label="Intitulé du poste *">
                  <TextInput
                    required
                    placeholder="Ex. : Senior Fullstack Engineer"
                    value={formRoleTitle}
                    onChange={(e) => setFormRoleTitle(e.target.value)}
                  />
                </Field>
                <Field label="Organisation / Entreprise *">
                  <TextInput
                    required
                    placeholder="Ex. : OCHA, Aumsoft, UNICEF..."
                    value={formCompany}
                    onChange={(e) => setFormCompany(e.target.value)}
                  />
                </Field>
              </div>

              {/* Location & Status */}
              <div className="grid grid-cols-2 gap-3">
                <Field label="Lieu">
                  <TextInput
                    placeholder="Ex. : Bukavu, Kinshasa, Remote..."
                    value={formLocation}
                    onChange={(e) => setFormLocation(e.target.value)}
                  />
                </Field>

                <div>
                  <label className="text-[12px] font-semibold text-muted-foreground block mb-1">Étape du processus</label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as ApplicationStatus)}
                    className="w-full rounded-xl border border-line-strong bg-background p-2 text-[12px] outline-none"
                  >
                    {statuses.map((s) => (
                      <option key={s} value={s}>
                        {STATUS_META[s].label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Date applied & CV Profile */}
              <div className="grid grid-cols-2 gap-3">
                <Field label="Date d'envoi">
                  <TextInput
                    type="date"
                    value={formDateApplied}
                    onChange={(e) => setFormDateApplied(e.target.value)}
                  />
                </Field>

                <div>
                  <label className="text-[12px] font-semibold text-muted-foreground block mb-1">Profil CV associé</label>
                  <select
                    value={formCvProfileId}
                    onChange={(e) => setFormCvProfileId(e.target.value)}
                    className="w-full rounded-xl border border-line-strong bg-background p-2 text-[12px] outline-none"
                  >
                    {cvProfiles.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} ({p.target})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Link / URL */}
              <Field label="Lien de l'offre (facultatif)">
                <TextInput
                  type="url"
                  placeholder="https://..."
                  value={formOfferUrl}
                  onChange={(e) => setFormOfferUrl(e.target.value)}
                />
              </Field>

              {/* References checkboxes */}
              <div>
                <label className="text-[12px] font-semibold text-muted-foreground block mb-1">
                  Références transmises dans le dossier
                </label>
                <div className="grid grid-cols-2 gap-1.5 max-h-32 overflow-y-auto rounded-xl border border-line p-2">
                  {PORTAL_REFERENCES.map((ref) => {
                    const checked = formReferences.includes(ref.name)
                    return (
                      <label key={ref.id} className="flex items-center gap-2 text-[11.5px] cursor-pointer">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => {
                            if (checked) {
                              setFormReferences(formReferences.filter((n) => n !== ref.name))
                            } else {
                              setFormReferences([...formReferences, ref.name])
                            }
                          }}
                          className="rounded accent-accent"
                        />
                        <span className="truncate">{ref.name} ({ref.organization})</span>
                      </label>
                    )
                  })}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="text-[12px] font-semibold text-muted-foreground block mb-1">
                  Notes & Points clés pour l'entretien
                </label>
                <textarea
                  rows={3}
                  placeholder="Questions prévues, contact RH, points forts Ehtools/Java à rappeler..."
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  className="w-full rounded-xl border border-line-strong bg-background p-2 text-[12px] outline-none focus:border-accent"
                />
              </div>

              {/* Form Buttons */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-line">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl border border-line px-4 py-2 text-[12.5px] font-medium text-muted-foreground hover:bg-surface-2"
                >
                  Annuler
                </button>
                <Button size="md" type="submit">
                  {editingApp ? "Enregistrer les modifications" : "Ajouter la candidature"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

function ApplicationCard({
  app,
  onEdit,
  onDelete,
  onStatusChange,
}: {
  app: ApplicationEntry
  onEdit: () => void
  onDelete: () => void
  onStatusChange: (status: ApplicationStatus) => void
}) {
  const isTech = app.sector === "tech"
  const meta = STATUS_META[app.status]

  return (
    <article className="group rounded-xl border border-line bg-surface p-3.5 shadow-sm transition hover:border-line-strong hover:shadow-md">
      {/* Top Header */}
      <div className="flex items-start justify-between gap-2">
        <span
          className={cn(
            "rounded-md border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
            isTech ? "border-blue-500/30 bg-blue-500/10 text-blue-400" : "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
          )}
        >
          {isTech ? "Tech" : "ONG"}
        </span>

        <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100">
          <button
            type="button"
            onClick={onEdit}
            className="rounded p-1 text-muted-foreground hover:bg-surface-2 hover:text-foreground"
            title="Modifier"
          >
            <Edit2 className="size-3" />
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="rounded p-1 text-muted-foreground hover:bg-surface-2 hover:text-rose-400"
            title="Supprimer"
          >
            <Trash2 className="size-3" />
          </button>
        </div>
      </div>

      {/* Role & Company */}
      <div className="mt-2">
        <h4 className="text-[13.5px] font-bold leading-snug text-foreground">{app.roleTitle}</h4>
        <p className="mt-0.5 text-[12px] font-medium text-muted-foreground">{app.company}</p>
      </div>

      {/* Location & Date */}
      <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-subtle-foreground">
        <span className="flex items-center gap-1">
          <MapPin className="size-3" /> {app.location}
        </span>
        {app.dateApplied && (
          <span className="flex items-center gap-1 font-mono">
            <Calendar className="size-3" /> {app.dateApplied}
          </span>
        )}
      </div>

      {/* Notes preview */}
      {app.notes && (
        <p className="mt-2 text-[11.5px] line-clamp-2 text-muted-foreground bg-surface-2/50 rounded-lg p-1.5">
          {app.notes}
        </p>
      )}

      {/* References badge */}
      {app.referencesProvided && app.referencesProvided.length > 0 && (
        <div className="mt-2 flex items-center gap-1 text-[10.5px] text-emerald-400">
          <UserCheck className="size-3" />
          <span>{app.referencesProvided.length} réf. citée(s)</span>
        </div>
      )}

      {/* Footer Quick Links & Stage Switcher */}
      <div className="mt-3 pt-2.5 border-t border-line/70 flex items-center justify-between gap-1">
        <div className="flex items-center gap-1">
          <Link
            href={`/portal/lettre?role=${app.roleTitle}`}
            className="rounded-lg p-1 text-muted-foreground hover:bg-surface-2 hover:text-foreground"
            title="Lettre & Pitch"
          >
            <FileText className="size-3.5" />
          </Link>
          <Link
            href={`/portal/cv?profile=${app.cvProfileId}`}
            className="rounded-lg p-1 text-accent hover:bg-surface-2"
            title="CV adapté"
          >
            <Sparkles className="size-3.5" />
          </Link>
          {app.offerUrl && (
            <a
              href={app.offerUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg p-1 text-muted-foreground hover:bg-surface-2 hover:text-foreground"
              title="Lien vers l'annonce"
            >
              <ExternalLink className="size-3.5" />
            </a>
          )}
        </div>

        {/* Status Dropdown */}
        <select
          value={app.status}
          onChange={(e) => onStatusChange(e.target.value as ApplicationStatus)}
          className="rounded-md border border-line bg-surface px-1.5 py-0.5 text-[10.5px] font-semibold text-muted-foreground outline-none hover:text-foreground"
        >
          <option value="draft">Brouillon</option>
          <option value="applied">Envoyée</option>
          <option value="interview">Entretien</option>
          <option value="offer">Offre</option>
          <option value="rejected">Sans suite</option>
        </select>
      </div>
    </article>
  )
}
