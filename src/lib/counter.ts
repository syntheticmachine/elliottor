// Tiny public play-counter backed by https://abacus.jasoncameron.dev/
// No auth, no API keys. Free for low volume. If the service is ever
// unavailable, every function here returns null and the UI just hides
// the count — game functionality is never impacted.

const NAMESPACE = 'elliottor';
const KEY = 'plays';
const BASE = 'https://abacus.jasoncameron.dev';

type AbacusResponse = { value: number };

async function fetchJson(url: string): Promise<AbacusResponse | null> {
  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return null;
    const data = (await res.json()) as Partial<AbacusResponse>;
    if (typeof data?.value === 'number') return data as AbacusResponse;
    return null;
  } catch {
    return null;
  }
}

/** Get the current play count without incrementing. */
export async function getPlayCount(): Promise<number | null> {
  const data = await fetchJson(`${BASE}/get/${NAMESPACE}/${KEY}`);
  return data?.value ?? null;
}

/** Atomically increment and return the new value. */
export async function incrementPlayCount(): Promise<number | null> {
  const data = await fetchJson(`${BASE}/hit/${NAMESPACE}/${KEY}`);
  return data?.value ?? null;
}
