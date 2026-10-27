import { useLayoutEffect, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useColorScheme,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import CategoriaModal from '../components/despesa/CategoriaModal';
import { getTheme } from '../constants/theme';
import { useExpenses } from '../store/expenses-context';
import { formatDate, fromDateInputValue, startOfDay, toDateInputValue } from '../util/helpers';

// Devolve um objeto com uma mensagem para cada campo inválido
export function validate(values) {
  const errors = {};

  if (values.description.trim().length < 3) {
    errors.description = 'A descrição deve ter no mínimo 3 caracteres.';
  }
  if (!(parseFloat(values.amount) > 0)) {
    errors.amount = 'O valor deve ser maior que zero.';
  }
  if (startOfDay(values.date) > startOfDay(new Date())) {
    errors.date = 'A data não pode ser futura.';
  }
  if (!values.category) {
    errors.category = 'Selecione uma categoria.';
  }

  return errors;
}

function Field({ label, error, colors, children }) {
  return (
    <View style={styles.field}>
      <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      {children}
      {error ? <Text style={[styles.error, { color: colors.danger }]}>{error}</Text> : null}
    </View>
  );
}

function GerenciarDespesa({ route, navigation }) {
  const scheme = useColorScheme();
  const colors = getTheme(scheme);
  const { expenses, addExpense, updateExpense, deleteExpense } = useExpenses();

  // com expenseId a tela edita; sem ele, cria uma despesa nova
  const expenseId = route.params?.expenseId;
  const isEditing = expenseId !== undefined;

  // estado único do formulário
  const [form, setForm] = useState(() => {
    const expense = expenses.find((item) => item.id === expenseId);
    if (expense) {
      return {
        description: expense.description,
        amount: expense.amount.toFixed(2),
        date: expense.date,
        category: expense.category,
      };
    }
    return { description: '', amount: '', date: new Date(), category: '' };
  });
  const [submitted, setSubmitted] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  // depois da primeira tentativa de salvar, os erros são recalculados a cada alteração
  const errors = submitted ? validate(form) : {};

  useLayoutEffect(() => {
    navigation.setOptions({ title: isEditing ? 'Editar despesa' : 'Nova despesa' });
  }, [navigation, isEditing]);

  function handleChange(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  // aceita só números com até 2 casas decimais; a vírgula vira ponto
  function handleAmountChange(text) {
    const normalized = text.replace(',', '.');
    if (/^\d*\.?\d{0,2}$/.test(normalized)) {
      handleChange('amount', normalized);
    }
  }

  function handleDateChange(event, selectedDate) {
    setShowDatePicker(Platform.OS === 'ios'); // no iOS o seletor continua aberto
    if (event.type === 'set' && selectedDate) {
      handleChange('date', selectedDate);
    }
  }

  function handleSubmit() {
    setSubmitted(true);
    if (Object.keys(validate(form)).length > 0) return;

    const data = {
      description: form.description.trim(),
      amount: parseFloat(form.amount),
      date: form.date,
      category: form.category,
    };

    if (isEditing) {
      updateExpense(expenseId, data);
    } else {
      addExpense(data);
    }
    navigation.goBack();
  }

  function handleDelete() {
    function confirmDelete() {
      deleteExpense(expenseId);
      navigation.goBack();
    }

    if (Platform.OS === 'web') {
      // Alert.alert não funciona no react-native-web; usa o confirm do navegador
      if (window.confirm('Deseja realmente excluir esta despesa?')) confirmDelete();
      return;
    }
    Alert.alert('Excluir despesa', 'Deseja realmente excluir esta despesa?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: confirmDelete },
    ]);
  }

  // borda vermelha no campo inválido
  function inputStyle(field) {
    return [
      styles.input,
      {
        color: colors.text,
        backgroundColor: colors.input,
        borderColor: errors[field] ? colors.danger : colors.border,
      },
    ];
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={{ backgroundColor: colors.background }}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Field label="Descrição" error={errors.description} colors={colors}>
          <TextInput
            style={inputStyle('description')}
            value={form.description}
            onChangeText={(text) => handleChange('description', text)}
            placeholder="Ex.: Almoço"
            placeholderTextColor={colors.textMuted}
          />
        </Field>

        <Field label="Valor (R$)" error={errors.amount} colors={colors}>
          <TextInput
            style={inputStyle('amount')}
            value={form.amount}
            onChangeText={handleAmountChange}
            keyboardType="decimal-pad"
            placeholder="0.00"
            placeholderTextColor={colors.textMuted}
          />
        </Field>

        <Field label="Data" error={errors.date} colors={colors}>
          {Platform.OS === 'web' ? (
            // o DateTimePicker nativo não existe na web: usa o seletor de data do navegador
            <input
              type="date"
              value={toDateInputValue(form.date)}
              onChange={(event) => {
                if (event.target.value) handleChange('date', fromDateInputValue(event.target.value));
              }}
              style={{
                width: '100%',
                boxSizing: 'border-box',
                padding: 10,
                fontSize: 16,
                borderRadius: 8,
                borderWidth: 1,
                borderStyle: 'solid',
                borderColor: errors.date ? colors.danger : colors.border,
                backgroundColor: colors.input,
                color: colors.text,
                colorScheme: scheme === 'dark' ? 'dark' : 'light',
              }}
            />
          ) : (
            <>
              <Pressable
                style={[inputStyle('date'), styles.pickerRow]}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={{ color: colors.text, fontSize: 16 }}>{formatDate(form.date)}</Text>
                <Ionicons name="calendar-outline" size={20} color={colors.textMuted} />
              </Pressable>
              {showDatePicker && (
                <DateTimePicker value={form.date} mode="date" onChange={handleDateChange} />
              )}
            </>
          )}
        </Field>

        <Field label="Categoria" error={errors.category} colors={colors}>
          <Pressable
            style={[inputStyle('category'), styles.pickerRow]}
            onPress={() => setShowCategoryModal(true)}
          >
            <Text style={{ color: form.category ? colors.text : colors.textMuted, fontSize: 16 }}>
              {form.category || 'Selecione uma categoria'}
            </Text>
            <Ionicons name="chevron-down" size={20} color={colors.textMuted} />
          </Pressable>
        </Field>

        <View style={styles.buttons}>
          <Pressable
            style={[styles.button, { backgroundColor: colors.chip }]}
            onPress={() => navigation.goBack()}
          >
            <Text style={{ color: colors.chipText }}>Cancelar</Text>
          </Pressable>
          <Pressable
            style={[styles.button, { backgroundColor: colors.primary }]}
            onPress={handleSubmit}
          >
            <Text style={{ color: colors.onPrimary, fontWeight: 'bold' }}>Salvar</Text>
          </Pressable>
        </View>

        {isEditing && (
          <Pressable
            style={[styles.deleteButton, { borderColor: colors.danger }]}
            onPress={handleDelete}
          >
            <Ionicons name="trash-outline" size={18} color={colors.danger} />
            <Text style={{ color: colors.danger, fontWeight: 'bold', marginLeft: 6 }}>Excluir</Text>
          </Pressable>
        )}
      </ScrollView>

      <CategoriaModal
        visible={showCategoryModal}
        selected={form.category}
        onSelect={(category) => {
          handleChange('category', category);
          setShowCategoryModal(false);
        }}
        onClose={() => setShowCategoryModal(false)}
      />
    </KeyboardAvoidingView>
  );
}

export default GerenciarDespesa;

const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: { padding: 16, paddingBottom: 32 },
  field: { marginBottom: 12 },
  label: { fontSize: 14, fontWeight: '600', marginBottom: 4 },
  input: { borderWidth: 1, borderRadius: 8, padding: 10, fontSize: 16 },
  pickerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  error: { fontSize: 13, marginTop: 4 },
  buttons: { flexDirection: 'row', justifyContent: 'flex-end', gap: 12, marginTop: 12 },
  button: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8 },
  deleteButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 10,
    marginTop: 24,
  },
});
