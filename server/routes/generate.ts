import { Router, Request, Response } from 'express';
import { callNim } from '../services/nim.js';
import { callGroq, parseJsonResponse } from '../services/groq.js';
import { callOpenRouter } from '../services/openrouter.js';
import { fetchNicheImages } from '../services/images.js';
import { getAllTemplates } from '../../src/templates/index.js';

export const generateRouter = Router();

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

async function callAI(
  systemPrompt: string,
  userMessage: string,
  options: { temperature?: number; maxTokens?: number } = {}
): Promise<string> {
  try {
    return await callOpenRouter(systemPrompt, userMessage, {
      temperature: options.temperature,
      maxTokens: options.maxTokens,
      model: 'meta-llama/llama-3.3-70b-instruct:free',
    });
  } catch (err) {
    console.warn('[v2] OpenRouter failed, trying Groq:', (err as Error).message);
  }
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

generateRouter.post('/generate-site-v2', async (req: Request, res: Response) => {
  try {
    const { templateId, niche, palette, description, additionalInstructions } = req.body;

    const templates = getAllTemplates();
    const templateDef = templates.find((t) => t.metadata.id === templateId);
    if (!templateDef) {
      res.status(400).json({ error: 'Template not found' });
      return;
    }

    console.log(`[v2] Generating: niche="${niche}", template="${templateId}"`);

    // Step 1: Analysis
    let analysis: Record<string, unknown>;
    try {
      const r = await callAI(ANALYSIS_PROMPT, `NICHE: ${niche}\nDESCRIPTION: ${description}\n${additionalInstructions ? `EXTRA: ${additionalInstructions}` : ''}`, { temperature: 0.7, maxTokens: 512 });
      analysis = parseJsonResponse(r);
      console.log('[v2] Step 1:', analysis.businessName);
    } catch {
      analysis = { businessName: niche.split(' ').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' '), tagline: `Your Trusted ${niche}.`, tone: 'professional', subNiche: niche, uniqueSellingPoint: description.slice(0, 150), keyProducts: [] };
    }

    // Step 2: Site content
    let siteContent: { brandName: string; tagline: string; description: string; ctaPrimary: string; ctaSecondary: string };
    try {
      const r = await callAI(SITE_CONTENT_PROMPT, `BUSINESS: ${analysis.businessName}\nNICHE: ${niche}\nSUB-NICHE: ${analysis.subNiche}\nTONE: ${analysis.tone}\nDESCRIPTION: ${description}\n${analysis.uniqueSellingPoint ? `USP: ${analysis.uniqueSellingPoint}` : ''}`, { temperature: 0.7, maxTokens: 512 });
      siteContent = parseJsonResponse(r) as typeof siteContent;
      console.log('[v2] Step 2:', siteContent.brandName);
    } catch {
      const ctas = getNicheCtas(niche);
      siteContent = { brandName: (analysis.businessName as string) || niche, tagline: (analysis.tagline as string) || `${niche} — Excellence.`, description: description || `${niche} services.`, ctaPrimary: ctas.primary, ctaSecondary: ctas.secondary };
    }

    // Step 3: Each section
    const sectionTemplates = extractSections(templateDef.defaultContent);
    const generatedSections: Record<string, unknown> = {};
    for (const [sectionId, fieldMap] of Object.entries(sectionTemplates)) {
      try {
        const r = await callAI(sectionPrompt(sectionId, fieldMap), `BUSINESS: ${siteContent.brandName}\nNICHE: ${niche}\nSUB-NICHE: ${analysis.subNiche}\nDESCRIPTION: ${description}\nTONE: ${analysis.tone}`, { temperature: 0.8, maxTokens: 1024 });
        generatedSections[sectionId] = parseJsonResponse(r);
        console.log(`[v2] Section "${sectionId}" done`);
      } catch {
        generatedSections[sectionId] = (templateDef.defaultContent as Record<string, unknown>).sections?.[sectionId] || {};
      }
    }

    // Step 4: Images
    const images = await fetchNicheImages(niche, description, templateDef.metadata.sections).catch(() => ({} as Record<string, string>));

    res.json({ site: siteContent, sections: generatedSections, theme: palette.theme, imagePrompts: images, niche });
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
    if (!templateDef) { res.status(400).json({ error: 'Template not found' }); return; }

    const userMessage = `Template: ${templateDef.metadata.name}\nSections: ${templateDef.metadata.sections.join(', ')}\nDefault content: ${JSON.stringify(templateDef.defaultContent, null, 2)}\nNiche: ${niche}\nPalette: ${palette.name}\nDescription: ${description}\n${additionalInstructions ? `Extra: ${additionalInstructions}` : ''}`;
    const response = await callNim(GENERATE_SYSTEM_PROMPT, userMessage);
    const parsed = parseJsonResponse(response);
    res.json({ ...parsed, theme: palette.theme });
  } catch (err) {
    console.error('Generate error:', err);
    const { templateId, palette, niche, description } = req.body;
    const templates = getAllTemplates();
    const templateDef = templates.find((t) => t.metadata.id === templateId);
    if (templateDef) {
      res.json({ site: { brandName: niche, tagline: '', description: description || '', ctaPrimary: 'Get Started', ctaSecondary: 'Learn More' }, theme: palette.theme, sections: (templateDef.defaultContent as Record<string, unknown>).sections || {}, imagePrompts: {} });
    } else {
      res.status(500).json({ error: 'Generation failed' });
    }
  }
});

const GENERATE_SYSTEM_PROMPT = `You are a senior web designer. Modify EXISTING website templates based on user requirements. Keep ALL sections and IDs. Rewrite text to match the niche. Return ONLY valid JSON.`;

generateRouter.post('/edit-site', async (req: Request, res: Response) => {
  try {
    const { currentConfig, change } = req.body;
    const userMessage = `Current:\n${JSON.stringify(currentConfig, null, 2)}\n\nChange: ${change}\n\nReturn only changed fields as JSON.`;
    const response = await callGroq(EDIT_SYSTEM_PROMPT, userMessage, { temperature: 0.5, maxTokens: 2048 });
    let parsed: Record<string, unknown>;
    try { parsed = parseJsonResponse(response); } catch { parsed = {}; }
    res.json(deepMerge(currentConfig as Record<string, unknown>, parsed));
  } catch (err) {
    console.error('Edit error:', err);
    res.json(req.body.currentConfig);
  }
});

const EDIT_SYSTEM_PROMPT = `You are a senior web designer. Return a JSON object with ONLY fields that need to change. Never remove sections.`;
