/**
 * Returns whether or not the given url refers to a hypertext protocol or not
 * @param {string} url
 */
export default function isProtocol(url) {
  return /^https?:\/\//.test(url) || /^tel:/.test(url) || /mailto:/.test(url) || /spotify:/.test(url)
}
