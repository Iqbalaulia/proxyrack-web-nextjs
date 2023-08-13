import { useEffect } from 'react'

export function useBodyLock(condition: boolean): void {
  useEffect(() => {
    const scrollbarVisible = window.visualViewport.width < window.innerWidth

    document.body.style.overflow = condition ? 'hidden' : 'auto'
    document.body.style.paddingRight =
      condition && scrollbarVisible ? '15px' : 'unset'

    return () => {
      document.body.style.overflow = 'auto'
      document.body.style.paddingRight = 'unset'
    }
  }, [condition])
}
