import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Header } from '@/components/ui/Header';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { CARS, getCar } from '@/data/cars';
import { colors, fontFamily } from '@/theme';

export default function LeaveReview() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const car = getCar(String(id)) ?? CARS[0];
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState('');
  const [photos, setPhotos] = useState<number[]>([]);
  const addPhoto = () => setPhotos((p) => [...p, p.length % car.gallery.length]);

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      <StatusBar style="dark" />
      <View style={styles.headerWrap}>
        <Header title="Leave Review" onBack={() => router.back()} />
      </View>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={{ paddingBottom: 200 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <Image source={car.hero} style={styles.hero} contentFit="contain" />

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
            <View style={styles.divider} />

            <Text style={styles.question}>How is Your Rental Experience?</Text>
            <View style={styles.divider} />

            <Text style={styles.overall}>Your overall rating</Text>
            <View style={styles.stars}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Pressable key={i} onPress={() => setRating(i + 1)} hitSlop={6}>
                  <Ionicons
                    name="star"
                    size={42}
                    color={i < rating ? colors.star : colors.border}
                  />
                </Pressable>
              ))}
            </View>

            <Text style={styles.addLabel}>Add detailed review</Text>
            <TextInput
              style={styles.textArea}
              value={review}
              onChangeText={setReview}
              placeholder="Enter here"
              placeholderTextColor={colors.textSecondary}
              multiline
              textAlignVertical="top"
            />
            <View style={styles.photoWrap}>
              {photos.map((g, i) => (
                <View key={i} style={styles.photoThumb}>
                  <Image source={car.gallery[g]} style={styles.photoImg} contentFit="contain" />
                  <Pressable
                    style={styles.photoRemove}
                    hitSlop={6}
                    onPress={() => setPhotos((p) => p.filter((_, idx) => idx !== i))}>
                    <Ionicons name="close" size={13} color={colors.white} />
                  </Pressable>
                </View>
              ))}
              <Pressable style={styles.photoRow} hitSlop={6} onPress={addPhoto}>
                <Ionicons name="camera-outline" size={20} color={colors.primary} />
                <Text style={styles.photoText}>add photo</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={[styles.bottomBar, { paddingBottom: insets.bottom || 16 }]}>
        <PrimaryButton title="Continue" pill onPress={() => router.back()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.screenGray },
  flex: { flex: 1 },
  headerWrap: { paddingHorizontal: 24, backgroundColor: colors.screenGray },
  hero: { width: '62%', height: 130, alignSelf: 'center', marginVertical: 8 },
  sheet: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 24,
    paddingTop: 24,
    minHeight: 600,
  },
  chipRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  chip: { backgroundColor: colors.primaryTint, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 5 },
  chipText: { fontFamily: fontFamily.semibold, fontSize: 13, color: colors.primary },
  rating: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  ratingText: { fontFamily: fontFamily.semibold, fontSize: 15, color: colors.text },
  name: { marginTop: 12, fontFamily: fontFamily.bold, fontSize: 22, color: colors.text },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: 18 },
  question: { fontFamily: fontFamily.bold, fontSize: 26, color: colors.text, textAlign: 'center', lineHeight: 34 },
  overall: { fontFamily: fontFamily.medium, fontSize: 16, color: colors.textSecondary, textAlign: 'center' },
  stars: { flexDirection: 'row', justifyContent: 'center', gap: 12, marginTop: 16, marginBottom: 8 },
  addLabel: { marginTop: 20, fontFamily: fontFamily.bold, fontSize: 17, color: colors.text },
  textArea: {
    height: 150,
    borderRadius: 14,
    backgroundColor: colors.surfaceGray,
    padding: 16,
    marginTop: 14,
    fontFamily: fontFamily.regular,
    fontSize: 16,
    color: colors.text,
  },
  photoWrap: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 12, marginTop: 16 },
  photoRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  photoText: { fontFamily: fontFamily.semibold, fontSize: 15, color: colors.primary },
  photoThumb: { width: 64, height: 64, borderRadius: 12, backgroundColor: colors.surfaceGray, alignItems: 'center', justifyContent: 'center' },
  photoImg: { width: '86%', height: '86%' },
  photoRemove: { position: 'absolute', top: -6, right: -6, width: 22, height: 22, borderRadius: 11, backgroundColor: colors.heart, alignItems: 'center', justifyContent: 'center' },
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
