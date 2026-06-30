import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View, ViewStyle } from 'react-native';
import Svg, { G, Line, Path, Text as SvgText } from 'react-native-svg';

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
  if (full) return <FullMap style={style} />;

  return (
    <View style={[styles.map, styles.card, style]}>
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

/** Detailed street map for the Get Direction / Navigate screens. */
function FullMap({ style }: { style?: ViewStyle }) {
  const W = 390;
  const H = 844;
  const street = '#FFFFFF';
  const block = '#E7EAEF';
  const label = '#A7AEB8';
  const arrow = '#C5CBD4';

  // Diagonal avenues + cross streets, drawn as wide white strokes over a gray base.
  const avenues = [
    'M-40 120 L300 -40',
    'M-20 320 L360 60',
    'M40 560 L440 220',
    'M80 760 L470 430',
    'M120 900 L520 600',
  ];
  const crosses = [
    'M120 -40 L260 200',
    'M40 120 L210 460',
    'M-20 320 L170 700',
    'M-40 540 L150 900',
  ];

  // Route from origin (bottom, nav arrow) to destination (top, avatar pin).
  const route = 'M150 640 C150 560 250 540 250 470 C250 410 170 380 150 300';

  const streetLabels: Array<{ x: number; y: number; t: string; r: number }> = [
    { x: 70, y: 150, t: 'Worth St', r: -34 },
    { x: 250, y: 110, t: 'Leonard St', r: -34 },
    { x: 40, y: 250, t: 'W Broadway', r: 64 },
    { x: 250, y: 250, t: 'Broadway', r: 64 },
    { x: 120, y: 300, t: 'Reade St', r: -34 },
    { x: 110, y: 380, t: 'Chambers St', r: -34 },
    { x: 60, y: 430, t: 'Warren St', r: -34 },
    { x: 40, y: 520, t: 'Park Pl', r: -34 },
    { x: 70, y: 620, t: 'Barclay St', r: -34 },
    { x: 120, y: 720, t: 'Ann St', r: -34 },
    { x: 230, y: 700, t: 'Spruce St', r: 64 },
    { x: 180, y: 790, t: 'William St', r: 64 },
    { x: 300, y: 790, t: 'Gold St', r: 64 },
  ];

  const arrows: Array<{ x: number; y: number; r: number }> = [
    { x: 110, y: 90, r: -34 },
    { x: 300, y: 180, r: -34 },
    { x: 90, y: 330, r: -34 },
    { x: 300, y: 360, r: -34 },
    { x: 60, y: 560, r: -34 },
    { x: 320, y: 560, r: -34 },
    { x: 150, y: 760, r: -34 },
    { x: 300, y: 740, r: 64 },
  ];

  return (
    <View style={[styles.map, styles.full, style]}>
      <Svg width="100%" height="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice">
        {/* base */}
        <Path d={`M0 0 H${W} V${H} H0 Z`} fill={block} />
        {avenues.map((d, i) => (
          <Path key={`a${i}`} d={d} stroke={street} strokeWidth={26} fill="none" />
        ))}
        {crosses.map((d, i) => (
          <Path key={`c${i}`} d={d} stroke={street} strokeWidth={20} fill="none" />
        ))}

        {/* directional arrows */}
        {arrows.map((a, i) => (
          <G key={`ar${i}`} transform={`translate(${a.x} ${a.y}) rotate(${a.r})`}>
            <Path d="M-7 5 L0 -6 L7 5" stroke={arrow} strokeWidth={3} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </G>
        ))}

        {/* street labels */}
        {streetLabels.map((l, i) => (
          <SvgText
            key={`l${i}`}
            x={l.x}
            y={l.y}
            fill={label}
            fontSize={13}
            fontWeight="500"
            transform={`rotate(${l.r} ${l.x} ${l.y})`}>
            {l.t}
          </SvgText>
        ))}

        {/* route */}
        <Path d={route} stroke={colors.text} strokeWidth={5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </Svg>

      {/* destination pin (avatar) */}
      <View style={[styles.pin, { left: '38.5%', top: '35.5%' }]}>
        <View style={styles.avatarPin}>
          <View style={styles.avatarPinInner}>
            <Ionicons name="person" size={20} color={colors.textSecondary} />
          </View>
        </View>
      </View>

      {/* origin pin (current location, nav arrow) */}
      <View style={[styles.pin, { left: '38.5%', top: '75.8%' }]}>
        <View style={styles.originGlow}>
          <View style={styles.originPin}>
            <Ionicons name="navigate" size={16} color={colors.white} />
          </View>
        </View>
      </View>

      {/* recenter button */}
      <View style={styles.recenter}>
        <Ionicons name="locate" size={20} color={colors.primary} />
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
  avatarPin: {
    width: 48,
    height: 56,
    alignItems: 'center',
  },
  avatarPinInner: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surfaceGray,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: colors.primary,
  },
  originGlow: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(2,125,252,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  originPin: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: colors.white,
  },
  recenter: {
    position: 'absolute',
    right: 20,
    bottom: 130,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
});
