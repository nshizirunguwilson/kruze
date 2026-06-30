import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CircleBackButton } from '@/components/ui/CircleBackButton';
import { colors, fontFamily } from '@/theme';

const CHATS = [
  { name: 'Carla Schoen', last: 'Perfect, will check it', time: '09:34 PM', online: true },
  { name: 'Sheila Lemke', last: 'Thanks', time: '09:34 PM', online: true },
  { name: 'Deanna Botsford V', last: 'Welcome!', time: '09:34 PM', online: true },
  { name: 'Mr. Katie Bergnaum', last: 'Good Morning!', time: '09:34 PM', online: true },
  { name: 'Armando Ferry', last: 'Share Image Please!', time: '09:34 PM', online: false },
  { name: 'Annette Fritsch', last: 'Thanks!', time: '09:34 PM', online: true },
  { name: 'Jerome Bins', last: 'See you tomorrow', time: '09:30 PM', online: false },
];

export default function Chat() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <View style={styles.headerRow}>
          <CircleBackButton onPress={() => router.replace('/home')} />
          <Text style={styles.title} pointerEvents="none">
            Chat
          </Text>
          <View style={{ width: 46 }} />
        </View>
        <View style={styles.search}>
          <Ionicons name="search" size={20} color={colors.primary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Rent Partner"
            placeholderTextColor={colors.textSecondary}
          />
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: insets.bottom + 110 }}
        showsVerticalScrollIndicator={false}>
        {CHATS.map((chat) => (
          <Pressable
            key={chat.name}
            style={styles.chat}
            onPress={() => router.push(`/chat-thread?name=${encodeURIComponent(chat.name)}`)}>
            <View style={styles.avatarWrap}>
              <View style={styles.avatar}>
                <Ionicons name="person" size={24} color={colors.textSecondary} />
              </View>
              {chat.online && <View style={styles.onlineDot} />}
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{chat.name}</Text>
              <Text style={styles.last}>{chat.last}</Text>
            </View>
            <Text style={styles.time}>{chat.time}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  header: {
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  title: { position: 'absolute', left: 0, right: 0, textAlign: 'center', fontFamily: fontFamily.semibold, fontSize: 19, color: colors.white },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    height: 54,
    borderRadius: 14,
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    marginTop: 20,
  },
  searchInput: { flex: 1, fontFamily: fontFamily.regular, fontSize: 16, color: colors.text },
  chat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 14,
    marginBottom: 12,
    borderRadius: 16,
    backgroundColor: colors.white,
    shadowColor: '#1B2A4A',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  avatarWrap: { width: 52, height: 52 },
  avatar: { width: 52, height: 52, borderRadius: 26, backgroundColor: colors.surfaceGray, alignItems: 'center', justifyContent: 'center' },
  onlineDot: { position: 'absolute', right: 2, bottom: 2, width: 14, height: 14, borderRadius: 7, backgroundColor: colors.success, borderWidth: 2, borderColor: colors.white },
  name: { fontFamily: fontFamily.bold, fontSize: 17, color: colors.text },
  last: { marginTop: 4, fontFamily: fontFamily.regular, fontSize: 14, color: colors.textSecondary },
  time: { fontFamily: fontFamily.regular, fontSize: 13, color: colors.textSecondary },
});
