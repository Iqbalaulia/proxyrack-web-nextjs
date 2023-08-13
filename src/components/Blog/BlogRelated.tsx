import dayjs from 'dayjs'
import NextLink from 'next/link'
import React from 'react'
import { StoryData } from 'storyblok-js-client'

import { Container, Flex, Link, Tag, Text } from 'UI'
import { BLOG_READ_ARTICLE } from 'common/constants'
import { BlogPostStoryblok } from 'common/types'
import { Editable } from 'components/Blocks/Editable'
import { styled } from 'lib/style'

type BlogRelatedProps = {
  related?: StoryData<BlogPostStoryblok>[]
}

const BlogRelated: React.FC<BlogRelatedProps> = ({ related }) => {
  return (
    <Container>
      <Wrapper>
        {related?.map((post) => {
          const tagList =
            post.tag_list.length > 3
              ? [...post.tag_list?.slice(0, 3), `+ ${post.tag_list.length - 3}`]
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
                          dayjs(post.first_published_at).format('MMMM D, YYYY')}
                      </Text>
                    </Flex>
                  )}
                  {post.content.title && (
                    <Text variant="big" weight="bold" css={{ pb: '$16' }}>
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
      </Wrapper>
    </Container>
  )
}

export default BlogRelated

const Wrapper = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(1, 1fr)',
  columnGap: '$32',
  rowGap: '$40',

  borderTop: '1px solid $gray200',

  pt: '$24',
  pb: '$24',
  mt: '$24',

  '@md': {
    pt: '$56',
    pb: '$40',
    mt: '$56',

    rowGap: '$64',
    gridTemplateColumns: 'repeat(2, 1fr)',
  },

  '@lg': {
    pt: '$56',
    pb: '$40',
    mt: '$80',

    gridTemplateColumns: 'repeat(4, 1fr)',
  },
})

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
