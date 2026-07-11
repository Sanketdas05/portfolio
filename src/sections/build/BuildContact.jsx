export default function BuildContact() {
  const links = [
    { label: 'Email', value: 'sanketdas2005@gmail.com', url: 'mailto:sanketdas2005@gmail.com' },
    { label: 'LinkedIn', value: '/in/sanket-das05', url: 'https://www.linkedin.com/in/sanket-das05/' },
    { label: 'GitHub', value: '/Sanketdas05', url: 'https://github.com/Sanketdas05' },
    { label: 'Resume', value: 'View PDF', url: '/resume.pdf' }
  ];

  return (
    <section id="contact" className="mb-32">
      <h3 className="text-[14px] font-mono tracking-widest uppercase text-black/50 mb-12 border-b border-black/10 pb-4">
        Contact
      </h3>
      
      <div className="flex flex-col border-t border-black/10">
        {links.map((link, idx) => (
          <a 
            key={idx} 
            href={link.url}
            target={link.url.startsWith('mailto') ? '_self' : '_blank'}
            rel="noreferrer"
            className="group flex flex-col md:flex-row md:items-center py-8 border-b border-black/10 hover:bg-black/[0.02] transition-colors"
          >
            <div className="w-48 flex-shrink-0 mb-2 md:mb-0">
              <span className="font-mono text-[13px] uppercase tracking-widest text-black/40 group-hover:text-black transition-colors">
                {link.label}
              </span>
            </div>
            <div>
              <span className="text-[20px] md:text-[24px] font-medium text-black tracking-tight group-hover:text-[var(--color-accent)] transition-colors">
                {link.value}
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
