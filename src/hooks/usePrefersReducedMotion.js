import { useState, useEffect } from 'react';

/**
 * Detects the OS-level "prefers reduced motion" accessibility setting.
 * Use this to disable or simplify animations for users who have opted out.
 *
 * @returns {boolean} True if the user prefers reduced motion
 */
export function usePrefersReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mql.matches);

    function onChange(e) {
      setPrefersReduced(e.matches);
    }

    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return prefersReduced;
}
