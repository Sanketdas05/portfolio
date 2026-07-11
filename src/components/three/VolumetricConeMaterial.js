import * as THREE from 'three';
import { shaderMaterial } from '@react-three/drei';
import { extend } from '@react-three/fiber';

/* ═══════════════════════════════════════════════════════════════════
   VOLUMETRIC LIGHT CONE SHADER
   Renders a semi-transparent cone representing the spotlight beam,
   fading out near the edges using a Fresnel edge density calculation.
   ═══════════════════════════════════════════════════════════════════ */
const VolumetricConeMaterial = shaderMaterial(
  {
    uColor: new THREE.Color('#ffeada'),
    uOpacity: 0.0
  },
  // Vertex Shader
  `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  void main() {
    vUv = uv;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vViewPosition = -mvPosition.xyz;
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * mvPosition;
  }
  `,
  // Fragment Shader
  `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  uniform vec3 uColor;
  uniform float uOpacity;
  void main() {
    // Fade from top (apex, vUv.y = 1) to bottom (base, vUv.y = 0)
    float verticalFade = vUv.y;
    
    // Gaseous volumetric density: brightest in the middle, soft at edges
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(vViewPosition);
    float centerDensity = pow(abs(dot(normal, viewDir)), 1.5);
    
    float intensity = verticalFade * centerDensity * 0.65 * uOpacity;
    
    gl_FragColor = vec4(uColor, intensity);
  }
  `
);

extend({ VolumetricConeMaterial });

export { VolumetricConeMaterial };
