import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import AppButton from '../../components/AppButton';
import FadeIn from '../../components/FadeIn';
import { useNotices } from '../../hooks/useNotices';
import { api } from '../../services/api';
import { showAlert } from '../../services/alert';

export default function HomeScreen() {
  const { notices, isLoading, error, reload } = useNotices();

  // Bônus: o JSONPlaceholder responde com um id, mas não grava de verdade
  async function handleCreate() {
    try {
      const created = await api.create('posts', {
        title: 'Aviso do CampusGo',
        body: 'Aviso criado pelo aplicativo.',
        userId: 1,
      });
      showAlert('Aviso criado', `O servidor devolveu o id ${created.id}.`);
    } catch (err) {
      showAlert('Não foi possível criar o aviso', err.message);
    }
  }

  // Estado 2: erro
  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorTitle}>Algo deu errado</Text>
        <Text style={styles.errorText}>{error}</Text>
        <AppButton title="Tentar novamente" onPress={reload} />
      </View>
    );
  }

  // Estado 1: carregando (primeira busca, ainda sem avisos)
  if (isLoading && notices.length === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#3b5bdb" />
        <Text style={styles.muted}>Carregando avisos...</Text>
      </View>
    );
  }

  // Estado 3: sucesso
  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={styles.content}
      data={notices}
      keyExtractor={(item) => String(item.id)}
      refreshing={isLoading}
      onRefresh={reload}
      ListHeaderComponent={<AppButton title="Criar aviso" variant="secondary" onPress={handleCreate} />}
      ListEmptyComponent={<Text style={styles.muted}>Nenhum aviso por enquanto.</Text>}
      renderItem={({ item, index }) => (
        <FadeIn delay={index * 60} style={styles.card}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardBody}>{item.body}</Text>
        </FadeIn>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: { flex: 1, backgroundColor: '#f4f5f9' },
  content: { padding: 16, gap: 12 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, gap: 12, backgroundColor: '#f4f5f9' },
  muted: { color: '#6b7080', fontSize: 15, textAlign: 'center' },
  errorTitle: { fontSize: 20, fontWeight: '700', color: '#c92a2a' },
  errorText: { fontSize: 15, color: '#495057', textAlign: 'center', marginBottom: 8 },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 14, gap: 6, borderWidth: 1, borderColor: '#e3e6f0' },
  cardTitle: { fontSize: 16, fontWeight: '700', color: '#1c1e2b', textTransform: 'capitalize' },
  cardBody: { fontSize: 14, color: '#495057', lineHeight: 20 },
});
