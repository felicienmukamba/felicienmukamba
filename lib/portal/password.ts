import "server-only"
import { scrypt as scryptCallback, timingSafeEqual } from "node:crypto"
import { promisify } from "node:util"
import { portalAccount } from "./credentials"

const scrypt = promisify(scryptCallback) as (
  password: string,
  salt: Buffer,
  keylen: number,
  options: { N: number; r: number; p: number; maxmem: number },
) => Promise<Buffer>

/**
 * Hash format: scrypt:N:r:p:<salt base64>:<hash base64> (same as scripts/portal-password.mjs).
 * Colons, not dollars: .env files would expand `$…` as variables.
 */
export function configuredHash(): string {
  return process.env.PORTAL_PASSWORD_HASH || portalAccount.passwordHash
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [scheme, n, r, p, salt, hash] = stored.split(":")
  if (scheme !== "scrypt" || !salt || !hash) return false
  const expected = Buffer.from(hash, "base64")
  const derived = await scrypt(password, Buffer.from(salt, "base64"), expected.length, {
    N: Number(n),
    r: Number(r),
    p: Number(p),
    maxmem: 256 * 1024 * 1024,
  })
  return derived.length === expected.length && timingSafeEqual(derived, expected)
}
