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
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { InputField } from '@/components/ui/Field';
import { Header } from '@/components/ui/Header';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { colors, fontFamily } from '@/theme';

export default function PasswordManager() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [confirm, setConfirm] = useState('');

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      <StatusBar style="dark" />
      <View style={styles.headerWrap}>
        <Header title="Password Manager" onBack={() => router.back()} />
      </View>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 130 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View style={{ marginTop: 8 }}>
            <InputField
              label="Current Password"
              value={current}
              onChangeText={setCurrent}
              placeholder="Enter current password"
              secure
              footer={
                <Pressable
                  style={styles.forgotWrap}
                  hitSlop={8}
                  onPress={() => router.push('/new-password')}>
                  <Text style={styles.forgot}>Forgot Password?</Text>
                </Pressable>
              }
            />
            <View style={{ height: 8 }} />
            <InputField
              label="New Password"
              value={next}
              onChangeText={setNext}
              placeholder="Enter new password"
              secure
            />
            <View style={{ height: 22 }} />
            <InputField
              label="Confirm New Password"
              value={confirm}
              onChangeText={setConfirm}
              placeholder="Re-enter new password"
              secure
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={[styles.bottomBar, { paddingBottom: insets.bottom || 16 }]}>
        <PrimaryButton title="Password Manager" pill onPress={() => router.back()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  flex: { flex: 1 },
  headerWrap: { paddingHorizontal: 24 },
  forgotWrap: { alignSelf: 'flex-end', marginTop: 12 },
  forgot: { fontFamily: fontFamily.semibold, fontSize: 14, color: colors.primary, textDecorationLine: 'underline' },
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
