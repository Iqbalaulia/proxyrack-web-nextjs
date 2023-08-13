import { useCallback, useMemo, useState } from 'react'

import { Container, Flex, Tab, Tabs, Text } from 'UI'
import { useInnerWidth } from 'common/hooks/useInnerWidth'
import {
  TabbedPricingSliderEntry,
  TabbedPricingSliderStoryblok,
} from 'common/types'
import { filterUnique } from 'components/utils'
import { styled } from 'lib/style'

import { PricingSlider } from './PricingSlider'

type PropsTypes = {
  block: TabbedPricingSliderStoryblok
}

export const TabbedPricingSlider = ({ block }: PropsTypes): JSX.Element => {
  const width = useInnerWidth()

  const isMobile = width < 768

  const { Entries } = block

  const sideTabs = filterUnique(Entries.map((x) => x.first_tab_name))
  const [activeSideTab, setActiveSideTab] = useState(sideTabs?.[0])

  const [activeMainTab, setActiveMainTab] = useState('')
  const mainTabs = useMemo(() => {
    const tabs = Entries.filter((x) => x.first_tab_name === activeSideTab).map(
      (x) => x.sec_tab_name
    )
    setActiveMainTab(tabs?.[0])
    return tabs
  }, [Entries, activeSideTab])

  const getEntry = useCallback(
    (fTab: string, sTab: string): TabbedPricingSliderEntry | undefined => {
      return Entries.find(
        (x) => x.first_tab_name === fTab && x.sec_tab_name === sTab
      )
    },
    [Entries]
  )

  const { pricingSliderBlock } = useMemo(() => {
    const item = getEntry(activeSideTab, activeMainTab)
    if (!item) return {}
    return {
      pricingSliderBlock: item.pricing_slider?.[0],
    }
  }, [activeMainTab, activeSideTab, getEntry])

  return (
    <Container variant="normal">
      <Flex
        css={{
          background: '$background',
          flexDirection: isMobile ? 'column' : 'row',
          border: '1px solid $muted',
          borderRadius: '$md',
        }}
      >
        <SideCol>
          <Tabs
            variant="rounded"
            direction={isMobile ? 'horizontal' : 'vertical'}
            css={{
              border: 'none',
              position: 'relative',
              top: undefined,
              '@md': {
                position: 'sticky',
                top: '0px',
              },
            }}
          >
            {sideTabs.map((x, i) => (
              <Tab
                key={i}
                isActive={x === activeSideTab}
                onClick={() => setActiveSideTab(x)}
              >
                <Text variant="small">{x}</Text>
              </Tab>
            ))}
          </Tabs>
        </SideCol>
        <MainCol>
          <Tabs
            variant="rounded"
            css={{
              borderTop: 0,
              marginLeft: '-1px',
              width: '100.17%',
              position: 'relative',
              top: undefined,
              '@md': {
                position: 'sticky',
                top: 0,
              },
            }}
          >
            {mainTabs.map((x, i) => (
              <Tab
                key={i}
                isActive={x === activeMainTab}
                onClick={() => setActiveMainTab(x)}
                css={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Text variant="small">{x}</Text>
                <Text css={{ fontSize: '10pt', color: '$gray300' }}>
                  {getEntry(activeSideTab, x)?.sec_tab_description}
                </Text>
              </Tab>
            ))}
          </Tabs>
          {pricingSliderBlock && (
            <PricingSlider
              css={{ border: 0 }}
              noContainer
              block={pricingSliderBlock}
              customTitle={(item) =>
                `${activeMainTab} ${activeSideTab} ${item.quantity} ${item.product_name}`
              }
            />
          )}
        </MainCol>
      </Flex>
    </Container>
  )
}

const SideCol = styled('div', {
  width: '100%',
  '@md': {
    width: '300px',
    margin: '5px 8px !important',
  },
  margin: '0px 0px',
  borderRadius: '$md',
})
const MainCol = styled('div', {
  width: 'calc(100% - 30px)',
  marginLeft: '15px',
  marginBottom: '15px',
  marginTop: '10px',
  '@md': {
    width: '100%',
    marginLeft: '0px',
    marginBottom: '0px',
    marginTop: '0px',
    borderWidth: '0px 0px  0px  1px !important',
    borderBottomLeftRadius: '0px !important',
  },
  borderWidth: '1px',
  borderColor: '$muted',
  borderStyle: 'solid',
  borderRadius: '$md',
})
