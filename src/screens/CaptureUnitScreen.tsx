import { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScreenLayout } from '../components/ScreenLayout';
import { PrimaryButton } from '../components/PrimaryButton';
import { RootStackParamList } from '../types/navigation';
import { colors } from '../theme/colors';
import { useCaptureWorkflow } from '../state/useCaptureWorkflow';

export function CaptureUnitScreen({ navigation }: NativeStackScreenProps<RootStackParamList, 'CaptureUnit'>) {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [detectedUnit, setDetectedUnit] = useState('');
  const { detectUnit, existingUnit } = useCaptureWorkflow();

  async function handleTakePhoto() {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) return;

    const result = await ImagePicker.launchCameraAsync({ quality: 0.7 });
    if (result.canceled || !result.assets[0]) return;

    const uri = result.assets[0].uri;
    setImageUri(uri);
    const ocr = await detectUnit(uri);
    setDetectedUnit(ocr.value);
  }

  return (
    <ScreenLayout title="Unidad" subtitle="Alinea el identificador exterior del vehículo.">
      <PrimaryButton label="Tomar foto unidad" onPress={handleTakePhoto} />

      {imageUri ? <Image source={{ uri: imageUri }} style={styles.preview} /> : null}

      {detectedUnit ? (
        <View style={styles.panel}>
          <Text style={styles.label}>Unidad detectada:</Text>
          <Text style={styles.value}>{detectedUnit}</Text>
          {existingUnit ? (
            <Text style={styles.note}>Último mileage: {existingUnit.lastMileage}</Text>
          ) : (
            <Text style={styles.note}>Unidad nueva (sin historial local).</Text>
          )}
        </View>
      ) : null}

      <PrimaryButton
        label="Continuar a odómetro"
        onPress={() => {
          if (!imageUri) return;
          navigation.navigate('CaptureOdometer', { unitPhotoUri: imageUri, unitIdSeed: detectedUnit });
        }}
        disabled={!imageUri}
      />
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  preview: { width: '100%', height: 220, borderRadius: 12 },
  panel: { backgroundColor: colors.surface, borderRadius: 12, padding: 14 },
  label: { color: colors.muted },
  value: { color: colors.text, fontSize: 24, fontWeight: '800' },
  note: { color: colors.primary, marginTop: 6 },
});
