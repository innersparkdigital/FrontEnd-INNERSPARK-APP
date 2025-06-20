import React from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
import { MaterialIcons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import colors from '@/constants/colors.json';

const { width } = Dimensions.get('window');

const ExperienceScreen = ({ navigation }) => {
  const journeyMilestones = [
    { id: 1, title: 'First Session', date: 'March 15', icon: 'stars' },
    { id: 2, title: 'Group Therapy', date: 'March 18', icon: 'groups' },
    { id: 3, title: 'Weekly Goal', date: 'March 20', icon: 'emoji-events' },
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
    { title: 'Sessions', value: '8', icon: 'video-camera-front' },
    { title: 'Hours', value: '12', icon: 'schedule' },
    { title: 'Goals Met', value: '5', icon: 'check-circle' },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.primary.darkBrown, colors.primary.brown]}
        style={styles.header}
      >
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
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
      </ScrollView>
    </View>
  );
};

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
    marginTop: -40,
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    width: (width - 60) / 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
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
    marginBottom: 25,
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
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  moodDay: {
    alignItems: 'center',
    paddingVertical: 0,
  },
  moodEmoji: {
    fontSize: 24,
    marginBottom: 5,
    paddingVertical: 20,
  },
  dayText: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  milestoneCard: {
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
  milestoneIcon: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: `${colors.primary.brown}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  milestoneInfo: {
    flex: 1,
  },
  milestoneTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 4,
  },
  milestoneDate: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  progressContainer: {
    marginBottom: 40,
  },
  progressCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
  },
  progressValue: {
    fontSize: 14,
    color: colors.primary.brown,
    fontWeight: '600',
  },
  progressBar: {
    height: 8,
    backgroundColor: `${colors.primary.brown}15`,
    borderRadius: 4,
    marginBottom: 15,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary.brown,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: colors.text.secondary,
    lineHeight: 20,
  },
});