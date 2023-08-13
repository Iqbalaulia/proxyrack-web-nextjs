import { Box, Container, Tag, Text } from 'UI'
import { ImageSectionStoryblok } from 'common/types'
import { CMSRichTextField } from 'components/Shared/CMSRichTextField'
import { styled } from 'lib/style'

type ImageSectionProps = {
  block: ImageSectionStoryblok
}

export const ImageSection = ({
  block,
  ...props
}: ImageSectionProps): JSX.Element => {
  const imageHeight: any[] = block.image_height?.trim()?.split(' ')
  return (
    <Wrapper {...props}>
      <StyledContainer>
        <InnerWrapper>
          {block.tag && (
            <Box>
              <Tag variant="secondary" css={{ mb: '$24' }}>
                {block.tag}
              </Tag>
            </Box>
          )}
          {block.title && (
            <Text variant="title" css={{ color: '$gray10', mb: '$16' }}>
              {block.title}
            </Text>
          )}
          {block.description && (
            <Text variant="body" css={{ color: '$gray400', mb: '$16' }}>
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
            </Text>
          )}
        </InnerWrapper>
        {block.image && block.image.filename && (
          <ImageWrapper
            style={{
              backgroundImage: `url(${block.image.filename})`,
            }}
            css={{
              height: imageHeight?.[3] || '200px',
              '@sm': { height: imageHeight?.[2] || '400px' },
              '@md': { height: imageHeight?.[1] || '500px' },
              '@lg': { height: imageHeight?.[0] || '700px' },
            }}
          />
        )}
      </StyledContainer>
    </Wrapper>
  )
}

const Wrapper = styled('section', {
  py: '$20',

  '@md': {
    py: '$24',
  },

  '@lg': {
    py: '$40',
  },
})

const StyledContainer = styled(Container, {
  position: 'relative',

  px: '$0',
})

const InnerWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  position: 'absolute',
  zIndex: '$1',
  top: '$40',
  left: '$20',

  maxWidth: '335px',

  '@md': {
    top: '48px',
    left: '112px',

    maxWidth: '544px',
  },

  '@lg': {
    top: '128px',
    left: '224px',

    maxWidth: '368px',
  },
})

const ImageWrapper = styled('div', {
  borderRadius: 'unset',

  backgroundSize: '100% 100%',
  backgroundRepeat: 'no-repeat',

  position: 'relative',

  '@md': {
    borderRadius: '$md',
  },
})
