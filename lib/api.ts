import { Affirmation } from './types';

type GenerateParams = {
  type: 'daily' | 'custom';
  userContext?: string;
};

export async function generateAffirmation({ type, userContext }: GenerateParams): Promise<{ text: string }> {
  const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/affirmation`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type, userContext }),
  });
  if (!res.ok) throw new Error(await res.text());
  const data = (await res.json()) as { text: string };
  return data;
}

export function toAffirmation(raw: { text: string }, sourceType: 'daily' | 'custom', tags?: string[]): Affirmation {
  return {
    id: `${sourceType}-${Date.now()}`,
    text: raw.text,
    createdAt: new Date().toISOString(),
    sourceType,
    ...(tags && tags.length ? { tags } : {}),
  };
}
