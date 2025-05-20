import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView, TextInput, Image, Alert, Platform, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { MaterialIcons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { router, useLocalSearchParams } from 'expo-router';
import colors from '@/constants/colors.json';

const PaymentOption = ({ title, icon, selected, onSelect }) => (
  <TouchableOpacity 
    style={[styles.optionCard, selected && styles.selectedOption]}
    onPress={onSelect}
  >
    <Image 
      source={icon} 
      style={styles.optionIcon}
      resizeMode="contain"
    />
    <ThemedText style={[styles.optionText, selected && styles.selectedOptionText]}>
      {title}
    </ThemedText>
  </TouchableOpacity>
);

export default function AddPaymentMethodScreen() {
  const params = useLocalSearchParams();
  const isEditing = params.edit === 'true';
  
  const [selectedType, setSelectedType] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const paymentOptions = [
    { id: 'mtn', title: 'MTN Mobile Money', icon: require('@/assets/images/mtn.jpg') },
    { id: 'airtel', title: 'Airtel Money', icon: require('@/assets/images/airtel.jpg') },
  ];

  const handleSave = () => {
    if (!selectedType) {
      Alert.alert('Error', 'Please select a payment method');
      return;
    }

    if (!phoneNumber) {
      Alert.alert('Error', 'Please enter phone number');
      return;
    }

    Alert.alert(
      'Success',
      'Payment method added successfully',
      [{ text: 'OK', onPress: () => router.back() }]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.statusBarPadding} />
      <LinearGradient
        colors={[colors.primary.darkBrown, colors.primary.brown]}
        style={styles.header}
      >
        <View style={styles.headerTop}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <MaterialIcons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <ThemedText style={styles.headerTitle}>
            {isEditing ? 'Edit Payment Method' : 'Add Payment Method'}
          </ThemedText>
          <TouchableOpacity 
            style={styles.saveButton}
            onPress={handleSave}
          >
            <MaterialIcons name="check" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content}>
        <ThemedText style={styles.sectionTitle}>Select Payment Method</ThemedText>
        <View style={styles.optionsGrid}>
          {paymentOptions.map(option => (
            <PaymentOption
              key={option.id}
              title={option.title}
              icon={option.icon}
              selected={selectedType === option.id}
              onSelect={() => setSelectedType(option.id)}
            />
          ))}
        </View>

        {selectedType && (
          <Animated.View entering={FadeInDown} style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <ThemedText style={styles.inputLabel}>Phone Number</ThemedText>
              <TextInput
                style={styles.input}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                placeholder="Enter phone number"
                keyboardType="phone-pad"
              />
            </View>
          </Animated.View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.main,
  },
  statusBarPadding: {
    height: Platform.OS === 'ios' ? 50 : StatusBar.currentHeight,
    backgroundColor: colors.primary.darkBrown,
  },
  header: {
    padding: 20,
    paddingTop: 10,
    backgroundColor: colors.primary.darkBrown,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  backButton: {
    padding: 8,
  },
  saveButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  optionCard: {
    width: '48%',
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  selectedOption: {
    backgroundColor: `${colors.primary.brown}15`,
    borderWidth: 2,
    borderColor: colors.primary.brown,
  },
  optionIcon: {
    width: 80,
    height: 50,
    marginBottom: 12,
  },
  optionText: {
    fontSize: 14,
    color: colors.text.primary,
    textAlign: 'center',
  },
  selectedOptionText: {
    color: colors.primary.brown,
    fontWeight: '600',
  },
  formContainer: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 8,
  },
  input: {
    backgroundColor: `${colors.primary.brown}10`,
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: colors.text.primary,
  },
});
