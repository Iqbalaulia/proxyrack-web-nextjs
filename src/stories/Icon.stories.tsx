import { ComponentStory, ComponentMeta } from '@storybook/react'
import React from 'react'

import { Box, Icon } from 'UI'

export default {
  title: 'UI/Icon',
  component: Icon,
} as ComponentMeta<typeof Icon>

const Template: ComponentStory<typeof Icon> = ({ ...args }) => (
  <Icon {...args} />
)

export const Default = Template.bind({})
Default.args = {
  icon: 'arrow-left',
}

export const Color: ComponentStory<typeof Icon> = ({ ...args }) => (
  <Box css={{ color: '$brand400' }}>
    <Icon {...args} />
  </Box>
)
Color.args = {
  icon: 'arrow-left',
}
