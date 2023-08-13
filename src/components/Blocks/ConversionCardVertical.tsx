import { Container, Theme } from 'UI'
import { ConversionCardVerticalStoryblok } from 'common/types'
import { styled } from 'lib/style'

import { ConversionCardContent } from './ConversionCardContent'

type ConversionCardVerticalProps = {
  block: ConversionCardVerticalStoryblok
}

export const ConversionCardVertical = ({
  block,
  ...props
}: ConversionCardVerticalProps): JSX.Element => {
  const theme = block.theme

  return (
    <Wrapper {...props}>
      <Container variant="xlwide" css={{ maxWidth: '57.5rem' }}>
        <Theme theme={block.block_configurations?.appearance_theme || theme}>
          <ConversionCardContent block={block} isReversed={false} />
        </Theme>
      </Container>
    </Wrapper>
  )
}

const Wrapper = styled('section', {
  py: '$20',

  '@md': {
    py: '$40',
  },
})
