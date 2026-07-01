import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Chip } from '@/components/ui/Chip';
import { Header } from '@/components/ui/Header';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { RangeSlider } from '@/components/ui/RangeSlider';
import { colors, fontFamily } from '@/theme';

const TYPES = ['All', 'Sedan', 'SUV', 'Pickup'];
const TRANSMISSIONS = ['All', 'Manual', 'Automatic', 'CVT'];
const BRANDS = ['All', 'Toyota'];
const SCALE = ['$10', '$20', '$30', '$40', '$50', '$60'];
const REVIEWS = ['4.5 and above', '4.0 - 4.5', '3.5 - 4.0', '3.0 - 3.5', '2.5 - 3.0'];
const REVIEW_MIN = [4.5, 4.0, 3.5, 3.0, 2.5];
const PRICE_MIN = 10;
const PRICE_MAX = 60;

const DEFAULTS = { type: 'All', low: PRICE_MIN, high: PRICE_MAX, review: 0, transmission: 'All', brand: 'All' };

export default function Filter() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [type, setType] = useState(DEFAULTS.type);
  const [low, setLow] = useState(DEFAULTS.low);
  const [high, setHigh] = useState(DEFAULTS.high);
  const [review, setReview] = useState(DEFAULTS.review);
  const [transmission, setTransmission] = useState(DEFAULTS.transmission);
  const [brand, setBrand] = useState(DEFAULTS.brand);

  const reset = () => {
    setType(DEFAULTS.type);
    setLow(DEFAULTS.low);
    setHigh(DEFAULTS.high);
    setReview(DEFAULTS.review);
    setTransmission(DEFAULTS.transmission);
    setBrand(DEFAULTS.brand);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      <StatusBar style="dark" />
      <View style={styles.headerWrap}>
        <Header title="Filter" onBack={() => router.back()} />
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.section}>Type</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
          {TYPES.map((t) => (
            <Chip key={t} label={t} selected={type === t} onPress={() => setType(t)} />
          ))}
        </ScrollView>

        <Text style={styles.section}>Price Range (Hourly)</Text>
        <RangeSlider
          min={PRICE_MIN}
          max={PRICE_MAX}
          low={low}
          high={high}
          onChange={(l, h) => {
            setLow(l);
            setHigh(h);
          }}
        />
        <View style={styles.scale}>
          {SCALE.map((s) => (
            <Text key={s} style={styles.scaleText}>
              {s}
            </Text>
          ))}
        </View>

        <Text style={styles.section}>Reviews</Text>
        {REVIEWS.map((label, i) => (
          <Pressable key={label} style={styles.reviewRow} onPress={() => setReview(i)}>
            <View style={styles.stars}>
              {Array.from({ length: 5 }).map((_, s) => (
                <Ionicons key={s} name="star" size={20} color={colors.star} />
              ))}
            </View>
            <Text style={styles.reviewLabel}>{label}</Text>
            <View style={[styles.radio, review === i && styles.radioOn]}>
              {review === i && <View style={styles.radioDot} />}
            </View>
          </Pressable>
        ))}

        <Text style={styles.section}>Transmission</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
          {TRANSMISSIONS.map((t) => (
            <Chip
              key={t}
              label={t}
              selected={transmission === t}
              onPress={() => setTransmission(t)}
            />
          ))}
        </ScrollView>

        <Text style={styles.section}>Brand</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
          {BRANDS.map((b) => (
            <Chip key={b} label={b} selected={brand === b} onPress={() => setBrand(b)} />
          ))}
        </ScrollView>
      </ScrollView>

      <View style={[styles.bottomBar, { paddingBottom: insets.bottom || 16 }]}>
        <Pressable style={styles.resetBtn} onPress={reset}>
          <Text style={styles.resetText}>Reset Filter</Text>
        </Pressable>
        <PrimaryButton
          title="Apply"
          pill
          style={styles.applyBtn}
          onPress={() => {
            const parts = [`low=${low}`, `high=${high}`, `rating=${REVIEW_MIN[review]}`];
            if (type !== 'All') parts.push(`type=${encodeURIComponent(type)}`);
            if (brand !== 'All') parts.push(`brand=${encodeURIComponent(brand)}`);
            if (transmission !== 'All') parts.push(`transmission=${encodeURIComponent(transmission)}`);
            router.replace(`/search-results?${parts.join('&')}`);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  headerWrap: { paddingHorizontal: 24 },
  section: { marginTop: 26, marginBottom: 16, fontFamily: fontFamily.bold, fontSize: 20, color: colors.text },
  chips: { gap: 12, paddingRight: 24 },
  scale: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
  scaleText: { fontFamily: fontFamily.medium, fontSize: 13, color: colors.textSecondary },
  reviewRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
  stars: { flexDirection: 'row', gap: 3 },
  reviewLabel: { flex: 1, marginLeft: 14, fontFamily: fontFamily.medium, fontSize: 16, color: colors.text },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOn: { borderColor: colors.primary },
  radioDot: { width: 12, height: 12, borderRadius: 6, backgroundColor: colors.primary },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    gap: 14,
    paddingHorizontal: 24,
    paddingTop: 14,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  resetBtn: {
    flex: 1,
    height: 58,
    borderRadius: 999,
    backgroundColor: colors.surfaceGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetText: { fontFamily: fontFamily.semibold, fontSize: 17, color: colors.primary },
  applyBtn: { flex: 1 },
});
