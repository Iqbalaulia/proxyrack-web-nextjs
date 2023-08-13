import { useMemo } from 'react'

import { Container } from 'UI'
import { GridLayoutStoryblok } from 'common/types'
import { CMSRichText } from 'components/Shared/CMSRichText'
import { styled } from 'lib/style'

type PropsTypes = {
  block: GridLayoutStoryblok
}

export const GridLayout = ({ block }: PropsTypes): JSX.Element => {
  const Wrapper = block.inside_container ? Container : 'div'
  const slicedItems = useMemo(() => {
    const items = []
    const cols = parseInt(block.columns?.toString())
    if (!cols) {
      return []
    }
    for (let index = 0; index < block.items.length; index = index + cols) {
      let tmp = block.items.slice(index, index + cols)
      if (tmp.length < cols) {
        tmp = Array(cols)
          .fill(undefined)
          .map((_, i) => tmp[i])
      }
      items.push(tmp)
    }
    return items
  }, [block.columns, block.items])

  const titleStyles: any = { textAlign: 'left', '@lg': { textAlign: 'center' } }
  return (
    <Wrapper css={{ background: '$background', color: '$textPrimary' }}>
      <CMSRichText css={titleStyles} document={block.title} />
      <GridContainer>
        {slicedItems.map((row, i) => (
          <Row key={i}>
            {row.map((col, j) => (
              <Col key={j}>
                <CMSRichText
                  css={{
                    color: '$textPrimary',
                    paddingLeft: '0',
                    textAlign: 'left',
                    ul: {
                      paddingLeft: '30px',
                    },
                    width: '100%',
                  }}
                  document={col?.document}
                />
              </Col>
            ))}
          </Row>
        ))}
      </GridContainer>
    </Wrapper>
  )
}

const GridContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
})
const Row = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  '@lg': {
    flexDirection: 'row',
  },
})
const Col = styled('div', {
  height: '100%',
  display: 'block',
  grow: '1',
  width: '100%',
})
