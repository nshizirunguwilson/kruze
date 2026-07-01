import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CarCard } from '@/components/cars/CarCard';
import { CARS } from '@/data/cars';
import { useFavorites } from '@/state/favorites';
import { colors, fontFamily } from '@/theme';

const RECENT = ['Toyota Land Cruiser', 'Toyota Camry', 'Toyota RAV4'];
const recentlyViewed = CARS.slice(1, 3);

export default function Search() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');
  const [recent, setRecent] = useState(RECENT);
  const { isFavorite, toggle } = useFavorites();

  const submit = (q: string) => router.push(`/search-results?q=${encodeURIComponent(q || 'Car')}`);
  const clearOrBack = () => {
    if (query.length > 0) setQuery('');
    else router.back();
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      <StatusBar style="dark" />
      <View style={styles.searchField}>
        <Ionicons name="search" size={20} color={colors.primary} />
        <TextInput
          style={styles.input}
          value={query}
          onChangeText={setQuery}
          placeholder="Search.."
          placeholderTextColor={colors.textSecondary}
          returnKeyType="search"
          autoFocus
          onSubmitEditing={() => submit(query)}
        />
        <Pressable onPress={clearOrBack} hitSlop={8}>
          <Ionicons name="close-circle" size={22} color={colors.primary} />
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <Text style={styles.sectionTitle}>Recent Search</Text>
        {recent.map((term) => (
          <Pressable key={term} style={styles.recentRow} onPress={() => submit(term)}>
            <Text style={styles.recentText}>{term}</Text>
            <Pressable onPress={() => setRecent((r) => r.filter((t) => t !== term))} hitSlop={10}>
              <Ionicons name="close" size={20} color={colors.textSecondary} />
            </Pressable>
          </Pressable>
        ))}

        <Text style={[styles.sectionTitle, { marginTop: 28 }]}>Recent View</Text>
        <View style={styles.list}>
          {recentlyViewed.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              image={car.hero}
              favorite={isFavorite(car.id)}
              onToggleFavorite={() => toggle(car.id)}
              onPress={() => router.push(`/car/${car.id}`)}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white, paddingHorizontal: 24 },
  searchField: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    height: 56,
    borderRadius: 14,
    backgroundColor: colors.surfaceGray,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  input: { flex: 1, fontFamily: fontFamily.regular, fontSize: 16, color: colors.text },
  sectionTitle: { marginTop: 20, fontFamily: fontFamily.bold, fontSize: 20, color: colors.text },
  recentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  recentText: { fontFamily: fontFamily.regular, fontSize: 17, color: colors.textSecondary },
  list: { gap: 20, marginTop: 16 },
});
