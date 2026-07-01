import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CircleBackButton } from '@/components/ui/CircleBackButton';
import { colors, fontFamily } from '@/theme';

type Item = { icon: keyof typeof Ionicons.glyphMap; label: string; route: string };

const ITEMS: Item[] = [
  { icon: 'person-outline', label: 'Your profile', route: '/your-profile' },
  { icon: 'card-outline', label: 'Payment Methods', route: '/payment-methods' },
  { icon: 'clipboard-outline', label: 'My Bookings', route: '/my-bookings' },
  { icon: 'wallet-outline', label: 'My Wallet', route: '/wallet' },
  { icon: 'settings-outline', label: 'Settings', route: '/settings' },
  { icon: 'alert-circle-outline', label: 'Help Center', route: '/help-center' },
  { icon: 'lock-closed-outline', label: 'Privacy Policy', route: '/privacy-policy' },
  { icon: 'person-add-outline', label: 'Invites Friends', route: '/invite-friends' },
];

export default function Profile() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <CircleBackButton onPress={() => router.replace('/home')} />
        <Text style={styles.title} pointerEvents="none">
          Profile
        </Text>
        <View style={{ width: 46 }} />
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: insets.bottom + 110 }}
        showsVerticalScrollIndicator={false}>
        <View style={styles.avatarWrap}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={56} color={colors.textSecondary} />
          </View>
          <Pressable style={styles.editBadge} onPress={() => router.push('/your-profile')}>
            <Ionicons name="pencil" size={15} color={colors.white} />
          </Pressable>
        </View>
        <Text style={styles.name}>Esther Howard</Text>

        <View style={styles.menu}>
          {ITEMS.map((item, i) => (
            <Pressable
              key={item.label}
              style={[styles.row, i < ITEMS.length - 1 && styles.rowBorder]}
              onPress={() => router.push(item.route as never)}>
              <Ionicons name={item.icon} size={24} color={colors.primary} />
              <Text style={styles.label}>{item.label}</Text>
              <Ionicons name="chevron-forward" size={22} color={colors.primary} />
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  header: { height: 52, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 24 },
  title: { position: 'absolute', left: 0, right: 0, textAlign: 'center', fontFamily: fontFamily.semibold, fontSize: 19, color: colors.text },
  avatarWrap: { alignSelf: 'center', marginTop: 16 },
  avatar: { width: 110, height: 110, borderRadius: 55, backgroundColor: colors.surfaceGray, alignItems: 'center', justifyContent: 'center' },
  editBadge: { position: 'absolute', right: 2, bottom: 2, width: 34, height: 34, borderRadius: 17, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: colors.white },
  name: { marginTop: 14, fontFamily: fontFamily.bold, fontSize: 22, color: colors.text, textAlign: 'center' },
  menu: { marginTop: 24 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 18, paddingVertical: 20 },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: colors.border },
  label: { flex: 1, fontFamily: fontFamily.semibold, fontSize: 18, color: colors.text },
});
