import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme'; // Custom hook for theme management

// Prevent the splash screen from auto-hiding before assets are loaded
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // Detect the color scheme (dark/light)
  const colorScheme = useColorScheme();

  // Load custom fonts
  const [fontsLoaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  // Hide the splash screen when fonts are loaded
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // Return null until fonts are loaded
  if (!fontsLoaded) {
    return null;
  }

  return (
    // Wrap the entire application in the theme provider for dynamic theming
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {/* Root Stack Navigation */}
      <Stack>
        {/* Hide header globally for tabs */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        {/* Handle Not Found Page */}
        <Stack.Screen name="+not-found" />
      </Stack>

      {/* Set Status Bar Appearance */}
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </ThemeProvider>
  );
}

