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
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { SocialRow } from '@/components/ui/SocialRow';
import { colors, fontFamily } from '@/theme';

export default function SignIn() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 24 }]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Sign In</Text>
          <Text style={styles.subtitle}>Hi! Welcome back, you’ve been missed</Text>

          <View style={styles.form}>
            <InputField
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="example@gmail.com"
              keyboardType="email-address"
            />
            <View style={{ height: 20 }} />
            <InputField
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              secure
              footer={
                <Pressable
                  style={styles.forgotWrap}
                  onPress={() => router.push('/new-password')}
                  hitSlop={8}>
                  <Text style={styles.forgot}>Forgot Password?</Text>
                </Pressable>
              }
            />
          </View>

          <PrimaryButton title="Sign In" pill onPress={() => router.replace('/home')} />

          <View style={styles.social}>
            <SocialRow label="Or sign in with" />
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Don’t have an account? </Text>
            <Pressable onPress={() => router.push('/sign-up')} hitSlop={8}>
              <Text style={styles.footerLink}>Sign Up</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  flex: { flex: 1 },
  content: { paddingHorizontal: 24 },
  title: {
    marginTop: 56,
    fontFamily: fontFamily.bold,
    fontSize: 27,
    color: colors.text,
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 14,
    fontFamily: fontFamily.regular,
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  form: { marginTop: 44, marginBottom: 36 },
  forgotWrap: { alignSelf: 'flex-end', marginTop: 14 },
  forgot: {
    fontFamily: fontFamily.semibold,
    fontSize: 14,
    color: colors.primary,
    textDecorationLine: 'underline',
  },
  social: { marginTop: 40 },
  footer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 36 },
  footerText: { fontFamily: fontFamily.regular, fontSize: 15, color: colors.text },
  footerLink: {
    fontFamily: fontFamily.semibold,
    fontSize: 15,
    color: colors.primary,
    textDecorationLine: 'underline',
  },
});
