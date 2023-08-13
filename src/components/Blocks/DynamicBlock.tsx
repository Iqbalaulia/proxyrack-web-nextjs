import { StoryData } from 'storyblok-js-client'

import { Components } from './'
import { Editable } from './Editable'

const Placeholder = ({ componentName }: { componentName: string }) => {
  if (process.env.NODE_ENV !== 'production') {
    throw new Error(`Uncaught dynamic block: ${componentName}`)
  }

  return null
}

export const DynamicBlock: React.FC<{ block: StoryData['content'] }> = ({
  block,
}) => {
  if (typeof Components[block.component] !== 'undefined') {
    const Component = Components[block.component]
    return (
      <Editable block={block}>
        <Component block={block} />
      </Editable>
    )
  }

  return <Placeholder componentName={block.component} />
}
