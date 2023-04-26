import type {Boy} from 'models/Boy'
import type {Hero} from 'models/Hero'
import type {EntityType} from 'models/types'
import {entityRoute} from 'models/types'
import type {Villain} from 'models/Villain'
import {useMutation, useQueryClient} from 'react-query'
import {useNavigate} from 'react-router-dom'
import {deleteItem} from '../api/api'

/**
 * Helper for DELETE to `/heroes`, `/villains` or 'boys' routes.
 * @returns {object} {deleteEntity, isDeleting, isDeleteError, deleteError}
 */
export function useDeleteEntity(entityType: EntityType) {
  const route = entityRoute(entityType)
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const mutation = useMutation(
    (item: Hero | Villain | Boy) => deleteItem(`${route}/${item.id}`),
    {
      // on success receives the original item as a second argument
      // if you recall, the first argument is the created item
      onSuccess: (_, deletedEntity: Hero | Villain | Boy) => {
        // get all the entities from the cache
        const entities: Hero[] | Villain[] | Boy[] =
          queryClient.getQueryData([`${route}`]) || []
        // set the entities cache without the delete one
        queryClient.setQueryData(
          [`${route}`],
          entities.filter(h => h.id !== deletedEntity.id),
        )

        navigate(`/${route}`)
      },
    },
  )

  return {
    deleteEntity: mutation.mutate,
    isDeleting: mutation.isLoading,
    isDeleteError: mutation.isError,
    deleteError: mutation.error,
  }
}
