import { motion } from 'framer-motion';

import AboutOrigin from './AboutOrigin';
import AboutWhy from './AboutWhy';
import AboutPrinciples from './AboutPrinciples';
import AboutProcess from './AboutProcess';
import AboutObservations from './AboutObservations';
import AboutToolbox from './AboutToolbox';
import AboutDetails from './AboutDetails';
import AboutNow from './AboutNow';

/**
 * About Section — Cinematic Editorial Journal
 * A continuous vertical scroll experience containing 7 focused thoughts.
 */
export default function About() {
  return (
    <section 
      id="about" 
      className="w-full relative block border-t border-b border-[var(--color-border)]"
    >

      {/* The Journal Pages (Z-index higher than the glow) */}
      <div className="relative z-10 w-full block">
        <AboutOrigin />
        <AboutWhy />
        <AboutPrinciples />
        <AboutProcess />
        <AboutObservations />
        <AboutToolbox />
        <AboutDetails />
        <AboutNow />
      </div>
    </section>
  );
}
