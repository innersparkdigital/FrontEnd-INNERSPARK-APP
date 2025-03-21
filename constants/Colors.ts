/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const primaryColor = '#4A90E2';  // Calming blue
const secondaryColor = '#63C2A5'; // Healing green
const accentColor = '#FFB74D';   // Warm orange

export const Colors = {
  light: {
    text: '#2C3E50',
    background: '#F5F7FA',
    tint: primaryColor,
    tabIconDefault: '#94A3B8',
    tabIconSelected: primaryColor,
    card: '#FFFFFF',
    border: '#E2E8F0',
    notification: secondaryColor,
    accent: accentColor,
  },
  dark: {
    text: '#F7FAFC',
    background: '#1A202C',
    tint: primaryColor,
    tabIconDefault: '#718096',
    tabIconSelected: primaryColor,
    card: '#2D3748',
    border: '#4A5568',
    notification: secondaryColor,
    accent: accentColor,
  },
};
