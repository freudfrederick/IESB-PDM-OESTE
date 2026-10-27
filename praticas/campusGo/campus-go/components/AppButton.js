import { Pressable, StyleSheet, Text } from 'react-native';

export default function AppButton({ title, onPress, variant = 'primary', disabled }) {
  const isPrimary = variant === 'primary';
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        isPrimary ? styles.primary : styles.secondary,
        (pressed || disabled) && styles.dimmed,
      ]}
    >
      <Text style={[styles.text, isPrimary ? styles.primaryText : styles.secondaryText]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { paddingVertical: 12, paddingHorizontal: 16, borderRadius: 10, alignItems: 'center' },
  primary: { backgroundColor: '#3b5bdb' },
  secondary: { backgroundColor: '#e7eaf6' },
  dimmed: { opacity: 0.6 },
  text: { fontSize: 16, fontWeight: '600' },
  primaryText: { color: '#fff' },
  secondaryText: { color: '#2b3a8c' },
});
