import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Central GSAP plugin registry.
 * Import this file once at app startup to ensure all plugins are registered.
 *
 * Add new plugin registrations here as the project grows
 * (e.g., SplitText, DrawSVG, MorphSVG).
 */
gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };
