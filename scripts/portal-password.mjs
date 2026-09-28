#!/usr/bin/env node
// Sets the portal password: stores its scrypt hash in lib/portal/credentials.ts.
// Usage:  npm run portal:password            (asks for the password)
//         npm run portal:password -- --print (only prints the hash, e.g. for PORTAL_PASSWORD_HASH)
import { randomBytes, scryptSync } from "node:crypto"
import { readFileSync, writeFileSync } from "node:fs"
import { createInterface } from "node:readline"

const N = 2 ** 15
const r = 8
const p = 1

function ask(question) {
  const rl = createInterface({ input: process.stdin, output: process.stdout })
  return new Promise((resolve) => rl.question(question, (answer) => (rl.close(), resolve(answer))))
}

const printOnly = process.argv.includes("--print")
const password = process.env.PORTAL_NEW_PASSWORD || (await ask("New portal password (12+ characters): "))

if (!password || password.length < 12) {
  console.error("Use at least 12 characters.")
  process.exit(1)
}

const salt = randomBytes(16)
const hash = scryptSync(password, salt, 64, { N, r, p, maxmem: 256 * 1024 * 1024 })
const encoded = `scrypt:${N}:${r}:${p}:${salt.toString("base64")}:${hash.toString("base64")}`

if (printOnly) {
  console.log(encoded)
} else {
  const file = new URL("../lib/portal/credentials.ts", import.meta.url)
  const source = readFileSync(file, "utf8").replace(/passwordHash: "[^"]*"/, `passwordHash: "${encoded}"`)
  writeFileSync(file, source)
  console.log("Password hash saved to lib/portal/credentials.ts")
}
