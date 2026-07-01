import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Pressable, Share, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CircleBackButton } from '@/components/ui/CircleBackButton';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { CARS, formatPrice, getCar } from '@/data/cars';
import { useFavorites } from '@/state/favorites';
import { colors, fontFamily } from '@/theme';

const TABS = ['About', 'Gallery', 'Review'] as const;
type Tab = (typeof TABS)[number];

const REVIEWS = [
  {
    name: 'Dale Thiel',
    when: '11 months ago',
    rating: 5,
    text: 'Spotless car and a smooth pickup. The partner was friendly and the whole rental felt effortless from start to finish.',
  },
  {
    name: 'Carla Schoen',
    when: '1 year ago',
    rating: 5,
    text: 'Great value for the price. Plenty of room for the family and very comfortable on a long highway drive.',
  },
];

export default function CarDetails() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const car = getCar(String(id)) ?? CARS[0];
  const [tab, setTab] = useState<Tab>('About');
  const { isFavorite, toggle } = useFavorites();
  const fav = isFavorite(car.id);

  const onShare = () =>
    Share.share({
      message: `Check out the ${car.name} on Kruze, ${formatPrice(car.pricePerHour)}/hr.`,
    }).catch(() => {});

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={{ paddingBottom: 130 }}
        showsVerticalScrollIndicator={false}>
        <View style={[styles.top, { paddingTop: insets.top + 8 }]}>
          <View style={styles.header}>
            <CircleBackButton onPress={() => router.back()} />
            <Text style={styles.headerTitle}>Car Details</Text>
            <View style={styles.headerActions}>
              <Pressable style={styles.roundBtn} onPress={onShare} hitSlop={6}>
                <Ionicons name="share-social-outline" size={20} color={colors.text} />
              </Pressable>
              <Pressable style={styles.roundBtn} onPress={() => toggle(car.id)} hitSlop={6}>
                <Ionicons
                  name={fav ? 'heart' : 'heart-outline'}
                  size={20}
                  color={fav ? colors.heart : colors.text}
                />
              </Pressable>
            </View>
          </View>

          <Image source={car.hero} style={styles.hero} contentFit="contain" />

          <View style={styles.sliderLine}>
            <View style={styles.sliderPill}>
              <Ionicons name="chevron-back" size={13} color={colors.white} />
              <Ionicons name="chevron-forward" size={13} color={colors.white} />
            </View>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.thumbs}>
            {car.gallery.map((src, i) => (
              <View key={i} style={styles.thumb}>
                <Image source={src} style={styles.thumbImg} contentFit="contain" />
              </View>
            ))}
            <View style={[styles.thumb, styles.thumbMore]}>
              <Text style={styles.thumbMoreText}>+10</Text>
            </View>
          </ScrollView>
        </View>

        <View style={styles.sheet}>
          <View style={styles.chipRow}>
            <View style={styles.chip}>
              <Text style={styles.chipText}>{car.type}</Text>
            </View>
            <View style={styles.rating}>
              <Ionicons name="star" size={18} color={colors.star} />
              <Text style={styles.ratingText}>{car.rating.toFixed(1)}</Text>
            </View>
          </View>

          <Text style={styles.name}>{car.name}</Text>

          <View style={styles.tabBar}>
            {TABS.map((t) => (
              <Pressable key={t} style={styles.tab} onPress={() => setTab(t)}>
                <Text style={[styles.tabText, tab === t && styles.tabTextActive]}>{t}</Text>
                {tab === t && <View style={styles.tabUnderline} />}
              </Pressable>
            ))}
          </View>

          {tab === 'About' && <AboutTab description={car.description} />}
          {tab === 'Gallery' && <GalleryTab car={car} />}
          {tab === 'Review' && <ReviewTab carId={car.id} />}
        </View>
      </ScrollView>

      <View style={[styles.bottomBar, { paddingBottom: insets.bottom || 16 }]}>
        <View>
          <Text style={styles.priceLabel}>Price</Text>
          <Text style={styles.price}>
            {formatPrice(car.pricePerHour)} <Text style={styles.priceUnit}>/hr</Text>
          </Text>
        </View>
        <PrimaryButton
          title="Book Now"
          pill
          style={styles.bookBtn}
          onPress={() => router.push(`/book/${car.id}`)}
        />
      </View>
    </View>
  );
}

