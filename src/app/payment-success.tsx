import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Header } from '@/components/ui/Header';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { CARS, getCar } from '@/data/cars';
import { useBookings } from '@/state/bookings';
import { useWallet } from '@/state/wallet';
import { colors, fontFamily } from '@/theme';

export default function PaymentSuccess() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id, method } = useLocalSearchParams<{ id: string; method?: string }>();
  const car = getCar(String(id)) ?? CARS[0];
  const { addBooking } = useBookings();
  const { spend } = useWallet();
  const recorded = useRef(false);

  // On success, create the booking once. Only deduct from the wallet when the wallet
  // was the chosen payment method (card/PayPal/etc. are charged externally).
  useEffect(() => {
    if (recorded.current) return;
    recorded.current = true;
    const total = car.pricePerHour * 24 + 50;
    addBooking({ carId: car.id, total, when: 'Upcoming trip' });
    if (method === 'Wallet') spend(total, `Booking ${car.name}`);
  }, [car, method, addBooking, spend]);

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8, paddingBottom: insets.bottom + 16 }]}>
      <StatusBar style="dark" />
      <Header title="Payment" onBack={() => router.replace('/home')} />

      <View style={styles.center}>
        <View style={styles.check}>
          <Ionicons name="checkmark" size={58} color={colors.white} />
        </View>
        <Text style={styles.title}>Payment Successful!</Text>
        <Text style={styles.subtitle}>
          Your car is successfully booked. You can check your booking in the Profile menu.
        </Text>
      </View>

      <View style={styles.actions}>
        <PrimaryButton title="View My Booking" pill onPress={() => router.replace('/my-bookings')} />
        <Pressable
          style={styles.linkWrap}
          onPress={() => router.push(`/e-receipt?id=${id}`)}
          hitSlop={8}>
          <Text style={styles.link}>View E-Receipt</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white, paddingHorizontal: 24 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  check: {
    width: 118,
    height: 118,
    borderRadius: 59,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { marginTop: 32, fontFamily: fontFamily.bold, fontSize: 26, color: colors.text },
  subtitle: {
    marginTop: 14,
    fontFamily: fontFamily.regular,
    fontSize: 15,
    lineHeight: 23,
    color: colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: 12,
  },
  actions: { gap: 4 },
  linkWrap: { alignItems: 'center', paddingVertical: 18 },
  link: { fontFamily: fontFamily.semibold, fontSize: 16, color: colors.primary },
});
