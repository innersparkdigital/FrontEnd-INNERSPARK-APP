import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { router } from 'expo-router';
import colors from '@/constants/colors.json';
import Animated, { FadeInDown } from 'react-native-reanimated';

const PRIVACY_SECTIONS = [
  {
    icon: 'info',
    title: 'Information We Collect',
    content: 'We collect information that you provide directly to us, including personal information such as your name, email address, and phone number when you register for an account.'
  },
  {
    icon: 'security',
    title: 'How We Use Your Information',
    content: 'We use the information we collect to provide, maintain, and improve our services, communicate with you, and protect our users and their mental health data.'
  },
  {
    icon: 'share',
    title: 'Information Sharing',
    content: 'We do not share your personal information with third parties except as described in this privacy policy or with your explicit consent.'
  },
  {
    icon: 'lock',
    title: 'Data Security',
    content: 'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access or disclosure.'
  },
  {
    icon: 'update',
    title: 'Data Retention',
    content: 'We retain your information for as long as necessary to provide our services and comply with legal obligations.'
  }
];

export default function PrivacyPolicyScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <MaterialIcons name="arrow-back" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Privacy Policy</ThemedText>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.introSection}>
          <MaterialIcons name="privacy-tip" size={40} color={colors.primary.brown} />
          <ThemedText style={styles.introTitle}>Your Privacy Matters</ThemedText>
          <ThemedText style={styles.introText}>
            We are committed to protecting your privacy and ensuring the security of your personal information.
          </ThemedText>
        </View>

        <ThemedText style={styles.lastUpdated}>
          Last updated: {new Date().toLocaleDateString()}
        </ThemedText>

        {PRIVACY_SECTIONS.map((section, index) => (
          <Animated.View 
            key={index} 
            entering={FadeInDown.delay(index * 100)} 
            style={styles.section}
          >
            <View style={styles.sectionHeader}>
              <View style={styles.iconContainer}>
                <MaterialIcons name={section.icon} size={24} color={colors.primary.brown} />
              </View>
              <ThemedText style={styles.sectionTitle}>
                {section.title}
              </ThemedText>
            </View>
            <ThemedText style={styles.sectionContent}>
              {section.content}
            </ThemedText>
          </Animated.View>
        ))}

        <TouchableOpacity style={styles.contactButton}>
          <MaterialIcons name="email" size={20} color="#FFF" />
          <ThemedText style={styles.contactButtonText}>
            Contact Data Protection Officer
          </ThemedText>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  introSection: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  introTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginTop: 16,
    marginBottom: 8,
  },
  introText: {
    fontSize: 14,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  lastUpdated: {
    fontSize: 12,
    color: colors.text.secondary,
    marginBottom: 20,
  },
  section: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: `${colors.primary.brown}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
    flex: 1,
  },
  sectionContent: {
    fontSize: 14,
    lineHeight: 22,
    color: colors.text.secondary,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary.brown,
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
    marginBottom: 32,
  },
  contactButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});
