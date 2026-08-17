import { TemplateMetadata } from '../../types';

export const template: TemplateMetadata = {
  id: 'forma',
  name: 'Forma',
  category: 'Architecture / Interior Design',
  description: 'A refined, gallery-like template for architects and interior designers. Emphasizes visual storytelling through large imagery and restrained typography.',
  style: ['editorial', 'minimal', 'gallery', 'sophisticated'],
  designCharacteristics: ['full-bleed imagery', 'serif typography', 'warm neutrals', 'gold accent', 'asymmetric grids'],
  sections: ['hero', 'projects', 'about', 'services', 'contact'],
  theme: {
    background: '#F8F5F0',
    foreground: '#1A1A1A',
    accent: '#B8860B',
    muted: '#A69882',
  },
  defaultContent: {
    site: {
      brandName: 'Forma Architects',
      tagline: 'Spaces that inspire.',
      description: 'Forma Architects is a boutique architecture and interior design studio creating thoughtful, context-driven spaces across residential, commercial, and cultural projects.',
      ctaPrimary: 'View Projects',
      ctaSecondary: 'Get in Touch',
    },
    sections: {
      hero: {
        title: 'Architecture begins with listening — to the site, the light, and the people who will inhabit the space.',
        subtitle: 'Forma Architects delivers bespoke design solutions that honor context, material, and craft.',
        mediaType: 'image',
      },
      projects: {
        title: 'Selected Projects',
        subtitle: 'A selection of recent work spanning residential, hospitality, and cultural spaces.',
        items: [
          {
            id: 'proj-1',
            title: 'The Ridge House',
            category: 'Residential',
            location: 'Hudson Valley, NY',
            year: 2024,
            description: 'A cantilevered residence perched on a wooded hillside, designed to frame panoramic valley views while maintaining a deep connection to the surrounding forest canopy.',
            area: '3,200 sq ft',
          },
          {
            id: 'proj-2',
            title: 'Atelier Miro',
            category: 'Commercial',
            location: 'SoHo, New York',
            year: 2023,
            description: 'A dual-level gallery and studio space carved from a century-old cast-iron building. Exposed structural elements meet refined finishes to create a dialogue between past and present.',
            area: '5,800 sq ft',
          },
          {
            id: 'proj-3',
            title: 'Cedar & Stone Residence',
            category: 'Interior Design',
            location: 'Montauk, NY',
            year: 2024,
            description: 'A complete interior renovation of a coastal retreat, introducing warm wood tones, natural stone surfaces, and custom millwork that echo the rugged Long Island landscape.',
            area: '2,100 sq ft',
          },
          {
            id: 'proj-4',
            title: 'Canopy Public Library',
            category: 'Cultural',
            location: 'Portland, OR',
            year: 2023,
            description: 'A community library designed around the concept of a "knowledge forest" — branching timber columns support reading nooks, collaborative zones, and a central atrium filled with natural light.',
            area: '18,500 sq ft',
          },
        ],
      },
      about: {
        title: 'About Forma',
        description: 'Founded in 2015 by architects Elena Voss and David Kwan, Forma Architects was born from a shared conviction that architecture should respond to its context with intelligence and sensitivity. Our studio of 22 professionals operates from a converted warehouse in Brooklyn, where we approach each project as a unique set of spatial, cultural, and environmental conditions. We believe in material honesty, structural clarity, and the power of well-considered details to transform everyday experience.',
        founded: 2015,
        teamSize: 22,
        values: [
          { id: 'val-1', title: 'Context', description: 'Every project begins with understanding the site, the climate, and the culture it belongs to.' },
          { id: 'val-2', title: 'Material Honesty', description: 'We celebrate materials for what they are, not what they pretend to be.' },
          { id: 'val-3', title: 'Craft', description: 'Precision in detail and execution is non-negotiable.' },
        ],
      },
      services: {
        title: 'Our Services',
        subtitle: 'Comprehensive design services from concept through completion.',
        items: [
          {
            id: 'svc-1',
            title: 'Residential Architecture',
            description: 'Custom homes, renovations, and additions designed around how you live. We guide clients from site selection through construction, creating residences that are both deeply personal and enduringly crafted.',
            icon: 'home',
          },
          {
            id: 'svc-2',
            title: 'Commercial & Workplace',
            description: 'Offices, retail spaces, and hospitality environments that reflect brand identity and enhance the human experience. We design spaces where people genuinely want to spend time.',
            icon: 'building',
          },
          {
            id: 'svc-3',
            title: 'Interior Design',
            description: 'Furniture selection, material palettes, custom millwork, and spatial planning that bring architectural vision to life at the human scale.',
            icon: 'armchair',
          },
          {
            id: 'svc-4',
            title: 'Design Consultation',
            description: 'Feasibility studies, zoning analysis, and concept development for clients who need expert guidance before committing to a full design engagement.',
            icon: 'compass',
          },
        ],
      },
      contact: {
        title: 'Begin a Conversation',
        subtitle: 'Whether you have a site, a vision, or just a question — we welcome the dialogue.',
        email: 'studio@forma-architects.com',
        phone: '+1 (718) 555-0234',
        address: '128 Union Avenue, Brooklyn, NY 11211',
        socialLinks: [
          { platform: 'Instagram', url: 'https://instagram.com/formaarchitects' },
          { platform: 'Archinect', url: 'https://archinect.com/forma' },
          { platform: 'LinkedIn', url: 'https://linkedin.com/company/formaarchitects' },
        ],
      },
    },
  },
};

export const defaultContent = template.defaultContent;
