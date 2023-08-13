import { useEffect, useState } from 'react'
import { StoryData } from 'storyblok-js-client'

import {
  NavbarStoryblok,
  FooterStoryblok,
  PageStoryblok,
  PreFooterStoryblok,
} from 'common/types'

import { DynamicBlock } from './Blocks/DynamicBlock'
import Hero from './Hero/Hero'
import HeroBasic from './Hero/HeroBasic'
import HeroContained from './Hero/HeroContained'
import HeroImage from './Hero/HeroImage'
import { Seo } from './Seo'
import Footer from './Shared/Footer'
import FooterMobile from './Shared/FooterMobile'
import Prefooter from './Shared/Prefooter'

export type StaticPageProps = {
  story: StoryData<
    PageStoryblok & {
      pre_footer?: StoryData<PreFooterStoryblok>
      navbar?: StoryData<NavbarStoryblok>
      footer?: StoryData<FooterStoryblok>
    }
  >
}

export const StaticPage = ({ story }: StaticPageProps): JSX.Element => {
  const [isTagsInserted, setTagsInserted] = useState(false)

  useEffect(() => {
    try {
      if (typeof window !== undefined && !isTagsInserted) {
        const generateTags = (parentType: 'head' | 'body') => {
          story.content[
            parentType === 'body' ? 'body_tags' : 'head_tags'
          ]?.forEach((tagEntry) => {
            const tag = document.createElement(tagEntry.tag_name)
            if (tag) {
              tagEntry.attributes.split('\n').forEach((attribute) => {
                const equalIndex = attribute.indexOf('=')
                const [attributeName, attributeValue]: string[] = [
                  attribute.slice(0, equalIndex),
                  attribute.slice(equalIndex + 1),
                ].map((x) => x.trimStart().trimEnd())
                if (attributeName)
                  tag.setAttribute(attributeName, attributeValue || 'true')
              })
              if (tagEntry.children) tag.innerHTML = tagEntry.children
              document?.[parentType]?.appendChild(tag)
            }
          })
        }
        generateTags('body')
        generateTags('head')
        setTagsInserted(true)
      }
    } catch (error) {
      setTagsInserted(true)
      console.error('ERROR While inserting tags: ', error)
    }
  }, [])

  return (
    <div>
      <Seo story={story} />

      {/* Basic Hero */}
      {story.content.hero &&
        story.content.hero[0]?.component === 'basic_hero' && (
          <HeroBasic
            content={story.content.hero}
            contentNav={story.content.navbar?.content}
          />
        )}
      {story.content.hero &&
        story.content.hero[0]?.component === 'basic_hero_rich_fields' && (
          <HeroBasic
            content={story.content.hero}
            contentNav={story.content.navbar?.content}
            withRichFields
          />
        )}

      {/* Hero */}
      {story.content.hero && story.content.hero[0]?.component === 'hero' && (
        <Hero
          content={story.content.hero}
          contentNav={story.content.navbar?.content}
        />
      )}
      {story.content.hero &&
        story.content.hero[0]?.component === 'hero_rich_fields' && (
          <Hero
            content={story.content.hero}
            contentNav={story.content.navbar?.content}
            withRichFields
          />
        )}

      {/* Contained Hero */}
      {story.content.hero &&
        story.content.hero[0]?.component === 'contained_hero' && (
          <HeroContained
            content={story.content.hero}
            contentNav={story.content.navbar?.content}
          />
        )}
      {story.content.hero &&
        story.content.hero[0]?.component === 'contained_hero_rich_fields' && (
          <HeroContained
            content={story.content.hero}
            contentNav={story.content.navbar?.content}
            withRichFields
          />
        )}

      {/* Image Hero */}
      {story.content.hero &&
        story.content.hero[0]?.component === 'image_hero' && (
          <HeroImage
            content={story.content.hero}
            contentNav={story.content.navbar?.content}
          />
        )}
      {story.content.hero &&
        story.content.hero[0]?.component === 'image_hero_rich_fields' && (
          <HeroImage
            content={story.content.hero}
            contentNav={story.content.navbar?.content}
            withRichFields
          />
        )}

      {story.content.body?.map((block) => {
        return <DynamicBlock key={block._uid} block={block} />
      })}
      {story.content.pre_footer && (
        <Prefooter content={story.content.pre_footer.content} />
      )}
      {story.content.footer && (
        <Footer
          content={story.content.footer.content}
          css={{ display: 'none', '@lg': { display: 'block' } }}
        />
      )}
      {story.content.footer && (
        <FooterMobile
          content={story.content.footer.content}
          css={{ display: 'block', '@lg': { display: 'none' } }}
        />
      )}
    </div>
  )
}
