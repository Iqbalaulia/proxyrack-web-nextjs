import { NextApiRequest, NextApiResponse } from 'next'

export default async function exit(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  res.clearPreviewData()

  res.writeHead(307, { Location: req.query.backTo || '/' })
  res.end()
}
