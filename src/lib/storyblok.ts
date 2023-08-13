import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import StoryblokClient, { StoryData } from 'storyblok-js-client'

export const Storyblok = new StoryblokClient({
  accessToken: process.env.STORYBLOK_API_PREVIEW_KEY,
  cache: {
    clear: 'auto',
    type: 'memory',
  },
})

export const useStoryblok = <T extends StoryData = StoryData>(
  originalStory: T,
  resolveRelations?: string[]
): T => {
  const { isPreview } = useRouter()
  const [story, setStory] = useState(originalStory)

  const initListeners = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { StoryblokBridge } = window as any

    if (typeof StoryblokBridge !== 'undefined') {
      const storyblokInstance = new StoryblokBridge({
        resolveRelations,
      })

      storyblokInstance.on(['change', 'published'], () =>
        window.location.reload()
      )

      storyblokInstance.on('input', (event: { action: 'input'; story: T }) => {
        if (event.story.uuid === originalStory.uuid) {
          setStory(event.story)
        }
      })
    }
  }, [originalStory, resolveRelations])

  const addBridge = useCallback((callback: () => void) => {
    if (!document.getElementById('storyblokBridge')) {
      const script = document.createElement('script')
      script.src = '//app.storyblok.com/f/storyblok-v2-latest.js'
      script.id = 'storyblokBridge'
      document.body.appendChild(script)
      script.onload = () => {
        // once the scrip is loaded, init the event listeners
        callback()
      }
    } else {
      callback()
    }
  }, [])

  useEffect(() => {
    if (isPreview) {
      addBridge(initListeners)
    }
  }, [isPreview, addBridge, initListeners])

  useEffect(() => {
    setStory(originalStory)
  }, [originalStory])

  return story
}
