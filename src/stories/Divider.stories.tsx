import { ComponentStory, ComponentMeta } from '@storybook/react'
import React from 'react'

import { Box, Divider } from 'UI'

export default {
  title: 'UI/Divider',
  component: Divider,
  argTypes: {
    variant: {
      options: ['primary', 'secondary'],
      control: { type: 'radio' },
    },
    orientation: {
      options: ['horizontal', 'vertical'],
      control: { type: 'radio' },
    },
  },
} as ComponentMeta<typeof Divider>

const Template: ComponentStory<typeof Divider> = ({ css: _css, ...args }) => (
  <Box css={{ height: '50px' }}>
    <Divider {...args} />
  </Box>
)

export const Horizontal = Template.bind({})
Horizontal.args = {
  variant: 'primary',
  orientation: 'horizontal',
}

export const Vertical = Template.bind({})
Vertical.args = {
  variant: 'secondary',
  orientation: 'vertical',
}
