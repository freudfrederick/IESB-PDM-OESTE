import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import AppButton from '../../components/AppButton';
import { showAlert } from '../../services/alert';
import { pickImage, takePhoto } from '../../services/media';

const PHOTO_KEY = '@profile-photo';

export default function ProfileScreen() {
  const [photoUri, setPhotoUri] = useState(null);

  // Ao abrir a tela, relê a foto salva: fechar o app não perde a imagem
  useEffect(() => {
    async function loadPhoto() {
      try {
        const saved = await AsyncStorage.getItem(PHOTO_KEY);
        if (saved) setPhotoUri(saved);
      } catch (error) {
        console.warn('Não foi possível ler a foto salva.', error);
      }
    }
    loadPhoto();
  }, []);

  async function savePhoto(uri) {
    if (!uri) return;
    setPhotoUri(uri);
    try {
      await AsyncStorage.setItem(PHOTO_KEY, uri);
    } catch (error) {
      console.warn('Não foi possível salvar a foto.', error);
    }
  }

  async function handlePickImage() {
    try {
      await savePhoto(await pickImage());
    } catch (error) {
      showAlert('Não foi possível abrir a galeria', 'Tente novamente.');
    }
  }

  async function handleTakePhoto() {
    try {
      await savePhoto(await takePhoto());
    } catch (error) {
      showAlert('Não foi possível abrir a câmera', 'Este recurso funciona no aplicativo, não no navegador.');
    }
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={handlePickImage} accessibilityRole="button" accessibilityLabel="Trocar foto de perfil">
        {photoUri ? (
          <Image source={{ uri: photoUri }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, styles.placeholder]}>
            <Ionicons name="person" size={64} color="#9aa3c7" />
          </View>
        )}
      </Pressable>
      <Text style={styles.hint}>Toque na foto para escolher da galeria</Text>
      <View style={styles.actions}>
        <AppButton title="Tirar foto" variant="secondary" onPress={handleTakePhoto} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16, padding: 24, backgroundColor: '#f4f5f9' },
  // Sem width, height e borderRadius a imagem não aparece
  avatar: { width: 160, height: 160, borderRadius: 80 },
  placeholder: { backgroundColor: '#e7eaf6', alignItems: 'center', justifyContent: 'center' },
  hint: { color: '#6b7080', fontSize: 14 },
  actions: { alignSelf: 'stretch' },
});
