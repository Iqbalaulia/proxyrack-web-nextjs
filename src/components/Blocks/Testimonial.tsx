import { motion } from 'framer-motion'
import NextImage from 'next/image'
import { wrap } from 'popmotion'
import { useCallback, useState } from 'react'

import { Box, Container, Divider, Flex, Icon, Tag, Text } from 'UI'
import useInterval from 'common/hooks/useInterval'
import { TestimonialStoryblok } from 'common/types'
import { getImageAttributes } from 'common/utils/content'
import { usePrevious, useWindowSize } from 'components/utils'
import { styled } from 'lib/style'

import { NewRichText } from './NewRichText'

type TestimonialProps = {
  block: TestimonialStoryblok
}

const timeoutPeriod = 5000

export const Testimonial = ({
  block,
  ...props
}: TestimonialProps): JSX.Element => {
  const isReversed = block.layout === 'right'

  const [page, setPage] = useState(0)
  const previousPage = usePrevious(page)

  const direction = page > (previousPage || 0) ? 1 : -1

  const { width } = useWindowSize()

  const imageIndex = wrap(0, block.testimonial_entry.length, page)

  const directionOffset = width <= 991 ? 20 : 100

  const variants = {
    enter: (direction: number) => {
      return {
        x: direction < 0 ? directionOffset : -directionOffset,
        opacity: 0,
      }
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction > 0 ? directionOffset : -directionOffset,
        opacity: 0,
      }
    },
  }

  const incrementCurrIndex = useCallback(() => {
    setPage(page === block.testimonial_entry.length - 1 ? 0 : page + 1)
  }, [page, block.testimonial_entry.length])

  useInterval(() => {
    incrementCurrIndex()
  }, timeoutPeriod)

  return (
    <Wrapper {...props}>
      <StyledContainer
        css={{
          flexDirection: isReversed ? 'column' : 'column-reverse',

          '@lg': {
            flexDirection: isReversed ? 'row' : 'row-reverse',
          },
        }}
      >
        {block.image && block.image.filename && (
          <ImageWrapper
            css={{
              mt: isReversed ? '$0' : '$40',

              '@md': {
                mt: isReversed ? '$0' : '$56',
              },

              '@lg': {
                mt: '$0',
              },
            }}
          >
            <NextImage
              {...getImageAttributes(block.image)}
              objectFit="cover"
              quality="100"
              width={getImageAttributes(block.image).width}
              height={getImageAttributes(block.image).height}
            />
          </ImageWrapper>
        )}
        <WrapperContent
          css={{
            mt: isReversed ? '$40' : '$0',

            '@md': {
              mt: isReversed ? '$56' : '$0',
            },

            '@lg': {
              ml: isReversed ? '112px' : '$0',
              mr: isReversed ? '$0' : '122px',
            },
          }}
        >
          {block.tag && (
            <Box>
              <Tag css={{ mb: '$24' }}>{block.tag}</Tag>
            </Box>
          )}
          {block.title && (
            <Text variant="title" css={{ mb: '$24', '@md': { mb: '$32' } }}>
              {block.title}
            </Text>
          )}
          <Divider
            css={{
              display: 'none',
              '@md': { display: 'flex' },
              backgroundColor: '$gray200',
            }}
          />
          <Flex css={{ mt: '$24', mb: '$24', '@md': { mt: '$32', mb: '$0' } }}>
            <Box
              role="button"
              onClick={() => setPage(page - 1)}
              css={{
                '@hover': { '&:hover': { opacity: 0.75 } },
                cursor: 'pointer',
                transform: 'rotate(90deg)',
                mr: '$8',
              }}
            >
              <Icon icon="chevron-down" />
            </Box>
            <Box
              role="button"
              onClick={() => setPage(page + 1)}
              css={{
                '@hover': { '&:hover': { opacity: 0.75 } },
                cursor: 'pointer',
                transform: 'rotate(-90deg)',
              }}
            >
              <Icon icon="chevron-down" />
            </Box>
          </Flex>
          {block.testimonial_entry[imageIndex]?.description &&
            block.testimonial_entry[imageIndex]?.author && (
              <TestimonialWrapper
                key={page}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 250, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
              >
                <Text variant="big" css={{ mb: '$24', '@md': { mb: '$32' } }}>
                  <NewRichText
                    css={{
                      fontSize: 'inherit',
                      lineHeight: 'inherit',
                      letterSpacing: 'inherit',
                    }}
                    document={
                      Array.isArray(
                        block.testimonial_entry?.[imageIndex]?.description
                      )
                        ? block.testimonial_entry[imageIndex].description?.[0]
                            .document
                        : block.testimonial_entry[imageIndex].description
                    }
                  />
                </Text>
                <Text variant="small">
                  {block.testimonial_entry[imageIndex].author}
                </Text>
              </TestimonialWrapper>
            )}
        </WrapperContent>
      </StyledContainer>
    </Wrapper>
  )
}

const Wrapper = styled('section', {
  background: '$background',
  color: '$textPrimary',
  pt: '$40',
  pb: '$40',

  '@md': {
    pt: '$56',
    pb: '$56',
  },

  '@lg': {
    pt: '$64',
    pb: '$64',
  },
})

const WrapperContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  '@lg': {
    mt: '$48',
    maxWidth: '28rem',
  },
})

const TestimonialWrapper = styled(motion.div, {
  pb: '$32',

  '@md': {
    py: '$32',
  },
})

const ImageWrapper = styled('div', {
  img: {
    objectFit: 'cover',
    height: '100%',
    width: '100%',
    borderRadius: '$sm',
  },

  width: '100%',
  maxWidth: '38rem',
  position: 'relative',
  height: '100%',

  alignSelf: 'center',
})

const StyledContainer = styled(Container, {
  display: 'flex',
})
