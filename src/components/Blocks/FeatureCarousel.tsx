import { motion } from 'framer-motion'
import NextImage from 'next/image'
import { useEffect, useRef, useState, useCallback } from 'react'

import { Box, Container, Divider, Flex, Text } from 'UI'
import {
  FeatureCarouselEntryStoryblok,
  FeatureCarouselStoryblok,
} from 'common/types'
import { getImageAttributes } from 'common/utils/content'
import { CMSRichTextField } from 'components/Shared/CMSRichTextField'
import { useWindowSize } from 'components/utils'
import { styled } from 'lib/style'

import { Editable } from './Editable'

type FeatureCarouselProps = {
  block: FeatureCarouselStoryblok
}

const timeoutPeriod = 5000

export const FeatureCarousel = ({
  block,
  ...props
}: FeatureCarouselProps): JSX.Element => {
  const [activeIndex, setActiveIndex] = useState(-1)
  const timer = useRef<NodeJS.Timeout | null>(null)
  const isReversed = block.layout === 'right'

  const { width } = useWindowSize()

  const incrementCurrIndex = useCallback(() => {
    setActiveIndex(
      activeIndex ===
        [
          ...(block?.feature_carousel_entry || []),
          ...(block?.feature_carousel_entry_sec_col || []),
        ].length -
          1
        ? 0
        : activeIndex + 1
    )
  }, [
    activeIndex,
    block?.feature_carousel_entry,
    block?.feature_carousel_entry_sec_col,
  ])

  useEffect(
    function setupTimer() {
      if (width >= 992) {
        timer.current = setTimeout(incrementCurrIndex, timeoutPeriod)
      }
      return () => {
        if (timer.current !== null) {
          clearTimeout(timer.current)
        }
      }
    },
    [incrementCurrIndex, width]
  )

  useEffect(
    function initialize() {
      if (activeIndex === -1) {
        setActiveIndex(0)
      }
    },
    [activeIndex, setActiveIndex]
  )

  const handleChangeFeature = (featureId: number) => {
    setActiveIndex(featureId)

    if (featureId === activeIndex) {
      if (timer.current !== null) {
        clearTimeout(timer.current)
      }
      timer.current = setTimeout(incrementCurrIndex, timeoutPeriod)
    }
  }

  const renderItem = (
    feature: FeatureCarouselEntryStoryblok,
    index: number,
    isActive: boolean
  ) => {
    return (
      <LeftWrapper onClick={() => handleChangeFeature(index)}>
        <Text
          as="p"
          variant="small"
          weight="bold"
          css={{
            color: '$textPrimary',
            transition: 'color $appearance',
          }}
        >
          {feature.title}
        </Text>
        <AnimatedDescription
          initial={{ height: 0 }}
          animate={{ height: isActive ? 'auto' : 0 }}
        >
          <Text
            as="p"
            variant="small"
            css={{
              pt: '$8',
              color: isActive ? '$textSecondary' : '$gray400',
              transition: 'color $appearance',
            }}
          >
            <CMSRichTextField
              css={{
                fontSize: 'inherit',
                lineHeight: 'inherit',
                letterSpacing: 'inherit',
              }}
              document={
                Array.isArray(feature.description)
                  ? feature.description?.[0]?.document
                  : feature.description
              }
            />
          </Text>
        </AnimatedDescription>
        <Box css={{ position: 'relative' }}>
          <Divider
            css={{
              my: '$16',
              backgroundColor: '$gray200',
              display: 'none',
              '@lg': { display: 'flex' },
            }}
          />
          <Bar
            css={{
              position: 'absolute',
              top: '48%',
              width: isActive ? '100%' : '0%',
              opacity: isActive ? 1 : 0,
              display: 'none',
              '@lg': { display: 'flex' },
            }}
          />
        </Box>
      </LeftWrapper>
    )
  }

  return (
    <section {...props}>
      <Container css={{ position: 'relative' }}>
        <Wrapper>
          {block.feature_carousel_entry_sec_col?.length ? (
            <Flex
              css={{
                width: '100%',
                flexDirection: 'column',
                justifyContent: 'stretch',
                alignItems: 'top',
                '@lg': {
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'top',
                },
              }}
            >
              <Box>
                {block?.feature_carousel_entry?.map((feature, index) => {
                  const isActive = activeIndex === index
                  return (
                    <Editable key={feature._uid} block={feature}>
                      {renderItem(feature, index, isActive)}
                      <Divider
                        css={{
                          my: '$16',
                          backgroundColor: '$gray200',
                          display: 'block',
                          '@lg': { display: 'none' },
                        }}
                      />
                    </Editable>
                  )
                })}
              </Box>
              <Box>
                {block?.feature_carousel_entry_sec_col?.map(
                  (feature, _index) => {
                    const index =
                      (block.feature_carousel_entry_sec_col?.length ?? 0) +
                      _index
                    const isActive = activeIndex === index
                    return (
                      <Editable key={feature._uid} block={feature}>
                        {renderItem(feature, index, isActive)}
                        <Divider
                          css={{
                            my: '$16',
                            backgroundColor: '$gray200',
                            display: 'block',
                            '@lg': { display: 'none' },
                          }}
                        />
                      </Editable>
                    )
                  }
                )}
              </Box>
            </Flex>
          ) : (
            <Flex
              css={{
                flexDirection: 'column',
                justifyContent: 'space-between',

                '@lg': {
                  flexDirection: isReversed ? 'row-reverse' : 'row',
                },
              }}
            >
              <Box
                css={{
                  pt: '$0',
                  alignSelf: 'center',
                }}
              >
                {block?.feature_carousel_entry?.map((feature, index) => {
                  const isActive = activeIndex === index
                  return (
                    <Editable key={feature._uid} block={feature}>
                      {renderItem(feature, index, isActive)}
                      {width <= 991 && feature.image && feature.image.filename && (
                        <>
                          <RightWrapper
                            css={{ display: isActive ? 'block' : 'none' }}
                          >
                            <NextImage
                              {...getImageAttributes(feature.image)}
                              objectFit="cover"
                              quality="100"
                              width={getImageAttributes(feature.image).width}
                              height={getImageAttributes(feature.image).height}
                            />
                          </RightWrapper>
                          <Divider
                            css={{ my: '$16', backgroundColor: '$gray200' }}
                          />
                        </>
                      )}
                    </Editable>
                  )
                })}
              </Box>
              {width >= 992 && block.feature_carousel_entry.length > 0 && (
                <RightWrapper>
                  <NextImage
                    {...getImageAttributes(
                      block.feature_carousel_entry[activeIndex].image
                    )}
                    objectFit="cover"
                    quality="100"
                    width={
                      getImageAttributes(
                        block.feature_carousel_entry[activeIndex].image
                      ).width
                    }
                    height={
                      getImageAttributes(
                        block.feature_carousel_entry[activeIndex].image
                      ).height
                    }
                    priority
                  />
                </RightWrapper>
              )}
            </Flex>
          )}
        </Wrapper>
      </Container>
    </section>
  )
}

const Wrapper = styled('div', {
  background: '$background',
  borderRadius: '$md',
  color: '$primary',
  p: '$20',

  '@md': {
    p: '$28',
  },

  '@lg': {
    pt: '$32',
    pb: '$48',
  },
})

const LeftWrapper = styled(motion.div, {
  display: 'flex',
  flexDirection: 'column',

  maxWidth: 'unset',
  minWidth: 'unset',

  cursor: 'pointer',

  '@lg': {
    maxWidth: '288px',
    minWidth: '288px',
  },
})

const RightWrapper = styled('div', {
  img: {
    objectFit: 'cover',
    height: '100%',
    width: '100%',
    borderRadius: '$md',
  },

  display: 'flex',
  alignSelf: 'center',

  width: '100%',
  maxWidth: '53rem',
  height: '100%',

  position: 'relative',
  right: '$0',
  top: '$0',

  mb: '$16',

  '@lg': {
    mb: '$0',
  },
})

const AnimatedDescription = styled(motion.section, {
  overflow: 'hidden',
})

const Bar = styled('div', {
  backgroundColor: '$brand900',
  height: '1px',

  transition: 'width 5s linear',
})
