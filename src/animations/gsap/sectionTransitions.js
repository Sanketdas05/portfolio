import { gsap } from './registry';

/**
 * Creates a section entry animation timeline.
 * Fades and slides a section into view.
 *
 * @param {HTMLElement} target - Section element to animate
 * @param {object} options - Override defaults
 * @returns {gsap.core.Timeline} GSAP timeline instance
 */
export function createSectionEntry(target, options = {}) {
  const defaults = {
    y: 60,
    opacity: 0,
    duration: 1,
    ease: 'power2.out',
  };

  const config = { ...defaults, ...options };

  return gsap.timeline().from(target, config);
}
