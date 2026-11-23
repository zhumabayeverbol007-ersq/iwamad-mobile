import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import type { ChatMessage } from './chat';

const supported = Platform.OS !== 'web';

if (supported) {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
}

export async function askNotificationPermission(): Promise<boolean> {
  if (!supported) return false;

  const current = await Notifications.getPermissionsAsync();
  if (current.status === 'granted') {
    return true;
  }

  const requested = await Notifications.requestPermissionsAsync();
  console.log('Notification permission status:', requested.status);
  return requested.status === 'granted';
}

export async function notifyNewMessage(eventTitle: string, message: ChatMessage): Promise<void> {
  if (!supported) return;

  const hasPermission = await askNotificationPermission();
  if (!hasPermission) {
    console.warn('Notifications are not granted; skipping notification.');
    return;
  }

  await Notifications.scheduleNotificationAsync({
    content: {
      title: `New message: ${eventTitle}`,
      body: `${message.author}: ${message.text}`,
    },
    trigger: null,
  });
}