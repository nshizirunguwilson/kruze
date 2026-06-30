import { useRef, useState } from 'react';
import { LayoutChangeEvent, PanResponder, StyleSheet, View } from 'react-native';

import { colors } from '@/theme';

const THUMB = 24;

type Props = {
  min: number;
  max: number;
  low: number;
  high: number;
  onChange: (low: number, high: number) => void;
};

/** Dual-thumb range slider used on the Filter screen. */
export function RangeSlider({ min, max, low, high, onChange }: Props) {
  const [width, setWidth] = useState(0);
  const widthRef = useRef(0);
  const range = max - min;

  const toX = (v: number) => ((v - min) / range) * width;
  const fromX = (x: number) => {
    const clamped = Math.max(0, Math.min(width, x));
    return Math.round((clamped / width) * range + min);
  };

  const onLayout = (e: LayoutChangeEvent) => {
    const w = e.nativeEvent.layout.width - THUMB;
    widthRef.current = w;
    setWidth(w);
  };

  const makeResponder = (which: 'low' | 'high') =>
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, g) => {
        const w = widthRef.current;
        if (!w) return;
        const x = which === 'low' ? toX(low) + g.dx : toX(high) + g.dx;
        const value = fromX(x);
        if (which === 'low') onChange(Math.min(value, high - 1), high);
        else onChange(low, Math.max(value, low + 1));
      },
    });

  const lowResponder = useRef(makeResponder('low')).current;
  const highResponder = useRef(makeResponder('high')).current;

  return (
    <View style={styles.container} onLayout={onLayout}>
      <View style={styles.track} />
      {width > 0 && (
        <>
          <View
            style={[styles.fill, { left: toX(low) + THUMB / 2, width: toX(high) - toX(low) }]}
          />
          <View style={[styles.thumb, { left: toX(low) }]} {...lowResponder.panHandlers} />
          <View style={[styles.thumb, { left: toX(high) }]} {...highResponder.panHandlers} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { height: THUMB, justifyContent: 'center' },
  track: { height: 5, borderRadius: 3, backgroundColor: colors.border },
  fill: { position: 'absolute', height: 5, borderRadius: 3, backgroundColor: colors.primary },
  thumb: {
    position: 'absolute',
    width: THUMB,
    height: THUMB,
    borderRadius: THUMB / 2,
    backgroundColor: colors.primary,
    borderWidth: 3,
    borderColor: colors.white,
    shadowColor: '#1B2A4A',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
});
