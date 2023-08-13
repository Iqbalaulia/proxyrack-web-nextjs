import { ComponentStory, ComponentMeta } from '@storybook/react'
import React, { useState } from 'react'

import { Box, InputRange } from 'UI'

export default {
  title: 'UI/InputRange',
  component: InputRange,
} as ComponentMeta<typeof InputRange>

const Template: ComponentStory<typeof InputRange> = () => {
  const [value, setValue] = useState(0)

  return (
    <Box
      css={{
        width: '100%',
        height: '500px',
        padding: '$16',
        backgroundColor: '$background',
      }}
    >
      <InputRange
        min={0}
        max={100}
        step="10"
        value={value}
        onChange={(e) => setValue(Number(e.currentTarget.value))}
      />
    </Box>
  )
}

export const Primary = Template.bind({})
