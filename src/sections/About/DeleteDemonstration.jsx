import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function DeleteDemonstration() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, margin: "-20%" });
  const [elements, setElements] = useState([]);

  // Generate architectural drafting lines and nodes
  useEffect(() => {
    const newElements = [];
    
    // Horizontal construction lines
    for (let i = 0; i < 8; i++) {
      newElements.push({ 
        id: `h-${i}`, type: 'h-line', 
        top: `${(i + 1.5) * 12}%`, left: '-10%', 
        delay: Math.random() * 0.8 
      });
    }
    // Vertical construction lines
    for (let i = 0; i < 12; i++) {
      newElements.push({ 
        id: `v-${i}`, type: 'v-line', 
        top: '-10%', left: `${(i + 1) * 8}%`, 
        delay: Math.random() * 0.8 
      });
    }
    // Angle lines
    for (let i = 0; i < 5; i++) {
      newElements.push({ 
        id: `a-${i}`, type: 'angle-line', 
        top: '50%', left: '50%', 
        rotate: `${45 + (i * 15)}deg`,
        delay: Math.random() * 0.8 
      });
    }
    // Intersection Nodes
    for (let i = 0; i < 20; i++) {
      newElements.push({ 
        id: `n-${i}`, type: 'node', 
        top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, 
        delay: Math.random() * 0.8 
      });
    }

    // Shuffle the array so deletion order is random and staggered
    setElements(newElements.sort(() => Math.random() - 0.5));
  }, []);

  // When in view, trigger deletion sequence after a delay
  const [deletedIndices, setDeletedIndices] = useState([]);
  
  useEffect(() => {
    if (isInView) {
      setDeletedIndices([]); // Reset when coming into view
      
      // Start deleting after 1.8 seconds of being in view (let the user read the headline first)
      const timeout = setTimeout(() => {
        let currentIdx = 0;
        const interval = setInterval(() => {
          setDeletedIndices(prev => [...prev, currentIdx]);
          currentIdx++;
          if (currentIdx >= elements.length) {
            clearInterval(interval);
          }
        }, 120); // Steady paced deletion
        return () => clearInterval(interval);
      }, 1800);

      return () => clearTimeout(timeout);
    } else {
      setDeletedIndices([]); // Reset when out of view
    }
  }, [isInView, elements.length]);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {elements.map((el, i) => {
        const isDeleted = deletedIndices.includes(i);
        
        return (
          <motion.div
            key={el.id}
            initial={{ opacity: 0 }}
            animate={
              isInView && !isDeleted 
                ? { opacity: el.type === 'node' ? 0.3 : 0.15 } 
                : { opacity: 0 }
            }
            transition={
              !isDeleted 
                ? { duration: 1.5, delay: el.delay, ease: "easeOut" }
                : { duration: 0.4, ease: "easeIn" } // Disappears completely
            }
            className="absolute bg-[var(--color-accent)] origin-center"
            style={{
              top: el.top,
              left: el.left,
              ...(el.type === 'h-line' && { width: '120%', height: '1px' }),
              ...(el.type === 'v-line' && { width: '1px', height: '120%' }),
              ...(el.type === 'angle-line' && { width: '200%', height: '1px', left: '-50%', transform: `translateY(-50%) rotate(${el.rotate})` }),
              ...(el.type === 'node' && { width: '5px', height: '5px', borderRadius: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'transparent', border: '1px solid var(--color-accent)' }),
            }}
          />
        );
      })}
    </div>
  );
}
