/**
 * The portal account, hard-coded on purpose (no database).
 *
 * Only a scrypt hash of the password is stored — never the password itself.
 * Set or change it with:  npm run portal:password
 * The PORTAL_PASSWORD_HASH environment variable, when set, takes precedence.
 */
export const portalAccount = {
  username: "felicienmukamba",
  passwordHash: "scrypt:32768:8:1:aGn2LuHJraBoUa/iOlptbw==:F1x9RkpsDmHVCU7vI90xCU/MlRLxLJjpvfr+zHQaIBDy2+C2JU5jS4hd84ABBwbqEWzDtpiijC/8vH8nucO/qQ==",
}
