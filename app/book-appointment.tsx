import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { MaterialIcons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { router, useLocalSearchParams } from 'expo-router';
import colors from '@/constants/colors.json';

const { width } = Dimensions.get('window');

const timeSlots = [
  "9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", 
  "3:00 PM", "4:00 PM", "5:00 PM"
];

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function BookAppointmentScreen() {
  const params = useLocalSearchParams();
  const therapist = params.therapist ? JSON.parse(params.therapist as string) : null;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const generateDateButtons = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const handleBooking = () => {
    if (!selectedTime) {
      alert('Please select a time slot');
      return;
    }
    router.push({
      pathname: '/payment',
      params: {
        therapist: JSON.stringify(therapist),
        appointmentDate: selectedDate.toISOString(),
        appointmentTime: selectedTime
      }
    });
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
        <ThemedText style={styles.headerTitle}>Book Appointment</ThemedText>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Therapist Info Card */}
        <Animated.View 
          entering={FadeInDown.delay(200).springify()}
          style={styles.therapistCard}
        >
          <View style={styles.avatarContainer}>
            <MaterialIcons name="person" size={32} color={colors.primary.brown} />
          </View>
          <View style={styles.therapistInfo}>
            <ThemedText style={styles.therapistName}>{therapist?.name || 'Select Therapist'}</ThemedText>
            <ThemedText style={styles.therapistSpecialty}>{therapist?.specialty || 'Click to browse therapists'}</ThemedText>
          </View>
        </Animated.View>

        {/* Date Selection */}
        <Animated.View 
          entering={FadeInDown.delay(300).springify()}
          style={styles.sectionContainer}
        >
          <ThemedText style={styles.sectionTitle}>Select Date</ThemedText>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.dateScroller}
          >
            {generateDateButtons().map((date, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.dateButton,
                  date.toDateString() === selectedDate.toDateString() && styles.selectedDate
                ]}
                onPress={() => setSelectedDate(date)}
              >
                <ThemedText style={[
                  styles.dayText,
                  date.toDateString() === selectedDate.toDateString() && styles.selectedDateText
                ]}>
                  {days[date.getDay()]}
                </ThemedText>
                <ThemedText style={[
                  styles.dateText,
                  date.toDateString() === selectedDate.toDateString() && styles.selectedDateText
                ]}>
                  {date.getDate()}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Animated.View>

        {/* Time Selection */}
        <Animated.View 
          entering={FadeInDown.delay(400).springify()}
          style={styles.sectionContainer}
        >
          <ThemedText style={styles.sectionTitle}>Select Time</ThemedText>
          <View style={styles.timeGrid}>
            {timeSlots.map((time, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.timeButton,
                  selectedTime === time && styles.selectedTime
                ]}
                onPress={() => setSelectedTime(time)}
              >
                <ThemedText style={[
                  styles.timeText,
                  selectedTime === time && styles.selectedTimeText
                ]}>
                  {time}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        {/* Session Info */}
        <Animated.View 
          entering={FadeInDown.delay(500).springify()}
          style={styles.sessionInfoCard}
        >
          <View style={styles.sessionInfoRow}>
            <MaterialIcons name="schedule" size={20} color={colors.text.secondary} />
            <ThemedText style={styles.sessionInfoText}>50 minutes session</ThemedText>
          </View>
          <View style={styles.sessionInfoRow}>
            <MaterialIcons name="videocam" size={20} color={colors.text.secondary} />
            <ThemedText style={styles.sessionInfoText}>Video consultation</ThemedText>
          </View>
          <View style={styles.sessionInfoRow}>
            <MaterialIcons name="paid" size={20} color={colors.text.secondary} />
            <ThemedText style={styles.sessionInfoText}>$100 per session</ThemedText>
          </View>
        </Animated.View>
      </ScrollView>

      {/* Bottom Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity 
          style={styles.bookButton} 
          onPress={handleBooking}
        >
          <ThemedText style={styles.bookButtonText}>Proceed to Payment</ThemedText>
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
    paddingTop: 10,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  therapistCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: `${colors.primary.brown}15`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  therapistInfo: {
    marginLeft: 15,
  },
  therapistName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  therapistSpecialty: {
    fontSize: 14,
    color: colors.text.secondary,
    marginTop: 4,
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
  dateScroller: {
    flexDirection: 'row',
    marginBottom: 10,
    paddingVertical: 10,
  },
  dateButton: {
    width: 65,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  selectedDate: {
    backgroundColor: colors.primary.brown,
  },
  dayText: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 5,
  },
  dateText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  selectedDateText: {
    color: '#FFFFFF',
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  timeButton: {
    width: (width - 60) / 3,
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  selectedTime: {
    backgroundColor: colors.primary.brown,
  },
  timeText: {
    fontSize: 14,
    color: colors.text.primary,
  },
  selectedTimeText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  sessionInfoCard: {
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
  sessionInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  sessionInfoText: {
    marginLeft: 10,
    fontSize: 16,
    color: colors.text.secondary,
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
  bookButton: {
    backgroundColor: colors.primary.brown,
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});