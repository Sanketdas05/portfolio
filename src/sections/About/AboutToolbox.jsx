import { useState } from 'react';
import { motion } from 'framer-motion';

const TOOLS = [
  { capability: 'State Architecture', tool: 'React / Next.js' },
  { capability: 'Motion Systems', tool: 'GSAP / Framer Motion' },
  { capability: 'Spatial Interfaces', tool: 'Three.js / WebGL' },
  { capability: 'Design Systems', tool: 'Tailwind CSS' },
  { capability: 'Server Infrastructure', tool: 'Node.js' }
];

/* ── 1. React Animation (Atomic Orbits) ── */
const ReactAnimation = () => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-60 z-0 scale-75 md:scale-100 origin-center">
    <motion.svg width="150" height="150" viewBox="0 0 100 100" animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
      <ellipse cx="50" cy="50" rx="40" ry="15" fill="none" stroke="#c4653a" strokeWidth="1" />
      <ellipse cx="50" cy="50" rx="40" ry="15" fill="none" stroke="#c4653a" strokeWidth="1" transform="rotate(60 50 50)" />
      <ellipse cx="50" cy="50" rx="40" ry="15" fill="none" stroke="#c4653a" strokeWidth="1" transform="rotate(120 50 50)" />
      <circle cx="50" cy="50" r="4" fill="#c4653a" />
    </motion.svg>
  </div>
);

/* ── 2. Three.js Animation (3D Wireframe Cube) ── */
const ThreeAnimation = () => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-60 z-0 scale-75 md:scale-100 origin-center" style={{ perspective: '400px' }}>
    <motion.div 
      className="relative w-16 h-16 border border-[#c4653a]" 
      style={{ transformStyle: 'preserve-3d' }}
      animate={{ rotateX: [0, 360], rotateY: [0, 360] }} 
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
    >
      <div className="absolute inset-0 border border-[#c4653a]" style={{ transform: 'translateZ(32px)' }}></div>
      <div className="absolute inset-0 border border-[#c4653a]" style={{ transform: 'translateZ(-32px)' }}></div>
      <div className="absolute inset-0 border border-[#c4653a]" style={{ transform: 'rotateY(90deg) translateZ(32px)' }}></div>
      <div className="absolute inset-0 border border-[#c4653a]" style={{ transform: 'rotateY(90deg) translateZ(-32px)' }}></div>
      <div className="absolute inset-0 border border-[#c4653a]" style={{ transform: 'rotateX(90deg) translateZ(32px)' }}></div>
      <div className="absolute inset-0 border border-[#c4653a]" style={{ transform: 'rotateX(90deg) translateZ(-32px)' }}></div>
    </motion.div>
  </div>
);

/* ── 3. GSAP Animation (Easing Curve Drawing) ── */
const GsapAnimation = () => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-80 z-0 scale-75 md:scale-100 origin-center">
    <svg width="200" height="80" viewBox="0 0 200 80">
      <motion.path 
        d="M 10,70 C 50,70 80,-30 120,40 S 160,10 190,10" 
        fill="none" 
        stroke="#c4653a" 
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      />
    </svg>
  </div>
);

/* ── 4. Tailwind CSS Animation (Utility Matrix) ── */
const TailwindAnimation = () => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-60 gap-2 overflow-hidden z-0 scale-75 md:scale-100 origin-center">
    {[...Array(12)].map((_, i) => (
      <motion.div 
        key={i} 
        className="w-3 h-3 bg-[#c4653a] rounded-sm"
        animate={{ opacity: [0.1, 0.8, 0.1] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1, ease: "easeInOut" }}
      />
    ))}
  </div>
);

