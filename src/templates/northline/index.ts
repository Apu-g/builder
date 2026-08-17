import { TemplateMetadata } from '../../types';

export const template: TemplateMetadata = {
  id: 'northline',
  name: 'Northline',
  category: 'SaaS / Technology',
  description: 'A clean, confidence-inspiring template for SaaS products and technology companies. Designed to build trust and drive conversions.',
  style: ['clean', 'modern', 'trust-building', 'conversion-focused'],
  designCharacteristics: ['structured grid', 'card-based layouts', 'blue accent', 'subtle gradients', 'data-friendly'],
  sections: ['hero', 'features', 'statistics', 'testimonials', 'pricing', 'cta'],
  theme: {
    background: '#FAFBFC',
    foreground: '#0F172A',
    accent: '#3B82F6',
    muted: '#94A3B8',
  },
  defaultContent: {
    site: {
      brandName: 'Northline',
      tagline: 'Project management that scales with your ambition.',
      description: 'Northline helps teams plan, track, and deliver complex projects with clarity. Built for modern product teams who refuse to let process slow them down.',
      ctaPrimary: 'Start Free Trial',
      ctaSecondary: 'Watch Demo',
    },
    sections: {
      hero: {
        title: 'Ship projects faster with your team in sync.',
        subtitle: 'Northline brings your tasks, timelines, and team communication into one fluid workspace. No more context-switching, no more missed deadlines.',
        mediaType: 'image',
        badge: 'New: AI-Powered Sprint Planning',
      },
      features: {
        title: 'Everything your team needs. Nothing it doesn\'t.',
        subtitle: 'Purpose-built features that replace your patchwork of tools.',
        items: [
          {
            id: 'feat-1',
            title: 'Smart Task Boards',
            description: 'Kanban, list, timeline, and calendar views that adapt to how your team works. Automatically surface blockers before they become problems.',
            icon: 'columns',
          },
          {
            id: 'feat-2',
            title: 'Real-Time Collaboration',
            description: 'Comment threads, @mentions, and live cursors keep everyone aligned without another status meeting.',
            icon: 'users',
          },
          {
            id: 'feat-3',
            title: 'Custom Workflows',
            description: 'Design workflows that mirror your process — from intake to delivery — with conditional automations and approval gates.',
            icon: 'git-branch',
          },
          {
            id: 'feat-4',
            title: 'Time Tracking',
            description: 'Built-in time logging tied directly to tasks and projects. Generate reports in one click for client billing or sprint retrospectives.',
            icon: 'clock',
          },
          {
            id: 'feat-5',
            title: 'Integrations',
            description: 'Connect Slack, GitHub, Figma, Notion, and 200+ other tools. Northline becomes the hub of your existing workflow.',
            icon: 'puzzle',
          },
          {
            id: 'feat-6',
            title: 'Advanced Reporting',
            description: 'Dashboards that surface project health, team velocity, and resource allocation — updated in real time from actual work data.',
            icon: 'bar-chart',
          },
        ],
      },
      statistics: {
        title: 'Trusted by high-performing teams',
        items: [
          { id: 'stat-1', value: '12,400+', label: 'Teams worldwide' },
          { id: 'stat-2', value: '99.98%', label: 'Uptime SLA' },
          { id: 'stat-3', value: '34%', label: 'Faster delivery on average' },
        ],
      },
      testimonials: {
        title: 'Hear from teams who made the switch',
        items: [
          {
            id: 'test-1',
            quote: 'We migrated from three separate tools to Northline and haven\'t looked back. Our sprint velocity improved by 28% in the first quarter alone.',
            author: 'Marcus Chen',
            role: 'VP of Engineering, Crestline',
            company: 'Crestline',
          },
          {
            id: 'test-2',
            quote: 'The custom workflows feature alone justified the switch. We finally have a tool that adapts to our process instead of forcing us into someone else\'s.',
            author: 'Priya Sharma',
            role: 'Head of Product, Vantage AI',
            company: 'Vantage AI',
          },
        ],
      },
      pricing: {
        title: 'Simple, transparent pricing',
        subtitle: 'Start free. Upgrade when you\'re ready.',
        tiers: [
          {
            id: 'tier-1',
            name: 'Starter',
            price: '0',
            period: 'forever',
            description: 'For small teams getting started.',
            features: ['Up to 10 users', '3 active projects', 'Kanban & list views', 'Basic reporting', 'Email support'],
            cta: 'Get Started Free',
            highlighted: false,
          },
          {
            id: 'tier-2',
            name: 'Professional',
            price: '12',
            period: 'per user / month',
            description: 'For growing teams that need more.',
            features: ['Unlimited users', 'Unlimited projects', 'All board views', 'Time tracking', 'Custom workflows', 'Integrations', 'Priority support'],
            cta: 'Start Free Trial',
            highlighted: true,
          },
          {
            id: 'tier-3',
            name: 'Enterprise',
            price: 'Custom',
            period: 'tailored to you',
            description: 'For organizations with complex needs.',
            features: ['Everything in Professional', 'SSO & SAML', 'Advanced permissions', 'Audit logs', 'Dedicated account manager', 'Custom SLA', 'On-premise option'],
            cta: 'Contact Sales',
            highlighted: false,
          },
        ],
      },
      cta: {
        title: 'Ready to transform how your team works?',
        subtitle: 'Join 12,400+ teams already delivering better work with Northline. Free for up to 10 users — no credit card required.',
        primaryButton: 'Start Free Trial',
        secondaryButton: 'Book a Demo',
      },
    },
  },
};

export const defaultContent = template.defaultContent;
