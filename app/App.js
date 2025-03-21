import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SupportGroupScreen from './SupportGroupScreen';
import BookAppointmentScreen from './BookAppointmentsScreen';
import ExperienceScreen from './ExperienceScreen';
import TherapistListScreen from './TherapistListScreen';
import PaymentScreen from './PaymentScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="(tabs)">
        <Stack.Screen name="(tabs)" component={require('./(tabs)/index.tsx').default} options={{ headerShown: false }} />
        <Stack.Screen name="SupportGroup" component={SupportGroupScreen} />
        <Stack.Screen name="BookAppointment" component={BookAppointmentScreen} />
        <Stack.Screen name="Experience" component={ExperienceScreen} />
        <Stack.Screen name="TherapistList" component={TherapistListScreen} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
