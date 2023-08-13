import { StandardLonghandProperties } from '@stitches/react/types/css-types'

import { Container, Tag, Text } from 'UI'
import { useScrollToAnchor } from 'common/hooks/useScrollToAnchor'
import { SectionHeaderStoryblok } from 'common/types'
import { slugify } from 'common/utils/strings'
import { CMSLink } from 'components/Shared/CMSLink'
import { CMSRichTextField } from 'components/Shared/CMSRichTextField'
import { styled } from 'lib/style'

import { ButtonBlock } from './ButtonBlock'

type SectionHeaderProps = {
  block: SectionHeaderStoryblok
}

export const SectionHeader = ({
  block,
  ...props
}: SectionHeaderProps): JSX.Element => {
  const alignItems: Record<
    typeof block.alignment,
    StandardLonghandProperties['alignItems']
  > = {
    center: 'center',
    left: 'flex-start',
  }

  const hasButton = block.button_link && block.button_text
  const buttonNew = block.button_new?.[0]

  useScrollToAnchor()

  return (
    <Wrapper {...props}>
      <Container
        css={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: alignItems[block.alignment],
        }}
      >
        {block.tag && (
          <Tag id={slugify(block.tag)} css={{ mb: '$24' }}>
            {block.tag}
          </Tag>
        )}
        {block.title && (
          <Text
            as="h2"
            variant="title"
            css={{
              textAlign: block.alignment,

              '@lg': {
                maxWidth: '33rem',
              },
            }}
          >
            {block.title}
          </Text>
        )}
        {block.description && (
          <StyledDescription
            as="p"
            variant="small"
            css={{ textAlign: block.alignment }}
          >
            <CMSRichTextField
              css={{
                fontSize: 'inherit',
                lineHeight: 'inherit',
                letterSpacing: 'inherit',
              }}
              document={
                Array.isArray(block.description)
                  ? block.description?.[0]?.document
                  : block.description
              }
            />
          </StyledDescription>
        )}
        {buttonNew ? (
          <ButtonBlock
            block={buttonNew}
            css={{
              mt: '$24',
            }}
          />
        ) : (
          hasButton && (
            <CMSLink
              href={block.button_link}
              linkStyle={{
                type: 'button',
                variant: 'primary',
              }}
              css={{ mt: '$24' }}
            >
              {block.button_text}
            </CMSLink>
          )
        )}
      </Container>
    </Wrapper>
  )
}

const Wrapper = styled('section', {
  background: '$background',
  color: '$textPrimary',
  pt: '$40',
  pb: '$40',

  '@md': {
    pt: '$64',
    pb: '$56',
  },

  '@lg': {
    pt: '$48',
    pb: '$32',
  },
})

const StyledDescription = styled(Text, {
  mt: '$24',

  '@lg': {
    maxWidth: '38rem',

    mt: '$16',
  },
})
