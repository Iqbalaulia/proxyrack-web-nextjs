import { styled } from 'lib/style'

export const Text = styled('p', {
  variants: {
    variant: {
      caps: {
        fontSize: '$xs',
        fontWeight: '$bold',
        lineHeight: '$big',
        textTransform: 'uppercase',
        letterSpacing: '$xs',
      },
      small: {
        fontSize: '$sm',
        lineHeight: '$medium',
        letterSpacing: '$md',
      },
      'small-tight': {
        fontSize: '$sm',
        lineHeight: '$big',
        letterSpacing: '$sm',
      },
      body: {
        fontSize: '$sm',
        lineHeight: '$medium',
        letterSpacing: '$md',
        '@md': {
          fontSize: '$md',
          lineHeight: '$normal',
          letterSpacing: '$lg',
        },
      },
      big: {
        fontSize: '$md',
        lineHeight: '$normal',
        letterSpacing: '$lg',
        '@md': {
          fontSize: '$lg',
          lineHeight: '$small',
          letterSpacing: '$xlg',
        },
      },
      title: {
        fontSize: '$xlg',
        lineHeight: '$xsmall',
        letterSpacing: '$xxlg',
        fontWeight: '$bold',
        '@md': {
          fontSize: '$xl',
          lineHeight: '$tight',
          letterSpacing: '$xl',
        },
      },
      huge: {
        fontSize: '$xl',
        lineHeight: '$tight',
        letterSpacing: '$xl',
        fontWeight: '$bold',
        '@md': {
          fontSize: '$xxl',
          lineHeight: '$tight',
          letterSpacing: '$xxl',
        },
      },
    },
    weight: {
      normal: {
        fontWeight: '$normal',
      },
      bold: {
        fontWeight: '$bold',
      },
    },
  },
  defaultVariants: {
    variant: 'body',
  },
})
