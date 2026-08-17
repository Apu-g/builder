import { GenerateRequest, EditRequest, SiteConfig } from '../types';
import { getTemplate } from '../templates';
import { getNicheContent, findBestNicheMatch } from '../data/nicheContent';

export type AgentStatus = 'idle' | 'running' | 'complete' | 'error';

export interface AgentProgress {
  agent: string;
  status: AgentStatus;
  message: string;
}

export async function generateSiteV2(
  request: GenerateRequest,
  onProgress: (progress: AgentProgress) => void
): Promise<SiteConfig> {
  const progressSteps = [
    { agent: 'analysis', message: 'Analyzing your business description...' },
    { agent: 'content', message: 'Generating website content with AI...' },
    { agent: 'images', message: 'Finding relevant images...' },
    { agent: 'assembly', message: 'Assembling your website...' },
  ];

  let stepIndex = 0;
  const advanceProgress = () => {
    if (stepIndex < progressSteps.length) {
      const step = progressSteps[stepIndex];
      onProgress({ agent: step.agent, status: 'complete', message: step.message });
      stepIndex++;
      if (stepIndex < progressSteps.length) {
        const next = progressSteps[stepIndex];
        onProgress({ agent: next.agent, status: 'running', message: next.message });
      }
    }
  };

  onProgress({ agent: progressSteps[0].agent, status: 'running', message: progressSteps[0].message });

  const progressInterval = setInterval(() => {
    advanceProgress();
  }, 2500);

  try {
    const res = await fetch('/api/generate-site-v2', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    });

    clearInterval(progressInterval);

    if (!res.ok) {
      throw new Error(`Server error: ${res.status}`);
    }

    for (let i = stepIndex; i < progressSteps.length; i++) {
      onProgress({ agent: progressSteps[i].agent, status: 'complete', message: progressSteps[i].message });
    }

    return await res.json();
  } catch (err) {
    clearInterval(progressInterval);
    throw err;
  }
}

export async function generateSite(request: GenerateRequest): Promise<SiteConfig> {
  try {
    const res = await fetch('/api/generate-site', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    });
    if (!res.ok) throw new Error('API error');
    return await res.json();
  } catch {
    return mockGenerate(request);
  }
}

export async function editSite(request: EditRequest): Promise<SiteConfig> {
  try {
    const res = await fetch('/api/edit-site', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    });
    if (!res.ok) throw new Error('API error');
    return await res.json();
  } catch {
    return mockEdit(request);
  }
}

export function mockGenerate(request: GenerateRequest): SiteConfig {
  const template = getTemplate(request.templateId);
  if (!template) {
    return {
      brandName: 'My Site',
      tagline: 'Built with care.',
      description: request.description || 'A new website.',
      ctaPrimary: 'Get Started',
      ctaSecondary: 'Learn More',
      niche: request.niche,
      theme: request.palette.theme,
      sections: {},
      imagePrompts: {},
    };
  }

  const matchedNiche = findBestNicheMatch(request.niche);
  const nicheContent = matchedNiche ? getNicheContent(request.templateId, matchedNiche) : null;

  if (nicheContent) {
    return {
      ...nicheContent.site,
      description: request.description || nicheContent.site.description,
      niche: request.niche,
      theme: request.palette.theme,
      sections: nicheContent.sections,
      imagePrompts: {},
    };
  }

  const defaultContent = template.defaultContent as {
    site: { brandName: string; tagline: string; description: string; ctaPrimary: string; ctaSecondary: string };
    sections: Record<string, unknown>;
  };
  const brand = autoBrand(request.niche);

  return {
    brandName: brand.brandName,
    tagline: brand.tagline,
    description: request.description || defaultContent.site.description,
    ctaPrimary: defaultContent.site.ctaPrimary,
    ctaSecondary: defaultContent.site.ctaSecondary,
    niche: request.niche,
    theme: request.palette.theme,
    sections: defaultContent.sections,
    imagePrompts: {},
  };
}

function autoBrand(niche: string): { brandName: string; tagline: string } {
  const words = niche.split(/\s+/);
  const brandName = words.map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  return { brandName, tagline: `${brandName} — where quality meets craft.` };
}

export function mockEdit(request: EditRequest): SiteConfig {
  const config = { ...request.currentConfig, sections: { ...request.currentConfig.sections } };
  const change = request.change.toLowerCase();

  if (change.includes('bold') || change.includes('stronger')) {
    config.theme = { ...config.theme, accent: darkenColor(config.theme.accent, 0.2) };
  }
  if (change.includes('minimal') || change.includes('clean')) {
    config.theme = { ...config.theme, background: '#FFFFFF', foreground: '#111111', muted: '#999999' };
  }
  if (change.includes('premium') || change.includes('luxury')) {
    config.theme = { ...config.theme, background: '#0A0A0A', foreground: '#F5F0EB', accent: '#C9A96E', muted: '#666666' };
  }
  if (change.includes('warm') || change.includes('friendly')) {
    config.theme = { ...config.theme, background: '#FDF8F0', foreground: '#2C2218', accent: '#C4623A', muted: '#A89E93' };
  }
  if (change.includes('colorful') || change.includes('vibrant')) {
    config.theme = { ...config.theme, accent: '#6C5CE7', muted: '#A29BFE' };
  }
  if (change.includes('dark') || change.includes('moody')) {
    config.theme = { ...config.theme, background: '#111111', foreground: '#F0F0F0', muted: '#777777' };
  }

  return config;
}

function darkenColor(hex: string, amount: number): string {
  const h = hex.replace('#', '');
  const r = Math.max(0, parseInt(h.substring(0, 2), 16) - Math.round(255 * amount));
  const g = Math.max(0, parseInt(h.substring(2, 4), 16) - Math.round(255 * amount));
  const b = Math.max(0, parseInt(h.substring(4, 6), 16) - Math.round(255 * amount));
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}
