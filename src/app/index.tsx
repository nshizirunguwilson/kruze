import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { CarFrontIcon } from '@/components/icons/CarFrontIcon';
import { colors, fontFamily } from '@/theme';

export default function SplashScreenView() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => router.replace('/onboarding'), 2000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.logoBlock}>
        <View style={styles.iconCircle}>
          <CarFrontIcon size={46} color={colors.primary} cutout={colors.white} />
        </View>
        <Text style={styles.title}>Car Rental</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.splash,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoBlock: {
    alignItems: 'center',
  },
  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginTop: 22,
    color: colors.white,
    fontFamily: fontFamily.bold,
    fontSize: 30,
    letterSpacing: 0.3,
  },
});
