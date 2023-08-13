import NextImage from 'next/image'

import { Box, Container, Flex, Tag, Text } from 'UI'
import { DataPointsStoryblok } from 'common/types'
import { getImageAttributes } from 'common/utils/content'
import { CMSRichTextField } from 'components/Shared/CMSRichTextField'
import { styled } from 'lib/style'

import { ButtonBlock } from './ButtonBlock'
import { Editable } from './Editable'

type DataPointsProps = {
  block: DataPointsStoryblok
}

export const DataPoints = ({
  block,
  ...props
}: DataPointsProps): JSX.Element => {
  const isReversed = block.layout === 'right'

  return (
    <Wrapper {...props}>
      <StyledContainer>
        <StyledFlex variant={isReversed ? 'twoColumn' : 'oneColumn'}>
          <ContentWrapper>
            {block.tag && (
              <Box>
                <Tag css={{ mb: '$24' }}>{block.tag}</Tag>
              </Box>
            )}
            {block.title && (
              <Text as="h3" variant="title" css={{ color: '$textPrimary' }}>
                {block.title}
              </Text>
            )}
            {block.description && (
              <StyledDescription as="p" variant="body">
                <CMSRichTextField
                  css={{
                    fontSize: 'inherit',
                    lineHeight: 'inherit',
                    letterSpacing: 'inherit',
                  }}
                  document={
                    Array.isArray(block.description)
                      ? block.description?.[0]?.document
                      : block.description
                  }
                />
              </StyledDescription>
            )}
            {block.data_points.length > 0 && (
              <Box
                css={{
                  mt: '$24',

                  '@md': {
                    mt: '$32',
                  },

                  '@lg': {
                    mt: '$56',
                  },
                }}
              >
                <WrapperPoints>
                  {block.data_points.map((point) => {
                    return (
                      <Editable key={point._uid} block={point}>
                        <Box>
                          <Text
                            as="h4"
                            variant="big"
                            weight="bold"
                            css={{ mb: '$8', color: '$brand400' }}
                          >
                            {point.value}
                          </Text>
                          <Text as="p" variant="small">
                            {point.city}
                          </Text>
                        </Box>
                      </Editable>
                    )
                  })}
                </WrapperPoints>
              </Box>
            )}
            {!!block.button?.length && <ButtonBlock block={block.button[0]} />}
          </ContentWrapper>
        </StyledFlex>
        {block.image && block.image.filename && (
          <StyledBox variant={isReversed ? 'oneColumn' : 'twoColumn'}>
            <ImageWrapper>
              <NextImage
                {...getImageAttributes(block.image)}
                width={getImageAttributes(block.image).width}
                height={getImageAttributes(block.image).height}
                objectFit="cover"
                quality="100"
                priority
              />
            </ImageWrapper>
          </StyledBox>
        )}
      </StyledContainer>
    </Wrapper>
  )
}

const Wrapper = styled('section', {
  pt: '$40',
  pb: '$40',

  '@md': {
    pt: '$56',
    pb: '$56',
  },

  '@lg': {
    pt: '$40',
    pb: '$40',
  },
})

const StyledContainer = styled(Container, {
  backgroundColor: '$background',
  display: 'grid',
  gridTemplateColumns: 'repeat(1, 1fr)',

  '@lg': {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
})

const StyledFlex = styled(Flex, {
  alignItems: 'center',

  gridRow: '2',
  gridColumn: '1',

  variants: {
    variant: {
      oneColumn: {
        '@lg': {
          gridRow: '1',
          gridColumn: '1',
        },
      },
      twoColumn: {
        '@lg': {
          gridRow: '1',
          gridColumn: '2',
          justifyContent: 'center',
        },
      },
    },
  },
})

const StyledBox = styled(Box, {
  gridRow: '1',
  gridColumn: '1',

  alignSelf: 'center',

  mb: '$48',

  '@md': {
    mb: '$56',
  },

  '@lg': {
    mb: '$0',
  },

  variants: {
    variant: {
      oneColumn: {
        '@lg': {
          gridColumn: '1',
        },
      },
      twoColumn: {
        '@lg': {
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
    borderRadius: '$md',
  },

  padding: '20px 20px 14px 20px',
  width: '100%',
  maxWidth: '44rem',
  position: 'relative',
  height: '100%',
})

const StyledDescription = styled(Text, {
  mt: '$16',
  color: '$textSecondary',
  maxWidth: 'unset',

  '@lg': {
    maxWidth: '28rem',
  },
})

const ContentWrapper = styled(Flex, {
  flexDirection: 'column',
  maxWidth: 'unset',

  justifyContent: 'center',

  '@md': {
    maxWidth: 'unset',
  },

  '@lg': {
    maxWidth: '33rem',
  },
})

const WrapperPoints = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  flexWrap: 'wrap',

  '> * ': {
    flex: '1 1 120px',
  },

  '& > :nth-child(-n + 2)': {
    mb: '$40',
  },

  '@md': {
    flexWrap: 'nowrap',
    justifyContent: 'unset',

    '& > *:not(:last-child)': {
      marginRight: '$40',
    },
  },
})
