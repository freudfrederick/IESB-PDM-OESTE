import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ExpensesContextProvider } from '../store/expenses-context';

// Layout raiz: o Provider envolve o Stack, então todas as telas leem as despesas
export default function RootLayout() {
  return (
    <ExpensesContextProvider>
      <StatusBar style="dark" />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="task/[id]" options={{ title: 'Tarefa' }} />
        <Stack.Screen name="new-task" options={{ title: 'Nova tarefa', presentation: 'modal' }} />
      </Stack>
    </ExpensesContextProvider>
  );
}
