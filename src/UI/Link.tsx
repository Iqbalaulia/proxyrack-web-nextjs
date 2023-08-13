import React, { AnchorHTMLAttributes, forwardRef, Ref } from 'react'

import { Box } from 'UI'
import { styled } from 'lib/style'

import { Icon, IconOptions } from './Icon/Icon'

export type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> &
  React.ComponentProps<typeof StyledLink> & {
    icon?: IconOptions
    variant?: 'default' | 'underline' | 'icon'
    iconVariant?: 'transition' | 'noTransition'
  }

export const Link = forwardRef(function Link(
  {
    icon,
    variant = 'default',
    children,
    iconVariant = 'transition',
    ...props
  }: LinkProps,
  ref: Ref<HTMLAnchorElement>
): JSX.Element {
  return (
    <StyledLink variant={variant} ref={ref} {...props}>
      {children}
      {icon && (
        <IconHolder variant={iconVariant}>
          <Icon icon={icon} />
        </IconHolder>
      )}
    </StyledLink>
  )
})

const StyledLink = styled('a', {
  cursor: 'pointer',

  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',

  color: '$textPrimary',
  transition: 'color $appearance',

  outline: 'none',

  '@hover': {
    '&:hover': {
      color: '$primary',
    },
  },

  '&:active': {
    color: '$textSecondary',
  },

  '&:focus-visible': {
    color: '$textPrimary',
  },

  variants: {
    variant: {
      default: {},
      icon: {
        color: '$secondary',

        '&:active': {
          color: '$accentSoft',
        },

        '&:focus-visible': {
          color: '$primary',
        },
      },
      underline: {
        textDecoration: 'underline',

        color: '$textSecondary',

        '@hover': {
          '&:hover': {
            color: '$tertiary',
          },
        },

        '&:active': {
          color: '$textSecondary',
        },

        '&:focus-visible': {
          color: '$textPrimary',
        },
      },
    },
  },
})

const IconHolder = styled(Box, {
  pl: '$6',

  display: 'inline-flex',

  transition: 'transform $motion',

  variants: {
    variant: {
      transition: {
        [`${StyledLink}:hover &`]: {
          transform: 'translateX($space$6)',
        },
      },
      noTransition: {
        [`${StyledLink}:hover &`]: {
          transform: 'none',
        },
      },
    },
  },
})
