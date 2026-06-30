import { Ionicons } from '@expo/vector-icons';
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

export default function SignUp() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agree, setAgree] = useState(true);

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
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>
            Fill your information below or register with your social account.
          </Text>

          <View style={styles.form}>
            <InputField
              label="Name"
              value={name}
              onChangeText={setName}
              placeholder="Ex. John Doe"
              autoCapitalize="words"
            />
            <View style={{ height: 20 }} />
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
            />
          </View>

          <Pressable style={styles.agreeRow} onPress={() => setAgree((a) => !a)} hitSlop={6}>
            <View style={[styles.checkbox, agree && styles.checkboxOn]}>
              {agree && <Ionicons name="checkmark" size={16} color={colors.white} />}
            </View>
            <Text style={styles.agreeText}>
              Agree with <Text style={styles.link}>Terms & Condition</Text>
            </Text>
          </Pressable>

          <PrimaryButton title="Sign Up" pill onPress={() => router.push('/verify')} />

          <View style={styles.social}>
            <SocialRow label="Or sign up with" />
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <Pressable onPress={() => router.push('/sign-in')} hitSlop={8}>
              <Text style={styles.footerLink}>Sign In</Text>
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
    marginTop: 40,
    fontFamily: fontFamily.bold,
    fontSize: 27,
    color: colors.text,
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 14,
    fontFamily: fontFamily.regular,
    fontSize: 15,
    lineHeight: 22,
    color: colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: 12,
  },
  form: { marginTop: 32 },
  agreeRow: { flexDirection: 'row', alignItems: 'center', marginTop: 20, marginBottom: 28 },
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
  agreeText: { fontFamily: fontFamily.medium, fontSize: 15, color: colors.text },
  link: {
    fontFamily: fontFamily.semibold,
    color: colors.primary,
    textDecorationLine: 'underline',
  },
  social: { marginTop: 32 },
  footer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 30 },
  footerText: { fontFamily: fontFamily.regular, fontSize: 15, color: colors.text },
  footerLink: {
    fontFamily: fontFamily.semibold,
    fontSize: 15,
    color: colors.primary,
    textDecorationLine: 'underline',
  },
});
