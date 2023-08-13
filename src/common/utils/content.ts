export type StoryblokLink =
  | {
      cached_url?: string
      linktype?: string
    }
  | {
      id?: string
      cached_url?: string
      linktype?: 'story'
      story?: {
        full_slug: string
        id: number
        name: string
        slug: string
        url: string
        uuid: string
      }
    }
  | {
      url?: string
      cached_url?: string
      linktype?: 'asset' | 'url'
    }
  | {
      email?: string
      linktype?: 'email'
    }

export const removePagesPrefix = (slug: string): string => {
  return slug.replace(/^pages\//g, '')
}

export const parseStoryblokLink = (
  link?: StoryblokLink
): { url: string; type: 'internal' | 'external' | 'email' } | null => {
  if (!link) return null

  switch (link.linktype) {
    case 'story': {
      if ('story' in link && !!link.story) {
        return {
          url: `/${removePagesPrefix(link.story.full_slug)}`,
          type: 'internal',
        }
      }

      if (link.cached_url) {
        return {
          url: `/${removePagesPrefix(link.cached_url)}`,
          type: 'internal',
        }
      }

      return null
    }

    case 'asset':
    case 'url':
      return link.cached_url ? { url: link.cached_url, type: 'external' } : null

    case 'email':
      return 'email' in link && !!link.email
        ? { url: `mailto:${link.email}`, type: 'email' }
        : null

    default:
      return null
  }
}

export const getStoryblokImageSize = (
  src: string
): { width: string; height: string } => {
  const width = src.split('/')[5].split('x')[0]
  const height = src.split('/')[5].split('x')[1]

  return { width, height }
}

export const storyblokImageService = (src: string, option?: string): string => {
  if (!option || !src) return src

  const imageService = 'https://img2.storyblok.com/'
  const path = src.replace('https://a.storyblok.com', '')
  return imageService + option + path
}

export const fixMissingTrailingSlashOfUrl = (url: string): string => {
  if (url.endsWith('/') || (url.includes('?') && url.includes('='))) {
    return url
  }
  return url + '/'
}

/**
 * Use storyblok image service to transform the image as per
 * https://www.storyblok.com/docs/image-service
 *
 * Examples: '500x500', '600x130/smart', 'filters:quality(50)'
 */
type ImageAttributes = {
  src: string
  alt: string
  width: string
  height: string
}
export const getImageAttributes = (
  image: { filename: string; alt?: string | null; name?: string | null },
  transformOptions?: string
): ImageAttributes => {
  const width = image.filename.split('/')[5].split('x')[0]
  const height = image.filename.split('/')[5].split('x')[1]
  const alt = image.alt || image.name || ''

  return {
    src: storyblokImageService(image.filename, transformOptions),
    alt,
    width,
    height,
  }
}

type Document = {
  type: 'doc'
  content: RichTextBlock[]
}

type RichTextBlock = {
  type: string
  content?: RichTextBlock[]
  text?: string
  attrs?: unknown
}

export const removeImageParagraphFromRichText = (
  document: Document
): Document => {
  return {
    type: 'doc',
    content: document.content?.map((block) => {
      if (
        block.type === 'paragraph' &&
        block.content &&
        block.content[0] &&
        block.content[0].type === 'image'
      ) {
        return block.content[0]
      }

      return block
    }),
  }
}
