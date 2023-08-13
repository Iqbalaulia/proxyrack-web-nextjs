import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/dist/client/router'
import { useState, useEffect } from 'react'

import { Box, Button, Card, Flex, Link, Text, Theme } from 'UI'
import {
  LIVE_VERSION,
  PREVIEW_COPIED,
  PREVIEW_COPY,
  PREVIEW_MESSAGE,
  PREVIEW_MESSAGE_SECOND,
  PREVIEW_MODE,
} from 'common/constants'
import { copyStringToClipboard } from 'common/utils/clipboard'

export const PreviewModeAlert = (): JSX.Element => {
  const [expanded, setExpanded] = useState(false)
  const [copied, setCopied] = useState(false)
  const [path, setPath] = useState<string | undefined>()
  const [origin, setOrigin] = useState<string | undefined>()
  const router = useRouter()

  useEffect(
    function updatePathOnRouteChange() {
      const handleRouteChange = () => {
        setPath(window.location.pathname)
        setOrigin(window.location.origin)
      }

      handleRouteChange()
      router.events.on('routeChangeComplete', handleRouteChange)

      return () => {
        router.events.off('routeChangeComplete', handleRouteChange)
      }
    },
    [router.events]
  )

  const fullPath = path
    ? `${origin}/api/preview?token=${
        process.env.STORYBLOK_API_PREVIEW_KEY
      }&slug=${path.slice(1)}/`
    : '/'

  const handleCopy = () => {
    copyStringToClipboard(fullPath)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return (
    <Theme theme="dark">
      <Card
        drag
        onMouseEnter={() => {
          setExpanded(true)
        }}
        onMouseLeave={() => {
          setExpanded(false)
        }}
        as={motion.div}
        css={{
          width: '17rem',
          position: 'fixed',
          bottom: '$16',
          left: '$16',
          cursor: 'move',
          zIndex: 999999999999,
          overflow: 'hidden',
          p: '$16',
        }}
      >
        <Flex css={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <Text variant="body">{PREVIEW_MODE}</Text>
          {expanded ? (
            <Link
              href={
                path ? `/api/exit-preview?backTo=${path}` : '/api/exit-preview'
              }
            >
              {LIVE_VERSION}
            </Link>
          ) : (
            <Text>+</Text>
          )}
        </Flex>
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
            >
              <Box css={{ py: '$16' }}>
                <Text variant="body">{PREVIEW_MESSAGE}</Text>
                <Text variant="body">{PREVIEW_MESSAGE_SECOND}</Text>
              </Box>

              <Button onClick={handleCopy}>
                {copied ? PREVIEW_COPIED : PREVIEW_COPY}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </Theme>
  )
}
