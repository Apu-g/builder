import React from 'react';
import { SiteConfig } from '../../types';
import { getSectionImage, getSectionImages } from '../../lib/images';

interface Props {
  config: SiteConfig;
}

const FALLBACK_TRAINERS = [
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop',
];

const Renderer: React.FC<Props> = ({ config }) => {
  const { theme, sections, brandName, tagline, ctaPrimary, ctaSecondary } = config;
  const hero = sections.hero as { title?: string; subtitle?: string; ctaPrimary?: string; ctaSecondary?: string } | undefined;
  const programs = sections.programs as { title?: string; subtitle?: string; items?: Array<{ id: string; title: string; description: string; frequency?: string; level?: string }> } | undefined;
  const trainers = sections.trainers as { title?: string; subtitle?: string; items?: Array<{ id: string; name: string; title: string; specialties?: string[]; certifications?: string; bio: string }> } | undefined;
  const testimonials = sections.testimonials as { title?: string; subtitle?: string; items?: Array<{ id: string; quote: string; author: string; role: string }> } | undefined;
  const membership = sections.membership as { title?: string; subtitle?: string; tiers?: Array<{ id: string; name: string; price: string; period: string; description: string; features: string[]; highlighted: boolean }> } | undefined;
  const contact = sections.contact as { title?: string; subtitle?: string; email?: string; phone?: string; address?: string; hours?: string } | undefined;

  const trainerImages = getSectionImages(config, 'trainer', trainers?.items?.length || 3, FALLBACK_TRAINERS);

  return (
    <div style={{ backgroundColor: theme.background, color: theme.foreground, minHeight: '100vh', fontFamily: "'Inter', -apple-system, sans-serif" }}>
      <nav style={{ padding: '16px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: '-0.5px', textTransform: 'uppercase' }}>{brandName}</div>
        <div style={{ display: 'flex', gap: 32, alignItems: 'center', fontSize: 13, fontWeight: 600 }}>
          <span style={{ color: theme.muted, cursor: 'pointer' }}>Programs</span>
          <span style={{ color: theme.muted, cursor: 'pointer' }}>Coaches</span>
          <span style={{ color: theme.muted, cursor: 'pointer' }}>Membership</span>
          <button className="tpl-btn" style={{ backgroundColor: theme.accent, color: '#fff', border: 'none', padding: '10px 24px', fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', cursor: 'pointer' }}>
            {ctaPrimary}
          </button>
        </div>
      </nav>

      <section className="tpl-hero" style={{ position: 'relative', textAlign: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img src={getSectionImage(config, 'hero', 0, 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=700&fit=crop')} alt="Gym interior" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3 }} />
        </div>
        <div style={{ position: 'relative', padding: '100px 48px 120px', zIndex: 1 }}>
          {hero?.ctaPrimary && (
            <div style={{ display: 'inline-block', backgroundColor: `${theme.accent}25`, color: theme.accent, padding: '8px 20px', borderRadius: 4, fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: 28 }}>
              Free Trial Available
            </div>
          )}
          {hero?.title && (
            <h1 style={{ fontSize: 'clamp(42px, 7vw, 80px)', fontWeight: 900, lineHeight: 1.0, letterSpacing: '-2px', textTransform: 'uppercase', maxWidth: 900, margin: '0 auto 24px' }}>
              {hero.title}
            </h1>
          )}
          {hero?.subtitle && (
            <p style={{ fontSize: 18, lineHeight: 1.7, maxWidth: 560, margin: '0 auto 44px', color: theme.muted }}>
              {hero.subtitle}
            </p>
          )}
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
            <button className="tpl-btn" style={{ backgroundColor: theme.accent, color: '#fff', border: 'none', padding: '18px 44px', fontSize: 15, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', cursor: 'pointer' }}>
              {hero?.ctaPrimary || ctaPrimary}
            </button>
            <button className="tpl-btn" style={{ backgroundColor: 'transparent', color: theme.foreground, border: `1.5px solid ${theme.muted}40`, padding: '18px 44px', fontSize: 15, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', cursor: 'pointer' }}>
              {hero?.ctaSecondary || ctaSecondary}
            </button>
          </div>
        </div>
      </section>

      {programs && (
        <section className="tpl-section" style={{ padding: '80px 48px', maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ marginBottom: 56 }}>
            <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', color: theme.accent, marginBottom: 12 }}>Our Programs</div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 46px)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.5px', marginBottom: 8 }}>{programs.title}</h2>
            {programs.subtitle && <p style={{ fontSize: 15, color: theme.muted, maxWidth: 500 }}>{programs.subtitle}</p>}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
            {programs.items?.map((item) => (
              <div key={item.id} className="tpl-card" style={{ padding: 32, backgroundColor: '#141414', border: `1px solid ${theme.muted}20`, borderRadius: 8, transition: 'transform 0.25s' }}>
                <h3 style={{ fontSize: 19, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6, color: '#fff' }}>{item.title}</h3>
                {item.level && <div style={{ fontSize: 11, fontWeight: 700, color: theme.accent, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: 16 }}>{item.level}</div>}
                <p style={{ fontSize: 13, lineHeight: 1.7, color: theme.muted, marginBottom: 20 }}>{item.description}</p>
                {item.frequency && <div style={{ fontSize: 12, color: theme.muted, fontWeight: 600, paddingTop: 12, borderTop: `1px solid ${theme.muted}20` }}>{item.frequency}</div>}
              </div>
            ))}
          </div>
        </section>
      )}

      {trainers && (
        <section className="tpl-section" style={{ padding: '80px 48px', maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ marginBottom: 56 }}>
            <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', color: theme.accent, marginBottom: 12 }}>Expert Coaches</div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 46px)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.5px', marginBottom: 8 }}>{trainers.title}</h2>
            {trainers.subtitle && <p style={{ fontSize: 15, color: theme.muted, maxWidth: 500 }}>{trainers.subtitle}</p>}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
            {trainers.items?.map((t, i) => (
              <div key={t.id} className="tpl-card" style={{ textAlign: 'center', transition: 'transform 0.25s' }}>
                <div style={{ width: 160, height: 160, borderRadius: '50%', overflow: 'hidden', margin: '0 auto 24px', border: `4px solid ${theme.accent}` }}>
                  <img src={trainerImages[i] || trainerImages[0]} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4, textTransform: 'uppercase' }}>{t.name}</h3>
                <div style={{ fontSize: 14, color: theme.accent, fontWeight: 600, marginBottom: 12 }}>{t.title}</div>
                <p style={{ fontSize: 13, lineHeight: 1.7, color: theme.muted, marginBottom: 16 }}>{t.bio}</p>
                {t.specialties && (
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
                    {t.specialties.map((s, idx) => (
                      <span key={idx} style={{ fontSize: 11, padding: '4px 12px', border: `1px solid ${theme.muted}30`, borderRadius: 4, color: theme.muted, fontWeight: 500 }}>{s}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {testimonials && (
        <section className="tpl-section" style={{ padding: '80px 48px', backgroundColor: `${theme.muted}08` }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ marginBottom: 56 }}>
              <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', color: theme.accent, marginBottom: 12 }}>Testimonials</div>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 46px)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.5px', marginBottom: 8 }}>{testimonials.title}</h2>
              {testimonials.subtitle && <p style={{ fontSize: 15, color: theme.muted }}>{testimonials.subtitle}</p>}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
              {testimonials.items?.map((t) => (
                <div key={t.id} style={{ padding: 32, border: `1px solid ${theme.muted}25`, borderRadius: 8, backgroundColor: '#141414' }}>
                  <div style={{ fontSize: 36, color: theme.accent, fontWeight: 900, lineHeight: 1, marginBottom: 16 }}>&quot;</div>
                  <p style={{ fontSize: 15, lineHeight: 1.75, marginBottom: 24, fontStyle: 'italic', color: '#ccc' }}>{t.quote}</p>
                  <div style={{ paddingTop: 16, borderTop: `1px solid ${theme.muted}25` }}>
                    <div style={{ fontSize: 14, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{t.author}</div>
                    <div style={{ fontSize: 12, color: theme.muted, marginTop: 4 }}>{t.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {membership && (
        <section className="tpl-section" style={{ padding: '80px 48px', maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ marginBottom: 56 }}>
            <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', color: theme.accent, marginBottom: 12 }}>Membership</div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 46px)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.5px', marginBottom: 8 }}>{membership.title}</h2>
            {membership.subtitle && <p style={{ fontSize: 15, color: theme.muted, maxWidth: 500 }}>{membership.subtitle}</p>}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, alignItems: 'start' }}>
            {membership.tiers?.map((tier) => (
              <div key={tier.id} className="tpl-card" style={{
                padding: 36, borderRadius: 12, border: tier.highlighted ? `2px solid ${theme.accent}` : `1px solid ${theme.muted}25`,
                backgroundColor: tier.highlighted ? '#141414' : 'transparent', position: 'relative',
                transition: 'transform 0.25s',
              }}>
                {tier.highlighted && (
                  <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', backgroundColor: theme.accent, color: '#fff', padding: '4px 16px', borderRadius: 4, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Most Popular
                  </div>
                )}
                <h3 style={{ fontSize: 20, fontWeight: 800, textTransform: 'uppercase', marginBottom: 6 }}>{tier.name}</h3>
                <p style={{ fontSize: 14, color: theme.muted, marginBottom: 20 }}>{tier.description}</p>
                <div style={{ marginBottom: 28 }}>
                  <span style={{ fontSize: 48, fontWeight: 900, letterSpacing: '-1px' }}>${tier.price}</span>
                  <span style={{ fontSize: 14, color: theme.muted, marginLeft: 4 }}>{tier.period}</span>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px' }}>
                  {tier.features.map((f, i) => (
                    <li key={i} style={{ fontSize: 14, color: theme.muted, padding: '6px 0', display: 'flex', gap: 10, alignItems: 'center' }}>
                      <span style={{ color: theme.accent, fontWeight: 700 }}>&#10003;</span>{f}
                    </li>
                  ))}
                </ul>
                <button className="tpl-btn" style={{
                  width: '100%', padding: '14px 0', borderRadius: 6, border: tier.highlighted ? 'none' : `1px solid ${theme.muted}30`,
                  backgroundColor: tier.highlighted ? theme.accent : 'transparent', color: tier.highlighted ? '#fff' : theme.foreground,
                  fontSize: 14, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', cursor: 'pointer',
                }}>
                  {ctaPrimary}
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {contact && (
        <section className="tpl-section" style={{ padding: '80px 48px', maxWidth: 1100, margin: '0 auto', textAlign: 'center', borderTop: `1px solid ${theme.muted}25` }}>
          <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', color: theme.accent, marginBottom: 12 }}>Contact Us</div>
          <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 40px)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.5px', marginBottom: 16 }}>{contact.title}</h2>
          {contact.subtitle && <p style={{ fontSize: 15, color: theme.muted, marginBottom: 40, maxWidth: 500, margin: '0 auto 40px' }}>{contact.subtitle}</p>}
          <div style={{ display: 'flex', gap: 48, justifyContent: 'center', flexWrap: 'wrap', fontSize: 14, color: theme.muted, lineHeight: 2.2 }}>
            {contact.address && <div><div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px', color: theme.accent, marginBottom: 4 }}>Address</div>{contact.address}</div>}
            {contact.phone && <div><div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px', color: theme.accent, marginBottom: 4 }}>Phone</div>{contact.phone}</div>}
            {contact.email && <div><div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px', color: theme.accent, marginBottom: 4 }}>Email</div>{contact.email}</div>}
            {contact.hours && <div><div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px', color: theme.accent, marginBottom: 4 }}>Hours</div>{contact.hours}</div>}
          </div>
        </section>
      )}

      <footer style={{ padding: '24px 48px', fontSize: 12, color: theme.muted, display: 'flex', justifyContent: 'space-between', borderTop: `1px solid ${theme.muted}25`, textTransform: 'uppercase', letterSpacing: '1px' }}>
        <span>&copy; 2025 {brandName}</span>
        <span>All rights reserved</span>
      </footer>
    </div>
  );
};

export default Renderer;
