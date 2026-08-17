import type { VercelRequest, VercelResponse } from '@vercel/node';
import { callOpenRouter } from './_lib/openrouter.js';
import { callGroq, parseJsonResponse } from './_lib/groq.js';
import { fetchNicheImages } from './_lib/images.js';

// ============================================================
// STEP 1: Business Analysis (small prompt, ~300 tokens output)
// ============================================================
const ANALYSIS_PROMPT = `You are a business analyst. Extract details from a NICHE and DESCRIPTION.

The NICHE is the INDUSTRY (e.g., "law firm", "coffee shop", "gym").
The DESCRIPTION has details about the specific business.

Return ONLY valid JSON:
{
  "businessName": "name from description, or create one fitting the niche",
  "tagline": "3-8 word tagline",
  "tone": "professional|casual|luxury|playful|minimal|bold",
  "subNiche": "specific sub-niche",
  "uniqueSellingPoint": "what makes this different",
  "keyProducts": ["product1","product2","product3"]
}
Return ONLY the JSON.`;

// ============================================================
// STEP 2: Site Content (~500 tokens output)
// ============================================================
const SITE_CONTENT_PROMPT = `Generate website HEADER content for a business. Return ONLY valid JSON:
{
  "brandName": "Business Name",
  "tagline": "Compelling tagline",
  "description": "2-3 sentence description of the business",
  "ctaPrimary": "Action button text specific to the niche",
  "ctaSecondary": "Secondary button text"
}
CTAs must be niche-specific (e.g., law firm: "Schedule Consultation"/"Our Practice Areas", gym: "Start Free Trial"/"See Programs", restaurant: "Reserve a Table"/"View Menu", coffee: "Order Now"/"Our Menu", photography: "Book a Session"/"View Portfolio").
Return ONLY the JSON.`;

// ============================================================
// STEP 3: Section Content (~800 tokens per section)
// ============================================================
function sectionPrompt(sectionId: string, fieldTypeMap: Record<string, string>): string {
  const fields = Object.entries(fieldTypeMap)
    .map(([k, v]) => `  "${k}": "${v}"`)
    .join('\n');

  return `Generate the "${sectionId}" section content for a website. Return ONLY valid JSON:
{
${fields}
}
Rules:
- Each text field must be real, niche-specific content (no placeholders)
- If a field says "string[]" it needs an array of strings
- If a field says "string" it needs a single string
- IDs should be short slugs
- Content should be authentic and professional
Return ONLY the JSON.`;
}

// ============================================================
// Condensed structure extractor
// ============================================================
function extractFieldMap(obj: unknown, prefix = ''): Record<string, string> {
  const result: Record<string, string> = {};
  if (obj === null || obj === undefined) return result;
  if (typeof obj === 'string') { result[prefix || 'value'] = 'string'; return result; }
  if (typeof obj === 'number') { result[prefix || 'value'] = 'number'; return result; }
  if (typeof obj === 'boolean') { result[prefix || 'value'] = 'boolean'; return result; }
  if (Array.isArray(obj)) {
    if (obj.length > 0 && typeof obj[0] === 'object' && obj[0] !== null) {
      result[prefix || 'items'] = 'object[]';
    } else {
      result[prefix || 'items'] = 'string[]';
    }
    return result;
  }
  if (typeof obj === 'object') {
    for (const [key, val] of Object.entries(obj as Record<string, unknown>)) {
      const path = prefix ? `${prefix}.${key}` : key;
      if (typeof val === 'string') result[path] = 'string';
      else if (typeof val === 'number') result[path] = 'number';
      else if (typeof val === 'boolean') result[path] = 'boolean';
      else if (Array.isArray(val)) {
        if (val.length > 0 && typeof val[0] === 'object' && val[0] !== null) result[path] = 'object[]';
        else result[path] = 'string[]';
      }
      else if (typeof val === 'object' && val !== null) {
        const nested = extractFieldMap(val, path);
        Object.assign(result, nested);
      }
    }
  }
  return result;
}

function extractSections(obj: unknown): Record<string, Record<string, string>> {
  const result: Record<string, Record<string, string>> = {};
  if (typeof obj !== 'object' || obj === null) return result;
  for (const [key, val] of Object.entries(obj as Record<string, unknown>)) {
    if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
      result[key] = extractFieldMap(val);
    }
  }
  return result;
}

