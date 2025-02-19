// PaymentScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const PaymentScreen = () => {
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const handlePayment = () => {
    // Implement payment functionality here
    Alert.alert('Payment Successful', `You have paid ${amount} using ${paymentMethod}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Enter Payment Details</Text>
      <TextInput
        style={styles.input}
        placeholder="Amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      <TextInput
        style={styles.input}
        placeholder="Payment Method (e.g., PayPal, Airtel, MTN, Bank)"
        value={paymentMethod}
        onChangeText={setPaymentMethod}
      />
      <TouchableOpacity style={styles.button} onPress={handlePayment}>
        <Text style={styles.buttonText}>Pay Now</Text>
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
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
    backgroundColor: '#FFF',
    width: '80%',
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

export default PaymentScreen;
