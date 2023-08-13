import { AnimatePresence, motion } from 'framer-motion'
import NextLink from 'next/link'
import React, { useEffect, useRef, useState } from 'react'

import { Box, Container, Icon, Stack, Text } from 'UI'
import { Theme } from 'UI/Theme'
import { useBodyLock } from 'common/hooks/useBodyLock'
import { NavbarPanelLinkStoryblok, NavbarStoryblok } from 'common/types'
import { Editable } from 'components/Blocks/Editable'
import { styled } from 'lib/style'

import { CMSLink } from '../CMSLink'
import { useIndexDirection } from './useIndexDirection'

type NavbarProps = {
  content: NavbarStoryblok
  theme: 'light' | 'dark'
}

const Navbar: React.FC<NavbarProps> = ({ content, theme }) => {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null)
  const wrapperRef = useRef<Array<HTMLDivElement | null>>([])
  const linksRefs = useRef<Array<HTMLParagraphElement | null>>([])
  const [dimensions, setDimensions] = useState<DOMRect | undefined>()
  const [linksDimensions, setLinksDimensions] = useState<DOMRect | undefined>()

  useBodyLock(!!currentIndex || currentIndex === 0)

  const direction = useIndexDirection(currentIndex)

  useEffect(
    function setMenuDimensions() {
      if (currentIndex === null) {
        setDimensions(undefined)
        setLinksDimensions(undefined)

        return
      }

      const currentRef = wrapperRef.current[currentIndex]

      const currentRefLinks = linksRefs.current[currentIndex]

      if (currentRef) {
        setDimensions(currentRef.getBoundingClientRect())
      }

      if (currentRefLinks) {
        setLinksDimensions(currentRefLinks.getBoundingClientRect())
      }
    },
    [currentIndex]
  )

  return (
    <Theme theme={theme}>
      <Container
        css={{
          position: 'relative',
        }}
      >
        <Wrapper>
          <NextLink href="/" passHref>
            <Logo
              as="a"
              css={{
                transition: 'opacity $appearance',
                '@hover': { '&:hover': { opacity: 0.75 } },
              }}
            >
              <img
                src={theme === 'dark' ? '/logo-white.svg' : '/logo-dark.svg'}
                alt="Proxyrack"
                width="auto"
                height="auto"
              />
            </Logo>
          </NextLink>
          <StyledDiv>
            <AnimatePresence>
              {dimensions && linksDimensions && (
                <StyledLightCard
                  key="test"
                  initial={{
                    opacity: 0,
                    width: dimensions.width,
                    height: dimensions.height + 2,
                    left:
                      linksDimensions.left -
                      dimensions.width / 2 +
                      linksDimensions.width / 2,
                    transform: 'perspective(1500px) rotateX(-70deg)',
                    transformOrigin: '50% 0',
                  }}
                  animate={{
                    opacity: 1,
                    width: dimensions.width,
                    height: dimensions.height + 2,
                    left:
                      linksDimensions.left -
                      dimensions.width / 2 +
                      linksDimensions.width / 2,
                    transform: 'perspective(1500px) rotateX(0deg)',
                    transformOrigin: '0 100%',
                  }}
                  exit={{
                    opacity: 0,
                    transition: {
                      ease: 'easeOut',
                      duration: 0.2,
                    },
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 40,
                  }}
                />
              )}
            </AnimatePresence>
            <Stack spacing="0">
              {content?.links?.map((link, index) => {
                return (
                  <Editable key={link._uid} block={link}>
                    {link.links && (
                      <Box
                        onMouseOver={() => setCurrentIndex(index)}
                        onMouseLeave={() => setCurrentIndex(null)}
                        css={{
                          position: 'relative',
                        }}
                      >
                        <BaseLink css={{ p: '$8 $20' }}>
                          <Text
                            ref={(el: HTMLParagraphElement | null) =>
                              (linksRefs.current[index] = el)
                            }
                            variant="small"
                            as="p"
                            weight="bold"
                          >
                            {link.title}
                          </Text>
                          <Box css={{ ml: '$6', mt: '-$2' }}>
                            <Icon icon="down" />
                          </Box>
                        </BaseLink>

                        <AnimatePresence exitBeforeEnter>
                          {currentIndex === index && (
                            <StyledLinks
                              ref={(el: HTMLDivElement | null) =>
                                (wrapperRef.current[index] = el)
                              }
                              key={link._uid}
                              custom={direction}
                              variants={{
                                initial: (direction: number) => ({
                                  opacity: 0,
                                  x: 50 * direction * -1,
                                }),
                                enter: () => ({ opacity: 1, x: 0 }),
                                exit: (direction: number) => ({
                                  opacity: 0,
                                  x: 50 * direction,
                                }),
                              }}
                              initial="initial"
                              animate="enter"
                              exit="exit"
                              transition={{
                                opacity: {
                                  ease: 'easeOut',
                                  duration: 0.2,
                                },
                                x: {
                                  type: 'spring',
                                  stiffness: 400,
                                  damping: 40,
                                },
                              }}
                              css={{
                                left:
                                  linksDimensions && dimensions
                                    ? linksDimensions.left -
                                      dimensions.width / 2 +
                                      linksDimensions.width / 2
                                    : '-100vw',
                              }}
                            >
                              {link.links.map(
                                (linkChild: NavbarPanelLinkStoryblok) => {
                                  return (
                                    <Editable
                                      key={linkChild._uid}
                                      block={linkChild}
                                    >
                                      <WrapperLinks>
                                        <CMSLink
                                          onClick={() => setCurrentIndex(null)}
                                          href={linkChild.link}
                                          linkStyle={{
                                            type: 'link',
                                            variant: 'default',
                                          }}
                                          css={{
                                            '@hover': {
                                              '&:hover': {
                                                color: '$texPrimary',
                                              },
                                            },
                                          }}
                                        >
                                          <Text
                                            variant="small"
                                            as="p"
                                            weight="bold"
                                          >
                                            {linkChild.title}
                                          </Text>
                                          {linkChild.description && (
                                            <StyledDescription
                                              variant="small"
                                              as="p"
                                              css={{
                                                maxWidth: '208px',
                                              }}
                                            >
                                              {linkChild.description}
                                            </StyledDescription>
                                          )}
                                        </CMSLink>
                                      </WrapperLinks>
                                    </Editable>
                                  )
                                }
                              )}
                            </StyledLinks>
                          )}
                        </AnimatePresence>
                      </Box>
                    )}
                    {link.link && (
                      <CMSLink
                        href={link.link}
                        linkStyle={{
                          type: 'link',
                          variant: 'default',
                        }}
                        css={{ p: '$8 $20' }}
                      >
                        <Text variant="small" as="p" weight="bold">
                          {link.title}
                        </Text>
                      </CMSLink>
                    )}
                  </Editable>
                )
              })}
            </Stack>
          </StyledDiv>

          <Box>
            <CMSLink
              href={content?.sign_in_link}
              linkStyle={{
                type: 'link',
                variant: 'default',
              }}
            >
              <Text variant="small" as="p" weight="bold">
                {content?.sign_in_title}
              </Text>
            </CMSLink>
            <CMSLink
              href={content?.sign_up_link}
              linkStyle={{
                type: 'button',
                variant: 'primary',
              }}
              css={{ ml: '$32' }}
            >
              {content?.sign_up_title}
            </CMSLink>
          </Box>
        </Wrapper>
      </Container>
    </Theme>
  )
}

