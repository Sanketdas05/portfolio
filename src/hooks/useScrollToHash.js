import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { useLenisContext } from '../app/providers/LenisProvider';

/**
 * Custom hook that listens to router location changes and scrolls to the 
 * element specified in the hash (e.g. #about) using Lenis if it exists.
 */
export function useScrollToHash() {
  const { hash, pathname } = useLocation();
  const lenis = useLenisContext();

  useEffect(() => {
    if (!hash) return;

    // Small delay to allow the DOM to fully render before scrolling
    const timer = setTimeout(() => {
      const target = document.querySelector(hash);
      if (target) {
        if (lenis) {
          lenis.scrollTo(target, { offset: 0, immediate: false });
        } else {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [hash, pathname, lenis]);
}
