import { View, Text, StyleSheet } from 'react-native';

function DespesasRecentes() {
  return (
    <View style={styles.container}>
      <Text>Despesas Recentes</Text>
    </View>
  );
}

export default DespesasRecentes;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});