import { GetStaticProps } from 'next'
import NextLink from 'next/link'
import React from 'react'

import { Box, Button, Container, Text } from 'UI'
import {
  PAGE_404_BUTTON,
  PAGE_404_SUBTITLE,
  PAGE_404_TITLE,
} from 'common/constants'
import { NavbarStoryblok } from 'common/types'
import Navbar from 'components/Shared/Navbar/Navbar'
import NavbarMobile from 'components/Shared/Navbar/NavbarMobile'
import { Storyblok } from 'lib/storyblok'

const RESOLVE_RELATIONS = ['page.navbar']

type Page404Props = {
  navbar?: NavbarStoryblok
}

const Page404: React.FC<Page404Props> = ({ ...props }) => {
  return (
    <>
      <Box css={{ display: 'none', '@lg': { display: 'block' } }}>
        <Navbar content={props?.navbar?.story.content} theme="light" />
      </Box>
      <Box css={{ display: 'block', '@lg': { display: 'none' } }}>
        <NavbarMobile content={props?.navbar?.story.content} theme="light" />
      </Box>
      <Container css={{ pt: '300px' }}>
        <Box css={{ maxWidth: '650px' }}>
          <Text variant="huge">{PAGE_404_TITLE}</Text>
          <Text variant="big" css={{ pt: '$20' }}>
            {PAGE_404_SUBTITLE}
          </Text>
          <NextLink href="/" passHref>
            <Button variant="primary" css={{ mt: '$20' }}>
              {PAGE_404_BUTTON}
            </Button>
          </NextLink>
        </Box>
      </Container>
    </>
  )
}

export default Page404

export const getStaticProps: GetStaticProps<Page404Props> = async (ctx) => {
  try {
    const { data: navbar } = await Storyblok.get(
      `cdn/stories/configuration/navbar`,
      {
        resolve_links: 'url',
        resolve_relations: RESOLVE_RELATIONS.join(','),
        version: ctx.preview ? 'draft' : 'published',
      }
    )

    return {
      props: {
        navbar,
      },
      revalidate: 10,
    }
  } catch (error) {
    return { notFound: true }
  }
}
