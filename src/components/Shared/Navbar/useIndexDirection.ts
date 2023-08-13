import { useEffect, useRef } from 'react'

export const useIndexDirection = (currentIndex: number | null): number => {
  const prevIndex = useRef<number | null>(null)
  useEffect(
    function syncIndex() {
      if (typeof currentIndex === 'number') {
        prevIndex.current = currentIndex
      }
    },
    [currentIndex]
  )

  let direction = 0
  if ((prevIndex?.current ?? 0) > (currentIndex ?? 0)) {
    direction = -1
  } else if ((prevIndex?.current ?? 0) < (currentIndex ?? 0)) {
    direction = 1
  }

  return direction
}
