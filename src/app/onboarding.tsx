import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
import {
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';

import { colors, fontFamily } from '@/theme';

type Segment = { t: string; primary?: boolean };
type Slide = { key: string; mockup: number; ratio: number; title: Segment[]; subtitle: string };

const SLIDES: Slide[] = [
  {
    key: '1',
    mockup: require('../../assets/mockups/onboarding-home.png'),
    ratio: 526 / 748,
    title: [{ t: 'Getting Started with\n' }, { t: 'Easy Rentals', primary: true }],
    subtitle:
      'Browse a wide range of cars, compare prices, and book the perfect ride in just a few taps.',
  },
  {
    key: '2',
    mockup: require('../../assets/mockups/onboarding-favorite.png'),
    ratio: 544 / 766,
    title: [{ t: 'Add to Favorites: ', primary: true }, { t: 'Keep Your Dream Cars Close' }],
    subtitle:
      'Save the cars you love to your favorites so they are always ready when you decide to book.',
  },
  {
    key: '3',
    mockup: require('../../assets/mockups/onboarding-booking.png'),
    ratio: 592 / 821,
    title: [{ t: 'Track Your Rental: ', primary: true }, { t: 'Stay in Control of Your Journey' }],
    subtitle:
      'Follow your booking from pickup to return with live updates, directions, and easy support.',
  },
];

function Arrow({ dir, color }: { dir: 'left' | 'right'; color: string }) {
  return (
    <Svg
      width={22}
      height={22}
      viewBox="0 0 24 24"
      fill="none"
      style={{ transform: [{ scaleX: dir === 'left' ? -1 : 1 }] }}>
      <Path
        d="M4.5 12 H19 M13 6 L19 12 L13 18"
        stroke={color}
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default function Onboarding() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const { start } = useLocalSearchParams<{ start?: string }>();
  const initialIndex = Math.min(
    Math.max(parseInt(String(start ?? '0'), 10) || 0, 0),
    SLIDES.length - 1,
  );
  const [index, setIndex] = useState(initialIndex);
  const listRef = useRef<FlatList<Slide>>(null);

  const sheetH = Math.round(height * 0.42);
  const mockupH = Math.round(height * 0.43);

  const goTo = (i: number) => {
    if (i < 0 || i >= SLIDES.length) return;
    listRef.current?.scrollToIndex({ index: i, animated: true });
    setIndex(i);
  };
  const finish = () => router.replace('/welcome');
  const onNext = () => (index >= SLIDES.length - 1 ? finish() : goTo(index + 1));
  const onMomentumEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) =>
    setIndex(Math.round(e.nativeEvent.contentOffset.x / width));

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar style="dark" />

      <FlatList
        ref={listRef}
        data={SLIDES}
        keyExtractor={(s) => s.key}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onMomentumEnd}
        initialScrollIndex={initialIndex}
        getItemLayout={(_, i) => ({ length: width, offset: width * i, index: i })}
        renderItem={({ item }) => (
          <View style={{ width, flex: 1 }}>
            <View style={styles.mockupWrap}>
              <Image
                source={item.mockup}
                resizeMode="contain"
                style={{ height: mockupH, width: mockupH * item.ratio }}
              />
            </View>
            <View style={[styles.sheet, { height: sheetH }]}>
              <Text style={styles.title}>
                {item.title.map((seg, i) => (
                  <Text key={i} style={{ color: seg.primary ? colors.primary : colors.text }}>
                    {seg.t}
                  </Text>
                ))}
              </Text>
              <Text style={styles.subtitle}>{item.subtitle}</Text>
            </View>
          </View>
        )}
      />

      <Pressable style={[styles.skip, { top: insets.top + 10 }]} onPress={finish} hitSlop={10}>
        <Text style={styles.skipText}>Skip</Text>
      </Pressable>

      <View style={[styles.controls, { bottom: insets.bottom + 14 }]}>
        <View style={styles.sideSlot}>
          {index > 0 && (
            <Pressable style={styles.backBtn} onPress={() => goTo(index - 1)}>
              <Arrow dir="left" color={colors.primary} />
            </Pressable>
          )}
        </View>
        <View style={styles.dots}>
          {SLIDES.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                { backgroundColor: i === index ? colors.dotActive : colors.dotInactive },
              ]}
            />
          ))}
        </View>
        <View style={[styles.sideSlot, styles.alignEnd]}>
          <Pressable style={styles.nextBtn} onPress={onNext}>
            <Arrow dir="right" color={colors.white} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.screenGray },
  mockupWrap: { flex: 1, alignItems: 'center', justifyContent: 'flex-end' },
  sheet: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    paddingTop: 32,
    marginTop: -24,
  },
  title: {
    fontFamily: fontFamily.extrabold,
    fontSize: 24,
    lineHeight: 32,
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 14,
    fontFamily: fontFamily.regular,
    fontSize: 14,
    lineHeight: 21,
    color: colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: 0,
  },
  skip: { position: 'absolute', right: 24 },
  skipText: { fontFamily: fontFamily.semibold, fontSize: 16, color: colors.primary },
  controls: {
    position: 'absolute',
    left: 24,
    right: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sideSlot: { width: 60, justifyContent: 'center' },
  alignEnd: { alignItems: 'flex-end' },
  dots: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  dot: { width: 9, height: 9, borderRadius: 5 },
  backBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1.5,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  nextBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
