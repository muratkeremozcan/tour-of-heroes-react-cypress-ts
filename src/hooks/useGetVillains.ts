import {useQuery} from 'react-query'
import {getItem} from './api'

/**
 * Helper for GET to `/villains` route
 * @returns {object} {villains, status, getError}
 */
export const useGetVillains = () => {
  const query = useQuery('villains', () => getItem('villains'), {
    suspense: true,
  })

  return {
    villains: query.data,
    status: query.status,
    getError: query.error,
  }
}
