import { useEffect, useRef, useState } from 'react'

const useResizeHook = <T extends HTMLElement>() => {
  const [containerWidth, setContainerWidth] = useState(0)
  const [containerHeight, setContainerHeight] = useState(0)
  const [bodyWidth, setBodyWidth] = useState(0)
  const [bodyHeight, setBodyHeight] = useState(0)
  const ref = useRef<T>(null)

  const setSizeHandler = () => {
    if (ref.current) {
      const containerWidth = ref.current.clientWidth
      const containerHeight = ref.current.clientHeight
      const bodyHeight = document.body.clientHeight
      const bodyWidth = document.body.clientWidth
      setBodyHeight(bodyHeight)
      setBodyWidth(bodyWidth)
      setContainerWidth(containerWidth)
      setContainerHeight(containerHeight)
    }
  }
  useEffect(() => {
    setSizeHandler()
  }, [])

  useEffect(() => {
    window.addEventListener('resize', setSizeHandler)

    return () => {
      window.removeEventListener('resize', setSizeHandler)
    }
  }, [])

  return { containerWidth, containerHeight, bodyWidth, bodyHeight, ref }
}

export default useResizeHook
