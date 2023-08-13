import { ButtonStoryBlock } from '../../common/types'
import { CMSLink } from '../../components/Shared/CMSLink'

type PropsTypes = {
  block: ButtonStoryBlock
  css?: { [k: string]: any }
}

export const ButtonBlock = ({ block, css = {} }: PropsTypes): JSX.Element => {
  const {
    text,
    link,
    type = 'button',
    variant = 'default',
    icon,
    icon_variant,
    color,
    background_color,
    margin,
  } = block
  if (text == null || text === '') return <></>
  return (
    <CMSLink
      href={link}
      linkStyle={
        type === 'link'
          ? {
              type: type,
              variant: variant,
              icon: icon,
              iconVariant: icon_variant,
            }
          : {
              type: type || 'button', // default button
              variant: variant || 'primary', // default primary
            }
      }
      css={{
        color: color ?? undefined,
        backgroundColor: background_color ?? undefined,
        margin: margin,
        ...css,
      }}
    >
      {text}
    </CMSLink>
  )
}
