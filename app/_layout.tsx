import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [fontsLoaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen 
          name="therapist-list" 
          options={{ 
            title: 'Find Therapist',
            headerShown: false 
          }} 
        />
        <Stack.Screen 
          name="book-appointment" 
          options={{ 
            title: 'Book Appointment',
            headerShown: false 
          }} 
        />
        <Stack.Screen 
          name="support-group" 
          options={{ 
            title: 'Support Group',
            headerShown: false 
          }} 
        />
        <Stack.Screen 
          name="experience" 
          options={{ 
            title: 'Your Journey',
            headerShown: false 
          }} 
        />
        <Stack.Screen 
          name="payment" 
          options={{ 
            title: 'Payment',
            headerShown: false 
          }} 
        />
        <Stack.Screen name="+not-found" options={{ title: 'Oops!' }} />
      </Stack>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </ThemeProvider>
  );
}

