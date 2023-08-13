import { styled } from 'lib/style'

export const Tag = styled('span', {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',

  borderRadius: '$sm',
  p: '$4 $8',

  lineHeight: '$none',
  height: '$space$26',
  fontSize: '$xs',
  fontWeight: '$bold',
  textTransform: 'uppercase',
  whiteSpace: 'nowrap',

  variants: {
    variant: {
      primary: {
        backgroundColor: '$tertiary',
        color: '$secondary',
      },
      secondary: {
        backgroundColor: '$primary',
        color: '$textTertiary',
      },
    },
  },

  defaultVariants: {
    variant: 'primary',
  },
})
