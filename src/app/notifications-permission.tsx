import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { colors, fontFamily } from '@/theme';

export default function NotificationsPermission() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom + 16 }]}>
      <StatusBar style="dark" />
      <View style={styles.center}>
        <View style={styles.iconCircle}>
          <Ionicons name="notifications" size={44} color={colors.primary} />
        </View>
        <Text style={styles.title}>Enable Notification Access</Text>
        <Text style={styles.subtitle}>
          Enable notifications to receive real-time updates.
        </Text>
        <PrimaryButton
          title="Allow Notification"
          pill
          style={styles.cta}
          onPress={() => router.replace('/home')}
        />
        <Pressable style={styles.linkWrap} onPress={() => router.replace('/home')} hitSlop={8}>
          <Text style={styles.link}>Maybe Later</Text>
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
