import { useEffect } from 'react'

export const useScrollToAnchor = () => {
  useEffect(() => {
    const path = window.location.hash
    if (path && path.includes('#')) {
      const target = document?.querySelector(path)
      if (target) target.scrollIntoView()
    }
  })
}
