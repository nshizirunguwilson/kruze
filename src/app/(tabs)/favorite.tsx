import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CarCard } from '@/components/cars/CarCard';
import { Chip } from '@/components/ui/Chip';
import { CircleBackButton } from '@/components/ui/CircleBackButton';
import { favoriteCars } from '@/data/cars';
import { colors, fontFamily } from '@/theme';

const FILTERS = ['All', 'Sedan', 'SUV', 'MPV', 'Hatchback'];

export default function Favorite() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [filter, setFilter] = useState('All');

  const cars = useMemo(
    () => (filter === 'All' ? favoriteCars : favoriteCars.filter((c) => c.type === filter)),
    [filter],
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <CircleBackButton onPress={() => router.replace('/home')} />
        <Text style={styles.title} pointerEvents="none">
          Favorite
        </Text>
        <View style={styles.searchBtn}>
          <Ionicons name="search" size={20} color={colors.text} />
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chips}
        style={styles.chipsRow}>
        {FILTERS.map((f) => (
          <Chip key={f} label={f} selected={filter === f} onPress={() => setFilter(f)} />
        ))}
      </ScrollView>

      <ScrollView
        contentContainerStyle={[styles.list, { paddingBottom: insets.bottom + 110 }]}
        showsVerticalScrollIndicator={false}>
        {cars.map((car) => (
          <CarCard
            key={car.id}
            car={car}
            image={car.hero}
            favorite
            onPress={() => router.push(`/car/${car.id}`)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  header: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  title: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    fontFamily: fontFamily.semibold,
    fontSize: 19,
    color: colors.text,
  },
  searchBtn: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipsRow: { marginTop: 16, maxHeight: 44 },
  chips: { gap: 12, paddingHorizontal: 24 },
  list: { paddingHorizontal: 24, paddingTop: 20, gap: 22 },
});
