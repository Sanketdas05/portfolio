import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-20%" });

  // Global Theme Reversion Trigger
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 70%', 
        onEnter: () => document.body.classList.remove('theme-dark'),
        onLeaveBack: () => document.body.classList.add('theme-dark'),
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.8,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] } 
    },
  };

  return (
    <section 
      id="contact" 
      ref={containerRef}
      className="relative min-h-[140vh] flex flex-col items-center justify-center pt-32 pb-32 px-6 md:px-12 overflow-hidden"
    >
      <motion.div 
        className="max-w-2xl mx-auto w-full flex flex-col items-center text-center relative z-10 flex-grow justify-center"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        
        {/* Authentic Conversation Copy */}
        <div className="flex flex-col items-center gap-12 text-[#1c1a17] font-body text-[18px] md:text-[22px] leading-[1.8] font-medium tracking-wide">
          
          <motion.div variants={itemVariants} className="flex flex-col gap-2">
            <p>If you've made it this far,</p>
            <p className="italic text-[#5e574f]">thank you.</p>
          </motion.div>

          <motion.div variants={itemVariants} className="text-[#5e574f] max-w-lg">
            <p>I hope this gave you a glimpse</p>
            <p>into how I think,</p>
            <p>how I build,</p>
            <p>and why I care so much</p>
            <p>about the details.</p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col gap-2 mt-4">
            <p>If that resonates with you,</p>
            <p className="font-heading font-bold text-[32px] md:text-[40px] text-[#b05329] mt-2 tracking-tight">let's talk.</p>
          </motion.div>

        </div>

        {/* The Direct Links (No friction) */}
        <motion.div 
          variants={itemVariants}
          className="mt-32 w-full max-w-sm flex flex-col gap-6"
        >
          <a href="mailto:sanketdas2005@gmail.com" className="group flex items-center justify-between border-b border-[#1c1a17]/10 pb-4 font-mono text-[13px] uppercase tracking-widest text-[#1c1a17] hover:text-[#b05329] hover:border-[#b05329]/30 transition-all duration-500">
            <span>Email</span>
            <span className="opacity-0 -translate-x-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0">sanketdas2005@gmail.com</span>
          </a>
          
          <a href="https://github.com/Sanketdas05" target="_blank" rel="noreferrer" className="group flex items-center justify-between border-b border-[#1c1a17]/10 pb-4 font-mono text-[13px] uppercase tracking-widest text-[#1c1a17] hover:text-[#b05329] hover:border-[#b05329]/30 transition-all duration-500">
            <span>GitHub</span>
            <span className="opacity-0 -translate-x-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0">/Sanketdas05</span>
          </a>

          <a href="https://www.linkedin.com/in/sanket-das05/" target="_blank" rel="noreferrer" className="group flex items-center justify-between border-b border-[#1c1a17]/10 pb-4 font-mono text-[13px] uppercase tracking-widest text-[#1c1a17] hover:text-[#b05329] hover:border-[#b05329]/30 transition-all duration-500">
            <span>LinkedIn</span>
            <span className="opacity-0 -translate-x-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0">/in/sanket-das05</span>
          </a>

          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between border-b border-[#1c1a17]/10 pb-4 font-mono text-[13px] uppercase tracking-widest text-[#1c1a17] hover:text-[#b05329] hover:border-[#b05329]/30 transition-all duration-500">
            <span>Resume</span>
            <span className="opacity-0 -translate-x-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0">View PDF</span>
          </a>
        </motion.div>

      </motion.div>
    </section>
  );
}
