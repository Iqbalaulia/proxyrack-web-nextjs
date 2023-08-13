import NextImage from 'next/image'

import { Box, Container, Flex, Icon, Text, Theme } from 'UI'
import { NavbarStoryblok, PageStoryblok } from 'common/types'
import { getImageAttributes } from 'common/utils/content'
import { ButtonBlock } from 'components/Blocks/ButtonBlock'
import { CMSLink } from 'components/Shared/CMSLink'
import { CMSRichTextField } from 'components/Shared/CMSRichTextField'
import Navbar from 'components/Shared/Navbar/Navbar'
import NavbarMobile from 'components/Shared/Navbar/NavbarMobile'
import { styled } from 'lib/style'

import { useScrollToContent } from './utils'

type HeroImageProps = {
  content: PageStoryblok['hero']
  contentNav: NavbarStoryblok
  withRichFields?: boolean
}

const HeroImage: React.FC<HeroImageProps> = ({
  content,
  contentNav,
  withRichFields = false,
}) => {
  const { ref, scrollToContent } = useScrollToContent()

  const hasButtonPrimary =
    content[0]?.primary_button_link && content[0]?.primary_button_text
  const primaryButtonNew = content[0]?.primary_button_new?.[0]

  const isContentLeft = content[0].layout === 'left'

  return (
    <Box ref={ref}>
      <Box css={{ display: 'none', '@lg': { display: 'block' } }}>
        <Navbar content={contentNav} theme="dark" />
      </Box>
      <Box css={{ display: 'block', '@lg': { display: 'none' } }}>
        <NavbarMobile content={contentNav} theme="dark" />
      </Box>

      <StyledFlex
        css={{
          position: 'relative',

          overflow: 'hidden',
        }}
      >
        <Box css={{ display: 'none', '@lg': { display: 'block' } }}>
          {content[0].background && content[0].background.filename && (
            <ImageWrapper>
              <NextImage
                src={getImageAttributes(content[0].background).src}
                objectFit="cover"
                objectPosition="center"
                layout="fill"
                quality="100"
              />
            </ImageWrapper>
          )}
        </Box>
        <Box css={{ display: 'block', '@lg': { display: 'none' } }}>
          {content[0].background && content[0].background.filename && (
            <ImageWrapper>
              <NextImage
                src={getImageAttributes(content[0].background).src}
                objectFit="cover"
                objectPosition="right"
                layout="fill"
                quality="100"
              />
            </ImageWrapper>
          )}
        </Box>
        <StyledContainer
          css={{
            alignSelf: isContentLeft ? 'flex-start' : 'flex-end',

            '@lg': {
              alignSelf: 'flex-start',
              alignItems: isContentLeft ? 'flex-start' : 'flex-end',
            },
          }}
        >
          <Flex
            css={{
              flexDirection: 'column',

              '@lg': {
                position: 'absolute',
                transform: 'translatey(-50%)',
                top: '50%',
              },
            }}
          >
            {withRichFields ? (
              <>
                {content[0].title && (
                  <CMSRichTextField
                    document={content[0].title}
                    css={{
                      color: '$gray10',

                      maxWidth: 'unset',

                      '@lg': {
                        maxWidth: '528px',
                      },
                    }}
                  />
                )}
                {content[0].description && (
                  <CMSRichTextField
                    document={content[0].description}
                    css={{
                      color: '$gray300',
                      mt: '$24',

                      maxWidth: 'unset',

                      '@lg': {
                        maxWidth: '368px',
                      },
                    }}
                  />
                )}
              </>
            ) : (
              <>
                {content[0].title && (
                  <Text
                    as="h1"
                    variant="huge"
                    css={{
                      color: '$gray10',

                      maxWidth: 'unset',

                      '@lg': {
                        maxWidth: '528px',
                      },
                    }}
                  >
                    {content[0].title}
                  </Text>
                )}
                {content[0].description && (
                  <Text
                    as="p"
                    variant="body"
                    css={{
                      color: '$gray300',
                      mt: '$24',

                      maxWidth: 'unset',

                      '@lg': {
                        maxWidth: '368px',
                      },
                    }}
                  >
                    {content[0].description}
                  </Text>
                )}
              </>
            )}
            <Theme theme="dark">
              <Flex>
                {primaryButtonNew ? (
                  <ButtonBlock
                    block={primaryButtonNew}
                    css={{
                      mt: '$24',
                      mr: '$32',

                      '@md': {
                        mt: '$38',
                      },

                      '@lg': {
                        mt: '$24',
                      },
                    }}
                  />
                ) : (
                  hasButtonPrimary && (
                    <CMSLink
                      href={content[0].primary_button_link}
                      linkStyle={{
                        type: 'button',
                        variant: 'primary',
                      }}
                      css={{
                        mt: '$24',
                        mr: '$32',

                        '@md': {
                          mt: '$38',
                        },

                        '@lg': {
                          mt: '$24',
                        },
                      }}
                    >
                      {content[0].primary_button_text}
                    </CMSLink>
                  )
                )}
                {content[0].scroll_button && (
                  <StyledLink
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToContent()
                    }}
                  >
                    <Text css={{ mr: '$6' }} variant="small">
                      {content[0].scroll_button}
                    </Text>
                    <Icon icon="arrow-down" />
                  </StyledLink>
                )}
              </Flex>
            </Theme>
          </Flex>
        </StyledContainer>
      </StyledFlex>
    </Box>
  )
}

export default HeroImage

const StyledFlex = styled(Flex, {
  height: '100vh',

  '@lg': {
    height: '800px',
  },

  '@xxl': {
    height: '968px',
  },
})

const StyledContainer = styled(Container, {
  zIndex: '$1',

  display: 'flex',
  flexDirection: 'column',

  position: 'relative',

  my: '$40',

  '@md': {
    my: '$56',
  },

  '@lg': {
    my: '$0',
    height: '100%',
  },
})

const ImageWrapper = styled('div', {
  img: {
    objectFit: 'cover',
    height: '100%',
    width: '100%',
  },

  width: '100%',
  position: 'absolute',
  height: '100%',
})

const StyledLink = styled('button', {
  display: 'flex',
  alignItems: 'center',

  background: 'none',
  border: 'unset',
  color: '$gray10',

  cursor: 'pointer',

  mt: '$24',

  '&:focus-visible': {
    outline: 'none',
  },

  '@md': {
    mt: '$38',
  },

  '@lg': {
    mt: '$24',
  },
})
