import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Dimensions, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CarCard } from '@/components/cars/CarCard';
import { MapPlaceholder } from '@/components/ui/MapPlaceholder';
import { popularCars } from '@/data/cars';
import { useFavorites } from '@/state/favorites';
import { colors, fontFamily } from '@/theme';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 80;

export default function Explore() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { isFavorite, toggle } = useFavorites();

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <MapPlaceholder full mode="search" />

      {/* Search bar overlay */}
      <View style={[styles.searchRow, { top: insets.top + 12 }]}>
        <Pressable style={styles.search} onPress={() => router.push('/search')}>
          <Ionicons name="search" size={20} color={colors.textSecondary} />
          <TextInput
            style={styles.input}
            placeholder="Search Car"
            placeholderTextColor={colors.textSecondary}
            editable={false}
            pointerEvents="none"
          />
        </Pressable>
        <Pressable style={styles.toggle} onPress={() => router.push('/search-results?q=Car')}>
          <Ionicons name="list" size={24} color={colors.white} />
        </Pressable>
      </View>

      {/* Nearby cars carousel */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + 16}
        decelerationRate="fast"
        contentContainerStyle={[styles.carousel, { paddingBottom: insets.bottom + 78 }]}
        style={styles.carouselWrap}>
        {popularCars.map((car) => (
          <View key={car.id} style={{ width: CARD_WIDTH, marginRight: 16 }}>
            <CarCard
              car={car}
              favorite={isFavorite(car.id)}
              onToggleFavorite={() => toggle(car.id)}
              onPress={() => router.push(`/car/${car.id}`)}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  searchRow: {
    position: 'absolute',
    left: 20,
    right: 20,
    flexDirection: 'row',
    gap: 12,
  },
  search: {
    flex: 1,
    height: 54,
    borderRadius: 14,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 10,
    shadowColor: '#1B2A4A',
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  input: { flex: 1, fontFamily: fontFamily.regular, fontSize: 16, color: colors.text },
  toggle: {
    width: 54,
    height: 54,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  carouselWrap: { position: 'absolute', left: 0, right: 0, bottom: 0 },
  carousel: { paddingHorizontal: 24, paddingTop: 12 },
});
