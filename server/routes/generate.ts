import { Router, Request, Response } from 'express';
import { callNim } from '../services/nim.js';
import { callGroq, parseJsonResponse } from '../services/groq.js';
import { fetchNicheImages } from '../services/images.js';
import { getAllTemplates } from '../../src/templates/index.js';

export const generateRouter = Router();

const ANALYSIS_PROMPT = `You are an expert business analyst and brand strategist. You deeply analyze businesses and extract rich, actionable information.

Given a user's description of their business, extract EVERYTHING you can infer. Be specific and detailed — not generic.

Return ONLY valid JSON:
{
  "businessName": "exact business name from description, or a creative one if not provided",
  "tagline": "punchy 3-8 word tagline that captures their unique value",
  "tone": "one of: professional, casual, luxury, playful, minimal, bold",
  "voice": "describe the brand voice in one sentence (e.g., warm and inviting, sleek and modern, raw and energetic)",
  "keywords": ["specific1", "specific2", "specific3", "specific4", "specific5"],
  "subNiche": "very specific sub-niche (e.g., 'third-wave specialty coffee' not just 'coffee shop')",
  "audience": "specific target customer with age range and interests",
  "uniqueSellingPoint": "what genuinely makes this business different from competitors",
  "location": "city/area if mentioned, null if not",
  "founded": "year if mentioned, null if not",
  "keyProducts": ["product1", "product2", "product3"],
  "brandAdjectives": ["adjective1", "adjective2", "adjective3"],
  "competitorTone": "how they position vs competitors (e.g., premium vs accessible, traditional vs modern)"
}

RULES:
- Extract the EXACT business name from description if given
- Be specific about the niche — "specialty pour-over coffee" not "coffee"
- The tagline must be catchy and specific to THIS business
- Keywords should be things a customer would search for
- brandAdjectives should capture the visual/personality feel
- Return ONLY the JSON, nothing else`;

