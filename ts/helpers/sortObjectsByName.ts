export function sortObjectsByName<T>(
    arrayOfObjects: T[],
    nameExtractor: (obj: T) => string
): T[] {
    return arrayOfObjects.slice().sort((objectA, objectB) => {
        const nameA = nameExtractor(objectA).toLowerCase()
        const nameB = nameExtractor(objectB).toLowerCase()

        if (nameA < nameB) {
            return -1
        }
        if (nameA > nameB) {
            return 1
        }
        return 0
    })
}
