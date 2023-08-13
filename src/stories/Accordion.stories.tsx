import { ComponentStory, ComponentMeta } from '@storybook/react'
import React, { useState } from 'react'

import { Accordion, Text, Box } from 'UI'

export default {
  title: 'UI/Accordion',
  component: Accordion,
} as ComponentMeta<typeof Accordion>

const Template: ComponentStory<typeof Accordion> = ({ ...args }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Box
      css={{
        width: '100%',
        height: '500px',
        padding: '$16',
        backgroundColor: '$background',
      }}
    >
      <Accordion {...args} isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
    </Box>
  )
}

export const Default = Template.bind({})
Default.args = {
  title: (
    <Text as="p" variant="big" weight="bold" css={{ color: '$textPrimary' }}>
      What is the level of anonymity of the proxy?
    </Text>
  ),
  children: (
    <Text variant="body" css={{ pb: '$24', color: '$textSecondary' }}>
      Proxys listed on our site are encrypted and stable. Using a proxy will
      enable you to access the internet using a different IP address to the one
      on your computer. Rather than seeing your computers IP address, the
      internet will see this new IP address, which can be in any location around
      the world, enabling you to access the internet around the world and access
      it anonymously.
    </Text>
  ),
}
