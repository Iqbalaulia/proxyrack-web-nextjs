import { styled } from 'lib/style'

import { Box } from './Box'
import { Theme } from './Theme'

type CardProps = {
  variant: 'primary' | 'secondary'
}

export const LightCard: React.FC<CardProps> = ({ children, ...props }) => {
  return (
    <Theme theme="light">
      <Card {...props}>{children}</Card>
    </Theme>
  )
}

export const Card = styled(Box, {
  borderRadius: '$sm',
  boxShadow: '$soft',

  backgroundColor: '$panel',
  color: '$textPrimary',

  variants: {
    hasBorder: {
      true: {
        border: '1px solid $muted',
      },
    },
  },
})
