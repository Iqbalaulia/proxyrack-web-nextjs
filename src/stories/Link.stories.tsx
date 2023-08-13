import { ComponentStory, ComponentMeta } from '@storybook/react'
import React from 'react'

import { Box, Link, Text } from 'UI'

export default {
  title: 'UI/Link',
  component: Link,
} as ComponentMeta<typeof Link>

const Template: ComponentStory<typeof Link> = ({ ...args }) => (
  <Box
    css={{
      width: '100%',
      height: '500px',
      padding: '$16',
      backgroundColor: '$background',
    }}
  >
    <Link {...args} href="#">
      <Text variant="small" weight="bold">
        Link
      </Text>
    </Link>
  </Box>
)

export const Default = Template.bind({
  variant: 'default',
})

export const Underline = Template.bind({})
Underline.args = {
  variant: 'underline',
}

export const Icon = Template.bind({})
Icon.args = {
  variant: 'icon',
  icon: 'arrow-right',
}
