export default function BuildPrinciples() {
  return (
    <section id="principles" className="mb-48">
      <div className="border-t border-black/10 pt-24 mb-24">
        <h2 className="text-[clamp(2.5rem,4vw,4rem)] font-heading font-black leading-[1.05] tracking-tighter text-black mb-6">
          Building products that<br/>users don't notice.<br/>
          <span className="text-black/30">Until they use something worse.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
        <div>
          <h3 className="text-[14px] font-mono tracking-widest uppercase text-black/50 mb-12">System Flow</h3>
          <div className="flex flex-col gap-6">
            <FlowItem text="Building scalable UI systems" />
            <FlowArrow />
            <FlowItem text="State Architecture" />
            <FlowArrow />
            <FlowItem text="Motion Systems" />
            <FlowArrow />
            <FlowItem text="Rendering Performance" />
            <FlowArrow />
            <FlowItem text="Accessibility" />
            <FlowArrow />
            <FlowItem text="Design Systems" />
          </div>
        </div>
        <div>
          <h3 className="text-[14px] font-mono tracking-widest uppercase text-black/50 mb-12">Methodology</h3>
          <p className="text-[18px] leading-relaxed text-black/80 font-medium mb-8">
            Engineering isn't just about making things work. It's about building resilient systems that are intuitive to use and effortless to scale.
          </p>
          <p className="text-[16px] leading-relaxed text-black/60 mb-8">
            My approach focuses on decoupling state from UI, aggressively optimizing for rendering performance, and treating accessibility as a foundational requirement rather than an afterthought.
          </p>
          <p className="text-[16px] leading-relaxed text-black/60">
            A great frontend doesn't feel like a web page. It feels like software. Every component, transition, and network request must be intentionally designed to respect the user's time and attention.
          </p>
        </div>
      </div>
    </section>
  );
}

function FlowItem({ text }) {
  return (
    <div className="bg-white border border-black/10 px-8 py-5 rounded-lg w-max shadow-sm">
      <span className="text-[16px] font-bold text-black">{text}</span>
    </div>
  );
}

function FlowArrow() {
  return (
    <div className="ml-12 text-black/30 font-mono text-[14px]">
      ↓
    </div>
  );
}
