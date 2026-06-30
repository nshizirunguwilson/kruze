import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, fontFamily } from '@/theme';

// Placeholder — built fully in Batch 2 (auth flow).
export default function SignUpPlaceholder() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: insets.top + 12 }]}>
      <Pressable onPress={() => router.back()} hitSlop={12}>
        <Text style={styles.back}>‹ Back</Text>
      </Pressable>
      <View style={styles.center}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.sub}>Coming in Batch 2</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white, paddingHorizontal: 24 },
  back: { fontFamily: fontFamily.medium, fontSize: 17, color: colors.primary },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontFamily: fontFamily.bold, fontSize: 28, color: colors.text },
  sub: { marginTop: 8, fontFamily: fontFamily.regular, fontSize: 15, color: colors.textSecondary },
});
