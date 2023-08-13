import { RichTextStoryblok } from 'common/types'
import { removeImageParagraphFromRichText } from 'common/utils/content'
import { CMSRichText } from 'components/Shared/CMSRichText'
import { styled } from 'lib/style'

type Props = {
  block: RichTextStoryblok
}

export const RichText = ({ block, ...props }: Props): JSX.Element => {
  const { content } = block

  return (
    <Wrapper {...props}>
      <CMSRichText
        css={{}}
        document={removeImageParagraphFromRichText(content)}
      />
    </Wrapper>
  )
}

const Wrapper = styled('section', {
  background: '$background',
  color: '$textPrimary',
  pt: '$80',
  pb: '$80',
})
