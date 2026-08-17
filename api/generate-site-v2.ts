import type { VercelRequest, VercelResponse } from '@vercel/node';
import { callNim } from './_lib/nim.js';
import { callOpenRouter } from './_lib/openrouter.js';
import { parseJsonResponse } from './_lib/groq.js';

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

const IMAGE_SEARCH_PROMPT = `You are an image curator. Given a business niche, generate Unsplash search queries.

Return ONLY valid JSON:
{
  "hero": "search query for hero",
  "services": ["query1", "query2", "query3", "query4"],
  "team": ["headshot query1", "headshot query2", "headshot query3"],
  "about": "about section query",
  "general": ["generic query1", "generic query2"]
}`;

// ============================================================
// Helpers
// ============================================================
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
      const fields: Record<string, string> = {};
      for (const [fk, fv] of Object.entries(val as Record<string, unknown>)) {
        if (typeof fv === 'string') fields[fk] = 'string';
        else if (typeof fv === 'number') fields[fk] = 'number';
        else if (Array.isArray(fv)) fields[fk] = fv.length > 0 && typeof fv[0] === 'object' ? 'object[]' : 'string[]';
        else if (typeof fv === 'object' && fv !== null) fields[fk] = 'object';
        else fields[fk] = typeof fv;
      }
      result[key] = fields;
    }
  }
  return result;
}

const NICHE_CTAS: Record<string, { primary: string; secondary: string }> = {
  law: { primary: 'Schedule Consultation', secondary: 'Our Practice Areas' },
  coffee: { primary: 'Order Now', secondary: 'View Menu' },
  restaurant: { primary: 'Reserve a Table', secondary: 'View Menu' },
  gym: { primary: 'Start Free Trial', secondary: 'See Programs' },
  fitness: { primary: 'Start Free Trial', secondary: 'See Programs' },
  photo: { primary: 'Book a Session', secondary: 'View Portfolio' },
  architect: { primary: 'Start Your Project', secondary: 'See Our Work' },
  ai: { primary: 'Get Early Access', secondary: 'See How It Works' },
  interior: { primary: 'Book Consultation', secondary: 'View Projects' },
  fashion: { primary: 'Shop Collection', secondary: 'Our Story' },
  medical: { primary: 'Book Appointment', secondary: 'Our Services' },
  health: { primary: 'Book Appointment', secondary: 'Our Services' },
};

function getNicheCtas(niche: string) {
  const lower = niche.toLowerCase();
  for (const [key, ctas] of Object.entries(NICHE_CTAS)) {
    if (lower.includes(key)) return ctas;
  }
  return { primary: 'Get Started', secondary: 'Learn More' };
}

// ============================================================
// Curated image maps (instant, no API needed)
// ============================================================
const HERO_IMAGES: Record<string, string> = {
  law: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&h=800&fit=crop&q=80',
  coffee: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200&h=800&fit=crop&q=80',
  restaurant: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=800&fit=crop&q=80',
  gym: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=800&fit=crop&q=80',
  photo: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=1200&h=800&fit=crop&q=80',
  architect: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1200&h=800&fit=crop&q=80',
  ai: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=800&fit=crop&q=80',
  interior: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&h=800&fit=crop&q=80',
  fashion: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200&h=800&fit=crop&q=80',
  medical: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&h=800&fit=crop&q=80',
};
const DEFAULT_HERO = 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop&q=80';

