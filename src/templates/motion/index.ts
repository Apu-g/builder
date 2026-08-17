import { TemplateMetadata } from '../../types';

export const template: TemplateMetadata = {
  id: 'motion',
  name: 'Motion',
  category: 'Fitness / Sports',
  description: 'A high-energy, dark-mode template for gyms, fitness studios, and athletic brands. Built to motivate action with bold contrast and dynamic layouts.',
  style: ['bold', 'dark', 'energetic', 'athletic', 'high-contrast'],
  designCharacteristics: ['dark background', 'bold red accent', 'uppercase headings', 'high-contrast imagery', 'aggressive typography'],
  sections: ['hero', 'programs', 'trainers', 'testimonials', 'membership', 'contact'],
  theme: {
    background: '#0A0A0A',
    foreground: '#FAFAFA',
    accent: '#EF4444',
    muted: '#737373',
  },
  defaultContent: {
    site: {
      brandName: 'Motion Fitness',
      tagline: 'Train harder. Recover smarter.',
      description: 'Motion Fitness is a performance-driven training facility offering group classes, personal coaching, and athletic conditioning in a no-ego environment.',
      ctaPrimary: 'Join Now',
      ctaSecondary: 'View Programs',
    },
    sections: {
      hero: {
        title: 'Your strongest chapter starts here.',
        subtitle: 'Elite training. Expert coaching. A community that pushes you further than you\'d go alone.',
        mediaType: 'video',
        ctaPrimary: 'Start Free Week',
        ctaSecondary: 'Take a Tour',
      },
      programs: {
        title: 'Training Programs',
        subtitle: 'Structured programs designed by coaches, backed by science, and tested by athletes.',
        items: [
          {
            id: 'prog-1',
            title: 'Strength & Power',
            description: 'Barbell-focused program built around compound lifts — squat, bench, deadlift, and overhead press. Progressive overload with deload cycles. Perfect for building raw strength.',
            frequency: '4x per week',
            level: 'Intermediate',
          },
          {
            id: 'prog-2',
            title: 'HIIT Circuit',
            description: 'High-intensity interval training combining bodyweight movements, kettlebells, and rowing. Burns maximum calories in 45-minute sessions. All fitness levels welcome.',
            frequency: '3–5x per week',
            level: 'All Levels',
          },
          {
            id: 'prog-3',
            title: 'Athletic Conditioning',
            description: 'Sport-specific training for competitive athletes. Agility drills, plyometrics, speed work, and mobility. Built to translate directly to on-field performance.',
            frequency: '3x per week',
            level: 'Advanced',
          },
          {
            id: 'prog-4',
            title: 'Recovery & Mobility',
            description: 'Guided recovery sessions including yoga flow, foam rolling protocols, breath work, and active stretching. Essential for injury prevention and long-term performance.',
            frequency: '2x per week',
            level: 'All Levels',
          },
        ],
      },
      trainers: {
        title: 'Meet Your Coaches',
        subtitle: 'Certified professionals who lead by example.',
        items: [
          {
            id: 'trainer-1',
            name: 'Marcus Webb',
            title: 'Head Coach & Founder',
            specialties: ['Strength & Power', 'Olympic Lifting'],
            certifications: 'CSCS, USAW Level 2',
            bio: 'Former D1 football strength coach. 12 years of experience training competitive athletes and dedicated beginners alike.',
          },
          {
            id: 'trainer-2',
            name: 'Aisha Patel',
            title: 'Performance Coach',
            specialties: ['HIIT Circuit', 'Athletic Conditioning'],
            certifications: 'NASM-CPT, Precision Nutrition L1',
            bio: 'Marathon runner and CrossFit competitor. Specializes in metabolic conditioning and body composition coaching.',
          },
          {
            id: 'trainer-3',
            name: 'Daniel Ortega',
            title: 'Mobility Specialist',
            specialties: ['Recovery & Mobility', 'Injury Prevention'],
            certifications: 'FRC, Licensed Physical Therapist',
            bio: 'Doctor of Physical Therapy focused on movement quality. Helps athletes train pain-free and move better in and outside the gym.',
          },
        ],
      },
      testimonials: {
        title: 'Real Results',
        subtitle: 'Members who transformed their training and their lives.',
        items: [
          {
            id: 'test-1',
            quote: 'I\'d been going to a big-box gym for years with zero progress. In three months at Motion, I added 60 lbs to my squat and dropped two clothing sizes. The coaching here is in a different league.',
            author: 'Tyler Richardson',
            role: 'Member since 2023',
          },
          {
            id: 'test-2',
            quote: 'The Recovery & Mobility program changed everything for me. I\'m 47 and moving better than I did at 30. Daniel\'s approach to mobility is genuine, not just stretching — it\'s structural.',
            author: 'Karen Liu',
            role: 'Member since 2022',
          },
          {
            id: 'test-3',
            quote: 'Motion is the only gym where I\'ve actually stuck with a program. The community is incredibly supportive, and the coaches hold you accountable without making it feel like punishment.',
            author: 'Jordan Ellis',
            role: 'Member since 2024',
          },
        ],
      },
      membership: {
        title: 'Membership Plans',
        subtitle: 'No contracts. Cancel anytime. Your first week is on us.',
        tiers: [
          {
            id: 'tier-1',
            name: 'Essentials',
            price: '79',
            period: 'per month',
            description: 'Everything you need to get started.',
            features: ['Unlimited HIIT Circuit classes', 'Open gym access', 'Recovery & Mobility sessions', 'Motion app access', 'Onboarding assessment'],
            highlighted: false,
          },
          {
            id: 'tier-2',
            name: 'Performance',
            price: '149',
            period: 'per month',
            description: 'For members serious about results.',
            features: ['Everything in Essentials', 'Strength & Power program', 'Athletic Conditioning', '2 personal training sessions/month', 'Nutrition guidance', 'Priority class booking'],
            highlighted: true,
          },
          {
            id: 'tier-3',
            name: 'Elite',
            price: '249',
            period: 'per month',
            description: 'The full Motion experience.',
            features: ['Everything in Performance', 'Unlimited personal training', 'Custom programming', 'Body composition tracking', 'Recovery suite access', 'Guest passes (2/month)', 'Exclusive athlete events'],
            highlighted: false,
          },
        ],
      },
      contact: {
        title: 'Start Your Free Week',
        subtitle: 'Walk in, call, or book online. No commitment required.',
        email: 'info@motionfitness.com',
        phone: '+1 (312) 555-0456',
        address: '940 West Randolph Street, Chicago, IL 60607',
        hours: 'Mon–Fri 5:00 AM – 9:00 PM · Sat–Sun 7:00 AM – 5:00 PM',
        socialLinks: [
          { platform: 'Instagram', url: 'https://instagram.com/motionfitness' },
          { platform: 'YouTube', url: 'https://youtube.com/motionfitness' },
          { platform: 'TikTok', url: 'https://tiktok.com/@motionfitness' },
        ],
      },
    },
  },
};

export const defaultContent = template.defaultContent;
