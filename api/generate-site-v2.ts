import type { VercelRequest, VercelResponse } from '@vercel/node';
import { callGroq, parseJsonResponse } from './_lib/groq.js';
import { fetchNicheImages } from './_lib/images.js';

const ANALYSIS_PROMPT = `You are an expert business analyst. Extract business details from a user's description.

The user will provide a NICHE (industry category) and a DESCRIPTION of their business.

CRITICAL: The NICHE field tells you the industry (e.g., "law firm", "coffee shop", "gym"). Always use the NICHE as the primary industry indicator. The DESCRIPTION adds details about that specific business.

Return ONLY valid JSON:
{
  "businessName": "exact name if given, or create one fitting the niche",
  "tagline": "punchy 3-8 word tagline",
  "tone": "professional|casual|luxury|playful|minimal|bold",
  "keywords": ["k1","k2","k3","k4","k5"],
  "subNiche": "specific sub-niche within the industry",
  "audience": "target customer description",
  "uniqueSellingPoint": "what makes this business special",
  "keyProducts": ["product1","product2","product3"]
}

RULES:
- The NICHE is the INDUSTRY. If niche="law firm", this is a LAW FIRM regardless of what else the description says.
- If niche="coffee shop", this is a COFFEE SHOP.
- Extract the exact business name from description if given
- Keywords should be niche-specific search terms
- Return ONLY the JSON`;

const CONTENT_GENERATION_PROMPT = `You are an elite web copywriter. Generate website content for a SPECIFIC business in a SPECIFIC niche.

OUTPUT: Return ONLY valid JSON with "site" and "sections" keys. No markdown, no code fences.

The JSON structure MUST be:
{
  "site": {
    "brandName": "Business Name",
    "tagline": "Tagline",
    "description": "2-3 sentences about the business",
    "ctaPrimary": "Action button text",
    "ctaSecondary": "Secondary button text"
  },
  "sections": {
    // Match the section IDs from the template structure provided
    // Each section has an "id" and content fields
  }
}

CRITICAL RULES:
1. Every text field must be NEW content specific to THIS business and THIS niche
2. Match the section IDs and field names from the template structure exactly
3. CTAs must be niche-specific verbs (not generic "Get Started")
4. Content must reference the business's actual niche, services, and offerings
5. NEVER use placeholder text or lorem ipsum`;

// Extract a condensed skeleton of the template structure (just field names and types)
function extractStructure(obj: unknown, depth = 0): unknown {
  if (depth > 4) return '...';
  if (obj === null || obj === undefined) return null;
  if (typeof obj === 'string') return 'string';
  if (typeof obj === 'number') return 'number';
  if (typeof obj === 'boolean') return 'boolean';
  if (Array.isArray(obj)) {
    if (obj.length === 0) return [];
    return [extractStructure(obj[0], depth + 1)];
  }
  if (typeof obj === 'object') {
    const result: Record<string, unknown> = {};
    for (const [key, val] of Object.entries(obj as Record<string, unknown>)) {
      result[key] = extractStructure(val, depth + 1);
    }
    return result;
  }
  return obj;
}

// Lazy-load templates to avoid import issues at module level
async function getTemplateDef(templateId: string) {
  const { getAllTemplates } = await import('../src/templates/index.js');
  return getAllTemplates().find((t) => t.metadata.id === templateId);
}

// Niche-specific CTA mappings
const NICHE_CTAS: Record<string, { primary: string; secondary: string }> = {
  'law firm': { primary: 'Schedule Consultation', secondary: 'Our Practice Areas' },
  'coffee shop': { primary: 'Order Now', secondary: 'View Menu' },
  'restaurant': { primary: 'Reserve a Table', secondary: 'View Menu' },
  'gym': { primary: 'Start Free Trial', secondary: 'See Programs' },
  'photography': { primary: 'Book a Session', secondary: 'View Portfolio' },
  'architecture': { primary: 'Start Your Project', secondary: 'See Our Work' },
  'ai startup': { primary: 'Get Early Access', secondary: 'See How It Works' },
  'interior design': { primary: 'Book Consultation', secondary: 'View Projects' },
  'fashion': { primary: 'Shop Collection', secondary: 'Our Story' },
  'default': { primary: 'Get Started', secondary: 'Learn More' },
};

