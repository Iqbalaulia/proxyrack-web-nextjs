import NextImage from 'next/image'
import NextLink from 'next/link'
import React, { ReactNode } from 'react'
import {
  render,
  MARK_LINK,
  NODE_HEADING,
  NODE_IMAGE,
  NODE_QUOTE,
  NODE_UL,
  NODE_OL,
  MARK_STYLED,
} from 'storyblok-rich-text-react-renderer'

import { Link, Text, Box, Container } from 'UI'
import { ConversionCardVerticalStoryblok } from 'common/types'
import {
  getStoryblokImageSize,
  storyblokImageService,
} from 'common/utils/content'
import { ConversionCardVertical } from 'components/Blocks/ConversionCardVertical'
import { styled } from 'lib/style'

type RichText = React.ComponentProps<typeof RichText> & {
  type: 'doc'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any[]
}

type CMSRichTextProps = {
  document: any
  nodeResolvers?: Record<string, ReactNode>
  markResolvers?: Record<string, ReactNode>
  containerVariant?: React.ComponentProps<typeof Container>['variant']
  css?: { [k: string]: any }
  noContainer?: boolean
}

const defaultNodeResolvers = {
  [NODE_QUOTE]: function RichTextBlockquote(children: ReactNode) {
    return (
      <Box
        as="blockquote"
        css={{
          m: '$0',

          fontSize: '$md',
          lineHeight: '$normal',
          letterSpacing: '$lg',

          color: '$brand500',

          '@md': {
            p: '$24',
            mx: '-$24',
            fontSize: '$lg',
            lineHeight: '$small',
            letterSpacing: '$xlg',
          },
        }}
      >
        {children}
      </Box>
    )
  },
  [NODE_IMAGE]: function RichTextImage(
    _children: ReactNode,
    attrs: { alt: string; src: string; title: string }
  ) {
    return (
      <Container variant="tiny">
        <Box
          as="figure"
          css={{
            display: 'block',
            m: '$0',
            mb: '$24',
            mx: '-20px',
            '@md': { mx: '-130px', width: 'auto' },
          }}
        >
          <NextImage
            src={
              /.gif$/.test(attrs.src)
                ? attrs.src
                : storyblokImageService(attrs.src, '1000x0')
            }
            alt={attrs.alt}
            width={getStoryblokImageSize(attrs.src).width}
            height={getStoryblokImageSize(attrs.src).height}
            layout="responsive"
          />
          {attrs.title && (
            <Text
              as="figcaption"
              variant="small"
              css={{
                color: '$gray400',
                textAlign: 'center',
                mt: '$16',
              }}
            >
              {attrs.title}
            </Text>
          )}
        </Box>
      </Container>
    )
  },
  [NODE_HEADING]: function RichTextHeading(
    children: string,
    { level }: { level: 1 | 2 | 3 | 4 | 5 | 6 }
  ) {
    const variant = {
      [1]: 'huge',
      [2]: 'title',
      [3]: 'big',
      [4]: 'body',
      [5]: 'small',
      [6]: 'caps',
    } as const

    return (
      <Text as={`h${level}`} variant={variant[level]} weight="bold">
        {children}
      </Text>
    )
  },
  [NODE_OL]: function RichTextOl(children: ReactNode) {
    return (
      <List as="ol" variant="ol">
        {children}
      </List>
    )
  },
  [NODE_UL]: function RichTextUl(children: ReactNode) {
    return <List variant="ul">{children}</List>
  },
}

const defaultMarkResolvers = {
  [MARK_LINK]: function RichTextLink(
    children: ReactNode,
    props: {
      href: string
      uuid: string | null
      target: '_self' | '_blank' | null
      linktype: 'url' | 'story' | 'asset' | 'email' | null
      story?: { url: string }
    }
  ) {
    const { href, target, linktype } = props

    if (linktype === 'email') {
      return <Link href={`mailto:${href}`}>{children}</Link>
    }

    if (href.match(/^(https?:)?\/\//)) {
      return (
        <Link
          variant="default"
          href={href}
          target={target || '_blank'}
          rel="noopener noreferrer"
          css={{ textDecoration: 'underline' }}
        >
          {children}
        </Link>
      )
    }

    return (
      <NextLink
        href={`/${props?.story?.url || href.replace(/^\//g, '')}`}
        passHref
      >
        <Link>{children}</Link>
      </NextLink>
    )
  },
  // eslint-disable-next-line react/display-name
  [MARK_STYLED]: (children: any, attrs: any) => {
    const csss = (attrs?.['class'] || '').trim().split('_')
    delete attrs['class']
    const newCss = csss.length ? { [csss[0]]: csss[1] } : {}
    return (
      <Span css={newCss} {...attrs}>
        {children}
      </Span>
    )
  },
}

const Span = styled('span', {})

export const CMSRichText = ({
  document,
  nodeResolvers = {},
  markResolvers = {},
  containerVariant = 'tiny',
  css = {},
  noContainer = false,
}: CMSRichTextProps): JSX.Element => {
  const NewContainer = noContainer ? 'div' : Container
  return (
    <NewContainer variant={containerVariant}>
      <RichText css={css}>
        {render(document, {
          nodeResolvers: {
            ...defaultNodeResolvers,
            ...nodeResolvers,
          },
          markResolvers: {
            ...defaultMarkResolvers,
            ...markResolvers,
          },
          defaultBlokResolver: function RichTextBlokResolver(
            component: string,
            block: ConversionCardVerticalStoryblok
          ) {
            if (component === 'conversion_card_vertical') {
              return (
                <Box
                  css={{
                    mx: '-20px',
                    '@lg': { mx: '-140px' },
                  }}
                >
                  <ConversionCardVertical block={block} />
                </Box>
              )
            }
            return null
          },
        })}
      </RichText>
    </NewContainer>
  )
}

const RichText = styled('div', {
  fontSize: '$md',
  lineHeight: '$normal',
  letterSpacing: '$lg',

  blockquote: {
    '& > p': {
      fontWeight: '$bold',
      mb: '$28',
      mt: '$28',
    },
  },

  b: {
    fontWeight: '$bold',
  },

  pre: {
    mb: '$24',
  },

  '& > *': {
    mb: '$24',
  },

  code: {
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
  },

  '& > p, & > ul, & > ol, & > blockquote': {
    wordBreak: 'break-word',
    '&:not(:last-child)': {
      mb: '$28',
    },
  },

  '& > h1, & > h2': {
    '&:not(:first-child)': {
      mt: '$40',
    },
    mb: '$24',
    fontWeight: '$bold',
  },

  '& > h3': {
    '&:not(:first-child)': {
      mt: '$48',
    },
    mb: '$32',
    fontWeight: '$bold',
  },

  '& > h4, & > h5, & > h6': {
    '&:not(:first-child)': {
      mt: '$32',
    },
    mb: '$4',
    fontWeight: '$bold',
  },
})

const List = styled('ul', {
  listStyle: 'none',
  m: '$0',

  li: {
    position: 'relative',
    pl: '$24',
  },

  'li::before': {
    fontSize: '$xs',
    position: 'absolute',
    color: '$gray900',
    left: '0',
    top: '3.2px',
    display: 'inline-block',
  },

  variants: {
    variant: {
      ul: {
        'li::before': {
          content: '"•"',
        },
      },
      ol: {
        counterReset: 'li',

        li: {
          counterIncrement: 'li',
        },
        'li::before': {
          content: 'counter(li)',
        },
        'li > & li::before': {
          content: 'counter(li, lower-alpha)',
        },
      },
    },
  },
})
