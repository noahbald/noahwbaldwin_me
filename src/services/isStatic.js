/**
 * Checks whether a url is static, in that it has already been dynamically imported
 * @param {string} url
 */
export default function isStatic(url) {
  return /\/static\//.test(url)
}
