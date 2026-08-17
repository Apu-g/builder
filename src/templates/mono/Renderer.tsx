import React from 'react';
import { SiteConfig } from '../../types';
import { getSectionImage } from '../../lib/images';

interface Props {
  config: SiteConfig;
}

const Renderer: React.FC<Props> = ({ config }) => {
  const { theme, sections, brandName, tagline, ctaPrimary, ctaSecondary } = config;
  const hero = sections.hero as { title?: string; subtitle?: string } | undefined;
  const about = sections.about as { title?: string; paragraphs?: string[] } | undefined;
  const work = sections.work as { title?: string; subtitle?: string; items?: Array<{ id: string; title: string; category: string; year?: string; description: string; role?: string }> } | undefined;
  const skills = sections.skills as { title?: string; categories?: Array<{ id: string; name: string; items: string[] }> } | undefined;
  const experience = sections.experience as { title?: string; items?: Array<{ id: string; company: string; role: string; period: string; description: string }> } | undefined;
  const contact = sections.contact as { title?: string; subtitle?: string; email?: string; socialLinks?: Array<{ platform: string; url: string }> } | undefined;

  return (
    <div style={{ backgroundColor: theme.background, color: theme.foreground, minHeight: '100vh', fontFamily: "'Inter', -apple-system, sans-serif" }}>
      <nav style={{ padding: '28px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.5px' }}>{brandName}</div>
        <div style={{ display: 'flex', gap: 36, fontSize: 13, fontWeight: 500 }}>
          <span style={{ color: theme.muted, cursor: 'pointer' }}>Work</span>
          <span style={{ color: theme.muted, cursor: 'pointer' }}>About</span>
          <span style={{ color: theme.foreground, cursor: 'pointer', fontWeight: 600 }}>{ctaSecondary}</span>
        </div>
      </nav>

      <section className="tpl-hero" style={{ padding: '80px 48px 120px', maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 48, marginBottom: 32 }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
            <img src={getSectionImage(config, 'hero', 0, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face')} alt={brandName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div>
            {hero?.title && (
              <h1 style={{ fontSize: 'clamp(42px, 7vw, 80px)', fontWeight: 800, lineHeight: 1.0, letterSpacing: '-3px', marginBottom: 0 }}>
                {hero.title}
              </h1>
            )}
          </div>
        </div>
        {hero?.subtitle && (
          <p style={{ fontSize: 18, lineHeight: 1.65, color: theme.muted, maxWidth: 520 }}>
            {hero.subtitle}
          </p>
        )}
      </section>

      {about && (
        <section className="tpl-section" style={{ padding: '20px 48px 80px', maxWidth: 800, margin: '0 auto' }}>
          <h2 style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', color: theme.muted, marginBottom: 36 }}>{about.title}</h2>
          {about.paragraphs?.map((p, i) => (
            <p key={i} style={{ fontSize: 18, lineHeight: 1.85, marginBottom: 24 }}>{p}</p>
          ))}
        </section>
      )}

      {work && (
        <section className="tpl-section" style={{ padding: '40px 48px 80px', maxWidth: 1000, margin: '0 auto' }}>
          <h2 style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', color: theme.muted, marginBottom: 48 }}>{work.title}</h2>
          {work.items?.map((item, i) => (
            <div key={item.id} className="tpl-card" style={{ padding: '36px 0', borderTop: i === 0 ? `2px solid ${theme.foreground}` : `1px solid ${theme.muted}30`, display: 'grid', gridTemplateColumns: '140px 1fr auto', gap: 32, alignItems: 'start', transition: 'background 0.2s', cursor: 'pointer' }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>{item.category}</div>
                {item.year && <div style={{ fontSize: 13, color: theme.muted, marginTop: 4 }}>{item.year}</div>}
              </div>
              <div>
                <h3 style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.5px', marginBottom: 10 }}>{item.title}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: theme.muted, maxWidth: 500 }}>{item.description}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                {item.role && <div style={{ fontSize: 13, color: theme.muted }}>{item.role}</div>}
              </div>
            </div>
          ))}
        </section>
      )}

      {skills && (
        <section className="tpl-section" style={{ padding: '40px 48px 80px', maxWidth: 1000, margin: '0 auto' }}>
          <h2 style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', color: theme.muted, marginBottom: 48 }}>{skills.title}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 40 }}>
            {skills.categories?.map((cat) => (
              <div key={cat.id}>
                <h3 style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: 20, paddingBottom: 10, borderBottom: `2px solid ${theme.foreground}` }}>{cat.name}</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {cat.items.map((item, idx) => (
                    <span key={idx} style={{ fontSize: 14, padding: '6px 14px', border: `1px solid ${theme.muted}30`, borderRadius: 4, color: theme.muted }}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {experience && (
        <section className="tpl-section" style={{ padding: '40px 48px 80px', maxWidth: 1000, margin: '0 auto' }}>
          <h2 style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', color: theme.muted, marginBottom: 48 }}>{experience.title}</h2>
          {experience.items?.map((item, i) => (
            <div key={item.id} style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: 40, padding: '28px 0', borderTop: i === 0 ? `2px solid ${theme.foreground}` : `1px solid ${theme.muted}30` }}>
              <div>
                <div style={{ fontSize: 14, color: theme.muted, fontWeight: 500 }}>{item.period}</div>
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
                  <h3 style={{ fontSize: 18, fontWeight: 700 }}>{item.role}</h3>
                  <span style={{ fontSize: 14, color: theme.muted, fontWeight: 500 }}>{item.company}</span>
                </div>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: theme.muted }}>{item.description}</p>
              </div>
            </div>
          ))}
        </section>
      )}

      {contact && (
        <section className="tpl-section" style={{ padding: '100px 48px 80px', maxWidth: 800, margin: '0 auto', textAlign: 'center', borderTop: `2px solid ${theme.foreground}` }}>
          <h2 style={{ fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: 800, letterSpacing: '-2px', marginBottom: 16 }}>{contact.title}</h2>
          {contact.subtitle && <p style={{ fontSize: 17, color: theme.muted, marginBottom: 40, lineHeight: 1.7 }}>{contact.subtitle}</p>}
          {contact.email && (
            <div style={{ marginBottom: 40 }}>
              <a href={`mailto:${contact.email}`} style={{ fontSize: 20, color: theme.foreground, textDecoration: 'none', fontWeight: 600, borderBottom: `3px solid ${theme.foreground}`, paddingBottom: 4 }}>
                {contact.email}
              </a>
            </div>
          )}
          {contact.socialLinks && (
            <div style={{ display: 'flex', gap: 32, justifyContent: 'center' }}>
              {contact.socialLinks.map((link, i) => (
                <a key={i} href={link.url} style={{ fontSize: 15, color: theme.muted, textDecoration: 'none', fontWeight: 500, borderBottom: `1px solid ${theme.muted}40`, paddingBottom: 2 }}>
                  {link.platform}
                </a>
              ))}
            </div>
          )}
        </section>
      )}

      <footer style={{ padding: '28px 48px', fontSize: 12, color: theme.muted, display: 'flex', justifyContent: 'space-between', borderTop: `1px solid ${theme.muted}30` }}>
        <span>&copy; 2025 {brandName}</span>
        <span>All rights reserved</span>
      </footer>
    </div>
  );
};

export default Renderer;
