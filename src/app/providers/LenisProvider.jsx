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
    const instance = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
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
