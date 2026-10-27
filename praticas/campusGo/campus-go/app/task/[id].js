import { router, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import AppButton from '../../components/AppButton';

export default function TaskDetail() {
  // O [id] do nome do arquivo chega pela URL: /task/42 -> id = "42"
  const { id } = useLocalSearchParams();

  function goBack() {
    // Se a tela foi aberta direto pela URL, não há histórico para voltar
    if (router.canGoBack()) router.back();
    else router.replace('/tasks');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tarefa número {id}</Text>
      <AppButton title="Voltar" onPress={goBack} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, gap: 20, justifyContent: 'center', backgroundColor: '#f4f5f9' },
  title: { fontSize: 24, fontWeight: '700', color: '#1c1e2b', textAlign: 'center' },
});
