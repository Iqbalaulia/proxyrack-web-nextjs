import dayjs from 'dayjs'
import React from 'react'

import { Flex, Tag, Text } from 'UI'
import { styled } from 'lib/style'

type BlogHeaderProps = {
  title: string
  author: string
  tags: string[]
  date?: string | null
}

const BlogHeader: React.FC<BlogHeaderProps> = ({
  title,
  author,
  tags,
  date,
}) => {
  return (
    <Wrapper>
      <Text variant="caps" css={{ pb: '$24', color: '$textSecondary' }}>
        {author} - {date && dayjs(date).format('MMMM D, YYYY')}
      </Text>
      <Text as="h1" variant="huge" css={{ pb: '$24' }}>
        {title}
      </Text>
      {tags && (
        <Flex css={{ flexWrap: 'wrap' }}>
          {tags.map((tag) => {
            return (
              <Tag key={tag} css={{ mr: '$12', mb: '$12' }}>
                {tag}
              </Tag>
            )
          })}
        </Flex>
      )}
    </Wrapper>
  )
}

export default BlogHeader

const Wrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  pt: '$24',

  '@md': {
    pt: '$56',
  },

  '@lg': {
    pt: '158px',
  },
})
