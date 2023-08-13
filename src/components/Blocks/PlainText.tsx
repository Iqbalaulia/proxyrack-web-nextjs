import { Container, Text } from 'UI'
import { PlainTextStoryblok } from 'common/types'
import { CMSRichTextField } from 'components/Shared/CMSRichTextField'
import { styled } from 'lib/style'

type PlainTextProps = {
  block: PlainTextStoryblok
}

export const PlainText = ({ block, ...props }: PlainTextProps): JSX.Element => {
  const isCentered = block.layout === 'center'

  return (
    <Wrapper {...props}>
      <Container variant="tiny">
        {block.title && (
          <Text
            as="h4"
            variant="big"
            weight="bold"
            css={{ textAlign: isCentered ? 'center' : 'left' }}
          >
            {block.title}
          </Text>
        )}
        {block.description && (
          <StyledDescription
            as="p"
            variant="small"
            css={{ textAlign: isCentered ? 'center' : 'left' }}
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
      </Container>
    </Wrapper>
  )
}

const Wrapper = styled('section', {
  color: '$textPrimary',
  background: '$background',
  px: '$20',

  '@lg': {
    py: '$40',
  },
})

const StyledDescription = styled(Text, {
  mt: '$24',

  '@lg': {
    mt: '$16',
  },
})
