import React, { ComponentProps } from 'react'

import { IconOptions } from 'UI/Icon/Icon'
import { LinkProps } from 'UI/Link'
import { CMSLink } from 'components/Shared/CMSLink'

export interface AnchorStoryblok {
  block_configurations?: BlockConfigurations
  anchor_entry: AnchorEntryStoryblok[]
  _uid: string
  component: 'anchor'
  [k: string]: any
}

export interface AnchorEntryStoryblok {
  block_configurations?: BlockConfigurations
  title: string
  description: any
  link_new?: ButtonStoryBlock[]
  link_title: string
  link:
    | {
        cached_url?: string
        linktype?: string
        [k: string]: any
      }
    | {
        id?: string
        cached_url?: string
        linktype?: 'story'
        [k: string]: any
      }
    | {
        url?: string
        cached_url?: string
        linktype?: 'asset' | 'url'
        [k: string]: any
      }
    | {
        email?: string
        linktype?: 'email'
        [k: string]: any
      }
  _uid: string
  component: 'anchor_entry'
  [k: string]: any
}

export interface BasicHeroStoryblok {
  block_configurations?: BlockConfigurations
  title: any
  description: any
  button_new?: ButtonStoryBlock[]
  button_text?: string
  button_link?:
    | {
        cached_url?: string
        linktype?: string
        [k: string]: any
      }
    | {
        id?: string
        cached_url?: string
        linktype?: 'story'
        [k: string]: any
      }
    | {
        url?: string
        cached_url?: string
        linktype?: 'asset' | 'url'
        [k: string]: any
      }
    | {
        email?: string
        linktype?: 'email'
        [k: string]: any
      }
  _uid: string
  component: 'basic_hero' | 'basic_hero_rich_fields'
  [k: string]: any
}

export interface BestForInfoStoryblok {
  block_configurations?: BlockConfigurations
  tag?: string
  best_for_info_entry: BestForInfoEntryStoryblok[]
  _uid: string
  component: 'best_for_info'
  [k: string]: any
}

export interface BestForInfoEntryStoryblok {
  block_configurations?: BlockConfigurations
  icon: {
    alt?: string
    copyright?: string
    id: number
    filename: string
    name: string
    title?: string
  }
  label: string
  _uid: string
  component: 'best_for_info_entry'
  [k: string]: any
}

export interface BlogPostStoryblok {
  block_configurations?: BlockConfigurations
  author: string
  cover: {
    alt?: string
    copyright?: string
    id: number
    filename: string
    name: string
    title?: string
  }
  title: string
  blog_post: any
  blocks?: ConversionCardVerticalStoryblok[]
  seo?: {
    _uid?: string
    title?: string
    plugin?: string
    og_image?: string
    og_title?: string
    description: any
    twitter_image?: string
    twitter_title?: string
    og_description?: string
    twitter_description?: string
    [k: string]: any
  }
  canonical_url?: string
  should_index?: 'yes' | 'no'
  _uid: string
  component: 'blog_post'
  [k: string]: any
}

export interface ComparisonStoryblok {
  block_configurations?: BlockConfigurations
  metrics: ComparisonMetricsStoryblok[]
  _uid: string
  component: 'comparison'
  [k: string]: any
}

export interface ComparisonCompanyStoryblok {
  block_configurations?: BlockConfigurations
  name: string
  logo: {
    alt?: string
    copyright?: string
    id: number
    filename: string
    name: string
    title?: string
  }
  _uid: string
  component: 'comparison_company'
  [k: string]: any
}

export interface ComparisonMetricsStoryblok {
  block_configurations?: BlockConfigurations
  metric: string
  quantities: ComparisonQuantityStoryblok[]
  _uid: string
  component: 'comparison_metrics'
  [k: string]: any
}

export interface ComparisonQuantityStoryblok {
  block_configurations?: BlockConfigurations
  quantity: number
  values: ComparisonValueStoryblok[]
  _uid: string
  component: 'comparison_quantity'
  [k: string]: any
}

