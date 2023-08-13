import React from 'react'

import { Container, Text } from 'UI'
import { PreFooterStoryblok } from 'common/types'
import { ButtonBlock } from 'components/Blocks/ButtonBlock'
import { styled } from 'lib/style'

import { CMSLink } from './CMSLink'

type PrefooterProps = {
  content: PreFooterStoryblok
}

const Prefooter: React.FC<PrefooterProps> = ({ content }) => {
  const hasButton = content.button_link && content.button_text
  const newButton = content.button_new?.[0]

  return (
    <Wrapper>
      <Container>
        <InnerWrapper>
          {content.title && (
            <StyledText variant="title">{content.title}</StyledText>
          )}
          {newButton ? (
            <ButtonBlock block={newButton} />
          ) : (
            hasButton && (
              <CMSLink
                href={content.button_link}
                linkStyle={{
                  type: 'button',
                  variant: 'secondary',
                }}
              >
                {content.button_text}
              </CMSLink>
            )
          )}
        </InnerWrapper>
        {content.image.filename && (
          <ImageWrapper
            css={{ backgroundImage: `url(${content.image.filename})` }}
          />
        )}
      </Container>
    </Wrapper>
  )
}

export default Prefooter

const Wrapper = styled('section', {
  position: 'relative',

  display: 'flex',
  flexDirection: 'column',

  width: '100%',
  height: '100%',

  pt: '$64',
  pb: '$32',
})

const ImageWrapper = styled('div', {
  width: '100%',
  height: '32.3125rem',

  maxWidth: '78rem',
  maxHeight: '32.3125rem',

  backgroundSize: '500% auto',
  backgroundPosition: 'bottom 0 right -400px',
  backgroundRepeat: 'no-repeat',

  borderRadius: '$md',

  '@md': {
    height: '32.375rem',
    maxHeight: '32.375rem',
    backgroundSize: '200% auto',
    backgroundPosition: 'bottom right',
  },

  '@lg': {
    backgroundSize: 'cover',
    height: '17.875rem',
    maxHeight: '17.875rem',
  },
})

const InnerWrapper = styled('div', {
  position: 'absolute',

  pt: '$40',
  px: '$20',

  '@md': {
    py: '$56',
    px: '$56',
  },

  '@lg': {
    py: '$64',
    pl: '4.5rem',
  },
})

const StyledText = styled(Text, {
  maxWidth: '28rem',

  color: '$textTertiary',

  mb: '$32',
})
