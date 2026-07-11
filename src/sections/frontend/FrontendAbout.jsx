export default function FrontendAbout() {
  return (
    <section id="about" className="py-20 md:py-24 px-6 md:px-8 max-w-6xl mx-auto border-t border-zinc-200/60">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
        
        {/* Section Header */}
        <div className="md:col-span-4">
          <h2 className="text-[20px] font-semibold text-black tracking-tight mb-2">
            Engineering Philosophy
          </h2>
          <p className="text-[14px] text-zinc-500 font-medium">
            How I approach frontend development.
          </p>
        </div>

        {/* Content */}
        <div className="md:col-span-8 flex flex-col gap-6 text-[15px] text-zinc-600 leading-relaxed">
          <p>
            I believe that great frontend engineering is invisible. Users shouldn't notice the architecture, the state management, or the caching strategy—they should only notice that the application feels instantly responsive and completely intuitive.
          </p>
          <p>
            My work focuses on bridging the gap between complex business logic and flawless user experiences. I specialize in building large-scale React applications where state predictability, strict TypeScript typing, and accessible component design are non-negotiable.
          </p>
          <p>
            Instead of chasing every new library, I focus on the fundamentals: semantic HTML, optimal rendering patterns, aggressive performance budgets, and building systems that scale efficiently as a product grows.
          </p>
        </div>

      </div>
    </section>
  );
}
