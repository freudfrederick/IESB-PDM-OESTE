import { useEffect, useRef } from 'react';
import { Animated, Platform } from 'react-native';

// Faz o conteúdo surgir: opacidade de 0 a 1 e uma subida leve. Usa só o Animated do React Native.
export default function FadeIn({ children, delay = 0, duration = 400, style }) {
  const opacity = useRef(new Animated.Value(0)).current;
  const offset = useRef(new Animated.Value(12)).current;

  useEffect(() => {
    const useNativeDriver = Platform.OS !== 'web';
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration, delay, useNativeDriver }),
      Animated.timing(offset, { toValue: 0, duration, delay, useNativeDriver }),
    ]).start();
  }, [opacity, offset, delay, duration]);

  return (
    <Animated.View style={[style, { opacity, transform: [{ translateY: offset }] }]}>
      {children}
    </Animated.View>
  );
}
