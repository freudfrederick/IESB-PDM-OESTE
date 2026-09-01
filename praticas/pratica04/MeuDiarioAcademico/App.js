import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { APP_TITLE, INPUT_PLACEHOLDER, BUTTON_TEXT, LIST_TITLE } from './labels';


const disciplinas = [
  'Programação para Dispositivos Móveis',
  'Banco de Dados II',
  'Engenharia de Software',
];

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>{APP_TITLE}</Text>

        <View style={styles.inputRow}>
          <TextInput style={styles.input} placeholder={INPUT_PLACEHOLDER} />
          <View style={styles.buttonWrapper}>
            <Button title={BUTTON_TEXT} onPress={() => {}} />
          </View>
        </View>

        <Text style={styles.listTitle}>{LIST_TITLE}</Text>
        <View style={styles.list}>
          {disciplinas.map((disciplina, index) => (
            <View key={index} style={styles.item}>
              <Text style={styles.itemText}>{disciplina}</Text>
            </View>
          ))}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  inputRow: {
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 20,
  },
  input: {
    width: '70%', 
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginRight: 8,
  },
  buttonWrapper: {
    width: '28%',
  },
  listTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  list: {
    flexDirection: 'column', 
  },
  item: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    marginBottom: 8,
    borderRadius: 6,
  },
  itemText: {
    fontSize: 16,
  },
});