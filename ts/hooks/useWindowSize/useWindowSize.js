import { useState, useEffect, useRef, useCallback } from 'react'

export default function useWindowSize() {
  if (typeof window == 'undefined') {
    return { width: 0, height: 0 }
  }

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })
  const timeout = useRef()

  const onResize = useCallback(() => {
    clearTimeout(timeout.current)
    timeout.current = setTimeout(() => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }, 100)
  }, [])

  useEffect(() => {
    window.addEventListener('resize', onResize)

    return () => window.removeEventListener('resize', onResize)
  }, [])

  return windowSize
}
