import { TemplateMetadata } from '../../types';

export const template: TemplateMetadata = {
  id: 'forge',
  name: 'Forge',
  category: 'Construction / Industrial',
  description: 'A strong, authoritative template for construction companies and industrial firms. Conveys reliability, scale, and expertise through bold layouts and grounded tones.',
  style: ['bold', 'industrial', 'authoritative', 'no-nonsense'],
  designCharacteristics: ['bold typography', 'warm industrial tones', 'structured grid', 'project photography', 'strong visual hierarchy'],
  sections: ['hero', 'services', 'projects', 'statistics', 'team', 'contact'],
  theme: {
    background: '#F0EDE8',
    foreground: '#1C1917',
    accent: '#D97706',
    muted: '#78716C',
  },
  defaultContent: {
    site: {
      brandName: 'Forge Construction',
      tagline: 'Built right. Built to last.',
      description: 'Forge Construction delivers commercial, institutional, and residential construction services with a reputation for quality craftsmanship and uncompromising safety standards.',
      ctaPrimary: 'Get a Quote',
      ctaSecondary: 'View Projects',
    },
    sections: {
      hero: {
        title: 'We build the structures that shape communities.',
        subtitle: 'From groundbreaking to ribbon-cutting, Forge Construction manages every phase with precision, transparency, and a relentless commitment to quality.',
        mediaType: 'image',
      },
      services: {
        title: 'Our Services',
        subtitle: 'Comprehensive construction solutions backed by 25 years of field experience.',
        items: [
          {
            id: 'svc-1',
            title: 'General Contracting',
            description: 'Full-scope project management from pre-construction through final inspection. We coordinate trades, manage budgets, and deliver on schedule — every time.',
            icon: 'hard-hat',
          },
          {
            id: 'svc-2',
            title: 'Pre-Construction',
            description: 'Cost estimation, value engineering, constructability reviews, and scheduling. Our pre-construction team identifies risks early and saves clients significant capital.',
            icon: 'clipboard',
          },
          {
            id: 'svc-3',
            title: 'Design-Build',
            description: 'A single point of accountability for design and construction. This integrated approach reduces timelines by 15–30% and eliminates the gaps between architect and contractor.',
            icon: 'ruler',
          },
          {
            id: 'svc-4',
            title: 'Self-Perform',
            description: 'Our in-house concrete, carpentry, and demolition teams give us direct control over critical-path work — ensuring quality and schedule certainty where it matters most.',
            icon: 'wrench',
          },
        ],
      },
      projects: {
        title: 'Featured Projects',
        subtitle: 'A selection of projects that demonstrate our range and capability.',
        items: [
          {
            id: 'proj-1',
            title: 'Hudson Valley Medical Center',
            category: 'Healthcare',
            value: '$84M',
            year: 2024,
            description: 'A 180,000 sq ft regional medical facility featuring advanced structural steel framing, seismic-resistant design, and LEED Gold certification. Completed 4 weeks ahead of schedule.',
            duration: '22 months',
          },
          {
            id: 'proj-2',
            title: 'The Ironworks Lofts',
            category: 'Mixed-Use Residential',
            value: '$42M',
            year: 2023,
            description: 'Adaptive reuse of a 1920s steel mill into 120 luxury residential units with ground-floor retail, a rooftop amenity deck, and preserved industrial heritage elements throughout.',
            duration: '18 months',
          },
          {
            id: 'proj-3',
            title: 'Cascade Logistics Hub',
            category: 'Industrial',
            value: '$67M',
            year: 2024,
            description: 'A 350,000 sq ft distribution center with automated sorting systems, cold storage integration, and 180 truck-loading bays. Designed for operational efficiency at scale.',
            duration: '14 months',
          },
        ],
      },
      statistics: {
        title: 'By the Numbers',
        items: [
          { id: 'stat-1', value: '$1.2B+', label: 'Total project value delivered' },
          { id: 'stat-2', value: '250+', label: 'Projects completed since 1999' },
          { id: 'stat-3', value: '0.8M', label: 'Safe work hours without lost time' },
        ],
      },
      team: {
        title: 'Leadership',
        subtitle: 'Experienced professionals who take personal ownership of every project.',
        members: [
          {
            id: 'team-1',
            name: 'Robert Haines',
            role: 'President & CEO',
            bio: '30 years in commercial construction. Former VP at Turner Construction. Licensed Professional Engineer.',
          },
          {
            id: 'team-2',
            name: 'Diana Morales',
            role: 'VP of Operations',
            bio: 'Oversees all field operations and project delivery. LEED AP, OSHA 500-hour certified.',
          },
          {
            id: 'team-3',
            name: 'James Whitfield',
            role: 'Director of Pre-Construction',
            bio: 'Estimating and value engineering specialist with experience across healthcare, education, and industrial sectors.',
          },
        ],
      },
      contact: {
        title: 'Let\'s Build Together',
        subtitle: 'Tell us about your project. We\'ll respond within one business day.',
        email: 'estimates@forgeconstruction.com',
        phone: '+1 (845) 555-0341',
        address: '220 Route 9, Cold Spring, NY 10516',
        socialLinks: [
          { platform: 'LinkedIn', url: 'https://linkedin.com/company/forgeconstruction' },
          { platform: 'Instagram', url: 'https://instagram.com/forgeconstruction' },
        ],
      },
    },
  },
};

export const defaultContent = template.defaultContent;