export interface ComparisonToolStoryblok {
  title?: string
  block_configurations?: BlockConfigurations
  description?: any
  comparison?: string
  _uid: string
  component: 'comparison_tool'
  [k: string]: any
}

export interface ComparisonValueStoryblok {
  block_configurations?: BlockConfigurations
  company: string
  value: number
  _uid: string
  component: 'comparison_value'
  [k: string]: any
}

export interface ContainedHeroStoryblok {
  block_configurations?: BlockConfigurations
  title: string
  background: {
    alt?: string
    copyright?: string
    id: number
    filename: string
    name: string
    title?: string
  }
  background_small: {
    alt?: string
    copyright?: string
    id: number
    filename: string
    name: string
    title?: string
  }
  background_medium: {
    alt?: string
    copyright?: string
    id: number
    filename: string
    name: string
    title?: string
  }
  description: any
  primary_button_new?: ButtonStoryBlock[]
  primary_button_text?: string
  primary_button_link?:
    | {
        cached_url?: string
        linktype?: string
        [k: string]: any
      }
    | {
        id?: string
        cached_url?: string
        linktype?: 'story'
        [k: string]: any
      }
    | {
        url?: string
        cached_url?: string
        linktype?: 'asset' | 'url'
        [k: string]: any
      }
    | {
        email?: string
        linktype?: 'email'
        [k: string]: any
      }
  scroll_button?: string
  _uid: string
  component: 'contained_hero' | 'contained_hero_rich_fields'
  [k: string]: any
}

export interface ConversionCardEntryStoryblok {
  block_configurations?: BlockConfigurations
  icon: {
    alt?: string
    copyright?: string
    id: number
    filename: string
    name: string
    title?: string
  }
  title: string
  description: any
  button_new?: ButtonStoryBlock[]
  button_text?: string
  button_link:
    | {
        cached_url?: string
        linktype?: string
        [k: string]: any
      }
    | {
        id?: string
        cached_url?: string
        linktype?: 'story'
        [k: string]: any
      }
    | {
        url?: string
        cached_url?: string
        linktype?: 'asset' | 'url'
        [k: string]: any
      }
    | {
        email?: string
        linktype?: 'email'
        [k: string]: any
      }
  _uid: string
  component: 'conversion_card_entry'
  [k: string]: any
}

export interface ConversionCardHorizontalStoryblok {
  block_configurations?: BlockConfigurations
  theme: 'light' | 'dark'
  title: string
  description: any
  conversion_entry: ConversionCardEntryStoryblok[]
  _uid: string
  component: 'conversion_card_horizontal'
  [k: string]: any
}

export interface ConversionCardVerticalStoryblok {
  block_configurations?: BlockConfigurations
  theme: 'light' | 'dark'
  title: string
  description: any
  conversion_entry: ConversionCardEntryStoryblok[]
  _uid: string
  component: 'conversion_card_vertical'
  [k: string]: any
}

export interface DataPointsStoryblok {
  block_configurations?: BlockConfigurations
  layout: 'right' | 'left'
  tag: string
  title: string
  description: any
  image: {
    alt?: string
    copyright?: string
    id: number
    filename: string
    name: string
    title?: string
  }
  data_points: DataPointsEntryStoryblok[]
  _uid: string
  component: 'data_points'
  [k: string]: any
}

export interface DataPointsEntryStoryblok {
  block_configurations?: BlockConfigurations
  value: string
  city: string
  _uid: string
  component: 'data_points_entry'
  [k: string]: any
}

export interface FaqsStoryblok {
  block_configurations?: BlockConfigurations
  title: string
  faqs_entry: FaqsEntryStoryblok[]
  _uid: string
  component: 'faqs'
  [k: string]: any
}

export interface FaqsEntryStoryblok {
  block_configurations?: BlockConfigurations
  question: string
  answer: string
  _uid: string
  component: 'faqs_entry'
  [k: string]: any
}

export interface FeatureCarouselStoryblok {
  block_configurations?: BlockConfigurations
  layout: 'left' | 'right'
  feature_carousel_entry: FeatureCarouselEntryStoryblok[]
  feature_carousel_entry_sec_col?: FeatureCarouselEntryStoryblok[]
  _uid: string
  component: 'feature_carousel'
  [k: string]: any
}

