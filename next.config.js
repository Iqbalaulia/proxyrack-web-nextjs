const per_page = 1000
const fetchRedirects = async (datasource) => {
  const cv = Date.now()
  const res = await fetch(
    `https://api.storyblok.com/v1/cdn/datasource_entries?datasource=${datasource}&cv=${cv}&token=${process.env.STORYBLOK_API_PREVIEW_KEY}&page=1&per_page=1`
  )
  const total = Math.ceil(res.headers.get('total') / per_page)

  const requests = []
  for (let i = 1; i <= total; i++) {
    requests.push(
      fetch(
        `https://api.storyblok.com/v1/cdn/datasource_entries?datasource=${datasource}&cv=${cv}&token=${process.env.STORYBLOK_API_PREVIEW_KEY}&page=${i}&per_page=${per_page}`
      )
    )
  }

  const responses = await Promise.all(requests)

  const entries = []
  for (const response of responses) {
    const { datasource_entries } = await response.json()
    entries.push(
      ...datasource_entries.map((entry) => ({
        source: '/' + entry.name.replace(/^\/+|\/+$/gim, '') + '/',
        destination: entry.value,
        permanent: true,
      }))
    )
  }

  return entries
}

const moduleExports = {
  env: {
    STORYBLOK_API_PREVIEW_KEY: process.env.STORYBLOK_API_PREVIEW_KEY,
  },
  images: {
    domains: ['a.storyblok.com', 'img2.storyblok.com'],
  },
  trailingSlash: true,
  async redirects() {
    try {
      const permanent = await fetchRedirects('permanent-redirects')
      const temporary = await fetchRedirects('temporary-redirects')

      const redirects = [...permanent, ...temporary]

      return redirects
    } catch (error) {
      throw new Error('fail to fetch redirects from CMS')
    }
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            replaceAttrValues: { '#000': 'currentColor' },
          },
        },
      ],
    })

    return config
  },
}

module.exports = moduleExports
