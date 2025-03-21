import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Dimensions, Platform, Linking, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';
import { MaterialIcons } from '@expo/vector-icons';
import colors from '@/constants/colors.json';

const { width } = Dimensions.get('window');

interface SupportGroup {
  id: number;
  name: string;
  nextSession: string;
  participants: number;
  meetingUrl: string;
}

interface Service {
  id: number;
  title: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  route: string;
  color: string;
  description: string;
}

const supportGroups: SupportGroup[] = [
  {
    id: 1,
    name: 'Anxiety Support',
    nextSession: '2:00 PM Today',
    participants: 12,
    meetingUrl: 'https://meet.google.com/abc-defg-hij'
  },
  {
    id: 2,
    name: 'Depression Support',
    nextSession: '4:00 PM Today',
    participants: 8,
    meetingUrl: 'https://meet.google.com/xyz-uvwx-yz'
  },
  {
    id: 3,
    name: 'Stress Management',
    nextSession: '11:00 AM Tomorrow',
    participants: 15,
    meetingUrl: 'https://meet.google.com/pqr-stuv-wxy'
  }
];

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const [selectedGroup, setSelectedGroup] = useState<SupportGroup | null>(null);
  const [showGroupModal, setShowGroupModal] = useState(false);

  const services: Service[] = [
    {
      id: 1,
      title: 'Book Session',
      icon: 'event',
      route: 'book-appointment',
      color: colors.services.blue,
      description: 'Schedule your therapy session'
    },
    {
      id: 2,
      title: 'Join Groups',
      icon: 'groups',
      route: 'support-group',
      color: colors.services.green,
      description: 'Connect with support groups'
    },
    {
      id: 3,
      title: 'Find Therapist',
      icon: 'person-search',
      route: 'therapist-list',
      color: colors.services.orange,
      description: 'Browse our therapists'
    },
    {
      id: 4,
      title: 'Your Journey',
      icon: 'timeline',
      route: 'experience',
      color: colors.services.pink,
      description: 'Track your progress'
    },
  ];

  const handleServicePress = (route: string) => {
    router.push(route as any); // Using type assertion since we know our routes are valid
  };

  const handleJoinMeeting = async (meetingUrl: string) => {
    try {
      if (Platform.OS === 'ios') {
        try {
          // Try opening in Google Meet app first
          await Linking.openURL(meetingUrl.replace('https://', 'googlemeet://'));
        } catch {
          // Fallback to browser if app is not installed
          await Linking.openURL(meetingUrl);
        }
      } else {
        // For Android and other platforms, use the standard URL
        await Linking.openURL(meetingUrl);
      }
    } catch (error) {
      console.error('Error opening Google Meet:', error);
    }
  };

  const handleSelectGroup = (group: SupportGroup) => {
    setSelectedGroup(group); // Update selected group when a group is pressed
    setShowGroupModal(false); // Close the modal after selection
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background.main }]} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={[colors.primary.brown, colors.primary.cream]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <ThemedText style={styles.greeting}>Welcome back,</ThemedText>
          <ThemedText style={styles.userName}>John Doe</ThemedText>
        </View>
      </LinearGradient>

      <Animated.View entering={FadeInDown.delay(300)} style={styles.upcomingSession}>
        <TouchableOpacity onPress={() => setShowGroupModal(true)}>
          <LinearGradient
            colors={['rgba(74, 144, 226, 0.1)', 'rgba(99, 194, 165, 0.1)']}
            style={styles.sessionCard}
          >
            <View style={styles.sessionInfo}>
              <ThemedText style={styles.nextSession}>Next Group Session</ThemedText>
              <ThemedText style={styles.sessionTime}>{selectedGroup ? selectedGroup.nextSession : 'Select a group'}</ThemedText>
              <ThemedText style={styles.therapistName}>{selectedGroup ? selectedGroup.name : 'Choose your support group'}</ThemedText>
            </View>
            <TouchableOpacity 
              style={[styles.joinButton, !selectedGroup && styles.joinButtonDisabled]}
              onPress={() => selectedGroup && handleJoinMeeting(selectedGroup.meetingUrl)}
              disabled={!selectedGroup}
            >
              <ThemedText style={styles.joinButtonText}>{selectedGroup ? 'Join Now' : 'Select Group'}</ThemedText>
            </TouchableOpacity>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>

      <View style={styles.servicesSection}>
        <ThemedText style={styles.sectionTitle}>Our Services</ThemedText>
        <View style={styles.servicesGrid}>
          {services.map((service, index) => (
            <Animated.View 
              key={service.id}
              entering={FadeInDown.delay(400 + (index * 100))} 
              style={[styles.serviceCard, { backgroundColor: service.color + '15' }]}
            >
              <TouchableOpacity 
                style={styles.serviceButton}
                onPress={() => handleServicePress(service.route)}
              >
                <View style={[styles.iconContainer, { backgroundColor: service.color + '20' }]}>
                  <MaterialIcons name={service.icon} size={24} color={service.color} />
                </View>
                <ThemedText style={styles.serviceTitle}>{service.title}</ThemedText>
                <ThemedText style={styles.serviceDescription}>{service.description}</ThemedText>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>
      </View>

      {/* Group Selection Modal */}
      <Modal visible={showGroupModal} animationType="slide" onRequestClose={() => setShowGroupModal(false)}>
        <View style={styles.modalContent}>
          {supportGroups.map(group => (
            <TouchableOpacity key={group.id} onPress={() => handleSelectGroup(group)} style={styles.groupItem}>
              <ThemedText style={styles.groupName}>{group.name}</ThemedText>
              <ThemedText style={styles.groupTime}>{group.nextSession}</ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.main,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 24,
    color: colors.text.primary,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  upcomingSession: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  sessionCard: {
    borderRadius: 14,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  sessionInfo: {
    marginBottom: 16,
  },
  nextSession: {
    fontSize: 17,
    color: colors.text.secondary,
    marginBottom: 8,
  },
  sessionTime: {
    fontSize: 28,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 8,
  },
  therapistName: {
    fontSize: 17,
    color: colors.text.secondary,
  },
  joinButton: {
    backgroundColor: colors.services.green,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  joinButtonDisabled: {
    backgroundColor: '#E5E5EA',
  },
  joinButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  servicesSection: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: colors.text.primary,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  serviceCard: {
    width: (width - 60) / 2,
    borderRadius: 20,
    marginBottom: 20,
    overflow: 'hidden',
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  serviceButton: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: colors.text.primary,
    textAlign: 'center',
  },
  serviceDescription: {
    fontSize: 13,
    color: colors.text.secondary,
    lineHeight: 18,
    textAlign: 'center',
  },
  modalContent: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background.main,
  },
  groupItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.text.secondary,
  },
  groupName: {
    fontSize: 18,
    color: colors.text.primary,
  },
  groupTime: {
    fontSize: 14,
    color: colors.text.secondary,
  },
});
