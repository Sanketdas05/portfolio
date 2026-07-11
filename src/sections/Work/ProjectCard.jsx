import { useRef, useState, useEffect } from 'react';
import { useFrame, extend } from '@react-three/fiber';
import { useTexture, shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

// ── Constants ──
export const RADIUS = 2.2;
export const CARD_W = (2 * RADIUS * Math.PI) / 3; // ≈ 4.61
export const CARD_H = 2.8;
export const SEGMENTS = 48;
export const FLAT_SLOT = CARD_W + 0.35;
const ANGLE_STEP = (2 * Math.PI) / 3; // 120° per card
const NUM_PROJECTS = 3;

// ── Define Custom Material with water/liquid shaders & color reveal ──
const BendMaterial = shaderMaterial(
  {
    uTexture: null,
    uBendProgress: 0.0,
    uRadius: RADIUS,
    uHover: 0.0,
    uTime: 0.0,
    uMouseUV: new THREE.Vector2(0.5, 0.5),
    uReflectionFade: 0.0,
  },
  // Vertex Shader
  `
  varying vec2 vUv;
  uniform float uBendProgress;
  uniform float uRadius;
  uniform float uHover;
  uniform float uTime;
  uniform vec2 uMouseUV;

  void main() {
    vUv = uv;
    vec3 pos = position;

    // 1. Cylinder Bend
    if (uBendProgress > 0.001) {
      float theta = pos.x / uRadius;
      vec3 bent = vec3(
        sin(theta) * uRadius,
        pos.y,
        (cos(theta) - 1.0) * uRadius
      );
      pos = mix(pos, bent, uBendProgress);
    }

    // 2. Vertex ripple on hover (subtle liquid displacement)
    if (uHover > 0.001) {
      float dist = distance(uv, uMouseUV);
      float wave = sin(dist * 12.0 - uTime * 4.0) * 0.02 * (1.0 - smoothstep(0.0, 0.6, dist)) * uHover;
      pos.z += wave;
    }

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
  `,
  // Fragment Shader (Liquid distortion, cursor ripples, and localized color reveal)
  `
  varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform float uHover;
  uniform float uTime;
  uniform vec2 uMouseUV;
  uniform float uReflectionFade;

  void main() {
    vec2 uv = vUv;

    // Distort UVs if hovered for water wave effect
    if (uHover > 0.001) {
      // 1. Organic background water waves
      float waveX = sin(uv.y * 7.0 + uTime * 1.8) * 0.012 * uHover;
      float waveY = cos(uv.x * 7.0 + uTime * 1.8) * 0.012 * uHover;
      uv.x += waveX;
      uv.y += waveY;

      // 2. Localized cursor water ripple
      float dist = distance(vUv, uMouseUV);
      if (dist < 0.4) {
        float factor = 1.0 - (dist / 0.4);
        float ripple = sin(dist * 32.0 - uTime * 8.0) * 0.007 * factor * uHover;
        uv += normalize(uv - uMouseUV) * ripple;
      }
    }

    // Color texture sample (using distorted UVs)
    vec4 color = texture2D(uTexture, uv);

    // Convert sample to grayscale
    float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
    vec3 grayscale = vec3(gray);

    // Localized color reveal lens centered on mouse position
    float distToMouse = distance(vUv, uMouseUV);
    float colorMask = 1.0 - smoothstep(0.08, 0.28, distToMouse); // reveal radius
    colorMask *= uHover; // only reveal color when active mouse hover is present

    // Mix grayscale with color based on lens reveal mask
    vec3 finalRGB = mix(grayscale, color.rgb, colorMask);

    // Reflection vertical fade
    float alpha = color.a;
    if (uReflectionFade > 0.5) {
      alpha *= uv.y * 0.35;
    }

    gl_FragColor = vec4(finalRGB, alpha);
  }
  `
);

extend({ BendMaterial });

export default function ProjectCard({ project, index, copy, activeSlot, viewMode, onClick }) {
  const meshRef = useRef();
  const materialRef = useRef();
  const reflMeshRef = useRef();
  const reflMaterialRef = useRef();

  const [hovered, setHovered] = useState(false);
  const hoverVal = useRef(0);
  const mouseUV = useRef(new THREE.Vector2(0.5, 0.5));
  
  // Track click vs drag start positions
  const dragStartPos = useRef({ x: 0, y: 0 });

  // Scale tracking for smooth mount/unmount animations of copies
  const isPrimary = copy === 0;
  const scaleVal = useRef(viewMode === 'FLAT' && !isPrimary ? 1.0 : 0.0);

  // Guarantee cursor resets if we unmount (e.g. navigation)
  useEffect(() => {
    return () => {
      window.dispatchEvent(new CustomEvent('cursor-state', { detail: null }));
    };
  }, []);

  const texture = useTexture(project.thumbnail);
  const [compositeTexture, setCompositeTexture] = useState(null);

  // Determine the category tag of the project based on its slug
  const categoryTag = project.slug === 'pace' 
    ? 'PRODUCT' 
    : project.slug === 'bmw-m4' 
      ? '3D' 
      : 'ANIMATION';

  // Draw the category text label dynamically onto the image canvas texture
  // This allows the category tag to morph, bend, wave, and reveal color identically to the image
  useEffect(() => {
    if (!texture.image) return;

    const img = texture.image;
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth || 1024;
    canvas.height = img.naturalHeight || 512;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw base thumbnail image
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    // Style the category overlay pill tag
    ctx.font = 'bold 36px "Space Grotesk", sans-serif';
    ctx.textBaseline = 'top';
    ctx.textAlign = 'left';

    const text = categoryTag;
    const textWidth = ctx.measureText(text).width;
    const px = 50; // padding x
    const py = 50; // padding y

    // Draw pill backdrop
    ctx.fillStyle = 'rgba(10, 9, 8, 0.7)';
    ctx.beginPath();
    ctx.roundRect(px - 15, py - 10, textWidth + 30, 56, 10);
    ctx.fill();

    // Draw text label
    ctx.fillStyle = '#ffffff';
    ctx.fillText(text, px, py);

    // Create CanvasTexture
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.needsUpdate = true;

    setCompositeTexture(tex);

    return () => {
      tex.dispose();
    };
  }, [texture, categoryTag]);

  const activeTexture = compositeTexture || texture;

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const isArc = viewMode === 'ARC';
    const dt = Math.min(delta, 0.1);
    
    const targetBend = isArc ? 1.0 : 0.0;
    const targetHover = hovered ? 1.0 : 0.0;
    
    // Check current bend progress of the material to detect if transition is finished
    const currentBend = materialRef.current?.uniforms.uBendProgress.value ?? targetBend;
    const isCylinderUnfolded = currentBend < 0.02; // only show duplicate copies once flat unfolding is 98% complete

    // Scale animation: copies scale down to 0 during transition and ARC mode
    const targetScale = (viewMode === 'FLAT' && isCylinderUnfolded) || isPrimary ? 1.0 : 0.0;
    
    const lerpSpeed = targetScale === 0.0 ? 0.25 : 0.12;
    scaleVal.current += (targetScale - scaleVal.current) * lerpSpeed;

    // Apply scale to primary card mesh
    if (meshRef.current) {
      meshRef.current.scale.set(scaleVal.current, scaleVal.current, scaleVal.current);
    }
    // Apply scale and inversion to reflection mesh
    if (reflMeshRef.current) {
      reflMeshRef.current.scale.set(scaleVal.current, -scaleVal.current, scaleVal.current);
    }

    // ── Calculate targets dynamically ──
    const flatAbsoluteX = (copy * NUM_PROJECTS + index) * FLAT_SLOT;
    const flatRelativeX = (copy * NUM_PROJECTS + (index - activeSlot)) * FLAT_SLOT;
    const flatTargetX = THREE.MathUtils.lerp(flatAbsoluteX, flatRelativeX, currentBend);

    const targetX = isArc 
      ? Math.sin(index * ANGLE_STEP) * RADIUS 
      : flatTargetX;

    const targetZ = isArc 
      ? Math.cos(index * ANGLE_STEP) * RADIUS 
      : 0;

    const targetRotY = isArc ? index * ANGLE_STEP : 0;

    // ── Sleek, Classy Ease-Out-Expo Deceleration ──
    const easeSpeed = 9.0;
    const easeFactor = 1.0 - Math.exp(-easeSpeed * dt);

    if (meshRef.current) {
      meshRef.current.position.x += (targetX - meshRef.current.position.x) * easeFactor;
      meshRef.current.position.y += (0 - meshRef.current.position.y) * easeFactor;
      meshRef.current.position.z += (targetZ - meshRef.current.position.z) * easeFactor;

      let diffRot = targetRotY - meshRef.current.rotation.y;
      diffRot = Math.atan2(Math.sin(diffRot), Math.cos(diffRot));
      meshRef.current.rotation.y += diffRot * easeFactor;
    }

    // Sync Inverted Reflection plane positions
    if (reflMeshRef.current) {
      reflMeshRef.current.position.x = meshRef.current.position.x;
      reflMeshRef.current.position.y = meshRef.current.position.y - CARD_H - 0.03;
      reflMeshRef.current.position.z = meshRef.current.position.z;
      reflMeshRef.current.rotation.y = meshRef.current.rotation.y;
    }

    hoverVal.current += (targetHover - hoverVal.current) * 0.08;

    // Update main card material uniforms directly in uniforms object
    if (materialRef.current) {
      materialRef.current.uniforms.uTexture.value = activeTexture;
      materialRef.current.uniforms.uTime.value = t;
      materialRef.current.uniforms.uHover.value = hoverVal.current;
      materialRef.current.uniforms.uMouseUV.value.copy(mouseUV.current);
      materialRef.current.uniforms.uBendProgress.value += (targetBend - materialRef.current.uniforms.uBendProgress.value) * easeFactor;
    }

    // Update reflection material uniforms
    if (reflMaterialRef.current) {
      reflMaterialRef.current.uniforms.uTexture.value = activeTexture;
      reflMaterialRef.current.uniforms.uTime.value = t;
      reflMaterialRef.current.uniforms.uHover.value = hoverVal.current;
      reflMaterialRef.current.uniforms.uMouseUV.value.copy(mouseUV.current);
      reflMaterialRef.current.uniforms.uBendProgress.value = materialRef.current?.uniforms.uBendProgress.value ?? targetBend;
    }
  });

  return (
    <group>
      {/* Primary card */}
      <mesh
        ref={meshRef}
        onPointerDown={(e) => {
          dragStartPos.current = { x: e.clientX, y: e.clientY };
        }}
        onClick={(e) => {
          e.stopPropagation();
          const dx = e.clientX - dragStartPos.current.x;
          const dy = e.clientY - dragStartPos.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 6) {
            onClick(project.slug);
          }
        }}
        onPointerOver={(e) => { 
          e.stopPropagation(); 
          setHovered(true); 
          window.dispatchEvent(new CustomEvent('cursor-state', { detail: { hover: true, text: 'VIEW' } }));
        }}
        onPointerOut={(e) => { 
          e.stopPropagation(); 
          setHovered(false); 
          window.dispatchEvent(new CustomEvent('cursor-state', { detail: null }));
        }}
        onPointerMove={(e) => {
          e.stopPropagation();
          if (e.uv) {
            mouseUV.current.copy(e.uv);
          }
        }}
      >
        <planeGeometry args={[CARD_W, CARD_H, SEGMENTS, 2]} />
        <bendMaterial
          ref={materialRef}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Reflection */}
      <mesh ref={reflMeshRef}>
        <planeGeometry args={[CARD_W, CARD_H, SEGMENTS, 2]} />
        <bendMaterial
          ref={reflMaterialRef}
          transparent
          uReflectionFade={1.0}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}
