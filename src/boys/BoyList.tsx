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

  // currying: the outer fn takes our custom arg and returns a fn that takes the event
  const handleSelectBoy = (boyId: string) => () => {
    const boy = deferredBoys.find((b: Boy) => b.id === boyId)
    navigate(
      `/boys/edit-boy/${boy?.id}?name=${boy?.name}&description=${boy?.description}`,
    )
  }

  /** returns a boolean whether the boy properties exist in the search field */
  const searchExists = (searchProperty: BoyProperty, searchField: string) =>
    String(searchProperty).toLowerCase().indexOf(searchField.toLowerCase()) !==
    -1

  /** given the data and the search field, returns the data in which the search field exists */
  const searchProperties = (searchField: string, data: Boy[]) =>
    [...data].filter((item: Boy) =>
      Object.values(item).find((property: BoyProperty) =>
        searchExists(property, searchField),
      ),
    )

  /** filters the boys data to see if the any of the properties exist in the list */
  const handleSearch =
    (data: Boy[]) => (event: ChangeEvent<HTMLInputElement>) => {
      const searchField = event.target.value

      return startTransition(() =>
        setFilteredBoys(searchProperties(searchField, data)),
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
