import dynamic from 'next/dynamic'
import { ComponentType } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Components: Record<string, ComponentType<{ block: any }>> = {
  anchor: dynamic(() => import('./Anchor').then((mod) => mod.Anchor)),
  conversion_card_vertical: dynamic(() =>
    import('./ConversionCardVertical').then((mod) => mod.ConversionCardVertical)
  ),
  conversion_card_horizontal: dynamic(() =>
    import('./ConversionCardHorizontal').then(
      (mod) => mod.ConversionCardHorizontal
    )
  ),
  best_for_info: dynamic(() =>
    import('./BestForInfo').then((mod) => mod.BestForInfo)
  ),
  comparison_tool: dynamic(() =>
    import('./ComparisonTool').then((mod) => mod.ComparisonTool)
  ),
  data_points: dynamic(() =>
    import('./DataPoints').then((mod) => mod.DataPoints)
  ),
  feature_carousel: dynamic(() =>
    import('./FeatureCarousel').then((mod) => mod.FeatureCarousel)
  ),
  faqs: dynamic(() => import('./Faqs').then((mod) => mod.Faqs)),
  features: dynamic(() => import('./Features').then((mod) => mod.Features)),
  info_row: dynamic(() => import('./InfoRow').then((mod) => mod.InfoRow)),
  image_section: dynamic(() =>
    import('./ImageSection').then((mod) => mod.ImageSection)
  ),
  plain_text: dynamic(() => import('./PlainText').then((mod) => mod.PlainText)),
  price_table: dynamic(() =>
    import('./PriceBlock').then((mod) => mod.PriceBlock)
  ),
  pricing_card_horizontal: dynamic(() =>
    import('./PricingCard/Horizontal').then((mod) => mod.PricingCardHorizontal)
  ),
  pricing_card_small: dynamic(() =>
    import('./PricingCard/Small').then((mod) => mod.PricingCardSmall)
  ),
  pricing_slider: dynamic(() =>
    import('./PricingSlider').then((mod) => mod.PricingSlider)
  ),
  proxy_list: dynamic(() => import('./ProxyList').then((mod) => mod.ProxyList)),
  rich_text: dynamic(() => import('./RichText').then((mod) => mod.RichText)),
  media: dynamic(() => import('./Media').then((mod) => mod.Media)),
  trustpilot: dynamic(() =>
    import('./Trustpilot').then((mod) => mod.Trustpilot)
  ),
  section_header: dynamic(() =>
    import('./SectionHeader').then((mod) => mod.SectionHeader)
  ),
  testimonial: dynamic(() =>
    import('./Testimonial').then((mod) => mod.Testimonial)
  ),
  two_columns: dynamic(() =>
    import('./TwoColumns').then((mod) => mod.TwoColumns)
  ),
  tabs: dynamic(() => import('./Tabs').then((mod) => mod.TabsBlock)),
  section_anchor_wrapper: dynamic(() =>
    import('./SectionAnchorWrapper').then((mod) => mod.SectionAnchorWrapper)
  ),
  button: dynamic(() => import('./ButtonBlock').then((mod) => mod.ButtonBlock)),
  two_rich_column_layout: dynamic(() =>
    import('./TwoRichColumnLayout').then((mod) => mod.TwoRichColumnLayout)
  ),
  grid_layout: dynamic(() =>
    import('./GridLayout').then((mod) => mod.GridLayout)
  ),
  new_rich_text: dynamic(() =>
    import('./NewRichText').then((mod) => mod.NewRichText)
  ),
  block_configurations_wrapper: dynamic(() =>
    import('./BlockConfigurationWrapper').then(
      (mod) => mod.BlockConfigurationsWrapper
    )
  ),
  bullet_list_table: dynamic(() =>
    import('./BulletListTable').then((mod) => mod.BulletListTable)
  ),
  tabbed_pricing_slider: dynamic(() =>
    import('./TabbedPricingSlider').then((mod) => mod.TabbedPricingSlider)
  ),
  table: dynamic(() => import('./TableBlock').then((mod) => mod.TableBlock)),
  iframe: dynamic(() => import('./IFrameBlock').then((mod) => mod.IFrameBlock)),
}
