"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { portalAccount } from "./credentials"
import { configuredHash, verifyPassword } from "./password"
import { SESSION_COOKIE, SESSION_TTL_SECONDS, createSessionToken, getSessionSecret } from "./session"

/** `username` is echoed back: React resets the form after the action, this refills it. */
export type LoginState = { error?: string; username?: string } | undefined

export async function login(_prev: LoginState, form: FormData): Promise<LoginState> {
  const username = String(form.get("username") ?? "").trim().toLowerCase()
  const password = String(form.get("password") ?? "")
  const next = String(form.get("next") ?? "/portal")

  const hash = configuredHash()
  if (!hash) return { username, error: "Aucun mot de passe n'est configuré. Lancez « npm run portal:password »." }
  if (!getSessionSecret()) return { username, error: "PORTAL_SECRET manquant sur le serveur (32 caractères minimum)." }

  const valid = username === portalAccount.username && (await verifyPassword(password, hash))
  if (!valid) {
    // Slow down guessing.
    await new Promise((resolve) => setTimeout(resolve, 900))
    return { username, error: "Identifiants incorrects." }
  }

  const token = await createSessionToken(username)
  if (!token) return { username, error: "Impossible de créer la session." }

  const store = await cookies()
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  })
  redirect(next.startsWith("/portal") ? next : "/portal")
}

export async function logout() {
  const store = await cookies()
  store.delete(SESSION_COOKIE)
  redirect("/portal/login")
}