export interface FeatureCarouselEntryStoryblok {
  block_configurations?: BlockConfigurations
  title: string
  description: any
  image: {
    alt?: string
    copyright?: string
    id: number
    filename: string
    name: string
    title?: string
  }
  _uid: string
  component: 'feature_carousel_entry'
  [k: string]: any
}

export interface FeatureEntryStoryblok {
  block_configurations?: BlockConfigurations
  icon: {
    alt?: string
    copyright?: string
    id: number
    filename: string
    name: string
    title?: string
  }
  title: string
  description: any
  _uid: string
  component: 'feature_entry'
  [k: string]: any
}

export interface FeaturesStoryblok {
  block_configurations?: BlockConfigurations
  layout: 'grid-bottom' | 'grid-right'
  theme: 'light' | 'dark'
  tag: string
  title: string
  description?: any
  features: FeatureEntryStoryblok[]
  _uid: string
  component: 'features'
  [k: string]: any
}

export interface FooterStoryblok {
  block_configurations?: BlockConfigurations
  links: FooterPanelLinkStoryblok[]
  questions: FooterQuestionsLinkStoryblok[]
  links_privacy: FooterPrivacyLinkEntryStoryblok[]
  socials: FooterSocialsStoryblok[]
  _uid: string
  component: 'footer'
  [k: string]: any
}

export interface FooterPanelLinkStoryblok {
  block_configurations?: BlockConfigurations
  title: string
  links: FooterPanelLinkEntryStoryblok[]
  _uid: string
  component: 'footer_panel_link'
  [k: string]: any
}

export interface FooterPanelLinkEntryStoryblok {
  block_configurations?: BlockConfigurations
  title: string
  link:
    | {
        cached_url?: string
        linktype?: string
        [k: string]: any
      }
    | {
        id?: string
        cached_url?: string
        linktype?: 'story'
        [k: string]: any
      }
    | {
        url?: string
        cached_url?: string
        linktype?: 'asset' | 'url'
        [k: string]: any
      }
    | {
        email?: string
        linktype?: 'email'
        [k: string]: any
      }
  _uid: string
  component: 'footer_panel_link_entry'
  [k: string]: any
}

export interface FooterPrivacyLinkEntryStoryblok {
  block_configurations?: BlockConfigurations
  title: string
  link:
    | {
        cached_url?: string
        linktype?: string
        [k: string]: any
      }
    | {
        id?: string
        cached_url?: string
        linktype?: 'story'
        [k: string]: any
      }
    | {
        url?: string
        cached_url?: string
        linktype?: 'asset' | 'url'
        [k: string]: any
      }
    | {
        email?: string
        linktype?: 'email'
        [k: string]: any
      }
  _uid: string
  component: 'footer_privacy_link_entry'
  [k: string]: any
}

export interface FooterQuestionsEntryStoryblok {
  block_configurations?: BlockConfigurations
  title: string
  link:
    | {
        cached_url?: string
        linktype?: string
        [k: string]: any
      }
    | {
        id?: string
        cached_url?: string
        linktype?: 'story'
        [k: string]: any
      }
    | {
        url?: string
        cached_url?: string
        linktype?: 'asset' | 'url'
        [k: string]: any
      }
    | {
        email?: string
        linktype?: 'email'
        [k: string]: any
      }
  _uid: string
  component: 'footer_questions_entry'
  [k: string]: any
}

export interface FooterQuestionsLinkStoryblok {
  block_configurations?: BlockConfigurations
  title: string
  questions: FooterQuestionsEntryStoryblok[]
  _uid: string
  component: 'footer_questions_link'
  [k: string]: any
}

export interface FooterSocialsStoryblok {
  block_configurations?: BlockConfigurations
  link:
    | {
        cached_url?: string
        linktype?: string
        [k: string]: any
      }
    | {
        id?: string
        cached_url?: string
        linktype?: 'story'
        [k: string]: any
      }
    | {
        url?: string
        cached_url?: string
        linktype?: 'asset' | 'url'
        [k: string]: any
      }
    | {
        email?: string
        linktype?: 'email'
        [k: string]: any
      }
  image: {
    alt?: string
    copyright?: string
    id: number
    filename: string
    name: string
    title?: string
  }
  _uid: string
  component: 'footer_socials'
  [k: string]: any
}

