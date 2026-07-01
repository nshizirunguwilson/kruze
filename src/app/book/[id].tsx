import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useMemo, useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Header } from '@/components/ui/Header';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { CARS, getCar } from '@/data/cars';
import { colors, fontFamily } from '@/theme';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const buildDates = () => {
  const out: string[] = [];
  const now = new Date();
  for (let i = 0; i < 14; i++) {
    const d = new Date(now.getTime() + i * 86400000);
    out.push(`${d.getDate()} ${MONTHS[d.getMonth()]}`);
  }
  return out;
};

const buildTimes = () => {
  const out: string[] = [];
  for (let h = 6; h <= 22; h++) {
    const ampm = h < 12 ? 'AM' : 'PM';
    const hh = h % 12 === 0 ? 12 : h % 12;
    out.push(`${hh}:00 ${ampm}`);
  }
  return out;
};

type Field = 'pickupDate' | 'pickupTime' | 'returnDate' | 'returnTime';

export default function BookCar() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const car = getCar(String(id)) ?? CARS[0];
  const [rentType, setRentType] = useState<'Self-Driver' | 'With Driver'>('Self-Driver');

  const DATES = useMemo(buildDates, []);
  const TIMES = useMemo(buildTimes, []);
  const [values, setValues] = useState<Record<Field, string>>({
    pickupDate: DATES[0],
    pickupTime: '10:00 AM',
    returnDate: DATES[1],
    returnTime: '10:00 AM',
  });
  const [picker, setPicker] = useState<{ field: Field; kind: 'date' | 'time' } | null>(null);
  const options = picker?.kind === 'date' ? DATES : TIMES;
  const select = (v: string) => {
    if (picker) setValues((prev) => ({ ...prev, [picker.field]: v }));
    setPicker(null);
  };

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
          <DateField
            label="Date"
            value={values.pickupDate}
            icon="calendar-outline"
            onPress={() => setPicker({ field: 'pickupDate', kind: 'date' })}
          />
          <DateField
            label="Time"
            value={values.pickupTime}
            icon="time-outline"
            onPress={() => setPicker({ field: 'pickupTime', kind: 'time' })}
          />
        </View>

        <Text style={styles.section}>Return Date and Time</Text>
        <View style={styles.dateRow}>
          <DateField
            label="Date"
            value={values.returnDate}
            icon="calendar-outline"
            onPress={() => setPicker({ field: 'returnDate', kind: 'date' })}
          />
          <DateField
            label="Time"
            value={values.returnTime}
            icon="time-outline"
            onPress={() => setPicker({ field: 'returnTime', kind: 'time' })}
          />
        </View>
      </ScrollView>

      <Modal
        visible={!!picker}
        transparent
        animationType="slide"
        onRequestClose={() => setPicker(null)}>
        <Pressable style={styles.backdrop} onPress={() => setPicker(null)} />
        <View style={[styles.sheet, { paddingBottom: insets.bottom + 12 }]}>
          <Text style={styles.sheetTitle}>
            {picker?.kind === 'date' ? 'Select Date' : 'Select Time'}
          </Text>
          <View style={styles.sheetDivider} />
          <ScrollView style={{ maxHeight: 340 }} showsVerticalScrollIndicator={false}>
            {options.map((opt) => {
              const current = picker ? values[picker.field] === opt : false;
              return (
                <Pressable key={opt} style={styles.optionRow} onPress={() => select(opt)}>
                  <Text style={[styles.optionText, current && styles.optionTextOn]}>{opt}</Text>
                  {current && <Ionicons name="checkmark" size={22} color={colors.primary} />}
                </Pressable>
              );
            })}
          </ScrollView>
        </View>
      </Modal>

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
  onPress,
}: {
  label: string;
  value: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
}) {
  return (
    <Pressable style={styles.dateField} onPress={onPress}>
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
  backdrop: { flex: 1, backgroundColor: 'rgba(20,23,28,0.35)' },
  sheet: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 24,
    paddingTop: 22,
  },
  sheetTitle: { fontFamily: fontFamily.bold, fontSize: 20, color: colors.text, textAlign: 'center' },
  sheetDivider: { height: 1, backgroundColor: colors.border, marginTop: 16 },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  optionText: { fontFamily: fontFamily.medium, fontSize: 16, color: colors.text },
  optionTextOn: { fontFamily: fontFamily.semibold, color: colors.primary },
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
