type DebounceCallback<T> = (args: T) => void

function debounce<T>(
    callback: DebounceCallback<T>,
    delay: number
): DebounceCallback<T> {
    let timeoutId: NodeJS.Timeout | undefined

    return (args: T) => {
        if (timeoutId) {
            clearTimeout(timeoutId)
        }

        timeoutId = setTimeout(() => {
            callback(args)
        }, delay)
    }
}

export default debounce