function getNicheCtas(niche: string): { primary: string; secondary: string } {
  const lower = niche.toLowerCase();
  for (const [key, ctas] of Object.entries(NICHE_CTAS)) {
    if (lower.includes(key)) return ctas;
  }
  return NICHE_CTAS.default;
}

// Build rich fallback content from analysis + niche
function buildSmartFallback(
  analysis: Record<string, unknown>,
  description: string,
  niche: string,
  templateDef: { defaultContent: Record<string, unknown>; metadata: { sections: string[] } }
): Record<string, unknown> {
  const brandName = (analysis.businessName as string) || niche.split(' ').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const tagline = (analysis.tagline as string) || `${brandName} — Excellence Since Day One.`;
  const subNiche = (analysis.subNiche as string) || niche;
  const usp = (analysis.uniqueSellingPoint as string) || '';
  const products = (analysis.keyProducts as string[]) || [];
  const ctas = getNicheCtas(niche);

  const site = {
    brandName,
    tagline,
    description: description || `${brandName} is a trusted ${subNiche} delivering exceptional quality and service. ${usp ? `What sets us apart: ${usp}.` : ''}`,
    ctaPrimary: ctas.primary,
    ctaSecondary: ctas.secondary,
  };

  // Deep-clone sections and replace text fields with niche-specific content
  const sections = JSON.parse(JSON.stringify(templateDef.defaultContent.sections || {})) as Record<string, unknown>;

  function fillSection(obj: Record<string, unknown>, path: string) {
    for (const [key, val] of Object.entries(obj)) {
      const fieldPath = `${path}.${key}`;
      if (typeof val === 'string') {
        const lower = val.toLowerCase();
        // Replace placeholder/generic strings with niche-specific content
        if (lower.includes('lorem') || lower.includes('placeholder') || lower.includes('default') || lower.includes('sample') || lower.includes('your ')) {
          obj[key] = generateFieldContent(key, niche, subNiche, brandName, products);
        }
        // Replace brand names from template defaults
        if (lower.includes('roast') || lower.includes('coffee') || lower.includes('brew')) {
          if (!niche.toLowerCase().includes('coffee')) {
            obj[key] = generateFieldContent(key, niche, subNiche, brandName, products);
          }
        }
      } else if (Array.isArray(val)) {
        val.forEach((item, i) => {
          if (typeof item === 'object' && item !== null) {
            fillSection(item as Record<string, unknown>, `${fieldPath}[${i}]`);
          }
        });
      } else if (typeof val === 'object' && val !== null) {
        fillSection(val as Record<string, unknown>, fieldPath);
      }
    }
  }

  for (const [sectionId, sectionData] of Object.entries(sections)) {
    if (typeof sectionData === 'object' && sectionData !== null) {
      fillSection(sectionData as Record<string, unknown>, sectionId);
    }
  }

  return { site, sections };
}