export interface HeroStoryblok {
  block_configurations?: BlockConfigurations
  layout: 'left' | 'right'
  title: string
  background: {
    alt?: string
    copyright?: string
    id: number
    filename: string
    name: string
    title?: string
  }
  background_medium: {
    alt?: string
    copyright?: string
    id: number
    filename: string
    name: string
    title?: string
  }
  background_small: {
    alt?: string
    copyright?: string
    id: number
    filename: string
    name: string
    title?: string
  }
  background_fallback: {
    alt?: string
    copyright?: string
    id: number
    filename: string
    name: string
    title?: string
  }
  description: any
  primary_button_new?: ButtonStoryBlock[]
  primary_button_text?: string
  primary_button_link?:
    | {
        cached_url?: string
        linktype?: string
        [k: string]: any
      }
    | {
        id?: string
        cached_url?: string
        linktype?: 'story'
        [k: string]: any
      }
    | {
        url?: string
        cached_url?: string
        linktype?: 'asset' | 'url'
        [k: string]: any
      }
    | {
        email?: string
        linktype?: 'email'
        [k: string]: any
      }
  scroll_button?: string
  _uid: string
  component: 'hero' | 'hero_rich_fields'
  [k: string]: any
}

export interface HtmlStoryblok {
  block_configurations?: BlockConfigurations
  _uid: string
  component: 'html'
  [k: string]: any
}

export interface HTMLStoryblok {
  block_configurations?: BlockConfigurations
  _uid: string
  component: 'HTML'
  [k: string]: any
}

export interface ImageHeroStoryblok {
  block_configurations?: BlockConfigurations
  layout: 'left' | 'right'
  title: string
  description: any
  background?: {
    alt?: string
    copyright?: string
    id: number
    filename: string
    name: string
    title?: string
  }
  primary_button_new?: ButtonStoryBlock[]
  primary_button_text?: string
  primary_button_link?:
    | {
        cached_url?: string
        linktype?: string
        [k: string]: any
      }
    | {
        id?: string
        cached_url?: string
        linktype?: 'story'
        [k: string]: any
      }
    | {
        url?: string
        cached_url?: string
        linktype?: 'asset' | 'url'
        [k: string]: any
      }
    | {
        email?: string
        linktype?: 'email'
        [k: string]: any
      }
  scroll_button?: string
  _uid: string
  component: 'image_hero' | 'image_hero_rich_fields'
  [k: string]: any
}

export interface ImageSectionStoryblok {
  block_configurations?: BlockConfigurations
  tag: string
  title: string
  description: any
  image: {
    alt?: string
    copyright?: string
    id: number
    filename: string
    name: string
    title?: string
  }
  image_height: string
  _uid: string
  component: 'image_section'
  [k: string]: any
}

export interface InfoRowStoryblok {
  block_configurations?: BlockConfigurations
  layout: 'left' | 'center'
  info_row_entry: InfoRowEntryStoryblok[]
  _uid: string
  component: 'info_row'
  [k: string]: any
}

export interface InfoRowEntryStoryblok {
  block_configurations?: BlockConfigurations
  title: string
  description: any
  _uid: string
  component: 'info_row_entry'
  [k: string]: any
}

export interface MediaStoryblok {
  block_configurations?: BlockConfigurations
  media: {
    alt?: string
    copyright?: string
    id: number
    filename: string
    name: string
    title?: string
  }
  _uid: string
  component: 'media'
  [k: string]: any
}

