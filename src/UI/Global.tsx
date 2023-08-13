import { global } from 'lib/style'

const globalStyles = global({
  html: {
    boxSizing: 'border-box',
    textRendering: 'geometricPrecision',
    fontSmooth: 'auto',
    webkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
  },
  '*, *:before, *:after': {
    boxSizing: 'inherit',
  },
  'body, h1, h2, h3, h4, h5, h6, p, ol, ul': {
    margin: 0,
    padding: 0,
    fontWeight: 'normal',
  },
  img: {
    maxWidth: '100%',
    height: 'auto',
  },
  a: {
    color: 'inherit',
    textDecoration: 'none',
  },
  'body, button, input': {
    fontFamily: '$sans',
    padding: '$0',
  },
  body: {
    color: '$textPrimary',
    backgroundColor: '$background',
  },
  '::selection': {
    color: '$background',
    backgroundColor: '$textPrimary',
  },
})

export const Global = (): null => {
  globalStyles()

  return null
}
