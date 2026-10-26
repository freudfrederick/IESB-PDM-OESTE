import { Pressable, StyleSheet, Text, View, useColorScheme } from 'react-native';
import { CATEGORIES } from '../../constants/categories';
import { getTheme } from '../../constants/theme';

// Filtro por categoria. O valor '' representa "Todas"
function CategoriaChips({ selected, onSelect }) {
  const colors = getTheme(useColorScheme());
  const options = ['', ...CATEGORIES];

  return (
    <View style={styles.row}>
      {options.map((category) => {
        const active = category === selected;
        return (
          <Pressable
            key={category || 'todas'}
            onPress={() => onSelect(category)}
            style={[styles.chip, { backgroundColor: active ? colors.primary : colors.chip }]}
          >
            <Text
              style={{
                color: active ? colors.onPrimary : colors.chipText,
                fontWeight: active ? 'bold' : 'normal',
              }}
            >
              {category || 'Todas'}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export default CategoriaChips;

const styles = StyleSheet.create({
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, paddingVertical: 8 },
  chip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16 },
});
