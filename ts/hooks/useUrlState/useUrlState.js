import _assign from 'lodash/assign'
import _isArray from 'lodash/isArray'
import _merge from 'lodash/merge'
import _mergeWith from 'lodash/mergeWith'
import { useRouter } from 'next/router'
import qs from 'qs'
import { useMemo } from 'react'

const defaultQueries = {
  sort: 'popularity',
  page: 1,
}

export function _parseQuery(query) {
  const queryString = query.split('?')[1] || ''
  const parsedQuery = qs.parse(queryString, {
    arrayLimit: 100,
    skipNulls: true,
  })

  return {
    filters: parsedQuery.filters || {},
    sort: parsedQuery.sort || defaultQueries.sort,
    page: Number(parsedQuery.page ?? defaultQueries.page),
  }
}

function removeEmpty(obj, slot = {}) {
  const newObj = slot

  Object.keys(obj).forEach(key => {
    if (obj[key] && typeof obj[key] === 'object') {
      if (Array.isArray(obj[key])) {
        key == 'rating' || key == 'children_ages' || key == 'ages' || key == 'children'
          ? (newObj[key] = obj[key])
          : (newObj[key] = removeEmpty(obj[key], []))
      } else {
        newObj[key] = removeEmpty(obj[key])
      }
    } else if (obj[key]) {
      newObj[key] = obj[key]
    }
  })

  return newObj
}

export default function useUrlState(initialState, shallow = true, scroll = false) {
  const router = useRouter()
  const [, queryString] = router.asPath.split('?')
  const parsedQuery = useMemo(() => {
    return _merge(
      initialState,
      qs.parse(queryString, {
        arrayLimit: 100,
      }),
    )
  }, [queryString])

  const setState = newQuery => {
    function customizer(objValue, srcValue) {
      if (_isArray(objValue)) {
        return srcValue
      }
    }
    const query = _mergeWith(parsedQuery, newQuery, customizer)

    const queriesStringified = qs.stringify(removeEmpty(query), {
      encode: false,
    })

    const hasQuery = !!queriesStringified

    const href = hasQuery ? `${router.pathname}?${queriesStringified}` : router.pathname

    const asPath = hasQuery ? `${location.pathname}?${queriesStringified}` : location.pathname

    router.push(href, asPath, {
      shallow,
      scroll,
    })
  }

  return [parsedQuery, setState, queryString, router.asPath]
}
