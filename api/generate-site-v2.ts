import type { VercelRequest, VercelResponse } from '@vercel/node';
import { callGroq, parseJsonResponse } from './_lib/groq.js';
import { fetchNicheImages } from './_lib/images.js';

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

// Lazy-load templates to avoid import issues at module level
async function getTemplateDef(templateId: string) {
  const { getAllTemplates } = await import('../src/templates/index.js');
  return getAllTemplates().find((t) => t.metadata.id === templateId);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { templateId, niche, palette, description, additionalInstructions } = req.body;

    const templateDef = await getTemplateDef(templateId);
    if (!templateDef) {
      return res.status(400).json({ error: 'Template not found' });
    }

    console.log(`[v2] Generating for niche="${niche}", template="${templateId}"`);

    // Step 1: Deep business analysis
    const analysisResult = await callGroq(
      ANALYSIS_PROMPT,
      `Business niche: ${niche}
User description: ${description}
${additionalInstructions ? `Additional instructions: ${additionalInstructions}` : ''}
Color palette selected: ${palette.name}`,
      { temperature: 0.7, maxTokens: 1024 }
    ).catch((err: Error) => {
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

    // Step 2: Generate template-specific content
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
    ).catch((err: Error) => {
      console.error('[v2] Content error:', err.message);
      return null;
    });

    let content: Record<string, unknown>;
    if (contentResult) {
      try {
        content = parseJsonResponse(contentResult);
        // Validate the content has the expected structure
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

    // Step 3: Fetch niche-specific images
    const images = await fetchNicheImages(
      niche,
      description,
      templateDef.metadata.sections
    ).catch((err: Error) => {
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
    return res.status(200).json(finalConfig);
  } catch (err) {
    console.error('[v2] Fatal error:', err);
    return res.status(500).json({ error: 'Generation failed' });
  }
}

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

  const site = {
    brandName,
    tagline,
    description: description || `${brandName} is a leading ${subNiche} dedicated to excellence.`,
    ctaPrimary: 'Get Started',
    ctaSecondary: 'Learn More',
  };

  return {
    site,
    sections: templateDef.defaultContent.sections || {},
  };
}
