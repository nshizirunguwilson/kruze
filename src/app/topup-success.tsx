import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Header } from '@/components/ui/Header';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { colors, fontFamily } from '@/theme';

export default function TopUpSuccess() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8, paddingBottom: insets.bottom + 16 }]}>
      <StatusBar style="dark" />
      <Header onBack={() => router.replace('/wallet')} />

      <View style={styles.center}>
        <View style={styles.check}>
          <Ionicons name="checkmark" size={58} color={colors.white} />
        </View>
        <Text style={styles.title}>Top Up Successful!</Text>
        <Text style={styles.subtitle}>You have successfully topped up your e-wallet for $500.00</Text>
      </View>

      <PrimaryButton title="OK" pill onPress={() => router.replace('/wallet')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white, paddingHorizontal: 24 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  check: { width: 118, height: 118, borderRadius: 59, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  title: { marginTop: 32, fontFamily: fontFamily.bold, fontSize: 26, color: colors.text },
  subtitle: { marginTop: 14, fontFamily: fontFamily.regular, fontSize: 15, lineHeight: 23, color: colors.textSecondary, textAlign: 'center', paddingHorizontal: 24 },
});
