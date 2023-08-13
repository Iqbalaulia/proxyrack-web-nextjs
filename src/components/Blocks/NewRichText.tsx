import { NewRichTextStoryblok } from 'common/types'
import { CMSRichText } from 'components/Shared/CMSRichText'

type PropsTypes = {
  block?: NewRichTextStoryblok
  css?: any
  document?: any
}

export const NewRichText = ({
  block,
  css = {},
  document,
}: PropsTypes): JSX.Element => {
  return (
    <CMSRichText
      document={document || block?.document}
      noContainer
      css={{
        background: '$background',
        color: '$textPrimary',
        borderRadius: '$sm',
        ...css,
      }}
    />
  )
}
