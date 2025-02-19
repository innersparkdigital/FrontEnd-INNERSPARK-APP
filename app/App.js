import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import SupportGroupScreen from './SupportGroupScreen';
import BookAppointmentScreen from './BookAppointmentsScreen';
import ExperienceScreen from './ExperienceScreen';
import TherapistListScreen from './TherapistListScreen';
import PaymentScreen from './PaymentScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SupportGroup" component={SupportGroupScreen} />
        <Stack.Screen name="BookAppointment" component={BookAppointmentScreen} />
        <Stack.Screen name="Experience" component={ExperienceScreen} />
        <Stack.Screen name="TherapistList" component={TherapistListScreen} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
