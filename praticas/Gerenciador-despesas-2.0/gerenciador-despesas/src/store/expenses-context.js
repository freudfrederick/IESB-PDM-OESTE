import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@expenses';

const ExpensesContext = createContext(null);

// Toda ação devolve um NOVO array: nada de push/splice no estado
function expensesReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [action.payload, ...state];
    case 'UPDATE':
      return state.map((expense) =>
        expense.id === action.payload.id ? { ...expense, ...action.payload.data } : expense
      );
    case 'DELETE':
      return state.filter((expense) => expense.id !== action.payload);
    case 'SET':
      return action.payload;
    default:
      return state;
  }
}

function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

// JSON.stringify transforma Date em texto; aqui a data volta a ser um Date
function parseStoredExpenses(json) {
  const parsed = JSON.parse(json);
  if (!Array.isArray(parsed)) return [];
  return parsed
    .filter((item) => item && item.id && typeof item.description === 'string')
    .map((item) => ({ ...item, amount: Number(item.amount), date: new Date(item.date) }));
}

export function ExpensesContextProvider({ children }) {
  const [expenses, dispatch] = useReducer(expensesReducer, []);
  // Enquanto false, o app ainda não leu o AsyncStorage e não pode gravar a lista vazia por cima
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function loadExpenses() {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          dispatch({ type: 'SET', payload: parseStoredExpenses(stored) });
        }
      } catch (error) {
        console.warn('Não foi possível carregar as despesas salvas.', error);
      } finally {
        setIsLoaded(true);
      }
    }
    loadExpenses();
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    async function saveExpenses() {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
      } catch (error) {
        console.warn('Não foi possível salvar as despesas.', error);
      }
    }
    saveExpenses();
  }, [expenses, isLoaded]);

  const addExpense = useCallback((data) => {
    dispatch({ type: 'ADD', payload: { id: generateId(), ...data } });
  }, []);

  const updateExpense = useCallback((id, data) => {
    dispatch({ type: 'UPDATE', payload: { id, data } });
  }, []);

  const deleteExpense = useCallback((id) => {
    dispatch({ type: 'DELETE', payload: id });
  }, []);

  const clearExpenses = useCallback(() => {
    dispatch({ type: 'SET', payload: [] });
  }, []);

  const value = useMemo(
    () => ({ expenses, isLoaded, addExpense, updateExpense, deleteExpense, clearExpenses }),
    [expenses, isLoaded, addExpense, updateExpense, deleteExpense, clearExpenses]
  );

  return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>;
}

export function useExpenses() {
  const context = useContext(ExpensesContext);
  if (!context) {
    throw new Error('useExpenses deve ser usado dentro de um ExpensesContextProvider.');
  }
  return context;
}
