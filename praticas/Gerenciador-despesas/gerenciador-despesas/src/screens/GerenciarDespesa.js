import { useContext, useLayoutEffect, useState } from 'react';
import { View, Text, TextInput, Pressable, Platform, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { DespesasContext } from '../store/despesas-context';
import CategoriaSeletor from '../components/despesa/CategoriaSeletor';
import { getDataFormatada } from '../util/data';

function GerenciarDespesa({ route, navigation }) {
  const { despesas, addDespesa, updateDespesa } = useContext(DespesasContext);

  // se veio um id pela navegação, é edição; senão, cadastro
  const idEditado = route.params?.id;
  const despesaEditada = despesas.find((d) => d.id === idEditado);
  const editando = !!despesaEditada;

  const [descricao, setDescricao] = useState(despesaEditada?.descricao ?? '');
  const [valor, setValor] = useState(despesaEditada ? despesaEditada.valor.toFixed(2) : '');
  const [data, setData] = useState(despesaEditada?.data ?? new Date());
  const [categoria, setCategoria] = useState(despesaEditada?.categoria ?? '');
  const [mostrarPicker, setMostrarPicker] = useState(false);
  const [erro, setErro] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({ title: editando ? 'Editar Despesa' : 'Adicionar Despesa' });
  }, [navigation, editando]);

  // só aceita número com até 2 casas decimais; troca vírgula por ponto
  function handleValor(texto) {
    const normalizado = texto.replace(',', '.');
    if (/^\d*\.?\d{0,2}$/.test(normalizado)) {
      setValor(normalizado);
    }
  }

  function handleData(evento, dataSelecionada) {
    setMostrarPicker(Platform.OS === 'ios'); // no iOS o seletor fica aberto
    if (evento.type === 'set' && dataSelecionada) {
      setData(dataSelecionada);
    }
  }

  function handleSalvar() {
    const valorNumero = parseFloat(valor);

    if (descricao.trim() === '' || !(valorNumero > 0) || categoria === '') {
      setErro('Preencha descrição, valor (maior que zero) e categoria.');
      return;
    }

    const dados = { descricao: descricao.trim(), valor: valorNumero, data, categoria };

    if (editando) {
      updateDespesa(idEditado, dados);
    } else {
      addDespesa(dados);
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={styles.input}
        value={descricao}
        onChangeText={setDescricao}
        placeholder="Ex.: Supermercado"
      />

      <Text style={styles.label}>Valor (R$)</Text>
      <TextInput
        style={styles.input}
        value={valor}
        onChangeText={handleValor}
        keyboardType="decimal-pad"
        placeholder="0.00"
      />

      <Text style={styles.label}>Data</Text>
      <Pressable style={styles.input} onPress={() => setMostrarPicker(true)}>
        <Text>{getDataFormatada(data)}</Text>
      </Pressable>
      {mostrarPicker && Platform.OS !== 'web' && (
        <DateTimePicker value={data} mode="date" onChange={handleData} />
      )}

      <Text style={styles.label}>Categoria</Text>
      <CategoriaSeletor selecionada={categoria} onSelecionar={setCategoria} />

      {erro !== '' && <Text style={styles.erro}>{erro}</Text>}

      <View style={styles.botoes}>
        <Pressable style={[styles.botao, styles.botaoCancelar]} onPress={() => navigation.goBack()}>
          <Text>Cancelar</Text>
        </Pressable>
        <Pressable style={[styles.botao, styles.botaoSalvar]} onPress={handleSalvar}>
          <Text style={styles.botaoSalvarTexto}>{editando ? 'Atualizar' : 'Adicionar'}</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default GerenciarDespesa;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  label: { fontSize: 14, fontWeight: '600', marginTop: 12, marginBottom: 4 },
  input: { borderWidth: 1, borderColor: '#999', borderRadius: 8, padding: 10, backgroundColor: '#fff' },
  erro: { color: 'red', marginTop: 8 },
  botoes: { flexDirection: 'row', justifyContent: 'flex-end', gap: 12, marginTop: 24 },
  botao: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8 },
  botaoCancelar: { backgroundColor: '#e5e5e5' },
  botaoSalvar: { backgroundColor: '#3b5bdb' },
  botaoSalvarTexto: { color: '#fff', fontWeight: 'bold' },
});
