import {Hero} from 'models/Hero'
import {useMutation, useQueryClient} from 'react-query'
import {useNavigate} from 'react-router-dom'
import {deleteItem} from './api'

/**
 * Helper for DELETE to `/heroes` route
 * @returns {object} {deleteHero, isDeleting, isDeleteError, deleteError}
 */
export function useDeleteHero() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const mutation = useMutation(
    (item: Hero) => deleteItem(`heroes/${item.id}`),
    {
      // on success receives the original item as a second argument
      onSuccess: (_, deletedHero: Hero) => {
        // get all the heroes from the cache
        const heroes: Hero[] = queryClient.getQueryData(['heroes']) || []
        // set the heroes cache without the delete one
        queryClient.setQueryData(
          ['heroes'],
          heroes.filter(h => h.id !== deletedHero.id),
        )

        navigate('/heroes')
      },
    },
  )

  return {
    deleteHero: mutation.mutate,
    isDeleting: mutation.isLoading,
    isDeleteError: mutation.isError,
    deleteError: mutation.error,
  }
}
