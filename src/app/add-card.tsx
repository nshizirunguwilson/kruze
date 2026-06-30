import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Header } from '@/components/ui/Header';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { colors, fontFamily } from '@/theme';

export default function AddCard() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [name, setName] = useState('Esther Howard');
  const [number, setNumber] = useState('4716 9627 1635 8047');
  const [expiry, setExpiry] = useState('02/30');
  const [cvv, setCvv] = useState('');
  const [save, setSave] = useState(true);

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      <StatusBar style="dark" />
      <View style={styles.headerWrap}>
        <Header title="Add Card" onBack={() => router.back()} />
      </View>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 130 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <LinearGradient
            colors={['#0A84FF', '#3DA0FF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.card}>
            <Text style={styles.visa}>VISA</Text>
            <Text style={styles.cardNumber}>{number}</Text>
            <View style={styles.cardBottom}>
              <View>
                <Text style={styles.cardCaption}>Card holder name</Text>
                <Text style={styles.cardValue}>{name}</Text>
              </View>
              <View>
                <Text style={styles.cardCaption}>Expiry date</Text>
                <Text style={styles.cardValue}>{expiry}</Text>
              </View>
              <View style={styles.chip}>
                <View style={styles.chipLineH} />
                <View style={styles.chipLineV} />
              </View>
            </View>
          </LinearGradient>

          <Label text="Card Holder Name" />
          <BorderedInput value={name} onChangeText={setName} />

          <Label text="Card Number" />
          <BorderedInput value={number} onChangeText={setNumber} keyboardType="number-pad" />

          <View style={styles.dualRow}>
            <View style={styles.dualCol}>
              <Label text="Expiry Date" />
              <BorderedInput value={expiry} onChangeText={setExpiry} />
            </View>
            <View style={styles.dualCol}>
              <Label text="CVV" />
              <BorderedInput
                value={cvv}
                onChangeText={setCvv}
                placeholder="000"
                keyboardType="number-pad"
                secureTextEntry
              />
            </View>
          </View>

          <Pressable style={styles.saveRow} onPress={() => setSave((s) => !s)} hitSlop={6}>
            <View style={[styles.checkbox, save && styles.checkboxOn]}>
              {save && <Ionicons name="checkmark" size={16} color={colors.white} />}
            </View>
            <Text style={styles.saveText}>Save Card</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={[styles.bottomBar, { paddingBottom: insets.bottom || 16 }]}>
        <PrimaryButton title="Add Card" pill onPress={() => router.back()} />
      </View>
    </View>
  );
}

function Label({ text }: { text: string }) {
  return <Text style={styles.label}>{text}</Text>;
}

function BorderedInput(props: React.ComponentProps<typeof TextInput>) {
  return (
    <TextInput
      {...props}
      style={styles.input}
      placeholderTextColor={colors.textSecondary}
      autoCapitalize="none"
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  flex: { flex: 1 },
  headerWrap: { paddingHorizontal: 24 },
  card: {
    height: 200,
    borderRadius: 20,
    padding: 22,
    marginTop: 16,
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  visa: { alignSelf: 'flex-end', fontFamily: fontFamily.extrabold, fontSize: 26, fontStyle: 'italic', color: colors.white },
  cardNumber: { fontFamily: fontFamily.bold, fontSize: 23, letterSpacing: 1.5, color: colors.white },
  cardBottom: { flexDirection: 'row', alignItems: 'flex-end', gap: 28 },
  cardCaption: { fontFamily: fontFamily.regular, fontSize: 11, color: 'rgba(255,255,255,0.8)' },
  cardValue: { marginTop: 4, fontFamily: fontFamily.semibold, fontSize: 15, color: colors.white },
  chip: {
    marginLeft: 'auto',
    width: 44,
    height: 32,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipLineH: { position: 'absolute', width: 44, height: 1.5, backgroundColor: 'rgba(255,255,255,0.6)' },
  chipLineV: { width: 1.5, height: 32, backgroundColor: 'rgba(255,255,255,0.6)' },
  label: { marginTop: 22, marginBottom: 10, fontFamily: fontFamily.medium, fontSize: 15, color: colors.text },
  input: {
    height: 56,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 16,
    fontFamily: fontFamily.regular,
    fontSize: 16,
    color: colors.text,
  },
  dualRow: { flexDirection: 'row', gap: 14 },
  dualCol: { flex: 1 },
  saveRow: { flexDirection: 'row', alignItems: 'center', marginTop: 24 },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 7,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  checkboxOn: { backgroundColor: colors.primary, borderColor: colors.primary },
  saveText: { fontFamily: fontFamily.semibold, fontSize: 16, color: colors.text },
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
