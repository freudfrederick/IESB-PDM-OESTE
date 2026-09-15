import { useEffect, useRef, useState } from 'react';
import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CompromissoInput from './components/CompromissoInput';
import CompromissoList from './components/CompromissoList';
import { tituloApp, tituloLista, listaVazia, listaVaziaSubtexto } from './labels';

const STORAGE_KEY = '@rotina_iesb_compromissos';

export default function App() {
  const [texto, setTexto] = useState('');
  const [compromissos, setCompromissos] = useState([]);

  const carregouRef = useRef(false);

  useEffect(() => {
    async function carregarCompromissos() {
      try {
        const salvo = await AsyncStorage.getItem(STORAGE_KEY);
        if (salvo) {
          setCompromissos(JSON.parse(salvo));
        }
      } catch (erro) {
        Alert.alert('Erro ao carregar', 'Não foi possível carregar seus compromissos salvos.');
      } finally {
        carregouRef.current = true;
      }
    }
    carregarCompromissos();
  }, []);

  useEffect(() => {
    if (!carregouRef.current) return;

    async function salvarCompromissos() {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(compromissos));
      } catch (erro) {
        Alert.alert('Erro ao salvar', 'Não foi possível salvar seus compromissos.');
      }
    }
    salvarCompromissos();
  }, [compromissos]);

  function handleAdd() {
    const textoLimpo = texto.trim();
    if (!textoLimpo) {
      Alert.alert('Compromisso vazio', 'Digite um compromisso antes de adicionar.');
      return;
    }

    const novoCompromisso = {
      id: Date.now().toString(),
      texto: textoLimpo,
      criadoEm: new Date().toISOString(),
      concluido: false,
    };

    setCompromissos((prev) => [novoCompromisso, ...prev]);
    setTexto('');
  }

  function handleDelete(id) {
    setCompromissos((prev) => prev.filter((c) => c.id !== id));
  }

  function handleToggle(id) {
    setCompromissos((prev) =>
      prev.map((c) => (c.id === id ? { ...c, concluido: !c.concluido } : c))
    );
  }

  const pendentes = compromissos.filter((c) => !c.concluido).length;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
        <StatusBar style="dark" />

        <View style={styles.header}>
          <Image source={require('./assets/logo.png')} style={styles.logo} />
          <View style={styles.headerTextos}>
            <Text style={styles.titulo}>{tituloApp}</Text>
            <Text style={styles.contador}>{pendentes} pendentes</Text>
          </View>
        </View>

        <CompromissoInput value={texto} onChangeText={setTexto} onAdd={handleAdd} />

        <CompromissoList
          itens={compromissos}
          onDelete={handleDelete}
          onToggle={handleToggle}
          tituloLista={tituloLista}
          listaVazia={`${listaVazia}\n${listaVaziaSubtexto}`}
        />
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
    justifyContent: 'flex-start',
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
