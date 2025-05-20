import React from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView, Image, Linking, Platform, StatusBar } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { router } from 'expo-router';
import colors from '@/constants/colors.json';

const APP_VERSION = '1.0.0';
const COMPANY_INFO = {
  website: 'https://innerspark.com',
  email: 'contact@innerspark.com',
  phone: '+256 700 000 000'
};

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.logoSection}>
          <Image
            source={require('@/assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <ThemedText style={styles.version}>Version {APP_VERSION}</ThemedText>
        </View>

        <View style={styles.card}>
          <ThemedText style={styles.title}>About InnerSpark</ThemedText>
          <ThemedText style={styles.text}>
            InnerSpark is dedicated to making mental health support accessible to everyone in Uganda.
            Our platform connects you with professional therapists and support groups to help you
            on your journey to better mental well-being.
          </ThemedText>
        </View>

        <View style={styles.card}>
          <ThemedText style={styles.title}>Our Mission</ThemedText>
          <ThemedText style={styles.text}>
            To break down barriers to mental health care and create a supportive community
            where everyone can thrive and find the help they need.
          </ThemedText>
        </View>

        <View style={styles.card}>
          <ThemedText style={styles.title}>Contact Us</ThemedText>
          <TouchableOpacity 
            style={styles.contactItem}
            onPress={() => Linking.openURL(`mailto:${COMPANY_INFO.email}`)}
          >
            <MaterialIcons name="email" size={20} color={colors.primary.brown} />
            <ThemedText style={styles.contactText}>{COMPANY_INFO.email}</ThemedText>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.contactItem}
            onPress={() => Linking.openURL(`tel:${COMPANY_INFO.phone}`)}
          >
            <MaterialIcons name="phone" size={20} color={colors.primary.brown} />
            <ThemedText style={styles.contactText}>{COMPANY_INFO.phone}</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.contactItem}
            onPress={() => Linking.openURL(COMPANY_INFO.website)}
          >
            <MaterialIcons name="language" size={20} color={colors.primary.brown} />
            <ThemedText style={styles.contactText}>{COMPANY_INFO.website}</ThemedText>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.privacyButton}
          onPress={() => router.push('/privacy-policy')}
        >
          <ThemedText style={styles.privacyButtonText}>Privacy Policy</ThemedText>
        </TouchableOpacity>
      </ScrollView>
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
  logoSection: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 16,
  },
  version: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 12,
  },
  text: {
    fontSize: 14,
    lineHeight: 22,
    color: colors.text.secondary,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: `${colors.text.secondary}20`,
  },
  contactText: {
    fontSize: 16,
    color: colors.text.primary,
    marginLeft: 12,
  },
  privacyButton: {
    backgroundColor: `${colors.primary.brown}10`,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 32,
  },
  privacyButtonText: {
    fontSize: 16,
    color: colors.primary.brown,
    fontWeight: '600',
  }
});
