import { MutableRefObject, useRef } from 'react'

export const useScrollToContent = (): {
  ref: MutableRefObject<HTMLDivElement | null>
  scrollToContent: () => void
} => {
  const ref = useRef<HTMLDivElement | null>(null)

  const scrollToContent = () => {
    window.scrollTo({ top: ref.current?.offsetHeight || 0, behavior: 'smooth' })
  }

  return { ref, scrollToContent }
}
