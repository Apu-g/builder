import React from 'react';
import { SiteConfig } from '../../types';
import { getSectionImage } from '../../lib/images';

interface Props {
  config: SiteConfig;
}

const Renderer: React.FC<Props> = ({ config }) => {
  const { theme, sections, brandName, tagline, ctaPrimary, ctaSecondary } = config;
  const hero = sections.hero as { title?: string; subtitle?: string; badge?: string } | undefined;
  const features = sections.features as { title?: string; subtitle?: string; items?: Array<{ id: string; title: string; description: string; icon: string }> } | undefined;
  const statistics = sections.statistics as { title?: string; items?: Array<{ id: string; value: string; label: string }> } | undefined;
  const testimonials = sections.testimonials as { title?: string; items?: Array<{ id: string; quote: string; author: string; role: string }> } | undefined;
  const pricing = sections.pricing as { title?: string; subtitle?: string; tiers?: Array<{ id: string; name: string; price: string; period: string; description: string; features: string[]; cta: string; highlighted: boolean }> } | undefined;
  const cta = sections.cta as { title?: string; subtitle?: string; primaryButton?: string; secondaryButton?: string } | undefined;

  return (
    <div style={{ backgroundColor: theme.background, color: theme.foreground, minHeight: '100vh', fontFamily: "'Inter', -apple-system, sans-serif" }}>
      <nav style={{ padding: '16px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${theme.muted}20` }}>
        <div style={{ fontSize: 20, fontWeight: 700 }}>{brandName}</div>
        <div style={{ display: 'flex', gap: 32, alignItems: 'center', fontSize: 14 }}>
          <span style={{ color: theme.muted, fontWeight: 500, cursor: 'pointer' }}>Features</span>
          <span style={{ color: theme.muted, fontWeight: 500, cursor: 'pointer' }}>Pricing</span>
          <span style={{ color: theme.muted, fontWeight: 500, cursor: 'pointer' }}>Docs</span>
          <button className="tpl-btn" style={{ backgroundColor: theme.foreground, color: theme.background, border: 'none', padding: '10px 22px', fontSize: 14, fontWeight: 600, borderRadius: 8, cursor: 'pointer' }}>
            {ctaPrimary}
          </button>
        </div>
      </nav>

      <section className="tpl-hero" style={{ padding: '80px 48px 60px', maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
        {hero?.badge && (
          <div style={{ display: 'inline-block', backgroundColor: `${theme.accent}12`, color: theme.accent, padding: '6px 18px', borderRadius: 20, fontSize: 13, fontWeight: 600, marginBottom: 24, border: `1px solid ${theme.accent}30` }}>
            {hero.badge}
          </div>
        )}
        {hero?.title && (
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-1.5px', marginBottom: 20, maxWidth: 800, margin: '0 auto 20px' }}>
            {hero.title}
          </h1>
        )}
        {hero?.subtitle && (
          <p style={{ fontSize: 18, lineHeight: 1.7, maxWidth: 620, margin: '0 auto 36px', color: theme.muted }}>
            {hero.subtitle}
          </p>
        )}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 56 }}>
          <button className="tpl-btn" style={{ backgroundColor: theme.accent, color: '#fff', border: 'none', padding: '14px 36px', fontSize: 15, fontWeight: 600, borderRadius: 8, cursor: 'pointer' }}>
            {ctaPrimary}
          </button>
          <button className="tpl-btn" style={{ backgroundColor: '#fff', color: theme.foreground, border: `1px solid ${theme.muted}40`, padding: '14px 36px', fontSize: 15, fontWeight: 600, borderRadius: 8, cursor: 'pointer' }}>
            {ctaSecondary}
          </button>
        </div>
        <div style={{ width: '100%', maxWidth: 900, height: 420, borderRadius: 16, margin: '0 auto', overflow: 'hidden', boxShadow: `0 20px 60px ${theme.muted}30`, border: `1px solid ${theme.muted}15` }}>
          <img src={getSectionImage(config, 'hero', 0, 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&h=420&fit=crop')} alt={`${brandName} product dashboard`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </section>

      {features && (
        <section className="tpl-section" style={{ padding: '100px 48px', maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '2px', color: theme.accent, marginBottom: 12 }}>Features</div>
            <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 38px)', fontWeight: 700, letterSpacing: '-1px', marginBottom: 8 }}>{features.title}</h2>
            {features.subtitle && <p style={{ fontSize: 16, color: theme.muted, maxWidth: 500, margin: '0 auto' }}>{features.subtitle}</p>}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {features.items?.map((item) => (
              <div key={item.id} className="tpl-card" style={{ padding: 32, borderRadius: 14, backgroundColor: '#fff', border: `1px solid ${theme.muted}15`, transition: 'transform 0.25s, box-shadow 0.25s' }}>
                <div style={{ width: 48, height: 48, backgroundColor: `${theme.accent}12`, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, color: theme.accent, fontWeight: 700, fontSize: 20 }}>
                  {item.icon.charAt(0).toUpperCase()}
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 10, letterSpacing: '-0.2px' }}>{item.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: theme.muted }}>{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {statistics && (
        <section className="tpl-section" style={{ padding: '60px 48px', maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32, textAlign: 'center', padding: '56px 0', borderTop: `1px solid ${theme.muted}20`, borderBottom: `1px solid ${theme.muted}20` }}>
            {statistics.items?.map((stat) => (
              <div key={stat.id}>
                <div style={{ fontSize: 'clamp(36px, 4vw, 52px)', fontWeight: 700, color: theme.accent, letterSpacing: '-1px', marginBottom: 8 }}>{stat.value}</div>
                <div style={{ fontSize: 15, color: theme.muted, fontWeight: 500 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {testimonials && (
        <section className="tpl-section" style={{ padding: '80px 48px', maxWidth: 1100, margin: '0 auto' }}>
          {testimonials.title && <h2 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.5px', marginBottom: 40, textAlign: 'center' }}>{testimonials.title}</h2>}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 28 }}>
            {testimonials.items?.map((t) => (
              <div key={t.id} className="tpl-card" style={{ padding: 32, borderRadius: 14, backgroundColor: '#fff', border: `1px solid ${theme.muted}15`, transition: 'transform 0.25s' }}>
                <div style={{ display: 'flex', gap: 2, marginBottom: 16 }}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span key={s} style={{ color: theme.accent, fontSize: 16 }}>&#9733;</span>
                  ))}
                </div>
                <p style={{ fontSize: 15, lineHeight: 1.75, marginBottom: 24, fontStyle: 'italic' }}>&quot;{t.quote}&quot;</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: `${theme.accent}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: theme.accent, fontWeight: 700, fontSize: 14 }}>
                    {t.author.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{t.author}</div>
                    <div style={{ fontSize: 13, color: theme.muted }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {pricing && (
        <section className="tpl-section" style={{ padding: '100px 48px', maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '2px', color: theme.accent, marginBottom: 12 }}>Pricing</div>
            <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 38px)', fontWeight: 700, letterSpacing: '-1px', marginBottom: 8 }}>{pricing.title}</h2>
            {pricing.subtitle && <p style={{ fontSize: 16, color: theme.muted, maxWidth: 500, margin: '0 auto' }}>{pricing.subtitle}</p>}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28, alignItems: 'start' }}>
            {pricing.tiers?.map((tier) => (
              <div key={tier.id} className="tpl-card" style={{
                padding: 36, borderRadius: 16, border: tier.highlighted ? `2px solid ${theme.accent}` : `1px solid ${theme.muted}18`,
                backgroundColor: tier.highlighted ? '#fff' : 'transparent', position: 'relative',
                boxShadow: tier.highlighted ? `0 12px 40px ${theme.accent}15` : 'none',
                transition: 'transform 0.25s',
              }}>
                {tier.highlighted && (
                  <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', backgroundColor: theme.accent, color: '#fff', padding: '5px 16px', borderRadius: 14, fontSize: 12, fontWeight: 600 }}>
                    Most Popular
                  </div>
                )}
                <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 6 }}>{tier.name}</h3>
                <p style={{ fontSize: 14, color: theme.muted, marginBottom: 20 }}>{tier.description}</p>
                <div style={{ marginBottom: 28 }}>
                  <span style={{ fontSize: 44, fontWeight: 700, letterSpacing: '-1px' }}>
                    {tier.price === 'Custom' ? tier.price : `$${tier.price}`}
                  </span>
                  <span style={{ fontSize: 14, color: theme.muted, marginLeft: 4 }}>{tier.period}</span>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px' }}>
                  {tier.features.map((f, i) => (
                    <li key={i} style={{ fontSize: 14, color: theme.muted, padding: '7px 0', display: 'flex', gap: 10, alignItems: 'center' }}>
                      <span style={{ color: theme.accent, fontWeight: 700 }}>&#10003;</span>{f}
                    </li>
                  ))}
                </ul>
                <button className="tpl-btn" style={{
                  width: '100%', padding: '14px 0', borderRadius: 10, border: tier.highlighted ? 'none' : `1px solid ${theme.muted}30`,
                  backgroundColor: tier.highlighted ? theme.accent : 'transparent', color: tier.highlighted ? '#fff' : theme.foreground,
                  fontSize: 15, fontWeight: 600, cursor: 'pointer',
                }}>
                  {tier.cta}
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {cta && (
        <section className="tpl-section" style={{ padding: '80px 48px', maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ backgroundColor: theme.accent, borderRadius: 24, padding: '72px 48px', color: '#fff' }}>
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 700, letterSpacing: '-0.8px', marginBottom: 12 }}>{cta.title}</h2>
            <p style={{ fontSize: 16, opacity: 0.85, maxWidth: 520, margin: '0 auto 36px', lineHeight: 1.6 }}>{cta.subtitle}</p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <button className="tpl-btn" style={{ backgroundColor: '#fff', color: theme.accent, border: 'none', padding: '14px 36px', fontSize: 15, fontWeight: 600, borderRadius: 8, cursor: 'pointer' }}>
                {cta.primaryButton}
              </button>
              <button className="tpl-btn" style={{ backgroundColor: 'transparent', color: '#fff', border: '1.5px solid rgba(255,255,255,0.4)', padding: '14px 36px', fontSize: 15, fontWeight: 600, borderRadius: 8, cursor: 'pointer' }}>
                {cta.secondaryButton}
              </button>
            </div>
          </div>
        </section>
      )}

      <footer style={{ padding: '32px 48px', fontSize: 13, color: theme.muted, display: 'flex', justifyContent: 'space-between', borderTop: `1px solid ${theme.muted}20` }}>
        <span>&copy; 2025 {brandName}. All rights reserved.</span>
        <div style={{ display: 'flex', gap: 24 }}>
          <span style={{ cursor: 'pointer' }}>Privacy</span>
          <span style={{ cursor: 'pointer' }}>Terms</span>
          <span style={{ cursor: 'pointer' }}>Contact</span>
        </div>
      </footer>
    </div>
  );
};

export default Renderer;
