import { Router } from 'next/router'
import ProgressBar from 'nprogress'

import { global } from 'lib/style'

ProgressBar.configure({ showSpinner: false })
Router.events.on('routeChangeStart', () => ProgressBar.start())
Router.events.on('routeChangeComplete', () => ProgressBar.done())
Router.events.on('routeChangeError', () => ProgressBar.done())

const nprogress = global({
  '#nprogress': { pointerEvents: 'none', position: 'fixed', zIndex: '$max' },
  '#nprogress .bar': {
    background: '$accentSoft',
    position: 'fixed',
    zIndex: '$max',
    top: '0',
    left: '0',
    width: '100%',
    height: '3px',
  },
})

export const NProgress = (): null => {
  nprogress()

  return null
}
