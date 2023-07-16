/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { useStore } from 'store'
import stringSimilarity from 'string-similarity'
const useSearchByChannelName = (
    arrayElementType: any,
    arrayToFilter: (typeof arrayElementType)[],
    propsToSearchBy: string
) => {
    const { searchValue } = useStore()
    const [filteredArray, setFilteredArray] = useState(arrayToFilter)
    useEffect(() => {
        if (searchValue.length) {
            const newFilteredArray = arrayToFilter.filter(
                (element: typeof arrayElementType) => {
                    const elementNameLowerCase =
                        element[propsToSearchBy].toLowerCase()
                    const searchValueLoverCase = searchValue.toLowerCase()

                    if (searchValueLoverCase.length <= 2) {
                        return (
                            elementNameLowerCase.slice(
                                0,
                                searchValue.length
                            ) === searchValue
                        )
                    } else {
                        const similarity = stringSimilarity.compareTwoStrings(
                            elementNameLowerCase,
                            searchValueLoverCase
                        )

                        if (
                            similarity >= 0.2 &&
                            searchValueLoverCase.length <= 6 &&
                            searchValueLoverCase.length > 2
                        )
                            return element
                        else if (
                            similarity >= 0.45 &&
                            searchValueLoverCase.length > 6 &&
                            searchValueLoverCase.length <= 10
                        )
                            return element
                        else if (
                            similarity >= 0.6 &&
                            searchValueLoverCase.length > 10
                        )
                            return element
                    }
                }
            )
            setFilteredArray(newFilteredArray)
        } else setFilteredArray(arrayToFilter)
    }, [searchValue])

    return { filteredArray }
}

export default useSearchByChannelName
