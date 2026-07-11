import { FiArrowRight, FiGithub } from 'react-icons/fi';

export default function FrontendHero() {
  return (
    <section id="hero" className="pt-24 pb-16 md:pt-40 md:pb-24 px-6 md:px-8 max-w-6xl mx-auto flex flex-col items-start justify-center">
      
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-600 text-[12px] font-medium mb-8">
        <span className="w-2 h-2 rounded-full bg-emerald-500 relative">
          <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-50"></span>
        </span>
        Available for new opportunities
      </div>

      {/* Main Headline */}
      <h1 className="text-[40px] md:text-[64px] font-bold tracking-tight text-black leading-[1.1] mb-6 max-w-4xl">
        Building high-performance <br className="hidden md:block"/> frontend architecture.
      </h1>

      {/* Sub-headline */}
      <p className="text-[16px] md:text-[18px] text-zinc-500 max-w-2xl leading-relaxed mb-10 font-medium">
        Frontend Engineer specializing in scalable React applications, rigorous accessibility standards, and product-focused user interfaces.
      </p>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
        <a 
          href="#projects" 
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-black text-white hover:bg-zinc-800 px-5 py-2.5 rounded-md text-[14px] font-medium transition-colors shadow-sm"
        >
          View Work <FiArrowRight size={16} />
        </a>
        <a 
          href="https://github.com/Sanketdas05" 
          target="_blank"
          rel="noreferrer"
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-black border border-zinc-200 hover:bg-zinc-50 px-5 py-2.5 rounded-md text-[14px] font-medium transition-colors shadow-sm"
        >
          <FiGithub size={16} /> GitHub Profile
        </a>
      </div>

    </section>
  );
}
