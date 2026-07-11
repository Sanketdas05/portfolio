/**
 * Framer Motion slide variants.
 * Usage: <motion.div variants={slideUp} initial="initial" animate="animate">
 */

export const slideUp = {
  initial: { y: '100%' },
  animate: { y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  exit: { y: '-100%', transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export const slideLeft = {
  initial: { x: '100%' },
  animate: { x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  exit: { x: '-100%', transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};
