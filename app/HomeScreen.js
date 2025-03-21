import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Dimensions, Image, Linking, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { MaterialIcons } from '@expo/vector-icons';
import colors from '@/constants/colors.json';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const quickActions = [
    {
      id: 1,
      title: 'Find Therapist',
      icon: 'person-search',
      screen: 'TherapistList',
      color: colors.services.blue
    },
    {
      id: 2,
      title: 'Book Session',
      icon: 'event-available',
      screen: 'BookAppointment',
      color: colors.services.green
    },
    {
      id: 3,
      title: 'Join Group',
      icon: 'groups',
      screen: 'SupportGroup',
      color: colors.services.orange
    },
    {
      id: 4,
      title: 'My Journey',
      icon: 'timeline',
      screen: 'Experience',
      color: colors.services.pink
    }
  ];

  const upcomingSessions = [
    {
      id: 1,
      therapist: 'Dr. Sarah Johnson',
      type: 'Individual Session',
      time: '2:00 PM Today',
      duration: '50 mins',
      meetingUrl: 'https://meet.google.com/abc-defg-hij'
    },
    {
      id: 2,
      therapist: 'Support Group',
      type: 'Group Session',
      time: '4:00 PM Tomorrow',
      duration: '60 mins',
      meetingUrl: 'https://meet.google.com/xyz-uvwx-yz'
    }
  ];

  const handleJoinMeeting = async (meetingUrl) => {
    // For iOS, try to open in Google Meet app first, fallback to Safari
    if (Platform.OS === 'ios') {
      try {
        // Try opening in Google Meet app
        await Linking.openURL(meetingUrl.replace('https://', 'googlemeet://'));
      } catch (error) {
        // If app not installed, open in Safari
        await Linking.openURL(meetingUrl);
      }
    } else {
      // For Android, use the standard URL which will open in app if installed
      await Linking.openURL(meetingUrl);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Welcome Header */}
      <LinearGradient
        colors={[colors.primary.darkBrown, colors.primary.brown]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.welcomeContainer}>
          <ThemedText style={styles.welcomeText}>Welcome back,</ThemedText>
          <ThemedText style={styles.userName}>Sarah</ThemedText>
          <ThemedText style={styles.subtitle}>How are you feeling today?</ThemedText>
        </View>
      </LinearGradient>

      {/* Mood Tracker */}
      <Animated.View entering={FadeInDown.delay(300).springify()} style={styles.moodContainer}>
        <View style={styles.moodRow}>
          {['😊', '😌', '😐', '😔', '😢'].map((emoji, index) => (
            <TouchableOpacity key={index} style={styles.moodButton}>
              <ThemedText style={styles.moodEmoji}>{emoji}</ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Quick Actions</ThemedText>
        <View style={styles.actionGrid}>
          {quickActions.map((action, index) => (
            <Animated.View 
              key={action.id}
              entering={FadeInRight.delay(index * 100).springify()}
              style={[styles.actionCard, { backgroundColor: `${action.color}15` }]}
            >
              <TouchableOpacity style={styles.actionButton}>
                <View style={[styles.iconContainer, { backgroundColor: `${action.color}30` }]}>
                  <MaterialIcons name={action.icon} size={24} color={action.color} />
                </View>
                <ThemedText style={styles.actionText}>{action.title}</ThemedText>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>
      </View>

      {/* Upcoming Sessions */}
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Upcoming Sessions</ThemedText>
        {upcomingSessions.map((session, index) => (
          <Animated.View 
            key={session.id}
            entering={FadeInDown.delay(index * 200).springify()}
            style={styles.sessionCard}
          >
            <View style={styles.sessionInfo}>
              <ThemedText style={styles.therapistName}>{session.therapist}</ThemedText>
              <ThemedText style={styles.sessionType}>{session.type}</ThemedText>
              <View style={styles.timeContainer}>
                <MaterialIcons name="access-time" size={16} color={colors.services.blue} />
                <ThemedText style={styles.sessionTime}>{session.time}</ThemedText>
                <ThemedText style={styles.sessionDuration}>{session.duration}</ThemedText>
              </View>
            </View>
            <TouchableOpacity 
              style={styles.joinButton}
              onPress={() => handleJoinMeeting(session.meetingUrl)}
            >
              <MaterialIcons name="video-camera-front" size={20} color="#FFFFFF" style={styles.joinIcon} />
              <ThemedText style={styles.joinButtonText}>Join</ThemedText>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  welcomeContainer: {
    marginTop: 20,
  },
  welcomeText: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  userName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
    marginTop: 8,
  },
  moodContainer: {
    marginTop: -25,
    marginHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  moodRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  moodButton: {
    padding: 10,
  },
  moodEmoji: {
    fontSize: 28,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: colors.text.primary,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: (width - 50) / 2,
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
  },
  actionButton: {
    padding: 15,
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  sessionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  sessionInfo: {
    flex: 1,
  },
  therapistName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  sessionType: {
    fontSize: 14,
    color: colors.text.secondary,
    marginTop: 4,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  sessionTime: {
    fontSize: 14,
    color: colors.services.blue,
    marginLeft: 4,
  },
  sessionDuration: {
    fontSize: 14,
    color: colors.text.secondary,
    marginLeft: 8,
  },
  joinButton: {
    backgroundColor: colors.services.blue,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  joinIcon: {
    marginRight: 6,
  },
  joinButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});