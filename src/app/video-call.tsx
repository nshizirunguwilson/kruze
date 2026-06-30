import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, fontFamily } from '@/theme';

export default function VideoCall() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { name } = useLocalSearchParams<{ name?: string }>();
  const partner = name || 'Sheila Lemke';

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient colors={['#2C3A52', '#1A2433']} style={StyleSheet.absoluteFill}>
        <View style={styles.bigAvatar}>
          <Ionicons name="person" size={120} color="rgba(255,255,255,0.25)" />
        </View>
      </LinearGradient>

      <View style={[styles.live, { top: insets.top + 12 }]}>
        <View style={styles.liveDot} />
        <Text style={styles.liveText}>Live</Text>
      </View>

      <View style={[styles.pip, { top: insets.top + 12 }]}>
        <Ionicons name="person" size={40} color="rgba(255,255,255,0.4)" />
      </View>

      <View style={[styles.bottom, { paddingBottom: insets.bottom + 16 }]}>
        <Text style={styles.name}>{partner}</Text>
        <Text style={styles.duration}>12:08</Text>

        <View style={styles.controls}>
          <Control icon="volume-high" />
          <Control icon="mic-off" />
          <Pressable style={styles.endCall} onPress={() => router.back()}>
            <Ionicons name="call" size={28} color={colors.white} style={{ transform: [{ rotate: '135deg' }] }} />
          </Pressable>
          <Control icon="videocam-off" />
          <Control icon="chatbubble" dot />
        </View>
      </View>
    </View>
  );
}

function Control({ icon, dot }: { icon: keyof typeof Ionicons.glyphMap; dot?: boolean }) {
  return (
    <Pressable style={styles.control}>
      <Ionicons name={icon} size={24} color={colors.white} />
      {dot && <View style={styles.controlDot} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1A2433' },
  bigAvatar: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  live: { position: 'absolute', left: 20, flexDirection: 'row', alignItems: 'center', gap: 7, backgroundColor: 'rgba(0,0,0,0.4)', borderRadius: 16, paddingHorizontal: 12, paddingVertical: 7 },
  liveDot: { width: 9, height: 9, borderRadius: 5, backgroundColor: colors.heart },
  liveText: { fontFamily: fontFamily.semibold, fontSize: 15, color: colors.white },
  pip: { position: 'absolute', right: 20, width: 110, height: 150, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.12)', alignItems: 'center', justifyContent: 'center' },
  bottom: { position: 'absolute', left: 0, right: 0, bottom: 0, paddingHorizontal: 20 },
  name: { fontFamily: fontFamily.bold, fontSize: 26, color: colors.white },
  duration: { marginTop: 6, fontFamily: fontFamily.regular, fontSize: 18, color: 'rgba(255,255,255,0.9)' },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.primary,
    borderRadius: 28,
    paddingHorizontal: 18,
    paddingVertical: 18,
    marginTop: 22,
  },
  control: { width: 50, height: 50, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.18)', alignItems: 'center', justifyContent: 'center' },
  controlDot: { position: 'absolute', top: 12, right: 12, width: 8, height: 8, borderRadius: 4, backgroundColor: colors.heart },
  endCall: { width: 64, height: 64, borderRadius: 32, backgroundColor: colors.heart, alignItems: 'center', justifyContent: 'center', transform: [{ translateY: -14 }] },
});
