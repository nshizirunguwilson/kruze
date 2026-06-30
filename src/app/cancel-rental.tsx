import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Header } from '@/components/ui/Header';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { colors, fontFamily } from '@/theme';

const REASONS = [
  'Schedule Change',
  'Book Another Car',
  'Found a better alternative',
  'Want to Book Another Car',
  'My Reason is not listed',
  'Other',
];

export default function CancelRental() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState(0);
  const [other, setOther] = useState('');

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      <StatusBar style="dark" />
      <View style={styles.headerWrap}>
        <Header title="Cancel Car Rental" onBack={() => router.back()} />
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 120 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <Text style={styles.prompt}>Please select the reason for cancellations:</Text>

        {REASONS.map((reason, i) => (
          <Pressable key={reason} style={styles.row} onPress={() => setSelected(i)}>
            <View style={[styles.radio, selected === i && styles.radioOn]}>
              {selected === i && <View style={styles.radioDot} />}
            </View>
            <Text style={styles.reason}>{reason}</Text>
          </Pressable>
        ))}

        <View style={styles.divider} />
        <Text style={styles.otherLabel}>Other</Text>
        <TextInput
          style={styles.textArea}
          value={other}
          onChangeText={setOther}
          placeholder="Enter your Reason"
          placeholderTextColor={colors.textSecondary}
          multiline
          textAlignVertical="top"
        />
      </ScrollView>

      <View style={[styles.bottomBar, { paddingBottom: insets.bottom || 16 }]}>
        <PrimaryButton title="Cancel Ride" pill onPress={() => router.replace('/my-bookings?tab=Cancelled')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  headerWrap: { paddingHorizontal: 24 },
  prompt: { marginTop: 16, fontFamily: fontFamily.regular, fontSize: 16, color: colors.textSecondary },
  row: { flexDirection: 'row', alignItems: 'center', gap: 16, paddingVertical: 14 },
  radio: { width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
  radioOn: { borderColor: colors.primary },
  radioDot: { width: 12, height: 12, borderRadius: 6, backgroundColor: colors.primary },
  reason: { fontFamily: fontFamily.medium, fontSize: 17, color: colors.text },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: 18 },
  otherLabel: { fontFamily: fontFamily.semibold, fontSize: 15, color: colors.text, marginBottom: 12 },
  textArea: {
    height: 150,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    fontFamily: fontFamily.regular,
    fontSize: 16,
    color: colors.text,
  },
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
