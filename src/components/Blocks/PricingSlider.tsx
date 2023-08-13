/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react'
import { useMemo } from 'react'

import { Button, Container, InputRange, Text } from 'UI'
import {
  PricingSliderEntryStoryblok,
  PricingSliderStoryblok,
} from 'common/types'
import { parseStoryblokLink } from 'common/utils/content'
import { CSS, styled } from 'lib/style'

import { DynamicBlock } from './DynamicBlock'

type PricingSliderProps = {
  block?: PricingSliderStoryblok
  noContainer?: boolean
  css?: CSS
  customTitle?: (item: any) => string
}

export const PricingSlider = (props: PricingSliderProps) => {
  const [state, setState] = useState<{ [k: string]: any }>({})

  const { valuesmonthly, valuesyearly } = useMemo(() => {
    const newVals = {
      valuesmonthly: (props?.block?.list_of_price || []).filter(
        (x) => x.plan_type === '/month'
      ),

      valuesyearly: (props?.block?.list_of_price || []).filter(
        (x) => x.plan_type === '/year'
      ),
    }
    setState({
      currentStepIndex: 0,
      values: newVals.valuesmonthly,
      type: '/month',
    })
    return newVals
  }, [props?.block?.list_of_price])

  const handleInputChange = (e: any) => {
    if (!e.currentTarget?.value || !state.values?.[e.currentTarget.value]) {
      return
    }
    const stateToUpdate: { [k: string]: any } = { ...state }
    stateToUpdate.currentStepIndex = e.currentTarget.value
    setState(stateToUpdate)
  }

  const handleChange = (e: any) => {
    const { value } = e.target
    const stateToUpdate: { [k: string]: any } = { ...state }
    if (value == 'Monthly') {
      stateToUpdate.values = valuesmonthly
      stateToUpdate.type = '/month'
    } else {
      stateToUpdate.values = valuesyearly
      stateToUpdate.type = '/year'
    }
    if (stateToUpdate?.values?.length) setState(stateToUpdate)
  }

  if (!state?.values?.length) return null

  const currentSelectedValue: PricingSliderEntryStoryblok =
    state?.values?.[state?.currentStepIndex]

  const link = parseStoryblokLink(currentSelectedValue.button_link)
  const buttonUrl = currentSelectedValue.button_link?.anchor
    ? `${link?.url}#${currentSelectedValue.button_link?.anchor}`
    : link?.url

  const CustomContainer = props.noContainer ? 'div' : Container

  return (
    <CustomContainer>
      <Wrapper css={props.css as any}>
        <Text as="h4" variant="big" weight="bold" css={{ mb: '16px' }}>
          {currentSelectedValue.title ||
            props.customTitle?.(currentSelectedValue)}
        </Text>
        <MiddleRangeSec>
          <div className="labels">
            <StyledList>
              <li>
                <LabelSmall>
                  Number Of {currentSelectedValue.product_name}
                </LabelSmall>
                <Text
                  as="span"
                  variant="small"
                  css={{ textTransform: 'capitalize' }}
                >
                  {currentSelectedValue.quantity}
                </Text>
              </li>
              <li>
                <LabelSmall>
                  {' '}
                  Price Per {currentSelectedValue.product_name}{' '}
                </LabelSmall>
                <Text
                  as="span"
                  variant="small"
                  css={{ textTransform: 'capitalize' }}
                >
                  ${currentSelectedValue.price_per_item}
                </Text>
              </li>
            </StyledList>
          </div>
          <div className="rangeSection">
            <div
              style={{
                marginBottom: '16px',
                position: 'absolute',
                display: 'flex',
                justifyContent: 'space-between',
                top: '-32px',
                fontWeight: 500,
                fontSize: '15px',
                left: 0,
                right: 0,
              }}
              className="threads"
            >
              <LabelSmall>
                {state.values[0]?.quantity} {currentSelectedValue.product_name}{' '}
              </LabelSmall>
              <LabelSmall
                className="active"
                style={{
                  left: (parseFloat(state.currentStepIndex) * 100) / 5 + '%',
                  top: parseFloat(state.currentStepIndex) == 4 ? 50 : 0,
                }}
              >
                {state.currentStepIndex > 0 &&
                  state.currentStepIndex < state.values.length - 1 &&
                  `${currentSelectedValue.quantity} ${currentSelectedValue.product_name}`}
              </LabelSmall>
              <LabelSmall css={{ '@lg': { marginRight: '-50px' } }}>
                {state.values[state?.values?.length - 1]?.quantity}{' '}
                {currentSelectedValue.product_name + ' '}
              </LabelSmall>
            </div>
            <InputRange
              min={0}
              max={state.values.length - 1}
              step={1}
              value={state.currentStepIndex}
              onChange={handleInputChange}
              containerStyle={{
                border: '1px solid #e6e5eb',
                borderRadius: '10px',
                height: '13px',
                width: '100%',
                background: 'rgb(230 229 235 / 13%)',
                BackgroundTrack: {
                  backgroundColor: 'red',
                },
              }}
            />
          </div>
        </MiddleRangeSec>
        <BottomSection>
          <PackSelect className="pack-select">
            <div>
              <LabelSmall>Monthly</LabelSmall>
              <input
                type="radio"
                value="Monthly"
                name="pack"
                onChange={handleChange}
                defaultChecked
              />
            </div>
            <div>
              <LabelSmall>
                Yearly <span style={{ color: 'inherit' }}>(save 17%)</span>
              </LabelSmall>
              <input
                type="radio"
                value="Yearly"
                name="pack"
                onChange={handleChange}
              />
            </div>
          </PackSelect>
          <div
            className="total-pay"
            style={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}
          >
            <Text css={{ fontWeight: 700, fontSize: '36px' }}>
              ${currentSelectedValue.price}
            </Text>
            <Text
              variant="small"
              css={{ mt: '10px', ml: '12px', textTransform: 'capitalize' }}
            >
              {state.type.replace('/', '/ ')}
            </Text>
          </div>
          <div style={{ textAlign: 'center', flexGrow: 1 }}>
            <Button
              className="start-now-button"
              as="a"
              href={buttonUrl}
              variant="primary"
              css={{
                width: '100%',
                '@lg': { justifyContent: 'center' },
                backgroundColor: '$primary',
              }}
            >
              Start Now
            </Button>
            <Text variant="small" as="p" css={{ mt: '$8' }}>
              Get Started in 10 minutes
            </Text>
          </div>
        </BottomSection>
        {!!props?.block?.extra_blocks?.length && (
          <div style={{ paddingTop: '48px !important' }}>
            {props.block.extra_blocks.map((blk, i) => (
              <DynamicBlock key={i} block={blk} />
            ))}
          </div>
        )}
      </Wrapper>
    </CustomContainer>
  )
}

