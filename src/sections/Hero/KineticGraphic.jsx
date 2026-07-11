import { useState, useEffect, useRef } from 'react';
import { useMousePosition } from '../../hooks/useMousePosition';

/**
 * KineticGraphic — a premium orbital graphic matching the user's mockup.
 * Displays a central terracotta asterisk star, concentric baseline paths,
 * procedurally computed orbiting nodes (black, terracotta, grey),
 * and fine, webbed connecting curves.
 * Responds dynamically to mouse coordinates.
 * Adjusted stroke weights and opacities for crisp visibility on all screens.
 */
export default function KineticGraphic() {
  const mouse = useMousePosition();
  const [tick, setTick] = useState(0);
  const requestRef = useRef();

  // Lerp states for smooth responsiveness
  const targetX = useRef(0);
  const targetY = useRef(0);
  const currentX = useRef(0);
  const currentY = useRef(0);

  useEffect(() => {
    targetX.current = mouse.x - 0.5; // -0.5 to 0.5
    targetY.current = mouse.y - 0.5;
  }, [mouse.x, mouse.y]);

  useEffect(() => {
    function animate() {
      currentX.current += (targetX.current - currentX.current) * 0.06;
      currentY.current += (targetY.current - currentY.current) * 0.06;
      setTick((prev) => prev + 0.25); // slow, calm time step
      requestRef.current = requestAnimationFrame(animate);
    }
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  const cx = 50;
  const cy = 50;

  // Compute positions of orbiting nodes
  const getOrbit = (radius, speed, phase = 0, weight = 1) => {
    const angle = (tick * speed + phase) * (Math.PI / 180);
    return {
      x: cx + Math.cos(angle) * radius + currentX.current * radius * 0.25 * weight,
      y: cy + Math.sin(angle) * radius + currentY.current * radius * 0.25 * weight,
    };
  };

  // Node positions matching orbits
  const p1 = getOrbit(15, 0.6, 45, 0.6);
  const p2 = getOrbit(26, -0.4, 180, 0.9);
  const p3 = getOrbit(36, 0.3, 300, 1.2);
  const p4 = getOrbit(44, -0.2, 90, 1.5);

  return (
    <div className="w-full h-full min-h-[160px] md:min-h-[180px] flex items-center justify-center relative overflow-hidden select-none pointer-events-none">
      <svg 
        viewBox="0 0 100 100" 
        className="w-full max-w-[155px] aspect-square text-[var(--color-text-secondary)] opacity-95"
      >
        {/* Concentric Circle Orbits (Increased stroke width and opacity for crisp viewing) */}
        <circle 
          cx={cx + currentX.current * 3} 
          cy={cy + currentY.current * 3} 
          r="15" 
          stroke="currentColor" 
          strokeWidth="0.55" 
          fill="none" 
          strokeDasharray="1.5 1.5"
          className="opacity-45"
        />
        <circle 
          cx={cx + currentX.current * 5} 
          cy={cy + currentY.current * 5} 
          r="26" 
          stroke="currentColor" 
          strokeWidth="0.45" 
          fill="none" 
          className="opacity-35"
        />
        <circle 
          cx={cx + currentX.current * 7} 
          cy={cy + currentY.current * 7} 
          r="36" 
          stroke="currentColor" 
          strokeWidth="0.35" 
          fill="none" 
          className="opacity-25"
        />
        <circle 
          cx={cx + currentX.current * 9} 
          cy={cy + currentY.current * 9} 
          r="44" 
          stroke="currentColor" 
          strokeWidth="0.25" 
          fill="none" 
          className="opacity-15"
        />

        {/* Central Terracotta Asterisk Star */}
        <g 
          transform={`translate(${currentX.current * 2}, ${currentY.current * 2})`}
          className="text-[var(--color-accent)]"
        >
          {/* Vertical line */}
          <line x1="50" y1="45" x2="50" y2="55" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
          {/* Horizontal line */}
          <line x1="45" y1="50" x2="54" y2="50" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
          {/* Diagonal 1 */}
          <line x1="46.5" y1="46.5" x2="53.5" y2="53.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
          {/* Diagonal 2 */}
          <line x1="46.5" y1="53.5" x2="53.5" y2="46.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
        </g>

        {/* Fine connecting curves (living web structure - higher visibility) */}
        <path 
          d={`M ${p1.x} ${p1.y} Q ${cx + currentX.current * 8} ${cy + currentY.current * 8} ${p2.x} ${p2.y}`}
          stroke="currentColor"
          strokeWidth="0.4"
          fill="none"
          className="opacity-35"
        />
        <path 
          d={`M ${p2.x} ${p2.y} Q ${cx + currentX.current * 10} ${cy + currentY.current * 10} ${p3.x} ${p3.y}`}
          stroke="var(--color-accent)"
          strokeWidth="0.45"
          fill="none"
          className="opacity-55"
        />
        <path 
          d={`M ${p3.x} ${p3.y} Q ${cx + currentX.current * 12} ${cy + currentY.current * 12} ${p4.x} ${p4.y}`}
          stroke="currentColor"
          strokeWidth="0.35"
          fill="none"
          className="opacity-30"
        />
        <path 
          d={`M ${p4.x} ${p4.y} Q ${cx + currentX.current * 6} ${cy + currentY.current * 6} ${p1.x} ${p1.y}`}
          stroke="currentColor"
          strokeWidth="0.3"
          fill="none"
          className="opacity-25"
        />

        {/* Orbiting particles / nodes (Enlarged) */}
        {/* P1: small terracotta node */}
        <circle cx={p1.x} cy={p1.y} r="1.5" fill="var(--color-accent)" />
        {/* P2: black/primary node */}
        <circle cx={p2.x} cy={p2.y} r="2" fill="var(--color-text-primary)" />
        {/* P3: small grey node */}
        <circle cx={p3.x} cy={p3.y} r="1.5" fill="var(--color-text-secondary)" className="opacity-80" />
        {/* P4: terracotta node */}
        <circle cx={p4.x} cy={p4.y} r="2" fill="var(--color-accent)" />
        
      </svg>
    </div>
  );
}
