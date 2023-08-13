import { GetStaticPaths } from 'next'

import { POST_PER_PAGE } from 'common/constants'
import { Storyblok } from 'lib/storyblok'
import BlogPostPage, { getStaticProps } from 'pages/blog'

export default BlogPostPage

const getStaticPaths: GetStaticPaths = async () => {
  const {
    headers: { total },
  } = await Storyblok.get('cdn/stories', {
    starts_with: 'pages/blog/',
  })
  const pages = Math.ceil(total / POST_PER_PAGE)

  const paths = new Array(pages)
    .fill('')
    .map((_, i) => ({ params: { page: (i + 1).toString() } }))
    // we don't need the first page
    .filter((path) => path.params.page !== '1')

  return {
    fallback: 'blocking',
    paths,
  }
}

export { getStaticProps, getStaticPaths }
