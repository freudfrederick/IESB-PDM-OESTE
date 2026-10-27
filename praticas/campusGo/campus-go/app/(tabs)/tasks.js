import { Link, router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import AppButton from '../../components/AppButton';
import DoneIcon from '../../components/DoneIcon';
import { showAlert } from '../../services/alert';
import { getCurrentPlace } from '../../services/location';
import { scheduleReminder } from '../../services/notifications';

export default function TasksScreen() {
  const [place, setPlace] = useState(null);
  const [doneCount, setDoneCount] = useState(0);

  async function handleCheckIn() {
    try {
      const current = await getCurrentPlace();
      if (!current) {
        showAlert('Localização negada', 'Sem permissão não é possível registrar onde você estudou.');
        return;
      }
      setPlace(current);
    } catch (error) {
      showAlert('Não foi possível obter a localização', 'Verifique se o GPS está ligado e tente de novo.');
    }
  }

  async function handleReminder() {
    try {
      const id = await scheduleReminder('Hora de estudar!', 10);
      if (!id) {
        showAlert('Notificações negadas', 'Libere as notificações nos ajustes para receber o lembrete.');
        return;
      }
      showAlert('Lembrete agendado', 'Você receberá uma notificação em 10 segundos.');
    } catch (error) {
      showAlert('Não foi possível agendar o lembrete', 'Este recurso funciona no aplicativo, não no navegador.');
    }
  }

  async function handleComplete() {
    try {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (error) {
      // sem vibração (emulador ou navegador): o app segue normalmente
    }
    setDoneCount((count) => count + 1);
    showAlert('Tarefa concluída', 'Bom trabalho!');
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.section}>Navegação</Text>
      <Link href="/new-task" asChild>
        <Pressable style={styles.link}>
          <Text style={styles.linkText}>Nova tarefa</Text>
        </Pressable>
      </Link>
      <AppButton title="Abrir tarefa 42" variant="secondary" onPress={() => router.push('/task/42')} />

      <Text style={styles.section}>Check-in</Text>
      <AppButton title="Estudei aqui" onPress={handleCheckIn} />
      {place ? <Text style={styles.place}>{place.label}</Text> : null}

      <Text style={styles.section}>Lembrete</Text>
      <AppButton title="Lembrar em 10 s" onPress={handleReminder} />

      <Text style={styles.section}>Conclusão</Text>
      <View style={styles.row}>
        <View style={styles.grow}>
          <AppButton title="Concluir" onPress={handleComplete} />
        </View>
        <DoneIcon trigger={doneCount} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#f4f5f9' },
  content: { padding: 16, gap: 12 },
  section: { marginTop: 8, fontSize: 13, fontWeight: '700', color: '#6b7080', textTransform: 'uppercase' },
  link: { paddingVertical: 12, paddingHorizontal: 16, borderRadius: 10, alignItems: 'center', backgroundColor: '#3b5bdb' },
  linkText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  place: { fontSize: 15, color: '#1c1e2b', backgroundColor: '#fff', padding: 12, borderRadius: 10 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  grow: { flex: 1 },
});
