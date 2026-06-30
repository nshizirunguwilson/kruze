import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View, ViewStyle } from 'react-native';
import Svg, { Line, Path } from 'react-native-svg';

import { colors } from '@/theme';

/**
 * Lightweight stylized map (no maps SDK): faint street grid, a route line,
 * and origin/destination pins. Used for booking location and pickup/return.
 */
export function MapPlaceholder({
  style,
  full,
}: {
  style?: ViewStyle;
  /** Full-bleed variant (Get Direction / Navigate screens). */
  full?: boolean;
}) {
  return (
    <View style={[styles.map, full ? styles.full : styles.card, style]}>
      <Svg width="100%" height="100%" viewBox="0 0 300 200" preserveAspectRatio="xMidYMid slice">
        {[30, 70, 110, 150, 190].map((y) => (
          <Line key={`h${y}`} x1={0} y1={y} x2={300} y2={y} stroke="#E2E6EC" strokeWidth={6} />
        ))}
        {[40, 100, 160, 220, 270].map((x) => (
          <Line key={`v${x}`} x1={x} y1={0} x2={x} y2={200} stroke="#E2E6EC" strokeWidth={6} />
        ))}
        <Path
          d="M70 150 L70 95 L200 95 L200 70"
          stroke={colors.text}
          strokeWidth={3}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>

      <View style={[styles.pin, { left: '20%', top: '68%' }]}>
        <View style={styles.originDot} />
      </View>
      <View style={[styles.pin, { left: '64%', top: '28%' }]}>
        <View style={styles.destPin}>
          <Ionicons name="navigate" size={14} color={colors.white} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  map: { backgroundColor: '#EEF1F5', overflow: 'hidden' },
  card: { height: 150, borderRadius: 16 },
  full: { flex: 1 },
  pin: { position: 'absolute', alignItems: 'center', justifyContent: 'center' },
  originDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.primary,
    borderWidth: 4,
    borderColor: 'rgba(2,125,252,0.25)',
  },
  destPin: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: colors.white,
  },
});
