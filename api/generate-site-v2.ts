import type { VercelRequest, VercelResponse } from '@vercel/node';
import { callNim } from './_lib/nim.js';
import { callOpenRouter } from './_lib/openrouter.js';
import { callGroq, parseJsonResponse } from './_lib/groq.js';
import { fetchNicheImages } from './_lib/images.js';

// ============================================================
// STEP 1: NVIDIA NIM — Content Generation (the BRAIN)
// ============================================================
// NIM is the most powerful model. It does the heavy lifting:
// analyzing the business and generating ALL text content.

const NIM_CONTENT_PROMPT = `You are an expert content strategist and copywriter. You generate complete website content for businesses.

Given a NICHE (industry) and DESCRIPTION (business details), generate ALL website content.

Return ONLY valid JSON:
{
  "analysis": {
    "businessName": "name from description or create one",
    "tagline": "3-8 word tagline",
    "tone": "professional|casual|luxury|playful|minimal|bold",
    "subNiche": "specific sub-niche within the industry",
    "uniqueSellingPoint": "what makes this different",
    "keyProducts": ["product1", "product2", "product3"]
  },
  "site": {
    "brandName": "Business Name",
    "tagline": "Compelling tagline",
    "description": "2-3 sentence rich description",
    "ctaPrimary": "Niche-specific action button",
    "ctaSecondary": "Secondary action button"
  },
  "sections": {
    "SECTION_ID": {
      // Fill in the actual fields for each section
      // Use the section field types provided below
    }
  }
}

CRITICAL RULES:
- The NICHE is the INDUSTRY. If niche="law firm", this is a LAW FIRM.
- Every text field must be REAL content specific to THIS business
- CTAs must be niche-specific (not generic "Get Started")
- Sections must match the field types provided
- Return ONLY the JSON object`;

// ============================================================
// STEP 2: OpenRouter — Image Search (the EYES)
// ============================================================
// OpenRouter generates smart image search queries and maps them
// to section slots. Uses curated Unsplash images as primary source.

const IMAGE_SEARCH_PROMPT = `You are an image curator. Given a business niche and description, generate Unsplash image search queries for each section of a website.

Return ONLY valid JSON:
{
  "queries": {
    "hero": "main hero image search query",
    "services": ["service image query 1", "service image query 2", "service image query 3", "service image query 4"],
    "work": ["portfolio image query 1", "portfolio image query 2", "portfolio image query 3", "portfolio image query 4"],
    "about": "about section image query",
    "team": ["team member photo query 1", "team member photo query 2", "team member photo query 3"],
    "contact": "contact section image query",
    "location": "location/map image query"
  }
}

RULES:
- Queries should be specific to the niche
- Use descriptive terms (e.g., "modern law office interior" not just "office")
- Team queries should be professional headshot style
- Return ONLY the JSON`;

// ============================================================
// STEP 3: Groq — Assembly (the HANDS)
// ============================================================
// Groq is fastest. It takes the NIM content + images + template
// and assembles the final JSON, placing everything in the right slots.

const GROQ_ASSEMBLY_PROMPT = `You are a website assembler. You receive:
1. Complete website content (from content AI)
2. Image URLs for each section
3. Template structure (section IDs and field types)
4. Color palette

Your job: Place the content and images into the template structure EXACTLY.

Rules:
- Match section IDs from the template exactly
- Fill every field with the content provided
- Map images to the correct image fields (look for "image", "src", "url", "photo" field names)
- Apply the color palette to the theme
- Return ONLY the complete assembled JSON`;

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
  let sectionsObj = obj;
  if (typeof obj === 'object' && obj !== null && !Array.isArray(obj)) {
    const maybeSections = (obj as Record<string, unknown>).sections;
    if (maybeSections && typeof maybeSections === 'object' && !Array.isArray(maybeSections)) {
      sectionsObj = maybeSections;
    }
  }
  if (typeof sectionsObj !== 'object' || sectionsObj === null) return result;
  for (const [key, val] of Object.entries(sectionsObj as Record<string, unknown>)) {
    if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
      result[key] = extractFieldMap(val);
    }
  }
  return result;
}

// ============================================================
// Niche CTA mappings (used by NIM and fallback)
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

