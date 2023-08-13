import { useEffect, useState } from 'react'

export const useInnerWidth = () => {
  const [width, setWidth] = useState<number>(0)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const onWidthChange = () => setWidth(window.innerWidth)
      onWidthChange()
      window.addEventListener('resize', onWidthChange)
      return () => window.removeEventListener('resize', onWidthChange)
    }
    return () => null
  }, [])

  return width
}