/* ── 5. Node.js Animation (Event Loop Network) ── */
const NodeAnimation = () => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-70 overflow-visible z-0 scale-75 md:scale-100 origin-center translate-x-8 md:translate-x-16">
    <svg width="150" height="80" viewBox="0 0 150 80">
      <path d="M 20,40 L 75,20 L 130,40 L 75,60 Z" fill="none" stroke="#c4653a" strokeWidth="0.5" strokeDasharray="4 4" />
      <motion.circle cx="20" cy="40" r="3" fill="#c4653a" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 1, repeat: Infinity }} />
      <motion.circle cx="75" cy="20" r="4" fill="#c4653a" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }} />
      <motion.circle cx="130" cy="40" r="3" fill="#c4653a" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }} />
      <motion.circle cx="75" cy="60" r="4" fill="#c4653a" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 1.7, repeat: Infinity, delay: 0.6 }} />
      
      {/* Moving pulse along the path */}
      <motion.circle r="2" fill="#fff"
        initial={{ cx: 20, cy: 40 }}
        animate={{ 
          cx: [20, 75, 130, 75, 20],
          cy: [40, 20, 40, 60, 40]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />
    </svg>
  </div>
);

/* ── Orchestrator Component ── */
const ToolAnimation = ({ capability, isHovered }) => {
  return (
    <div 
      className={`absolute inset-0 pointer-events-none transition-opacity duration-700 z-0 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
    >
      {capability === 'State Architecture' && <ReactAnimation />}
      {capability === 'Motion Systems' && <GsapAnimation />}
      {capability === 'Spatial Interfaces' && <ThreeAnimation />}
      {capability === 'Design Systems' && <TailwindAnimation />}
      {capability === 'Server Infrastructure' && <NodeAnimation />}
    </div>
  );
};

export default function AboutToolbox() {
  const [hoveredCapability, setHoveredCapability] = useState(null);

  return (
    <div 
      className="w-full min-h-screen flex flex-col justify-start items-center px-[var(--container-padding)] relative overflow-hidden pb-32"
      style={{ paddingTop: '25vh' }}
    >
      
      {/* Background: Technical Blueprint Schematic */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.15] flex items-center justify-center">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern id="blueprint-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#5e574f" strokeWidth="0.5" />
            </pattern>
            <pattern id="blueprint-grid-small" width="8" height="8" patternUnits="userSpaceOnUse">
              <path d="M 8 0 L 0 0 0 8" fill="none" stroke="#5e574f" strokeWidth="0.2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#blueprint-grid-small)" />
          <rect width="100%" height="100%" fill="url(#blueprint-grid)" />
          
          {/* Abstract structural schematic lines */}
          <g stroke="#b8ad9e" strokeWidth="1" fill="none" opacity="0.6">
            <circle cx="50%" cy="50%" r="300" strokeDasharray="4 8" />
            <circle cx="50%" cy="50%" r="450" strokeWidth="0.5" />
            <line x1="10%" y1="50%" x2="90%" y2="50%" strokeDasharray="10 5" />
            <line x1="50%" y1="10%" x2="50%" y2="90%" strokeDasharray="10 5" />
            <line x1="30%" y1="30%" x2="70%" y2="70%" strokeWidth="0.5" />
            <line x1="30%" y1="70%" x2="70%" y2="30%" strokeWidth="0.5" />
            
            {/* New measurement annotations */}
            <text x="51%" y="15%" fill="#7a7167" fontSize="12" fontFamily="monospace" stroke="none">Y: 900.00</text>
            <text x="80%" y="49%" fill="#7a7167" fontSize="12" fontFamily="monospace" stroke="none">X: 1200.00</text>
            <line x1="15%" y1="15%" x2="17%" y2="15%" stroke="#c4653a" strokeWidth="2" />
            <line x1="15%" y1="15%" x2="15%" y2="17%" stroke="#c4653a" strokeWidth="2" />
            <line x1="85%" y1="85%" x2="83%" y2="85%" stroke="#c4653a" strokeWidth="2" />
            <line x1="85%" y1="85%" x2="85%" y2="83%" stroke="#c4653a" strokeWidth="2" />
          </g>
        </svg>
      </div>

      {/* Chapter Marker */}
      <div className="absolute top-12 left-12 md:top-24 md:left-24 z-10">
        <span className="text-[10px] text-[var(--color-accent)] font-bold font-mono tracking-widest uppercase block">
          [ 05 / The Spec Sheet ]
        </span>
      </div>

      {/* Museum Annotation */}
      <div className="absolute bottom-12 left-12 md:bottom-24 md:left-24 z-10 opacity-60">
        <pre className="font-mono text-[9px] uppercase tracking-widest text-[#7a7167] leading-[1.6]">
          CATALOG
          Tooling index and
          instrumentation mapping.
        </pre>
      </div>

      {/* Authentic Artifact: Code Snippet */}
      <motion.img
        src="/images/artifacts/code_snippet.png"
        alt="Code Snippet Note"
        className="absolute top-[50%] left-[2%] md:left-[8%] w-40 md:w-56 opacity-40 pointer-events-none rotate-6 -z-10"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 0.4, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 0.4 }}
      />

      <div 
        className="w-full max-w-5xl mx-auto flex flex-col relative z-10 mt-8 md:mt-12"
      >
        
        {/* Table Header */}
        <div 
          className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-6"
          style={{ borderBottom: '1px solid rgba(245,240,235,0.2)', marginBottom: '2rem' }}
        >
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#7a7167]">Capability</span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#7a7167] hidden md:block text-right pr-4">Instrument</span>
        </div>

        {/* Table Body */}
        <div className="flex flex-col">
          {TOOLS.map((item, idx) => {
            const isHovered = hoveredCapability === item.capability;
            const isDimmed = hoveredCapability !== null && !isHovered;

            return (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: "easeOut" }}
              onMouseEnter={() => setHoveredCapability(item.capability)}
              onMouseLeave={() => setHoveredCapability(null)}
              className="relative group hover:border-[#c4653a]/40 transition-all duration-500 overflow-hidden"
              style={{ 
                borderBottom: '1px solid rgba(245,240,235,0.05)',
              }}
            >
              <div 
                className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-8 transition-opacity duration-500 w-full h-full"
                style={{ 
                  paddingTop: '1.5rem', 
                  paddingBottom: '1.5rem', 
                  opacity: isDimmed ? 0.2 : 1 
                }}
              >
                <ToolAnimation capability={item.capability} isHovered={isHovered} />

                <div className="relative z-10 font-heading font-black text-[1.5rem] md:text-[2.5rem] text-[#f5f0eb] uppercase tracking-tight group-hover:text-[#c4653a] transition-colors duration-500 leading-none flex items-center">
                  {item.capability}
                </div>
                <div className="relative z-10 font-mono text-[11px] md:text-[13px] text-[#7a7167] uppercase tracking-widest md:flex items-center justify-end md:pr-4 group-hover:text-[#b8ad9e] transition-colors duration-500">
                  {item.tool}
                </div>
              </div>
            </motion.div>
          )})}
        </div>

      </div>

      {/* Footer Note */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
        className="flex items-start gap-4 opacity-40 relative z-10"
        style={{ marginTop: '8rem' }}
      >
        <div className="w-8 h-[1px] bg-[#f5f0eb] mt-2" />
        <p className="font-mono text-[9px] uppercase tracking-widest text-[#f5f0eb] max-w-xs leading-relaxed">
          The tools are not the craft. They are the instruments required to execute the vision. Mastery of the instrument is merely the prerequisite for creation.
        </p>
      </motion.div>

    </div>
  );
}
