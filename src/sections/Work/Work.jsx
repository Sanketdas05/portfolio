import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { Suspense } from 'react';
import { PROJECTS } from '../../config/data';

const WorkCanvas = React.lazy(() => import('./WorkCanvas'));

gsap.registerPlugin(ScrollTrigger);

/**
 * Work Section — "From Lobby to Exhibition" cinematic transition.
 * 
 * Scroll-driven sequence:
 * 01. LOBBY (BRIGHT) — hero visible, everything open
 * 02. LIGHTS DIM — ambient fades out
 * 03. CURTAINS CLOSE — two black panels slide in from L/R
 * 04. SILENCE & DARKNESS — brief full black
 * 05. SPOTLIGHT ON — volumetric light fades in
 * 06. EXHIBITION REVEALED — cylinder appears in the spotlight
 * 
 * Features ARC (curved cylinder orbit) and FLAT (linear sliding) view modes.
 */
export default function Work() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewMode, setViewMode] = useState('ARC');
  const navigate = useNavigate();

  // Refs for scroll-driven curtain animation
  const sectionRef = useRef(null);
  const curtainLeftRef = useRef(null);
  const curtainRightRef = useRef(null);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);

  const activeProject = PROJECTS[activeIndex] || PROJECTS[0];

  function handlePrev() {
    setActiveIndex((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length);
  }

  function handleNext() {
    setActiveIndex((prev) => (prev + 1) % PROJECTS.length);
  }

  function handleProjectClick(slug) {
    navigate(`/work/${slug}`);
  }

  function toggleViewMode() {
    setViewMode((prev) => (prev === 'ARC' ? 'FLAT' : 'ARC'));
  }

  // ── GSAP ScrollTrigger: Cinematic "Lobby to Exhibition" transition ──
  useEffect(() => {
    const section = sectionRef.current;
    const curtainL = curtainLeftRef.current;
    const curtainR = curtainRightRef.current;
    const overlay = overlayRef.current;
    const content = contentRef.current;

    if (!section || !curtainL || !curtainR || !overlay || !content) return;

    // Build the cinematic timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'top 10%',
        scrub: 1.2,
        // markers: false,
      },
    });

    // Phase 1: Curtains slide in from left and right (0% → 40%)
    tl.fromTo(curtainL, 
      { xPercent: -100 }, 
      { xPercent: 0, duration: 0.4, ease: 'power2.inOut' }, 
      0
    );
    tl.fromTo(curtainR, 
      { xPercent: 100 }, 
      { xPercent: 0, duration: 0.4, ease: 'power2.inOut' }, 
      0
    );

    // Phase 2: Full darkness overlay fades in (30% → 50%)
    tl.fromTo(overlay,
      { opacity: 0 },
      { opacity: 1, duration: 0.2, ease: 'power1.in' },
      0.3
    );

    // Phase 3: Curtains slide back out (50% → 70%)
    tl.to(curtainL,
      { xPercent: -100, duration: 0.2, ease: 'power2.inOut' },
      0.5
    );
    tl.to(curtainR,
      { xPercent: 100, duration: 0.2, ease: 'power2.inOut' },
      0.5
    );

    // Phase 4: Darkness lifts, exhibition content fades in (60% → 100%)
    tl.fromTo(content,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' },
      0.6
    );

    // Phase 5: Overlay fades out to reveal the dark exhibition (70% → 100%)
    tl.to(overlay,
      { opacity: 0, duration: 0.3, ease: 'power1.out' },
      0.7
    );

    // ScrollTrigger to toggle dark/light theme at #work (Projects) section
    const themeTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 80%', // When top of #work enters 80% of viewport (same as cinematic curtain)
      onEnter: () => document.body.classList.add('theme-dark'),
      onLeaveBack: () => document.body.classList.remove('theme-dark'),
      onEnterBack: () => document.body.classList.add('theme-dark'),
    });

    return () => {
      tl.kill();
      themeTrigger.kill();
      // Ensure we remove the dark theme when the component unmounts 
      // (e.g., when navigating to the Project details page)
      document.body.classList.remove('theme-dark');
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === section) st.kill();
      });
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="work" 
      className="min-h-screen py-16 px-[var(--container-padding)] border-b border-[var(--color-border)] relative overflow-hidden flex flex-col justify-between z-10"
    >
      
      {/* ═══ CURTAIN OVERLAYS (scroll-driven) ═══ */}
      {/* Left curtain */}
      <div 
        ref={curtainLeftRef}
        className="curtain-panel curtain-left"
        style={{ transform: 'translateX(-100%)' }}
      />
      {/* Right curtain */}
      <div 
        ref={curtainRightRef}
        className="curtain-panel curtain-right"
        style={{ transform: 'translateX(100%)' }}
      />
      {/* Full darkness overlay */}
      <div 
        ref={overlayRef}
        className="curtain-overlay"
        style={{ opacity: 0 }}
      />

      {/* Giant Background Serif Text — like Kenichi Aikawa's "PORTFOLIO" */}
      <div className="absolute inset-0 z-0 select-none flex items-center justify-center pointer-events-none w-full h-full">
        <h2 
          className="font-black uppercase tracking-tight text-center leading-[0.8] select-none pointer-events-none transition-all duration-700 ease-out"
          style={{ 
            fontFamily: '"DM Serif Display", Georgia, "Times New Roman", serif',
            fontSize: 'clamp(8rem, 22vw, 25rem)',
            color: 'transparent',
            WebkitTextStrokeWidth: '1.2px',
            WebkitTextStrokeColor: 'var(--color-border)',
            opacity: 0.85
          }}
        >
          PROJECTS
        </h2>
      </div>

      {/* ═══ EXHIBITION CONTENT (fades in after curtain sequence) ═══ */}
      <div ref={contentRef} className="flex flex-col justify-between flex-1 relative z-10">

        {/* TOP Section Header */}
        <div className="w-full flex justify-between items-center border-b border-[var(--color-border)] pb-6">
          <div>
            <span className="text-[var(--text-xs)] uppercase tracking-widest text-[var(--color-accent)] font-semibold block">
              02 / Works
            </span>
          </div>
          <div className="hidden md:block">
            <span className="text-[10px] font-mono tracking-widest text-[var(--color-text-muted)] uppercase">
              {viewMode === 'ARC' ? 'Exhibition Mode · Orbit View' : 'Gallery Mode · Linear Slide'}
            </span>
          </div>
        </div>

        {/* CENTRAL 3D VIEWPORT */}
        <div className="w-full h-[58vh] md:h-[66vh] relative z-10 flex items-center justify-center my-4">
          <Suspense fallback={<div className="text-[var(--color-text-muted)] text-[12px] uppercase tracking-widest font-mono">Loading 3D Engine...</div>}>
            <WorkCanvas 
              projects={PROJECTS}
              activeIndex={activeIndex}
              onActiveChange={setActiveIndex}
              viewMode={viewMode}
              onProjectClick={handleProjectClick}
            />
          </Suspense>
        </div>

        {/* BOTTOM CONTROLLER PANEL */}
        <div className="w-full flex flex-col items-center justify-center relative z-20 gap-3">
          
          <div className="flex items-center gap-3">
            
            {/* Main Navigation Pill */}
            <div className="bg-[var(--color-bg-deep)] border border-[var(--color-border)] rounded-full px-5 py-2.5 flex items-center gap-4 shadow-xl select-none backdrop-blur-md">
              
              {/* Project Thumbnail Circle */}
              <div className="w-7 h-7 rounded-full overflow-hidden border border-[var(--color-border)] flex-shrink-0">
                <img 
                  src={activeProject.thumbnail} 
                  alt={activeProject.title} 
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              
              {/* Active Project Title */}
              <span className="font-heading font-bold uppercase tracking-widest text-[11px] text-[var(--color-text-primary)] min-w-[160px] text-center truncate">
                {activeProject.title}
              </span>
              
              {/* Prev / Next Arrows */}
              <div className="flex items-center gap-2 border-l border-[var(--color-border)] pl-4">
                <button 
                  onClick={handlePrev}
                  className="p-1.5 rounded-full hover:bg-[var(--color-glass)] hover:text-[var(--color-accent)] transition-all duration-300 cursor-pointer"
                  aria-label="Previous Project"
                >
                  <FiArrowLeft size={14} />
                </button>
                <button 
                  onClick={handleNext}
                  className="p-1.5 rounded-full hover:bg-[var(--color-glass)] hover:text-[var(--color-accent)] transition-all duration-300 cursor-pointer"
                  aria-label="Next Project"
                >
                  <FiArrowRight size={14} />
                </button>
              </div>

            </div>

            {/* View Mode Toggle Button */}
            <button 
              onClick={toggleViewMode}
              className="h-[42px] rounded-full bg-[var(--color-bg-deep)] border border-[var(--color-border)] flex items-center justify-center gap-2 shadow-xl hover:border-[var(--color-accent)] text-[var(--color-text-primary)] hover:text-[var(--color-accent)] transition-all duration-300 cursor-pointer px-4 backdrop-blur-md"
              title="Toggle View Mode"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {viewMode === 'ARC' ? (
                  // Arc icon
                  <path d="M21 12a9 9 0 0 1-9 9 9 9 0 0 1-9-9 9 9 0 0 1 9-9" />
                ) : (
                  // Flat/list icon
                  <>
                    <line x1="4" y1="6" x2="20" y2="6" />
                    <line x1="4" y1="12" x2="20" y2="12" />
                    <line x1="4" y1="18" x2="20" y2="18" />
                  </>
                )}
              </svg>
              <span className="font-heading font-bold uppercase tracking-widest text-[10px]">
                {viewMode === 'ARC' ? 'ARC' : 'FLAT'}
              </span>
            </button>

          </div>

          {/* Hint text */}
          <span className="text-[9px] font-mono tracking-widest text-[var(--color-text-muted)] uppercase block">
            {viewMode === 'ARC' ? 'Orbit: drag to rotate · click to view' : 'Drag to slide · click to open'}
          </span>

        </div>

      </div>

    </section>
  );
}
