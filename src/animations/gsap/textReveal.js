import { gsap } from './registry';

/**
 * Creates a text reveal timeline.
 * Animates elements from below with opacity.
 *
 * @param {HTMLElement | HTMLElement[]} targets - Elements to animate
 * @param {object} options - Override defaults
 * @returns {gsap.core.Timeline} GSAP timeline instance
 */
export function createTextReveal(targets, options = {}) {
  const defaults = {
    y: 40,
    opacity: 0,
    duration: 0.8,
    stagger: 0.05,
    ease: 'power3.out',
  };

  const config = { ...defaults, ...options };

  return gsap.timeline().from(targets, config);
}
