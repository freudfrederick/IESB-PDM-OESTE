import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import AppButton from '../components/AppButton';

// Tela do modal (presentation: 'modal' no layout raiz)
export default function NewTask() {
  function close() {
    if (router.canGoBack()) router.back();
    else router.replace('/tasks');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nova tarefa</Text>
      <Text style={styles.text}>Aqui ficará o formulário de nova tarefa.</Text>
      <AppButton title="Fechar" onPress={close} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, gap: 16, justifyContent: 'center', backgroundColor: '#f4f5f9' },
  title: { fontSize: 24, fontWeight: '700', color: '#1c1e2b', textAlign: 'center' },
  text: { fontSize: 16, color: '#6b7080', textAlign: 'center' },
});