export default Navbar

const StyledDiv = styled('div', {
  position: 'relative',
})

const Wrapper = styled('nav', {
  display: 'flex',

  alignItems: 'center',
  justifyContent: 'space-between',

  width: '100%',

  position: 'absolute',
  zIndex: '$max',

  left: '$0',

  py: '$16',
  px: '$96',
})

const Logo = styled('div', {
  display: 'flex',

  position: 'relative',
})

const StyledLightCard = styled(motion.div, {
  position: 'fixed',

  borderRadius: '$sm',
  boxShadow: '$soft',

  backgroundColor: '$panel',

  border: '1px solid $muted',

  top: '52px',
})

const StyledDescription = styled(Text, {})

const StyledLinks = styled(motion.div, {
  position: 'fixed',
  p: '$8',
})

const WrapperLinks = styled('div', {
  display: 'flex',

  flexDirection: 'column',

  color: '$textPrimary',

  overflow: 'hidden',
  padding: '$12',

  '@hover': {
    '&:hover': {
      backgroundColor: '$muted',
      borderRadius: '$sm',
      cursor: 'pointer',
    },
  },

  '> a': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
})

const BaseLink = styled('div', {
  cursor: 'pointer',

  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',

  color: '$textPrimary',
  transition: 'color $appearance',

  outline: 'none',

  '@hover': {
    '&:hover': {
      color: '$primary',
    },
  },

  '&:active': {
    color: '$textSecondary',
  },

  '&:focus-visible': {
    color: '$textPrimary',
  },
})
