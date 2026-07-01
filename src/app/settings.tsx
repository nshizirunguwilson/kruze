import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Header } from '@/components/ui/Header';
import { useBookings } from '@/state/bookings';
import { useFavorites } from '@/state/favorites';
import { useWallet } from '@/state/wallet';
import { colors, fontFamily } from '@/theme';

type Item = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  route?: string;
  action?: 'delete' | 'reset';
};

const ITEMS: Item[] = [
  { icon: 'notifications-outline', label: 'Notification Settings', route: '/notification-settings' },
  { icon: 'key-outline', label: 'Password Manager', route: '/password-manager' },
  { icon: 'refresh-outline', label: 'Reset demo data', action: 'reset' },
  { icon: 'trash-outline', label: 'Delete Account', action: 'delete' },
];

export default function Settings() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { reset: resetFavorites } = useFavorites();
  const { reset: resetWallet } = useWallet();
  const { reset: resetBookings } = useBookings();

  const confirmDelete = () =>
    Alert.alert(
      'Delete Account',
      'This will permanently delete your account and all your data. This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => router.replace('/welcome'),
        },
      ],
    );

  const confirmReset = () =>
    Alert.alert(
      'Reset demo data',
      'Restore favorites, wallet balance, transactions and bookings to their starting values.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => {
            resetFavorites();
            resetWallet();
            resetBookings();
            Alert.alert('Done', 'Demo data has been reset.');
          },
        },
      ],
    );

  const onPress = (item: Item) => {
    if (item.action === 'delete') confirmDelete();
    else if (item.action === 'reset') confirmReset();
    else if (item.route) router.push(item.route as never);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      <StatusBar style="dark" />
      <View style={styles.headerWrap}>
        <Header title="Settings" onBack={() => router.back()} />
      </View>

      <View style={styles.menu}>
        {ITEMS.map((item, i) => (
          <Pressable
            key={item.label}
            style={[styles.row, i < ITEMS.length - 1 && styles.rowBorder]}
            onPress={() => onPress(item)}>
            <Ionicons
              name={item.icon}
              size={24}
              color={item.action === 'delete' ? colors.heart : colors.primary}
            />
            <Text style={[styles.label, item.action === 'delete' && styles.labelDanger]}>
              {item.label}
            </Text>
            <Ionicons name="chevron-forward" size={22} color={colors.primary} />
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  headerWrap: { paddingHorizontal: 24 },
  menu: { paddingHorizontal: 24, marginTop: 12 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 18, paddingVertical: 20 },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: colors.border },
  label: { flex: 1, fontFamily: fontFamily.semibold, fontSize: 18, color: colors.text },
  labelDanger: { color: colors.heart },
});
