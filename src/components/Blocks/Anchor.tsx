import { Card, Container, Flex, Stack, Text } from 'UI'
import { AnchorStoryblok } from 'common/types'
import { CMSLink } from 'components/Shared/CMSLink'
import { CMSRichTextField } from 'components/Shared/CMSRichTextField'
import { styled } from 'lib/style'

import { ButtonBlock } from './ButtonBlock'
import { Editable } from './Editable'

type AnchorProps = {
  block: AnchorStoryblok
}

export const Anchor = ({ block, ...props }: AnchorProps): JSX.Element => {
  return (
    <Wrapper {...props}>
      <Container>
        <Stack spacing="32" css={{ alignItems: 'stretch' }}>
          {block?.anchor_entry?.map((anchor) => {
            return (
              <Editable key={anchor._uid} block={anchor}>
                <StyledCard>
                  <Text as="p" variant="small" weight="bold">
                    {anchor.title}
                  </Text>
                  <CMSRichTextField
                    css={{
                      color: '$textSecondary',
                      fontSize: '$sm',
                      lineHeight: '$medium',
                      letterSpacing: '$md',
                    }}
                    document={
                      Array.isArray(anchor.description)
                        ? anchor.description?.[0]?.document
                        : anchor.description
                    }
                  />
                  <Flex
                    css={{
                      justifyContent: 'space-between',
                      flexDirection: 'column',
                      '@md': {
                        flexDirection: 'row',
                      },
                    }}
                  >
                    {anchor.link_new?.[0] ? (
                      <ButtonBlock
                        block={anchor.link_new[0]}
                        css={{
                          mt: '$16',
                          justifyContent: 'flex-start',
                          '@md': { justifyContent: 'center' },
                        }}
                      />
                    ) : (
                      <CMSLink
                        href={anchor.link}
                        linkStyle={{
                          type: 'link',
                          variant: 'icon',
                          icon: 'arrow-down',
                          iconVariant: 'noTransition',
                        }}
                        css={{
                          mt: '$16',
                          justifyContent: 'flex-start',
                          '@md': { justifyContent: 'center' },
                        }}
                      >
                        {anchor.link_title}
                      </CMSLink>
                    )}
                  </Flex>
                </StyledCard>
              </Editable>
            )
          })}
        </Stack>
      </Container>
    </Wrapper>
  )
}

const Wrapper = styled('section', {
  pt: '$32',
  pb: '$64',

  overflow: 'auto hidden',

  '@lg': {
    overflow: 'unset',
  },
})

const StyledCard = styled(Card, {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',

  boxShadow: '$heavy',

  width: '100%',
  maxWidth: '394px',
  minWidth: '270px',

  p: '$24',

  '@md': {
    minWidth: '394px',
  },

  '@lg': {
    minWidth: 'unset',
  },
})
