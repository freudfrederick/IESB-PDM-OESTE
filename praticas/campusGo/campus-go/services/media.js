import * as ImagePicker from 'expo-image-picker';
import { Linking, Platform } from 'react-native';
import { showAlert } from './alert';

const IMAGE_OPTIONS = {
  mediaTypes: ['images'],
  allowsEditing: true,
  aspect: [1, 1],
  quality: 0.7,
};

// No navegador a imagem vem como blob: (some ao recarregar a página). Aqui ela vira data URI.
// No celular a URI já é um arquivo (file://) e segue como está.
async function toPersistentUri(uri) {
  if (Platform.OS !== 'web' || !uri.startsWith('blob:')) return uri;
  const blob = await (await fetch(uri)).blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

// Galeria: devolve a URI da imagem escolhida ou null se a pessoa cancelar
export async function pickImage() {
  const result = await ImagePicker.launchImageLibraryAsync(IMAGE_OPTIONS);
  if (result.canceled) return null;
  return toPersistentUri(result.assets[0].uri);
}

// Câmera: pede permissão ANTES de abrir. Se negar, oferece abrir os ajustes do sistema.
export async function takePhoto() {
  const { status } = await ImagePicker.requestCameraPermissionsAsync();

  if (status !== 'granted') {
    showAlert('Permissão da câmera negada', 'Para tirar a foto, libere a câmera nos ajustes do aparelho.', [
      { text: 'Agora não', style: 'cancel' },
      { text: 'Abrir ajustes', onPress: () => Linking.openSettings() },
    ]);
    return null;
  }

  const result = await ImagePicker.launchCameraAsync(IMAGE_OPTIONS);
  if (result.canceled) return null;
  return toPersistentUri(result.assets[0].uri);
}
