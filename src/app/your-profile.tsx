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
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SelectField } from '@/components/ui/Field';
import { Header } from '@/components/ui/Header';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { colors, fontFamily } from '@/theme';

const GENDERS = ['Male', 'Female', 'Other', 'Prefer not to say'];

export default function YourProfile() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [name, setName] = useState('Esther Howard');
  const [phone, setPhone] = useState('603.555.0123');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState(-1);

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      <StatusBar style="dark" />
      <View style={styles.headerWrap}>
        <Header title="Your Profile" onBack={() => router.back()} />
      </View>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 130 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View style={styles.avatarWrap}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={50} color={colors.textSecondary} />
            </View>
            <View style={styles.editBadge}>
              <Ionicons name="pencil" size={14} color={colors.white} />
            </View>
          </View>

          <Label text="Name" />
          <View style={styles.field}>
            <TextInput style={styles.input} value={name} onChangeText={setName} />
          </View>

          <Label text="Phone Number" />
          <View style={styles.field}>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
            <Pressable hitSlop={8}>
              <Text style={styles.change}>Change</Text>
            </Pressable>
          </View>

          <Label text="Email" />
          <View style={styles.field}>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="example@gmail.com"
              placeholderTextColor={colors.textSecondary}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <Label text="DOB" />
          <View style={styles.field}>
            <TextInput
              style={styles.input}
              value={dob}
              onChangeText={setDob}
              placeholder="DD/MM/YY"
              placeholderTextColor={colors.textSecondary}
            />
          </View>

          <View style={{ marginTop: 22 }}>
            <SelectField
              label="Gender"
              value={gender >= 0 ? GENDERS[gender] : undefined}
              placeholder="Select"
              onPress={() => setGender((g) => (g + 1) % GENDERS.length)}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={[styles.bottomBar, { paddingBottom: insets.bottom || 16 }]}>
        <PrimaryButton title="Update Profile" pill onPress={() => router.back()} />
      </View>
    </View>
  );
}

function Label({ text }: { text: string }) {
  return <Text style={styles.label}>{text}</Text>;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  flex: { flex: 1 },
  headerWrap: { paddingHorizontal: 24 },
  avatarWrap: { alignSelf: 'center', marginTop: 12, marginBottom: 12 },
  avatar: { width: 110, height: 110, borderRadius: 55, backgroundColor: colors.surfaceGray, alignItems: 'center', justifyContent: 'center' },
  editBadge: { position: 'absolute', right: 2, bottom: 2, width: 34, height: 34, borderRadius: 17, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: colors.white },
  label: { marginTop: 20, marginBottom: 10, fontFamily: fontFamily.medium, fontSize: 15, color: colors.text },
  field: {
    height: 56,
    borderRadius: 14,
    backgroundColor: colors.surfaceGray,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: { flex: 1, fontFamily: fontFamily.regular, fontSize: 16, color: colors.text },
  change: { fontFamily: fontFamily.semibold, fontSize: 15, color: colors.primary },
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
