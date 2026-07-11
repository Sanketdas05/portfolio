import { motion } from 'framer-motion';
import { useMousePosition } from '../../hooks/useMousePosition';
import KineticGraphic from './KineticGraphic';

/**
 * Hero Section (Version 4.1) — Compact layout tuned to fit exactly on viewport heights.
 * Displays:
 * - Richer, darker terracotta ambient glow that follows mouse coordinates.
 * - Topological contour lines in the background.
 * - Row 1: Massive "CREATIVE DEVELOPER" title (Scaled down to clamp(2.2rem,6vw,4.8rem)).
 * - Row 2: 4-Column Editorial Grid (Reduced vertical padding/margin to save height):
 *   - Column 1: [ WHAT I BUILD ] (Intro paragraph + capabilities list)
 *   - Column 2: [ CURRENTLY ] (Availability status with orange highlights)
 *   - Column 3: The animated KineticGraphic SVG system (Centered, no header)
 *   - Column 4: [ PHILOSOPHY ] (2-paragraph core statement)
 * - Row 3: Bottom Row (Shifted up with smaller padding to ensure full visibility):
 *   - Left: scroll arrow + "SCROLL TO EXPLORE" + custom horizontal slide page bars.
 *   - Center: terracotta '+' symbol intersecting grid columns 3 and 4.
 *   - Right: Massive right-aligned "SANKET DAS" title (Scaled down to clamp(2.2rem,6vw,4.8rem)).
 */
