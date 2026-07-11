import { Canvas } from '@react-three/fiber';

/**
 * Persistent 3D scene container.
 * Wraps the R3F Canvas — child meshes, lights, and effects are added in Phase 3.
 *
 * This component should be rendered once at layout level,
 * not inside individual sections.
 */
export default function Scene({ children }) {
  return (
    <Canvas
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    >
      {children}
    </Canvas>
  );
}
