import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/HomeScreen';
import { CaptureUnitScreen } from '../screens/CaptureUnitScreen';
import { CaptureOdometerScreen } from '../screens/CaptureOdometerScreen';
import { ReviewScreen } from '../screens/ReviewScreen';
import { RootStackParamList } from '../types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#1A232C' },
        headerTintColor: '#F5F7FA',
        contentStyle: { backgroundColor: '#101418' },
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Registro de Mileage' }} />
      <Stack.Screen name="CaptureUnit" component={CaptureUnitScreen} options={{ title: 'Captura Unidad' }} />
      <Stack.Screen name="CaptureOdometer" component={CaptureOdometerScreen} options={{ title: 'Captura Odometer' }} />
      <Stack.Screen name="Review" component={ReviewScreen} options={{ title: 'Confirmar y Guardar' }} />
    </Stack.Navigator>
  );
}
