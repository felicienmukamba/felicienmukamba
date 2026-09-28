/**
 * The portal account, hard-coded on purpose (no database).
 *
 * Only a scrypt hash of the password is stored — never the password itself.
 * Set or change it with:  npm run portal:password
 * The PORTAL_PASSWORD_HASH environment variable, when set, takes precedence.
 */
export const portalAccount = {
  username: "felicien",
  passwordHash: "",
}
