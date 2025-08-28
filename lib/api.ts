import { Affirmation } from './types';

type GenerateParams = {
  type: 'daily' | 'custom';
  userContext?: string;
};

export async function generateAffirmation({ type, userContext }: GenerateParams): Promise<{ text: string }> {
  const url = process.env.EXPO_PUBLIC_API_URL;
  if (!url) {
    throw new Error('Missing EXPO_PUBLIC_API_URL');
  }
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type, userContext }),
  });
  if (!res.ok) {
    const contentType = res.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      try {
        const err = (await res.json()) as { error?: string; message?: string };
        throw new Error(err.error || err.message || `${res.status} ${res.statusText}`);
      } catch {
        // fallthrough to status text below
      }
    }
    throw new Error(`${res.status} ${res.statusText}`);
  }
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
