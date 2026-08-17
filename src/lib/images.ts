import type { SiteConfig } from '../types';

export function getSectionImage(
  config: SiteConfig,
  section: string,
  index: number = 0,
  fallback?: string
): string {
  const key = index === 0 ? section : `${section}-${index}`;
  return (config.imagePrompts as Record<string, string> | undefined)?.[key] || fallback || '';
}

export function getSectionImages(
  config: SiteConfig,
  section: string,
  count: number,
  fallbacks: string[] = []
): string[] {
  const images: string[] = [];
  for (let i = 0; i < count; i++) {
    const key = `${section}-${i}`;
    const url = (config.imagePrompts as Record<string, string> | undefined)?.[key] || fallbacks[i % fallbacks.length] || '';
    images.push(url);
  }
  return images;
}
