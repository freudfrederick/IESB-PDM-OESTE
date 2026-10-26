import { StyleSheet, Text, View, useColorScheme } from 'react-native';
import { getTheme } from '../../constants/theme';
import { formatCurrency } from '../../util/helpers';

function DespesaSumario({ expenses, label }) {
  const colors = getTheme(useColorScheme());
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const count = expenses.length;

  return (
    <View style={[styles.container, { backgroundColor: colors.summary }]}>
      <View>
        <Text style={[styles.label, { color: colors.textMuted }]}>{label}</Text>
        <Text style={[styles.count, { color: colors.text }]}>
          {count} {count === 1 ? 'despesa' : 'despesas'}
        </Text>
      </View>
      <Text style={[styles.total, { color: colors.primary }]}>{formatCurrency(total)}</Text>
    </View>
  );
}

export default DespesaSumario;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
  },
  label: { fontSize: 12 },
  count: { fontSize: 15, fontWeight: '600' },
  total: { fontSize: 20, fontWeight: 'bold' },
});
