// BookAppointmentScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const BookAppointmentScreen = ({ route }) => {
  const { therapist } = route.params;

  const handleBook = () => {
    // Implement booking functionality here
    alert(`Appointment booked with ${therapist.name}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Book your Appointment with {therapist.name}</Text>
      <TouchableOpacity style={styles.button} onPress={handleBook}>
        <Text style={styles.buttonText}>Confirm Booking</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4A90E2',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4A90E2',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BookAppointmentScreen;
