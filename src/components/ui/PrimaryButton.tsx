import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';

import { colors, fontFamily, radius } from '@/theme';

type Props = {
  title: string;
  onPress?: () => void;
  /** Fully-rounded ends (welcome / permission CTAs). Default is a soft 16px radius. */
  pill?: boolean;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
};

export function PrimaryButton({
  title,
  onPress,
  pill,
  disabled,
  loading,
  style,
  textStyle,
}: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.button,
        { borderRadius: pill ? radius.pill : radius.lg },
        pressed && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}>
      {loading ? (
        <ActivityIndicator color={colors.white} />
      ) : (
        <Text style={[styles.text, textStyle]}>{title}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 58,
    width: '100%',
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: { backgroundColor: colors.primaryPressed },
  disabled: { opacity: 0.5 },
  text: {
    color: colors.white,
    fontFamily: fontFamily.semibold,
    fontSize: 17,
    letterSpacing: 0.2,
  },
});
