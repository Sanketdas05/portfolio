import { Link as RouterLink, useLocation } from 'react-router';

export default function FrontendMinimalNav() {
  const location = useLocation();

  const links = [
    { label: 'Home', href: '/frontend' },
    { label: 'Work', href: '#projects' },
    { label: 'Resume', href: '/resume.pdf', external: true },
    { label: 'Creative', href: '/' }
  ];

  return (
    <nav className="flex items-center gap-4 text-[15px] font-medium text-black/70 mb-12">
      {links.map((link) => {
        const isExternal = link.external || link.href.startsWith('/');
        
        if (isExternal) {
          return (
            <RouterLink 
              key={link.label} 
              to={link.href}
              target={link.external ? "_blank" : "_self"}
              className="hover:text-black transition-colors underline decoration-black/20 underline-offset-4 hover:decoration-black"
            >
              {link.label}
            </RouterLink>
          );
        }

        return (
          <a 
            key={link.label}
            href={link.href}
            className="hover:text-black transition-colors underline decoration-black/20 underline-offset-4 hover:decoration-black"
          >
            {link.label}
          </a>
        );
      })}
    </nav>
  );
}
