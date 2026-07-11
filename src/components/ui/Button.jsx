/**
 * Reusable Button component.
 * Styling and variants will be added in Phase 3.
 */
export default function Button({ children, href, className = '', ...props }) {
  const Tag = href ? 'a' : 'button';

  return (
    <Tag
      href={href}
      className={className}
      {...props}
    >
      {children}
    </Tag>
  );
}
