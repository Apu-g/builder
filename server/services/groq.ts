const GROQ_BASE_URL = 'https://api.groq.com/openai/v1';
const GROQ_MODEL = 'openai/gpt-oss-20b';

export async function callGroq(
  systemPrompt: string,
  userMessage: string,
  options?: { temperature?: number; maxTokens?: number; model?: string }
): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY || '';
  if (!apiKey) {
    throw new Error('No Groq API key configured');
  }

  const response = await fetch(`${GROQ_BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: options?.model || GROQ_MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage },
      ],
      temperature: options?.temperature ?? 0.7,
      max_completion_tokens: options?.maxTokens ?? 4096,
    }),
  });

  if (!response.ok) {
    const errText = await response.text().catch(() => '');
    throw new Error(`Groq API error ${response.status}: ${errText}`);
  }

  const data = (await response.json()) as {
    choices: { message: { content: string } }[];
  };
  return data.choices[0].message.content;
}

function repairJson(s: string): string {
  let open = 0;
  for (const ch of s) {
    if (ch === '{' || ch === '[') open++;
    if (ch === '}' || ch === ']') open--;
  }
  while (open > 0) {
    const last = s[s.length - 1];
    if (last === ',') {
      s = s.slice(0, -1);
    } else {
      s += last === '{' ? '}' : ']';
    }
    open--;
  }
  return s;
}

export function parseJsonResponse(text: string): Record<string, unknown> {
  let cleaned = text.trim();
  if (cleaned.startsWith('<')) {
    const thinkEnd = cleaned.indexOf('</think>');
    if (thinkEnd !== -1) {
      cleaned = cleaned.substring(thinkEnd + 8).trim();
    }
  }
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```(?:json)?\s*\n?/, '').replace(/\n?```\s*$/, '');
  }
  const firstBrace = cleaned.indexOf('{');
  const lastBrace = cleaned.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace > firstBrace) {
    cleaned = cleaned.substring(firstBrace, lastBrace + 1);
  }
  try {
    return JSON.parse(cleaned);
  } catch {
    const repaired = repairJson(cleaned);
    return JSON.parse(repaired);
  }
}
