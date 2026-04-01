import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, StyleSheet, View } from 'react-native';
import { PrimaryButton } from '../components/PrimaryButton';
import { ScreenLayout } from '../components/ScreenLayout';
import { RootStackParamList } from '../types/navigation';
import { colors } from '../theme/colors';

export function HomeScreen({ navigation }: NativeStackScreenProps<RootStackParamList, 'Home'>) {
  return (
    <ScreenLayout title="Registro Rápido" subtitle="Flujo de una mano para técnicos en taller.">
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Paso 1</Text>
        <Text style={styles.cardText}>Foto al número de unidad en el exterior.</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Paso 2</Text>
        <Text style={styles.cardText}>Foto al tablero/odómetro.</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Paso 3</Text>
        <Text style={styles.cardText}>Confirmación OCR, validaciones y guardado local.</Text>
      </View>

      <PrimaryButton label="Iniciar captura" onPress={() => navigation.navigate('CaptureUnit')} />
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 16,
  },
  cardTitle: { color: colors.primary, fontWeight: '700', fontSize: 16, marginBottom: 6 },
  cardText: { color: colors.text, fontSize: 15 },
});
