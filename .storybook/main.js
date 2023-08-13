const path = require('path')
const nextConfig = require('../next.config')

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  webpackFinal: async (config) => {
    const next = nextConfig.webpack(config, { isServer: false })

    const fileLoaderRule = next.module.rules.find(
      (rule) => rule.test && rule.test.test('.svg')
    )
    fileLoaderRule.exclude = /\.svg$/

    // allow absolute imports
    next.resolve.modules = [
      path.resolve(__dirname, '..', 'src'),
      'node_modules',
    ]

    return next
  },
}
