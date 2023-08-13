import { GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { StoryData } from 'storyblok-js-client'

import { Box, Container, Text } from 'UI'
import {
  BLOG_ERROR,
  DEFAULT_BLOG_SEO_OG_TITLE,
  POST_PER_PAGE,
  PROXYRACK,
  SITE_ORIGIN,
} from 'common/constants'
import {
  BlogPostStoryblok,
  FooterStoryblok,
  NavbarStoryblok,
  PageStoryblok,
  PreFooterStoryblok,
} from 'common/types'
import { Pagination } from 'components/Blog/Pagination'
import Posts from 'components/Blog/Posts'
import Tags from 'components/Blog/Tags'
import Footer from 'components/Shared/Footer'
import FooterMobile from 'components/Shared/FooterMobile'
import Navbar from 'components/Shared/Navbar/Navbar'
import NavbarMobile from 'components/Shared/Navbar/NavbarMobile'
import Prefooter from 'components/Shared/Prefooter'
import { Storyblok } from 'lib/storyblok'

const RESOLVE_RELATIONS = ['page.navbar', 'page.pre_footer', 'page.footer']

export type TagsType = {
  name: string
  taggings_count: number
}

type BlogIndexPageProps = {
  navbar?: NavbarStoryblok
  tags?: TagsType[]
  posts: StoryData<BlogPostStoryblok>[]
  total: number
  prefooter?: PageStoryblok & StoryData<PreFooterStoryblok>
  footer?: PageStoryblok & StoryData<FooterStoryblok>
}

const BlogIndexPage = (props: BlogIndexPageProps): JSX.Element => {
  const { isPreview, push, query } = useRouter()

  const [posts, setPosts] = useState(props.posts)
  const [total, setTotal] = useState(props.total)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const totalPages = Math.ceil(total / POST_PER_PAGE)

  const fetchPosts = useCallback(async () => {
    setLoading(true)
    setError(false)

    try {
      const args = {
        version: isPreview ? 'draft' : 'published',
        starts_with: 'pages/blog/',
        with_tag: query.tag,
        sort_by: 'first_published_at:desc',
        page: query.page,
        per_page: POST_PER_PAGE,
      }

      const res = await Storyblok.get('cdn/stories', args)
      setPosts(res.data.stories)
      setTotal(res.headers.total)
    } catch {
      setError(true)
    }

    setLoading(false)
  }, [isPreview, query.page, query.tag])

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  const getPagePath = (page: number) => {
    const base = query.tag ? `/blog/tag/${query.tag}` : '/blog'
    return page === 1 ? base : `${base}/page/${page}`
  }

  const pageSEO = query.page ? `Page ${query.page}` : ''

  return (
    <>
      <NextSeo
        title={`${DEFAULT_BLOG_SEO_OG_TITLE} ${pageSEO} - ${PROXYRACK}`}
        canonical={
          query.tag
            ? `${SITE_ORIGIN}blog/tag/${query.tag}/`
            : `${SITE_ORIGIN}blog/`
        }
      />
      <Box css={{ display: 'none', '@lg': { display: 'block' } }}>
        <Navbar content={props?.navbar?.story.content} theme="light" />
      </Box>
      <Box css={{ display: 'block', '@lg': { display: 'none' } }}>
        <NavbarMobile content={props?.navbar?.story.content} theme="light" />
      </Box>
      <Container>
        <Text
          variant="huge"
          css={{
            pt: '$16',
            '@md': { pt: '$56' },
            '@lg': { pt: '160px' },
          }}
        >
          Blog
        </Text>
        <Tags
          tags={props.tags}
          onChangeActiveTab={(tag) => {
            push(tag ? `/blog/tag/${tag}` : '/blog')
          }}
        />
        {error && !loading ? (
          <Text variant="small" css={{ py: '$32', color: '$gray700' }}>
            {BLOG_ERROR}
          </Text>
        ) : (
          <Posts posts={posts} loading={loading} />
        )}
        <Pagination
          currentPage={query.page}
          totalPages={totalPages}
          getPagePath={getPagePath}
          css={{ pb: '$32', pt: '$96', justifyContent: 'center' }}
        />
      </Container>
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

export default BlogIndexPage

export const getStaticProps: GetStaticProps<BlogIndexPageProps> = async (
  ctx
) => {
  const {
    data: { tags },
  } = await Storyblok.get(`cdn/tags`, {
    starts_with: 'pages/blog/',
    version: ctx.preview ? 'draft' : 'published',
  })

  const args = {
    version: ctx.preview ? 'draft' : 'published',
    starts_with: 'pages/blog/',
    sort_by: 'first_published_at:desc',
    page: 1,
    cv: Date.now(),
    per_page: POST_PER_PAGE,
  }

  const res = await Storyblok.get('cdn/stories', args)

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

  // If there are no posts, it should be a 404
  if (res.data.stories.length === 0) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      tags,
      posts: res.data.stories,
      navbar,
      total: res.total,
      prefooter,
      footer,
    },
  }
}
