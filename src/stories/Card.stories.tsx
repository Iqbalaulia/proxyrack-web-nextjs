import { ComponentStory, ComponentMeta } from '@storybook/react'
import React from 'react'

import { LightCard as LightCardComponent, Card, Text } from 'UI'

export default {
  title: 'UI/Card',
  component: Card,
  argTypes: {
    variant: {
      options: ['primary', 'secondary'],
      control: { type: 'radio' },
    },
  },
} as ComponentMeta<typeof Card>

const Template: ComponentStory<typeof Card> = ({ ...args }) => (
  <Card {...args} css={{ p: '$16' }}>
    <Text
      as="h2"
      variant="big"
      weight="bold"
      css={{
        pb: '$4',
        color: '$textPrimary',
      }}
    >
      Card title
    </Text>
    <Text as="p" css={{ mt: '$4', color: '$textSecondary' }}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </Text>
  </Card>
)

export const Primary = Template.bind({})
Primary.args = {
  hasBorder: false,
}

export const Secondary = Template.bind({})
Secondary.args = {
  hasBorder: true,
}

export const LightCard: ComponentStory<typeof LightCardComponent> = ({
  ...args
}) => (
  <LightCardComponent {...args} css={{ p: '$16' }}>
    <Text
      as="h2"
      variant="big"
      weight="bold"
      css={{
        pb: '$4',
        color: '$textPrimary',
      }}
    >
      Card title
    </Text>
    <Text as="p" css={{ mt: '$4', color: '$textSecondary' }}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </Text>
  </LightCardComponent>
)
