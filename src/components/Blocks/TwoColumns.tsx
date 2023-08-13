import NextImage from 'next/image'

import { Box, Container, Flex, Text } from 'UI'
import { TwoColumnsStoryblok } from 'common/types'
import { getImageAttributes } from 'common/utils/content'
import { CMSLink } from 'components/Shared/CMSLink'
import { styled } from 'lib/style'

import { ButtonBlock } from './ButtonBlock'
import { NewRichText } from './NewRichText'

type TwoColumnsProps = {
  block: TwoColumnsStoryblok
}

export const TwoColumns = ({
  block,
  ...props
}: TwoColumnsProps): JSX.Element => {
  const hasButton = block.button_link && block.button_text
  const newButton = block.button_new?.[0]

  const isReversed = block.layout === 'right'
  return (
    <Wrapper {...props}>
      <StyledContainer>
        <StyledFlex variant={isReversed ? 'twoColumn' : 'oneColumn'}>
          <WrapperContent>
            {block.title && (
              <Text
                as="h3"
                variant="big"
                weight="bold"
                css={{ color: '$textPrimary' }}
              >
                {block.title}
              </Text>
            )}
            {block.description && (
              <Text as="p" variant="body">
                <NewRichText
                  css={{
                    fontSize: 'inherit',
                    lineHeight: 'inherit',
                    letterSpacing: 'inherit',
                    mt: '$16',
                    color: '$textSecondary',
                  }}
                  document={
                    Array.isArray(block.description)
                      ? block.description?.[0]?.document
                      : block.description
                  }
                />
              </Text>
            )}
            {newButton ? (
              <Box>
                <ButtonBlock block={newButton} css={{ mt: '$32' }} />
              </Box>
            ) : (
              hasButton && (
                <Box>
                  <CMSLink
                    href={block.button_link}
                    linkStyle={{
                      type: 'button',
                      variant: 'ghost',
                    }}
                    css={{ mt: '$32' }}
                  >
                    {block.button_text}
                  </CMSLink>
                </Box>
              )
            )}
          </WrapperContent>
        </StyledFlex>
        {block.image && block.image.filename && (
          <StyledBox variant={isReversed ? 'oneColumn' : 'twoColumn'}>
            <ImageWrapper>
              <NextImage
                {...getImageAttributes(block.image)}
                objectFit="cover"
                quality="100"
                priority
                width={getImageAttributes(block.image).width}
                height={getImageAttributes(block.image).height}
              />
            </ImageWrapper>
          </StyledBox>
        )}
      </StyledContainer>
    </Wrapper>
  )
}

const Wrapper = styled('section', {
  background: '$background',
  color: '$textPrimary',
  pt: '$8',
  pb: '$40',

  '@md': {
    pt: '$24',
    pb: '$24',
  },

  '@lg': {
    pt: '$48',
    pb: '$32',
  },
})

const StyledContainer = styled(Container, {
  display: 'grid',
  gridTemplateColumns: 'repeat(1, 1fr)',

  '@md': {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
})

const StyledFlex = styled(Flex, {
  justifyContent: 'center',
  alignItems: 'center',

  gridRow: '2',
  gridColumn: '1',

  variants: {
    variant: {
      oneColumn: {
        '@md': {
          gridRow: '1',
          gridColumn: '1',
        },
      },
      twoColumn: {
        '@md': {
          gridRow: '1',
          gridColumn: '2',
        },
      },
    },
  },
})

const StyledBox = styled(Box, {
  gridRow: '1',
  gridColumn: '1',

  mb: '$32',

  '@md': {
    mb: '$0',
  },

  variants: {
    variant: {
      oneColumn: {
        '@md': {
          gridColumn: '1',
        },
      },
      twoColumn: {
        '@md': {
          gridColumn: '2',
        },
      },
    },
  },
})

const ImageWrapper = styled('div', {
  img: {
    objectFit: 'cover',
    height: '100%',
    width: '100%',
    borderRadius: '$sm',
  },

  width: '100%',
  maxWidth: '38rem',
  position: 'relative',
  height: '100%',
})

const WrapperContent = styled(Flex, {
  flexDirection: 'column',
  maxWidth: 'unset',

  justifyContent: 'center',

  '@md': {
    maxWidth: '288px',
  },
})
