/**
 * Central color tokens, measured/eyeballed from the design samples.
 * Tune here once — every screen reads from these.
 */
export const colors = {
  // Brand
  primary: '#027DFC',
  primaryPressed: '#0266D6',
  primaryTint: '#E6F2FF', // light-blue badge / chip background
  splash: '#027DFC',

  // Neutrals
  white: '#FFFFFF',
  black: '#15171C',
  text: '#15171C', // headings / primary text
  textSecondary: '#8A8F99', // subtitles, captions
  textMuted: '#A8ADB7',

  // Surfaces
  screenGray: '#F4F4F4', // onboarding background
  surfaceGray: '#F3F4F6', // inputs, chips
  card: '#FFFFFF',
  border: '#ECECEF',

  // Accents
  star: '#FFB400',
  heart: '#FF4B55',
  success: '#1FC16B',

  // Onboarding pagination
  dotActive: '#027DFC',
  dotInactive: '#B9DBFF',
} as const;

export type AppColors = typeof colors;
