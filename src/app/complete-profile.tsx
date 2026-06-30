import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CircleBackButton } from '@/components/ui/CircleBackButton';
import { InputField, SelectField } from '@/components/ui/Field';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { colors, fontFamily } from '@/theme';

const GENDERS = ['Male', 'Female', 'Other', 'Prefer not to say'];

export default function CompleteProfile() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [genderIndex, setGenderIndex] = useState(-1);

  const cycleGender = () => setGenderIndex((i) => (i + 1) % GENDERS.length);

  return (
    <View style={[styles.container, { paddingTop: insets.top + 16 }]}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 24 }]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <CircleBackButton onPress={() => router.back()} />

          <Text style={styles.title}>Complete Your Profile</Text>
          <Text style={styles.subtitle}>
            Don’t worry, only you can see your personal data. No one else will be able to see it.
          </Text>

          <View style={styles.avatarWrap}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={56} color={colors.primary} />
            </View>
            <View style={styles.editBadge}>
              <Ionicons name="pencil" size={15} color={colors.white} />
            </View>
          </View>

          <View style={styles.form}>
            <InputField
              label="Name"
              value={name}
              onChangeText={setName}
              placeholder="Ex. John Doe"
              autoCapitalize="words"
            />
            <View style={{ height: 22 }} />
            <InputField
              label="Phone Number"
              value={phone}
              onChangeText={setPhone}
              placeholder="Enter Phone Number"
              keyboardType="phone-pad"
              left={
                <View style={styles.prefix}>
                  <Text style={styles.prefixText}>+1</Text>
                  <Ionicons name="chevron-down" size={16} color={colors.text} />
                  <View style={styles.prefixDivider} />
                </View>
              }
            />
            <View style={{ height: 22 }} />
            <SelectField
              label="Gender"
              placeholder="Select"
              value={genderIndex >= 0 ? GENDERS[genderIndex] : undefined}
              onPress={cycleGender}
            />
          </View>

          <PrimaryButton
            title="Complete Profile"
            pill
            style={styles.cta}
            onPress={() => router.replace('/location')}
          />
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
    marginTop: 28,
    fontFamily: fontFamily.bold,
    fontSize: 27,
    color: colors.text,
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 12,
    fontFamily: fontFamily.regular,
    fontSize: 15,
    lineHeight: 22,
    color: colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: 8,
  },
  avatarWrap: { alignSelf: 'center', marginTop: 32, marginBottom: 36 },
  avatar: {
    width: 132,
    height: 132,
    borderRadius: 66,
    backgroundColor: colors.surfaceGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editBadge: {
    position: 'absolute',
    right: 4,
    bottom: 4,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: colors.white,
  },
  form: { marginBottom: 36 },
  prefix: { flexDirection: 'row', alignItems: 'center', marginRight: 12 },
  prefixText: { fontFamily: fontFamily.semibold, fontSize: 16, color: colors.text, marginRight: 4 },
  prefixDivider: {
    width: 1,
    height: 24,
    backgroundColor: colors.border,
    marginLeft: 12,
  },
  cta: { marginTop: 4 },
});
