import type {EntityRoute} from 'models/types'
import {useQuery} from 'react-query'
import {getItem} from '../api/api'

/**
 * Helper for GET to `/heroes` or `/villains` routes
 * @returns {object} {entities, status, getError}
 */
export const useGetEntities = (entityRoute: EntityRoute) => {
  const query = useQuery(entityRoute, () => getItem(entityRoute), {
    suspense: true,
  })

  return {
    entities: query.data,
    status: query.status,
    getError: query.error,
  }
}

// useQuery is similar to our custom useAxios: takes a url, returns an object of data, status & error
// the key arg is a unique identifier for the query / data in cache; string, array or object
// the 2nd arg an async function that returns the data
// const { data, status, error } = useQuery(key, () => fetch(url))
// Whenever any component subsequently calls useQuery with the key,
// React Query will return the previously fetched  data from its cache
// and then fetch the latest data in the background (very similar to PWAs and service workers)
// useQuery takes a third arg as a configuration option
// which tells useQuery to suspend (throw a promise) when loading its initial data
