import React from 'react';
import { SiteConfig } from '../../types';
import { getSectionImage } from '../../lib/images';

interface Props {
  config: SiteConfig;
}

const Renderer: React.FC<Props> = ({ config }) => {
  const { theme, sections, brandName, tagline, ctaPrimary, ctaSecondary } = config;
  const hero = sections.hero as { title?: string; subtitle?: string } | undefined;
  const menu = sections.menu as { title?: string; subtitle?: string; categories?: Array<{ id: string; name: string; items: Array<{ id: string; name: string; description: string; price: string }> }> } | undefined;
  const story = sections.story as { title?: string; description?: string; paragraphs?: string[]; chef?: { name: string; title: string } } | undefined;
  const location = sections.location as { title?: string; address?: string; neighborhood?: string; hours?: Array<{ days: string; time: string }>; phone?: string; parking?: string } | undefined;
  const reservation = sections.reservation as { title?: string; subtitle?: string; phone?: string; email?: string; notes?: string } | undefined;

  return (
    <div style={{ backgroundColor: theme.background, color: theme.foreground, minHeight: '100vh', fontFamily: "'Inter', -apple-system, sans-serif" }}>
      <nav style={{ padding: '20px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.5px' }}>{brandName}</div>
        <div style={{ display: 'flex', gap: 32, alignItems: 'center', fontSize: 14 }}>
          <span style={{ color: theme.muted, fontWeight: 500, cursor: 'pointer' }}>Menu</span>
          <span style={{ color: theme.muted, fontWeight: 500, cursor: 'pointer' }}>Our Story</span>
          <span style={{ color: theme.muted, fontWeight: 500, cursor: 'pointer' }}>Location</span>
          <button className="tpl-btn" style={{ backgroundColor: theme.accent, color: '#fff', border: 'none', padding: '10px 24px', fontSize: 14, fontWeight: 600, borderRadius: 6, cursor: 'pointer' }}>
            {ctaPrimary}
          </button>
        </div>
      </nav>

      <section className="tpl-hero" style={{ position: 'relative', maxWidth: 1100, margin: '0 auto', padding: '0 48px 80px' }}>
        <div style={{ width: '100%', height: 440, borderRadius: 20, overflow: 'hidden', position: 'relative', marginBottom: 0 }}>
          <img src={getSectionImage(config, 'hero', 0, 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1100&h=440&fit=crop')} alt={`${brandName} restaurant`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)' }} />
          <div style={{ position: 'absolute', bottom: 48, left: 48, right: 48, zIndex: 2 }}>
            {hero?.title && (
              <h1 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-1px', color: '#fff', marginBottom: 12 }}>
                {hero.title}
              </h1>
            )}
            {hero?.subtitle && (
              <p style={{ fontSize: 17, lineHeight: 1.7, color: 'rgba(255,255,255,0.8)', maxWidth: 560 }}>
                {hero.subtitle}
              </p>
            )}
          </div>
        </div>
      </section>

      {menu && (
        <section className="tpl-section" style={{ padding: '20px 48px 80px', maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '2px', color: theme.accent, marginBottom: 12 }}>Our Menu</div>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 700, letterSpacing: '-0.8px', marginBottom: 8 }}>{menu.title}</h2>
            {menu.subtitle && <p style={{ fontSize: 15, color: theme.muted, maxWidth: 500, margin: '0 auto' }}>{menu.subtitle}</p>}
          </div>
          {menu.categories?.map((cat) => (
            <div key={cat.id} style={{ marginBottom: 56 }}>
              <h3 style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', color: theme.accent, marginBottom: 28, paddingBottom: 14, borderBottom: `2px solid ${theme.accent}30` }}>
                {cat.name}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                {cat.items.map((item) => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 24 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
                        <h4 style={{ fontSize: 18, fontWeight: 600 }}>{item.name}</h4>
                        <div style={{ flex: 1, borderBottom: `1px dotted ${theme.muted}50`, marginBottom: 4 }} />
                        <span style={{ fontSize: 18, fontWeight: 600, whiteSpace: 'nowrap' }}>${item.price}</span>
                      </div>
                      <p style={{ fontSize: 14, color: theme.muted, marginTop: 6, lineHeight: 1.5 }}>{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>
      )}

      {story && (
        <section className="tpl-section" style={{ padding: '80px 48px', maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center' }}>
          <div style={{ width: '100%', height: 420, overflow: 'hidden', borderRadius: 16, position: 'relative' }}>
            <img src={getSectionImage(config, 'story', 0, 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&h=420&fit=crop')} alt="Chef at work" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '2px', color: theme.accent, marginBottom: 12 }}>Our Story</div>
            <h2 style={{ fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: 700, letterSpacing: '-0.5px', marginBottom: 24 }}>{story.title}</h2>
            <p style={{ fontSize: 15, lineHeight: 1.85, color: theme.muted, marginBottom: 20 }}>{story.description}</p>
            {story.paragraphs?.map((p, i) => (
              <p key={i} style={{ fontSize: 14, lineHeight: 1.85, color: theme.muted, marginBottom: 16 }}>{p}</p>
            ))}
            {story.chef && (
              <div style={{ marginTop: 28, paddingTop: 24, borderTop: `1px solid ${theme.muted}30` }}>
                <div style={{ fontSize: 18, fontWeight: 600 }}>{story.chef.name}</div>
                <div style={{ fontSize: 14, color: theme.accent, marginTop: 4, fontWeight: 500 }}>{story.chef.title}</div>
              </div>
            )}
          </div>
        </section>
      )}

      {location && (
        <section className="tpl-section" style={{ padding: '80px 48px', maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ backgroundColor: `${theme.muted}12`, borderRadius: 20, padding: '48px 56px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'start' }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '2px', color: theme.accent, marginBottom: 12 }}>Find Us</div>
                <h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.5px', marginBottom: 24 }}>{location.title}</h2>
                <div style={{ fontSize: 16, lineHeight: 2, marginBottom: 24 }}>
                  <div style={{ fontWeight: 600 }}>{location.address}</div>
                  {location.neighborhood && <div style={{ color: theme.muted, fontSize: 15 }}>{location.neighborhood}</div>}
                </div>
                {location.hours && (
                  <div style={{ marginBottom: 24 }}>
                    {location.hours.map((h, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, padding: '8px 0', borderBottom: `1px solid ${theme.muted}20` }}>
                        <span style={{ fontWeight: 500 }}>{h.days}</span>
                        <span style={{ color: h.time === 'Closed' ? theme.accent : theme.muted, fontWeight: h.time === 'Closed' ? 600 : 400 }}>{h.time}</span>
                      </div>
                    ))}
                  </div>
                )}
                {location.phone && <div style={{ fontSize: 15, color: theme.muted, marginBottom: 8 }}>{location.phone}</div>}
                {location.parking && <p style={{ fontSize: 13, color: theme.muted, lineHeight: 1.6, marginTop: 8 }}>{location.parking}</p>}
              </div>
              <div style={{ width: '100%', height: '100%', minHeight: 300, borderRadius: 16, overflow: 'hidden' }}>
                <img src={getSectionImage(config, 'location', 0, 'https://images.unsplash.com/photo-1526738682237-0f7c2a3c6de0?w=600&h=400&fit=crop')} alt="Restaurant location" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>
          </div>
        </section>
      )}

      {reservation && (
        <section className="tpl-section" style={{ padding: '80px 48px', maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', padding: '72px 48px', borderRadius: 24, backgroundColor: theme.accent, color: '#fff' }}>
            <h2 style={{ fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: 700, letterSpacing: '-0.5px', marginBottom: 12 }}>{reservation.title}</h2>
            {reservation.subtitle && <p style={{ fontSize: 16, opacity: 0.9, marginBottom: 36, maxWidth: 500, margin: '0 auto 36px', lineHeight: 1.6 }}>{reservation.subtitle}</p>}
            <button className="tpl-btn" style={{ backgroundColor: '#fff', color: theme.accent, border: 'none', padding: '16px 48px', fontSize: 16, fontWeight: 600, borderRadius: 8, cursor: 'pointer', marginBottom: 32 }}>
              {ctaPrimary}
            </button>
            <div style={{ fontSize: 14, opacity: 0.85, lineHeight: 2 }}>
              {reservation.phone && <div>{reservation.phone}</div>}
              {reservation.email && <div>{reservation.email}</div>}
              {reservation.notes && <div style={{ marginTop: 12, fontSize: 13, fontStyle: 'italic' }}>{reservation.notes}</div>}
            </div>
          </div>
        </section>
      )}

      <footer style={{ padding: '32px 48px', fontSize: 13, color: theme.muted, display: 'flex', justifyContent: 'space-between', borderTop: `1px solid ${theme.muted}30` }}>
        <span>&copy; 2025 {brandName}</span>
        <span>Farm to table &middot; Hudson, NY</span>
      </footer>
    </div>
  );
};

export default Renderer;
