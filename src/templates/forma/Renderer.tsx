import React from 'react';
import { SiteConfig } from '../../types';
import { getSectionImage, getSectionImages } from '../../lib/images';

interface Props {
  config: SiteConfig;
}

const FALLBACK_PROJECTS = [
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&h=400&fit=crop',
];

const Renderer: React.FC<Props> = ({ config }) => {
  const { theme, sections, brandName, tagline, ctaPrimary, ctaSecondary } = config;
  const hero = sections.hero as { title?: string; subtitle?: string } | undefined;
  const projects = sections.projects as { title?: string; subtitle?: string; items?: Array<{ id: string; title: string; category: string; location: string; year: number; description: string; area?: string }> } | undefined;
  const about = sections.about as { title?: string; description?: string; values?: Array<{ id: string; title: string; description: string }>; teamSize?: number; founded?: number } | undefined;
  const services = sections.services as { title?: string; subtitle?: string; items?: Array<{ id: string; title: string; description: string; icon: string }> } | undefined;
  const contact = sections.contact as { title?: string; subtitle?: string; email?: string; phone?: string; address?: string } | undefined;

  const projectImages = getSectionImages(config, 'work', projects?.items?.length || 4, FALLBACK_PROJECTS);

  return (
    <div style={{ backgroundColor: theme.background, color: theme.foreground, minHeight: '100vh', fontFamily: "'Georgia', 'Times New Roman', serif" }}>
      <nav style={{ padding: '28px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10 }}>
        <div style={{ fontSize: 18, fontWeight: 400, letterSpacing: '3px', textTransform: 'uppercase' }}>{brandName}</div>
        <div style={{ display: 'flex', gap: 36, fontSize: 13, fontWeight: 400, color: '#fff', letterSpacing: '1px', textTransform: 'uppercase', fontFamily: "'Inter', sans-serif" }}>
          <span style={{ cursor: 'pointer' }}>Projects</span>
          <span style={{ cursor: 'pointer' }}>About</span>
          <span style={{ cursor: 'pointer' }}>Services</span>
          <span style={{ cursor: 'pointer' }}>{ctaSecondary}</span>
        </div>
      </nav>

      <section className="tpl-hero" style={{ position: 'relative', height: '100vh', display: 'flex', alignItems: 'flex-end' }}>
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
          <img src={getSectionImage(config, 'hero', 0, 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1200&h=800&fit=crop')} alt="Architecture hero" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)' }} />
        <div style={{ position: 'relative', padding: '64px 48px', maxWidth: 800, zIndex: 2 }}>
          {hero?.title && (
            <h1 style={{ fontSize: 'clamp(32px, 4.5vw, 56px)', fontWeight: 400, lineHeight: 1.2, color: '#fff', marginBottom: 20, fontStyle: 'italic' }}>
              {hero.title}
            </h1>
          )}
          {hero?.subtitle && (
            <p style={{ fontSize: 17, lineHeight: 1.7, color: 'rgba(255,255,255,0.75)', marginBottom: 36, fontFamily: "'Inter', sans-serif" }}>
              {hero.subtitle}
            </p>
          )}
          <button className="tpl-btn" style={{ backgroundColor: theme.accent, color: '#fff', border: 'none', padding: '16px 40px', fontSize: 13, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>
            {ctaPrimary}
          </button>
        </div>
      </section>

      {projects && (
        <section className="tpl-section" style={{ padding: '100px 48px', maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 48, marginBottom: 64, alignItems: 'end' }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: theme.accent, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: 12, fontFamily: "'Inter', sans-serif" }}>Portfolio</div>
              <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 400, fontStyle: 'italic', lineHeight: 1.2 }}>{projects.title}</h2>
            </div>
            {projects.subtitle && <p style={{ fontSize: 15, color: theme.muted, fontFamily: "'Inter', sans-serif", lineHeight: 1.7 }}>{projects.subtitle}</p>}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
            {projects.items?.map((item, i) => (
              <div key={item.id} className="tpl-card" style={{ marginBottom: i < 2 ? 32 : 0 }}>
                <div style={{ width: '100%', height: i === 0 ? 400 : 300, overflow: 'hidden', borderRadius: 4, position: 'relative' }}>
                  <img src={projectImages[i] || projectImages[0]} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ paddingTop: 20 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: theme.accent, textTransform: 'uppercase', letterSpacing: '1.5px', fontFamily: "'Inter', sans-serif" }}>
                    {item.category}
                  </span>
                  <h3 style={{ fontSize: 24, fontWeight: 400, marginTop: 8, fontStyle: 'italic', marginBottom: 8 }}>{item.title}</h3>
                  <p style={{ fontSize: 13, color: theme.muted, fontFamily: "'Inter', sans-serif", marginBottom: 8 }}>
                    {item.location} &middot; {item.year}{item.area ? ` &middot; ${item.area}` : ''}
                  </p>
                  <p style={{ fontSize: 14, lineHeight: 1.7, color: theme.muted, fontFamily: "'Inter', sans-serif" }}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {about && (
        <section className="tpl-section" style={{ padding: '100px 48px', maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <div style={{ width: '100%', height: 500, overflow: 'hidden', borderRadius: 4, position: 'relative' }}>
            <img src={getSectionImage(config, 'about', 0, 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&h=500&fit=crop')} alt="Studio" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div>
            <h2 style={{ fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: 400, fontStyle: 'italic', marginBottom: 28 }}>{about.title}</h2>
            <p style={{ fontSize: 15, lineHeight: 1.9, color: theme.muted, fontFamily: "'Inter', sans-serif", marginBottom: 36 }}>{about.description}</p>
            {about.values && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
                {about.values.map((v) => (
                  <div key={v.id} style={{ paddingLeft: 24, borderLeft: `2px solid ${theme.accent}40` }}>
                    <h4 style={{ fontSize: 16, fontWeight: 600, marginBottom: 6, fontFamily: "'Inter', sans-serif" }}>{v.title}</h4>
                    <p style={{ fontSize: 14, color: theme.muted, lineHeight: 1.65, fontFamily: "'Inter', sans-serif" }}>{v.description}</p>
                  </div>
                ))}
              </div>
            )}
            {about.teamSize && about.founded && (
              <div style={{ display: 'flex', gap: 48, marginTop: 44, paddingTop: 32, borderTop: `1px solid ${theme.muted}30` }}>
                <div>
                  <div style={{ fontSize: 32, fontWeight: 400 }}>{about.founded}</div>
                  <div style={{ fontSize: 12, color: theme.muted, fontFamily: "'Inter', sans-serif", textTransform: 'uppercase', letterSpacing: '1px', marginTop: 4 }}>Founded</div>
                </div>
                <div>
                  <div style={{ fontSize: 32, fontWeight: 400 }}>{about.teamSize}</div>
                  <div style={{ fontSize: 12, color: theme.muted, fontFamily: "'Inter', sans-serif", textTransform: 'uppercase', letterSpacing: '1px', marginTop: 4 }}>Team Members</div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {services && (
        <section className="tpl-section" style={{ padding: '80px 48px', maxWidth: 1200, margin: '0 auto', borderTop: `1px solid ${theme.muted}30` }}>
          <h2 style={{ fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: 400, fontStyle: 'italic', marginBottom: 56 }}>{services.title}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 36 }}>
            {services.items?.map((item) => (
              <div key={item.id}>
                <div style={{ width: 48, height: 2, backgroundColor: theme.accent, marginBottom: 24 }} />
                <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12, fontFamily: "'Inter', sans-serif" }}>{item.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.75, color: theme.muted, fontFamily: "'Inter', sans-serif" }}>{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {contact && (
        <section className="tpl-section" style={{ padding: '100px 48px', maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 400, fontStyle: 'italic', marginBottom: 16 }}>{contact.title}</h2>
            {contact.subtitle && <p style={{ fontSize: 15, color: theme.muted, marginBottom: 40, fontFamily: "'Inter', sans-serif", lineHeight: 1.7 }}>{contact.subtitle}</p>}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, fontFamily: "'Inter', sans-serif" }}>
              {contact.email && <div style={{ fontSize: 15, padding: '16px 0', borderTop: `1px solid ${theme.muted}30` }}><span style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '1px', color: theme.muted, display: 'block', marginBottom: 4 }}>Email</span>{contact.email}</div>}
              {contact.phone && <div style={{ fontSize: 15, padding: '16px 0', borderTop: `1px solid ${theme.muted}30` }}><span style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '1px', color: theme.muted, display: 'block', marginBottom: 4 }}>Phone</span>{contact.phone}</div>}
              {contact.address && <div style={{ fontSize: 15, padding: '16px 0', borderTop: `1px solid ${theme.muted}30` }}><span style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '1px', color: theme.muted, display: 'block', marginBottom: 4 }}>Studio</span>{contact.address}</div>}
            </div>
          </div>
          <div style={{ width: '100%', height: 400, overflow: 'hidden', borderRadius: 4, position: 'relative' }}>
            <img src={getSectionImage(config, 'contact', 0, 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop')} alt="Our office" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </section>
      )}

      <footer style={{ padding: '32px 48px', fontSize: 12, color: theme.muted, display: 'flex', justifyContent: 'space-between', fontFamily: "'Inter', sans-serif", borderTop: `1px solid ${theme.muted}30`, letterSpacing: '1px' }}>
        <span>&copy; 2025 {brandName}</span>
        <span>All rights reserved</span>
      </footer>
    </div>
  );
};

export default Renderer;
