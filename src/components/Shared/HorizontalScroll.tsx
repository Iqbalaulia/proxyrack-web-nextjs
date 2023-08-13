import React, { useCallback, useEffect, useRef, useState } from 'react'

import { Container } from 'UI'
import { styled } from 'lib/style'

export const HorizontalScroll: React.FC = ({
  children,
  ...props
}): JSX.Element => {
  const [paddingLeft, setPaddingLeft] = useState<number>(0)
  const containerRef = useRef<HTMLDivElement | null>(null)

  const setPadding = useCallback(() => {
    if (containerRef.current) {
      const { left } = containerRef.current.getBoundingClientRect()
      setPaddingLeft(left)
    }
  }, [])

  useEffect(() => {
    window.addEventListener('resize', setPadding)
    setPadding()

    return () => window.removeEventListener('resize', setPadding)
  }, [setPadding])

  return (
    <Wrapper {...props}>
      <Container
        variant="wide"
        css={{ position: 'relative' }}
        ref={containerRef}
      />
      <Content css={{ paddingLeft }}>{children}</Content>
    </Wrapper>
  )
}

const Wrapper = styled('section', {
  overflow: 'hidden',
})

const Content = styled('div', {
  display: 'flex',
  overflowY: 'auto',
})
