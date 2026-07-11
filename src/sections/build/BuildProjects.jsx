import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '../../config/data';
import { FiArrowRight } from 'react-icons/fi';
import { Link as RouterLink } from 'react-router';

export default function BuildProjects() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="projects" style={{ marginBottom: '16rem' }} className="relative">
      <h3 className="text-[14px] font-mono tracking-widest uppercase text-black/50 mb-16 border-b border-black/10 pb-4">
        Selected Work
      </h3>
      
      {/* Editorial List (Full Width) */}
      <div className="flex flex-col border-t border-black/10">
        {PROJECTS.map((project, idx) => (
          <RouterLink 
            key={project.slug} 
            to={`/work/${project.slug}`}
            className="group flex flex-col md:flex-row md:items-center gap-4 md:gap-12 py-16 border-b border-black/10 hover:bg-black/[0.02] transition-colors relative"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Index Number */}
            <span className="font-mono text-[14px] font-bold text-black/30 w-12 flex-shrink-0">
              {String(idx + 1).padStart(2, '0')}
            </span>
            
            <div className="flex flex-col gap-3 flex-grow max-w-4xl">
              <h3 className="text-[clamp(2.5rem,4vw,4rem)] font-heading font-black leading-[1] tracking-tight text-black group-hover:text-black transition-colors duration-300">
                {project.title}
              </h3>
              
              <p className="text-[20px] text-black/60 font-medium mb-2">
                {project.subtitle}
              </p>
              
              <p className="text-[16px] text-black/80 leading-[1.8]">
                {project.engineering.summary}
              </p>
            </div>

            <div className="md:ml-auto mt-6 md:mt-0 flex-shrink-0">
               <span className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-black/20 text-black group-hover:bg-black group-hover:border-black group-hover:text-white transition-colors duration-300">
                 <FiArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
               </span>
            </div>
          </RouterLink>
        ))}
      </div>

      {/* Floating Cursor Image (Hidden on Mobile) */}
      <div className="hidden md:block pointer-events-none fixed inset-0 z-50">
        <AnimatePresence>
          {hoveredIndex !== null && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1, x: mousePos.x, y: mousePos.y }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ 
                type: 'spring', 
                damping: 25, 
                stiffness: 250,
                mass: 0.5,
              }}
              className="absolute w-[450px] shadow-2xl border border-black/10 z-50 -ml-[225px] -mt-[150px] overflow-hidden bg-white"
            >
              <img
                src={PROJECTS[hoveredIndex].thumbnail}
                alt={PROJECTS[hoveredIndex].title}
                className="w-full h-auto block"
                loading="lazy"
                decoding="async"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
