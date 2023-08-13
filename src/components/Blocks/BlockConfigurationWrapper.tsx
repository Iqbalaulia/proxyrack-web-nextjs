import { Theme } from 'UI'
import {
  BlockConfigurations,
  BlockConfigurationsWrapperStoryblok,
} from 'common/types'

import { DynamicBlock } from './DynamicBlock'

type PropsTypes = {
  block: BlockConfigurationsWrapperStoryblok
}

export const BlockConfigurationsWrapper = ({
  block,
  ...props
}: PropsTypes): JSX.Element => {
  const { as: Wrapper = 'section' } = block

  const block_configurations: BlockConfigurations = ['appearance_theme'].reduce(
    (prev, cur) => ({ ...prev, [cur]: block[cur] }),
    {}
  )

  const WrappedTheme = block_configurations.appearance_theme ? Theme : 'div'

  return (
    <Wrapper id={block.section_id} {...props}>
      {block.children_blocks.map((blk: any) => (
        <WrappedTheme
          key={blk._uid}
          theme={block_configurations.appearance_theme || 'light'}
        >
          <DynamicBlock
            block={{
              ...blk,
              block_configurations,
            }}
          />
        </WrappedTheme>
      ))}
    </Wrapper>
  )
}