export default function Hero() {
  const mouse = useMousePosition();

  // Coordinates for the mouse follow glow, offset to center the 600px gradient ball
  const glowX = mouse.x * (typeof window !== 'undefined' ? window.innerWidth : 1000) - 300;
  const glowY = mouse.y * (typeof window !== 'undefined' ? window.innerHeight : 600) - 300;

  return (
    <section 
      id="hero" 
      className="min-h-[calc(100vh-6rem)] flex flex-col justify-between pt-32 pb-8 px-[var(--container-padding)] max-w-[var(--container-max)] mx-auto w-full relative z-10"
    >
      
      {/* Background Visual Elements */}
      {/* 1. Terracotta Radial ambient glow (Darker, richer terracotta color follow mouse) */}
      <motion.div 
        className="absolute w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,_rgba(176,83,41,0.28)_0%,_rgba(176,83,41,0.08)_50%,_rgba(0,0,0,0)_80%)] blur-[95px] pointer-events-none z-0" 
        animate={{ x: glowX, y: glowY }}
        transition={{
          type: "spring",
          damping: 60,     // Smooth ease
          stiffness: 100,
          mass: 1.2
        }}
      />

      {/* 2. Contour mathematical waves */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
        <svg 
          className="absolute w-[800px] h-[600px] right-[-100px] top-[15%] text-[var(--color-border)] opacity-[0.25]" 
          viewBox="0 0 800 600" 
          fill="none"
        >
          <path d="M -100,300 C 100,280 200,420 400,380 C 600,340 700,480 900,450" stroke="currentColor" strokeWidth="0.5" />
          <path d="M -100,350 C 100,330 200,470 400,430 C 600,390 700,530 900,500" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" />
          <path d="M -100,250 C 100,230 200,370 400,330 C 600,290 700,430 900,400" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      </div>

      {/* ROW 1: Massive Display Title (Role Title) */}
      <div className="w-full relative z-10" style={{ marginTop: '8rem' }}>
        <h1 className="font-heading text-[clamp(2.5rem,7.5vw,5.5rem)] font-bold tracking-tighter uppercase leading-[0.8] text-[var(--color-text-primary)]">
          CREATIVE
          <br />
          DEVELOPER
        </h1>
      </div>

      {/* ROW 2: 4-Column Editorial Metadata Grid & Graphic cell (More compact margins/paddings) */}
      <div className="w-full grid grid-cols-1 md:grid-cols-4 border-t border-b border-[var(--color-border)] py-[var(--space-sm)] my-[var(--space-sm)] gap-8 md:gap-0 relative z-10">
        
        {/* Cell 1: What I Build (Intro Paragraph + Capabilities List) */}
        <div className="md:pr-6 flex flex-col justify-between min-h-[150px]">
          <div>
            <span className="text-[10px] text-[var(--color-accent)] font-medium uppercase tracking-widest block mb-3">
              [ What I Build ]
            </span>
            <p className="text-[12px] font-body text-[var(--color-text-secondary)] normal-case leading-relaxed mb-3">
              I design and build interactive digital experiences that blend frontend engineering, motion design and immersive storytelling.
            </p>
          </div>
          <div className="text-[10.5px] font-body font-normal text-[var(--color-text-muted)] flex flex-col gap-1 uppercase tracking-wider">
            <span>Interactive Web Experiences</span>
            <span>Creative Frontend Applications</span>
            <span>3D Interfaces // Motion Systems</span>
          </div>
        </div>

        {/* Cell 2: Currently */}
        <div className="md:border-l md:border-[var(--color-border)] md:px-6 flex flex-col justify-between min-h-[150px]">
          <span className="text-[10px] text-[var(--color-accent)] font-medium uppercase tracking-widest block mb-3">
            [ Currently ]
          </span>
          <div className="text-[12px] font-body font-normal text-[var(--color-text-secondary)] flex flex-col justify-between h-full">
            <p className="leading-relaxed">
              Open to Creative Developer, Frontend Engineer and Design Engineer roles.
            </p>
            <div className="text-[12px] text-[var(--color-accent)] font-medium mt-3 flex flex-col gap-0.5">
              <span>Based in India.</span>
              <span>Available worldwide.</span>
            </div>
          </div>
        </div>

        {/* Cell 3: SVG Graphic System (No header label, centered) */}
        <div className="md:border-l md:border-[var(--color-border)] md:px-6 flex items-center justify-center min-h-[150px]">
          <KineticGraphic />
        </div>

        {/* Cell 4: Philosophy */}
        <div className="md:border-l md:border-[var(--color-border)] md:pl-6 flex flex-col justify-between min-h-[150px]">
          <span className="text-[10px] text-[var(--color-accent)] font-medium uppercase tracking-widest block mb-3">
            [ Philosophy ]
          </span>
          <div className="text-[12px] font-body font-normal text-[var(--color-text-secondary)] flex flex-col gap-2 leading-relaxed">
            <p>
              Great digital experiences aren't remembered because they look good.
            </p>
            <p>
              They're remembered because every interaction has intention.
            </p>
          </div>
        </div>

        {/* Terracotta Plus sign (+) absolute overlay on the grid line intersection */}
        <div 
          className="hidden md:block absolute bottom-0 left-[75%] -translate-x-1/2 translate-y-1/2 text-[var(--color-accent)] font-light text-2xl select-none pointer-events-none z-20"
        >
          +
        </div>

      </div>

      {/* ROW 3: Bottom Row (Scroll explore indicator Left | SANKET DAS Right - Shifted Up) */}
      <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-4 items-end relative z-10 pb-2">
        
        {/* Columns 1-7: Scroll Explore Indicators */}
        <div className="md:col-span-7 flex flex-col justify-start">
          <div className="flex flex-col gap-1.5 ml-1">
            <span className="text-[10px] font-body tracking-wider text-[var(--color-text-secondary)] font-medium uppercase flex items-center gap-1.5">
              <span className="text-[12px] font-bold">↓</span> SCROLL TO EXPLORE
            </span>
            {/* Terracotta active indicator line bar */}
            <div className="flex gap-1.5 items-center mt-1">
              <div className="w-8 h-[2px] bg-[var(--color-accent)]" />
              <div className="w-8 h-[2px] bg-[var(--color-border)] opacity-60" />
              <div className="w-8 h-[2px] bg-[var(--color-border)] opacity-60" />
              <div className="w-8 h-[2px] bg-[var(--color-border)] opacity-60" />
            </div>
          </div>
        </div>

        {/* Columns 8-12: Name Title (Visually smaller than role title) */}
        <div className="md:col-span-5 text-left md:text-right">
          <h2 className="font-heading text-[clamp(1.8rem,5.2vw,3.6rem)] font-bold tracking-tighter uppercase leading-[0.8] text-[var(--color-text-primary)]">
            SANKET
            <br />
            DAS
          </h2>
        </div>

      </div>

    </section>
  );
}
