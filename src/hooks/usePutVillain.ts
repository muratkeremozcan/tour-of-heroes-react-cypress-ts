import {Villain} from 'models/Villain'
import {useMutation, useQueryClient} from 'react-query'
import type {QueryClient} from 'react-query'
import {useNavigate} from 'react-router-dom'
import {editItem} from './api'

/**
 * Helper for PUT to `/villains` route
 * @returns {object} {updateVillain, isUpdating, isUpdateError, updateError}
 */
export function usePutVillain() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const mutation = useMutation(
    (item: Villain) => editItem(`villains/${item.id}`, item),
    {
      onSuccess: (updatedVillain: Villain) => {
        updateVillainsCache(updatedVillain, queryClient)
        navigate(`/villains`)
      },
    },
  )

  return {
    updateVillain: mutation.mutate,
    isUpdating: mutation.isLoading,
    isUpdateError: mutation.isError,
    updateError: mutation.error,
  }
}

/** Replace a villain in the cache with the updated version. */
function updateVillainsCache(
  updatedVillain: Villain,
  queryClient: QueryClient,
) {
  // get all the villains from the cache
  let villainsCache: Villain[] = queryClient.getQueryData('villains') || []

  // find the index in the cache of the villain that's been edited
  const villainIndex = villainsCache.findIndex(h => h.id === updatedVillain.id)

  if (villainIndex !== -1) {
    // if the villain is found, replace the pre-edited villain with the updated one
    // this is just replacing an array item in place,
    // while not mutating the original array
    villainsCache = villainsCache.map(preEditedVillain =>
      preEditedVillain.id === updatedVillain.id
        ? updatedVillain
        : preEditedVillain,
    )
    // use queryClient's setQueryData to set the cache
    // takes a key as the first arg, the 2nd arg is the new cache
    return queryClient.setQueryData(['villains'], villainsCache)
  } else return null
}
