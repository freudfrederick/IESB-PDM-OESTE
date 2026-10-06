import { View, Text, Pressable, StyleSheet } from 'react-native';
import { CATEGORIAS } from '../../util/despesas';

function CategoriaSeletor({ selecionada, onSelecionar, incluirTodas = false }) {
  // '' representa "Todas" no modo filtro
  const opcoes = incluirTodas ? ['', ...CATEGORIAS] : CATEGORIAS;

  return (
    <View style={styles.linha}>
      {opcoes.map((categoria) => {
        const ativa = categoria === selecionada;
        return (
          <Pressable
            key={categoria || 'todas'}
            onPress={() => onSelecionar(categoria)}
            style={[styles.chip, ativa && styles.chipAtivo]}
          >
            <Text style={[styles.chipTexto, ativa && styles.chipTextoAtivo]}>
              {categoria || 'Todas'}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export default CategoriaSeletor;

const styles = StyleSheet.create({
  linha: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, paddingVertical: 8 },
  chip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, backgroundColor: '#e5e5e5' },
  chipAtivo: { backgroundColor: '#3b5bdb' },
  chipTexto: { color: '#333' },
  chipTextoAtivo: { color: '#fff', fontWeight: 'bold' },
});
