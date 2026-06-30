import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CarCard } from '@/components/cars/CarCard';
import { CircleBackButton } from '@/components/ui/CircleBackButton';
import { CARS } from '@/data/cars';
import { colors, fontFamily } from '@/theme';

export default function SearchResults() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { q } = useLocalSearchParams<{ q?: string }>();
  const [query, setQuery] = useState(q ?? '');

  const term = query.trim().toLowerCase();
  const results = term
    ? CARS.filter(
        (c) => c.name.toLowerCase().includes(term) || c.type.toLowerCase().includes(term),
      )
    : CARS;
  const shown = results.length ? results : CARS;

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
          Results for “{query || 'Car'}”
        </Text>
        <Text style={styles.resultsCount}>{152} Results Found</Text>
      </View>

      <ScrollView
        contentContainerStyle={[styles.list, { paddingBottom: insets.bottom + 24 }]}
        showsVerticalScrollIndicator={false}>
        {shown.map((car) => (
          <CarCard
            key={car.id}
            car={car}
            image={car.hero}
            onPress={() => router.push(`/car/${car.id}`)}
          />
        ))}
      </ScrollView>
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
});
