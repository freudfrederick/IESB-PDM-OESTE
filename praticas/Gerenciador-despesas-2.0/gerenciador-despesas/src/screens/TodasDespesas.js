import { useMemo, useState } from 'react';
import {
  Alert,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  useColorScheme,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CategoriaChips from '../components/despesa/CategoriaChips';
import DespesaSaida from '../components/despesa/DespesaSaida';
import { getTheme } from '../constants/theme';
import useDebounce from '../hooks/useDebounce';
import { useExpenses } from '../store/expenses-context';

function TodasDespesas() {
  const colors = getTheme(useColorScheme());
  const { expenses, isLoaded, clearExpenses } = useExpenses();
  const { width } = useWindowDimensions();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  // a busca só é aplicada 300 ms depois da última tecla
  const debouncedSearch = useDebounce(search, 300);
  const numColumns = width > 600 ? 2 : 1;
  const isFiltering = debouncedSearch.trim() !== '' || category !== '';

  const filteredExpenses = useMemo(() => {
    const term = debouncedSearch.trim().toLowerCase();
    return expenses
      .filter((expense) => !category || expense.category === category)
      .filter((expense) => !term || expense.description.toLowerCase().includes(term))
      .sort((a, b) => b.date - a.date);
  }, [expenses, debouncedSearch, category]);

  function handleClearAll() {
    if (Platform.OS === 'web') {
      // Alert.alert não funciona no react-native-web; usa o confirm do navegador
      if (window.confirm('Deseja realmente excluir todas as despesas?')) clearExpenses();
      return;
    }
    Alert.alert('Limpar tudo', 'Deseja realmente excluir todas as despesas?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: clearExpenses },
    ]);
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.filters}>
        <View
          style={[styles.searchBox, { backgroundColor: colors.input, borderColor: colors.border }]}
        >
          <Ionicons name="search" size={18} color={colors.textMuted} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            value={search}
            onChangeText={setSearch}
            placeholder="Buscar por descrição"
            placeholderTextColor={colors.textMuted}
          />
        </View>
        <CategoriaChips selected={category} onSelect={setCategory} />
        {expenses.length > 0 && (
          <Pressable onPress={handleClearAll} style={styles.clearButton}>
            <Ionicons name="trash-outline" size={16} color={colors.danger} />
            <Text style={{ color: colors.danger, marginLeft: 4 }}>Limpar tudo</Text>
          </Pressable>
        )}
      </View>

      <DespesaSaida
        expenses={filteredExpenses}
        label={isFiltering ? 'Resultado' : 'Total'}
        loading={!isLoaded}
        numColumns={numColumns}
        emptyTitle={isFiltering ? 'Nenhuma despesa encontrada.' : 'Nenhuma despesa cadastrada.'}
        emptyHint={
          isFiltering ? 'Ajuste a busca ou o filtro de categoria.' : 'Toque em + para adicionar.'
        }
      />
    </View>
  );
}

export default TodasDespesas;

const styles = StyleSheet.create({
  container: { flex: 1 },
  filters: { paddingHorizontal: 16, paddingTop: 12 },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  searchInput: { flex: 1, paddingVertical: 10, marginLeft: 8, fontSize: 16 },
  clearButton: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end' },
});
