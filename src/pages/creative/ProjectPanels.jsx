import { motion } from 'framer-motion';

export function ChapterPanel({ data, tTiny, tSmall, index }) {
  if (!data) return null;
  const layouts = [
    { container: "flex-col justify-center px-8 md:px-24", animArgs: { initial: { opacity: 0, x: -30 }, whileInView: { opacity: 1, x: 0 } }, textClass: "" },
    { container: "flex-col justify-end items-end px-8 md:px-24 border-b border-[rgba(255,255,255,0.05)]", animArgs: { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 } }, textClass: "text-right" },
    { container: "flex-col justify-center items-center px-8 text-center border-t border-[rgba(255,255,255,0.05)]", animArgs: { initial: { opacity: 0, scale: 0.95 }, whileInView: { opacity: 1, scale: 1 } }, textClass: "text-center", animClass: "flex flex-col items-center" }
  ];
  const l = layouts[index];
  return (
    <section className={`py-24 md:py-32 w-full flex ${l.container}`}>
      <motion.div 
        initial={l.animArgs.initial}
        whileInView={l.animArgs.whileInView}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className={l.animClass || ""}
      >
        <span className={`${tTiny} block mb-6 ${l.textClass}`}>{data.chapter} / {data.title}</span>
        <p className={`${tSmall} ${l.textClass}`}>{data.content}</p>
      </motion.div>
    </section>
  );
}

export function TechPanel({ data, tTiny, tMedium, tSmall, index }) {
  if (!data) return null;
  if (index === 0) {
    return (
      <section className="py-24 w-full px-8 md:px-24 flex flex-col items-end justify-center relative">
        <span className={`hidden md:block absolute top-1/4 right-8 ${tTiny} text-[var(--color-text-muted)] rotate-90 origin-right`}>
          Technical Note
        </span>
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1.5 }}
          className="max-w-[30ch] text-right"
        >
          <h3 className={`${tMedium} text-[var(--color-accent)] mb-6 not-italic font-bold tracking-tight`}>{data.tech}</h3>
          <p className={`${tSmall} !text-right ml-auto`}>
            <span className="opacity-50 line-through mr-2">Problem: {data.problem}</span><br/><br/>
            Advantage: {data.advantage}
          </p>
        </motion.div>
      </section>
    );
  } else if (index === 1) {
    return (
      <section className="py-24 w-full px-8 md:px-24 flex flex-col justify-start relative">
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-[rgba(255,255,255,0.05)] -z-10 hidden md:block"></div>
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1.5 }}
          className="max-w-[30ch]"
        >
          <span className={`${tTiny} block mb-4 text-[var(--color-text-muted)]`}>Decisions / {data.tech}</span>
          <p className={tSmall}>
            {data.reason} {data.advantage}
          </p>
        </motion.div>
      </section>
    );
  } else {
    return (
      <section className="py-24 w-full px-8 md:px-24 flex flex-col justify-end items-start">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1.5 }}
          className="max-w-[35ch]"
        >
          <h3 className={`${tMedium} text-[var(--color-accent)] mb-4 not-italic font-bold`}>{data.tech}</h3>
          <p className={tSmall}>{data.advantage}</p>
        </motion.div>
      </section>
    );
  }
}
