import React, { useState, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet, TextInput, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
import { MaterialIcons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { router } from 'expo-router';
import colors from '@/constants/colors.json';
import { configurePushNotifications, scheduleGroupSessionNotification, sendImmediateNotification } from '@/utils/notifications';

const mockMessages = [
  { id: 1, user: 'Sarah', message: 'Hi everyone! How are you all doing today?', time: '10:30 AM' },
  { id: 2, user: 'John', message: 'Doing great, thanks for asking!', time: '10:32 AM' },
  { id: 3, user: 'Emily', message: 'Happy to be here with this supportive group', time: '10:35 AM' }
];

export default function SupportGroupScreen() {
  const [message, setMessage] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  useEffect(() => {
    setupNotifications();
  }, []);

  const setupNotifications = async () => {
    const enabled = await configurePushNotifications();
    setNotificationsEnabled(enabled);
    if (!enabled) {
      Alert.alert(
        'Notifications Disabled',
        'Please enable notifications to receive updates about group sessions.',
        [{ text: 'OK' }]
      );
    }
  };

  const joinGroup = async () => {
    // Schedule notification for next session (example date)
    const nextSession = new Date();
    nextSession.setHours(nextSession.getHours() + 24); // Next session in 24 hours

    if (notificationsEnabled) {
      await scheduleGroupSessionNotification(
        'Anxiety Support Group',
        nextSession,
        'https://meeting-url.com'
      );
      
      // Send immediate welcome notification
      await sendImmediateNotification(
        'Welcome to Anxiety Support Group!',
        'You\'ll receive notifications about upcoming sessions and group updates.'
      );
    }
  };

  const sendMessage = async () => {
    if (message.trim()) {
      // Here you would typically send the message to your backend
      setMessage('');
      
      // Notify other group members (in a real app, this would be handled by the backend)
      if (notificationsEnabled) {
        await sendImmediateNotification(
          'New message in Anxiety Support Group',
          'Someone just shared their thoughts in the group'
        );
      }
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.primary.darkBrown, colors.primary.brown]}
        style={styles.header}
      >
        <View style={styles.headerTop}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <MaterialIcons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <ThemedText style={styles.headerTitle}>Anxiety Support Group</ThemedText>
          <TouchableOpacity style={styles.infoButton}>
            <MaterialIcons name="info-outline" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        <View style={styles.groupInfo}>
          <View style={styles.participantsAvatars}>
            {[1, 2, 3].map((_, index) => (
              <View key={index} style={[styles.avatar, { marginLeft: index * -10 }]}>
                <MaterialIcons name="person" size={20} color={colors.primary.brown} />
              </View>
            ))}
          </View>
          <ThemedText style={styles.participantsText}>12 participants</ThemedText>
          <TouchableOpacity 
            style={styles.joinButton}
            onPress={joinGroup}
          >
            <ThemedText style={styles.joinButtonText}>Join Group</ThemedText>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <ScrollView style={styles.messagesContainer} showsVerticalScrollIndicator={false}>
          {mockMessages.map((msg, index) => (
            <Animated.View
              key={msg.id}
              entering={FadeInRight.delay(index * 100).springify()}
              style={styles.messageContainer}
            >
              <View style={styles.messageHeader}>
                <ThemedText style={styles.userName}>{msg.user}</ThemedText>
                <ThemedText style={styles.messageTime}>{msg.time}</ThemedText>
              </View>
              <View style={styles.messageContent}>
                <ThemedText style={styles.messageText}>{msg.message}</ThemedText>
              </View>
            </Animated.View>
          ))}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type your message..."
            value={message}
            onChangeText={setMessage}
            multiline
            maxLength={500}
            placeholderTextColor={colors.text.secondary}
          />
          <TouchableOpacity 
            style={styles.sendButton}
            onPress={sendMessage}
          >
            <MaterialIcons name="send" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flex: 1,
    textAlign: 'center',
  },
  infoButton: {
    padding: 5,
  },
  groupInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  participantsAvatars: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.primary.cream,
  },
  participantsText: {
    color: '#FFFFFF',
    marginLeft: 15,
    fontSize: 14,
  },
  joinButton: {
    backgroundColor: colors.services.green,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginLeft: 'auto',
  },
  joinButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
    padding: 20,
  },
  messageContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
  },
  messageTime: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  messageContent: {
    backgroundColor: `${colors.primary.brown}10`,
    borderRadius: 12,
    padding: 12,
  },
  messageText: {
    fontSize: 14,
    color: colors.text.primary,
    lineHeight: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: `${colors.primary.brown}20`,
  },
  input: {
    flex: 1,
    backgroundColor: `${colors.primary.brown}10`,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    fontSize: 14,
    color: colors.text.primary,
    maxHeight: 100,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary.brown,
    justifyContent: 'center',
    alignItems: 'center',
  },
});