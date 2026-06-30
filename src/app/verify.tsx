import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
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

import { CircleBackButton } from '@/components/ui/CircleBackButton';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { colors, fontFamily } from '@/theme';

const LENGTH = 4;

export default function Verify() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [digits, setDigits] = useState<string[]>(Array(LENGTH).fill(''));
  const inputs = useRef<(TextInput | null)[]>([]);

  const setAt = (i: number, v: string) => {
    const clean = v.replace(/[^0-9]/g, '').slice(-1);
    setDigits((prev) => {
      const next = [...prev];
      next[i] = clean;
      return next;
    });
    if (clean && i < LENGTH - 1) inputs.current[i + 1]?.focus();
  };

  const onKeyPress = (
    i: number,
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
  ) => {
    if (e.nativeEvent.key === 'Backspace' && !digits[i] && i > 0) {
      inputs.current[i - 1]?.focus();
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top + 16 }]}>
      <StatusBar style="dark" />
      <CircleBackButton onPress={() => router.back()} />

      <Text style={styles.title}>Verify Code</Text>
      <Text style={styles.subtitle}>Please enter the code we just sent to email</Text>
      <Text style={styles.email}>example@email.com</Text>

      <View style={styles.boxes}>
        {digits.map((d, i) => (
          <TextInput
            key={i}
            ref={(r) => {
              inputs.current[i] = r;
            }}
            style={[styles.box, d ? styles.boxFilled : null]}
            value={d}
            onChangeText={(v) => setAt(i, v)}
            onKeyPress={(e) => onKeyPress(i, e)}
            keyboardType="number-pad"
            maxLength={1}
            placeholder="-"
            placeholderTextColor={colors.textMuted}
            textAlign="center"
            returnKeyType="done"
          />
        ))}
      </View>

      <View style={styles.resendWrap}>
        <Text style={styles.resendQuestion}>Didn’t receive OTP?</Text>
        <Pressable hitSlop={8}>
          <Text style={styles.resend}>Resend code</Text>
        </Pressable>
      </View>

      <PrimaryButton
        title="Verify"
        pill
        style={styles.verify}
        onPress={() => router.push('/complete-profile')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white, paddingHorizontal: 24 },
  title: {
    marginTop: 40,
    fontFamily: fontFamily.bold,
    fontSize: 27,
    color: colors.text,
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 12,
    fontFamily: fontFamily.regular,
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  email: {
    marginTop: 4,
    fontFamily: fontFamily.semibold,
    fontSize: 15,
    color: colors.primary,
    textAlign: 'center',
  },
  boxes: { flexDirection: 'row', justifyContent: 'center', gap: 16, marginTop: 44 },
  box: {
    width: 68,
    height: 68,
    borderRadius: 16,
    backgroundColor: colors.surfaceGray,
    fontFamily: fontFamily.semibold,
    fontSize: 22,
    color: colors.text,
  },
  boxFilled: { backgroundColor: colors.surfaceGray },
  resendWrap: { alignItems: 'center', marginTop: 34 },
  resendQuestion: { fontFamily: fontFamily.regular, fontSize: 15, color: colors.textSecondary },
  resend: {
    marginTop: 8,
    fontFamily: fontFamily.bold,
    fontSize: 15,
    color: colors.text,
    textDecorationLine: 'underline',
  },
  verify: { marginTop: 36 },
});
