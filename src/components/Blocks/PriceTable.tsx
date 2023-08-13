import { StoryData } from 'storyblok-js-client'

import { Box, Button, Flex, Icon, Tag, Text } from 'UI'
import {
  CONTACT,
  PRICE,
  PRICE_CHAT,
  PRICE_COST,
  PRICE_CUSTOM,
  PRICE_MONTH,
  PRICE_MOST_POPULAR,
  PRICE_PER_GB,
  PRICE_PER_PORT,
  PRICE_PER_THREAD,
  PRICE_YEAR,
  VIP_EMAIL,
} from 'common/constants'
import { PricingStoryblok } from 'common/types'
import { formatedPrice, formatedPriceCost } from 'common/utils/currency'
import { CMSLink } from 'components/Shared/CMSLink'
import { styled } from 'lib/style'

import { ButtonBlock } from './ButtonBlock'

type PriceTableProps = {
  price?: StoryData<PricingStoryblok>
}

export const PriceTable = ({
  price,
  ...props
}: PriceTableProps): JSX.Element => {
  const allPlans = price?.content?.plans.reduce<string[]>(
    (previous, current) => {
      return [
        ...previous,
        ...current.features?.reduce(function (previousValue, currentValue) {
          return [...previousValue, currentValue]
        }, []),
      ]
    },
    []
  )

  const uniqueValues = Array.from(new Set(allPlans))

  const handlePricePlan = (plan: 'monthly' | 'yearly') => {
    switch (plan) {
      case 'monthly':
        return PRICE_MONTH

      case 'yearly':
        return PRICE_YEAR

      default:
        return PRICE_CHAT
    }
  }

  const handleCostPerUnit = (unit?: 'none' | 'threads' | 'gbs' | 'ports') => {
    switch (unit) {
      case 'threads':
        return `${PRICE_COST} ${PRICE_PER_THREAD}`

      case 'gbs':
        return `${PRICE_COST} ${PRICE_PER_GB}`

      case 'ports':
        return `${PRICE_COST} ${PRICE_PER_PORT}`

      default:
        return null
    }
  }

  return (
    <Wrapper {...props}>
      <WrapperGrid>
        <Row
          css={{
            gridTemplateColumns: `repeat(${
              (price?.content?.plans?.length || 0) + 1
            }, 1fr)`,
            position: 'sticky',
            top: '0',
          }}
        >
          <InnerGrid variant="topLeft" />
          {price?.content?.plans?.map((plan) => {
            const hasButton = plan.button_link && plan.button_title
            const buttonNew = plan.button_new?.[0]
            return (
              <InnerGrid
                variant={plan.featured ? 'topRightPopular' : 'topRight'}
                key={plan._uid}
              >
                <Flex css={{ flexDirection: 'column' }}>
                  {plan.featured && (
                    <Tag css={{ mb: '$14', borderRadius: 'unset' }}>
                      {PRICE_MOST_POPULAR}
                    </Tag>
                  )}
                  {plan.title}
                  {buttonNew ? (
                    <ButtonBlock
                      block={buttonNew}
                      css={{
                        mt: '$6',
                        maxWidth: 'fit-content',
                        alignSelf: 'center',
                      }}
                    />
                  ) : hasButton ? (
                    <CMSLink
                      href={plan.button_link}
                      linkStyle={{
                        type: 'button',
                        variant: 'primary',
                      }}
                      css={{
                        mt: '$6',
                        maxWidth: 'fit-content',
                        alignSelf: 'center',
                      }}
                    >
                      {plan.button_title}
                    </CMSLink>
                  ) : (
                    <Button
                      as="a"
                      href={`mailto:${VIP_EMAIL}`}
                      variant="primary"
                      css={{
                        mt: '$6',
                        backgroundColor: '$gray900',
                        maxWidth: 'fit-content',
                        alignSelf: 'center',
                      }}
                    >
                      {CONTACT}
                    </Button>
                  )}
                </Flex>
              </InnerGrid>
            )
          })}
        </Row>
        <Row
          css={{
            gridTemplateColumns: `repeat(${
              (price?.content?.plans?.length || 0) + 1
            }, 1fr)`,
          }}
        >
          <InnerGrid variant="left">
            <Text variant="small" css={{ color: '$gray700' }}>
              {PRICE}
            </Text>
          </InnerGrid>
          {price?.content?.plans?.map((plan) => {
            return (
              <InnerGrid
                variant={plan.featured ? 'rightPopular' : 'right'}
                key={plan._uid}
              >
                <Text variant="big" weight="bold">
                  {plan.price ? formatedPrice(plan.price) : PRICE_CUSTOM}
                </Text>
                <Text variant="small" css={{ color: '$gray400' }}>
                  {plan.trial ? '' : handlePricePlan(plan.periodicy)}
                </Text>
              </InnerGrid>
            )
          })}
        </Row>
        {price?.content?.units !== 'none' && (
          <Row
            css={{
              gridTemplateColumns: `repeat(${
                (price?.content?.plans?.length || 0) + 1
              }, 1fr)`,
            }}
          >
            <InnerGrid variant="left">
              <Box css={{ textTransform: 'capitalize' }}>
                <Text variant="small" css={{ color: '$gray700' }}>
                  {price?.content?.units}
                </Text>
              </Box>
            </InnerGrid>
            {price?.content?.plans.map((plan) => {
              return (
                <InnerGrid
                  variant={plan.featured ? 'rightPopular' : 'right'}
                  key={plan._uid}
                >
                  <Text
                    variant="body"
                    weight="bold"
                    css={{ color: '$brand500' }}
                  >
                    {plan.unit_amount ? plan.unit_amount : PRICE_CUSTOM}
                  </Text>
                </InnerGrid>
              )
            })}
          </Row>
        )}
        {price?.content?.units !== 'none' && (
          <Row
            css={{
              gridTemplateColumns: `repeat(${
                (price?.content?.plans?.length || 0) + 1
              }, 1fr)`,
            }}
          >
            <InnerGrid variant="left">
              <Text variant="small" css={{ color: '$gray700' }}>
                {handleCostPerUnit(price?.content?.units)}
              </Text>
            </InnerGrid>
            {price?.content?.plans?.map((plan) => {
              const price = plan.trial
                ? '-'
                : formatedPriceCost(plan.price, plan.unit_amount)
              return (
                <InnerGrid
                  variant={plan.featured ? 'rightPopular' : 'right'}
                  key={plan._uid}
                >
                  <Text
                    variant="body"
                    weight="bold"
                    css={{ color: '$brand500' }}
                  >
                    {plan.price ? price : PRICE_CUSTOM}
                  </Text>
                </InnerGrid>
              )
            })}
          </Row>
        )}
        {uniqueValues.map((val) => {
          return (
            <Row
              css={{
                gridTemplateColumns: `repeat(${
                  (price?.content?.plans?.length || 0) + 1
                }, 1fr)`,
              }}
              key={val}
            >
              <InnerGrid variant="left" key={val} css={{ gridColumn: '1' }}>
                <>{val}</>
              </InnerGrid>
              {price?.content?.plans?.map((plan) => {
                const hasFeature = plan.features?.includes(val)
                return (
                  <InnerGrid
                    variant={plan.featured ? 'rightPopular' : 'right'}
                    key={plan._uid}
                  >
                    {hasFeature ? (
                      <Box>
                        <Icon icon="check-contrast" />
                      </Box>
                    ) : (
                      <Box>
                        <Icon icon="close" />
                      </Box>
                    )}
                  </InnerGrid>
                )
              })}
            </Row>
          )
        })}
      </WrapperGrid>
    </Wrapper>
  )
}

