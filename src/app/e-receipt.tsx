import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Header } from '@/components/ui/Header';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { CARS, formatPrice, getCar } from '@/data/cars';
import { colors, fontFamily } from '@/theme';

// Deterministic bar widths so the barcode renders identically every time.
const BARS = [3, 1, 2, 1, 4, 1, 2, 3, 1, 2, 1, 3, 4, 1, 2, 1, 3, 2, 1, 4, 1, 2, 3, 1, 2, 1, 4, 2,
  1, 3, 1, 2, 4, 1, 2, 1, 3, 2, 1, 4, 2, 1, 3, 1, 2, 4, 1, 3, 1, 2];

export default function EReceipt() {
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
        <Header title="E-Receipt" onBack={() => router.back()} />
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 150 }}
        showsVerticalScrollIndicator={false}>
        <View style={styles.barcode}>
          {BARS.map((w, i) => (
            <View key={i} style={{ width: w, height: 96, backgroundColor: colors.text, marginRight: 2 }} />
          ))}
        </View>

        <Row label="Car" value={car.name} />
        <Row label="Type" value={car.type} />
        <Row label="Seats" value={String(car.seats)} />

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

        <View style={styles.txnRow}>
          <Text style={styles.txnLabel}>Transaction ID</Text>
          <View style={styles.txnRight}>
            <Text style={styles.txnValue}>TR2565HGJD</Text>
            <Ionicons name="copy-outline" size={18} color={colors.primary} />
          </View>
        </View>
      </ScrollView>

      <View style={[styles.bottomBar, { paddingBottom: insets.bottom || 16 }]}>
        <PrimaryButton title="Download E-Receipt" pill onPress={() => router.replace('/home')} />
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
  barcode: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 24,
  },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: 18 },
  dashed: { height: 1, borderTopWidth: 1.5, borderColor: colors.border, borderStyle: 'dashed', marginVertical: 18 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8 },
  rowLabel: { fontFamily: fontFamily.regular, fontSize: 15, color: colors.textSecondary },
  rowValue: { fontFamily: fontFamily.semibold, fontSize: 16, color: colors.text },
  rowBold: { fontFamily: fontFamily.bold, fontSize: 18, color: colors.text },
  txnRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 },
  txnLabel: { fontFamily: fontFamily.regular, fontSize: 15, color: colors.textSecondary },
  txnRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  txnValue: { fontFamily: fontFamily.semibold, fontSize: 16, color: colors.text },
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
