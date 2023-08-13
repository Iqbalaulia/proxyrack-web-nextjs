import { Box, Container, Text } from 'UI'
import { InfoRowStoryblok } from 'common/types'
import { CMSRichTextField } from 'components/Shared/CMSRichTextField'
import { styled } from 'lib/style'

import { Editable } from './Editable'

type InfoRowProps = {
  block: InfoRowStoryblok
}

export const InfoRow = ({ block, ...props }: InfoRowProps): JSX.Element => {
  const isContentLeft = block.layout === 'left'

  return (
    <section {...props}>
      <Container>
        <Wrapper>
          {block.info_row_entry.length > 0 && (
            <WrapperInfo
              css={{
                '@md': {
                  gridTemplateColumns: `repeat(${Math.min(
                    block.info_row_entry.length,
                    4
                  )}, 128px)`,
                },
                '@lg': {
                  justifyContent: isContentLeft ? 'flex-start' : 'center',
                },
              }}
            >
              {block.info_row_entry.map((info) => {
                return (
                  <Editable key={info._uid} block={info}>
                    <Box
                      css={{
                        maxWidth: '8rem',
                        textAlign: 'center',

                        '@lg': {
                          textAlign: isContentLeft ? 'left' : 'center',
                        },
                      }}
                    >
                      <Text
                        as="h4"
                        variant="big"
                        weight="bold"
                        css={{ mb: '$8', color: '$brand400' }}
                      >
                        {info.title}
                      </Text>
                      <Text as="p" variant="small">
                        <CMSRichTextField
                          css={{
                            fontSize: ' ',
                            lineHeight: 'inherit',
                            letterSpacing: 'inherit',
                          }}
                          document={
                            Array.isArray(info.description)
                              ? info.description?.[0]?.document
                              : info.description
                          }
                        />
                      </Text>
                    </Box>
                  </Editable>
                )
              })}
            </WrapperInfo>
          )}
        </Wrapper>
      </Container>
    </section>
  )
}

const Wrapper = styled('div', {
  borderRadius: '$md',
  background: '$background',
  color: '$textPrimary',
  py: '$40',
  px: '$10',

  '@md': {
    py: '$32',
  },
})

const WrapperInfo = styled('div', {
  display: 'grid',
  columnGap: '$24',
  rowGap: '$32',
  justifyContent: 'center',

  gridTemplateColumns: 'repeat(2, 1fr)',

  '@md': {
    columnGap: '$56',

    placeItems: 'start center',
  },
})
