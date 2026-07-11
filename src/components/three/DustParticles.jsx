import { useState, useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';

/* ═══════════════════════════════════════════════════════════════════
   FLOATING DUST PARTICLES
   Renders subtle floating particles inside the spotlight beam area.
   ═══════════════════════════════════════════════════════════════════ */
export default function DustParticles({ count = 140 }) {
  const pointsRef = useRef();
  const [positions] = useState(() => new Float32Array(count * 3));
  
  // Define initial positions and velocities restricted to the spotlight cone volume
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const y = Math.random() * 7.5 - 1.5; // height [-1.5, 6.0]
      const hFactor = (6.0 - y) / 7.5; // 1 at base, 0 at apex
      const maxR = hFactor * 3.6;
      
      const theta = Math.random() * 2 * Math.PI;
      const r = Math.random() * maxR;
      const x = Math.sin(theta) * r;
      const z = Math.cos(theta) * r;
      
      const sy = Math.random() * 0.12 + 0.04; // upward drift speed
      
      temp.push({ x, y, z, sy, theta, r, maxR });
    }
    return temp;
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const t = state.clock.getElapsedTime();
    const dt = Math.min(delta, 0.1);

    particles.forEach((p, idx) => {
      // 1. Upward vertical drift
      p.y += p.sy * dt * 0.6;
      
      // 2. Slow horizontal sway
      const hFactor = (6.0 - p.y) / 7.5;
      p.x = Math.sin(p.theta + t * 0.3 + idx) * p.r * hFactor;
      p.z = Math.cos(p.theta + t * 0.3 + idx) * p.r * hFactor;

      // 3. Wrap height when reaching the top of the spotlight cone
      if (p.y > 6.0) {
        p.y = -1.5;
        p.r = Math.random() * 3.6;
        p.theta = Math.random() * 2 * Math.PI;
      }

      positions[idx * 3] = p.x;
      positions[idx * 3 + 1] = p.y;
      positions[idx * 3 + 2] = p.z;
    });

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#ffeada"
        transparent
        opacity={0.0} // Dynamic override via parent state opacity
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
