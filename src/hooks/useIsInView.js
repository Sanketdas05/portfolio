import { useState, useEffect, useRef } from 'react';

/**
 * Detects whether an element is in the viewport.
 *
 * @param {object} options - IntersectionObserver options (threshold, rootMargin, etc.)
 * @returns {[React.RefObject, boolean]} Tuple of ref to attach and visibility boolean
 */
export function useIsInView(options = {}) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.1, ...options }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [options]);

  return [ref, isInView];
}
