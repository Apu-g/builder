export interface ThemeTokens {
  background: string;
  foreground: string;
  accent: string;
  muted: string;
  surface?: string;
  border?: string;
}

export interface PalettePreset {
  id: string;
  name: string;
  colors: string[];
  theme: ThemeTokens;
}

export interface TemplateSection {
  id: string;
  title: string;
  [key: string]: unknown;
}

export interface TemplateMetadata {
  id: string;
  name: string;
  category: string;
  description: string;
  style: string[];
  designCharacteristics: string[];
  sections: string[];
  theme: ThemeTokens;
  defaultContent: Record<string, unknown>;
}

export interface SiteConfig {
  brandName: string;
  tagline: string;
  description: string;
  ctaPrimary: string;
  ctaSecondary: string;
  niche: string;
  theme: ThemeTokens;
  sections: Record<string, unknown>;
  imagePrompts: Record<string, string>;
}

export interface GenerateRequest {
  templateId: string;
  niche: string;
  palette: PalettePreset;
  description: string;
  additionalInstructions: string;
}

export interface EditRequest {
  templateId: string;
  currentConfig: SiteConfig;
  change: string;
}

export interface Project {
  id: string;
  name: string;
  templateId: string;
  niche: string;
  palette: PalettePreset;
  config: SiteConfig;
  createdAt: number;
  updatedAt: number;
  versions: ProjectVersion[];
  currentVersion: number;
}

export interface ProjectVersion {
  id: string;
  config: SiteConfig;
  label: string;
  createdAt: number;
}
