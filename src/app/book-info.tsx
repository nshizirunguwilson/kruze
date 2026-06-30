import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
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

import { InputField, SelectField } from '@/components/ui/Field';
import { Header } from '@/components/ui/Header';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { colors, fontFamily } from '@/theme';

const GENDERS = ['Male', 'Female', 'Other', 'Prefer not to say'];
const COUNTRIES = ['United States', 'Canada', 'United Kingdom', 'Australia'];

export default function BookInfo() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('example@gmail.com');
  const [phone, setPhone] = useState('(208) 555-0112');
  const [gender, setGender] = useState(0);
  const [country, setCountry] = useState(0);

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      <StatusBar style="dark" />
      <View style={styles.headerWrap}>
        <Header title="Book Car" onBack={() => router.back()} />
      </View>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 130 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Your Information Details</Text>

          <View style={{ marginTop: 24, gap: 20 }}>
            <InputField label="Name" value={name} onChangeText={setName} autoCapitalize="words" />
            <InputField
              label="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <SelectField
              label="Gender"
              value={GENDERS[gender]}
              placeholder="Select"
              onPress={() => setGender((g) => (g + 1) % GENDERS.length)}
            />
            <InputField
              label="Phone Number"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              left={
                <View style={styles.prefix}>
                  <Text style={styles.prefixText}>+1</Text>
                  <Ionicons name="chevron-down" size={16} color={colors.text} />
                  <View style={styles.prefixDivider} />
                </View>
              }
            />
            <SelectField
              label="County"
              value={COUNTRIES[country]}
              placeholder="Select"
              onPress={() => setCountry((c) => (c + 1) % COUNTRIES.length)}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={[styles.bottomBar, { paddingBottom: insets.bottom || 16 }]}>
        <PrimaryButton
          title="Continue"
          pill
          onPress={() => router.push(`/review-summary?id=${id}`)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  flex: { flex: 1 },
  headerWrap: { paddingHorizontal: 24 },
  title: { marginTop: 12, fontFamily: fontFamily.bold, fontSize: 23, color: colors.text },
  prefix: { flexDirection: 'row', alignItems: 'center', marginRight: 12 },
  prefixText: { fontFamily: fontFamily.semibold, fontSize: 16, color: colors.text, marginRight: 4 },
  prefixDivider: { width: 1, height: 24, backgroundColor: colors.border, marginLeft: 12 },
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
