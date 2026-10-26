import { Platform } from 'react-native';

export const themes = {
  light: {
    background: '#f4f5f9',
    card: '#ffffff',
    text: '#1c1f2e',
    textMuted: '#6b7085',
    primary: '#3b5bdb',
    onPrimary: '#ffffff',
    border: '#c5c9d6',
    input: '#ffffff',
    chip: '#e3e6ef',
    chipText: '#2b2f40',
    summary: '#dbe4ff',
    danger: '#e03131',
    overlay: 'rgba(0, 0, 0, 0.45)',
  },
  dark: {
    background: '#12131a',
    card: '#1f2130',
    text: '#eceef7',
    textMuted: '#9ea3b8',
    primary: '#748ffc',
    onPrimary: '#10131f',
    border: '#3a3e55',
    input: '#1a1c28',
    chip: '#2d3046',
    chipText: '#dfe2f0',
    summary: '#262a45',
    danger: '#ff6b6b',
    overlay: 'rgba(0, 0, 0, 0.65)',
  },
};

// Recebe o valor de useColorScheme() e devolve a paleta correspondente
export function getTheme(colorScheme) {
  return colorScheme === 'dark' ? themes.dark : themes.light;
}

// Sombra por plataforma: iOS usa shadow*, Android usa elevation e a web usa boxShadow
export const cardShadow = Platform.select({
  ios: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  android: { elevation: 4 },
  default: { boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)' },
});