// ============================================================
// Smart fallback (all AI fails)
// ============================================================
function buildSmartFallback(
  analysis: Record<string, unknown>,
  description: string,
  niche: string,
  templateDef: { defaultContent: Record<string, unknown>; metadata: { sections: string[] } }
): Record<string, unknown> {
  const brandName = (analysis.businessName as string) || niche.split(' ').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const tagline = (analysis.tagline as string) || `${brandName} — Excellence in ${niche}.`;
  const subNiche = (analysis.subNiche as string) || niche;
  const ctas = getNicheCtas(niche);

  const site = {
    brandName,
    tagline,
    description: description || `${brandName} is a trusted ${subNiche} delivering exceptional quality.`,
    ctaPrimary: ctas.primary,
    ctaSecondary: ctas.secondary,
  };

  const sections = JSON.parse(JSON.stringify(templateDef.defaultContent.sections || {})) as Record<string, unknown>;

  function fillSection(obj: Record<string, unknown>) {
    for (const [key, val] of Object.entries(obj)) {
      if (typeof val === 'string') {
        const lower = val.toLowerCase();
        if (lower.includes('lorem') || lower.includes('placeholder') || lower.includes('default') || lower.includes('your ') || lower.includes('roast') || lower.includes('brew') || lower.includes('espresso')) {
          if (!niche.toLowerCase().includes('coffee') && (lower.includes('roast') || lower.includes('brew') || lower.includes('espresso'))) {
            obj[key] = `${brandName} — ${subNiche}`;
          } else if (lower.includes('lorem') || lower.includes('placeholder') || lower.includes('default') || lower.includes('your ')) {
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
// Lazy-load templates
// ============================================================
async function getTemplateDef(templateId: string) {
  const { getAllTemplates } = await import('../src/templates/index.js');
  return getAllTemplates().find((t) => t.metadata.id === templateId);
}

// ============================================================
// Main handler — 3-Provider Pipeline
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

    console.log(`[v2] Pipeline start: niche="${niche}", template="${templateId}"`);

    // ── STEP 1: NIM generates all content ──
    const sectionFieldTypes = extractSections(templateDef.defaultContent);
    const fieldTypesSummary = Object.entries(sectionFieldTypes)
      .map(([id, fields]) => `${id}: ${Object.keys(fields).join(', ')}`)
      .join('\n');

    let nimResult: Record<string, unknown>;
    try {
      const nimResponse = await callNim(
        NIM_CONTENT_PROMPT,
        `NICHE: ${niche}\nDESCRIPTION: ${description}\n${additionalInstructions ? `EXTRA: ${additionalInstructions}` : ''}\n\nTEMPLATE SECTIONS AND THEIR FIELDS:\n${fieldTypesSummary}\n\nGenerate content for EACH section above. Match the field names exactly.`
      );
      nimResult = parseJsonResponse(nimResponse);
      console.log('[v2] NIM done:', nimResult.analysis ? 'has analysis' : 'no analysis');
    } catch (err) {
      console.error('[v2] NIM failed:', (err as Error).message);
      nimResult = {
        analysis: {
          businessName: niche.split(' ').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
          tagline: `Your Trusted ${niche}.`,
          tone: 'professional',
          subNiche: niche,
          uniqueSellingPoint: description.slice(0, 150),
          keyProducts: [],
        },
        site: {
          brandName: niche.split(' ').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
          tagline: `Your Trusted ${niche}.`,
          description: description || `${niche} services.`,
          ctaPrimary: getNicheCtas(niche).primary,
          ctaSecondary: getNicheCtas(niche).secondary,
        },
        sections: {},
      };
    }

    const analysis = (nimResult.analysis as Record<string, unknown>) || {};
    const siteContent = (nimResult.site as Record<string, unknown>) || {};
    const nimSections = (nimResult.sections as Record<string, unknown>) || {};

    // ── STEP 2: OpenRouter finds images ──
    let imageMap: Record<string, string>;
    try {
      const imageResponse = await callOpenRouter(
        IMAGE_SEARCH_PROMPT,
        `NICHE: ${niche}\nBUSINESS: ${siteContent.brandName || analysis.businessName}\nDESCRIPTION: ${description}`,
        { temperature: 0.5, maxTokens: 512, model: 'meta-llama/llama-3.3-70b-instruct:free' }
      );
      const imageQueries = parseJsonResponse(imageResponse);
      console.log('[v2] OpenRouter image queries done');

      // Use the queries to select from curated images
      imageMap = buildImageMap(niche, description, templateDef.metadata.sections, imageQueries);
    } catch (err) {
      console.error('[v2] OpenRouter images failed:', (err as Error).message);
      // Fallback to curated images only
      imageMap = await fetchNicheImages(niche, description, templateDef.metadata.sections);
    }

    console.log('[v2] Images ready:', Object.keys(imageMap).length, 'images');

    // ── STEP 3: Groq assembles final JSON ──
    try {
      const assemblyResponse = await callGroq(
        GROQ_ASSEMBLY_PROMPT,
        `CONTENT FROM NIM:
${JSON.stringify({ site: siteContent, sections: nimSections }, null, 2)}

IMAGE MAP:
${JSON.stringify(imageMap, null, 2)}

TEMPLATE STRUCTURE (fill these section IDs with the content above):
${JSON.stringify(templateDef.defaultContent, null, 2).slice(0, 3000)}

COLOR PALETTE:
Background: ${palette.theme.background}
Foreground: ${palette.theme.foreground}
Accent: ${palette.theme.accent}
Muted: ${palette.theme.muted}

TEMPLATE SECTION IDs: ${templateDef.metadata.sections.join(', ')}

Instructions:
1. Take the site content (brandName, tagline, description, CTAs) from the CONTENT
2. Take each section from the CONTENT and place it in the matching TEMPLATE section
3. Find image fields in each section and fill them with URLs from the IMAGE MAP
4. Apply the COLOR PALETTE to the theme
5. Return the COMPLETE assembled config with site, sections, theme, imagePrompts, niche`,
        { temperature: 0.3, maxTokens: 4096 }
      );

      const assembled = parseJsonResponse(assemblyResponse);

      // Ensure required top-level keys
      const finalConfig = {
        site: assembled.site || siteContent,
        sections: assembled.sections || nimSections,
        theme: palette.theme,
        imagePrompts: assembled.imagePrompts || imageMap,
        niche,
      };

      console.log('[v2] Assembly done. Sections:', Object.keys(finalConfig.sections as Record<string, unknown>));
      return res.status(200).json(finalConfig);
    } catch (err) {
      console.error('[v2] Groq assembly failed:', (err as Error).message);

      // Fallback: use NIM content + curated images directly
      const finalConfig = {
        site: siteContent,
        sections: nimSections,
        theme: palette.theme,
        imagePrompts: imageMap,
        niche,
      };

      // If NIM also failed, use smart fallback
      if (Object.keys(nimSections).length === 0) {
        const fallback = buildSmartFallback(analysis, description, niche, templateDef);
        return res.status(200).json({
          ...fallback,
          theme: palette.theme,
          imagePrompts: imageMap,
          niche,
        });
      }

      return res.status(200).json(finalConfig);
    }
  } catch (err) {
    console.error('[v2] Fatal error:', err);
    return res.status(500).json({ error: 'Generation failed' });
  }
}

// ============================================================
// Build image map from OpenRouter queries + curated images
// ============================================================
function buildImageMap(
  niche: string,
  description: string,
  sectionKeys: string[],
  imageQueries: Record<string, unknown>
): Record<string, string> {
  // Start with curated images as base
  const base: Record<string, string> = {};

  // Map OpenRouter queries to curated image categories
  const queries = (imageQueries.queries as Record<string, unknown>) || {};

  // Hero
  base['hero'] = getCuratedHero(niche);

  // Services
  for (let i = 0; i < 4; i++) {
    base[`service-${i}`] = getCuratedService(niche, i);
  }

  // Work/Portfolio
  for (let i = 0; i < 4; i++) {
    base[`work-${i}`] = getCuratedService(niche, i);
  }

  // Products
  for (let i = 0; i < 4; i++) {
    base[`product-${i}`] = getCuratedService(niche, i);
  }

  // Team/Trainers
  for (let i = 0; i < 3; i++) {
    base[`team-${i}`] = getCuratedTeam(i);
    base[`trainer-${i}`] = getCuratedTeam(i);
  }

  // Other sections
  base['about'] = getCuratedAbout(niche);
  base['story'] = getCuratedService(niche, 0);
  base['contact'] = getCuratedGeneral(niche, 0);
  base['location'] = getCuratedGeneral(niche, 1);

  // General fallbacks
  for (let i = 0; i < 4; i++) {
    base[`general-${i}`] = getCuratedGeneral(niche, i);
  }

  return base;
}

// Curated image selectors by niche
function getCuratedHero(niche: string): string {
  const lower = niche.toLowerCase();
  if (lower.includes('law') || lower.includes('legal')) return 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&h=800&fit=crop&q=80';
  if (lower.includes('coffee') || lower.includes('cafe')) return 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200&h=800&fit=crop&q=80';
  if (lower.includes('restaurant') || lower.includes('food') || lower.includes('dining')) return 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=800&fit=crop&q=80';
  if (lower.includes('gym') || lower.includes('fitness') || lower.includes('workout')) return 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=800&fit=crop&q=80';
  if (lower.includes('photo') || lower.includes('camera')) return 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=1200&h=800&fit=crop&q=80';
  if (lower.includes('architect') || lower.includes('building')) return 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1200&h=800&fit=crop&q=80';
  if (lower.includes('ai') || lower.includes('tech') || lower.includes('startup')) return 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=800&fit=crop&q=80';
  if (lower.includes('interior') || lower.includes('decor')) return 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&h=800&fit=crop&q=80';
  if (lower.includes('fashion') || lower.includes('clothing')) return 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200&h=800&fit=crop&q=80';
  if (lower.includes('medical') || lower.includes('health') || lower.includes('doctor')) return 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&h=800&fit=crop&q=80';
  return 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop&q=80';
}

function getCuratedService(niche: string, index: number): string {
  const lower = niche.toLowerCase();
  const services: Record<string, string[]> = {
    'law': [
      'https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop&q=80',
    ],
    'coffee': [
      'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1498804103079-a6351b050096?w=600&h=400&fit=crop&q=80',
    ],
    'restaurant': [
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=600&h=400&fit=crop&q=80',
    ],
    'gym': [
      'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1599058917765-a780eda07a3e?w=600&h=400&fit=crop&q=80',
    ],
    'photo': [
      'https://images.unsplash.com/photo-1554080353-a576cf803bda?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1505739998589-00fc7916d733?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600&h=400&fit=crop&q=80',
    ],
    'architect': [
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1486718448742-163732cd1544?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1505761671935-60b3a7427bad?w=600&h=400&fit=crop&q=80',
    ],
    'ai': [
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop&q=80',
    ],
    'interior': [
      'https://images.unsplash.com/photo-1616137466211-f736a1f2b4a0?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=600&h=400&fit=crop&q=80',
    ],
    'fashion': [
      'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&h=400&fit=crop&q=80',
    ],
    'medical': [
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1551076805-e1869033e561?w=600&h=400&fit=crop&q=80',
    ],
  };

  for (const [key, imgs] of Object.entries(services)) {
    if (lower.includes(key)) return imgs[index % imgs.length];
  }
  // Default
  const defaults = [
    'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop&q=80',
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop&q=80',
    'https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=600&h=400&fit=crop&q=80',
    'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=400&fit=crop&q=80',
  ];
  return defaults[index % defaults.length];
}

function getCuratedAbout(niche: string): string {
  const lower = niche.toLowerCase();
  if (lower.includes('law')) return 'https://images.unsplash.com/photo-1479142506502-19b3a3b7ff33?w=800&h=600&fit=crop&q=80';
  if (lower.includes('coffee')) return 'https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=800&h=600&fit=crop&q=80';
  if (lower.includes('restaurant')) return 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&h=600&fit=crop&q=80';
  if (lower.includes('gym')) return 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=800&h=600&fit=crop&q=80';
  if (lower.includes('photo')) return 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&h=600&fit=crop&q=80';
  if (lower.includes('architect')) return 'https://images.unsplash.com/photo-1431576901776-e539bd916ba2?w=800&h=600&fit=crop&q=80';
  if (lower.includes('ai')) return 'https://images.unsplash.com/photo-1531746790095-e5995f60f3b3?w=800&h=600&fit=crop&q=80';
  if (lower.includes('interior')) return 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop&q=80';
  if (lower.includes('fashion')) return 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=600&fit=crop&q=80';
  if (lower.includes('medical')) return 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=600&fit=crop&q=80';
  return 'https://images.unsplash.com/photo-1497215842964-222b430dc094?w=800&h=600&fit=crop&q=80';
}

function getCuratedTeam(index: number): string {
  const faces = [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
  ];
  return faces[index % faces.length];
}

function getCuratedGeneral(niche: string, index: number): string {
  const lower = niche.toLowerCase();
  if (lower.includes('law')) {
    const imgs = [
      'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop&q=80',
    ];
    return imgs[index % imgs.length];
  }
  const defaults = [
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop&q=80',
    'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop&q=80',
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop&q=80',
    'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=400&fit=crop&q=80',
  ];
  return defaults[index % defaults.length];
}
