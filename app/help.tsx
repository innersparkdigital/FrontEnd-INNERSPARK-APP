import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView, TextInput, Platform, StatusBar } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { router } from 'expo-router';
import colors from '@/constants/colors.json';

const FAQ_DATA = [
  {
    question: 'What is InnerSpark?',
    answer: 'InnerSpark is a mental health platform that connects you with professional therapists and support groups.'
  },
  {
    question: 'How do I book a therapy session?',
    answer: 'Browse our therapist list, select your preferred therapist, and choose an available time slot that works for you.'
  },
  {
    question: 'Are my sessions confidential?',
    answer: 'Yes, all therapy sessions are completely confidential and follow strict privacy and security protocols.'
  },
  {
    question: 'What payment methods are accepted?',
    answer: 'We currently accept MTN Mobile Money and Airtel Money for easy and secure payments.'
  },
  {
    question: 'How do I join support groups?',
    answer: 'You can browse available support groups in the app and join ones that match your needs and interests.'
  },
  {
    question: 'Can I cancel my appointment?',
    answer: 'Yes, you can cancel appointments up to 24 hours before the scheduled time without any penalty.'
  }
];

export default function HelpScreen() {
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filteredFAQs = FAQ_DATA.filter(faq => 
    faq.question.toLowerCase().includes(search.toLowerCase()) ||
    faq.answer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <TextInput
          style={styles.searchInput}
          placeholder="Search help articles..."
          placeholderTextColor={colors.text.secondary}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.helpCard}>
          <MaterialIcons name="help-outline" size={32} color={colors.primary.brown} />
          <ThemedText style={styles.helpTitle}>How can we help you?</ThemedText>
          <ThemedText style={styles.helpSubtitle}>
            Browse our FAQ or contact support for assistance
          </ThemedText>
        </View>

        {filteredFAQs.map((faq, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.faqItem,
              expandedId === index && styles.expandedItem
            ]}
            onPress={() => setExpandedId(expandedId === index ? null : index)}
          >
            <View style={styles.faqHeader}>
              <ThemedText style={styles.question}>{faq.question}</ThemedText>
              <MaterialIcons
                name={expandedId === index ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                size={24}
                color={colors.text.secondary}
              />
            </View>
            {expandedId === index && (
              <ThemedText style={styles.answer}>{faq.answer}</ThemedText>
            )}
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={styles.supportButton}
          onPress={() => router.push('/support')}
        >
          <MaterialIcons name="headset-mic" size={24} color="#FFF" />
          <ThemedText style={styles.supportButtonText}>Contact Support</ThemedText>
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
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.text.primary,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  helpCard: {
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
  helpTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginTop: 12,
    marginBottom: 8,
  },
  helpSubtitle: {
    fontSize: 14,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  faqItem: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  expandedItem: {
    backgroundColor: `${colors.primary.brown}10`,
  },
  faqHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  question: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginRight: 16,
  },
  answer: {
    fontSize: 14,
    color: colors.text.secondary,
    marginTop: 12,
    lineHeight: 20,
  },
  supportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary.brown,
    padding: 16,
    borderRadius: 12,
    marginVertical: 24,
  },
  supportButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  }
});
