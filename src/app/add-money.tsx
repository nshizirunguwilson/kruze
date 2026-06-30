import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Header } from '@/components/ui/Header';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { colors, fontFamily } from '@/theme';

const PRESETS = [100, 200, 500, 1000, 2000, 3000, 4000, 5000];

export default function AddMoney() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [amount, setAmount] = useState('');

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      <StatusBar style="dark" />
      <View style={styles.headerWrap}>
        <Header title="Add Money" onBack={() => router.back()} />
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: insets.bottom + 24 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Text style={styles.balanceLabel}>Wallet Balance</Text>
          <Text style={styles.balanceValue}>$ 12000.00</Text>

          <View style={styles.presets}>
            {PRESETS.map((p) => (
              <Pressable key={p} style={styles.preset} onPress={() => setAmount(String(p))}>
                <Text style={styles.presetText}>+ ${p}</Text>
              </Pressable>
            ))}
          </View>

          <View style={styles.inputRow}>
            <Text style={styles.dollar}>$</Text>
            <TextInput
              style={styles.input}
              value={amount}
              onChangeText={setAmount}
              placeholder="Enter Amount"
              placeholderTextColor={colors.textSecondary}
              keyboardType="number-pad"
            />
          </View>

          <PrimaryButton title="Add Money" pill style={styles.addBtn} onPress={() => router.push('/topup-success')} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  headerWrap: { paddingHorizontal: 24 },
  card: { backgroundColor: colors.primaryTint, borderRadius: 18, padding: 18, marginTop: 12 },
  balanceLabel: { fontFamily: fontFamily.regular, fontSize: 15, color: colors.textSecondary },
  balanceValue: { marginTop: 4, fontFamily: fontFamily.bold, fontSize: 24, color: colors.text },
  presets: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginTop: 18 },
  preset: {
    width: '22%',
    flexGrow: 1,
    height: 48,
    borderRadius: 10,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  presetText: { fontFamily: fontFamily.semibold, fontSize: 14, color: colors.text },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    height: 56,
    borderRadius: 12,
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    marginTop: 16,
  },
  dollar: { fontFamily: fontFamily.bold, fontSize: 18, color: colors.text },
  input: { flex: 1, fontFamily: fontFamily.regular, fontSize: 16, color: colors.text },
  addBtn: { marginTop: 16 },
});
