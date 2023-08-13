import { AnimatePresence, motion } from 'framer-motion'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Headroom from 'react-headroom'

import { Accordion, Box, Container, Flex, Text, Theme } from 'UI'
import { useBodyLock } from 'common/hooks/useBodyLock'
import { NavbarPanelLinkStoryblok, NavbarStoryblok } from 'common/types'
import { Editable } from 'components/Blocks/Editable'
import { styled } from 'lib/style'

import { CMSLink } from '../CMSLink'

type NavbarMobileProps = {
  content: NavbarStoryblok
  theme: 'light' | 'dark'
}

const NavbarMobile: React.FC<NavbarMobileProps> = ({ content, theme }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [optionSelected, setOptionSelected] = useState('')
  const router = useRouter()

  useBodyLock(isOpen)

  const toogleAccordion = (id: string) => {
    setOptionSelected(id === optionSelected ? '' : id)
  }

  useEffect(
    function closeOnNavigate() {
      const handleRouteChange = () => {
        setIsOpen(false)
      }

      router.events.on('routeChangeStart', handleRouteChange)

      return () => {
        router.events.off('routeChangeStart', handleRouteChange)
      }
    },
    [router.events]
  )

  return (
    <Theme theme={theme}>
      <WrapperHead>
        <WrapperNav css={{ position: isOpen ? 'inherit' : 'unset' }}>
          <Container>
            <InnerWrapper>
              <NextLink href="/" passHref>
                <Logo as="a">
                  <img
                    src={
                      theme === 'dark' ? '/logo-white.svg' : '/logo-dark.svg'
                    }
                    alt="Proxyrack"
                    width="auto"
                    height="auto"
                  />
                </Logo>
              </NextLink>

              <WrapperHamburger onClick={() => setIsOpen(!isOpen)}>
                <HamburgerLine variant={isOpen ? 'isOpen' : 'closed'} />
                <HamburgerLine variant={isOpen ? 'isOpen' : 'closed'} />
                <HamburgerLine variant={isOpen ? 'isOpen' : 'closed'} />
              </WrapperHamburger>
            </InnerWrapper>
          </Container>
        </WrapperNav>
      </WrapperHead>

      <WrapperContent css={{ pointerEvents: isOpen ? 'auto' : 'none' }}>
        <AnimatePresence initial={isOpen}>
          <MobileOverflow
            animate={isOpen ? 'open' : 'closed'}
            variants={{
              open: {
                y: 0,
                opacity: 1,

                transition: {
                  y: { type: 'spring', stiffness: 300, damping: 35 },
                  opacity: { duration: 0.3 },
                },
              },
              closed: {
                y: '-100vh',
                opacity: 0,

                transition: {
                  y: { type: 'spring', stiffness: 300, damping: 35 },
                  opacity: { duration: 0.2 },
                },
              },
            }}
          >
            <Container
              css={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                overflowY: 'auto',
              }}
            >
              <Flex css={{ flexDirection: 'column' }}>
                {content?.links?.map((link) => {
                  return (
                    <React.Fragment key={link._uid}>
                      <Editable block={link}>
                        {link.links && (
                          <Box>
                            <Box
                              css={{
                                width: '100%',
                                padding: '$16 $0',
                                color: '$textPrimary',
                              }}
                            >
                              <Accordion
                                title={
                                  <Text variant="small" as="p" weight="bold">
                                    {link.title}
                                  </Text>
                                }
                                isOpen={optionSelected === link._uid}
                                onClick={() => toogleAccordion(link._uid)}
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
                                            href={linkChild.link}
                                            linkStyle={{
                                              type: 'link',
                                              variant: 'default',
                                            }}
                                          >
                                            <Text variant="small" as="p">
                                              {linkChild.title}
                                            </Text>
                                            {linkChild.description && (
                                              <Text
                                                variant="small"
                                                as="p"
                                                css={{
                                                  color: '$textSecondary',

                                                  pt: '$4',
                                                }}
                                              >
                                                {linkChild.description}
                                              </Text>
                                            )}
                                          </CMSLink>
                                        </WrapperLinks>
                                      </Editable>
                                    )
                                  }
                                )}
                              </Accordion>
                            </Box>
                          </Box>
                        )}
                      </Editable>
                      {link.link && (
                        <Box>
                          <CMSLink
                            href={link.link}
                            linkStyle={{
                              type: 'link',
                              variant: 'default',
                            }}
                          >
                            <Text variant="small" as="p" weight="bold">
                              {link.title}
                            </Text>
                          </CMSLink>
                        </Box>
                      )}
                    </React.Fragment>
                  )
                })}
              </Flex>
              <Flex css={{ flexDirection: 'column', mt: '$20' }}>
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
                  css={{ mt: '$32', mb: '$20' }}
                >
                  {content?.sign_up_title}
                </CMSLink>
              </Flex>
            </Container>
          </MobileOverflow>
        </AnimatePresence>
      </WrapperContent>
    </Theme>
  )
}

export default NavbarMobile

const WrapperHead = styled(Headroom, {
  '.headroom': {
    zIndex: '$max !important',
  },
})

const WrapperNav = styled('nav', {
  top: '0',
  left: '0',
  display: 'flex',
  width: '100vw',

  alignItems: 'center',
  justifyContent: 'space-between',

  py: '$24',

  backgroundColor: '$background',
  zIndex: '$4',
})

const InnerWrapper = styled('div', {
  width: '100%',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  backgroundColor: '$background',

  zIndex: '$4',
})

const WrapperContent = styled('div', {
  position: 'fixed',
  top: '0',
  left: '0',
  height: '100vh',
  width: '100%',

  zIndex: '$3',
})

const MobileOverflow = styled(motion.div, {
  overflow: 'hidden',
  backgroundColor: '$background',

  mt: '72px',

  height: 'calc(100vh - 72px)',
})

const Logo = styled('div', {
  display: 'flex',

  position: 'relative',

  zIndex: '$max',
})

const WrapperHamburger = styled('div', {
  position: 'absolute',
  right: '$20',

  width: '1rem',
  height: '1rem',

  zIndex: '$max',

  '@md': {
    right: '$56',
  },
})

const HamburgerLine = styled('span', {
  position: 'absolute',

  height: '1px',
  width: '1rem',

  zIndex: '$max',

  backgroundColor: '$textPrimary',

  '&:nth-child(1)': {
    top: '$6',
  },

  '&:nth-child(2)': {
    top: '$12',
  },

  transition: '$motion',

  variants: {
    variant: {
      isOpen: {
        '&:nth-child(1)': {
          transform: 'rotate(45deg)',
          top: '$6',
        },
        '&:nth-child(2)': {
          transform: 'rotate(135deg)',
          top: '$6',
        },
        '&:nth-child(3)': {
          transform: 'rotate(135deg)',
          top: '$6',
        },
      },
      closed: {},
    },
  },
})

const WrapperLinks = styled('div', {
  display: 'flex',

  flexDirection: 'column',

  maxWidth: '335px',

  '@md': {
    maxWidth: '656px',
  },

  py: '$16',

  borderBottom: '1px solid $muted',

  '&:first-child': {
    pt: '$0',
    pb: '$16',
  },

  '&:last-child': {
    borderBottom: 'unset',
  },

  '> a': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
})
