import "server-only"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { SESSION_COOKIE, verifySessionToken, type Session } from "./session"

export async function getSession(): Promise<Session | null> {
  const store = await cookies()
  return verifySessionToken(store.get(SESSION_COOKIE)?.value)
}

/** Guard for every private page — the proxy checks too, this is the second lock. */
export async function requireSession(): Promise<Session> {
  const session = await getSession()
  if (!session) redirect("/portal/login")
  return session
}
