import { TemplateMetadata } from '../../types';

export const template: TemplateMetadata = {
  id: 'commerce',
  name: 'Commerce',
  category: 'Product / E-commerce',
  description: 'A premium, conversion-optimized template for product brands and e-commerce stores. Balances brand storytelling with clear purchase pathways.',
  style: ['premium', 'clean', 'conversion-focused', 'brand-forward'],
  designCharacteristics: ['product-centric layouts', 'purple accent', 'card-based products', 'trust signals', 'clean product grids'],
  sections: ['hero', 'products', 'benefits', 'testimonials', 'story', 'cta'],
  theme: {
    background: '#FAFAF9',
    foreground: '#1C1917',
    accent: '#7C3AED',
    muted: '#A1A1AA',
  },
  defaultContent: {
    site: {
      brandName: 'Commerce',
      tagline: 'Designed for everyday. Built to last.',
      description: 'Commerce creates premium everyday essentials — thoughtfully designed, responsibly made, and guaranteed for life.',
      ctaPrimary: 'Shop Now',
      ctaSecondary: 'Our Story',
    },
    sections: {
      hero: {
        title: 'Essentials that earn their place in your life.',
        subtitle: 'Every Commerce product is designed to solve a real problem, made from materials that age beautifully, and backed by a lifetime guarantee.',
        mediaType: 'image',
        badge: 'New Collection — Spring 2025',
      },
      products: {
        title: 'Our Products',
        subtitle: 'Curated essentials. No filler. No compromise.',
        items: [
          {
            id: 'prod-1',
            name: 'The Everyday Wallet',
            price: '89',
            description: 'Full-grain leather bifold with RFID shielding. Slim profile holds 8 cards and cash without the bulk. Develops a rich patina over time.',
            category: 'Accessories',
            badge: 'Best Seller',
          },
          {
            id: 'prod-2',
            name: 'The Commuter Bag',
            price: '245',
            description: 'Waxed canvas messenger with reinforced seams and a padded laptop sleeve. Designed for daily use in all weather. Water-resistant zippers throughout.',
            category: 'Bags',
            badge: 'New',
          },
          {
            id: 'prod-3',
            name: 'The Field Notebook',
            price: '32',
            description: 'Archival-grade paper, lay-flat binding, and a waterproof cover. 160 pages of dot-grid sheets for notes, sketches, and plans that won\'t bleed through.',
            category: 'Stationery',
          },
          {
            id: 'prod-4',
            name: 'The Camp Mug',
            price: '48',
            description: 'Double-walled titanium mug that holds 12 oz. Keeps coffee hot for 2 hours. Collapsible handle, dishwasher safe. The last mug you\'ll ever buy.',
            category: 'Drinkware',
          },
        ],
      },
      benefits: {
        title: 'Why Commerce',
        subtitle: 'We believe everyday objects should be extraordinary.',
        items: [
          {
            id: 'ben-1',
            title: 'Lifetime Guarantee',
            description: 'Every product is backed by our unconditional lifetime guarantee. If it breaks, we fix it or replace it — no questions asked, no receipt needed.',
            icon: 'shield',
          },
          {
            id: 'ben-2',
            title: 'Responsibly Sourced',
            description: 'Full supply chain transparency. We partner exclusively with suppliers who meet our standards for fair labor, environmental stewardship, and material quality.',
            icon: 'leaf',
          },
          {
            id: 'ben-3',
            title: 'Free Shipping & Returns',
            description: 'Complimentary shipping on every order. Hassle-free 60-day returns with prepaid labels. We want you to love what you buy — or send it back.',
            icon: 'truck',
          },
          {
            id: 'ben-4',
            title: 'Designed to Last',
            description: 'We engineer products for decades, not seasons. Premium materials, reinforced construction, and timeless design mean you buy once and forget about replacements.',
            icon: 'clock',
          },
        ],
      },
      testimonials: {
        title: 'What Our Customers Say',
        items: [
          {
            id: 'test-1',
            quote: 'I bought the Everyday Wallet three years ago and it looks better now than the day it arrived. The leather has this incredible patina. I\'ve gifted it to four people since.',
            author: 'Elena Torres',
            role: 'Customer since 2022',
          },
          {
            id: 'test-2',
            quote: 'The Commuter Bag survived a full year of NYC subway commuting, rain, snow, and being shoved under train seats. Not a single seam has given out. This is what quality means.',
            author: 'James Kowalski',
            role: 'Customer since 2023',
          },
        ],
      },
      story: {
        title: 'Our Story',
        description: 'Commerce was started in 2021 by two industrial designers frustrated with disposable products that fell apart after a season. We asked a simple question: why can\'t everyday objects be made with the same care as heirloom furniture?',
        paragraphs: [
          'We spent two years developing our first product — the Everyday Wallet — testing 47 leather samples and 12 thread types before finding materials that met our durability standards.',
          'Today, we serve over 80,000 customers in 40 countries. We\'re still a small team of 12, and we still test every new product ourselves before it ships. Our guarantee isn\'t a marketing gesture — it\'s a promise we built the business around.',
        ],
        founded: 2021,
        customers: '80,000+',
        countries: 40,
      },
      cta: {
        title: 'Your first order ships free.',
        subtitle: 'Experience the difference that thoughtful design and honest materials make. Backed by our lifetime guarantee.',
        primaryButton: 'Shop the Collection',
        secondaryButton: 'Read Our Story',
      },
    },
  },
};

export const defaultContent = template.defaultContent;
