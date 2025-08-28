import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Platform, Share, StyleSheet, Text, ToastAndroid, View } from 'react-native';
import { getFavorites, removeFavorite } from '../../lib/storage';
import { Affirmation } from '../../lib/types';
import AffirmationCard from '../components/AffirmationCard';

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState<Affirmation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const loadFavorites = useCallback(async () => {
    setLoading(true);
    const data = await getFavorites();
    setFavorites(data);
    setLoading(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [loadFavorites])
  );

  const handleCopy = async (text: string) => {
    try {
      const Clipboard = await import('expo-clipboard');
      await Clipboard.setStringAsync(text);
      if (Platform.OS === 'android') {
        ToastAndroid.show('Copied', ToastAndroid.SHORT);
      } else {
        Alert.alert('Copied');
      }
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

  const confirmDelete = (id: string) => {
    Alert.alert('Remove favorite?', 'This will delete the affirmation from your favorites.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          const next = await removeFavorite(id);
          setFavorites(next);
          if (Platform.OS === 'android') {
            ToastAndroid.show('Removed', ToastAndroid.SHORT);
          } else {
            Alert.alert('Removed');
          }
        },
      },
    ]);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (favorites.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyTitle}>No favorites yet</Text>
        <Text style={styles.emptyHelp}>Save affirmations from Home or Custom to see them here.</Text>
      </View>
    );
  }

  return (
    <LinearGradient colors={["#f5f3ff", "#fff"]} style={{ flex: 1 }}>
      <FlatList
        contentContainerStyle={styles.list}
        data={favorites}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <AffirmationCard
              affirmation={item}
              onCopy={handleCopy}
              onShare={handleShare}
              onDelete={() => confirmDelete(item.id)}
              showSave={false}
              showDelete
            />
          </View>
        )}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 16,
    gap: 16,
  },
  row: {
    gap: 8,
  },
  rowActions: {
    alignItems: 'flex-end',
  },
  button: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#eee',
  },
  danger: {
    backgroundColor: '#ef4444',
  },
  dangerLabel: {
    color: '#fff',
    fontWeight: '600',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  emptyHelp: {
    color: '#6b7280',
    textAlign: 'center',
  },
});
