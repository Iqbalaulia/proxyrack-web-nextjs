import { Container, Theme } from 'UI'
import { ConversionCardHorizontalStoryblok } from 'common/types'
import { styled } from 'lib/style'

import { ConversionCardContent } from './ConversionCardContent'

type ConversionCardHorizontalProps = {
  block: ConversionCardHorizontalStoryblok
}

export const ConversionCardHorizontal = ({
  block,
  ...props
}: ConversionCardHorizontalProps): JSX.Element => {
  const theme = block.theme

  return (
    <Wrapper {...props}>
      <StyledContainer variant="xlwide">
        <Theme theme={block.block_configurations?.appearance_theme || theme}>
          <ConversionCardContent block={block} isReversed={true} />
        </Theme>
      </StyledContainer>
    </Wrapper>
  )
}

const Wrapper = styled('section', {
  py: '$20',

  '@md': {
    py: '$40',
  },
})

const StyledContainer = styled(Container, {})
