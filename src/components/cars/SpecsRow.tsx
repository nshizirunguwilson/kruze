import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import type { Car } from '@/data/cars';
import { colors, fontFamily } from '@/theme';

const fuelIcon = (fuel: Car['fuel']) =>
  fuel === 'Electric' ? 'ev-station' : fuel === 'Hybrid' ? 'leaf' : 'gas-station';

/** The Transmission / Fuel / Seats row shown on cards and detail. */
export function SpecsRow({ car, compact }: { car: Car; compact?: boolean }) {
  const size = compact ? 16 : 18;
  const textStyle = [styles.text, compact && styles.textCompact];
  return (
    <View style={styles.row}>
      <View style={styles.item}>
        <MaterialCommunityIcons name="car-shift-pattern" size={size} color={colors.primary} />
        <Text style={textStyle}>{car.transmission}</Text>
      </View>
      <View style={styles.item}>
        <MaterialCommunityIcons name={fuelIcon(car.fuel)} size={size} color={colors.primary} />
        <Text style={textStyle}>{car.fuel}</Text>
      </View>
      <View style={styles.item}>
        <Ionicons name="person" size={size - 2} color={colors.primary} />
        <Text style={textStyle}>{car.seats} Seats</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  item: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  text: { fontFamily: fontFamily.medium, fontSize: 14, color: colors.textSecondary },
  textCompact: { fontSize: 13 },
});
