import { styled } from 'lib/style'

export const Table = styled('table', {
  borderCollapse: 'collapse',
  width: '100%',
})

export const Thead = styled('thead', {
  backgroundColor: 'transparent',
})

export const Tbody = styled('tbody', {
  backgroundColor: 'transparent',
})

export const Tr = styled('tr', {
  backgroundColor: 'transparent',

  borderBottom: '1px solid $muted',
})

export const Th = styled('th', {
  py: '$8',

  textAlign: 'left',
})

export const Td = styled('td', {
  py: '$12',
  pr: '$80',

  textAlign: 'left',

  '@lg': {
    pr: '$96',
  },
})