const Wrapper = styled('section', {
  my: '$40',

  position: 'relative',

  overflowX: 'auto',

  border: '1px solid $gray200',
  borderRadius: '$md',
  boxShadow: '$heavy',

  '@xl': {
    overflowX: 'unset',
  },
})

const WrapperGrid = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'auto',
})

const InnerGrid = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  variants: {
    variant: {
      left: {
        backgroundColor: '$gray100',
        p: '$16 $12',

        borderBottom: '1px solid $gray200',

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
      },
      topLeft: {
        backgroundColor: '$gray100',
        p: '$40 $12 $16 $16',

        borderBottom: '1px solid $gray200',

        justifyContent: 'flex-start',

        minWidth: '134px',
      },
      right: {
        backgroundColor: '$gray10',
        p: '$16 $12',

        textAlign: 'center',

        flexDirection: 'column',
      },
      rightPopular: {
        backgroundColor: '$brand10',
        p: '$16 $12',

        textAlign: 'center',

        flexDirection: 'column',
      },
      topRight: {
        backgroundColor: '$gray10',
        p: '$40 $12 $16 $12',

        textAlign: 'center',

        position: 'sticky',
        top: '$0',
      },
      topRightPopular: {
        backgroundColor: '$brand10',
        p: '$0 $12 $16 $12',

        textAlign: 'center',

        position: 'sticky',
        top: '$0',
      },
    },
  },
})

const Row = styled('div', {
  display: 'grid',

  borderBottom: '1px solid $gray100',

  '&:first-of-type': {
    '& > *:first-child': {
      borderTopLeftRadius: '$md',
    },

    '& > *:nth-of-type(2)': {
      borderTopLeftRadius: '$md',
    },

    '& > *:last-child': {
      borderTopRightRadius: '$md',
    },
  },

  '&:last-of-type': {
    borderBottom: 'unset',

    '& > *:first-child': {
      borderBottomLeftRadius: '$md',
    },

    '& > *:nth-of-type(2)': {
      borderBottomLeftRadius: '$md',
    },

    '& > *:last-child': {
      borderBottomRightRadius: '$md',
    },
  },
})
