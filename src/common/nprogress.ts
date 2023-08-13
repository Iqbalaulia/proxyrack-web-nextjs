import { global } from 'lib/style'

export const nprogress = global({
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
