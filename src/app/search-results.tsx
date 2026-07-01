import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CarCard } from '@/components/cars/CarCard';
import { CircleBackButton } from '@/components/ui/CircleBackButton';
import { CARS } from '@/data/cars';
import { useFavorites } from '@/state/favorites';
import { colors, fontFamily } from '@/theme';

export default function SearchResults() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { q, type, brand, transmission, low, high, rating } = useLocalSearchParams<{
    q?: string;
    type?: string;
    brand?: string;
    transmission?: string;
    low?: string;
    high?: string;
    rating?: string;
  }>();
  const [query, setQuery] = useState(q ?? '');
  const { isFavorite, toggle } = useFavorites();

  const lowN = low ? Number(low) : undefined;
  const highN = high ? Number(high) : undefined;
  const ratingN = rating ? Number(rating) : undefined;
  const hasFilters = !!(
    type ||
    brand ||
    transmission ||
    lowN != null ||
    highN != null ||
    ratingN != null
  );

  const term = query.trim().toLowerCase();
  const shown = CARS.filter((c) => {
    if (term && !c.name.toLowerCase().includes(term) && !c.type.toLowerCase().includes(term)) {
      return false;
    }
    if (type && c.type !== type) return false;
    if (brand && !c.name.toLowerCase().includes(brand.toLowerCase())) return false;
    if (transmission && c.transmission !== transmission) return false;
    if (lowN != null && c.pricePerHour < lowN) return false;
    if (highN != null && c.pricePerHour > highN) return false;
    if (ratingN != null && c.rating < ratingN) return false;
    return true;
  });

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      <StatusBar style="dark" />
      <View style={styles.headerRow}>
        <CircleBackButton onPress={() => router.back()} />
        <View style={styles.searchField}>
          <Ionicons name="search" size={20} color={colors.primary} />
          <TextInput
            style={styles.input}
            value={query}
            onChangeText={setQuery}
            placeholderTextColor={colors.textSecondary}
            returnKeyType="search"
          />
          {query.length > 0 && (
            <Pressable onPress={() => setQuery('')} hitSlop={8}>
              <Ionicons name="close-circle" size={22} color={colors.primary} />
            </Pressable>
          )}
        </View>
      </View>

      <View style={styles.resultsHeader}>
        <Text style={styles.resultsTitle} numberOfLines={1}>
          {query ? `Results for “${query}”` : hasFilters ? 'Filtered Results' : 'All Cars'}
        </Text>
        <Text style={styles.resultsCount}>
          {shown.length} {shown.length === 1 ? 'Result' : 'Results'} Found
        </Text>
      </View>

      {shown.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="car-outline" size={56} color={colors.textMuted} />
          <Text style={styles.emptyTitle}>No cars found</Text>
          <Text style={styles.emptyText}>Try a different search or adjust your filters.</Text>
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={[styles.list, { paddingBottom: insets.bottom + 24 }]}
          showsVerticalScrollIndicator={false}>
          {shown.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              image={car.hero}
              favorite={isFavorite(car.id)}
              onToggleFavorite={() => toggle(car.id)}
              onPress={() => router.push(`/car/${car.id}`)}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white, paddingHorizontal: 24 },
  headerRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  searchField: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    height: 56,
    borderRadius: 14,
    backgroundColor: colors.surfaceGray,
    paddingHorizontal: 16,
  },
  input: { flex: 1, fontFamily: fontFamily.regular, fontSize: 16, color: colors.text },
  resultsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 22,
    marginBottom: 4,
  },
  resultsTitle: { flex: 1, fontFamily: fontFamily.bold, fontSize: 21, color: colors.text },
  resultsCount: { fontFamily: fontFamily.semibold, fontSize: 15, color: colors.primary },
  list: { paddingTop: 16, gap: 22 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 10, paddingBottom: 80 },
  emptyTitle: { fontFamily: fontFamily.bold, fontSize: 19, color: colors.text },
  emptyText: { fontFamily: fontFamily.regular, fontSize: 15, color: colors.textSecondary, textAlign: 'center' },
});
