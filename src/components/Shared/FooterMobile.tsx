import NextImage from 'next/image'
import React, { useState } from 'react'

import { Accordion, Box, Container, Divider, Flex, Stack, Text } from 'UI'
import { PROXYRACK } from 'common/constants'
import { FooterStoryblok } from 'common/types'
import { getImageAttributes } from 'common/utils/content'
import { Editable } from 'components/Blocks/Editable'
import { useCurrentYear } from 'components/utils'
import { styled } from 'lib/style'

import { CMSLink } from './CMSLink'

type FooterMobileProps = {
  content: FooterStoryblok
}

const FooterMobile: React.FC<FooterMobileProps> = ({ content, ...props }) => {
  const [optionSelected, setOptionSelected] = useState<string | null>(null)

  const toogleAccordion = (id: string) => {
    setOptionSelected(id === optionSelected ? null : id)
  }

  const year = useCurrentYear()

  return (
    <Container {...props}>
      <Wrapper>
        <Divider variant="tertiary" />
        <Logo>
          <img src={'/logo.svg'} alt="Proxyrack" width="auto" height="auto" />
        </Logo>
        <Divider variant="tertiary" />
        <Flex css={{ flexDirection: 'column', mt: '$8' }}>
          {content.links?.map((link) => {
            return (
              <Editable key={link._uid} block={link}>
                <Box
                  css={{
                    width: '100%',
                    pb: '$8',
                    pt: '$16',
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
                    <Flex
                      css={{
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                      }}
                    >
                      {link.links?.map((l) => {
                        return (
                          <Editable key={l._uid} block={l}>
                            <CMSLink
                              href={l.link}
                              linkStyle={{
                                type: 'link',
                                variant: 'default',
                              }}
                              css={{
                                mb: '$16',
                                '&:last-of-type': { mb: '$24' },
                              }}
                            >
                              {l.title}
                            </CMSLink>
                          </Editable>
                        )
                      })}
                    </Flex>
                  </Accordion>
                </Box>
              </Editable>
            )
          })}
        </Flex>
        {content.questions?.map((question) => {
          return (
            <Editable key={question._uid} block={question}>
              <Flex css={{ flexDirection: 'column', mt: '$32' }}>
                <Text variant="small" weight="bold" css={{ mb: '$12' }}>
                  {question.title}
                </Text>
                <Flex>
                  {question.questions.map((questionChild) => {
                    return (
                      <Editable key={questionChild._uid} block={questionChild}>
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
                            mx: '$8',
                            '&:last-of-type': { display: 'none' },
                          }}
                        >
                          or
                        </Text>
                      </Editable>
                    )
                  })}
                </Flex>
              </Flex>
            </Editable>
          )
        })}
        <Divider variant="tertiary" css={{ mt: '$40', mb: '$32' }} />
        <Flex css={{ flexWrap: 'wrap' }}>
          {content.links_privacy?.map((link) => {
            return (
              <Editable key={link._uid} block={link}>
                <CMSLink
                  href={link.link}
                  linkStyle={{
                    type: 'link',
                    variant: 'underline',
                  }}
                  css={{ mr: '$16', mb: '$20', color: '$gray400' }}
                >
                  {link.title}
                </CMSLink>
              </Editable>
            )
          })}
        </Flex>
        <Divider variant="tertiary" css={{ mt: '$12', mb: '$32' }} />
        <Stack spacing="12">
          {content.socials?.map((social) => {
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
        <Flex css={{ mt: '$32' }}>
          <Text
            variant="small"
            css={{
              color: '$gray400',
            }}
          >
            ©{year} {PROXYRACK}
          </Text>
        </Flex>
      </Wrapper>
    </Container>
  )
}

export default FooterMobile

const Wrapper = styled('footer', {
  display: 'flex',
  flexDirection: 'column',

  width: '100%',

  py: '$40',
})

const Logo = styled('div', {
  display: 'flex',

  position: 'relative',

  my: '$24',
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
