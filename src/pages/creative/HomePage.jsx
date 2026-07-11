import { useEffect } from 'react';
import { useLocation } from 'react-router';
import Hero from '../../sections/Hero';
import About from '../../sections/About';
import Work from '../../sections/Work';
import Contact from '../../sections/Contact';
import { useLenisContext } from '../../app/providers/LenisProvider';

/**
 * Creative Developer home page.
 * Composes sections into a single scrollable layout:
 * - Hero (Light Mode)
 * - About / Tech Stack (Light Mode)
 * - Work / Projects (ScrollTrigger Transitions to Dark Mode)
 * - Contact (Dark Mode)
 */
export default function HomePage() {
  const location = useLocation();
  const lenisContext = useLenisContext();
  const lenis = lenisContext?.lenis;

  useEffect(() => {
    if (location.hash && lenis) {
      const targetElement = document.querySelector(location.hash);
      if (targetElement) {
        // Small delay to ensure GSAP and DOM are ready before jumping
        setTimeout(() => {
          lenis.scrollTo(targetElement, { offset: 0, immediate: true });
        }, 100);
      }
    }
  }, [location.hash, lenis]);

  return (
    <>
      <Hero />
      <Work />
      <About />
      <Contact />
    </>
  );
}
