import { NextSeo } from 'next-seo'
import React from 'react'
import { StoryData } from 'storyblok-js-client'

import { SITE_ORIGIN } from 'common/constants'
import {
  fixMissingTrailingSlashOfUrl,
  removePagesPrefix,
} from 'common/utils/content'

export const Seo = ({ story }: { story: StoryData }): JSX.Element => {
  const url = (SITE_ORIGIN + removePagesPrefix(story.full_slug)).trim()
  const noIndex = story.content?.should_index === 'no'

  return (
    <NextSeo
      title={story.content?.seo?.og_title || story.content?.seo?.title}
      description={story.content?.seo?.description}
      canonical={
        story.content?.canonical_url || fixMissingTrailingSlashOfUrl(url)
      }
      noindex={noIndex}
      nofollow={noIndex}
      openGraph={{
        type: 'website',
        url: url,
        title:
          story.content?.seo?.og_title ||
          story.content?.seo?.twitter_title ||
          story.content?.seo?.title,
        description:
          story.content?.seo?.og_description ||
          story.content?.seo?.twitter_description ||
          story.content?.seo?.description,
        images: [
          {
            url:
              story.content?.seo?.og_image || story.content?.seo?.twitter_image,
          },
        ],
      }}
      languageAlternates={[
        {
          hrefLang: 'x-default',
          href: SITE_ORIGIN,
        },
      ]}
    />
  )
}
