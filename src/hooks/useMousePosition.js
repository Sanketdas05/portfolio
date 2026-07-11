import { useState, useEffect } from 'react';

/**
 * Returns normalized mouse position { x, y } where values range from 0 to 1.
 * (0, 0) is top-left, (1, 1) is bottom-right.
 *
 * @returns {{ x: number, y: number }}
 */
export function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    function onMouseMove(e) {
      setPosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    }

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  return position;
}
