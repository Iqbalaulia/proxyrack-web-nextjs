import { Box, Card, Container, Divider, Flex, Text } from 'UI'
import { useScrollToAnchor } from 'common/hooks/useScrollToAnchor'
import { PricingCardHorizontalStoryblok } from 'common/types'
import { slugify } from 'common/utils/strings'
import { CMSLink } from 'components/Shared/CMSLink'
import { styled } from 'lib/style'

import { ButtonBlock } from '../ButtonBlock'
import { Editable } from '../Editable'
import { PricingFeatures } from './shared/PricingFeatures'

type PricingCardHorizontalProps = {
  block: PricingCardHorizontalStoryblok
}

export const PricingCardHorizontal = ({
  block,
  ...props
}: PricingCardHorizontalProps): JSX.Element => {
  const numberOfFeatures = block?.pricing?.map((price) => price.features.length)

  const isFullWidth = parseInt(numberOfFeatures.toString()) > 5

  useScrollToAnchor()

  return (
    <Wrapper {...props}>
      <Container>
        <Flex
          css={{
            flexDirection: 'column',
          }}
        >
          {block.title && (
            <Flex css={{ mb: '$40', alignSelf: 'flex-start' }}>
              <Text
                variant="big"
                weight="bold"
                id={slugify(block.title)}
                css={{ scrollMarginTop: '50px' }}
              >
                {block.title}
              </Text>
            </Flex>
          )}
          {block?.pricing?.map((price) => {
            return (
              <Editable key={price._uid} block={price}>
                <StyledCard variant={isFullWidth ? 'fullWidth' : 'contained'}>
                  <InnerWrapper>
                    <WrapperLeft>
                      <Box css={{ mb: '$10', '@md': { mb: '$0' } }}>
                        <Text as="p" variant="small" weight="bold">
                          {price.type}
                        </Text>
                        {price.threads && (
                          <Text
                            as="p"
                            variant="small"
                            css={{ color: '$textSecondary' }}
                          >
                            {price.threads}
                          </Text>
                        )}
                      </Box>
                      <Flex
                        css={{
                          justifyContent: 'space-between',
                          flexDirection: 'column',
                          alignItems: 'center',
                          '@md': {
                            alignItems: 'unset',
                          },
                        }}
                      >
                        <Flex css={{ alignItems: 'flex-end' }}>
                          <Text
                            as="p"
                            variant="title"
                            css={{ fontSize: '$xl' }}
                          >
                            {price.price}
                          </Text>
                          <Text as="p" variant="small">
                            {price.price_type}
                          </Text>
                        </Flex>
                        {price.price_per_thread && (
                          <Flex>
                            <Text
                              as="p"
                              variant="caps"
                              weight="bold"
                              css={{ color: '$textSecondary' }}
                            >
                              {price.price_per_thread}
                            </Text>
                          </Flex>
                        )}
                        {isFullWidth && (
                          <CMSLink
                            href={price.button_link}
                            linkStyle={{
                              type: 'button',
                              variant: 'primary',
                            }}
                            css={{
                              display: 'none',
                              mt: '$16',
                              minWidth: '238px',
                              '@md': {
                                display: 'flex',
                              },
                            }}
                          >
                            {price.button_text}
                          </CMSLink>
                        )}
                      </Flex>
                    </WrapperLeft>
                    <Flex
                      css={{
                        flexDirection: 'column',
                        '@md': { flexDirection: 'row' },
                      }}
                    >
                      <Divider
                        orientation="vertical"
                        css={{
                          my: '$24',
                          '@md': {
                            my: '$0',
                          },
                        }}
                      />
                      <StyledStack
                        variant={isFullWidth ? 'fullWidth' : 'contained'}
                      >
                        <PricingFeatures
                          price={price.features}
                          css={{
                            maxWidth: isFullWidth ? '300px' : 'unset',
                            minWidth: '150px',
                          }}
                        />
                      </StyledStack>
                      <Divider
                        orientation="horizontal"
                        css={{
                          display: 'flex',
                          mt: '$24',
                          '@md': { display: 'none' },
                        }}
                      />
                    </Flex>
                  </InnerWrapper>
                  {price.button_new?.[0] ? (
                    <StyledButtonBlock
                      variant={isFullWidth ? 'fullWidth' : 'contained'}
                      css={{}}
                    >
                      <ButtonBlock
                        block={price.button_new[0]}
                        css={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          width: '100%',
                        }}
                      />
                    </StyledButtonBlock>
                  ) : (
                    <StyledCMSLink
                      href={price.button_link}
                      linkStyle={{
                        type: 'button',
                        variant: 'primary',
                      }}
                    >
                      {price.button_text}
                    </StyledCMSLink>
                  )}
                </StyledCard>
              </Editable>
            )
          })}
        </Flex>
      </Container>
    </Wrapper>
  )
}

const Wrapper = styled('section', {
  pt: '$32',
  pb: '$64',
})

const StyledCard = styled(Card, {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',

  boxShadow: '$heavy',

  width: '100%',
  p: '$20',

  '@md': {
    p: '$32',
  },

  variants: {
    variant: {
      fullWidth: {
        maxWidth: 'unset',
      },
      contained: {
        maxWidth: '665px',
        margin: '0 auto',
      },
    },
  },
})

const InnerWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  '@md': {
    flexDirection: 'row',
  },
})

const WrapperLeft = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',

  textAlign: 'center',

  pr: '$0',

  '@md': {
    pr: '$32',

    alignItems: 'unset',
    textAlign: 'unset',
  },
})

const StyledStack = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',

  pl: '$0',

  '@md': {
    pl: '$32',
  },

  variants: {
    variant: {
      fullWidth: {
        '@lg': {
          display: 'grid',
          gridTemplateColumns: 'repeat(1, 1fr)',
          gridTemplateRows: 'auto auto auto auto auto',
          gridAutoFlow: 'column',
          columnGap: '6.25rem',

          '& > *:nth-child(5n+5)': {
            mb: 'unset',
          },
        },
      },
      contained: {},
    },
  },
})
const styledCMSLinkCSS = {
  mt: '$24',

  '@md': { justifyContent: 'center', mt: '$32' },

  variants: {
    variant: {
      fullWidth: {
        display: 'flex',
        '@md': {
          display: 'none',
        },
      },
      contained: {},
    },
  },
}
const StyledCMSLink = styled(CMSLink, styledCMSLinkCSS)
const StyledButtonBlock = styled('div', styledCMSLinkCSS)
