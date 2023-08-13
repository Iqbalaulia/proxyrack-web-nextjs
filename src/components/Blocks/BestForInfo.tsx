import NextImage from 'next/image'

import { Box, Container, Flex, Tag, Text } from 'UI'
import { BestForInfoStoryblok } from 'common/types'
import { getImageAttributes } from 'common/utils/content'
import { styled } from 'lib/style'

import { Editable } from './Editable'

type BestForInfoProps = {
  block: BestForInfoStoryblok
}

export const BestForInfo = ({
  block,
  ...props
}: BestForInfoProps): JSX.Element => {
  return (
    <section {...props}>
      <Container>
        <Wrapper>
          {block.tag && (
            <Flex
              css={{
                justifyContent: 'center',
                mb: '$32',
                '@md': {
                  mb: '$48',
                },
              }}
            >
              <Tag>{block.tag}</Tag>
            </Flex>
          )}
          {block.best_for_info_entry.length > 0 && (
            <WrapperEntry
              css={{
                '@lg': {
                  gridTemplateColumns: `repeat(${block.best_for_info_entry.length}, 1fr)`,
                },
              }}
            >
              {block.best_for_info_entry.map((entry) => {
                return (
                  <Editable key={entry._uid} block={entry}>
                    <Box
                      css={{
                        backgroundColor: '$background',
                        color: '$textPrimary',
                        maxWidth: '180px',
                      }}
                    >
                      {entry.icon && entry.icon.filename && (
                        <ImageWrapper css={{ margin: '0 auto' }}>
                          <NextImage
                            {...getImageAttributes(entry.icon, '128x0')}
                            layout="fixed"
                            width="64px"
                            height="64px"
                            objectFit="cover"
                          />
                        </ImageWrapper>
                      )}
                      {entry.label && (
                        <Text
                          as="p"
                          variant="small"
                          css={{
                            color: '$textSecondary',
                            mt: '$16',
                            textAlign: 'center',
                          }}
                        >
                          {entry.label}
                        </Text>
                      )}
                    </Box>
                  </Editable>
                )
              })}
            </WrapperEntry>
          )}
        </Wrapper>
      </Container>
    </section>
  )
}

const Wrapper = styled('section', {
  py: '$40',
  background: '$background',
  borderRadius: '$md',
})

const WrapperEntry = styled('div', {
  display: 'grid',

  justifyContent: 'space-between',

  justifyItems: 'center',

  gridTemplateColumns: 'repeat(2, minmax(calc(50% - 32px), 155px))',

  rowGap: '$32',

  '@md': {
    columnGap: '$32',
    rowGap: '$56',
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
})

const ImageWrapper = styled('div', {
  img: {
    objectFit: 'cover',
    height: '100%',
    width: '100%',
  },

  width: '100%',
  maxWidth: '3.75rem',
  maxHeight: '3.75rem',
  position: 'relative',
  height: '100%',
})
