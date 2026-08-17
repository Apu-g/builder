import { template as atelier, defaultContent as atelierContent } from './atelier/index.js';
import { template as northline, defaultContent as northlineContent } from './northline/index.js';
import { template as forma, defaultContent as formaContent } from './forma/index.js';
import { template as localTable, defaultContent as localTableContent } from './local-table/index.js';
import { template as forge, defaultContent as forgeContent } from './forge/index.js';
import { template as motion, defaultContent as motionContent } from './motion/index.js';
import { template as mono, defaultContent as monoContent } from './mono/index.js';
import { template as commerce, defaultContent as commerceContent } from './commerce/index.js';
import type { TemplateMetadata } from '../types';

export interface TemplateDefinition {
  metadata: TemplateMetadata;
  defaultContent: Record<string, unknown>;
}

const templates: TemplateDefinition[] = [
  { metadata: atelier, defaultContent: atelierContent },
  { metadata: northline, defaultContent: northlineContent },
  { metadata: forma, defaultContent: formaContent },
  { metadata: localTable, defaultContent: localTableContent },
  { metadata: forge, defaultContent: forgeContent },
  { metadata: motion, defaultContent: motionContent },
  { metadata: mono, defaultContent: monoContent },
  { metadata: commerce, defaultContent: commerceContent },
];

export function getAllTemplates(): TemplateDefinition[] {
  return templates;
}

export function getTemplate(id: string): TemplateDefinition | undefined {
  return templates.find((t) => t.metadata.id === id);
}
