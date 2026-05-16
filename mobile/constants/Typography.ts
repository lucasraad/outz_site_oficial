import { Platform, TextStyle } from 'react-native';

import { Colors } from './Colors';

const fontFamily = Platform.select({
  ios: 'System',
  android: 'Roboto',
  default: 'System',
});

/** Escala tipográfica mobile OUTz */
export const fontSize = {
  display: 32,
  h1: 24,
  h2: 20,
  h3: 18,
  body: 16,
  bodySmall: 14,
  caption: 12,
  button: 14,
  tab: 14,
} as const;

export const lineHeight = {
  display: 38,
  h1: 30,
  h2: 26,
  h3: 24,
  body: 24,
  bodySmall: 20,
  caption: 16,
  button: 17,
  tab: 17,
} as const;

export const fontWeight = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
};

export const letterSpacing = {
  label: 0.8,
  button: 0.5,
};

/** Estilos reutilizáveis (quando className não basta) */
export const Typography = {
  display: {
    fontFamily,
    fontSize: fontSize.display,
    lineHeight: lineHeight.display,
    fontWeight: fontWeight.bold,
    color: Colors.textPrimary,
  },
  h1: {
    fontFamily,
    fontSize: fontSize.h1,
    lineHeight: lineHeight.h1,
    fontWeight: fontWeight.bold,
    color: Colors.textPrimary,
  },
  h2: {
    fontFamily,
    fontSize: fontSize.h2,
    lineHeight: lineHeight.h2,
    fontWeight: fontWeight.bold,
    color: Colors.textPrimary,
  },
  h3: {
    fontFamily,
    fontSize: fontSize.h3,
    lineHeight: lineHeight.h3,
    fontWeight: fontWeight.semibold,
    color: Colors.textPrimary,
  },
  body: {
    fontFamily,
    fontSize: fontSize.body,
    lineHeight: lineHeight.body,
    fontWeight: fontWeight.regular,
    color: Colors.textPrimary,
  },
  bodySmall: {
    fontFamily,
    fontSize: fontSize.bodySmall,
    lineHeight: lineHeight.bodySmall,
    fontWeight: fontWeight.regular,
    color: Colors.textSecondary,
  },
  caption: {
    fontFamily,
    fontSize: fontSize.caption,
    lineHeight: lineHeight.caption,
    fontWeight: fontWeight.regular,
    color: Colors.textSecondary,
  },
  labelCaps: {
    fontFamily,
    fontSize: fontSize.caption,
    lineHeight: lineHeight.caption,
    fontWeight: fontWeight.bold,
    color: Colors.textPrimary,
    letterSpacing: letterSpacing.label,
    textTransform: 'uppercase',
  },
  buttonCaps: {
    fontFamily,
    fontSize: fontSize.button,
    lineHeight: lineHeight.button,
    fontWeight: fontWeight.semibold,
    letterSpacing: letterSpacing.button,
    textTransform: 'uppercase',
  },
  tab: {
    fontFamily,
    fontSize: fontSize.tab,
    lineHeight: lineHeight.tab,
    fontWeight: fontWeight.semibold,
  },
} satisfies Record<string, TextStyle>;

export default Typography;
