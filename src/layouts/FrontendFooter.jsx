export default function FrontendFooter() {
  return (
    <footer className="border-t border-zinc-200 bg-[#FAFAFA] py-12 mt-32">
      <div className="max-w-6xl mx-auto px-6 md:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-zinc-200 rounded-sm flex items-center justify-center">
            <span className="text-zinc-500 text-[8px] font-bold">S</span>
          </div>
          <span className="text-[13px] text-zinc-500 font-medium">
            © {new Date().getFullYear()} Sanket Das. Built with React & Tailwind.
          </span>
        </div>

        <div className="flex items-center gap-6 text-[13px] font-medium text-zinc-500">
          <a href="https://github.com/Sanketdas05" target="_blank" rel="noreferrer" className="hover:text-black transition-colors">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/sanket-das05/" target="_blank" rel="noreferrer" className="hover:text-black transition-colors">
            LinkedIn
          </a>
          <a href="mailto:sanketdas2005@gmail.com" className="hover:text-black transition-colors">
            Email
          </a>
        </div>

      </div>
    </footer>
  );
}
