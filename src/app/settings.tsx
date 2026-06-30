import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Header } from '@/components/ui/Header';
import { colors, fontFamily } from '@/theme';

type Item = { icon: keyof typeof Ionicons.glyphMap; label: string; route?: string };

const ITEMS: Item[] = [
  { icon: 'notifications-outline', label: 'Notification Settings', route: '/notifications' },
  { icon: 'key-outline', label: 'Password Manager', route: '/password-manager' },
  { icon: 'trash-outline', label: 'Delete Account' },
];

export default function Settings() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

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
            onPress={() => item.route && router.push(item.route as never)}>
            <Ionicons name={item.icon} size={24} color={colors.primary} />
            <Text style={styles.label}>{item.label}</Text>
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
});
