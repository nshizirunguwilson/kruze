import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Header } from '@/components/ui/Header';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { colors, fontFamily } from '@/theme';

export default function Arrived() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { type } = useLocalSearchParams<{ type?: string }>();
  const isReturn = type === 'return';

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8, paddingBottom: insets.bottom + 16 }]}>
      <StatusBar style="dark" />
      <Header onBack={() => router.back()} />

      <View style={styles.center}>
        <View style={styles.check}>
          <Ionicons name="checkmark" size={58} color={colors.white} />
        </View>
        <Text style={styles.title}>
          {isReturn ? 'You Have Arrived at\nCar Return!' : 'You Have Arrived at Car\nPick-Up Location!'}
        </Text>
        <Text style={styles.subtitle}>You have arrived at the Car location</Text>
      </View>

      <PrimaryButton
        title={isReturn ? 'Return Car' : 'OK'}
        pill
        onPress={() => router.push(`/pickup-otp?type=${isReturn ? 'return' : 'pickup'}`)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white, paddingHorizontal: 24 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  check: { width: 118, height: 118, borderRadius: 59, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  title: { marginTop: 32, fontFamily: fontFamily.bold, fontSize: 26, lineHeight: 34, color: colors.text, textAlign: 'center' },
  subtitle: { marginTop: 14, fontFamily: fontFamily.regular, fontSize: 15, color: colors.textSecondary, textAlign: 'center' },
});
