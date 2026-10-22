import { site } from "@/lib/site"

/** wa.me only accepts the international number as digits — no "+", spaces or dashes. */
export const whatsappNumber = site.phoneHref.replace(/\D/g, "")

export function whatsappUrl(text?: string) {
  return `https://wa.me/${whatsappNumber}${text ? `?text=${encodeURIComponent(text)}` : ""}`
}
