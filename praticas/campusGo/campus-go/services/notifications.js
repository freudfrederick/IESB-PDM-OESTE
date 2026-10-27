import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Define como a notificação aparece quando o app está aberto
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// Canal (Android) + pedido de permissão. Devolve true quando pode notificar.
export async function setupNotifications() {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'Lembretes do CampusGo',
      importance: Notifications.AndroidImportance.DEFAULT,
    });
  }

  const current = await Notifications.getPermissionsAsync();
  let status = current.status;
  if (status !== 'granted') {
    const requested = await Notifications.requestPermissionsAsync();
    status = requested.status;
  }
  return status === 'granted';
}

// Notificação LOCAL (agendada no próprio aparelho, sem push)
export async function scheduleReminder(title, seconds) {
  const allowed = await setupNotifications();
  if (!allowed) return null;

  return Notifications.scheduleNotificationAsync({
    content: { title: 'CampusGo', body: title },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds,
      channelId: 'default',
    },
  });
}
