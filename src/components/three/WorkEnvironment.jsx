import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import DustParticles from './DustParticles';
import './VolumetricConeMaterial';

/* ═══════════════════════════════════════════════════════════════════
   WORK ENVIRONMENT CONTROLLER
   Animates the physical elements (volumetric spotlight, circular pedestal,
   dust particles, and ambient light dimming) based on viewMode.
   ═══════════════════════════════════════════════════════════════════ */
export default function WorkEnvironment({ viewMode }) {
  const ambientLightRef = useRef();
  const spotlightRef = useRef();
  const coneRef = useRef();
  const coneMaterialRef = useRef();
  const pedestalRef = useRef();
  const dustParticlesRef = useRef();

  // Snappable tracking refs
  const ambientIntensity = useRef(viewMode === 'ARC' ? 0.25 : 1.3);
  const spotlightIntensity = useRef(viewMode === 'ARC' ? 15.0 : 0.0);
  const coneOpacity = useRef(viewMode === 'ARC' ? 1.0 : 0.0);
  const pedestalScaleY = useRef(viewMode === 'ARC' ? 1.0 : 0.0);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.1);
    const easeSpeed = 9.0;
    const easeFactor = 1.0 - Math.exp(-easeSpeed * dt);

    const isArc = viewMode === 'ARC';
    const targetAmbient = isArc ? 0.25 : 1.3;
    const targetSpot = isArc ? 15.0 : 0.0;
    const targetCone = isArc ? 1.0 : 0.0;
    const targetPed = isArc ? 1.0 : 0.0;

    // Smoothly transition environment parameters
    ambientIntensity.current += (targetAmbient - ambientIntensity.current) * easeFactor;
    spotlightIntensity.current += (targetSpot - spotlightIntensity.current) * easeFactor;
    coneOpacity.current += (targetCone - coneOpacity.current) * easeFactor;
    pedestalScaleY.current += (targetPed - pedestalScaleY.current) * easeFactor;

    // Apply values
    if (ambientLightRef.current) {
      ambientLightRef.current.intensity = ambientIntensity.current;
    }
    if (spotlightRef.current) {
      spotlightRef.current.intensity = spotlightIntensity.current;
    }
    if (coneMaterialRef.current) {
      coneMaterialRef.current.uniforms.uOpacity.value = coneOpacity.current;
    }
    
    // Scale pedestal to zero and hide in FLAT mode
    if (pedestalRef.current) {
      const s = pedestalScaleY.current;
      pedestalRef.current.scale.set(s, s, s);
      pedestalRef.current.position.y = -1.5 * s - 0.5 * (1.0 - s);
      pedestalRef.current.visible = s > 0.01;
    }

    // Fade dust particles opacity
    if (dustParticlesRef.current) {
      dustParticlesRef.current.children[0].material.opacity = 0.45 * coneOpacity.current;
    }
  });

  return (
    <group>
      {/* Dimmed Ambient Lighting in ARC mode */}
      <ambientLight ref={ambientLightRef} intensity={0.25} />
      
      {/* Volumetric overhead spotlight (moved up to Y = 6.0 to avoid clipping cards) */}
      <spotLight
        ref={spotlightRef}
        position={[0, 6.0, 0]}
        angle={0.7}
        penumbra={0.7}
        intensity={15}
        color="#ffeada"
        castShadow
      />

      {/* Volumetric cone mesh (expanded height/radius to surround cards) */}
      <mesh ref={coneRef} position={[0, 2.25, 0]}>
        <coneGeometry args={[3.6, 7.5, 64, 1, true]} />
        <volumetricConeMaterial
          ref={coneMaterialRef}
          transparent
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Circular Exhibition Pedestal */}
      <group ref={pedestalRef} position={[0, -1.5, 0]}>
        {/* Upper pedestal disk */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[2.5, 2.65, 0.25, 64]} />
          <meshStandardMaterial
            color="#121110"
            roughness={0.7}
            metalness={0.75}
          />
        </mesh>
        {/* Lower base border disk */}
        <mesh position={[0, -0.165, 0]}>
          <cylinderGeometry args={[2.65, 2.75, 0.08, 64]} />
          <meshStandardMaterial
            color="#080707"
            roughness={0.8}
            metalness={0.85}
          />
        </mesh>
      </group>

      {/* Floating Dust Particles */}
      <group ref={dustParticlesRef}>
        <DustParticles count={150} />
      </group>
    </group>
  );
}
