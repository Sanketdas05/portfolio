import { FiArrowRight } from 'react-icons/fi';

export default function FrontendContact() {
  return (
    <section id="contact" className="py-20 md:py-32 px-6 md:px-8 max-w-6xl mx-auto border-t border-zinc-200/60">
      <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
        <h2 className="text-[32px] md:text-[40px] font-bold text-black tracking-tight mb-6">
          Ready to scale your frontend?
        </h2>
        <p className="text-[16px] text-zinc-500 mb-10 leading-relaxed">
          I'm currently open to new opportunities. If you're looking for an engineer who prioritizes architecture, accessibility, and clean UI, let's talk.
        </p>
        <a 
          href="mailto:sanketdas2005@gmail.com"
          className="inline-flex items-center gap-2 bg-black text-white hover:bg-zinc-800 px-6 py-3 rounded-md text-[14px] font-medium transition-colors shadow-sm"
        >
          Send an email <FiArrowRight />
        </a>
      </div>
    </section>
  );
}
