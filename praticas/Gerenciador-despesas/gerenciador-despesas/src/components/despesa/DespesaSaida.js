import { View, Text, StyleSheet } from 'react-native';
import DespesaSumario from './DespesaSumario';
import DespesaLista from './DespesaLista';

function DespesaSaida({ despesas, periodo }) {
  return (
    <View style={styles.container}>
      <DespesaSumario despesas={despesas} periodo={periodo} />
      {despesas.length > 0 ? (
        <DespesaLista despesas={despesas} />
      ) : (
        <Text style={styles.vazio}>Nenhuma despesa encontrada.</Text>
      )}
    </View>
  );
}

export default DespesaSaida;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  vazio: { textAlign: 'center', marginTop: 32, color: '#666' },
});
