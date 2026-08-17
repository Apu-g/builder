import React from 'react';
import { SiteConfig } from '../../types';
import { getSectionImage, getSectionImages } from '../../lib/images';

interface Props {
  config: SiteConfig;
}

const FALLBACK_PRODUCTS = [
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=400&fit=crop',
];

const Renderer: React.FC<Props> = ({ config }) => {
  const { theme, sections, brandName, tagline, ctaPrimary, ctaSecondary } = config;
  const hero = sections.hero as { title?: string; subtitle?: string; badge?: string } | undefined;
  const products = sections.products as { title?: string; subtitle?: string; items?: Array<{ id: string; name: string; price: string; description: string; category?: string; badge?: string }> } | undefined;
  const benefits = sections.benefits as { title?: string; subtitle?: string; items?: Array<{ id: string; title: string; description: string; icon: string }> } | undefined;
  const testimonials = sections.testimonials as { title?: string; items?: Array<{ id: string; quote: string; author: string; role: string }> } | undefined;
  const story = sections.story as { title?: string; description?: string; paragraphs?: string[]; founded?: number; customers?: string; countries?: number } | undefined;
  const cta = sections.cta as { title?: string; subtitle?: string; primaryButton?: string; secondaryButton?: string } | undefined;

  const productImages = getSectionImages(config, 'product', products?.items?.length || 4, FALLBACK_PRODUCTS);

  return (
    <div style={{ backgroundColor: theme.background, color: theme.foreground, minHeight: '100vh', fontFamily: "'Inter', -apple-system, sans-serif" }}>
      <nav style={{ padding: '16px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${theme.muted}18` }}>
        <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.5px' }}>{brandName}</div>
        <div style={{ display: 'flex', gap: 32, alignItems: 'center', fontSize: 14, fontWeight: 500 }}>
          <span style={{ color: theme.muted, cursor: 'pointer' }}>Shop</span>
          <span style={{ color: theme.muted, cursor: 'pointer' }}>Our Story</span>
          <span style={{ color: theme.muted, cursor: 'pointer' }}>FAQ</span>
          <button className="tpl-btn" style={{ backgroundColor: theme.foreground, color: theme.background, border: 'none', padding: '10px 22px', fontSize: 14, fontWeight: 600, borderRadius: 8, cursor: 'pointer' }}>
            {ctaPrimary}
          </button>
        </div>
      </nav>

      <section className="tpl-hero" style={{ padding: '80px 48px 60px', maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
        {hero?.badge && (
          <div style={{ display: 'inline-block', backgroundColor: `${theme.accent}12`, color: theme.accent, padding: '6px 18px', borderRadius: 20, fontSize: 13, fontWeight: 600, marginBottom: 24, border: `1px solid ${theme.accent}25` }}>
            {hero.badge}
          </div>
        )}
        {hero?.title && (
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-1.5px', marginBottom: 16, maxWidth: 700, margin: '0 auto 16px' }}>
            {hero.title}
          </h1>
        )}
        {hero?.subtitle && (
          <p style={{ fontSize: 17, lineHeight: 1.7, maxWidth: 540, margin: '0 auto 36px', color: theme.muted }}>
            {hero.subtitle}
          </p>
        )}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 56 }}>
          <button className="tpl-btn" style={{ backgroundColor: theme.accent, color: '#fff', border: 'none', padding: '14px 36px', fontSize: 15, fontWeight: 600, borderRadius: 8, cursor: 'pointer' }}>
            {ctaPrimary}
          </button>
          <button className="tpl-btn" style={{ backgroundColor: 'transparent', color: theme.foreground, border: `1px solid ${theme.muted}30`, padding: '14px 36px', fontSize: 15, fontWeight: 600, borderRadius: 8, cursor: 'pointer' }}>
            {ctaSecondary}
          </button>
        </div>
        <div style={{ width: '100%', maxWidth: 800, height: 400, borderRadius: 20, margin: '0 auto', overflow: 'hidden', boxShadow: `0 24px 64px ${theme.muted}25` }}>
          <img src={getSectionImage(config, 'hero', 0, 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop')} alt={`${brandName} products`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </section>

      {products && (
        <section className="tpl-section" style={{ padding: '80px 48px', maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '2px', color: theme.accent, marginBottom: 12 }}>Shop</div>
            <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 40px)', fontWeight: 700, letterSpacing: '-0.8px', marginBottom: 8 }}>{products.title}</h2>
            {products.subtitle && <p style={{ fontSize: 15, color: theme.muted, maxWidth: 500, margin: '0 auto' }}>{products.subtitle}</p>}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
            {products.items?.map((item, i) => (
              <div key={item.id} className="tpl-card" style={{ borderRadius: 16, overflow: 'hidden', backgroundColor: '#fff', border: `1px solid ${theme.muted}15`, transition: 'transform 0.25s, box-shadow 0.25s' }}>
                <div style={{ position: 'relative', width: '100%', height: 240, overflow: 'hidden' }}>
                  <img src={productImages[i] || productImages[0]} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  {item.badge && (
                    <div style={{ position: 'absolute', top: 12, left: 12, backgroundColor: theme.accent, color: '#fff', padding: '4px 12px', borderRadius: 8, fontSize: 11, fontWeight: 600 }}>
                      {item.badge}
                    </div>
                  )}
                </div>
                <div style={{ padding: '18px 22px 22px' }}>
                  {item.category && <div style={{ fontSize: 11, color: theme.muted, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 6, fontWeight: 500 }}>{item.category}</div>}
                  <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>{item.name}</h3>
                  <p style={{ fontSize: 13, lineHeight: 1.55, color: theme.muted, marginBottom: 14 }}>{item.description}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 20, fontWeight: 700 }}>${item.price}</span>
                    <button className="tpl-btn" style={{ backgroundColor: theme.foreground, color: theme.background, border: 'none', padding: '8px 18px', fontSize: 12, fontWeight: 600, borderRadius: 6, cursor: 'pointer' }}>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {benefits && (
        <section className="tpl-section" style={{ padding: '80px 48px', maxWidth: 1100, margin: '0 auto', backgroundColor: `${theme.muted}10`, borderRadius: 20 }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '2px', color: theme.accent, marginBottom: 12 }}>Why Us</div>
            <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 40px)', fontWeight: 700, letterSpacing: '-0.8px', marginBottom: 8 }}>{benefits.title}</h2>
            {benefits.subtitle && <p style={{ fontSize: 15, color: theme.muted, maxWidth: 500, margin: '0 auto' }}>{benefits.subtitle}</p>}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 28, padding: '0 24px' }}>
            {benefits.items?.map((item) => (
              <div key={item.id} className="tpl-card" style={{ textAlign: 'center', padding: '28px 20px', transition: 'transform 0.25s' }}>
                <div style={{ width: 56, height: 56, backgroundColor: `${theme.accent}15`, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: theme.accent, fontWeight: 700, fontSize: 22 }}>
                  {item.icon.charAt(0).toUpperCase()}
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 10 }}>{item.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: theme.muted }}>{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {testimonials && (
        <section className="tpl-section" style={{ padding: '80px 48px', maxWidth: 1100, margin: '0 auto' }}>
          {testimonials.title && <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 40px)', fontWeight: 700, letterSpacing: '-0.8px', textAlign: 'center', marginBottom: 48 }}>{testimonials.title}</h2>}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 28 }}>
            {testimonials.items?.map((t) => (
              <div key={t.id} className="tpl-card" style={{ padding: 36, borderRadius: 16, backgroundColor: '#fff', border: `1px solid ${theme.muted}15`, transition: 'transform 0.25s' }}>
                <div style={{ display: 'flex', gap: 4, marginBottom: 20 }}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span key={s} style={{ color: theme.accent, fontSize: 18 }}>&#9733;</span>
                  ))}
                </div>
                <p style={{ fontSize: 16, lineHeight: 1.75, marginBottom: 24, fontStyle: 'italic' }}>&quot;{t.quote}&quot;</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: '50%', backgroundColor: `${theme.accent}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: theme.accent, fontWeight: 700, fontSize: 15 }}>
                    {t.author.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 600 }}>{t.author}</div>
                    <div style={{ fontSize: 13, color: theme.muted }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {story && (
        <section className="tpl-section" style={{ padding: '80px 48px', maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '2px', color: theme.accent, marginBottom: 12 }}>Our Story</div>
            <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 40px)', fontWeight: 700, letterSpacing: '-0.8px', marginBottom: 24 }}>{story.title}</h2>
            <p style={{ fontSize: 15, lineHeight: 1.85, color: theme.muted, marginBottom: 16 }}>{story.description}</p>
            {story.paragraphs?.map((p, i) => (
              <p key={i} style={{ fontSize: 14, lineHeight: 1.85, color: theme.muted, marginBottom: 14 }}>{p}</p>
            ))}
            {(story.founded || story.customers || story.countries) && (
              <div style={{ display: 'flex', gap: 44, marginTop: 32, paddingTop: 28, borderTop: `1px solid ${theme.muted}25` }}>
                {story.founded && <div><div style={{ fontSize: 28, fontWeight: 700 }}>{story.founded}</div><div style={{ fontSize: 12, color: theme.muted, marginTop: 4, textTransform: 'uppercase', letterSpacing: '1px' }}>Founded</div></div>}
                {story.customers && <div><div style={{ fontSize: 28, fontWeight: 700 }}>{story.customers}</div><div style={{ fontSize: 12, color: theme.muted, marginTop: 4, textTransform: 'uppercase', letterSpacing: '1px' }}>Customers</div></div>}
                {story.countries && <div><div style={{ fontSize: 28, fontWeight: 700 }}>{story.countries}+</div><div style={{ fontSize: 12, color: theme.muted, marginTop: 4, textTransform: 'uppercase', letterSpacing: '1px' }}>Countries</div></div>}
              </div>
            )}
          </div>
          <div style={{ width: '100%', height: 440, borderRadius: 20, overflow: 'hidden' }}>
            <img src={getSectionImage(config, 'story', 0, 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=440&fit=crop')} alt="Brand story" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </section>
      )}

      {cta && (
        <section className="tpl-section" style={{ padding: '80px 48px', maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ backgroundColor: theme.accent, borderRadius: 24, padding: '72px 48px', color: '#fff' }}>
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 38px)', fontWeight: 700, letterSpacing: '-0.8px', marginBottom: 14 }}>{cta.title}</h2>
            <p style={{ fontSize: 16, opacity: 0.85, maxWidth: 500, margin: '0 auto 32px', lineHeight: 1.6 }}>{cta.subtitle}</p>
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
          <span style={{ cursor: 'pointer' }}>Shipping</span>
          <span style={{ cursor: 'pointer' }}>Returns</span>
        </div>
      </footer>
    </div>
  );
};

export default Renderer;
