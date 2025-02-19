// SupportGroupScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SupportGroupScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the Support Group!</Text>
      {/* Add chat or interaction functionality here */}
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
  },
});

export default SupportGroupScreen;
