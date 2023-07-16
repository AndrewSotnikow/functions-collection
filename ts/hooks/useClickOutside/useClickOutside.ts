import { useEffect, useRef } from 'react'

const useOutsideClick = (callback: () => void) => {
    const ref = useRef<HTMLDivElement>(null)

    const handleClick = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
            callback()
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClick, true)

        return () => {
            document.removeEventListener('mousedown', handleClick, true)
        }
    }, [ref])

    return ref
}

export default useOutsideClick
