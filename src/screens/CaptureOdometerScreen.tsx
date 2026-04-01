import { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScreenLayout } from '../components/ScreenLayout';
import { PrimaryButton } from '../components/PrimaryButton';
import { RootStackParamList } from '../types/navigation';
import { useCaptureWorkflow } from '../state/useCaptureWorkflow';
import { colors } from '../theme/colors';

export function CaptureOdometerScreen({ navigation, route }: NativeStackScreenProps<RootStackParamList, 'CaptureOdometer'>) {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [detectedMileage, setDetectedMileage] = useState('');
  const [confidence, setConfidence] = useState(0);
  const { detectMileage } = useCaptureWorkflow();

  async function handleTakePhoto() {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) return;

    const result = await ImagePicker.launchCameraAsync({ quality: 0.7 });
    if (result.canceled || !result.assets[0]) return;

    const uri = result.assets[0].uri;
    setImageUri(uri);
    const ocr = await detectMileage(uri);
    setDetectedMileage(ocr.value);
    setConfidence(ocr.confidence);
  }

  return (
    <ScreenLayout title="Odómetro" subtitle="Evita reflejos y enfoca solo el número de millas.">
      <PrimaryButton label="Tomar foto odómetro" onPress={handleTakePhoto} />
      {imageUri ? <Image source={{ uri: imageUri }} style={styles.preview} /> : null}
      {detectedMileage ? (
        <View style={styles.panel}>
          <Text style={styles.label}>Mileage detectado:</Text>
          <Text style={styles.value}>{detectedMileage}</Text>
          <Text style={styles.note}>Confianza OCR: {(confidence * 100).toFixed(0)}%</Text>
        </View>
      ) : null}

      <PrimaryButton
        label="Revisar y guardar"
        onPress={() => {
          if (!imageUri) return;
          navigation.navigate('Review', {
            unitPhotoUri: route.params.unitPhotoUri,
            odometerPhotoUri: imageUri,
            unitDetected: route.params.unitIdSeed || '',
            mileageDetected: detectedMileage,
            unitConfidence: 0.75,
            mileageConfidence: confidence,
          });
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
