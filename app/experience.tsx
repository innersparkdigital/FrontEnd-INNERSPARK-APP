import React from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
import { MaterialIcons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { router } from 'expo-router';
import colors from '@/constants/colors.json';

const { width } = Dimensions.get('window');

type Icon = keyof typeof MaterialIcons.glyphMap;

const JourneySection = () => (
  <TouchableOpacity
    style={styles.journeyCard}
    onPress={() => router.push('/weekly-goals')}
  >
    <MaterialIcons name="flag" size={24} color={colors.primary.brown} />
    <View style={styles.journeyContent}>
      <ThemedText style={styles.journeyTitle}>Weekly Goals</ThemedText>
      <ThemedText style={styles.journeySubtitle}>
        Set and track your weekly mental health goals
      </ThemedText>
    </View>
    <MaterialIcons name="chevron-right" size={24} color={colors.text.secondary} />
  </TouchableOpacity>
);

export default function ExperienceScreen() {
  const journeyMilestones = [
    { id: 1, title: 'First Session', date: 'March 15', icon: 'stars' as Icon },
    { id: 2, title: 'Group Therapy', date: 'March 18', icon: 'groups' as Icon },
    { id: 3, title: 'Weekly Goal', date: 'March 20', icon: 'emoji-events' as Icon },
  ];

  const moodHistory = [
    { day: 'Mon', mood: '😊' },
    { day: 'Tue', mood: '😌' },
    { day: 'Wed', mood: '😐' },
    { day: 'Thu', mood: '😊' },
    { day: 'Fri', mood: '😌' },
    { day: 'Sat', mood: '😊' },
    { day: 'Sun', mood: '😊' },
  ];

  const stats = [
    { title: 'Sessions', value: '8', icon: 'video-camera-front' as Icon },
    { title: 'Hours', value: '12', icon: 'schedule' as Icon },
    { title: 'Goals Met', value: '5', icon: 'check-circle' as Icon },
  ];

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
        <ThemedText style={styles.headerTitle}>Your Journey</ThemedText>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Stats Overview */}
        <Animated.View 
          entering={FadeInDown.delay(200).springify()}
          style={styles.statsContainer}
        >
          {stats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <MaterialIcons name={stat.icon} size={24} color={colors.primary.brown} />
              <ThemedText style={styles.statValue}>{stat.value}</ThemedText>
              <ThemedText style={styles.statTitle}>{stat.title}</ThemedText>
            </View>
          ))}
        </Animated.View>

        {/* Mood History */}
        <Animated.View
          entering={FadeInDown.delay(300).springify()}
          style={styles.sectionContainer}
        >
          <ThemedText style={styles.sectionTitle}>Mood History</ThemedText>
          <View style={styles.moodHistoryContainer}>
            {moodHistory.map((day, index) => (
              <View key={index} style={styles.moodDay}>
                <ThemedText style={styles.moodEmoji}>{day.mood}</ThemedText>
                <ThemedText style={styles.dayText}>{day.day}</ThemedText>
              </View>
            ))}
          </View>
        </Animated.View>

        {/* Journey Timeline */}
        <Animated.View
          entering={FadeInDown.delay(400).springify()}
          style={styles.sectionContainer}
        >
          <ThemedText style={styles.sectionTitle}>Recent Milestones</ThemedText>
          {journeyMilestones.map((milestone, index) => (
            <Animated.View
              key={milestone.id}
              entering={FadeInRight.delay(index * 100).springify()}
              style={styles.milestoneCard}
            >
              <View style={styles.milestoneIcon}>
                <MaterialIcons name={milestone.icon} size={24} color={colors.primary.brown} />
              </View>
              <View style={styles.milestoneInfo}>
                <ThemedText style={styles.milestoneTitle}>{milestone.title}</ThemedText>
                <ThemedText style={styles.milestoneDate}>{milestone.date}</ThemedText>
              </View>
              <MaterialIcons name="chevron-right" size={24} color={colors.text.secondary} />
            </Animated.View>
          ))}
        </Animated.View>

        {/* Progress Section */}
        <Animated.View
          entering={FadeInDown.delay(500).springify()}
          style={[styles.sectionContainer, styles.progressContainer]}
        >
          <ThemedText style={styles.sectionTitle}>Your Progress</ThemedText>
          <View style={styles.progressCard}>
            <View style={styles.progressHeader}>
              <ThemedText style={styles.progressTitle}>Weekly Goal</ThemedText>
              <ThemedText style={styles.progressValue}>3/4 Sessions</ThemedText>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '75%' }]} />
            </View>
            <ThemedText style={styles.progressText}>
              You're almost there! One more session to reach your weekly goal.
            </ThemedText>
          </View>
        </Animated.View>

        {/* Journey Section */}
        <JourneySection />
      </ScrollView>
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
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    marginHorizontal: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginVertical: 5,
  },
  statTitle: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  sectionContainer: {
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: colors.text.primary,
  },
  moodHistoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  moodDay: {
    alignItems: 'center',
  },
  moodEmoji: {
    fontSize: 24,
    marginBottom: 5,
  },
  dayText: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  milestoneCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${colors.primary.brown}10`,
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
  },
  milestoneIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: `${colors.primary.brown}20`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  milestoneInfo: {
    flex: 1,
    marginLeft: 15,
  },
  milestoneTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
  },
  milestoneDate: {
    fontSize: 14,
    color: colors.text.secondary,
    marginTop: 2,
  },
  progressContainer: {
    marginBottom: 30,
  },
  progressCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
  },
  progressValue: {
    fontSize: 16,
    color: colors.services.blue,
    fontWeight: '600',
  },
  progressBar: {
    height: 8,
    backgroundColor: `${colors.services.blue}20`,
    borderRadius: 4,
    marginBottom: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.services.blue,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  journeyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  journeyContent: {
    flex: 1,
    marginHorizontal: 12,
  },
  journeyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 4,
  },
  journeySubtitle: {
    fontSize: 14,
    color: colors.text.secondary,
  }
});