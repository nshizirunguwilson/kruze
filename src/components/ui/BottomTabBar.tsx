import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, fontFamily } from '@/theme';

type IconName = keyof typeof Ionicons.glyphMap;

/** Minimal structural shape of the props expo-router passes to a custom tabBar. */
type TabBarProps = {
  state: { index: number; routes: { key: string; name: string }[] };
  navigation: {
    emit: (event: any) => any;
    navigate: (name: any) => void;
  };
};

const ICONS: Record<string, { on: IconName; off: IconName; label: string }> = {
  home: { on: 'home', off: 'home-outline', label: 'Home' },
  explore: { on: 'location', off: 'location-outline', label: 'Explore' },
  favorite: { on: 'heart', off: 'heart-outline', label: 'Favorite' },
  chat: { on: 'chatbubble-ellipses', off: 'chatbubble-ellipses-outline', label: 'Chat' },
  profile: { on: 'person', off: 'person-outline', label: 'Profile' },
};

/** Custom floating bottom tab bar matching the design. */
export function BottomTabBar({ state, navigation }: TabBarProps) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.wrap, { paddingBottom: insets.bottom || 12 }]}>
      <View style={styles.bar}>
        {state.routes.map((route, index) => {
          const cfg = ICONS[route.name];
          if (!cfg) return null;
          const focused = state.index === index;
          const color = focused ? colors.primary : colors.textMuted;
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!focused && !event.defaultPrevented) navigation.navigate(route.name);
          };
          return (
            <Pressable key={route.key} style={styles.item} onPress={onPress}>
              <Ionicons name={focused ? cfg.on : cfg.off} size={24} color={color} />
              <Text style={[styles.label, { color }]}>{cfg.label}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    shadowColor: '#1B2A4A',
    shadowOpacity: 0.08,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: -6 },
    elevation: 12,
  },
  bar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 14,
    paddingHorizontal: 10,
  },
  item: { alignItems: 'center', gap: 5, flex: 1 },
  label: { fontFamily: fontFamily.medium, fontSize: 11.5 },
});
