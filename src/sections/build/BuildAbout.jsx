export default function BuildAbout() {
  return (
    <section style={{ marginBottom: '16rem' }}>
      <h3 className="text-[14px] font-mono tracking-widest uppercase text-black/50 mb-12 border-b border-black/10 pb-4">
        About
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
        <div className="md:col-span-7 md:col-start-6">
          <div className="flex flex-col gap-6 text-[18px] md:text-[20px] font-medium leading-[1.6] text-black/80 max-w-3xl">
            <p>
              Recently graduated with a Bachelor's degree in Computer Applications.
            </p>
            <p>
              Over the last year I've focused on building products that combine clean engineering with thoughtful user experience.
            </p>
            <p>
              I'm particularly interested in frontend architecture, interaction design, accessibility and performance.
            </p>
            <p>
              Currently looking for frontend engineering opportunities where I can contribute while continuing to grow.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