function generateFieldContent(fieldName: string, niche: string, subNiche: string, brandName: string, products: string[]): string {
  const lower = fieldName.toLowerCase();

  if (lower === 'title' || lower === 'heading') return `${brandName} — Your Trusted ${subNiche}`;
  if (lower === 'subtitle') return `Delivering exceptional ${niche} services with passion and precision.`;
  if (lower === 'description' || lower === 'text' || lower === 'content') {
    return `At ${brandName}, we specialize in ${subNiche}. Our team is dedicated to providing the highest quality ${niche} experience. ${products.length > 0 ? `From ${products.slice(0, 2).join(' to ')}, we deliver excellence.` : 'We bring expertise and passion to everything we do.'}`;
  }
  if (lower === 'name') return brandName;
  if (lower === 'bio') return `A passionate ${niche} professional with years of experience in ${subNiche}.`;
  if (lower === 'label') return subNiche;
  if (lower.includes('feature')) return `Professional ${niche} services`;
  if (lower.includes('service')) return `Our ${subNiche} expertise`;
  if (lower.includes('stat') || lower.includes('number')) return `${Math.floor(Math.random() * 20) + 5}+`;
  if (lower.includes('stat') && lower.includes('label')) return `Years of Experience`;

  return `${brandName} — ${subNiche}`;
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

    // Step 1: Business analysis
    const analysisResult = await callGroq(
      ANALYSIS_PROMPT,
      `NICHE: ${niche}
DESCRIPTION: ${description}
${additionalInstructions ? `ADDITIONAL: ${additionalInstructions}` : ''}
COLOR PALETTE: ${palette.name}`,
      { temperature: 0.7, maxTokens: 512 }
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

    // Step 2: Generate content with CONDENSED template structure
    const condensedStructure = extractStructure(templateDef.defaultContent);

    const uspVal = (analysis.uniqueSellingPoint as string) || '';
    const productsVal = (analysis.keyProducts as string[]) || [];

    const contentUserMessage = `BUSINESS: ${analysis.businessName}
NICHE: ${niche}
SUB-NICHE: ${analysis.subNiche}
TONE: ${analysis.tone}
DESCRIPTION: ${description}
${uspVal ? `USP: ${uspVal}` : ''}
${productsVal.length ? `PRODUCTS: ${productsVal.join(', ')}` : ''}

TEMPLATE: ${templateDef.metadata.name}
SECTIONS: ${templateDef.metadata.sections.join(', ')}

TEMPLATE STRUCTURE (field names and types — replace ALL text values):
${JSON.stringify(condensedStructure)}

Generate content for EVERY section above. Use niche-specific language for ${niche}.`;

    const contentResult = await callGroq(
      CONTENT_GENERATION_PROMPT,
      contentUserMessage,
      { temperature: 0.8, maxTokens: 4096 }
    ).catch((err: Error) => {
      console.error('[v2] Content error:', err.message);
      return null;
    });

    let content: Record<string, unknown>;
    if (contentResult) {
      try {
        content = parseJsonResponse(contentResult);
        if (!content.site || !content.sections) {
          console.error('[v2] Content missing site/sections, using smart fallback');
          content = buildSmartFallback(analysis, description, niche, templateDef);
        }
      } catch (err) {
        console.error('[v2] Content parse error:', err);
        content = buildSmartFallback(analysis, description, niche, templateDef);
      }
    } else {
      console.log('[v2] Using smart fallback for content');
      content = buildSmartFallback(analysis, description, niche, templateDef);
    }

    console.log('[v2] Content sections:', Object.keys((content.sections as Record<string, unknown>) || {}));

    // Step 3: Images
    const images = await fetchNicheImages(
      niche,
      description,
      templateDef.metadata.sections
    ).catch((err: Error) => {
      console.error('[v2] Image error:', err.message);
      return {} as Record<string, string>;
    });

    console.log('[v2] Images:', Object.keys(images).length);

    const finalConfig = {
      ...(content as Record<string, unknown>),
      theme: palette.theme,
      imagePrompts: images,
      niche,
    };

    return res.status(200).json(finalConfig);
  } catch (err) {
    console.error('[v2] Fatal error:', err);
    return res.status(500).json({ error: 'Generation failed' });
  }
}

function buildFallbackAnalysis(niche: string, description: string): Record<string, unknown> {
  // Try to extract a name from the description
  const words = description.split(/\s+/);
  const nameGuess = words.find((w: string) => w.charAt(0) === w.charAt(0).toUpperCase() && w.length > 3 && !['The', 'This', 'That', 'What', 'When', 'Where', 'With', 'From'].includes(w)) || niche.split(' ').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  return {
    businessName: nameGuess,
    tagline: `${nameGuess} — Trusted ${niche.charAt(0).toUpperCase() + niche.slice(1)}.`,
    tone: 'professional',
    keywords: [niche, 'professional', 'quality', 'service', 'best'],
    subNiche: niche,
    audience: `Clients seeking professional ${niche} services`,
    uniqueSellingPoint: description.slice(0, 150),
    keyProducts: [],
  };
}
