import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export const configurePushNotifications = async () => {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    return false;
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
    });
  }

  return true;
};

export const scheduleGroupSessionNotification = async (
  groupName: string,
  sessionDate: Date,
  meetingUrl: string
) => {
  const trigger = new Date(sessionDate);
  trigger.setMinutes(trigger.getMinutes() - 15); // Notify 15 minutes before

  await Notifications.scheduleNotificationAsync({
    content: {
      title: `${groupName} Session Starting Soon`,
      body: 'Your support group session starts in 15 minutes',
      data: { meetingUrl },
    },
    trigger,
  });
};

export const scheduleSupportReminder = async (
  supportType: string,
  reminderDate: Date
) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Support Check-in',
      body: `Time for your ${supportType} check-in. How are you feeling today?`,
    },
    trigger: reminderDate,
  });
};

export const sendImmediateNotification = async (
  title: string,
  body: string,
  data?: object
) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      data,
    },
    trigger: null, // null means send immediately
  });
};