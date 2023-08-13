import { Children, cloneElement, isValidElement } from 'react'
import { StoryData } from 'storyblok-js-client'

export const Editable: React.FC<{ block: StoryData['content'] }> = ({
  children,
  block,
}) => {
  const props: {
    'data-blok-c'?: string
    'data-blok-uid'?: string
    className?: string
  } = {}

  if (block._editable) {
    const options = JSON.parse(
      block._editable.replace(/^<!--#storyblok#/, '').replace(/-->$/, '')
    )

    props['data-blok-c'] = JSON.stringify(options)
    props['data-blok-uid'] = `${options.id}-${options.uid}`
    props['className'] = 'storyblok__outline'
  }

  const { className, ...rest } = props

  return (
    <>
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          return cloneElement(child, {
            className: child.props.className
              ? `${child.props.className} ${className}`
              : className,
            ...rest,
          })
        }

        return child
      })}
    </>
  )
}
