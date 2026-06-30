import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Header } from '@/components/ui/Header';
import { colors, fontFamily } from '@/theme';

const FRIENDS = [
  { name: 'Carla Schoen', phone: '207.555.0119' },
  { name: 'Esther Howard', phone: '702.555.0122' },
  { name: 'Robert Fox', phone: '239.555.0108' },
  { name: 'Jacob Jones', phone: '316.555.0116' },
  { name: 'Annie Vaccaro', phone: '629.555.0129' },
  { name: 'Darlene Robertson', phone: '629.555.0129' },
  { name: 'Ralph Edwards', phone: '203.555.0106' },
  { name: 'Ronald Richards', phone: '209.555.0104' },
  { name: 'Courtney Henry', phone: '405.555.0128' },
];

export default function InviteFriends() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [invited, setInvited] = useState<string[]>([]);

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      <StatusBar style="dark" />
      <View style={styles.headerWrap}>
        <Header title="Invite Friends" onBack={() => router.back()} />
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: insets.bottom + 24 }}
        showsVerticalScrollIndicator={false}>
        {FRIENDS.map((friend, i) => {
          const isInvited = invited.includes(friend.phone + i);
          return (
            <View key={friend.phone + i} style={styles.row}>
              <View style={styles.avatar}>
                <Ionicons name="person" size={22} color={colors.textSecondary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{friend.name}</Text>
                <Text style={styles.phone}>{friend.phone}</Text>
              </View>
              <Pressable
                style={[styles.inviteBtn, isInvited && styles.invitedBtn]}
                onPress={() =>
                  setInvited((list) =>
                    isInvited ? list.filter((x) => x !== friend.phone + i) : [...list, friend.phone + i],
                  )
                }>
                <Text style={[styles.inviteText, isInvited && styles.invitedText]}>
                  {isInvited ? 'Invited' : 'Invite'}
                </Text>
              </Pressable>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  headerWrap: { paddingHorizontal: 24 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: colors.border },
  avatar: { width: 52, height: 52, borderRadius: 26, backgroundColor: colors.surfaceGray, alignItems: 'center', justifyContent: 'center' },
  name: { fontFamily: fontFamily.semibold, fontSize: 16, color: colors.text },
  phone: { marginTop: 3, fontFamily: fontFamily.regular, fontSize: 14, color: colors.textSecondary },
  inviteBtn: { backgroundColor: colors.primary, borderRadius: 18, paddingHorizontal: 22, paddingVertical: 9 },
  invitedBtn: { backgroundColor: colors.surfaceGray },
  inviteText: { fontFamily: fontFamily.semibold, fontSize: 14, color: colors.white },
  invitedText: { color: colors.textSecondary },
});
