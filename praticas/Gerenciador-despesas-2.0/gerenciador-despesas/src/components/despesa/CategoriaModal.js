import { Modal, Pressable, StyleSheet, Text, View, useColorScheme } from 'react-native';
import { CATEGORIES } from '../../constants/categories';
import { getTheme } from '../../constants/theme';

// Escolha da categoria: só as opções de CATEGORIES, sem digitação livre
function CategoriaModal({ visible, selected, onSelect, onClose }) {
  const colors = getTheme(useColorScheme());

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={[styles.overlay, { backgroundColor: colors.overlay }]}>
        {/* área fora da folha: toque para fechar */}
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        <View style={[styles.sheet, { backgroundColor: colors.card }]}>
          <Text style={[styles.title, { color: colors.text }]}>Selecione a categoria</Text>
          {CATEGORIES.map((category) => {
            const active = category === selected;
            return (
              <Pressable
                key={category}
                onPress={() => onSelect(category)}
                style={[styles.option, active && { backgroundColor: colors.chip }]}
              >
                <Text
                  style={{
                    color: colors.text,
                    fontSize: 16,
                    fontWeight: active ? 'bold' : 'normal',
                  }}
                >
                  {category}
                </Text>
              </Pressable>
            );
          })}
          <Pressable onPress={onClose} style={styles.cancel}>
            <Text style={{ color: colors.textMuted, fontSize: 16 }}>Cancelar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

export default CategoriaModal;

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'flex-end' },
  sheet: { padding: 16, borderTopLeftRadius: 16, borderTopRightRadius: 16 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  option: { paddingVertical: 14, paddingHorizontal: 12, borderRadius: 8 },
  cancel: { alignItems: 'center', paddingVertical: 14, marginTop: 4 },
});
