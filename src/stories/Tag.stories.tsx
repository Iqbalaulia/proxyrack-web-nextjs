import { ComponentStory, ComponentMeta } from '@storybook/react'
import React from 'react'

import { Box, Tag } from 'UI'

export default {
  title: 'UI/Tag',
  component: Tag,
  argTypes: {
    variant: {
      options: ['primary', 'secondary'],
      control: { type: 'radio' },
    },
  },
} as ComponentMeta<typeof Tag>

const Template: ComponentStory<typeof Tag> = ({ css: _css, ...args }) => (
  <Box
    css={{
      width: '100%',
      height: '500px',
      padding: '$16',
      backgroundColor: '$background',
    }}
  >
    <Tag {...args}>Placeholder</Tag>
  </Box>
)

export const Primary = Template.bind({})
Primary.args = {
  variant: 'primary',
}

export const Secondary = Template.bind({})
Secondary.args = {
  variant: 'secondary',
}
