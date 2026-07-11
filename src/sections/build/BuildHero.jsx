export default function BuildHero() {
  return (
    <section style={{ marginBottom: '16rem' }} className="mt-12 md:mt-24 border-t border-black/10 pt-16">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
        
        {/* Left Column: Name & Title */}
        <div className="md:col-span-5 flex flex-col">
          <h1 className="text-[clamp(2.5rem,4vw,3.5rem)] font-heading font-black leading-[1] tracking-tight text-black mb-2">
            Sanket Das
          </h1>
          <h2 className="text-[18px] font-mono tracking-widest uppercase text-black/40">
            Frontend Engineer
          </h2>
        </div>

        {/* Right Column: Statement & Focus */}
        <div className="md:col-span-7 flex flex-col gap-16">
          <p className="text-[clamp(1.75rem,3vw,2.5rem)] font-medium leading-[1.3] tracking-tight text-black max-w-2xl">
            I build React applications that<br className="hidden sm:block"/> feel simple to users,<br className="hidden sm:block"/> while solving complex problems<br className="hidden sm:block"/> behind the scenes.
          </p>
          
          <p className="text-[20px] font-medium leading-[1.6] text-black/60 max-w-lg">
            Currently focused on<br/>
            design systems,<br/>
            performance,<br/>
            animation,<br/>
            and scalable frontend architecture.
          </p>
        </div>

      </div>
    </section>
  );
}
