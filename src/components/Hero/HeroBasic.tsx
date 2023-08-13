import { Box, Container, Text } from 'UI'
import { NavbarStoryblok, PageStoryblok } from 'common/types'
import { ButtonBlock } from 'components/Blocks/ButtonBlock'
import { CMSLink } from 'components/Shared/CMSLink'
import { CMSRichTextField } from 'components/Shared/CMSRichTextField'
import Navbar from 'components/Shared/Navbar/Navbar'
import NavbarMobile from 'components/Shared/Navbar/NavbarMobile'
import { styled } from 'lib/style'

type HeroBasicProps = {
  content: PageStoryblok['hero']
  contentNav: NavbarStoryblok
  withRichFields?: boolean
}

const HeroBasic: React.FC<HeroBasicProps> = ({
  content,
  contentNav,
  withRichFields = false,
}) => {
  const hasButton = content[0]?.button_link && content[0]?.button_text
  const buttonNew = content[0]?.button_new?.[0]

  return (
    <Box>
      <Box css={{ display: 'none', '@lg': { display: 'block' } }}>
        <Navbar content={contentNav} theme="light" />
      </Box>
      <Box css={{ display: 'block', '@lg': { display: 'none' } }}>
        <NavbarMobile content={contentNav} theme="light" />
      </Box>
      <Container
        css={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',

          '@md': {
            alignItems: 'center',
          },
        }}
      >
        <Wrapper>
          {withRichFields ? (
            <>
              {content[0].title && (
                <CMSRichTextField document={content[0].title} />
              )}
              {content[0].description && (
                <CMSRichTextField
                  document={content[0].description}
                  css={{
                    mt: '$16',
                  }}
                />
              )}
            </>
          ) : (
            <>
              {content[0].title && (
                <Text as="h2" variant="title">
                  {content[0].title}
                </Text>
              )}
              {content[0].description && (
                <Text
                  as="p"
                  variant="big"
                  css={{
                    mt: '$16',
                  }}
                >
                  {content[0].description}
                </Text>
              )}
            </>
          )}
          {buttonNew ? (
            <ButtonBlock
              block={buttonNew}
              css={{
                mt: '$16',
              }}
            />
          ) : (
            hasButton && (
              <CMSLink
                href={content[0].button_link}
                linkStyle={{
                  type: 'link',
                  variant: 'icon',
                  icon: 'arrow-right',
                }}
                css={{
                  mt: '$16',
                }}
              >
                {content[0].button_text}
              </CMSLink>
            )
          )}
          {content?.[0]?.button?.[0] && (
            <ButtonBlock block={content[0].button[0]} css={{ mt: '$16' }} />
          )}
        </Wrapper>
      </Container>
    </Box>
  )
}

export default HeroBasic

const Wrapper = styled('section', {
  textAlign: 'left',

  maxWidth: 'unset',

  my: '$40',

  '@md': {
    my: '$56',

    textAlign: 'center',

    maxWidth: '38rem',
  },

  '@lg': {
    mt: '190px',
    mb: '$40',
  },
})
