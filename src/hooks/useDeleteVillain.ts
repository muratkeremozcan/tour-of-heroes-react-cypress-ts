import {Villain} from 'models/Villain'
import {useMutation, useQueryClient} from 'react-query'
import {useNavigate} from 'react-router-dom'
import {deleteItem} from './api'

/**
 * Helper for DELETE to `/villains` route
 * @returns {object} {deleteVillain, isDeleting, isDeleteError, deleteError}
 */
export function useDeleteVillain() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const mutation = useMutation(
    (item: Villain) => deleteItem(`villains/${item.id}`),
    {
      // on success receives the original item as a second argument
      // if you recall, the first argument is the created item
      onSuccess: (_, deletedVillain: Villain) => {
        // get all the villains from the cache
        const villains: Villain[] = queryClient.getQueryData(['villains']) || []
        // set the villains cache without the delete one
        queryClient.setQueryData(
          ['villains'],
          villains.filter(h => h.id !== deletedVillain.id),
        )

        navigate('/villains')
      },
    },
  )

  return {
    deleteVillain: mutation.mutate,
    isDeleting: mutation.isLoading,
    isDeleteError: mutation.isError,
    deleteError: mutation.error,
  }
}
