import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { colors } from '@/theme';

/** Outlined circular back button used on the auth / detail headers. */
export function CircleBackButton({ onPress, style }: { onPress?: () => void; style?: ViewStyle }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Go back"
      onPress={onPress}
      hitSlop={10}
      style={({ pressed }) => [styles.btn, pressed && styles.pressed, style]}>
      <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
        <Path
          d="M19 12 H5 M11 6 L5 12 L11 18"
          stroke={colors.text}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  pressed: { backgroundColor: colors.surfaceGray },
});
