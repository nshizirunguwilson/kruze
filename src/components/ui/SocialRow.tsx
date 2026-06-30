import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AppleIcon, FacebookIcon, GoogleIcon } from '@/components/icons/SocialIcons';
import { colors, fontFamily } from '@/theme';

/** "Or sign in with" divider followed by the three social provider circles. */
export function SocialRow({ label }: { label: string }) {
  return (
    <View>
      <View style={styles.divider}>
        <View style={styles.line} />
        <Text style={styles.dividerText}>{label}</Text>
        <View style={styles.line} />
      </View>
      <View style={styles.circles}>
        <SocialCircle>
          <AppleIcon size={26} />
        </SocialCircle>
        <SocialCircle>
          <GoogleIcon size={26} />
        </SocialCircle>
        <SocialCircle>
          <FacebookIcon size={26} />
        </SocialCircle>
      </View>
    </View>
  );
}

function SocialCircle({ children }: { children: React.ReactNode }) {
  return (
    <Pressable style={({ pressed }) => [styles.circle, pressed && styles.pressed]}>
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  divider: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  line: { flex: 1, height: 1, backgroundColor: colors.border },
  dividerText: { fontFamily: fontFamily.regular, fontSize: 15, color: colors.textSecondary },
  circles: { flexDirection: 'row', justifyContent: 'center', gap: 28, marginTop: 26 },
  circle: {
    width: 62,
    height: 62,
    borderRadius: 31,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  pressed: { backgroundColor: colors.surfaceGray },
});
