import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function AboutWhy() {
  const interactRef = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  
  const springX = useSpring(mx, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(my, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e) => {
    if (!interactRef.current) return;
    const rect = interactRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left - rect.width / 2) * 0.1;
    const yPct = (e.clientY - rect.top - rect.height / 2) * 0.15;
    mx.set(xPct);
    my.set(yPct);
  };

  const handleMouseLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div 
      className="w-full flex flex-col justify-start items-center px-6 md:px-12 relative pb-32"
      style={{ paddingTop: '15vh' }}
    >
      
      {/* Background Bezier Curves */}
      <div className="absolute inset-0 pointer-events-none opacity-20 flex justify-center items-center overflow-hidden z-0">
        <motion.svg 
          width="100%" height="100%" viewBox="0 0 1000 1000" preserveAspectRatio="none" fill="none"
          initial={{ opacity: 0, scale: 1.1 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 3, ease: "easeOut" }}
          className="absolute origin-center"
        >
          <path d="M-100,500 C 200,100, 800,900, 1100,500" stroke="#7a7167" strokeWidth="2" />
          <path d="M-100,600 C 300,200, 700,800, 1100,400" stroke="#c4653a" strokeWidth="1" opacity="0.5" />
          <path d="M-100,400 C 400,0, 600,1000, 1100,600" stroke="#7a7167" strokeWidth="0.5" strokeDasharray="4 8" />
        </motion.svg>
      </div>

      {/* Chapter Marker */}
      <div className="absolute top-12 left-12 md:top-24 md:left-24 z-10">
        <span className="text-[10px] text-[var(--color-accent)] font-bold font-mono tracking-widest uppercase block">
          [ 02 / The Difference ]
        </span>
      </div>

      <div className="max-w-5xl w-full flex flex-col relative z-10">
        
        {/* Thought 1: Left Aligned */}
        <div className="w-full md:w-1/2 text-left pl-8 md:pl-0 mb-32 md:mb-40">
          <p className="font-heading font-medium text-[#7a7167] text-[clamp(1.8rem,4vw,3rem)] leading-[1.3] tracking-tight flex flex-col items-start">
            <motion.span
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 1.2, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              Most people remember
            </motion.span>
            <span className="text-[#f5f0eb] flex overflow-hidden mt-1">
              {"beautiful interfaces.".split(" ").map((word, idx) => (
                <motion.span 
                  key={idx}
                  initial={{ y: '100%', opacity: 0, rotate: 5 }}
                  whileInView={{ y: 0, opacity: 1, rotate: 0 }}
                  viewport={{ once: true, margin: "-20%" }}
                  transition={{ duration: 1.2, delay: 1.2 + idx * 0.15 + 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="mr-[0.3em] inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </span>
          </p>
        </div>

        {/* Thought 2: Right Aligned with Micro-Interaction (Delay: 2.2s) */}
        <div className="w-full md:w-1/2 self-end text-right pr-8 md:pr-0 mb-24 md:mb-32 flex flex-col items-end">
          <div className="font-heading font-medium text-[#7a7167] text-[clamp(1.8rem,4vw,3rem)] leading-[1.3] tracking-tight flex flex-col items-end">
            <motion.span
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 1.2, delay: 2.2, ease: [0.22, 1, 0.36, 1] }}
            >
              I remember
            </motion.span>
            
            {/* The interactive phrase */}
            <motion.div 
              ref={interactRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative cursor-pointer group mt-2 p-4 -mr-4"
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ type: "spring", stiffness: 100, damping: 10, delay: 2.4 }}
            >
              <motion.span 
                className="text-[#f5f0eb] relative z-10 inline-block origin-center"
                style={{ x: springX, y: springY }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                the interactions behind them.
              </motion.span>
              
              {/* Morphing background shape */}
              <motion.div 
                className="absolute inset-0 bg-[#c4653a]/0 border border-[#c4653a]/0 z-0 rounded-full pointer-events-none"
                style={{ x: springX, y: springY }}
                whileHover={{ 
                  backgroundColor: 'rgba(196, 101, 58, 0.08)',
                  borderColor: 'rgba(196, 101, 58, 0.3)',
                  scale: 1.1, 
                  borderRadius: '12px' 
                }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              />

              {/* Easing line */}
              <motion.div 
                className="absolute bottom-2 left-1/2 h-[1px] bg-[#c4653a] pointer-events-none"
                initial={{ width: 0, x: '-50%', opacity: 0 }}
                whileHover={{ width: '80%', opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              />
            </motion.div>
          </div>
        </div>

        {/* Thought 3 removed to let the idea breathe */}

      </div>

      {/* Museum Annotation */}
      <div className="absolute bottom-12 left-12 md:bottom-24 md:left-24 z-10 opacity-60">
        <pre className="font-mono text-[9px] uppercase tracking-widest text-[#7a7167] leading-[1.6]">
          OBSERVATION 02
          The difference between
          reading and experiencing.
          2025
        </pre>
      </div>

    </div>
  );
}
