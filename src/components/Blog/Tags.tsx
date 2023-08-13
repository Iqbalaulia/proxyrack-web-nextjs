import { useRouter } from 'next/router'
import React from 'react'

import { Box, Tab, Tabs, Text } from 'UI'
import { TagsType } from 'pages/blog'

type TagsProps = {
  tags?: TagsType[]
  onChangeActiveTab: (val: string) => void
}

const Tags: React.FC<TagsProps> = ({ tags, onChangeActiveTab }) => {
  const { query } = useRouter()

  //order tags with the bigger taggings_count
  const sortedTags = tags?.sort((a, b) => {
    if (a.taggings_count > b.taggings_count) return -1
    if (a.taggings_count < b.taggings_count) return 1
    return 0
  })

  // Show only 10 tags with most taggings_count
  const tagsSliced = sortedTags?.slice(0, 10)

  return (
    <Box css={{ pt: '$24', '@md': { pt: '$64' }, '@lg': { pt: '72px' } }}>
      <Tabs>
        <Tab
          isActive={query.tag === undefined}
          onClick={() => {
            onChangeActiveTab('')
          }}
        >
          <Text variant="body">All</Text>
        </Tab>
        {tagsSliced?.map((tab, index) => {
          return (
            <Tab
              isActive={tab.name === query.tag}
              onClick={() => {
                onChangeActiveTab(tab.name)
              }}
              key={index}
            >
              <Text variant="body">{tab.name}</Text>
            </Tab>
          )
        })}
      </Tabs>
    </Box>
  )
}

export default Tags
