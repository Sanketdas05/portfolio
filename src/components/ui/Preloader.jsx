import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Artificial delay to ensure assets are registered,
    // in a real app this might track Image() loads.
    const duration = 2000;
    const interval = 20;
    let elapsed = 0;

    const timer = setInterval(() => {
      elapsed += interval;
      const currentProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(currentProgress);

      if (elapsed >= duration) {
        clearInterval(timer);
        setIsLoaded(true);
        setTimeout(() => {
          onComplete && onComplete();
        }, 800); // give time for the exit animation
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          className="flex flex-col items-center justify-center bg-[var(--color-bg)] text-[var(--color-text-primary)]"
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 999999 }}
          initial={{ y: 0 }}
          exit={{ 
            y: '-100%', 
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
        >
          <div className="flex flex-col items-center justify-center gap-6 overflow-hidden">
            <motion.div 
              className="text-[24px] md:text-[32px] font-heading font-black tracking-tight"
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              Sanket Das
            </motion.div>
            
            <div className="w-48 h-[2px] bg-[var(--color-border)] relative overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 bottom-0 bg-[var(--color-text-primary)]"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: 'linear', duration: 0.1 }}
              />
            </div>
            
            <motion.div 
              className="font-mono text-[12px] uppercase tracking-widest text-[var(--color-text-muted)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {Math.floor(progress)}%
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
