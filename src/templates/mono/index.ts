import { TemplateMetadata } from '../../types';

export const template: TemplateMetadata = {
  id: 'mono',
  name: 'Mono',
  category: 'Personal Portfolio',
  description: 'A stark, minimal black-and-white template for designers, developers, and creatives. Lets the work speak through radical simplicity.',
  style: ['minimal', 'monochrome', 'typographic', 'brutalist-inspired'],
  designCharacteristics: ['strictly black and white', 'large type', 'generous negative space', 'grid-based layout', 'no decorative elements'],
  sections: ['hero', 'about', 'work', 'skills', 'experience', 'contact'],
  theme: {
    background: '#FFFFFF',
    foreground: '#000000',
    accent: '#000000',
    muted: '#888888',
  },
  defaultContent: {
    site: {
      brandName: 'Mono',
      tagline: 'Design with intent.',
      description: 'A portfolio of select projects by a product designer focused on clarity, systems thinking, and craft.',
      ctaPrimary: 'View Work',
      ctaSecondary: 'Get in Touch',
    },
    sections: {
      hero: {
        title: 'I design digital products that are clear, useful, and worth using.',
        subtitle: 'Product designer based in Berlin. Previously at Figma, now available for select projects.',
        mediaType: 'text',
      },
      about: {
        title: 'About',
        paragraphs: [
          'I\'m a product designer with eight years of experience shaping digital tools used by millions. My work sits at the intersection of systems design, interaction craft, and user psychology.',
          'I believe the best interfaces disappear. They don\'t demand attention — they earn trust through consistency, clarity, and respect for the user\'s time and intelligence.',
          'Currently based in Berlin, working independently after four years at Figma where I led design for the FigJam product line.',
        ],
      },
      work: {
        title: 'Selected Work',
        subtitle: 'A focused selection of projects I\'m proud of.',
        items: [
          {
            id: 'work-1',
            title: 'FigJam Widget System',
            category: 'Product Design',
            year: '2022',
            description: 'Designed the widget ecosystem for FigJam — including the developer SDK, widget marketplace, and permission model — enabling thousands of third-party integrations.',
            role: 'Lead Designer',
          },
          {
            id: 'work-2',
            title: 'Orbital',
            category: 'Side Project',
            year: '2023',
            description: 'A minimal habit tracker built around a single idea: visualize your consistency as an orbit. Shipped to 12,000+ users in the first month.',
            role: 'Design & Development',
          },
          {
            id: 'work-3',
            title: 'Mono Type Specimen',
            category: 'Typography',
            year: '2024',
            description: 'An interactive type specimen for a variable font I designed. Explores axes of weight, width, and optical size through real-time manipulation.',
            role: 'Type Design & Development',
          },
          {
            id: 'work-4',
            title: 'Meridian Design System',
            category: 'Design Systems',
            year: '2021',
            description: 'Built and maintained the component library and design tokens for Meridian\'s B2B platform, serving 40+ designers and 200+ engineers.',
            role: 'Systems Designer',
          },
          {
            id: 'work-5',
            title: 'Weather Journal',
            category: 'App Design',
            year: '2024',
            description: 'A reflective daily app that pairs weather data with mood tracking and journaling. Designed for people who want to understand their patterns over time.',
            role: 'Design & Development',
          },
        ],
      },
      skills: {
        title: 'Skills & Tools',
        categories: [
          {
            id: 'cat-1',
            name: 'Design',
            items: ['Product Design', 'UI/UX', 'Design Systems', 'Prototyping', 'User Research', 'Interaction Design', 'Visual Design'],
          },
          {
            id: 'cat-2',
            name: 'Development',
            items: ['HTML/CSS', 'JavaScript', 'React', 'Next.js', 'TypeScript', 'Framer Motion', 'SVG Animation'],
          },
          {
            id: 'cat-3',
            name: 'Tools',
            items: ['Figma', 'Framer', 'Linear', 'VS Code', 'Blender', 'After Effects'],
          },
          {
            id: 'cat-4',
            name: 'Disciplines',
            items: ['Typography', 'Design Systems', 'Brand Identity', 'Motion Design', 'Accessibility'],
          },
        ],
      },
      experience: {
        title: 'Experience',
        items: [
          {
            id: 'exp-1',
            company: 'Independent',
            role: 'Product Designer',
            period: '2024 – Present',
            description: 'Select projects in product design, type design, and interactive media. Clients include early-stage startups and cultural institutions.',
          },
          {
            id: 'exp-2',
            company: 'Figma',
            role: 'Product Designer',
            period: '2020 – 2024',
            description: 'Led design for FigJam\'s widget platform, collaborated on core editor features, and contributed to the Figma design system.',
          },
          {
            id: 'exp-3',
            company: 'Meridian',
            role: 'Senior Designer',
            period: '2018 – 2020',
            description: 'Built and scaled the design system from 20 to 200+ components. Led the redesign of the core B2B dashboard, improving task completion rate by 34%.',
          },
        ],
      },
      contact: {
        title: 'Let\'s Talk',
        subtitle: 'Currently accepting select projects for Q2 2025.',
        email: 'hello@mono.design',
        socialLinks: [
          { platform: 'Twitter', url: 'https://twitter.com/monodesign' },
          { platform: 'Dribbble', url: 'https://dribbble.com/monodesign' },
          { platform: 'GitHub', url: 'https://github.com/monodesign' },
          { platform: 'LinkedIn', url: 'https://linkedin.com/in/monodesign' },
        ],
      },
    },
  },
};

export const defaultContent = template.defaultContent;
