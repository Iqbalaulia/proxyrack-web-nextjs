import { styled } from 'lib/style'

import { Box } from './Box'

export const Container = styled(Box, {
  width: '100%',

  mx: 'auto',
  px: '$20',

  variants: {
    variant: {
      full: {
        maxWidth: '100%',
      },
      xlwide: {
        '@sm': {
          px: '$20',
        },
        '@md': {
          px: '$24',
          maxWidth: '48rem',
        },
        '@lg': {
          px: '$48',
          maxWidth: '90rem',
        },
      },
      wide: {
        '@md': {
          px: '$28',
          maxWidth: '44.5rem',
        },
        '@lg': {
          px: '$48',
          maxWidth: '84rem',
        },
      },
      normal: {
        '@md': {
          px: '$56',
          maxWidth: '48rem',
        },
        '@lg': {
          px: '$96',
          maxWidth: '90rem',
        },
      },
      medium: {
        '@md': {
          maxWidth: '43.5rem',
        },
        '@lg': {
          maxWidth: '71rem',
        },
      },
      narrow: {
        '@md': {
          maxWidth: '41rem',
        },
        '@lg': {
          maxWidth: '68rem',
        },
      },
      tiny: {
        '@md': {
          px: '$56',
          maxWidth: '48rem',
        },
        '@lg': {
          maxWidth: '720px',
        },
      },
      tinyNoSpace: {
        px: '0px',
        mx: '0px',

        '@md': {
          maxWidth: '48rem',
        },
        '@lg': {
          maxWidth: '720px',
        },
      },
    },
  },

  defaultVariants: {
    variant: 'normal',
  },
})
