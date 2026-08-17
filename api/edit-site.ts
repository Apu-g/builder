import type { VercelRequest, VercelResponse } from '@vercel/node';
import { callGroq, parseJsonResponse } from './_lib/groq.js';

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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

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
    return res.status(200).json(merged);
  } catch (err) {
    console.error('Edit error:', err);
    return res.status(200).json(req.body.currentConfig);
  }
}
