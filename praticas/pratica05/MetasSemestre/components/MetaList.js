import { FlatList, View, Text, Pressable, StyleSheet } from 'react-native';

/**
 * Lista rolável de metas.
 *
 * Props:
 * - metas: Array<{ id, texto, criadaEm, concluida }>
 * - onDelete: function(id) -> remove a meta com esse id
 * - onToggle: function(id) -> alterna concluida/pendente (desafio)
 */
export default function MetaList({ metas, onDelete, onToggle }) {
  if (metas.length === 0) {
    return (
      <View style={styles.vazio}>
        <Text style={styles.vazioTexto}>Nenhuma meta cadastrada ainda.</Text>
        <Text style={styles.vazioSubtexto}>Adicione sua primeira meta de estudo acima.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={metas}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.lista}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Pressable
            style={styles.textoArea}
            onPress={() => onToggle(item.id)}
            android_ripple={{ color: '#e2e8f0' }}
          >
            <Text style={[styles.itemTexto, item.concluida && styles.itemTextoConcluido]}>
              {item.texto}
            </Text>
            <Text style={styles.itemData}>
              {new Date(item.criadaEm).toLocaleDateString('pt-BR')}
            </Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [styles.excluir, pressed && styles.excluirPressed]}
            android_ripple={{ color: '#fecaca' }}
            onPress={() => onDelete(item.id)}
          >
            <Text style={styles.excluirTexto}>Excluir</Text>
          </Pressable>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  lista: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    gap: 8,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    overflow: 'hidden',
  },
  textoArea: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  itemTexto: {
    fontSize: 15,
    color: '#1e293b',
  },
  itemTextoConcluido: {
    textDecorationLine: 'line-through',
    color: '#94a3b8',
  },
  itemData: {
    marginTop: 2,
    fontSize: 11,
    color: '#94a3b8',
  },
  excluir: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: '#fef2f2',
  },
  excluirPressed: {
    opacity: 0.7,
  },
  excluirTexto: {
    color: '#dc2626',
    fontWeight: '600',
    fontSize: 13,
  },
  vazio: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
    paddingHorizontal: 32,
  },
  vazioTexto: {
    fontSize: 16,
    fontWeight: '600',
    color: '#475569',
  },
  vazioSubtexto: {
    marginTop: 4,
    fontSize: 13,
    color: '#94a3b8',
    textAlign: 'center',
  },
});
