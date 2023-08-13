import { Flex, Icon, Text } from 'UI'
import { PricingCardFeaturesEntryStoryblok } from 'common/types'
import { Editable } from 'components/Blocks/Editable'
import { CMSRichTextField } from 'components/Shared/CMSRichTextField'
import { styled } from 'lib/style'

type PricingFeaturesProps = {
  price: PricingCardFeaturesEntryStoryblok[]
}

export const PricingFeatures = ({
  price,
  ...props
}: PricingFeaturesProps): JSX.Element => {
  return (
    <>
      {price.map((features) => {
        return (
          <Editable key={features._uid} block={features}>
            <StyledFlex css={{ alignItems: 'center' }} {...props}>
              <Flex
                css={{
                  alignItems: 'center',
                  color: '$brand500',
                  mr: '$12',
                }}
              >
                <Icon icon="check-color" />
              </Flex>
              <Text as="p" variant="small" css={{ color: '$textSecondary' }}>
                <CMSRichTextField
                  css={{
                    fontSize: 'inherit',
                    lineHeight: 'inherit',
                    letterSpacing: 'inherit',
                  }}
                  document={
                    Array.isArray(features.description)
                      ? features.description?.[0]?.document
                      : features.description
                  }
                />
              </Text>
            </StyledFlex>
          </Editable>
        )
      })}
    </>
  )
}

const StyledFlex = styled('div', {
  display: 'flex',

  mb: '$16',

  '&:last-of-type': {
    mb: 'unset ',
  },
})
