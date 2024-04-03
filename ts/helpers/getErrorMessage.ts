interface ErrorWithMessage {
    message: string
}

function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
    return typeof error === 'object' && error !== null && 'message' in error
}

interface ErrorWithMessage extends Error {
    message: string
}

function toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
    if (isErrorWithMessage(maybeError)) return maybeError

    try {
        return new Error(JSON.stringify(maybeError))
    } catch {
        throw new Error(String(maybeError))
    }
}

export function getErrorMessage(componentName: string, error: unknown): string {
    let errorMessage = 'Unknown Error'
    if (error instanceof Error) errorMessage = error.message
    console.log(`${componentName} - ${errorMessage}`)
    return toErrorWithMessage(errorMessage).message
}
