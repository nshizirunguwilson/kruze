import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { KruzeLogo } from '@/components/icons/KruzeLogo';
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
        <KruzeLogo size={96} tileColor={colors.white} markColor={colors.primary} />
        <Text style={styles.title}>Kruze</Text>
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
  title: {
    marginTop: 22,
    color: colors.white,
    fontFamily: fontFamily.bold,
    fontSize: 30,
    letterSpacing: 0.3,
  },
});
