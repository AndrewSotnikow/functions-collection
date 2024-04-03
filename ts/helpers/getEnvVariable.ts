export function getEnvVariable(key: string): string {
    const value = process.env[key]
    if (typeof value === 'undefined') {
        throw new Error(`Environment variable ${key} not set`)
    }
    return value
}
