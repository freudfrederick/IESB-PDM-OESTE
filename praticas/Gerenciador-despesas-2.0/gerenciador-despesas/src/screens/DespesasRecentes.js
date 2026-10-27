import { useMemo } from 'react';
import { StyleSheet, View, useColorScheme } from 'react-native';
import DespesaSaida from '../components/despesa/DespesaSaida';
import { getTheme } from '../constants/theme';
import { useExpenses } from '../store/expenses-context';
import { getDateMinusDays, startOfDay } from '../util/helpers';

function DespesasRecentes() {
  const colors = getTheme(useColorScheme());
  const { expenses, isLoaded } = useExpenses();

  // últimos 7 dias, calculados a partir da lista global (a lista do estado não é alterada)
  const recentExpenses = useMemo(() => {
    const limit = getDateMinusDays(new Date(), 7);
    return expenses
      .filter((expense) => startOfDay(expense.date) >= limit)
      .sort((a, b) => b.date - a.date);
  }, [expenses]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <DespesaSaida
        expenses={recentExpenses}
        label="Últimos 7 dias"
        loading={!isLoaded}
        emptyTitle="Nenhuma despesa nos últimos 7 dias."
        emptyHint="Toque em + para adicionar."
      />
    </View>
  );
}

export default DespesasRecentes;

const styles = StyleSheet.create({
  container: { flex: 1 },
});
