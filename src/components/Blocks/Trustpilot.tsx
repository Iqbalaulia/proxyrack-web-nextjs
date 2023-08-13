// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useEffect, useRef } from 'react'

import { Container } from 'UI'
import { TrustpilotStoryblok } from 'common/types'
import { styled } from 'lib/style'

type Trustpilot = {
  block: TrustpilotStoryblok
}

export const Trustpilot: React.FC<Trustpilot> = ({ _block, ...props }) => {
  const ref = useRef(null)
  useEffect(() => {
    if (window.Trustpilot) {
      window.Trustpilot.loadFromElement(ref.current, true)
    }
  }, [])

  return (
    <Wrapper {...props}>
      <Container>
        <div
          ref={ref}
          className="trustpilot-widget"
          data-locale="en-US"
          data-template-id="53aa8912dec7e10d38f59f36"
          data-businessunit-id="5c117efab8b17900012e833a"
          data-style-height="140px"
          data-style-width="100%"
          data-theme="light"
          data-stars="5"
          data-review-languages="en"
        >
          <a
            href="https://www.trustpilot.com/review/www.proxyrack.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            {' '}
            Trustpilot
          </a>
        </div>
      </Container>
    </Wrapper>
  )
}

const Wrapper = styled('section', {
  my: '$48',
})
