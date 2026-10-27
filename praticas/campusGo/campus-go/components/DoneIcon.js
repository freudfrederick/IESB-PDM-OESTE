import { Ionicons } from '@expo/vector-icons';
import { useEffect } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withSpring } from 'react-native-reanimated';

// Bônus: o ícone "pula" quando a tarefa é concluída (withSequence + withSpring do Reanimated)
export default function DoneIcon({ trigger }) {
  const scale = useSharedValue(1);

  useEffect(() => {
    if (!trigger) return;
    scale.value = withSequence(withSpring(1.6), withSpring(1));
  }, [trigger, scale]);

  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <Animated.View style={animatedStyle}>
      <Ionicons name="checkmark-circle" size={36} color="#2f9e44" />
    </Animated.View>
  );
}
