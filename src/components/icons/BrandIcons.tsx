import Svg, { Circle, Ellipse, G, Line, Path } from 'react-native-svg';

const DARK = '#15171C';

/** Simplified, recognizable car-brand marks for the Home "Brands" row. */

export function ToyotaIcon({ size = 34 }: { size?: number }) {
  const s = size;
  return (
    <Svg width={s} height={s} viewBox="0 0 100 100">
      <G stroke={DARK} strokeWidth={6} fill="none">
        <Ellipse cx={50} cy={50} rx={44} ry={28} />
        <Ellipse cx={50} cy={50} rx={13} ry={28} />
        <Ellipse cx={50} cy={50} rx={30} ry={11} />
      </G>
    </Svg>
  );
}

export function MercedesIcon({ size = 34 }: { size?: number }) {
  const s = size;
  return (
    <Svg width={s} height={s} viewBox="0 0 100 100">
      <Circle cx={50} cy={50} r={45} stroke={DARK} strokeWidth={6} fill="none" />
      <G stroke={DARK} strokeWidth={6}>
        <Line x1={50} y1={50} x2={50} y2={8} />
        <Line x1={50} y1={50} x2={14} y2={71} />
        <Line x1={50} y1={50} x2={86} y2={71} />
      </G>
    </Svg>
  );
}

export function TeslaIcon({ size = 34 }: { size?: number }) {
  const s = size;
  return (
    <Svg width={s} height={s} viewBox="0 0 100 100">
      <Path
        d="M50 16c14 0 26 3 33 7l-5 9c-5-3-12-5-18-6l-1 52h-18l-1-52c-6 1-13 3-18 6l-5-9c7-4 19-7 33-7z M20 14c9 4 19 6 30 6s21-2 30-6"
        fill={DARK}
      />
    </Svg>
  );
}

export function BmwIcon({ size = 34 }: { size?: number }) {
  const s = size;
  return (
    <Svg width={s} height={s} viewBox="0 0 100 100">
      <Circle cx={50} cy={50} r={45} fill={DARK} />
      <Circle cx={50} cy={50} r={36} fill="#FFFFFF" />
      <Path d="M50 14 A36 36 0 0 1 86 50 L50 50 Z" fill="#3B7DDD" />
      <Path d="M50 86 A36 36 0 0 1 14 50 L50 50 Z" fill="#3B7DDD" />
      <Circle cx={50} cy={50} r={36} stroke={DARK} strokeWidth={3} fill="none" />
    </Svg>
  );
}

export const BRANDS = [
  { name: 'BMW', Icon: BmwIcon },
  { name: 'Toyota', Icon: ToyotaIcon },
  { name: 'Mercedes', Icon: MercedesIcon },
  { name: 'Tesla', Icon: TeslaIcon },
] as const;
