import {Hero} from 'models/Hero'
import {Boy} from 'models/Boy'
import {Villain} from 'models/Villain'
import {EntityType, entityRoute} from 'models/types'
import {useMutation, useQueryClient} from 'react-query'
import type {QueryClient} from 'react-query'
import {useNavigate} from 'react-router-dom'
import {editItem} from '../api/api'

/**
 * Helper for PUT to `/heroes` route
 * @returns {object} {updateHero, isUpdating, isUpdateError, updateError}
 */
export function usePutEntity(entityType: EntityType) {
  const route = entityRoute(entityType)
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const mutation = useMutation(
    (item: Hero | Villain | Boy) => editItem(`${route}/${item.id}`, item),
    {
      onSuccess: (updatedEntity: Hero | Villain | Boy) => {
        updateEntityCache(entityType, updatedEntity, queryClient)
        navigate(`/${route}`)
      },
    },
  )

  return {
    updateEntity: mutation.mutate,
    isUpdating: mutation.isLoading,
    isUpdateError: mutation.isError,
    updateError: mutation.error,
  }
}

/** Replace a hero in the cache with the updated version. */
function updateEntityCache(
  entityType: EntityType,
  updatedEntity: Hero | Villain | Boy,
  queryClient: QueryClient,
) {
  const route = entityRoute(entityType)
  // get all the heroes from the cache
  let entityCache: Hero[] | Villain[] | Boy[] =
    queryClient.getQueryData(route) || []

  // find the index in the cache of the hero that's been edited
  const entityIndex = entityCache.findIndex(h => h.id === updatedEntity.id)

  if (entityIndex !== -1) {
    // if the entity is found, replace the pre-edited entity with the updated one
    // this is just replacing an array item in place,
    // while not mutating the original array
    entityCache = entityCache.map(preEditedEntity =>
      preEditedEntity.id === updatedEntity.id ? updatedEntity : preEditedEntity,
    )
    console.log('entityCache is', entityCache)
    // use queryClient's setQueryData to set the cache
    // takes a key as the first arg, the 2nd arg is the new cache
    return queryClient.setQueryData([route], entityCache)
  }
}
