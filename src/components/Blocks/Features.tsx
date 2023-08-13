import NextImage from 'next/image'

import { Box, Container, Tag, Text, Theme } from 'UI'
import { FeaturesStoryblok } from 'common/types'
import { getImageAttributes } from 'common/utils/content'
import { CMSRichTextField } from 'components/Shared/CMSRichTextField'
import { styled } from 'lib/style'

import { Editable } from './Editable'

type FeaturesProps = {
  block: FeaturesStoryblok
}

export const Features = ({ block, ...props }: FeaturesProps): JSX.Element => {
  const isLayoutHorizontal = block.layout === 'grid-bottom'

  return (
    <Wrapper {...props}>
      <Theme
        theme={block.block_configurations?.appearance_theme || block.theme}
      >
        <Box
          css={{
            '@lg': {
              px: '$28',
            },
          }}
        >
          <Container
            variant="wide"
            css={{
              backgroundColor: '$background',
              borderRadius: 'unset',

              '@md': {
                borderRadius: '$md',
              },
            }}
          >
            <WrapperContent
              css={{ display: isLayoutHorizontal ? 'block' : 'flex' }}
            >
              <Box>
                {block.tag && <Tag css={{ mb: '$24' }}>{block.tag}</Tag>}
                <Box
                  css={{
                    display: isLayoutHorizontal ? 'flex' : 'block',
                    justifyContent: 'space-between',
                    flexDirection: 'column',

                    '@lg': {
                      mr: '$60',
                      flexDirection: 'row',
                    },
                  }}
                >
                  <Text
                    as="h2"
                    variant="title"
                    css={{
                      mb: '$24',
                      maxWidth: 'unset',

                      '@lg': {
                        mb: '$48',
                        maxWidth: '38rem',
                      },
                    }}
                  >
                    {block.title}
                  </Text>
                  {block.description && (
                    <Text
                      as="p"
                      variant="small"
                      css={{
                        color: '$textSecondary',
                        maxWidth: 'unset',

                        '@lg': {
                          mt: '$4',
                          maxWidth: '33rem',
                        },
                      }}
                    >
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
                    </Text>
                  )}
                </Box>
              </Box>
              {block.features.length > 0 && (
                <WrapperFeatures
                  variant={isLayoutHorizontal ? 'horizontal' : 'vertical'}
                >
                  {block.features.map((feature) => {
                    return (
                      <Editable key={feature._uid} block={feature}>
                        <Box
                          css={{
                            backgroundColor: '$background',
                            color: '$textPrimary',
                          }}
                        >
                          {feature.icon && feature.icon.filename && (
                            <ImageWrapper css={{ mb: '$16' }}>
                              <NextImage
                                {...getImageAttributes(feature.icon, '128x0')}
                                layout="fixed"
                                width="64px"
                                height="64px"
                                objectFit="cover"
                                priority
                              />
                            </ImageWrapper>
                          )}
                          <Text as="h5" variant="small" weight="bold">
                            {feature.title}
                          </Text>
                          <Text
                            as="p"
                            variant="small"
                            css={{ color: '$textSecondary', mt: '$8' }}
                          >
                            <CMSRichTextField
                              css={{
                                fontSize: 'inherit',
                                lineHeight: 'inherit',
                                letterSpacing: 'inherit',
                              }}
                              document={
                                Array.isArray(feature.description)
                                  ? feature.description?.[0]?.document
                                  : feature.description
                              }
                            />
                          </Text>
                        </Box>
                      </Editable>
                    )
                  })}
                </WrapperFeatures>
              )}
            </WrapperContent>
          </Container>
        </Box>
      </Theme>
    </Wrapper>
  )
}

const Wrapper = styled('section', {
  py: '$20',

  '@md': {
    py: '$28',
  },

  '@lg': {
    py: '$48',
  },
})

const WrapperContent = styled('div', {
  color: '$textPrimary',

  py: '$40',

  justifyContent: 'space-between',
  flexDirection: 'column',

  '@md': {
    py: '$28',
  },

  '@lg': {
    flexDirection: 'row',
    py: '$48',
  },
})

const WrapperFeatures = styled('div', {
  display: 'grid',
  columnGap: '$32',
  rowGap: '$42',

  gridTemplateColumns: '1fr',

  mt: '$48',

  '@md': {
    mt: '$56',
    gridTemplateColumns: 'repeat(2, 312px)',
  },

  variants: {
    variant: {
      horizontal: {
        '@lg': {
          gridTemplateColumns: 'repeat(4, minmax(calc(25% - 32px), 288px))',
        },
      },
      vertical: {
        '@lg': {
          gridTemplateColumns: 'repeat(2, 288px)',
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
  },

  width: '100%',
  maxWidth: '3.75rem',
  maxHeight: '3.75rem',
  position: 'relative',
  height: '100%',
})