export interface NavbarStoryblok {
  block_configurations?: BlockConfigurations
  links: (NavbarLinkStoryblok | NavbarPanelLinkStoryblok)[]
  sign_in_title: string
  sign_in_link:
    | {
        cached_url?: string
        linktype?: string
        [k: string]: any
      }
    | {
        id?: string
        cached_url?: string
        linktype?: 'story'
        [k: string]: any
      }
    | {
        url?: string
        cached_url?: string
        linktype?: 'asset' | 'url'
        [k: string]: any
      }
    | {
        email?: string
        linktype?: 'email'
        [k: string]: any
      }
  sign_up_title: string
  sign_up_link:
    | {
        cached_url?: string
        linktype?: string
        [k: string]: any
      }
    | {
        id?: string
        cached_url?: string
        linktype?: 'story'
        [k: string]: any
      }
    | {
        url?: string
        cached_url?: string
        linktype?: 'asset' | 'url'
        [k: string]: any
      }
    | {
        email?: string
        linktype?: 'email'
        [k: string]: any
      }
  _uid: string
  component: 'navbar'
  [k: string]: any
}

export interface NavbarLinkStoryblok {
  block_configurations?: BlockConfigurations
  title: string
  link:
    | {
        cached_url?: string
        linktype?: string
        [k: string]: any
      }
    | {
        id?: string
        cached_url?: string
        linktype?: 'story'
        [k: string]: any
      }
    | {
        url?: string
        cached_url?: string
        linktype?: 'asset' | 'url'
        [k: string]: any
      }
    | {
        email?: string
        linktype?: 'email'
        [k: string]: any
      }
  _uid: string
  component: 'navbar_link'
  [k: string]: any
}

export interface NavbarPanelLinkStoryblok {
  block_configurations?: BlockConfigurations
  title: string
  links: NavbarPanelLinkEntryStoryblok[]
  _uid: string
  component: 'navbar_panel_link'
  [k: string]: any
}

export interface NavbarPanelLinkEntryStoryblok {
  block_configurations?: BlockConfigurations
  title: string
  description: any
  link:
    | {
        cached_url?: string
        linktype?: string
        [k: string]: any
      }
    | {
        id?: string
        cached_url?: string
        linktype?: 'story'
        [k: string]: any
      }
    | {
        url?: string
        cached_url?: string
        linktype?: 'asset' | 'url'
        [k: string]: any
      }
    | {
        email?: string
        linktype?: 'email'
        [k: string]: any
      }
  _uid: string
  component: 'navbar_panel_link_entry'
  [k: string]: any
}

export interface NewStoryblok {
  block_configurations?: BlockConfigurations
  _uid: string
  component: 'new'
  [k: string]: any
}

export interface PageStoryblok {
  block_configurations?: BlockConfigurations
  navbar: string
  hero: (
    | BasicHeroStoryblok
    | ContainedHeroStoryblok
    | HeroStoryblok
    | ImageHeroStoryblok
  )[]
  body?: (
    | AnchorStoryblok
    | BestForInfoStoryblok
    | ComparisonToolStoryblok
    | ConversionCardHorizontalStoryblok
    | ConversionCardVerticalStoryblok
    | DataPointsStoryblok
    | FaqsStoryblok
    | FeatureCarouselStoryblok
    | FeaturesStoryblok
    | ImageSectionStoryblok
    | InfoRowStoryblok
    | MediaStoryblok
    | PlainTextStoryblok
    | PriceTableStoryblok
    | PricingCardHorizontalStoryblok
    | PricingCardSmallStoryblok
    | PricingSliderStoryblok
    | ProxyListStoryblok
    | RichTextStoryblok
    | SectionHeaderStoryblok
    | TabsStoryblok
    | TestimonialStoryblok
    | TrustpilotStoryblok
    | TwoColumnsStoryblok
    | SectionAnchorWrapperStoryblok
    | ButtonStoryBlock
    | TwoRichColumnLayoutStoryblok
    | GridLayoutStoryblok
    | NewRichTextStoryblok
    | BlockConfigurationsWrapperStoryblok
    | TagEntryStoryblok
    | BulletListTableStoryblok
    | TableStoryblok
  )[]
  pre_footer?: string
  seo?: {
    _uid?: string
    title?: string
    plugin?: string
    og_image?: string
    og_title?: string
    description: any
    twitter_image?: string
    twitter_title?: string
    og_description?: string
    twitter_description?: string
    [k: string]: any
  }
  canonical_url?: string
  should_index?: 'yes' | 'no'
  footer: string
  _uid: string
  component: 'page'
  uuid?: string
  [k: string]: any
  body_tags: TagEntryStoryblok[]
  head_tags: TagEntryStoryblok[]
}

