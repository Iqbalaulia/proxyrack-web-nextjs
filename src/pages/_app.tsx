import { DefaultSeo } from 'next-seo'
import type { AppProps } from 'next/app'

import { Global } from 'UI'
import {
  DEFAULT_SEO_DESCRIPTION,
  DEFAULT_SEO_OG_DESCRIPTION,
  DEFAULT_SEO_OG_TITLE,
  DEFAULT_SEO_TITLE,
  SITE_ORIGIN,
} from 'common/constants'
import { NProgress } from 'components/NProgress'

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <>
      <NProgress />
      <Global />
      {pageProps?.story?.content?.component !== 'html_content' && (
        <DefaultSeo
          title={DEFAULT_SEO_TITLE}
          description={DEFAULT_SEO_DESCRIPTION}
          canonical={SITE_ORIGIN}
          openGraph={{
            type: 'website',
            url: SITE_ORIGIN,
            title: DEFAULT_SEO_OG_TITLE,
            description: DEFAULT_SEO_OG_DESCRIPTION,
            images: [{ url: `/og.png` }],
          }}
          languageAlternates={[
            {
              hrefLang: 'x-default',
              href: SITE_ORIGIN,
            },
          ]}
        />
      )}
      <Component {...pageProps} />
    </>
  )
}

export default App
