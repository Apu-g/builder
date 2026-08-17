import { PalettePreset } from '../types';

export const palettes: PalettePreset[] = [
  {
    id: 'obsidian',
    name: 'Obsidian',
    colors: ['#1A1A1A', '#F5F0EB', '#8C8279', '#E8532E'],
    theme: { background: '#F5F0EB', foreground: '#1A1A1A', accent: '#E8532E', muted: '#8C8279' },
  },
  {
    id: 'paper',
    name: 'Paper',
    colors: ['#F2EDE4', '#2C2C2C', '#C4623A'],
    theme: { background: '#F2EDE4', foreground: '#2C2C2C', accent: '#C4623A', muted: '#A89E93' },
  },
  {
    id: 'forest',
    name: 'Forest',
    colors: ['#1B3A2D', '#F7F5F0', '#7A9E7E'],
    theme: { background: '#F7F5F0', foreground: '#1B3A2D', accent: '#4A7C59', muted: '#7A9E7E' },
  },
  {
    id: 'cobalt',
    name: 'Cobalt',
    colors: ['#F0F2F5', '#0F1B2D', '#2563EB'],
    theme: { background: '#F0F2F5', foreground: '#0F1B2D', accent: '#2563EB', muted: '#6B7A8D' },
  },
  {
    id: 'clay',
    name: 'Clay',
    colors: ['#F4EFE6', '#231F20', '#A94B32'],
    theme: { background: '#F4EFE6', foreground: '#231F20', accent: '#A94B32', muted: '#8C7E72' },
  },
  {
    id: 'mono',
    name: 'Mono',
    colors: ['#FFFFFF', '#0A0A0A', '#555555'],
    theme: { background: '#FFFFFF', foreground: '#0A0A0A', accent: '#0A0A0A', muted: '#555555' },
  },
  {
    id: 'ocean',
    name: 'Ocean',
    colors: ['#0B1D3A', '#F0F5FA', '#38BDF8'],
    theme: { background: '#F0F5FA', foreground: '#0B1D3A', accent: '#0EA5E9', muted: '#64748B' },
  },
  {
    id: 'plum',
    name: 'Plum',
    colors: ['#F5F0F2', '#2D1B30', '#8B2252'],
    theme: { background: '#F5F0F2', foreground: '#2D1B30', accent: '#8B2252', muted: '#9C7A8E' },
  },
];

export const nicheSuggestions = [
  'Coffee shop', 'Architecture studio', 'AI startup', 'Gym',
  'Law firm', 'Fashion brand', 'Restaurant', 'Photography studio',
  'Interior design', 'Marketing agency', 'Real estate', 'Dental clinic',
  'SaaS product', 'Art gallery', 'Yoga studio', 'Craft brewery',
];