export interface PlainTextStoryblok {
  block_configurations?: BlockConfigurations
  layout: 'left' | 'center'
  title: string
  description: any
  _uid: string
  component: 'plain_text'
  [k: string]: any
}

export interface PreFooterStoryblok {
  block_configurations?: BlockConfigurations
  title: string
  button_text: string
  button_link:
    | {
        cached_url?: string
        linktype?: string
        [k: string]: any
      }
    | {
        id?: string
        cached_url?: string
        linktype?: 'story'
        [k: string]: any
      }
    | {
        url?: string
        cached_url?: string
        linktype?: 'asset' | 'url'
        [k: string]: any
      }
    | {
        email?: string
        linktype?: 'email'
        [k: string]: any
      }
  image: {
    alt?: string
    copyright?: string
    id: number
    filename: string
    name: string
    title?: string
  }
  _uid: string
  component: 'pre_footer'
  [k: string]: any
}

export interface PriceTableStoryblok {
  block_configurations?: BlockConfigurations
  variant: 'single' | 'blocks'
  price: string
  _uid: string
  component: 'price_table'
  [k: string]: any
}

export interface PricingStoryblok {
  block_configurations?: BlockConfigurations
  units: 'none' | 'threads' | 'gbs' | 'ports'
  plans: (PricingPlanStoryblok | PricingPlanCustomStoryblok)[]
  _uid: string
  component: 'pricing'
  [k: string]: any
}

export interface PricingCardEntryStoryblok {
  block_configurations?: BlockConfigurations
  most_popular?: 'yes' | 'no'
  type: string
  threads?: string
  price: string
  price_type: string
  price_per_thread?: string
  button_new?: ButtonStoryBlock[]
  button_text: string
  button_link:
    | {
        cached_url?: string
        linktype?: string
        [k: string]: any
      }
    | {
        id?: string
        cached_url?: string
        linktype?: 'story'
        [k: string]: any
      }
    | {
        url?: string
        cached_url?: string
        linktype?: 'asset' | 'url'
        [k: string]: any
      }
    | {
        email?: string
        linktype?: 'email'
        [k: string]: any
      }
  features: PricingCardFeaturesEntryStoryblok[]
  _uid: string
  component: 'pricing_card_entry'
  [k: string]: any
}

export interface PricingCardFeaturesEntryStoryblok {
  block_configurations?: BlockConfigurations
  description: any
  _uid: string
  component: 'pricing_card_features_entry'
  [k: string]: any
}

export interface PricingCardHorizontalStoryblok {
  block_configurations?: BlockConfigurations
  title?: string
  pricing: PricingCardEntryStoryblok[]
  _uid: string
  component: 'pricing_card_horizontal'
  [k: string]: any
}

export interface PricingCardSmallStoryblok {
  block_configurations?: BlockConfigurations
  pricing: PricingCardSmallEntryStoryblok[]
  _uid: string
  component: 'pricing_card_small'
  [k: string]: any
}

export interface PricingSliderStoryblok {
  block_configurations?: BlockConfigurations
  list_of_price: PricingSliderEntryStoryblok[]
  extra_blocks?: any[]
  _uid: string
  component: 'pricing_slider'
  [k: string]: any
}

export type TabbedPricingSliderEntry = {
  first_tab_name: string
  sec_tab_name: string
  sec_tab_description?: string
  pricing_slider: PricingSliderStoryblok[]
}

export interface TabbedPricingSliderStoryblok {
  block_configurations?: BlockConfigurations
  _uid: string
  component: 'tabbed_pricing_slider'
  [k: string]: any

