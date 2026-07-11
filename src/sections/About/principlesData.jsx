import { motion } from 'framer-motion';

export const PRINCIPLES = [
  {
    id: 'gsap',
    title: 'The first time I discovered GSAP, I stopped animating things.',
    titleHighlight: 'I started directing attention.',
    desc: "I started thinking about rhythm. Before, motion was just moving a div from A to B. GSAP taught me it's actually about choreography—how elements breathe, pause, and anticipate interaction.",
    svg: (
      <motion.svg width="100" height="60" viewBox="0 0 100 60" fill="none" className="opacity-80 overflow-visible">
        <motion.path 
          d="M10 50 C 40 50, 60 10, 90 10" 
          stroke="#c4653a" strokeWidth="2" 
          variants={{ hidden: { pathLength: 0 }, visible: { pathLength: 1, transition: { duration: 1.5, ease: "easeInOut" } } }} 
        />
        {/* Handles */}
        <motion.line variants={{ hidden: { pathLength: 0 }, visible: { pathLength: 1, transition: { duration: 0.5, delay: 1.5 } } }} x1="10" y1="50" x2="40" y2="50" stroke="#7a7167" strokeWidth="1" strokeDasharray="2 2" />
        <motion.line variants={{ hidden: { pathLength: 0 }, visible: { pathLength: 1, transition: { duration: 0.5, delay: 1.5 } } }} x1="90" y1="10" x2="60" y2="10" stroke="#7a7167" strokeWidth="1" strokeDasharray="2 2" />
        <motion.circle variants={{ hidden: { scale: 0 }, visible: { scale: 1, transition: { delay: 2 } } }} cx="40" cy="50" r="3" fill="#0a0908" stroke="#c4653a" strokeWidth="1.5" />
        <motion.circle variants={{ hidden: { scale: 0 }, visible: { scale: 1, transition: { delay: 2 } } }} cx="60" cy="10" r="3" fill="#0a0908" stroke="#c4653a" strokeWidth="1.5" />
        <motion.circle variants={{ hidden: { scale: 0 }, visible: { scale: 1, transition: { delay: 0.2 } } }} cx="10" cy="50" r="4" fill="#f5f0eb" />
        <motion.circle variants={{ hidden: { scale: 0 }, visible: { scale: 1, transition: { delay: 1.4 } } }} cx="90" cy="10" r="4" fill="#f5f0eb" />
      </motion.svg>
    )
  },
  {
    id: 'threejs',
    title: 'The first time I rotated a camera around an object, I stopped thinking about pages.',
    titleHighlight: 'I started thinking about spaces.',
    desc: "WebGL broke the DOM's flat hierarchy. Suddenly, interfaces had depth, lighting, and physics. I realized I was no longer building web pages—I was designing digital architecture.",
    svg: (
      <motion.svg width="60" height="60" viewBox="0 0 40 40" fill="none" className="opacity-80 overflow-visible">
        <motion.path variants={{ hidden: { pathLength: 0 }, visible: { pathLength: 1, transition: { duration: 1, delay: 0.2 } } }} d="M20 20 L20 4" stroke="#7a7167" strokeWidth="1.5" />
        <motion.path variants={{ hidden: { pathLength: 0 }, visible: { pathLength: 1, transition: { duration: 1, delay: 0.4 } } }} d="M20 20 L6 28" stroke="#c4653a" strokeWidth="1.5" />
        <motion.path variants={{ hidden: { pathLength: 0 }, visible: { pathLength: 1, transition: { duration: 1, delay: 0.6 } } }} d="M20 20 L34 28" stroke="#7a7167" strokeWidth="1.5" />
        <motion.circle variants={{ hidden: { scale: 0 }, visible: { scale: 1, transition: { duration: 0.5 } } }} cx="20" cy="20" r="3" fill="#f5f0eb" />
        <motion.text variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { delay: 1.2 } } }} x="18" y="-2" fill="#7a7167" fontSize="8" fontFamily="monospace">Y</motion.text>
        <motion.text variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { delay: 1.4 } } }} x="2" y="32" fill="#c4653a" fontSize="8" fontFamily="monospace">Z</motion.text>
        <motion.text variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { delay: 1.6 } } }} x="36" y="32" fill="#7a7167" fontSize="8" fontFamily="monospace">X</motion.text>
      </motion.svg>
    )
  },
  {
    id: 'performance',
    title: "Performance isn't an engineering metric. It's a design constraint.",
    desc: 'Users can feel a dropped frame. A beautiful design is ruined if it stutters. Optimizing shaders and reducing re-renders is just as creative as picking a color palette.',
    svg: (
      <motion.svg width="80" height="40" viewBox="0 0 80 40" fill="none" className="opacity-80 overflow-visible">
        <motion.path variants={{ hidden: { pathLength: 0 }, visible: { pathLength: 1, transition: { duration: 2, ease: "linear" } } }} d="M0 20 Q 10 0, 20 20 T 40 20 T 60 20 T 80 20" stroke="#c4653a" strokeWidth="1.5" fill="none" />
        <motion.line variants={{ hidden: { pathLength: 0 }, visible: { pathLength: 1, transition: { duration: 1, delay: 2 } } }} x1="0" y1="20" x2="80" y2="20" stroke="#7a7167" strokeWidth="1" strokeDasharray="2 2" />
        <motion.circle variants={{ hidden: { x: 0 }, visible: { x: 80, transition: { duration: 2, ease: "linear", repeat: Infinity, repeatDelay: 1 } } }} cx="0" cy="20" r="3" fill="#f5f0eb" />
      </motion.svg>
    )
  },
  {
    id: 'delete',
    title: 'I used to add features. Now I ruthlessly delete them.',
    desc: "The hardest part of building Pace wasn't the complex logic—it was knowing when to stop. True simplicity is complexity resolved. If it doesn't serve the core interaction, it gets cut.",
    footnote: 'Applied in: PACE, BMW Configurator, Immersive Experience',
    svg: (
      <motion.svg width="60" height="60" viewBox="0 0 40 40" fill="none" className="opacity-80">
        <motion.circle variants={{ hidden: { pathLength: 0 }, visible: { pathLength: 1, transition: { duration: 1.5 } } }} cx="20" cy="20" r="16" stroke="#7a7167" strokeWidth="1.5" strokeDasharray="2 4" />
        <motion.path variants={{ hidden: { pathLength: 0 }, visible: { pathLength: 1, transition: { duration: 0.5, delay: 1.5 } } }} d="M12 12 L28 28 M12 28 L28 12" stroke="#c4653a" strokeWidth="2" strokeLinecap="round" />
      </motion.svg>
    )
  }
];
