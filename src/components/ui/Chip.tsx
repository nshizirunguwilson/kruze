import { Pressable, StyleSheet, Text } from 'react-native';

import { colors, fontFamily } from '@/theme';

/** Selectable pill chip (filter types, transmission, brands, favorite tabs). */
export function Chip({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected?: boolean;
  onPress?: () => void;
}) {
  return (
    <Pressable
      style={[styles.chip, selected ? styles.chipOn : styles.chipOff]}
      onPress={onPress}>
      <Text style={[styles.text, selected ? styles.textOn : styles.textOff]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    height: 44,
    paddingHorizontal: 22,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipOn: { backgroundColor: colors.primary },
  chipOff: { backgroundColor: colors.surfaceGray },
  text: { fontFamily: fontFamily.semibold, fontSize: 15 },
  textOn: { color: colors.white },
  textOff: { color: colors.textSecondary },
});
