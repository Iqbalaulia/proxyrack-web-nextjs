import { ComponentStory, ComponentMeta } from '@storybook/react'
import React, { useState } from 'react'

import { Box, Tab, Tabs } from 'UI'

export default {
  title: 'UI/Tabs',
  component: Tabs,
  argTypes: {
    variant: {
      options: ['default', 'rounded'],
      control: { type: 'radio' },
    },
  },
} as ComponentMeta<typeof Tabs>

const tabList = [
  'All',
  'Articles',
  'Netflix',
  'News',
  'Products Updates',
  'Reviews',
]

const Template: ComponentStory<typeof Tabs> = ({ css: _css, ...args }) => {
  const [tabIndex, setTabIndex] = useState(tabList[0])
  return (
    <Box
      css={{
        width: '100%',
        height: '500px',
        padding: '$16',
        backgroundColor: '$background',
      }}
    >
      <Tabs {...args}>
        {tabList.map((val, index) => {
          return (
            <Tab
              isActive={val === tabIndex}
              onClick={() => setTabIndex(val)}
              key={index}
            >
              {val}
            </Tab>
          )
        })}
      </Tabs>
    </Box>
  )
}

export const Default = Template.bind({})
Default.args = {
  variant: 'default',
}

export const Rounded = Template.bind({})
Rounded.args = {
  variant: 'rounded',
}
