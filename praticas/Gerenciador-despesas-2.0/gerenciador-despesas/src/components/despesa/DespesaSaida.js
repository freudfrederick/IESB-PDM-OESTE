import { ActivityIndicator, StyleSheet, View, useColorScheme } from 'react-native';
import { getTheme } from '../../constants/theme';
import DespesaLista from './DespesaLista';
import DespesaSumario from './DespesaSumario';

function DespesaSaida({ expenses, label, loading = false, numColumns, emptyTitle, emptyHint }) {
  const colors = getTheme(useColorScheme());

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <DespesaSumario expenses={expenses} label={label} />
      <DespesaLista
        expenses={expenses}
        numColumns={numColumns}
        emptyTitle={emptyTitle}
        emptyHint={emptyHint}
      />
    </View>
  );
}

export default DespesaSaida;

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 8 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
