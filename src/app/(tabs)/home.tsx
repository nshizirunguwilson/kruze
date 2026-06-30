import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CarCard } from '@/components/cars/CarCard';
import { BRANDS } from '@/components/icons/BrandIcons';
import { popularCars } from '@/data/cars';
import { colors, fontFamily } from '@/theme';

export default function Home() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Blue header */}
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.locationLabel}>Location</Text>
            <Pressable style={styles.locationRow}>
              <Ionicons name="location" size={18} color={colors.white} />
              <Text style={styles.city}>New York, USA</Text>
              <Ionicons name="chevron-down" size={16} color={colors.white} />
            </Pressable>
          </View>
          <Pressable style={styles.bell}>
            <Ionicons name="notifications-outline" size={22} color={colors.primary} />
            <View style={styles.bellDot} />
          </Pressable>
        </View>

        <View style={styles.searchRow}>
          <Pressable style={styles.search} onPress={() => router.push('/explore')}>
            <Ionicons name="search" size={20} color={colors.textSecondary} />
            <Text style={styles.searchText}>Search</Text>
          </Pressable>
          <Pressable style={styles.filterBtn} onPress={() => router.push('/filter')}>
            <Ionicons name="options-outline" size={22} color={colors.primary} />
          </Pressable>
        </View>
      </View>

      <ScrollView
        style={styles.body}
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}>
        <SectionHeader title="Brands" onSeeAll={() => router.push('/explore')} />
        <View style={styles.brandsRow}>
          {BRANDS.map(({ name, Icon }) => (
            <View key={name} style={styles.brandItem}>
              <View style={styles.brandCircle}>
                <Icon size={32} />
              </View>
              <Text style={styles.brandName}>{name}</Text>
            </View>
          ))}
        </View>

        <SectionHeader title="Popular Car" onSeeAll={() => router.push('/see-all')} />
        <View style={styles.list}>
          {popularCars.map((car) => (
            <CarCard key={car.id} car={car} onPress={() => router.push(`/car/${car.id}`)} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

function SectionHeader({ title, onSeeAll }: { title: string; onSeeAll?: () => void }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Pressable onPress={onSeeAll} hitSlop={8}>
        <Text style={styles.seeAll}>See All</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  header: {
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    paddingHorizontal: 20,
    paddingBottom: 22,
  },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  locationLabel: {
    fontFamily: fontFamily.regular,
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
    marginBottom: 5,
  },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  city: { fontFamily: fontFamily.bold, fontSize: 18, color: colors.white },
  bell: {
    width: 50,
    height: 50,
    borderRadius: 15,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bellDot: {
    position: 'absolute',
    top: 13,
    right: 14,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.heart,
  },
  searchRow: { flexDirection: 'row', gap: 12, marginTop: 22 },
  search: {
    flex: 1,
    height: 56,
    borderRadius: 15,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 10,
  },
  searchText: { fontFamily: fontFamily.regular, fontSize: 16, color: colors.textSecondary },
  filterBtn: {
    width: 56,
    height: 56,
    borderRadius: 15,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: { flex: 1, paddingHorizontal: 20 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
  sectionTitle: { fontFamily: fontFamily.bold, fontSize: 21, color: colors.text },
  seeAll: { fontFamily: fontFamily.semibold, fontSize: 14, color: colors.primary },
  brandsRow: { flexDirection: 'row', justifyContent: 'space-between' },
  brandItem: { alignItems: 'center', gap: 9 },
  brandCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.surfaceGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandName: { fontFamily: fontFamily.semibold, fontSize: 14, color: colors.text },
  list: { gap: 18 },
});
