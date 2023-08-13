import { ComponentStory, ComponentMeta } from '@storybook/react'
import React from 'react'

import { Box, Input } from 'UI'

export default {
  title: 'UI/Input',
  component: Input,
} as ComponentMeta<typeof Input>

const Template: ComponentStory<typeof Input> = ({ ...args }) => (
  <Box
    css={{
      width: '100%',
      height: '500px',
      padding: '$16',
      backgroundColor: '$background',
    }}
  >
    <Input placeholder="Search" {...args} />
  </Box>
)

export const Default = Template.bind({})

export const InputIcon = Template.bind({})
InputIcon.args = {
  icon: 'search',
}
