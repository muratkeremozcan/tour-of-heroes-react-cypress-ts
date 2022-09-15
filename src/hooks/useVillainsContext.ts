import {createContext, useContext, SetStateAction, Dispatch} from 'react'
import {Villain} from 'models/Villain'

// Context api lets us pass a value deep into the component tree
// without explicitly threading it through every component (2nd tier state management)

const VillainsContext = createContext<Villain[]>([])
// to be used as VillainsContext.Provider,
// takes a prop as `value`, which is the context/data/state to share
export default VillainsContext

const VillainsSetContext = createContext<Dispatch<
  SetStateAction<Villain[] | null>
> | null>(null)

// Manage state and effects related to a hook’s functionality
// within the hook and return only the value(s) that components need

export function useVillainsContext() {
  const villains = useContext(VillainsContext)
  const setVillains = useContext(VillainsSetContext)

  return [villains, setVillains] as const
}
