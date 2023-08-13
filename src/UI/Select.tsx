import { SelectHTMLAttributes } from 'react'

import { Box, Icon } from 'UI'
import { CSS, styled } from 'lib/style'

type InputSelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  containerStyle?: Omit<CSS, 'position'>
} & React.ComponentProps<typeof StyledSelect>

export const Select = ({
  children,
  variant = 'default',
  containerStyle,
  ...props
}: InputSelectProps): JSX.Element => {
  return (
    <Box css={{ ...containerStyle, position: 'relative' }}>
      <StyledSelect variant={variant} {...props}>
        {children}
      </StyledSelect>
      <IconHolder
        css={{
          color: '$textSecondary',
          position: 'absolute',
        }}
        variant={variant}
      >
        <Icon icon="chevron-down" />
      </IconHolder>
    </Box>
  )
}

const StyledSelect = styled('select', {
  appearance: 'none',

  width: '100%',

  pl: '$8',
  pr: '$24',
  py: '$4',

  borderRadius: '$sm',

  fontSize: '$sm',
  fontWeight: '$normal',

  height: '$md',

  color: '$textPrimary',
  backgroundColor: '$mutedSoft',

  '&:focus-visible': {
    outline: 'none',
    boxShadow: '0px 0px 0px 3px $colors$mutedSoft',
  },

  '&::placeholder': {
    color: '$textSecondary',
  },

  variants: {
    variant: {
      default: {
        border: '1px solid $muted',
      },
      medium: {
        border: 'none',

        px: '$12',

        height: '$lg',
      },
    },
  },

  defaultVariants: {
    variant: 'default',
  },
})

const IconHolder = styled(Box, {
  height: '$sm',

  top: '50%',
  transform: 'translateY(-50%)',

  variants: {
    variant: {
      default: {
        right: '$4',
      },
      medium: {
        right: '$8',
      },
    },
  },

  defaultVariants: {
    variant: 'default',
  },
})
