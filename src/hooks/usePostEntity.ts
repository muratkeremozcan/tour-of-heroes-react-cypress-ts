import {Hero} from 'models/Hero'
import {EntityType} from 'models/types'
import {useMutation, useQueryClient} from 'react-query'
import {useNavigate} from 'react-router-dom'
import {createItem} from './api'

// why useMutation?
// useParams and useQuery fetch state: UI state <- server/url , and caches it
// useMutation is just the opposite: UI state -> server , and still caches it
// yields data, status, error just like useQuery (10.4.2)
// const { dataToMutate, status, error } = useMutation((item) => createItem(url, item)
// the first arg is a function that that executes a non-idempotent request
// the second arg is an object with onSuccess property

/**
 * Helper for simple POST to `/heroes` route
 * @returns {object} {mutate, status, error}
 */
export function usePostEntity(entityType: EntityType) {
  const entityRoute = entityType === 'hero' ? 'heroes' : 'villains'
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  return useMutation((item: Hero) => createItem(entityRoute, item), {
    onSuccess: (newData: Hero) => {
      //  use queryClient's setQueryData to set the cache
      // takes a key as the first arg, the 2nd arg is a cb that takes the old query cache and returns the new one
      queryClient.setQueryData([entityRoute], (oldData: Hero[] | undefined) => [
        ...(oldData || []),
        newData,
      ])

      return navigate(`/${entityRoute}`)
    },
  })
}
