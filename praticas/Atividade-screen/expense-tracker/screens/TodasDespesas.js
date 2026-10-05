import { View, Text, StyleSheet } from 'react-native';

function GerenciarDespesa() {
  return (
    <View style={styles.container}>
      <Text>Despesas Recentes</Text>
    </View>
  );
}

export default GerenciarDespesa;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});