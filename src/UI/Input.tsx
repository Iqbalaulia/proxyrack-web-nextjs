import { InputHTMLAttributes } from 'react'

import { Box, Icon } from 'UI'
import { CSS, styled } from 'lib/style'

import { IconOptions } from './Icon/Icon'

type InputSearchProps = InputHTMLAttributes<HTMLInputElement> & {
  icon?: IconOptions
  containerStyle?: Omit<CSS, 'position'>
} & React.ComponentProps<typeof StyledInput>

export const Input = ({
  icon,
  containerStyle,
  ...props
}: InputSearchProps): JSX.Element => {
  return (
    <Box css={{ ...containerStyle, position: 'relative' }}>
      <StyledInput variant={icon ? 'icon' : 'default'} {...props} />
      {icon && (
        <Box
          css={{
            color: '$textPrimary',
            position: 'absolute',
            top: '$4',
            left: '$4',
          }}
        >
          <Icon icon={icon} />
        </Box>
      )}
    </Box>
  )
}

const StyledInput = styled('input', {
  appearance: 'none',

  outline: 'none',

  width: '100%',

  pr: '$16',
  py: '$4',

  borderRadius: '$sm',
  border: '1px solid $muted',

  fontSize: '$sm',
  fontWeight: '$normal',

  height: '$md',

  color: '$textPrimary',
  backgroundColor: '$mutedSoft',

  '&:focus-visible': {
    boxShadow: '0px 0px 0px 3px $colors$mutedSoft',
  },

  '&::placeholder': {
    color: '$textSecondary',
  },

  variants: {
    variant: {
      default: {
        pl: '$16',
      },
      icon: {
        pl: '$32',
      },
    },
  },
})
