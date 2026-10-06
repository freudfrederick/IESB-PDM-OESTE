import { Pressable, View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getDataFormatada } from '../../util/data';

function DespesaItem({ id, descricao, valor, data, categoria }) {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => navigation.navigate('GerenciarDespesa', { id })}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.item}>
        <View style={styles.info}>
          <Text style={styles.descricao}>{descricao}</Text>
          <Text style={styles.data}>{getDataFormatada(data)}</Text>
          <Text style={styles.categoria}>{categoria}</Text>
        </View>
        <View style={styles.valorBox}>
          <Text style={styles.valor}>{valor.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default DespesaItem;

const styles = StyleSheet.create({
  pressed: { opacity: 0.75 },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    marginVertical: 6,
    backgroundColor: '#3b5bdb',
    borderRadius: 8,
  },
  info: { flex: 1 },
  descricao: { fontSize: 16, fontWeight: 'bold', color: '#fff', marginBottom: 2 },
  data: { color: '#dbe4ff' },
  // tag da categoria: fundo cinza claro e bordas arredondadas
  categoria: {
    alignSelf: 'flex-start',
    marginTop: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    backgroundColor: '#e5e5e5',
    color: '#333',
    fontSize: 12,
    overflow: 'hidden',
  },
  valorBox: { backgroundColor: '#fff', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6, minWidth: 80, alignItems: 'center' },
  valor: { fontWeight: 'bold', color: '#3b5bdb' },
});
