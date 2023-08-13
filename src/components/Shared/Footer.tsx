import NextImage from 'next/image'
import React from 'react'

import { Container, Divider, Flex, Stack, Text } from 'UI'
import { PROXYRACK } from 'common/constants'
import { FooterStoryblok } from 'common/types'
import { getImageAttributes } from 'common/utils/content'
import { Editable } from 'components/Blocks/Editable'
import { useCurrentYear } from 'components/utils'
import { styled } from 'lib/style'

import { CMSLink } from './CMSLink'

type FooterProps = {
  content: FooterStoryblok
}

const Footer: React.FC<FooterProps> = ({ content, ...props }) => {
  const year = useCurrentYear()

  return (
    <Container {...props}>
      <Wrapper>
        <Divider variant="tertiary" />
        <Logo>
          <img src={'/logo.svg'} alt="Proxyrack" width="auto" height="auto" />
        </Logo>
        <WrapperLinks>
          {content.links?.map((link) => {
            return (
              <Editable key={link._uid} block={link}>
                <InnerWrapper>
                  <Text variant="small" weight="bold" css={{ mb: '$12' }}>
                    {link.title}
                  </Text>
                  <Stack
                    direction="vertical"
                    spacing="12"
                    css={{ alignItems: 'flex-start' }}
                  >
                    {link.links.map((l) => {
                      return (
                        <Editable key={l._uid} block={l}>
                          <CMSLink
                            href={l.link}
                            linkStyle={{
                              type: 'link',
                              variant: 'default',
                            }}
                          >
                            {l.title}
                          </CMSLink>
                        </Editable>
                      )
                    })}
                  </Stack>
                </InnerWrapper>
              </Editable>
            )
          })}
          {content.questions?.map((question) => {
            return (
              <Editable key={question._uid} block={question}>
                <InnerWrapper>
                  <Text variant="small" weight="bold" css={{ mb: '$12' }}>
                    {question.title}
                  </Text>
                  <Stack
                    direction="vertical"
                    spacing="12"
                    css={{ alignItems: 'flex-start' }}
                  >
                    {question.questions.map((questionChild) => {
                      return (
                        <Editable
                          key={questionChild._uid}
                          block={questionChild}
                        >
                          <CMSLink
                            href={questionChild.link}
                            linkStyle={{
                              type: 'link',
                              variant: 'underline',
                            }}
                          >
                            {questionChild.title}
                          </CMSLink>
                          <Text
                            variant="small"
                            css={{
                              '&:last-of-type': { display: 'none' },
                            }}
                          >
                            or
                          </Text>
                        </Editable>
                      )
                    })}
                  </Stack>
                </InnerWrapper>
              </Editable>
            )
          })}
        </WrapperLinks>
        <Divider variant="tertiary" css={{ mt: '$56', mb: '$32' }} />
        <WrapperPrivacy>
          <InnerWrapperLinks>
            <Text
              variant="small"
              css={{
                color: '$gray400',
                mr: '$24',
                '@md': {
                  display: 'none',
                },

                '@lg': {
                  display: 'flex',
                },
              }}
            >
              ©{year} {PROXYRACK}
            </Text>
            <Stack spacing="24">
              {content.links_privacy?.map((link) => {
                return (
                  <Editable key={link._uid} block={link}>
                    <CMSLink
                      href={link.link}
                      linkStyle={{
                        type: 'link',
                        variant: 'underline',
                      }}
                      css={{ color: '$gray400' }}
                    >
                      {link.title}
                    </CMSLink>
                  </Editable>
                )
              })}
            </Stack>
          </InnerWrapperLinks>
          <StyledDivider variant="tertiary" />
          <Flex css={{ justifyContent: 'space-between' }}>
            <Text
              variant="small"
              css={{
                color: '$gray400',
                mr: '$24',
                '@md': {
                  display: 'flex',
                },

                '@lg': {
                  display: 'none',
                },
              }}
            >
              ©{year} {PROXYRACK}
            </Text>
            <Stack spacing="12">
              {content.socials &&
                content.socials.map((social) => {
                  return (
                    <Editable key={social._uid} block={social}>
                      <CMSLink
                        href={social.link}
                        linkStyle={{
                          type: 'link',
                          variant: 'default',
                        }}
                      >
                        <ImageWrapper>
                          <NextImage
                            {...getImageAttributes(social.image)}
                            objectFit="cover"
                            quality="100"
                            width={getImageAttributes(social.image).width}
                            height={getImageAttributes(social.image).height}
                          />
                        </ImageWrapper>
                      </CMSLink>
                    </Editable>
                  )
                })}
            </Stack>
          </Flex>
        </WrapperPrivacy>
      </Wrapper>
    </Container>
  )
}

export default Footer

const Wrapper = styled('footer', {
  display: 'flex',
  flexDirection: 'column',

  width: '100%',

  py: '$32',
})

const Logo = styled('div', {
  display: 'flex',

  position: 'relative',

  mt: '$32',
  mb: '$56',
})

const WrapperLinks = styled('div', {
  '@md': {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    rowGap: '$56',
  },

  '@lg': {
    display: 'flex',
    justifyContent: 'space-between',
  },
})

const InnerWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  whiteSpace: 'nowrap',
})

const ImageWrapper = styled('div', {
  img: {
    objectFit: 'cover',
    height: '100%',
    width: '100%',
  },

  width: '100%',
  maxWidth: '2rem',
  maxHeight: '2rem',
  position: 'relative',
  height: '100%',
})

const WrapperPrivacy = styled('div', {
  '@md': {
    flexDirection: 'column',
  },

  '@lg': {
    display: 'flex',
    flexDirection: 'row',

    justifyContent: 'space-between',
    alignItems: 'center',
  },
})

const InnerWrapperLinks = styled('div', {
  display: 'flex',

  whiteSpace: 'nowrap',

  '@md': {
    justifyContent: 'center',
  },

  '@lg': {
    justifyContent: 'flex-start',
    pr: '$10',
  },
})

const StyledDivider = styled(Divider, {
  '@md': {
    display: 'flex',
    my: '$32',
  },

  '@lg': {
    display: 'none',
  },
})
