"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { ArrowDown, ArrowUp, Download, FileJson, FileText, LoaderCircle, Plus, RotateCcw, Save, Sparkles, Trash2, Upload } from "lucide-react"
import { Button, ColorField, CopyButton, Field, Panel, Segmented, Select, TextArea, TextInput, Toggle, ToggleRow } from "@/components/kit/controls"
import { ItemList } from "@/components/portal/item-list"
import { applyProfile } from "@/lib/cv/apply"
import { matchOffer } from "@/lib/cv/match"
import { cvToText } from "@/lib/cv/text"
import type { CvDoc, CvTemplate, SectionId } from "@/lib/cv/types"
import { localeMeta, locales, type Locale } from "@/lib/i18n"
import { downloadBlob, downloadText, slugify } from "@/lib/kit/download"
import type { CvProfile } from "@/lib/portal/profiles"
import { cn } from "@/lib/utils"

const DRAFT_KEY = "fm-cv-studio:draft"
const VERSIONS_KEY = "fm-cv-studio:versions"

type Draft = { profileId: string; lang: Locale; doc: CvDoc }
type Version = Draft & { id: string; name: string; savedAt: number }
type Tab = "design" | "content" | "offer" | "versions"

const SECTION_NAMES: Record<SectionId, string> = {
  summary: "Profil / résumé",
  experience: "Expériences",
  projects: "Projets",
  skills: "Compétences",
  education: "Formation",
  certifications: "Certifications",
  languages: "Langues",
  references: "Références",
}

const ACCENTS = ["#5a4bd6", "#1d4ed8", "#0e7490", "#0f766e", "#15803d", "#b45309", "#e4572e", "#be123c", "#111827"]

function readStorage<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : null
  } catch {
    return null
  }
}

function writeStorage(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* storage full or blocked: the studio still works, it just won't persist */
  }
}

/** Renders the PDF in the background and hands back a blob URL for the preview frame. */
function usePdfPreview(doc: CvDoc) {
  const [url, setUrl] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const run = useRef(0)

  useEffect(() => {
    const id = ++run.current
    setBusy(true)
    const timer = setTimeout(async () => {
      try {
        const { renderCvDoc } = await import("@/components/cv-pdf")
        const blob = await renderCvDoc(doc)
        if (id !== run.current) return
        const next = URL.createObjectURL(blob)
        setUrl((prev) => {
          if (prev) setTimeout(() => URL.revokeObjectURL(prev), 2000)
          return next
        })
      } catch (error) {
        console.error(error)
      } finally {
        if (id === run.current) setBusy(false)
      }
    }, 450)
    return () => clearTimeout(timer)
  }, [doc])

  return { url, busy }
}

