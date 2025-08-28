import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Affirmation } from '../../lib/types';

type Props = {
  affirmation: Affirmation;
  onSave?: (affirmation: Affirmation) => void;
  onCopy?: (text: string) => void;
  onShare?: (text: string) => void;
  showSave?: boolean;
};

export default function AffirmationCard({ affirmation, onSave, onCopy, onShare, showSave = true }: Props) {
  const handleSave = () => {
    onSave?.(affirmation);
  };
  const handleCopy = () => {
    onCopy?.(affirmation.text);
  };
  const handleShare = () => {
    onShare?.(affirmation.text);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.text}>{affirmation.text}</Text>
      <View style={styles.actions}>
        {showSave && (
          <Pressable style={[styles.button, styles.primary]} onPress={handleSave} accessibilityRole="button">
            <Text style={styles.primaryLabel}>Save</Text>
          </Pressable>
        )}
        <Pressable style={styles.button} onPress={handleCopy} accessibilityRole="button">
          <Text style={styles.buttonLabel}>Copy</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={handleShare} accessibilityRole="button">
          <Text style={styles.buttonLabel}>Share</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    borderRadius: 12,
    backgroundColor: '#fff',
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 3,
    gap: 16,
  },
  text: {
    fontSize: 22,
    lineHeight: 30,
    textAlign: 'center',
    color: '#111',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  button: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#eee',
  },
  primary: {
    backgroundColor: '#2563eb',
  },
  buttonLabel: {
    color: '#111',
    fontWeight: '600',
  },
  primaryLabel: {
    color: '#fff',
    fontWeight: '600',
  },
});