function AboutTab({ description }: { description: string }) {
  const router = useRouter();
  const partner = 'Jenny Doe';
  return (
    <View>
      <Text style={styles.blockTitle}>Rent Partner</Text>
      <Pressable style={styles.partnerRow} onPress={() => router.push('/rental-partner')}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={28} color={colors.textSecondary} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.partnerName}>{partner}</Text>
          <Text style={styles.partnerRole}>Owner</Text>
        </View>
        <View style={styles.partnerActions}>
          <Pressable
            style={styles.actionCircle}
            onPress={() => router.push(`/chat-thread?name=${encodeURIComponent(partner)}`)}>
            <Ionicons name="chatbubble-ellipses" size={18} color={colors.primary} />
          </Pressable>
          <Pressable
            style={styles.actionCircle}
            onPress={() => router.push(`/video-call?name=${encodeURIComponent(partner)}`)}>
            <Ionicons name="call" size={18} color={colors.primary} />
          </Pressable>
        </View>
      </Pressable>
      <Text style={styles.blockTitle}>About</Text>
      <Text style={styles.about}>{description}</Text>
    </View>
  );
}

function GalleryTab({ car }: { car: (typeof CARS)[number] }) {
  return (
    <View>
      <View style={styles.galleryHeader}>
        <Text style={styles.blockTitle}>
          Gallery <Text style={{ color: colors.primary }}>({car.gallery.length + 20})</Text>
        </Text>
        <Text style={styles.viewAll}>View All</Text>
      </View>
      <View style={styles.galleryGrid}>
        {car.gallery.map((src, i) => (
          <View key={i} style={styles.galleryCell}>
            <Image source={src} style={styles.galleryImg} contentFit="contain" />
          </View>
        ))}
      </View>
    </View>
  );
}

