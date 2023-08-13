import { useEffect, useState } from 'react'

import { SectionAnchorWrapperStoryblok } from 'common/types'

import { DynamicBlock } from './DynamicBlock'

type PropsTypes = {
  block: SectionAnchorWrapperStoryblok
}

export const SectionAnchorWrapper = ({
  block,
  ...props
}: PropsTypes): JSX.Element => {
  const { as: Wrapper = 'section' } = block

  const [isTagsInserted, setTagsInserted] = useState(false)

  useEffect(() => {
    const timeOut = setTimeout(() => {
      try {
        if (typeof window !== undefined && !isTagsInserted) {
          const selectedElm = document.evaluate(
            block?.html_selector_path?.trim() ||
              `//*[@id="${block.section_id}"]`,
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
          ).singleNodeValue
          if (selectedElm === null) {
            return
          }
          block.Tags.forEach((tagEntry) => {
            const tag = document.createElement(tagEntry.tag_name)
            if (tag) {
              tagEntry.attributes.split('\n').forEach((attribute) => {
                const equalIndex = attribute.indexOf('=')
                const [attributeName, attributeValue]: string[] =
                  equalIndex === -1
                    ? [attribute, 'true']
                    : [
                        attribute.slice(0, equalIndex),
                        attribute.slice(equalIndex + 1),
                      ].map((x) => x.trimStart().trimEnd())
                if (attributeName)
                  tag.setAttribute(attributeName.trim(), attributeValue)
              })
              if (tagEntry.children) tag.innerHTML = tagEntry.children
              if (block.insert_position === 'start') {
                selectedElm?.insertBefore?.(tag, selectedElm?.firstChild)
              } else {
                selectedElm?.appendChild?.(tag)
              }
            }
          })
          setTagsInserted(true)
        }
      } catch (error) {
        setTagsInserted(true)
        console.error('ERROR While inserting tags: ', error)
      }
    }, 100)

    return () => clearTimeout(timeOut)
  }, [])

  return (
    <Wrapper id={block.section_id} {...props}>
      {block.child_component.map((blk: any) => (
        <DynamicBlock key={blk._uid} block={blk} />
      ))}
    </Wrapper>
  )
}
