import { useEffect, useRef, useState } from 'react'

const useResizeHook = <T extends HTMLElement>() => {
    const [width, setWidth] = useState(0)
    const ref = useRef<T>(null)

    const setWidthHandler = () => {
        if (ref.current) {
            const width = ref.current.clientWidth
            setWidth(width)
        }
    }
    useEffect(() => {
        setWidthHandler()
    }, [])

    useEffect(() => {
        window.addEventListener('resize', setWidthHandler)

        return () => {
            window.removeEventListener('resize', setWidthHandler)
        }
    }, [])

    return { width, ref }
}

export default useResizeHook
