import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useMemo, useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CarCard } from '@/components/cars/CarCard';
import { Chip } from '@/components/ui/Chip';
import { CircleBackButton } from '@/components/ui/CircleBackButton';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { Car, favoriteCars, formatPrice } from '@/data/cars';
import { colors, fontFamily } from '@/theme';

const FILTERS = ['All', 'Sedan', 'SUV', 'MPV', 'Hatchback'];

export default function Favorite() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [filter, setFilter] = useState('All');
  const [removed, setRemoved] = useState<string[]>([]);
  const [pending, setPending] = useState<Car | null>(null);

  const cars = useMemo(() => {
    const list = favoriteCars.filter((c) => !removed.includes(c.id));
    return filter === 'All' ? list : list.filter((c) => c.type === filter);
  }, [filter, removed]);

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
            onToggleFavorite={() => setPending(car)}
          />
        ))}
      </ScrollView>

      <RemoveDialog
        car={pending}
        onCancel={() => setPending(null)}
        onConfirm={() => {
          if (pending) setRemoved((r) => [...r, pending.id]);
          setPending(null);
        }}
      />
    </View>
  );
}

function RemoveDialog({
  car,
  onCancel,
  onConfirm,
}: {
  car: Car | null;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const insets = useSafeAreaInsets();
  return (
    <Modal visible={!!car} transparent animationType="slide" onRequestClose={onCancel}>
      <Pressable style={styles.backdrop} onPress={onCancel} />
      <View style={[styles.sheet, { paddingBottom: insets.bottom + 16 }]}>
        <Text style={styles.sheetTitle}>Remove from Favorites?</Text>
        <View style={styles.sheetDivider} />
        {car && (
          <View style={styles.sheetCar}>
            <View style={styles.sheetThumb}>
              <Image source={car.gallery[1]} style={styles.sheetImg} contentFit="contain" />
            </View>
            <View style={{ flex: 1 }}>
              <View style={styles.sheetChipRow}>
                <View style={styles.chip}>
                  <Text style={styles.chipText}>{car.type}</Text>
                </View>
                <View style={styles.rating}>
                  <Ionicons name="star" size={15} color={colors.star} />
                  <Text style={styles.ratingText}>{car.rating.toFixed(1)}</Text>
                </View>
              </View>
              <Text style={styles.sheetName}>{car.name}</Text>
              <Text style={styles.sheetPrice}>
                {formatPrice(car.pricePerHour)} <Text style={styles.unit}>/hr</Text>
              </Text>
            </View>
          </View>
        )}
        <View style={styles.sheetActions}>
          <Pressable style={styles.cancelBtn} onPress={onCancel}>
            <Text style={styles.cancelText}>Cancel</Text>
          </Pressable>
          <PrimaryButton title="Yes, Remove" pill style={styles.confirmBtn} onPress={onConfirm} />
        </View>
      </View>
    </Modal>
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
  backdrop: { flex: 1, backgroundColor: 'rgba(20,23,28,0.35)' },
  sheet: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  sheetTitle: { fontFamily: fontFamily.bold, fontSize: 21, color: colors.text, textAlign: 'center' },
  sheetDivider: { height: 1, backgroundColor: colors.border, marginTop: 18 },
  sheetCar: { flexDirection: 'row', gap: 16, marginTop: 20 },
  sheetThumb: { width: 96, height: 96, borderRadius: 14, backgroundColor: colors.surfaceGray, alignItems: 'center', justifyContent: 'center' },
  sheetImg: { width: '86%', height: '86%' },
  sheetChipRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  chip: { backgroundColor: colors.primaryTint, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 },
  chipText: { fontFamily: fontFamily.semibold, fontSize: 12, color: colors.primary },
  rating: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  ratingText: { fontFamily: fontFamily.semibold, fontSize: 14, color: colors.text },
  sheetName: { marginTop: 8, fontFamily: fontFamily.bold, fontSize: 17, color: colors.text },
  sheetPrice: { marginTop: 6, fontFamily: fontFamily.bold, fontSize: 16, color: colors.primary },
  unit: { fontFamily: fontFamily.medium, fontSize: 13, color: colors.textSecondary },
  sheetActions: { flexDirection: 'row', gap: 14, marginTop: 28 },
  cancelBtn: { flex: 1, height: 58, borderRadius: 999, backgroundColor: colors.surfaceGray, alignItems: 'center', justifyContent: 'center' },
  cancelText: { fontFamily: fontFamily.semibold, fontSize: 17, color: colors.primary },
  confirmBtn: { flex: 1 },
});
