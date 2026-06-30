import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { ImageSourcePropType, Pressable, StyleSheet, Text, View } from 'react-native';

import type { Car } from '@/data/cars';
import { formatPrice } from '@/data/cars';
import { colors, fontFamily } from '@/theme';

import { SpecsRow } from './SpecsRow';

type Props = {
  car: Car;
  onPress?: () => void;
  favorite?: boolean;
  onToggleFavorite?: () => void;
  /** Override the card photo (e.g. side profile on See-All). Defaults to the 3/4 view. */
  image?: ImageSourcePropType;
};

/** Full car card (Home "Popular Car", See-All, search results). */
export function CarCard({ car, onPress, favorite, onToggleFavorite, image }: Props) {
  const isFav = favorite ?? car.favorite;
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.imageWrap}>
        <Image source={image ?? car.card} style={styles.image} contentFit="contain" />
        <View style={styles.ratingBadge}>
          <Ionicons name="star" size={14} color={colors.star} />
          <Text style={styles.ratingText}>{car.rating.toFixed(1)}</Text>
        </View>
        <Pressable style={styles.heart} onPress={onToggleFavorite} hitSlop={8}>
          <Ionicons
            name={isFav ? 'heart' : 'heart-outline'}
            size={20}
            color={isFav ? colors.heart : colors.textSecondary}
          />
        </Pressable>
      </View>

      <View style={styles.chip}>
        <Text style={styles.chipText}>{car.type}</Text>
      </View>

      <View style={styles.titleRow}>
        <Text style={styles.name} numberOfLines={1}>
          {car.name}
        </Text>
        <Text style={styles.price}>
          {formatPrice(car.pricePerHour)} <Text style={styles.priceUnit}>/hr</Text>
        </Text>
      </View>

      <View style={styles.divider} />
      <SpecsRow car={car} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 14,
    shadowColor: '#1B2A4A',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  imageWrap: {
    height: 188,
    borderRadius: 14,
    backgroundColor: colors.surfaceGray,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  image: { width: '100%', height: '82%', alignSelf: 'center' },
  ratingBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  ratingText: { fontFamily: fontFamily.semibold, fontSize: 13, color: colors.text },
  heart: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chip: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primaryTint,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginTop: 14,
  },
  chipText: { fontFamily: fontFamily.semibold, fontSize: 12, color: colors.primary },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  name: { flex: 1, fontFamily: fontFamily.bold, fontSize: 19, color: colors.text },
  price: { fontFamily: fontFamily.bold, fontSize: 18, color: colors.primary },
  priceUnit: { fontFamily: fontFamily.medium, fontSize: 13, color: colors.textSecondary },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: 14 },
});
