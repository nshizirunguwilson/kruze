/**
 * Inter font family names, as registered by @expo-google-fonts/inter.
 * Always set fontFamily explicitly — React Native won't synthesize weights
 * for custom fonts.
 */
export const fontFamily = {
  regular: 'Inter_400Regular',
  medium: 'Inter_500Medium',
  semibold: 'Inter_600SemiBold',
  bold: 'Inter_700Bold',
  extrabold: 'Inter_800ExtraBold',
} as const;

export type FontFamily = typeof fontFamily;
