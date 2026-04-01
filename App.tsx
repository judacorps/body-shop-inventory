import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { AppNavigator } from './src/navigation/AppNavigator';
import { colors } from './src/theme/colors';

const appTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
    text: colors.text,
    primary: colors.primary,
    card: colors.surface,
    border: colors.border,
  },
};

export default function App() {
  return (
    <NavigationContainer theme={appTheme}>
      <StatusBar style="light" />
      <AppNavigator />
    </NavigationContainer>
  );
}
