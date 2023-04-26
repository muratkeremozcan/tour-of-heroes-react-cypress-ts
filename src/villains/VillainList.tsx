import {useNavigate} from 'react-router-dom'
import CardContent from 'components/CardContent'
import ButtonFooter from 'components/ButtonFooter'
import {FaEdit, FaRegSave} from 'react-icons/fa'
import type {ChangeEvent, MouseEvent} from 'react'
import {useTransition, useEffect, useState, useDeferredValue} from 'react'
import {useVillainsContext} from 'hooks/useVillainsContext'
import type {Villain} from 'models/Villain'

type VillainListProps = {
  handleDeleteVillain: (
    villain: Villain,
  ) => (e: MouseEvent<HTMLButtonElement>) => void
}

export default function VillainList({handleDeleteVillain}: VillainListProps) {
  const [villains] = useVillainsContext()

  const deferredVillains = useDeferredValue(villains)
  const isStale = deferredVillains !== villains
  const [filteredVillains, setFilteredVillains] = useState(deferredVillains)
  const navigate = useNavigate()
  const [isPending, startTransition] = useTransition()

  // needed to refresh the list after deleting a villain
  useEffect(() => setFilteredVillains(deferredVillains), [deferredVillains])

  // currying: the outer fn takes our custom arg and returns a fn that takes the event
  const handleSelectVillain = (villainId: string) => () => {
    const villain = deferredVillains.find((h: Villain) => h.id === villainId)
    navigate(
      `/villains/edit-villain/${villain?.id}?name=${villain?.name}&description=${villain?.description}`,
    )
  }

  type VillainProperty =
    | Villain['name']
    | Villain['description']
    | Villain['id']

  /** returns a boolean whether the villain properties exist in the search field */
  const searchExists = (searchProperty: VillainProperty, searchField: string) =>
    String(searchProperty).toLowerCase().indexOf(searchField.toLowerCase()) !==
    -1

  /** given the data and the search field, returns the data in which the search field exists */
  const searchProperties = (searchField: string, data: Villain[]) =>
    [...data].filter((item: Villain) =>
      Object.values(item).find((property: VillainProperty) =>
        searchExists(property, searchField),
      ),
    )

  /** filters the villains data to see if the any of the properties exist in the list */
  const handleSearch =
    (data: Villain[]) => (event: ChangeEvent<HTMLInputElement>) => {
      const searchField = event.target.value

      return startTransition(() =>
        setFilteredVillains(searchProperties(searchField, data)),
      )
    }

  return (
    <div
      style={{
        opacity: isPending ? 0.5 : 1,
        color: isStale ? 'dimgray' : 'black',
      }}
    >
      {deferredVillains.length > 0 && (
        <div className="card-content">
          <span>Search </span>
          <input data-cy="search" onChange={handleSearch(deferredVillains)} />
        </div>
      )}
      &nbsp;
      <ul data-cy="villain-list" className="list">
        {filteredVillains.map((villain, index) => (
          <li data-cy={`villain-list-item-${index}`} key={villain.id}>
            <div className="card">
              <CardContent
                name={villain.name}
                description={villain.description}
              />
              <footer className="card-footer">
                <ButtonFooter
                  label="Delete"
                  IconClass={FaRegSave}
                  onClick={handleDeleteVillain(villain)}
                />
                <ButtonFooter
                  label="Edit"
                  IconClass={FaEdit}
                  onClick={handleSelectVillain(villain.id)}
                />
              </footer>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
