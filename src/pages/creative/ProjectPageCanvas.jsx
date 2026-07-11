import { Suspense, useState, useRef } from 'react';
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber';
import { useTexture, shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

// 1. Create a robust ShaderMaterial class using drei's helper
const BannerMaterial = shaderMaterial(
  {
    uTexture: null,
    uTime: 0,
    uHover: 0
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    uniform float uTime;
    uniform float uHover;
    
    void main() {
      vUv = uv;
      vec3 pos = position;
      
      // Floating ripple effect on the hero banner
      float ripple = sin(pos.x * 2.0 + pos.y * 2.0 + uTime * 2.5) * 0.05 * (uHover + 0.15);
      pos.z += ripple;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  // Fragment Shader
  `
    varying vec2 vUv;
    uniform sampler2D uTexture;
    uniform float uTime;
    uniform float uHover;
    
    void main() {
      vec2 uv = vUv;
      
      // Wave distortion on textures based on hover
      float dist = sin(uv.y * 10.0 + uTime * 2.0) * 0.008 * (uHover + 0.2);
      uv.x += dist;
      
      vec4 color = texture2D(uTexture, uv);
      
      // Subtle color chromatic aberrations on edges
      vec4 colorR = texture2D(uTexture, uv + vec2(0.003 * uHover, 0.0));
      vec4 colorB = texture2D(uTexture, uv - vec2(0.003 * uHover, 0.0));
      
      gl_FragColor = vec4(colorR.r, color.g, colorB.b, color.a);
    }
  `
);

// 2. Register it with R3F so it can be used as <bannerMaterial />
extend({ BannerMaterial });

function BannerMesh({ imagePath }) {
  const meshRef = useRef();
  const materialRef = useRef();
  const [hovered, setHovered] = useState(false);
  const hoverValue = useRef(0);
  const texture = useTexture(imagePath);
  const { viewport } = useThree();

  useFrame((state) => {
    if (!materialRef.current) return;
    const { clock } = state;
    
    materialRef.current.uTime = clock.getElapsedTime();
    
    const targetHover = hovered ? 1 : 0;
    hoverValue.current += (targetHover - hoverValue.current) * 0.08;
    materialRef.current.uHover = hoverValue.current;
  });

  return (
    <mesh
      ref={meshRef}
      scale={[viewport.width, viewport.height, 1]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <planeGeometry args={[1, 1, 32, 32]} />
      <bannerMaterial
        ref={materialRef}
        uTexture={texture}
        transparent={true}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export default function ProjectPageCanvas({ imagePath }) {
  return (
    <div className="w-full aspect-[2.27] relative rounded-[var(--radius-lg)] border border-[var(--color-border)] overflow-hidden bg-[rgba(28,26,23,0.02)] shadow-sm">
      {/* Native fallback image in case WebGL or Suspense fails */}
      <img src={imagePath} alt="Project prototype" className="absolute inset-0 w-full h-full object-cover z-0" loading="lazy" decoding="async" />
      
      <Canvas
        className="relative z-10"
        camera={{ position: [0, 0, 3.8], fov: 55 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[1, 3, 2]} intensity={1.5} />
        <Suspense fallback={null}>
          <BannerMesh key={imagePath} imagePath={imagePath} />
        </Suspense>
      </Canvas>
      <div className="absolute bottom-3 right-3 text-[9px] font-mono tracking-widest uppercase bg-[var(--color-bg-deep)] text-[var(--color-text-secondary)] border border-[var(--color-border)] px-2.5 py-1 rounded-md opacity-70 pointer-events-none select-none z-20">
        Hover to distort
      </div>
    </div>
  );
}
