import { styled } from 'lib/style'

export const Button = styled('button', {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',

  appearance: 'none',
  border: 'none',
  backgroundColor: 'transparent',
  borderRadius: '$sm',
  p: '$8 $16',

  lineHeight: '$none',
  height: '$space$38',
  fontSize: '$sm',
  fontWeight: '$bold',

  cursor: 'pointer',
  outline: 'none',
  whiteSpace: 'nowrap',

  variants: {
    variant: {
      primary: {
        transition: 'background-color $appearance',
        backgroundColor: '$primary',
        color: '$textTertiary',
        '@hover': {
          '&:hover': {
            backgroundColor: '$accentSoft',
          },
        },
        '&:active': {
          backgroundColor: '$accent',
        },
        '&:disabled': {
          backgroundColor: '$mutedSoft',
          color: '$muted',
          cursor: 'not-allowed',
        },
        '&:focus-visible': {
          boxShadow: '$focus',
        },
      },
      ghost: {
        transition: 'background-color $appearance, color $appearance',
        color: '$secondary',
        border: '2px solid $tertiary',
        '@hover': {
          '&:hover': {
            backgroundColor: '$muted',
          },
        },
        '&:active': {
          backgroundColor: '$tertiary',
        },
        '&:disabled': {
          backgroundColor: '$mutedSoft',
          color: '$muted',
          cursor: 'not-allowed',
        },
        '&:focus-visible': {
          backgroundColor: '$muted',
          border: '2px solid $secondary',
        },
      },
      secondary: {
        transition: 'opacity $appearance',
        backgroundColor: '$textTertiary',
        color: '$accent',
        '@hover': {
          '&:hover': {
            opacity: 0.75,
          },
        },
        '&:active': {
          opacity: 0.6,
        },
        '&:disabled': {
          backgroundColor: '$muted',
          color: '$mutedSoft',
          cursor: 'not-allowed',
        },
        '&:focus-visible': {
          opacity: 0.75,
        },
      },
    },
  },

  defaultVariants: {
    variant: 'primary',
  },
})
