import Svg, { Path, Rect } from 'react-native-svg';

import { colors } from '@/theme';

type Props = {
  size?: number;
  /** Badge fill. Default brand blue. Pass 'transparent' for a mark-only logo. */
  tileColor?: string;
  /** The "K" color. Default white. */
  markColor?: string;
  /** Corner radius as a fraction of size (0-0.5). Default 0.22. */
  radiusRatio?: number;
};

/**
 * Kruze monogram logo: a bold "K" in a rounded-square badge.
 * Used in-app (splash) and mirrored by the app-icon PNGs.
 */
export function KruzeLogo({
  size = 96,
  tileColor = colors.primary,
  markColor = colors.white,
  radiusRatio = 0.22,
}: Props) {
  const r = 100 * Math.min(Math.max(radiusRatio, 0), 0.5);
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Rect x={0} y={0} width={100} height={100} rx={r} ry={r} fill={tileColor} />
      {/* Stem */}
      <Path
        d="M40 29 L40 71"
        stroke={markColor}
        strokeWidth={11.5}
        strokeLinecap="round"
      />
      {/* Upper + lower arms meeting at the stem's middle */}
      <Path
        d="M66 29 L43 50 L66 71"
        stroke={markColor}
        strokeWidth={11.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}
