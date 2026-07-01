import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import {
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputKeyPressEventData,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Header } from '@/components/ui/Header';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { colors, fontFamily } from '@/theme';

const LENGTH = 4;

export default function PickupOtp() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { type } = useLocalSearchParams<{ type?: string }>();
  const isReturn = type === 'return';
  const [digits, setDigits] = useState<string[]>(Array(LENGTH).fill(''));
  const [cooldown, setCooldown] = useState(0);
  const inputs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  const resend = () => {
    if (cooldown > 0) return;
    setDigits(Array(LENGTH).fill(''));
    inputs.current[0]?.focus();
    setCooldown(30);
  };

  const setAt = (i: number, v: string) => {
    const clean = v.replace(/[^0-9]/g, '').slice(-1);
    setDigits((prev) => {
      const next = [...prev];
      next[i] = clean;
      return next;
    });
    if (clean && i < LENGTH - 1) inputs.current[i + 1]?.focus();
  };
  const onKeyPress = (i: number, e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
    if (e.nativeEvent.key === 'Backspace' && !digits[i] && i > 0) inputs.current[i - 1]?.focus();
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      <StatusBar style="dark" />
      <Header title="OTP Verification" onBack={() => router.back()} />

      <Text style={styles.title}>Enter Esther’s OTP</Text>
      <Text style={styles.subtitle}>We sent a PIN to Rental Partner Mobile Number</Text>

      <View style={styles.boxes}>
        {digits.map((d, i) => (
          <TextInput
            key={i}
            ref={(r) => {
              inputs.current[i] = r;
            }}
            style={styles.box}
            value={d}
            onChangeText={(v) => setAt(i, v)}
            onKeyPress={(e) => onKeyPress(i, e)}
            keyboardType="number-pad"
            maxLength={1}
            placeholder="-"
            placeholderTextColor={colors.textMuted}
            textAlign="center"
          />
        ))}
      </View>

      <View style={styles.resendWrap}>
        <Text style={styles.resendQuestion}>Didn’t receive OTP?</Text>
        <Pressable hitSlop={8} onPress={resend} disabled={cooldown > 0}>
          <Text style={[styles.resend, cooldown > 0 && styles.resendDisabled]}>
            {cooldown > 0 ? `Resend code in ${cooldown}s` : 'Resend code'}
          </Text>
        </Pressable>
      </View>

      <PrimaryButton
        title={isReturn ? 'Verify & Return Car' : 'Verify & Pick Up Car'}
        pill
        style={styles.verify}
        onPress={() => router.replace('/home')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white, paddingHorizontal: 24 },
  title: { marginTop: 36, fontFamily: fontFamily.bold, fontSize: 28, color: colors.text, textAlign: 'center' },
  subtitle: { marginTop: 12, fontFamily: fontFamily.regular, fontSize: 15, lineHeight: 22, color: colors.textSecondary, textAlign: 'center', paddingHorizontal: 24 },
  boxes: { flexDirection: 'row', justifyContent: 'center', gap: 16, marginTop: 40 },
  box: { width: 68, height: 68, borderRadius: 16, borderWidth: 1, borderColor: colors.border, fontFamily: fontFamily.semibold, fontSize: 22, color: colors.text },
  resendWrap: { alignItems: 'center', marginTop: 30 },
  resendQuestion: { fontFamily: fontFamily.regular, fontSize: 15, color: colors.textSecondary },
  resend: { marginTop: 8, fontFamily: fontFamily.bold, fontSize: 15, color: colors.text, textDecorationLine: 'underline' },
  resendDisabled: { color: colors.textSecondary, textDecorationLine: 'none' },
  verify: { marginTop: 32 },
});
