import React, { useState } from 'react'
import { StoryData } from 'storyblok-js-client'

import {
  Box,
  Card,
  Container,
  Divider,
  Flex,
  InputRange,
  LightCard,
  Tab,
  Tabs,
  Text,
  Theme,
} from 'UI'
import { ESTIMATED_COST, MONTHLY_USAGE } from 'common/constants'
import {
  ComparisonToolStoryblok,
  ComparisonStoryblok,
  ComparisonCompanyStoryblok,
  ComparisonValueStoryblok,
} from 'common/types'
import { formatPriceToLocale, numberToLocale } from 'common/utils/currency'
import { CMSRichText } from 'components/Shared/CMSRichText'
import { styled } from 'lib/style'

type ComparisonToolProps = {
  block: ComparisonToolStoryblok & {
    comparison?: StoryData<ComparisonStoryblok>
  }
}

type ComparisonValuesType = {
  [key: string]: {
    quantity: string
    values: {
      company: {
        content: {
          name: string
          logo: {
            alt?: string
            copyright?: string
            id: number
            filename: string
            name: string
            title?: string
          }
        }
      }
      value: string
    }[]
  }[]
}

export const ComparisonTool = ({
  block,
  ...props
}: ComparisonToolProps): JSX.Element => {
  const tabList = block.comparison?.content.metrics.map((metric) => {
    return metric.metric
  })

  const [tabkey, setTabkey] = useState(tabList && tabList[0])
  const [rangeValue, setRangeValue] = useState(0)

  const comparisonValues =
    block.comparison?.content?.metrics.reduce<ComparisonValuesType>(
      (acc, item) => {
        return {
          ...acc,
          [item.metric]: item.quantities.map((q) => {
            const values = (
              q.values as unknown as (Omit<
                ComparisonValueStoryblok,
                'company'
              > & {
                company: { content: ComparisonCompanyStoryblok }
              })[]
            )
              .sort((a, b) => {
                if (a.company.content?.name === 'Proxyrack') {
                  return -1
                }
                if (b.company.content?.name === 'Proxyrack') {
                  return 1
                }
                return ('' + a.company.content?.name).localeCompare(
                  b.company.content?.name
                )
              })
              .map((value) => ({
                company: value.company,
                value: value.value,
              }))

            return {
              quantity: q.quantity.toString(),
              values,
            }
          }),
        }
      },
      {}
    )

  return (
    <Wrapper {...props}>
      <Theme theme={block.block_configurations?.appearance_theme || 'light'}>
        {comparisonValues && tabkey && (
          <Container>
            {!!block.title && (
              <Box css={{ mb: '$40' }}>
                <Text variant="big" weight="bold">
                  {block.title}
                </Text>
              </Box>
            )}
            <StyledCard hasBorder>
              <WrapperLeft>
                <Flex
                  css={{
                    flexDirection: 'column',

                    mb: '$40',

                    '@md': {
                      mb: '$64',
                    },

                    '@lg': {
                      mb: '$0',
                    },
                  }}
                >
                  {block.description ? (
                    <CMSRichText
                      document={block.description}
                      css={{ mb: '$16', p: '0px' }}
                      containerVariant="tinyNoSpace"
                    />
                  ) : (
                    <Text variant="small" weight="bold" css={{ mb: '$16' }}>
                      {MONTHLY_USAGE}
                    </Text>
                  )}
                  <Tabs variant="rounded">
                    {tabList?.map((val, index) => {
                      return (
                        <Tab
                          isActive={val === tabkey}
                          onClick={() => {
                            setTabkey(val)
                            setRangeValue(0)
                          }}
                          key={index}
                        >
                          <Text variant="caps">{val}</Text>
                        </Tab>
                      )
                    })}
                  </Tabs>
                </Flex>
                <Flex css={{ flexDirection: 'column', mb: '$12' }}>
                  <Flex
                    css={{
                      flexDirection: 'column',
                      alignItems: 'baseline',
                      mb: '$24',
                    }}
                  >
                    <Text variant="huge">
                      {numberToLocale(
                        parseInt(comparisonValues[tabkey][rangeValue].quantity)
                      )}
                    </Text>
                    <Text
                      variant="body"
                      css={{ color: '$textSecondary', ml: '$4' }}
                    >
                      {tabkey}
                    </Text>
                  </Flex>
                  <InputRange
                    min={0}
                    max={comparisonValues[tabkey].length - 1}
                    step={1}
                    value={rangeValue}
                    onChange={(e) =>
                      setRangeValue(Number(e.currentTarget.value))
                    }
                  />
                </Flex>
              </WrapperLeft>
              <WrapperRight>
                <StyledLightCard variant="primary">
                  <Text variant="small" weight="bold" css={{ mb: '$16' }}>
                    {ESTIMATED_COST}
                  </Text>
                  <Divider />
                  {comparisonValues[tabkey][rangeValue].values.map((v, i) => {
                    const ProxyrackValue =
                      comparisonValues[tabkey][rangeValue].values[0].value
                    const total = parseInt(v.value) - parseInt(ProxyrackValue)

                    return (
                      <React.Fragment key={v.company.content?.name}>
                        <WrapperEntry>
                          <Box>
                            <Logo>
                              <img
                                src={v.company.content?.logo.filename}
                                alt={v.company.content?.logo.alt}
                              />
                            </Logo>
                          </Box>
                          <Flex
                            css={{
                              flexDirection: 'column',
                              alignItems: 'flex-end',
                            }}
                          >
                            <Text variant="big" weight="bold">
                              {formatPriceToLocale(parseInt(v.value) / 100)}
                            </Text>
                            {i !== 0 && total && (
                              <Text
                                variant="caps"
                                weight="bold"
                                css={{ color: '$red' }}
                              >
                                {total < 0
                                  ? `${formatPriceToLocale(total / 100)}`
                                  : `+${formatPriceToLocale(total / 100)}`}
                              </Text>
                            )}
                          </Flex>
                        </WrapperEntry>
                        <Divider
                          css={{ '&:last-child': { backgroundColor: 'unset' } }}
                        />
                      </React.Fragment>
                    )
                  })}
                </StyledLightCard>
              </WrapperRight>
            </StyledCard>
          </Container>
        )}
      </Theme>
    </Wrapper>
  )
}

const Wrapper = styled('section', {
  py: '$42',

  '@md': {
    py: '$48',
  },

  '@lg': {
    py: '$60',
  },
})

const StyledCard = styled(Card, {
  display: 'flex',
  flexDirection: 'column-reverse',

  backgroundColor: '$mutedSoft',

  '@md': {
    flexDirection: 'column-reverse',
  },

  '@lg': {
    flexDirection: 'row',
  },
})

const StyledLightCard = styled(LightCard, {
  p: '$12 $20',

  '@md': {
    p: '$16 $24',
  },

  '@lg': {
    p: '$16 $32',
  },
})

const WrapperLeft = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',

  width: '100%',

  p: '$16',

  '@md': {
    p: '$24 $32',
  },

  '@lg': {
    maxWidth: '600px',
  },
})

const WrapperRight = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  p: '$8',

  width: '100%',
})

const Logo = styled('div', {
  display: 'flex',

  position: 'relative',

  maxWidth: '112px',

  '@md': {
    mr: '$16',
    width: '165px',
    maxWidth: '165px',
  },
})

const WrapperEntry = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',

  alignItems: 'center',

  py: '$24',

  '@lg': {
    py: '$36',
  },
})
