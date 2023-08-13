import { ComponentStory, ComponentMeta } from '@storybook/react'
import React from 'react'

import { Box, Button } from 'UI'

export default {
  title: 'UI/Button',
  component: Button,
  argTypes: {
    variant: {
      options: ['primary', 'ghost', 'secondary'],
      control: { type: 'radio' },
    },
  },
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = ({ css: _css, ...args }) => (
  <Box
    css={{
      width: '100%',
      height: '500px',
      padding: '$16',
      backgroundColor: '$background',
    }}
  >
    <Button {...args}>View Pricing</Button>
  </Box>
)

export const Primary = Template.bind({})
Primary.args = {
  variant: 'primary',
}

export const Ghost = Template.bind({})
Ghost.args = {
  variant: 'ghost',
}

export const Secondary = Template.bind({})
Secondary.args = {
  variant: 'secondary',
}
