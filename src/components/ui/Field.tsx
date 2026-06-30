import { Ionicons } from '@expo/vector-icons';
import { ReactNode, useState } from 'react';
import {
  KeyboardTypeOptions,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { colors, fontFamily } from '@/theme';

const SURFACE = {
  height: 56,
  borderRadius: 14,
  backgroundColor: colors.surfaceGray,
  paddingHorizontal: 18,
};

type BaseProps = {
  label: string;
  /** Render below the input (e.g. Forgot Password link). */
  footer?: ReactNode;
};

type InputProps = BaseProps & {
  value: string;
  onChangeText: (t: string) => void;
  placeholder?: string;
  secure?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: 'none' | 'sentences' | 'words';
  /** Leading element inside the surface (e.g. the +1 country prefix). */
  left?: ReactNode;
};

const labelStyle = {
  fontFamily: fontFamily.medium,
  fontSize: 15,
  color: colors.text,
  marginBottom: 8,
} as const;

/** Labeled text input. Pass `secure` to get a password field with an eye toggle. */
export function InputField({
  label,
  value,
  onChangeText,
  placeholder,
  secure,
  keyboardType,
  autoCapitalize = 'none',
  left,
  footer,
}: InputProps) {
  const [hidden, setHidden] = useState(true);
  return (
    <View>
      <Text style={labelStyle}>{label}</Text>
      <View style={[SURFACE, styles.row]}>
        {left}
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.textSecondary}
          secureTextEntry={secure && hidden}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={false}
        />
        {secure && (
          <Pressable onPress={() => setHidden((h) => !h)} hitSlop={10}>
            <Ionicons
              name={hidden ? 'eye-off-outline' : 'eye-outline'}
              size={22}
              color={colors.text}
            />
          </Pressable>
        )}
      </View>
      {footer}
    </View>
  );
}

type SelectProps = BaseProps & {
  value?: string;
  placeholder: string;
  onPress?: () => void;
};

/** Labeled select-style field: shows value/placeholder with a chevron. */
export function SelectField({ label, value, placeholder, onPress }: SelectProps) {
  return (
    <View>
      <Text style={labelStyle}>{label}</Text>
      <Pressable style={[SURFACE, styles.row]} onPress={onPress}>
        <Text
          style={[styles.input, { color: value ? colors.text : colors.textSecondary }]}
          numberOfLines={1}>
          {value || placeholder}
        </Text>
        <Ionicons name="chevron-down" size={20} color={colors.text} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
  input: {
    flex: 1,
    fontFamily: fontFamily.regular,
    fontSize: 16,
    color: colors.text,
    paddingVertical: 0,
  },
});