export function CvStudio({ profiles, initialProfileId }: { profiles: CvProfile[]; initialProfileId?: string }) {
  const [profileId, setProfileId] = useState(profiles[0].id)
  const [lang, setLang] = useState<Locale>(profiles[0].lang)
  const [doc, setDoc] = useState<CvDoc>(() => applyProfile(profiles[0], profiles[0].lang))
  const [tab, setTab] = useState<Tab>("design")
  const [versions, setVersions] = useState<Version[]>([])
  const [ready, setReady] = useState(false)
  const profile = profiles.find((p) => p.id === profileId) ?? profiles[0]
  const { url, busy } = usePdfPreview(doc)

  // Restore the last session, then autosave every change.
  useEffect(() => {
    const draft = readStorage<Draft>(DRAFT_KEY)
    const requested = initialProfileId && profiles.find((p) => p.id === initialProfileId)
    if (requested) {
      setProfileId(requested.id)
      setLang(requested.lang)
      setDoc(applyProfile(requested, requested.lang))
    } else if (draft?.doc?.version === 1) {
      setProfileId(draft.profileId)
      setLang(draft.lang)
      setDoc(draft.doc)
    }
    setVersions(readStorage<Version[]>(VERSIONS_KEY) ?? [])
    setReady(true)
    // Runs once on mount: the URL profile wins over the saved draft.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (ready) writeStorage(DRAFT_KEY, { profileId, lang, doc } satisfies Draft)
  }, [ready, profileId, lang, doc])

  const patch = useCallback((fn: (d: CvDoc) => void) => {
    setDoc((prev) => {
      const next = structuredClone(prev)
      fn(next)
      return next
    })
  }, [])

  function choose(nextProfileId: string, nextLang: Locale) {
    const target = profiles.find((p) => p.id === nextProfileId) ?? profiles[0]
    setProfileId(target.id)
    setLang(nextLang)
    setDoc(applyProfile(target, nextLang))
  }

  const fileName = `Felicien-Mukamba-CV-${slugify(profile.name)}-${lang.toUpperCase()}`

  async function downloadPdf() {
    const { renderCvDoc } = await import("@/components/cv-pdf")
    downloadBlob(await renderCvDoc(doc), `${fileName}.pdf`)
  }

  const profileOptions = profiles.map((p) => ({
    value: p.id,
    label: p.name,
    group: p.audience === "ngo" ? "ONG" : p.audience === "company" ? "Entreprises" : "Général",
  }))

  return (
    <div className="flex min-h-dvh flex-col">
      <div className="sticky top-14 z-30 border-b border-line bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-end gap-3 px-4 py-3 md:px-6">
          <div className="min-w-64 flex-1">
            <Field label="Profil / poste visé">
              <Select value={profileId} onChange={(v) => choose(v, profiles.find((p) => p.id === v)?.lang ?? lang)} options={profileOptions} />
            </Field>
          </div>
          <div>
            <span className="mb-1.5 block text-[12px] font-medium text-muted-foreground">Langue du CV</span>
            <Segmented label="Langue" value={lang} onChange={(l) => choose(profileId, l)} options={locales.map((l) => ({ value: l, label: localeMeta[l].short }))} />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => choose(profileId, lang)} title="Revenir au profil d'origine">
              <RotateCcw className="size-4" aria-hidden /> Réinitialiser
            </Button>
            <CopyButton size="md" text={() => cvToText(doc)} label="Copier en texte" copiedLabel="Copié" />
            <Button variant="primary" onClick={downloadPdf}>
              <Download className="size-4" aria-hidden /> Télécharger le PDF
            </Button>
          </div>
        </div>
        <p className="mx-auto max-w-[1600px] px-4 pb-3 text-[12px] text-muted-foreground md:px-6">
          <span className="font-medium text-foreground">{profile.target}</span> — {profile.description}
        </p>
      </div>

      <div className="mx-auto grid w-full max-w-[1600px] flex-1 gap-4 p-4 md:p-6 lg:grid-cols-[440px_1fr]">
        <div className="min-w-0 space-y-4">
          <div role="tablist" aria-label="Sections du studio" className="grid grid-cols-4 rounded-xl border border-line p-1">
            {(
              [
                ["design", "Design"],
                ["content", "Contenu"],
                ["offer", "Offre"],
                ["versions", "Versions"],
              ] as [Tab, string][]
            ).map(([id, label]) => (
              <button
                key={id}
                role="tab"
                aria-selected={tab === id}
                onClick={() => setTab(id)}
                className={cn("rounded-lg py-2 text-[13px] font-medium transition-colors", tab === id ? "bg-surface-2 text-foreground" : "text-muted-foreground hover:text-foreground")}
              >
                {label}
              </button>
            ))}
          </div>

          {tab === "design" && <DesignTab doc={doc} patch={patch} />}
          {tab === "content" && <ContentTab doc={doc} patch={patch} />}
          {tab === "offer" && <OfferTab doc={doc} patch={patch} profiles={profiles} lang={lang} onChoose={(id) => choose(id, lang)} />}
          {tab === "versions" && (
            <VersionsTab
              versions={versions}
              current={{ profileId, lang, doc }}
              fileName={fileName}
              onSave={(name) => {
                const next = [{ id: crypto.randomUUID(), name, savedAt: Date.now(), profileId, lang, doc }, ...versions]
                setVersions(next)
                writeStorage(VERSIONS_KEY, next)
              }}
              onLoad={(v) => {
                setProfileId(v.profileId)
                setLang(v.lang)
                setDoc(v.doc)
              }}
              onDelete={(id) => {
                const next = versions.filter((v) => v.id !== id)
                setVersions(next)
                writeStorage(VERSIONS_KEY, next)
              }}
            />
          )}
        </div>

        <div className="lg:sticky lg:top-44 lg:h-[calc(100dvh-12rem)]">
          <div className="relative h-[80vh] overflow-hidden rounded-2xl border border-line bg-surface-2 lg:h-full">
            {url ? (
              <iframe key={url} src={`${url}#toolbar=0&navpanes=0&view=FitH`} title="Aperçu du CV" className="size-full" />
            ) : (
              <div className="grid size-full place-items-center text-[13px] text-muted-foreground">Génération de l'aperçu…</div>
            )}
            {busy && (
              <span className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-background/90 px-2.5 py-1 text-[11px] shadow">
                <LoaderCircle className="size-3 animate-spin" aria-hidden /> Mise à jour
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

type PatchFn = (fn: (d: CvDoc) => void) => void

function DesignTab({ doc, patch }: { doc: CvDoc; patch: PatchFn }) {
  const templates: { value: CvTemplate; label: string }[] = [
    { value: "modern", label: "Moderne" },
    { value: "classic", label: "Classique (ATS)" },
    { value: "sidebar", label: "Colonne" },
  ]
  return (
    <>
      <Panel title="Mise en page">
        <Segmented label="Modèle" value={doc.template} onChange={(v) => patch((d) => void (d.template = v))} options={templates} />
        <Segmented
          label="Densité"
          value={doc.density}
          onChange={(v) => patch((d) => void (d.density = v))}
          options={[
            { value: "comfortable", label: "Aérée" },
            { value: "compact", label: "Compacte" },
          ]}
        />
        <div>
          <ColorField label="Couleur d'accent" value={doc.accent} onChange={(v) => patch((d) => void (d.accent = v))} />
          <div className="mt-2 flex flex-wrap gap-1.5">
            {ACCENTS.map((c) => (
              <button
                key={c}
                type="button"
                aria-label={`Accent ${c}`}
                onClick={() => patch((d) => void (d.accent = c))}
                className={cn("size-6 rounded-full border-2", doc.accent === c ? "border-foreground" : "border-transparent")}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </div>
        <ToggleRow label="Photo" description="Courante en ONG et en francophonie, déconseillée pour les ATS américains." checked={doc.showPhoto} onChange={(v) => patch((d) => void (d.showPhoto = v))} />
      </Panel>

      <Panel title="En-tête">
        <Field label="Nom">
          <TextInput value={doc.header.name} onChange={(e) => patch((d) => void (d.header.name = e.target.value))} />
        </Field>
        <Field label="Titre">
          <TextInput value={doc.header.headline} onChange={(e) => patch((d) => void (d.header.headline = e.target.value))} />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="E-mail">
            <TextInput value={doc.header.email} onChange={(e) => patch((d) => void (d.header.email = e.target.value))} />
          </Field>
          <Field label="Téléphone">
            <TextInput value={doc.header.phone} onChange={(e) => patch((d) => void (d.header.phone = e.target.value))} />
          </Field>
        </div>
        <Field label="Localisation">
          <TextInput value={doc.header.location} onChange={(e) => patch((d) => void (d.header.location = e.target.value))} />
        </Field>
        <ToggleRow label="Afficher le téléphone" checked={doc.header.showPhone} onChange={(v) => patch((d) => void (d.header.showPhone = v))} />
        <ToggleRow label="GitHub et LinkedIn" checked={doc.header.showLinks} onChange={(v) => patch((d) => void (d.header.showLinks = v))} />
        <ToggleRow label="Lien du portfolio" checked={doc.header.showWebsite} onChange={(v) => patch((d) => void (d.header.showWebsite = v))} />
      </Panel>

      <Panel title="Sections et ordre">
        <ul className="divide-y divide-line overflow-hidden rounded-xl border border-line">
          {doc.sections.map((sec, i) => (
            <li key={sec.id} className={cn("flex items-center gap-2 px-3 py-2", !sec.visible && "opacity-55")}>
              <Toggle size="sm" checked={sec.visible} onChange={(v) => patch((d) => void (d.sections[i].visible = v))} label={`Afficher ${SECTION_NAMES[sec.id]}`} />
              <TextInput
                aria-label={`Titre de la section ${SECTION_NAMES[sec.id]}`}
                value={doc.labels[sec.id]}
                onChange={(e) => patch((d) => void (d.labels[sec.id] = e.target.value))}
                className="h-8 flex-1 border-transparent bg-transparent px-1.5"
              />
              <button type="button" aria-label="Monter" disabled={i === 0} onClick={() => patch((d) => void d.sections.splice(i - 1, 0, d.sections.splice(i, 1)[0]))} className="grid size-7 place-items-center rounded-md text-muted-foreground hover:bg-surface-2 disabled:opacity-30">
                <ArrowUp className="size-3.5" />
              </button>
              <button type="button" aria-label="Descendre" disabled={i === doc.sections.length - 1} onClick={() => patch((d) => void d.sections.splice(i + 1, 0, d.sections.splice(i, 1)[0]))} className="grid size-7 place-items-center rounded-md text-muted-foreground hover:bg-surface-2 disabled:opacity-30">
                <ArrowDown className="size-3.5" />
              </button>
            </li>
          ))}
        </ul>
        <p className="text-[11px] text-subtle-foreground">En mise en page « Moderne », compétences, formation, certifications, langues et références vont dans la colonne de droite.</p>
      </Panel>
    </>
  )
}

function ContentTab({ doc, patch }: { doc: CvDoc; patch: PatchFn }) {
  return (
    <>
      <Panel title="Profil / résumé">
        <TextArea rows={7} value={doc.summary} onChange={(e) => patch((d) => void (d.summary = e.target.value))} />
        <p className="text-[11px] text-subtle-foreground">{doc.summary.length} caractères — visez 350 à 600.</p>
      </Panel>

      <Panel title="Expériences">
        <ItemList
          items={doc.experience}
          onChange={(items) => patch((d) => void (d.experience = items))}
          title={(e) => (
            <>
              <span className="font-medium">{e.role}</span> <span className="text-muted-foreground">· {e.company}</span>
            </>
          )}
          editor={(e, update) => (
            <>
              <Field label="Poste">
                <TextInput value={e.role} onChange={(ev) => update({ role: ev.target.value })} />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Organisation">
                  <TextInput value={e.company} onChange={(ev) => update({ company: ev.target.value })} />
                </Field>
                <Field label="Période">
                  <TextInput value={e.period} onChange={(ev) => update({ period: ev.target.value })} />
                </Field>
              </div>
              <span className="block text-[12px] font-medium text-muted-foreground">Réalisations</span>
              {e.bullets.map((b, bi) => (
                <div key={bi} className="flex items-start gap-2">
                  <div className="pt-2.5">
                    <Toggle size="sm" checked={b.visible} onChange={(v) => update({ bullets: e.bullets.map((x, j) => (j === bi ? { ...x, visible: v } : x)) })} label="Afficher la réalisation" />
                  </div>
                  <TextArea rows={3} value={b.text} onChange={(ev) => update({ bullets: e.bullets.map((x, j) => (j === bi ? { ...x, text: ev.target.value } : x)) })} />
                  <button type="button" aria-label="Supprimer la réalisation" onClick={() => update({ bullets: e.bullets.filter((_, j) => j !== bi) })} className="mt-1.5 grid size-7 shrink-0 place-items-center rounded-md text-muted-foreground hover:text-destructive">
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              ))}
              <Button size="sm" onClick={() => update({ bullets: [...e.bullets, { text: "", visible: true }] })}>
                <Plus className="size-3.5" aria-hidden /> Ajouter une réalisation
              </Button>
            </>
          )}
        />
      </Panel>

      <Panel title="Projets">
        <ItemList
          items={doc.projects}
          onChange={(items) => patch((d) => void (d.projects = items))}
          title={(p) => <span className="font-medium">{p.title}</span>}
          editor={(p, update) => (
            <>
              <Field label="Titre">
                <TextInput value={p.title} onChange={(e) => update({ title: e.target.value })} />
              </Field>
              <Field label="Sous-titre">
                <TextInput value={p.subtitle} onChange={(e) => update({ subtitle: e.target.value })} />
              </Field>
              <Field label="Description / impact">
                <TextArea rows={4} value={p.text} onChange={(e) => update({ text: e.target.value })} />
              </Field>
              <Field label="Technologies (optionnel)">
                <TextInput value={p.tech} onChange={(e) => update({ tech: e.target.value })} />
              </Field>
            </>
          )}
        />
      </Panel>

      <Panel title="Compétences">
        <ItemList
          items={doc.skills}
          onChange={(items) => patch((d) => void (d.skills = items))}
          title={(s) => <span className="font-medium">{s.name}</span>}
          editor={(s, update) => (
            <>
              <Field label="Catégorie">
                <TextInput value={s.name} onChange={(e) => update({ name: e.target.value })} />
              </Field>
              <Field label="Éléments (séparés par des virgules)">
                <TextArea rows={3} value={s.items} onChange={(e) => update({ items: e.target.value })} />
              </Field>
            </>
          )}
        />
      </Panel>

      <Panel title="Formation">
        <ItemList
          items={doc.education}
          onChange={(items) => patch((d) => void (d.education = items))}
          title={(e) => e.degree}
          editor={(e, update) => (
            <>
              <Field label="Diplôme">
                <TextInput value={e.degree} onChange={(ev) => update({ degree: ev.target.value })} />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Établissement">
                  <TextInput value={e.school} onChange={(ev) => update({ school: ev.target.value })} />
                </Field>
                <Field label="Période">
                  <TextInput value={e.period} onChange={(ev) => update({ period: ev.target.value })} />
                </Field>
              </div>
            </>
          )}
        />
      </Panel>

      <Panel title="Certifications">
        <ItemList items={doc.certifications} onChange={(items) => patch((d) => void (d.certifications = items))} title={(c) => c.name} />
      </Panel>

      <Panel title="Langues">
        <ItemList
          items={doc.languages}
          onChange={(items) => patch((d) => void (d.languages = items))}
          title={(l) => `${l.name} — ${l.level}`}
          editor={(l, update) => (
            <Field label="Niveau">
              <TextInput value={l.level} onChange={(e) => update({ level: e.target.value })} />
            </Field>
          )}
        />
      </Panel>

      <Panel
        title="Références"
        actions={
          <Button size="sm" onClick={() => patch((d) => void d.references.push({ key: crypto.randomUUID(), visible: true, name: "", role: "", contact: "" }))}>
            <Plus className="size-3.5" aria-hidden /> Ajouter
          </Button>
        }
      >
        <p className="text-[11px] text-subtle-foreground">
          Les coordonnées de vos références restent dans ce navigateur (versions sauvegardées) et ne sont jamais publiées dans le code. Sans référence, le CV affiche « {doc.referencesNote} ».
        </p>
        {doc.references.length > 0 && (
          <ItemList
            removable
            items={doc.references}
            onChange={(items) => patch((d) => void (d.references = items))}
            title={(r) => r.name || <span className="text-muted-foreground">Nouvelle référence</span>}
            editor={(r, update) => (
              <>
                <Field label="Nom">
                  <TextInput value={r.name} onChange={(e) => update({ name: e.target.value })} />
                </Field>
                <Field label="Fonction et organisation">
                  <TextInput value={r.role} onChange={(e) => update({ role: e.target.value })} />
                </Field>
                <Field label="Contact (e-mail, téléphone)">
                  <TextInput value={r.contact} onChange={(e) => update({ contact: e.target.value })} />
                </Field>
              </>
            )}
          />
        )}
      </Panel>
    </>
  )
}

function OfferTab({ doc, patch, profiles, lang, onChoose }: { doc: CvDoc; patch: PatchFn; profiles: CvProfile[]; lang: Locale; onChoose: (id: string) => void }) {
  const [offer, setOffer] = useState("")
  const [target, setTarget] = useState(doc.skills.find((s) => s.visible)?.key ?? doc.skills[0].key)
  const result = useMemo(() => (offer.trim().length > 40 ? matchOffer(doc, offer) : null), [doc, offer])
  const ranking = useMemo(
    () =>
      offer.trim().length > 40
        ? profiles.map((p) => ({ profile: p, score: matchOffer(applyProfile(p, lang), offer).score })).sort((a, b) => b.score - a.score)
        : [],
    [offer, profiles, lang],
  )

  function addKeyword(word: string) {
    patch((d) => {
      const skill = d.skills.find((s) => s.key === target)
      if (!skill) return
      skill.visible = true
      skill.items = skill.items.trim() ? `${skill.items}, ${word}` : word
    })
  }

  return (
    <>
      <Panel title="Analyser une offre">
        <TextArea rows={8} placeholder="Collez ici le texte de l'offre d'emploi ou de l'appel à candidatures…" value={offer} onChange={(e) => setOffer(e.target.value)} />
        <p className="text-[11px] text-subtle-foreground">L'analyse se fait entièrement dans votre navigateur : rien n'est envoyé.</p>
      </Panel>

      {result && (
        <>
          <Panel title="Correspondance avec ce CV">
            <div className="flex items-center gap-4">
              <div
                className="grid size-20 shrink-0 place-items-center rounded-full"
                style={{ background: `conic-gradient(var(--accent) ${result.score * 3.6}deg, var(--line) 0deg)` }}
              >
                <div className="grid size-16 place-items-center rounded-full bg-surface text-lg font-semibold tabular-nums">{result.score}%</div>
              </div>
              <p className="text-[13px] text-muted-foreground">
                {result.score >= 70
                  ? "Très bon alignement. Relisez le titre et le résumé pour reprendre les termes exacts de l'offre."
                  : result.score >= 45
                    ? "Alignement correct. Ajoutez les mots-clés manquants qui correspondent à une compétence réelle."
                    : "Alignement faible. Essayez un autre profil ou réécrivez le résumé avec le vocabulaire de l'offre."}
              </p>
            </div>
            <div>
              <p className="mb-2 text-[12px] font-medium text-muted-foreground">Présents ({result.matched.length})</p>
              <div className="flex flex-wrap gap-1.5">
                {result.matched.map((w) => (
                  <span key={w} className="rounded-full border border-success/30 bg-success/10 px-2.5 py-1 font-mono text-[11px]">
                    {w}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <div className="mb-2 flex items-center justify-between gap-2">
                <p className="text-[12px] font-medium text-muted-foreground">Absents ({result.missing.length}) — cliquez pour ajouter à :</p>
                <Select value={target} onChange={setTarget} options={doc.skills.map((s) => ({ value: s.key, label: s.name }))} className="h-8 w-40 py-1 text-[12px]" />
              </div>
              <div className="flex flex-wrap gap-1.5">
                {result.missing.map((w) => (
                  <button key={w} type="button" onClick={() => addKeyword(w)} className="rounded-full border border-destructive/30 bg-destructive/10 px-2.5 py-1 font-mono text-[11px] hover:border-destructive/60">
                    + {w}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-[11px] text-subtle-foreground">N'ajoutez que ce que vous maîtrisez vraiment : un recruteur vous interrogera dessus.</p>
            </div>
          </Panel>

          <Panel title={<span className="flex items-center gap-1.5"><Sparkles className="size-3.5 text-accent" aria-hidden /> Meilleur profil pour cette offre</span>}>
            <ul className="space-y-1.5">
              {ranking.map(({ profile, score }) => (
                <li key={profile.id} className="flex items-center gap-3">
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-line">
                    <div className="h-full rounded-full bg-accent" style={{ width: `${score}%` }} />
                  </div>
                  <span className="w-9 text-right font-mono text-[11px] tabular-nums">{score}%</span>
                  <button type="button" onClick={() => onChoose(profile.id)} className="w-56 truncate text-left text-[12px] hover:text-accent">
                    {profile.name}
                  </button>
                </li>
              ))}
            </ul>
          </Panel>
        </>
      )}
    </>
  )
}

function VersionsTab({
  versions,
  current,
  fileName,
  onSave,
  onLoad,
  onDelete,
}: {
  versions: Version[]
  current: Draft
  fileName: string
  onSave: (name: string) => void
  onLoad: (v: Draft) => void
  onDelete: (id: string) => void
}) {
  const [name, setName] = useState("")
  const input = useRef<HTMLInputElement>(null)

  return (
    <>
      <Panel title="Enregistrer cette version">
        <div className="flex gap-2">
          <TextInput placeholder="Ex. : UNICEF — Chargé SI, mars" value={name} onChange={(e) => setName(e.target.value)} />
          <Button
            variant="primary"
            disabled={!name.trim()}
            onClick={() => {
              onSave(name.trim())
              setName("")
            }}
          >
            <Save className="size-4" aria-hidden /> Enregistrer
          </Button>
        </div>
        <p className="text-[11px] text-subtle-foreground">Les versions sont stockées dans ce navigateur. Exportez-les en JSON pour les garder ailleurs.</p>
      </Panel>

      <Panel title={`Versions enregistrées (${versions.length})`}>
        {versions.length === 0 ? (
          <p className="text-[13px] text-muted-foreground">Aucune version pour l'instant.</p>
        ) : (
          <ul className="divide-y divide-line overflow-hidden rounded-xl border border-line">
            {versions.map((v) => (
              <li key={v.id} className="flex items-center gap-2 px-3 py-2">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-medium">{v.name}</p>
                  <p className="text-[11px] text-subtle-foreground">
                    {new Date(v.savedAt).toLocaleString("fr")} · {v.lang.toUpperCase()}
                  </p>
                </div>
                <Button size="sm" onClick={() => onLoad(v)}>
                  Ouvrir
                </Button>
                <button type="button" aria-label="Supprimer la version" onClick={() => onDelete(v.id)} className="grid size-8 place-items-center rounded-md text-muted-foreground hover:text-destructive">
                  <Trash2 className="size-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </Panel>

      <Panel title="Fichiers">
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => downloadText(JSON.stringify(current, null, 2), `${fileName}.json`, "application/json")}>
            <FileJson className="size-4" aria-hidden /> Exporter en JSON
          </Button>
          <Button onClick={() => input.current?.click()}>
            <Upload className="size-4" aria-hidden /> Importer un JSON
          </Button>
          <Button onClick={() => downloadText(cvToText(current.doc), `${fileName}.txt`)}>
            <FileText className="size-4" aria-hidden /> Exporter en texte
          </Button>
          <input
            ref={input}
            type="file"
            accept="application/json"
            hidden
            onChange={async (e) => {
              const file = e.target.files?.[0]
              if (!file) return
              try {
                const draft = JSON.parse(await file.text()) as Draft
                if (draft?.doc?.version === 1) onLoad(draft)
              } catch {
                alert("Fichier JSON invalide.")
              }
              e.target.value = ""
            }}
          />
        </div>
      </Panel>
    </>
  )
}
