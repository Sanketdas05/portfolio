import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { useMode } from '../context/ModeContext';
import { useLenisContext } from '../app/providers/LenisProvider';

// Creative Components
import Hero from '../sections/Hero';
import About from '../sections/About';
import Work from '../sections/Work';
import Contact from '../sections/Contact';

// Engineering (Build) Components
import BuildHero from '../sections/build/BuildHero';
import BuildAbout from '../sections/build/BuildAbout';
import BuildProjects from '../sections/build/BuildProjects';
import BuildSnapshot from '../sections/build/BuildSnapshot';
import BuildExperience from '../sections/build/BuildExperience';
import BuildContact from '../sections/build/BuildContact';

export default function HomePage() {
  const { isEngineeringMode } = useMode();
  const location = useLocation();
  const lenisContext = useLenisContext();
  const lenis = lenisContext?.lenis;

  useEffect(() => {
    if (location.hash && lenis) {
      const targetElement = document.querySelector(location.hash);
      if (targetElement) {
        setTimeout(() => {
          lenis.scrollTo(targetElement, { offset: 0, immediate: true });
        }, 100);
      }
    }
  }, [location.hash, lenis]);

  return (
    <AnimatePresence mode="wait">
      {!isEngineeringMode ? (
        <motion.div
          key="creative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full"
        >
          <Hero />
          <Work />
          <About />
          <Contact />
        </motion.div>
      ) : (
        <motion.div
          key="engineering"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full pt-32 max-w-[var(--container-max)] mx-auto px-[var(--container-padding)]"
          style={{ maxWidth: '1400px', margin: '0 auto', paddingTop: '8rem' }}
        >
          <BuildHero />
          <BuildAbout />
          <BuildProjects />
          <BuildSnapshot />
          <BuildExperience />
          <BuildContact />
          
          <footer className="mt-20 pb-16 pt-8 border-t border-black/10 flex flex-col sm:flex-row justify-between text-[14px] text-black/50">
            <p>© {new Date().getFullYear()} Sanket Das. All rights reserved.</p>
            <p>Built with React & Tailwind</p>
          </footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
