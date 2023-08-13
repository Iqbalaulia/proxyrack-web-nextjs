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
import {
  getStoryblokImageSize,
  storyblokImageService,
} from 'common/utils/content'
import { DynamicBlock } from 'components/Blocks/DynamicBlock'
import { styled } from 'lib/style'

type RichText = React.ComponentProps<typeof RichText> & {
  type: 'doc'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any[]
}

type CMSRichTextFieldProps = {
  document: RichText
  nodeResolvers?: Record<string, ReactNode>
  markResolvers?: Record<string, ReactNode>
  css?: { [k: string]: any }
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
    return <ol>{children}</ol>
  },
  [NODE_UL]: function RichTextUl(children: ReactNode) {
    return <ul>{children}</ul>
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
          variant="underline"
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

export const CMSRichTextField = ({
  document,
  nodeResolvers = {},
  markResolvers = {},
  css = {},
}: CMSRichTextFieldProps): JSX.Element => {
  return (
    <RichText css={{ ...css }}>
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
          block: any
        ) {
          return <DynamicBlock block={{ ...block, component }} />
        },
      })}
    </RichText>
  )
}

const RichText = styled('div', {
  fontSize: '$md',
  lineHeight: '$normal',
  letterSpacing: '$lg',

  blockquote: {
    '& > p': {
      fontWeight: '$bold',
    },
  },

  b: {
    fontWeight: '$bold',
  },

  code: {
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
  },

  '& > h1, & > h2, & > h3, & > h4, & > h5, & > h6': {
    fontWeight: '$bold',
  },
})
