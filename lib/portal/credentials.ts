/**
 * The portal account, hard-coded on purpose (no database).
 *
 * Only a scrypt hash of the password is stored — never the password itself.
 * Set or change it with:  npm run portal:password
 * The PORTAL_PASSWORD_HASH environment variable, when set, takes precedence.
 */
export const portalAccount = {
  username: "felicien",
  passwordHash: "scrypt:32768:8:1:XhZCo7D1zNy0JxSfugTNNw==:K6yHdhijvFHzOYSTIt070hxXzHnpkwqW1Yo954HRb2QfNW9Bcs4dI80hXsIsKg0hOaoRY1bM2N9b5vhK3oOB6g==",
}
