import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { colors, fontFamily } from '@/theme';

export default function Location() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom + 16 }]}>
      <StatusBar style="dark" />
      <View style={styles.center}>
        <View style={styles.iconCircle}>
          <Ionicons name="location" size={46} color={colors.primary} />
        </View>
        <Text style={styles.title}>What is Your Location?</Text>
        <Text style={styles.subtitle}>
          We need to know your location in order to suggest nearby services.
        </Text>
        <PrimaryButton
          title="Allow Location Access"
          pill
          style={styles.cta}
          onPress={() => router.push('/notifications-permission')}
        />
        <Pressable
          style={styles.linkWrap}
          onPress={() => router.push('/enter-location')}
          hitSlop={8}>
          <Text style={styles.link}>Enter Location Manually</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white, paddingHorizontal: 24 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  iconCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: colors.surfaceGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginTop: 40,
    fontFamily: fontFamily.bold,
    fontSize: 24,
    letterSpacing: -0.4,
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
    paddingHorizontal: 16,
  },
  cta: { marginTop: 44 },
  linkWrap: { marginTop: 26 },
  link: { fontFamily: fontFamily.semibold, fontSize: 16, color: colors.primary },
});
