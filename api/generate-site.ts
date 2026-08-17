import type { VercelRequest, VercelResponse } from '@vercel/node';
import { callNim } from './_lib/nim.js';
import { parseJsonResponse } from './_lib/groq.js';
import { getApiTemplate } from './_lib/templates.js';

const GENERATE_SYSTEM_PROMPT = `You are a senior web designer and content strategist. You modify EXISTING website templates based on user requirements. You do NOT create websites from scratch.

RULES:
- Keep ALL sections from the original template
- Keep the same section IDs and hierarchy
- Rewrite text content to match the niche and business
- Apply the new color palette to theme tokens
- Generate realistic, professional content (no lorem ipsum)
- Return ONLY valid JSON, no markdown, no code fences, no explanation`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { templateId, niche, palette, description, additionalInstructions } = req.body;

    const templateDef = getApiTemplate(templateId);
    if (!templateDef) {
      return res.status(400).json({ error: 'Template not found' });
    }

    const userMessage = `Template: ${templateDef.metadata.name} (${templateDef.metadata.category})
Description: ${templateDef.metadata.description}
Sections: ${templateDef.metadata.sections.join(', ')}
Current theme: ${JSON.stringify(templateDef.metadata.theme)}
Current default content: ${JSON.stringify(templateDef.defaultContent, null, 2)}

User requirements:
- Niche: ${niche}
- Palette: ${palette.name} (${JSON.stringify(palette.colors)})
- Theme: ${JSON.stringify(palette.theme)}
- Business description: ${description}
${additionalInstructions ? `- Additional direction: ${additionalInstructions}` : ''}

Modify the template content and theme to match the user's requirements. Keep the same structure and section IDs.`;

    const response = await callNim(GENERATE_SYSTEM_PROMPT, userMessage);
    const parsed = parseJsonResponse(response);

    const config = { ...parsed, theme: palette.theme };
    return res.status(200).json(config);
  } catch (err) {
    console.error('Generate error:', err);

    const { templateId, palette, niche, description } = req.body;
    const templateDef = getApiTemplate(templateId);

    if (templateDef) {
      const siteContent = (templateDef.defaultContent as Record<string, unknown>).site as Record<string, unknown> || {};
      const mockConfig = {
        site: {
          brandName: (siteContent.brandName as string) || templateDef.metadata.name,
          tagline: (siteContent.tagline as string) || '',
          description: description || templateDef.metadata.description,
          ctaPrimary: (siteContent.ctaPrimary as string) || 'Get started',
          ctaSecondary: (siteContent.ctaSecondary as string) || 'Learn more',
        },
        theme: palette.theme,
        sections: (templateDef.defaultContent as Record<string, unknown>).sections || {},
        imagePrompts: {},
      };
      return res.status(200).json(mockConfig);
    }

    return res.status(500).json({ error: 'Generation failed' });
  }
}
