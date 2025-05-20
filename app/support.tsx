import React from 'react';
import { StyleSheet, View, TouchableOpacity, Linking, Platform, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { router } from 'expo-router';
import colors from '@/constants/colors.json';

const SUPPORT_PHONE = '+256700000000';
const SUPPORT_EMAIL = 'support@innerspark.com';

export default function SupportScreen() {
  const handleCall = () => {
    Linking.openURL(`tel:${SUPPORT_PHONE}`);
  };

  const handleEmail = () => {
    Linking.openURL(`mailto:${SUPPORT_EMAIL}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.supportCard}>
          <MaterialIcons name="support-agent" size={60} color={colors.primary.brown} />
          <ThemedText style={styles.cardTitle}>24/7 Customer Support</ThemedText>
          <ThemedText style={styles.cardSubtitle}>
            We're here to help you with any questions or concerns
          </ThemedText>
        </View>

        <View style={styles.contactOptions}>
          <TouchableOpacity style={styles.contactButton} onPress={handleCall}>
            <MaterialIcons name="phone" size={24} color="#FFF" />
            <ThemedText style={styles.buttonText}>Call Support</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactButton} onPress={handleEmail}>
            <MaterialIcons name="email" size={24} color="#FFF" />
            <ThemedText style={styles.buttonText}>Email Support</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.contactButton}
            onPress={() => router.push('/help')}
          >
            <MaterialIcons name="help-center" size={24} color="#FFF" />
            <ThemedText style={styles.buttonText}>Help Center</ThemedText>
          </TouchableOpacity>
        </View>

        <View style={styles.infoBox}>
          <ThemedText style={styles.infoTitle}>Support Hours</ThemedText>
          <ThemedText style={styles.infoText}>24 hours, 7 days a week</ThemedText>
          
          <ThemedText style={styles.infoTitle}>Phone</ThemedText>
          <ThemedText style={styles.infoText}>{SUPPORT_PHONE}</ThemedText>
          
          <ThemedText style={styles.infoTitle}>Email</ThemedText>
          <ThemedText style={styles.infoText}>{SUPPORT_EMAIL}</ThemedText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.main,
    paddingTop: Platform.OS === 'ios' ? 50 : StatusBar.currentHeight,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  supportCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginTop: 16,
    marginBottom: 8,
  },
  cardSubtitle: {
    fontSize: 14,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  contactOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  contactButton: {
    width: '48%',
    backgroundColor: colors.primary.brown,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  infoBox: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.secondary,
    marginTop: 16,
    marginBottom: 4,
  },
  infoText: {
    fontSize: 16,
    color: colors.text.primary,
    marginBottom: 12,
  },
});
