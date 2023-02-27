import {useNavigate} from 'react-router-dom'
import CardContent from 'components/CardContent'
import ButtonFooter from 'components/ButtonFooter'
import {FaEdit, FaRegSave} from 'react-icons/fa'
import {
  ChangeEvent,
  MouseEvent,
  useTransition,
  useEffect,
  useState,
  useDeferredValue,
} from 'react'
import {Boy} from 'models/Boy'
import {BoyProperty} from 'models/types'
import {
  indexOf,
  find,
  curry,
  toLower,
  pipe,
  values,
  filter,
  Dictionary,
} from 'ramda'

type BoyListProps = {
  boys: Boy[]
  handleDeleteBoy: (boy: Boy) => (e: MouseEvent<HTMLButtonElement>) => void
}

export default function BoyList({boys, handleDeleteBoy}: BoyListProps) {
  const deferredBoys = useDeferredValue(boys)
  const isStale = deferredBoys !== boys
  const [filteredBoys, setFilteredBoys] = useState(deferredBoys)
  const navigate = useNavigate()
  const [isPending, startTransition] = useTransition()

  // needed to refresh the list after deleting a boy
  useEffect(() => setFilteredBoys(deferredBoys), [deferredBoys])

  const handleSelectBoy = curry(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (boyId: string, e: MouseEvent<HTMLButtonElement>) => {
      const boy = deferredBoys.find((b: Boy) => b.id === boyId)
      navigate(
        `/boys/edit-boy/${boy?.id}?name=${boy?.name}&description=${boy?.description}`,
      )
    },
  )

  /** returns a boolean whether the boy properties exist in the search field */
  const searchExists = (searchField: string, searchProperty: BoyProperty) =>
    indexOf(toLower(searchField), toLower(searchProperty)) !== -1

  /** finds the given boy's property in the search field  */
  const propertyExists = curry((searchField: string, item: Boy) =>
    pipe(
      values,
      find((property: BoyProperty) => searchExists(searchField, property)),
    )(item),
  )
  /** given the search field and the boy array, returns the boy in which the search field exists */
  const searchProperties = (
    searchField: string,
  ): (<P extends Boy, C extends readonly P[] | Dictionary<P>>(
    collection: C,
  ) => C) => filter(propertyExists(searchField))

  /** filters the boys data to see if the any of the properties exist in the list */
  const handleSearch =
    (data: Boy[]) => (event: ChangeEvent<HTMLInputElement>) => {
      const searchField = event.target.value
      const searchedBoy = searchProperties(searchField)(data)

      return startTransition(() =>
        setFilteredBoys(searchedBoy as React.SetStateAction<Boy[]>),
      )
    }

  return (
    <div
      style={{
        opacity: isPending ? 0.5 : 1,
        color: isStale ? 'dimgray' : 'black',
      }}
    >
      {deferredBoys.length > 0 && (
        <div className="card-content">
          <span>Search </span>
          <input data-cy="search" onChange={handleSearch(deferredBoys)} />
        </div>
      )}
      &nbsp;
      <ul data-cy="boy-list" className="list">
        {filteredBoys.map((boy, index) => (
          <li data-cy={`boy-list-item-${index}`} key={boy.id}>
            <div className="card">
              <CardContent name={boy.name} description={boy.description} />
              <footer className="card-footer">
                <ButtonFooter
                  label="Delete"
                  IconClass={FaRegSave}
                  onClick={handleDeleteBoy(boy)}
                />
                <ButtonFooter
                  label="Edit"
                  IconClass={FaEdit}
                  onClick={handleSelectBoy(boy.id)}
                />
              </footer>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
