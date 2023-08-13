import React, { useEffect } from 'react'

import { global } from 'lib/style'
import { Global, Theme } from 'UI'

export const decorators = [
  (Story, context) => {
    // we want storybook to have white (neutral) background
    useEffect(() => {
      document.body.style = `background: white`
    }, [])

    return (
      <>
        <Global />
        <Theme theme={context.globals.theme}>
          <Story />
        </Theme>
      </>
    )
  },
]

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'light',
    toolbar: {
      icon: 'paintbrush',
      items: [
        { value: 'light', title: 'Light' },
        { value: 'dark', title: 'Dark' },
      ],
    },
  },
}
