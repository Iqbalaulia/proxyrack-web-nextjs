import { ComponentStory, ComponentMeta } from '@storybook/react'
import React from 'react'

import { Box, Select } from 'UI'

export default {
  title: 'UI/Select',
  component: Select,
} as ComponentMeta<typeof Select>

const Template: ComponentStory<typeof Select> = ({ ...args }) => (
  <Box
    css={{
      width: '100%',
      height: '500px',
      padding: '$16',
      backgroundColor: '$background',
    }}
  >
    <Select {...args} />
  </Box>
)

export const Default = Template.bind({})
Default.args = {
  children: <option value="proxyrack">ProxyRack</option>,
}

export const Medium = Template.bind({})
Medium.args = {
  variant: 'medium',
  children: <option value="proxyrack">ProxyRack</option>,
}
