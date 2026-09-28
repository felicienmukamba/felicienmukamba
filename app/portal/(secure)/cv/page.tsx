import type { Metadata } from "next"
import { CvStudio } from "@/components/portal/cv-studio"
import { requireSession } from "@/lib/portal/auth"
import { cvProfiles } from "@/lib/portal/profiles"

export const metadata: Metadata = { title: "Studio CV" }

export default async function CvStudioPage({ searchParams }: PageProps<"/portal/cv">) {
  await requireSession()
  const { profile } = await searchParams
  const initial = cvProfiles.some((p) => p.id === profile) ? (profile as string) : undefined
  return <CvStudio profiles={cvProfiles} initialProfileId={initial} />
}
