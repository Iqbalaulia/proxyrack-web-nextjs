import { Box, Container, Flex, Icon, Text, Theme } from 'UI'
import { NavbarStoryblok, PageStoryblok } from 'common/types'
import { ButtonBlock } from 'components/Blocks/ButtonBlock'
import { CMSLink } from 'components/Shared/CMSLink'
import { CMSRichTextField } from 'components/Shared/CMSRichTextField'
import Navbar from 'components/Shared/Navbar/Navbar'
import NavbarMobile from 'components/Shared/Navbar/NavbarMobile'
import { styled } from 'lib/style'

import { useScrollToContent } from './utils'

type HeroContainedProps = {
  content: PageStoryblok['hero']
  contentNav: NavbarStoryblok
  withRichFields?: boolean
}

const HeroContained: React.FC<HeroContainedProps> = ({
  content,
  contentNav,
  withRichFields = false,
}) => {
  const { ref, scrollToContent } = useScrollToContent()

  const hasButtonPrimary =
    content[0]?.primary_button_link && content[0]?.primary_button_text
  const primaryButtonNew = content[0]?.primary_button_new?.[0]

  return (
    <Box ref={ref}>
      <Box
        css={{
          position: 'relative',
          height: '70px',
          display: 'none',
          '@lg': { display: 'block' },
        }}
      >
        <Navbar content={contentNav} theme="light" />
      </Box>
      <Box css={{ display: 'block', '@lg': { display: 'none' } }}>
        <NavbarMobile content={contentNav} theme="light" />
      </Box>

      <StyledFlex
        css={{
          position: 'relative',
        }}
      >
        <StyledContainer>
          <StyledWrapper>
            {content[0]?.background?.filename && (
              <StyledVideo
                autoPlay={true}
                loop
                muted
                playsInline
                preload="metadata"
                key={content[0].background.filename}
              >
                <source
                  src={`${content[0].background.filename}#t=0.1`}
                  type="video/mp4"
                />
              </StyledVideo>
            )}

            {content[0]?.background_medium.filename && (
              <StyledVideoSmallSizes
                autoPlay={true}
                loop
                muted
                playsInline
                preload="metadata"
                key={content[0].background_medium.filename}
                css={{
                  display: 'none',

                  '@md': {
                    display: 'block',
                  },

                  '@lg': {
                    display: 'none',
                  },
                }}
              >
                <source
                  src={`${content[0].background_medium.filename}#t=0.1`}
                  type="video/mp4"
                />
              </StyledVideoSmallSizes>
            )}

            {content[0]?.background_small.filename && (
              <StyledVideoSmallSizes
                autoPlay={true}
                loop
                muted
                playsInline
                preload="metadata"
                key={content[0].background_small.filename}
                css={{
                  display: 'block',

                  '@md': {
                    display: 'none',
                  },
                }}
              >
                <source
                  src={`${content[0].background_small.filename}#t=0.1`}
                  type="video/mp4"
                />
              </StyledVideoSmallSizes>
            )}

            <StyledBox>
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
            </StyledBox>
          </StyledWrapper>
        </StyledContainer>
      </StyledFlex>
    </Box>
  )
}

export default HeroContained

const StyledFlex = styled(Flex, {
  height: '100%',

  '@lg': {
    height: '666px',
  },
})

const StyledVideo = styled('video', {
  position: 'absolute',

  right: '$0',

  display: 'none',

  '@lg': {
    display: 'block',
  },

  '@xxl': {
    display: 'none',
  },
})

const StyledVideoSmallSizes = styled('video', {
  position: 'absolute',

  minHeight: '900px',

  overflow: 'hidden',
  backgroundSize: 'cover',
  right: '$0',
  bottom: '$0',
  width: '100%',
})

const StyledContainer = styled(Container, {
  zIndex: '$1',

  display: 'flex',
  flexDirection: 'column',

  px: '$0',
})

const StyledWrapper = styled('div', {
  position: 'relative',
  minHeight: '666px',
  width: '100%',
  overflow: 'hidden',
  borderRadius: 'unset',

  '@md': {
    borderRadius: '$md',
    minHeight: '956px',
  },

  '@lg': {
    minHeight: '666px',
  },
})

const StyledBox = styled('div', {
  position: 'relative',
  zIndex: '$3',

  mt: '$40',
  mx: '$20',

  '@md': {
    mt: '$56',
    mx: '$56',
  },

  '@lg': {
    mt: '152px',
    ml: '$128',
  },
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