const CONTENT_GENERATION_PROMPT = `You are an elite web copywriter and content strategist who has written for hundreds of top agencies. You create content that feels REAL — written by the business owner, not a robot.

CRITICAL RULES — VIOLATION = FAILURE:
1. You MUST use the EXACT field names from the template's default content. Copy them precisely.
2. You MUST preserve the EXACT same data types (strings stay strings, arrays stay arrays, numbers stay numbers).
3. Every single text field MUST contain NEW, original content. NEVER copy the template defaults.
4. Content must be deeply specific to THIS business — mention their actual products, location, services by name.
5. IDs for list items should be short slugs (e.g., "espresso-blend", "yoga-flow", "portfolio-1").
6. Return ONLY valid JSON. No markdown, no code fences, no explanation, no trailing commas.

YOUR PROCESS:
1. Read the template's default content JSON structure carefully
2. For EVERY field in every section, write completely new content that matches THIS business
3. Match the EXACT same keys and nesting structure
4. Ensure all arrays have the same number of items as the template defaults
5. Return the complete JSON with both "site" and "sections" keys

OUTPUT FORMAT:
{
  "site": {
    "brandName": "Business Name",
    "tagline": "Compelling tagline",
    "description": "2-3 sentence rich description of the business, mentioning specific services/location/philosophy",
    "ctaPrimary": "Action-oriented button text (e.g., 'Book a Table', 'Start Training', 'View Our Work')",
    "ctaSecondary": "Secondary action text (e.g., 'See the Menu', 'Our Story', 'Get a Quote')"
  },
  "sections": {
    // EXACT same section IDs and field names as the template default content
    // Every text field replaced with niche-specific content
  }
}

CTA BUTTON RULES:
- ctaPrimary and ctaSecondary MUST be different from each other
- They MUST be action verbs specific to the niche
- Examples by niche:
  - Restaurant: "Reserve a Table" / "View Menu"
  - Gym: "Start Free Trial" / "See Programs"
  - Photography: "Book a Session" / "View Portfolio"
  - Architecture: "Start Your Project" / "See Our Work"
  - Coffee: "Order Now" / "Our Menu"
  - AI Startup: "Get Early Access" / "See How It Works"
  - Interior Design: "Book Consultation" / "View Projects"
  - Fashion: "Shop Collection" / "Our Story"`;

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
      `Business niche: ${niche}
User description: ${description}
${additionalInstructions ? `Additional instructions: ${additionalInstructions}` : ''}
Color palette selected: ${palette.name}`,
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
        analysis = buildFallbackAnalysis(niche, description);
      }
    } else {
      analysis = buildFallbackAnalysis(niche, description);
    }

    console.log('[v2] Analysis:', analysis.businessName, '|', analysis.subNiche);

    const templateStructure = JSON.stringify(templateDef.defaultContent, null, 2);

    const contentUserMessage = `=== BUSINESS ANALYSIS ===
${JSON.stringify(analysis, null, 2)}

=== TEMPLATE TO FILL ===
Name: ${templateDef.metadata.name}
Category: ${templateDef.metadata.category}
Sections to generate: ${templateDef.metadata.sections.join(', ')}

=== TEMPLATE'S DEFAULT CONTENT (use as STRUCTURE REFERENCE ONLY — replace ALL text) ===
${templateStructure}

=== USER'S ORIGINAL DESCRIPTION ===
${description}

=== COLOR PALETTE ===
${palette.name} — Background: ${palette.theme.background}, Foreground: ${palette.theme.foreground}, Accent: ${palette.theme.accent}

=== INSTRUCTIONS ===
Generate COMPLETE website content for the "${templateDef.metadata.name}" template.
- Read the template structure above and match it EXACTLY
- Replace EVERY text field with content specific to "${analysis.businessName || niche}"
- Use the business details from the analysis above
- Make CTAs specific to the ${niche} niche
- Every sentence should reference THIS business's actual offerings
- Do NOT use placeholder text or generic descriptions
- Generate unique content for EACH section — they should all feel different
- Keep the same JSON structure, just replace the content`;

    const contentResult = await callGroq(
      CONTENT_GENERATION_PROMPT,
      contentUserMessage,
      { temperature: 0.8, maxTokens: 8192 }
    ).catch((err) => {
      console.error('[v2] Content error:', err.message);
      return null;
    });

    let content: Record<string, unknown>;
    if (contentResult) {
      try {
        content = parseJsonResponse(contentResult);
        if (!content.site || !content.sections) {
          console.error('[v2] Content missing site/sections keys, using fallback');
          content = buildFallbackContent(analysis, description, templateDef);
        }
      } catch (err) {
        console.error('[v2] Content parse error:', err);
        content = buildFallbackContent(analysis, description, templateDef);
      }
    } else {
      content = buildFallbackContent(analysis, description, templateDef);
    }

    console.log('[v2] Content generated with sections:', Object.keys((content.sections as Record<string, unknown>) || {}));

    const images = await fetchNicheImages(
      niche,
      description,
      templateDef.metadata.sections
    ).catch((err) => {
      console.error('[v2] Image error:', err.message);
      return {} as Record<string, string>;
    });

    console.log('[v2] Images:', Object.keys(images).length, 'images for', niche);

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

function buildFallbackAnalysis(niche: string, description: string): Record<string, unknown> {
  const words = description.split(' ');
  const nameGuess = words.find((w: string) => w.charAt(0) === w.charAt(0).toUpperCase() && w.length > 3) || niche.split(' ').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  return {
    businessName: nameGuess,
    tagline: `${niche.charAt(0).toUpperCase() + niche.slice(1)} — crafted with passion.`,
    tone: 'professional',
    voice: 'Professional and welcoming',
    keywords: [niche, 'quality', 'professional', 'service', 'best'],
    subNiche: niche,
    audience: 'Local customers seeking quality ' + niche + ' services',
    uniqueSellingPoint: description.slice(0, 100),
    location: null,
    founded: null,
    keyProducts: [],
    brandAdjectives: ['quality', 'professional', 'modern'],
    competitorTone: 'premium',
  };
}

function buildFallbackContent(
  analysis: Record<string, unknown>,
  description: string,
  templateDef: { defaultContent: Record<string, unknown>; metadata: { sections: string[] } }
): Record<string, unknown> {
  const brandName = (analysis.businessName as string) || 'Business';
  const tagline = (analysis.tagline as string) || 'Quality you can trust.';
  const subNiche = (analysis.subNiche as string) || 'business';

  return {
    site: {
      brandName,
      tagline,
      description: description || `${brandName} is a leading ${subNiche} dedicated to excellence.`,
      ctaPrimary: 'Get Started',
      ctaSecondary: 'Learn More',
    },
    sections: templateDef.defaultContent.sections || {},
  };
}

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
