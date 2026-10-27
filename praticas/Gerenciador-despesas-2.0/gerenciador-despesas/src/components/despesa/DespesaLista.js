import { FlatList, StyleSheet, Text, View, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getTheme } from '../../constants/theme';
import DespesaItem from './DespesaItem';

function DespesaLista({
  expenses,
  numColumns = 1,
  emptyTitle = 'Nenhuma despesa.',
  emptyHint = 'Toque em + para adicionar.',
}) {
  const colors = getTheme(useColorScheme());

  const emptyComponent = (
    <View style={styles.empty}>
      <Ionicons name="wallet-outline" size={56} color={colors.textMuted} />
      <Text style={[styles.emptyTitle, { color: colors.text }]}>{emptyTitle}</Text>
      <Text style={{ color: colors.textMuted }}>{emptyHint}</Text>
    </View>
  );

  return (
    <FlatList
      // trocar o número de colunas exige uma key nova na FlatList
      key={numColumns}
      data={expenses}
      keyExtractor={(item) => item.id}
      numColumns={numColumns}
      columnWrapperStyle={numColumns > 1 ? styles.row : undefined}
      renderItem={({ item }) => (
        <View style={numColumns > 1 ? { flex: 1 / numColumns } : undefined}>
          <DespesaItem {...item} />
        </View>
      )}
      ListEmptyComponent={emptyComponent}
      contentContainerStyle={expenses.length === 0 ? styles.emptyContainer : styles.content}
    />
  );
}

export default DespesaLista;

const styles = StyleSheet.create({
  content: { padding: 8 },
  emptyContainer: { flexGrow: 1, justifyContent: 'center' },
  row: { gap: 12 },
  empty: { alignItems: 'center', padding: 24 },
  emptyTitle: { fontSize: 18, fontWeight: '600', marginTop: 12, marginBottom: 4 },
});
