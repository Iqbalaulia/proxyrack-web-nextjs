import { ComponentStory, ComponentMeta } from '@storybook/react'
import React from 'react'

import { Text } from 'UI'

export default {
  title: 'UI/Text',
  component: Text,
  argTypes: {
    variant: {
      options: ['caps', 'small', 'small-tight', 'body', 'big', 'title', 'huge'],
      control: { type: 'radio' },
    },
    weight: {
      options: ['normal', 'bold'],
      control: { type: 'radio' },
    },
  },
} as ComponentMeta<typeof Text>

const Template: ComponentStory<typeof Text> = ({ css: _css, ...args }) => (
  <Text {...args}>The big brown fox jumps over the lazy dog.</Text>
)

export const Primary = Template.bind({})
Primary.args = {}

export const Caps = Template.bind({})
Caps.args = {
  variant: 'caps',
}

export const CapsBold = Template.bind({})
CapsBold.args = {
  variant: 'caps',
  weight: 'bold',
}

export const Small = Template.bind({})
Small.args = {
  variant: 'small',
}

export const SmallTight = Template.bind({})
SmallTight.args = {
  variant: 'small-tight',
}

export const Body = Template.bind({})
Body.args = {
  variant: 'body',
}

export const Big = Template.bind({})
Big.args = {
  variant: 'big',
}

export const Title = Template.bind({})
Title.args = {
  variant: 'title',
}

export const Huge = Template.bind({})
Huge.args = {
  variant: 'huge',
}