  Entries: TabbedPricingSliderEntry[]
}
export interface PricingSliderEntryStoryblok {
  block_configurations?: BlockConfigurations
  title: string
  product_name?: string
  quantity: number
  price_per_item: number
  price: number
  plan_type: string
  button_text: string
  button_link:
    | {
        cached_url?: string
        linktype?: string
        [k: string]: any
      }
    | {
        id?: string
        cached_url?: string
        linktype?: 'story'
        [k: string]: any
      }
    | {
        url?: string
        cached_url?: string
        linktype?: 'asset' | 'url'
        [k: string]: any
      }
    | {
        email?: string
        linktype?: 'email'
        [k: string]: any
      }
  _uid: string
  component: 'pricing_slider_entry'
  [k: string]: any
}

export interface PricingCardSmallEntryStoryblok {
  block_configurations?: BlockConfigurations
  title: string
  description: any
  starting: string
  price: string
  price_type: string
  button_new?: ButtonStoryBlock[]
  button_text: string
  button_link:
    | {
        cached_url?: string
        linktype?: string
        [k: string]: any
      }
    | {
        id?: string
        cached_url?: string
        linktype?: 'story'
        [k: string]: any
      }
    | {
        url?: string
        cached_url?: string
        linktype?: 'asset' | 'url'
        [k: string]: any
      }
    | {
        email?: string
        linktype?: 'email'
        [k: string]: any
      }
  _uid: string
  component: 'pricing_card_small_entry'
  [k: string]: any
}

export interface PricingPlanStoryblok {
  block_configurations?: BlockConfigurations
  title: string
  button_new?: ButtonStoryBlock[]
  button_title?: string
  button_link?:
    | {
        cached_url?: string
        linktype?: string
        [k: string]: any
      }
    | {
        id?: string
        cached_url?: string
        linktype?: 'story'
        [k: string]: any
      }
    | {
        url?: string
        cached_url?: string
        linktype?: 'asset' | 'url'
        [k: string]: any
      }
    | {
        email?: string
        linktype?: 'email'
        [k: string]: any
      }
  featured?: boolean
  trial?: boolean
  periodicy?: 'monthly' | 'yearly' | '3days'
  price: number
  unit_amount: number
  features?: any[]
  _uid: string
  component: 'pricing_plan'
  [k: string]: any
}

export interface PricingPlanCustomStoryblok {
  block_configurations?: BlockConfigurations
  title?: string
  features?: any[]
  _uid: string
  component: 'pricing_plan_custom'
  [k: string]: any
}

export interface ProxyListStoryblok {
  block_configurations?: BlockConfigurations
  title?: string
  _uid: string
  component: 'proxy_list'
  [k: string]: any
}

export interface RichTextStoryblok {
  block_configurations?: BlockConfigurations
  content: any
  _uid: string
  component: 'rich_text'
  [k: string]: any
}

export interface SectionHeaderStoryblok {
  block_configurations?: BlockConfigurations
  alignment: 'left' | 'center'
  tag: string
  title: string
  description: any
  button_new?: ButtonStoryBlock[]
  button_text?: string
  button_link?:
    | {
        cached_url?: string
        linktype?: string
        [k: string]: any
      }
    | {
        id?: string
        cached_url?: string
        linktype?: 'story'
        [k: string]: any
      }
    | {
        url?: string
        cached_url?: string
        linktype?: 'asset' | 'url'
        [k: string]: any
      }
    | {
        email?: string
        linktype?: 'email'
        [k: string]: any
      }
  _uid: string
  component: 'section_header'
  [k: string]: any
}

export interface TabEntryStoryblok {
  block_configurations?: BlockConfigurations
  title: string
  body?: (PriceTableStoryblok | ComparisonToolStoryblok)[]
  _uid: string
  component: 'tab_entry'
  [k: string]: any
}

export interface TabsStoryblok {
  block_configurations?: BlockConfigurations
  title: string
  tabs: TabEntryStoryblok[]
  _uid: string
  component: 'tabs'
  [k: string]: any
}

export interface TestimonialStoryblok {
  block_configurations?: BlockConfigurations
  layout?: 'right' | 'left'
  tag: string
  title: string
  image: {
    alt?: string
    copyright?: string
    id: number
    filename: string
    name: string
    title?: string
  }
  testimonial_entry: TestimonialEntryStoryblok[]
  _uid: string
  component: 'testimonial'
  [k: string]: any
}

