import { GetStaticPaths } from 'next'

import { Storyblok } from 'lib/storyblok'
import BlogPostPage, { getStaticProps } from 'pages/blog'

export default BlogPostPage

const getStaticPaths: GetStaticPaths = async () => {
  const {
    data: { tags },
  } = await Storyblok.get('cdn/tags', {
    starts_with: 'pages/blog/',
  })

  const paths = tags.map((tag: { name: string }) => ({
    params: { tag: tag.name },
  }))

  return {
    fallback: 'blocking',
    paths,
  }
}

export { getStaticProps, getStaticPaths }
