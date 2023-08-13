import { StoryData } from 'storyblok-js-client'

import { PriceTableStoryblok, PricingStoryblok } from 'common/types'

import { PriceBlockVertical } from './PriceBlockVertical'
import { PriceTable } from './PriceTable'

type PriceBlockProps = {
  block: PriceTableStoryblok & {
    price?: StoryData<PricingStoryblok>
  }
}

export const PriceBlock = ({
  block,
  ...props
}: PriceBlockProps): JSX.Element => {
  const isTableBlock = block.variant === 'blocks'

  if (!isTableBlock) {
    return <PriceTable price={block.price} {...props} />
  }
  return <PriceBlockVertical price={block.price} {...props} />
}
