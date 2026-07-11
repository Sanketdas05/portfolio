import { motion } from 'framer-motion';

export default function ProjectBackground({ theme }) {
  if (theme === 'bmw') {
    // Technical Blueprint / Construction Lines
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center opacity-10 dark:opacity-20 mix-blend-overlay">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern id="blueprint-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
            <pattern id="blueprint-grid-large" width="200" height="200" patternUnits="userSpaceOnUse">
              <rect width="200" height="200" fill="url(#blueprint-grid)" />
              <path d="M 200 0 L 0 0 0 200" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#blueprint-grid-large)" />
          
          {/* Dimension Lines */}
          <line x1="10%" y1="20%" x2="90%" y2="20%" stroke="currentColor" strokeWidth="1" strokeDasharray="5,5" />
          <line x1="10%" y1="18%" x2="10%" y2="22%" stroke="currentColor" strokeWidth="1" />
          <line x1="90%" y1="18%" x2="90%" y2="22%" stroke="currentColor" strokeWidth="1" />
          <text x="50%" y="19%" fill="currentColor" fontSize="10" fontFamily="monospace" textAnchor="middle">1920.00 mm</text>

          {/* Crosshairs */}
          <path d="M 200 500 L 220 500 M 210 490 L 210 510" stroke="currentColor" strokeWidth="1" />
          <circle cx="210" cy="500" r="15" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <path d="M 800 300 L 820 300 M 810 290 L 810 310" stroke="currentColor" strokeWidth="1" />
          <circle cx="810" cy="300" r="15" fill="none" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      </div>
    );
  }

  if (theme === 'pace') {
    // Network Diagrams / Flow Systems
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-[0.03] dark:opacity-[0.07]">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <radialGradient id="node-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </radialGradient>
          </defs>
          
          {/* Network Lines */}
          <path d="M 100 200 C 300 200, 200 600, 500 600 S 700 300, 900 400" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4,8" />
          <path d="M 300 800 C 400 500, 600 700, 800 200" fill="none" stroke="currentColor" strokeWidth="0.5" />
          
          {/* Data Nodes */}
          <circle cx="100" cy="200" r="4" fill="currentColor" />
          <circle cx="100" cy="200" r="12" fill="url(#node-glow)" />
          
          <circle cx="500" cy="600" r="6" fill="currentColor" />
          <circle cx="500" cy="600" r="16" fill="url(#node-glow)" />
          
          <circle cx="900" cy="400" r="3" fill="currentColor" />
          <circle cx="800" cy="200" r="5" fill="currentColor" />
          <circle cx="300" cy="800" r="4" fill="currentColor" />
        </svg>
      </div>
    );
  }

  if (theme === 'infinity') {
    // Japanese Geometric Patterns / Sliding Doors
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-[0.02] dark:opacity-[0.04]">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern id="shoji" width="120" height="200" patternUnits="userSpaceOnUse">
              <rect width="120" height="200" fill="none" stroke="currentColor" strokeWidth="2" />
              <line x1="0" y1="50" x2="120" y2="50" stroke="currentColor" strokeWidth="1" />
              <line x1="0" y1="100" x2="120" y2="100" stroke="currentColor" strokeWidth="1" />
              <line x1="0" y1="150" x2="120" y2="150" stroke="currentColor" strokeWidth="1" />
              <line x1="40" y1="0" x2="40" y2="200" stroke="currentColor" strokeWidth="1" />
              <line x1="80" y1="0" x2="80" y2="200" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#shoji)" />
          
          {/* Large geometric abstract shapes masking out areas */}
          <path d="M 0 0 L 400 0 L 200 1000 Z" fill="var(--color-bg)" opacity="0.8" />
          <path d="M 100vw 100vh L calc(100vw - 600px) 100vh L 100vw calc(100vh - 800px) Z" fill="var(--color-bg)" opacity="0.8" />
        </svg>
      </div>
    );
  }

  return null;
}
