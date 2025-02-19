// TherapistListScreen.js
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const therapists = [
  { id: '1', name: 'Dr. John Doe', specialty: 'Psychologist' },
  { id: '2', name: 'Dr. Jane Smith', specialty: 'Therapist' },
  // Add more therapists as needed
];

const TherapistListScreen = ({ navigation }) => {
  return (
    <FlatList
      data={therapists}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.tile}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.specialty}>{item.specialty}</Text>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('BookAppointment', { therapist: item })}>
            <Text style={styles.buttonText}>Book Appointment</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  tile: {
    backgroundColor: '#E3F2FD',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  specialty: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#4A90E2',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default TherapistListScreen;
