export const isMobileRes = (): boolean => {
    if (window.innerWidth < 769) {
        return true
    }
    return false
}

export const isTabletRes = (): boolean => {
    if (window.innerWidth < 991) {
        return true
    }
    return false
}

export const slugify = (text: string): string => {
    return text
        .toString()
        .toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/[^\w-]+/g, '') // Remove all non-word chars
        .replace(/--+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, '') // Trim - from end of text
}

export const cookieStorage = {
    /**
     *
     * @param item cookie name to get
     * @returns cookie data
     */
    getItem: (item: string): string => {
        const cookies: { [key: string]: string } = document.cookie
            .split(';')
            .map((cookie) => cookie.split('='))
            .reduce(
                (acc, [key, value]) => ({ ...acc, [key.trim()]: value }),
                {}
            )
        return cookies[item]
    },
    /**
     *
     * @param item cookie name to add
     * @param value cookie value to add
     * @param expirationDate cookie expiration date to add
     */
    setItem: (
        item: string,
        value: string | boolean,
        expirationDate?: Date
    ): void => {
        document.cookie = `${item}=${value}; path=/;${
            expirationDate ? ` expires=${expirationDate.toUTCString()}` : ''
        }`
    },
    /**
     *
     * @param item cookie name to delete
     */
    deleteItem: (item: string): void => {
        document.cookie = item + '=; Max-Age=-99999999;'
    },
}


export interface ErrorResponse {
    status: number
    message?: string
    messages?: ErrorField[]
}

export interface ErrorField {
    property_path: string
    message: string
}

export const handleError = (response: unknown): void => {
    if (typeof response !== 'object' || !response) return
    if ('error' in response) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const status = response.error.status
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const data = response.error.data

        if (!data) return

        if ('error' in data) {
            const message = data.error
            const error = { status, message }
            throw error
        }
        if ('errors' in data) {
            const messages: ErrorField[] = []
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            data.errors.forEach((error) => {
                messages.push(error)
            })
            const error = { status, messages }
            throw error
        }
    }
}

export const getParameter = (parameterName: string): string | undefined => {
    let result: string | undefined = undefined
    let tmp = []

    location.search
        .substring(1)
        .split('&')
        .forEach(function (item) {
            tmp = item.split('=')
            if (tmp[0] === parameterName) {
                result = decodeURIComponent(tmp[1])
            } else {
                return undefined
            }
        })

    return result
}

const setWindowHeight = () => {
    const vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
}

window.addEventListener('load', () => {
    setWindowHeight()
})

window.addEventListener('resize', () => {
    setWindowHeight()
})
