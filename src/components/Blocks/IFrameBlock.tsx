import { Container } from 'UI'
import { IFrameStoryblok } from 'common/types'
import { styled } from 'lib/style'

type PropsTypes = {
  block: IFrameStoryblok
}

export const IFrameBlock = ({ block }: PropsTypes): JSX.Element => {
  return (
    <Container>
      <IFrameStyled
        css={{ height: block.height, width: block.width }}
        src={block.url}
        title={block.title}
        height={block.height}
        width={block.width}
      />
    </Container>
  )
}

const IFrameStyled = styled('iframe', {
  border: '0px',
})
