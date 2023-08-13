import HTMLReactParser from 'html-react-parser'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { StoryData } from 'storyblok-js-client'

import { PreviewModeAlert } from 'components/PreviewModeAlert'
import { StaticPage, StaticPageProps } from 'components/StaticPage'
import { Storyblok, useStoryblok } from 'lib/storyblok'

const RESOLVE_RELATIONS = [
  'page.pre_footer',
  'page.footer',
  'page.navbar',
  'price_table.price',
  'comparison_tool.comparison',
  'comparison_value.company',
]

type PageProps = {
  story: StoryData
}

const CatchAllPage = (props: PageProps): JSX.Element | null => {
  const story = useStoryblok(props.story, RESOLVE_RELATIONS)
  const { query, isPreview } = useRouter()
  const isEditMode = !!query._storyblok
  switch (story.content.component) {
    case 'page':
      return (
        <>
          {isPreview && !isEditMode && <PreviewModeAlert />}
          <StaticPage story={story as StaticPageProps['story']} />
        </>
      )
    case 'html_content':
      return (
        <>
          <Head>{HTMLReactParser(story.content.head_content)}</Head>
          <div
            dangerouslySetInnerHTML={{ __html: story.content.body_content }}
          />
        </>
      )
    default:
      // TODO: throw?
      return null
  }
}

export const getStaticProps: GetStaticProps<PageProps> = async (ctx) => {
  const slug = Array.isArray(ctx.params?.slug)
    ? ctx.params?.slug.join('/')
    : ctx.params?.slug

  try {
    const { data } = await Storyblok.get(`cdn/stories/pages/${slug || ''}`, {
      resolve_links: 'url',
      resolve_relations: RESOLVE_RELATIONS.join(','),
      version: ctx.preview ? 'draft' : 'published',
    })

    return {
      props: {
        story: data.story,
      },
      revalidate: 10,
    }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res: {
    data: {
      links: Record<
        string,
        {
          slug: string
          is_folder: boolean
        }
      >
    }
  } = await Storyblok.get('cdn/links', {
    starts_with: 'pages',
  })

  const paths = Object.values(res.data.links)
    .filter((link) => !link.is_folder && !link.slug.includes('blog'))
    .map((link) => {
      const slug = link.slug.replace('pages', '')
      return {
        params: { slug: slug.split('/').filter((part) => !!part) },
      }
    })

  return {
    paths,
    fallback: 'blocking',
  }
}

export default CatchAllPage
