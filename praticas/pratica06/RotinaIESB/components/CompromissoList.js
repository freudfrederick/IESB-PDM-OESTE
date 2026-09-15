import { FlatList, View, Text, Pressable, StyleSheet } from 'react-native';
import { botaoExcluir } from '../labels';

export default function CompromissoList({ itens, onDelete, onToggle, tituloLista, listaVazia }) {
  return (
    <View style={styles.area}>
      <Text style={styles.titulo}>{tituloLista}</Text>

      <FlatList
        data={itens}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.lista}
        ListEmptyComponent={
          <View style={styles.vazio}>
            <Text style={styles.vazioTexto}>{listaVazia}</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Pressable
              style={styles.textoArea}
              onPress={() => onToggle(item.id)}
              android_ripple={{ color: '#e2e8f0' }}
            >
              <Text style={[styles.itemTexto, item.concluido && styles.itemTextoConcluido]}>
                {item.texto}
              </Text>
              <Text style={styles.itemData}>
                {new Date(item.criadoEm).toLocaleString('pt-BR')}
              </Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [styles.excluir, pressed && styles.excluirPressed]}
              android_ripple={{ color: '#fecaca' }}
              onPress={() => onDelete(item.id)}
            >
              <Text style={styles.excluirTexto}>{botaoExcluir}</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  area: {
    flex: 1,
    paddingTop: 4,
  },
  titulo: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  lista: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    gap: 8,
    flexGrow: 1,
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
    paddingHorizontal: 32,
  },
  vazioTexto: {
    fontSize: 15,
    fontWeight: '600',
    color: '#475569',
    textAlign: 'center',
  },
});
