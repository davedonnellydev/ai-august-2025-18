import { LinearGradient } from 'expo-linear-gradient';
import { useMemo, useState } from 'react';
import { ActivityIndicator, Alert, Keyboard, KeyboardAvoidingView, Platform, Pressable, Share, StyleSheet, Text, TextInput, ToastAndroid, TouchableWithoutFeedback, View } from 'react-native';
import { generateAffirmation, toAffirmation } from '../../lib/api';
import { saveFavorite } from '../../lib/storage';
import { Affirmation } from '../../lib/types';
import AffirmationCard from '../components/AffirmationCard';

const TAG_OPTIONS = ['focus', 'calm', 'confidence'] as const;

export default function CustomScreen() {
  const [input, setInput] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Affirmation | null>(null);

  const canGenerate = useMemo(() => input.trim().length > 0 && !loading, [input, loading]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => (prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]));
  };

  const handleGenerate = async () => {
    try {
      Keyboard.dismiss();
      setLoading(true);
      setError(null);
      const ctx = `${input.trim()} ${selectedTags.join(' ')}`.trim();
      const raw = await generateAffirmation({ type: 'custom', userContext: ctx });
      const aff = toAffirmation(raw, 'custom', selectedTags);
      setResult(aff);
    } catch (e: any) {
      setError(e?.message ?? 'Failed to generate affirmation');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (aff: Affirmation) => {
    await saveFavorite(aff);
    if (Platform.OS === 'android') {
      ToastAndroid.show('Saved to favorites', ToastAndroid.SHORT);
    } else {
      Alert.alert('Saved to favorites');
    }
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

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <LinearGradient colors={["#f5f3ff", "#fff"]} style={styles.page}>
          <Text style={styles.title}>Create a custom affirmation</Text>
          <TextInput
            style={styles.input}
            placeholder="Describe your mood or goal..."
            value={input}
            onChangeText={setInput}
            multiline
          />

      <View style={styles.tagsRow}>
        {TAG_OPTIONS.map(tag => {
          const active = selectedTags.includes(tag);
          return (
            <Pressable
              key={tag}
              onPress={() => toggleTag(tag)}
              style={[styles.tag, active && styles.tagActive]}
              accessibilityRole="button"
            >
              <Text style={[styles.tagLabel, active && styles.tagLabelActive]}>{tag}</Text>
            </Pressable>
          );
        })}
      </View>

          <Pressable
            onPress={handleGenerate}
            disabled={!canGenerate}
            style={[styles.button, styles.primary, !canGenerate && styles.buttonDisabled]}
            accessibilityRole="button"
          >
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.primaryLabel}>Generate</Text>}
          </Pressable>

          {error && <Text style={styles.errorText}>{error}</Text>}

          {result && (
            <View style={styles.result}>
              <AffirmationCard
                affirmation={result}
                onSave={handleSave}
                onCopy={handleCopy}
                onShare={handleShare}
                showSave
              />
            </View>
          )}
        </LinearGradient>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: 16,
    gap: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  input: {
    minHeight: 100,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 12,
    textAlignVertical: 'top',
    backgroundColor: '#fff',
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  toolbar: {},
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: '#f3f4f6',
  },
  tagActive: {
    backgroundColor: '#dbeafe',
  },
  tagLabel: {
    color: '#374151',
    textTransform: 'capitalize',
    fontWeight: '500',
  },
  tagLabelActive: {
    color: '#1d4ed8',
  },
  button: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#eee',
    alignItems: 'center',
  },
  primary: {
    backgroundColor: '#2563eb',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonLabel: {
    color: '#111',
    fontWeight: '600',
  },
  primaryLabel: {
    color: '#fff',
    fontWeight: '600',
  },
  errorText: {
    color: '#b91c1c',
  },
  result: {
    marginTop: 8,
  },
});
