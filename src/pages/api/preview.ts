import { NextApiRequest, NextApiResponse } from 'next'

export default async function preview(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const params = req?.url?.split('?') || []

  if (req.query.token !== process.env.STORYBLOK_API_PREVIEW_KEY) {
    return res.status(401).json({
      message: 'Invalid token',
    })
  }

  const slug = Array.isArray(req.query.slug)
    ? req.query.slug.join('/')
    : req.query.slug

  res.setPreviewData({})

  const cookieHeader = res.getHeader('Set-Cookie')

  // https://www.storyblok.com/faq/next-js-preview-iframes
  if (Array.isArray(cookieHeader)) {
    const newHeaders = cookieHeader.map((header) =>
      header.replace('SameSite=Lax', 'SameSite=None;Secure')
    )
    res.setHeader('Set-Cookie', newHeaders)
  } else if (typeof cookieHeader === 'string') {
    res.setHeader(
      'Set-Cookie',
      cookieHeader.replace('SameSite=Lax', 'SameSite=None;Secure')
    )
  }

  res.redirect(`/${slug}?${params[1]}`)
}
