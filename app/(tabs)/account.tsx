import React, { useState, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView, Alert, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import colors from '@/constants/colors.json';

export default function AccountScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={[colors.primary.brown, colors.primary.cream]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerContainer}
      >
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <MaterialIcons name="person-circle" size={80} color="#fff" />
          </View>
          <View style={styles.profileInfo}>
            <ThemedText style={styles.userName}>John Doe</ThemedText>
            <ThemedText style={styles.userEmail}>johndoe@example.com</ThemedText>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <Animated.View entering={FadeInDown.delay(200)} style={styles.statsContainer}>
          <View style={styles.statCard}>
            <ThemedText style={styles.statNumber}>12</ThemedText>
            <ThemedText style={styles.statLabel}>Sessions</ThemedText>
          </View>
          <View style={styles.statCard}>
            <ThemedText style={styles.statNumber}>4</ThemedText>
            <ThemedText style={styles.statLabel}>Groups</ThemedText>
          </View>
          <View style={styles.statCard}>
            <ThemedText style={styles.statNumber}>8</ThemedText>
            <ThemedText style={styles.statLabel}>Resources</ThemedText>
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(400)} style={styles.quickActions}>
          <TouchableOpacity style={styles.actionTile}>
            <MaterialIcons name="edit" size={24} color={colors.primary.brown} />
            <ThemedText style={styles.actionText}>Edit Profile</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionTile}
            onPress={() => router.push('/subscription-plans')}
          >
            <MaterialIcons name="card-membership" size={24} color={colors.primary.brown} />
            <ThemedText style={styles.actionText}>Subscription</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionTile}>
            <MaterialIcons name="notifications" size={24} color={colors.primary.brown} />
            <ThemedText style={styles.actionText}>Notifications</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionTile}>
            <MaterialIcons name="help" size={24} color={colors.primary.brown} />
            <ThemedText style={styles.actionText}>Help</ThemedText>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(1000)}>
          <TouchableOpacity style={styles.logoutButton}>
            <MaterialIcons name="logout" size={20} color="#fff" />
            <ThemedText style={styles.logoutButtonText}>Log Out</ThemedText>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.main,
  },
  headerContainer: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
  },
  profileImageContainer: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  profileInfo: {
    marginLeft: 20,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  userEmail: {
    fontSize: 14,
    color: '#E8F6F3',
  },
  content: {
    padding: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -30,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 5,
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary.brown,
  },
  statLabel: {
    fontSize: 12,
    color: colors.text.secondary,
    marginTop: 4,
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  actionTile: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  actionText: {
    marginTop: 8,
    fontSize: 14,
    color: colors.text.primary,
  },
  logoutButton: {
    backgroundColor: '#DC3545',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
    marginBottom: 40,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});
