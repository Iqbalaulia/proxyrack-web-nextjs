import { useState } from 'react'

import { Box, Container, Tab, Tabs, Text } from 'UI'
import { TabsStoryblok } from 'common/types'
import { slugify } from 'common/utils/strings'
import { styled } from 'lib/style'

import { DynamicBlock } from './DynamicBlock'

type TabsBlockProps = {
  block: TabsStoryblok
}

export const TabsBlock = ({ block, ...props }: TabsBlockProps): JSX.Element => {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <Wrapper {...props}>
      <Container>
        <Text
          variant="big"
          weight="bold"
          css={{ mb: '$40', scrollMarginTop: '50px' }}
          id={slugify(block.title)}
        >
          {block.title}
        </Text>
        <Tabs>
          {block.tabs.map((tab, index) => {
            return (
              <Tab
                isActive={index === activeTab}
                onClick={(e) => {
                  e.stopPropagation()
                  setActiveTab(index)
                }}
                key={tab._uid}
              >
                <Text>{tab.title}</Text>
              </Tab>
            )
          })}
        </Tabs>
        {block.tabs[activeTab].body?.map((block) => {
          if (block.component === 'comparison_tool') {
            return (
              <Box
                key={block._uid}
                css={{
                  mx: '-20px',
                  '@md': { mx: '-56px' },
                  '@lg': { mx: '-96px' },
                }}
              >
                <DynamicBlock block={block} />
              </Box>
            )
          }
          return <DynamicBlock key={block._uid} block={block} />
        })}
      </Container>
    </Wrapper>
  )
}

const Wrapper = styled('section', {
  background: '$background',
  color: '$textPrimary',
  py: '$40',
})
