import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Header } from '@/components/ui/Header';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { colors, fontFamily } from '@/theme';

type Txn = { title: string; date: string; amount: number; balance: string };

const GROUPS: { label: string; items: Txn[] }[] = [
  {
    label: 'Today',
    items: [{ title: 'Money Added to Wallet', date: '24 October | 7:30 AM', amount: 500, balance: '$12,000.00' }],
  },
  {
    label: 'Yesterday',
    items: [{ title: 'Booking No #34234', date: '23 October | 5:30 AM', amount: -500, balance: '$11,250.00' }],
  },
  {
    label: '22 September 2023',
    items: [
      { title: 'Refund for Booking #34234', date: '22 October | 7:30 AM', amount: 500, balance: '$11,250.00' },
      { title: 'Booking #34234', date: '22 October | 7:30 AM', amount: -250, balance: '$11,250.00' },
      { title: 'Booking #34234', date: '22 October | 7:30 AM', amount: -250, balance: '$11,250.00' },
      { title: 'Booking #34234', date: '22 October | 7:30 AM', amount: -250, balance: '$11,250.00' },
    ],
  },
];

export default function Wallet() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      <StatusBar style="dark" />
      <View style={styles.headerWrap}>
        <Header title="Wallet" onBack={() => router.back()} />
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: insets.bottom + 24 }}
        showsVerticalScrollIndicator={false}>
        <View style={styles.balanceCard}>
          <View style={styles.balanceTop}>
            <View>
              <Text style={styles.balanceLabel}>Wallet Balance</Text>
              <Text style={styles.balanceValue}>$ 12000.00</Text>
            </View>
            <View style={styles.walletIcon}>
              <Ionicons name="wallet" size={22} color={colors.primary} />
            </View>
          </View>
          <PrimaryButton title="Add Money" pill style={styles.addBtn} onPress={() => router.push('/add-money')} />
        </View>

        {GROUPS.map((group) => (
          <View key={group.label}>
            <Text style={styles.groupLabel}>{group.label}</Text>
            {group.items.map((txn, i) => (
              <View key={i} style={styles.txn}>
                <View style={styles.txnTop}>
                  <Text style={styles.txnTitle}>{txn.title}</Text>
                  <Text style={[styles.txnAmount, { color: txn.amount > 0 ? colors.success : colors.heart }]}>
                    {txn.amount > 0 ? '+' : '-'} ${Math.abs(txn.amount).toFixed(2)}
                  </Text>
                </View>
                <View style={styles.txnBottom}>
                  <Text style={styles.txnDate}>{txn.date}</Text>
                  <Text style={styles.txnBalance}>Balance {txn.balance}</Text>
                </View>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  headerWrap: { paddingHorizontal: 24 },
  balanceCard: { backgroundColor: colors.primaryTint, borderRadius: 18, padding: 18, marginTop: 12 },
  balanceTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  balanceLabel: { fontFamily: fontFamily.regular, fontSize: 15, color: colors.textSecondary },
  balanceValue: { marginTop: 4, fontFamily: fontFamily.bold, fontSize: 24, color: colors.text },
  walletIcon: { width: 44, height: 44, borderRadius: 12, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center' },
  addBtn: { marginTop: 16 },
  groupLabel: { marginTop: 24, marginBottom: 12, fontFamily: fontFamily.bold, fontSize: 18, color: colors.text },
  txn: { borderWidth: 1, borderColor: colors.border, borderRadius: 14, padding: 16, marginBottom: 14 },
  txnTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  txnTitle: { fontFamily: fontFamily.bold, fontSize: 16, color: colors.text },
  txnAmount: { fontFamily: fontFamily.bold, fontSize: 16 },
  txnBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  txnDate: { fontFamily: fontFamily.regular, fontSize: 13, color: colors.textSecondary },
  txnBalance: { fontFamily: fontFamily.regular, fontSize: 13, color: colors.textSecondary },
});
