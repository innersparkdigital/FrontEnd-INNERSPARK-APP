import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView, RefreshControl, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, interpolate, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { ThemedText } from '@/components/ThemedText';
import { MaterialIcons } from '@expo/vector-icons';
import colors from '@/constants/colors.json';
import { router } from 'expo-router';

export default function NotificationsScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [expandedId, setExpandedId] = useState(null);

  const notifications = [
    {
      id: 1,
      type: 'appointment',
      title: 'Upcoming Session',
      message: 'Your counseling session starts in 1 hour',
      time: '1 hour ago',
      read: false,
      details: 'Session with Dr. Sarah Johnson will begin at 2:00 PM. Please ensure you have a stable internet connection.',
      actions: [
        { label: 'Join Session', icon: 'video-camera-front', route: '/session' },
        { label: 'Reschedule', icon: 'schedule', route: '/reschedule' },
      ]
    },
    {
      id: 2,
      type: 'group',
      title: 'New Group Message',
      message: 'New message in Support Group #1',
      time: '2 hours ago',
      read: true,
      details: 'You have a new message in Support Group #1. Check it out to stay updated with the latest discussions.',
      actions: [
        { label: 'View Message', icon: 'message', route: '/group-message' },
        { label: 'Mute Notifications', icon: 'notifications-off', route: '/mute-notifications' },
      ]
    },
    {
      id: 3,
      type: 'reminder',
      title: 'Wellness Check',
      message: 'Time for your daily wellness check-in',
      time: '1 day ago',
      read: false,
      details: 'It\'s time for your daily wellness check-in. Please take a moment to complete it.',
      actions: [
        { label: 'Complete Check-in', icon: 'check-circle', route: '/wellness-check' },
        { label: 'Snooze', icon: 'snooze', route: '/snooze' },
      ]
    },
  ];

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'appointment', label: 'Appointments' },
    { id: 'group', label: 'Groups' },
    { id: 'reminder', label: 'Reminders' },
  ];

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  }, []);

  const getIconName = (type) => {
    switch (type) {
      case 'appointment': return 'event';
      case 'group': return 'group';
      case 'reminder': return 'notifications';
      default: return 'notifications';
    }
  };

  const filteredNotifications = activeFilter === 'all'
    ? notifications
    : notifications.filter(n => n.type === activeFilter);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.primary.brown, colors.primary.cream]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <ThemedText style={styles.headerTitle}>Notifications</ThemedText>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filtersContainer}
        >
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.id}
              style={[
                styles.filterChip,
                activeFilter === filter.id && styles.activeFilterChip
              ]}
              onPress={() => setActiveFilter(filter.id)}
            >
              <ThemedText style={[
                styles.filterText,
                activeFilter === filter.id && styles.activeFilterText
              ]}>
                {filter.label}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </LinearGradient>

      <ScrollView
        style={styles.notificationsList}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {filteredNotifications.map((notification, index) => (
          <Animated.View
            key={notification.id}
            entering={FadeInDown.delay(index * 100)}
          >
            <Pressable 
              style={[styles.notificationCard, !notification.read && styles.unreadCard]}
              onPress={() => toggleExpand(notification.id)}
            >
              <View style={styles.notificationHeader}>
                <View style={[
                  styles.iconContainer,
                  { backgroundColor: `${colors.services[notification.type === 'appointment' ? 'blue' : notification.type === 'group' ? 'green' : 'orange']}15` }
                ]}>
                  <MaterialIcons
                    name={getIconName(notification.type)}
                    size={24}
                    color={colors.services[notification.type === 'appointment' ? 'blue' : notification.type === 'group' ? 'green' : 'orange']}
                  />
                </View>
                <View style={styles.notificationContent}>
                  <ThemedText style={styles.notificationTitle}>{notification.title}</ThemedText>
                  <ThemedText style={styles.notificationMessage}>{notification.message}</ThemedText>
                  <ThemedText style={styles.notificationTime}>{notification.time}</ThemedText>
                </View>
                {!notification.read && <View style={styles.unreadDot} />}
                <MaterialIcons 
                  name={expandedId === notification.id ? 'expand-less' : 'expand-more'} 
                  size={24} 
                  color={colors.text.secondary} 
                />
              </View>

              {expandedId === notification.id && (
                <Animated.View 
                  entering={FadeInDown} 
                  style={styles.expandedContent}
                >
                  <ThemedText style={styles.detailsText}>
                    {notification.details}
                  </ThemedText>
                  <View style={styles.actionsContainer}>
                    {notification.actions.map((action, idx) => (
                      <TouchableOpacity
                        key={idx}
                        style={styles.actionButton}
                        onPress={() => router.push(action.route)}
                      >
                        <MaterialIcons name={action.icon} size={20} color={colors.primary.brown} />
                        <ThemedText style={styles.actionButtonText}>{action.label}</ThemedText>
                      </TouchableOpacity>
                    ))}
                  </View>
                </Animated.View>
              )}
            </Pressable>
          </Animated.View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.main,
  },
  header: {
    padding: 20,
    paddingTop: 60,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  filtersContainer: {
    flexDirection: 'row',
    paddingBottom: 10,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginRight: 8,
  },
  activeFilterChip: {
    backgroundColor: '#fff',
  },
  filterText: {
    color: '#fff',
    fontSize: 14,
  },
  activeFilterText: {
    color: colors.primary.brown,
    fontWeight: '600',
  },
  notificationsList: {
    flex: 1,
    padding: 20,
  },
  notificationCard: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  unreadCard: {
    backgroundColor: `${colors.primary.cream}10`,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
  },
  notificationMessage: {
    fontSize: 14,
    color: colors.text.secondary,
    marginTop: 4,
  },
  notificationTime: {
    fontSize: 12,
    color: colors.text.secondary,
    marginTop: 4,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.services.orange,
    marginLeft: 8,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  expandedContent: {
    paddingTop: 16,
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
  detailsText: {
    fontSize: 14,
    color: colors.text.secondary,
    lineHeight: 20,
  },
  actionsContainer: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: `${colors.primary.brown}15`,
    borderRadius: 8,
    flex: 1,
    justifyContent: 'center',
  },
  actionButtonText: {
    marginLeft: 8,
    fontSize: 14,
    color: colors.primary.brown,
    fontWeight: '600',
  },
});
