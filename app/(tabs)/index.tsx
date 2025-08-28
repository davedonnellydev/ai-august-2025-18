import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Alert, Platform, Pressable, Share, StyleSheet, Text, ToastAndroid, View } from 'react-native';
import { generateAffirmation, toAffirmation } from '../../lib/api';
import { getDailyCache, saveFavorite, setDailyCache } from '../../lib/storage';
import { Affirmation, DailyCache } from '../../lib/types';
import AffirmationCard from '../components/AffirmationCard';

function getTodayLocalISODate(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function formatTodayLabel(): string {
  const now = new Date();
  const weekday = now.toLocaleDateString(undefined, { weekday: 'short' });
  const day = now.toLocaleDateString(undefined, { day: '2-digit' });
  const month = now.toLocaleDateString(undefined, { month: 'long' });
  return `${weekday}, ${day} ${month}`;
}

export default function HomeScreen() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [affirmation, setAffirmation] = useState<Affirmation | null>(null);
  const lastRegenerateRef = useRef<number>(0);

  const todayDate = useMemo(() => getTodayLocalISODate(), []);

  const showToast = (message: string) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      Alert.alert(message);
    }
  };

  const loadDaily = async (force: boolean) => {
    try {
      setLoading(true);
      setError(null);
      if (!force) {
        const cache: DailyCache | null = await getDailyCache();
        if (cache?.date === todayDate) {
          setAffirmation(cache.affirmation);
          setLoading(false);
          return;
        }
      }
      const raw = await generateAffirmation({ type: 'daily' });
      const aff = toAffirmation(raw, 'daily');
      await setDailyCache({ date: todayDate, affirmation: aff });
      setAffirmation(aff);
    } catch (e: any) {
      setError(e?.message ?? 'Failed to load daily affirmation');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!mounted) return;
      await loadDaily(false);
    })();
    return () => {
      mounted = false;
    };
  }, [todayDate]);

  const handleRegenerate = () => {
    const now = Date.now();
    if (now - lastRegenerateRef.current < 3000) {
      showToast('Please wait a moment before regenerating again');
      return;
    }
    Alert.alert('Regenerate daily affirmation?', 'This will replace today\'s affirmation.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Regenerate',
        style: 'destructive',
        onPress: async () => {
          lastRegenerateRef.current = Date.now();
          await loadDaily(true);
        },
      },
    ]);
  };

  const handleSave = async (aff: Affirmation) => {
    await saveFavorite(aff);
    showToast('Saved to favorites');
  };

  const handleCopy = async (text: string) => {
    try {
      const Clipboard = await import('expo-clipboard');
      await Clipboard.setStringAsync(text);
      Alert.alert('Copied');
    } catch {
      Alert.alert('Copy failed', 'Install expo-clipboard to enable copy');
    }
  };

  const handleShare = async (text: string) => {
    try {
      await Share.share({ message: text });
    } catch {
      // no-op
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
        <Pressable style={[styles.button, styles.primary]} onPress={() => loadDaily(false)}>
          <Text style={styles.primaryLabel}>Retry</Text>
        </Pressable>
      </View>
    );
  }

  if (!affirmation) {
    return (
      <View style={styles.center}>
        <Text>No affirmation available.</Text>
        <Pressable style={[styles.button, styles.primary]} onPress={handleRegenerate}>
          <Text style={styles.primaryLabel}>Generate</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <LinearGradient colors={["#f5f3ff", "#fff"]} style={styles.page}>
      <Text style={styles.dateLabel}>{formatTodayLabel()}</Text>
      <AffirmationCard
        affirmation={affirmation}
        onSave={handleSave}
        onCopy={handleCopy}
        onShare={handleShare}
        showSave
      />
      <View style={styles.footer}>
        <Pressable style={[styles.button, styles.primary]} onPress={handleRegenerate}>
          <Text style={styles.primaryLabel}>Regenerate</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: 16,
    gap: 16,
  },
  dateLabel: {
    textAlign: 'center',
    color: '#6b7280',
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    padding: 16,
  },
  errorText: {
    color: '#b91c1c',
    textAlign: 'center',
    marginBottom: 8,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 999,
    backgroundColor: '#7c3aed',
  },
  primary: {
    backgroundColor: '#7c3aed',
  },
  primaryLabel: {
    color: '#fff',
    fontWeight: '600',
  },
});
