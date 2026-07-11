import { useState, useEffect } from 'react';

/**
 * Returns the normalized scroll progress (0–1) of a ref element
 * relative to the viewport.
 *
 * @param {React.RefObject} ref - Element to track
 * @returns {number} Progress value between 0 and 1
 */
export function useScrollProgress(ref) {
  const [progress] = useState(0);

  useEffect(() => {
    // Implementation will use Lenis or ScrollTrigger in Phase 3
  }, [ref]);

  return progress;
}
