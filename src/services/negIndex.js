/**
 * Returns real index for a given negative index, like Python
 * @param {number} i negative index (can be positive)
 * @param {array} l array to be negatively indexed
 * @example
 * negIndex(-1, [1, 2, 3]) // returns 3
 */
function negIndex(i, l) {
  return ((i % l) + l) % l
}
export default negIndex
