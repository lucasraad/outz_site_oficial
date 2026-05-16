import { DefaultTheme, type Theme } from '@react-navigation/native';

/**
 * Paleta OUTz — extraída da identidade visual (logo + mocks mobile).
 * Fonte única de verdade para valores hex/rgba usados fora do Tailwind.
 */
export const Colors = {
  primary: '#FF541B',
  primaryDark: '#E04A15',
  primaryLight: '#FF671B',
  primaryMuted: 'rgba(255, 84, 27, 0.12)',

  background: '#FFFFFF',
  backgroundWarm: '#FFF9F9',

  surfaceDark: '#1B1B1B',
  surfaceElevated: '#FEFEFE',

  textPrimary: '#1B1B1B',
  textSecondary: '#666666',
  textOnDark: '#FFFFFF',
  textOnPrimary: '#FFFFFF',

  border: 'rgba(27, 27, 27, 0.35)',
  divider: 'rgba(0, 0, 0, 0.08)',

  success: '#22C55E',
  error: '#EF4444',
  info: '#0D1B2A',

  overlayDark: 'rgba(0, 0, 0, 0.55)',
  overlayGradientEnd: 'rgba(0, 0, 0, 0.75)',

  tabIconDefault: '#999999',
  tabIconActive: '#FF541B',
} as const;

export type ColorToken = keyof typeof Colors;

/** Tema de navegação (React Navigation) alinhado à marca */
export const NavigationTheme: Theme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.primary,
    background: Colors.background,
    card: Colors.background,
    text: Colors.textPrimary,
    border: Colors.divider,
    notification: Colors.primary,
  },
};

export default Colors;
