import { useEffect, useRef, useState } from 'react';
import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import MetaInput from './components/MetaInput';
import MetaList from './components/MetaList';

const STORAGE_KEY = '@metas_semestre';

export default function App() {
  const [texto, setTexto] = useState('');
  const [metas, setMetas] = useState([]);

  // Evita que o efeito de SALVAR sobrescreva o AsyncStorage com um array
  // vazio antes do efeito de CARGA terminar de ler os dados salvos.
  const carregouRef = useRef(false);

  // useEffect de CARGA — roda uma única vez, na montagem do componente,
  // pra trazer as metas que já estavam salvas de sessões anteriores.
  useEffect(() => {
    async function carregarMetas() {
      try {
        const salvo = await AsyncStorage.getItem(STORAGE_KEY);
        if (salvo) {
          setMetas(JSON.parse(salvo));
        }
      } catch (erro) {
        Alert.alert('Erro ao carregar', 'Não foi possível carregar suas metas salvas.');
      } finally {
        carregouRef.current = true;
      }
    }
    carregarMetas();
  }, []);

  // useEffect de SALVAMENTO — roda toda vez que a lista de metas muda
  // (adicionar, remover, concluir), persistindo o estado atual.
  useEffect(() => {
    if (!carregouRef.current) return;

    async function salvarMetas() {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(metas));
      } catch (erro) {
        Alert.alert('Erro ao salvar', 'Não foi possível salvar suas metas.');
      }
    }
    salvarMetas();
  }, [metas]);

  function handleAdd() {
    const textoLimpo = texto.trim();
    if (!textoLimpo) {
      Alert.alert('Meta vazia', 'Digite uma meta antes de adicionar.');
      return;
    }

    const novaMeta = {
      id: Date.now().toString(),
      texto: textoLimpo,
      criadaEm: new Date().toISOString(),
      concluida: false,
    };

    setMetas((prev) => [novaMeta, ...prev]);
    setTexto('');
  }

  function handleDelete(id) {
    setMetas((prev) => prev.filter((meta) => meta.id !== id));
  }

  function handleToggle(id) {
    setMetas((prev) =>
      prev.map((meta) => (meta.id === id ? { ...meta, concluida: !meta.concluida } : meta))
    );
  }

  const pendentes = metas.filter((meta) => !meta.concluida).length;
  const concluidas = metas.length - pendentes;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
        <StatusBar style="dark" />

        <View style={styles.header}>
          <Image source={require('./assets/icon.png')} style={styles.logo} />
          <View style={styles.headerTextos}>
            <Text style={styles.titulo}>Metas do Semestre</Text>
            <Text style={styles.contador}>
              {pendentes} pendentes / {concluidas} concluídas
            </Text>
          </View>
        </View>

        <MetaInput value={texto} onChangeText={setTexto} onAdd={handleAdd} />

        <MetaList metas={metas} onDelete={handleDelete} onToggle={handleToggle} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  logo: {
    width: 44,
    height: 44,
    borderRadius: 10,
  },
  headerTextos: {
    flex: 1,
  },
  titulo: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0f172a',
  },
  contador: {
    marginTop: 2,
    fontSize: 13,
    color: '#64748b',
  },
});
