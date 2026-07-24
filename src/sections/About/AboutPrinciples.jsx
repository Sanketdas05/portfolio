import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DeleteDemonstration from './DeleteDemonstration';

gsap.registerPlugin(ScrollTrigger);

import { PRINCIPLES } from './principlesData';

export default function AboutPrinciples() {
  const containerRef = useRef(null);
  const scrollWrapperRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const wrapper = scrollWrapperRef.current;
    if (!container || !wrapper) return;

    let ctx = gsap.context(() => {
      const getScrollAmount = () => wrapper.scrollWidth - window.innerWidth;
      
      gsap.to(wrapper, {
        x: () => -getScrollAmount(),
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: () => `+=${getScrollAmount()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        }
      });
    }, containerRef);

    // Force GSAP to recalculate dimensions after render
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="h-screen w-full relative overflow-hidden block"
    >
      {/* Background: Geometric Construction */}
      <div className="absolute inset-0 pointer-events-none opacity-10 flex items-center justify-center">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern id="geo-grid" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#f5f0eb" strokeWidth="0.5" />
              <line x1="0" y1="50" x2="100" y2="50" stroke="#f5f0eb" strokeWidth="0.5" />
              <line x1="50" y1="0" x2="50" y2="100" stroke="#f5f0eb" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#geo-grid)" />
        </svg>
      </div>

      {/* Chapter Marker */}
      <div className="absolute top-12 left-12 md:top-24 md:left-24 z-10">
        <span className="text-[10px] text-[var(--color-accent)] font-bold font-mono tracking-widest uppercase block">
          [ 03 / Philosophy ]
        </span>
      </div>

      <div className="w-full h-full flex items-center">
        <div 
          ref={scrollWrapperRef}
          className="flex h-max will-change-transform relative z-10"
          style={{ width: 'max-content' }}
        >
          {/* Authentic Artifact: Sketch */}
          <motion.img
            src="/images/artifacts/wireframe_sketch.png"
            alt="Authentic Wireframe Sketch"
            className="absolute top-[-20%] left-[120vw] w-64 md:w-96 opacity-40 pointer-events-none -z-10"
            initial={{ opacity: 0, rotate: -5 }}
            whileInView={{ opacity: 0.4, rotate: 2 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          />

        {PRINCIPLES.map((principle, idx) => (
          <div 
            key={idx} 
            className="w-screen flex flex-col justify-center items-center relative flex-shrink-0 px-6 md:px-12"
          >
            {/* Thematic Backgrounds */}
            {principle.id === 'gsap' && (
              <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none flex justify-center items-center">
                <svg width="100%" height="100%" viewBox="0 0 1000 1000" fill="none">
                  <pattern id="gsap-grid" width="50" height="50" patternUnits="userSpaceOnUse">
                    <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#7a7167" strokeWidth="0.5" strokeDasharray="2 2" />
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#gsap-grid)" />
                  <path d="M 200,800 C 300,100, 700,900, 800,200" stroke="#f5f0eb" strokeWidth="3" />
                  <line x1="200" y1="800" x2="300" y2="100" stroke="#c4653a" strokeWidth="1" strokeDasharray="5 5" />
                  <circle cx="300" cy="100" r="8" fill="#0a0908" stroke="#c4653a" strokeWidth="2" />
                  <line x1="800" y1="200" x2="700" y2="900" stroke="#c4653a" strokeWidth="1" strokeDasharray="5 5" />
                  <circle cx="700" cy="900" r="8" fill="#0a0908" stroke="#c4653a" strokeWidth="2" />
                  <circle cx="200" cy="800" r="10" fill="#f5f0eb" />
                  <circle cx="800" cy="200" r="10" fill="#f5f0eb" />
                  <text x="320" y="100" fill="#c4653a" fontSize="16" fontFamily="monospace">p1(0.22, 1)</text>
                  <text x="720" y="900" fill="#c4653a" fontSize="16" fontFamily="monospace">p2(0.36, 1)</text>
                </svg>
              </div>
            )}
            {principle.id === 'threejs' && (
              <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none flex justify-center items-center" style={{ perspective: '1000px' }}>
                <div className="w-[200%] h-[200%] border border-[#7a7167]" style={{ transform: 'rotateX(60deg) rotateZ(45deg)', backgroundImage: 'linear-gradient(#7a7167 1px, transparent 1px), linear-gradient(90deg, #7a7167 1px, transparent 1px)', backgroundSize: '100px 100px' }} />
              </div>
            )}
            {principle.id === 'delete' && <DeleteDemonstration />}

            <div className="max-w-4xl w-full flex flex-col items-center text-center gap-12 relative z-10">
              <motion.div
                variants={{
                  hidden: { opacity: 0, scale: 0.9 },
                  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } }
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-10%" }}
              >
                {principle.svg}
              </motion.div>

              {/* Dynamic Title Rendering */}
              {principle.id === 'gsap' ? (
                <h2 className="font-heading font-black text-[#f5f0eb] text-[clamp(2rem,3.5vw,3rem)] leading-[1.1] uppercase tracking-tight flex flex-col items-center">
                  <span>
                    {principle.title.split("").map((char, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 0.05, delay: i * 0.02 }}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </span>
                  <span className="text-[#c4653a] mt-4">
                    {principle.titleHighlight.split("").map((char, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 0.05, delay: (principle.title.length * 0.02) + (i * 0.02) + 0.2 }}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </span>
                </h2>
              ) : principle.id === 'threejs' ? (
                <h2 className="font-heading font-black text-[#f5f0eb] text-[clamp(2rem,3.5vw,3rem)] leading-[1.1] uppercase tracking-tight">
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-block"
                  >
                    {principle.title}
                  </motion.span>
                  <br />
                  <motion.span
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="text-[#c4653a] inline-block mt-4"
                  >
                    {principle.titleHighlight}
                  </motion.span>
                </h2>
              ) : principle.id === 'delete' ? (
                <h2 className="font-heading font-black text-[#f5f0eb] text-[clamp(2rem,3.5vw,3rem)] leading-[1.1] uppercase tracking-tight">
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.5 }}
                  >
                    I used to add features.
                  </motion.span>
                  <br />
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.5, delay: 2.2 }}
                  >
                    Now I ruthlessly delete them.
                  </motion.span>
                </h2>
              ) : (
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  className="font-heading font-black text-[#f5f0eb] text-[clamp(2rem,3.5vw,3rem)] leading-[1.1] uppercase tracking-tight"
                >
                  {principle.title}
                </motion.h2>
              )}

              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                className="max-w-lg mt-2 flex flex-col items-center"
              >
                <p className="font-body text-[14px] md:text-[16px] text-[#b8ad9e] leading-[1.8] font-medium">
                  {principle.desc}
                </p>
                {principle.footnote && (
                  <p className="font-mono text-[9px] text-[#c4653a] mt-8 tracking-widest uppercase border-t border-[#c4653a]/20 pt-4 opacity-80">
                    {principle.footnote}
                  </p>
                )}
              </motion.div>
            </div>
          </div>
        ))}
        </div>
      </div>
      
      {/* Museum Annotation */}
      <div className="absolute bottom-12 left-12 md:bottom-24 md:left-24 z-10 opacity-60">
        <pre className="font-mono text-[9px] uppercase tracking-widest text-[#7a7167] leading-[1.6]">
          LESSON LEARNED
          Removing features
          often improves products.
          After 14 iterations
        </pre>
      </div>

      {/* Horizontal Scroll indicator */}
      <div className="absolute bottom-12 right-12 md:bottom-24 md:right-24 flex items-center gap-4 opacity-40 z-10">
        <span className="font-mono text-[9px] uppercase tracking-widest text-[#f5f0eb]">
          Scroll Horizontally
        </span>
        <div className="w-12 h-[1px] bg-[#f5f0eb]" />
      </div>

    </div>
  );
}
