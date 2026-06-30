import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Header } from '@/components/ui/Header';
import { colors, fontFamily } from '@/theme';

export default function EnterLocation() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');

  const choose = () => router.push('/notifications-permission');

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      <StatusBar style="dark" />
      <Header title="Enter Your Location" onBack={() => router.back()} />

      <View style={styles.searchField}>
        <Ionicons name="search" size={20} color={colors.text} />
        <TextInput
          style={styles.input}
          value={query}
          onChangeText={setQuery}
          placeholder="Golden Avenue"
          placeholderTextColor={colors.textSecondary}
          autoFocus
        />
        {query.length > 0 && (
          <Pressable onPress={() => setQuery('')} hitSlop={8}>
            <Ionicons name="close-circle" size={22} color={colors.primary} />
          </Pressable>
        )}
      </View>

      <Pressable style={styles.currentRow} onPress={choose}>
        <Ionicons name="navigate" size={20} color={colors.primary} />
        <Text style={styles.currentText}>Use my current location</Text>
      </Pressable>

      <View style={styles.divider} />

      <Text style={styles.resultLabel}>SEARCH RESULT</Text>
      <Pressable style={styles.result} onPress={choose}>
        <Ionicons name="navigate" size={18} color={colors.primary} style={{ marginTop: 2 }} />
        <View style={styles.resultText}>
          <Text style={styles.resultTitle}>Golden Avenue</Text>
          <Text style={styles.resultSub}>8502 Preston Rd. Ingl..</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white, paddingHorizontal: 24 },
  searchField: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    height: 56,
    borderRadius: 14,
    backgroundColor: colors.surfaceGray,
    paddingHorizontal: 16,
    marginTop: 20,
  },
  input: { flex: 1, fontFamily: fontFamily.regular, fontSize: 16, color: colors.text },
  currentRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 22 },
  currentText: { fontFamily: fontFamily.semibold, fontSize: 16, color: colors.text },
  divider: { height: 1, backgroundColor: colors.border, marginTop: 18 },
  resultLabel: {
    marginTop: 20,
    fontFamily: fontFamily.semibold,
    fontSize: 13,
    letterSpacing: 1.5,
    color: colors.textSecondary,
  },
  result: { flexDirection: 'row', gap: 12, marginTop: 16 },
  resultText: { flex: 1 },
  resultTitle: { fontFamily: fontFamily.semibold, fontSize: 17, color: colors.text },
  resultSub: {
    marginTop: 4,
    fontFamily: fontFamily.regular,
    fontSize: 15,
    color: colors.textSecondary,
  },
});
