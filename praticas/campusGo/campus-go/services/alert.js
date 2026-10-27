import { Alert, Platform } from 'react-native';

// Alert.alert não faz nada no navegador (react-native-web). No celular usa o Alert nativo;
// na web usa window.alert/window.confirm para a mensagem continuar aparecendo.
export function showAlert(title, message, buttons) {
  if (Platform.OS !== 'web') {
    Alert.alert(title, message, buttons);
    return;
  }

  const text = message ? `${title}\n\n${message}` : title;
  if (buttons && buttons.length > 1) {
    const action = buttons.find((button) => button.style !== 'cancel');
    if (window.confirm(text) && action && action.onPress) action.onPress();
    return;
  }

  window.alert(text);
  if (buttons && buttons[0] && buttons[0].onPress) buttons[0].onPress();
}
