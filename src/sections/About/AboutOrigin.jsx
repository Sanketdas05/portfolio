import { useState } from 'react';
import { motion } from 'framer-motion';

export default function AboutOrigin() {
  const [mouse, setMouse] = useState({ x: -1000, y: -1000 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouse({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div 
      initial="rest"
      whileHover="hover"
      onMouseMove={handleMouseMove}
      className="w-full min-h-screen py-32 flex flex-col justify-center items-center px-6 md:px-12 relative group overflow-hidden"
    >
      
      {/* Local Ambient Mouse Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
        <motion.div 
          className="absolute w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,_rgba(176,83,41,0.28)_0%,_rgba(176,83,41,0.08)_50%,_rgba(0,0,0,0)_80%)] blur-[95px]" 
          animate={{ left: mouse.x - 300, top: mouse.y - 300 }}
          transition={{
            type: "spring",
            damping: 60,
            stiffness: 100,
            mass: 1.2
          }}
        />
      </div>
      
      {/* Blueprint Grid Background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(176, 83, 41, 0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(176, 83, 41, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          backgroundPosition: 'center top'
        }}
      />

      {/* Hand-Drawn Network Sketch Artifact */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30 transition-opacity duration-700 group-hover:opacity-80">
        <motion.svg 
          width="800" 
          height="800" 
          viewBox="0 0 800 800" 
          fill="none" 
          className="absolute max-w-[120vw] max-h-[120vh]"
        >
          {/* Faint Construction/Registration marks */}
          <g stroke="#7a7167" strokeWidth="0.5" opacity="0.5">
            <path d="M50,50 L70,50 M50,50 L50,70" />
            <path d="M750,50 L730,50 M750,50 L750,70" />
            <path d="M50,750 L70,750 M50,750 L50,730" />
            <path d="M750,750 L730,750 M750,750 L750,730" />
            {/* Center crosshair */}
            <path d="M390,400 L410,400 M400,390 L400,410" />
            {/* Dimension line */}
            <path d="M200,600 L600,600" strokeDasharray="2 4" />
            <text x="400" y="590" fill="#7a7167" fontSize="10" fontFamily="monospace" textAnchor="middle">Ø 400 UNIT</text>
          </g>

          <motion.g 
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-10%" }}
            stroke="#c4653a"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Stable Background Lines */}
            <motion.path variants={{ hidden: { pathLength: 0 }, visible: { pathLength: 1, transition: { duration: 1.5, ease: "easeInOut" } } }} d="M395,195 Q450,260 505,305" />
            <motion.path variants={{ hidden: { pathLength: 0 }, visible: { pathLength: 1, transition: { duration: 1.5, ease: "easeInOut" } } }} d="M495,295 Q580,270 655,245" />
            <motion.path variants={{ hidden: { pathLength: 0 }, visible: { pathLength: 1, transition: { duration: 1.5, ease: "easeInOut" } } }} d="M195,545 Q290,450 395,455" />
            <motion.path variants={{ hidden: { pathLength: 0 }, visible: { pathLength: 1, transition: { duration: 1.5, ease: "easeInOut" } } }} d="M305,345 Q350,280 405,195" />
            <motion.path variants={{ hidden: { pathLength: 0 }, visible: { pathLength: 1, transition: { duration: 1.5, ease: "easeInOut" } } }} d="M150,195 Q230,280 295,355" />

            {/* Stable Nodes */}
            <motion.circle variants={{ hidden: { scale: 0, opacity: 0 }, visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } } }} cx="400" cy="200" r="4" fill="none" />
            <motion.circle variants={{ hidden: { scale: 0, opacity: 0 }, visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } } }} cx="500" cy="300" r="5" fill="none" />
            <motion.circle variants={{ hidden: { scale: 0, opacity: 0 }, visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } } }} cx="650" cy="250" r="6" fill="none" />
            <motion.circle variants={{ hidden: { scale: 0, opacity: 0 }, visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } } }} cx="200" cy="550" r="5" fill="none" />
            <motion.circle variants={{ hidden: { scale: 0, opacity: 0 }, visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } } }} cx="300" cy="350" r="6" fill="none" />
            <motion.circle variants={{ hidden: { scale: 0, opacity: 0 }, visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } } }} cx="150" cy="200" r="4" fill="none" />

            {/* THE BROKEN NODE & ITS CONNECTIONS */}
            {/* These elements assemble, wait, and then break/disconnect */}
            <motion.g
              variants={{
                hidden: { y: 0, rotate: 0, opacity: 1 },
                visible: {
                  y: [0, 0, 150], 
                  rotate: [0, 0, 45], 
                  opacity: [1, 1, 0],
                  transition: { 
                    times: [0, 0.6, 1],
                    duration: 3.5, 
                    ease: "anticipate"
                  }
                }
              }}
              style={{ originX: '550px', originY: '450px' }}
            >
              <motion.path 
                variants={{ hidden: { pathLength: 0 }, visible: { pathLength: 1, transition: { duration: 1.5, ease: "easeInOut" } } }} 
                d="M390,460 Q480,530 550,450" 
              />
              <motion.circle 
                variants={{ hidden: { scale: 0, opacity: 0 }, visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } } }} 
                cx="550" cy="450" r="7" fill="none" 
              />
            </motion.g>

          </motion.g>
        </motion.svg>
      </div>

      {/* Chapter Marker */}
      <div className="absolute top-12 left-12 md:top-24 md:left-24 z-10">
        <span className="text-[10px] text-[var(--color-accent)] font-bold font-mono tracking-widest uppercase block">
          [ 01 / Origin ]
        </span>
      </div>

      <div className="max-w-4xl w-full flex flex-col items-start md:items-center text-left md:text-center z-10 pointer-events-none mt-20">
        {/* Stage 2: Headline arrives (Delay: 1.2s) */}
        <motion.h2 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-10%" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.04, delayChildren: 1.2 }
            }
          }}
          className="font-heading font-black text-[#f5f0eb] text-[clamp(2.5rem,5vw,5rem)] leading-[1.0] tracking-tight flex flex-wrap justify-start md:justify-center"
        >
          {"I started by breaking things.".split("").map((char, index) => (
            <motion.span
              key={index}
              variants={{
                hidden: { opacity: 0, y: 50, rotate: 10 },
                visible: { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
              }}
              className={char === " " ? "w-[0.3em]" : "inline-block"}
            >
              {char}
            </motion.span>
          ))}
        </motion.h2>

        {/* Stage 3: Paragraph arrives with extra breathing room (mt-12) (Delay: 2.2s) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-10%" }}
          transition={{ duration: 1.5, delay: 2.2, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl mt-12 md:mt-16"
        >
          <p className="font-body text-[16px] text-[#b8ad9e] leading-[1.8] font-medium pointer-events-auto text-left md:text-center">
            Before I wrote any code, I deleted DOM nodes in the inspector just to see layouts collapse. Development wasn't a career choice—it was a way to reverse-engineer the internet. I wanted to see how static math could become something that felt alive.
          </p>
        </motion.div>
      </div>

      {/* Museum Annotation */}
      <div className="absolute bottom-12 left-12 md:bottom-24 md:left-24 z-10 opacity-60">
        <pre className="font-mono text-[9px] uppercase tracking-widest text-[#7a7167] leading-[1.6]">
          OBSERVATION 01
          Discovered by deleting
          DOM nodes in Inspector.
          2018
        </pre>
      </div>

      {/* Subtle progression indicator */}
      <div className="absolute bottom-12 right-12 md:bottom-24 md:right-24 flex items-center gap-4 opacity-40 z-10">
        <span className="font-mono text-[9px] uppercase tracking-widest text-[#f5f0eb]">Scroll</span>
        <div className="w-12 h-[1px] bg-[#f5f0eb]" />
      </div>

    </motion.div>
  );
}
