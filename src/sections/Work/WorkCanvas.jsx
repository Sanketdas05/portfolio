import { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import ProjectCard, { RADIUS, CARD_W, FLAT_SLOT } from './ProjectCard';
import * as THREE from 'three';

const ANGLE_STEP = (2 * Math.PI) / 3; // 120° per card
const NUM_PROJECTS = 3;
const FLAT_SET_W = NUM_PROJECTS * FLAT_SLOT; // total width of one set of 3 cards (≈ 14.88)

import WorkEnvironment from '../../components/three/WorkEnvironment';

/* ═══════════════════════════════════════════════════════════════════
   CAMERA MANAGER — smoothly slides the camera position back to the
   front looking straight when FLAT mode is active using Ease-Out-Expo.
   ═══════════════════════════════════════════════════════════════════ */
function CameraManager({ viewMode }) {
  const { camera } = useThree();

  useFrame((state, delta) => {
    if (viewMode === 'FLAT') {
      const dt = Math.min(delta, 0.1);
      const easeSpeed = 9.0;
      const easeFactor = 1.0 - Math.exp(-easeSpeed * dt);

      // Smooth Ease-Out-Expo back to frontal Z axis
      camera.position.x += (0 - camera.position.x) * easeFactor;
      camera.position.y += (0.5 - camera.position.y) * easeFactor;
      camera.position.z += (5.0 - camera.position.z) * easeFactor;
      
      // Update camera orientation
      camera.lookAt(0, 0, 0);
    }
  });

  return null;
}

/* ═══════════════════════════════════════════════════════════════════
   UNIFIED CARD RIG — maintains card mount state, morphs geometry,
   handles drag sliding in FLAT mode and camera angle tracking in ARC.
   ═══════════════════════════════════════════════════════════════════ */
function UnifiedRig({
  projects,
  activeIndex,
  onActiveChange,
  viewMode,
  onProjectClick,
  isInteracting,
  controlsRef,
  containerRef,
}) {
  const groupRef = useRef();
  const { camera } = useThree();

  // ── FLAT mode group drag/slide variables ──
  const targetX = useRef(-activeIndex * FLAT_SLOT);
  const currentX = useRef(-activeIndex * FLAT_SLOT);

  const isDragging = useRef(false);
  const dragStartPointerX = useRef(0);
  const dragStartTargetX = useRef(0);
  const dragVelocity = useRef(0);
  const lastPointerX = useRef(0);
  const lastTime = useRef(0);

  // Sync when activeIndex changes from pill navigation (Prev / Next buttons)
  useEffect(() => {
    const currentSlot = Math.round(targetX.current / FLAT_SLOT);
    const currentIdx = ((-currentSlot % NUM_PROJECTS) + NUM_PROJECTS) % NUM_PROJECTS;
    
    if (currentIdx !== activeIndex) {
      let step = activeIndex - currentIdx;
      if (step > NUM_PROJECTS / 2) step -= NUM_PROJECTS;
      else if (step < -NUM_PROJECTS / 2) step += NUM_PROJECTS;
      
      targetX.current = (currentSlot - step) * FLAT_SLOT;
    }
  }, [activeIndex]);

  // Drag listeners on the canvas container (FLAT mode sliding)
  useEffect(() => {
    const el = containerRef?.current;
    if (!el) return;

    function onDown(e) {
      if (viewMode !== 'FLAT') return;
      isDragging.current = true;
      const cx = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
      dragStartPointerX.current = cx;
      lastPointerX.current = cx;
      dragStartTargetX.current = targetX.current;
      dragVelocity.current = 0;
      lastTime.current = performance.now();
    }

    function onMove(e) {
      if (!isDragging.current || viewMode !== 'FLAT') return;
      const cx = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
      const now = performance.now();
      const dt = now - lastTime.current;
      if (dt > 0) dragVelocity.current = (cx - lastPointerX.current) / dt;
      targetX.current = dragStartTargetX.current + (cx - dragStartPointerX.current) * 0.01;
      lastPointerX.current = cx;
      lastTime.current = now;
    }

    function onUp() {
      if (!isDragging.current) return;
      isDragging.current = false;

      // Inertia snap
      const inertia = dragVelocity.current * 100 * 0.01;
      const raw = targetX.current + inertia;
      const snapped = Math.round(raw / FLAT_SLOT) * FLAT_SLOT;
      targetX.current = snapped;

      // Derive active index
      const rawIdx = Math.round(-snapped / FLAT_SLOT);
      const idx = ((rawIdx % NUM_PROJECTS) + NUM_PROJECTS) % NUM_PROJECTS;
      if (idx !== activeIndex) onActiveChange(idx);
    }

    el.addEventListener('mousedown', onDown);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    el.addEventListener('touchstart', onDown, { passive: true });
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('touchend', onUp);

    return () => {
      el.removeEventListener('mousedown', onDown);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      el.removeEventListener('touchstart', onDown);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onUp);
    };
  }, [activeIndex, onActiveChange, containerRef, viewMode]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const isArc = viewMode === 'ARC';
    const dt = Math.min(delta, 0.1);
    const easeSpeed = 9.0;
    const easeFactor = 1.0 - Math.exp(-easeSpeed * dt);

    // ── 1. ARC MODE CAMERA DECELERATION (Ease-Out-Expo) ──
    if (isArc) {
      let camAngle = Math.atan2(camera.position.x, camera.position.z);
      if (camAngle < 0) camAngle += 2 * Math.PI;

      if (isInteracting.current) {
        // Active Orbit dragging: derive index from camera position angle
        const rawIdx = Math.round(camAngle / ANGLE_STEP) % NUM_PROJECTS;
        const idx = (rawIdx + NUM_PROJECTS) % NUM_PROJECTS;
        if (idx !== activeIndex) {
          onActiveChange(idx);
        }
      } else {
        // Idle camera angle auto-snap using wobblying-free Ease-Out-Expo
        const targetAngle = activeIndex * ANGLE_STEP;
        let diff = targetAngle - camAngle;
        diff = Math.atan2(Math.sin(diff), Math.cos(diff));

        const newAngle = camAngle + diff * easeFactor;
        const distance = Math.sqrt(camera.position.x * camera.position.x + camera.position.z * camera.position.z);
        camera.position.x = Math.sin(newAngle) * distance;
        camera.position.z = Math.cos(newAngle) * distance;
        
        if (controlsRef.current) {
          controlsRef.current.update();
        }
      }
    }

    // ── 2. FLAT MODE SLIDING DECELERATION (Ease-Out-Expo) ──
    const targetGroupX = isArc ? 0 : targetX.current;
    currentX.current += (targetGroupX - currentX.current) * easeFactor;
    groupRef.current.position.x = currentX.current;

    // ── 3. DYNAMIC WRAPPING DURING FLAT MODE SLIDING ──
    if (!isArc) {
      const halfSetW = FLAT_SET_W / 2;
      if (targetX.current < -halfSetW) {
        targetX.current += FLAT_SET_W;
        currentX.current += FLAT_SET_W;
        if (isDragging.current) {
          dragStartTargetX.current += FLAT_SET_W;
        }
      } else if (targetX.current > halfSetW) {
        targetX.current -= FLAT_SET_W;
        currentX.current -= FLAT_SET_W;
        if (isDragging.current) {
          dragStartTargetX.current -= FLAT_SET_W;
        }
      }
    }
  });

  // Calculate activeSlot index representing the active card's slot
  const activeSlot = Math.round(-targetX.current / FLAT_SLOT);

  // Render 5 copies (15 cards total) in a single list
  const cards = [];
  for (let copy = -2; copy <= 2; copy++) {
    projects.forEach((project, i) => {
      cards.push(
        <ProjectCard
          key={`${project.slug}-${copy}`}
          project={project}
          index={i}
          copy={copy}
          activeSlot={activeSlot}
          viewMode={viewMode}
          onClick={onProjectClick}
        />
      );
    });
  }

  return <group ref={groupRef}>{cards}</group>;
}