const Wrapper = styled('section', {
  backgroundColor: '$background',
  color: '$textPrimary',
  p: '22px',

  '@lg': {
    py: '30px',
    px: '40px',
  },

  position: 'relative',

  overflowX: 'auto',

  border: '1px solid $gray200',
  borderRadius: '$md',

  '@xl': {
    overflowX: 'unset',
  },
})

const StyledList = styled('ul', {
  listStylePosition: 'inside',
  paddingLeft: '10px',
  display: 'table',

  li: {
    display: 'table-row',
  },
  'li::before': {
    content: '"• "',
  },

  span: {
    fontSize: '12px',
    marginLeft: '16px',
    display: 'table-cell',
    paddingLeft: '16px',
    pb: '$10',

    '@lg': {
      fontSize: '16px',
    },
  },
})

const PackSelect = styled('div', {
  flexGrow: 1,
  display: 'flex',
  textAlign: 'center',

  label: {
    width: '100%',
    display: 'inline-block',
    mb: '$12',

    span: {
      fontWeight: 400,
      color: '#585f6f',
      fontSize: '12px',
      '@lg': {
        fontSize: '16px',
      },
    },
  },

  input: {
    width: '20px',
    height: '20px',
  },
})

const LabelSmall = styled('label', {
  fontSize: '12px',
  fontWeight: 700,

  '@lg': { fontSize: '18px' },
})

const MiddleRangeSec = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  '@lg': {
    flexDirection: 'row',
    marginRight: '50px',
  },

  '& .labels': {
    width: '100%',
    '@lg': {
      width: '50%',
    },
  },

  '& .rangeSection': {
    width: '100%',
    position: 'relative',
    mt: '60px',
    '@lg': {
      width: '50%',
      paddingLeft: '50px',
      marginTop: '30px',
    },
    '& .active': {
      position: 'initial',
      '@lg': {
        position: 'absolute',
      },
    },
  },
})

const BottomSection = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '46px',
  flexDirection: 'column',
  '@lg': {
    flexDirection: 'row',
  },

  '& .total-pay': {
    mt: '15px',
    '@lg': { mt: 0 },
  },

  '& .start-now-button': {
    mt: '30px',
    '@lg': { mt: 0 },
  },
})
