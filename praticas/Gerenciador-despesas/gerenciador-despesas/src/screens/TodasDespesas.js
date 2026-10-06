import { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { DespesasContext } from '../store/despesas-context';
import { filtrarPorCategoria } from '../util/despesas';
import CategoriaSeletor from '../components/despesa/CategoriaSeletor';
import DespesaSaida from '../components/despesa/DespesaSaida';

function TodasDespesas() {
  const { despesas } = useContext(DespesasContext);
  const [filtro, setFiltro] = useState('');

  const despesasFiltradas = filtrarPorCategoria(despesas, filtro);

  return (
    <View style={styles.container}>
      <View style={styles.filtro}>
        <CategoriaSeletor selecionada={filtro} onSelecionar={setFiltro} incluirTodas />
      </View>
      <DespesaSaida despesas={despesasFiltradas} periodo={filtro || 'Total'} />
    </View>
  );
}

export default TodasDespesas;

const styles = StyleSheet.create({
  container: { flex: 1 },
  filtro: { paddingHorizontal: 16, paddingTop: 8 },
});
