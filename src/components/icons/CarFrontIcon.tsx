import Svg, { Path, Rect } from 'react-native-svg';

type Props = {
  size?: number;
  /** Color of the car body. */
  color?: string;
  /** Color filling the headlights / grille cut-outs (usually the background). */
  cutout?: string;
};

/**
 * Front-facing car glyph used on the splash logo.
 * Single-color body with two headlights and a grille slot punched out.
 */
export function CarFrontIcon({ size = 46, color = '#FFFFFF', cutout = '#1B7BFF' }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      {/* roof + windshield */}
      <Path
        d="M19 29 L23 18.5 C23.7 16.6 25.4 15.4 27.4 15.4 H36.6 C38.6 15.4 40.3 16.6 41 18.5 L45 29 Z"
        fill={color}
      />
      {/* main body */}
      <Path
        d="M14.5 28.5 H49.5 C52 28.5 54 30.5 54 33 V40.5 C54 41.6 53.1 42.5 52 42.5 H49.5 V44.5 C49.5 46.4 48 47.9 46.1 47.9 H44.4 C42.5 47.9 41 46.4 41 44.5 V42.5 H23 V44.5 C23 46.4 21.5 47.9 19.6 47.9 H17.9 C16 47.9 14.5 46.4 14.5 44.5 V42.5 H12 C10.9 42.5 10 41.6 10 40.5 V33 C10 30.5 12 28.5 14.5 28.5 Z"
        fill={color}
      />
      {/* headlights */}
      <Rect x="14.5" y="33.4" width="6.6" height="3.8" rx="1.9" fill={cutout} />
      <Rect x="42.9" y="33.4" width="6.6" height="3.8" rx="1.9" fill={cutout} />
      {/* grille */}
      <Rect x="26.5" y="34.4" width="11" height="2.8" rx="1.4" fill={cutout} />
    </Svg>
  );
}
