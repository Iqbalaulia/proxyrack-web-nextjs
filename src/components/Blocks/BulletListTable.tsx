import { Container } from 'UI'
import { BulletListTableStoryblok } from 'common/types'
import { styled } from 'lib/style'

import { NewRichText } from './NewRichText'

type PropsTypes = {
  block: BulletListTableStoryblok
}

export const BulletListTable = ({ block }: PropsTypes): JSX.Element => {
  const { contents, columns } = block
  return (
    <Container variant="normal">
      <InnerWrapper>
        <StyledList
          css={{
            '& ul,ol': {
              columns: 1,
              '@sm': {
                columns: parseInt((columns / 3).toString()),
              },
              '@md': {
                columns: parseInt((columns / 2).toString()),
              },
              '@lg': {
                columns: columns,
              },
            },
          }}
        >
          {contents.map((content, index) => (
            <>
              {!!index && <br />}
              <NewRichText key={index} block={content} />
            </>
          ))}
        </StyledList>
      </InnerWrapper>
    </Container>
  )
}
const InnerWrapper = styled('div', {
  color: '$textPrimary',
  background: '$background',
  borderRadius: '$md',
})
const StyledList = styled('div', {
  '& li::before': {
    color: '$textPrimary',
    fontSize: '11.2pt',
  },
  '& a': {
    textDecoration: 'underline',
  },
})
