import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Pressable, ScrollView, Share, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CarCard } from '@/components/cars/CarCard';
import { CircleBackButton } from '@/components/ui/CircleBackButton';
import { popularCars } from '@/data/cars';
import { useFavorites } from '@/state/favorites';
import { colors, fontFamily } from '@/theme';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const STATS = [
  { icon: 'people', value: '4500+', label: 'Customer' },
  { icon: 'briefcase', value: '15+', label: 'Cars' },
  { icon: 'star', value: '4.9+', label: 'Rating' },
  { icon: 'chatbubble', value: '4,956', label: 'Review' },
] as const;

export default function RentalPartner() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [tab, setTab] = useState<'About' | 'Cars'>('About');
  const { isFavorite, toggle } = useFavorites();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <CircleBackButton onPress={() => router.back()} />
        <Text style={styles.headerTitle} pointerEvents="none">
          Rental Partner
        </Text>
        <Pressable
          style={styles.shareBtn}
          onPress={() =>
            Share.share({ message: 'Check out Jenny Doe, a top rental partner on Kruze.' }).catch(
              () => {},
            )
          }>
          <Ionicons name="share-social-outline" size={20} color={colors.text} />
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}
        showsVerticalScrollIndicator={false}>
        <View style={styles.profile}>
          <View style={styles.avatarWrap}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={44} color={colors.textSecondary} />
            </View>
            <View style={styles.verified}>
              <Ionicons name="checkmark" size={14} color={colors.white} />
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>Jenny Doe</Text>
            <Text style={styles.role}>Owner</Text>
            <View style={styles.locationRow}>
              <Ionicons name="location" size={18} color={colors.primary} />
              <Text style={styles.location}>New York, United States</Text>
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.stats}>
          {STATS.map((stat) => (
            <View key={stat.label} style={styles.stat}>
              <View style={styles.statIcon}>
                <Ionicons name={stat.icon} size={22} color={colors.primary} />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.tabBar}>
          {(['About', 'Cars'] as const).map((t) => (
            <Pressable key={t} style={styles.tab} onPress={() => setTab(t)}>
              <Text style={[styles.tabText, tab === t && styles.tabTextActive]}>{t}</Text>
              {tab === t && <View style={styles.tabUnderline} />}
            </Pressable>
          ))}
        </View>

        {tab === 'About' ? (
          <View style={styles.body}>
            <Text style={styles.blockTitle}>About</Text>
            <Text style={styles.about}>
              Jenny has been renting premium cars for over a decade, with a fleet of well-maintained
              vehicles and a five-star reputation for fast, friendly handovers.{' '}
              <Text style={styles.link}>Read more</Text>
            </Text>
            <Text style={styles.blockTitle}>Working Hours</Text>
            {DAYS.map((day) => (
              <View key={day} style={styles.hourRow}>
                <Text style={styles.day}>{day}</Text>
                <Text style={styles.hours}>08:00 - 20:00</Text>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.body}>
            <View style={styles.galleryHeader}>
              <Text style={styles.blockTitle}>
                Gallery <Text style={{ color: colors.primary }}>(15)</Text>
              </Text>
              <Text style={styles.link}>View All</Text>
            </View>
            <View style={{ gap: 20, marginTop: 8 }}>
              {popularCars.slice(0, 3).map((car) => (
                <CarCard
                  key={car.id}
                  car={car}
                  image={car.hero}
                  favorite={isFavorite(car.id)}
                  onToggleFavorite={() => toggle(car.id)}
                  onPress={() => router.push(`/car/${car.id}`)}
                />
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  header: { height: 52, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 24 },
  headerTitle: { position: 'absolute', left: 0, right: 0, textAlign: 'center', fontFamily: fontFamily.semibold, fontSize: 19, color: colors.text },
  shareBtn: { width: 46, height: 46, borderRadius: 23, borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
  profile: { flexDirection: 'row', alignItems: 'center', gap: 18, paddingHorizontal: 24, marginTop: 16 },
  avatarWrap: { width: 96, height: 96 },
  avatar: { width: 96, height: 96, borderRadius: 48, backgroundColor: colors.surfaceGray, alignItems: 'center', justifyContent: 'center' },
  verified: { position: 'absolute', right: 2, bottom: 2, width: 28, height: 28, borderRadius: 14, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: colors.white },
  name: { fontFamily: fontFamily.bold, fontSize: 24, color: colors.text },
  role: { marginTop: 2, fontFamily: fontFamily.regular, fontSize: 15, color: colors.textSecondary },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 8 },
  location: { fontFamily: fontFamily.medium, fontSize: 15, color: colors.text },
  divider: { height: 1, backgroundColor: colors.border, marginHorizontal: 24, marginTop: 20 },
  stats: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 24, marginTop: 20 },
  stat: { alignItems: 'center', gap: 8 },
  statIcon: { width: 64, height: 64, borderRadius: 32, backgroundColor: colors.surfaceGray, alignItems: 'center', justifyContent: 'center' },
  statValue: { fontFamily: fontFamily.bold, fontSize: 18, color: colors.primary },
  statLabel: { fontFamily: fontFamily.regular, fontSize: 13, color: colors.textSecondary },
  tabBar: { flexDirection: 'row', marginTop: 22, paddingHorizontal: 24, borderBottomWidth: 1, borderBottomColor: colors.border },
  tab: { flex: 1, alignItems: 'center', paddingBottom: 12 },
  tabText: { fontFamily: fontFamily.medium, fontSize: 16, color: colors.text },
  tabTextActive: { fontFamily: fontFamily.semibold, color: colors.primary },
  tabUnderline: { position: 'absolute', bottom: -1, height: 3, width: '70%', borderRadius: 2, backgroundColor: colors.primary },
  body: { paddingHorizontal: 24 },
  blockTitle: { marginTop: 22, fontFamily: fontFamily.bold, fontSize: 18, color: colors.text },
  about: { marginTop: 12, fontFamily: fontFamily.regular, fontSize: 15, lineHeight: 23, color: colors.textSecondary },
  link: { fontFamily: fontFamily.semibold, fontSize: 15, color: colors.primary },
  hourRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 11 },
  day: { fontFamily: fontFamily.regular, fontSize: 15, color: colors.textSecondary },
  hours: { fontFamily: fontFamily.semibold, fontSize: 15, color: colors.text },
  galleryHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
});