function ReviewTab({ carId }: { carId: string }) {
  const router = useRouter();
  const FILTERS = ['Verified', 'Latest', 'With Photos'];
  const [active, setActive] = useState(['Verified', 'Latest']);
  const toggle = (f: string) =>
    setActive((a) => (a.includes(f) ? a.filter((x) => x !== f) : [...a, f]));

  return (
    <View>
      <View style={styles.galleryHeader}>
        <Text style={styles.blockTitle}>Reviews</Text>
        <Pressable style={styles.addReview} onPress={() => router.push(`/leave-review?id=${carId}`)} hitSlop={8}>
          <Ionicons name="create-outline" size={18} color={colors.primary} />
          <Text style={styles.viewAll}>add review</Text>
        </Pressable>
      </View>
      <View style={styles.reviewSearch}>
        <Ionicons name="search" size={20} color={colors.primary} />
        <TextInput
          style={styles.reviewInput}
          placeholder="Search in reviews"
          placeholderTextColor={colors.textSecondary}
        />
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.reviewFilters}>
        <View style={styles.filterChip}>
          <Ionicons name="options-outline" size={15} color={colors.text} />
          <Text style={styles.filterChipText}>Filter</Text>
          <Ionicons name="chevron-down" size={14} color={colors.text} />
        </View>
        {FILTERS.map((f) => {
          const on = active.includes(f);
          return (
            <Pressable
              key={f}
              style={[styles.pill, on ? styles.pillOn : styles.pillOff]}
              onPress={() => toggle(f)}>
              <Text style={[styles.pillText, { color: on ? colors.white : colors.text }]}>{f}</Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {REVIEWS.map((r) => (
        <View key={r.name} style={styles.review}>
          <View style={styles.reviewTop}>
            <View style={styles.reviewAvatar}>
              <Ionicons name="person" size={20} color={colors.textSecondary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.reviewName}>{r.name}</Text>
              <View style={styles.reviewStars}>
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Ionicons key={i} name="star" size={13} color={colors.star} />
                ))}
              </View>
            </View>
            <Text style={styles.reviewWhen}>{r.when}</Text>
          </View>
          <Text style={styles.reviewText}>{r.text}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.screenGray },
  top: { paddingHorizontal: 20 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headerTitle: { fontFamily: fontFamily.semibold, fontSize: 19, color: colors.text },
  headerActions: { flexDirection: 'row', gap: 10 },
  roundBtn: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hero: { width: '100%', height: 220, marginTop: 16 },
  sliderLine: {
    height: 22,
    marginTop: 6,
    borderBottomWidth: 1.5,
    borderBottomColor: '#BFD9FF',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  sliderPill: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 5,
    transform: [{ translateY: 12 }],
  },
  thumbs: { gap: 10, paddingVertical: 20, paddingRight: 8 },
  thumb: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  thumbImg: { width: '88%', height: '88%' },
  thumbMore: { backgroundColor: colors.primary },
  thumbMoreText: { fontFamily: fontFamily.bold, fontSize: 16, color: colors.white },
  sheet: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    marginTop: 4,
    paddingHorizontal: 24,
    paddingTop: 24,
    minHeight: 460,
  },
  chipRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  chip: {
    backgroundColor: colors.primaryTint,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  chipText: { fontFamily: fontFamily.semibold, fontSize: 13, color: colors.primary },
  rating: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  ratingText: { fontFamily: fontFamily.semibold, fontSize: 15, color: colors.text },
  name: { marginTop: 14, fontFamily: fontFamily.bold, fontSize: 24, color: colors.text },
  tabBar: {
    flexDirection: 'row',
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tab: { flex: 1, alignItems: 'center', paddingBottom: 12 },
  tabText: { fontFamily: fontFamily.medium, fontSize: 16, color: colors.text },
  tabTextActive: { fontFamily: fontFamily.semibold, color: colors.primary },
  tabUnderline: {
    position: 'absolute',
    bottom: -1,
    height: 3,
    width: '70%',
    borderRadius: 2,
    backgroundColor: colors.primary,
  },
  blockTitle: { marginTop: 22, fontFamily: fontFamily.bold, fontSize: 18, color: colors.text },
  partnerRow: { flexDirection: 'row', alignItems: 'center', marginTop: 14, gap: 14 },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.surfaceGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  partnerName: { fontFamily: fontFamily.bold, fontSize: 17, color: colors.text },
  partnerRole: { marginTop: 2, fontFamily: fontFamily.regular, fontSize: 14, color: colors.textSecondary },
  partnerActions: { flexDirection: 'row', gap: 10 },
  actionCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.primaryTint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  about: { marginTop: 12, fontFamily: fontFamily.regular, fontSize: 15, lineHeight: 23, color: colors.textSecondary },
  galleryHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  viewAll: { fontFamily: fontFamily.semibold, fontSize: 15, color: colors.primary },
  addReview: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  galleryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 14, marginTop: 16 },
  galleryCell: {
    width: '47%',
    height: 130,
    borderRadius: 14,
    backgroundColor: colors.surfaceGray,
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
  galleryImg: { width: '86%', height: '86%' },
  reviewSearch: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    height: 54,
    borderRadius: 14,
    backgroundColor: colors.surfaceGray,
    paddingHorizontal: 16,
    marginTop: 16,
  },
  reviewInput: { flex: 1, fontFamily: fontFamily.regular, fontSize: 16, color: colors.text },
  reviewFilters: { gap: 10, paddingVertical: 16, paddingRight: 8 },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    height: 40,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: colors.surfaceGray,
  },
  filterChipText: { fontFamily: fontFamily.medium, fontSize: 14, color: colors.text },
  pill: { height: 40, paddingHorizontal: 18, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  pillOn: { backgroundColor: colors.primary },
  pillOff: { backgroundColor: colors.surfaceGray },
  pillText: { fontFamily: fontFamily.semibold, fontSize: 14 },
  review: { marginTop: 18 },
  reviewTop: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  reviewAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surfaceGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reviewName: { fontFamily: fontFamily.semibold, fontSize: 16, color: colors.text },
  reviewStars: { flexDirection: 'row', gap: 2, marginTop: 3 },
  reviewWhen: { fontFamily: fontFamily.regular, fontSize: 13, color: colors.textSecondary },
  reviewText: { marginTop: 10, fontFamily: fontFamily.regular, fontSize: 14, lineHeight: 22, color: colors.textSecondary },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 16,
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#1B2A4A',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: -4 },
    elevation: 10,
  },
  priceLabel: { fontFamily: fontFamily.regular, fontSize: 14, color: colors.textSecondary },
  price: { marginTop: 2, fontFamily: fontFamily.bold, fontSize: 22, color: colors.primary },
  priceUnit: { fontFamily: fontFamily.medium, fontSize: 14, color: colors.textSecondary },
  bookBtn: { width: 200 },
});