const SERVICE_IMAGES: Record<string, string[]> = {
  law: ['photo-1589994965851-a8f479c573a9', 'photo-1450101499163-c8848c66ca85', 'photo-1505664194779-8beaceb93744', 'photo-1554224155-6726b3ff858f'],
  coffee: ['photo-1511920170033-f8396924c348', 'photo-1509042239860-f550ce710b93', 'photo-1485808191679-5f86510681a2', 'photo-1498804103079-a6351b050096'],
  restaurant: ['photo-1504674900247-0877df9cc836', 'photo-1540189549336-e6e99c3679fe', 'photo-1565299624946-b28f40a0ae38', 'photo-1482049016688-2d3e1b311543'],
  gym: ['photo-1581009146145-b5ef050c2e1e', 'photo-1574680096145-d05b474e2155', 'photo-1518611012118-696072aa579a', 'photo-1599058917765-a780eda07a3e'],
  photo: ['photo-1554080353-a576cf803bda', 'photo-1505739998589-00fc7916d733', 'photo-1471341971476-ae15ff5dd4ea', 'photo-1502920917128-1aa500764cbd'],
  architect: ['photo-1503387762-592deb58ef4e', 'photo-1545558014-8692077e9b5c', 'photo-1486718448742-163732cd1544', 'photo-1505761671935-60b3a7427bad'],
  ai: ['photo-1558494949-ef010cbdcc31', 'photo-1551288049-bebda4e38f71', 'photo-1526374965328-7f61d4dc18c5', 'photo-1518770660439-4636190af475'],
  interior: ['photo-1616137466211-f736a1f2b4a0', 'photo-1586023492125-27b2c045efd7', 'photo-1600585154340-be6161a56a0c', 'photo-1615529328331-f8917597711f'],
  fashion: ['photo-1558171813-4c088753af8f', 'photo-1441986300917-64674bd600d8', 'photo-1469334031218-e382a71b716b', 'photo-1556905055-8f358a7a47b2'],
  medical: ['photo-1576091160550-2173dba999ef', 'photo-1559757175-5700dde675bc', 'photo-1579684385127-1ef15d508118', 'photo-1551076805-e1869033e561'],
};
const DEFAULT_SERVICES = ['photo-1552664730-d307ca884978', 'photo-1522071820081-009f0129c71c', 'photo-1553028826-f4804a6dba3b', 'photo-1542744173-8e7e53415bb0'];

const TEAM_FACES = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
];

function buildCuratedImages(niche: string, sectionKeys: string[]): Record<string, string> {
  const lower = niche.toLowerCase();
  const map: Record<string, string> = {};
  let heroKey = 'default';
  for (const k of Object.keys(HERO_IMAGES)) { if (lower.includes(k)) { heroKey = k; break; } }
  map['hero'] = HERO_IMAGES[heroKey] || DEFAULT_HERO;

  let svcKey = 'default';
  for (const k of Object.keys(SERVICE_IMAGES)) { if (lower.includes(k)) { svcKey = k; break; } }
  const svcs = SERVICE_IMAGES[svcKey] || DEFAULT_SERVICES;

  for (let i = 0; i < 4; i++) {
    map[`service-${i}`] = `https://images.unsplash.com/${svcs[i % svcs.length]}?w=600&h=400&fit=crop&q=80`;
    map[`work-${i}`] = `https://images.unsplash.com/${svcs[i % svcs.length]}?w=600&h=400&fit=crop&q=80`;
    map[`product-${i}`] = `https://images.unsplash.com/${svcs[i % svcs.length]}?w=600&h=400&fit=crop&q=80`;
  }
  for (let i = 0; i < 3; i++) map[`team-${i}`] = TEAM_FACES[i];
  map['about'] = `https://images.unsplash.com/${svcs[0]}?w=800&h=600&fit=crop&q=80`;
  for (let i = 0; i < 4; i++) map[`general-${i}`] = `https://images.unsplash.com/${svcs[i % svcs.length]}?w=600&h=400&fit=crop&q=80`;
  map['contact'] = map['general-0'];
  map['location'] = map['general-1'];

  return map;
}

// ============================================================
// Code-based assembly (replaces Groq assembly step)
// ============================================================
function assembleSite(
  nimSections: Record<string, unknown>,
  siteContent: Record<string, unknown>,
  imageMap: Record<string, string>,
  templateDef: { defaultContent: Record<string, unknown>; metadata: { sections: string[] } },
  theme: Record<string, string>
): Record<string, unknown> {
  const templateSections = (templateDef.defaultContent as Record<string, unknown>).sections as Record<string, unknown> || {};
  const result: Record<string, unknown> = {};

  for (const sectionId of templateDef.metadata.sections) {
    const template = templateSections[sectionId];
    const nimData = nimSections[sectionId] as Record<string, unknown> | undefined;

    if (typeof template !== 'object' || template === null) continue;
    const deep = JSON.parse(JSON.stringify(template)) as Record<string, unknown>;

    if (nimData && typeof nimData === 'object') {
      for (const [k, v] of Object.entries(nimData)) {
        if (k in deep && typeof v !== 'object' && v !== null) {
          deep[k] = v;
        }
      }
    }

    // Fill image fields
    let imageIdx = 0;
    for (const [k, v] of Object.entries(deep)) {
      if (typeof v === 'string' && v.includes('unsplash.com')) {
        if (k === 'image' || k === 'src' || k === 'url' || k === 'photo' || k === 'backgroundImage') {
          if (imageMap['hero'] && imageIdx === 0) { deep[k] = imageMap['hero']; }
          else { deep[k] = imageMap[`service-${imageIdx % 4}`] || imageMap['general-0']; }
          imageIdx++;
        }
      }
      if (Array.isArray(v)) {
        for (let i = 0; i < v.length; i++) {
          const item = v[i];
          if (typeof item === 'object' && item !== null) {
            for (const [ik, iv] of Object.entries(item as Record<string, unknown>)) {
              if (typeof iv === 'string' && iv.includes('unsplash.com')) {
                (item as Record<string, unknown>)[ik] = imageMap[`service-${i % 4}`] || imageMap[`general-${i % 4}`];
              }
              if (ik === 'image' || ik === 'src' || ik === 'url' || ik === 'photo') {
                if (typeof iv === 'string' && (iv.includes('unsplash.com') || iv === '')) {
                  (item as Record<string, unknown>)[ik] = imageMap[`service-${i % 4}`] || imageMap[`general-${i % 4}`];
                }
              }
            }
            // team images
            if ((item as Record<string, unknown>).image && imageMap[`team-${i}`]) {
              (item as Record<string, unknown>).image = imageMap[`team-${i}`];
            }
          }
        }
      }
    }
    result[sectionId] = deep;
  }

  return { site: siteContent, sections: result, theme, imagePrompts: imageMap };
}

