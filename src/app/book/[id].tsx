import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Header } from '@/components/ui/Header';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { CARS, getCar } from '@/data/cars';
import { colors, fontFamily } from '@/theme';

export default function BookCar() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const car = getCar(String(id)) ?? CARS[0];
  const [rentType, setRentType] = useState<'Self-Driver' | 'With Driver'>('Self-Driver');

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      <StatusBar style="dark" />
      <View style={styles.headerWrap}>
        <Header title="Book Car" onBack={() => router.back()} />
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 130 }}
        showsVerticalScrollIndicator={false}>
        <Image source={car.hero} style={styles.hero} contentFit="contain" />

        <View style={styles.chipRow}>
          <View style={styles.chip}>
            <Text style={styles.chipText}>{car.type}</Text>
          </View>
          <View style={styles.rating}>
            <Ionicons name="star" size={18} color={colors.star} />
            <Text style={styles.ratingText}>{car.rating.toFixed(1)}</Text>
          </View>
        </View>
        <Text style={styles.name}>{car.name}</Text>
        <View style={styles.divider} />

        <Text style={styles.kicker}>BOOK CAR</Text>
        <Text style={styles.section}>Rent Type</Text>
        <View style={styles.segment}>
          {(['Self-Driver', 'With Driver'] as const).map((t) => (
            <Pressable
              key={t}
              style={[styles.segmentBtn, rentType === t && styles.segmentBtnOn]}
              onPress={() => setRentType(t)}>
              <Text style={[styles.segmentText, rentType === t && styles.segmentTextOn]}>{t}</Text>
            </Pressable>
          ))}
        </View>
        {rentType === 'With Driver' && (
          <View style={styles.note}>
            <Text style={styles.noteText}>
              Additional $18/hr Driver Cost if You Choose With Driver Option
            </Text>
          </View>
        )}

        <Text style={styles.section}>Pick-Up Date and Time</Text>
        <View style={styles.dateRow}>
          <DateField label="Date" value="4 Oct" icon="calendar-outline" />
          <DateField label="Time" value="10:00 AM" icon="time-outline" />
        </View>

        <Text style={styles.section}>Return Date and Time</Text>
        <View style={styles.dateRow}>
          <DateField label="Date" value="5 Oct" icon="calendar-outline" />
          <DateField label="Time" value="10:00 AM" icon="time-outline" />
        </View>
      </ScrollView>

      <View style={[styles.bottomBar, { paddingBottom: insets.bottom || 16 }]}>
        <PrimaryButton title="Continue" pill onPress={() => router.push(`/book-info?id=${car.id}`)} />
      </View>
    </View>
  );
}

function DateField({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: keyof typeof Ionicons.glyphMap;
}) {
  return (
    <Pressable style={styles.dateField}>
      <View>
        <Text style={styles.dateLabel}>{label}</Text>
        <Text style={styles.dateValue}>{value}</Text>
      </View>
      <Ionicons name={icon} size={22} color={colors.primary} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  headerWrap: { paddingHorizontal: 24 },
  hero: { width: '70%', height: 150, alignSelf: 'center', marginVertical: 10 },
  chipRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  chip: { backgroundColor: colors.primaryTint, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 5 },
  chipText: { fontFamily: fontFamily.semibold, fontSize: 13, color: colors.primary },
  rating: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  ratingText: { fontFamily: fontFamily.semibold, fontSize: 15, color: colors.text },
  name: { marginTop: 12, fontFamily: fontFamily.bold, fontSize: 23, color: colors.text },
  divider: { height: 1, backgroundColor: colors.border, marginTop: 20 },
  kicker: {
    marginTop: 20,
    fontFamily: fontFamily.semibold,
    fontSize: 13,
    letterSpacing: 1.5,
    color: colors.textSecondary,
  },
  section: { marginTop: 16, fontFamily: fontFamily.bold, fontSize: 19, color: colors.text },
  segment: { flexDirection: 'row', gap: 14, marginTop: 16 },
  segmentBtn: {
    flex: 1,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.surfaceGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentBtnOn: { backgroundColor: colors.primary },
  segmentText: { fontFamily: fontFamily.semibold, fontSize: 17, color: colors.text },
  segmentTextOn: { color: colors.white },
  note: {
    marginTop: 16,
    backgroundColor: colors.surfaceGray,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
    borderRadius: 12,
    padding: 16,
  },
  noteText: { fontFamily: fontFamily.regular, fontSize: 14, lineHeight: 20, color: colors.textSecondary },
  dateRow: { flexDirection: 'row', gap: 14, marginTop: 16 },
  dateField: {
    flex: 1,
    height: 64,
    borderRadius: 14,
    backgroundColor: colors.surfaceGray,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateLabel: { fontFamily: fontFamily.regular, fontSize: 13, color: colors.textSecondary },
  dateValue: { marginTop: 3, fontFamily: fontFamily.semibold, fontSize: 16, color: colors.text },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingTop: 14,
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#1B2A4A',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: -4 },
    elevation: 10,
  },
});
