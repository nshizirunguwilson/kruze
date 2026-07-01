import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SpecsRow } from '@/components/cars/SpecsRow';
import { CircleBackButton } from '@/components/ui/CircleBackButton';
import { MapPlaceholder } from '@/components/ui/MapPlaceholder';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { CARS, formatPrice, getCar } from '@/data/cars';
import { Booking, useBookings } from '@/state/bookings';
import { colors, fontFamily } from '@/theme';

const TABS = ['Upcoming', 'Completed', 'Cancelled'] as const;
type Tab = (typeof TABS)[number];

export default function MyBookings() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { tab } = useLocalSearchParams<{ tab?: string }>();
  const initial = (TABS.includes(tab as Tab) ? tab : 'Upcoming') as Tab;
  const [active, setActive] = useState<Tab>(initial);
  const { byStatus } = useBookings();
  const rows = byStatus(active);

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <CircleBackButton onPress={() => router.back()} />
        <Text style={styles.title} pointerEvents="none">
          My Booking
        </Text>
        <View style={{ width: 46 }} />
      </View>

      <View style={styles.tabBar}>
        {TABS.map((t) => (
          <Pressable key={t} style={styles.tab} onPress={() => setActive(t)}>
            <Text style={[styles.tabText, active === t && styles.tabTextActive]}>{t}</Text>
            {active === t && <View style={styles.tabUnderline} />}
          </Pressable>
        ))}
      </View>

      <ScrollView
        contentContainerStyle={[styles.list, { paddingBottom: insets.bottom + 24 }]}
        showsVerticalScrollIndicator={false}>
        {rows.length === 0 ? (
          <View style={styles.empty}>
            <Ionicons name="clipboard-outline" size={52} color={colors.textMuted} />
            <Text style={styles.emptyTitle}>No {active.toLowerCase()} bookings</Text>
            <Text style={styles.emptyText}>Your {active.toLowerCase()} rentals will appear here.</Text>
          </View>
        ) : (
          rows.map((b) => {
            const car = getCar(b.carId) ?? CARS[0];
            if (active === 'Upcoming') return <UpcomingCard key={b.id} car={car} booking={b} router={router} />;
            if (active === 'Completed') return <CompletedCard key={b.id} car={car} router={router} />;
            return <CancelledCard key={b.id} car={car} router={router} />;
          })
        )}
      </ScrollView>
    </View>
  );
}

type CardProps = { car: (typeof CARS)[number]; router: ReturnType<typeof useRouter> };

function CarHeader({ car }: { car: (typeof CARS)[number] }) {
  return (
    <>
      <View style={styles.imageWrap}>
        <Image source={car.hero} style={styles.image} contentFit="contain" />
        <View style={styles.ratingBadge}>
          <Ionicons name="star" size={14} color={colors.star} />
          <Text style={styles.ratingText}>{car.rating.toFixed(1)}</Text>
        </View>
      </View>
      <View style={styles.chip}>
        <Text style={styles.chipText}>{car.type}</Text>
      </View>
      <View style={styles.titleRow}>
        <Text style={styles.name}>{car.name}</Text>
        <Text style={styles.price}>
          {formatPrice(car.pricePerHour)} <Text style={styles.unit}>/hr</Text>
        </Text>
      </View>
      <View style={styles.divider} />
      <SpecsRow car={car} />
    </>
  );
}

function UpcomingCard({ car, booking, router }: CardProps & { booking: Booking }) {
  return (
    <View style={styles.card}>
      <CarHeader car={car} />
      <View style={styles.locationRow}>
        <Text style={styles.locationTitle}>Car Location</Text>
        <Pressable onPress={() => router.push('/get-direction')}>
          <Text style={styles.navigate}>Navigate</Text>
        </Pressable>
      </View>
      <MapPlaceholder style={{ marginTop: 12 }} />
      <View style={styles.actionRow}>
        <Pressable style={styles.outlineBtn} onPress={() => router.push(`/cancel-rental?bookingId=${booking.id}`)}>
          <Text style={styles.outlineText}>Cancel</Text>
        </Pressable>
        <PrimaryButton
          title="E-Ticket"
          pill
          style={styles.flexBtn}
          onPress={() => router.push(`/e-receipt?id=${car.id}`)}
        />
      </View>
    </View>
  );
}

function CompletedCard({ car, router }: CardProps) {
  return (
    <View style={styles.card}>
      <CarHeader car={car} />
      <View style={styles.actionRow}>
        <Pressable style={styles.outlineBtn} onPress={() => router.push(`/book/${car.id}`)}>
          <Text style={styles.outlineText}>Re-Book</Text>
        </Pressable>
        <PrimaryButton
          title="Add Review"
          pill
          style={styles.flexBtn}
          onPress={() => router.push(`/leave-review?id=${car.id}`)}
        />
      </View>
    </View>
  );
}

function CancelledCard({ car, router }: CardProps) {
  return (
    <View style={styles.card}>
      <CarHeader car={car} />
      <View style={styles.actionRow}>
        <PrimaryButton
          title="Re-Book"
          pill
          style={styles.flexBtn}
          onPress={() => router.push(`/book/${car.id}`)}
        />
      </View>
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
  tabBar: {
    flexDirection: 'row',
    marginTop: 12,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tab: { flex: 1, alignItems: 'center', paddingBottom: 12 },
  tabText: { fontFamily: fontFamily.medium, fontSize: 16, color: colors.textSecondary },
  tabTextActive: { fontFamily: fontFamily.semibold, color: colors.primary },
  tabUnderline: { position: 'absolute', bottom: -1, height: 3, width: '74%', borderRadius: 2, backgroundColor: colors.primary },
  list: { paddingHorizontal: 24, paddingTop: 20, gap: 22 },
  card: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 14,
    shadowColor: '#1B2A4A',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  imageWrap: {
    height: 168,
    borderRadius: 14,
    backgroundColor: colors.surfaceGray,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  image: { width: '100%', height: '82%', alignSelf: 'center' },
  ratingBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  ratingText: { fontFamily: fontFamily.semibold, fontSize: 13, color: colors.text },
  chip: { alignSelf: 'flex-start', backgroundColor: colors.primaryTint, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4, marginTop: 14 },
  chipText: { fontFamily: fontFamily.semibold, fontSize: 12, color: colors.primary },
  titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 },
  name: { flex: 1, fontFamily: fontFamily.bold, fontSize: 19, color: colors.text },
  price: { fontFamily: fontFamily.bold, fontSize: 18, color: colors.primary },
  unit: { fontFamily: fontFamily.medium, fontSize: 13, color: colors.textSecondary },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: 14 },
  locationRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 16 },
  locationTitle: { fontFamily: fontFamily.bold, fontSize: 17, color: colors.text },
  navigate: { fontFamily: fontFamily.semibold, fontSize: 15, color: colors.primary },
  actionRow: { flexDirection: 'row', gap: 14, marginTop: 16 },
  outlineBtn: { flex: 1, height: 58, borderRadius: 999, backgroundColor: colors.surfaceGray, alignItems: 'center', justifyContent: 'center' },
  outlineText: { fontFamily: fontFamily.semibold, fontSize: 17, color: colors.primary },
  flexBtn: { flex: 1 },
  empty: { alignItems: 'center', justifyContent: 'center', gap: 10, paddingTop: 120 },
  emptyTitle: { fontFamily: fontFamily.bold, fontSize: 19, color: colors.text },
  emptyText: { fontFamily: fontFamily.regular, fontSize: 15, color: colors.textSecondary, textAlign: 'center' },
});