// ============================================================
// Smart fallback (no AI needed)
// ============================================================
const NICHE_CTAS: Record<string, { primary: string; secondary: string }> = {
  'law': { primary: 'Schedule Consultation', secondary: 'Our Practice Areas' },
  'coffee': { primary: 'Order Now', secondary: 'View Menu' },
  'restaurant': { primary: 'Reserve a Table', secondary: 'View Menu' },
  'gym': { primary: 'Start Free Trial', secondary: 'See Programs' },
  'fitness': { primary: 'Start Free Trial', secondary: 'See Programs' },
  'photo': { primary: 'Book a Session', secondary: 'View Portfolio' },
  'architect': { primary: 'Start Your Project', secondary: 'See Our Work' },
  'ai': { primary: 'Get Early Access', secondary: 'See How It Works' },
  'interior': { primary: 'Book Consultation', secondary: 'View Projects' },
  'fashion': { primary: 'Shop Collection', secondary: 'Our Story' },
  'medical': { primary: 'Book Appointment', secondary: 'Our Services' },
  'health': { primary: 'Book Appointment', secondary: 'Our Services' },
};

function getNicheCtas(niche: string): { primary: string; secondary: string } {
  const lower = niche.toLowerCase();
  for (const [key, ctas] of Object.entries(NICHE_CTAS)) {
    if (lower.includes(key)) return ctas;
  }
  return { primary: 'Get Started', secondary: 'Learn More' };
}

function buildSmartFallback(
  analysis: Record<string, unknown>,
  description: string,
  niche: string,
  templateDef: { defaultContent: Record<string, unknown>; metadata: { sections: string[] } }
): Record<string, unknown> {
  const brandName = (analysis.businessName as string) || niche.split(' ').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const tagline = (analysis.tagline as string) || `${brandName} — Excellence in ${niche}.`;
  const subNiche = (analysis.subNiche as string) || niche;
  const usp = (analysis.uniqueSellingPoint as string) || '';
  const products = (analysis.keyProducts as string[]) || [];
  const ctas = getNicheCtas(niche);

  const site = {
    brandName,
    tagline,
    description: description || `${brandName} is a trusted ${subNiche} dedicated to excellence. ${usp ? `What sets us apart: ${usp}.` : ''}`,
    ctaPrimary: ctas.primary,
    ctaSecondary: ctas.secondary,
  };

  const sections = JSON.parse(JSON.stringify(templateDef.defaultContent.sections || {})) as Record<string, unknown>;

  function fillSection(obj: Record<string, unknown>) {
    for (const [key, val] of Object.entries(obj)) {
      if (typeof val === 'string') {
        const lower = val.toLowerCase();
        if (lower.includes('lorem') || lower.includes('placeholder') || lower.includes('default') || lower.includes('sample') || lower.includes('your ') || lower.includes('roast') || lower.includes('brew') || lower.includes('espresso')) {
          if (!niche.toLowerCase().includes('coffee') && (lower.includes('roast') || lower.includes('brew') || lower.includes('espresso'))) {
            obj[key] = `${brandName} — ${subNiche}`;
          } else if (lower.includes('lorem') || lower.includes('placeholder') || lower.includes('default') || lower.includes('sample') || lower.includes('your ')) {
            obj[key] = `${brandName} delivers exceptional ${subNiche} services.`;
          }
        }
      } else if (Array.isArray(val)) {
        val.forEach((item) => {
          if (typeof item === 'object' && item !== null) fillSection(item as Record<string, unknown>);
        });
      } else if (typeof val === 'object' && val !== null) {
        fillSection(val as Record<string, unknown>);
      }
    }
  }

  for (const [, sectionData] of Object.entries(sections)) {
    if (typeof sectionData === 'object' && sectionData !== null) {
      fillSection(sectionData as Record<string, unknown>);
    }
  }

  return { site, sections };
}

// ============================================================
// Multi-provider call (OpenRouter primary, Groq fallback)
// ============================================================
async function callAI(
  systemPrompt: string,
  userMessage: string,
  options: { temperature?: number; maxTokens?: number } = {}
): Promise<string> {
  // Try OpenRouter first
  try {
    return await callOpenRouter(systemPrompt, userMessage, {
      temperature: options.temperature,
      maxTokens: options.maxTokens,
      model: 'meta-llama/llama-3.3-70b-instruct:free',
    });
  } catch (err) {
    console.warn('[v2] OpenRouter failed, trying Groq:', (err as Error).message);
  }

  // Fallback to Groq
  try {
    return await callGroq(systemPrompt, userMessage, {
      temperature: options.temperature,
      maxTokens: options.maxTokens,
    });
  } catch (err) {
    console.warn('[v2] Groq also failed:', (err as Error).message);
    throw err;
  }
}

