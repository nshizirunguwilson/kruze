import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CircleBackButton } from '@/components/ui/CircleBackButton';
import { colors, fontFamily } from '@/theme';

type Note = { icon: keyof typeof Ionicons.glyphMap; title: string; body: string; when: string };

const TODAY: Note[] = [
  {
    icon: 'calendar',
    title: 'Car Booked Successfully',
    body: 'Your Toyota Land Cruiser is confirmed for October 04 at 10:00 AM. Tap to view your e-ticket.',
    when: '1h',
  },
  {
    icon: 'time',
    title: '2 Hours Remain',
    body: 'Your pickup window opens in 2 hours. Please arrive on time to collect the car.',
    when: '8h',
  },
  {
    icon: 'star',
    title: 'Rental Review Request',
    body: 'How was your last trip with the Camry? Leave a review and help other renters decide.',
    when: '9h',
  },
];

const YESTERDAY: Note[] = [
  {
    icon: 'calendar-clear',
    title: 'Car Booking Cancelled',
    body: 'Your booking for the RAV4 was cancelled. Any charges will be refunded within 3 to 5 days.',
    when: '1d',
  },
  {
    icon: 'wallet',
    title: 'New Paypal Added',
    body: 'A PayPal account was added to your wallet and is ready to use for your next rental.',
    when: '1d',
  },
];

export default function Notifications() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [read, setRead] = useState(false);

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <CircleBackButton onPress={() => router.back()} />
        <Text style={styles.title} pointerEvents="none">
          Notification
        </Text>
        {read ? (
          <View style={{ width: 46 }} />
        ) : (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>2 NEW</Text>
          </View>
        )}
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: insets.bottom + 24 }}
        showsVerticalScrollIndicator={false}>
        <Section label="TODAY" notes={TODAY} read={read} onMarkRead={() => setRead(true)} />
        <Section label="YESTERDAY" notes={YESTERDAY} read={read} onMarkRead={() => setRead(true)} />
      </ScrollView>
    </View>
  );
}

function Section({
  label,
  notes,
  read,
  onMarkRead,
}: {
  label: string;
  notes: Note[];
  read: boolean;
  onMarkRead: () => void;
}) {
  return (
    <View>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionLabel}>{label}</Text>
        {read ? (
          <Text style={[styles.markRead, styles.markReadDone]}>All read</Text>
        ) : (
          <Pressable onPress={onMarkRead} hitSlop={8}>
            <Text style={styles.markRead}>Mark all as read</Text>
          </Pressable>
        )}
      </View>
      {notes.map((n) => (
        <View key={n.title} style={styles.note}>
          <View style={styles.noteIcon}>
            <Ionicons name={n.icon} size={22} color={colors.primary} />
          </View>
          <View style={{ flex: 1 }}>
            <View style={styles.noteTop}>
              <Text style={styles.noteTitle}>{n.title}</Text>
              <Text style={styles.noteWhen}>{n.when}</Text>
            </View>
            <Text style={styles.noteBody}>{n.body}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  header: { height: 52, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 24 },
  title: { position: 'absolute', left: 0, right: 0, textAlign: 'center', fontFamily: fontFamily.semibold, fontSize: 19, color: colors.text },
  badge: { backgroundColor: colors.primary, borderRadius: 16, paddingHorizontal: 14, paddingVertical: 7 },
  badgeText: { fontFamily: fontFamily.bold, fontSize: 12, color: colors.white },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 24, marginBottom: 8 },
  sectionLabel: { fontFamily: fontFamily.semibold, fontSize: 14, letterSpacing: 1, color: colors.textSecondary },
  markRead: { fontFamily: fontFamily.semibold, fontSize: 15, color: colors.primary },
  markReadDone: { color: colors.textSecondary },
  note: { flexDirection: 'row', gap: 16, paddingVertical: 18, borderBottomWidth: 1, borderBottomColor: colors.border },
  noteIcon: { width: 50, height: 50, borderRadius: 25, backgroundColor: colors.surfaceGray, alignItems: 'center', justifyContent: 'center' },
  noteTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  noteTitle: { flex: 1, fontFamily: fontFamily.bold, fontSize: 17, color: colors.text },
  noteWhen: { fontFamily: fontFamily.regular, fontSize: 13, color: colors.textSecondary },
  noteBody: { marginTop: 6, fontFamily: fontFamily.regular, fontSize: 14, lineHeight: 21, color: colors.textSecondary },
});
