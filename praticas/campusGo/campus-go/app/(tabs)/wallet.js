import { useState } from 'react';
import { FlatList, Share, StyleSheet, Text, TextInput, View } from 'react-native';
import AppButton from '../../components/AppButton';
import { showAlert } from '../../services/alert';
import { useExpenses } from '../../store/expenses-context';

export default function WalletScreen() {
  const { expenses, addExpense } = useExpenses();
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  // Total vindo do contexto; lista vazia = 0 (o 0 inicial do reduce evita quebrar)
  const total = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);

  function handleAdd() {
    const value = Number(amount.replace(',', '.'));
    if (description.trim().length < 3 || !(value > 0)) {
      showAlert('Dados inválidos', 'Informe uma descrição (3+ letras) e um valor maior que zero.');
      return;
    }
    addExpense({ description: description.trim(), amount: value, date: new Date(), category: 'Geral' });
    setDescription('');
    setAmount('');
  }

  async function handleShare() {
    try {
      await Share.share({ message: `Gastei R$ ${total.toFixed(2)} neste semestre.` });
    } catch (error) {
      showAlert('Não foi possível compartilhar', 'O menu de compartilhamento não está disponível aqui.');
    }
  }

  return (
    <FlatList
      style={styles.screen}
      contentContainerStyle={styles.content}
      data={expenses}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <View style={styles.header}>
          <View style={styles.totalBox}>
            <Text style={styles.totalLabel}>Total gasto</Text>
            <Text style={styles.total}>R$ {total.toFixed(2)}</Text>
          </View>
          <AppButton title="Compartilhar resumo" onPress={handleShare} />

          <Text style={styles.section}>Nova despesa</Text>
          <TextInput
            style={styles.input}
            placeholder="Descrição"
            value={description}
            onChangeText={setDescription}
          />
          <TextInput
            style={styles.input}
            placeholder="Valor (ex.: 12.50)"
            keyboardType="decimal-pad"
            value={amount}
            onChangeText={setAmount}
          />
          <AppButton title="Adicionar" variant="secondary" onPress={handleAdd} />
          <Text style={styles.section}>Despesas</Text>
        </View>
      }
      ListEmptyComponent={<Text style={styles.muted}>Nenhuma despesa cadastrada.</Text>}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.itemText}>{item.description}</Text>
          <Text style={styles.itemValue}>R$ {Number(item.amount).toFixed(2)}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#f4f5f9' },
  content: { padding: 16, gap: 8 },
  header: { gap: 12 },
  totalBox: { backgroundColor: '#fff', borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#e3e6f0' },
  totalLabel: { fontSize: 14, color: '#6b7080' },
  total: { fontSize: 32, fontWeight: '800', color: '#1c1e2b' },
  section: { marginTop: 8, fontSize: 13, fontWeight: '700', color: '#6b7080', textTransform: 'uppercase' },
  input: { backgroundColor: '#fff', borderRadius: 10, borderWidth: 1, borderColor: '#d5d9e8', padding: 12, fontSize: 16 },
  muted: { color: '#6b7080', textAlign: 'center', marginTop: 8 },
  item: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#fff', borderRadius: 10, padding: 12 },
  itemText: { fontSize: 15, color: '#1c1e2b' },
  itemValue: { fontSize: 15, fontWeight: '700', color: '#1c1e2b' },
});
