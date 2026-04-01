import { ReactNode } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';

interface Props {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export function ScreenLayout({ title, subtitle, children }: Props) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        <View style={styles.body}>{children}</View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  content: { padding: 16 },
  title: { color: colors.text, fontSize: 30, fontWeight: '800', marginBottom: 4 },
  subtitle: { color: colors.muted, fontSize: 16, marginBottom: 16 },
  body: { gap: 12 },
});
