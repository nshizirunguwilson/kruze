import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CarCard } from '@/components/cars/CarCard';
import { Header } from '@/components/ui/Header';
import { popularCars } from '@/data/cars';
import { colors } from '@/theme';

export default function SeeAll() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      <StatusBar style="dark" />
      <View style={styles.headerWrap}>
        <Header title="Popular Car" onBack={() => router.back()} />
      </View>
      <ScrollView
        contentContainerStyle={[styles.list, { paddingBottom: insets.bottom + 24 }]}
        showsVerticalScrollIndicator={false}>
        {popularCars.map((car) => (
          <CarCard
            key={car.id}
            car={car}
            image={car.hero}
            onPress={() => router.push(`/car/${car.id}`)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  headerWrap: { paddingHorizontal: 20 },
  list: { paddingHorizontal: 20, paddingTop: 12, gap: 22 },
});