export interface TestimonialEntryStoryblok {
  block_configurations?: BlockConfigurations
  description: any
  author: string
  _uid: string
  component: 'testimonial_entry'
  [k: string]: any
}

export interface TrustpilotStoryblok {
  block_configurations?: BlockConfigurations
  _uid: string
  component: 'trustpilot'
  [k: string]: any
}

export interface TrustpilotHorizontalStoryblok {
  block_configurations?: BlockConfigurations
  trustpilot?: string
  _uid: string
  component: 'Trustpilot horizontal'
  [k: string]: any
}

export interface TwoColumnsStoryblok {
  block_configurations?: BlockConfigurations
  layout: 'right' | 'left'
  image: {
    alt?: string
    copyright?: string
    id: number
    filename: string
    name: string
    title?: string
  }
  title: string
  description: any
  button_new?: ButtonStoryBlock[]
  button_text?: string
  button_link?:
    | {
        cached_url?: string
        linktype?: string
        [k: string]: any
      }
    | {
        id?: string
        cached_url?: string
        linktype?: 'story'
        [k: string]: any
      }
    | {
        url?: string
        cached_url?: string
        linktype?: 'asset' | 'url'
        [k: string]: any
      }
    | {
        email?: string
        linktype?: 'email'
        [k: string]: any
      }
  _uid: string
  component: 'two_columns'
  [k: string]: any
}
export interface SectionAnchorWrapperStoryblok {
  block_configurations?: BlockConfigurations
  section_id: string
  child_component: any
  as: React.ElementType
  html_selector_path: string
  insert_position: 'start' | 'end'
  Tags: TagEntryStoryblok[]
  _uid: string
  component: 'section_anchor_wrapper'
  [k: string]: any
}

type CMSLinkTypes = ComponentProps<typeof CMSLink>
export type ButtonStoryBlock = {
  _uid: string
  component: 'button'
  [k: string]: any

  text: string
  link: CMSLinkTypes['href']
  color?: string
  background_color?: string
  margin?: string
} & (
  | {
      type: 'button'
      variant?: any
    }
  | {
      type: 'link'
      variant?: LinkProps['variant']
      icon?: IconOptions
      icon_variant?: 'transition' | 'noTransition'
    }
)

export interface TwoRichColumnLayoutStoryblok {
  column_left: any
  column_right: any
  column_left_text_alignment: 'left' | 'right' | 'center'
  column_right_text_alignment: 'left' | 'right' | 'center'
  bg_color: string
  text_color: string
  _uid: string
  component: 'two_rich_column_layout'
  [k: string]: any
}

export interface GridLayoutStoryblok {
  block_configurations?: BlockConfigurations
  columns: number
  items: GridLayoutItemEntryStoryblok[]
  inside_container: boolean
  title: any
  _uid: string
  component: 'grid_layout'
  [k: string]: any
}

export interface NewRichTextStoryblok {
  block_configurations?: BlockConfigurations
  document: any
  _uid: string
  component: 'new_rich_text'
  [k: string]: any
}

export type BlockConfigurations = {
  appearance_theme?: 'lightForBlock' | 'darkForBlock' | 'transparentForBlock'
}

export type BlockConfigurationsWrapperStoryblok = {
  children_blocks: any[]
  _uid: string
  component: 'block_configurations_wrapper'
  [k: string]: any
} & BlockConfigurations

export interface TagEntryStoryblok {
  tag_name: string
  children: string
  attributes: string
  _uid: string
  component: 'tag_entry'
  [k: string]: any
}

export interface BulletListTableStoryblok {
  block_configurations?: BlockConfigurations
  contents: any[]
  columns: number
  _uid: string
  component: 'bullet_list_table'
  [k: string]: any
}

export interface TableStoryblok {
  block_configurations?: BlockConfigurations
  table: any
  _uid: string
  component: 'table'
  [k: string]: any
}

export interface IFrameStoryblok {
  url: string
  title: string
  width: string
  height: string

  _uid: string
  component: 'iframe'
  [k: string]: any
}
