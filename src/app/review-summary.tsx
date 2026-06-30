import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Header } from '@/components/ui/Header';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { CARS, formatPrice, getCar } from '@/data/cars';
import { colors, fontFamily } from '@/theme';

export default function ReviewSummary() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const car = getCar(String(id)) ?? CARS[0];

  const hours = 24;
  const fees = 50;
  const total = car.pricePerHour * hours + fees;

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      <StatusBar style="dark" />
      <View style={styles.headerWrap}>
        <Header title="Review Summary" onBack={() => router.back()} />
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 130 }}
        showsVerticalScrollIndicator={false}>
        <View style={styles.carRow}>
          <View style={styles.carThumb}>
            <Image source={car.gallery[1]} style={styles.carImg} contentFit="contain" />
          </View>
          <View style={{ flex: 1 }}>
            <View style={styles.chipLine}>
              <View style={styles.chip}>
                <Text style={styles.chipText}>{car.type}</Text>
              </View>
              <View style={styles.rating}>
                <Ionicons name="star" size={16} color={colors.star} />
                <Text style={styles.ratingText}>{car.rating.toFixed(1)}</Text>
              </View>
            </View>
            <Text style={styles.carName}>{car.name}</Text>
            <Text style={styles.carPrice}>
              {formatPrice(car.pricePerHour)} <Text style={styles.unit}>/hr</Text>
            </Text>
          </View>
        </View>

        <View style={styles.divider} />
        <Row label="Pick-Up Date & Time" value="October 04 | 10:00 AM" />
        <Row label="Return Date & Time" value="October 05 | 10:00 AM" />
        <Row label="Rent Type" value="Self Driver" />

        <View style={styles.divider} />
        <Row label="Amount" value={`${formatPrice(car.pricePerHour)} /hr`} />
        <Row label="Total Hours" value={String(hours)} />
        <Row label="Fees" value={formatPrice(fees)} />

        <View style={styles.dashed} />
        <Row label="Total" value={formatPrice(total)} bold />

        <View style={styles.divider} />
        <View style={styles.payRow}>
          <View style={styles.payLeft}>
            <Ionicons name="card" size={22} color={colors.primary} />
            <Text style={styles.payText}>Paypal</Text>
          </View>
          <Text style={styles.change}>Change</Text>
        </View>
      </ScrollView>

      <View style={[styles.bottomBar, { paddingBottom: insets.bottom || 16 }]}>
        <PrimaryButton
          title="Continue"
          pill
          onPress={() => router.push(`/payment-methods?id=${car.id}`)}
        />
      </View>
    </View>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <View style={styles.row}>
      <Text style={[styles.rowLabel, bold && styles.rowBold]}>{label}</Text>
      <Text style={[styles.rowValue, bold && styles.rowBold]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  headerWrap: { paddingHorizontal: 24 },
  carRow: { flexDirection: 'row', gap: 16, marginTop: 16 },
  carThumb: {
    width: 110,
    height: 110,
    borderRadius: 16,
    backgroundColor: colors.surfaceGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  carImg: { width: '88%', height: '88%' },
  chipLine: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  chip: { backgroundColor: colors.primaryTint, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 },
  chipText: { fontFamily: fontFamily.semibold, fontSize: 12, color: colors.primary },
  rating: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  ratingText: { fontFamily: fontFamily.semibold, fontSize: 14, color: colors.text },
  carName: { marginTop: 8, fontFamily: fontFamily.bold, fontSize: 18, color: colors.text },
  carPrice: { marginTop: 6, fontFamily: fontFamily.bold, fontSize: 18, color: colors.primary },
  unit: { fontFamily: fontFamily.medium, fontSize: 13, color: colors.textSecondary },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: 20 },
  dashed: { height: 1, borderTopWidth: 1.5, borderColor: colors.border, borderStyle: 'dashed', marginVertical: 18 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8 },
  rowLabel: { fontFamily: fontFamily.regular, fontSize: 15, color: colors.textSecondary },
  rowValue: { fontFamily: fontFamily.semibold, fontSize: 16, color: colors.text },
  rowBold: { fontFamily: fontFamily.bold, fontSize: 18, color: colors.text },
  payRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  payLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  payText: { fontFamily: fontFamily.semibold, fontSize: 16, color: colors.text },
  change: { fontFamily: fontFamily.semibold, fontSize: 15, color: colors.primary },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingTop: 14,
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#1B2A4A',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: -4 },
    elevation: 10,
  },
});
