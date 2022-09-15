import {Hero} from 'models/Hero'
import {Villain} from 'models/Villain'
import {useMutation, useQueryClient} from 'react-query'
import {useNavigate} from 'react-router-dom'
import {deleteItem} from './api'

/**
 * Helper for DELETE to `/entities` route
 * @returns {object} {deleteEntity, isDeleting, isDeleteError, deleteError}
 */
export function useDeleteEntity(entityType: 'hero' | 'villain') {
  const entityRoute = entityType === 'hero' ? 'heroes' : 'villains'
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const mutation = useMutation(
    (item: Hero | Villain) => deleteItem(`${entityRoute}/${item.id}`),
    {
      // on success receives the original item as a second argument
      // if you recall, the first argument is the created item
      onSuccess: (_, deletedEntity: Hero | Villain) => {
        // get all the entities from the cache
        const entities: Hero[] | Villain[] =
          queryClient.getQueryData([`${entityRoute}`]) || []
        // set the entities cache without the delete one
        queryClient.setQueryData(
          [`${entityRoute}`],
          entities.filter(h => h.id !== deletedEntity.id),
        )

        navigate(`/${entityRoute}`)
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
