import { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors, fontFamily } from '@/theme';

import { CircleBackButton } from './CircleBackButton';

type Props = {
  title?: string;
  onBack?: () => void;
  /** Optional element pinned to the right (share, heart, search, etc.). */
  right?: ReactNode;
};

/** Standard screen header: circular back button, centered title, optional right action. */
export function Header({ title, onBack, right }: Props) {
  return (
    <View style={styles.row}>
      {title ? (
        <Text style={styles.title} numberOfLines={1} pointerEvents="none">
          {title}
        </Text>
      ) : null}
      <CircleBackButton onPress={onBack} />
      <View style={styles.right}>{right}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    fontFamily: fontFamily.semibold,
    fontSize: 19,
    color: colors.text,
  },
  right: { minWidth: 46, alignItems: 'flex-end' },
});
