import { Router, Request, Response } from 'express';
import { callNim } from '../services/nim.js';
import { callGroq, parseJsonResponse } from '../services/groq.js';
import { fetchNicheImages } from '../services/images.js';
import { getAllTemplates } from '../../src/templates/index.js';

export const generateRouter = Router();

const ANALYSIS_PROMPT = `You are a business analyst. Analyze the user's business description and extract structured information.

Return ONLY valid JSON with this exact structure:
{
  "businessName": "extracted or suggested business name",
  "tagline": "a compelling tagline (max 8 words)",
  "tone": "one of: professional, casual, luxury, playful, minimal, bold",
  "keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"],
  "subNiche": "more specific niche category",
  "audience": "target audience description",
  "uniqueSellingPoint": "what makes this business special"
}

RULES:
- Extract the business name from the description if mentioned
- If no name given, create a fitting one based on the niche and description
- The tagline should be memorable and concise
- Keywords should be relevant for image search
- Return ONLY the JSON, no markdown, no explanation`;

const CONTENT_PROMPT_WITH_STRUCTURE = `You are a senior web designer and content strategist. Generate website content for a specific business, adapting to the template's section structure.

You receive:
1. Business analysis (name, tagline, tone, audience)
2. Template's actual section structure with example content
3. User's description of their business

Your task: Generate content that MATCHES the template's section structure exactly. If the template has a "work" section with portfolio items, generate portfolio items. If it has "programs" with durations and levels, generate programs. If it has "trainers" with bios, generate trainer profiles.

Return ONLY valid JSON. The structure should match the template's sections exactly:
{
  "site": {
    "brandName": "Business Name",
    "tagline": "Complying tagline",
    "description": "2-3 sentence business description",
    "ctaPrimary": "Primary button text",
    "ctaSecondary": "Secondary button text"
  },
  "sections": {
    // MATCH THE TEMPLATE'S SECTION IDs AND DATA STRUCTURES
    // Use the same field names as the template's default content
  }
}

RULES:
- Preserve ALL section IDs from the template
- Match the data structure of each section (same field names)
- Generate realistic, niche-specific content
- Use appropriate data types (arrays for lists, objects for single items)
- Include proper IDs for all list items
- Content should feel authentic to the business`;

const EDIT_SYSTEM_PROMPT = `You are a senior web designer. You receive an existing website configuration and a change request. Return a JSON object with ONLY the fields that need to change. The frontend will merge your changes. Return ONLY valid JSON. Never remove sections.`;

function deepMerge(target: Record<string, unknown>, source: Record<string, unknown>): Record<string, unknown> {
  const result = { ...target };
  for (const key of Object.keys(source)) {
    const srcVal = source[key];
    const tgtVal = result[key];
    if (
      srcVal && typeof srcVal === 'object' && !Array.isArray(srcVal) &&
      tgtVal && typeof tgtVal === 'object' && !Array.isArray(tgtVal)
    ) {
      result[key] = deepMerge(tgtVal as Record<string, unknown>, srcVal as Record<string, unknown>);
    } else {
      result[key] = srcVal;
    }
  }
  return result;
}

