/**
 * Signed session cookie for the private portal.
 * Web Crypto only, so the same code runs in the proxy and in server components.
 */

export const SESSION_COOKIE = "fm_portal"
export const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7

const DEV_SECRET = "dev-only-portal-secret-never-used-in-production-0001"

/** PORTAL_SECRET signs sessions. Production refuses to run the portal without it. */
export function getSessionSecret(): string | null {
  const secret = process.env.PORTAL_SECRET
  if (secret && secret.length >= 32) return secret
  return process.env.NODE_ENV === "production" ? null : DEV_SECRET
}

const encoder = new TextEncoder()

function toBase64Url(bytes: Uint8Array): string {
  let binary = ""
  for (const b of bytes) binary += String.fromCharCode(b)
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
}

function fromBase64Url(value: string): string {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/")
  return atob(base64 + "=".repeat((4 - (base64.length % 4)) % 4))
}

async function sign(data: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"])
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(data))
  return toBase64Url(new Uint8Array(signature))
}

function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}

export type Session = { user: string; exp: number }

export async function createSessionToken(user: string): Promise<string | null> {
  const secret = getSessionSecret()
  if (!secret) return null
  const payload = toBase64Url(encoder.encode(JSON.stringify({ user, exp: Date.now() + SESSION_TTL_SECONDS * 1000 })))
  return `${payload}.${await sign(payload, secret)}`
}

export async function verifySessionToken(token: string | undefined): Promise<Session | null> {
  const secret = getSessionSecret()
  if (!token || !secret) return null
  const [payload, signature] = token.split(".")
  if (!payload || !signature) return null
  if (!constantTimeEqual(signature, await sign(payload, secret))) return null
  try {
    const session = JSON.parse(fromBase64Url(payload)) as Session
    return typeof session.user === "string" && session.exp > Date.now() ? session : null
  } catch {
    return null
  }
}
