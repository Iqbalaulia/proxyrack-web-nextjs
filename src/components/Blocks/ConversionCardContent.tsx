import NextImage from 'next/image'

import { Card, Flex, Text } from 'UI'
import {
  ConversionCardHorizontalStoryblok,
  ConversionCardVerticalStoryblok,
} from 'common/types'
import { getImageAttributes } from 'common/utils/content'
import { CMSLink } from 'components/Shared/CMSLink'
import { CMSRichTextField } from 'components/Shared/CMSRichTextField'
import { styled } from 'lib/style'

import { ButtonBlock } from './ButtonBlock'
import { Editable } from './Editable'

type ConversionCardContentProps = {
  block: ConversionCardHorizontalStoryblok | ConversionCardVerticalStoryblok
  isReversed: boolean
}

export const ConversionCardContent = ({
  block,
  isReversed,
}: ConversionCardContentProps): JSX.Element => {
  return (
    <>
      <StyledCard layout={isReversed ? 'horizontal' : 'vertical'}>
        <WrapperSection layout={isReversed ? 'horizontal' : 'vertical'}>
          {block.title && (
            <StyledTitle
              as="h3"
              variant="big"
              weight="bold"
              layout={isReversed ? 'horizontal' : 'vertical'}
            >
              {block.title}
            </StyledTitle>
          )}
          {block.description && (
            <StyledDescription
              variant="small"
              layout={isReversed ? 'horizontal' : 'vertical'}
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
            </StyledDescription>
          )}
        </WrapperSection>
        <StyledGrid layout={isReversed ? 'horizontal' : 'vertical'}>
          {block.conversion_entry?.map((entry) => {
            const hasButton = entry.button_link && entry.button_text
            const newButton = entry.button_new?.[0]

            return (
              <Editable key={entry._uid} block={entry}>
                <StyledElement layout={isReversed ? 'horizontal' : 'vertical'}>
                  <Flex css={{ flexDirection: 'column' }}>
                    {entry.icon && entry.icon.filename && (
                      <ImageWrapper css={{ mb: '$16' }}>
                        <NextImage
                          {...getImageAttributes(entry.icon, '128x0')}
                          layout="fixed"
                          width="64px"
                          height="64px"
                          objectFit="cover"
                        />
                      </ImageWrapper>
                    )}
                    <Text as="h4" variant="small" weight="bold">
                      {entry.title}
                    </Text>
                    <Text as="p" variant="small" css={{ mb: '$16' }}>
                      <CMSRichTextField
                        css={{
                          fontSize: 'inherit',
                          lineHeight: 'inherit',
                          letterSpacing: 'inherit',
                        }}
                        document={entry.description}
                      />
                    </Text>
                  </Flex>
                  {newButton ? (
                    <ButtonBlock
                      block={newButton}
                      css={{
                        whiteSpace: 'nowrap',
                        alignSelf: 'flex-start',
                      }}
                    />
                  ) : (
                    hasButton && (
                      <CMSLink
                        href={entry.button_link}
                        linkStyle={{
                          type: 'link',
                          variant: 'icon',
                          icon: 'arrow-right',
                        }}
                        css={{ whiteSpace: 'nowrap', alignSelf: 'flex-start' }}
                      >
                        {entry.button_text}
                      </CMSLink>
                    )
                  )}
                </StyledElement>
              </Editable>
            )
          })}
        </StyledGrid>
      </StyledCard>
    </>
  )
}

const StyledCard = styled(Card, {
  display: 'flex',
  flexDirection: 'column',

  p: '$20',

  '@md': {
    p: '$32',
  },

  '@lg': {
    p: '$48',

    flexDirection: 'row',
  },

  variants: {
    layout: {
      horizontal: {},
      vertical: {
        flexDirection: 'column',

        p: '$20',

        '@md': {
          p: '$24',
        },

        '@lg': {
          p: '$24',
        },
      },
    },
  },
})

const WrapperSection = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  '@md': {
    flexDirection: 'row',

    maxWidth: 'unset',
    pb: '$24',

    borderBottom: '1px solid $mutedSoft',
  },

  '@lg': {
    flexDirection: 'column',

    borderBottom: 'unset',
    pb: '$0',
  },

  variants: {
    layout: {
      horizontal: {},
      vertical: {
        '@md': {
          flexDirection: 'row',
          justifyContent: 'space-between',
          maxWidth: 'unset',

          pb: '$24',
          mb: '$24',
          borderBottom: '1px solid $mutedSoft',
        },
      },
    },
  },
})

const StyledTitle = styled(Text, {
  mb: '$8',

  '@md': { mb: '$0' },

  '@lg': { mb: '$16' },

  variants: {
    layout: {
      horizontal: {},
      vertical: {
        '@md': {
          maxWidth: '208px',
        },
      },
    },
  },
})

const StyledDescription = styled(Text, {
  color: '$textSecondary',

  variants: {
    layout: {
      horizontal: {},
      vertical: {
        maxWidth: 'unset',

        '@md': {
          maxWidth: '320px',
        },

        '@lg': {
          maxWidth: '360px',
        },
      },
    },
  },
})

const StyledGrid = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(1, 1fr)',

  columnGap: '$24',

  '@md': {
    gridTemplateColumns: 'repeat(2, 1fr)',

    rowGap: '$64',
    pt: '$24',
  },

  '@lg': {
    gridTemplateColumns: 'repeat(4, 1fr)',

    rowGap: '$0',
    pt: '$0',
  },

  variants: {
    layout: {
      horizontal: {},
      vertical: {
        gridTemplateColumns: 'repeat(1, 1fr)',
        columnGap: '$20',

        '@md': {
          gridTemplateColumns: 'repeat(2, 1fr)',
        },

        '@lg': {
          gridTemplateColumns: 'repeat(3, 1fr)',
        },
      },
    },
  },
})

const StyledElement = styled('div', {
  borderLeft: '0px solid $mutedSoft',
  borderTop: '1px solid $mutedSoft',

  pt: '$16',
  mt: '$16',
  pl: '$0',

  '@md': {
    borderTop: '0px solid $mutedSoft',
    borderLeft: '1px solid $mutedSoft',

    pl: '$24',
    mt: '$0',

    '&:first-child': {
      pl: '$0',
      borderLeft: '0px solid $mutedSoft',
    },

    '&:nth-child(3)': {
      pl: '$0',
      borderLeft: '0px solid $mutedSoft',
    },
  },

  '@lg': {
    pt: '$0',

    '&:first-child': {
      pl: '$24',
      borderLeft: '1px solid $mutedSoft',
    },

    '&:nth-child(3)': {
      pl: '$24',
      borderLeft: '1px solid $mutedSoft',
    },
  },

  variants: {
    layout: {
      horizontal: {},
      vertical: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',

        '@md': {
          pl: '$20',
          pt: '$0',

          '&:first-child': {
            pl: '$0',
            borderLeft: '0px solid $mutedSoft',
          },
        },

        '@lg': {
          '&:nth-child(4)': {
            pl: '$0',
            pt: '$24',
            borderLeft: '0px solid $mutedSoft',
          },
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
