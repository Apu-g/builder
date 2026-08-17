import React from 'react';
import { SiteConfig } from '../../types';
import { getSectionImage, getSectionImages } from '../../lib/images';

interface Props {
  config: SiteConfig;
}

const FALLBACK_WORK = [
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&h=400&fit=crop',
];

const Renderer: React.FC<Props> = ({ config }) => {
  const { theme, sections, brandName, tagline, description, ctaPrimary, ctaSecondary } = config;
  const hero = sections.hero as { title?: string; subtitle?: string } | undefined;
  const services = sections.services as { title?: string; subtitle?: string; items?: Array<{ id: string; title: string; description: string; icon: string }> } | undefined;
  const work = sections.work as { title?: string; subtitle?: string; items?: Array<{ id: string; title: string; category: string; description: string }> } | undefined;
  const about = sections.about as { title?: string; description?: string; values?: Array<{ id: string; title: string; description: string }>; teamSize?: number; founded?: number } | undefined;
  const testimonial = sections.testimonial as { title?: string; items?: Array<{ id: string; quote: string; author: string; role: string }> } | undefined;
  const contact = sections.contact as { title?: string; subtitle?: string; email?: string; phone?: string; address?: string } | undefined;

  const heroImg = getSectionImage(config, 'hero', 0, 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=600&fit=crop');
  const workImages = getSectionImages(config, 'work', work?.items?.length || 4, FALLBACK_WORK);

  return (
    <div style={{ backgroundColor: theme.background, color: theme.foreground, minHeight: '100vh', fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}>
      <nav style={{ padding: '24px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${theme.muted}20` }}>
        <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.5px' }}>{brandName}</div>
        <div style={{ display: 'flex', gap: 32, fontSize: 14, fontWeight: 500, color: theme.muted, alignItems: 'center' }}>
          <span style={{ cursor: 'pointer' }}>Work</span>
          <span style={{ cursor: 'pointer' }}>Services</span>
          <span style={{ cursor: 'pointer' }}>About</span>
          <button className="tpl-btn" style={{ backgroundColor: theme.accent, color: '#fff', border: 'none', padding: '10px 24px', fontSize: 14, fontWeight: 600, borderRadius: 6, cursor: 'pointer' }}>
            {ctaPrimary}
          </button>
        </div>
      </nav>

      <section className="tpl-hero" style={{ padding: '60px 48px 0', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '2px', color: theme.accent, marginBottom: 16 }}>{tagline || 'Creative Agency'}</div>
            {hero?.title && (
              <h1 style={{ fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-1.5px', marginBottom: 24 }}>
                {hero.title}
              </h1>
            )}
            {hero?.subtitle && (
              <p style={{ fontSize: 18, lineHeight: 1.7, maxWidth: 520, color: theme.muted, marginBottom: 36 }}>
                {hero.subtitle}
              </p>
            )}
            <div style={{ display: 'flex', gap: 16 }}>
              <button className="tpl-btn" style={{ backgroundColor: theme.accent, color: '#fff', border: 'none', padding: '16px 36px', fontSize: 15, fontWeight: 600, borderRadius: 6, cursor: 'pointer' }}>
                {ctaPrimary}
              </button>
              <button className="tpl-btn" style={{ backgroundColor: 'transparent', color: theme.foreground, border: `1.5px solid ${theme.muted}60`, padding: '16px 36px', fontSize: 15, fontWeight: 600, borderRadius: 6, cursor: 'pointer' }}>
                {ctaSecondary}
              </button>
            </div>
          </div>
          <div style={{ width: '100%', height: 420, overflow: 'hidden', borderRadius: 12, position: 'relative' }}>
            <img src={heroImg} alt={brandName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
      </section>

      {services && (
        <section className="tpl-section" style={{ padding: '100px 48px', maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ marginBottom: 56 }}>
            <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '2px', color: theme.accent, marginBottom: 12 }}>{tagline || 'What We Do'}</div>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 700, letterSpacing: '-1px', marginBottom: 8 }}>{services.title}</h2>
            {services.subtitle && <p style={{ fontSize: 16, color: theme.muted, maxWidth: 500 }}>{services.subtitle}</p>}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 28 }}>
            {services.items?.map((item) => (
              <div key={item.id} className="tpl-card" style={{ padding: 36, borderRadius: 12, backgroundColor: `${theme.muted}08`, border: `1px solid ${theme.muted}18`, transition: 'transform 0.25s, box-shadow 0.25s' }}>
                <div style={{ width: 52, height: 52, backgroundColor: `${theme.accent}15`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, color: theme.accent, fontWeight: 700, fontSize: 22 }}>
                  {item.title.charAt(0)}
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12, letterSpacing: '-0.3px' }}>{item.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.75, color: theme.muted }}>{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {work && (
        <section className="tpl-section" style={{ padding: '0 48px 100px', maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ marginBottom: 56 }}>
            <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '2px', color: theme.accent, marginBottom: 12 }}>Selected Work</div>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 700, letterSpacing: '-1px', marginBottom: 8 }}>{work.title}</h2>
            {work.subtitle && <p style={{ fontSize: 16, color: theme.muted, maxWidth: 500 }}>{work.subtitle}</p>}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 28 }}>
            {work.items?.map((item, i) => (
              <div key={item.id} className="tpl-card" style={{ borderRadius: 12, overflow: 'hidden', backgroundColor: '#fff', border: `1px solid ${theme.muted}15`, transition: 'transform 0.25s' }}>
                <div style={{ width: '100%', height: 280, overflow: 'hidden', position: 'relative' }}>
                  <img src={workImages[i] || workImages[0]} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '24px 28px' }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: theme.accent, textTransform: 'uppercase', letterSpacing: '1px' }}>{item.category}</span>
                  <h3 style={{ fontSize: 20, fontWeight: 600, marginTop: 8, letterSpacing: '-0.3px', marginBottom: 8 }}>{item.title}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.65, color: theme.muted }}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {about && (
        <section className="tpl-section" style={{ padding: '100px 48px', maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '2px', color: theme.accent, marginBottom: 12 }}>About Us</div>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 700, letterSpacing: '-1px', marginBottom: 24 }}>{about.title}</h2>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: theme.muted, marginBottom: 36 }}>{about.description}</p>
            {about.values && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                {about.values.map((v) => (
                  <div key={v.id} style={{ paddingLeft: 20, borderLeft: `3px solid ${theme.accent}50` }}>
                    <h4 style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>{v.title}</h4>
                    <p style={{ fontSize: 14, color: theme.muted, lineHeight: 1.65 }}>{v.description}</p>
                  </div>
                ))}
              </div>
            )}
            {about.teamSize && about.founded && (
              <div style={{ display: 'flex', gap: 48, marginTop: 40, paddingTop: 32, borderTop: `1px solid ${theme.muted}30` }}>
                <div><div style={{ fontSize: 32, fontWeight: 700, color: theme.accent }}>{about.founded}</div><div style={{ fontSize: 12, color: theme.muted, textTransform: 'uppercase', letterSpacing: '1px', marginTop: 4 }}>Founded</div></div>
                <div><div style={{ fontSize: 32, fontWeight: 700, color: theme.accent }}>{about.teamSize}+</div><div style={{ fontSize: 12, color: theme.muted, textTransform: 'uppercase', letterSpacing: '1px', marginTop: 4 }}>Team</div></div>
              </div>
            )}
          </div>
          <div style={{ width: '100%', height: 500, overflow: 'hidden', borderRadius: 12, position: 'relative' }}>
            <img src={getSectionImage(config, 'about', 0, 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=500&fit=crop')} alt="Our studio" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </section>
      )}

      {testimonial && testimonial.items && (
        <section className="tpl-section" style={{ padding: '100px 48px', backgroundColor: `${theme.muted}08` }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '2px', color: theme.accent, marginBottom: 12 }}>Testimonials</div>
              <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 700, letterSpacing: '-1px' }}>What Clients Say</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 32 }}>
              {testimonial.items.map((t) => (
                <div key={t.id} style={{ padding: 40, borderRadius: 12, backgroundColor: theme.background, border: `1px solid ${theme.muted}15` }}>
                  <div style={{ fontSize: 64, color: theme.accent, lineHeight: 0.8, marginBottom: 16, fontWeight: 700 }}>"</div>
                  <blockquote style={{ fontSize: 17, lineHeight: 1.75, fontWeight: 500, letterSpacing: '-0.2px', fontStyle: 'normal', margin: 0, marginBottom: 28 }}>
                    {t.quote}
                  </blockquote>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', backgroundColor: `${theme.accent}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: theme.accent, fontWeight: 700, fontSize: 16 }}>
                      {t.author.charAt(0)}
                    </div>
                    <div>
                      <span style={{ fontSize: 15, fontWeight: 600, display: 'block' }}>{t.author}</span>
                      <span style={{ fontSize: 13, color: theme.muted }}>{t.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {contact && (
        <section className="tpl-section" style={{ padding: '100px 48px', maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64 }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '2px', color: theme.accent, marginBottom: 12 }}>Get In Touch</div>
              <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 700, letterSpacing: '-1px', marginBottom: 12 }}>{contact.title}</h2>
              {contact.subtitle && <p style={{ fontSize: 16, color: theme.muted, marginBottom: 40, lineHeight: 1.7 }}>{contact.subtitle}</p>}
              <div style={{ display: 'grid', gap: 28 }}>
                {contact.email && <div style={{ padding: 20, borderRadius: 10, backgroundColor: `${theme.muted}08` }}><div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: theme.accent, marginBottom: 6 }}>Email</div><div style={{ fontSize: 16, fontWeight: 500 }}>{contact.email}</div></div>}
                {contact.phone && <div style={{ padding: 20, borderRadius: 10, backgroundColor: `${theme.muted}08` }}><div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: theme.accent, marginBottom: 6 }}>Phone</div><div style={{ fontSize: 16, fontWeight: 500 }}>{contact.phone}</div></div>}
                {contact.address && <div style={{ padding: 20, borderRadius: 10, backgroundColor: `${theme.muted}08` }}><div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: theme.accent, marginBottom: 6 }}>Studio</div><div style={{ fontSize: 16, fontWeight: 500 }}>{contact.address}</div></div>}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ padding: 48, borderRadius: 16, backgroundColor: theme.accent, color: '#fff' }}>
                <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>Ready to Start?</h3>
                <p style={{ fontSize: 15, opacity: 0.9, lineHeight: 1.7, marginBottom: 28 }}>Let's create something extraordinary together. Reach out and let's talk about your vision.</p>
                <button className="tpl-btn" style={{ backgroundColor: '#fff', color: theme.accent, border: 'none', padding: '14px 36px', fontSize: 15, fontWeight: 600, borderRadius: 6, cursor: 'pointer' }}>
                  {ctaPrimary}
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      <footer style={{ padding: '32px 48px', fontSize: 13, color: theme.muted, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `1px solid ${theme.muted}25` }}>
        <span>© 2025 {brandName}. All rights reserved.</span>
        <div style={{ display: 'flex', gap: 24 }}>
          <span style={{ cursor: 'pointer' }}>Privacy</span>
          <span style={{ cursor: 'pointer' }}>Terms</span>
          <span style={{ cursor: 'pointer' }}>Instagram</span>
          <span style={{ cursor: 'pointer' }}>LinkedIn</span>
        </div>
      </footer>
    </div>
  );
};

export default Renderer;
