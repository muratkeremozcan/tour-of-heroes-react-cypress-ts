import {Hero} from 'models/Hero'
import {useMutation, useQueryClient} from 'react-query'
import type {QueryClient} from 'react-query'
import {useNavigate} from 'react-router-dom'
import {editItem} from './api'
import {Villain} from 'models/Villain'
import {EntityType} from 'models/types'

/**
 * Helper for PUT to `/heroes` route
 * @returns {object} {updateHero, isUpdating, isUpdateError, updateError}
 */
export function usePutEntity(entityType: EntityType) {
  const entityRoute = entityType === 'hero' ? 'heroes' : 'villains'
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const mutation = useMutation(
    (item: Hero) => editItem(`${entityRoute}/${item.id}`, item),
    {
      onSuccess: (updatedEntity: Hero) => {
        updateEntityCache(entityType, updatedEntity, queryClient)
        navigate(`/${entityRoute}`)
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
  updatedEntity: Hero | Villain,
  queryClient: QueryClient,
) {
  const entityRoute = entityType === 'hero' ? 'heroes' : 'villains'
  // get all the heroes from the cache
  let entityCache: Hero[] | Villain[] =
    queryClient.getQueryData(entityRoute) || []

  // find the index in the cache of the hero that's been edited
  const entityIndex = entityCache.findIndex(h => h.id === updatedEntity.id)

  if (entityIndex !== -1) {
    // if the hero is found, replace the pre-edited hero with the updated one
    // this is just replacing an array item in place,
    // while not mutating the original array
    entityCache = entityCache.map(preEditedEntity =>
      preEditedEntity.id === updatedEntity.id ? updatedEntity : preEditedEntity,
    )
    console.log('entityCache is', entityCache)
    // use queryClient's setQueryData to set the cache
    // takes a key as the first arg, the 2nd arg is the new cache
    return queryClient.setQueryData([entityRoute], entityCache)
  }
}
