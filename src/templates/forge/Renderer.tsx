import React from 'react';
import { SiteConfig } from '../../types';
import { getSectionImage, getSectionImages } from '../../lib/images';

interface Props {
  config: SiteConfig;
}

const FALLBACK_PROJECTS = [
  'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&h=400&fit=crop',
];

const FALLBACK_TEAM = [
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop',
];

const Renderer: React.FC<Props> = ({ config }) => {
  const { theme, sections, brandName, tagline, ctaPrimary, ctaSecondary } = config;
  const hero = sections.hero as { title?: string; subtitle?: string } | undefined;
  const services = sections.services as { title?: string; subtitle?: string; items?: Array<{ id: string; title: string; description: string; icon: string }> } | undefined;
  const projects = sections.projects as { title?: string; subtitle?: string; items?: Array<{ id: string; title: string; category: string; value?: string; year?: number; description: string; duration?: string }> } | undefined;
  const statistics = sections.statistics as { title?: string; items?: Array<{ id: string; value: string; label: string }> } | undefined;
  const team = sections.team as { title?: string; subtitle?: string; members?: Array<{ id: string; name: string; role: string; bio: string }> } | undefined;
  const contact = sections.contact as { title?: string; subtitle?: string; email?: string; phone?: string; address?: string } | undefined;

  const projectImages = getSectionImages(config, 'work', projects?.items?.length || 3, FALLBACK_PROJECTS);
  const teamImages = getSectionImages(config, 'team', team?.members?.length || 3, FALLBACK_TEAM);

  return (
    <div style={{ backgroundColor: theme.background, color: theme.foreground, minHeight: '100vh', fontFamily: "'Inter', -apple-system, sans-serif" }}>
      <nav style={{ padding: '16px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: theme.foreground, color: theme.background }}>
        <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase' }}>{brandName}</div>
        <div style={{ display: 'flex', gap: 32, alignItems: 'center', fontSize: 13, fontWeight: 600 }}>
          <span style={{ color: theme.muted, cursor: 'pointer' }}>Services</span>
          <span style={{ color: theme.muted, cursor: 'pointer' }}>Projects</span>
          <span style={{ color: theme.muted, cursor: 'pointer' }}>About</span>
          <span style={{ color: theme.muted, cursor: 'pointer' }}>Team</span>
          <button className="tpl-btn" style={{ backgroundColor: theme.accent, color: '#fff', border: 'none', padding: '10px 24px', fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', cursor: 'pointer' }}>
            {ctaPrimary}
          </button>
        </div>
      </nav>

      <section className="tpl-hero" style={{ position: 'relative', backgroundColor: theme.foreground, color: theme.background, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '45%', overflow: 'hidden' }}>
          <img src={getSectionImage(config, 'hero', 0, 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop')} alt="Construction site" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }} />
        </div>
        <div style={{ position: 'relative', padding: '100px 48px', maxWidth: 1200, margin: '0 auto' }}>
          {hero?.title && (
            <h1 style={{ fontSize: 'clamp(36px, 6vw, 72px)', fontWeight: 800, lineHeight: 1.0, letterSpacing: '-2px', maxWidth: 700, marginBottom: 24, textTransform: 'uppercase' }}>
              {hero.title}
            </h1>
          )}
          {hero?.subtitle && (
            <p style={{ fontSize: 17, lineHeight: 1.7, maxWidth: 500, color: theme.muted, marginBottom: 44 }}>
              {hero.subtitle}
            </p>
          )}
          <div style={{ display: 'flex', gap: 16 }}>
            <button className="tpl-btn" style={{ backgroundColor: theme.accent, color: '#fff', border: 'none', padding: '18px 40px', fontSize: 14, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', cursor: 'pointer' }}>
              {ctaPrimary}
            </button>
            <button className="tpl-btn" style={{ backgroundColor: 'transparent', color: theme.background, border: `1.5px solid ${theme.muted}`, padding: '18px 40px', fontSize: 14, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', cursor: 'pointer' }}>
              {ctaSecondary}
            </button>
          </div>
        </div>
      </section>

      {services && (
        <section className="tpl-section" style={{ padding: '100px 48px', maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 48, marginBottom: 56, alignItems: 'end' }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', color: theme.accent, marginBottom: 12 }}>Our Services</div>
              <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 40px)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.5px' }}>{services.title}</h2>
            </div>
            {services.subtitle && <p style={{ fontSize: 15, color: theme.muted, lineHeight: 1.7 }}>{services.subtitle}</p>}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
            {services.items?.map((item, i) => (
              <div key={item.id} className="tpl-card" style={{ padding: 32, backgroundColor: '#fff', border: `1px solid ${theme.muted}20`, borderLeft: `4px solid ${theme.accent}`, transition: 'transform 0.25s' }}>
                <div style={{ fontSize: 32, fontWeight: 800, color: theme.accent, marginBottom: 16, opacity: 0.3 }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{item.title}</h3>
                <p style={{ fontSize: 13, lineHeight: 1.75, color: theme.muted }}>{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {projects && (
        <section className="tpl-section" style={{ padding: '80px 48px', backgroundColor: `${theme.muted}12` }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ marginBottom: 56 }}>
              <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', color: theme.accent, marginBottom: 12 }}>Featured Projects</div>
              <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 40px)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.5px', marginBottom: 8 }}>{projects.title}</h2>
              {projects.subtitle && <p style={{ fontSize: 15, color: theme.muted }}>{projects.subtitle}</p>}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
              {projects.items?.map((item, i) => (
                <div key={item.id} className="tpl-card" style={{ backgroundColor: '#fff', overflow: 'hidden', border: `1px solid ${theme.muted}20`, transition: 'transform 0.25s' }}>
                  <div style={{ width: '100%', height: 240, overflow: 'hidden', position: 'relative' }}>
                    <img src={projectImages[i] || projectImages[0]} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    {item.value && (
                      <div style={{ position: 'absolute', top: 16, right: 16, backgroundColor: theme.accent, color: '#fff', padding: '6px 14px', borderRadius: 4, fontSize: 14, fontWeight: 700 }}>
                        {item.value}
                      </div>
                    )}
                  </div>
                  <div style={{ padding: '24px 28px' }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: theme.accent, textTransform: 'uppercase', letterSpacing: '1.5px' }}>{item.category}</span>
                    <h3 style={{ fontSize: 20, fontWeight: 700, marginTop: 8, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.3px' }}>{item.title}</h3>
                    <p style={{ fontSize: 13, lineHeight: 1.65, color: theme.muted, marginBottom: 12 }}>{item.description}</p>
                    <div style={{ fontSize: 12, color: theme.muted, display: 'flex', gap: 16, paddingTop: 12, borderTop: `1px solid ${theme.muted}20` }}>
                      {item.year && <span>{item.year}</span>}
                      {item.duration && <span>Duration: {item.duration}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {statistics && (
        <section className="tpl-section" style={{ padding: '80px 48px', backgroundColor: theme.foreground, color: theme.background }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 48, textAlign: 'center' }}>
            {statistics.items?.map((stat) => (
              <div key={stat.id}>
                <div style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 800, color: theme.accent, letterSpacing: '-2px', marginBottom: 8 }}>{stat.value}</div>
                <div style={{ fontSize: 14, color: theme.muted, textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 500 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {team && (
        <section className="tpl-section" style={{ padding: '100px 48px', maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ marginBottom: 56 }}>
            <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', color: theme.accent, marginBottom: 12 }}>Our Team</div>
            <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 40px)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.5px', marginBottom: 8 }}>{team.title}</h2>
            {team.subtitle && <p style={{ fontSize: 15, color: theme.muted }}>{team.subtitle}</p>}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
            {team.members?.map((m, i) => (
              <div key={m.id} className="tpl-card" style={{ padding: 32, border: `1px solid ${theme.muted}25`, textAlign: 'center', transition: 'transform 0.25s' }}>
                <div style={{ width: 80, height: 80, borderRadius: '50%', overflow: 'hidden', margin: '0 auto 24px', border: `3px solid ${theme.accent}` }}>
                  <img src={teamImages[i] || teamImages[0]} alt={m.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>{m.name}</h3>
                <div style={{ fontSize: 13, fontWeight: 600, color: theme.accent, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 16 }}>{m.role}</div>
                <p style={{ fontSize: 13, lineHeight: 1.75, color: theme.muted }}>{m.bio}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {contact && (
        <section className="tpl-section" style={{ padding: '80px 48px', backgroundColor: theme.foreground, color: theme.background, textAlign: 'center' }}>
          <div style={{ maxWidth: 700, margin: '0 auto' }}>
            <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', color: theme.accent, marginBottom: 12 }}>Get In Touch</div>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.5px', marginBottom: 16 }}>{contact.title}</h2>
            {contact.subtitle && <p style={{ fontSize: 15, color: theme.muted, marginBottom: 40, lineHeight: 1.7 }}>{contact.subtitle}</p>}
            <button className="tpl-btn" style={{ backgroundColor: theme.accent, color: '#fff', border: 'none', padding: '18px 52px', fontSize: 14, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', cursor: 'pointer', marginBottom: 48 }}>
              {ctaPrimary}
            </button>
            <div style={{ fontSize: 14, color: theme.muted, lineHeight: 2.4, display: 'flex', gap: 48, justifyContent: 'center', flexWrap: 'wrap' }}>
              {contact.email && <div><div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px', color: theme.accent, marginBottom: 4 }}>Email</div>{contact.email}</div>}
              {contact.phone && <div><div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px', color: theme.accent, marginBottom: 4 }}>Phone</div>{contact.phone}</div>}
              {contact.address && <div><div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px', color: theme.accent, marginBottom: 4 }}>Address</div>{contact.address}</div>}
            </div>
          </div>
        </section>
      )}

      <footer style={{ padding: '24px 48px', fontSize: 12, color: theme.muted, display: 'flex', justifyContent: 'space-between', borderTop: `1px solid ${theme.muted}30`, textTransform: 'uppercase', letterSpacing: '1px' }}>
        <span>&copy; 2025 {brandName}</span>
        <span>All rights reserved</span>
      </footer>
    </div>
  );
};

export default Renderer;
