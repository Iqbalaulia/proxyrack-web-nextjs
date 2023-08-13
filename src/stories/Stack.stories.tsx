import { ComponentStory, ComponentMeta } from '@storybook/react'
import React from 'react'

import { Stack, Box, Text } from 'UI'
import { space } from 'lib/style'

export default {
  title: 'UI/Stack',
  component: Stack,
  argTypes: {
    direction: {
      options: ['horizontal', 'vertical'],
      control: { type: 'radio' },
    },
    spacing: {
      options: Object.keys(space),
      control: { type: 'select' },
    },
  },
} as ComponentMeta<typeof Stack>

const Template: ComponentStory<typeof Stack> = ({ css: _css, ...args }) => (
  <Stack {...args}>
    {new Array(5).fill('').map((_, i) => (
      <Box
        key={i}
        css={{
          width: '250px',
          padding: '$16',
          borderRadius: '$md',
          backgroundColor: '$background',
          color: '$textPrimary',
        }}
      >
        <Text
          as="h2"
          variant="big"
          weight="bold"
          css={{
            borderBottom: '1px solid $subtle',
            pb: '$4',
          }}
        >
          Card title
        </Text>
        <Text as="p" css={{ mt: '$4', color: '$textSecondary' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Text>
      </Box>
    ))}
  </Stack>
)

export const Primary = Template.bind({})
Primary.args = {
  direction: 'horizontal',
  spacing: '8',
}

export const Vertical = Template.bind({})
Vertical.args = {
  direction: 'vertical',
  spacing: '8',
}

export const MoreSpace = Template.bind({})
MoreSpace.args = {
  direction: 'horizontal',
  spacing: '24',
}
