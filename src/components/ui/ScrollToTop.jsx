import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowUp } from 'react-icons/fi';
import { useLenisContext } from '../../app/providers/LenisProvider';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const lenisContext = useLenisContext();
  const lenis = lenisContext?.lenis;

  useEffect(() => {
    const handleScroll = () => {
      // Show button if scrolled down
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { offset: 0, duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-[var(--z-overlay)] p-3 rounded-full bg-[var(--color-text-primary)] text-[var(--color-bg)] shadow-lg hover:scale-110 hover:bg-[var(--color-accent)] transition-all duration-300 flex items-center justify-center mix-blend-difference"
          aria-label="Scroll to top"
        >
          <FiArrowUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
