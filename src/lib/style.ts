import { createCss, StitchesCss } from '@stitches/react'

const toRem = (px: number) => px / 16 + 'rem'

export const space = {
  0: '0',
  1: toRem(1),
  2: toRem(2),
  4: toRem(4),
  6: toRem(6),
  8: toRem(8),
  10: toRem(10),
  12: toRem(12),
  14: toRem(14),
  16: toRem(16),
  20: toRem(20),
  24: toRem(24),
  26: toRem(26),
  28: toRem(28),
  32: toRem(32),
  36: toRem(36),
  38: toRem(38),
  40: toRem(40),
  42: toRem(42),
  48: toRem(48),
  56: toRem(56),
  60: toRem(60),
  64: toRem(64),
  80: toRem(80),
  88: toRem(88),
  96: toRem(96),
  114: toRem(114),
  120: toRem(120),
  128: toRem(128),
} as const

const palette = {
  gray10: 'hsla(0, 0%, 100%, 1)',
  gray50: 'hsla(180, 4%, 99%, 1)',
  gray100: 'hsla(180, 5%, 96%, 1)',
  gray200: 'hsla(216, 7%, 86%, 1)',
  gray300: 'hsla(218, 7%, 77%, 1)',
  gray400: 'hsla(220, 7%, 67%, 1)',
  gray500: 'hsla(221, 7%, 58%, 1)',
  gray600: 'hsla(219, 8%, 48%, 1)',
  gray700: 'hsla(220, 12%, 39%, 1)',
  gray800: 'hsla(220, 18%, 29%, 1)',
  gray900: 'hsla(221, 31%, 20%, 1)',
  brand10: 'hsla(250, 60%, 98%, 1)',
  brand50: 'hsla(252, 40%, 96%, 1)',
  brand100: 'hsla(251, 41%, 92%, 1)',
  brand200: 'hsla(252, 58%, 88%, 1)',
  brand300: 'hsla(253, 59%, 71%, 1)',
  brand400: 'hsla(253, 58%, 59%, 1)',
  brand500: 'hsla(253, 66%, 47%, 1)',
  brand600: 'hsla(253, 65%, 44%, 1)',
  brand700: 'hsla(253, 64%, 42%, 1)',
  brand800: 'hsla(253, 63%, 39%, 1)',
  brand900: 'hsla(253, 61%, 36%, 1)',
  red: 'hsla(4, 71%, 50%, 1)',
}

const light = {
  background: '$brand10',
  panel: '$gray10',
  textPrimary: '$gray900',
  textSecondary: '$gray700',
  textTertiary: '$gray10',
  primary: '$brand500',
  secondary: '$brand500',
  tertiary: '$brand200',
  accent: '$brand900',
  accentSoft: '$brand400',
  muted: '$brand100',
  mutedSoft: '$brand50',
}

const dark = {
  background: '$gray900',
  panel: '$gray800',
  textPrimary: '$gray10',
  textSecondary: '$gray100',
  textTertiary: '$gray100',
  primary: '$brand400',
  secondary: '$gray10',
  tertiary: '$brand400',
  accent: '$brand900',
  accentSoft: '$brand500',
  muted: '$gray700',
  mutedSoft: '$gray800',
}

type SpaceValue = `$${keyof typeof space}` | (string & Record<never, never>)

const stitchesConfig = createCss({
  theme: {
    colors: {
      ...palette,
      ...light,
    },
    fonts: {
      sans: '"ABC Whyte", -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji',
    },
    fontWeights: {
      normal: '400',
      bold: '600',
    },
    fontSizes: {
      xs: toRem(12),
      sm: toRem(16),
      md: toRem(18),
      lg: toRem(24),
      xlg: toRem(32),
      xl: toRem(40),
      xxl: toRem(64),
    },
    lineHeights: {
      none: '1',
      tight: 1.1,
      xsmall: 1.125,
      small: 1.25,
      normal: 1.333,
      medium: 1.375,
      big: 1.5,
    },
    letterSpacings: {
      xs: toRem(0.18),
      sm: toRem(-0.18),
      md: toRem(-0.22),
      lg: toRem(-0.24),
      xlg: toRem(-0.3),
      xxlg: toRem(-0.36),
      xl: toRem(-0.44),
      xxl: toRem(-0.7),
    },
    space,
    sizes: {
      none: 0,
      md: toRem(32),
      sm: toRem(24),
      lg: toRem(40),
    },
    radii: {
      none: 0,
      xs: toRem(2),
      sm: toRem(4),
      md: toRem(8),
      pill: '99999px',
      full: '100%',
    },
    zIndices: {
      1: 100,
      2: 200,
      3: 300,
      4: 400,
      max: 999,
    },
    transitions: {
      appearance: '0.2s ease',
      motion: '0.3s cubic-bezier(0.2, 1, 0.2, 1)',
    },
    shadows: {
      focus: '0px 0px 0px 3px $colors$brand100',
      soft: '0px 10px 20px rgba(0, 0, 0, 0.04), 0px 2px 6px rgba(0, 0, 0, 0.04), 0px 0px 1px rgba(0, 0, 0, 0.04)',
      heavy:
        '0 1px 2px rgba(0,0,0,0.05), 0 1px 4px rgba(0,0,0,0.05), 0 2px 6px rgba(0,0,0,0.05), 0 10px 20px rgba(0,0,0,0.05)',
    },
  },
  media: {
    sm: '(min-width: 30em)',
    md: '(min-width: 48em)',
    lg: '(min-width: 62em)',
    xl: '(min-width: 80em)',
    xxl: '(min-width: 160.5em)',
    hover: '(hover: hover)',
  },
  utils: {
    m: () => (value: SpaceValue) => ({
      margin: value,
    }),
    mt: () => (value: SpaceValue) => ({
      marginTop: value,
    }),
    mr: () => (value: SpaceValue) => ({
      marginRight: value,
    }),
    mb: () => (value: SpaceValue) => ({
      marginBottom: value,
    }),
    ml: () => (value: SpaceValue) => ({
      marginLeft: value,
    }),
    mx: () => (value: SpaceValue) => ({
      marginLeft: value,
      marginRight: value,
    }),
    my: () => (value: SpaceValue) => ({
      marginTop: value,
      marginBottom: value,
    }),
    p: () => (value: SpaceValue) => ({
      padding: value,
    }),
    pt: () => (value: SpaceValue) => ({
      paddingTop: value,
    }),
    pr: () => (value: SpaceValue) => ({
      paddingRight: value,
    }),
    pb: () => (value: SpaceValue) => ({
      paddingBottom: value,
    }),
    pl: () => (value: SpaceValue) => ({
      paddingLeft: value,
    }),
    px: () => (value: SpaceValue) => ({
      paddingLeft: value,
      paddingRight: value,
    }),
    py: () => (value: SpaceValue) => ({
      paddingTop: value,
      paddingBottom: value,
    }),
  },
})

export const { styled, css, global, keyframes, getCssString, theme } =
  stitchesConfig

export const lightTheme = theme('proxyrack-light', {
  colors: light,
})

export const lightThemeForBlock = theme('proxyrack-light-for-block', {
  colors: { ...light, background: 'white' },
})

export const transparentThemeForBlock = theme(
  'proxyrack-transparent-for-block',
  {
    colors: { ...light, background: '#00000000', panel: '#00000000' },
  }
)

export const darkTheme = theme('proxyrack-dark', {
  colors: dark,
})

export type CSS = StitchesCss<typeof stitchesConfig>
