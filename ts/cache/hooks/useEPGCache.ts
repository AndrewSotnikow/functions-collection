import { useEPGContext } from '@/app/context/CacheContext'

export const useEPGCache = () => {
    const context = useEPGContext()
    if (!context) {
        throw new Error('useEPGCache must be used within a CacheProvider')
    }
    return context
}
