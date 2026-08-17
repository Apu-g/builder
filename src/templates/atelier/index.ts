import { TemplateMetadata } from '../../types';

export const template: TemplateMetadata = {
  id: 'atelier',
  name: 'Atelier',
  category: 'Creative Agency / Studio',
  description: 'A warm, sophisticated template for creative agencies and design studios. Balances editorial elegance with bold visual presence.',
  style: ['editorial', 'warm', 'minimal', 'typography-driven'],
  designCharacteristics: ['asymmetric layouts', 'large typography', 'warm neutrals', 'bold accent color', 'generous whitespace'],
  sections: ['hero', 'services', 'work', 'about', 'testimonial', 'contact'],
  theme: {
    background: '#F4F1EB',
    foreground: '#111111',
    accent: '#FF5A36',
    muted: '#D9D4C8',
  },
  defaultContent: {
    site: {
      brandName: 'Atelier Studio',
      tagline: 'We shape ideas into experiences.',
      description: 'A multidisciplinary creative studio specializing in brand identity, digital design, and art direction for forward-thinking companies.',
      ctaPrimary: 'Start a Project',
      ctaSecondary: 'View Our Work',
    },
    sections: {
      hero: {
        title: 'Design is a conversation between form and purpose.',
        subtitle: 'Atelier Studio crafts brands, digital experiences, and visual identities that resonate and endure.',
        mediaType: 'image',
      },
      services: {
        title: 'What We Do',
        subtitle: 'End-to-end creative services tailored to elevate your brand.',
        items: [
          {
            id: 'svc-1',
            title: 'Brand Identity',
            description: 'We develop cohesive visual systems — from logo design and typography to color palettes and brand guidelines — that communicate your essence with clarity and personality.',
            icon: 'palette',
          },
          {
            id: 'svc-2',
            title: 'Web Design',
            description: 'Custom websites built at the intersection of aesthetics and performance. Every pixel is intentional, every interaction considered.',
            icon: 'layout',
          },
          {
            id: 'svc-3',
            title: 'Art Direction',
            description: 'From campaign concepts to photo shoots, we orchestrate visual narratives that capture attention and drive emotional connection.',
            icon: 'image',
          },
          {
            id: 'svc-4',
            title: 'Motion Design',
            description: 'Animated logos, explainer videos, and dynamic interfaces that bring static brands to life through movement and rhythm.',
            icon: 'play',
          },
        ],
      },
      work: {
        title: 'Selected Work',
        subtitle: 'A curated selection of projects we are proud of.',
        items: [
          {
            id: 'work-1',
            title: 'Meridian Wine Co.',
            category: 'Brand Identity',
            description: 'A complete rebrand for a boutique vineyard, blending heritage typography with a modern palette inspired by the Sonoma landscape.',
          },
          {
            id: 'work-2',
            title: 'Neon Circuit Festival',
            category: 'Art Direction',
            description: 'Visual identity and environmental graphics for an electronic music festival, using generative patterns and high-contrast neon palettes.',
          },
          {
            id: 'work-3',
            title: 'Lumina Health',
            category: 'Web Design',
            description: 'A wellness platform redesign focused on accessibility, calm visual language, and seamless appointment booking flows.',
          },
          {
            id: 'work-4',
            title: 'Paper & Thread',
            category: 'Brand Identity',
            description: 'Brand system for a sustainable stationery company, featuring hand-drawn letterforms and an earthy, tactile material palette.',
          },
        ],
      },
      about: {
        title: 'About Us',
        description: 'Atelier Studio was founded in 2018 with a simple belief: great design emerges from deep listening. We are a team of designers, strategists, and makers who thrive on complexity and deliver clarity. Based in Brooklyn, we work with clients across industries — from emerging startups to established cultural institutions — who share our appetite for thoughtful, courageous work.',
        values: [
          { id: 'val-1', title: 'Craft', description: 'We obsess over details because details are the design.' },
          { id: 'val-2', title: 'Honesty', description: 'We believe transparent processes lead to authentic outcomes.' },
          { id: 'val-3', title: 'Ambition', description: 'We push past safe choices to find work that truly stands apart.' },
        ],
        teamSize: 14,
        founded: 2018,
      },
      testimonial: {
        title: 'What Clients Say',
        items: [
          {
            id: 'test-1',
            quote: 'Atelier didn\'t just design our brand — they uncovered who we actually are. The process was collaborative, rigorous, and genuinely inspiring. Our new identity has transformed how clients perceive and engage with us.',
            author: 'Samantha Reyes',
            role: 'CEO, Lumina Health',
            company: 'Lumina Health',
          },
        ],
      },
      contact: {
        title: 'Let\'s Work Together',
        subtitle: 'Have a project in mind? We\'d love to hear about it.',
        email: 'hello@atelierstudio.co',
        phone: '+1 (718) 555-0192',
        address: '47 Bergen Street, Brooklyn, NY 11217',
        socialLinks: [
          { platform: 'Instagram', url: 'https://instagram.com/atelierstudio' },
          { platform: 'Dribbble', url: 'https://dribbble.com/atelierstudio' },
          { platform: 'LinkedIn', url: 'https://linkedin.com/company/atelierstudio' },
        ],
      },
    },
  },
};

export const defaultContent = template.defaultContent;
