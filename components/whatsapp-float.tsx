"use client"

import { useEffect, useState } from "react"
import { MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { whatsappUrl } from "@/lib/whatsapp"

/** Always-reachable WhatsApp entry point once the hero CTAs have scrolled away; steps aside at the contact form. */
export function WhatsAppFloat({ label, message }: { label: string; message: string }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const update = () => {
      const contact = document.getElementById("contact")
      const atContact = contact ? contact.getBoundingClientRect().top < window.innerHeight * 0.6 : false
      setVisible(window.scrollY > window.innerHeight * 0.8 && !atContact)
    }
    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [])

  return (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      tabIndex={visible ? 0 : -1}
      className={cn(
        "fixed bottom-5 right-5 z-40 inline-flex h-12 items-center gap-2 rounded-full bg-[#25D366] pl-3.5 pr-4 text-[14px] font-semibold text-[#062e16] shadow-[0_12px_32px_-8px_rgba(37,211,102,0.55)] transition-all duration-500 ease-out-expo hover:scale-105 md:bottom-7 md:right-7",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0",
      )}
    >
      <MessageCircle className="size-5" aria-hidden />
      {label}
    </a>
  )
}