generateRouter.post('/generate-site-v2', async (req: Request, res: Response) => {
  try {
    const { templateId, niche, palette, description, additionalInstructions } = req.body;

    const templates = getAllTemplates();
    const templateDef = templates.find((t) => t.metadata.id === templateId);
    if (!templateDef) {
      res.status(400).json({ error: 'Template not found' });
      return;
    }

    console.log(`[v2] Generating for niche="${niche}", template="${templateId}"`);

    const analysisResult = await callGroq(
      ANALYSIS_PROMPT,
      `Business niche: ${niche}\nUser description: ${description}\n${additionalInstructions ? `Additional instructions: ${additionalInstructions}` : ''}`,
      { temperature: 0.7, maxTokens: 1024 }
    ).catch((err) => {
      console.error('[v2] Analysis error:', err.message);
      return null;
    });

    let analysis: Record<string, unknown>;
    if (analysisResult) {
      try {
        analysis = parseJsonResponse(analysisResult);
      } catch {
        analysis = {
          businessName: niche.split(' ').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
          tagline: `${niche.charAt(0).toUpperCase() + niche.slice(1)} — crafted with care.`,
          tone: 'professional',
          keywords: [niche, 'business', 'professional', 'quality'],
          subNiche: niche,
        };
      }
    } else {
      analysis = {
        businessName: niche.split(' ').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
        tagline: `${niche.charAt(0).toUpperCase() + niche.slice(1)} — crafted with care.`,
        tone: 'professional',
        keywords: [niche, 'business', 'professional'],
        subNiche: niche,
      };
    }

    console.log('[v2] Analysis complete:', analysis.businessName);

    const templateStructure = JSON.stringify(templateDef.defaultContent, null, 2);

    const contentResult = await callGroq(
      CONTENT_PROMPT_WITH_STRUCTURE,
      `Business Analysis:
${JSON.stringify(analysis, null, 2)}

Template: ${templateDef.metadata.name} (${templateDef.metadata.category})
Available sections: ${templateDef.metadata.sections.join(', ')}
Template structure:
${templateStructure}

User's business description: ${description}
Color palette: ${palette.name} - ${JSON.stringify(palette.theme)}

Generate complete website content matching the template's section structure. Adapt all content to the business niche and tone.`,
      { temperature: 0.7, maxTokens: 4096 }
    ).catch((err) => {
      console.error('[v2] Content error:', err.message);
      return null;
    });

    let content: Record<string, unknown>;
    if (contentResult) {
      try {
        content = parseJsonResponse(contentResult);
      } catch {
        content = {
          site: {
            brandName: (analysis as Record<string, unknown>).businessName || niche,
            tagline: (analysis as Record<string, unknown>).tagline || 'Quality you can trust.',
            description: description,
            ctaPrimary: 'Get Started',
            ctaSecondary: 'Learn More',
          },
          sections: templateDef.defaultContent.sections || {},
        };
      }
    } else {
      content = {
        site: {
          brandName: (analysis as Record<string, unknown>).businessName || niche,
          tagline: (analysis as Record<string, unknown>).tagline || 'Quality you can trust.',
          description: description,
          ctaPrimary: 'Get Started',
          ctaSecondary: 'Learn More',
        },
        sections: templateDef.defaultContent.sections || {},
      };
    }

    console.log('[v2] Content complete');

    const images = await fetchNicheImages(
      niche,
      description,
      templateDef.metadata.sections
    ).catch((err) => {
      console.error('[v2] Image error:', err.message);
      return {} as Record<string, string>;
    });

    console.log('[v2] Images complete:', Object.keys(images).length, 'images');

    const siteConfig = content as Record<string, unknown>;
    const finalConfig = {
      ...siteConfig,
      theme: palette.theme,
      imagePrompts: images,
      niche,
    };

    console.log('[v2] Generation complete');
    res.json(finalConfig);
  } catch (err) {
    console.error('[v2] Fatal error:', err);
    res.status(500).json({ error: 'Generation failed' });
  }
});

generateRouter.post('/generate-site', async (req: Request, res: Response) => {
  try {
    const { templateId, niche, palette, description, additionalInstructions } = req.body;

    const templates = getAllTemplates();
    const templateDef = templates.find((t) => t.metadata.id === templateId);
    if (!templateDef) {
      res.status(400).json({ error: 'Template not found' });
      return;
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
    res.json(config);
  } catch (err) {
    console.error('Generate error:', err);

    const { templateId, palette, niche, description } = req.body;
    const templates = getAllTemplates();
    const templateDef = templates.find((t) => t.metadata.id === templateId);

    if (templateDef) {
      const mockConfig = {
        site: {
          brandName: templateDef.defaultContent.site?.brandName || templateDef.metadata.name,
          tagline: templateDef.defaultContent.site?.tagline || '',
          description: description || templateDef.metadata.description,
          ctaPrimary: templateDef.defaultContent.site?.ctaPrimary || 'Get started',
          ctaSecondary: templateDef.defaultContent.site?.ctaSecondary || 'Learn more',
        },
        theme: palette.theme,
        sections: (templateDef.defaultContent as Record<string, unknown>).sections || {},
        imagePrompts: {},
      };
      res.json(mockConfig);
    } else {
      res.status(500).json({ error: 'Generation failed' });
    }
  }
});

const GENERATE_SYSTEM_PROMPT = `You are a senior web designer and content strategist. You modify EXISTING website templates based on user requirements. You do NOT create websites from scratch.

RULES:
- Keep ALL sections from the original template
- Keep the same section IDs and hierarchy
- Rewrite text content to match the niche and business
- Apply the new color palette to theme tokens
- Generate realistic, professional content (no lorem ipsum)
- Return ONLY valid JSON, no markdown, no code fences, no explanation`;

generateRouter.post('/edit-site', async (req: Request, res: Response) => {
  try {
    const { currentConfig, change } = req.body;

    const userMessage = `Current configuration:
${JSON.stringify(currentConfig, null, 2)}

User wants to: ${change}

Return only the fields that need to change.`;

    const response = await callGroq(
      EDIT_SYSTEM_PROMPT,
      userMessage,
      { temperature: 0.5, maxTokens: 2048 }
    );

    let parsed: Record<string, unknown>;
    try {
      parsed = parseJsonResponse(response);
    } catch {
      parsed = {};
    }

    const merged = deepMerge(currentConfig as Record<string, unknown>, parsed);
    res.json(merged);
  } catch (err) {
    console.error('Edit error:', err);
    res.json(req.body.currentConfig);
  }
});