// ============================================================
// Main handler — Parallel 2-provider pipeline
// ============================================================
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { templateId, niche, palette, description, additionalInstructions } = req.body;

    const { getAllTemplates } = await import('../src/templates/index.js');
    const templateDef = getAllTemplates().find((t) => t.metadata.id === templateId);
    if (!templateDef) return res.status(400).json({ error: 'Template not found' });

    console.log(`[v2] Start: niche="${niche}", template="${templateId}"`);

    const sectionFieldTypes = extractSections(templateDef.defaultContent);
    const fieldTypesSummary = Object.entries(sectionFieldTypes)
      .map(([id, fields]) => `${id}: ${Object.keys(fields).join(', ')}`)
      .join('\n');

    // Run NIM + OpenRouter in PARALLEL (independent calls)
    const [nimResult, imageMap] = await Promise.all([
      // NIM: content generation
      (async () => {
        try {
          const resp = await callNim(
            NIM_CONTENT_PROMPT,
            `NICHE: ${niche}\nDESCRIPTION: ${description}\n${additionalInstructions ? `EXTRA: ${additionalInstructions}` : ''}\n\nTEMPLATE SECTIONS AND THEIR FIELDS:\n${fieldTypesSummary}\n\nGenerate content for EACH section above. Match the field names exactly.`,
            { temperature: 0.7, maxTokens: 4096 }
          );
          const parsed = parseJsonResponse(resp);
          console.log('[v2] NIM done');
          return parsed;
        } catch (err) {
          console.error('[v2] NIM failed:', (err as Error).message);
          const ctas = getNicheCtas(niche);
          const bn = niche.split(' ').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
          return {
            analysis: { businessName: bn, tagline: `Your Trusted ${niche}.`, subNiche: niche },
            site: { brandName: bn, tagline: `Your Trusted ${niche}.`, description: description || `${bn} services.`, ctaPrimary: ctas.primary, ctaSecondary: ctas.secondary },
            sections: {} as Record<string, unknown>,
          };
        }
      })(),
      // OpenRouter: image curation (optional, falls back to curated)
      (async () => {
        try {
          const resp = await callOpenRouter(
            IMAGE_SEARCH_PROMPT,
            `NICHE: ${niche}\nDESCRIPTION: ${description}`,
            { temperature: 0.5, maxTokens: 512 }
          );
          const parsed = parseJsonResponse(resp);
          console.log('[v2] OpenRouter done');
          // Use curated images regardless (faster, reliable)
          return buildCuratedImages(niche, templateDef.metadata.sections);
        } catch {
          return buildCuratedImages(niche, templateDef.metadata.sections);
        }
      })(),
    ]);

    console.log('[v2] Both providers done, assembling...');

    // Code-based assembly (no Groq call needed!)
    const analysis = (nimResult.analysis as Record<string, unknown>) || {};
    const siteContent = (nimResult.site as Record<string, unknown>) || {};
    const nimSections = (nimResult.sections as Record<string, unknown>) || {};

    const finalConfig = assembleSite(
      nimSections,
      siteContent,
      imageMap,
      templateDef,
      palette.theme
    );

    finalConfig.niche = niche;

    console.log('[v2] Done. Sections:', Object.keys(finalConfig.sections as Record<string, unknown>));
    return res.status(200).json(finalConfig);

  } catch (err) {
    console.error('[v2] Fatal error:', err);
    return res.status(500).json({ error: 'Generation failed' });
  }
}
