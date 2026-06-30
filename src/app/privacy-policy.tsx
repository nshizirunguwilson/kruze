import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Header } from '@/components/ui/Header';
import { colors, fontFamily } from '@/theme';

const SECTIONS = [
  {
    title: 'Cancelation Policy',
    paragraphs: [
      'You may cancel a booking at any time before the pickup window opens and receive a full refund to your original payment method.',
      'Cancellations made after the pickup window has started may be subject to a partial charge covering the time the car was reserved on your behalf.',
      'Refunds are processed within 3 to 5 business days. The exact timing depends on your bank or card provider.',
    ],
  },
  {
    title: 'Terms & Condition',
    paragraphs: [
      'By renting a car through this app you confirm that you hold a valid driving license and agree to operate the vehicle responsibly and within the law.',
      'You are responsible for any traffic fines, tolls, or damage incurred during your rental period. Report any incident to the rental partner immediately.',
      'We collect only the information needed to process your bookings and payments. Your personal data is never sold to third parties.',
    ],
  },
];

export default function PrivacyPolicy() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      <StatusBar style="dark" />
      <View style={styles.headerWrap}>
        <Header title="Privacy Policy" onBack={() => router.back()} />
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: insets.bottom + 24 }}
        showsVerticalScrollIndicator={false}>
        {SECTIONS.map((section) => (
          <View key={section.title} style={{ marginTop: 22 }}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.paragraphs.map((p, i) => (
              <Text key={i} style={styles.paragraph}>
                {p}
              </Text>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  headerWrap: { paddingHorizontal: 24 },
  sectionTitle: { fontFamily: fontFamily.bold, fontSize: 17, color: colors.primary, marginBottom: 12 },
  paragraph: { fontFamily: fontFamily.regular, fontSize: 14, lineHeight: 23, color: colors.textSecondary, marginBottom: 14 },
});
