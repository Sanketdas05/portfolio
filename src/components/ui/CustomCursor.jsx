import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState('');

  // Use framer motion values for smooth performance without react re-renders
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Add smooth spring physics to the cursor
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // 1. Handle global mouse movement
    const handleMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    // 2. Handle global hover states (links, buttons)
    const handleMouseOver = (e) => {
      const target = e.target;
      // Check if we are hovering over an interactive DOM element
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.cursor-pointer') ||
        target.getAttribute('role') === 'button'
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = () => {
      setIsHovering(false);
    };

    // 3. Handle custom events from non-DOM elements (like Three.js canvas)
    const handleCustomCursorState = (e) => {
      if (e.detail) {
        setIsHovering(e.detail.hover || false);
        setCursorText(e.detail.text || '');
      } else {
        setIsHovering(false);
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);
    window.addEventListener('cursor-state', handleCustomCursorState);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
      window.removeEventListener('cursor-state', handleCustomCursorState);
    };
  }, [cursorX, cursorY]);

  // Determine size based on state
  let size = 40; // Default size
  if (cursorText) {
    size = 80; // Large for 3D cards
  } else if (isHovering) {
    size = 16; // Small dot for links/buttons
  }

  // We need a wrapper to ensure the center of the cursor is at the mouse tip
  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center mix-blend-difference hidden md:flex"
      style={{
        x: smoothX,
        y: smoothY,
        translateX: '-50%',
        translateY: '-50%',
      }}
    >
      <motion.div 
        className="rounded-full border-[2px] border-white flex items-center justify-center bg-transparent"
        initial={{ width: 40, height: 40 }}
        animate={{
          width: size,
          height: size,
          backgroundColor: isHovering && !cursorText ? '#ffffff' : 'transparent',
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300, mass: 0.5 }}
      >
        {cursorText && (
          <motion.span 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="font-mono text-[10px] uppercase tracking-widest text-white font-bold"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>
    </motion.div>
  );
}
