import AsyncStorage from '@react-native-async-storage/async-storage';
import { Affirmation, DailyCache } from './types';

const DAILY_KEY = '@affirmations/daily';
const FAVORITES_KEY = '@affirmations/favorites';

export async function getDailyCache(): Promise<DailyCache | null> {
  try {
    const raw = await AsyncStorage.getItem(DAILY_KEY);
    return raw ? (JSON.parse(raw) as DailyCache) : null;
  } catch {
    return null;
  }
}

export async function setDailyCache(cache: DailyCache): Promise<void> {
  await AsyncStorage.setItem(DAILY_KEY, JSON.stringify(cache));
}

export async function getFavorites(): Promise<Affirmation[]> {
  try {
    const raw = await AsyncStorage.getItem(FAVORITES_KEY);
    return raw ? (JSON.parse(raw) as Affirmation[]) : [];
  } catch {
    return [];
  }
}

export async function saveFavorite(affirmation: Affirmation): Promise<Affirmation[]> {
  const current = await getFavorites();
  const deduped = [affirmation, ...current.filter(a => a.id !== affirmation.id)];
  await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(deduped));
  return deduped;
}

export async function removeFavorite(id: string): Promise<Affirmation[]> {
  const current = await getFavorites();
  const next = current.filter(a => a.id !== id);
  await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
  return next;
}
