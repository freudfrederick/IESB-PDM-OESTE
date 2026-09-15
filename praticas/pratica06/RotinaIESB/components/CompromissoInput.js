import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';
import { placeholderCompromisso, botaoAdicionar } from '../labels';

export default function CompromissoInput({ value, onChangeText, onAdd }) {
  return (
    <View style={styles.linha}>
      <TextInput
        style={styles.input}
        placeholder={placeholderCompromisso}
        placeholderTextColor="#94a3b8"
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onAdd}
        returnKeyType="done"
      />
      <Pressable
        style={({ pressed }) => [styles.botao, pressed && styles.botaoPressionado]}
        android_ripple={{ color: '#1e3a5f' }}
        onPress={onAdd}
      >
        <Text style={styles.botaoTexto}>{botaoAdicionar}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  linha: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 12,
    gap: 8,
  },
  input: {
    width: '68%',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    backgroundColor: '#fff',
  },
  botao: {
    flex: 1,
    backgroundColor: '#0e3a42',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botaoPressionado: {
    opacity: 0.8,
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});
