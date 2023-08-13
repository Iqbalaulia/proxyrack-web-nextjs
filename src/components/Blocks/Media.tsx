import NextImage from 'next/image'

import { Container } from 'UI'
import { MediaStoryblok } from 'common/types'
import { getImageAttributes } from 'common/utils/content'
import { styled } from 'lib/style'

type MediaProps = {
  block: MediaStoryblok
}

export const Media = ({ block, ...props }: MediaProps): JSX.Element => {
  const videoRegex = new RegExp(
    '.(mp4|mkv|wmv|m4v|mov|avi|flv|webm|flac|mka|m4a|aac|og)$'
  )

  const isVideo = videoRegex.test(block.media.filename)

  return (
    <Wrapper {...props}>
      <Container>
        {block.media && block.media.filename && (
          <>
            {isVideo ? (
              <VideoContainer>
                <StyledVideo controls>
                  <source src={block.media.filename} type="video/mp4" />
                </StyledVideo>
              </VideoContainer>
            ) : (
              <ImageWrapper>
                <NextImage
                  src={getImageAttributes(block.media).src}
                  layout="fill"
                  objectFit="cover"
                />
              </ImageWrapper>
            )}
          </>
        )}
      </Container>
    </Wrapper>
  )
}

const Wrapper = styled('section', {
  py: '$20',

  '@md': {
    pt: '$40',
    pb: '$80',
  },
})

const ImageWrapper = styled('div', {
  position: 'relative',
  height: '260px',

  '@md': {
    height: '432px',
  },

  '@lg': {
    height: '620px',
  },
})

const VideoContainer = styled('div', {
  width: '100%',
  paddingTop: '56.25%',
  height: '0px',
  position: 'relative',
})

const StyledVideo = styled('video', {
  width: '100%',
  height: '100%',
  position: 'absolute',
  top: '$0',
  left: '$0',

  backgroundColor: 'black',
})
