import { openDB } from 'idb'

export const objectStoreName = 'epgCache'

export const epgDataBase = openDB<undefined>('dotTV-database', 1, {
    async upgrade(dataBase, oldVersion, newVersion, transaction) {
        if (!transaction.objectStoreNames.contains(objectStoreName)) {
            // If the objectStore doesn't exist, create it.
            dataBase.createObjectStore(objectStoreName)
        }

        if (newVersion !== 1) {
            const newDatabase = dataBase.transaction(
                objectStoreName,
                'readwrite'
            )
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const store = newDatabase.objectStore(objectStoreName)
            // Place migrations here
        }
    },
})
