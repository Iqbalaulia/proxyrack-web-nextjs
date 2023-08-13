import { GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'
import { StoryData } from 'storyblok-js-client'

import { Box, Container } from 'UI'
import {
  BlogPostStoryblok,
  FooterStoryblok,
  NavbarStoryblok,
  PageStoryblok,
  PreFooterStoryblok,
} from 'common/types'
import { removeImageParagraphFromRichText } from 'common/utils/content'
import BlogHeader from 'components/Blog/BlogHeader'
import BlogRelated from 'components/Blog/BlogRelated'
import { Seo } from 'components/Seo'
import { CMSRichText } from 'components/Shared/CMSRichText'
import Footer from 'components/Shared/Footer'
import FooterMobile from 'components/Shared/FooterMobile'
import Navbar from 'components/Shared/Navbar/Navbar'
import NavbarMobile from 'components/Shared/Navbar/NavbarMobile'
import Prefooter from 'components/Shared/Prefooter'
import { Storyblok } from 'lib/storyblok'

const RESOLVE_RELATIONS = ['page.navbar', 'page.pre_footer', 'page.footer']

type BlogPostProps = {
  story: StoryData<BlogPostStoryblok>
  navbar?: NavbarStoryblok
  prefooter?: PageStoryblok & StoryData<PreFooterStoryblok>
  footer?: PageStoryblok & StoryData<FooterStoryblok>
  related?: StoryData<BlogPostStoryblok>[]
}

const BlogPost: React.FC<BlogPostProps> = ({ ...props }) => {
  const { title, author, blog_post } = props.story.content

  return (
    <>
      <Seo story={props.story} />
      <Box css={{ display: 'none', '@lg': { display: 'block' } }}>
        <Navbar content={props?.navbar?.story.content} theme="light" />
      </Box>
      <Box css={{ display: 'block', '@lg': { display: 'none' } }}>
        <NavbarMobile content={props?.navbar?.story.content} theme="light" />
      </Box>
      <Container variant="tiny">
        <BlogHeader
          title={title}
          author={author}
          tags={props.story.tag_list}
          date={props.story.first_published_at}
        />
      </Container>
      <Box css={{ pt: '$42', '@md': { pt: '$80' } }}>
        <CMSRichText document={removeImageParagraphFromRichText(blog_post)} />
      </Box>
      {props.related && <BlogRelated related={props.related} />}
      {props?.prefooter?.story.content && (
        <Prefooter content={props.prefooter.story.content} />
      )}
      {props?.footer?.story.content && (
        <Footer
          content={props?.footer?.story.content}
          css={{ display: 'none', '@lg': { display: 'block' } }}
        />
      )}
      {props?.footer?.story.content && (
        <FooterMobile
          content={props?.footer?.story.content}
          css={{ display: 'block', '@lg': { display: 'none' } }}
        />
      )}
    </>
  )
}

export default BlogPost

export const getStaticProps: GetStaticProps<BlogPostProps> = async (ctx) => {
  try {
    const { data } = await Storyblok.get(
      `cdn/stories/pages/blog/${ctx.params?.slug}`,
      {
        resolve_links: 'url',
        version: ctx.preview ? 'draft' : 'published',
      }
    )

    const { data: navbar } = await Storyblok.get(
      `cdn/stories/configuration/navbar`,
      {
        resolve_links: 'url',
        resolve_relations: RESOLVE_RELATIONS.join(','),
        version: ctx.preview ? 'draft' : 'published',
      }
    )

    const { data: prefooter } = await Storyblok.get(
      `cdn/stories/configuration/get-started`,
      {
        resolve_links: 'url',
        resolve_relations: RESOLVE_RELATIONS.join(','),
        version: ctx.preview ? 'draft' : 'published',
      }
    )

    const { data: footer } = await Storyblok.get(
      `cdn/stories/configuration/footer`,
      {
        resolve_links: 'url',
        resolve_relations: RESOLVE_RELATIONS.join(','),
        version: ctx.preview ? 'draft' : 'published',
      }
    )

    const { data: related } = await Storyblok.get(`cdn/stories`, {
      resolve_links: 'url',
      starts_with: 'pages/blog/',
      excluding_ids: data.story.id,
      resolve_relations: RESOLVE_RELATIONS.join(','),
      version: ctx.preview ? 'draft' : 'published',
      page: 1,
      per_page: 4,
      with_tag: data.story.tag_list,
    })

    return {
      props: {
        story: data.story,
        navbar,
        prefooter,
        footer,
        related: related.stories,
      },
      revalidate: 10,
    }
  } catch (error) {
    return { notFound: true }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res: {
    data: { links: Record<string, { slug: string; is_folder: boolean }> }
  } = await Storyblok.get('cdn/links', { starts_with: 'pages/blog/' })

  const paths = Object.values(res.data.links)
    .filter((link) => !link.is_folder)
    .map((link) => ({
      params: { slug: link.slug.replace('pages/blog/', '') },
    }))

  return {
    paths,
    fallback: 'blocking',
  }
}
