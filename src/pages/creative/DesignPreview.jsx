/**
 * Design System Preview — TEMPORARY
 *
 * Visual showcase of typography, colors, and spacing tokens.
 * Delete this file once the design system is approved.
 */
export default function DesignPreview() {
  return (
    <div
      style={{
        minHeight: '100vh',
        padding: 'var(--container-padding)',
        maxWidth: 'var(--container-max)',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-2xl)',
        paddingTop: 'var(--space-section)',
        paddingBottom: 'var(--space-section)',
      }}
    >
      {/* ── Typography Scale ── */}
      <section>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-sm)',
            fontWeight: 'var(--weight-medium)',
            letterSpacing: 'var(--tracking-wider)',
            color: 'var(--color-accent)',
            textTransform: 'uppercase',
            marginBottom: 'var(--space-lg)',
          }}
        >
          Typography Scale
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'var(--text-5xl)',
              fontWeight: 'var(--weight-bold)',
              lineHeight: 'var(--leading-tight)',
              letterSpacing: 'var(--tracking-tight)',
            }}
          >
            Creative Developer
          </h1>

          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'var(--text-4xl)',
              fontWeight: 'var(--weight-semibold)',
              lineHeight: 'var(--leading-tight)',
              letterSpacing: 'var(--tracking-tight)',
            }}
          >
            Heading Two
          </h2>

          <h3
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'var(--text-3xl)',
              fontWeight: 'var(--weight-medium)',
              lineHeight: 'var(--leading-snug)',
            }}
          >
            Heading Three
          </h3>

          <h4
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'var(--text-2xl)',
              fontWeight: 'var(--weight-medium)',
              lineHeight: 'var(--leading-snug)',
            }}
          >
            Heading Four
          </h4>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-xl)',
              lineHeight: 'var(--leading-normal)',
              color: 'var(--color-text-secondary)',
              maxWidth: '65ch',
            }}
          >
            Large body text — I craft immersive digital experiences that blend design,
            code, and motion into something that feels alive.
          </p>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-base)',
              lineHeight: 'var(--leading-relaxed)',
              color: 'var(--color-text-secondary)',
              maxWidth: '65ch',
            }}
          >
            Base body text — Every project is an opportunity to push boundaries.
            I believe the best interfaces are the ones that make you forget
            you're looking at a screen. Clean code, smooth motion, deliberate design.
          </p>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              lineHeight: 'var(--leading-normal)',
              color: 'var(--color-text-muted)',
            }}
          >
            Small text — Labels, captions, and meta information
          </p>
        </div>
      </section>

      {/* Divider */}
      <hr style={{ border: 'none', borderTop: '1px solid var(--color-border)', margin: '0' }} />

      {/* ── Color Palette ── */}
      <section>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-sm)',
            fontWeight: 'var(--weight-medium)',
            letterSpacing: 'var(--tracking-wider)',
            color: 'var(--color-accent)',
            textTransform: 'uppercase',
            marginBottom: 'var(--space-lg)',
          }}
        >
          Color Palette
        </p>

        {/* Backgrounds */}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-sm)',
            color: 'var(--color-text-muted)',
            marginBottom: 'var(--space-sm)',
            fontWeight: 'var(--weight-medium)',
          }}
        >
          Backgrounds
        </p>
        <div style={{ display: 'flex', gap: 'var(--space-sm)', marginBottom: 'var(--space-lg)', flexWrap: 'wrap' }}>
          {[
            { name: 'Deep', color: 'var(--color-bg-deep)' },
            { name: 'Base', color: 'var(--color-bg)' },
            { name: 'Elevated', color: 'var(--color-bg-elevated)' },
            { name: 'Surface', color: 'var(--color-bg-surface)' },
          ].map(({ name, color }) => (
            <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: 80,
                  height: 80,
                  backgroundColor: color,
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                }}
              />
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>{name}</span>
            </div>
          ))}
        </div>

        {/* Text Colors */}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-sm)',
            color: 'var(--color-text-muted)',
            marginBottom: 'var(--space-sm)',
            fontWeight: 'var(--weight-medium)',
          }}
        >
          Text
        </p>
        <div style={{ display: 'flex', gap: 'var(--space-lg)', marginBottom: 'var(--space-lg)', flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-xl)', color: 'var(--color-text-primary)' }}>
            Primary Text
          </span>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xl)', color: 'var(--color-text-secondary)' }}>
            Secondary Text
          </span>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xl)', color: 'var(--color-text-muted)' }}>
            Muted Text
          </span>
        </div>

        {/* Accents */}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-sm)',
            color: 'var(--color-text-muted)',
            marginBottom: 'var(--space-sm)',
            fontWeight: 'var(--weight-medium)',
          }}
        >
          Accents
        </p>
        <div style={{ display: 'flex', gap: 'var(--space-sm)', marginBottom: 'var(--space-lg)', flexWrap: 'wrap' }}>
          {[
            { name: 'Accent', color: 'var(--color-accent)' },
            { name: 'Accent Hover', color: 'var(--color-accent-hover)' },
            { name: 'Warm', color: 'var(--color-warm)' },
          ].map(({ name, color }) => (
            <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: 80,
                  height: 80,
                  backgroundColor: color,
                  borderRadius: 'var(--radius-md)',
                }}
              />
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>{name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <hr style={{ border: 'none', borderTop: '1px solid var(--color-border)', margin: '0' }} />

      {/* ── Component Previews ── */}
      <section>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-sm)',
            fontWeight: 'var(--weight-medium)',
            letterSpacing: 'var(--tracking-wider)',
            color: 'var(--color-accent)',
            textTransform: 'uppercase',
            marginBottom: 'var(--space-lg)',
          }}
        >
          Component Previews
        </p>

        <div style={{ display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap', alignItems: 'center' }}>
          {/* Accent button */}
          <button
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--weight-medium)',
              letterSpacing: 'var(--tracking-wide)',
              textTransform: 'uppercase',
              color: 'var(--color-text-primary)',
              backgroundColor: 'var(--color-accent)',
              border: 'none',
              borderRadius: 'var(--radius-full)',
              padding: '14px 32px',
              cursor: 'pointer',
              transition: 'background-color var(--duration-fast) var(--ease-out-quart)',
            }}
          >
            View Work
          </button>

          {/* Outline button */}
          <button
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--weight-medium)',
              letterSpacing: 'var(--tracking-wide)',
              textTransform: 'uppercase',
              color: 'var(--color-text-primary)',
              backgroundColor: 'transparent',
              border: '1px solid var(--color-border-hover)',
              borderRadius: 'var(--radius-full)',
              padding: '14px 32px',
              cursor: 'pointer',
              transition: 'border-color var(--duration-fast) var(--ease-out-quart)',
            }}
          >
            Contact Me
          </button>

          {/* Label / tag */}
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-xs)',
              fontWeight: 'var(--weight-medium)',
              letterSpacing: 'var(--tracking-wide)',
              textTransform: 'uppercase',
              color: 'var(--color-accent)',
              backgroundColor: 'var(--color-accent-muted)',
              borderRadius: 'var(--radius-full)',
              padding: '6px 16px',
            }}
          >
            React
          </span>

          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-xs)',
              fontWeight: 'var(--weight-medium)',
              letterSpacing: 'var(--tracking-wide)',
              textTransform: 'uppercase',
              color: 'var(--color-warm)',
              backgroundColor: 'var(--color-warm-muted)',
              borderRadius: 'var(--radius-full)',
              padding: '6px 16px',
            }}
          >
            Three.js
          </span>
        </div>
      </section>

      {/* Divider */}
      <hr style={{ border: 'none', borderTop: '1px solid var(--color-border)', margin: '0' }} />

      {/* ── Glass Card Preview ── */}
      <section>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-sm)',
            fontWeight: 'var(--weight-medium)',
            letterSpacing: 'var(--tracking-wider)',
            color: 'var(--color-accent)',
            textTransform: 'uppercase',
            marginBottom: 'var(--space-lg)',
          }}
        >
          Card / Surface
        </p>

        <div
          style={{
            backgroundColor: 'var(--color-glass)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid var(--color-glass-border)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--space-xl)',
            maxWidth: '500px',
          }}
        >
          <h4
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'var(--text-xl)',
              fontWeight: 'var(--weight-semibold)',
              marginBottom: 'var(--space-sm)',
            }}
          >
            Project Title
          </h4>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              color: 'var(--color-text-secondary)',
              lineHeight: 'var(--leading-relaxed)',
              marginBottom: 'var(--space-md)',
            }}
          >
            An immersive web experience built with React, Three.js, and GSAP.
            Pushing the boundaries of what's possible in the browser.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-xs)', flexWrap: 'wrap' }}>
            {['React', 'Three.js', 'GSAP'].map(tag => (
              <span
                key={tag}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 'var(--weight-medium)',
                  color: 'var(--color-text-muted)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-full)',
                  padding: '4px 12px',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
