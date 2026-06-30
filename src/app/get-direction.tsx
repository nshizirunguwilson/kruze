import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CircleBackButton } from '@/components/ui/CircleBackButton';
import { MapPlaceholder } from '@/components/ui/MapPlaceholder';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { colors, fontFamily } from '@/theme';

export default function GetDirection() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { mode } = useLocalSearchParams<{ mode?: string }>();
  const isNavigate = mode === 'navigate';

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <MapPlaceholder full />

      <View style={[styles.header, { top: insets.top + 12 }]}>
        <CircleBackButton onPress={() => router.back()} />
        <Text style={styles.title}>{isNavigate ? 'Navigate to Car Pick-Up' : 'Get Direction'}</Text>
        <View style={{ width: 46 }} />
      </View>

      <View style={[styles.bottomBar, { paddingBottom: insets.bottom || 16 }]}>
        <PrimaryButton
          title={isNavigate ? 'Get Direction' : 'Start'}
          pill
          onPress={() => router.push('/arrived?type=pickup')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  header: {
    position: 'absolute',
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: { fontFamily: fontFamily.semibold, fontSize: 19, color: colors.text },
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
  },
});
