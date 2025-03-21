import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { MaterialIcons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { router, useLocalSearchParams } from 'expo-router';
import colors from '@/constants/colors.json';

const paymentMethods = [
  { id: 1, name: 'Credit Card', icon: 'credit-card' },
  { id: 2, name: 'Mobile Money', icon: 'phone-android' },
  { id: 3, name: 'Bank Transfer', icon: 'account-balance' },
];

export default function PaymentScreen() {
  const params = useLocalSearchParams();
  const therapist = params.therapist ? JSON.parse(params.therapist as string) : null;
  const appointmentDate = params.appointmentDate ? new Date(params.appointmentDate as string) : null;
  const appointmentTime = params.appointmentTime as string;
  
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [amount] = useState('100.00');
  const [processing, setProcessing] = useState(false);

  const handlePayment = async () => {
    if (!selectedMethod) {
      alert('Please select a payment method');
      return;
    }
    
    setProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      router.push({
        pathname: '/(tabs)',
        params: { 
          message: 'Payment Successful!',
          details: 'Your appointment has been confirmed.'
        }
      });
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.primary.darkBrown, colors.primary.brown]}
        style={styles.header}
      >
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <MaterialIcons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Payment</ThemedText>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Amount Card */}
        <Animated.View 
          entering={FadeInDown.delay(200).springify()}
          style={styles.amountCard}
        >
          <ThemedText style={styles.amountLabel}>Amount to Pay</ThemedText>
          <ThemedText style={styles.amount}>UGX {amount}</ThemedText>
          <ThemedText style={styles.sessionInfo}>
            {therapist?.name} - {appointmentTime}
          </ThemedText>
          <ThemedText style={styles.sessionInfo}>
            {appointmentDate?.toLocaleDateString()}
          </ThemedText>
        </Animated.View>

        {/* Payment Methods */}
        <Animated.View 
          entering={FadeInDown.delay(300).springify()}
          style={styles.sectionContainer}
        >
          <ThemedText style={styles.sectionTitle}>Select Payment Method</ThemedText>
          {paymentMethods.map((method, index) => (
            <TouchableOpacity
              key={method.id}
              style={[
                styles.methodCard,
                selectedMethod === method.id && styles.selectedMethod
              ]}
              onPress={() => setSelectedMethod(method.id)}
            >
              <View style={styles.methodIcon}>
                <MaterialIcons 
                  name={method.icon} 
                  size={24} 
                  color={selectedMethod === method.id ? '#FFFFFF' : colors.primary.brown} 
                />
              </View>
              <ThemedText style={[
                styles.methodName,
                selectedMethod === method.id && styles.selectedMethodText
              ]}>
                {method.name}
              </ThemedText>
              <MaterialIcons 
                name={selectedMethod === method.id ? 'check-circle' : 'radio-button-unchecked'} 
                size={24} 
                color={selectedMethod === method.id ? '#FFFFFF' : colors.text.secondary} 
              />
            </TouchableOpacity>
          ))}
        </Animated.View>

        {/* Additional Information */}
        <Animated.View 
          entering={FadeInDown.delay(400).springify()}
          style={styles.infoCard}
        >
          <ThemedText style={styles.infoTitle}>Payment Information</ThemedText>
          <View style={styles.infoRow}>
            <MaterialIcons name="info" size={20} color={colors.services.blue} />
            <ThemedText style={styles.infoText}>
              Your payment is secure and encrypted
            </ThemedText>
          </View>
          <View style={styles.infoRow}>
            <MaterialIcons name="lock" size={20} color={colors.services.green} />
            <ThemedText style={styles.infoText}>
              Money-back guarantee for cancellations 24h before the session
            </ThemedText>
          </View>
        </Animated.View>
      </ScrollView>

      {/* Bottom Payment Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity 
          style={[styles.payButton, processing && styles.processingButton]}
          onPress={handlePayment}
          disabled={processing}
        >
          <ThemedText style={styles.payButtonText}>
            {processing ? 'Processing...' : 'Pay Now'}
          </ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  backButton: {
    marginBottom: 15,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  amountCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  amountLabel: {
    fontSize: 16,
    color: colors.text.secondary,
    marginBottom: 10,
  },
  amount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 10,
  },
  sessionInfo: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: colors.text.primary,
  },
  methodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  selectedMethod: {
    backgroundColor: colors.primary.brown,
  },
  methodIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F7FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  methodName: {
    flex: 1,
    fontSize: 16,
    color: colors.text.primary,
  },
  selectedMethodText: {
    color: '#FFFFFF',
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: colors.text.primary,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 14,
    color: colors.text.secondary,
    flex: 1,
  },
  bottomContainer: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  payButton: {
    backgroundColor: colors.primary.brown,
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
  },
  processingButton: {
    backgroundColor: colors.text.secondary,
  },
  payButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});