// ============================================================
// Lazy-load templates
// ============================================================
async function getTemplateDef(templateId: string) {
  const { getAllTemplates } = await import('../src/templates/index.js');
  return getAllTemplates().find((t) => t.metadata.id === templateId);
}

// ============================================================
// Main handler
// ============================================================
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

    console.log(`[v2] Generating: niche="${niche}", template="${templateId}"`);

    // ── STEP 1: Business Analysis ──
    let analysis: Record<string, unknown>;
    try {
      const analysisResult = await callAI(
        ANALYSIS_PROMPT,
        `NICHE: ${niche}\nDESCRIPTION: ${description}\n${additionalInstructions ? `EXTRA: ${additionalInstructions}` : ''}`,
        { temperature: 0.7, maxTokens: 512 }
      );
      analysis = parseJsonResponse(analysisResult);
      console.log('[v2] Step 1 done:', analysis.businessName);
    } catch (err) {
      console.error('[v2] Step 1 failed:', (err as Error).message);
      analysis = {
        businessName: niche.split(' ').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
        tagline: `Your Trusted ${niche}.`,
        tone: 'professional',
        subNiche: niche,
        uniqueSellingPoint: description.slice(0, 150),
        keyProducts: [],
      };
    }

    // ── STEP 2: Site Content ──
    let siteContent: { brandName: string; tagline: string; description: string; ctaPrimary: string; ctaSecondary: string };
    try {
      const siteResult = await callAI(
        SITE_CONTENT_PROMPT,
        `BUSINESS: ${analysis.businessName}\nNICHE: ${niche}\nSUB-NICHE: ${analysis.subNiche}\nTONE: ${analysis.tone}\nDESCRIPTION: ${description}\n${analysis.uniqueSellingPoint ? `USP: ${analysis.uniqueSellingPoint}` : ''}\n${(analysis.keyProducts as string[])?.length ? `PRODUCTS: ${(analysis.keyProducts as string[]).join(', ')}` : ''}`,
        { temperature: 0.7, maxTokens: 512 }
      );
      siteContent = parseJsonResponse(siteResult) as typeof siteContent;
      console.log('[v2] Step 2 done:', siteContent.brandName);
    } catch (err) {
      console.error('[v2] Step 2 failed:', (err as Error).message);
      const ctas = getNicheCtas(niche);
      siteContent = {
        brandName: (analysis.businessName as string) || niche,
        tagline: (analysis.tagline as string) || `${niche} — Excellence.`,
        description: description || `${(analysis.businessName as string) || niche} is a leading ${niche}.`,
        ctaPrimary: ctas.primary,
        ctaSecondary: ctas.secondary,
      };
    }

    // ── STEP 3: Generate each section individually ──
    const sectionTemplates = extractSections(templateDef.defaultContent);
    const generatedSections: Record<string, unknown> = {};

    for (const [sectionId, fieldMap] of Object.entries(sectionTemplates)) {
      try {
        const sectionResult = await callAI(
          sectionPrompt(sectionId, fieldMap),
          `BUSINESS: ${siteContent.brandName}\nNICHE: ${niche}\nSUB-NICHE: ${analysis.subNiche}\nDESCRIPTION: ${description}\nTONE: ${analysis.tone}\n${analysis.uniqueSellingPoint ? `USP: ${analysis.uniqueSellingPoint}` : ''}\n${(analysis.keyProducts as string[])?.length ? `PRODUCTS: ${(analysis.keyProducts as string[]).join(', ')}` : ''}`,
          { temperature: 0.8, maxTokens: 1024 }
        );
        generatedSections[sectionId] = parseJsonResponse(sectionResult);
        console.log(`[v2] Section "${sectionId}" done`);
      } catch (err) {
        console.error(`[v2] Section "${sectionId}" failed:`, (err as Error).message);
        // Keep template default for this section
        generatedSections[sectionId] = (templateDef.defaultContent as Record<string, unknown>).sections?.[sectionId] || {};
      }
    }

    // ── STEP 4: Images ──
    const images = await fetchNicheImages(niche, description, templateDef.metadata.sections).catch((err) => {
      console.error('[v2] Image error:', err.message);
      return {} as Record<string, string>;
    });

    console.log('[v2] Done. Sections:', Object.keys(generatedSections));

    const finalConfig = {
      site: siteContent,
      sections: generatedSections,
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
