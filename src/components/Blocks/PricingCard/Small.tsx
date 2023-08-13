import { Card, Container, Divider, Flex, Stack, Text } from 'UI'
import { PricingCardSmallStoryblok } from 'common/types'
import { CMSLink } from 'components/Shared/CMSLink'
import { CMSRichTextField } from 'components/Shared/CMSRichTextField'
import { styled } from 'lib/style'

import { ButtonBlock } from '../ButtonBlock'
import { Editable } from '../Editable'

type PricingCardSmallProps = {
  block: PricingCardSmallStoryblok
}

export const PricingCardSmall = ({
  block,
  ...props
}: PricingCardSmallProps): JSX.Element => {
  return (
    <Wrapper {...props}>
      <Container>
        <Stack spacing="32" css={{ alignItems: 'stretch' }}>
          {block?.pricing?.map((price) => {
            return (
              <Editable key={price._uid} block={price}>
                <StyledCard>
                  <Text as="p" variant="small" weight="bold">
                    {price.title}
                  </Text>
                  <Text
                    as="p"
                    variant="small"
                    css={{ color: '$textSecondary' }}
                  >
                    <CMSRichTextField
                      css={{
                        fontSize: 'inherit',
                        lineHeight: 'inherit',
                        letterSpacing: 'inherit',
                      }}
                      document={
                        Array.isArray(price.description)
                          ? price.description?.[0]?.document
                          : price.description
                      }
                    />
                  </Text>
                  <Divider css={{ my: '$24' }} />
                  <Text
                    as="p"
                    variant="small"
                    css={{ color: '$textSecondary' }}
                  >
                    {price.starting}
                  </Text>
                  <Flex
                    css={{
                      justifyContent: 'space-between',
                      flexDirection: 'column',
                      '@md': {
                        flexDirection: 'row',
                      },
                    }}
                  >
                    <Flex css={{ alignItems: 'flex-end' }}>
                      <Text as="p" variant="title">
                        {price.price}
                      </Text>
                      <Text as="p" variant="small">
                        {price.price_type}
                      </Text>
                    </Flex>
                    {price?.button_new?.[0] ? (
                      <ButtonBlock
                        block={price.button_new[0]}
                        css={{
                          mt: '$24',
                          justifyContent: 'flex-start',
                          '@md': { justifyContent: 'center' },
                        }}
                      />
                    ) : (
                      <CMSLink
                        href={price.button_link}
                        linkStyle={{
                          type: 'link',
                          variant: 'icon',
                          icon: 'arrow-right',
                        }}
                        css={{
                          mt: '$24',
                          justifyContent: 'flex-start',
                          '@md': { justifyContent: 'center' },
                        }}
                      >
                        {price.button_text}
                      </CMSLink>
                    )}
                  </Flex>
                </StyledCard>
              </Editable>
            )
          })}
        </Stack>
      </Container>
    </Wrapper>
  )
}

const Wrapper = styled('section', {
  pt: '$32',
  pb: '$64',

  overflow: 'auto hidden',

  '@lg': {
    overflow: 'unset',
  },
})

const StyledCard = styled(Card, {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',

  boxShadow: '$heavy',

  width: '100%',
  maxWidth: '394px',
  minWidth: '270px',

  p: '$24',

  '@md': {
    minWidth: '394px',
  },

  '@lg': {
    minWidth: 'unset',
  },
})
