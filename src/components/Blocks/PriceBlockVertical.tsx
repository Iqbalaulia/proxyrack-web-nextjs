import { useEffect, useRef, useState } from 'react'
import { StoryData } from 'storyblok-js-client'

import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Flex,
  Icon,
  Stack,
  Tag,
  Text,
} from 'UI'
import {
  CONTACT,
  PRICE_CUSTOM,
  PRICE_MOST_POPULAR,
  PRICE_PER_GB,
  PRICE_PER_PORT,
  PRICE_PER_THREAD,
  PRICE_VERTICAL_MONTH,
  PRICE_VERTICAL_YEAR,
  VIP_EMAIL,
} from 'common/constants'
import { PricingStoryblok } from 'common/types'
import { formatedPrice, formatedPriceCost } from 'common/utils/currency'
import { CMSLink } from 'components/Shared/CMSLink'
import { useWindowSize } from 'components/utils'
import { styled } from 'lib/style'

import { ButtonBlock } from './ButtonBlock'
import { Editable } from './Editable'

type PriceBlockVerticalProps = {
  price?: StoryData<PricingStoryblok>
}

export const PriceBlockVertical = ({
  price,
  ...props
}: PriceBlockVerticalProps): JSX.Element => {
  const handlePricePlan = (plan: 'monthly' | 'yearly') => {
    switch (plan) {
      case 'monthly':
        return PRICE_VERTICAL_MONTH

      case 'yearly':
        return PRICE_VERTICAL_YEAR

      default:
        return null
    }
  }

  const handleUnits = (
    unit: 'none' | 'threads' | 'gbs' | 'ports',
    unitAmount: number
  ) => {
    switch (unit) {
      case 'threads':
        return `${unitAmount} ${unit}`

      default:
        return null
    }
  }

  const handleCostPerUnit = (
    unit: 'none' | 'threads' | 'gbs' | 'ports',
    price: string
  ) => {
    switch (unit) {
      case 'threads':
        return `${price} ${PRICE_PER_THREAD}`

      case 'gbs':
        return `${price} ${PRICE_PER_GB}`

      case 'ports':
        return `${price} ${PRICE_PER_PORT}`

      default:
        return null
    }
  }

  const handlePrice = (price: number) => {
    if (price <= 0) {
      return null
    }

    return price ? formatedPrice(price) : PRICE_CUSTOM
  }

  const [slideIndex, setSlideIndex] = useState(0)
  const [slideWidth, setSlideWidth] = useState(0)
  const sliderRef = useRef<HTMLDivElement | null>(null)
  const { width } = useWindowSize()

  const prevSlide = () =>
    setSlideIndex((ps) => (ps - 1) % (price?.content.plans.length || 0))
  const nextSlide = () =>
    setSlideIndex((ps) => (ps + 1) % (price?.content.plans.length || 0))

  const handleSlideWidth = () => {
    if (sliderRef.current) {
      const { width } = sliderRef.current.getBoundingClientRect()

      setSlideWidth(width + 32)
    }
  }

  useEffect(() => {
    handleSlideWidth()

    window.addEventListener('resize', handleSlideWidth)

    return () => window.removeEventListener('resize', handleSlideWidth)
  }, [])

  const disableRightArrow =
    (width >= 768 &&
      width <= 991 &&
      slideIndex + 1 === (price?.content?.plans?.length || 0) - 1) ||
    (width >= 992 &&
      slideIndex + 1 === (price?.content?.plans?.length || 0) - 2) ||
    (width >= 1280 &&
      slideIndex + 1 === (price?.content?.plans?.length || 0) - 3)

  return (
    <Box css={{ overflow: 'hidden', position: 'relative' }}>
      <Container css={{ overflowX: 'visible' }} {...props}>
        <Wrapper
          spacing="32"
          css={{ transition: 'transform $motion' }}
          style={{
            transform: `translateX(-${slideWidth * slideIndex}px)`,
          }}
        >
          {price?.content?.plans.map((plan) => {
            const costPrice = plan.trial
              ? ''
              : handleCostPerUnit(
                  price?.content.units,
                  formatedPriceCost(plan.price, plan.unit_amount)
                )
            const hasButton = plan.button_link && plan.button_title
            const buttonNew = plan.button_new?.[0]

            return (
              <Editable key={plan._uid} block={plan}>
                <StyledCard ref={sliderRef}>
                  <InnerWrapper>
                    <WrapperLeft>
                      <Flex
                        css={{
                          justifyContent: 'space-between',
                          mb: handlePrice(plan.price) === null ? '$0' : '$40',
                        }}
                      >
                        <Flex css={{ flexDirection: 'column' }}>
                          <Text as="p" variant="small" weight="bold">
                            {plan.title}
                          </Text>
                          <Text
                            as="p"
                            variant="small"
                            css={{ color: '$textSecondary' }}
                          >
                            {plan.unit_amount &&
                              handleUnits(
                                price?.content.units,
                                plan.unit_amount
                              )}
                            {!plan.unit_amount &&
                              price?.content.units === 'threads' &&
                              PRICE_CUSTOM}
                          </Text>
                        </Flex>
                        <Flex>
                          {plan.featured && (
                            <Tag css={{ ml: '$16' }}>{PRICE_MOST_POPULAR}</Tag>
                          )}
                        </Flex>
                      </Flex>
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
                            {handlePrice(plan.price)}
                          </Text>
                          <Text as="p" variant="small">
                            {handlePricePlan(plan.periodicy)}
                          </Text>
                        </Flex>
                        <Flex>
                          <Text
                            as="p"
                            variant="caps"
                            weight="bold"
                            css={{ color: '$textSecondary' }}
                          >
                            {plan.price ? costPrice : PRICE_CUSTOM}
                          </Text>
                        </Flex>
                      </Flex>
                    </WrapperLeft>
                    <Divider css={{ my: '$24' }} />
                    <Flex
                      css={{
                        flexDirection: 'column',
                        '@md': { flexDirection: 'row' },
                      }}
                    >
                      <StyledStack>
                        {plan?.features?.map((features) => {
                          return (
                            <Editable key={features} block={features}>
                              <StyledFlex
                                css={{ alignItems: 'center' }}
                                {...props}
                              >
                                <Flex
                                  css={{
                                    alignItems: 'center',
                                    color: '$brand500',
                                    mr: '$12',
                                  }}
                                >
                                  <Icon icon="check-color" />
                                </Flex>
                                <Text
                                  as="p"
                                  variant="small"
                                  css={{ color: '$textSecondary' }}
                                >
                                  {features}
                                </Text>
                              </StyledFlex>
                            </Editable>
                          )
                        })}
                      </StyledStack>
                    </Flex>
                  </InnerWrapper>
                  <Box css={{ width: '100%' }}>
                    <Divider css={{ my: '$24' }} />
                    {buttonNew ? (
                      <ButtonBlock
                        block={buttonNew}
                        css={{
                          width: '100%',
                          '@md': { justifyContent: 'center' },
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
                          width: '100%',
                          '@md': { justifyContent: 'center' },
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
                          width: '100%',
                          '@md': { justifyContent: 'center' },
                          backgroundColor: '$gray900',
                        }}
                      >
                        {CONTACT}
                      </Button>
                    )}
                  </Box>
                </StyledCard>
              </Editable>
            )
          })}
        </Wrapper>
        {slideIndex !== 0 && (
          <StyledButton
            role="button"
            onClick={prevSlide}
            css={{
              '@hover': { '&:hover': { opacity: 0.75 } },
              cursor: 'pointer',
              mr: '$8',
              position: 'absolute',
              top: '50%',
              transform: 'translatey(-50%)',
              left: '5%',
              boxShadow: '$soft',
            }}
            disabled={slideIndex === 0}
          >
            <Icon icon="arrow-left" />
          </StyledButton>
        )}
        {!disableRightArrow && (
          <StyledButton
            role="button"
            onClick={nextSlide}
            css={{
              '@hover': { '&:hover': { opacity: 0.75 } },
              position: 'absolute',
              top: '50%',
              transform: 'translatey(-50%)',
              right: '5%',
              boxShadow: '$soft',
            }}
            disabled={disableRightArrow}
          >
            <Icon icon="arrow-right" />
          </StyledButton>
        )}
      </Container>
    </Box>
  )
}

const StyledButton = styled('button', {
  cursor: 'pointer',

  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',

  appearance: 'none',
  border: 'none',
  backgroundColor: '$brand900',
  color: '$gray10',
  borderRadius: '$full',

  p: '$8',
})

const Wrapper = styled(Stack, {
  alignItems: 'stretch',
  pt: '$32',
  pb: '$64',
})

const StyledCard = styled(Card, {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',

  boxShadow: '$heavy',

  p: '$24',

  width: '288px',
  minWidth: '288px',
})

const InnerWrapper = styled('div', {
  display: 'flex',

  flexDirection: 'column',
})

const WrapperLeft = styled('div', {
  display: 'flex',

  flexDirection: 'column',
  justifyContent: 'space-between',

  alignItems: 'center',

  textAlign: 'center',

  pr: '$0',

  '@md': {
    alignItems: 'unset',

    textAlign: 'unset',
  },
})

const StyledStack = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  alignItems: 'flex-start',
})

const StyledFlex = styled('div', {
  display: 'flex',

  mb: '$16',

  '&:last-of-type': {
    mb: 'unset ',
  },
})
