import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Header } from '@/components/ui/Header';
import { colors, fontFamily } from '@/theme';

type Toggle = { key: string; label: string; caption: string; on: boolean };

const INITIAL: Toggle[] = [
  { key: 'booking', label: 'Booking Updates', caption: 'Confirmations, reminders and pickup alerts', on: true },
  { key: 'promotions', label: 'Promotions & Offers', caption: 'Deals, discounts and seasonal rates', on: false },
  { key: 'payment', label: 'Payment & Wallet', caption: 'Receipts, refunds and top-up activity', on: true },
  { key: 'reviews', label: 'Review Requests', caption: 'Reminders to rate your recent rentals', on: true },
  { key: 'chat', label: 'Messages', caption: 'New messages from your rental partner', on: true },
  { key: 'email', label: 'Email Notifications', caption: 'Send the above to your inbox as well', on: false },
];

export default function NotificationSettings() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [toggles, setToggles] = useState<Toggle[]>(INITIAL);

  const setOn = (key: string, on: boolean) =>
    setToggles((prev) => prev.map((t) => (t.key === key ? { ...t, on } : t)));

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      <StatusBar style="dark" />
      <View style={styles.headerWrap}>
        <Header title="Notification Settings" onBack={() => router.back()} />
      </View>

      <View style={styles.menu}>
        {toggles.map((t, i) => (
          <View key={t.key} style={[styles.row, i < toggles.length - 1 && styles.rowBorder]}>
            <View style={styles.textWrap}>
              <Text style={styles.label}>{t.label}</Text>
              <Text style={styles.caption}>{t.caption}</Text>
            </View>
            <Switch
              value={t.on}
              onValueChange={(v) => setOn(t.key, v)}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={colors.white}
              ios_backgroundColor={colors.border}
            />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  headerWrap: { paddingHorizontal: 24 },
  menu: { paddingHorizontal: 24, marginTop: 12 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 16, paddingVertical: 18 },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: colors.border },
  textWrap: { flex: 1 },
  label: { fontFamily: fontFamily.semibold, fontSize: 17, color: colors.text },
  caption: { marginTop: 4, fontFamily: fontFamily.regular, fontSize: 13, color: colors.textSecondary },
});
