import {Hero} from 'models/Hero'
import {useMutation, useQueryClient} from 'react-query'
import type {QueryClient} from 'react-query'
import {useNavigate} from 'react-router-dom'
import {editItem} from './api'

/**
 * Helper for PUT to `/heroes` route
 * @returns {object} {updateHero, isUpdating, isUpdateError, updateError}
 */
export function usePutHero() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const mutation = useMutation(
    (item: Hero) => editItem(`heroes/${item.id}`, item),
    {
      onSuccess: (updatedHero: Hero) => {
        updateHeroesCache(updatedHero, queryClient)
        navigate(`/heroes`)
      },
    },
  )

  return {
    updateHero: mutation.mutate,
    isUpdating: mutation.isLoading,
    isUpdateError: mutation.isError,
    updateError: mutation.error,
  }
}

/** Replace a hero in the cache with the updated version. */
function updateHeroesCache(updatedHero: Hero, queryClient: QueryClient) {
  // get all the heroes from the cache
  let heroesCache: Hero[] = queryClient.getQueryData('heroes') || []

  // find the index in the cache of the hero that's been edited
  const heroIndex = heroesCache.findIndex(h => h.id === updatedHero.id)

  if (heroIndex !== -1) {
    // if the hero is found, replace the pre-edited hero with the updated one
    // this is just replacing an array item in place,
    // while not mutating the original array
    heroesCache = heroesCache.map(preEditedHero =>
      preEditedHero.id === updatedHero.id ? updatedHero : preEditedHero,
    )
    // use queryClient's setQueryData to set the cache
    // takes a key as the first arg, the 2nd arg is the new cache
    return queryClient.setQueryData(['heroes'], heroesCache)
  } else return null
}
