import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenisContext } from './LenisProvider';

// Register GSAP plugins once
gsap.registerPlugin(ScrollTrigger);

/**
 * Syncs GSAP ScrollTrigger with Lenis smooth scroll.
 * Must be rendered inside LenisProvider.
 */
export function GSAPProvider({ children }) {
  const lenis = useLenisContext();

  useEffect(() => {
    if (!lenis) return;

    // Sync Lenis scroll position with ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Use Lenis requestAnimationFrame for GSAP ticker
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(lenis.raf);
      lenis.off('scroll', ScrollTrigger.update);
    };
  }, [lenis]);

  return children;
}
