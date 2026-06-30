import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Image, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';

import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { colors, fontFamily } from '@/theme';

const HERO = require('../../assets/cars/welcome-hero.png');
const HERO_RATIO = 1092 / 566;

/** Thin curved connector line that links a floating badge to the car. */
function Connector({ flip }: { flip?: boolean }) {
  return (
    <Svg
      width={46}
      height={40}
      viewBox="0 0 46 40"
      fill="none"
      style={{ transform: [{ scaleX: flip ? -1 : 1 }] }}>
      <Path
        d="M2 2 C2 22 12 38 44 38"
        stroke={colors.primary}
        strokeWidth={1.5}
        strokeLinecap="round"
        opacity={0.9}
      />
    </Svg>
  );
}

export default function Welcome() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  const heroW = width * 1.35;
  const heroH = heroW / HERO_RATIO;

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom + 10 }]}>
      <StatusBar style="dark" />

      {/* Hero + floating badges */}
      <View style={styles.heroArea}>
        <Image
          source={HERO}
          resizeMode="contain"
          style={{ width: heroW, height: heroH, alignSelf: 'flex-start', marginLeft: -8 }}
        />

        {/* $30 / hr */}
        <View style={[styles.badge, styles.priceBadge]}>
          <View style={styles.badgeIcon}>
            <Text style={styles.dollar}>$</Text>
          </View>
          <Text style={styles.badgeValue}>$30 </Text>
          <Text style={styles.badgeUnit}>/hr</Text>
        </View>
        <View style={styles.priceConnector}>
          <Connector flip />
        </View>

        {/* 07 Seats */}
        <View style={[styles.badge, styles.seatsBadge]}>
          <View style={styles.badgeIcon}>
            <MaterialCommunityIcons name="seat-passenger" size={15} color={colors.white} />
          </View>
          <Text style={styles.badgeValue}>07 </Text>
          <Text style={styles.badgeUnit}>Seats</Text>
        </View>
        <View style={styles.seatsConnector}>
          <Connector />
        </View>
      </View>

      {/* Copy + CTAs */}
      <View style={styles.body}>
        <Text style={styles.headline}>
          Your Ultimate <Text style={styles.headlineAccent}>Car Rental</Text>
          {'\n'}Experience
        </Text>
        <Text style={styles.subtitle}>
          Rent the right car for every trip — from quick city errands to long weekend getaways. Book
          in minutes and hit the road.
        </Text>

        <View style={styles.cta}>
          <PrimaryButton
            title="Let's Get Started"
            onPress={() => router.push('/sign-up')}
            style={{ borderRadius: 20 }}
          />
          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <Pressable onPress={() => router.push('/sign-in')} hitSlop={8}>
              <Text style={styles.footerLink}>Sign In</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white, paddingHorizontal: 20 },
  heroArea: { height: '44%', position: 'relative', justifyContent: 'center' },
  badge: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 24,
    paddingVertical: 7,
    paddingHorizontal: 9,
    paddingRight: 16,
    shadowColor: '#1B2A4A',
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  priceBadge: { top: 84, right: 6 },
  seatsBadge: { top: 154, left: 0 },
  badgeIcon: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 9,
  },
  dollar: { color: colors.white, fontFamily: fontFamily.bold, fontSize: 13 },
  badgeValue: { fontFamily: fontFamily.bold, fontSize: 15, color: colors.text },
  badgeUnit: { fontFamily: fontFamily.medium, fontSize: 13, color: colors.textSecondary },
  priceConnector: { position: 'absolute', top: 118, right: 56 },
  seatsConnector: { position: 'absolute', top: 188, left: 58 },

  body: { flex: 1 },
  headline: {
    marginTop: 24,
    fontFamily: fontFamily.bold,
    fontSize: 25,
    lineHeight: 33,
    color: colors.text,
    textAlign: 'center',
  },
  headlineAccent: { color: colors.primary },
  subtitle: {
    marginTop: 16,
    fontFamily: fontFamily.regular,
    fontSize: 14,
    lineHeight: 22,
    color: colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: 8,
  },
  cta: { marginTop: 'auto' },
  footer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 22 },
  footerText: { fontFamily: fontFamily.regular, fontSize: 15, color: colors.text },
  footerLink: {
    fontFamily: fontFamily.semibold,
    fontSize: 15,
    color: colors.primary,
    textDecorationLine: 'underline',
  },
});
