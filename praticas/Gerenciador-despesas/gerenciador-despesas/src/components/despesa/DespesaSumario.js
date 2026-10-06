import { View, Text, StyleSheet } from 'react-native';

function DespesaSumario({ despesas, periodo }) {
  const somaDespesas = despesas.reduce((acumulador, item) => acumulador + item.valor, 0);
  const acimaDoLimite = somaDespesas > 200; // desafio extra

  return (
    <View style={styles.container}>
      <Text style={styles.periodo}>{periodo}</Text>
      <Text style={[styles.soma, acimaDoLimite && styles.somaAlerta]}>
        R$ {somaDespesas.toFixed(2)}
      </Text>
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
    backgroundColor: '#dbe4ff',
    borderRadius: 8,
  },
  periodo: { fontSize: 14, color: '#3b5bdb' },
  soma: { fontSize: 18, fontWeight: 'bold', color: '#3b5bdb' },
  somaAlerta: { color: 'red' },
});
