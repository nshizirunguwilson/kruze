import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CircleBackButton } from '@/components/ui/CircleBackButton';
import { CARS } from '@/data/cars';
import { colors, fontFamily } from '@/theme';

export default function ChatThread() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { name } = useLocalSearchParams<{ name?: string }>();
  const partner = name || 'Sheila Lemke';

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <CircleBackButton onPress={() => router.back()} />
        <View style={styles.avatar}>
          <Ionicons name="person" size={22} color={colors.textSecondary} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{partner}</Text>
          <Text style={styles.status}>Online</Text>
        </View>
        <View style={styles.menuBtn}>
          <Ionicons name="ellipsis-vertical" size={20} color={colors.text} />
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.dayLabel}>TODAY</Text>

        <View style={styles.theirBubble}>
          <Text style={styles.theirText}>
            Hi! Your Land Cruiser is cleaned and ready for pickup tomorrow at 10 AM.
          </Text>
        </View>
        <View style={styles.metaLeft}>
          <View style={styles.metaAvatar}>
            <Ionicons name="person" size={12} color={colors.textSecondary} />
          </View>
          <Text style={styles.metaName}>{partner}</Text>
          <Text style={styles.metaTime}>08:04 pm</Text>
        </View>

        <View style={styles.myBubble}>
          <Text style={styles.myText}>
            Perfect, thank you! Could you send me a photo of the car before pickup?
          </Text>
        </View>
        <View style={styles.metaRight}>
          <Text style={styles.metaTime}>08:04 pm</Text>
          <Text style={styles.metaName}>Esther Howard</Text>
          <View style={styles.metaAvatar}>
            <Ionicons name="person" size={12} color={colors.textSecondary} />
          </View>
        </View>

        <View style={styles.imageBubble}>
          <Image source={CARS[0].gallery[1]} style={styles.imageMsg} contentFit="contain" />
        </View>
        <View style={styles.metaLeft}>
          <View style={styles.metaAvatar}>
            <Ionicons name="person" size={12} color={colors.textSecondary} />
          </View>
          <Text style={styles.metaName}>{partner}</Text>
          <Text style={styles.metaTime}>08:04 pm</Text>
        </View>

        <View style={styles.voiceBubble}>
          <Ionicons name="play" size={18} color={colors.primary} style={styles.playBtn} />
          <View style={styles.waveform}>
            {Array.from({ length: 26 }).map((_, i) => (
              <View
                key={i}
                style={[styles.bar, { height: 6 + ((i * 7) % 20) }]}
              />
            ))}
          </View>
          <Text style={styles.voiceTime}>0:13</Text>
        </View>
        <View style={styles.metaRight}>
          <Text style={styles.metaTime}>08:04 pm</Text>
          <Text style={styles.metaName}>Esther Howard</Text>
          <View style={styles.metaAvatar}>
            <Ionicons name="person" size={12} color={colors.textSecondary} />
          </View>
        </View>
      </ScrollView>

      <View style={[styles.inputBar, { paddingBottom: insets.bottom || 12 }]}>
        <View style={styles.plus}>
          <Ionicons name="add" size={24} color={colors.primary} />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Type a message here..."
          placeholderTextColor={colors.textSecondary}
        />
        <View style={styles.mic}>
          <Ionicons name="mic" size={22} color={colors.white} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  avatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.surfaceGray, alignItems: 'center', justifyContent: 'center' },
  name: { fontFamily: fontFamily.bold, fontSize: 18, color: colors.white },
  status: { marginTop: 2, fontFamily: fontFamily.regular, fontSize: 13, color: 'rgba(255,255,255,0.85)' },
  menuBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center' },
  dayLabel: { textAlign: 'center', fontFamily: fontFamily.semibold, fontSize: 14, letterSpacing: 2, color: colors.text, marginBottom: 16 },
  theirBubble: { alignSelf: 'flex-start', maxWidth: '78%', backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border, borderRadius: 16, borderTopLeftRadius: 4, padding: 16 },
  theirText: { fontFamily: fontFamily.regular, fontSize: 15, lineHeight: 22, color: colors.text },
  myBubble: { alignSelf: 'flex-end', maxWidth: '78%', backgroundColor: colors.primary, borderRadius: 16, borderTopRightRadius: 4, padding: 16, marginTop: 16 },
  myText: { fontFamily: fontFamily.regular, fontSize: 15, lineHeight: 22, color: colors.white },
  metaLeft: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8 },
  metaRight: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', gap: 8, marginTop: 8 },
  metaAvatar: { width: 22, height: 22, borderRadius: 11, backgroundColor: colors.surfaceGray, alignItems: 'center', justifyContent: 'center' },
  metaName: { fontFamily: fontFamily.medium, fontSize: 14, color: colors.text },
  metaTime: { fontFamily: fontFamily.regular, fontSize: 13, color: colors.textSecondary },
  imageBubble: { alignSelf: 'flex-start', width: '60%', height: 150, backgroundColor: colors.surfaceGray, borderRadius: 16, marginTop: 16, alignItems: 'center', justifyContent: 'center' },
  imageMsg: { width: '86%', height: '86%' },
  voiceBubble: { alignSelf: 'flex-end', flexDirection: 'row', alignItems: 'center', gap: 10, width: '72%', backgroundColor: colors.primary, borderRadius: 16, padding: 14, marginTop: 16 },
  playBtn: { backgroundColor: colors.white, borderRadius: 12, padding: 4, overflow: 'hidden' },
  waveform: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 2 },
  bar: { width: 2.5, backgroundColor: 'rgba(255,255,255,0.85)', borderRadius: 2 },
  voiceTime: { fontFamily: fontFamily.medium, fontSize: 13, color: colors.white },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  plus: { width: 44, height: 44, borderRadius: 12, backgroundColor: colors.surfaceGray, alignItems: 'center', justifyContent: 'center' },
  input: { flex: 1, fontFamily: fontFamily.regular, fontSize: 16, color: colors.text },
  mic: { width: 44, height: 44, borderRadius: 12, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
});
