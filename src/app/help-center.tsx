import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Linking, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Chip } from '@/components/ui/Chip';
import { Header } from '@/components/ui/Header';
import { colors, fontFamily } from '@/theme';

const CATEGORIES = ['All', 'Services', 'General', 'Account'];

const FAQS = [
  {
    q: "Can I track my order's delivery status?",
    a: 'Yes. Open My Bookings and select an upcoming rental to see live pickup and return details, including the car location on the map.',
  },
  { q: 'Is there a return policy?', a: 'You can cancel a booking before the pickup window opens for a full refund, processed within 3 to 5 business days.' },
  { q: 'Can I save my favorite items for later?', a: 'Tap the heart on any car to add it to your Favorites tab, where you can filter saved cars by body type.' },
  { q: 'Can I share products with my friends?', a: 'Use the share icon on a car detail page, or invite friends from your profile to share the app.' },
  { q: 'How do I contact customer support?', a: 'Visit the Contact Us tab here to reach us by call, WhatsApp, email, or social channels.' },
  { q: 'What payment methods are accepted?', a: 'We accept cash, wallet balance, credit and debit cards, PayPal, Apple Pay, and Google Pay.' },
  { q: 'How to add review?', a: 'After a completed rental, open My Bookings, pick the trip, and tap Add Review to rate your experience.' },
];

const CONTACTS = [
  { icon: 'headset', label: 'Customer Service', sub: '', url: 'tel:+14805550103' },
  { icon: 'logo-whatsapp', label: 'WhatsApp', sub: '(480) 555-0103', url: 'https://wa.me/14805550103' },
  { icon: 'globe-outline', label: 'Website', sub: '', url: 'https://www.toyota.com' },
  { icon: 'logo-facebook', label: 'Facebook', sub: '', url: 'https://facebook.com/toyota' },
  { icon: 'logo-twitter', label: 'Twitter', sub: '', url: 'https://twitter.com/toyota' },
  { icon: 'logo-instagram', label: 'Instagram', sub: '', url: 'https://instagram.com/toyota' },
] as const;

export default function HelpCenter() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [tab, setTab] = useState<'FAQ' | 'Contact Us'>('FAQ');
  const [category, setCategory] = useState('All');
  const [open, setOpen] = useState(0);

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      <StatusBar style="dark" />
      <View style={styles.headerWrap}>
        <Header title="Help Center" onBack={() => router.back()} />
      </View>

      <View style={styles.search}>
        <Ionicons name="search" size={20} color={colors.primary} />
        <TextInput style={styles.searchInput} placeholder="Search" placeholderTextColor={colors.textSecondary} />
      </View>

      <View style={styles.tabBar}>
        {(['FAQ', 'Contact Us'] as const).map((t) => (
          <Pressable key={t} style={styles.tab} onPress={() => setTab(t)}>
            <Text style={[styles.tabText, tab === t && styles.tabTextActive]}>{t}</Text>
            {tab === t && <View style={styles.tabUnderline} />}
          </Pressable>
        ))}
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: insets.bottom + 24 }}
        showsVerticalScrollIndicator={false}>
        {tab === 'FAQ' ? (
          <>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
              {CATEGORIES.map((c) => (
                <Chip key={c} label={c} selected={category === c} onPress={() => setCategory(c)} />
              ))}
            </ScrollView>
            {FAQS.map((faq, i) => (
              <Pressable key={faq.q} style={styles.faq} onPress={() => setOpen(open === i ? -1 : i)}>
                <View style={styles.faqTop}>
                  <Text style={styles.faqQ}>{faq.q}</Text>
                  <Ionicons name={open === i ? 'chevron-up' : 'chevron-down'} size={20} color={colors.primary} />
                </View>
                {open === i && (
                  <>
                    <View style={styles.faqDivider} />
                    <Text style={styles.faqA}>{faq.a}</Text>
                  </>
                )}
              </Pressable>
            ))}
          </>
        ) : (
          <View style={{ marginTop: 16 }}>
            {CONTACTS.map((c) => (
              <Pressable
                key={c.label}
                style={styles.contact}
                onPress={() => Linking.openURL(c.url).catch(() => {})}>
                <View style={styles.contactIcon}>
                  <Ionicons name={c.icon as never} size={20} color={colors.primary} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.contactLabel}>{c.label}</Text>
                  {c.sub ? <Text style={styles.contactSub}>{c.sub}</Text> : null}
                </View>
                <Ionicons name="chevron-down" size={20} color={colors.textSecondary} />
              </Pressable>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  headerWrap: { paddingHorizontal: 24 },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    height: 54,
    borderRadius: 14,
    backgroundColor: colors.surfaceGray,
    paddingHorizontal: 16,
    marginHorizontal: 24,
    marginTop: 12,
  },
  searchInput: { flex: 1, fontFamily: fontFamily.regular, fontSize: 16, color: colors.text },
  tabBar: { flexDirection: 'row', marginTop: 18, paddingHorizontal: 24, borderBottomWidth: 1, borderBottomColor: colors.border },
  tab: { flex: 1, alignItems: 'center', paddingBottom: 12 },
  tabText: { fontFamily: fontFamily.medium, fontSize: 16, color: colors.text },
  tabTextActive: { fontFamily: fontFamily.semibold, color: colors.primary },
  tabUnderline: { position: 'absolute', bottom: -1, height: 3, width: '70%', borderRadius: 2, backgroundColor: colors.primary },
  chips: { gap: 12, paddingVertical: 18, paddingRight: 24 },
  faq: { borderWidth: 1, borderColor: colors.border, borderRadius: 14, padding: 18, marginBottom: 14 },
  faqTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  faqQ: { flex: 1, fontFamily: fontFamily.semibold, fontSize: 16, color: colors.text },
  faqDivider: { height: 1, backgroundColor: colors.border, marginVertical: 14 },
  faqA: { fontFamily: fontFamily.regular, fontSize: 14, lineHeight: 22, color: colors.textSecondary },
  contact: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: colors.border },
  contactIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.primaryTint, alignItems: 'center', justifyContent: 'center' },
  contactLabel: { fontFamily: fontFamily.semibold, fontSize: 16, color: colors.text },
  contactSub: { marginTop: 3, fontFamily: fontFamily.regular, fontSize: 14, color: colors.textSecondary },
});
