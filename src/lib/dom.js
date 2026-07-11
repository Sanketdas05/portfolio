/**
 * Cached getBoundingClientRect wrapper.
 * Useful for avoiding layout thrashing when reading bounds in animation loops.
 *
 * @param {HTMLElement} element
 * @returns {DOMRect}
 */
export function getBounds(element) {
  return element.getBoundingClientRect();
}
