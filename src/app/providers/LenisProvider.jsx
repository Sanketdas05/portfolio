import { createContext, useContext, useEffect, useState } from 'react';
import Lenis from 'lenis';

const LenisContext = createContext(null);

/**
 * Provides a Lenis smooth-scroll instance to the component tree.
 * Access via useLenisContext() hook.
 */
export function LenisProvider({ children }) {
  const [lenis, setLenis] = useState(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const instance = new Lenis({
      // When user prefers reduced motion, set lerp to 1 so scroll is instant (no smooth easing)
      lerp: prefersReduced ? 1 : 0.1,
      smoothWheel: !prefersReduced,
    });

    function raf(time) {
      instance.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    setLenis(instance);

    return () => {
      cancelAnimationFrame(rafId);
      instance.destroy();
    };
  }, []);

  return (
    <LenisContext.Provider value={{ lenis }}>
      {children}
    </LenisContext.Provider>
  );
}

/**
 * Access the Lenis instance from any child component.
 * Returns null until Lenis is initialized.
 */
export function useLenisContext() {
  return useContext(LenisContext);
}
