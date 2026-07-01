import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppleIcon, GoogleIcon } from '@/components/icons/SocialIcons';
import { Header } from '@/components/ui/Header';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { CARS, formatPrice, getCar } from '@/data/cars';
import { useWallet } from '@/state/wallet';
import { colors, fontFamily } from '@/theme';

export default function PaymentMethods() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const car = getCar(String(id)) ?? CARS[0];
  const total = car.pricePerHour * 24 + 50;
  const { balance } = useWallet();
  const canAffordWallet = balance >= total;

  // Default to the wallet when it can cover the trip, otherwise leave unselected.
  const [selected, setSelected] = useState(canAffordWallet ? 'Wallet' : '');
  const canConfirm = selected !== '' && (selected !== 'Wallet' || canAffordWallet);

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      <StatusBar style="dark" />
      <View style={styles.headerWrap}>
        <Header title="Payment Methods" onBack={() => router.back()} />
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 150 }}
        showsVerticalScrollIndicator={false}>
        <Text style={[styles.section, { marginTop: 8 }]}>Wallet</Text>
        <Pressable
          style={[styles.method, selected === 'Wallet' && styles.methodSelected]}
          onPress={() => canAffordWallet && setSelected('Wallet')}>
          <View style={styles.methodLeft}>
            <Ionicons name="wallet" size={22} color={colors.primary} />
            <View>
              <Text style={styles.walletLabel}>Wallet Balance</Text>
              <Text style={[styles.walletBalance, !canAffordWallet && { color: colors.heart }]}>
                {formatPrice(balance)}
              </Text>
            </View>
          </View>
          {canAffordWallet ? (
            <View style={[styles.radio, selected === 'Wallet' && styles.radioOn]}>
              {selected === 'Wallet' && <View style={styles.radioDot} />}
            </View>
          ) : (
            <Text style={styles.insufficient}>Insufficient</Text>
          )}
        </Pressable>
        {!canAffordWallet && (
          <Text style={styles.insufficientNote}>
            Wallet balance is too low for this {formatPrice(total)} booking. Top up or pay by card.
          </Text>
        )}

        <Text style={styles.section}>Credit & Debit Card</Text>
        <Pressable style={styles.method} onPress={() => router.push('/add-card')}>
          <View style={styles.methodLeft}>
            <Ionicons name="card" size={22} color={colors.primary} />
            <Text style={styles.methodLabel}>Add Card</Text>
          </View>
          <Ionicons name="chevron-forward" size={22} color={colors.primary} />
        </Pressable>

        <Text style={styles.section}>More Payment Options</Text>
        <View style={styles.group}>
          <Method
            label="Paypal"
            icon={<Ionicons name="logo-paypal" size={22} color="#1A4F9C" />}
            selected={selected === 'Paypal'}
            onPress={() => setSelected('Paypal')}
            flat
          />
          <View style={styles.groupDivider} />
          <Method
            label="Apple Pay"
            icon={<AppleIcon size={22} />}
            selected={selected === 'Apple Pay'}
            onPress={() => setSelected('Apple Pay')}
            flat
          />
          <View style={styles.groupDivider} />
          <Method
            label="Google Pay"
            icon={<GoogleIcon size={22} />}
            selected={selected === 'Google Pay'}
            onPress={() => setSelected('Google Pay')}
            flat
          />
        </View>
      </ScrollView>

      <View style={[styles.bottomBar, { paddingBottom: insets.bottom || 16 }]}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>{formatPrice(total)}</Text>
        </View>
        <PrimaryButton
          title="Confirm Payment"
          pill
          disabled={!canConfirm}
          onPress={() =>
            router.push(`/payment-success?id=${id}&method=${encodeURIComponent(selected)}`)
          }
        />
      </View>
    </View>
  );
}

function Method({
  label,
  icon,
  selected,
  onPress,
  flat,
}: {
  label: string;
  icon: React.ReactNode;
  selected: boolean;
  onPress: () => void;
  flat?: boolean;
}) {
  return (
    <Pressable style={[styles.method, flat && styles.methodFlat]} onPress={onPress}>
      <View style={styles.methodLeft}>
        {icon}
        <Text style={styles.methodLabel}>{label}</Text>
      </View>
      <View style={[styles.radio, selected && styles.radioOn]}>
        {selected && <View style={styles.radioDot} />}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  headerWrap: { paddingHorizontal: 24 },
  section: { marginTop: 24, marginBottom: 14, fontFamily: fontFamily.bold, fontSize: 19, color: colors.text },
  method: {
    height: 64,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  methodFlat: { borderWidth: 0, borderRadius: 0 },
  methodSelected: { borderColor: colors.primary, backgroundColor: colors.primaryTint },
  methodLeft: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  methodLabel: { fontFamily: fontFamily.medium, fontSize: 16, color: colors.textSecondary },
  walletLabel: { fontFamily: fontFamily.regular, fontSize: 13, color: colors.textSecondary },
  walletBalance: { marginTop: 2, fontFamily: fontFamily.bold, fontSize: 17, color: colors.text },
  insufficient: { fontFamily: fontFamily.semibold, fontSize: 14, color: colors.heart },
  insufficientNote: { marginTop: 8, fontFamily: fontFamily.regular, fontSize: 13, lineHeight: 19, color: colors.heart },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  totalLabel: { fontFamily: fontFamily.medium, fontSize: 16, color: colors.textSecondary },
  totalValue: { fontFamily: fontFamily.bold, fontSize: 20, color: colors.text },
  group: { borderWidth: 1, borderColor: colors.border, borderRadius: 14, paddingHorizontal: 16 },
  groupDivider: { height: 1, backgroundColor: colors.border },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOn: { borderColor: colors.primary },
  radioDot: { width: 12, height: 12, borderRadius: 6, backgroundColor: colors.primary },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingTop: 14,
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#1B2A4A',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: -4 },
    elevation: 10,
  },
});
