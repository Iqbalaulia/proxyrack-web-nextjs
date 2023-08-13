import { styled } from 'lib/style'

export const Divider = styled('hr', {
  border: 'none',

  variants: {
    variant: {
      primary: {
        backgroundColor: '$mutedSoft',
      },
      secondary: {
        backgroundColor: '$muted',
      },
      tertiary: {
        backgroundColor: '$gray200',
      },
    },

    orientation: {
      horizontal: {
        width: '100%',
        height: '$space$1',
      },
      vertical: {
        width: '100%',
        height: '$space$1',

        '@md': {
          width: '$space$1',
          height: '100%',
          margin: '$0',
        },
      },
    },
  },

  defaultVariants: {
    variant: 'primary',
    orientation: 'horizontal',
  },
})
