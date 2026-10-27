import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

function tabIcon(name) {
  return ({ color, size }) => <Ionicons name={name} size={size} color={color} />;
}

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#3b5bdb' }}>
      <Tabs.Screen name="index" options={{ title: 'Início', tabBarIcon: tabIcon('home') }} />
      <Tabs.Screen name="tasks" options={{ title: 'Tarefas', tabBarIcon: tabIcon('checkbox') }} />
      <Tabs.Screen name="wallet" options={{ title: 'Bolso', tabBarIcon: tabIcon('wallet') }} />
      <Tabs.Screen name="profile" options={{ title: 'Perfil', tabBarIcon: tabIcon('person') }} />
    </Tabs>
  );
}