/* ═══════════════════════════════════════════════════════════════════
   WORK CANVAS 
   ═══════════════════════════════════════════════════════════════════ */
export default function WorkCanvas({
  projects,
  activeIndex,
  onActiveChange,
  viewMode,
  onProjectClick,
}) {
  const [scale, setScale] = useState(1);
  const containerRef = useRef();
  const controlsRef = useRef();
  const isInteracting = useRef(false);

  useEffect(() => {
    function onResize() {
      const w = window.innerWidth;
      if (w < 480) setScale(0.55);
      else if (w < 768) setScale(0.7);
      else if (w < 1200) setScale(0.85);
      else setScale(1.0);
    }
    window.addEventListener('resize', onResize);
    onResize();
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative cursor-grab active:cursor-grabbing select-none"
    >
      <Canvas
        camera={{ position: [0, 0.5, 5.0], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Subtle fog for depth and atmosphere in the exhibition hall */}
        <fog attach="fog" args={['#0a0908', 6, 18]} />
        
        <directionalLight position={[2, 4, 3]} intensity={0.4} />

        {/* CameraManager: resets camera using Ease-Out-Expo when FLAT mode starts */}
        <CameraManager viewMode={viewMode} />

        {/* OrbitControls: conditionally mounted ONLY in ARC mode. */}
        {viewMode === 'ARC' && (
          <OrbitControls
            ref={controlsRef}
            enablePan={false}
            enableZoom={false}
            enableRotate={true}
            enableDamping={true}
            dampingFactor={0.05}
            rotateSpeed={0.45}
            autoRotate={true}
            autoRotateSpeed={-0.4}
            minDistance={3.5}
            maxDistance={7.0}
            minPolarAngle={Math.PI / 2.8}
            maxPolarAngle={Math.PI / 1.55}
            onStart={() => {
              isInteracting.current = true;
            }}
            onEnd={() => {
              isInteracting.current = false;
            }}
            makeDefault
          />
        )}

        <Suspense fallback={null}>
          <group scale={[scale, scale, scale]}>
            {/* WorkEnvironment: Handles dynamic ambient lights, volumetric cones, pedestals & particles */}
            <WorkEnvironment viewMode={viewMode} />
            <UnifiedRig
              projects={projects}
              activeIndex={activeIndex}
              onActiveChange={onActiveChange}
              viewMode={viewMode}
              onProjectClick={onProjectClick}
              isInteracting={isInteracting}
              controlsRef={controlsRef}
              containerRef={containerRef}
            />
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
}
