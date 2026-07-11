/**
 * Linear interpolation.
 * @param {number} a - Start value
 * @param {number} b - End value
 * @param {number} t - Progress (0–1)
 * @returns {number}
 */
export function lerp(a, b, t) {
  return a + (b - a) * t;
}

/**
 * Clamp a value between min and max.
 * @param {number} val
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max);
}

/**
 * Map a value from one range to another.
 * @param {number} val - Input value
 * @param {number} inMin - Input range start
 * @param {number} inMax - Input range end
 * @param {number} outMin - Output range start
 * @param {number} outMax - Output range end
 * @returns {number}
 */
export function mapRange(val, inMin, inMax, outMin, outMax) {
  return outMin + ((val - inMin) / (inMax - inMin)) * (outMax - outMin);
}
