import { motion } from 'framer-motion';

export default function AboutDetails() {
  return (
    <div className="w-full flex flex-col justify-start items-center px-[var(--container-padding)] relative pb-32" style={{ paddingTop: '15vh' }}>
      
      {/* Chapter Marker */}
      <div className="absolute top-12 left-12 md:top-24 md:left-24 z-10">
        <span className="text-[10px] text-[var(--color-accent)] font-bold font-mono tracking-widest uppercase block">
          [ 06 / The Details ]
        </span>
      </div>

      <div className="max-w-5xl w-full flex flex-col relative z-10" style={{ minHeight: '120vh' }}>
        
        {/* Thought 1 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="w-full md:w-2/3 text-left pl-4 md:pl-0"
          style={{ marginBottom: '30vh' }}
        >
          <p className="font-heading font-medium text-[#f5f0eb] text-[clamp(1.8rem,4vw,3rem)] leading-[1.3] tracking-tight">
            I still spend hours fixing details that most people will never notice.
          </p>
        </motion.div>

        {/* Thought 2 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1.2, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full text-center"
          style={{ marginBottom: '30vh' }}
        >
          <p className="font-heading font-medium text-[#7a7167] text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.3] tracking-tight">
            Not because they have to be perfect.
          </p>
        </motion.div>

        {/* Thought 3 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1.2, delay: 2.4, ease: [0.22, 1, 0.36, 1] }}
          className="w-full md:w-2/3 self-end text-right pr-4 md:pr-0"
        >
          <p className="font-heading font-medium text-[#c4653a] text-[clamp(2rem,5vw,4rem)] leading-[1.1] tracking-tight">
            Because I notice them.
          </p>
        </motion.div>

      </div>

      {/* Museum Annotation */}
      <div className="absolute bottom-12 left-12 md:bottom-24 md:left-24 z-10 opacity-60">
        <pre className="font-mono text-[9px] uppercase tracking-widest text-[#7a7167] leading-[1.6]">
          NOTEBOOK ENTRY
          Personal observation on
          perfectionism.
          Iteration 14
        </pre>
      </div>

    </div>
  );
}
