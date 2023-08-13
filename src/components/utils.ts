import { useEffect, useState, useRef } from 'react'

type WindowSize = {
  width: number
  height: number
}

export const useWindowSize = (): WindowSize => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: 0,
    height: 0,
  })

  useEffect(() => {
    const handler = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    handler()

    window.addEventListener('resize', handler)

    return () => {
      window.removeEventListener('resize', handler)
    }
  }, [])

  return windowSize
}

export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>()
  useEffect(() => {
    ref.current = value
  }, [value])
  return ref.current
}

export const useCurrentYear = (): number => {
  return new Date().getFullYear()
}

export const filterUnique = (array: any[]) => {
  function onlyUnique(value: any, index: number, self: any) {
    return self.indexOf(value) === index
  }
  return array.filter(onlyUnique)
}
