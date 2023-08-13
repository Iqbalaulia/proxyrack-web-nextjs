import dayjs from 'dayjs'
import { motion } from 'framer-motion'
import NextLink from 'next/link'
import React from 'react'
import { StoryData } from 'storyblok-js-client'

import { Box, Flex, Link, Tag, Text } from 'UI'
import { BLOG_READ_ARTICLE } from 'common/constants'
import { BlogPostStoryblok } from 'common/types'
import { Editable } from 'components/Blocks/Editable'
import { CardLoader } from 'components/Shared/CardLoader'
import { useWindowSize } from 'components/utils'
import { styled } from 'lib/style'

type PostsProps = {
  posts: StoryData<BlogPostStoryblok>[]
  loading: boolean
}

const Posts: React.FC<PostsProps> = ({ posts, loading }) => {
  const bigPosts = posts.slice(0, 2)
  const smallPosts = posts.slice(2)

  const { width } = useWindowSize()

  return (
    <Box css={{ pt: '$32' }}>
      {loading ? (
        <WrapperLoader>
          {[...new Array(2)].map((_, index) => {
            return <CardLoader key={index} />
          })}
        </WrapperLoader>
      ) : (
        <Wrapper
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {bigPosts.map((post) => {
            const tagList =
              post.tag_list.length > 3
                ? [
                    ...post.tag_list?.slice(0, 3),
                    `+ ${post.tag_list.length - 3}`,
                  ]
                : post.tag_list
            return (
              <Editable key={post.content._uid} block={post.content}>
                <NextLink href={`/blog/${post.slug}`}>
                  <Flex css={{ flexDirection: 'column', cursor: 'pointer' }}>
                    {post.content.cover && post.content.cover.filename && (
                      <ImageWrapper
                        variant="big"
                        style={{
                          backgroundImage: `url(${post.content.cover.filename})`,
                        }}
                      />
                    )}
                    {post.content.author && (
                      <Flex>
                        <Text
                          variant="caps"
                          css={{
                            pt: '$20',
                            pb: '$12',
                            color: '$textSecondary',
                          }}
                        >
                          {post.content.author} -{' '}
                          {post.first_published_at &&
                            dayjs(post.first_published_at).format(
                              'MMMM D, YYYY'
                            )}
                        </Text>
                      </Flex>
                    )}
                    {post.content.title && (
                      <Text variant="title" css={{ pb: '$16' }}>
                        {post.content.title}
                      </Text>
                    )}
                    {tagList && (
                      <Flex
                        css={{
                          pb: '$8',
                          alignItems: 'center',
                          flexWrap: 'wrap',
                        }}
                      >
                        {tagList.map((tag) => {
                          return (
                            <Tag key={tag} css={{ mr: '$8', mb: '$8' }}>
                              {tag}
                            </Tag>
                          )
                        })}
                      </Flex>
                    )}
                    <Flex>
                      <Link
                        variant="icon"
                        icon="arrow-right"
                        css={{ color: '$textSecondary' }}
                      >
                        {BLOG_READ_ARTICLE}
                      </Link>
                    </Flex>
                  </Flex>
                </NextLink>
              </Editable>
            )
          })}
        </Wrapper>
      )}

      {loading ? (
        <WrapperSmallLoader>
          {[...new Array(4)].map((_, index) => {
            return <CardLoader key={index} />
          })}
        </WrapperSmallLoader>
      ) : (
        <WrapperSmall
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {smallPosts.map((post) => {
            const tagList =
              post.tag_list.length > 3
                ? [
                    ...post.tag_list?.slice(0, 3),
                    `+ ${post.tag_list.length - 3}`,
                  ]
                : post.tag_list
            return (
              <Editable key={post.content._uid} block={post.content}>
                <NextLink href={`/blog/${post.slug}`}>
                  <Flex css={{ flexDirection: 'column', cursor: 'pointer' }}>
                    {post.content.cover && post.content.cover.filename && (
                      <ImageWrapper
                        variant="small"
                        style={{
                          backgroundImage: `url(${post.content.cover.filename})`,
                        }}
                      />
                    )}
                    {post.content.author && (
                      <Flex>
                        <Text
                          variant="caps"
                          css={{ pt: '$20', pb: '$12', color: '$gray400' }}
                        >
                          {post.content.author} -{' '}
                          {post.first_published_at &&
                            dayjs(post.first_published_at).format(
                              'MMMM D, YYYY'
                            )}
                        </Text>
                      </Flex>
                    )}
                    {post.content.title && (
                      <Text
                        variant={width <= 768 ? 'title' : 'big'}
                        weight="bold"
                        css={{ pb: '$16' }}
                      >
                        {post.content.title}
                      </Text>
                    )}
                    {tagList && (
                      <Flex
                        css={{
                          pb: '$8',
                          alignItems: 'center',
                          flexWrap: 'wrap',
                        }}
                      >
                        {tagList.map((tag) => {
                          return (
                            <Tag key={tag} css={{ mr: '$8', mb: '$8' }}>
                              {tag}
                            </Tag>
                          )
                        })}
                      </Flex>
                    )}

                    <Link
                      variant="icon"
                      icon="arrow-right"
                      css={{
                        color: '$textSecondary',
                        justifyContent: 'flex-start',
                      }}
                    >
                      {BLOG_READ_ARTICLE}
                    </Link>
                  </Flex>
                </NextLink>
              </Editable>
            )
          })}
        </WrapperSmall>
      )}
    </Box>
  )
}

export default Posts

const Wrapper = styled(motion.div, {
  display: 'grid',
  gridTemplateColumns: 'repeat(1, 1fr)',
  columnGap: '$32',
  rowGap: '$40',

  '@md': {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
})

const WrapperLoader = styled(Wrapper, {})

const WrapperSmall = styled(motion.div, {
  display: 'grid',
  gridTemplateColumns: 'repeat(1, 1fr)',
  columnGap: '$32',
  rowGap: '$40',

  pt: '$40',

  '@md': {
    rowGap: '$64',
    gridTemplateColumns: 'repeat(2, 1fr)',

    pt: '$64',
  },

  '@lg': { gridTemplateColumns: 'repeat(4, 1fr)' },
})

const WrapperSmallLoader = styled(WrapperSmall, {})

const ImageWrapper = styled('div', {
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',

  position: 'relative',
  height: '260px',

  '@md': {
    height: '328px',
  },

  '@lg': {
    height: '392px',
  },

  variants: {
    variant: {
      big: {},
      small: {
        '@lg': {
          height: '192px',
        },
      },
    },
  },
})
