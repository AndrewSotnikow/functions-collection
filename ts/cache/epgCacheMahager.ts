import { openDB, IDBPDatabase } from 'idb'

export type ICacheManager = typeof EPGCacheManager

const DB_NAME = 'CacheDB'
const STORE_NAME = 'CacheStore'

export class LRUCacheManager {
    private dbPromise: Promise<IDBPDatabase>

    constructor() {
        this.dbPromise = openDB(DB_NAME, 1, {
            upgrade(database) {
                database.createObjectStore(STORE_NAME, { keyPath: 'key' })
            },
        })
    }

    // eslint-disable-next-line
    async setCache(key: string, data: any): Promise<void> {
        const database = await this.dbPromise
        const transaction = database.transaction(STORE_NAME, 'readwrite')
        const store = transaction.objectStore(STORE_NAME)

        await store.put({ key, data, timestamp: Date.now() })
        await transaction.done
    }

    // eslint-disable-next-line
    async getCache(key: string): Promise<any | undefined> {
        const database = await this.dbPromise
        const transaction = database.transaction(STORE_NAME, 'readonly')
        const store = transaction.objectStore(STORE_NAME)

        const entry = await store.get(key)
        return entry ? entry.data : undefined
    }

    async deleteCache(key: string): Promise<void> {
        const database = await this.dbPromise
        const transaction = database.transaction(STORE_NAME, 'readwrite')
        await transaction.objectStore(STORE_NAME).delete(key)
        await transaction.done
    }
}

const EPGCacheManager = new LRUCacheManager()

export { EPGCacheManager }
