/**
 * The portal account, hard-coded on purpose (no database).
 *
 * Only a scrypt hash of the password is stored — never the password itself.
 * Set or change it with:  npm run portal:password
 * The PORTAL_PASSWORD_HASH environment variable, when set, takes precedence.
 */
export const portalAccount = {
  username: "felicienmukamba",
  passwordHash: "scrypt:32768:8:1:YZRkhYGpHR2QYOADKm1kww==:kYDs5BTpVh4igAeRQ70GLNNqYgMGZmG+lmB2H9bj6B8D5xcvyYaMc4N0fFe+NZUDf95R7E1tG9XSbrGsg65wFw==",
}
