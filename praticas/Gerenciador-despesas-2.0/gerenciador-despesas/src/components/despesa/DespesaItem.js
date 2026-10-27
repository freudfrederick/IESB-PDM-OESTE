import { Pressable, StyleSheet, Text, View, useColorScheme } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { cardShadow, getTheme } from '../../constants/theme';
import { formatCurrency, formatDate } from '../../util/helpers';

function DespesaItem({ id, description, amount, date, category }) {
  const navigation = useNavigation();
  const colors = getTheme(useColorScheme());

  return (
    <Pressable
      onPress={() => navigation.navigate('GerenciarDespesa', { expenseId: id })}
      style={({ pressed }) => [
        styles.card,
        cardShadow,
        { backgroundColor: colors.card },
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.info}>
        <Text style={[styles.description, { color: colors.text }]} numberOfLines={1}>
          {description}
        </Text>
        <Text style={{ color: colors.textMuted }}>{formatDate(date)}</Text>
        <View style={[styles.tag, { backgroundColor: colors.chip }]}>
          <Text style={[styles.tagText, { color: colors.chipText }]}>{category}</Text>
        </View>
      </View>
      <View style={[styles.amountBox, { backgroundColor: colors.primary }]}>
        <Text style={[styles.amount, { color: colors.onPrimary }]}>{formatCurrency(amount)}</Text>
      </View>
    </Pressable>
  );
}

export default DespesaItem;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    marginVertical: 6,
    borderRadius: 10,
  },
  pressed: { opacity: 0.75 },
  info: { flex: 1, marginRight: 12 },
  description: { fontSize: 16, fontWeight: 'bold', marginBottom: 2 },
  tag: {
    alignSelf: 'flex-start',
    marginTop: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  tagText: { fontSize: 12 },
  amountBox: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6 },
  amount: { fontWeight: 'bold' },
});
