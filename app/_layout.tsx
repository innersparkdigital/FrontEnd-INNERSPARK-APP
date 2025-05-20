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
        <Stack.Screen 
          name="payment-methods" 
          options={{ 
            title: 'Payment Methods',
            headerShown: false 
          }} 
        />
        <Stack.Screen 
          name="add-payment-method" 
          options={{ 
            title: 'Add Payment Method',
            headerShown: false 
          }} 
        />
        <Stack.Screen 
          name="edit-profile" 
          options={{ 
            title: 'Edit Profile',
            headerShown: false 
          }} 
        />
        <Stack.Screen 
          name="privacy-policy" 
          options={{ 
            title: 'Privacy Policy',
            headerShown: false 
          }} 
        />
        <Stack.Screen 
          name="weekly-goals" 
          options={{ 
            title: 'Weekly Goals',
            headerShown: false 
          }} 
        />
        <Stack.Screen name="+not-found" options={{ title: 'Oops!' }} />
      </Stack>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </ThemeProvider>
  );
}

