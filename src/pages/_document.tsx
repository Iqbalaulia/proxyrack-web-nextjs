import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import React from 'react'

import { getCssString } from 'lib/style'

const GTM_ID = process.env.GTM_ID || ''

export default class Document extends NextDocument {
  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />

          {/* Google Tag Manager */}
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${GTM_ID}');`,
            }}
          />
          {/* End Google Tag Manager */}
          {/* Google Tag Manager (noscript) */}
          <noscript
            dangerouslySetInnerHTML={{
              __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}"
                height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
            }}
          />
          {/* End Google Tag Manager (noscript) */}
          {/*  TrustBox script  */}
          <script
            type="text/javascript"
            src="//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
            async
          />
          {/* End TrustBox script  */}
          <style
            id="stitches"
            dangerouslySetInnerHTML={{ __html: getCssString() }}
          />
          <link
            rel="preload"
            href="/fonts/ABCWhyte-Book.woff"
            as="font"
            type="font/woff"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/ABCWhyte-Book.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/ABCWhyte-Medium.woff"
            as="font"
            type="font/woff"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/ABCWhyte-Medium.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <style
            dangerouslySetInnerHTML={{
              __html: `
                @font-face {
                font-family: 'ABC Whyte';
                font-weight: 400;
                font-display: swap;
                src: url(/fonts/ABCWhyte-Book.woff2) format('woff2'), url(/fonts/ABCWhyte-Book.woff) format('woff');
                }
                @font-face {
                font-family: 'ABC Whyte';
                font-weight: 600;
                font-display: swap;
                src: url(/fonts/ABCWhyte-Medium.woff2) format('woff2'), url(/fonts/ABCWhyte-Medium.woff) format('woff');
                }
                `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
