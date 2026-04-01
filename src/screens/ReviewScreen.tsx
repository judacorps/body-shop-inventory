import { useState } from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScreenLayout } from '../components/ScreenLayout';
import { PrimaryButton } from '../components/PrimaryButton';
import { RootStackParamList } from '../types/navigation';
import { colors } from '../theme/colors';
import { OCR_CONFIDENCE_THRESHOLD } from '../utils/validation';
import { useCaptureWorkflow } from '../state/useCaptureWorkflow';

export function ReviewScreen({ navigation, route }: NativeStackScreenProps<RootStackParamList, 'Review'>) {
  const [unitId, setUnitId] = useState(route.params.unitDetected);
  const [mileage, setMileage] = useState(route.params.mileageDetected);
  const { saveRecord, warning } = useCaptureWorkflow();

  const lowConfidence =
    route.params.unitConfidence < OCR_CONFIDENCE_THRESHOLD ||
    route.params.mileageConfidence < OCR_CONFIDENCE_THRESHOLD;

  async function handleSave() {
    try {
      const result = await saveRecord({
        unitId,
        mileageText: mileage,
        unitPhotoUri: route.params.unitPhotoUri,
        odometerPhotoUri: route.params.odometerPhotoUri,
        unitConfidence: route.params.unitConfidence,
        mileageConfidence: route.params.mileageConfidence,
      });

      const msg = result.mileageWarning
        ? `Guardado con advertencia:\n${result.mileageWarning}`
        : 'Registro guardado localmente con evidencia fotográfica.';

      Alert.alert('Éxito', msg, [{ text: 'OK', onPress: () => navigation.popToTop() }]);
    } catch (error) {
      Alert.alert('Error', error instanceof Error ? error.message : 'No se pudo guardar.');
    }
  }

  return (
    <ScreenLayout title="Revisión" subtitle="Confirma OCR antes de guardar.">
      {lowConfidence ? <Text style={styles.warning}>OCR con baja confianza, corrige manualmente.</Text> : null}

      <View style={styles.row}>
        <Image source={{ uri: route.params.unitPhotoUri }} style={styles.image} />
        <Image source={{ uri: route.params.odometerPhotoUri }} style={styles.image} />
      </View>

      <Text style={styles.label}>Número de unidad</Text>
      <TextInput style={styles.input} value={unitId} onChangeText={setUnitId} autoCapitalize="characters" />

      <Text style={styles.label}>Mileage</Text>
      <TextInput style={styles.input} value={mileage} onChangeText={setMileage} keyboardType="number-pad" />

      {warning ? <Text style={styles.warning}>{warning}</Text> : null}

      <PrimaryButton label="Guardar registro" onPress={handleSave} />
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 8 },
  image: { flex: 1, height: 120, borderRadius: 8 },
  label: { color: colors.muted, marginTop: 8 },
  input: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 10,
    color: colors.text,
    fontSize: 20,
    padding: 12,
    minHeight: 52,
  },
  warning: {
    color: colors.warning,
    fontWeight: '700',
    backgroundColor: '#2A2410',
    borderRadius: 8,
    padding: 10,
  },
});
