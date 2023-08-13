import { Container, Theme } from 'UI'
import { TableStoryblok } from 'common/types'
import { Table } from 'components/Shared/Table/Table'
import { styled } from 'lib/style'

type PropsTypes = {
  block: TableStoryblok
}

export const TableBlock = ({ block }: PropsTypes): JSX.Element => {
  const cols = block.table.thead.map((x: { value: any }) => x.value)
  return (
    <Theme
      theme={block.block_configurations?.appearance_theme || 'lightForBlock'}
    >
      <Container>
        <InnerWrapper>
          <Table
            thead={cols}
            tbody={block.table.tbody.map((row: { body: { value: any }[] }) =>
              cols.reduce(
                (prev: any, cur: string, index: number) => ({
                  ...prev,
                  [cur]: row.body[index].value,
                }),
                {}
              )
            )}
          />
        </InnerWrapper>
      </Container>
    </Theme>
  )
}

const InnerWrapper = styled('div', {
  height: '450px',
  overflow: 'auto',
  borderRadius: '$md',
  '& table': {
    marginBottom: '-10px',

    background: '$background',
    color: '$textPrimary',
    borderRadius: '$md',

    '& thead': {
      position: 'sticky',
      background: '$background',
      boxShadow: '0px 1px 3px #eee',
      top: '0',
      '& th': {
        px: '5px',
        '& p': {
          fontWeight: '600',
        },
      },
    },

    '& tbody': {
      '& td': {
        px: '5px',
      },
    },
  },
})
